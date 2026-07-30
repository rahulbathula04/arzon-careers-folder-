import { test, expect, devices } from "@playwright/test";

/**
 * Visual regression for the Career Engine result-page cards.
 *
 * Renders the dev harness at /dev/cards (ACRI, flagship, secondary,
 * compare, gap-map, focus-stack, next-step, primitives) across three
 * key breakpoints - phone (390), tablet (768), desktop (1280) - and
 * two themes (dark, light). Animations are disabled so snapshots are
 * deterministic across browsers.
 *
 * To accept intentional design changes:
 *   bunx playwright test result-cards-visual --update-snapshots
 *
 * Only the chromium-default project produces snapshots; reduced-motion +
 * cross-engine projects are skipped to keep the baseline single-source.
 */

const BREAKPOINTS = [
  // Small Android - catches single-column overflow and cramped CTA spacing.
  { name: "mobile-320", width: 320, height: 640 },
  // Mid Android - common low-end phone width.
  { name: "mobile-360", width: 360, height: 780 },
  // iPhone SE / 13 mini - the workhorse iOS small width.
  { name: "mobile-375", width: 375, height: 812 },
  // iPhone 14/15 baseline.
  { name: "mobile-390", width: 390, height: 844 },
  // Large phone / phablet - catches mid-band reflow bugs.
  { name: "mobile-414", width: 414, height: 896 },
  // Tablet portrait.
  { name: "tablet-768", width: 768, height: 1024 },
  // Tablet landscape / small laptop.
  { name: "tablet-1024", width: 1024, height: 768 },
  // Standard laptop.
  { name: "desktop-1280", width: 1280, height: 800 },
  // Designer 14" - most studio mockups land here.
  { name: "desktop-1440", width: 1440, height: 900 },
] as const;

const THEMES = ["dark", "light"] as const;

// Cards that only render when ?harness=1 mocks are installed.
const HARNESS_ONLY = new Set(["internship-tracks", "mentor-brief"]);

const ALL_CARDS = [
  { id: "acri", testid: "card-acri" },
  { id: "flagship", testid: "card-flagship" },
  { id: "secondary", testid: "card-secondary" },
  { id: "compare", testid: "card-compare" },
  { id: "gapmap", testid: "card-gapmap" },
  { id: "focus-stack", testid: "card-focus-stack" },
  { id: "next-step", testid: "card-next-step" },
  { id: "internship-tracks", testid: "card-internship-tracks" },
  { id: "mentor-brief", testid: "card-mentor-brief" },
  { id: "primitives", testid: "card-primitives" },
] as const;

// Optional filter - `SNAPSHOT_CARDS=mentor-brief,acri` only snapshots those
// IDs. Useful for debugging a single diff locally without waiting for the
// whole matrix to run.
const FILTER = (process.env.SNAPSHOT_CARDS ?? "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
const CARDS = FILTER.length ? ALL_CARDS.filter((c) => FILTER.includes(c.id)) : ALL_CARDS;

test.describe("Result cards · visual regression", () => {
  test.skip(
    ({ browserName }, testInfo) =>
      browserName !== "chromium" || testInfo.project.name !== "chromium-default",
    "Snapshots are pinned on chromium-default only.",
  );

  for (const bp of BREAKPOINTS) {
    for (const theme of THEMES) {
      test(`silhouettes @ ${bp.name} · ${theme}`, async ({ page }) => {
        await page.setViewportSize({ width: bp.width, height: bp.height });
        await page.goto(`/dev/cards?theme=${theme}&harness=1`, { waitUntil: "networkidle" });

        // Kill all animations & transitions for deterministic pixels.
        await page.addStyleTag({
          content: `
            *, *::before, *::after {
              animation: none !important;
              transition: none !important;
            }
          `,
        });

        // Wait for fonts so text metrics are stable.
        await page.evaluate(() => document.fonts?.ready);

        for (const card of CARDS) {
          const locator = page.getByTestId(card.testid);
          // HARNESS_ONLY cards still need to be visible because we always
          // load with harness=1; the set documents which cards exist only
          // in that mode for readers of this spec.
          void HARNESS_ONLY;
          await expect(locator).toBeVisible();
          await expect(locator).toHaveScreenshot(`${card.id}-${bp.name}-${theme}.png`, {
            // `threshold` is the per-channel YIQ delta below which two
            // pixels are considered equal - 0.2 is Playwright's default
            // antialiasing-tolerant setting. `maxDiffPixelRatio` then
            // caps the fraction of pixels allowed to exceed that
            // threshold, so AA jitter from font hinting / subpixel
            // rendering passes but a real layout shift (which moves
            // many pixels far past the threshold) still fails.
            threshold: 0.2,
            maxDiffPixelRatio: 0.005,
            animations: "disabled",
            caret: "hide",
          });
        }
      });
    }
  }
});
