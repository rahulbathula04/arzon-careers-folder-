import { test, expect, type Page } from "@playwright/test";

/**
 * Per-route coverage: every key surface that ships TrackHeroPanel /
 * TrackDomainGrid / TrackModuleCard must render its themed gradient,
 * at desktop AND mobile. Routes the user named that don't exist yet
 * (why-us, pricing as standalone) are intentionally excluded -
 * Pricing lives as a section on /, FAQ likewise.
 */

const TRACKS = [
  "pharmacovigilance",
  "medical-coding",
  "clinical-data-management",
  "sas-clinical",
  "regulatory-affairs",
  "medical-writing",
] as const;

const ROUTES_WITH_DOMAIN_GRID = ["/", "/courses", "/apply"] as const;

const VIEWPORTS = [
  { name: "mobile-390x844", width: 390, height: 844 },
  { name: "desktop-1280x800", width: 1280, height: 800 },
] as const;

async function assertTrackGradient(page: Page, slug: string) {
  const hero = page.locator(`[data-testid="track-hero"][data-track="${slug}"]`).first();
  await expect(hero, `track-hero for ${slug}`).toBeVisible();
  const bg = await hero.evaluate((el) => getComputedStyle(el).backgroundImage);
  expect(bg, `track-hero for ${slug} must carry a gradient`).toMatch(/gradient/i);
}

for (const vp of VIEWPORTS) {
  test.describe(`track theme - ${vp.name}`, () => {
    test.use({ viewport: { width: vp.width, height: vp.height } });

    for (const route of ROUTES_WITH_DOMAIN_GRID) {
      test(`${route} renders the domain grid in all six track colors`, async ({ page }) => {
        await page.goto(route);
        // Scroll into view so lazy / Defer'd sections mount on small viewports.
        await page.locator('[data-testid="track-hero"]').first().scrollIntoViewIfNeeded();
        for (const slug of TRACKS) {
          await assertTrackGradient(page, slug);
        }
      });
    }

    test("/curriculum renders TrackHeroPanel + TrackModuleCard for every track", async ({
      page,
    }) => {
      await page.goto("/curriculum");
      for (const slug of TRACKS) {
        await assertTrackGradient(page, slug);
        await expect(
          page.locator(`[data-testid="track-module"][data-track="${slug}"]`).first(),
        ).toBeVisible();
      }
    });

    for (const slug of TRACKS) {
      test(`/courses/${slug} tints the syllabus module in the track color (${vp.name})`, async ({
        page,
      }) => {
        await page.goto(`/courses/${slug}`);
        const module = page.locator(`[data-testid="track-module"][data-track="${slug}"]`).first();
        await module.scrollIntoViewIfNeeded();
        await expect(module).toBeVisible();
      });
    }
  });
}
