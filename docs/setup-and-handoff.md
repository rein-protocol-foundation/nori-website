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

## Updated handoff — 2026-11-12

- UI v0.4 is accepted; content and UI documents govern the current design. Framework selection and implementation await explicit authorization.
- Discord and pilot-organization CTAs use https://discord.gg/m8qnWv9XX ; pilot inquiries start in the community.
- Domain cutover and dashboard migration are deferred until development is complete and launch is being prepared. They do not block local development. The migration checks above still apply before cutover.

- Website implementation, assets, and PRs belong exclusively to `rein-protocol-foundation/nori-website`. The Explore GitHub CTA points visitors to the product source at https://github.com/rein-protocol-foundation/nori-agent . The separate `nori-agent` repository is not the website development or submission target.

## Local implementation handoff — 2026-11-12

The user explicitly authorized framework selection and local implementation on a new branch, `tempest/implement-nori-website`. This supersedes the earlier implementation hold for this task. React, TypeScript, and Vite provide a static build in `dist/`; no backend, account connection, or dashboard dependency is introduced. See the root README for local commands.

Use Vercel’s Vite build settings (`npm run build`, output `dist`) when deployment is separately authorized. No Vercel resources, publication, DNS changes, or dashboard migration were performed. The existing domain migration dependency above remains in force.
