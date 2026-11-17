# Nori Website

Standalone public website for Nori-Agent, by Rein Protocol Foundation.

**Status:** Complete local landing-page UI: floating Header, animated Hero, interactive Nori role badges, app-based operations, resources, community, communications, Rein, continuity, and public-code participation. Built with React, Vite, TypeScript, Canvas 2D, and SVG. Scenarios are illustrative; this website does not establish that the agent implements the described workflows.

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

- `src/components/`: semantic Header/Hero, responsive navigation, role portraits, scene lifecycle, and reduced-motion support.
- `src/components/sections/`: the mission introduction, eight product chapters, and the footer.
- `src/data/roles.ts`: the original role reference data.
- `src/styles/`: shared visual tokens, composition, responsive layouts, and focus states.
- `src/scene/identity.ts`: original cellular interpretation of the approved Nori identity.
- `src/scene/life.ts`: deterministic seed and pure Conway B3/S23 evolution with finite dead boundaries.
- `src/scene/choreography.ts`: scroll progress, continuous assembly paths, and cellular generation mapping.
- `src/scene/renderer.ts`: demand-driven Canvas 2D composition.
- `src/scene/identity.ts`: also supplies the inline SVG fallback. `public/nori-cells.svg` is a decorative footer asset.

## What the animation represents

Four recognizable small Nori portraits form one larger portrait as the visitor scrolls. Continuous trajectories carry existing cells into the assembled identity. Conway B3/S23 births and deaths run in a separate deterministic layer; assembly is authored choreography, not a claim of natural self-replication or recursive self-improvement.

The sticky stage renders only when scroll, size, or visibility changes. There is no autoplay loop or visible motion control. Offscreen and hidden documents do not paint. Reduced motion and unavailable Canvas 2D use a static SVG portrait with the same readable DOM content and links. Badge entrances settle, while pointer drag and keyboard impulses remain available. Product-scene entrances and SVG storytelling run once for less than five seconds.

## Verification

```sh
npm test
npm run build
npx playwright install chromium
npm run preview
# In a second terminal:
npm run check:browser
npm run check:landing
node tests/badges.mjs
node tests/badge-layout.mjs
# Optional cross-engine checks (install matching engines once):
npx playwright install firefox webkit
TEST_BROWSER=firefox npm run check:landing
TEST_BROWSER=webkit npm run check:landing
```

The browser checks use the production preview by default; set `TEST_URL` to test another local server. They check scroll-driven assembly, smooth anchor navigation, idle/offscreen/hidden suspension, reduced motion, Canvas 2D failure, and mobile layout. Screenshots and machine-readable results are written to ignored `artifacts/`.

The landing-page checks verify section navigation, working anchor targets, mobile-menu keyboard behavior, layout at eight widths from 320–1440px, and desktop/mobile axe scans. They also capture each section and the full page.

Automated checks do not replace manual visual review, screen-reader testing, or testing real low-end phones. The 2026-11-16 redesign passes the landing checks in Chromium, Firefox, and WebKit. This covers eight viewport widths, keyboard navigation, and desktop/mobile axe scans. The animation and badge interaction suites pass in Chromium. Actual Safari/iOS devices, assistive-technology use, and real low-end phone performance remain unverified. WebKit automation is not a substitute for device testing.

## CI and Vercel

Changes limited to `README.md` and Markdown under `docs/` run a diff check and skip
application suites. Code, assets, dependencies, CI configuration, and manual runs execute
the full checks under the same `Website checks` status.

CI enforces executable behavior, accessibility, and layout integrity. Brand placement, exact
copy, example amounts, approved-word lists, and aesthetic proportions belong in human
content/design review, not merge-blocking assertions.

GitHub Actions runs `Website checks` on pushes and pull requests: a locked npm install,
unit tests, TypeScript/Vite build, and the Chromium animation, landing-page, accessibility,
and badge suites. Screenshots and reports are retained for seven days. Run the same
browser suites locally with `npm run build && npm run test:browser`; the runner starts
and closes its own production preview. Install Chromium first with `npx playwright install chromium`.

The Vercel project is `agi-studio/nori-website`, with Node 22, the Vite preset,
`npm ci`, `npm test && npm run build`, and output directory `dist`. No deployment token
is stored in the repository. GitHub integration setup and domain migration status are
tracked in [setup and handoff](docs/setup-and-handoff.md).

Vercel builds run unit tests and typechecks. GitHub browser checks are separate; they
do not automatically block Vercel promotion. Require `Website checks` in branch rules
and configure Vercel Deployment Checks before relying on it as a production gate.

## Project boundaries

- The authoritative creative brief is [design](docs/design/design.md). Page content is maintained in [content](docs/design/content.md).
- The agent implementation is [nori-agent](https://github.com/rein-protocol-foundation/nori-agent). This website does not run the agent or expose administrative data.
- Product copy and labeled scenarios describe the intended role of Nori; the animation makes no claim about operational results or implemented RSI.
- Vercel hosting is configured at [nori-website-flax.vercel.app](https://nori-website-flax.vercel.app), with Vercel authentication protection enabled. The planned `nori.rein-protocol.org` hostname currently serves the restricted dashboard and cannot be cut over until an agreed dashboard migration has been completed.
- Website licensing remains undecided. Bundled font licenses are included in `public/fonts/`. DNS changes and dashboard migration are outside this CI and hosting setup.

See [setup and handoff](docs/setup-and-handoff.md) for repository and hosting context.

The application scenes reconstruct familiar software interfaces with sample data; they are not live integrations or records of organizational outcomes. One discreet footer disclosure covers the walkthroughs. Slack, Lark, Google Docs/Calendar, iMessage/Stripe, Discord/GitHub, X, Instagram, and Gmail each have a distinct task and interface. Rein's official public mark and observed cream/brown/orange palette are documented with primary sources in the design notes.

The UI bundles Latin Manrope locally and uses a system serif for the Rein chapter. Five lazy-loaded role WebPs total about 190 KB, with a 3 KB Nori avatar. Original approved portraits remain available. No private screenshot messages, personal contact details, organizational financial data, or partner claims are included.
