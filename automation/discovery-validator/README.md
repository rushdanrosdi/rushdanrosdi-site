# RushdanRosdi.com Level 2 — Discovery Validator & Submission

Cloudflare Worker for post-publication validation, IndexNow submission and Google Search Console observability.

## Level 2A validation

- URL is live
- HTTP status is 200
- canonical URL matches expected URL
- robots.txt allows the path
- URL exists in sitemap or child sitemap

## Level 2B discovery

After all Level 2A checks pass, `POST /discover` can:

- submit the URL to the global IndexNow endpoint
- submit/refresh the configured sitemap in Google Search Console
- inspect the current Google index status for the URL

Google URL Inspection is observability only. It reports the Google-indexed version/status; it is not a general live indexing-submission endpoint.

## Endpoints

### Health

```text
GET /health
```

### Validate only

```text
GET /?url=https://rushdanrosdi.com/lab/example/
```

### Validate + discovery

```http
POST /discover
Authorization: Bearer <ADMIN_TOKEN>
Content-Type: application/json

{"url":"https://rushdanrosdi.com/lab/example/"}
```

Discovery only runs if validation passes.

## Non-secret configuration

Configured in `wrangler.jsonc`:

- `SITE_ORIGIN`
- `ROBOTS_URL`
- `SITEMAP_URL`

## Cloudflare secrets / variables required for full 2B

```text
ADMIN_TOKEN
INDEXNOW_KEY
INDEXNOW_KEY_LOCATION
GOOGLE_SERVICE_ACCOUNT_EMAIL
GOOGLE_PRIVATE_KEY
GSC_SITE_URL
```

Recommended Search Console property value is whichever exact property is already configured in Search Console, for example:

```text
sc-domain:rushdanrosdi.com
```

or a URL-prefix property such as:

```text
https://rushdanrosdi.com/
```

The Google credential must have appropriate access to that Search Console property.

## IndexNow verification

The IndexNow key must be verifiable from `rushdanrosdi.com`. Either host `{INDEXNOW_KEY}.txt` at the domain root or provide a same-host `INDEXNOW_KEY_LOCATION` URL whose text response contains the key.

Do not commit private Google credentials or `ADMIN_TOKEN` to GitHub.

## Deploy

From repository root:

```bash
npx wrangler deploy --config automation/discovery-validator/wrangler.jsonc
```

Then configure the required secrets in Cloudflare and redeploy if needed.

## Expected discovery result

```json
{
  "phase": "2B",
  "validation": {
    "checks": {
      "live": true,
      "http200": true,
      "canonical": true,
      "robots": true,
      "sitemap": true
    }
  },
  "discovery": {
    "indexNow": {
      "submitted": true
    },
    "google": {
      "sitemap": {
        "submitted": true
      },
      "inspection": {
        "verdict": "...",
        "lastCrawlTime": "..."
      }
    }
  }
}
```

## Next: Level 2C

Persist each run and its results so publication/discovery status can be reviewed over time without relying on Worker logs alone.
