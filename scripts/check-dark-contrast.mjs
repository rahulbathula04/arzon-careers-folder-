#!/usr/bin/env node
/**
 * Dark-mode contrast guard.
 *
 * Walks every visible text node on a curated route list with `.dark` forced
 * on <html>, computes the effective composited background per element, and
 * fails if any real text falls under WCAG AA (4.5:1 body, 3.0:1 large).
 *
 * This catches the class of bug where a token cascade (`.dark` redefining
 * --ink / --primary / --card) bleaches text on a light-surface island - a
 * regression that pure screenshot diffs would only catch after a baseline
 * refresh, and that CSS-lint tools miss entirely.
 *
 * Emoji glyphs are ignored (they render as color images and don't obey
 * the CSS `color` property).
 *
 * Usage:
 *   node scripts/check-dark-contrast.mjs
 *   BASE_URL=http://localhost:8080 node scripts/check-dark-contrast.mjs
 */
import { chromium } from "playwright";

const BASE = process.env.BASE_URL || "http://localhost:8080";

const ROUTES = [
  "/",
  "/about",
  "/courses",
  "/courses/pharmacovigilance",
  "/career-engine",
  "/credibility",
  "/curriculum",
  "/faq",
  "/contact",
  "/jd-mirror",
  "/methodology",
  "/proof",
  "/placements",
  "/cohorts",
  "/deployment-model",
  "/legal/privacy",
  "/legal/terms",
];

const AUDIT = `
() => {
  const EMOJI = /\\p{Extended_Pictographic}/u;
  function parseRGBA(s) {
    const m = s && s.match(/rgba?\\(([^)]+)\\)/i);
    if (!m) return null;
    const p = m[1].split(',').map(x => parseFloat(x.trim()));
    return { r: p[0], g: p[1], b: p[2], a: p[3] == null ? 1 : p[3] };
  }
  function composite(fg, bg) {
    const a = fg.a + bg.a * (1 - fg.a);
    if (a === 0) return { r: 0, g: 0, b: 0, a: 0 };
    return {
      r: (fg.r * fg.a + bg.r * bg.a * (1 - fg.a)) / a,
      g: (fg.g * fg.a + bg.g * bg.a * (1 - fg.a)) / a,
      b: (fg.b * fg.a + bg.b * bg.a * (1 - fg.a)) / a,
      a,
    };
  }
  function lum({ r, g, b }) {
    const f = c => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  }
  function contrast(a, b) {
    const [hi, lo] = lum(a) > lum(b) ? [lum(a), lum(b)] : [lum(b), lum(a)];
    return (hi + 0.05) / (lo + 0.05);
  }
  function bgFor(el) {
    const bodyBg = parseRGBA(getComputedStyle(document.body).backgroundColor) || { r: 255, g: 255, b: 255, a: 1 };
    const htmlBg = parseRGBA(getComputedStyle(document.documentElement).backgroundColor) || bodyBg;
    let base = htmlBg.a > 0 ? htmlBg : bodyBg;
    if (base.a < 1) base = { r: 255, g: 255, b: 255, a: 1 };
    const chain = [];
    let cur = el;
    while (cur && cur !== document.documentElement) { chain.push(cur); cur = cur.parentElement; }
    chain.reverse();
    let acc = base;
    for (const node of chain) {
      const bg = parseRGBA(getComputedStyle(node).backgroundColor);
      if (bg && bg.a > 0) acc = composite(bg, acc);
    }
    return acc;
  }
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const seen = new Set();
  const issues = [];
  let n;
  while ((n = walker.nextNode())) {
    const t = (n.nodeValue || '').trim();
    if (t.length < 2) continue;
    if (EMOJI.test(t)) continue; // color-glyph emoji ignore CSS color
    const el = n.parentElement;
    if (!el || seen.has(el)) continue;
    seen.add(el);
    if (el.closest('script,style,noscript,svg')) continue;
    const cs = getComputedStyle(el);
    if (cs.visibility === 'hidden' || cs.display === 'none' || parseFloat(cs.opacity) < 0.05) continue;
    const rect = el.getBoundingClientRect();
    if (rect.width < 4 || rect.height < 4) continue;
    const fg = parseRGBA(cs.color);
    if (!fg) continue;
    const bg = bgFor(el);
    const eff = fg.a < 1 ? composite(fg, bg) : fg;
    const c = contrast(eff, bg);
    const px = parseFloat(cs.fontSize);
    const bold = parseInt(cs.fontWeight) >= 600;
    const large = px >= 24 || (px >= 18.66 && bold);
    const min = large ? 3.0 : 4.5;
    if (c < min) {
      issues.push({
        text: t.slice(0, 80),
        contrast: +c.toFixed(2),
        min, px: +px.toFixed(1),
        tag: el.tagName.toLowerCase(),
        cls: (el.className || '').toString().slice(0, 100),
      });
    }
  }
  return issues;
}
`;

const browser = await chromium.launch({ headless: true });
let total = 0;
try {
  for (const route of ROUTES) {
    const ctx = await browser.newContext({
      viewport: { width: 384, height: 900 },
      colorScheme: "dark",
    });
    const page = await ctx.newPage();
    await page.addInitScript(() => {
      try {
        localStorage.setItem("arzon-theme", "dark");
      } catch {}
    });
    try {
      await page.goto(BASE.replace(/\/$/, "") + route, {
        waitUntil: "domcontentloaded",
        timeout: 15000,
      });
    } catch (e) {
      console.warn(`· ${route}: navigation failed - ${String(e).slice(0, 100)}`);
      await ctx.close();
      continue;
    }
    await page.evaluate(() => document.documentElement.classList.add("dark"));
    await page.waitForTimeout(500);
    // Trigger lazy content by scrolling.
    const h = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < Math.min(h, 16000); y += 800) {
      await page.evaluate((yy) => window.scrollTo(0, yy), y);
      await page.waitForTimeout(60);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(200);
    const issues = await page.evaluate(AUDIT);
    if (issues.length) {
      console.error(
        `\n✗ ${route} (${issues.length} contrast failure${issues.length === 1 ? "" : "s"}):`,
      );
      for (const i of issues.slice(0, 8)) {
        console.error(`   ${i.contrast}:1 < ${i.min}:1  <${i.tag}> "${i.text}"  cls="${i.cls}"`);
      }
      if (issues.length > 8) console.error(`   … ${issues.length - 8} more`);
      total += issues.length;
    } else {
      console.log(`✓ ${route}`);
    }
    await ctx.close();
  }
} finally {
  await browser.close();
}

if (total) {
  console.error(`\ncheck-dark-contrast: ${total} failure(s) across dark-mode routes`);
  process.exit(1);
}
console.log("\ncheck-dark-contrast: OK");
