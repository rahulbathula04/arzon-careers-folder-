import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/**
 * Track cards — keyboard + accessible-state contract.
 *
 * The track cards on the homepage are navigation cards (Apply + See full
 * programme), not toggle controls. The a11y contract for them is:
 *   1. Both CTAs inside each card are reachable via keyboard `Tab` order.
 *   2. Each card exposes its track identity through the visible heading
 *      and `data-track` slug so assistive tech + analytics can name the
 *      selected target.
 *   3. The primary "Apply for this internship" link has a real accessible
 *      name (no orphan icons) and a visible focus indicator (focused
 *      element matches `:focus-visible`).
 *   4. axe-core reports zero serious/critical contrast or aria violations
 *      inside the track grid region — the white border + black-on-white
 *      Apply pill must keep AA contrast.
 *
 * Note: cards are not aria-pressed toggles. If we later turn them into a
 * selectable filter UI, swap the role checks below for `aria-pressed`.
 */

test.describe("track decision cards — keyboard + a11y", () => {
  test("each card has reachable, named CTAs and a visible focus state", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const firstCard = page.locator('[data-testid="track-hero"]').first();
    await firstCard.scrollIntoViewIfNeeded();
    await expect(firstCard).toBeVisible();

    const cards = page.locator('[data-testid="track-hero"]');
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(3);

    for (let i = 0; i < count; i++) {
      const card = cards.nth(i);
      const slug = await card.getAttribute("data-track");
      expect(slug, "card exposes its track slug").toBeTruthy();

      const apply = card.getByRole("link", { name: /apply for .* internship/i });
      const see = card.getByRole("link", { name: /see full .* programme/i });
      await expect(apply, `apply link present on ${slug}`).toBeVisible();
      await expect(see, `programme link present on ${slug}`).toBeVisible();

      // Keyboard focus: tab into Apply and assert :focus-visible matches.
      await apply.focus();
      const focused = await page.evaluate(() => {
        const el = document.activeElement as HTMLElement | null;
        if (!el) return null;
        return {
          tag: el.tagName,
          text: el.textContent?.trim().slice(0, 60) ?? "",
          focusVisible: el.matches(":focus-visible"),
        };
      });
      expect(focused?.tag).toBe("A");
      expect(focused?.focusVisible, `apply on ${slug} shows :focus-visible`).toBe(true);
    }

    // axe sweep scoped to the track grid section.
    const region = page
      .locator('[data-testid="track-hero"]')
      .first()
      .locator("xpath=ancestor::section[1]");
    const results = await new AxeBuilder({ page })
      .include(
        await region.evaluate((el) => {
          // Build a unique selector for the section.
          const id = el.id;
          if (id) return `#${id}`;
          el.setAttribute("data-axe-scope", "track-grid");
          return '[data-axe-scope="track-grid"]';
        }),
      )
      .disableRules(["region"]) // section may not have a landmark role; not relevant here
      .analyze();

    const blocking = results.violations.filter((v) =>
      ["serious", "critical"].includes(v.impact ?? ""),
    );
    if (blocking.length) {
      console.log("[a11y] track grid violations:", JSON.stringify(blocking, null, 2));
    }
    expect(blocking).toEqual([]);
  });

  test("decision strip stacks 2x2 — Difficulty/Demand never share row with Salary/Hiring", async ({
    page,
  }) => {
    for (const vp of [
      { width: 360, height: 800 },
      { width: 768, height: 1024 },
      { width: 1280, height: 1800 },
    ]) {
      await page.setViewportSize(vp);
      await page.goto("/", { waitUntil: "domcontentloaded" });
      const card = page.locator('[data-testid="track-hero"]').first();
      await card.scrollIntoViewIfNeeded();
      const dts = card.locator("dt");
      const count = await dts.count();
      if (count < 4) continue; // card without decision strip
      const tops = await dts.evaluateAll((els) =>
        els.map((el) => Math.round(el.getBoundingClientRect().top)),
      );
      // Salary(0) & Hiring(1) on row 1; Difficulty(2) & Demand(3) on row 2.
      expect(Math.abs(tops[0] - tops[1])).toBeLessThan(4);
      expect(Math.abs(tops[2] - tops[3])).toBeLessThan(4);
      expect(tops[2] - tops[0]).toBeGreaterThanOrEqual(12);
    }
  });

  test("light-tone variant on /apply keeps WCAG AA contrast", async ({ page }) => {
    await page.goto("/apply", { waitUntil: "domcontentloaded" });
    const firstCard = page.locator('[data-testid="track-hero"]').first();
    await firstCard.waitFor({ state: "visible", timeout: 10_000 });
    await firstCard.scrollIntoViewIfNeeded();

    const region = firstCard.locator("xpath=ancestor::section[1]");
    const scope = await region.evaluate((el) => {
      el.setAttribute("data-axe-scope", "track-grid-light");
      return '[data-axe-scope="track-grid-light"]';
    });
    const results = await new AxeBuilder({ page })
      .include(scope)
      .withRules(["color-contrast"])
      .analyze();
    const blocking = results.violations.filter((v) =>
      ["serious", "critical"].includes(v.impact ?? ""),
    );
    if (blocking.length) {
      console.log("[a11y] /apply track grid contrast:", JSON.stringify(blocking, null, 2));
    }
    expect(blocking).toEqual([]);
  });
});
