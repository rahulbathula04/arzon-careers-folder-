import { test, expect, Page } from "@playwright/test";

/**
 * Verifies that when `prefers-reduced-motion: reduce` is active:
 *   1. Below-the-fold skeleton placeholders ARE rendered (the lazy-loading
 *      strategy still paints something while chunks stream in).
 *   2. None of those skeletons run the standard `pulse` animation.
 *   3. No element on the page runs `spin`, `bounce`, or `ping` infinite
 *      animations (these are the Tailwind tokens we audit statically).
 *   4. The optional `skeleton-fade` (slow opacity-only fade) is acceptable
 *      because it carries no transform / size change — layout stays stable.
 */

const ALLOWED_ANIMATIONS = new Set([
  "none",
  "skeleton-fade", // explicit reduced-motion fallback for skeletons
]);

async function collectAnimatedElements(page: Page) {
  return page.evaluate(() => {
    const results: Array<{ selector: string; name: string; duration: string }> = [];
    const all = document.querySelectorAll<HTMLElement>("*");
    all.forEach((el) => {
      const cs = getComputedStyle(el);
      const name = cs.animationName;
      if (!name || name === "none") return;
      // Build a useful selector hint.
      const id = el.id ? `#${el.id}` : "";
      const cls =
        el.className && typeof el.className === "string"
          ? "." + el.className.trim().split(/\s+/).slice(0, 2).join(".")
          : "";
      const sel = `${el.tagName.toLowerCase()}${id}${cls}`.slice(0, 120);
      results.push({ selector: sel, name, duration: cs.animationDuration });
    });
    return results;
  });
}

test.describe("Reduced motion · landing page", () => {
  test("emulation flag is honored by the page", async ({ page }) => {
    await page.goto("/");
    const matches = await page.evaluate(
      () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
    expect(matches).toBe(true);
  });

  test("skeletons render but do not pulse/spin/bounce/ping", async ({ page }) => {
    // Slow the network slightly so lazy chunks haven't all resolved when we
    // sample animations — guarantees skeletons are mounted.
    await page.route("**/*.{js,mjs}", async (route) => {
      await new Promise((r) => setTimeout(r, 50));
      return route.continue();
    });

    await page.goto("/", { waitUntil: "domcontentloaded" });

    // Scroll through the page so IntersectionObserver-driven Suspense
    // boundaries actually mount their skeleton fallbacks.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 30));
      }
      window.scrollTo(0, 0);
    });

    // (1) Skeletons exist somewhere on the page.
    const skeletonCount = await page.locator("[data-skeleton]").count();
    expect(skeletonCount, "expected at least one [data-skeleton] placeholder").toBeGreaterThan(0);

    // (2) No skeleton runs the `pulse` animation.
    const pulsing = await page.locator("[data-skeleton]").evaluateAll((els) =>
      els
        .map((el) => ({
          name: getComputedStyle(el as HTMLElement).animationName,
          html: (el as HTMLElement).outerHTML.slice(0, 120),
        }))
        .filter((r) => r.name === "pulse"),
    );
    expect(pulsing, "skeletons must not run `pulse` under reduced motion").toEqual([]);

    // (3) No element anywhere runs spin/bounce/ping. We tolerate the
    //     `skeleton-fade` opacity animation (defined for this exact purpose).
    const animated = await collectAnimatedElements(page);
    const forbidden = animated.filter(
      (a) => !ALLOWED_ANIMATIONS.has(a.name) && /^(pulse|spin|bounce|ping|marquee)$/.test(a.name),
    );
    expect(
      forbidden,
      `forbidden animations active under reduced motion:\n${JSON.stringify(forbidden, null, 2)}`,
    ).toEqual([]);
  });

  test("in-app toggle keeps motion off after reload", async ({ page, context }) => {
    // The boot script in __root.tsx applies `html.reduce-motion` pre-paint
    // when localStorage has the override set. Simulate a returning visitor.
    await context.addInitScript(() => {
      try {
        localStorage.setItem("arzon:reduce-motion", "on");
      } catch {}
    });
    await page.goto("/");
    const hasClass = await page.evaluate(() =>
      document.documentElement.classList.contains("reduce-motion"),
    );
    expect(hasClass).toBe(true);
  });
});
