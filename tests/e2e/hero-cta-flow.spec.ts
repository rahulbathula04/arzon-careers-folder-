import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/**
 * Hero CTA flow.
 *
 * Locks the homepage hero contract:
 *   - Primary CTA = readiness assessment (/career-engine/start).
 *   - Secondary CTA = WhatsApp counsellor (wa.me/919121283638, new tab).
 *   - No cohort Apply CTA / countdown text.
 *   - Both CTAs are keyboard reachable, expose accessible names,
 *     and pass axe contrast/button-name/link-name/aria checks.
 */
test.describe("homepage hero CTAs", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.locator("#hero-heading").waitFor();
  });

  test("primary CTA navigates to the readiness assessment", async ({ page }) => {
    const primary = page.getByTestId("hero-primary-cta");
    await expect(primary).toBeVisible();
    await expect(primary).toHaveAttribute("aria-label", /readiness assessment/i);
    await primary.click();
    await page.waitForURL(/\/career-engine\/start$/);
    await expect(page).toHaveURL(/\/career-engine\/start$/);
  });

  test("counsellor CTA points to WhatsApp in a new tab with safe rel", async ({ page }) => {
    const secondary = page.getByTestId("hero-secondary-cta");
    await expect(secondary).toBeVisible();
    await expect(secondary).toHaveAttribute("target", "_blank");
    const rel = (await secondary.getAttribute("rel")) ?? "";
    expect(rel).toContain("noopener");
    expect(rel).toContain("noreferrer");
    const href = (await secondary.getAttribute("href")) ?? "";
    expect(href).toMatch(/^https:\/\/wa\.me\/919121283638\?text=/);
    expect(decodeURIComponent(href)).toMatch(/counsellor/i);
    await expect(secondary).toHaveAttribute("aria-label", /WhatsApp/i);
  });

  test("hero exposes no cohort Apply CTA or countdown", async ({ page }) => {
    const hero = page.locator("#hero-heading").locator("xpath=ancestor::section[1]");
    await expect(hero.getByRole("link", { name: /apply for .*cohort/i })).toHaveCount(0);
    await expect(hero.locator('[href="/apply"]')).toHaveCount(0);
    await expect(hero.getByText(/applications close in/i)).toHaveCount(0);
  });

  test("primary + secondary CTAs are keyboard reachable with visible focus", async ({ page }) => {
    const primary = page.getByTestId("hero-primary-cta");
    await primary.focus();
    await expect(primary).toBeFocused();
    const outline = await primary.evaluate(
      (el) => getComputedStyle(el as HTMLElement).outlineStyle,
    );
    expect(outline).not.toBe("none");

    await page.keyboard.press("Tab");
    const secondary = page.getByTestId("hero-secondary-cta");
    await expect(secondary).toBeFocused();
  });

  test("hero passes axe contrast / button-name / link-name", async ({ page }) => {
    const results = await new AxeBuilder({ page })
      .include("section#top")
      .withRules(["color-contrast", "button-name", "link-name", "aria-allowed-attr"])
      .analyze();
    expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
  });
});
