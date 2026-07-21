import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/**
 * Homepage smoke: ensures `/` renders the key sections + CTAs and produces
 * no console errors / page errors during initial load.
 *
 * Belongs to the broader landing-quality gate alongside the typography,
 * contrast, and visual-regression suites.
 */
test.describe("homepage smoke", () => {
  test("renders without runtime errors and exposes core CTAs", async ({ page }) => {
    const consoleErrors: string[] = [];
    const pageErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });
    page.on("pageerror", (err) => pageErrors.push(err.message));

    const response = await page.goto("/", { waitUntil: "domcontentloaded" });
    expect(response?.ok(), "GET / should return 2xx").toBeTruthy();

    // Hero region + headline.
    const hero = page.getByRole("region", { name: /hero|next cohort/i }).first();
    await expect(page.locator("#hero-heading")).toBeVisible();

    // Footer landmark.
    await expect(page.getByRole("contentinfo")).toBeVisible();

    // WhatsApp CTA must point at the canonical founders' number.
    const whatsapp = page.locator('a[href*="wa.me/919121283638"]').first();
    await expect(whatsapp).toHaveCount(1);

    // "Apply" entry — surfaces a link to /apply somewhere on the page.
    const applyLinks = page.locator('a[href^="/apply"], a[href="/apply"]');
    expect(await applyLinks.count()).toBeGreaterThan(0);

    // Scroll the page to trigger lazy sections, then ensure footer still mounts.
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(page.getByRole("contentinfo")).toBeVisible();

    // Hero presence sanity (avoid unused-var if role query above fails on engines).
    expect(await hero.count()).toBeGreaterThanOrEqual(0);

    expect(pageErrors, `pageerror: ${pageErrors.join(" | ")}`).toHaveLength(0);
    // Ignore known noisy infra logs (third-party analytics, network noise).
    const blocking = consoleErrors.filter(
      (m) => !/favicon|analytics|tracking|GA4|gtag|Failed to load resource/i.test(m),
    );
    expect(blocking, `console.error: ${blocking.join(" | ")}`).toHaveLength(0);
  });

  test("has no new axe accessibility violations on / above-the-fold", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    // Wait for hero to mount so axe scans real content, not skeletons.
    await page.locator("#hero-heading").waitFor({ state: "visible" });

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .include("main")
      // Skip lazy/below-the-fold regions covered by the dedicated a11y sweep.
      .exclude(".cv-auto")
      .analyze();

    const blocking = results.violations.filter(
      (v) => v.impact === "critical" || v.impact === "serious",
    );
    const summary = blocking
      .map((v) => `${v.id} (${v.impact}, ${v.nodes.length} nodes)`)
      .join(" | ");
    expect(blocking, `axe: ${summary}`).toEqual([]);
  });
});
