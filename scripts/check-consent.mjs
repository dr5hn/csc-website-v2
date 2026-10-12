/**
 * Check a served production export in an isolated Chromium profile.
 * Run after `npm run build` and serving `out/`: node scripts/check-consent.mjs http://127.0.0.1:4325
 * Install the browser once with `npx playwright install chromium`.
 * Collection requests are observed and aborted so tests do not pollute analytics.
 */
import assert from "node:assert/strict";
import { chromium } from "playwright";

const url = process.argv[2] || "http://127.0.0.1:4325";
const optionalHost = /(?:googletagmanager\.com|google-analytics\.com|analytics\.google\.com|widget\.mintlify\.com|ph\.mintlify\.com|posthog\.com)/;
const gaCookie = /^(_ga|_gid$|_gat)/;
const browser = await chromium.launch();
const context = await browser.newContext();
const requests = [];
const errors = [];
context.on("request", (request) => requests.push(request.url()));
context.on("page", (page) => {
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error" && /hydration|Minified React error/.test(message.text())) errors.push(message.text());
  });
});
await context.route(/(?:google-analytics\.com|analytics\.google\.com|ph\.mintlify\.com|posthog\.com)/, (route) => route.abort());
await context.addInitScript(() => {
  window.__consentShifts = [];
  new PerformanceObserver((entries) => {
    for (const entry of entries.getEntries()) {
      if (!entry.hadRecentInput) window.__consentShifts.push({
        value: entry.value,
        banner: entry.sources?.some(({ node }) => node?.closest?.('[aria-label="Cookie notice"]')),
      });
    }
  }).observe({ type: "layout-shift", buffered: true });
});

/** Inspect storage and every optional network request since the chosen checkpoint. */
async function assertOff(page, since = 0) {
  await page.waitForTimeout(1500); // Covers delayed tag/widget initialisation.
  assert.deepEqual(requests.slice(since).filter((request) => optionalHost.test(new URL(request).hostname)), []);
  assert.deepEqual((await context.cookies(url)).filter(({ name }) => gaCookie.test(name)), []);
  const storage = await page.evaluate(() => ({ local: { ...localStorage }, session: { ...sessionStorage } }));
  assert.deepEqual(Object.keys(storage.local).filter((key) => key !== "csc-cookie-consent"), []);
  assert.deepEqual(storage.session, {});
}

/** Reopen settings using the public footer control. */
async function reopen(page) {
  await page.getByRole("button", { name: "Cookie settings", exact: true }).click();
  await page.getByRole("region", { name: "Cookie notice" }).waitFor();
  assert.equal(await page.evaluate(() => document.activeElement?.getAttribute("aria-label")), "Cookie notice");
}

try {
  const page = await context.newPage();
  await page.goto(url);
  const banner = page.getByRole("region", { name: "Cookie notice" });
  await banner.waitFor();
  await assertOff(page);
  assert.equal(await banner.evaluate((element) => getComputedStyle(element).position), "fixed");
  assert.equal(await page.getByRole("button", { name: "Accept", exact: true }).getAttribute("class"),
    await page.getByRole("button", { name: "Decline", exact: true }).getAttribute("class"));
  await page.getByRole("button", { name: "Decline", exact: true }).click();
  await page.reload();
  await assertOff(page);
  assert.equal(await banner.count(), 0);

  await reopen(page);
  await page.getByRole("button", { name: "Accept", exact: true }).click();
  await page.waitForFunction(() => document.cookie.includes("_ga="));
  const defaults = await page.evaluate(() => [...window.dataLayer.find((entry) => entry[0] === "consent" && entry[1] === "default")]);
  assert.deepEqual(defaults[2], { analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
  await page.reload();
  await page.waitForFunction(() => window.__cscAnalyticsLoaded);
  const other = await context.newPage();
  await other.goto(url);
  await other.waitForFunction(() => window.__cscAnalyticsLoaded);
  await reopen(page);
  const checkpoint = requests.length;
  await Promise.all([
    page.waitForEvent("load"), other.waitForEvent("load"),
    page.getByRole("button", { name: "Decline", exact: true }).click(),
  ]);
  await assertOff(page, checkpoint);
  await assertOff(other, checkpoint);
  await page.getByRole("link", { name: "Pricing", exact: true }).first().click();
  await assertOff(page, checkpoint);

  const fresh = await browser.newContext();
  await fresh.addCookies([{ name: "_ga", value: "legacy", url }]);
  const legacy = await fresh.newPage();
  await legacy.goto(url);
  await legacy.getByRole("region", { name: "Cookie notice" }).waitFor();
  assert.deepEqual((await fresh.cookies(url)).filter(({ name }) => gaCookie.test(name)), []);
  await fresh.close();

  const blocked = await browser.newContext();
  await blocked.addInitScript(() => Object.defineProperty(window, "localStorage", { get() { throw new DOMException("Blocked", "SecurityError"); } }));
  const privatePage = await blocked.newPage();
  privatePage.on("pageerror", (error) => errors.push(error.message));
  await privatePage.goto(url);
  await privatePage.getByRole("button", { name: "Decline", exact: true }).click();
  await blocked.close();

  for (const viewport of [{ width: 320, height: 568 }, { width: 667, height: 240 }, { width: 1440, height: 900 }]) {
    await page.setViewportSize(viewport);
    await reopen(page);
    const box = await banner.boundingBox();
    assert.ok(box.y >= 0 && box.y + box.height <= viewport.height);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    assert.ok(!(await page.evaluate(() => window.__consentShifts)).some(({ banner }) => banner));
    await page.getByRole("button", { name: "Decline", exact: true }).click();
  }
  assert.deepEqual(errors, []);
  console.log("PASS: fresh/denied/granted/reloaded/withdrawn/cross-tab/legacy/blocked-storage/responsive consent; no hydration errors or banner layout shift");
} finally {
  await browser.close();
}
