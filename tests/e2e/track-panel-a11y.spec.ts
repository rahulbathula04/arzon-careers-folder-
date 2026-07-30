import { test, expect } from "@playwright/test";

/**
 * TrackHeroPanel + TrackModuleCard accessibility contract.
 *
 * The components themselves are presentational containers, but they must:
 *  - expose a heading at the right level (h1/h2 for the hero, h3 for the module)
 *  - keep any interactive children (Apply / See programme links) keyboard
 *    reachable with a visible focus indicator
 *  - mark their decorative emoji icons aria-hidden so screen readers don't
 *    announce "rocket pill capsule" before the title.
 */

test("TrackHeroPanel on /courses exposes a heading + reachable CTAs with focus rings", async ({
  page,
}) => {
  await page.goto("/courses");
  const hero = page.locator('[data-testid="track-hero"][data-track="pharmacovigilance"]').first();
  await expect(hero).toBeVisible();

  // Heading semantics - every hero renders at h1 or h2.
  const heading = hero.locator("h1, h2").first();
  await expect(heading).toBeVisible();

  // Decorative emoji is aria-hidden.
  const emoji = hero.locator("[aria-hidden]").first();
  await expect(emoji).toHaveCount(1);

  // CTA inside the hero footer is keyboard-focusable with a visible ring.
  const apply = hero.getByRole("link", { name: /Apply for this internship/i });
  await apply.focus();
  await expect(apply).toBeFocused();
  const ring = await apply.evaluate((el) => {
    const s = getComputedStyle(el);
    return {
      outlineStyle: s.outlineStyle,
      outlineWidth: s.outlineWidth,
      boxShadow: s.boxShadow,
    };
  });
  const hasFocusRing =
    (ring.outlineStyle !== "none" && ring.outlineWidth !== "0px") ||
    (ring.boxShadow && ring.boxShadow !== "none");
  expect(hasFocusRing, JSON.stringify(ring)).toBeTruthy();
});

test("TrackModuleCard on /curriculum uses h3 headings and inherits keyboard order", async ({
  page,
}) => {
  await page.goto("/curriculum");
  const modules = page.locator('[data-testid="track-module"]');
  await expect(modules.first()).toBeVisible();
  const count = await modules.count();
  expect(count).toBeGreaterThan(0);

  // Sample the first three module cards.
  for (let i = 0; i < Math.min(count, 3); i++) {
    const card = modules.nth(i);
    const h3 = card.locator("h3").first();
    await expect(h3).toBeVisible();
    // No positive tabindex traps inside a module card.
    const trap = await card.locator('[tabindex]:not([tabindex="0"]):not([tabindex="-1"])').count();
    expect(trap).toBe(0);
  }
});
