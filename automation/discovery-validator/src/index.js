const DEFAULT_SITE = 'https://rushdanrosdi.com';
const DEFAULT_SITEMAP = 'https://rushdanrosdi.com/sitemap-index.xml';
const DEFAULT_ROBOTS = 'https://rushdanrosdi.com/robots.txt';

function json(data, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  });
}

function normalizeUrl(input) {
  const url = new URL(input);
  url.hash = '';
  if (!url.pathname.endsWith('/') && !url.pathname.split('/').pop()?.includes('.')) {
    url.pathname += '/';
  }
  return url.toString();
}

function extractCanonical(html, baseUrl) {
  const tags = html.match(/<link\b[^>]*>/gi) || [];
  for (const tag of tags) {
    const rel = tag.match(/\brel\s*=\s*["']([^"']+)["']/i)?.[1] || '';
    if (!rel.split(/\s+/).some((value) => value.toLowerCase() === 'canonical')) continue;
    const href = tag.match(/\bhref\s*=\s*["']([^"']+)["']/i)?.[1];
    if (href) return new URL(href, baseUrl).toString();
  }
  return null;
}

function robotsAllows(robotsText, pathname, userAgent = '*') {
  const lines = robotsText
    .split(/\r?\n/)
    .map((line) => line.replace(/#.*/, '').trim())
    .filter(Boolean);

  const groups = [];
  let currentAgents = [];
  let currentRules = [];

  const flush = () => {
    if (currentAgents.length) groups.push({ agents: currentAgents, rules: currentRules });
    currentAgents = [];
    currentRules = [];
  };

  for (const line of lines) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim().toLowerCase();
    const value = line.slice(idx + 1).trim();

    if (key === 'user-agent') {
      if (currentRules.length) flush();
      currentAgents.push(value.toLowerCase());
    } else if (key === 'allow' || key === 'disallow') {
      if (currentAgents.length) currentRules.push({ type: key, path: value });
    }
  }
  flush();

  const ua = userAgent.toLowerCase();
  const matching = groups.filter((group) => group.agents.some((agent) => agent === '*' || ua.includes(agent)));
  if (!matching.length) return { allowed: true, matchedRule: null };

  const rules = matching.flatMap((group) => group.rules).filter((rule) => rule.path !== '');
  let best = null;

  for (const rule of rules) {
    const escaped = rule.path
      .replace(/[.+?^${}()|[\]\\]/g, '\\$&')
      .replace(/\*/g, '.*')
      .replace(/\\\$$/, '$');
    const regex = new RegExp(`^${escaped}`);
    if (!regex.test(pathname)) continue;

    const score = rule.path.replace(/\*/g, '').length;
    if (!best || score > best.score || (score === best.score && rule.type === 'allow')) {
      best = { ...rule, score };
    }
  }

  return {
    allowed: !best || best.type === 'allow',
    matchedRule: best ? `${best.type}: ${best.path}` : null,
  };
}

function extractLocs(xml) {
  return [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi)].map((match) =>
    match[1].replace(/&amp;/g, '&').trim(),
  );
}

async function findInSitemap(targetUrl, sitemapUrl, depth = 0, seen = new Set()) {
  if (depth > 2 || seen.has(sitemapUrl)) return { found: false, checked: [] };
  seen.add(sitemapUrl);

  const response = await fetch(sitemapUrl, {
    headers: { 'user-agent': 'RushdanRosdi-DiscoveryValidator/1.0' },
  });

  const checked = [{ url: sitemapUrl, status: response.status }];
  if (!response.ok) return { found: false, checked };

  const xml = await response.text();
  const locs = extractLocs(xml);
  const normalizedTarget = normalizeUrl(targetUrl);

  if (locs.some((loc) => {
    try {
      return normalizeUrl(loc) === normalizedTarget;
    } catch {
      return false;
    }
  })) {
    return { found: true, checked };
  }

  const childSitemaps = locs.filter((loc) => /sitemap.*\.xml(?:$|\?)/i.test(loc));
  for (const child of childSitemaps) {
    const result = await findInSitemap(targetUrl, child, depth + 1, seen);
    checked.push(...result.checked);
    if (result.found) return { found: true, checked };
  }

  return { found: false, checked };
}

async function validate(target, env) {
  const site = new URL(env.SITE_ORIGIN || DEFAULT_SITE);
  const targetUrl = new URL(target, site);

  if (targetUrl.origin !== site.origin) {
    throw new Error(`Only ${site.origin} URLs are allowed.`);
  }

  const expectedCanonical = normalizeUrl(targetUrl.toString());
  const pageResponse = await fetch(targetUrl.toString(), {
    redirect: 'follow',
    headers: { 'user-agent': 'RushdanRosdi-DiscoveryValidator/1.0' },
  });
  const finalUrl = pageResponse.url || targetUrl.toString();
  const contentType = pageResponse.headers.get('content-type') || '';
  const html = contentType.includes('text/html') ? await pageResponse.text() : '';
  const canonical = html ? extractCanonical(html, finalUrl) : null;

  const robotsUrl = env.ROBOTS_URL || DEFAULT_ROBOTS;
  const robotsResponse = await fetch(robotsUrl, { headers: { 'user-agent': 'RushdanRosdi-DiscoveryValidator/1.0' } });
  const robotsText = robotsResponse.ok ? await robotsResponse.text() : '';
  const robotsResult = robotsResponse.ok
    ? robotsAllows(robotsText, targetUrl.pathname, '*')
    : { allowed: null, matchedRule: null };

  const sitemapUrl = env.SITEMAP_URL || DEFAULT_SITEMAP;
  const sitemapResult = await findInSitemap(targetUrl.toString(), sitemapUrl);

  const checks = {
    live: pageResponse.ok,
    http200: pageResponse.status === 200,
    canonical: canonical ? normalizeUrl(canonical) === expectedCanonical : false,
    robots: robotsResult.allowed === true,
    sitemap: sitemapResult.found,
  };

  return {
    ok: Object.values(checks).every(Boolean),
    checkedAt: new Date().toISOString(),
    target: expectedCanonical,
    finalUrl,
    checks,
    details: {
      http: {
        status: pageResponse.status,
        contentType,
      },
      canonical: {
        expected: expectedCanonical,
        actual: canonical,
      },
      robots: {
        url: robotsUrl,
        status: robotsResponse.status,
        allowed: robotsResult.allowed,
        matchedRule: robotsResult.matchedRule,
      },
      sitemap: {
        root: sitemapUrl,
        found: sitemapResult.found,
        checked: sitemapResult.checked,
      },
    },
  };
}

export default {
  async fetch(request, env) {
    const requestUrl = new URL(request.url);

    if (request.method === 'GET' && requestUrl.pathname === '/health') {
      return json({ ok: true, service: 'rushdanrosdi-discovery-validator', phase: '2A' });
    }

    if (!['GET', 'POST'].includes(request.method)) {
      return json({ ok: false, error: 'Method not allowed' }, 405);
    }

    let target = requestUrl.searchParams.get('url');
    if (request.method === 'POST') {
      try {
        const body = await request.json();
        target = body.url || target;
      } catch {
        return json({ ok: false, error: 'POST body must be valid JSON.' }, 400);
      }
    }

    if (!target) {
      return json(
        {
          ok: false,
          error: 'Missing url. Use ?url=https://rushdanrosdi.com/.../ or POST {"url":"..."}.',
        },
        400,
      );
    }

    try {
      return json(await validate(target, env));
    } catch (error) {
      return json({ ok: false, error: error instanceof Error ? error.message : String(error) }, 400);
    }
  },
};
