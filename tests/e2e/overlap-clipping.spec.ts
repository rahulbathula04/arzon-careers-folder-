import { test, expect } from "@playwright/test";

/**
 * Hidden, clipped & overlapping element regression guard.
 *
 * Walks key public routes at mobile + desktop viewports and reports:
 *   1. Interactive elements (links, buttons, inputs) whose bounding rect
 *      sits outside the viewport horizontally (overflow → user can't tap).
 *   2. Elements whose `scrollWidth > clientWidth` while `overflow` is
 *      hidden/clip (text clipped silently).
 *   3. Headings / CTAs whose computed `color === background-color`
 *      (invisible — caught by text-visibility.spec.ts, kept here as
 *      a tighter heading-only smoke).
 *   4. Fixed/sticky elements whose rect overlaps another fixed/sticky
 *      element (FAB sitting on top of the sticky CTA bar, etc.).
 *
 * Soft mode: emits a single sorted report per route and only fails when
 * the route blows past the per-route allowance. Tune the allowance as
 * known cosmetic issues get fixed.
 */

const ROUTES = [
  "/",
  "/curriculum",
  "/courses",
  "/courses/pharmacovigilance",
  "/credibility",
  "/proof",
  "/about",
  "/cohorts",
  "/contact",
  "/apply",
  "/refund",
  "/verify",
  "/legal/terms",
  "/legal/privacy",
] as const;

const VIEWPORTS = [
  { name: "mobile-360", width: 360, height: 800 },
  { name: "mobile-390", width: 390, height: 844 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "desktop-1280", width: 1280, height: 800 },
  { name: "desktop-1920", width: 1920, height: 1080 },
] as const;

// Per-route + per-viewport tolerance for the cumulative issue count.
// Anything above this fails the suite. Start permissive; ratchet down
// as real bugs get fixed.
const ALLOWANCE = 0;

test.describe("Visual QA · overlap / clipping / off-canvas", () => {
  test.skip(
    ({ browserName }) => browserName !== "chromium",
    "Single-browser smoke to keep CI fast.",
  );

  for (const vp of VIEWPORTS) {
    for (const route of ROUTES) {
      test(`${route} @ ${vp.name}`, async ({ page }) => {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.goto(route, { waitUntil: "networkidle" });

        // Give lazy/Suspense content a moment to hydrate.
        await page.waitForTimeout(400);

        const issues = await page.evaluate(() => {
          const out: { kind: string; selector: string; note: string }[] = [];
          const vw = document.documentElement.clientWidth;
          const vh = document.documentElement.clientHeight;

          const describe = (el: Element) => {
            const tag = el.tagName.toLowerCase();
            const id = (el as HTMLElement).id ? `#${(el as HTMLElement).id}` : "";
            const cls =
              typeof (el as HTMLElement).className === "string" && (el as HTMLElement).className
                ? "." + (el as HTMLElement).className.trim().split(/\s+/).slice(0, 2).join(".")
                : "";
            return `${tag}${id}${cls}`;
          };

          // (1) interactive elements off-canvas horizontally
          const interactive = document.querySelectorAll<HTMLElement>(
            'a[href], button, [role="button"], input, textarea, select',
          );
          interactive.forEach((el) => {
            if (el.offsetParent === null) return;
            const r = el.getBoundingClientRect();
            if (r.width === 0 || r.height === 0) return;
            // Allow a 4px hairline outside the viewport (anti-alias slop).
            if (r.right > vw + 4 || r.left < -4) {
              out.push({
                kind: "off-canvas-x",
                selector: describe(el),
                note: `left=${Math.round(r.left)} right=${Math.round(r.right)} vw=${vw}`,
              });
            }
          });

          // (2) text containers whose content is clipped silently
          const all = document.querySelectorAll<HTMLElement>(
            "h1, h2, h3, h4, p, span, li, a, button",
          );
          all.forEach((el) => {
            const cs = getComputedStyle(el);
            const overflowsX = el.scrollWidth - el.clientWidth > 1;
            const overflowsY = el.scrollHeight - el.clientHeight > 1;
            const clippedX = ["hidden", "clip"].includes(cs.overflowX);
            const clippedY = ["hidden", "clip"].includes(cs.overflowY);
            // Skip if element opts into overflow with a scroll utility,
            // or is decorative (no text).
            if (!el.textContent || !el.textContent.trim()) return;
            if (overflowsX && clippedX) {
              out.push({
                kind: "clipped-x",
                selector: describe(el),
                note: `scrollW=${el.scrollWidth} clientW=${el.clientWidth}`,
              });
            }
            if (overflowsY && clippedY && el.clientHeight > 0) {
              out.push({
                kind: "clipped-y",
                selector: describe(el),
                note: `scrollH=${el.scrollHeight} clientH=${el.clientHeight}`,
              });
            }
          });

          // (3) fixed/sticky overlap detection
          const fixedish: HTMLElement[] = [];
          document.querySelectorAll<HTMLElement>("body *").forEach((el) => {
            const pos = getComputedStyle(el).position;
            if (pos === "fixed" || pos === "sticky") {
              const r = el.getBoundingClientRect();
              if (r.width > 0 && r.height > 0) fixedish.push(el);
            }
          });
          const overlaps = (a: DOMRect, b: DOMRect) =>
            !(a.right <= b.left || a.left >= b.right || a.bottom <= b.top || a.top >= b.bottom);
          for (let i = 0; i < fixedish.length; i++) {
            for (let j = i + 1; j < fixedish.length; j++) {
              const a = fixedish[i];
              const b = fixedish[j];
              if (a.contains(b) || b.contains(a)) continue;
              if (overlaps(a.getBoundingClientRect(), b.getBoundingClientRect())) {
                out.push({
                  kind: "fixed-overlap",
                  selector: `${describe(a)} ↔ ${describe(b)}`,
                  note: "two fixed/sticky elements overlap",
                });
              }
            }
          }

          // (4) heading invisibility smoke
          document.querySelectorAll<HTMLElement>("h1, h2, h3").forEach((el) => {
            const cs = getComputedStyle(el);
            if (cs.color === cs.backgroundColor && cs.backgroundColor !== "rgba(0, 0, 0, 0)") {
              out.push({
                kind: "invisible-heading",
                selector: describe(el),
                note: `color === background ${cs.color}`,
              });
            }
          });

          // Drop duplicates by `${kind}|${selector}` so reports stay short.
          const seen = new Set<string>();
          return out.filter((r) => {
            const key = `${r.kind}|${r.selector}`;
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
          });
        });

        if (issues.length > ALLOWANCE) {
          const summary = issues.map((i) => `  [${i.kind}] ${i.selector} — ${i.note}`).join("\n");
          throw new Error(
            `Found ${issues.length} layout issue(s) on ${route} @ ${vp.name} (allowance=${ALLOWANCE}):\n${summary}`,
          );
        }
        expect(issues.length).toBeLessThanOrEqual(ALLOWANCE);
      });
    }
  }
});
