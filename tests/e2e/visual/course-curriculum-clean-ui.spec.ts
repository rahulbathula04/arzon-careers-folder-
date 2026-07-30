import { test, expect } from "@playwright/test";

/**
 * Visual regression: lock the clean course + curriculum UI after the sticky
 * mobile CTA was removed and the final CTA was anchored at the bottom of the
 * page. Captures hero + final-CTA on each flagship/secondary slug across the
 * three breakpoints we ship for (mobile / tablet / desktop) and asserts that
 * the sticky mobile enrolment bar never reappears.
 *
 * Baseline:
 *   bunx playwright test tests/e2e/visual/course-curriculum-clean-ui.spec.ts \
 *     --update-snapshots
 */

const VIEWPORTS = [
  { name: "mobile-390x844", width: 390, height: 844 },
  { name: "tablet-820x1100", width: 820, height: 1100 },
  { name: "desktop-1280x900", width: 1280, height: 900 },
] as const;

const SLUGS = [
  "pharmacovigilance",
  "medical-coding",
  "clinical-data-management",
  "sas-clinical",
  "ai-intelligence",
] as const;

const SHOT = {
  animations: "disabled" as const,
  maxDiffPixelRatio: 0.025,
};

const KILL_MOTION =
  "*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}";

test.describe.configure({ mode: "parallel" });

for (const vp of VIEWPORTS) {
  test.describe(`clean course/curriculum UI @ ${vp.name}`, () => {
    test.use({ viewport: { width: vp.width, height: vp.height } });

    test("curriculum index hero", async ({ page }) => {
      await page.goto("/curriculum", { waitUntil: "domcontentloaded" });
      await page.addStyleTag({ content: KILL_MOTION });
      await page.waitForLoadState("networkidle").catch(() => {});
      await expect(page).toHaveScreenshot(`curriculum-top-${vp.name}.png`, SHOT);
    });

    test("courses index grid", async ({ page }) => {
      await page.goto("/courses", { waitUntil: "domcontentloaded" });
      await page.addStyleTag({ content: KILL_MOTION });
      await page.waitForLoadState("networkidle").catch(() => {});
      await expect(page).toHaveScreenshot(`courses-index-${vp.name}.png`, SHOT);
    });

    for (const slug of SLUGS) {
      test(`course ${slug} - hero + final CTA + no sticky bar`, async ({ page }) => {
        await page.goto(`/courses/${slug}`, { waitUntil: "domcontentloaded" });
        await page.addStyleTag({ content: KILL_MOTION });
        await page.waitForLoadState("networkidle").catch(() => {});

        const hero = page.locator(`[data-testid="course-hero"][data-slug="${slug}"]`);
        await expect(hero).toBeVisible();
        await expect(hero).toHaveScreenshot(`course-${slug}-hero-${vp.name}.png`, SHOT);

        const finalCta = page.locator(`[data-testid="course-final-cta"][data-slug="${slug}"]`);
        await finalCta.scrollIntoViewIfNeeded();
        await expect(finalCta).toBeVisible();
        await expect(finalCta).toHaveScreenshot(`course-${slug}-final-cta-${vp.name}.png`, SHOT);

        // Sticky mobile CTA must NOT re-appear on any breakpoint.
        await expect(page.locator('[data-testid="mobile-sticky-cta"]')).toHaveCount(0);
        await expect(page.locator('[data-testid="mobile-enrolment-bar"]')).toHaveCount(0);

        // Primary "Start your application" CTA must live inside the final CTA
        // band - i.e. at the END of the page, not pinned to the viewport.
        const finalCtaApply = finalCta.getByRole("link", { name: /start your application/i });
        await expect(finalCtaApply).toBeVisible();
      });
    }
  });
}
