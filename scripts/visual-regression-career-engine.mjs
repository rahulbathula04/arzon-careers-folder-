#!/usr/bin/env node
/**
 * Visual regression for the Career Engine header brand and the Quick start
 * question card. Guards against global CSS overrides re-introducing
 * invisible "Arzon" text or broken em-dash typography in question prompts.
 *
 * Layout mirrors scripts/visual-regression-footer.mjs.
 */
import { chromium } from "playwright";
import { mkdir, writeFile, readFile, access } from "node:fs/promises";
import { resolve } from "node:path";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, arr) => {
    if (a.startsWith("--")) acc.push([a.replace(/^--/, ""), arr[i + 1] ?? "true"]);
    return acc;
  }, []),
);

const BASE = args.base ?? "http://localhost:8080";
const OUT = resolve(args.out ?? "/mnt/documents/visual-regression/career-engine");
const RESET = args.reset === "true";

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 1600 },
  { name: "mobile", width: 390, height: 1600 },
  { name: "mobile-sm", width: 320, height: 1600 },
];

const TARGETS = [
  { name: "header-brand", route: "/career-engine/start", selector: "header" },
  { name: "quick-start-card", route: "/career-engine/test", selector: "main" },
];

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

function diffPercent(a, b) {
  if (a.width !== b.width || a.height !== b.height) return { pct: 100, out: null };
  const out = new PNG({ width: a.width, height: a.height });
  const count = pixelmatch(a.data, b.data, out.data, a.width, a.height, { threshold: 0.1 });
  return { pct: (100 * count) / (a.width * a.height), out };
}

async function main() {
  await mkdir(`${OUT}/baseline`, { recursive: true });
  await mkdir(`${OUT}/current`, { recursive: true });
  await mkdir(`${OUT}/diff`, { recursive: true });

  const browser = await chromium.launch({
    executablePath:
      process.env.PLAYWRIGHT_CHROMIUM ||
      "/chromium_headless_shell-1194/chrome-linux/headless_shell",
  });
  const summary = [];

  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1,
    });
    const page = await ctx.newPage();
    // Seed a profile so /career-engine/test renders the first question
    // instead of redirecting to /start.
    await page.goto(BASE + "/", { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.evaluate(() => {
      try {
        sessionStorage.setItem(
          "ce_profile",
          JSON.stringify({
            name: "QA Bot",
            phone: "9999999999",
            email: "qa@arzon.test",
            whatsappOptin: false,
          }),
        );
      } catch {}
    });
    for (const t of TARGETS) {
      const row = { target: t.name, viewport: vp.name, status: "ok", diffPct: 0 };
      try {
        await page.goto(BASE + t.route, { waitUntil: "domcontentloaded", timeout: 30000 });
        await page.waitForLoadState("networkidle", { timeout: 10000 }).catch(() => {});
        const el = await page.$(t.selector);
        if (!el) {
          row.status = `selector-missing: ${t.selector}`;
          summary.push(row);
          continue;
        }
        await el.scrollIntoViewIfNeeded();
        await page.waitForTimeout(300);
        const currentBuf = await el.screenshot({ animations: "disabled" });
        const currentPath = `${OUT}/current/${t.name}.${vp.name}.png`;
        const baselinePath = `${OUT}/baseline/${t.name}.${vp.name}.png`;
        await writeFile(currentPath, currentBuf);
        const hasBaseline = await exists(baselinePath);
        if (!hasBaseline || RESET) {
          await writeFile(baselinePath, currentBuf);
          row.status = hasBaseline ? "baseline-reset" : "baseline-created";
        } else {
          const baseline = PNG.sync.read(await readFile(baselinePath));
          const current = PNG.sync.read(currentBuf);
          const { pct, out } = diffPercent(baseline, current);
          row.diffPct = Math.round(pct * 1000) / 1000;
          if (out) await writeFile(`${OUT}/diff/${t.name}.${vp.name}.png`, PNG.sync.write(out));
          row.status = pct > 1 ? "CHANGED" : "ok";
        }
      } catch (e) {
        row.status = "error: " + e.message;
      }
      summary.push(row);
      console.log(
        `[vr-ce] ${t.name.padEnd(20)} ${vp.name.padEnd(10)} ${row.status.padEnd(22)} ${row.diffPct}%`,
      );
    }
    await ctx.close();
  }
  await browser.close();

  const md = [
    "# Career Engine header + Quick start — visual regression",
    "",
    `Base: ${BASE}`,
    `Out:  ${OUT}`,
    "",
    "| Target | Viewport | Status | Diff % |",
    "|---|---|---|---:|",
    ...summary.map((s) => `| ${s.target} | ${s.viewport} | ${s.status} | ${s.diffPct} |`),
    "",
    "Re-run with `--reset` after intentional redesigns. Any unexpected diff",
    "means a global override (e.g. `.tone-light` text-color rules) is bleeding",
    "into the dark Career Engine surface and reducing brand-text contrast.",
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
