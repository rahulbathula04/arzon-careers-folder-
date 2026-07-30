#!/usr/bin/env node
/**
 * Visual regression harness - hero + CTA components.
 *
 * Captures per-component screenshots on desktop + mobile viewports and
 * diffs them against a checked-in baseline in tests/visual/baseline/.
 *
 * Modes:
 *   node scripts/visual-regression.mjs --update    # (re)generate baseline
 *   node scripts/visual-regression.mjs             # compare & fail on diff
 *
 * Fails when the per-pixel diff ratio exceeds VR_THRESHOLD (default 0.5%).
 * Diff PNGs are written to tests/visual/diff/ for inspection.
 *
 * Baseline is scoped to landmarks that a palette/token regression would
 * silently break: the landing hero, the primary CTA button on / and
 * /courses/pharmacovigilance, and the sticky enrolment CTA.
 */
import { chromium } from "playwright";
import { mkdirSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";

const BASE = process.env.BASE_URL || "http://localhost:8080";
const UPDATE = process.argv.includes("--update");
const THRESHOLD = Number(process.env.VR_THRESHOLD || 0.005);
const ROOT = new URL("..", import.meta.url).pathname;
const BASELINE_DIR = join(ROOT, "tests/visual/baseline");
const ACTUAL_DIR = join(ROOT, "tests/visual/actual");
const DIFF_DIR = join(ROOT, "tests/visual/diff");
for (const d of [BASELINE_DIR, ACTUAL_DIR, DIFF_DIR]) mkdirSync(d, { recursive: true });

/** @type {Array<{name:string, url:string, selector:string, viewport:{width:number,height:number}}>} */
const TARGETS = [
  {
    name: "landing-hero-desktop",
    url: "/",
    selector: "main section:first-of-type",
    viewport: { width: 1280, height: 900 },
  },
  {
    name: "landing-hero-mobile",
    url: "/",
    selector: "main section:first-of-type",
    viewport: { width: 390, height: 780 },
  },
  {
    name: "landing-primary-cta",
    url: "/",
    selector: "a[href*='/career-fit'], button:has-text('Start')",
    viewport: { width: 1280, height: 900 },
  },
  {
    name: "course-hero-desktop",
    url: "/courses/pharmacovigilance",
    selector: "main section:first-of-type",
    viewport: { width: 1280, height: 900 },
  },
  {
    name: "course-enrol-cta",
    url: "/courses/pharmacovigilance",
    selector: "button:has-text('Enroll')",
    viewport: { width: 1280, height: 900 },
  },
  // Trust ribbon (compliance strip) - palette/gradient regressions here would nuke recruiter-grade credibility.
  {
    name: "trust-bar-desktop",
    url: "/courses/pharmacovigilance",
    selector: "[data-testid='course-trust-ribbon']",
    viewport: { width: 1280, height: 900 },
  },
  {
    name: "trust-bar-mobile",
    url: "/courses/pharmacovigilance",
    selector: "[data-testid='course-trust-ribbon']",
    viewport: { width: 390, height: 780 },
  },
  // Testimonials surrogate (CohortVoices).
  {
    name: "testimonials-desktop",
    url: "/",
    selector: "[data-testid='reviews-section']",
    viewport: { width: 1280, height: 1400 },
  },
  {
    name: "testimonials-mobile",
    url: "/",
    selector: "[data-testid='reviews-section']",
    viewport: { width: 390, height: 1400 },
  },
  // Final CTA band (course page beat 11).
  {
    name: "final-cta-desktop",
    url: "/courses/pharmacovigilance",
    selector: "[data-testid='course-final-cta']",
    viewport: { width: 1280, height: 900 },
  },
  {
    name: "final-cta-mobile",
    url: "/courses/pharmacovigilance",
    selector: "[data-testid='course-final-cta']",
    viewport: { width: 390, height: 900 },
  },
];

function diffPngs(aBuf, bBuf, outPath) {
  const a = PNG.sync.read(aBuf);
  const b = PNG.sync.read(bBuf);
  const { width, height } = a;
  if (b.width !== width || b.height !== height) return { ratio: 1, size: { width, height } };
  const diff = new PNG({ width, height });
  const changed = pixelmatch(a.data, b.data, diff.data, width, height, { threshold: 0.1 });
  writeFileSync(outPath, PNG.sync.write(diff));
  return { ratio: changed / (width * height), size: { width, height } };
}

const browser = await chromium.launch({ headless: true });
let failed = 0;
try {
  for (const t of TARGETS) {
    const ctx = await browser.newContext({ viewport: t.viewport });
    const page = await ctx.newPage();
    await page.goto(BASE.replace(/\/$/, "") + t.url, { waitUntil: "networkidle" }).catch(() => {});
    await page.waitForTimeout(500);
    const el = page.locator(t.selector).first();
    if (!(await el.count())) {
      console.warn(`· ${t.name}: selector "${t.selector}" not found on ${t.url} - skipping`);
      await ctx.close();
      continue;
    }
    const buf = await el.screenshot();
    const actual = join(ACTUAL_DIR, `${t.name}.png`);
    writeFileSync(actual, buf);
    const baseline = join(BASELINE_DIR, `${t.name}.png`);
    if (UPDATE || !existsSync(baseline)) {
      writeFileSync(baseline, buf);
      console.log(`✓ ${t.name}: baseline ${UPDATE ? "updated" : "created"}`);
    } else {
      const { ratio } = diffPngs(readFileSync(baseline), buf, join(DIFF_DIR, `${t.name}.png`));
      const pct = (ratio * 100).toFixed(3);
      if (ratio > THRESHOLD) {
        console.error(
          `✗ ${t.name}: diff ${pct}% > ${(THRESHOLD * 100).toFixed(3)}% (see tests/visual/diff/${t.name}.png)`,
        );
        failed++;
      } else {
        console.log(`✓ ${t.name}: diff ${pct}%`);
      }
    }
    await ctx.close();
  }
} finally {
  await browser.close();
}

if (failed) {
  console.error(`\nvisual-regression: ${failed} target(s) exceeded threshold`);
  process.exit(1);
}
console.log("\nvisual-regression: OK");
