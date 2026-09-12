# RushdanRosdi.com Level 2A — Discovery Validator

This Cloudflare Worker validates the crawl/discovery readiness of a RushdanRosdi.com URL after publication.

## Checks

- URL is live
- HTTP status is 200
- canonical URL matches the expected URL
- robots.txt allows the path
- URL exists in the configured sitemap or one of its child sitemaps

## Endpoints

### Health

```text
GET /health
```

### Validate URL

```text
GET /?url=https://rushdanrosdi.com/lab/example/
```

or:

```http
POST /
Content-Type: application/json

{"url":"https://rushdanrosdi.com/lab/example/"}
```

The Worker only accepts URLs on `https://rushdanrosdi.com`.

## Deploy

From the repository root:

```bash
npx wrangler deploy --config automation/discovery-validator/wrangler.jsonc
```

For the first Level 2A test, a `workers.dev` URL is sufficient. A custom API route can be added later without changing the validation logic.

## Example result

```json
{
  "ok": true,
  "checks": {
    "live": true,
    "http200": true,
    "canonical": true,
    "robots": true,
    "sitemap": true
  }
}
```

## Scope

This is Level 2A only. It does not submit IndexNow, call Google Search Console, or persist discovery state. Those belong to Level 2B and Level 2C.
