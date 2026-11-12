# Nori Website

Standalone public website for Nori-Agent (Rein Agent), by Rein Protocol Foundation.

**Status:** UI design v0.4 has been accepted as the direction for the website; content and design artifacts are documented. No website has been developed or deployed.

## Purpose

Introduce Nori's vision as a super agent that supports an organization's operations over the long term. Rein Protocol Foundation, a nonprofit focused on AI safety and making AI agents safe for people and society, is the intended first organizational case study.

Website copy must distinguish demonstrated capabilities from product goals. Any claim about autonomous operations or outcomes needs supporting evidence before publication.

## Project boundaries

- This repository contains the public website only.
- Agent implementation remains in [nori-agent](https://github.com/rein-protocol-foundation/nori-agent).
- The administrative dashboard remains separate and access-restricted.
- See the [website content v0.4](docs/design/website-content-v0.4.md) and [accepted UI design v0.4](docs/design/ui-design-v0.4.md), including nine section images and interaction states. Earlier visual concepts remain available for comparison, not as approved designs.
- Framework and licensing remain undecided. Website implementation has not started.

## Planned hosting

- Hosting provider: Vercel.
- Public website domain: `nori.rein-protocol.org`.
- That domain currently serves the administrative dashboard. Do not point it at the website until the dashboard migration has been completed and verified.
- Replacement dashboard subdomain: to be decided.
- No Vercel project, deployment, or DNS changes have been made during initialization.

See [setup and handoff](docs/setup-and-handoff.md) for the current state and next steps.
