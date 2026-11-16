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

The Git connection attempt was blocked by Vercel: “To link a GitHub repository, you need
to install the GitHub integration first.” An organization administrator must grant the
[Vercel GitHub app](https://github.com/apps/vercel) access to
`rein-protocol-foundation/nori-website`. Then run:

```sh
vercel git connect https://github.com/rein-protocol-foundation/nori-website.git --yes
```

Verify automatic deployments are enabled, `main` is the production branch, and a branch
push produces a preview. Native Git deployment needs no Vercel token in GitHub Actions.
GitHub browser checks currently report results independently of Vercel; branch protection
and Vercel Deployment Checks have not been configured as enforced production gates.

No DNS changes or dashboard migration are included. `nori.rein-protocol.org` retains its
existing dashboard routing; the migration dependency above still applies.
