#!/usr/bin/env node
/**
 * Upsert a token-audit summary as a PR comment.
 *
 * Reads docs/reports/token-audit.json (produced by audit-tokens.mjs) and
 * renders a sticky comment with clickable file:line permalinks so the
 * remaining raw hex/rgb/hsl literals can be driven down mechanically.
 *
 * Env:
 *   GITHUB_TOKEN       repo-scoped (Actions provides)
 *   GITHUB_REPOSITORY  owner/repo
 *   PR_NUMBER          PR number
 *   PR_HEAD_SHA        head sha for permalinks
 *   RUN_URL            optional CI run link
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const MARKER = "<!-- token-audit-report -->";

const token = process.env.GITHUB_TOKEN;
const repo = process.env.GITHUB_REPOSITORY;
const prNum = process.env.PR_NUMBER;
const sha = process.env.PR_HEAD_SHA || "HEAD";
const runUrl = process.env.RUN_URL || "";

if (!token || !repo || !prNum) {
  console.log(
    "post-token-audit-comment: missing GITHUB_TOKEN / GITHUB_REPOSITORY / PR_NUMBER — skipping.",
  );
  process.exit(0);
}

const jsonPath = join(ROOT, "docs/reports/token-audit.json");
if (!existsSync(jsonPath)) {
  console.log(
    "post-token-audit-comment: no token-audit.json — run `bun run audit:tokens:json` first.",
  );
  process.exit(0);
}
const report = JSON.parse(readFileSync(jsonPath, "utf8"));
const findings = report.findings ?? [];

const byFile = new Map();
for (const f of findings) {
  if (!byFile.has(f.file)) byFile.set(f.file, []);
  byFile.get(f.file).push(f);
}
const sorted = [...byFile.entries()].sort((a, b) => b[1].length - a[1].length);

const lines = [];
lines.push(MARKER);
lines.push("### 🎨 Token audit");
lines.push("");
if (!findings.length) {
  lines.push("✅ No raw palette literals detected in `src/**`.");
} else {
  lines.push(
    `Found **${findings.length}** raw palette literal(s) across **${byFile.size}** file(s).`,
  );
  lines.push("");
  lines.push(
    "Replace with a semantic token from `src/styles.css` or `@/data/trackTheme`. When a raw value is unavoidable, add `/* @allow-raw-palette <reason> */` on the same line.",
  );
  lines.push("");
  const MAX_FILES = 25;
  const MAX_ROWS_PER_FILE = 20;
  for (const [file, rows] of sorted.slice(0, MAX_FILES)) {
    lines.push(`<details><summary><code>${file}</code> — ${rows.length}</summary>`);
    lines.push("");
    lines.push("| Line | Kind | Value | Context |");
    lines.push("|---:|---|---|---|");
    for (const r of rows.slice(0, MAX_ROWS_PER_FILE)) {
      const url = `https://github.com/${repo}/blob/${sha}/${file}#L${r.line}`;
      const ctx = r.snippet.replace(/\|/g, "\\|").slice(0, 120);
      lines.push(`| [\`${r.line}\`](${url}) | ${r.kind} | \`${r.value}\` | \`${ctx}\` |`);
    }
    if (rows.length > MAX_ROWS_PER_FILE)
      lines.push(`| … | | | _${rows.length - MAX_ROWS_PER_FILE} more_ |`);
    lines.push("");
    lines.push("</details>");
    lines.push("");
  }
  if (sorted.length > MAX_FILES)
    lines.push(
      `_… ${sorted.length - MAX_FILES} more file(s) not shown — see the full report artifact._`,
    );
}
if (runUrl) lines.push(`\n<sub>Run: ${runUrl}</sub>`);

const body = lines.join("\n");
const api = `https://api.github.com/repos/${repo}`;
const headers = {
  Authorization: `Bearer ${token}`,
  Accept: "application/vnd.github+json",
  "User-Agent": "arzon-token-audit-bot",
};

const list = await fetch(`${api}/issues/${prNum}/comments?per_page=100`, { headers }).then((r) =>
  r.json(),
);
const existing = Array.isArray(list)
  ? list.find((c) => typeof c.body === "string" && c.body.includes(MARKER))
  : null;

const res = existing
  ? await fetch(`${api}/issues/comments/${existing.id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ body }),
    })
  : await fetch(`${api}/issues/${prNum}/comments`, {
      method: "POST",
      headers,
      body: JSON.stringify({ body }),
    });

if (!res.ok) {
  console.error(`post-token-audit-comment: GitHub API ${res.status} ${res.statusText}`);
  console.error(await res.text());
  process.exit(1);
}
console.log(
  `post-token-audit-comment: ${existing ? "updated" : "created"} comment on PR #${prNum}`,
);
