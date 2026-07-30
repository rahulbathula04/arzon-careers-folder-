import { test, expect } from "@playwright/test";

/**
 * Above-the-fold visual regression for the homepage.
 *
 * Three distinct snapshots so a typography/layout shift in one block
 * doesn't drown out shifts in the others:
 *   1. Hero (#hero-heading container)
 *   2. Track decision strip (TrackDomainGrid, identified by the first
 *      `[data-testid="track-hero"]` ancestor section)
 *   3. Government recognition card (TaskPartnershipBlock, #launch-event)
 *
 * Baselines live next to this spec under -snapshots/. Refresh with
 *   bunx playwright test homepage-above-fold --update-snapshots
 * after intentional design changes.
 */

const STABILISE_CSS = `
  *, *::before, *::after {
    animation-duration: 0s !important;
    animation-delay: 0s !important;
    transition-duration: 0s !important;
    transition-delay: 0s !important;
    caret-color: transparent !important;
  }
`;

const VIEWPORTS = [
  { name: "mobile", width: 390, height: 900 },
  { name: "desktop", width: 1280, height: 1800 },
] as const;

test.describe("homepage above-the-fold visual baselines", () => {
  test.skip(({ browserName }) => browserName !== "chromium", "chromium-only baselines");

  for (const vp of VIEWPORTS) {
    test(`hero / tracks / govt @ ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.addStyleTag({ content: STABILISE_CSS });
      await page.goto("/", { waitUntil: "networkidle" });
      await page.addStyleTag({ content: STABILISE_CSS });
      await page.evaluate(async () => {
        // @ts-ignore - document.fonts is widely available.
        if (document.fonts?.ready) await document.fonts.ready;
      });

      const volatileMasks = [
        page.locator('[aria-label="Next cohort"]'),
        page.locator('[data-volatile="true"]'),
        page.locator("time"),
      ];

      // 1. Hero
      const hero = page.locator("#hero-heading").locator("xpath=ancestor::section[1]");
      await expect(hero).toBeVisible();
      await expect(hero).toHaveScreenshot(`above-fold-hero-${vp.name}.png`, {
        animations: "disabled",
        caret: "hide",
        mask: volatileMasks,
        maxDiffPixelRatio: 0.02,
      });

      // 2. Track decision strip - scroll the first track card into view.
      const tracks = page
        .locator('[data-testid="track-hero"]')
        .first()
        .locator("xpath=ancestor::section[1]");
      await tracks.scrollIntoViewIfNeeded();
      await expect(tracks).toBeVisible();
      await expect(tracks).toHaveScreenshot(`above-fold-tracks-${vp.name}.png`, {
        animations: "disabled",
        caret: "hide",
        mask: volatileMasks,
        maxDiffPixelRatio: 0.02,
      });

      // 3. Government recognition (TASK partnership block).
      const govt = page.locator("#launch-event");
      await govt.scrollIntoViewIfNeeded();
      await expect(govt).toBeVisible();
      await expect(govt).toHaveScreenshot(`above-fold-govt-${vp.name}.png`, {
        animations: "disabled",
        caret: "hide",
        mask: volatileMasks,
        maxDiffPixelRatio: 0.02,
      });
    });
  }
});
