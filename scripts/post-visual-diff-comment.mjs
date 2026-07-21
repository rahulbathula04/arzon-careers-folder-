#!/usr/bin/env node
/**
 * Post (or update) a sticky PR comment that inlines small thumbnails of
 * every changed visual snapshot from `test-results/`.
 *
 * Strategy: GitHub issue comments don't render data: URIs, so we commit
 * the thumbnails to a dedicated `visual-diffs-snapshots` branch under
 * `pr-<num>/<sha>/<name>.png` and reference them via raw.githubusercontent
 * URLs. The branch is throwaway — old PR folders can be pruned freely.
 *
 * Env in: GITHUB_TOKEN, GITHUB_REPOSITORY, PR_NUMBER, COMMIT_SHA, RUN_ID.
 * Optional: THUMB_WIDTH (default 280).
 */
import fs from "node:fs";
import path from "node:path";
import { Buffer } from "node:buffer";
import sharp from "sharp";

const {
  GITHUB_TOKEN,
  GITHUB_REPOSITORY,
  PR_NUMBER,
  COMMIT_SHA,
  RUN_ID,
  THUMB_WIDTH = "280",
} = process.env;

if (!GITHUB_TOKEN || !GITHUB_REPOSITORY || !PR_NUMBER) {
  console.error("Missing GITHUB_TOKEN / GITHUB_REPOSITORY / PR_NUMBER");
  process.exit(0);
}

const [OWNER, REPO] = GITHUB_REPOSITORY.split("/");
const BRANCH = "visual-diffs-snapshots";
const DIR = `pr-${PR_NUMBER}/${(COMMIT_SHA ?? "head").slice(0, 7)}`;
const ROOT = "test-results";
const WIDTH = Number(THUMB_WIDTH);

/** Walk test-results/ collecting {name, expected, actual, diff} triples. */
function collectDiffs() {
  const triples = new Map();
  const walk = (dir) => {
    if (!fs.existsSync(dir)) return;
    for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, f.name);
      if (f.isDirectory()) {
        walk(p);
        continue;
      }
      const m = f.name.match(/^(.+?)-(expected|actual|diff)\.png$/);
      if (!m) continue;
      const key = m[1];
      const slot = m[2];
      const entry = triples.get(key) ?? { key, dir, expected: null, actual: null, diff: null };
      entry[slot] = p;
      triples.set(key, entry);
    }
  };
  walk(ROOT);
  return [...triples.values()].filter((t) => t.diff);
}

async function gh(method, url, body) {
  const res = await fetch(`https://api.github.com${url}`, {
    method,
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (res.status === 404) return null;
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`${method} ${url} → ${res.status} ${txt}`);
  }
  return res.json();
}

async function ensureBranch() {
  const existing = await gh("GET", `/repos/${OWNER}/${REPO}/branches/${BRANCH}`);
  if (existing) return;
  // Create an orphan-style branch off the default branch's first commit.
  const repo = await gh("GET", `/repos/${OWNER}/${REPO}`);
  const def = await gh("GET", `/repos/${OWNER}/${REPO}/git/ref/heads/${repo.default_branch}`);
  await gh("POST", `/repos/${OWNER}/${REPO}/git/refs`, {
    ref: `refs/heads/${BRANCH}`,
    sha: def.object.sha,
  });
}

async function uploadFile(remotePath, buffer) {
  const existing = await gh("GET", `/repos/${OWNER}/${REPO}/contents/${remotePath}?ref=${BRANCH}`);
  await gh("PUT", `/repos/${OWNER}/${REPO}/contents/${remotePath}`, {
    message: `visual-diffs: ${remotePath}`,
    branch: BRANCH,
    content: buffer.toString("base64"),
    sha: existing?.sha,
  });
  return `https://raw.githubusercontent.com/${OWNER}/${REPO}/${BRANCH}/${remotePath}`;
}

async function thumbnail(srcPath) {
  return sharp(srcPath).resize({ width: WIDTH, withoutEnlargement: true }).png().toBuffer();
}

async function findStickyComment() {
  const comments = await gh(
    "GET",
    `/repos/${OWNER}/${REPO}/issues/${PR_NUMBER}/comments?per_page=100`,
  );
  return comments?.find((c) => c.body?.includes(STICKY_MARKER)) ?? null;
}

const STICKY_MARKER = "<!-- visual-diffs-sticky -->";

async function main() {
  const diffs = collectDiffs();
  if (!diffs.length) {
    console.log("No diffs found.");
    return;
  }

  await ensureBranch();

  const rows = [];
  for (const t of diffs) {
    const safe = t.key.replace(/[^a-z0-9._-]/gi, "_");
    const urls = {};
    for (const slot of ["expected", "actual", "diff"]) {
      if (!t[slot]) continue;
      const thumb = await thumbnail(t[slot]);
      urls[slot] = await uploadFile(`${DIR}/${safe}-${slot}.png`, thumb);
    }
    rows.push({ name: t.key, urls });
  }

  const tbl = [
    "| Snapshot | Expected | Actual | Diff |",
    "| --- | --- | --- | --- |",
    ...rows.map((r) => {
      const img = (u) => (u ? `<img src="${u}" width="${WIDTH}" />` : "—");
      return `| \`${r.name}\` | ${img(r.urls.expected)} | ${img(r.urls.actual)} | ${img(r.urls.diff)} |`;
    }),
  ].join("\n");

  const body = [
    STICKY_MARKER,
    "### Result-cards visual diff",
    "",
    `${rows.length} snapshot(s) changed on commit \`${(COMMIT_SHA ?? "").slice(0, 7)}\`.`,
    "",
    tbl,
    "",
    `Full HTML report and raw PNGs: download the \`playwright-report-result-cards\` / \`result-cards-pixel-diffs\` artifacts from [run #${RUN_ID}](../actions/runs/${RUN_ID}).`,
    "",
    "Run only the cards that changed:",
    "```bash",
    `SNAPSHOT_CARDS=${[...new Set(rows.map((r) => r.name.split("-")[0]))].join(",")} \\`,
    "  bunx playwright test result-cards-visual",
    "```",
    "",
    "Accept new pixels intentionally:",
    "```bash",
    "bunx playwright test result-cards-visual --update-snapshots",
    "```",
  ].join("\n");

  const existing = await findStickyComment();
  if (existing) {
    await gh("PATCH", `/repos/${OWNER}/${REPO}/issues/comments/${existing.id}`, { body });
  } else {
    await gh("POST", `/repos/${OWNER}/${REPO}/issues/${PR_NUMBER}/comments`, { body });
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
