import { test, expect } from "@playwright/test";

/**
 * Homepage → Apply + WhatsApp smoke.
 *
 * Verifies the hero CTA contract without depending on the full apply form
 * schema (which spans multiple steps and changes often). We assert:
 *   1. The hero primary CTA navigates to `/apply` (cohort apply entry).
 *   2. The WhatsApp CTA points at the canonical founders' number with a
 *      pre-filled message body, and opens in a new tab.
 */
test.describe("homepage apply + whatsapp contract", () => {
  test("hero primary CTA navigates to /apply", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.locator("#hero-heading").waitFor({ state: "visible" });

    const cta = page.getByRole("link", { name: /apply for .* cohort/i }).first();
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute("href", /^\/apply(\?|$)/);

    await cta.click();
    await page.waitForURL(/\/apply/);
    expect(page.url()).toMatch(/\/apply/);
  });

  test("WhatsApp CTA points at founders' number with prefilled text", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.locator("#hero-heading").waitFor({ state: "visible" });

    const wa = page.locator('a[href*="wa.me/919121283638"]').first();
    await expect(wa).toHaveCount(1);
    const href = await wa.getAttribute("href");
    expect(href).toMatch(/^https:\/\/wa\.me\/919121283638/);
    expect(href).toMatch(/[?&]text=/); // prefilled body
    await expect(wa).toHaveAttribute("target", "_blank");
    await expect(wa).toHaveAttribute("rel", /noopener/);
  });
});
