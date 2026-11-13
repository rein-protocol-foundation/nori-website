import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("page, navigation, CTA destinations, responsive width, and accessibility", async ({
  page,
}, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(/Meet Nori/);
  await expect(page.locator("main > section")).toHaveCount(9);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBeTruthy();
  for (const link of await page.locator("a").all()) {
    const href = await link.getAttribute("href");
    if (href?.startsWith("http"))
      expect([
        "https://discord.gg/m8qnWv9XX",
        "https://github.com/rein-protocol-foundation/nori-agent",
      ]).toContain(href);
  }
  if (testInfo.project.name === "mobile") {
    await page.getByRole("button", { name: "Menu" }).click();
    await page
      .getByRole("navigation")
      .getByRole("link", { name: "Meet the team" })
      .click();
    await expect(page.getByRole("button", { name: "Menu" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  }
  await page.evaluate(() =>
    Promise.all(
      document.getAnimations().map((animation) => animation.finished),
    ),
  );
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(results.violations).toEqual([]);
  expect(errors).toEqual([]);
  await page.screenshot({
    path: `test-results/${testInfo.project.name}-full.png`,
    fullPage: true,
  });
});
test("role selection and all scenario tabs update their content", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: /NORI 01/ }).click();
  await expect(page.locator("#role-detail")).toContainText(
    "Quarterly operations summary",
  );
  await page.locator("summary").click();
  await expect(
    page.getByRole("heading", { name: "HR Specialist", exact: true }),
  ).toBeVisible();
  for (const tab of await page.getByRole("tab").all()) {
    await tab.click();
    await expect(tab).toHaveAttribute("aria-selected", "true");
    const id = await tab.getAttribute("id");
    const panel = page.locator(`[role=tabpanel][aria-labelledby="${id}"]`);
    await expect(panel).toBeVisible();
    const card = panel.getByRole("button").first();
    await card.click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(
      page
        .getByRole("dialog")
        .getByRole("heading", { name: "People & platforms" }),
    ).toBeVisible();
    await page.getByRole("button", { name: "Close case details" }).click();
    await expect(card).toBeFocused();
  }
});
test("keyboard case details trap focus, escape restores focus and scroll; tabs use arrow keys", async ({
  page,
}) => {
  await page.goto("/");
  const trigger = page
    .getByRole("button", {
      name: "View case: Someone’s away. The work still moves.",
    })
    .nth(1);
  await trigger.scrollIntoViewIfNeeded();
  await trigger.focus();
  const before = await page.evaluate(() => scrollY);
  await page.keyboard.press("Enter");
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Close case details" }),
  ).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(page.getByRole("dialog").getByRole("link")).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("button", { name: "Close case details" }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  expect(await page.evaluate(() => scrollY)).toBe(before);
  const first = page.getByRole("tab", { name: "Everyday requests" });
  await first.focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("tab", { name: "Global hiring" })).toBeFocused();
  await page.keyboard.press("End");
  await expect(page.getByRole("tab", { name: "Board work" })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await trigger.focus();
  await page.keyboard.press("Space");
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.evaluate(() =>
    Promise.all(
      document.getAnimations().map((animation) => animation.finished),
    ),
  );
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(results.violations).toEqual([]);
});
test("reduced motion keeps cases usable without displacement", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const card = page.locator(".hero .thread");
  await card.hover();
  await expect(card.locator(".card-surface")).toHaveCSS("transform", "none");
  await card.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(card).toBeFocused();
});

test("pointer depth stays inside a stable layout and resets on exit", async ({
  page,
}, info) => {
  test.skip(info.project.name !== "desktop", "Pointer hover is desktop-only");
  await page.goto("/");
  const card = page.locator(".hero .thread");
  await card.scrollIntoViewIfNeeded();
  const before = await card.boundingBox();
  await card.hover({ position: { x: 80, y: 80 } });
  await expect(card.locator(".card-surface")).not.toHaveCSS(
    "transform",
    "matrix(1, 0, 0, 1, 0, 0)",
  );
  expect(await card.boundingBox()).toEqual(before);
  await page.mouse.move(0, 0);
  await expect(card.locator(".card-surface")).toHaveCSS(
    "transform",
    "matrix(1, 0, 0, 1, 0, 0)",
  );
});
