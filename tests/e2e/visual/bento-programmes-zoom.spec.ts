import { expect, test } from "@playwright/test";

/**
 * Visual-regression contract for the Role-first tracks grid at both 100 %
 * and 80 % logical zoom, across the three key breakpoints. The card cover
 * is a single shared aspect-ratio container (see `ProgrammeCover.tsx`) so
 * every card in a viewport should render at identical width AND height —
 * we assert that invariant and screenshot the section for pixel diff.
 *
 * "80 % zoom" is emulated by dropping the device-scale factor to 0.8 —
 * layout width stays the same, DPR halves, so the browser gets to reach
 * for a smaller srcSet variant. Any layout shift or overflow shows up as
 * a mismatched screenshot or a failed size-equality assertion.
 */

const BREAKPOINTS = [
  { name: "mobile", width: 390, height: 900 },
  { name: "tablet", width: 820, height: 1100 },
  { name: "desktop", width: 1280, height: 900 },
] as const;

const ZOOMS = [
  { name: "100pct", dsf: 1 },
  { name: "080pct", dsf: 0.8 },
] as const;

for (const bp of BREAKPOINTS) {
  for (const zoom of ZOOMS) {
    test(`BentoProgrammes · ${bp.name} @ ${zoom.name} zoom`, async ({ browser }) => {
      const context = await browser.newContext({
        viewport: { width: bp.width, height: bp.height },
        deviceScaleFactor: zoom.dsf,
      });
      const page = await context.newPage();
      await page.goto("/");
      const section = page.locator("#programmes");
      await section.scrollIntoViewIfNeeded();
      // Wait for every cover image to have loaded and resolved a src.
      await expect
        .poll(async () =>
          section
            .locator("[data-programme-cover] img")
            .evaluateAll(
              (imgs) => imgs.length > 0 && imgs.every((i) => (i as HTMLImageElement).complete),
            ),
        )
        .toBe(true);

      // Every card in the same layout mode must be the same size — if a
      // srcSet swap or overflow ever shifts one, this fails first.
      const boxes = await section
        .locator("[data-programme-cover]")
        .evaluateAll((els) =>
          els
            .map((el) => el.getBoundingClientRect())
            .map((r) => ({ w: Math.round(r.width), h: Math.round(r.height) })),
        );
      const firstVisible = boxes.find((b) => b.w > 0 && b.h > 0);
      expect(firstVisible, "at least one cover must be visible").toBeTruthy();
      for (const b of boxes.filter((b) => b.w > 0 && b.h > 0)) {
        expect(b.w).toBe(firstVisible!.w);
        expect(b.h).toBe(firstVisible!.h);
      }

      await expect(section).toHaveScreenshot(`bento-${bp.name}-${zoom.name}.png`, {
        maxDiffPixelRatio: 0.02,
        animations: "disabled",
      });
      await context.close();
    });
  }
}
