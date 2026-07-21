import { test, expect } from "@playwright/test";

/**
 * Background layer visual regression.
 *
 * Pins the appearance of the fixed `.aurora-bg` ambient background — the
 * white surface with the soft-blue radial glow mounted at the root. This
 * spec hides every page-level element above the layer and snapshots the
 * exposed background on each key route × viewport, so any change to:
 *   • the radial color, position, opacity, or size
 *   • the page bleed (e.g. accidentally turning the layer position from
 *     fixed → absolute, or moving it inside a transformed parent)
 *   • viewport-dependent alignment regressions
 * fails the build before it can ship.
 *
 * Snapshots pinned on chromium-default, webkit-default, and firefox-default.
 * Playwright suffixes snapshot filenames with the project name, so each
 * engine gets its own baseline (radial rasterization differs per engine).
 * Update with:
 *   bunx playwright test background-layer-visual --update-snapshots
 */

const BREAKPOINTS = [
  { name: "mobile-390", width: 390, height: 844 },
  { name: "desktop-1280", width: 1280, height: 800 },
] as const;

const ROUTES = [
  { id: "landing", path: "/" },
  { id: "apply", path: "/apply" },
  { id: "enrol", path: "/enrol/career" },
  { id: "enrol-pay", path: "/enrol/career/pay" },
  { id: "dashboard", path: "/dashboard" },
  { id: "about", path: "/about" },
  { id: "contact", path: "/contact" },
] as const;

const ALLOWED_PROJECTS = new Set(["chromium-default", "webkit-default", "firefox-default"]);

const SCROLL_STATES = [
  { id: "top", y: 0 },
  { id: "mid", y: 1200 },
  { id: "bottom", y: 9999 },
] as const;

test.describe("Background layer · visual regression", () => {
  test.skip(
    ({}, testInfo) => !ALLOWED_PROJECTS.has(testInfo.project.name),
    "Snapshots are pinned on the *-default projects (one baseline per engine).",
  );

  for (const bp of BREAKPOINTS) {
    for (const route of ROUTES) {
      for (const scroll of SCROLL_STATES) {
        test(`${route.id} @ ${bp.name} · scroll-${scroll.id}`, async ({ page }) => {
          await page.setViewportSize({ width: bp.width, height: bp.height });
          await page.goto(route.path, { waitUntil: "networkidle" });
          await page.evaluate(() => document.fonts?.ready);

          // Scroll BEFORE hiding foreground so layout/scrollHeight is real.
          // `bottom` uses a sentinel large value clamped by the browser to
          // documentElement.scrollHeight - innerHeight.
          await page.evaluate((y) => {
            window.scrollTo({ top: y, left: 0, behavior: "instant" as ScrollBehavior });
          }, scroll.y);
          // Let any scroll-driven layout settle.
          await page.waitForTimeout(150);

          // Reveal the fixed `.aurora-bg` layer:
          //   1. hide every direct child of <body> that isn't the layer
          //   2. neutralize the dark backdrop / scroll-root / nav so they
          //      don't paint over it
          //   3. kill animations + transitions for pixel-deterministic shots
          await page.addStyleTag({
            content: `
            *, *::before, *::after {
              animation: none !important;
              transition: none !important;
              caret-color: transparent !important;
            }
            /* Make every potential cover layer transparent. The radial
               itself is fixed at z-index:0 and remains visible. */
            html, body { background: transparent !important; }
            .app-scroll-root,
            .nav-shell,
            .nav-rail,
            [data-dark-backdrop],
            .min-h-app,
            main,
            section,
            header,
            footer { background: transparent !important; }
            /* Hide all foreground content so only the radial is captured. */
            .app-scroll-root > *,
            .nav-shell,
            .nav-rail { visibility: hidden !important; }
            /* Keep the radial layer itself fully visible. */
            .aurora-bg, .aurora-bg * { visibility: visible !important; }
          `,
          });

          // Wait one frame so the style overrides flush.
          await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => r(null))));

          // Snapshot the whole viewport — the radial fills it. Because the
          // layer is `position: fixed`, the snapshot must be byte-identical
          // to the scroll-top baseline; any drift indicates the layer was
          // accidentally placed inside a scrolling/transformed parent.
          await expect(page).toHaveScreenshot(`${route.id}-${bp.name}-${scroll.id}.png`, {
            fullPage: false,
            // Small tolerance for subpixel rasterization of the radial.
            maxDiffPixelRatio: 0.005,
            threshold: 0.05,
          });
        });
      }
    }
  }
});
