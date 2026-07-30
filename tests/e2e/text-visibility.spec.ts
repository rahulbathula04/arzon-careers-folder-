import { test, expect } from "@playwright/test";

/**
 * Text visibility regression guard.
 *
 * Walks the rendered DOM on each key route × viewport and asserts that
 * every non-empty text node meets a minimum WCAG contrast ratio against
 * its effective background, AND that the foreground alpha is not so low
 * that the text becomes a ghost (the failure mode we kept shipping).
 *
 * This complements `scripts/check-contrast.mjs` (which validates the
 * design tokens in isolation) by catching real-world composition bugs:
 *   - a `tone-dark` section accidentally wrapping a dark-text card
 *   - `text-white/30` left on a saturated gradient
 *   - missing background on a hero so dark text lands on dark navy
 *   - translucent `em`/`span` gradient text that disappears
 *
 * Update the route list as new public pages ship.
 */

const ROUTES = [
  "/",
  "/courses",
  "/courses/pharmacovigilance",
  "/industry",
  "/career-engine",
  "/apply",
  "/apply/confirm",
  "/enrol/career",
  "/enrol/career/pay",
  "/dashboard",
  "/about",
  "/contact",
  "/countdown", // seats counter + cohort countdown harness
] as const;

const VIEWPORTS = [
  { name: "mobile-390", width: 390, height: 844 },
  { name: "desktop-1280", width: 1280, height: 800 },
] as const;

// Selectors whose text we intentionally skip (decorative, off-screen, etc).
const SKIP_SELECTOR = [
  "[data-visual-mask='true']",
  "[aria-hidden='true']",
  "[data-decorative]",
  "script",
  "style",
  "noscript",
  "svg",
].join(",");

test.describe("Text visibility · runtime contrast audit", () => {
  test.skip(
    ({ browserName }) => browserName !== "chromium",
    "Audit runs once on chromium to keep CI fast.",
  );

  for (const vp of VIEWPORTS) {
    for (const route of ROUTES) {
      test(`${route} @ ${vp.name}`, async ({ page }) => {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.goto(route, { waitUntil: "networkidle" });
        await page.evaluate(() => document.fonts?.ready);

        const violations = await page.evaluate((skipSel) => {
          // Parse rgb/rgba strings → {r,g,b,a}
          function parseColor(str: string) {
            const m = str.match(/rgba?\(([^)]+)\)/i);
            if (!m) return null;
            const parts = m[1].split(",").map((p) => parseFloat(p.trim()));
            const [r, g, b] = parts;
            const a = parts.length === 4 ? parts[3] : 1;
            return { r, g, b, a };
          }
          function srgbToLin(c: number) {
            const s = c / 255;
            return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
          }
          function lum({ r, g, b }: { r: number; g: number; b: number }) {
            return 0.2126 * srgbToLin(r) + 0.7152 * srgbToLin(g) + 0.0722 * srgbToLin(b);
          }
          function contrast(a: any, b: any) {
            const L1 = lum(a),
              L2 = lum(b);
            const [hi, lo] = L1 > L2 ? [L1, L2] : [L2, L1];
            return (hi + 0.05) / (lo + 0.05);
          }
          // Walk ancestors composing translucent backgrounds until opaque.
          function effectiveBg(el: Element) {
            let r = 255,
              g = 255,
              b = 255; // default page bg = white
            const stack: { r: number; g: number; b: number; a: number }[] = [];
            let cur: Element | null = el;
            while (cur) {
              const cs = getComputedStyle(cur);
              const col = parseColor(cs.backgroundColor);
              if (col && col.a > 0) {
                stack.push(col);
                if (col.a >= 0.999) break;
              }
              // gradient backgrounds: bail out and trust contrast against text,
              // we'll record but not assert (treated as opaque-unknown).
              if (cs.backgroundImage && cs.backgroundImage !== "none") {
                return { r: NaN, g: NaN, b: NaN, gradient: true };
              }
              cur = cur.parentElement;
            }
            // composite back to front
            for (let i = stack.length - 1; i >= 0; i--) {
              const c = stack[i];
              r = c.r * c.a + r * (1 - c.a);
              g = c.g * c.a + g * (1 - c.a);
              b = c.b * c.a + b * (1 - c.a);
            }
            return { r, g, b, gradient: false };
          }

          const skip = new Set<Element>();
          document.querySelectorAll(skipSel).forEach((el) => {
            skip.add(el);
            el.querySelectorAll("*").forEach((c) => skip.add(c));
          });

          const out: {
            text: string;
            tag: string;
            cls: string;
            color: string;
            bg: string;
            ratio: number;
            alpha: number;
            reason: string;
          }[] = [];

          const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
          let node: Node | null;
          while ((node = walker.nextNode())) {
            const text = node.nodeValue?.trim();
            if (!text || text.length < 2) continue;
            const el = node.parentElement;
            if (!el || skip.has(el)) continue;
            const cs = getComputedStyle(el);
            if (cs.visibility === "hidden" || cs.display === "none") continue;
            if (parseFloat(cs.opacity) < 0.1) continue;

            // Skip if element has 0 layout (not actually rendered)
            const rect = el.getBoundingClientRect();
            if (rect.width === 0 || rect.height === 0) continue;

            const fg = parseColor(cs.color);
            if (!fg) continue;

            // Alpha gate: very translucent text is the bug we want to catch.
            const elOpacity = parseFloat(cs.opacity);
            const effAlpha = fg.a * elOpacity;
            if (effAlpha < 0.4) {
              out.push({
                text: text.slice(0, 60),
                tag: el.tagName.toLowerCase(),
                cls: (el.className || "").toString().slice(0, 120),
                color: cs.color,
                bg: cs.backgroundColor,
                ratio: 0,
                alpha: effAlpha,
                reason: `alpha ${effAlpha.toFixed(2)} < 0.40`,
              });
              continue;
            }

            // Skip text using background-clip:text (gradient text).
            // These are intentional and contrast-checked manually.
            if (cs.webkitBackgroundClip === "text" || (cs as any).backgroundClip === "text") {
              continue;
            }

            const bg = effectiveBg(el);
            if (bg.gradient) continue; // can't reliably sample gradients

            // Composite fg over bg using fg alpha
            const composed = {
              r: fg.r * fg.a + bg.r * (1 - fg.a),
              g: fg.g * fg.a + bg.g * (1 - fg.a),
              b: fg.b * fg.a + bg.b * (1 - fg.a),
            };
            const ratio = contrast(composed, bg);

            // AA: 4.5 for body, 3.0 for large (>=18px or >=14px bold)
            const size = parseFloat(cs.fontSize);
            const weight = parseInt(cs.fontWeight, 10) || 400;
            const isLarge = size >= 24 || (size >= 18.66 && weight >= 700);
            const min = isLarge ? 3.0 : 4.5;

            if (ratio < min) {
              out.push({
                text: text.slice(0, 60),
                tag: el.tagName.toLowerCase(),
                cls: (el.className || "").toString().slice(0, 120),
                color: cs.color,
                bg: cs.backgroundColor,
                ratio: Number(ratio.toFixed(2)),
                alpha: effAlpha,
                reason: `contrast ${ratio.toFixed(2)} < ${min}`,
              });
            }
          }
          return out;
        }, SKIP_SELECTOR);

        if (violations.length > 0) {
          const sample = violations
            .slice(0, 10)
            .map(
              (v) =>
                `  • <${v.tag}> "${v.text}" - ${v.reason} (color=${v.color}, bg=${v.bg}, class="${v.cls}")`,
            )
            .join("\n");
          throw new Error(
            `${violations.length} text visibility issue(s) on ${route}:\n${sample}` +
              (violations.length > 10 ? `\n  …and ${violations.length - 10} more` : ""),
          );
        }
        expect(violations).toHaveLength(0);
      });
    }
  }
});
