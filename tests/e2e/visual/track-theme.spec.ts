import { test, expect } from "@playwright/test";

/**
 * Visual regression: capture the locked track surfaces at desktop and tablet
 * (no mobile - sticky-mobile-CTA is intentionally absent from this project).
 *
 * Baseline workflow:
 *   bunx playwright test tests/e2e/visual/track-theme.spec.ts --update-snapshots
 * CI then fails on any pixel drift beyond `maxDiffPixelRatio`.
 */

const VIEWPORTS = [
  { name: "desktop-1280x800", width: 1280, height: 800 },
  { name: "tablet-820x1100", width: 820, height: 1100 },
  { name: "mobile-390x844", width: 390, height: 844 },
] as const;

const TRACKS = ["pharmacovigilance", "medical-coding", "clinical-data-management"] as const;

const SCREENSHOT_OPTIONS = {
  animations: "disabled" as const,
  maxDiffPixelRatio: 0.02,
};

test.describe.configure({ mode: "parallel" });

for (const vp of VIEWPORTS) {
  test.describe(`@ ${vp.name}`, () => {
    test.use({ viewport: { width: vp.width, height: vp.height } });

    test("curriculum hero + first track panel", async ({ page }) => {
      await page.goto("/curriculum");
      await page.addStyleTag({ content: "*{animation:none!important;transition:none!important}" });
      await expect(
        page.locator('[data-testid="track-hero"][data-track="pharmacovigilance"]').first(),
      ).toHaveScreenshot(`curriculum-pv-hero-${vp.name}.png`, SCREENSHOT_OPTIONS);
    });

    test("courses domain grid", async ({ page }) => {
      await page.goto("/courses");
      await page.addStyleTag({ content: "*{animation:none!important;transition:none!important}" });
      // Capture the whole domain grid by scoping to the first track hero's parent grid.
      const grid = page.locator('[data-testid="track-hero"]').first().locator("..");
      await expect(grid).toHaveScreenshot(`courses-domain-grid-${vp.name}.png`, SCREENSHOT_OPTIONS);
    });

    for (const slug of TRACKS) {
      test(`course detail ${slug} hero`, async ({ page }) => {
        await page.goto(`/courses/${slug}`);
        await page.addStyleTag({
          content: "*{animation:none!important;transition:none!important}",
        });
        await expect(
          page.locator(`[data-testid="track-module"][data-track="${slug}"]`).first(),
        ).toHaveScreenshot(`course-${slug}-module-${vp.name}.png`, SCREENSHOT_OPTIONS);
      });

      test(`apply preselect ${slug} grid`, async ({ page }) => {
        await page.goto(`/apply?programme=${slug}&source=domain-grid`);
        await page.addStyleTag({
          content: "*{animation:none!important;transition:none!important}",
        });
        // Preset banner area
        await expect(page.getByText(/Programme pre-selected|From Industry/i).first()).toBeVisible();
      });
    }
  });
}
