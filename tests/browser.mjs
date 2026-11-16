import { chromium, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, writeFile } from "node:fs/promises";

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
    assembly: Number(canvas.dataset.assembly),
    paints: Number(canvas.dataset.paints),
  }));
async function scrollScene(page, progress) {
  await page.evaluate((value) => {
    const hero = document.querySelector(".hero");
    const stage = document.querySelector(".hero-stage");
    const range = hero.offsetHeight - stage.clientHeight;
    window.scrollTo({
      top: hero.offsetTop + range * value,
      behavior: "instant",
    });
  }, progress);
  await expect
    .poll(async () => (await stateFor(page)).phase)
    .toBeCloseTo(progress, 2);
}
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
  await expect(page.locator(".hero .button-primary")).toHaveText("Meet Nori");
  await expect(page.locator(".hero .button-secondary")).toHaveText(
    "See Nori at work",
  );
  await expect(page.locator(".hero .button-secondary")).toHaveAttribute(
    "href",
    "#work",
  );
  for (const [name, progress] of [
    ["start", 0],
    ["middle", 0.5],
    ["end", 1],
  ]) {
    await scrollScene(page, progress);
    const state = await stateFor(page);
    if (progress === 0) expect(state.assembly).toBe(0);
    if (progress === 0.5) {
      expect(state.assembly).toBeGreaterThan(0.4);
      expect(state.assembly).toBeLessThan(0.7);
    }
    if (progress === 1) {
      expect(state.assembly).toBe(1);
      expect(state.generation).toBe(18);
    }
    await page.screenshot({ path: `${output}/hero-${name}.png` });
    results.push({ check: `scroll ${name}`, ...state });
  }
  const idle = await stateFor(page);
  await page.waitForTimeout(200);
  expect((await stateFor(page)).paints).toBe(idle.paints);
  results.push({ check: "idle scene stops painting", passed: true });

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
  await page.waitForTimeout(80);
  const offscreen = (await stateFor(page)).paints;
  await page.evaluate(() => {
    window.scrollBy({ top: 100, behavior: "instant" });
    window.dispatchEvent(new Event("scroll"));
  });
  await page.waitForTimeout(150);
  expect((await stateFor(page)).paints).toBe(offscreen);
  await scrollScene(page, 0);
  results.push({
    check: "offscreen scroll does not paint; returning updates composition",
    passed: true,
  });

  const visible = (await stateFor(page)).paints;
  await page.evaluate(() => {
    Object.defineProperty(document, "visibilityState", {
      configurable: true,
      get: () => "hidden",
    });
    document.dispatchEvent(new Event("visibilitychange"));
    window.scrollBy({ top: 100, behavior: "instant" });
    window.dispatchEvent(new Event("scroll"));
  });
  await page.waitForTimeout(150);
  expect((await stateFor(page)).paints).toBe(visible);
  await page.evaluate(() => {
    delete document.visibilityState;
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await expect
    .poll(async () => (await stateFor(page)).paints)
    .toBeGreaterThan(visible);
  await scrollScene(page, 0);
  results.push({
    check:
      "hidden document suppresses painting and resumes on visibility change",
    passed: true,
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

  await scrollScene(page, 0);
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
  await scrollScene(page, 0.5);
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
  await scrollScene(phone, 0);
  await phone.screenshot({ path: `${output}/hero-mobile.png` });
  await scrollScene(phone, 1);
  expect((await stateFor(phone)).assembly).toBe(1);
  await phone.screenshot({ path: `${output}/hero-mobile-assembled.png` });
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
  await scrollScene(phone, 0);
  const mobileAxe = await new AxeBuilder({ page: phone })
    .include(".hero")
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(mobileAxe.violations).toHaveLength(0);
  results.push({
    check: "mobile assembly, 320/390/699/768px overflow, and Hero axe",
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
