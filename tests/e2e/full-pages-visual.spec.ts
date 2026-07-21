import { test, expect } from "@playwright/test";

/**
 * Full-page visual regression for the result-card preview and the
 * public course pages across mobile / tablet / desktop breakpoints.
 *
 * Why these targets:
 *  - `/dev/cards` is the deterministic harness that renders the result
 *    page's flagship, secondary, and gap-map cards with fixed mock data.
 *    A full-page snapshot pins the overall stacked silhouette in addition
 *    to the per-card snapshots in `result-cards-visual.spec.ts`.
 *  - `/courses`, `/courses/pharmacovigilance`, `/courses/medical-coding`
 *    are fully public, content-stable pages — ideal candidates for
 *    full-page snapshots.
 *
 * Snapshots are pinned on `chromium-default` only to keep a single
 * baseline. Update with:
 *   bunx playwright test full-pages-visual --update-snapshots
 */

const BREAKPOINTS = [
  { name: "mobile-320", width: 320, height: 640 },
  { name: "mobile-360", width: 360, height: 780 },
  { name: "mobile-375", width: 375, height: 812 },
  { name: "mobile-390", width: 390, height: 844 },
  { name: "mobile-414", width: 414, height: 896 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "tablet-1024", width: 1024, height: 768 },
  { name: "desktop-1280", width: 1280, height: 800 },
  { name: "desktop-1440", width: 1440, height: 900 },
] as const;

const THEMES = ["dark", "light"] as const;

const PAGES = [
  // The `/career-engine/result` page is quiz-session-gated, so we snapshot
  // its deterministic harness twin instead. `/dev/cards?harness=1` renders
  // the same card stack with mocked data, and capturing it full-page pins
  // the overall vertical rhythm in addition to the per-card snapshots in
  // result-cards-visual.spec.ts.
  { id: "result-page", path: "/dev/cards?harness=1", themed: true },
  { id: "courses-index", path: "/courses", themed: false },
  { id: "course-pv", path: "/courses/pharmacovigilance", themed: false },
  { id: "course-medical-coding", path: "/courses/medical-coding", themed: false },
] as const;

test.describe("Full pages · visual regression", () => {
  test.skip(
    ({ browserName }, testInfo) =>
      browserName !== "chromium" || testInfo.project.name !== "chromium-default",
    "Snapshots are pinned on chromium-default only.",
  );

  for (const bp of BREAKPOINTS) {
    for (const page of PAGES) {
      // For themed pages (the result-page harness) iterate both light and
      // dark; for content pages the theme is fixed so we skip the matrix.
      const themes = page.themed ? THEMES : (["default"] as const);
      for (const theme of themes) {
        const suffix = page.themed ? `-${theme}` : "";
        const url = page.themed ? `${page.path}&theme=${theme}` : page.path;
        test(`${page.id}${suffix} @ ${bp.name}`, async ({ page: pw }) => {
          await pw.setViewportSize({ width: bp.width, height: bp.height });
          await pw.goto(url, { waitUntil: "networkidle" });

          // Kill animations & transitions for deterministic pixels.
          await pw.addStyleTag({
            content: `
            *, *::before, *::after {
              animation: none !important;
              transition: none !important;
              caret-color: transparent !important;
            }
            /* Mask elements known to vary between runs (countdown, "live"
             * trust pills, anything timestamp-driven). */
            [data-visual-mask="true"] { visibility: hidden !important; }
          `,
          });

          // Wait for fonts so text metrics are stable.
          await pw.evaluate(() => document.fonts?.ready);

          // Scroll to bottom and back so lazy-loaded images/intersection
          // observers hydrate before we screenshot the full page.
          await pw.evaluate(async () => {
            await new Promise<void>((resolve) => {
              let y = 0;
              const step = () => {
                window.scrollTo(0, y);
                y += window.innerHeight;
                if (y < document.body.scrollHeight) {
                  requestAnimationFrame(step);
                } else {
                  window.scrollTo(0, 0);
                  requestAnimationFrame(() => resolve());
                }
              };
              step();
            });
          });

          await expect(pw).toHaveScreenshot(`${page.id}${suffix}-${bp.name}.png`, {
            fullPage: true,
            // AA-tolerant: `threshold` lets subpixel/font-hinting jitter
            // pass while still failing on real layout or typography shifts.
            threshold: 0.2,
            maxDiffPixelRatio: 0.01,
            animations: "disabled",
            caret: "hide",
          });
        });
      }
    }
  }
});
