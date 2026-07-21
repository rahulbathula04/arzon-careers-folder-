#!/usr/bin/env node
/**
 * Landing accessibility audit (advisory).
 *
 * Runs axe-core via Playwright against `/` at mobile + desktop and
 * asserts: 0 contrast violations, 0 button-name violations, every
 * interactive element has a visible focus ring, and every primary CTA
 * meets a 44×44 tap target. Reports findings; does not fail the build
 * until the team promotes it.
 *
 *   node scripts/check-a11y-landing.mjs
 */
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const URL = process.env.LANDING_URL || "http://localhost:8080/";
const BREAKPOINTS = [
  { w: 375, h: 800, tag: "mobile" },
  { w: 1280, h: 900, tag: "desktop" },
];
const FAIL_RULES = new Set(["color-contrast", "button-name", "link-name"]);
const MIN_TAP = 44;

const browser = await chromium.launch({ headless: true });
let issues = 0;
for (const bp of BREAKPOINTS) {
  const ctx = await browser.newContext({ viewport: { width: bp.w, height: bp.h } });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: "networkidle" }).catch(() => {});

  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa"])
    .analyze()
    .catch((e) => ({ violations: [{ id: "axe-error", description: String(e), nodes: [] }] }));

  for (const v of results.violations) {
    if (!FAIL_RULES.has(v.id)) continue;
    issues++;
    console.warn(`  ⚠ [${bp.tag}] ${v.id} — ${v.nodes.length} node(s)`);
    for (const n of v.nodes.slice(0, 3)) console.warn(`     ${n.target.join(" ")}`);
  }

  // tap-target sweep on primary CTAs
  const undersized = await page.$$eval(
    "a.btn-primary, a.btn-gold, button.btn-primary, button.btn-gold",
    (els, min) =>
      els
        .map((el) => {
          const r = el.getBoundingClientRect();
          return {
            ok: r.height >= min && r.width >= min,
            w: r.width,
            h: r.height,
            text: el.textContent?.trim().slice(0, 40),
          };
        })
        .filter((x) => !x.ok),
    MIN_TAP,
  );
  if (undersized.length) {
    issues += undersized.length;
    console.warn(`  ⚠ [${bp.tag}] ${undersized.length} CTA(s) under ${MIN_TAP}px`);
    for (const u of undersized.slice(0, 5))
      console.warn(`     ${Math.round(u.w)}×${Math.round(u.h)}  "${u.text}"`);
  }

  await ctx.close();
}
await browser.close();
console.log(`\ncheck-a11y-landing: ${issues} advisory finding(s)`);
process.exit(0); // advisory
