import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/**
 * Accessibility regression for every CTA / link inside the homepage hero
 * (`section#top`) and the final CTA band (`section#apply`). Catches:
 *   - axe violations: color-contrast, button-name, link-name,
 *     aria-allowed-attr, duplicate-id-active, duplicate-id-aria.
 *   - Missing/empty accessible names on interactive elements.
 *   - Missing :focus-visible affordance (outline OR box-shadow change).
 *   - Duplicate primary hero CTAs (readiness test + WhatsApp counsellor).
 */

const VIEWPORTS = [
  { name: "desktop", width: 1280, height: 900 },
  { name: "mobile", width: 390, height: 844 },
] as const;

const A11Y_RULES = [
  "color-contrast",
  "button-name",
  "link-name",
  "aria-allowed-attr",
  "duplicate-id-active",
  "duplicate-id-aria",
];

async function ensureFocusAffordance(page: Page, selector: string) {
  const el = page.locator(selector).first();
  await el.scrollIntoViewIfNeeded();
  // Tailwind focus-visible:* classes are how we ship every hero CTA's focus
  // ring. Asserting on className keeps the test independent of Chromium's
  // heuristic for :focus-visible after programmatic .focus().
  const cls = (await el.getAttribute("class")) ?? "";
  expect(
    /focus-visible:(outline|ring|shadow|border)/.test(cls),
    `${selector} must declare a focus-visible:* utility - got "${cls}"`,
  ).toBe(true);
  await el.focus();
  await expect(el).toBeFocused();
}

for (const vp of VIEWPORTS) {
  test.describe(`homepage CTA a11y · ${vp.name}`, () => {
    test.use({ viewport: { width: vp.width, height: vp.height } });

    test.beforeEach(async ({ page }) => {
      await page.goto("/", { waitUntil: "domcontentloaded" });
      await page.locator("#hero-heading").waitFor();
    });

    test("hero + final CTA pass axe (contrast, names, dup ids)", async ({ page }) => {
      const results = await new AxeBuilder({ page })
        .include("section#top")
        .include("section#apply")
        .withRules(A11Y_RULES)
        .analyze();
      expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
    });

    test("every hero + final-CTA interactive element has a non-empty accessible name", async ({
      page,
    }) => {
      for (const sectionId of ["top", "apply"]) {
        const section = page.locator(`section#${sectionId}`);
        await section.scrollIntoViewIfNeeded();
        const handles = await section
          .locator("a, button, [role=button], [role=link]")
          .elementHandles();
        for (const h of handles) {
          const visible = await h.isVisible().catch(() => false);
          if (!visible) continue;
          const name = await h.evaluate((el) => {
            const labelled = (el.getAttribute("aria-label") ?? "").trim();
            if (labelled) return labelled;
            const text = (el.textContent ?? "").replace(/\s+/g, " ").trim();
            return text;
          });
          expect(
            name.length,
            `Interactive in #${sectionId} has empty accessible name`,
          ).toBeGreaterThan(0);
        }
      }
    });

    test("hero has exactly one readiness-test CTA and one WhatsApp counsellor CTA", async ({
      page,
    }) => {
      const hero = page.locator("section#top");
      await expect(hero.getByRole("link", { name: /readiness assessment/i })).toHaveCount(1);
      await expect(hero.getByRole("link", { name: /WhatsApp/i })).toHaveCount(1);
    });

    test("hero primary + secondary CTAs show focus-visible affordance", async ({ page }) => {
      await ensureFocusAffordance(page, '[data-testid="hero-primary-cta"]');
      await ensureFocusAffordance(page, '[data-testid="hero-secondary-cta"]');
    });
  });
}
