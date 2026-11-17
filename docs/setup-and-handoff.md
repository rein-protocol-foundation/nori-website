# Initial setup and handoff

Date: 2026-11-11 (America/Los_Angeles)

Task: WEBSITE-INIT

Owner: Codex, for Rein Protocol Foundation

## Scope

Initialize a standalone GitHub repository and local checkout, then stop before website development. This is administrative setup and does not advance Nori-Agent product acceptance milestones.

## Decisions recorded

- Repository: `rein-protocol-foundation/nori-website`.
- Visibility: public, as explicitly requested by the user.
- Default branch: `main`.
- Local checkout: `~/Documents/Github Projects/nori-website`, alongside the existing agent checkout.
- Intended hosting: Vercel.
- Intended public domain: `nori.rein-protocol.org`.
- Framework and content: undecided.

## Domain migration dependency

Repository documentation identifies `nori.rein-protocol.org` as the current restricted dashboard. A read-only DNS lookup during setup returned `170.9.8.26`; this is an observation, not a complete infrastructure inventory.

Before eventual public-site cutover:

1. Agree on a replacement dashboard subdomain.
2. Inventory current routing, TLS, authentication, callback URLs, and dashboard links.
3. Configure and verify the dashboard at the replacement address, preserving access restrictions and data.
4. Prepare a rollback plan and verify the public website on Vercel.
5. Switch the public domain only within authorized deployment scope.

No dashboard migration, Vercel provisioning, or DNS mutation is part of this initialization.

## Verification and next step

- Repository contents are documentation and Git hygiene only; there is no application scaffold.
- Application build and tests: not applicable until implementation exists.
- Deployment and dashboard migration checks: pending future work.
- Next step: discuss audience, positioning, evidence-backed capability claims, organizational case study, and page content with the user before implementation.

## Local implementation handoff — 2026-11-13

The authorized first implementation uses React, Vite, TypeScript, and Three.js in the existing checkout on `tempest/recursive-nori-hero`. Scope is the shared visual foundations, floating Header, and recursive animated Hero. The current design brief was the creative input; later sections and the archived designs were not used.

Use `npm ci` and `npm run dev` for development, or `npm run build` followed by `npm run preview` for the production preview. Verification commands and scene architecture are documented in the root README. Generated captures remain local under ignored `artifacts/`.

The earlier “no application scaffold” and “framework undecided” notes describe the initial setup date. This local implementation supersedes them. It does not change hosting or dashboard-migration status. Deployment, DNS changes, and dashboard migration remain outside this iteration.


The subsequent authorized landing-page expansion adds all remaining sections from `docs/design/content.md`, responsive section navigation, and a footer. All action buttons now use text without arrows. The design decisions are recorded in `docs/design/design.md`; `npm run check:landing` adds page-wide layout, navigation, and accessibility checks. Product scenarios remain explicitly illustrative. This expands the local UI scope only; hosting and dashboard-migration status are unchanged.

## CI and Vercel connection — 2026-11-16

The user authorized website CI and connecting Vercel deployment. `.github/workflows/ci.yml`
runs the existing unit tests, typecheck/build, and four Chromium browser suites on pushes,
pull requests, and manual dispatch. Actions are pinned to release commit hashes, use only
read access, cancel superseded runs, and retain browser evidence for seven days.
`npm run test:browser` owns an isolated production preview server and closes it after checks.
Node 22 is declared in `.nvmrc` and package engines.

Created and locally linked [agi-studio/nori-website](https://vercel.com/agi-studio/nori-website),
alongside the foundation website. The project uses Node 22, Vite, `npm ci`,
`npm test && npm run build`, and `dist`. `vercel.json` keeps build settings in source control;
`.vercelignore` excludes design archives, local evidence, and environment files from uploads.
The generated `.vercel/` link and `.env.local` remain ignored and must never be committed.

The first deployment is ready at [nori-website-flax.vercel.app](https://nori-website-flax.vercel.app)
([build details](https://vercel.com/agi-studio/nori-website/8rwQ5fJbCJqw6cFumEq8ipAt8qGq)).
Vercel automatically assigned the first deployment to the project's production slot.
Its default Vercel authentication protection remains enabled. This is a generated Vercel
hostname, not the planned public-domain cutover.

After the user enabled the Vercel GitHub app, the native Git connection succeeded for
`rein-protocol-foundation/nori-website`. Automatic Git deployments are enabled, with
`main` as the production branch and other branches producing previews.
Native Git deployment needs no Vercel token in GitHub Actions.
GitHub browser checks currently report results independently of Vercel; branch protection
and Vercel Deployment Checks have not been configured as enforced production gates.

No DNS changes or dashboard migration are included. `nori.rein-protocol.org` retains its
existing dashboard routing; the migration dependency above still applies.

## Official domain and dashboard migration — 2026-11-16

This later, user-authorized cutover supersedes the hosting/migration limitations above.
The user selected `nori.rein-protocol.org` for the product incubated by Rein Protocol,
and explicitly selected `nori-admin.rein-protocol.org` for the restricted dashboard.

Cloudflare hosts authoritative DNS. The public site's former A record to `170.9.8.26`
was replaced with a DNS-only CNAME to Vercel's project recommendation,
`3dba79e10b6b159f.vercel-dns-017.com`, with a 300-second TTL. The new dashboard uses a
DNS-only A record to `170.9.8.26`, also with a 300-second TTL. The public domain is attached
to `agi-studio/nori-website`; no apex or foundation-website records were changed.

On OCI, Caddy now serves the dashboard and `/hooks/github` at the new admin hostname.
The dashboard hostname, Slack/Discord gateway allowed origins, and updater health-probe
forwarded hosts were migrated together. Existing login credentials and private state
were preserved. Dashboard sessions are host-only, so administrators sign in again at
the new address. The old OCI virtual host retains its webhook route and temporarily
redirects dashboard traffic to the admin hostname for clients with cached old DNS.

The existing `nori-agent` GitHub webhook (ID `704449982`) now targets
`https://nori-admin.rein-protocol.org/hooks/github`, with JSON payloads, TLS verification,
the original signing secret, and the existing `pull_request` subscription. A GitHub ping
returned HTTP 200. This checks the new endpoint, not a new application release or a
real-chat acceptance test. No deployment notification was deliberately sent.

Root-only rollback copies of Caddy, dashboard, gateway, and updater configuration are
on OCI under `/var/backups/nori-domain-20261116`. To roll back the website routing,
restore the former public A record. To roll back the dashboard migration, acquire the
updater lock, restore the saved configurations with their permissions, restore the
GitHub webhook URL with its existing JSON/signature settings, restart the affected
dashboard/gateway services, reload validated Caddy configuration, and verify access.
Keep the new admin hostname available until clients and callbacks have been checked.

Verification: Vercel reports the domain configured correctly; its HTTPS certificate
was issued successfully. The public hostname serves the expected website without
authentication at the Vercel edge. The new admin HTTPS login works with the existing
key, unauthenticated app requests require login, and authenticated Slack/Discord pages
return HTTP 200. The verification session was logged out. OCI services and deployment
watchers are healthy, with no pending deployment transaction or queue warnings.
Resolvers retaining the former A record may temporarily reach the old host until
their DNS cache expires. Browser/device regression suites were not rerun for this
infrastructure-only cutover; authenticated gateway WebSocket interaction and a new
merge-triggered agent release were not exercised.
