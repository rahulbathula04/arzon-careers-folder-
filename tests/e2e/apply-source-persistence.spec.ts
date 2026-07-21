import { test, expect } from "@playwright/test";

/**
 * `source` must travel alongside `programme` through the whole funnel:
 *  - written to localStorage on /apply hydrate
 *  - preserved across navigation to /apply/review
 *  - persisted to the application state used by /apply/confirm (which
 *    forwards it to submitApplication.utmSource).
 *
 * Also: switching the domain on /apply must update the preselected
 * programme (latest entry-point wins) without losing the source tag.
 */

const STORAGE_KEY = "arzon_application_v1";

test("source is seeded into localStorage on /apply and survives navigation", async ({ page }) => {
  await page.goto("/courses");
  await page.evaluate((k) => window.localStorage.removeItem(k), STORAGE_KEY);

  await page.goto("/apply?programme=pharmacovigilance&source=domain-grid");
  // Hydrate effect runs after mount — wait for the preset banner.
  await expect(page.getByText(/Programme pre-selected|From Industry/i)).toBeVisible();

  const after = await page.evaluate((k) => window.localStorage.getItem(k), STORAGE_KEY);
  const parsed = JSON.parse(after as string);
  expect(parsed.programmeSlug).toBe("pharmacovigilance");
  expect(parsed.source).toBe("domain-grid");

  // Walking forward via URL keeps source in the query string.
  await page.goto("/apply/review?programme=pharmacovigilance&source=domain-grid");
  expect(page.url()).toContain("source=domain-grid");
  const review = await page.evaluate((k) => window.localStorage.getItem(k), STORAGE_KEY);
  expect(JSON.parse(review as string).source).toBe("domain-grid");
});

test("switching the domain on /apply updates the preselected programme but keeps source", async ({
  page,
}) => {
  await page.goto("/courses");
  await page.evaluate((k) => window.localStorage.removeItem(k), STORAGE_KEY);

  // Enter via PV tile.
  await page.goto("/apply?programme=pharmacovigilance&source=domain-grid");
  await expect(page.getByText(/Pharmacovigilance/)).toBeVisible();
  let stored = JSON.parse(
    (await page.evaluate((k) => window.localStorage.getItem(k), STORAGE_KEY)) as string,
  );
  expect(stored.programmeSlug).toBe("pharmacovigilance");
  expect(stored.source).toBe("domain-grid");

  // User changes mind: re-enters via Medical Coding tile (clears the banner,
  // the page renders the domain grid again, click Apply → new ?programme=).
  await page.getByRole("link", { name: /clear/i }).click();
  const codingApply = page
    .locator('[data-testid="track-hero"][data-track="medical-coding"]')
    .first()
    .getByRole("link", { name: /Apply for this internship/i });
  await codingApply.click();

  await expect(page).toHaveURL(/programme=medical-coding/);
  await expect(page.getByText(/Medical Coding/)).toBeVisible();

  stored = JSON.parse(
    (await page.evaluate((k) => window.localStorage.getItem(k), STORAGE_KEY)) as string,
  );
  expect(stored.programmeSlug).toBe("medical-coding");
  // Source comes from the tile's Link search prop (`source: "domain-grid"`).
  expect(stored.source).toBe("domain-grid");
});
