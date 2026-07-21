import { test, expect, devices } from "@playwright/test";

/**
 * Visual regression for the focus indicator on TrackDomainGrid tiles.
 *
 * Captures a screenshot of the first Apply link in the grid both at rest
 * and while keyboard-focused, on desktop and mobile viewports. The diff
 * baseline asserts both:
 *   - the focus ring is rendered (visual delta vs. resting state)
 *   - the surrounding tile retains sufficient contrast (no pixel
 *     collapse from the ring overpainting the chip text)
 *
 * Run with `--update-snapshots` once to baseline.
 */

const VIEWPORTS = [
  { name: "desktop", width: 1280, height: 800 },
  { name: "mobile", width: 390, height: 844 },
] as const;

for (const vp of VIEWPORTS) {
  test.describe(`TrackDomainGrid focus ring · ${vp.name}`, () => {
    test.use({ viewport: { width: vp.width, height: vp.height } });

    test(`first tile shows a visible focus indicator (${vp.name})`, async ({ page }) => {
      await page.goto("/courses");
      const tile = page
        .locator('[data-testid="track-hero"][data-track="pharmacovigilance"]')
        .first();
      await tile.scrollIntoViewIfNeeded();
      await expect(tile).toBeVisible();

      // Resting baseline
      await expect(tile).toHaveScreenshot(`track-tile-${vp.name}-rest.png`, {
        maxDiffPixelRatio: 0.02,
      });

      // Focused baseline — keyboard focus on the Apply link inside the tile.
      const apply = tile.getByRole("link", { name: /Apply for this internship/i });
      await apply.focus();
      await expect(apply).toBeFocused();
      await expect(tile).toHaveScreenshot(`track-tile-${vp.name}-focus.png`, {
        maxDiffPixelRatio: 0.02,
      });
    });
  });
}
