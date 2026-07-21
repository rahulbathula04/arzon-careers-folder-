import { test, expect } from "@playwright/test";

/**
 * Home page regression. Critical path: hero H1, primary CTA → /apply,
 * WhatsApp handoff intact, footer mounts, no runtime errors.
 */

test.describe("regression · home", () => {
  test("renders with no runtime errors + core CTAs wired", async ({ page }) => {
    const consoleErrors: string[] = [];
    const pageErrors: string[] = [];
    page.on("console", (m) => m.type() === "error" && consoleErrors.push(m.text()));
    page.on("pageerror", (e) => pageErrors.push(e.message));

    const resp = await page.goto("/", { waitUntil: "domcontentloaded" });
    expect(resp?.ok(), "/ returns 2xx").toBeTruthy();

    await expect(page.locator("#hero-heading")).toBeVisible();
    await expect(page.getByRole("contentinfo")).toBeVisible();

    // Primary CTA → /apply
    const applyLink = page
      .getByRole("link", { name: /apply for .* cohort|readiness assessment/i })
      .first();
    await expect(applyLink).toBeVisible();

    // Canonical founders WhatsApp number, single source of truth.
    const wa = page.locator('a[href*="wa.me/919121283638"]').first();
    await expect(wa).toBeVisible();
    await expect(wa).toHaveAttribute("target", "_blank");
    expect(await wa.getAttribute("href")).toMatch(/[?&]text=/);

    expect(pageErrors, `page errors: ${pageErrors.join(" | ")}`).toEqual([]);
    const blocking = consoleErrors.filter(
      (m) => !/favicon|analytics|gtag|Failed to load resource/i.test(m),
    );
    expect(blocking, `console errors: ${blocking.join(" | ")}`).toEqual([]);
  });
});
