#!/usr/bin/env node
/**
 * Automated accessibility audit.
 *
 * Walks a hardcoded route list at three breakpoints (1440, 768, 390),
 * runs axe-core via @axe-core/playwright on each, and writes:
 *   artifacts/a11y/<route>.<vw>.json   — raw axe results per route/viewport
 *   artifacts/a11y/summary.md           — table of route × severity counts
 *
 * Usage:
 *   node scripts/audit-a11y.mjs [--base http://localhost:8080] [--routes "/,/admin"]
 */
import { chromium } from "playwright";
import { AxeBuilder } from "@axe-core/playwright";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, arr) => {
    if (a.startsWith("--")) acc.push([a.replace(/^--/, ""), arr[i + 1] ?? "true"]);
    return acc;
  }, []),
);

const BASE = args.base ?? "http://localhost:8080";
const OUT = resolve(process.env.AUDIT_OUT_DIR || "artifacts/a11y");
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
  "/admin/applications",
  "/admin/funnel",
  "/admin/demand",
];

const ROUTES = args.routes ? args.routes.split(",") : DEFAULT_ROUTES;

function severityCounts(violations) {
  const c = { critical: 0, serious: 0, moderate: 0, minor: 0 };
  for (const v of violations) c[v.impact ?? "minor"] = (c[v.impact ?? "minor"] ?? 0) + 1;
  return c;
}

function slug(route) {
  return route.replace(/^\//, "").replace(/[\/]/g, "_") || "root";
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch({
    executablePath:
      process.env.PLAYWRIGHT_CHROMIUM ||
      "/chromium_headless_shell-1194/chrome-linux/headless_shell",
  });
  const summary = [];

  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await ctx.newPage();
    const storageKey = process.env.LOVABLE_BROWSER_SUPABASE_STORAGE_KEY;
    const sessionJson = process.env.LOVABLE_BROWSER_SUPABASE_SESSION_JSON;
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
      const row = { route, viewport: vp.name, ok: false, counts: null, error: null };
      try {
        await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
        await page.waitForLoadState("networkidle", { timeout: 10000 }).catch(() => {});
        const results = await new AxeBuilder({ page })
          .disableRules(["color-contrast"]) // contrast handled by the dedicated script
          .analyze();
        const counts = severityCounts(results.violations);
        row.ok = true;
        row.counts = counts;
        const file = `${OUT}/${slug(route)}.${vp.name}.json`;
        await writeFile(
          file,
          JSON.stringify(
            {
              route,
              viewport: vp,
              url,
              counts,
              violations: results.violations.map((v) => ({
                id: v.id,
                impact: v.impact,
                description: v.description,
                help: v.help,
                helpUrl: v.helpUrl,
                nodes: v.nodes.length,
                targets: v.nodes.slice(0, 5).map((n) => n.target.join(" ")),
              })),
            },
            null,
            2,
          ),
        );
      } catch (e) {
        row.error = e.message;
      }
      summary.push(row);
      console.log(
        `[a11y] ${route.padEnd(28)} ${vp.name.padEnd(8)} ${
          row.error ? "ERROR " + row.error : JSON.stringify(row.counts)
        }`,
      );
    }
    await ctx.close();
  }

  await browser.close();

  const md = [
    "# Accessibility audit — axe-core",
    "",
    `Base: ${BASE}`,
    "",
    "| Route | Viewport | Critical | Serious | Moderate | Minor | Status |",
    "|---|---|---:|---:|---:|---:|---|",
    ...summary.map((s) => {
      const c = s.counts ?? { critical: "-", serious: "-", moderate: "-", minor: "-" };
      const status = s.error
        ? `ERROR — ${s.error}`
        : s.counts && s.counts.critical === 0
          ? "PASS"
          : "REVIEW";
      return `| \`${s.route}\` | ${s.viewport} | ${c.critical} | ${c.serious} | ${c.moderate} | ${c.minor} | ${status} |`;
    }),
    "",
    "Generated " + new Date().toISOString(),
  ].join("\n");
  await writeFile(`${OUT}/summary.md`, md);
  console.log(`\nWrote ${OUT}/summary.md`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
