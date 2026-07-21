import { test, expect } from "@playwright/test";

/**
 * Locks the homepage hero to a single primary CTA. Fails if a counsellor /
 * WhatsApp / apply / cohort link is added back or if a duplicate primary CTA
 * is rendered.
 */
test.describe("homepage hero — single primary CTA", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.locator("section#top").waitFor({ state: "visible" });
  });

  test("exactly one primary CTA exists and is the readiness test", async ({ page }) => {
    const hero = page.locator("section#top");
    const primary = hero.locator('[data-testid="hero-primary-cta"]');
    await expect(primary).toHaveCount(1);
    await expect(primary).toBeVisible();
    await expect(primary).toHaveText(/Get my industry-fit score/i);
    await expect(primary).toHaveAttribute("href", /\/career-engine\/start/);
  });

  test("no secondary CTA, no WhatsApp link, no apply/cohort link in hero", async ({ page }) => {
    const hero = page.locator("section#top");
    await expect(hero.locator('[data-testid="hero-secondary-cta"]')).toHaveCount(0);
    await expect(hero.locator('a[href*="wa.me"]')).toHaveCount(0);
    await expect(hero.getByRole("link", { name: /counsellor|counselor|whatsapp/i })).toHaveCount(0);
    await expect(hero.getByRole("link", { name: /^apply\b|cohort|book.*seat/i })).toHaveCount(0);
  });

  test("primary CTA disables itself after click to prevent double submit", async ({ page }) => {
    const primary = page.locator('[data-testid="hero-primary-cta"]');
    // Intercept the navigation so we can observe the pending state.
    await page.route("**/career-engine/start", async (route) => {
      await new Promise((r) => setTimeout(r, 300));
      await route.continue();
    });
    await primary.click({ noWaitAfter: true });
    await expect(primary).toHaveAttribute("aria-busy", "true");
    await expect(primary).toHaveAttribute("aria-disabled", "true");
  });
});
