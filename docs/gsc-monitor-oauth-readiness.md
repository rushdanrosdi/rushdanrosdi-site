# Rushdan Indexing Monitor — OAuth page readiness

Prepared on 8 October 2026. Review-only change: do not merge or deploy without explicit approval. The app display name is **Rushdan Indexing Monitor**; GSC remains in the URL path and functional description, not the branded name.

## Public URLs after approved deployment

| Google Auth Platform field | Value |
| --- | --- |
| App name | Rushdan Indexing Monitor |
| Application home page | https://rushdanrosdi.com/tools/gsc-monitor/ |
| Application privacy policy | https://rushdanrosdi.com/tools/gsc-monitor/privacy/ |
| Application terms of service | https://rushdanrosdi.com/tools/gsc-monitor/terms/ |
| Authorized domain | rushdanrosdi.com |
| Site operator and published support contact | Rushdan Rosdi — rushdan@rushdanrosdi.com |
| Requested data access | https://www.googleapis.com/auth/webmasters.readonly |

The support email is verified against `src/components/Footer.astro`; it is not a newly invented address. Actual mailbox delivery and its eligibility in Google's support-email selector have not been tested. Select a monitored support address that Google permits and keep the website and consent screen contact details accurate. Set developer contact email(s) to monitored addresses as well.

## Verified deployment readiness

- GitHub source: `rushdanrosdi/rushdanrosdi-site`, production branch `main`.
- Cloudflare Pages project: `rushdanrosdi-site`, linked to that GitHub repository. Build command `npm run build`, output directory `dist`, root directory empty.
- Cloudflare custom domains include `rushdanrosdi.com` and `www.rushdanrosdi.com`. The `rushdanrosdi.com` zone is active and not paused.
- Current production deployment is successful at commit `3a692152b411aba41b43dcd3353a5a49d262616f`. No Cloudflare setting is changed by this PR.
- All three routes render static public HTML, without login, OAuth requests or credentials. They use the existing header, footer, colors and fonts, plus scoped layout styles.
- Every new route has one `noindex, follow` meta robots tag and its exact HTTPS canonical URL. They are excluded from the generated sitemap; existing robots.txt remains unchanged and permits crawling.
- Existing discovery workflow triggers only on `src/content/**` on `main`; no workflow or publishing content changes are included.
- Cloudflare auto-preview is enabled for all branches. The review commit is prefixed **`[CF-Pages-Skip]`** to omit preview deployment without modifying account-wide settings. Use the same prefix for review revisions. After approval, remove the prefix from the merge/squash commit message if the intention is to trigger the existing production pipeline.

An active Cloudflare domain does **not** prove Google's OAuth domain ownership verification. The current Google Cloud Branding configuration and ownership status were not inspected.

## Remaining owner setup

1. Approve this PR before merging or deploying. After approved deployment, verify all three exact public URLs return HTTP 200, have the intended content and do not redirect to another hostname or require sign-in. Check Google can access them without an edge challenge. Do not submit unpublished URLs for verification.
2. In the correct Google Cloud project, open **Google Auth Platform → Branding**. Use the exact name and URLs in the table. Add `rushdanrosdi.com` as an authorized domain, with no scheme or path.
3. Verify the **Domain property** `rushdanrosdi.com` in Search Console using a Google account that is a **Project Owner** of this Cloud project. Google's domain-verification guide currently calls for DNS-level verification. Reuse verified ownership only if the correct project owner's status is confirmed. Do not confuse monitored properties such as `rajathai.com` with the app's homepage domain.
4. Confirm support/developer emails. If supplying a logo, use the operator's own brand, ensure it matches the application, and avoid Google product icons or names. This PR adds no new logo.
5. In **Data Access**, declare only `webmasters.readonly`. Justification: identify authorized properties, check access to the configured property and read official URL Inspection snapshots for private indexing reports. No write scope, Gmail, Drive, contacts or profile scopes are needed by the prepared engine.
6. In **Audience**, select the appropriate configuration. Private operation does not automatically qualify for Google's **Internal** audience; that option is for an eligible Workspace/Cloud Identity organization. For a personal Gmail project, review the **External** personal-use exception and Google's Verification Center requirements. Verification and publishing state are separate; do not assume a private app must stay in Testing.
7. For unattended operation, resolve publishing state before final authorization. Google documents seven-day refresh-token expiry for External apps in Testing when requesting this scope. Production does not guarantee permanent tokens; revocation and expiry still require attention.
8. Complete brand verification and any data-access verification requested by Google unless an applicable exception is confirmed. If Google requests a demo, show the real English consent flow and how authorized inspection data is used; do not present fixture reports as production evidence.

## Runtime alignment and limits

The pages are grounded in `rushdanrosdi/rajathai-publishing` draft PR #1, head `f95cc2e89a2196e58a1cfac68eedae288f8059b5`, specifically `monitor/README.md`, `monitor/src/google.ts` and `monitor/src/worker.ts`. That engine remains separate from this static website.

- Prepared engine checks the exact configured property via `sites.list`, then uses the official URL Inspection API. The OAuth grant itself can expose multiple properties available to the consenting account.
- D1 retains full inspection history and technical/run records. There is no scheduled retention purge or self-service deletion endpoint. Deletion and disabling are operator-handled requests; no automatic deletion deadline is promised.
- Worker secrets hold OAuth client secret/refresh token and administrative token. Engine reports require token/session access; no individual user roles are implemented. Account-level permissions are Cloudflare's controls.
- Multiple properties require separate configurations and appropriate authorization. There is no public SaaS onboarding or Google sign-in button on these pages.
- Public copy explicitly says setup is in progress. After actual engine activation is verified, update that status through a separate reviewed change.
- This change does not implement OAuth callbacks. The prepared engine's documented client is a Desktop app with a local loopback authorization helper; these informational URLs must not be entered as redirect URIs. Confirm the actual chosen client type and implemented authorization flow separately.

## Validation

- Locked dependencies installed; local Astro build succeeds with 74 routes (71 existing, three new). The environment's pnpm wrapper reports blocked optional dependency build scripts; invoking the installed Astro CLI directly succeeds without lockfile or dependency changes.
- Parsed generated HTML: one H1, one correct robots tag, exact canonical URL, contact address and existing local link targets on all three pages.
- Compared the base and PR builds: all 71 existing pages are identical after normalizing the CSS bundle filename. Existing CSS content, robots.txt and both sitemap files are unchanged.
- Browser screenshot QA could not run: no installed Chromium executable, and the browser download returned an invalid archive in this environment. Desktop/mobile visual review remains pending; responsive styles reuse the existing site tokens and use wrapping navigation and long links.
- No production deployment, remote database migration, OAuth authorization or GitHub merge performed.

## Official references

- [Google application homepage requirements](https://support.google.com/cloud/answer/13807376)
- [Google privacy policy requirements](https://support.google.com/cloud/answer/13806988)
- [Google app identity and branding](https://support.google.com/cloud/answer/13804963)
- [Google domain verification](https://support.google.com/cloud/answer/13804266)
- [Google API Services User Data Policy](https://developers.google.com/terms/api-services-user-data-policy)
- [URL Inspection API and scopes](https://developers.google.com/webmaster-tools/v1/urlInspection.index/inspect)
- [Verification requirements and exceptions](https://developers.google.com/identity/protocols/oauth2/production-readiness/sensitive-scope-verification)
- [OAuth token expiration](https://developers.google.com/identity/protocols/oauth2#expiration)
- [Cloudflare Pages skip-build prefixes](https://developers.cloudflare.com/pages/configuration/git-integration/github-integration/#skipping-a-build-via-a-commit-message)
