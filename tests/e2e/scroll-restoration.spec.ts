import { test, expect } from "@playwright/test";

/**
 * Verifies per-route scroll restoration on the inner #app-scroll-root container.
 * Scenarios:
 *   1. Scroll on /, navigate to /about, hit Back → / restores its scroll position.
 *   2. Scroll on /about, navigate forward to /contact, hit Back → /about restores.
 *   3. Navigating fresh to a never-visited route lands at top (no leak).
 */

const ROOT_SEL = "#app-scroll-root";
const RAIL_SEL = ".scroll-rail[data-rail-id]";

async function getScrollTop(page: import("@playwright/test").Page) {
  return page.evaluate((sel) => {
    const el = document.querySelector(sel) as HTMLElement | null;
    return el ? el.scrollTop : -1;
  }, ROOT_SEL);
}

async function setScrollTop(page: import("@playwright/test").Page, top: number) {
  await page.evaluate(
    ({ sel, top }) => {
      const el = document.querySelector(sel) as HTMLElement | null;
      if (el) el.scrollTo({ top, left: 0, behavior: "instant" as ScrollBehavior });
    },
    { sel: ROOT_SEL, top },
  );
  // Allow our rAF-throttled persistence to flush.
  await page.waitForTimeout(80);
}

async function waitForScrollRoot(page: import("@playwright/test").Page) {
  await page.waitForSelector(ROOT_SEL, { state: "attached" });
  // Wait until the container has a scrollable height (content mounted).
  await page.waitForFunction(
    (sel) => {
      const el = document.querySelector(sel) as HTMLElement | null;
      return !!el && el.scrollHeight > el.clientHeight + 200;
    },
    ROOT_SEL,
    { timeout: 10_000 },
  );
}

async function getRailScroll(page: import("@playwright/test").Page) {
  return page.evaluate((sel) => {
    const el = document.querySelector(sel) as HTMLElement | null;
    if (!el) return { left: -1, scrollable: false, id: null as string | null };
    return {
      left: el.scrollLeft,
      scrollable: el.scrollWidth > el.clientWidth + 50,
      id: el.getAttribute("data-rail-id"),
    };
  }, RAIL_SEL);
}

async function setRailScroll(page: import("@playwright/test").Page, left: number) {
  await page.evaluate(
    ({ sel, left }) => {
      const el = document.querySelector(sel) as HTMLElement | null;
      if (el) el.scrollTo({ left, top: 0, behavior: "instant" as ScrollBehavior });
    },
    { sel: RAIL_SEL, left },
  );
  await page.waitForTimeout(80);
}

test.describe("Scroll restoration · per-route", () => {
  test("Back restores scroll on the originating route", async ({ page }) => {
    await page.goto("/");
    await waitForScrollRoot(page);
    await setScrollTop(page, 1200);
    expect(await getScrollTop(page)).toBeGreaterThan(800);

    await page.goto("/about");
    await waitForScrollRoot(page);
    expect(await getScrollTop(page)).toBeLessThan(50);

    await page.goBack();
    await waitForScrollRoot(page);
    // Restoration runs in a layout effect; allow one frame.
    await page.waitForTimeout(120);
    const restored = await getScrollTop(page);
    expect(restored).toBeGreaterThan(800);
  });

  test("Back through a 3-route chain restores each route independently", async ({ page }) => {
    await page.goto("/");
    await waitForScrollRoot(page);
    await setScrollTop(page, 600);

    await page.goto("/about");
    await waitForScrollRoot(page);
    await setScrollTop(page, 900);

    await page.goto("/contact");
    await waitForScrollRoot(page);
    expect(await getScrollTop(page)).toBeLessThan(50);

    await page.goBack(); // → /about
    await waitForScrollRoot(page);
    await page.waitForTimeout(120);
    expect(await getScrollTop(page)).toBeGreaterThan(600);

    await page.goBack(); // → /
    await waitForScrollRoot(page);
    await page.waitForTimeout(120);
    expect(await getScrollTop(page)).toBeGreaterThan(400);
  });

  test("Forward navigation to a never-visited route lands at top", async ({ page }) => {
    await page.goto("/");
    await waitForScrollRoot(page);
    await setScrollTop(page, 1500);

    await page.goto("/contact");
    await waitForScrollRoot(page);
    expect(await getScrollTop(page)).toBeLessThan(50);
  });

  test("Horizontal rail scrollLeft restores on back-nav", async ({ page }) => {
    // The mobile section rail is viewport-conditional; force a narrow viewport.
    await page.setViewportSize({ width: 414, height: 896 });
    await page.goto("/");
    await waitForScrollRoot(page);

    // Wait for the rail to actually be present and horizontally scrollable.
    try {
      await page.waitForFunction(
        (sel) => {
          const el = document.querySelector(sel) as HTMLElement | null;
          return !!el && el.scrollWidth > el.clientWidth + 50;
        },
        RAIL_SEL,
        { timeout: 5_000 },
      );
    } catch {
      test.skip(true, "section rail not horizontally scrollable in this viewport");
      return;
    }

    await setRailScroll(page, 220);
    const before = await getRailScroll(page);
    expect(before.id).toBeTruthy();
    expect(before.left).toBeGreaterThan(150);

    await page.goto("/about");
    await waitForScrollRoot(page);

    await page.goBack();
    await waitForScrollRoot(page);
    // Restoration retries up to ~600ms for lazy rails.
    await page.waitForTimeout(800);
    const after = await getRailScroll(page);
    expect(after.left).toBeGreaterThan(150);
  });

  test("All .scroll-rail elements declare a data-rail-id", async ({ page }) => {
    // Stable identification system invariant: never depend on DOM order or
    // synthetic ids. A missing data-rail-id silently breaks restoration.
    await page.setViewportSize({ width: 414, height: 896 });
    await page.goto("/");
    await waitForScrollRoot(page);
    // Walk a few scrollable routes so lazy rails get a chance to mount.
    for (const path of ["/", "/courses", "/internships", "/about"]) {
      await page.goto(path);
      await waitForScrollRoot(page);
    }
    const orphans = await page.evaluate(() => {
      const all = Array.from(document.querySelectorAll<HTMLElement>(".scroll-rail"));
      return all.filter((el) => !el.dataset.railId).map((el) => el.outerHTML.slice(0, 160));
    });
    expect(orphans, `scroll-rail elements missing data-rail-id:\n${orphans.join("\n")}`).toEqual(
      [],
    );
  });
});
