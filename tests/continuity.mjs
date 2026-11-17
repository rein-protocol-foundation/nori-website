import { chromium, firefox, webkit, expect } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
const engineName = process.env.TEST_BROWSER || "chromium";
const browser = await { chromium, firefox, webkit }[engineName].launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 960 } });
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
const samples = () =>
  page.locator(".context-flow").evaluate((el) => ({
    running: el.classList.contains("is-flowing"),
    animations: el
      .getAnimations({ subtree: true })
      .map((a) => ({ time: a.currentTime, state: a.playState })),
    signal: getComputedStyle(el.querySelector(".context-signal"))
      .offsetDistance,
    highlights: [...el.querySelectorAll(".context-source")].map(
      (s) => getComputedStyle(s, "::before").opacity,
    ),
  }));
try {
  await page.goto(process.env.TEST_URL || "http://127.0.0.1:4173");
  await page.locator(".context-flow").scrollIntoViewIfNeeded();
  await expect(page.locator(".context-flow")).toHaveClass(/is-flowing/);
  const first = await samples();
  await page.waitForTimeout(1300);
  const second = await samples();
  expect(first.animations.length).toBeGreaterThan(8);
  expect(second.animations[0].time).toBeGreaterThan(first.animations[0].time);
  expect(second.signal).not.toBe(first.signal);
  expect(second.highlights).not.toEqual(first.highlights);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await expect(page.locator(".context-flow")).not.toHaveClass(/is-flowing/);
  // CSS pauses commit on the animation timeline after the class changes.
  // Wait for pending pause operations before measuring a frozen interval.
  await page.locator(".context-flow").evaluate(async (el) => {
    const animations = el.getAnimations({ subtree: true });
    await Promise.all(animations.map((animation) => animation.ready));
  });
  const paused = await samples();
  expect(
    paused.animations.every((animation) => animation.state === "paused"),
  ).toBe(true);
  await page.waitForTimeout(350);
  const frozen = await samples();
  expect(frozen.animations).toEqual(paused.animations);
  expect(frozen.signal).toBe(paused.signal);
  await page.locator(".context-flow").scrollIntoViewIfNeeded();
  await expect(page.locator(".context-flow")).toHaveClass(/is-flowing/);
  await page.waitForTimeout(150);
  const resumed = await samples();
  expect(resumed.animations[0].time - paused.animations[0].time).toBeLessThan(
    350,
  );
  await page.evaluate(() => {
    Object.defineProperty(document, "visibilityState", {
      configurable: true,
      get: () => "hidden",
    });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await expect(page.locator(".context-flow")).not.toHaveClass(/is-flowing/);
  await page.evaluate(() => {
    delete document.visibilityState;
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await expect(page.locator(".context-flow")).toHaveClass(/is-flowing/);
  await page.emulateMedia({ reducedMotion: "reduce" });
  expect((await samples()).animations).toHaveLength(0);
  await expect(page.locator(".context-next-step")).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.locator(".context-result").scrollIntoViewIfNeeded();
  await expect(page.locator(".context-flow")).toHaveClass(/is-flowing/);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  const mobileBefore = await samples();
  await page.waitForTimeout(250);
  const mobileAfter = await samples();
  expect(mobileAfter.animations[0].time).toBeGreaterThan(
    mobileBefore.animations[0].time,
  );
  expect(errors).toEqual([]);
  await mkdir(`artifacts/refinements/${engineName}`, { recursive: true });
  await writeFile(
    `artifacts/refinements/${engineName}/continuity-checks.json`,
    JSON.stringify(
      {
        passed: true,
        first,
        second,
        paused,
        resumed,
        mobile: true,
        reducedMotion: true,
        errors,
      },
      null,
      2,
    ),
  );
  console.log(
    `${engineName}: context travels from sources to answer; offscreen/hidden pause, safe resume, reduced motion and mobile pass.`,
  );
} finally {
  await browser.close();
}
