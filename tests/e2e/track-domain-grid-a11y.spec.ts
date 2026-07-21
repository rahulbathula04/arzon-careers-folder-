import { test, expect } from "@playwright/test";

/**
 * TrackDomainGrid keyboard + ARIA contract.
 *
 * Each tile is an <article> with two <a> children (Apply, See full programme).
 * The Apply link must be reachable by Tab, focus-visible, activate on Enter,
 * and the link text + heading combination must give the tile an accessible
 * name that names the track.
 */

const TRACKS = [
  { slug: "pharmacovigilance", label: "Pharmacovigilance" },
  { slug: "medical-coding", label: "Medical Coding" },
  { slug: "clinical-data-management", label: "Clinical Data Management" },
  { slug: "regulatory-affairs", label: "Regulatory Affairs" },
  { slug: "sas-clinical", label: "Clinical SAS Programming" },
  { slug: "medical-writing", label: "Medical Writing" },
] as const;

test("every tile exposes a track-named Apply link and a See-programme link", async ({ page }) => {
  await page.goto("/courses");
  for (const t of TRACKS) {
    const tile = page.locator(`[data-testid="track-hero"][data-track="${t.slug}"]`).first();
    await expect(tile.getByRole("heading", { name: t.label })).toBeVisible();
    const apply = tile.getByRole("link", { name: /Apply for this internship/i });
    const see = tile.getByRole("link", { name: /See full programme/i });
    await expect(apply).toHaveAttribute("href", new RegExp(`programme=${t.slug}`));
    await expect(see).toHaveAttribute("href", new RegExp(`/courses/${t.slug}`));
  }
});

test("keyboard Tab walks every Apply link in domain order and Enter activates", async ({
  page,
}) => {
  await page.goto("/courses");
  await page.evaluate(() => window.localStorage.removeItem("arzon_application_v1"));

  // Focus the first Apply link explicitly, then walk through the rest with Tab.
  const firstApply = page
    .locator('[data-testid="track-hero"][data-track="pharmacovigilance"]')
    .first()
    .getByRole("link", { name: /Apply for this internship/i });
  await firstApply.focus();
  await expect(firstApply).toBeFocused();

  for (const t of TRACKS.slice(1)) {
    // Tab past the "See full programme" sibling link to the next tile's Apply.
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    const next = page
      .locator(`[data-testid="track-hero"][data-track="${t.slug}"]`)
      .first()
      .getByRole("link", { name: /Apply for this internship/i });
    await expect(next).toBeFocused();
  }

  // Activate the currently focused Apply link with Enter.
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/apply\?.*programme=medical-writing/);
});

test("focused Apply link shows a visible focus ring", async ({ page }) => {
  await page.goto("/courses");
  const apply = page
    .locator('[data-testid="track-hero"][data-track="pharmacovigilance"]')
    .first()
    .getByRole("link", { name: /Apply for this internship/i });
  await apply.focus();
  const outline = await apply.evaluate((el) => {
    const s = getComputedStyle(el);
    return { outlineStyle: s.outlineStyle, outlineWidth: s.outlineWidth, boxShadow: s.boxShadow };
  });
  const hasVisibleFocus =
    (outline.outlineStyle !== "none" && outline.outlineWidth !== "0px") ||
    (outline.boxShadow && outline.boxShadow !== "none");
  expect(
    hasVisibleFocus,
    `focus indicator must be visible (got ${JSON.stringify(outline)})`,
  ).toBeTruthy();
});
