# Nori Website

Standalone public website for Nori-Agent (Rein Agent), by Rein Protocol Foundation.

**Status:** The accepted v0.4 direction is implemented locally as a responsive React + TypeScript + Vite website. It has not been deployed.

## Purpose

Introduce Nori's vision as a super agent that supports an organization's operations over the long term. Rein Protocol Foundation, a nonprofit focused on AI safety and making AI agents safe for people and society, is the intended first organizational case study.

Website copy uses direct product-marketing language focused on Nori’s capabilities and organizational value. Capability-by-capability engineering verification is not a prerequisite for content design. Illustrative scenarios must not be presented as fabricated organizational records or measured outcomes.

## Project boundaries

- This repository, `rein-protocol-foundation/nori-website`, contains the public website only. All website code, assets, and pull requests belong here.
- The website’s Explore GitHub CTA links to the product source in [nori-agent](https://github.com/rein-protocol-foundation/nori-agent); this does not change the website development repository.
- Agent implementation remains in [nori-agent](https://github.com/rein-protocol-foundation/nori-agent).
- The administrative dashboard remains separate and access-restricted.
- See the [website content v0.4](docs/design/website-content-v0.4.md) and [accepted UI design v0.4](docs/design/ui-design-v0.4.md), including nine section images and interaction states. Earlier visual concepts remain available for comparison, not as approved designs.
- Framework: React + TypeScript + Vite, with a static production build. Website licensing remains undecided.

## Planned hosting

- Hosting provider: Vercel.
- Public website domain: `nori.rein-protocol.org`.
- That domain currently serves the administrative dashboard. Do not point it at the website until the dashboard migration has been completed and verified.
- Replacement dashboard subdomain: to be decided.
- No Vercel project, deployment, or DNS changes have been made during initialization.

See [setup and handoff](docs/setup-and-handoff.md) for the current state and next steps.

## Local development

Use Node.js 22.12 or later.

```sh
npm ci
npm run dev
npm run build
npm run preview
```

`npm run build` checks TypeScript and produces `dist/`. `npm test` runs Playwright in desktop Chrome and mobile Chrome emulation, including axe accessibility checks. Install Google Chrome (or run `npx playwright install chrome`) before running tests.

Content and case details live in `src/content.ts`; page components and interactions in `src/main.tsx`; responsive styles in `src/styles.css`. Manrope is served locally. Existing accepted art is reused as CSS-cropped character portraits and heads; no full concept image is used as a page section.

The website is a public marketing experience, without authentication or live organizational integrations. Case artifacts and dialogue are illustrative. All pilot and Discord links lead to the approved Discord invitation.
