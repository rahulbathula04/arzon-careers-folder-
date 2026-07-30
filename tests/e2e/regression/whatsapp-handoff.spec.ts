import { test, expect } from "@playwright/test";

/**
 * WhatsApp handoff regression. Every canonical CTA surface must expose a
 * wa.me/919121283638 link with target=_blank, safe rel, and a prefilled
 * message body. This is the single choke point for our funnel - a broken
 * href silently drops leads.
 */

// Only surfaces that MUST expose the WhatsApp handoff above-the-fold on
// desktop. `/apply`, `/about`, and `/courses` rely on the mobile FAB
// and the delegated tracker; they're covered by dedicated specs.
const SURFACES = ["/", "/courses/pharmacovigilance"] as const;

for (const path of SURFACES) {
  test(`whatsapp handoff · ${path}`, async ({ page }) => {
    await page.goto(path, { waitUntil: "domcontentloaded" });
    const wa = page.locator('a[href*="wa.me/919121283638"]').first();
    await expect(wa, `no wa.me link on ${path}`).toHaveCount(1);
    const href = await wa.getAttribute("href");
    expect(href).toMatch(/^https:\/\/wa\.me\/919121283638/);
    expect(href, "must include prefilled text").toMatch(/[?&]text=/);
    await expect(wa).toHaveAttribute("target", "_blank");
    await expect(wa).toHaveAttribute("rel", /noopener|noreferrer/);
  });
}
