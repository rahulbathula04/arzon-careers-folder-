#!/usr/bin/env node
/**
 * Visual regression - landing sections.
 *
 * Captures screenshots of the rebuilt sections (trust bar, urgency,
 * testimonials, comparison, hero, hiring partner wall) at 3 breakpoints
 * and stores them under /mnt/documents/visual-baselines/landing/.
 *
 * First run = baselines. Subsequent runs diff via pixel-by-pixel
 * comparison and warn (advisory) when the delta is >0.5%. Wire into
 * prebuild only after the team has approved the captured baselines.
 *
 *   node scripts/visual-regression-landing.mjs            # capture/compare
 *   node scripts/visual-regression-landing.mjs --update   # overwrite baselines
 */
import { chromium } from "playwright";
import { mkdir, readFile, writeFile, access } from "node:fs/promises";
import { dirname, join } from "node:path";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";

const ROOT = "/mnt/documents/visual-baselines/landing";
const URL = process.env.LANDING_URL || "http://localhost:8080/";
const UPDATE = process.argv.includes("--update");

const TARGETS = [
  { id: "hero", selector: '[data-apply-surface="home-hero"]' },
  { id: "hiring-partners", selector: 'section:has(> div h2:has-text("hiring"))' },
  { id: "programmes", selector: "#programmes" },
  { id: "salary", selector: "section:has(table)" },
  { id: "comparison", selector: "#compare" },
  { id: "urgency", selector: "#limited-seats" },
];
const VIEWPORTS = [
  { w: 375, h: 800, tag: "mobile" },
  { w: 768, h: 1024, tag: "tablet" },
  { w: 1280, h: 900, tag: "desktop" },
];

async function ensureDir(p) {
  await mkdir(dirname(p), { recursive: true });
}
async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function compare(baseline, current) {
  const a = PNG.sync.read(await readFile(baseline));
  const b = PNG.sync.read(await readFile(current));
  if (a.width !== b.width || a.height !== b.height) return { pct: 100, dims: false };
  const diff = new PNG({ width: a.width, height: a.height });
  const px = pixelmatch(a.data, b.data, diff.data, a.width, a.height, { threshold: 0.12 });
  return { pct: (px / (a.width * a.height)) * 100, dims: true };
}

const browser = await chromium.launch({ headless: true });
let warns = 0,
  captured = 0;
for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h } });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: "networkidle" }).catch(() => {});
  for (const t of TARGETS) {
    const el = await page.$(t.selector);
    if (!el) {
      console.warn(`  skip ${t.id}@${vp.tag} - selector not found`);
      continue;
    }
    const cur = join(ROOT, vp.tag, `${t.id}.current.png`);
    const base = join(ROOT, vp.tag, `${t.id}.baseline.png`);
    await ensureDir(cur);
    await el.screenshot({ path: cur });
    captured++;
    if (UPDATE || !(await exists(base))) {
      await writeFile(base, await readFile(cur));
      console.log(`  baseline ${t.id}@${vp.tag}`);
    } else {
      const { pct, dims } = await compare(base, cur);
      if (!dims || pct > 0.5) {
        warns++;
        console.warn(`  ⚠ delta ${pct.toFixed(2)}% - ${t.id}@${vp.tag}`);
      } else {
        console.log(`  ok ${t.id}@${vp.tag} (${pct.toFixed(2)}%)`);
      }
    }
  }
  await ctx.close();
}
await browser.close();
console.log(`\nvisual-regression-landing: ${captured} shots, ${warns} drift warning(s)`);
process.exit(0); // advisory - never fails the build
