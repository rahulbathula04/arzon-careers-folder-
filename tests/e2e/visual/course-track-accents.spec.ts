import { test, expect } from "@playwright/test";
import { TRACK_THEME, type TrackSlug } from "../../../src/data/trackTheme";

// Tailwind palette → hex map for the *-300 accent text used in each track.
// Mirrors tailwind v4 default palette.
const ACCENT_HEX: Record<TrackSlug, string> = {
  pharmacovigilance: "#7dd3fc", // sky-300
  "medical-coding": "#c4b5fd", // violet-300
  "clinical-data-management": "#fcd34d", // amber-300
  "sas-clinical": "#fda4af", // rose-300
  "regulatory-affairs": "#f0abfc", // fuchsia-300
  "medical-writing": "#67e8f9", // cyan-300
};

const VIEWPORTS = [
  { name: "mobile", width: 390, height: 800 },
  { name: "tablet", width: 820, height: 1100 },
  { name: "desktop", width: 1280, height: 900 },
];

const SLUGS = Object.keys(TRACK_THEME) as TrackSlug[];

function rgbToHex(rgb: string): string {
  const m = rgb.match(/\d+/g);
  if (!m) return rgb;
  const [r, g, b] = m.map((n) => Number(n));
  return (
    "#" +
    [r, g, b]
      .map((c) => c.toString(16).padStart(2, "0"))
      .join("")
      .toLowerCase()
  );
}

for (const slug of SLUGS) {
  for (const vp of VIEWPORTS) {
    test(`${slug} @ ${vp.name} - accent tokens match track palette`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(`/courses/${slug}`, { waitUntil: "domcontentloaded" });
      await page.waitForSelector('[data-testid="section-eyebrow"]');

      const expected = ACCENT_HEX[slug];

      const eyebrowColors = await page.$$eval('[data-testid="section-eyebrow"]', (els) =>
        els.map((el) => getComputedStyle(el).color),
      );
      for (const c of eyebrowColors) {
        expect(rgbToHex(c)).toBe(expected);
      }

      // No stray default blue except the gold cohort pill.
      const forbidden = await page.evaluate(() => {
        const out: string[] = [];
        document.querySelectorAll("*").forEach((el) => {
          const cs = getComputedStyle(el);
          if (cs.color === "rgb(59, 130, 246)" || cs.color === "rgb(96, 165, 250)") {
            out.push((el as HTMLElement).outerHTML.slice(0, 120));
          }
        });
        return out;
      });
      expect(forbidden, "no hard-coded blue accents should remain").toEqual([]);
    });
  }
}
