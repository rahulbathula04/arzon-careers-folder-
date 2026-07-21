// Shared typography token maps + offender detection.
// Consumed by report-typography-offenders.mjs, codemod-typography.mjs,
// and check-typography-diff.mjs so all three speak the same vocabulary.

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

export const ALLOWED_TOKENS = [
  "text-display",
  "text-h1",
  "text-h2",
  "text-h3",
  "text-h4",
  "text-body-lg",
  "text-body",
  "text-body-sm",
  "text-caption",
  "text-overline",
  "text-meta",
  "text-micro",
];

// Bracket-pixel/rem → semantic token.
export const PX_MAP = new Map([
  ["10px", "text-micro"],
  ["11px", "text-micro"],
  ["12px", "text-meta"],
  ["0.75rem", "text-meta"],
  ["13px", "text-caption"],
  ["14px", "text-body-sm"],
  ["15px", "text-body-sm"],
  ["0.875rem", "text-body-sm"],
  ["16px", "text-body"],
  ["1rem", "text-body"],
  ["17px", "text-body-lg"],
  ["18px", "text-body-lg"],
  ["19px", "text-body-lg"],
  ["1.125rem", "text-body-lg"],
  ["20px", "text-h4"],
  ["1.25rem", "text-h4"],
  ["24px", "text-h3"],
  ["1.5rem", "text-h3"],
  ["30px", "text-h2"],
  ["1.875rem", "text-h2"],
  ["36px", "text-h1"],
  ["2.25rem", "text-h1"],
  ["48px", "text-display"],
  ["3rem", "text-display"],
  ["60px", "text-display"],
  ["72px", "text-display"],
]);

// Tailwind named size → semantic token.
export const NAMED_MAP = new Map([
  ["text-xl", "text-h4"],
  ["text-2xl", "text-h3"],
  ["text-3xl", "text-h2"],
  ["text-4xl", "text-h1"],
  ["text-5xl", "text-display"],
  ["text-6xl", "text-display"],
  ["text-7xl", "text-display"],
  ["text-8xl", "text-display"],
  ["text-9xl", "text-display"],
]);

// Px snap table for closest-token fallback (sorted ascending).
const PX_LADDER = [
  { px: 10, token: "text-micro" },
  { px: 12, token: "text-meta" },
  { px: 13, token: "text-caption" },
  { px: 14, token: "text-body-sm" },
  { px: 16, token: "text-body" },
  { px: 18, token: "text-body-lg" },
  { px: 20, token: "text-h4" },
  { px: 24, token: "text-h3" },
  { px: 30, token: "text-h2" },
  { px: 36, token: "text-h1" },
  { px: 48, token: "text-display" },
];

function toPx(value) {
  const m = /^(\d+(?:\.\d+)?)(px|rem)$/.exec(value);
  if (!m) return null;
  const n = parseFloat(m[1]);
  return m[2] === "rem" ? n * 16 : n;
}

export function suggestForSize(value) {
  const exact = PX_MAP.get(value);
  if (exact) return { token: exact, exact: true };
  const px = toPx(value);
  if (px == null) return { token: "text-body", exact: false, note: "~ closest" };
  let best = PX_LADDER[0];
  let bestDelta = Math.abs(px - best.px);
  for (const rung of PX_LADDER) {
    const d = Math.abs(px - rung.px);
    if (d < bestDelta) {
      best = rung;
      bestDelta = d;
    }
  }
  return { token: best.token, exact: false, note: "~ closest" };
}

// Pattern families. Each regex captures so we can extract values + suggest.
// `group` lets the consumer roll responsive stacks (md:text-[…] lg:text-[…])
// into a single visual group while still listing each variant as a row.
export const PATTERNS = [
  {
    id: "size-bracket",
    label: "raw text-[Npx|rem]",
    re: /\b((?:[a-z-]+:)*)text-\[(\d+(?:\.\d+)?(?:px|rem))\](?:\/\[?[^\]\s]+\]?)?/g,
    suggest: (m) => {
      const s = suggestForSize(m[2]);
      return s.exact ? s.token : `${s.token} ${s.note ?? ""}`.trim();
    },
  },
  {
    id: "size-shorthand",
    label: "text-[Npx]/[L] shorthand (size+leading)",
    re: /\btext-\[(\d+(?:\.\d+)?(?:px|rem))\]\/\[(\d+(?:\.\d+)?(?:px|rem|))\]/g,
    suggest: (m) => {
      const s = suggestForSize(m[1]);
      return s.exact ? s.token : `${s.token} ~ closest`;
    },
  },
  {
    id: "leading-bracket",
    label: "raw leading-[…]",
    re: /\bleading-\[[^\]]+\]/g,
    suggest: () => "drop — semantic text-* utilities ship line-height",
  },
  {
    id: "tracking-bracket",
    label: "raw tracking-[…]",
    re: /\btracking-\[[^\]]+\]/g,
    suggest: () => "use tracking-tight / -normal / -wide or rely on semantic utility",
  },
  {
    id: "font-bracket",
    label: "raw font-[Npx] (arbitrary font-size)",
    re: /\bfont-\[(\d+(?:\.\d+)?(?:px|rem))\]/g,
    suggest: (m) => {
      const s = suggestForSize(m[1]);
      return s.exact ? s.token : `${s.token} ~ closest`;
    },
  },
  {
    id: "named-size",
    label: "ad-hoc text-Nxl",
    re: /\b((?:[a-z-]+:)*)(text-(?:xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl))\b/g,
    suggest: (m) => NAMED_MAP.get(m[2]) ?? "text-body",
  },
];

const SKIP_DIRS = ["src/components/ui", "src/routeTree.gen.ts"];

export function walkSource(root, src = join(root, "src"), acc = []) {
  for (const name of readdirSync(src)) {
    const p = join(src, name);
    const rel = relative(root, p);
    if (SKIP_DIRS.some((s) => rel.startsWith(s))) continue;
    const st = statSync(p);
    if (st.isDirectory()) walkSource(root, p, acc);
    else if (/\.(tsx?|jsx?)$/.test(name)) acc.push(p);
  }
  return acc;
}

function lineOf(text, idx) {
  return text.slice(0, idx).split("\n").length;
}

// Roll a responsive stack into a stable groupId so the markdown
// report and PR comment can collapse them.
function groupIdFor(file, line, match) {
  // Strip responsive prefix so md:text-[20px] and lg:text-[24px] on the
  // same line share an id.
  const base = match.replace(/^([a-z-]+:)+/, "");
  return `${file}:${line}:${base.slice(0, 24)}`;
}

/**
 * Scan a single file. Returns offender rows.
 */
export function scanText(file, text, { root } = {}) {
  const rel = root ? relative(root, file) : file;
  const rows = [];
  for (const { id, re, label, suggest } of PATTERNS) {
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(text))) {
      const line = lineOf(text, m.index);
      rows.push({
        file: rel,
        line,
        current: m[0],
        suggested: suggest(m),
        category: label,
        patternId: id,
        groupId: groupIdFor(rel, line, m[0]),
      });
    }
  }
  return rows;
}

export function scanProject(root) {
  const files = walkSource(root);
  const rows = [];
  for (const file of files) {
    rows.push(...scanText(file, readFileSync(file, "utf8"), { root }));
  }
  rows.sort((a, b) => a.file.localeCompare(b.file) || a.line - b.line);
  return rows;
}
