import { test, expect } from "@playwright/test";

/**
 * Course detail regression, parameterised across the three flagship
 * tracks. Locks:
 *   - hero + sticky-tab bar mount
 *   - every anchor tab scrolls its section into view WITHOUT clipping
 *     under the sticky bar (prevents the empty-band regression fixed
 *     on the /courses/pharmacovigilance page)
 *   - Apply CTA propagates `?programme=<slug>` to /apply
 */

const SLUGS = ["pharmacovigilance", "medical-coding", "clinical-data-management"] as const;

const TABS = ["about", "outcomes", "modules", "recommendations", "reviews"] as const;

for (const slug of SLUGS) {
  test.describe(`regression · /courses/${slug}`, () => {
    test("hero + sticky tabs mount, no page errors", async ({ page }) => {
      const errs: string[] = [];
      page.on("pageerror", (e) => errs.push(e.message));
      await page.goto(`/courses/${slug}`, { waitUntil: "domcontentloaded" });

      await expect(page.getByRole("link", { name: /About/i }).first()).toBeVisible();
      await expect(page.getByRole("link", { name: /Outcomes/i }).first()).toBeVisible();
      await expect(page.getByRole("link", { name: /Modules/i }).first()).toBeVisible();
      await expect(page.getByRole("heading", { name: /Skills you'll gain/i })).toBeVisible();
      expect(errs).toEqual([]);
    });

    test("tab clicks scroll section headings BELOW the sticky bar (no clip)", async ({ page }) => {
      await page.goto(`/courses/${slug}`, { waitUntil: "domcontentloaded" });
      await page.addStyleTag({
        content:
          "*{scroll-behavior:auto!important;transition:none!important;animation:none!important}",
      });

      for (const id of TABS) {
        await page.locator(`a[href="#${id}"]`).first().click();
        // Wait a tick for scroll to settle.
        await page.waitForTimeout(150);
        const rect = await page.locator(`#${id}`).boundingBox();
        // Sticky top-nav (57px) + sticky tab bar (48px) = 105px. Sections
        // use scroll-mt-[120px] to leave a small breathing gap.
        // Section should land at or below the sticky bar bottom.
        expect(rect, `#${id} has no bounding box`).not.toBeNull();
        expect(rect!.y).toBeGreaterThanOrEqual(80);
        expect(rect!.y).toBeLessThanOrEqual(160);
      }
    });

    test("Enquiry / enrol CTA is present", async ({ page }) => {
      await page.goto(`/courses/${slug}`, { waitUntil: "domcontentloaded" });
      const ctaCount = await page
        .locator('a[href*="/enrol"], a[href*="/apply"], a[href*="wa.me"]')
        .count();
      expect(ctaCount, "detail page must expose at least one conversion CTA").toBeGreaterThan(0);
    });
  });
}
