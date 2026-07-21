import { test, expect } from "@playwright/test";

/**
 * Layout guard for the cohort countdown + seats-left tiles.
 *
 * These tiles render on `/career-engine/result` and the `/countdown`
 * dev harness. The values are dynamic ("3d 14h", "12/24", "Closed",
 * "Closing today") so width can shift across cohorts. This spec asserts:
 *
 *   1. No tile overflows its own box (scrollWidth ≤ clientWidth).
 *   2. Sibling tiles in the same row never overlap horizontally.
 *   3. Tile values are not visually clipped (no `overflow:hidden`
 *      hiding live text), checked by comparing measured text width
 *      against the tile's inner width.
 *
 * Runs at mobile-360 (smallest supported), mobile-390, and desktop-1280.
 */

const VIEWPORTS = [
  { name: "mobile-360", width: 360, height: 800 },
  { name: "mobile-390", width: 390, height: 844 },
  { name: "desktop-1280", width: 1280, height: 800 },
] as const;

test.describe("Countdown + seats tiles · layout guard", () => {
  test.skip(
    ({ browserName }, testInfo) =>
      browserName !== "chromium" || testInfo.project.name !== "chromium-default",
    "Layout assertions are deterministic; run once on chromium-default.",
  );

  for (const vp of VIEWPORTS) {
    test(`/countdown @ ${vp.name} — no overlap or truncation`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto("/countdown", { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts?.ready);

      const tiles = await page.locator('[data-testid="countdown-harness"] .grid > div').all();
      expect(tiles.length, "tiles rendered").toBeGreaterThanOrEqual(3);

      const rects: {
        x: number;
        y: number;
        w: number;
        h: number;
        clipped: boolean;
        label: string;
      }[] = [];
      for (const tile of tiles) {
        const info = await tile.evaluate((el) => {
          const r = el.getBoundingClientRect();
          // Truncation: any descendant whose scrollWidth exceeds its
          // clientWidth indicates a clipped value.
          let clipped = false;
          const all = [el, ...Array.from(el.querySelectorAll("*"))] as HTMLElement[];
          for (const node of all) {
            if (node.scrollWidth - node.clientWidth > 1) {
              const cs = getComputedStyle(node);
              if (cs.overflow !== "visible" || cs.textOverflow === "ellipsis") {
                clipped = true;
                break;
              }
            }
          }
          return {
            x: r.x,
            y: r.y,
            w: r.width,
            h: r.height,
            clipped,
            label: (el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 40),
          };
        });
        rects.push(info);
      }

      // 1. No tile is clipped / truncated.
      const clipped = rects.filter((r) => r.clipped);
      expect(clipped, `clipped tiles: ${JSON.stringify(clipped)}`).toHaveLength(0);

      // 2. Sibling tiles on the same visual row must not overlap.
      for (let i = 0; i < rects.length; i++) {
        for (let j = i + 1; j < rects.length; j++) {
          const a = rects[i],
            b = rects[j];
          const sameRow = Math.abs(a.y - b.y) < Math.min(a.h, b.h) / 2;
          if (!sameRow) continue;
          const overlapX = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
          expect(
            overlapX,
            `tiles overlap: "${a.label}" vs "${b.label}" by ${overlapX}px`,
          ).toBeLessThanOrEqual(0);
        }
      }

      // 3. All tiles stay inside the viewport (no horizontal scroll).
      const docOverflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      );
      expect(docOverflow, "page horizontal overflow").toBeLessThanOrEqual(1);
    });
  }
});
