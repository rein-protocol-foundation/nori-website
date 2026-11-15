# Nori Website

Standalone public website for Nori-Agent, by Rein Protocol Foundation.

**Status:** Complete local landing-page UI: floating Header, animated Hero, physical employee badges, app-based operations, resources, community, communications, Rein, continuity, and open-source participation. Built with React, Vite, TypeScript, and Three.js. Scenarios are illustrative; this website does not establish that the agent implements the described workflows.

## Run locally

Requires Node.js 22.12+ (verified with 22.19) and npm.

```sh
npm ci
npm run dev
```

Vite serves the development site at `http://127.0.0.1:5173`. To inspect a production build:

```sh
npm run build
npm run preview
```

The production preview uses `http://127.0.0.1:4173`.

## Structure

- `src/components/`: semantic Header/Hero, responsive navigation, role portraits, scene lifecycle, and motion control.
- `src/components/sections/`: eight landing-page sections and the footer.
- `src/data/roles.ts`: the original role reference data.
- `src/styles/`: shared visual tokens, composition, responsive layouts, and focus states.
- `src/scene/identity.ts`: original cellular interpretation of the approved Nori identity.
- `src/scene/life.ts`: deterministic seed and pure Conway B3/S23 evolution with finite dead boundaries.
- `src/scene/choreography.ts`: active-time clock, eightfold zoom, and 28-second recursive loop.
- `src/scene/renderer.ts` and `shaders.ts`: Three.js resource management and cellular materials.
- `public/nori-cells.svg`: matching static fallback; generated from `portraitSvg()` in `identity.ts`.

## What the animation represents

A 128 × 128 binary grid is seeded with blocks, blinkers, and small interacting patterns arranged into Nori's silhouette. Twenty generations are precomputed using actual Conway B3/S23. Interpolation between adjacent generations softens the visual transition; the discrete states remain binary. The faint colored substrate identifies dormant sites independently of live microcells.

Recursive composition is staged. An exponential camera transform reveals an eightfold parent portrait. Spatial detail blending resolves the smaller portraits into the parent's cellular material; the freshly seeded parent becomes the next cycle's foreground. The hidden fine level resets at the seam. This is neither natural self-replication of the seed nor evidence of recursive self-improvement.

The scene uses a full-screen Three.js shader with shallow bevel shading rather than expensive physical 3D materials. DOM text and links stay above the scene. Pause stops both camera and state progression. Offscreen/hidden documents stop active time. Reduced motion, low-capability devices, sustained poor frame cadence, unavailable WebGL, shader failure, and context loss use a static composition. The frame-cadence fallback is a conservative heuristic, not a device benchmark. No animation controls are shown when the scene is static.

## Verification

```sh
npm test
npm run build
npx playwright install chromium
npm run preview
# In a second terminal:
npm run check:browser
npm run check:landing
```

The browser checks use the production preview by default; set `TEST_URL` to test another local server. They capture a complete loop and check pause/keyboard resume, responsive overflow, link targets, semantic headings, axe accessibility rules, offscreen suspension, live and initial reduced motion, missing/lost WebGL, and a low-capability device. Local screenshots, a recording, and the machine-readable result are written to ignored `artifacts/`.

The landing-page checks verify section navigation, text-only CTA destinations, mobile-menu keyboard behavior, layout at eight widths from 320–1440px, and desktop/mobile axe scans. They also capture each section and the full page.

Automated checks do not replace manual visual review, screen-reader testing, or testing real low-end phones. Chromium and the Codex in-app browser are the first-iteration verification targets; Safari/Firefox and physical-device performance remain to be checked.

## Project boundaries

- The authoritative creative brief is [design](docs/design/design.md). Page content is maintained in [content](docs/design/content.md).
- The agent implementation is [nori-agent](https://github.com/rein-protocol-foundation/nori-agent). This website does not run the agent or expose administrative data.
- Product copy and labeled scenarios describe the intended role of Nori; the animation makes no claim about operational results or implemented RSI.
- Hosting is planned for Vercel at `nori.rein-protocol.org`. That hostname currently serves the restricted dashboard and cannot be cut over until an agreed dashboard migration has been completed.
- Website licensing remains undecided. Bundled font licenses are included in `public/fonts/`. No publishing, DNS changes, or dashboard migration are part of this iteration.

See [setup and handoff](docs/setup-and-handoff.md) for repository and hosting context.

The revised work scenes are illustrative HTML reconstructions of software contexts, not live integrations or captures of organizational records. The Work background evolves a separate finite Conway grid, with pause, offscreen suspension, and reduced-motion handling. The supplied Nori portrait is stored in `public/nori-reference.png`; vendor marks under `public/brands/` come from Simple Icons and identify illustrative services.
