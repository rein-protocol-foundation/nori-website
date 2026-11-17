import { chromium, firefox, webkit, expect } from "@playwright/test";
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
const browserName = process.env.TEST_BROWSER || "chromium";
const engine = { chromium, firefox, webkit }[browserName];
if (!engine) throw new Error(`Unsupported TEST_BROWSER: ${browserName}`);
const browser = await engine.launch();
const output =
  browserName === "chromium" ? "artifacts" : `artifacts/${browserName}`;
const context = await browser.newContext({
  viewport: { width: 1440, height: 960 },
  reducedMotion: "reduce",
});
const page = await context.newPage();
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
const checks = [];
await mkdir(output, { recursive: true });
try {
  await page.goto(baseURL);
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.getByRole("button", { name: /pause|resume/i })).toHaveCount(
    0,
  );
  await expect(page.locator("body")).not.toContainText(/illustrative/i);
  await expect(page.locator("header.header a[href*=discord]")).toHaveCount(0);
  const header = page.locator("header.header");
  const initialHeader = await header.boundingBox();
  await page.evaluate(() => window.scrollTo({ top: 80, behavior: "instant" }));
  await expect(header).toHaveClass(/is-condensed/);
  const compactHeader = await header.boundingBox();
  expect(compactHeader.y).toBe(0);
  expect(compactHeader.height).toBeLessThan(initialHeader.height);
  expect(compactHeader.height).toBeLessThanOrEqual(56);
  expect(compactHeader.width).toBe(1440);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await expect(header).not.toHaveClass(/is-condensed/);
  checks.push(
    "Header shrinks to a top-attached bar on scroll and restores at the top.",
  );
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
        "#work",
        "https://discord.gg/m8qnWv9XX",
        "https://rein-protocol.org/",
        "mailto:nori-contact@rein-protocol.org",
        "https://github.com/rein-protocol-foundation/nori-agent",
      ].includes(href),
    ),
  ).toBe(true);
  checks.push(
    "All section anchors resolve; all CTAs are text-only and point to approved destinations.",
  );
  await page
    .getByRole("navigation", { name: "Sections", exact: true })
    .getByRole("link", { name: "One Nori" })
    .click();
  await expect(page.locator("#team-title")).toBeInViewport();
  await page.getByRole("link", { name: "Back to top", exact: true }).click();
  await expect(page.locator("h1")).toBeInViewport();
  await expect(page.locator(".desktop-navigation [aria-current]")).toHaveCount(
    0,
  );
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
  // Full desktop applications stay recognizable without being flattened into strips.
  for (const width of [1050, 1200, 1440]) {
    await page.setViewportSize({ width, height: 960 });
    const frames = await page
      .locator(
        ".slack-demo, .discord-demo, .native-lark, .native-docs, .github-demo, .fin-stripe, .outreach-app",
      )
      .evaluateAll((nodes) =>
        nodes.map((node) => {
          const rect = node.getBoundingClientRect();
          return { name: node.className, ratio: rect.width / rect.height };
        }),
      );
    const prOverflow = await page
      .locator(".github-demo")
      .evaluate((node) => node.scrollHeight - node.clientHeight);
    expect(
      prOverflow,
      `GitHub timeline clipped at ${width}px`,
    ).toBeLessThanOrEqual(2);
    for (const frame of frames) {
      expect(frame.ratio, `${frame.name} at ${width}px`).toBeGreaterThanOrEqual(
        0.99,
      );
      expect(frame.ratio, `${frame.name} at ${width}px`).toBeLessThanOrEqual(
        16 / 9 + 0.01,
      );
    }
  }
  await expect(page.locator(".fin-safe-artifact")).toContainText("300");
  await expect(page.locator(".fin-safe-artifact")).toContainText("USDC");
  await expect(page.locator(".fin-safe-artifact")).toContainText(
    "2 of 3 signers required",
  );
  await expect(page.locator(".fin-bank-artifact")).toContainText("$480.00");
  await expect(page.locator(".fin-bank-artifact")).toContainText("$600.00");
  await expect(page.locator(".fin-bank-artifact")).toContainText("$120.00");
  await expect(page.locator(".fin-collections-artifact")).toContainText(
    "Stripe",
  );
  await expect(page.locator(".fin-collections-artifact")).toContainText(
    "PayPal",
  );
  await expect(page.locator(".fin-stripe-draft-note")).toContainText(
    "Draft saved",
  );
  checks.push(
    "Full desktop applications keep 1:1–16:9 proportions; concrete Safe, ACH and Stripe/PayPal workflows retain draft or review states.",
  );
  for (const width of [320, 390, 699, 768, 1050, 1440]) {
    await page.setViewportSize({ width, height: 960 });
    const screen = await page.locator(".fin-imessage").boundingBox();
    expect(Math.abs(screen.width / screen.height - 1206 / 2622)).toBeLessThan(
      0.001,
    );
    const compose = await page
      .locator(".outreach-gmail-compose, .outreach-compose-copy")
      .evaluateAll((nodes) =>
        nodes.map((node) => ({
          name: node.className,
          overflow: node.scrollHeight - node.clientHeight,
        })),
      );
    for (const surface of compose)
      expect(
        surface.overflow,
        `${surface.name} at ${width}`,
      ).toBeLessThanOrEqual(1);
  }
  await expect(page.locator(".outreach-instagram")).not.toContainText(
    /preview|demo|concept/i,
  );
  await expect(page.locator("#rein .rein-landmark-art img")).toHaveAttribute(
    "src",
    "/brands/rein-stanford.webp",
  );
  await expect(page.locator("#rein")).not.toContainText(
    "The work of AI safety",
  );
  await expect(
    page.locator('a[href="https://discord.gg/m8qnWv9XX"]'),
  ).toHaveCount(1);
  await expect(page.locator(".hero-community-note")).toContainText(
    "Rein Protocol Foundation",
  );
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 960 });
    for (const selector of [".hero-actions", ".closing-actions"]) {
      const buttons = await page
        .locator(selector + " > a")
        .evaluateAll((nodes) =>
          nodes.map((n) => ({
            width: n.getBoundingClientRect().width,
            height: n.getBoundingClientRect().height,
            font: parseFloat(getComputedStyle(n).fontSize),
          })),
        );
      expect(Math.abs(buttons[0].height - buttons[1].height)).toBeLessThan(1);
      expect(Math.abs(buttons[0].width - buttons[1].width)).toBeLessThan(1);
      expect(buttons.every((b) => b.font >= 14)).toBe(true);
    }
  }
  await expect(
    page.locator('.footer a[href="mailto:nori-contact@rein-protocol.org"]'),
  ).toBeVisible();
  await expect(
    page.locator('.footer a[href*="instagram.com"], .footer a[href*="x.com"]'),
  ).toHaveCount(0);
  checks.push(
    "iMessage retains iPhone screen ratio; Gmail has no inner scroller; finished Instagram, original Rein art, community CTA and confirmed contact are present.",
  );
  await page.setViewportSize({ width: 1440, height: 960 });
  await expect(
    page.getByText("The right access. Already in reach.", {
      exact: true,
    }),
  ).toBeVisible();
  await expect(
    page.getByText("The decision becomes the next step.", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText("Become a pilot organization", { exact: true }),
  ).toHaveCount(0);
  await expect(page.locator("em")).toHaveCount(0);
  await expect(page.getByRole("tablist")).toHaveCount(0);
  await expect(page.locator("#work .work-story")).toHaveCount(3);
  await expect(
    page.getByRole("heading", {
      name: "A new teammate. A ready first day.",
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
      .screenshot({ path: `${output}/section-${id}.png` });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({
    path: `${output}/landing-desktop.png`,
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
    .getByRole("link", { name: "Nori at Rein" })
    .click();
  await expect(page.locator("#rein-title")).toBeInViewport();
  await expect(page.locator("#rein")).toBeFocused();
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
    path: `${output}/landing-mobile.png`,
    fullPage: true,
  });
  for (const id of sections)
    await page
      .locator("#" + id)
      .screenshot({ path: `${output}/mobile-${id}.png` });
  checks.push("Desktop and mobile (menu open) axe scans: zero violations.");
  expect(errors).toEqual([]);
  await writeFile(
    `${output}/landing-checks.json`,
    JSON.stringify(
      { passed: true, browser: browserName, checks, errors },
      null,
      2,
    ),
  );
  console.log(
    JSON.stringify(
      { passed: true, browser: browserName, checks, errors },
      null,
      2,
    ),
  );
} finally {
  await context.close();
  await browser.close();
}
