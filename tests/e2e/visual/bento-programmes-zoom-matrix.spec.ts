import { expect, test } from "@playwright/test";

/**
 * Extended visual-regression matrix for the Role-first tracks grid.
 * Covers 4 breakpoints × 2 additional zooms (90 %, 110 %) × 2 DPRs
 * (1.5×, 2×) beyond the base 100 %/80 % pair. Combined with
 * `bento-programmes-zoom.spec.ts` this exercises every realistic
 * pixel-density × zoom combination the site is likely to hit.
 */
const BREAKPOINTS = [
  { name: "mobile-390", width: 390, height: 900 },
  { name: "tablet-820", width: 820, height: 1100 },
  { name: "desktop-1280", width: 1280, height: 900 },
] as const;

// "Zoom" here is logical: dsf < 1 emulates browser zoom-out, dsf > 1
// emulates zoom-in / hi-DPI displays. `dpr` slots simulate real device
// pixel ratios (1.5 = common Android; 2 = retina). Duplicates removed
// so the matrix stays under 12 slots.
const SLOTS = [
  { name: "090pct-dpr10", dsf: 0.9 },
  { name: "110pct-dpr10", dsf: 1.1 },
  { name: "100pct-dpr15", dsf: 1.5 },
  { name: "100pct-dpr20", dsf: 2.0 },
] as const;

for (const bp of BREAKPOINTS) {
  for (const s of SLOTS) {
    test(`BentoProgrammes matrix · ${bp.name} · ${s.name}`, async ({ browser }) => {
      const context = await browser.newContext({
        viewport: { width: bp.width, height: bp.height },
        deviceScaleFactor: s.dsf,
      });
      const page = await context.newPage();
      await page.goto("/");
      const section = page.locator("#programmes").first();
      await section.scrollIntoViewIfNeeded();
      // Wait for the covers to attach + eagerly loaded ones to complete.
      await section.locator("[data-programme-cover] img").first().waitFor({ state: "attached" });
      await page.waitForTimeout(1200);

      // Uniform card box assertion — the ProgrammeCover contract.
      const boxes = await section.locator("[data-programme-cover]").evaluateAll((els) =>
        els
          .map((el) => el.getBoundingClientRect())
          .map((r) => ({ w: Math.round(r.width), h: Math.round(r.height) }))
          .filter((b) => b.w > 0 && b.h > 0),
      );
      expect(boxes.length, "at least one visible cover").toBeGreaterThan(0);
      const first = boxes[0];
      for (const b of boxes) {
        expect(b.w).toBe(first.w);
        expect(b.h).toBe(first.h);
      }

      await expect(section).toHaveScreenshot(`bento-matrix-${bp.name}-${s.name}.png`, {
        maxDiffPixelRatio: 0.02,
        animations: "disabled",
      });
      await context.close();
    });
  }
}
