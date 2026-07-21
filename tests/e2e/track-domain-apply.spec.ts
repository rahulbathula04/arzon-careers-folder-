import { test, expect } from "@playwright/test";

/**
 * End-to-end: click each track tile on /courses and assert the Apply page
 * loads with the right programme preselected (URL + on-page banner +
 * persisted localStorage state).
 */

const TRACKS = [
  { slug: "pharmacovigilance", label: "Pharmacovigilance" },
  { slug: "medical-coding", label: "Medical Coding" },
  { slug: "clinical-data-management", label: "Clinical Data Management" },
  { slug: "regulatory-affairs", label: "Regulatory Affairs" },
  { slug: "sas-clinical", label: "Clinical SAS Programming" },
  { slug: "medical-writing", label: "Medical Writing" },
] as const;

for (const t of TRACKS) {
  test(`domain grid → apply preselects ${t.slug}`, async ({ page }) => {
    // Start clean so the hydrate-from-seed branch in useApplication runs.
    await page.goto("/courses");
    await page.evaluate(() => window.localStorage.removeItem("arzon_application_v1"));

    const tile = page.locator(`[data-testid="track-hero"][data-track="${t.slug}"]`).first();
    await expect(tile).toBeVisible();
    await tile.getByRole("link", { name: /Apply for this internship/i }).click();

    await expect(page).toHaveURL(new RegExp(`/apply\\?.*programme=${t.slug}`));
    await expect(page.getByText(/Programme pre-selected|From Industry/i)).toBeVisible();
    await expect(page.getByText(t.label, { exact: false })).toBeVisible();

    // Persist check: useApplication writes the seed into localStorage.
    const stored = await page.evaluate(() => window.localStorage.getItem("arzon_application_v1"));
    expect(stored).toBeTruthy();
    expect(JSON.parse(stored as string).programmeSlug).toBe(t.slug);
  });
}
