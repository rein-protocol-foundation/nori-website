import { chromium, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";

const baseURL = process.env.TEST_URL || "http://127.0.0.1:4173";
const output = "artifacts";
await mkdir(output, { recursive: true });
const browser = await chromium.launch();
const results = [];
const errors = [];
const canvasFor = (page) => page.locator(".cellular-scene canvas");
const collectErrors = (page) =>
  page.on("pageerror", (error) => errors.push(error.message));
const rendererRequest = (url) =>
  /\/scene\/renderer\.|\/assets\/renderer[-.]/.test(url);
const stateFor = (page) =>
  canvasFor(page).evaluate((canvas) => ({
    phase: Number(canvas.dataset.phase),
    generation: Number(canvas.dataset.generation),
    cycle: Number(canvas.dataset.cycle),
    paints: Number(canvas.dataset.paints),
  }));
const elapsedFor = (state) => (state.cycle + state.phase) * 20;
async function returnToHero(page) {
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await expect(page.locator(".hero h1")).toBeInViewport();
}
async function frameFor(page, screenshotPath) {
  const frame = await canvasFor(page).evaluate((canvas) => {
    const context = canvas.getContext("2d");
    const { width, height } = canvas;
    const pixels = context.getImageData(0, 0, width, height).data;
    const sample = [];
    // Sample the actual rendered artwork, avoiding the left-hand reading area.
    for (let y = 0; y < 64; y++) {
      for (let x = 0; x < 64; x++) {
        const px = Math.floor(width * (0.42 + (x / 64) * 0.56));
        const py = Math.floor(height * (0.03 + (y / 64) * 0.94));
        const index = (py * width + px) * 4;
        sample.push(pixels[index], pixels[index + 1], pixels[index + 2]);
      }
    }
    return {
      phase: Number(canvas.dataset.phase),
      cycle: Number(canvas.dataset.cycle),
      generation: Number(canvas.dataset.generation),
      paints: Number(canvas.dataset.paints),
      image: canvas.toDataURL(),
      sample,
    };
  });
  const { image, ...state } = frame;
  if (screenshotPath)
    await writeFile(screenshotPath, Buffer.from(image.split(",")[1], "base64"));
  return { ...state, hash: createHash("sha256").update(image).digest("hex") };
}
const pixelDelta = (before, after) =>
  before.sample.reduce(
    (total, value, index) => total + Math.abs(value - after.sample[index]),
    0,
  ) / before.sample.length;
const frameEvidence = ({ sample, ...state }) => state;
async function expectStatic(page) {
  await expect(page.locator(".cellular-scene")).not.toHaveClass(/is-ready/);
  await expect(page.locator(".scene-fallback img")).toBeVisible();
  await expect
    .poll(() =>
      page
        .locator(".scene-fallback img")
        .evaluate((image) => image.complete && image.naturalWidth > 0),
    )
    .toBe(true);
  await expect(page.locator("h1")).toBeVisible();
  await expect(page.locator(".hero a.button-primary")).toHaveAttribute(
    "href",
    "https://discord.gg/m8qnWv9XX",
  );
}
try {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 960 },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  collectErrors(page);
  await page.goto(baseURL);
  await page.locator(".cellular-scene.is-ready").waitFor();
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator(".hero h1")).toHaveText(
    "Your mission.Nori’s work.",
  );
  await expect(
    page.locator(
      ".hero button, .hero .motion-control, .hero .scene-caption, .hero .static-label",
    ),
  ).toHaveCount(0);
  await expect(page.locator(".hero .button-primary")).toHaveText(
    "Meet Nori on Discord",
  );
  await expect(page.locator(".hero .hero-community-note")).toHaveText(
    "Meet Nori in the Rein Protocol Foundation community.",
  );
  await expect(page.locator(".hero .button-secondary")).toHaveText(
    "See Nori at work",
  );
  await expect(page.locator(".hero .button-secondary")).toHaveAttribute(
    "href",
    "#work",
  );
  const layout = await page.locator(".hero").evaluate((hero) => ({
    height: hero.getBoundingClientRect().height,
    viewport: innerHeight,
    stagePosition: getComputedStyle(hero.querySelector(".hero-stage")).position,
  }));
  expect(layout.height).toBeLessThanOrEqual(Math.max(800, layout.viewport) + 2);
  expect(layout.stagePosition).not.toBe("sticky");
  const initial = await frameFor(page);
  await page.screenshot({ path: `${output}/hero-start.png` });
  await page.waitForTimeout(800);
  const animated = await frameFor(page);
  expect(await page.evaluate(() => scrollY)).toBe(0);
  expect(elapsedFor(animated)).toBeGreaterThan(elapsedFor(initial));
  expect(animated.paints).toBeGreaterThan(initial.paints);
  expect(animated.generation).not.toBe(initial.generation);
  expect(
    animated.hash,
    "Autoplay must change real canvas pixels without scrolling",
  ).not.toBe(initial.hash);
  results.push({
    check:
      "autoplay changes timeline, Conway generation, and canvas pixels without scrolling",
    initial: frameEvidence(initial),
    animated: frameEvidence(animated),
  });

  const beforeScroll = await stateFor(page);
  const scrollStarted = Date.now();
  await page.evaluate(() => window.scrollTo({ top: 140, behavior: "instant" }));
  await page.waitForTimeout(80);
  await returnToHero(page);
  const afterScroll = await stateFor(page);
  const wallSeconds = (Date.now() - scrollStarted) / 1000;
  expect(elapsedFor(afterScroll)).toBeGreaterThanOrEqual(
    elapsedFor(beforeScroll),
  );
  expect(elapsedFor(afterScroll) - elapsedFor(beforeScroll)).toBeLessThan(
    wallSeconds + 0.15,
  );
  results.push({
    check: "scrolling does not seek or reset the autoplay timeline",
    timelineSeconds: elapsedFor(afterScroll) - elapsedFor(beforeScroll),
    wallSeconds,
  });

  // Wait through a real 20-second cycle. Capture both sides of its actual wrap,
  // then compare canvas pixels as well as public timeline diagnostics.
  const beforeLoopWait = await stateFor(page);
  const targetCycle =
    beforeLoopWait.cycle + (beforeLoopWait.phase >= 0.995 ? 1 : 0);
  const untilSeam =
    (targetCycle + 0.995 - beforeLoopWait.cycle - beforeLoopWait.phase) *
    20_000;
  await page.waitForTimeout(Math.max(0, untilSeam));
  const seamBefore = await frameFor(page, `${output}/hero-loop-before.png`);
  expect(seamBefore.phase).toBeGreaterThan(0.97);
  await expect
    .poll(async () => (await stateFor(page)).cycle, {
      timeout: 2000,
      intervals: [10],
    })
    .toBeGreaterThan(seamBefore.cycle);
  const seamAfter = await frameFor(page, `${output}/hero-loop-after.png`);
  expect(seamAfter.cycle).toBe(seamBefore.cycle + 1);
  expect(seamAfter.phase).toBeLessThan(0.04);
  expect(seamAfter.hash).not.toBe(seamBefore.hash);
  const seamDelta = pixelDelta(seamBefore, seamAfter);
  expect(
    seamDelta,
    "loop boundary should preserve the recursive composition without a hard visual reset",
  ).toBeLessThan(12);
  const remainingCycleTime = 20 - (elapsedFor(seamAfter) - elapsedFor(initial));
  if (remainingCycleTime > 0)
    await page.waitForTimeout(remainingCycleTime * 1000 + 80);
  const completedLoop = await stateFor(page);
  expect(
    elapsedFor(completedLoop) - elapsedFor(initial),
  ).toBeGreaterThanOrEqual(20);
  results.push({
    check: "20-second autoplay cycle wraps with continuous canvas composition",
    before: frameEvidence(seamBefore),
    after: frameEvidence(seamAfter),
    meanChannelDeltaAtSeam: seamDelta,
    elapsedVisibleSeconds: elapsedFor(completedLoop) - elapsedFor(initial),
  });

  await page.evaluate(() =>
    window.scrollTo({
      top: document.querySelector(".hero").offsetHeight + 200,
      behavior: "instant",
    }),
  );
  await expect
    .poll(() =>
      page
        .locator(".cellular-scene")
        .evaluate((element) => element.getBoundingClientRect().bottom < 0),
    )
    .toBe(true);
  await page.waitForTimeout(100);
  const offscreen = await frameFor(page);
  await page.waitForTimeout(1600);
  const stillOffscreen = await frameFor(page);
  expect(stillOffscreen.paints).toBe(offscreen.paints);
  expect(elapsedFor(stillOffscreen)).toBe(elapsedFor(offscreen));
  expect(stillOffscreen.hash).toBe(offscreen.hash);
  await returnToHero(page);
  await expect
    .poll(async () => (await stateFor(page)).paints)
    .toBeGreaterThan(offscreen.paints);
  const resumed = await stateFor(page);
  expect(elapsedFor(resumed) - elapsedFor(offscreen)).toBeLessThan(0.5);
  await page.waitForTimeout(250);
  expect(elapsedFor(await stateFor(page))).toBeGreaterThan(elapsedFor(resumed));
  results.push({
    check:
      "offscreen timeline and pixels freeze; returning resumes without counting hidden time",
    frozen: frameEvidence(offscreen),
    resumed,
  });

  await page.evaluate(() => {
    Object.defineProperty(document, "visibilityState", {
      configurable: true,
      get: () => "hidden",
    });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  const hidden = await frameFor(page);
  await page.waitForTimeout(1600);
  const stillHidden = await frameFor(page);
  expect(stillHidden.paints).toBe(hidden.paints);
  expect(elapsedFor(stillHidden)).toBe(elapsedFor(hidden));
  expect(stillHidden.hash).toBe(hidden.hash);
  await page.evaluate(() => {
    delete document.visibilityState;
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await expect
    .poll(async () => (await stateFor(page)).paints)
    .toBeGreaterThan(hidden.paints);
  const visibleAgain = await stateFor(page);
  expect(elapsedFor(visibleAgain) - elapsedFor(hidden)).toBeLessThan(0.5);
  results.push({
    check:
      "visibilitychange suspends timeline and pixels, then resumes without a time jump",
    frozen: frameEvidence(hidden),
    resumed: visibleAgain,
  });

  // Sample actual scroll events: an anchor must travel through intermediate positions.
  await page.evaluate(() => {
    window.__heroScrollSamples = [];
    window.__captureHeroScroll = () =>
      window.__heroScrollSamples.push(window.scrollY);
    window.addEventListener("scroll", window.__captureHeroScroll, {
      passive: true,
    });
  });
  await page.locator(".hero .button-secondary").click();
  await expect
    .poll(() =>
      page
        .locator("#work")
        .evaluate((element) =>
          Math.abs(
            element.getBoundingClientRect().top -
              parseFloat(
                getComputedStyle(document.documentElement).scrollPaddingTop,
              ),
          ),
        ),
    )
    .toBeLessThan(8);
  const trajectory = await page.evaluate(() => {
    window.removeEventListener("scroll", window.__captureHeroScroll);
    return { positions: window.__heroScrollSamples, final: window.scrollY };
  });
  const intermediate = trajectory.positions.filter(
    (y) => y > 5 && y < trajectory.final - 5,
  );
  expect(
    intermediate.length,
    "CTA scroll should cross several intermediate positions",
  ).toBeGreaterThanOrEqual(3);
  expect(
    trajectory.positions.every((y, i, values) => i === 0 || y >= values[i - 1]),
  ).toBe(true);
  await expect(page.locator("#work")).toBeInViewport();
  results.push({
    check: "Hero CTA follows a smooth monotonic trajectory to #work",
    samples: trajectory.positions.length,
    intermediate: intermediate.length,
  });

  await returnToHero(page);
  const axe = await new AxeBuilder({ page })
    .include(".hero")
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(axe.violations).toHaveLength(0);
  results.push({ check: "desktop Hero axe", violations: axe.violations });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expectStatic(page);
  await page.screenshot({ path: `${output}/hero-reduced-motion.png` });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.locator(".cellular-scene.is-ready").waitFor();
  const recreated = await frameFor(page);
  await page.waitForTimeout(350);
  expect((await frameFor(page)).hash).not.toBe(recreated.hash);
  results.push({
    check:
      "live reduced-motion switch shows static portrait and safely recreates renderer",
    passed: true,
  });
  await context.close();

  const mobile = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 1,
    isMobile: true,
    hasTouch: true,
  });
  const phone = await mobile.newPage();
  collectErrors(phone);
  await phone.goto(baseURL);
  await phone.locator(".cellular-scene.is-ready").waitFor();
  await phone.evaluate(() => document.fonts.ready);
  await returnToHero(phone);
  const mobileStart = await frameFor(phone);
  await phone.screenshot({ path: `${output}/hero-mobile.png` });
  await phone.waitForTimeout(650);
  const mobileAnimated = await frameFor(phone);
  expect(mobileAnimated.hash).not.toBe(mobileStart.hash);
  expect(elapsedFor(mobileAnimated)).toBeGreaterThan(elapsedFor(mobileStart));
  await phone.screenshot({ path: `${output}/hero-mobile-animated.png` });
  for (const width of [320, 390, 699, 768]) {
    await phone.setViewportSize({ width, height: 844 });
    expect(
      await phone.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      `page overflow at ${width}px`,
    ).toBe(true);
  }
  await phone.setViewportSize({ width: 390, height: 844 });
  await returnToHero(phone);
  const mobileAxe = await new AxeBuilder({ page: phone })
    .include(".hero")
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(mobileAxe.violations).toHaveLength(0);
  results.push({
    check: "mobile autoplay pixels, 320/390/699/768px overflow, and Hero axe",
    violations: mobileAxe.violations,
  });
  await mobile.close();

  const reduced = await browser.newContext({
    reducedMotion: "reduce",
    viewport: { width: 390, height: 844 },
  });
  const still = await reduced.newPage();
  collectErrors(still);
  const fetched = [];
  still.on("request", (request) => fetched.push(request.url()));
  await still.goto(baseURL);
  await expectStatic(still);
  expect(fetched.some(rendererRequest)).toBe(false);
  await still.screenshot({ path: `${output}/hero-mobile-reduced-motion.png` });
  await still.keyboard.press("Tab");
  await expect(
    still.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await reduced.close();
  results.push({
    check:
      "initial reduced motion skips renderer download and preserves keyboard entry",
    passed: true,
  });

  const fallback = await browser.newContext({
    viewport: { width: 1440, height: 960 },
  });
  await fallback.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type, ...args) {
      return type === "2d" ? null : original.call(this, type, ...args);
    };
  });
  const unavailable = await fallback.newPage();
  collectErrors(unavailable);
  const fallbackFetched = [];
  unavailable.on("request", (request) => fallbackFetched.push(request.url()));
  await unavailable.goto(baseURL);
  await expect.poll(() => fallbackFetched.some(rendererRequest)).toBe(true);
  await expectStatic(unavailable);
  await expect(unavailable.locator(".hero button")).toHaveCount(0);
  await fallback.close();
  results.push({
    check:
      "unavailable Canvas2D keeps static Nori, readable heading, and real links",
    passed: true,
  });
  expect(errors).toEqual([]);
  await writeFile(
    `${output}/checks.json`,
    JSON.stringify({ passed: true, results, errors }, null, 2),
  );
  console.log(JSON.stringify({ passed: true, results, errors }, null, 2));
} finally {
  await browser.close();
}
