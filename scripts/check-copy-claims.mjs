#!/usr/bin/env node
/**
 * De-AI copy lint.
 * Flags fabricated-looking numbers, vague superlatives, placeholder names
 * and "example" details across user-facing source. Advisory by default
 * (exits 0). Pass --strict to fail on warnings (use in publish gate once
 * baseline is clean).
 *
 * Scope: src/components/landing, src/components/credibility,
 * src/components/courses, src/routes (excluding admin.* and api).
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const SRC = join(ROOT, "src");
const STRICT = process.argv.includes("--strict");

const SCAN_DIRS = [
  "src/components/landing",
  "src/components/credibility",
  "src/components/courses",
  "src/components/career",
  "src/components/recruiters",
  "src/routes",
];

const SKIP = [/\/admin\./, /\/api\//, /\.test\./, /__tests__/, /routeTree\.gen\.ts$/];

const RULES = [
  {
    id: "superlative",
    label: "Vague superlative",
    re: /\b(world[- ]?class|best[- ]?in[- ]?class|cutting[- ]?edge|revolutionary|industry[- ]?leading|game[- ]?changing|seamless|next[- ]?gen|unparalleled|unmatched)\b/gi,
  },
  {
    id: "guarantee",
    label: "Unverifiable guarantee",
    re: /\b(100%\s*(placement|guaranteed|job|success|hire[ds]?|conversion)|guaranteed\s+(placement|job|salary|hire[ds]?|offer)|assured\s+(placement|job|hire[ds]?|offer)|no[- ]risk\s+(placement|job)|zero[- ]risk\s+(placement|job))\b/gi,
  },
  {
    id: "absolute-outcome",
    label: "Absolute outcome promise (must be cohort-scoped)",
    // Fires on phrases that promise every learner / all students an outcome
    // without a cohort qualifier. Whitelist by prefixing with 'last cohort',
    // 'previous cohort', 'this cohort', 'in cohort N', etc., or adding
    // `copy-claims-ok` on the same line for legitimate exceptions.
    re: /\b(every\s+(student|learner|graduate|intern)|all\s+(students|learners|graduates|interns))\s+(get|gets|receive|receives|land|lands|are\s+(placed|hired)|will\s+(be\s+)?(placed|hired|earn))\b/gi,
  },
  {
    id: "fab-precision",
    label: "Suspicious precision (decimal % in copy)",
    re: /\b\d{1,3}\.\d{1,2}%/g,
  },
  {
    id: "fab-big-count",
    label: "Large precise count - confirm or band",
    re: /\b\d{1,3},\d{3}\+?\s*(JDs|jobs|alumni|hires|students|placements|reviews)\b/gi,
  },
  {
    id: "placeholder-name",
    label: "Placeholder / generic alumni name",
    re: /\b(John|Jane)\s+(Doe|Smith)\b|\bLorem\s+ipsum\b|\bExample\s+(Name|User|Student|Alumni)\b|\bAlumnus\s+\d+\b|\bStudent\s+[A-Z]\b/g,
  },
  {
    id: "placeholder-marker",
    label: "Placeholder marker in copy",
    re: /\b(TBD|TBA|TODO|FIXME|XXX|PLACEHOLDER|REPLACE\s+ME|coming\s+soon\b(?!\s*[-:.]))/g,
  },
  {
    id: "example-prefix",
    label: "'e.g. Example…' style filler",
    re: /\be\.g\.,?\s+(example|sample|placeholder)/gi,
  },
];

function walk(dir, out = []) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const name of entries) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (/\.(tsx?|mdx?)$/.test(name)) out.push(p);
  }
  return out;
}

const files = SCAN_DIRS.flatMap((d) => walk(join(ROOT, d)));
const findings = [];

for (const file of files) {
  const rel = relative(ROOT, file);
  if (SKIP.some((s) => s.test(rel))) continue;
  const src = readFileSync(file, "utf8");
  const lines = src.split(/\r?\n/);
  lines.forEach((line, i) => {
    const trimmed = line.trim();
    if (trimmed.startsWith("//") || trimmed.startsWith("import ") || trimmed.startsWith("*"))
      return;
    if (line.includes("copy-claims-ok")) return;
    for (const rule of RULES) {
      rule.re.lastIndex = 0;
      let m;
      while ((m = rule.re.exec(line))) {
        findings.push({
          file: rel,
          line: i + 1,
          rule: rule.id,
          label: rule.label,
          match: m[0],
          snippet: trimmed.slice(0, 160),
        });
      }
    }
  });
}

if (!findings.length) {
  console.log(`copy-claims: 0 findings across ${files.length} files ✓`);
  process.exit(0);
}

const byRule = findings.reduce((a, f) => ((a[f.rule] = (a[f.rule] ?? 0) + 1), a), {});
console.log(`copy-claims: ${findings.length} findings across ${files.length} files`);
for (const [r, n] of Object.entries(byRule)) console.log(`  · ${r}: ${n}`);
console.log("");
for (const f of findings.slice(0, 80)) {
  console.log(`  ${f.file}:${f.line}  [${f.rule}] "${f.match}"`);
  console.log(`    → ${f.snippet}`);
}
if (findings.length > 80) console.log(`  ...and ${findings.length - 80} more`);

process.exit(STRICT ? 1 : 0);
