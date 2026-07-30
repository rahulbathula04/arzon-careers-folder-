import { test, expect } from "@playwright/test";

/**
 * Visual regression for the Moments empty state, rendered in isolation
 * by the harness route `/moments-empty?tone=dark|light` (source file
 * `src/routes/__vr.moments-empty.tsx` - the `__vr` prefix is a pathless
 * group in TanStack Router).
 *
 * Why this exists: this is the exact surface that previously regressed
 * to white-on-white body copy when a global `.tone-dark` cascade
 * repainted body text. Locking a pixel baseline in BOTH tone shells at
 * mobile + desktop catches the regression before merge.
 *
 * Refresh baselines after intentional design changes:
 *   bunx playwright test moments-empty --update-snapshots
 */

const STABILISE_CSS = `
  *, *::before, *::after {
    animation-duration: 0s !important;
    animation-delay: 0s !important;
    transition-duration: 0s !important;
    transition-delay: 0s !important;
    caret-color: transparent !important;
  }
`;

const VIEWPORTS = [
  { name: "mobile", width: 390, height: 900 },
  { name: "desktop", width: 1280, height: 1200 },
] as const;

const TONES = ["dark", "light"] as const;

test.describe("moments empty state · tone x viewport baselines", () => {
  test.skip(({ browserName }) => browserName !== "chromium", "chromium-only baselines");

  for (const tone of TONES) {
    for (const vp of VIEWPORTS) {
      test(`empty state @ ${tone} · ${vp.name}`, async ({ page }) => {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.addStyleTag({ content: STABILISE_CSS });
        await page.goto(`/moments-empty?tone=${tone}`, { waitUntil: "networkidle" });
        await page.addStyleTag({ content: STABILISE_CSS });
        await page.evaluate(async () => {
          // @ts-ignore - document.fonts is widely available.
          if (document.fonts?.ready) await document.fonts.ready;
        });

        const root = page.locator('[data-testid="moments-empty-root"]');
        await expect(root).toBeVisible();
        await expect(root).toHaveAttribute("data-tone", tone);
        await expect(root).toHaveScreenshot(`moments-empty-${tone}-${vp.name}.png`, {
          animations: "disabled",
          caret: "hide",
          maxDiffPixelRatio: 0.02,
        });
      });
    }
  }
});
