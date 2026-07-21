#!/usr/bin/env node
/**
 * Programme cover audit — records, for every BentoProgrammes cover on the
 * live dev server, the rendered width/height/aspect and the srcSet variant
 * the browser picked at 100 % and 80 % logical zoom across mobile / tablet
 * / desktop breakpoints.
 *
 * Writes a CSV + Markdown summary to /mnt/documents so results are
 * downloadable for review.
 */
import { chromium } from "playwright";
import fs from "node:fs";

const OUT_DIR = "/mnt/documents";
fs.mkdirSync(OUT_DIR, { recursive: true });

const BASE = process.env.PREVIEW_URL || "http://localhost:8080";
const BREAKPOINTS = [
  { name: "mobile", width: 390, height: 900 },
  { name: "tablet", width: 820, height: 1100 },
  { name: "desktop", width: 1280, height: 900 },
];
const ZOOMS = [
  { name: "100%", dsf: 1 },
  { name: "80%", dsf: 0.8 },
];

const rows = [];
const browser = await chromium.launch();
for (const bp of BREAKPOINTS) {
  for (const z of ZOOMS) {
    const context = await browser.newContext({
      viewport: { width: bp.width, height: bp.height },
      deviceScaleFactor: z.dsf,
    });
    const page = await context.newPage();
    await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded" });
    await page.locator("#programmes").scrollIntoViewIfNeeded();
    await page.waitForFunction(() => {
      const imgs = document.querySelectorAll("#programmes [data-programme-cover] img");
      return imgs.length > 0 && [...imgs].every((i) => i.complete);
    });
    const data = await page.$$eval("#programmes [data-programme-cover]", (nodes) =>
      nodes
        .map((node) => {
          const rect = node.getBoundingClientRect();
          if (rect.width === 0 || rect.height === 0) return null;
          const img = node.querySelector("img");
          const alt = img?.getAttribute("alt") ?? "";
          return {
            slug: alt.replace(/ job-role track cover$/, ""),
            cssW: Math.round(rect.width),
            cssH: Math.round(rect.height),
            ratio: +(rect.width / rect.height).toFixed(3),
            currentSrc: img?.currentSrc ?? "",
            naturalW: img?.naturalWidth ?? 0,
            naturalH: img?.naturalHeight ?? 0,
          };
        })
        .filter(Boolean),
    );
    for (const d of data) {
      const variant = /-(\d+)w\.webp/.exec(d.currentSrc)?.[1] ?? "800";
      rows.push({ breakpoint: bp.name, zoom: z.name, ...d, variant: `${variant}w` });
    }
    await context.close();
  }
}
await browser.close();

const csvHeader = "breakpoint,zoom,slug,cssW,cssH,ratio,variant,naturalW,naturalH,currentSrc";
const csv = [
  csvHeader,
  ...rows.map((r) =>
    [
      r.breakpoint,
      r.zoom,
      `"${r.slug}"`,
      r.cssW,
      r.cssH,
      r.ratio,
      r.variant,
      r.naturalW,
      r.naturalH,
      `"${r.currentSrc}"`,
    ].join(","),
  ),
].join("\n");
fs.writeFileSync(`${OUT_DIR}/programme-image-audit.csv`, csv);

const bySlot = new Map();
for (const r of rows) {
  const k = `${r.breakpoint} · ${r.zoom}`;
  if (!bySlot.has(k)) bySlot.set(k, []);
  bySlot.get(k).push(r);
}
const md = [];
md.push("# Programme cover audit\n");
md.push(`Base URL: \`${BASE}\` · captured ${new Date().toISOString()}\n`);
for (const [slot, list] of bySlot) {
  const w = list[0].cssW,
    h = list[0].cssH;
  const uniform = list.every((r) => r.cssW === w && r.cssH === h);
  md.push(`\n## ${slot} — ${list.length} cards`);
  md.push(
    `- Rendered box: **${w} × ${h}px** (${(w / h).toFixed(3)}:1) — uniform across cards: **${uniform ? "YES" : "NO"}**`,
  );
  md.push(`- Variants served: ${[...new Set(list.map((r) => r.variant))].sort().join(", ")}`);
  md.push("");
  md.push("| slug | cssW | cssH | variant | natural |");
  md.push("| --- | ---: | ---: | --- | --- |");
  for (const r of list)
    md.push(`| ${r.slug} | ${r.cssW} | ${r.cssH} | ${r.variant} | ${r.naturalW}×${r.naturalH} |`);
}
fs.writeFileSync(`${OUT_DIR}/programme-image-audit.md`, md.join("\n"));
console.log(`Wrote ${OUT_DIR}/programme-image-audit.csv and .md (${rows.length} rows).`);
