import { chromium, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir, writeFile } from 'node:fs/promises';

const baseURL = process.env.TEST_URL || 'http://127.0.0.1:4173';
const output = 'artifacts';
await mkdir(output, { recursive: true });
const browser = await chromium.launch();
const results = [];
const context = await browser.newContext({ viewport: { width: 1440, height: 960 }, deviceScaleFactor: 1, recordVideo: { dir: `${output}/video`, size: { width: 1440, height: 960 } } });
const page = await context.newPage();
const recording = page.video();
const errors = [];
page.on('pageerror', error => errors.push(error.message));
await page.goto(baseURL);
await page.locator('.cellular-scene.is-ready').waitFor();
await page.evaluate(() => document.fonts.ready);
const time = () => page.locator('canvas').getAttribute('data-time').then(Number);
for (const second of [1, 7, 14, 21, 27.8, 28.2, 30]) {
  await page.waitForFunction(t => Number(document.querySelector('canvas')?.dataset.time) >= t, second, { timeout: 45000 });
  await page.screenshot({ path: `${output}/desktop-${String(second).replace('.', '-')}.png` });
  results.push({ checkpoint: second, sceneTime: await time() });
}
const pause = page.getByRole('button', { name: 'Pause animation' });
await pause.click();
await expect(page.getByRole('button', { name: 'Resume animation' })).toHaveAttribute('aria-pressed', 'true');
await page.waitForTimeout(100);
const stopped = await time();
await page.waitForTimeout(650);
expect(await time()).toBe(stopped);
await page.getByRole('button', { name: 'Resume animation' }).press('Space');
await page.waitForTimeout(250);
expect(await time()).toBeGreaterThan(stopped);
results.push({ check: 'pause freezes camera and cellular time; keyboard resumes', passed: true });

const links = await page.locator('a').evaluateAll(elements => elements.map(el => ({ text: el.textContent.trim(), href: el.getAttribute('href') })));
expect(links.filter(link => link.href === 'https://discord.gg/m8qnWv9XX').length).toBeGreaterThanOrEqual(3);
expect(links.some(link => link.href === 'https://github.com/rein-protocol-foundation/nori-agent')).toBeTruthy();
expect(await page.locator('h1').count()).toBe(1);
const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
results.push({ check: 'desktop axe', violations: axe.violations });
expect(axe.violations).toHaveLength(0);

// Move the hero offscreen in an isolated test fixture, then verify its active clock.
await page.evaluate(() => { const spacer = document.createElement('div'); spacer.style.height = '1500px'; spacer.id = 'test-spacer'; document.body.append(spacer); window.scrollTo(0, 1100); });
await page.waitForTimeout(150);
const offscreen = await time();
await page.waitForTimeout(400);
expect(await time()).toBe(offscreen);
await page.evaluate(() => { document.querySelector('#test-spacer').remove(); window.scrollTo(0, 0); });
await page.waitForTimeout(150);
expect(await time()).toBeGreaterThan(offscreen);
results.push({ check: 'offscreen pauses and returns without catch-up', passed: true });

await page.evaluate(() => { Object.defineProperty(document, 'visibilityState', { configurable: true, get: () => 'hidden' }); document.dispatchEvent(new Event('visibilitychange')); });
await page.waitForTimeout(150);
const hidden = await time();
await page.waitForTimeout(350);
expect(await time()).toBe(hidden);
await page.evaluate(() => { delete document.visibilityState; document.dispatchEvent(new Event('visibilitychange')); });
await page.waitForTimeout(150);
expect(await time()).toBeGreaterThan(hidden);
results.push({ check: 'visibility-change lifecycle freezes the clock', passed: true });

await page.emulateMedia({ reducedMotion: 'reduce' });
await expect(page.locator('.static-label')).toHaveText(/Reduced motion/);
await expect(page.locator('.cellular-scene')).not.toHaveClass(/is-ready/);
await page.screenshot({ path: `${output}/desktop-reduced-motion.png` });
await page.emulateMedia({ reducedMotion: 'no-preference' });
await page.locator('.cellular-scene.is-ready').waitFor();
results.push({ check: 'live reduced-motion change disposes renderer; re-enabling restarts', passed: true });

await page.evaluate(() => document.querySelector('canvas').getContext('webgl2').getExtension('WEBGL_lose_context').loseContext());
await expect(page.locator('.static-label')).toHaveText(/Still life/);
await expect(page.getByRole('link', { name: 'Meet Nori in Discord', exact: true }).last()).toBeVisible();
results.push({ check: 'WebGL context loss retains static composition and links', passed: true });
await context.close();
await recording.saveAs(`${output}/hero-cycle.webm`);

const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
const phone = await mobile.newPage();
await phone.goto(baseURL);
await phone.locator('.cellular-scene.is-ready').waitFor();
await phone.evaluate(() => document.fonts.ready);
await phone.getByRole('button', { name: 'Pause animation' }).click();
await phone.evaluate(() => window.scrollTo(0, 0));
await phone.locator('.hero').screenshot({ path: `${output}/mobile.png` });
for (const width of [320, 390, 699, 768]) {
  await phone.setViewportSize({ width, height: 844 });
  expect(await phone.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
}
await phone.setViewportSize({ width: 390, height: 844 });
const mobileAxe = await new AxeBuilder({ page: phone }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
results.push({ check: 'mobile axe and 320/390/699/768px overflow', violations: mobileAxe.violations });
expect(mobileAxe.violations).toHaveLength(0);
await mobile.close();

const reduced = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 390, height: 844 } });
const still = await reduced.newPage();
const fetched = [];
still.on('request', request => fetched.push(request.url()));
await still.goto(baseURL);
await expect(still.locator('.static-label')).toHaveText(/Reduced motion/);
expect(fetched.some(url => /\/three[-.]/.test(url))).toBe(false);
await still.locator('.hero').screenshot({ path: `${output}/mobile-reduced-motion.png` });
await still.keyboard.press('Tab');
await expect(still.getByRole('link', { name: 'Skip to content' })).toBeFocused();
await still.keyboard.press('Enter');
expect(await still.evaluate(() => location.hash)).toBe('#main');
const stillAxe = await new AxeBuilder({ page: still }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
expect(stillAxe.violations).toHaveLength(0);
await reduced.close();
results.push({ check: 'initial reduced motion skips Three.js download', passed: true });

const fallback = await browser.newContext();
await fallback.addInitScript(() => { const original = HTMLCanvasElement.prototype.getContext; HTMLCanvasElement.prototype.getContext = function(type, ...args) { return type.startsWith('webgl') ? null : original.call(this, type, ...args); }; });
const unavailable = await fallback.newPage();
await unavailable.goto(baseURL);
await expect(unavailable.locator('.static-label')).toHaveText(/Still life/);
await expect(unavailable.locator('h1')).toBeVisible();
await fallback.close();
results.push({ check: 'unavailable WebGL uses static fallback', passed: true });

const limited = await browser.newContext();
await limited.addInitScript(() => Object.defineProperty(navigator, 'hardwareConcurrency', { get: () => 2 }));
const lowPower = await limited.newPage();
await lowPower.goto(baseURL);
await expect(lowPower.locator('.static-label')).toHaveText(/Still life/);
await limited.close();
results.push({ check: 'low-capability device uses static fallback', passed: true });
expect(errors).toEqual([]);
await writeFile(`${output}/checks.json`, JSON.stringify({ results, errors }, null, 2));
await browser.close();
console.log(JSON.stringify({ passed: true, results, errors }, null, 2));
