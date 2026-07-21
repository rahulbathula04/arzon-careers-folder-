#!/usr/bin/env node
// Upsert a typography offenders summary as a PR comment.
//
// Inputs (env):
//   GITHUB_TOKEN     repo-scoped token (Actions provides automatically)
//   GITHUB_REPOSITORY  owner/repo
//   PR_NUMBER        PR number to comment on
//   RUN_URL          link to the CI run (for the artifact deep link)
//
// Reads docs/typography-offenders.json + docs/typography-diff.json
// (if present). Comment is identified by a hidden HTML marker so we
// update in place instead of stacking duplicates.

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const MARKER = "<!-- typography-offenders-bot -->";

const token = process.env.GITHUB_TOKEN;
const repo = process.env.GITHUB_REPOSITORY;
const prNum = process.env.PR_NUMBER;
const runUrl = process.env.RUN_URL || "";

if (!token || !repo || !prNum) {
  console.log(
    "post-typography-pr-comment: missing GITHUB_TOKEN / GITHUB_REPOSITORY / PR_NUMBER — skipping.",
  );
  process.exit(0);
}

function readJsonMaybe(rel) {
  const p = join(ROOT, rel);
  if (!existsSync(p)) return null;
  try {
    return JSON.parse(readFileSync(p, "utf8"));
  } catch {
    return null;
  }
}

const offenders = readJsonMaybe("docs/typography-offenders.json");
const diff = readJsonMaybe("docs/typography-diff.json");

const totalCount = offenders?.total ?? offenders?.offenders?.length ?? 0;
const newCount = diff?.newViolations?.length ?? 0;
const carriedCount = diff?.carriedViolations?.length ?? 0;

function topFiles(rows, n = 10) {
  const m = new Map();
  for (const r of rows ?? []) m.set(r.file, (m.get(r.file) ?? 0) + 1);
  return [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, n);
}

const lines = [];
lines.push(MARKER);
lines.push("### 🔤 Typography offenders");
lines.push("");
if (newCount > 0) {
  lines.push(
    `❌ **${newCount}** new ad-hoc typography class(es) introduced in this PR — fix before merge.`,
  );
} else {
  lines.push("✅ No new ad-hoc typography classes introduced in this PR.");
}
lines.push("");
lines.push(`- Project total: **${totalCount}** offenders`);
lines.push(`- Pre-existing (allowed): ${carriedCount}`);
if (runUrl) lines.push(`- 📎 Full report: [download \`typography-offenders\` artifact](${runUrl})`);
lines.push("");

if (newCount > 0) {
  lines.push("<details><summary>New violations in this PR</summary>");
  lines.push("");
  lines.push("| File | Line | Current | Suggested |");
  lines.push("| --- | ---: | --- | --- |");
  for (const v of diff.newViolations.slice(0, 30)) {
    lines.push(`| \`${v.file}\` | ${v.line} | \`${v.current}\` | \`${v.suggested}\` |`);
  }
  if (diff.newViolations.length > 30)
    lines.push(`| … ${diff.newViolations.length - 30} more | | | |`);
  lines.push("");
  lines.push("</details>");
  lines.push("");
}

const top = topFiles(offenders?.offenders);
if (top.length) {
  lines.push("<details><summary>Top offender files (project-wide)</summary>");
  lines.push("");
  lines.push("| File | Offenders |");
  lines.push("| --- | ---: |");
  for (const [file, n] of top) lines.push(`| \`${file}\` | ${n} |`);
  lines.push("");
  lines.push("</details>");
  lines.push("");
}

lines.push(
  "_Run `bun run codemod:typography` locally to apply safe auto-fixes, or replace manually with semantic utilities from `src/styles.css`._",
);

const body = lines.join("\n");

const api = (path) => `https://api.github.com/repos/${repo}${path}`;
const headers = {
  Authorization: `Bearer ${token}`,
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
};

async function main() {
  const listRes = await fetch(api(`/issues/${prNum}/comments?per_page=100`), { headers });
  if (!listRes.ok) {
    console.error(`failed to list comments: ${listRes.status}`);
    process.exit(0); // do not fail the CI gate on PR-comment infra issues
  }
  const comments = await listRes.json();
  const existing = comments.find((c) => typeof c.body === "string" && c.body.includes(MARKER));

  const target = existing
    ? { method: "PATCH", url: api(`/issues/comments/${existing.id}`) }
    : { method: "POST", url: api(`/issues/${prNum}/comments`) };

  const res = await fetch(target.url, {
    method: target.method,
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify({ body }),
  });

  if (!res.ok) {
    console.error(`comment upsert failed: ${res.status} ${await res.text()}`);
    process.exit(0);
  }
  console.log(existing ? "updated existing PR comment" : "posted new PR comment");
}

main();
