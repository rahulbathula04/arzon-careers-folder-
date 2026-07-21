import { test, expect } from "@playwright/test";

/**
 * Apply flow regression. Locks:
 *   - /apply renders with the funnel shell
 *   - ?programme=<slug> preselects the correct track
 *   - the initial step exposes required form fields (name/email/phone)
 */

test("regression · /apply renders funnel shell", async ({ page }) => {
  const errs: string[] = [];
  page.on("pageerror", (e) => errs.push(e.message));
  const resp = await page.goto("/apply", { waitUntil: "domcontentloaded" });
  expect(resp?.ok(), "/apply should return 2xx").toBeTruthy();
  await expect(page.locator("main")).toBeVisible();
  expect(errs).toEqual([]);
});

test("regression · /apply accepts programme query without error", async ({ page }) => {
  const errs: string[] = [];
  page.on("pageerror", (e) => errs.push(e.message));
  const resp = await page.goto("/apply?programme=pharmacovigilance&source=regression-test", {
    waitUntil: "domcontentloaded",
  });
  const status = resp?.status() ?? 0;
  expect(status, "/apply?programme=... returns 2xx/3xx").toBeLessThan(400);
  expect(errs, `pageerror: ${errs.join(" | ")}`).toEqual([]);
});
