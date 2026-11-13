# Nori Website

Standalone public website for Nori-Agent (Rein Agent), by Rein Protocol Foundation.

**Status:** Current content and design requirements are consolidated in two documents. This branch contains documentation and reference assets only; the previous website implementation is excluded. The website has not been deployed.

## Purpose

Introduce Nori's vision as a super agent that supports an organization's operations over the long term. Rein Protocol Foundation, a nonprofit focused on AI safety and making AI agents safe for people and society, is the intended first organizational case study.

Website copy must distinguish demonstrated capabilities from product goals. Any claim about autonomous operations or outcomes needs supporting evidence before publication.

## Project boundaries

- This repository contains the public website only.
- Agent implementation remains in [nori-agent](https://github.com/rein-protocol-foundation/nori-agent).
- The administrative dashboard remains separate and access-restricted.
- Current design sources: [design](docs/design/design.md) and [content](docs/design/content.md). Nine section references and three essential reference assets remain available. [Historical design archive](docs/archive/design-history-2026-11-12.zip) is for recovery, not normal implementation context.
- The design guidance retains React / TypeScript / Vite as the implementation direction. Application code is not included in this documentation branch. Website licensing remains undecided.

## Planned hosting

- Hosting provider: Vercel.
- Public website domain: `nori.rein-protocol.org`.
- That domain currently serves the administrative dashboard. Do not point it at the website until the dashboard migration has been completed and verified.
- Replacement dashboard subdomain: to be decided.
- No Vercel project, deployment, or DNS changes have been made during initialization.

See [setup and handoff](docs/setup-and-handoff.md) for the current state and next steps.
