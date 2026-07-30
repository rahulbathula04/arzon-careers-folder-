#!/usr/bin/env node
/**
 * Visual regression for the footer, CounsellorLeadForm, and top CTA strip.
 *
 * On first run, captures baseline PNGs of each target at desktop and mobile
 * widths. On subsequent runs, captures "current" PNGs and writes a diff PNG
 * (red pixels = changed). A summary.md ranks each target by diff %.
 *
 * Layout:
 *   <OUT>/baseline/<target>.<vp>.png   - first-run snapshot, committed
 *   <OUT>/current/<target>.<vp>.png    - most recent capture
 *   <OUT>/diff/<target>.<vp>.png       - pixel diff (only if baseline exists)
 *   <OUT>/summary.md                    - table of diff % per target
 *
 * Usage:
 *   node scripts/visual-regression-footer.mjs [--base http://localhost:8080] \
 *        [--reset]                   # overwrite baseline with current
 *        [--out /mnt/documents/visual-regression/footer]
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
const OUT = resolve(args.out ?? "/mnt/documents/visual-regression/footer");
const RESET = args.reset === "true";

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 2400 },
  { name: "mobile", width: 390, height: 2400 },
];

/**
 * Each target: a page route to load and a CSS selector to crop.
 * The CTA strip and CounsellorLeadForm live inside the footer, so a
 * single page visit captures all three.
 */
const TARGETS = [
  {
    name: "cta-strip",
    route: "/",
    selector: "footer .tone-light", // top "Not sure which programme fits?" strip
  },
  {
    name: "footer-brand",
    route: "/",
    selector: "footer .md\\:col-span-4", // brand + ISO/MSME/MCA + find us
  },
  {
    name: "counsellor-form",
    route: "/",
    selector: "footer form[aria-labelledby='footer-lead-heading']",
  },
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
  if (a.width !== b.width || a.height !== b.height) return 100;
  const out = new PNG({ width: a.width, height: a.height });
  const count = pixelmatch(a.data, b.data, out.data, a.width, a.height, {
    threshold: 0.1,
  });
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
        // Scroll into view so lazy content renders.
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
          if (out) {
            await writeFile(`${OUT}/diff/${t.name}.${vp.name}.png`, PNG.sync.write(out));
          }
          row.status = pct > 1 ? "CHANGED" : "ok";
        }
      } catch (e) {
        row.status = "error: " + e.message;
      }
      summary.push(row);
      console.log(
        `[vr] ${t.name.padEnd(18)} ${vp.name.padEnd(8)} ${row.status.padEnd(20)} ${row.diffPct}%`,
      );
    }
    await ctx.close();
  }

  await browser.close();

  const md = [
    "# Footer / CTA / CounsellorLeadForm - visual regression",
    "",
    `Base: ${BASE}`,
    `Out:  ${OUT}`,
    "",
    "| Target | Viewport | Status | Diff % |",
    "|---|---|---|---:|",
    ...summary.map((s) => `| ${s.target} | ${s.viewport} | ${s.status} | ${s.diffPct} |`),
    "",
    "**Workflow.** Run after every CSS / token change. If a diff > 1 % is",
    "expected (real redesign), re-run with `--reset` to update the baseline.",
    "Any unexpected diff means a global style override is bleeding into a",
    "component that owned its own contrast.",
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
