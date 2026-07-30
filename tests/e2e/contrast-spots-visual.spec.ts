import { test, expect } from "@playwright/test";

/**
 * Contrast-regression guard for the three Career Engine "rescue spots"
 * that previously shipped with white-on-pale text:
 *
 *   1. Role chips    (FlagshipTrackCard · bg-primary/10 + text-primary)
 *   2. "Your stream's career arc" box (CareerForecast · bg-primary/5)
 *   3. Selected compare-track row (TrackCompareCard · bg-primary/5)
 *
 * Each spot is screenshotted (pixel-stable baseline) AND every text node
 * inside is measured against its composited background using WCAG
 * relative-luminance contrast. The test fails if contrast drops below
 * 4.5:1 (normal text) or 3:1 (>=18px or >=14px bold), which is the
 * threshold that lets the earlier regression slip through.
 *
 * Snapshots are pinned on chromium-default only (matches the rest of
 * the visual suite). To accept intentional design changes:
 *
 *   bunx playwright test contrast-spots-visual --update-snapshots
 */

const URL = "/dev/cards?theme=light&harness=1";

const SPOTS = [
  { id: "role-chip", selector: '[data-testid="flagship-role-chip"]' },
  { id: "career-arc-note", selector: '[data-testid="career-arc-note"]' },
  { id: "compare-selected", selector: '[data-testid="compare-track-row"][data-selected="true"]' },
] as const;

test.describe("Contrast spots · visual + WCAG regression", () => {
  test.skip(
    ({ browserName }, testInfo) =>
      browserName !== "chromium" || testInfo.project.name !== "chromium-default",
    "Snapshots and contrast assertions are pinned on chromium-default only.",
  );

  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 1600 });
    await page.goto(URL, { waitUntil: "networkidle" });
    // Deterministic pixels - no transitions, no in-flight intersection animation.
    await page.addStyleTag({
      content: `*, *::before, *::after { animation: none !important; transition: none !important; }`,
    });
    await page.evaluate(() => document.fonts?.ready);
  });

  for (const spot of SPOTS) {
    test(`${spot.id} · snapshot + contrast`, async ({ page }) => {
      const locator = page.locator(spot.selector).first();
      await expect(locator).toBeVisible();
      // Make sure CareerForecast's IntersectionObserver-gated paint settled.
      await locator.scrollIntoViewIfNeeded();
      await page.waitForTimeout(150);

      await expect(locator).toHaveScreenshot(`${spot.id}.png`, {
        threshold: 0.2,
        maxDiffPixelRatio: 0.01,
        animations: "disabled",
        caret: "hide",
      });

      const violations = await locator.evaluate((root) => {
        function parseColor(s: string) {
          const m = s.match(/rgba?\(([^)]+)\)/i);
          if (!m) return null;
          const p = m[1].split(",").map((x) => parseFloat(x.trim()));
          return { r: p[0], g: p[1], b: p[2], a: p.length === 4 ? p[3] : 1 };
        }
        function srgbToLin(c: number) {
          const s = c / 255;
          return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
        }
        function lum(c: { r: number; g: number; b: number }) {
          return 0.2126 * srgbToLin(c.r) + 0.7152 * srgbToLin(c.g) + 0.0722 * srgbToLin(c.b);
        }
        function contrast(
          a: { r: number; g: number; b: number },
          b: { r: number; g: number; b: number },
        ) {
          const L1 = lum(a),
            L2 = lum(b);
          const [hi, lo] = L1 > L2 ? [L1, L2] : [L2, L1];
          return (hi + 0.05) / (lo + 0.05);
        }
        function effectiveBg(el: Element) {
          let r = 255,
            g = 255,
            b = 255;
          const stack: { r: number; g: number; b: number; a: number }[] = [];
          let cur: Element | null = el;
          while (cur) {
            const cs = getComputedStyle(cur);
            const col = parseColor(cs.backgroundColor);
            if (col && col.a > 0) {
              stack.push(col);
              if (col.a >= 0.999) break;
            }
            if (cs.backgroundImage && cs.backgroundImage !== "none") {
              // Gradient - treat as opaque-unknown; bail without asserting.
              return null;
            }
            cur = cur.parentElement;
          }
          for (let i = stack.length - 1; i >= 0; i--) {
            const c = stack[i];
            r = c.r * c.a + r * (1 - c.a);
            g = c.g * c.a + g * (1 - c.a);
            b = c.b * c.a + b * (1 - c.a);
          }
          return { r, g, b };
        }

        const out: Array<{ text: string; ratio: number; need: number; fg: string; bg: string }> =
          [];
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
        let node: Node | null = walker.nextNode();
        while (node) {
          const text = (node.nodeValue ?? "").trim();
          const parent = node.parentElement;
          if (text && parent && parent.offsetParent !== null) {
            const cs = getComputedStyle(parent);
            const fg = parseColor(cs.color);
            const bg = effectiveBg(parent);
            if (fg && bg && fg.a > 0) {
              // Composite translucent text onto its bg before measuring.
              const composited = {
                r: fg.r * fg.a + bg.r * (1 - fg.a),
                g: fg.g * fg.a + bg.g * (1 - fg.a),
                b: fg.b * fg.a + bg.b * (1 - fg.a),
              };
              const sizePx = parseFloat(cs.fontSize);
              const weight = parseInt(cs.fontWeight, 10) || 400;
              const isLarge = sizePx >= 18 || (sizePx >= 14 && weight >= 700);
              const need = isLarge ? 3 : 4.5;
              const ratio = contrast(composited, bg);
              if (ratio < need) {
                out.push({
                  text: text.slice(0, 80),
                  ratio: Math.round(ratio * 100) / 100,
                  need,
                  fg: `rgba(${fg.r},${fg.g},${fg.b},${fg.a})`,
                  bg: `rgb(${Math.round(bg.r)},${Math.round(bg.g)},${Math.round(bg.b)})`,
                });
              }
            }
          }
          node = walker.nextNode();
        }
        return out;
      });

      expect(
        violations,
        `Low-contrast text in ${spot.id}: ${JSON.stringify(violations, null, 2)}`,
      ).toEqual([]);
    });
  }
});
