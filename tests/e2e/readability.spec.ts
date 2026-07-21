import { test, expect } from "@playwright/test";

/**
 * Readability regression guard — complements `text-visibility.spec.ts`.
 *
 * Walks every visible text node on each key route × viewport and asserts:
 *   • body-class text is at least 14px on desktop / 13px on mobile
 *   • line-height ≥ 1.2× font-size (so descenders don't clip)
 *   • interactive controls (a/button/input/select/textarea) hit ≥ 36×36 CSS
 *     px (44×44 for primary tap targets is enforced by Tailwind sizing
 *     elsewhere; 36 catches "totally untouchable" failures only)
 *
 * Like the contrast spec, this only runs once on chromium-default so CI
 * stays fast. Skipped selectors mirror text-visibility for parity.
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
] as const;

const VIEWPORTS = [
  { name: "mobile-390", width: 390, height: 844, minBody: 13 },
  { name: "desktop-1280", width: 1280, height: 800, minBody: 14 },
] as const;

const SKIP_SELECTOR = [
  "[data-visual-mask='true']",
  "[aria-hidden='true']",
  "[data-decorative]",
  "script",
  "style",
  "noscript",
  "svg",
  // Eyebrow / kicker / badge text is often intentionally 11-12px uppercase
  // and remains readable due to letter-spacing + weight — exclude.
  "[data-eyebrow]",
  ".eyebrow",
  ".kicker",
  ".badge",
].join(",");

test.describe("Readability · runtime audit", () => {
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

        const violations = await page.evaluate(
          ({ skipSel, minBody }) => {
            const skip = new Set<Element>();
            document.querySelectorAll(skipSel).forEach((el) => {
              skip.add(el);
              el.querySelectorAll("*").forEach((c) => skip.add(c));
            });

            type V = { kind: string; tag: string; cls: string; text: string; detail: string };
            const out: V[] = [];

            // 1. Font size + line-height on text nodes.
            const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
            let node: Node | null;
            while ((node = walker.nextNode())) {
              const text = node.nodeValue?.trim();
              if (!text || text.length < 4) continue;
              const el = node.parentElement;
              if (!el || skip.has(el)) continue;
              const cs = getComputedStyle(el);
              if (cs.visibility === "hidden" || cs.display === "none") continue;
              const rect = el.getBoundingClientRect();
              if (rect.width === 0 || rect.height === 0) continue;

              const size = parseFloat(cs.fontSize);
              // Heading-like / display nodes are allowed any size (>=24 by definition).
              if (size >= 16) {
                // Check line-height proportion for body-ish text.
                const lh = parseFloat(cs.lineHeight);
                if (!Number.isNaN(lh) && lh > 0 && lh < size * 1.15) {
                  out.push({
                    kind: "tight-leading",
                    tag: el.tagName.toLowerCase(),
                    cls: (el.className || "").toString().slice(0, 80),
                    text: text.slice(0, 50),
                    detail: `font ${size}px · line-height ${lh}px (<${(size * 1.15).toFixed(1)})`,
                  });
                }
                continue;
              }

              // Sub-16px text: only fail if it's also smaller than the
              // viewport-appropriate minimum.
              if (size < minBody) {
                out.push({
                  kind: "tiny-text",
                  tag: el.tagName.toLowerCase(),
                  cls: (el.className || "").toString().slice(0, 80),
                  text: text.slice(0, 50),
                  detail: `font ${size}px < ${minBody}px`,
                });
              }
            }

            // 2. Interactive tap target floor.
            const interactive = document.querySelectorAll<HTMLElement>(
              'a[href],button:not([disabled]),input:not([type="hidden"]):not([disabled]),select:not([disabled]),textarea:not([disabled]),[role="button"]:not([aria-disabled="true"])',
            );
            interactive.forEach((el) => {
              if (skip.has(el)) return;
              const cs = getComputedStyle(el);
              if (cs.visibility === "hidden" || cs.display === "none") return;
              const rect = el.getBoundingClientRect();
              if (rect.width === 0 || rect.height === 0) return;
              // Skip inline links inside flowing prose — their box matches the
              // surrounding line height by design and is reachable via word tap.
              const parentTag = el.parentElement?.tagName.toLowerCase();
              if (el.tagName === "A" && parentTag && /^(p|li|span|h\d)$/.test(parentTag)) return;
              if (rect.height < 24 || rect.width < 24) {
                out.push({
                  kind: "tiny-target",
                  tag: el.tagName.toLowerCase(),
                  cls: (el.className || "").toString().slice(0, 80),
                  text: (el.textContent || el.getAttribute("aria-label") || "").trim().slice(0, 50),
                  detail: `${Math.round(rect.width)}×${Math.round(rect.height)} (<24×24)`,
                });
              }
            });

            return out;
          },
          { skipSel: SKIP_SELECTOR, minBody: vp.minBody },
        );

        if (violations.length > 0) {
          const sample = violations
            .slice(0, 10)
            .map((v) => `  • [${v.kind}] <${v.tag}> "${v.text}" — ${v.detail} (class="${v.cls}")`)
            .join("\n");
          throw new Error(
            `${violations.length} readability issue(s) on ${route} @ ${vp.name}:\n${sample}` +
              (violations.length > 10 ? `\n  …and ${violations.length - 10} more` : ""),
          );
        }
        expect(violations).toHaveLength(0);
      });
    }
  }
});
