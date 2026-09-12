const DEFAULT_SITE = 'https://rushdanrosdi.com';
const DEFAULT_SITEMAP = 'https://rushdanrosdi.com/sitemap-index.xml';
const DEFAULT_ROBOTS = 'https://rushdanrosdi.com/robots.txt';
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';
const GOOGLE_TOKEN_ENDPOINT = 'https://oauth2.googleapis.com/token';
const GOOGLE_SITEMAP_SCOPE = 'https://www.googleapis.com/auth/webmasters';

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
    headers: { 'user-agent': 'RushdanRosdi-DiscoveryValidator/2.0' },
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
    headers: { 'user-agent': 'RushdanRosdi-DiscoveryValidator/2.0' },
  });
  const finalUrl = pageResponse.url || targetUrl.toString();
  const contentType = pageResponse.headers.get('content-type') || '';
  const html = contentType.includes('text/html') ? await pageResponse.text() : '';
  const canonical = html ? extractCanonical(html, finalUrl) : null;

  const robotsUrl = env.ROBOTS_URL || DEFAULT_ROBOTS;
  const robotsResponse = await fetch(robotsUrl, { headers: { 'user-agent': 'RushdanRosdi-DiscoveryValidator/2.0' } });
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
      http: { status: pageResponse.status, contentType },
      canonical: { expected: expectedCanonical, actual: canonical },
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

function base64Url(input) {
  const bytes = typeof input === 'string' ? new TextEncoder().encode(input) : input;
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

function pemToArrayBuffer(pem) {
  const normalized = pem.replace(/\\n/g, '\n');
  const base64 = normalized
    .replace('-----BEGIN PRIVATE KEY-----', '')
    .replace('-----END PRIVATE KEY-----', '')
    .replace(/\s+/g, '');
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}

async function getGoogleAccessToken(env) {
  if (!env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !env.GOOGLE_PRIVATE_KEY) return null;

  const now = Math.floor(Date.now() / 1000);
  const header = base64Url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claim = base64Url(JSON.stringify({
    iss: env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    scope: GOOGLE_SITEMAP_SCOPE,
    aud: GOOGLE_TOKEN_ENDPOINT,
    iat: now,
    exp: now + 3600,
  }));
  const unsigned = `${header}.${claim}`;

  const key = await crypto.subtle.importKey(
    'pkcs8',
    pemToArrayBuffer(env.GOOGLE_PRIVATE_KEY),
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const signature = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    key,
    new TextEncoder().encode(unsigned),
  );
  const assertion = `${unsigned}.${base64Url(new Uint8Array(signature))}`;

  const tokenResponse = await fetch(GOOGLE_TOKEN_ENDPOINT, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion,
    }),
  });

  if (!tokenResponse.ok) {
    const text = await tokenResponse.text();
    throw new Error(`Google OAuth failed (${tokenResponse.status}): ${text.slice(0, 300)}`);
  }

  const data = await tokenResponse.json();
  return data.access_token;
}

async function submitIndexNow(targetUrl, env) {
  if (!env.INDEXNOW_KEY) {
    return { configured: false, submitted: false, reason: 'INDEXNOW_KEY not configured' };
  }

  const target = new URL(targetUrl);
  const payload = {
    host: target.host,
    key: env.INDEXNOW_KEY,
    urlList: [targetUrl],
  };
  if (env.INDEXNOW_KEY_LOCATION) payload.keyLocation = env.INDEXNOW_KEY_LOCATION;

  const response = await fetch(INDEXNOW_ENDPOINT, {
    method: 'POST',
    headers: { 'content-type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  });

  return {
    configured: true,
    submitted: response.status === 200 || response.status === 202,
    status: response.status,
    accepted: response.status === 200 || response.status === 202,
    response: (await response.text()).slice(0, 500),
  };
}

async function submitGoogleSitemap(accessToken, env) {
  if (!accessToken || !env.GSC_SITE_URL) {
    return { configured: false, submitted: false, reason: 'Google Search Console credentials/site not configured' };
  }

  const sitemapUrl = env.SITEMAP_URL || DEFAULT_SITEMAP;
  const endpoint = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(env.GSC_SITE_URL)}/sitemaps/${encodeURIComponent(sitemapUrl)}`;
  const response = await fetch(endpoint, {
    method: 'PUT',
    headers: { authorization: `Bearer ${accessToken}` },
  });

  return {
    configured: true,
    submitted: response.ok,
    status: response.status,
    response: (await response.text()).slice(0, 500),
  };
}

async function inspectGoogleUrl(targetUrl, accessToken, env) {
  if (!accessToken || !env.GSC_SITE_URL) {
    return { configured: false, inspected: false, reason: 'Google Search Console credentials/site not configured' };
  }

  const response = await fetch('https://searchconsole.googleapis.com/v1/urlInspection/index:inspect', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${accessToken}`,
      'content-type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      inspectionUrl: targetUrl,
      siteUrl: env.GSC_SITE_URL,
      languageCode: 'en-US',
    }),
  });

  const raw = await response.text();
  let data = null;
  try { data = raw ? JSON.parse(raw) : null; } catch { data = null; }
  const index = data?.inspectionResult?.indexStatusResult;

  return {
    configured: true,
    inspected: response.ok,
    status: response.status,
    verdict: index?.verdict || null,
    coverageState: index?.coverageState || null,
    indexingState: index?.indexingState || null,
    robotsTxtState: index?.robotsTxtState || null,
    pageFetchState: index?.pageFetchState || null,
    lastCrawlTime: index?.lastCrawlTime || null,
    googleCanonical: index?.googleCanonical || null,
    userCanonical: index?.userCanonical || null,
    inspectionResultLink: data?.inspectionResult?.inspectionResultLink || null,
    error: response.ok ? null : raw.slice(0, 500),
  };
}

async function persistDiscoveryRun(env, result) {
  if (!env.DISCOVERY_DB) return { configured: false, stored: false, reason: 'DISCOVERY_DB binding not configured' };

  const validation = result.validation;
  const indexNow = result.discovery.indexNow;
  const gsc = result.discovery.google.sitemap;
  const inspection = result.discovery.google.inspection;

  const write = await env.DISCOVERY_DB.prepare(`
    INSERT INTO discovery_runs (
      brand, url, processed_at, validation_ok, http_status, canonical_ok, robots_ok, sitemap_ok,
      indexnow_submitted, indexnow_status, gsc_sitemap_submitted, gsc_sitemap_status,
      google_verdict, google_coverage_state, google_indexing_state, google_last_crawl_time, result_json
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(
    'rushdanrosdi',
    result.target,
    result.processedAt,
    validation.ok ? 1 : 0,
    validation.details.http.status ?? null,
    validation.checks.canonical ? 1 : 0,
    validation.checks.robots ? 1 : 0,
    validation.checks.sitemap ? 1 : 0,
    indexNow.configured ? (indexNow.submitted ? 1 : 0) : null,
    indexNow.status ?? null,
    gsc.configured ? (gsc.submitted ? 1 : 0) : null,
    gsc.status ?? null,
    inspection.verdict ?? null,
    inspection.coverageState ?? null,
    inspection.indexingState ?? null,
    inspection.lastCrawlTime ?? null,
    JSON.stringify(result),
  ).run();

  return { configured: true, stored: true, id: write.meta?.last_row_id ?? null };
}

async function latestStatus(env, targetUrl) {
  if (!env.DISCOVERY_DB) return { configured: false, reason: 'DISCOVERY_DB binding not configured' };
  const target = normalizeUrl(targetUrl);
  const row = await env.DISCOVERY_DB.prepare(`
    SELECT id, brand, url, processed_at, validation_ok, http_status, canonical_ok, robots_ok, sitemap_ok,
           indexnow_submitted, indexnow_status, gsc_sitemap_submitted, gsc_sitemap_status,
           google_verdict, google_coverage_state, google_indexing_state, google_last_crawl_time
    FROM discovery_runs
    WHERE url = ?
    ORDER BY processed_at DESC
    LIMIT 1
  `).bind(target).first();
  return { configured: true, found: Boolean(row), latest: row || null };
}

async function recentRuns(env, limit) {
  if (!env.DISCOVERY_DB) return { configured: false, reason: 'DISCOVERY_DB binding not configured' };
  const safeLimit = Math.min(Math.max(Number(limit) || 20, 1), 100);
  const result = await env.DISCOVERY_DB.prepare(`
    SELECT id, brand, url, processed_at, validation_ok, indexnow_submitted,
           gsc_sitemap_submitted, google_verdict, google_coverage_state, google_last_crawl_time
    FROM discovery_runs
    ORDER BY processed_at DESC
    LIMIT ?
  `).bind(safeLimit).all();
  return { configured: true, results: result.results || [] };
}

function authorized(request, env) {
  if (!env.ADMIN_TOKEN) return false;
  return request.headers.get('authorization') === `Bearer ${env.ADMIN_TOKEN}`;
}

async function readTarget(request, requestUrl) {
  let target = requestUrl.searchParams.get('url');
  if (request.method === 'POST') {
    const body = await request.json();
    target = body.url || target;
  }
  return target;
}

export default {
  async fetch(request, env) {
    const requestUrl = new URL(request.url);

    if (request.method === 'GET' && requestUrl.pathname === '/health') {
      return json({
        ok: true,
        service: 'rushdanrosdi-discovery-validator',
        phase: '2C',
        features: {
          validation: true,
          indexNow: Boolean(env.INDEXNOW_KEY),
          googleSearchConsole: Boolean(env.GOOGLE_SERVICE_ACCOUNT_EMAIL && env.GOOGLE_PRIVATE_KEY && env.GSC_SITE_URL),
          discoveryLog: Boolean(env.DISCOVERY_DB),
        },
      });
    }

    if (requestUrl.pathname === '/status') {
      if (request.method !== 'GET') return json({ ok: false, error: 'GET required.' }, 405);
      if (!authorized(request, env)) return json({ ok: false, error: 'Unauthorized.' }, 401);
      const target = requestUrl.searchParams.get('url');
      if (!target) return json({ ok: false, error: 'Missing url.' }, 400);
      try {
        return json({ ok: true, ...(await latestStatus(env, target)) });
      } catch (error) {
        return json({ ok: false, error: error instanceof Error ? error.message : String(error) }, 400);
      }
    }

    if (requestUrl.pathname === '/runs') {
      if (request.method !== 'GET') return json({ ok: false, error: 'GET required.' }, 405);
      if (!authorized(request, env)) return json({ ok: false, error: 'Unauthorized.' }, 401);
      try {
        return json({ ok: true, ...(await recentRuns(env, requestUrl.searchParams.get('limit'))) });
      } catch (error) {
        return json({ ok: false, error: error instanceof Error ? error.message : String(error) }, 400);
      }
    }

    if (requestUrl.pathname === '/discover') {
      if (request.method !== 'POST') return json({ ok: false, error: 'POST required.' }, 405);
      if (!authorized(request, env)) return json({ ok: false, error: 'Unauthorized.' }, 401);

      try {
        const target = await readTarget(request, requestUrl);
        if (!target) return json({ ok: false, error: 'Missing url.' }, 400);

        const validation = await validate(target, env);
        if (!validation.ok) {
          return json({ ok: false, stage: 'validation', validation }, 422);
        }

        const accessToken = await getGoogleAccessToken(env);
        const [indexNow, gscSitemap, googleInspection] = await Promise.all([
          submitIndexNow(validation.target, env),
          submitGoogleSitemap(accessToken, env),
          inspectGoogleUrl(validation.target, accessToken, env),
        ]);

        const result = {
          ok: validation.ok && (!indexNow.configured || indexNow.submitted) && (!gscSitemap.configured || gscSitemap.submitted),
          phase: '2C',
          processedAt: new Date().toISOString(),
          target: validation.target,
          validation,
          discovery: {
            indexNow,
            google: {
              sitemap: gscSitemap,
              inspection: googleInspection,
              note: 'URL Inspection reports the Google-indexed version/status; it is not a live indexing submission endpoint.',
            },
          },
        };

        const storage = await persistDiscoveryRun(env, result);
        return json({ ...result, storage });
      } catch (error) {
        return json({ ok: false, error: error instanceof Error ? error.message : String(error) }, 400);
      }
    }

    if (!['GET', 'POST'].includes(request.method)) {
      return json({ ok: false, error: 'Method not allowed' }, 405);
    }

    try {
      const target = await readTarget(request, requestUrl);
      if (!target) {
        return json({
          ok: false,
          error: 'Missing url. Use ?url=https://rushdanrosdi.com/.../ or POST {"url":"..."}.',
        }, 400);
      }
      return json(await validate(target, env));
    } catch (error) {
      return json({ ok: false, error: error instanceof Error ? error.message : String(error) }, 400);
    }
  },
};
