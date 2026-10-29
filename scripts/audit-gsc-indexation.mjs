#!/usr/bin/env node
/**
 * Audit Google Search Console "Discovered - currently not indexed" and
 * "Crawled - currently not indexed" URL exports against the live site.
 *
 * Usage:
 *   node scripts/audit-gsc-indexation.mjs path/to/gsc-export.csv [output.csv]
 *
 * Accepts a Search Console CSV with a URL/Page column (or one URL per row).
 * This is a diagnostic report, not an automatic request for indexing.
 */
import { readFileSync, writeFileSync } from "node:fs";

const input = process.argv[2];
const output = process.argv[3] || "gsc-indexation-audit.csv";
if (!input) {
  console.error("Usage: node scripts/audit-gsc-indexation.mjs <gsc-export.csv> [output.csv]");
  process.exit(2);
}

const csvRows = (text) => {
  const rows = [];
  let row = [], field = "", quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (ch === '"') quoted = false;
      else field += ch;
    } else if (ch === '"' && field.length === 0) quoted = true;
    else if (ch === ",") { row.push(field); field = ""; }
    else if (ch === "\n") { row.push(field.replace(/\r$/, "")); rows.push(row); row = []; field = ""; }
    else field += ch;
  }
  if (field.length || row.length) { row.push(field.replace(/\r$/, "")); rows.push(row); }
  return rows.filter((r) => r.some((v) => v.trim()));
};
const quote = (v) => '"' + String(v ?? "").replace(/"/g, '""') + '"';
const source = readFileSync(input, "utf8").replace(/^\uFEFF/, "");
const rows = csvRows(source);
if (!rows.length) throw new Error("The input CSV is empty.");
const header = rows[0].map((v) => v.trim().toLowerCase());
const urlIndex = header.findIndex((v) => /^(url|page|top urls|address)$/.test(v));
const candidates = (urlIndex >= 0 ? rows.slice(1).map((r) => r[urlIndex]) : rows.flat())
  .map((v) => (v || "").trim())
  .filter((v) => /^https?:\/\//i.test(v));
const urls = [...new Set(candidates)];
if (!urls.length) throw new Error("No http(s) URLs found. Export the GSC table with its Page/URL column.");

const origin = "https://arzoncareers.in";
let sitemapUrls = new Set();
try {
  const res = await fetch(origin + "/sitemap.xml", { signal: AbortSignal.timeout(15000) });
  const xml = await res.text();
  sitemapUrls = new Set([...xml.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/gi)].map((m) => m[1].trim()));
} catch (e) {
  console.warn("Warning: could not read sitemap:", e.message);
}

const results = [];
let cursor = 0;
const worker = async () => {
  while (cursor < urls.length) {
    const url = urls[cursor++];
    const result = {
      submitted_url: url, http_status: "", final_url: "", canonical_url: "",
      robots_meta: "", x_robots_tag: "", title: "", meta_description: "",
      word_count: 0, internal_links: 0, in_sitemap: sitemapUrls.has(url),
      diagnosis: "", detail: "",
    };
    try {
      const response = await fetch(url, {
        redirect: "follow",
        headers: { "user-agent": "Arzon-GSC-Indexation-Audit/1.0 (+https://arzoncareers.in)" },
        signal: AbortSignal.timeout(20000),
      });
      result.http_status = response.status;
      result.final_url = response.url;
      result.x_robots_tag = response.headers.get("x-robots-tag") || "";
      const type = response.headers.get("content-type") || "";
      if (!type.includes("text/html")) {
        result.diagnosis = response.status >= 400 ? "HTTP_ERROR" : "NON_HTML_RESPONSE";
        result.detail = type || "No content-type";
        results.push(result); continue;
      }
      const html = await response.text();
      const getMeta = (name) => {
        const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const re = new RegExp(
          "<meta\\b(?=[^>]*(?:name|property)\\s*=\\s*[\"']" + escaped + "[\"'])[^>]*>",
          "i",
        );
        const tag = html.match(re)?.[0] || "";
        return tag.match(/content\s*=\s*["']([^"']*)["']/i)?.[1] || "";
      };
      result.canonical_url = html.match(/<link\b[^>]*rel=["'][^"']*canonical[^"']*["'][^>]*href=["']([^"']+)["']/i)?.[1]
        || html.match(/<link\b[^>]*href=["']([^"']+)["'][^>]*rel=["'][^"']*canonical[^"']*["']/i)?.[1] || "";
      result.robots_meta = getMeta("robots");
      result.title = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
      result.meta_description = getMeta("description").replace(/\s+/g, " ").trim();
      const body = html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1] || html;
      const visibleText = body.replace(/<script\b[\s\S]*?<\/script>/gi, " ").replace(/<style\b[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/&nbsp;|&#160;/gi, " ").replace(/&amp;/gi, "&").replace(/\s+/g, " ").trim();
      result.word_count = visibleText ? visibleText.split(" ").length : 0;
      result.internal_links = [...body.matchAll(/<a\b[^>]*href=["']([^"'#]+)["']/gi)].filter((m) => {
        try { return new URL(m[1], response.url).hostname === new URL(origin).hostname; } catch { return false; }
      }).length;

      const robots = (result.robots_meta + " " + result.x_robots_tag).toLowerCase();
      if (response.status >= 400) { result.diagnosis = "HTTP_ERROR"; result.detail = "Response returned an error status."; }
      else if (/noindex/.test(robots)) { result.diagnosis = "NOINDEX"; result.detail = "Remove noindex only if this page is intended to appear in search."; }
      else if (result.canonical_url && new URL(result.canonical_url, response.url).href.replace(/\/$/, "") !== response.url.replace(/\/$/, "")) {
        result.diagnosis = "CANONICAL_MISMATCH"; result.detail = "Page canonical points to a different URL; confirm that consolidation is intentional.";
      } else if (response.url !== url) { result.diagnosis = "REDIRECT"; result.detail = "Update internal links and sitemap to the final canonical URL."; }
      else if (!result.in_sitemap) { result.diagnosis = "NOT_IN_SITEMAP"; result.detail = "If this is an important canonical page, add it to the sitemap and internal links."; }
      else if (result.word_count < 180) { result.diagnosis = "THIN_RENDERED_CONTENT"; result.detail = "Review usefulness and server-rendered main content; word count is only a heuristic."; }
      else if (!result.title || !result.meta_description) { result.diagnosis = "MISSING_METADATA"; result.detail = "Add a unique, accurate title and meta description."; }
      else if (result.internal_links < 2) { result.diagnosis = "WEAK_INTERNAL_LINKING"; result.detail = "Add contextual links from relevant hubs and related pages."; }
      else { result.diagnosis = "TECHNICAL_SIGNALS_LOOK_OK"; result.detail = "Indexing is not guaranteed; assess uniqueness, search intent, evidence, and demand."; }
    } catch (e) {
      result.diagnosis = "FETCH_FAILED";
      result.detail = String(e?.message || e);
    }
    results.push(result);
  }
};
await Promise.all(Array.from({ length: Math.min(4, urls.length) }, worker));
const columns = ["submitted_url","http_status","final_url","canonical_url","robots_meta","x_robots_tag","title","meta_description","word_count","internal_links","in_sitemap","diagnosis","detail"];
writeFileSync(output, [columns.join(","), ...results.map((r) => columns.map((c) => quote(r[c])).join(","))].join("\n") + "\n");
const counts = results.reduce((acc, r) => (acc[r.diagnosis] = (acc[r.diagnosis] || 0) + 1, acc), {});
console.log(`Audited ${results.length} unique URLs. Report: ${output}`);
for (const [diagnosis, count] of Object.entries(counts).sort((a, b) => b[1] - a[1])) console.log(`  ${diagnosis}: ${count}`);
