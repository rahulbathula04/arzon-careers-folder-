#!/usr/bin/env node
/**
 * Dark-island lint.
 *
 * The home page and most marketing routes render on the light "paper"
 * palette (--ink dark text on light bg). Any element that opts into a
 * dark surface (Tailwind arbitrary `bg-[#0...]`, `bg-black`, or a
 * `bg-slate-9../zinc-9../neutral-9..` class) must also carry one of the
 * approved tone markers so the global `text-white` carveout in
 * src/styles.css does not neutralize its foreground text.
 *
 * Approved markers (any one on the same element OR an ancestor in the
 * same file is fine, but for lint speed we only check the same element):
 *   - `tone-dark`
 *   - `surface-island-dark`
 *
 * Allowlisted contexts (skipped):
 *   - `bg-[#0` chips/pills inside an already-tone-dark/island parent
 *   - admin routes (intentionally dark UI)
 *   - hover:bg-..., dark:bg-..., group-hover:bg-... variants
 */
import { promises as fs } from "node:fs";
import path from "node:path";

const ROOTS = ["src/components", "src/routes"];
const EXTS = new Set([".tsx", ".jsx"]);
const SKIP_DIRS = new Set(["node_modules", "dist", ".tanstack", ".vite", "build"]);
const SKIP_ROUTE_PREFIXES = ["admin.", "_authenticated", "r."];

// Match a class attribute and the dark-bg token inside it.
// We only flag tokens at the *start* of a class word (preceded by start or
// whitespace) so hover:bg-[#0..] etc are skipped.
const CLASS_ATTR_RE = /class(?:Name)?\s*=\s*["'`]([^"'`]*)["'`]/g;
const DARK_BG_RE =
  /(?:^|\s)(bg-\[#0[0-9a-fA-F]{2,7}(?:\/\d+)?\]|bg-black(?:\/\d+)?|bg-(?:slate|zinc|neutral|gray|stone)-(?:9\d{2})(?:\/\d+)?)/;
const TONE_RE = /(?:^|\s)(tone-dark|surface-island-dark)(?:\s|$)/;

async function* walk(dir) {
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const e of entries) {
    if (SKIP_DIRS.has(e.name)) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      yield* walk(full);
    } else if (EXTS.has(path.extname(e.name))) {
      yield full;
    }
  }
}

function isSkippedRoute(file) {
  const rel = file.replaceAll("\\", "/");
  if (!rel.includes("/src/routes/")) return false;
  const base = path.basename(rel);
  return SKIP_ROUTE_PREFIXES.some((p) => base.startsWith(p));
}

const offenders = [];

for (const root of ROOTS) {
  for await (const file of walk(root)) {
    if (isSkippedRoute(file)) continue;
    const src = await fs.readFile(file, "utf8");
    let m;
    CLASS_ATTR_RE.lastIndex = 0;
    while ((m = CLASS_ATTR_RE.exec(src)) !== null) {
      const cls = m[1];
      const dark = DARK_BG_RE.exec(cls);
      if (!dark) continue;
      if (TONE_RE.test(cls)) continue;
      // Find line number of the match start
      const idx = m.index;
      const line = src.slice(0, idx).split("\n").length;
      offenders.push({ file, line, snippet: cls.trim().slice(0, 110), token: dark[1] });
    }
  }
}

if (offenders.length > 0) {
  console.error(
    "\n✗ Dark-island lint: dark surfaces missing `tone-dark` / `surface-island-dark`:\n",
  );
  for (const o of offenders) {
    console.error(`  ${o.file}:${o.line}`);
    console.error(`    token: ${o.token}`);
    console.error(`    class: ${o.snippet}\n`);
  }
  console.error(
    `Found ${offenders.length} offender(s). Add \`tone-dark\` to the same element, or wrap with a \`.surface-island-dark\` parent.\n`,
  );
  process.exit(1);
}

console.log(`✓ Dark-island lint: clean (${ROOTS.join(", ")})`);
