import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const discord = "https://discord.gg/m8qnWv9XX";
const github = "https://github.com/rein-protocol-foundation/nori-agent";
test("all product narratives are readable without interaction or JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4173");
  await expect(page.locator("main > section")).toHaveCount(9);
  for (const text of [
    "A new tool request. An existing seat.",
    "Everything a first day needs.",
    "Time off. Covered.",
    "Decisions that become work.",
    "The receipt that closes the loop.",
    "A paid task with a clear finish line.",
    "First contribution",
    "A clearer first contribution.",
    "The next person is ready.",
  ])
    await expect(
      page.getByRole("heading", { name: text, exact: true }),
    ).toBeVisible();
  expect(await page.locator("dialog,[role=tab],details,button").count()).toBe(
    0,
  );
  expect(await page.locator("script[src]").count()).toBe(0);
  expect(await page.locator("body").innerText()).not.toMatch(/[↗↘→←↑↓]/);
  await context.close();
});
test("responsive layout and rendered artwork have no broken assets", async ({
  page,
}) => {
  const failed: string[] = [];
  page.on("response", (r) => {
    if (r.status() >= 400) failed.push(r.url());
  });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  for (const width of [320, 390, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      `Overflow at ${width}px`,
    ).toBeTruthy();
  }
  const backgrounds = await page
    .locator(".nori-head,.nori-portrait")
    .evaluateAll((nodes) => [
      ...new Set(
        nodes.map(
          (n) =>
            getComputedStyle(n).backgroundImage.match(/url\("?(.*?)"?\)/)?.[1],
        ),
      ),
    ]);
  for (const src of backgrounds) {
    expect(src).toBeTruthy();
    const response = await page.request.get(src!);
    expect(response.ok()).toBeTruthy();
  }
  expect(failed).toEqual([]);
});
test("navigation, CTAs, and skip link are keyboard accessible", async ({
  page,
}) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main$/);
  for (const name of [
    "What Nori does",
    "Meet the team",
    "Running with Rein",
    "Open source",
  ]) {
    const link = page.getByRole("navigation").getByRole("link", { name });
    await link.focus();
    await page.keyboard.press("Enter");
    expect(page.url()).toContain(await link.getAttribute("href"));
  }
  for (const link of await page.locator('a[href^="http"]').all()) {
    expect([discord, github]).toContain(await link.getAttribute("href"));
  }
});
test("page accessibility and reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveCSS("scroll-behavior", "auto");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(results.violations).toEqual([]);
});
