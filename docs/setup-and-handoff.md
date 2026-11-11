# Initial setup and handoff

Date: 2026-11-11 (America/Los_Angeles)

Task: WEBSITE-INIT

Owner: Codex, for Rein Protocol Foundation

## Scope

Initialize a standalone GitHub repository and local checkout, then stop before website development. This is administrative setup and does not advance Nori-Agent product acceptance milestones.

## Decisions recorded

- Repository: `rein-protocol-foundation/nori-website`.
- Initial visibility: private, pending an explicit decision to publish the source.
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
