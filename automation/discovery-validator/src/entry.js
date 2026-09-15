import worker from './index.js';

// Production entrypoint: IndexNow is opt-in.
// Default /discover requests run Google/GSC + validation + D1 only.
// Send { "url": "...", "includeIndexNow": true } to include IndexNow.
export default {
  async fetch(request, env, ctx) {
    const requestUrl = new URL(request.url);

    if (requestUrl.pathname !== '/discover' || request.method !== 'POST') {
      return worker.fetch(request, env, ctx);
    }

    let body;
    try {
      body = await request.clone().json();
    } catch {
      return worker.fetch(request, env, ctx);
    }

    const includeIndexNow = body?.includeIndexNow === true;
    const effectiveEnv = includeIndexNow
      ? env
      : { ...env, INDEXNOW_KEY: undefined, INDEXNOW_KEY_LOCATION: undefined };

    const forwarded = new Request(request.url, {
      method: request.method,
      headers: request.headers,
      body: JSON.stringify(body),
      redirect: request.redirect,
    });

    return worker.fetch(forwarded, effectiveEnv, ctx);
  },
};
