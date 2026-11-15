import { chromium, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, writeFile } from "node:fs/promises";
const baseURL = process.env.TEST_URL || "http://127.0.0.1:4173";
const sections = [
  "team",
  "work",
  "resources",
  "community",
  "communications",
  "rein",
  "continuity",
  "open-source",
];
const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1440, height: 960 },
  reducedMotion: "reduce",
});
const page = await context.newPage();
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
const checks = [];
await mkdir("artifacts", { recursive: true });
try {
  await page.goto(baseURL);
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator("h1")).toHaveCount(1);
  for (const id of sections) {
    await expect(page.locator(`main #${id} h2`)).toHaveCount(1);
  }
  const targets = await page.locator('a[href^="#"]').evaluateAll((links) =>
    links.map((link) => ({
      href: link.getAttribute("href"),
      exists: !!document.getElementById(link.getAttribute("href").slice(1)),
    })),
  );
  expect(targets.every((target) => target.exists)).toBe(true);
  const ctas = page.locator(
    ".button-primary, .button-secondary, .button-outline, .header-cta",
  );
  expect(await ctas.locator("svg").count()).toBe(0);
  const destinations = await ctas.evaluateAll((links) =>
    links.map((link) => link.getAttribute("href")),
  );
  expect(
    destinations.every((href) =>
      [
        "https://discord.gg/m8qnWv9XX",
        "https://github.com/rein-protocol-foundation/nori-agent",
      ].includes(href),
    ),
  ).toBe(true);
  checks.push(
    "All section anchors resolve; all CTAs are text-only and point to approved destinations.",
  );
  await page
    .getByRole("navigation", { name: "Sections", exact: true })
    .getByRole("link", { name: "Meet the team" })
    .click();
  await expect(page.locator("#team-title")).toBeInViewport();
  await page.getByRole("link", { name: "Back to top", exact: true }).click();
  await expect(page.locator("h1")).toBeInViewport();
  checks.push("Desktop section navigation and return to top work.");
  for (const width of [320, 390, 540, 699, 768, 1050, 1200, 1440]) {
    await page.setViewportSize({ width, height: 960 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      `overflow at ${width}px`,
    ).toBe(true);
    const clipped = await page
      .locator("h1, h2, h3, h4, p, dt, dd")
      .evaluateAll((nodes) =>
        nodes
          .filter((node) => {
            if (node.closest(".badge-gallery")) return false;
            const r = node.getBoundingClientRect();
            return r.width > 0 && (r.left < -1 || r.right > innerWidth + 1);
          })
          .map((node) => node.textContent.slice(0, 60)),
      );
    expect(clipped, `text outside viewport at ${width}px`).toEqual([]);
  }
  checks.push("No page or text overflow at eight widths, 320–1440px.");
  await expect(
    page.getByText("A request. The right access. Work continues.", {
      exact: true,
    }),
  ).toBeVisible();
  await expect(
    page.getByText("The meeting ends. The work keeps moving.", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText("Become a pilot organization", { exact: true }),
  ).toHaveCount(0);
  await expect(page.locator("em")).toHaveCount(0);
  await expect(page.getByRole("tablist")).toHaveCount(0);
  await expect(page.locator("#work .work-story")).toHaveCount(3);
  await expect(
    page.getByRole("heading", {
      name: "From an offer to ready for day one.",
      exact: true,
    }),
  ).toBeVisible();
  const desktopAxe = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(
    desktopAxe.violations.map((v) => ({
      id: v.id,
      targets: v.nodes.map((n) => n.target),
    })),
  ).toEqual([]);
  for (const id of sections)
    await page
      .locator("#" + id)
      .screenshot({ path: `artifacts/section-${id}.png` });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({
    path: "artifacts/landing-desktop.png",
    fullPage: true,
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => window.scrollTo(0, 0));
  const toggle = page.getByRole("button", { name: "Open navigation" });
  await toggle.focus();
  await page.keyboard.press("Enter");
  await expect(
    page.getByRole("button", { name: "Close navigation" }),
  ).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(toggle).toBeFocused();
  await expect(
    page.getByRole("navigation", { name: "Mobile sections" }),
  ).toHaveCount(0);
  await toggle.click();
  await page
    .getByRole("navigation", { name: "Mobile sections" })
    .getByRole("link", { name: "See Nori at work" })
    .click();
  await expect(page.locator("#rein-title")).toBeInViewport();
  await expect(
    page.getByRole("navigation", { name: "Mobile sections" }),
  ).toHaveCount(0);
  await page.getByRole("link", { name: "Back to top", exact: true }).click();
  checks.push(
    "Mobile menu opens by keyboard, closes on Escape with restored focus, and closes after section selection.",
  );
  await toggle.click();
  const mobileAxe = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(
    mobileAxe.violations.map((v) => ({
      id: v.id,
      targets: v.nodes.map((n) => n.target),
    })),
  ).toEqual([]);
  await page.keyboard.press("Escape");
  await page.locator("h1").click();
  await page.screenshot({
    path: "artifacts/landing-mobile.png",
    fullPage: true,
  });
  for (const id of sections)
    await page
      .locator("#" + id)
      .screenshot({ path: `artifacts/mobile-${id}.png` });
  checks.push("Desktop and mobile (menu open) axe scans: zero violations.");
  expect(errors).toEqual([]);
  await writeFile(
    "artifacts/landing-checks.json",
    JSON.stringify({ passed: true, checks, errors }, null, 2),
  );
  console.log(JSON.stringify({ passed: true, checks, errors }, null, 2));
} finally {
  await context.close();
  await browser.close();
}
