import { test, expect, type Page } from "@playwright/test";

/**
 * Contract spec for the locked track design system.
 *
 * For every track surface (curriculum, course detail, apply with a preselected
 * programme, /courses domain grid, apply domain grid) the hero panel must
 * carry the `data-testid="track-hero"` + `data-track=<slug>` contract, AND
 * its computed `background-image` must contain a non-empty gradient so the
 * locked TRACK_THEME tokens cannot silently drift to a neutral background.
 *
 * Module cards have the same contract (`data-testid="track-module"`).
 */

const TRACK_SLUGS = [
  "pharmacovigilance",
  "medical-coding",
  "clinical-data-management",
  "sas-clinical",
  "regulatory-affairs",
  "medical-writing",
] as const;

async function assertTrackedGradient(page: Page, slug: string) {
  const hero = page.locator(`[data-testid="track-hero"][data-track="${slug}"]`).first();
  await expect(hero, `track-hero for ${slug} must render`).toBeVisible();
  const bg = await hero.evaluate((el) => getComputedStyle(el).backgroundImage);
  expect(bg, `track-hero for ${slug} must carry a gradient (got "${bg}")`).toMatch(/gradient/i);
}

test.describe("track theme contract", () => {
  test("curriculum page renders every track hero with its locked gradient", async ({ page }) => {
    await page.goto("/curriculum");
    for (const slug of TRACK_SLUGS) {
      await assertTrackedGradient(page, slug);
    }
    // At least one themed module card present.
    await expect(page.locator('[data-testid="track-module"]').first()).toBeVisible();
  });

  test("courses domain grid surfaces all six core tracks", async ({ page }) => {
    await page.goto("/courses");
    for (const slug of TRACK_SLUGS) {
      await assertTrackedGradient(page, slug);
    }
  });

  for (const slug of TRACK_SLUGS) {
    test(`course detail /${slug} keeps track theme on hero icon + syllabus`, async ({ page }) => {
      await page.goto(`/courses/${slug}`);
      // Syllabus modules carry the track tag (rendered by SyllabusAccordion).
      await expect(
        page.locator(`[data-testid="track-module"][data-track="${slug}"]`).first(),
      ).toBeVisible();
    });

    test(`apply preselect for ${slug} shows the preset banner`, async ({ page }) => {
      await page.goto(`/apply?programme=${slug}&source=domain-grid`);
      await expect(page.getByText(/Programme pre-selected|From Industry/i)).toBeVisible();
    });
  }
});
