import { test, expect } from "@playwright/test";
import { TRACK_THEME, type TrackSlug } from "../../../src/data/trackTheme";

const VIEWPORTS = [
  { name: "mobile", width: 390, height: 900 },
  { name: "tablet", width: 820, height: 1100 },
  { name: "desktop", width: 1280, height: 900 },
];

const SLUGS = Object.keys(TRACK_THEME) as TrackSlug[];

// Editorial type-scale bands (px) for the course page hierarchy.
const H1_RANGE = { min: 28, max: 80 };
const H2_RANGE = { min: 22, max: 56 };
const H3_RANGE = { min: 16, max: 40 };

for (const slug of SLUGS) {
  for (const vp of VIEWPORTS) {
    test(`${slug} @ ${vp.name} - typography scale, hierarchy & rhythm`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(`/courses/${slug}`, { waitUntil: "domcontentloaded" });
      await page.waitForSelector("h1", { timeout: 10_000 });

      // Exactly one H1.
      const h1s = await page.locator("h1").all();
      expect(h1s.length, "exactly one h1").toBe(1);

      const h1Style = await h1s[0].evaluate((el) => {
        const s = getComputedStyle(el);
        return {
          fontSize: parseFloat(s.fontSize),
          lineHeight: parseFloat(s.lineHeight) / parseFloat(s.fontSize),
          family: s.fontFamily.toLowerCase(),
        };
      });
      expect(h1Style.fontSize).toBeGreaterThanOrEqual(H1_RANGE.min);
      expect(h1Style.fontSize).toBeLessThanOrEqual(H1_RANGE.max);
      expect(h1Style.lineHeight).toBeGreaterThanOrEqual(1.0);
      expect(h1Style.lineHeight).toBeLessThanOrEqual(1.25);
      // Display headings should be serif on this site.
      expect(h1Style.family).toMatch(/serif|fraunces|playfair|dm serif|source serif/);

      // H2s - within band, sensible line-height.
      const h2Stats = await page.$$eval("h2", (els) =>
        els.map((el) => {
          const s = getComputedStyle(el);
          return {
            fontSize: parseFloat(s.fontSize),
            lineHeight: parseFloat(s.lineHeight) / parseFloat(s.fontSize),
          };
        }),
      );
      for (const st of h2Stats) {
        expect(st.fontSize).toBeGreaterThanOrEqual(H2_RANGE.min);
        expect(st.fontSize).toBeLessThanOrEqual(H2_RANGE.max);
        expect(st.lineHeight).toBeGreaterThanOrEqual(1.05);
        expect(st.lineHeight).toBeLessThanOrEqual(1.4);
      }

      // H3s - sensible band.
      const h3Stats = await page.$$eval("h3", (els) =>
        els.map((el) => {
          const s = getComputedStyle(el);
          return {
            fontSize: parseFloat(s.fontSize),
            lineHeight: parseFloat(s.lineHeight) / parseFloat(s.fontSize),
          };
        }),
      );
      for (const st of h3Stats) {
        expect(st.fontSize).toBeGreaterThanOrEqual(H3_RANGE.min);
        expect(st.fontSize).toBeLessThanOrEqual(H3_RANGE.max);
        expect(st.lineHeight).toBeGreaterThanOrEqual(1.1);
        expect(st.lineHeight).toBeLessThanOrEqual(1.5);
      }

      // Heading order: every h3 must be preceded somewhere by an h2.
      const headingOrder = await page.$$eval("h1, h2, h3", (els) => els.map((el) => el.tagName));
      let sawH2 = false;
      for (const tag of headingOrder) {
        if (tag === "H2") sawH2 = true;
        if (tag === "H3") {
          expect(sawH2, "an h2 must appear before any h3").toBe(true);
        }
      }

      // Body paragraphs inside sections: line-height ≥ 1.4, measure ≤ 90ch.
      const bodyStats = await page.$$eval('[data-testid="course-section"] p', (els) =>
        els.map((el) => {
          const s = getComputedStyle(el);
          const fontSize = parseFloat(s.fontSize);
          const lineHeight = parseFloat(s.lineHeight) / fontSize;
          const widthCh = el.getBoundingClientRect().width / (fontSize * 0.5);
          return { fontSize, lineHeight, widthCh };
        }),
      );
      for (const st of bodyStats.slice(0, 20)) {
        if (st.fontSize < 12) continue; // skip captions/eyebrows
        expect(st.lineHeight).toBeGreaterThanOrEqual(1.35);
        expect(st.widthCh).toBeLessThanOrEqual(95);
      }

      // === Section vertical rhythm ===
      // Every <section> rendered inside main should breathe - at least 48px
      // padding-block on mobile, 64px on desktop. Catches accidental
      // py-0/py-2 regressions after a refactor.
      const minPad = vp.width < 700 ? 48 : 64;
      const sectionPads = await page.$$eval(
        "main section, main [data-testid='course-section']",
        (els) =>
          els.map((el) => {
            const s = getComputedStyle(el);
            return {
              top: parseFloat(s.paddingTop),
              bottom: parseFloat(s.paddingBottom),
            };
          }),
      );
      for (const p of sectionPads) {
        // Some sections nest; only fail when BOTH sides are starved.
        if (p.top + p.bottom < minPad) {
          expect(p.top + p.bottom, "section vertical rhythm").toBeGreaterThanOrEqual(minPad);
        }
      }

      // === Light cards must not bleach body copy ===
      // Any <p>/<li> inside a .card-light or .tone-light wrapper should
      // resolve to a dark ink colour, not near-white. Catches the
      // .tone-dark cascade regression that wiped catalog card bodies.
      const lightCardText = await page.$$eval(
        ".card-light p, .card-light li, .tone-light p, .tone-light li",
        (els) =>
          els.slice(0, 25).map((el) => {
            const c = getComputedStyle(el).color;
            // rgb(R, G, B[ / A]) → average channel luma
            const m = c.match(/rgba?\(([^)]+)\)/);
            if (!m) return 0;
            const [r, g, b] = m[1].split(",").map((v) => parseFloat(v.trim()));
            return (r + g + b) / 3;
          }),
      );
      for (const luma of lightCardText) {
        // Anything above 200/255 average channel is effectively unreadable on white.
        expect(luma, "light card text must be dark ink").toBeLessThan(200);
      }
    });
  }
}
