#!/usr/bin/env node
/**
 * Visual diff pack for before/after comparisons.
 *
 * Captures full-viewport screenshots of a list of routes at two viewports.
 * Writes to /mnt/documents/diffs/<name>.<vp>.png.
 *
 * Two modes:
 *   --mode before         capture the current build as the "before" baseline
 *   --mode after          capture the current build as "after" and emit index.md
 *
 * Default base: http://localhost:8080
 * Default output: /mnt/documents/diffs
 */
import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, arr) => {
    if (a.startsWith("--")) acc.push([a.replace(/^--/, ""), arr[i + 1] ?? "true"]);
    return acc;
  }, []),
);

const BASE = args.base ?? "http://localhost:8080";
const OUT = args.out ?? "/mnt/documents/diffs";
const MODE = args.mode ?? "after";

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

const ROUTES = [
  { name: "home", route: "/" },
  { name: "programmes", route: "/programmes" },
  { name: "apply", route: "/apply" },
  { name: "career-engine-plan", route: "/career-engine/plan" },
  { name: "credibility", route: "/credibility" },
  { name: "admin", route: "/admin" },
  { name: "admin-leads", route: "/admin/leads" },
  { name: "admin-seo", route: "/admin/seo" },
  { name: "admin-retention", route: "/admin/retention" },
];

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch({
    executablePath:
      process.env.PLAYWRIGHT_CHROMIUM ||
      "/chromium_headless_shell-1194/chrome-linux/headless_shell",
  });
  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await ctx.newPage();
    for (const { name, route } of ROUTES) {
      const url = BASE + route;
      const out = `${OUT}/${name}.${vp.name}.${MODE}.png`;
      try {
        await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
        await page.waitForLoadState("networkidle", { timeout: 10000 }).catch(() => {});
        await page.screenshot({ path: out });
        console.log(`[${MODE}] ${route.padEnd(28)} ${vp.name.padEnd(8)} -> ${out}`);
      } catch (e) {
        console.log(`[${MODE}] ${route} ${vp.name} ERROR ${e.message}`);
      }
    }
    await ctx.close();
  }
  await browser.close();

  if (MODE === "after") {
    const md = [
      "# Before / After visual pack",
      "",
      `Generated ${new Date().toISOString()}`,
      "",
      ...ROUTES.flatMap(({ name, route }) =>
        VIEWPORTS.flatMap((vp) => [
          `## ${route} - ${vp.name}`,
          "",
          `**Before:** ${name}.${vp.name}.before.png`,
          "",
          `![before](${name}.${vp.name}.before.png)`,
          "",
          `**After:** ${name}.${vp.name}.after.png`,
          "",
          `![after](${name}.${vp.name}.after.png)`,
          "",
        ]),
      ),
    ].join("\n");
    await writeFile(`${OUT}/index.md`, md);
    console.log(`\nWrote ${OUT}/index.md`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
