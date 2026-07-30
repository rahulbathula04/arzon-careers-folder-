import { test, expect, devices } from "@playwright/test";

/**
 * Sticky-tab regression across ALL course slugs at mobile (320px + iPhone 12)
 * and tablet (768px) widths.
 *
 * Locks:
 *   - Sticky tab bar mounts and stays fully opaque (no bg-white bleaching /
 *     transparency artefacts) at 320px and 768px.
 *   - Clicking a tab scrolls the target section BELOW the sticky header +
 *     tab bar (no clip regression).
 *   - Hash navigation (#outcomes, #modules, ...) selects the matching tab.
 *   - Scrolling to a section updates aria/color state so the correct tab
 *     lights up (active-state selection).
 */

const SLUGS = [
  "pharmacovigilance",
  "medical-coding",
  "clinical-data-management",
  "sas-clinical",
  "regulatory-affairs",
  "nanoscience",
  "clinical-saas",
  "healthcare-rcm",
  "digital-health-fhir",
] as const;

const TABS = ["about", "outcomes", "modules", "recommendations", "reviews"] as const;

const VIEWPORTS = [
  { label: "mobile-320", width: 320, height: 720 },
  { label: "mobile-iphone12", ...devices["iPhone 12"].viewport },
  { label: "tablet-768", width: 768, height: 1024 },
] as const;

// Keep the matrix fast: exercise every slug on the narrowest mobile, and
// double-check the other viewports on the flagship trio.
const FLAGSHIP = new Set(["pharmacovigilance", "medical-coding", "clinical-data-management"]);

function isFullyOpaque(rgba: string): boolean {
  // matches rgb(...) or rgba(..., a); reject anything with alpha < 1.
  const m = rgba.match(/rgba?\(([^)]+)\)/i);
  if (!m) return false;
  const parts = m[1].split(",").map((s) => s.trim());
  if (parts.length < 4) return true; // rgb() has no alpha channel → opaque
  const a = Number(parts[3]);
  return Number.isFinite(a) && a >= 0.999;
}

for (const vp of VIEWPORTS) {
  test.describe(`sticky tabs @ ${vp.label} (${vp.width}x${vp.height})`, () => {
    test.use({ viewport: { width: vp.width, height: vp.height } });

    for (const slug of SLUGS) {
      if (vp.label !== "mobile-320" && !FLAGSHIP.has(slug)) continue;

      test(`${slug} · sticky tab bar is opaque and does not overlap content`, async ({ page }) => {
        await page.goto(`/courses/${slug}`, { waitUntil: "domcontentloaded" });
        await page.addStyleTag({
          content:
            "*{scroll-behavior:auto!important;transition:none!important;animation:none!important}",
        });

        const tabBar = page
          .locator('a[href="#about"]')
          .first()
          .locator("xpath=ancestor::div[contains(@class,'sticky')][1]");
        await expect(tabBar).toBeVisible();

        // Scroll enough to engage sticky behaviour.
        await page.evaluate(() => window.scrollTo(0, 600));
        await page.waitForTimeout(120);

        const bg = await tabBar.evaluate((el) => getComputedStyle(el).backgroundColor);
        expect(isFullyOpaque(bg), `tab bar bg must be opaque, got ${bg}`).toBe(true);

        // The bar sits at the top of the viewport under the 57px header.
        const box = await tabBar.boundingBox();
        expect(box, "tab bar has no bounding box").not.toBeNull();
        expect(box!.y).toBeLessThanOrEqual(80);
        // Bar height stays within reasonable sticky-chip range.
        expect(box!.height).toBeGreaterThanOrEqual(36);
        expect(box!.height).toBeLessThanOrEqual(72);
      });

      test(`${slug} · every tab scrolls target BELOW sticky bar`, async ({ page }) => {
        await page.goto(`/courses/${slug}`, { waitUntil: "domcontentloaded" });
        await page.addStyleTag({
          content:
            "*{scroll-behavior:auto!important;transition:none!important;animation:none!important}",
        });

        for (const id of TABS) {
          await page.locator(`a[href="#${id}"]`).first().click();
          await page.waitForTimeout(150);
          const rect = await page.locator(`#${id}`).boundingBox();
          expect(rect, `#${id} has no bounding box`).not.toBeNull();
          // Header (57px) + tab bar (~44-48px) < top < scroll-mt (140px)
          expect(rect!.y).toBeGreaterThanOrEqual(60);
          expect(rect!.y).toBeLessThanOrEqual(160);
        }
      });

      test(`${slug} · hash navigation activates matching tab`, async ({ page }) => {
        for (const id of TABS) {
          await page.goto(`/courses/${slug}#${id}`, { waitUntil: "domcontentloaded" });
          await page.waitForTimeout(200);
          const link = page.locator(`a[href="#${id}"]`).first();
          const borderColor = await link.evaluate(
            (el) => (el as HTMLElement).style.borderColor || getComputedStyle(el).borderBottomColor,
          );
          // Active tab paints its border with the BRAND colour (not transparent).
          expect(
            borderColor,
            `#${id} tab must not have transparent border when active`,
          ).not.toMatch(/transparent|rgba\(0,\s*0,\s*0,\s*0\)/i);
        }
      });

      test(`${slug} · scrolling to a section lights up its tab`, async ({ page }) => {
        if (!FLAGSHIP.has(slug)) test.skip();
        await page.goto(`/courses/${slug}`, { waitUntil: "domcontentloaded" });
        await page.addStyleTag({
          content:
            "*{scroll-behavior:auto!important;transition:none!important;animation:none!important}",
        });

        for (const id of TABS) {
          await page.evaluate((sid) => {
            const el = document.getElementById(sid);
            if (!el) return;
            const y = el.getBoundingClientRect().top + window.scrollY - 120;
            window.scrollTo(0, y);
          }, id);
          // give the rAF-throttled listener a couple of frames
          await page.waitForTimeout(120);

          const link = page.locator(`a[href="#${id}"]`).first();
          const color = await link.evaluate(
            (el) => (el as HTMLElement).style.color || getComputedStyle(el).color,
          );
          // Active tab uses BRAND colour, non-active tabs use INK; both are
          // opaque but distinct. We just require the active link to have a
          // non-empty resolved colour - the important assertion is that the
          // border went non-transparent for the currently scrolled section.
          const borderColor = await link.evaluate(
            (el) => (el as HTMLElement).style.borderColor || getComputedStyle(el).borderBottomColor,
          );
          expect(color).toBeTruthy();
          expect(borderColor, `expected #${id} to be active after scroll`).not.toMatch(
            /transparent|rgba\(0,\s*0,\s*0,\s*0\)/i,
          );
        }
      });
    }
  });
}
