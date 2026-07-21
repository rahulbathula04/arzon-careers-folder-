import { test, expect } from "@playwright/test";

/**
 * Cross-browser smoke for the personalised-next-step countdown.
 *
 * Runs across Chromium / WebKit / Firefox × reduced-motion {on, off}
 * via the project matrix in playwright.config.ts. We assert:
 *   1. The component mounts and the "Applications close in" stat renders.
 *   2. With reduced motion: html.reduce-motion is set (boot script) and
 *      no infinite spin/pulse/bounce/ping animation runs anywhere on the
 *      countdown subtree.
 *   3. Without reduced motion: html.reduce-motion is NOT set; the
 *      countdown text still renders the same shape (days/hours).
 */

test.describe("Countdown · cross-browser", () => {
  test("renders the live cohort countdown", async ({ page }) => {
    await page.goto("/_dev/countdown");
    await expect(page.getByTestId("countdown-harness")).toBeVisible();
    await expect(page.getByText("Applications close in")).toBeVisible();
    await expect(page.getByText("Seats left")).toBeVisible();
    // Days/hours pattern OR "Closed" when expired — accept either.
    const stat = page.locator("text=/^\\d+d\\s+\\d+h$|^\\d+h\\s+\\d+m$|^Closed$/").first();
    await expect(stat).toBeVisible();
  });

  test("reduced-motion class matches OS preference", async ({ page, browserName }, testInfo) => {
    await page.goto("/_dev/countdown");
    const wantReduced = testInfo.project.name.includes("reduced-motion");
    const hasClass = await page.evaluate(() =>
      document.documentElement.classList.contains("reduce-motion"),
    );
    expect(hasClass, `[${browserName}] expected html.reduce-motion=${wantReduced}`).toBe(
      wantReduced,
    );
  });

  test("no infinite animations on countdown when reduced motion is on", async ({
    page,
  }, testInfo) => {
    test.skip(
      !testInfo.project.name.includes("reduced-motion"),
      "Only relevant when reduced motion is emulated",
    );
    await page.goto("/_dev/countdown");
    await expect(page.getByTestId("countdown-harness")).toBeVisible();

    const offenders = await page.getByTestId("countdown-harness").evaluate((root) => {
      const out: Array<{ tag: string; name: string }> = [];
      root.querySelectorAll<HTMLElement>("*").forEach((el) => {
        const name = getComputedStyle(el).animationName;
        if (/^(pulse|spin|bounce|ping|marquee)$/.test(name)) {
          out.push({ tag: el.tagName.toLowerCase(), name });
        }
      });
      return out;
    });
    expect(
      offenders,
      `forbidden animations under reduced motion:\n${JSON.stringify(offenders, null, 2)}`,
    ).toEqual([]);
  });
});
