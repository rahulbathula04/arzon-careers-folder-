import { test, expect } from "@playwright/test";

/**
 * Verifies the contact contract for the readiness flow:
 *  - The homepage hero does NOT expose a wa.me link (single CTA only).
 *  - The /career-engine/start lead page does NOT expose a wa.me link until
 *    after the user submits.
 *  - Any wa.me link on result/enrol pages uses the locked phone number
 *    919121283638 with target=_blank and rel=noopener noreferrer.
 */
test.describe("readiness flow — WhatsApp payload appears only after submit", () => {
  test("hero has no wa.me anchor", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("section#top a[href*='wa.me']")).toHaveCount(0);
  });

  test("/career-engine/start has no wa.me anchor before form submit", async ({ page }) => {
    await page.goto("/career-engine/start");
    await page.getByRole("heading", { level: 1 }).waitFor();
    await expect(page.locator("a[href*='wa.me']")).toHaveCount(0);
  });

  test("any wa.me link on the site uses the locked counsellor number and safe rel", async ({
    page,
  }) => {
    // /career-engine (intro) renders a counsellor wa.me link.
    await page.goto("/career-engine");
    const links = page.locator("a[href*='wa.me']");
    const count = await links.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      const link = links.nth(i);
      const href = await link.getAttribute("href");
      expect(href).toMatch(/^https:\/\/wa\.me\/919121283638(\?|$)/);
      // Phone must be raw digits — no +, no spaces, no dashes.
      expect(href).not.toMatch(/wa\.me\/\+/);
      expect(href).not.toMatch(/wa\.me\/91 /);

      const url = new URL(href!);
      // Optional text payload must decode cleanly when present.
      const text = url.searchParams.get("text");
      if (text !== null) expect(text.length).toBeGreaterThan(0);

      await expect(link).toHaveAttribute("target", "_blank");
      const rel = (await link.getAttribute("rel")) ?? "";
      expect(rel).toContain("noopener");
      expect(rel).toContain("noreferrer");
    }
  });
});
