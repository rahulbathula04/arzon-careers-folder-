import { test, expect, type Page } from "@playwright/test";

/**
 * Functional (non-pixel) assertions for the moments empty-state harness.
 * Guards the exact regression this shell had: white-on-white body copy
 * when a global `.tone-dark` cascade repaints the light-shell surface.
 *
 * Pairs with the pixel baseline in tests/e2e/visual/moments-empty.spec.ts.
 */

const HEADLINE = "The first stories are in edit.";

async function gotoTone(page: Page, tone: "dark" | "light") {
  // Source: src/routes/__vr.moments-empty.tsx (pathless "__vr" group → URL is /moments-empty).
  await page.goto(`/moments-empty?tone=${tone}`, { waitUntil: "networkidle" });
  const root = page.locator('[data-testid="moments-empty-root"]');
  await expect(root).toBeVisible();
  await expect(root).toHaveAttribute("data-tone", tone);
  return root;
}

test.describe("moments empty state · tone + copy contract", () => {
  test.skip(({ browserName }) => browserName !== "chromium", "chromium-only");

  for (const tone of ["dark", "light"] as const) {
    test(`renders headline, 3 placeholder cards, and both CTAs · ${tone}`, async ({ page }) => {
      const root = await gotoTone(page, tone);

      // Shell class actually applied to an ancestor of the root.
      const shellClass = tone === "dark" ? "tone-dark" : "tone-light";
      const shellCount = await page.locator(`.${shellClass}`).count();
      expect(shellCount, `expected .${shellClass} to be present`).toBeGreaterThan(0);

      // Headline copy is stable.
      await expect(root.getByRole("heading", { level: 2 })).toHaveText(HEADLINE);

      // Exactly 3 placeholder upcoming cards.
      const cards = root.locator("ul > li");
      await expect(cards).toHaveCount(3);

      // Both CTAs present with correct destinations.
      const primary = root.getByRole("link", { name: /browse programmes/i });
      const secondary = root.getByRole("link", { name: /about arzon/i });
      await expect(primary).toHaveAttribute("href", "/courses");
      await expect(secondary).toHaveAttribute("href", "/about");
    });
  }

  test("light shell: no light-tone descendant uses text-white and body copy is not white", async ({
    page,
  }) => {
    const root = await gotoTone(page, "light");

    // Class-token walk — a nested `.tone-dark` island (e.g. a dark navy CTA)
    // is legitimately allowed to keep `text-white`, so we exclude those.
    const offenders = await root.evaluate((el) =>
      Array.from(el.querySelectorAll<HTMLElement>("*"))
        .filter((n) => n.classList.contains("text-white") && !n.closest(".tone-dark"))
        .map((n) => n.tagName.toLowerCase()),
    );
    expect(offenders, `unexpected text-white on light shell: ${offenders.join(", ")}`).toEqual([]);

    // Computed colour of the body copy must not resolve to pure white.
    const bodyColor = await root
      .locator("p", { hasText: /No stock photos/i })
      .first()
      .evaluate((el) => getComputedStyle(el).color);
    expect(bodyColor).not.toBe("rgb(255, 255, 255)");
  });

  test("dark shell: primary CTA carries tone-light guard", async ({ page }) => {
    const root = await gotoTone(page, "dark");
    const primary = root.getByRole("link", { name: /browse programmes/i });
    const classAttr = (await primary.getAttribute("class")) ?? "";
    expect(classAttr.split(/\s+/)).toContain("tone-light");
  });
});
