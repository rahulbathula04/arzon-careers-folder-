import { test, expect, type Page } from "@playwright/test";

/**
 * Visual + contrast regression for the enrol and apply page headers in
 * DARK mode.
 *
 * Motivation: both headers use a translucent `bg-card/70 backdrop-blur`
 * bar. Previously they used `bg-white/70`, which in dark mode composited
 * to a pale bar with dark ink text and failed WCAG AA (~1.4:1). This
 * spec locks in AA contrast after a live theme toggle AND keeps a pixel
 * baseline for either header.
 *
 * Verifies, on both routes:
 *   1. Toggling to dark via the persisted `arzon-theme` key applies the
 *      `.dark` class on <html>.
 *   2. The rendered header text ("ARZON" wordmark + "Back to home"
 *      link) meets WCAG AA (≥ 4.5:1) against the composited header
 *      background over the page surface.
 *   3. A visual snapshot of the header stripe matches the baseline
 *      (regression guard against future refactors flipping the token
 *      set again).
 *
 * Refresh baselines after intentional design changes with:
 *   bunx playwright test enrol-apply-header-dark-contrast --update-snapshots
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

const ROUTES = [
  { name: "enrol", path: "/enrol/essential" },
  { name: "apply", path: "/apply" },
] as const;

// WCAG relative luminance + contrast.
// https://www.w3.org/TR/WCAG21/#dfn-contrast-ratio
function parseRgb(str: string): [number, number, number, number] {
  const m = str.match(/rgba?\(([^)]+)\)/i);
  if (!m) return [0, 0, 0, 1];
  const parts = m[1].split(",").map((s) => parseFloat(s.trim()));
  const [r, g, b, a = 1] = parts;
  return [r, g, b, a];
}
function composite(
  fg: [number, number, number, number],
  bg: [number, number, number, number],
): [number, number, number, number] {
  const [fr, fgn, fb, fa] = fg;
  const [br, bg2, bb] = bg;
  const a = fa;
  return [fr * a + br * (1 - a), fgn * a + bg2 * (1 - a), fb * a + bb * (1 - a), 1];
}
function relLuminance([r, g, b]: [number, number, number, number]): number {
  const conv = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * conv(r) + 0.7152 * conv(g) + 0.0722 * conv(b);
}
function contrast(a: [number, number, number, number], b: [number, number, number, number]) {
  const L1 = relLuminance(a);
  const L2 = relLuminance(b);
  const [hi, lo] = L1 >= L2 ? [L1, L2] : [L2, L1];
  return (hi + 0.05) / (lo + 0.05);
}

async function measureHeaderContrast(page: Page): Promise<{
  ratios: Array<{ label: string; color: string; bg: string; ratio: number }>;
}> {
  const raw = await page.evaluate(() => {
    const header = document.querySelector("header");
    if (!header) throw new Error("no <header> found");
    const pageBg = getComputedStyle(document.body).backgroundColor;
    const headerBg = getComputedStyle(header).backgroundColor;
    const targets: Array<{ label: string; el: Element | null }> = [
      { label: "ARZON wordmark", el: header.querySelector("p") },
      { label: "Back to home link", el: header.querySelector("a[href='/']:last-of-type") },
    ];
    return targets
      .filter((t) => t.el)
      .map((t) => ({
        label: t.label,
        color: getComputedStyle(t.el as Element).color,
        headerBg,
        pageBg,
      }));
  });

  return {
    ratios: raw.map((r) => {
      const bgComposited = composite(parseRgb(r.headerBg), parseRgb(r.pageBg));
      const ratio = contrast(parseRgb(r.color), bgComposited);
      return {
        label: r.label,
        color: r.color,
        bg: `composited(${r.headerBg} over ${r.pageBg})`,
        ratio: Math.round(ratio * 100) / 100,
      };
    }),
  };
}

test.describe("Enrol + Apply headers · dark-mode AA contrast", () => {
  test.skip(({ browserName }) => browserName !== "chromium", "chromium-only baselines");

  for (const route of ROUTES) {
    test(`${route.name} header stays ≥ 4.5:1 after toggling to dark`, async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 900 });

      // 1. Land in light mode, flip to dark via the same persisted key
      //    `useTheme` writes, then reload so the pre-paint boot script
      //    applies `.dark` cleanly (no flash-of-wrong-theme in the shot).
      await page.goto(route.path, { waitUntil: "networkidle" });
      await page.evaluate(() => {
        window.localStorage.setItem("arzon-theme", "light");
      });
      await page.reload({ waitUntil: "networkidle" });
      await page.evaluate(() => {
        window.localStorage.setItem("arzon-theme", "dark");
      });
      await page.reload({ waitUntil: "networkidle" });
      await page.addStyleTag({ content: STABILISE_CSS });
      await page.evaluate(async () => {
        // @ts-ignore
        if (document.fonts?.ready) await document.fonts.ready;
      });

      // (1) `.dark` really got applied.
      const isDark = await page.evaluate(() => document.documentElement.classList.contains("dark"));
      expect(isDark, "html.dark should be present after theme toggle").toBe(true);

      // (2) WCAG AA contrast for every text node in the header.
      const { ratios } = await measureHeaderContrast(page);
      expect(ratios.length, "expected header text targets to measure").toBeGreaterThan(0);
      for (const r of ratios) {
        expect(
          r.ratio,
          `${route.name} header · ${r.label}: ${r.ratio}:1 (color ${r.color} on ${r.bg}) must be ≥ 4.5:1`,
        ).toBeGreaterThanOrEqual(4.5);
      }

      // (3) Pixel-level regression baseline for the header stripe itself.
      const header = page.locator("header").first();
      await expect(header).toBeVisible();
      await expect(header).toHaveScreenshot(`header-${route.name}-dark.png`, {
        animations: "disabled",
        caret: "hide",
        maxDiffPixelRatio: 0.02,
      });
    });
  }
});
