#!/usr/bin/env node
/**
 * WCAG color-contrast audit.
 *
 * Walks routes at three breakpoints, samples every visible text node,
 * computes the effective background by walking up the DOM and accumulating
 * alpha, then evaluates WCAG 2.1 contrast against the painted text color.
 *
 * Output:
 *   artifacts/contrast/<route>.<vw>.json — full list of failing nodes
 *   artifacts/contrast/summary.md         — table of route × fail count
 *
 * Usage:
 *   node scripts/audit-contrast.mjs [--base http://localhost:8080]
 */
import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, arr) => {
    if (a.startsWith("--")) acc.push([a.replace(/^--/, ""), arr[i + 1] ?? "true"]);
    return acc;
  }, []),
);

const BASE = args.base ?? "http://localhost:8080";
const OUT = resolve(process.env.AUDIT_OUT_DIR || "artifacts/contrast");
const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 390, height: 844 },
];

const DEFAULT_ROUTES = [
  "/",
  "/programmes",
  "/apply",
  "/curriculum",
  "/credibility",
  "/jd-mirror",
  "/career-engine/plan",
  "/internships/pharmacovigilance",
  "/internships/medical-coding",
  "/internships/clinical-data-management",
  "/admin",
  "/admin/leads",
  "/admin/seo",
  "/admin/retention",
];
const ROUTES = args.routes ? args.routes.split(",") : DEFAULT_ROUTES;

function slug(route) {
  return route.replace(/^\//, "").replace(/[\/]/g, "_") || "root";
}

const SCAN = String.raw`
(() => {
  function parseColor(str) {
    if (!str) return null;
    const m = str.match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    const parts = m[1].split(',').map((s) => parseFloat(s.trim()));
    const [r, g, b, a = 1] = parts;
    return { r, g, b, a };
  }
  function srgbToLin(c) {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  }
  function luminance({ r, g, b }) {
    return 0.2126 * srgbToLin(r) + 0.7152 * srgbToLin(g) + 0.0722 * srgbToLin(b);
  }
  function compose(over, under) {
    const a = over.a + under.a * (1 - over.a);
    if (a === 0) return { r: 0, g: 0, b: 0, a: 0 };
    return {
      r: (over.r * over.a + under.r * under.a * (1 - over.a)) / a,
      g: (over.g * over.a + under.g * under.a * (1 - over.a)) / a,
      b: (over.b * over.a + under.b * under.a * (1 - over.a)) / a,
      a,
    };
  }
  function effectiveBg(el) {
    let acc = { r: 0, g: 0, b: 0, a: 0 };
    let n = el;
    while (n && n.nodeType === 1) {
      const cs = getComputedStyle(n);
      const bg = parseColor(cs.backgroundColor);
      if (bg && bg.a > 0) acc = compose(acc, bg);
      if (acc.a >= 0.999) break;
      n = n.parentElement;
    }
    if (acc.a < 0.999) {
      const html = parseColor(getComputedStyle(document.documentElement).backgroundColor) || { r: 255, g: 255, b: 255, a: 1 };
      acc = compose(acc, html);
    }
    return acc;
  }
  function ratio(a, b) {
    const La = luminance(a);
    const Lb = luminance(b);
    const [hi, lo] = La > Lb ? [La, Lb] : [Lb, La];
    return (hi + 0.05) / (lo + 0.05);
  }
  const fails = [];
  const elements = document.querySelectorAll('body *');
  for (const el of elements) {
    const cs = getComputedStyle(el);
    if (cs.visibility !== 'visible' || cs.display === 'none' || cs.opacity === '0') continue;
    // Only direct text nodes
    let text = '';
    for (const n of el.childNodes) if (n.nodeType === 3) text += n.textContent;
    text = text.trim();
    if (!text) continue;
    if (text.length < 1) continue;
    const fg = parseColor(cs.color);
    if (!fg || fg.a < 0.1) continue;
    const bg = effectiveBg(el);
    const r = ratio(fg, bg);
    const sizePx = parseFloat(cs.fontSize);
    const isBold = parseInt(cs.fontWeight, 10) >= 600;
    const isLarge = sizePx >= 24 || (sizePx >= 18.66 && isBold);
    const threshold = isLarge ? 3.0 : 4.5;
    if (r < threshold) {
      const rect = el.getBoundingClientRect();
      if (rect.width < 1 || rect.height < 1) continue;
      fails.push({
        text: text.slice(0, 80),
        tag: el.tagName.toLowerCase(),
        classes: (el.className || '').toString().slice(0, 160),
        fontSize: Math.round(sizePx * 10) / 10,
        fontWeight: cs.fontWeight,
        fg: cs.color,
        bg: 'rgba(' + Math.round(bg.r) + ',' + Math.round(bg.g) + ',' + Math.round(bg.b) + ',' + bg.a.toFixed(2) + ')',
        ratio: Math.round(r * 100) / 100,
        threshold,
      });
    }
  }
  return fails;
})()
`;

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch({
    executablePath:
      process.env.PLAYWRIGHT_CHROMIUM ||
      "/chromium_headless_shell-1194/chrome-linux/headless_shell",
  });
  const summary = [];

  const storageKey = process.env.LOVABLE_BROWSER_SUPABASE_STORAGE_KEY;
  const sessionJson = process.env.LOVABLE_BROWSER_SUPABASE_SESSION_JSON;

  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await ctx.newPage();
    if (storageKey && sessionJson) {
      try {
        await page.goto(BASE + "/", { waitUntil: "domcontentloaded", timeout: 20000 });
        await page.evaluate(
          ([k, v]) => window.localStorage.setItem(k, v),
          [storageKey, sessionJson],
        );
      } catch {}
    }
    for (const route of ROUTES) {
      const url = BASE + route;
      const row = { route, viewport: vp.name, failCount: 0, error: null };
      try {
        await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
        await page.waitForLoadState("networkidle", { timeout: 10000 }).catch(() => {});
        const fails = await page.evaluate(SCAN);
        row.failCount = fails.length;
        await writeFile(
          `${OUT}/${slug(route)}.${vp.name}.json`,
          JSON.stringify({ route, viewport: vp, url, failCount: fails.length, fails }, null, 2),
        );
      } catch (e) {
        row.error = e.message;
      }
      summary.push(row);
      console.log(
        `[contrast] ${route.padEnd(28)} ${vp.name.padEnd(8)} ${
          row.error ? "ERROR " + row.error : row.failCount + " fails"
        }`,
      );
    }
    await ctx.close();
  }

  await browser.close();

  const md = [
    "# Color-contrast audit — WCAG 2.1",
    "",
    `Base: ${BASE}`,
    "",
    "Threshold: 4.5:1 for body text, 3:1 for ≥18.66px bold / ≥24px.",
    "",
    "| Route | Viewport | Failing text nodes | Status |",
    "|---|---|---:|---|",
    ...summary.map(
      (s) =>
        `| \`${s.route}\` | ${s.viewport} | ${s.failCount} | ${
          s.error ? "ERROR — " + s.error : s.failCount === 0 ? "PASS" : "REVIEW"
        } |`,
    ),
    "",
    "Per-route JSON files contain the failing element list with computed fg/bg/ratio.",
    "Generated " + new Date().toISOString(),
  ].join("\n");
  await writeFile(`${OUT}/summary.md`, md);
  console.log(`\nWrote ${OUT}/summary.md`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
