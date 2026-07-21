#!/usr/bin/env node
/**
 * Visual regression — card surfaces, light + dark mode.
 *
 * Complements scripts/visual-regression.mjs, which only baselines light-mode
 * hero + CTA regions. This harness targets the card islands that were bleached
 * by a `.dark`-on-<html> token cascade regression (track cards, JD Mirror,
 * FAQ list, cohorts card) and captures each in BOTH color schemes.
 *
 * Usage:
 *   node scripts/visual-regression-cards.mjs --update   # (re)seed baselines
 *   node scripts/visual-regression-cards.mjs            # compare & fail on diff
 *
 * Baselines live under tests/visual/baseline/cards/, diffs under
 * tests/visual/diff/cards/. Failure threshold VR_THRESHOLD (default 0.5%).
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
const BASELINE_DIR = join(ROOT, "tests/visual/baseline/cards");
const ACTUAL_DIR = join(ROOT, "tests/visual/actual/cards");
const DIFF_DIR = join(ROOT, "tests/visual/diff/cards");
for (const d of [BASELINE_DIR, ACTUAL_DIR, DIFF_DIR]) mkdirSync(d, { recursive: true });

/**
 * Selectors chosen to match the exact surfaces the recent dark-mode
 * cascade regression bleached: track domain grid, JD Mirror card, FAQ
 * accordion, cohorts application card. Any of these silently going white
 * on white (or navy on navy) will surface as a >0.5% pixel diff.
 * @type {Array<{name:string, url:string, selector:string, viewport:{width:number,height:number}}>}
 */
const TARGETS = [
  {
    name: "track-domain-grid",
    url: "/courses",
    selector: "[data-testid='track-hero']",
    viewport: { width: 1280, height: 1400 },
  },
  {
    name: "track-domain-mobile",
    url: "/courses",
    selector: "[data-testid='track-hero']",
    viewport: { width: 390, height: 1600 },
  },
  {
    name: "jd-mirror-card",
    url: "/jd-mirror",
    selector: "#jd-mirror",
    viewport: { width: 1280, height: 1200 },
  },
  { name: "faq-list", url: "/faq", selector: "#faq", viewport: { width: 1280, height: 1400 } },
  {
    name: "cohorts-card",
    url: "/cohorts",
    selector: "main section:first-of-type",
    viewport: { width: 1280, height: 1200 },
  },
  {
    name: "home-tracks",
    url: "/",
    selector: "[data-testid='track-hero']",
    viewport: { width: 1280, height: 1400 },
  },
];

const MODES = /** @type {const} */ (["light", "dark"]);

function diffPngs(aBuf, bBuf, outPath) {
  const a = PNG.sync.read(aBuf);
  const b = PNG.sync.read(bBuf);
  const { width, height } = a;
  if (b.width !== width || b.height !== height) return { ratio: 1, size: { width, height } };
  const diff = new PNG({ width, height });
  const changed = pixelmatch(a.data, b.data, diff.data, width, height, { threshold: 0.1 });
  writeFileSync(outPath, PNG.sync.write(diff));
  return { ratio: changed / (width * height) };
}

const browser = await chromium.launch({ headless: true });
let failed = 0;
let skipped = 0;
try {
  for (const mode of MODES) {
    for (const t of TARGETS) {
      const ctx = await browser.newContext({ viewport: t.viewport, colorScheme: mode });
      const page = await ctx.newPage();
      // Force the theme class before the app boots so the ThemeProvider
      // (which reads prefers-color-scheme + localStorage) can't race with us.
      await page.addInitScript((m) => {
        try {
          localStorage.setItem("arzon-theme", m);
        } catch {}
      }, mode);
      await page
        .goto(BASE.replace(/\/$/, "") + t.url, { waitUntil: "networkidle" })
        .catch(() => {});
      await page.evaluate((m) => {
        const r = document.documentElement;
        if (m === "dark") r.classList.add("dark");
        else r.classList.remove("dark");
        r.style.colorScheme = m;
      }, mode);
      await page.waitForTimeout(600);
      const name = `${t.name}--${mode}`;
      const el = page.locator(t.selector).first();
      if (!(await el.count())) {
        console.warn(`· ${name}: selector "${t.selector}" not found on ${t.url} — skipping`);
        skipped++;
        await ctx.close();
        continue;
      }
      const buf = await el.screenshot();
      const actual = join(ACTUAL_DIR, `${name}.png`);
      writeFileSync(actual, buf);
      const baseline = join(BASELINE_DIR, `${name}.png`);
      if (UPDATE || !existsSync(baseline)) {
        writeFileSync(baseline, buf);
        console.log(`✓ ${name}: baseline ${UPDATE ? "updated" : "created"}`);
      } else {
        const { ratio } = diffPngs(readFileSync(baseline), buf, join(DIFF_DIR, `${name}.png`));
        const pct = (ratio * 100).toFixed(3);
        if (ratio > THRESHOLD) {
          console.error(
            `✗ ${name}: diff ${pct}% > ${(THRESHOLD * 100).toFixed(3)}% (see tests/visual/diff/cards/${name}.png)`,
          );
          failed++;
        } else {
          console.log(`✓ ${name}: diff ${pct}%`);
        }
      }
      await ctx.close();
    }
  }
} finally {
  await browser.close();
}

if (failed) {
  console.error(`\nvisual-regression-cards: ${failed} target(s) exceeded threshold`);
  process.exit(1);
}
console.log(`\nvisual-regression-cards: OK${skipped ? ` (${skipped} skipped)` : ""}`);
