# Rushdan Indexing Monitor — OAuth page readiness

Prepared on 8 October 2026. Review-only change: do not merge or deploy without explicit approval. The app display name is **Rushdan Indexing Monitor**; GSC remains in the URL path and functional description, not the branded name.

**Current owner-confirmed setup:** Google OAuth Branding still uses **Raja Thai GSC Monitor**. The existing OAuth client is a **Web application**, and authorization uses **Google OAuth Playground**. These facts come from the owner's final review instructions, not a fresh inspection of the signed-in Google console. After approved page deployment and public URL checks, manually change Branding to **Rushdan Indexing Monitor** and save the three URLs below. This PR does not rename the Google app, change credentials or create a new OAuth client.

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

An active Cloudflare domain does **not** prove Google's OAuth domain ownership verification. Branding's current name is owner-confirmed above; the signed-in console, domain ownership status, actual redirect configuration and credential validity were not independently inspected.

## Approved production method (to use only after approval)

GitHub reports that squash merge is enabled for this repository. Use **Squash and merge** into `main`, not rebase-and-merge: rebase would retain the review commits and their deployment-skip prefixes.

Explicitly replace the final squash title and body with:

```text
Add OAuth information pages for Rushdan Indexing Monitor

Publish the application homepage, privacy policy and terms for private read-only indexing monitoring. Preserve existing website content and publishing workflows.
```

Before confirming, inspect both fields and ensure none of the Cloudflare skip markers remains: `[CF-Pages-Skip]`, `[CI Skip]`, `[CI-Skip]`, `[Skip CI]`, `[Skip-CI]` (case-insensitive). Do not accept GitHub's auto-generated body containing review commit titles. After approval, the merge operation must supply this clean title/body explicitly; nothing has been merged now. This ensures the production commit message does not retain the skip prefix. The existing Pages integration can then build `main`; successful deployment still requires post-merge checks.

## Existing Web client and OAuth Playground flow

Use the existing **Web application** client; do not use the Desktop client/loopback helper described in the engine's older setup notes for this deployment. The runtime's refresh-token exchange accepts the existing Web client's credentials; these website pages implement no callback or token handling.

For a future owner-run authorization or troubleshooting session:

1. In that Web client, confirm the exact authorized redirect URI is `https://developers.google.com/oauthplayground` (no trailing slash). The public homepage/privacy/terms URLs are Branding links, not redirect URIs. Do not alter a working client as part of this PR.
2. Open [Google OAuth Playground](https://developers.google.com/oauthplayground/). In configuration select Google's endpoints, Server-side flow, Offline access and **Use your own OAuth credentials**. Enter the existing client's values privately in Google's UI, never in chat, screenshots, source files or PR text. Do not use the Playground's default shared client.
3. Enter only `https://www.googleapis.com/auth/webmasters.readonly`, authorize with the account permitted to access the configured property, and exchange the authorization code for tokens. If a refresh token is needed, review consent/offline settings. Default Playground tokens are automatically revoked after 24 hours; using your own client avoids that Playground-specific expiry, but Google's other expiry/revocation rules still apply.
4. Keep the current runtime secret values unchanged unless a separately authorized credential update is necessary. The client ID, client secret and refresh token must belong to the same existing client. Use Cloudflare's secret fields for any separately approved installation; never create a Playground share link containing credentials or tokens.

Playground proxies the authorization-code/token exchange through Google's server and shows tokens in its UI. The operator handles that one-time setup; the ongoing Worker refreshes tokens directly with Google. A new authorization, credential rotation and secret writes are outside this PR.

## Remaining owner setup

1. Approve this PR before merging or deploying using the clean squash method above. After approved deployment, verify all three exact public URLs return HTTP 200, have the intended page title/H1/body and do not redirect to another hostname or require sign-in. The current unpublished routes can return HTTP 200 with the site's normal homepage as a fallback; status alone is insufficient. Check Google can access them without an edge challenge. Do not submit unpublished URLs for verification.
2. After deployment, in the correct Google Cloud project open **Google Auth Platform → Branding**. Manually replace **Raja Thai GSC Monitor** with **Rushdan Indexing Monitor** and use the exact URLs in the table. Add `rushdanrosdi.com` as an authorized domain, with no scheme or path. A name mismatch remains until this manual step is completed.
3. Verify the **Domain property** `rushdanrosdi.com` in Search Console using a Google account that is a **Project Owner** of this Cloud project. Google's domain-verification guide currently calls for DNS-level verification. Reuse verified ownership only if the correct project owner's status is confirmed. Do not confuse monitored properties such as `rajathai.com` with the app's homepage domain.
4. Confirm support/developer emails. If supplying a logo, use the operator's own brand, ensure it matches the application, and avoid Google product icons or names. This PR adds no new logo.
5. In **Data Access**, declare only `webmasters.readonly`. Justification: identify authorized properties, check access to the configured property and read official URL Inspection snapshots for private indexing reports. No write scope, Gmail, Drive, contacts or profile scopes are needed by the prepared engine.
6. In **Audience**, select the appropriate configuration. Private operation does not automatically qualify for Google's **Internal** audience; that option is for an eligible Workspace/Cloud Identity organization. For a personal Gmail project, review the **External** personal-use exception and Google's Verification Center requirements. Verification and publishing state are separate; do not assume a private app must stay in Testing.
7. For unattended operation, resolve publishing state before final authorization. Google documents seven-day refresh-token expiry for External apps in Testing when requesting this scope. Production does not guarantee permanent tokens; revocation and expiry still require attention.
8. Complete brand verification and any data-access verification requested by Google unless an applicable exception is confirmed. If Google requests a demo, show the actual Web-client/Playground consent flow and how authorized inspection data is used; do not present fixture reports as production evidence. Before verification or inviting another user, ensure the engine's own authorization instructions/login/report interface prominently links to this privacy policy. The existing engine interface was not changed by this website-only PR.

## Runtime alignment and limits

The pages are grounded in `rushdanrosdi/rajathai-publishing` draft PR #1, head `f95cc2e89a2196e58a1cfac68eedae288f8059b5`, specifically `monitor/README.md`, `monitor/src/google.ts` and `monitor/src/worker.ts`. That engine remains separate from this static website.

- Prepared engine checks the exact configured property via `sites.list`, then uses the official URL Inspection API. The OAuth grant itself can expose multiple properties available to the consenting account.
- D1 retains full inspection history and technical/run records. There is no scheduled retention purge or self-service deletion endpoint. Deletion and disabling are operator-handled requests; no automatic deletion deadline is promised.
- Worker secrets hold OAuth client secret/refresh token and administrative token. Engine reports require token/session access; no individual user roles are implemented. Account-level permissions are Cloudflare's controls.
- Multiple properties require separate configurations and appropriate authorization. There is no public SaaS onboarding or Google sign-in button on these pages.
- Public copy explicitly says setup is in progress. After actual engine activation is verified, update that status through a separate reviewed change.
- This change implements no OAuth callbacks. The actual owner-selected setup uses the existing Web application client and OAuth Playground, as documented above. The older Desktop/loopback helper is an alternative implementation in the separate engine repository and is not this deployment's authorization path.

## Google page requirements recheck

The homepage identifies the application/operator, explains functionality and the purpose of data access, and links to the dedicated privacy policy. The privacy policy is visible HTML on the same domain and describes permissions, use, storage, sharing, retention and deletion. No Google login is required to read any of these pages.

`noindex, follow` discourages search listing; it is not authentication or a crawl block. Google must still fetch the pages to read that directive. Keep robots.txt permissive and avoid Cloudflare Access, challenges or redirect rules that prevent review. A canonical tag identifies the preferred URL; it does not itself redirect visitors or override noindex. Local HTML accessibility can be checked before deployment, but public HTTP 200 responses and Google review access cannot be confirmed for unpublished routes.

## Validation

- Locked dependencies installed; local Astro build succeeds with 74 routes (71 existing, three new). The environment's pnpm wrapper reports blocked optional dependency build scripts; invoking the installed Astro CLI directly succeeds without lockfile or dependency changes.
- Parsed generated HTML: one H1, one correct robots tag, exact canonical URL, contact address and existing local link targets on all three pages.
- Compared the base and PR builds: all 71 existing pages are identical after normalizing the CSS bundle filename. Existing CSS content, robots.txt and both sitemap files are unchanged.
- Browser screenshot QA could not run: no installed Chromium executable, and the browser download returned an invalid archive in this environment. Desktop/mobile visual review remains pending; responsive styles reuse the existing site tokens and use wrapping navigation and long links.
- Final review reran both base and changed Astro builds. All three routes returned HTTP 200 from a temporary local static server and passed parsed HTML/canonical/robots/internal-link checks. Regression checks again confirmed all 71 existing pages unchanged apart from CSS filenames, with unchanged CSS content, robots and sitemaps. This is local HTTP/HTML validation, not visual QA or proof of production availability.
- A fresh Chromium installation attempt still failed with an invalid downloaded archive; no desktop/mobile screenshots were obtained and no visual pass is claimed.
- Fresh public checks on the unpublished homepage/privacy URLs returned HTTP 200 with title `Rushdan Rosdi — AI Search & Visibility Specialist`, the ordinary site homepage. This fallback is not the application content and is not ready for OAuth review. Exact application titles/body, noindex and canonical tags must be confirmed after the approved deployment.
- No production deployment, remote database migration, OAuth authorization or GitHub merge performed.

## Final recommendation and remaining checks

**GO for the page PR after explicit merge/deployment approval**, with the documented visual-QA limitation. No build or existing-site regression blocker was found. **NO-GO for declaring OAuth verification/operational readiness now.** Remaining checks are:

- Approved deployment and proof that each public URL serves its actual page rather than the homepage fallback.
- Manual Branding rename from `Raja Thai GSC Monitor` to `Rushdan Indexing Monitor`, with matching page URLs and eligible monitored contact emails.
- Google project-owner domain ownership, scope/audience/publishing state and any required verification remain unconfirmed.
- A prominent privacy link in the engine's own authorization/login/report context must be checked before verification or additional-user access. This PR only changes the website.
- Responsive desktop/mobile visual review remains outstanding; build and HTML checks do not substitute for it.

The existing Web client/Playground flow is documented without reading or changing credentials. This PR does not validate its live token grant or activate the monitoring engine.

## Official references

- [Google application homepage requirements](https://support.google.com/cloud/answer/13807376)
- [Google privacy policy requirements](https://support.google.com/cloud/answer/13806988)
- [Google app identity and branding](https://support.google.com/cloud/answer/13804963)
- [Google domain verification](https://support.google.com/cloud/answer/13804266)
- [Google API Services User Data Policy](https://developers.google.com/terms/api-services-user-data-policy)
- [URL Inspection API and scopes](https://developers.google.com/webmaster-tools/v1/urlInspection.index/inspect)
- [Verification requirements and exceptions](https://developers.google.com/identity/protocols/oauth2/production-readiness/sensitive-scope-verification)
- [OAuth token expiration](https://developers.google.com/identity/protocols/oauth2#expiration)
- [Google OAuth Playground configuration](https://developers.google.com/oauthplayground/)
- [Web application OAuth flow](https://developers.google.com/identity/protocols/oauth2/web-server)
- [Google noindex and crawling](https://developers.google.com/search/docs/crawling-indexing/block-indexing)
- [Cloudflare Pages skip-build prefixes](https://developers.cloudflare.com/pages/configuration/git-integration/github-integration/#skipping-a-build-via-a-commit-message)
