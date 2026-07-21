import { test, expect } from "@playwright/test";

/**
 * Homepage visual regression — three viewports.
 *
 * Pixel-diff is intentionally tolerant (`maxDiffPixelRatio: 0.02`) so
 * font hinting + sub-pixel rendering quirks don't flake. Layout, color,
 * and typography shifts at section scale still fail loudly.
 *
 * Volatile regions (live counters, cohort countdown timers) are masked
 * so their tick doesn't break the baseline.
 *
 * Baselines live in tests/e2e/visual/homepage-visual.spec.ts-snapshots/.
 * Refresh with `bunx playwright test homepage-visual --update-snapshots`.
 */

const VIEWPORTS = [
  { name: "mobile", width: 375, height: 812 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1280, height: 1800 },
] as const;

// Stabilise: kill all animation/transition + fix Date.now drift.
const STABILISE_CSS = `
  *, *::before, *::after {
    animation-duration: 0s !important;
    animation-delay: 0s !important;
    transition-duration: 0s !important;
    transition-delay: 0s !important;
    caret-color: transparent !important;
  }
`;

test.describe("homepage visual regression", () => {
  // Visual diffs are deterministic on Chromium across CI; keep webkit/firefox
  // out of the snapshot loop to avoid 3x baselines.
  test.skip(({ browserName }) => browserName !== "chromium", "chromium-only visual baselines");

  for (const vp of VIEWPORTS) {
    test(`homepage @ ${vp.name} (${vp.width}x${vp.height})`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.addStyleTag({ content: STABILISE_CSS });
      await page.goto("/", { waitUntil: "networkidle" });
      await page.addStyleTag({ content: STABILISE_CSS });
      await page.evaluate(async () => {
        // Wait for fonts to settle so glyph metrics are stable.
        // @ts-ignore - document.fonts is widely available.
        if (document.fonts?.ready) await document.fonts.ready;
      });

      // Mask regions that legitimately change tick-to-tick.
      const masks = [
        page.locator('[aria-label="Next cohort"]'),
        page.locator('[data-volatile="true"]'),
        page.locator('[data-testid="live-proof"]'),
        page.locator("time"),
      ];

      await expect(page).toHaveScreenshot(`home-${vp.name}.png`, {
        fullPage: true,
        animations: "disabled",
        caret: "hide",
        mask: masks,
        maxDiffPixelRatio: 0.02,
      });
    });
  }
});
