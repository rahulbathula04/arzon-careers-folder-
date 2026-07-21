#!/usr/bin/env node
/**
 * Accessibility guard: every animation in the codebase MUST be gated by
 * the user's reduced-motion preference (system OR our in-app toggle).
 *
 * What this checks
 *   1. styles.css contains the system + in-app override rules that strip
 *      animation/transition globally.
 *   2. The Skeleton primitive uses `motion-safe:` and carries `data-skeleton`,
 *      and styles.css defines a `data-skeleton` fallback animation under both
 *      `prefers-reduced-motion: reduce` and `html.reduce-motion`.
 *   3. JS-driven motion hooks (`useCounter`, `useTilt`) bail out via
 *      `isReducedMotion()`.
 *   4. No source file uses `setInterval` for visible per-second tickers
 *      without consulting `isReducedMotion()` (allowlisted exceptions live
 *      in TICKER_ALLOWLIST below).
 *   5. No NEW component introduces inline infinite CSS animations
 *      (`animation: ... infinite`) without a `data-skeleton` marker or
 *      the `motion-safe:` Tailwind variant.
 *
 * Run automatically via `prebuild`. Fails the build with a clear message
 * pointing to the offending file/line.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const SRC = join(ROOT, "src");

/**
 * Each finding is structured so the report can group by rule and print
 * file:line:col with a code snippet — same shape as ESLint output.
 */
const RULES = {
  "css/system-mq":
    "styles.css must strip animation+transition under `prefers-reduced-motion: reduce`.",
  "css/in-app-toggle":
    "styles.css must strip animation+transition under `html.reduce-motion` (in-app toggle).",
  "css/skeleton-keyframes":
    "styles.css must define `@keyframes skeleton-fade` for reduced-motion skeletons.",
  "css/skeleton-rule":
    "styles.css must apply `skeleton-fade` to `[data-skeleton]` under reduced motion.",
  "skeleton/data-attr": "Skeleton primitive must mark elements with `data-skeleton`.",
  "skeleton/motion-safe":
    "Skeleton primitive must use `motion-safe:animate-pulse` instead of raw `animate-pulse`.",
  "hook/use-counter": "`useCounter` must short-circuit via `isReducedMotion()`.",
  "hook/use-tilt": "`useTilt` pointer handlers must early-return when `isReducedMotion()` is true.",
  "js/setInterval": "`setInterval` ticker not gated by `isReducedMotion()`.",
  "css/inline-infinite": "Infinite CSS animation defined outside `styles.css`.",
  "jsx/inline-infinite":
    "Inline JSX style sets an infinite animation without a reduced-motion gate.",
  "tw/animate-token": "Raw Tailwind animate-* utility used without the `motion-safe:` variant.",
  "jsx/inline-transition":
    "Inline JSX `style={{ transition: ... }}` bypasses class-based CSS resets — gate or move to CSS.",
  "css/external-transition":
    "`transition:` declared in a CSS file other than `styles.css` without a local reduced-motion override.",
  "js/web-animations":
    "`Element.animate()` / new `Animation()` / `KeyframeEffect` is not affected by CSS `animation: none` — must be gated by `isReducedMotion()`.",
};

const findings = [];

function add({ rule, file, line = null, col = null, snippet = "", hint = "" }) {
  findings.push({ rule, file, line, col, snippet, hint });
}

/** Find 1-based line/column for a regex match index in `src`. */
function locate(src, index) {
  let line = 1,
    last = 0;
  for (let i = 0; i < index; i++) {
    if (src.charCodeAt(i) === 10) {
      line++;
      last = i + 1;
    }
  }
  return { line, col: index - last + 1 };
}

/** All match positions for a global regex (returns array of {index, match}). */
function* matchAll(src, re) {
  if (!re.global) throw new Error("regex must be global");
  let m;
  re.lastIndex = 0;
  while ((m = re.exec(src)) !== null) {
    yield { index: m.index, match: m[0] };
    if (m.index === re.lastIndex) re.lastIndex++;
  }
}

/**
 * Mask non-code regions (comments only) while preserving byte offsets so
 * reported line/col stays accurate.
 *
 * Why ONLY comments — and not string literals?
 *   Tailwind class lists live inside string literals
 *   (e.g. `className="animate-spin h-4"`, `cn("animate-pulse", ...)`),
 *   so masking strings would destroy detection. Comments are the only
 *   place where prose like `the \`animate-pulse\` shimmer is gated`
 *   legitimately mentions an animate-* token without using it.
 *
 * The masker is a single-pass character tokenizer that correctly handles:
 *   - // line comments (only when NOT preceded by `:` to skip URLs like https://)
 *   - // line comments inside JSX, but NOT inside string/template literals
 *   - /* block comments *\/ in JS/TS AND in CSS (same syntax)
 *   - String literals ('...', "...", `...`) with escape sequences — we walk
 *     past them so a `//` or `/*` inside a string is NOT treated as a comment.
 *   - Regex literals are not parsed; if a slash sequence is ambiguous we err
 *     on the side of NOT masking (false positives are caught by tests; false
 *     negatives would silently weaken the audit).
 *
 * Replaces masked regions with spaces of the same length so `\n` line breaks
 * survive — `locate()` continues to compute correct line/col from offsets.
 */
function maskNonCode(src, { isCss = false } = {}) {
  const out = src.split("");
  const n = src.length;
  let i = 0;

  const blank = (start, end) => {
    for (let k = start; k < end; k++) {
      if (out[k] !== "\n") out[k] = " ";
    }
  };

  while (i < n) {
    const c = src[i];
    const c2 = src[i + 1];

    // Block comment /* ... */  (works for JS, TS, CSS)
    if (c === "/" && c2 === "*") {
      const end = src.indexOf("*/", i + 2);
      const stop = end === -1 ? n : end + 2;
      blank(i, stop);
      i = stop;
      continue;
    }

    // Line comment // ... (JS/TS only — CSS has no line comments)
    if (!isCss && c === "/" && c2 === "/") {
      // Skip URL-style `://` (avoids masking `https://...` inside identifiers).
      const prev = i > 0 ? src[i - 1] : "";
      if (prev === ":") {
        i += 2;
        continue;
      }
      const end = src.indexOf("\n", i + 2);
      const stop = end === -1 ? n : end;
      blank(i, stop);
      i = stop;
      continue;
    }

    // Skip string literals so // and /* inside strings stay literal.
    // We do NOT mask the contents — Tailwind classes live here.
    if (c === '"' || c === "'" || c === "`") {
      const quote = c;
      i++; // past opening quote
      while (i < n) {
        const ch = src[i];
        if (ch === "\\") {
          i += 2;
          continue;
        } // escape
        if (quote === "`" && ch === "$" && src[i + 1] === "{") {
          // template literal expression — recurse via simple brace counting
          i += 2;
          let depth = 1;
          while (i < n && depth > 0) {
            if (src[i] === "{") depth++;
            else if (src[i] === "}") depth--;
            if (depth > 0) i++;
          }
          if (src[i] === "}") i++;
          continue;
        }
        if (ch === quote) {
          i++;
          break;
        }
        if (quote !== "`" && ch === "\n") break; // unterminated single-line string
        i++;
      }
      continue;
    }

    i++;
  }

  return out.join("");
}

function read(p) {
  return readFileSync(p, "utf8");
}

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, out);
    else if (/\.(ts|tsx|css)$/.test(name)) out.push(full);
  }
  return out;
}

// ---------- 1. styles.css guards ----------
const cssPath = join(SRC, "styles.css");
const cssRel = relative(ROOT, cssPath).replaceAll("\\", "/");
const css = read(cssPath);
const cssChecks = [
  {
    rule: "css/system-mq",
    needle:
      /@media \(prefers-reduced-motion: reduce\)\s*\{[\s\S]*?animation:\s*none\s*!important[\s\S]*?transition:\s*none\s*!important/,
  },
  {
    rule: "css/in-app-toggle",
    needle:
      /html\.reduce-motion \*[\s\S]*?animation:\s*none\s*!important[\s\S]*?transition:\s*none\s*!important/,
  },
  { rule: "css/skeleton-keyframes", needle: /@keyframes skeleton-fade/ },
  { rule: "css/skeleton-rule", needle: /\[data-skeleton\][\s\S]*?animation:\s*skeleton-fade/ },
];
for (const c of cssChecks) {
  if (!c.needle.test(css)) add({ rule: c.rule, file: cssRel, hint: RULES[c.rule] });
}

// ---------- 2. Skeleton primitive ----------
const skelPath = join(SRC, "components/ui/skeleton.tsx");
const skelRel = relative(ROOT, skelPath).replaceAll("\\", "/");
const skelSrc = read(skelPath);
const skel = maskNonCode(skelSrc, { isCss: false });
if (!/data-skeleton/.test(skel))
  add({ rule: "skeleton/data-attr", file: skelRel, hint: RULES["skeleton/data-attr"] });
if (!/motion-safe:animate-pulse/.test(skel))
  add({ rule: "skeleton/motion-safe", file: skelRel, hint: RULES["skeleton/motion-safe"] });

// ---------- 3. JS motion hooks ----------
for (const [name, rule] of [
  ["useCounter.ts", "hook/use-counter"],
  ["useTilt.ts", "hook/use-tilt"],
]) {
  const p = join(SRC, "hooks", name);
  const rel = relative(ROOT, p).replaceAll("\\", "/");
  const masked = maskNonCode(read(p), { isCss: false });
  if (!/isReducedMotion\(\)/.test(masked)) add({ rule, file: rel, hint: RULES[rule] });
}

// ---------- 4 & 5. Source file scan ----------
const TICKER_ALLOWLIST = new Set([
  // Hourly refresh — coarse, never animates per-tick. Already RM-gated internally.
  "src/components/landing/Countdown.tsx",
  // 1s elapsed-time indicator on the career test. Functional clock, updates a numeric label only.
  "src/routes/career-engine.test.tsx",
  // 1s coupon countdown on the enrolment checkout. Functional clock, updates a numeric label only.
  "src/hooks/useCountdown.ts",
]);

const ANIMATION_ALLOWLIST = new Set([
  // Defines the system; rules ARE the reduced-motion gates.
  "src/styles.css",
  // Inline marquee — already covered by global `html.reduce-motion *` override.
  // (Documented exception; if you add new infinite animations, gate them.)
  "src/components/landing/LogoMarquee.tsx",
]);

/**
 * Files allowed to declare `transition:` in CSS without a local
 * reduced-motion media query. The global override in styles.css strips
 * these via `*`, so any extra CSS file must either add its own override
 * or be allowlisted with a justification.
 */
const TRANSITION_CSS_ALLOWLIST = new Set([
  "src/styles.css", // hosts the global override itself
]);

/** Allowlist for verified, RM-safe Web Animations API call sites. */
const WEB_ANIMATIONS_ALLOWLIST = new Set([
  // Add files here only after confirming the call site reads
  // `isReducedMotion()` and bails out / sets duration: 0.
]);

for (const file of walk(SRC)) {
  const rel = relative(ROOT, file).replaceAll("\\", "/");
  const src = read(file);
  const isCss = file.endsWith(".css");
  // Mask once per file. All token-scans below operate on `code`, which has
  // comments blanked out (preserving offsets + line breaks). String literals
  // remain intact so Tailwind class-list strings are still detectable.
  const code = maskNonCode(src, { isCss });
  const hasGate = /isReducedMotion\(\)/.test(code);

  // (4) setInterval without isReducedMotion consultation — report each call site.
  if (!TICKER_ALLOWLIST.has(rel) && !hasGate) {
    for (const { index, match } of matchAll(code, /setInterval\s*\(/g)) {
      const { line, col } = locate(src, index);
      add({
        rule: "js/setInterval",
        file: rel,
        line,
        col,
        snippet: match,
        hint: "Gate the ticker with `isReducedMotion()` or add this file to TICKER_ALLOWLIST.",
      });
    }
  }

  // (5) Inline infinite CSS animations on JSX/CSS that don't carry a gate
  if (isCss) {
    if (ANIMATION_ALLOWLIST.has(rel)) continue;
    for (const { index, match } of matchAll(code, /animation:[^;]*infinite[^;]*;/g)) {
      const { line, col } = locate(src, index);
      add({
        rule: "css/inline-infinite",
        file: rel,
        line,
        col,
        snippet: match.trim(),
        hint: RULES["css/inline-infinite"],
      });
    }
  } else {
    if (ANIMATION_ALLOWLIST.has(rel)) continue;

    for (const { index, match } of matchAll(
      code,
      /style=\{\{[^}]*animation:[^}]*infinite[^}]*\}\}/g,
    )) {
      const { line, col } = locate(src, index);
      add({
        rule: "jsx/inline-infinite",
        file: rel,
        line,
        col,
        snippet: match.length > 100 ? match.slice(0, 100) + "…" : match,
        hint: RULES["jsx/inline-infinite"],
      });
    }

    const tokenRe = /(?<![A-Za-z0-9_:-])animate-(pulse|spin|bounce|ping)(?![A-Za-z0-9_-])/g;
    for (const { index, match } of matchAll(code, tokenRe)) {
      const { line, col } = locate(src, index);
      add({
        rule: "tw/animate-token",
        file: rel,
        line,
        col,
        snippet: match,
        hint: `Replace with \`motion-safe:${match}\`.`,
      });
    }

    // (6) Inline JSX `style={{ transition: ... }}` / `transitionDuration: ...`.
    //     Inline styles can outrank class-based resets if specificity ties.
    //     Our `html.reduce-motion *` rule uses `!important`, so it still wins
    //     — but inline transitions are usually a smell (untested under RM)
    //     and should be moved to a CSS class with a media-query gate.
    const inlineTransRe =
      /style=\{\{[^}]*\b(?:transition|transitionDuration|transitionProperty|transitionTimingFunction|transitionDelay)\s*:[^}]*\}\}/g;
    for (const { index, match } of matchAll(code, inlineTransRe)) {
      const { line, col } = locate(src, index);
      add({
        rule: "jsx/inline-transition",
        file: rel,
        line,
        col,
        snippet: match.length > 100 ? match.slice(0, 100) + "…" : match,
        hint: "Move to a CSS class so it inherits `html.reduce-motion *` automatically.",
      });
    }

    // (7) Web Animations API — these run on the compositor and ignore CSS
    //     animation/transition resets. Must be gated by isReducedMotion().
    //     Patterns: `.animate(`, `new Animation(`, `new KeyframeEffect(`.
    if (!WEB_ANIMATIONS_ALLOWLIST.has(rel) && !hasGate) {
      const waapiRe = /(?:\.animate\s*\(|\bnew\s+Animation\s*\(|\bnew\s+KeyframeEffect\s*\()/g;
      for (const { index, match } of matchAll(code, waapiRe)) {
        // Filter out `.animate(` calls that are obviously NOT Element.animate
        // (e.g. `array.animate(`) by sampling the immediate prefix — too
        // many false positives outweigh false negatives. We accept the noise
        // and require the gate or an explicit allowlist entry.
        const { line, col } = locate(src, index);
        add({
          rule: "js/web-animations",
          file: rel,
          line,
          col,
          snippet: match.trim(),
          hint: "Wrap with `if (isReducedMotion()) return;` (or pass `duration: 0`), or add the file to WEB_ANIMATIONS_ALLOWLIST in scripts/check-reduced-motion.mjs.",
        });
      }
    }
  }

  // (8) CSS files outside styles.css declaring `transition:` without a
  //     local @media (prefers-reduced-motion: reduce) override. The global
  //     override in styles.css already covers them, but new CSS files
  //     should be explicit so they remain safe if styles.css ever changes.
  if (isCss && !TRANSITION_CSS_ALLOWLIST.has(rel)) {
    const hasRMOverride =
      /@media\s*\(prefers-reduced-motion:\s*reduce\)/.test(code) || /\.reduce-motion\b/.test(code);
    if (!hasRMOverride) {
      for (const { index, match } of matchAll(
        code,
        /\btransition(?:-(?:property|duration|timing-function|delay))?\s*:[^;]+;/g,
      )) {
        const { line, col } = locate(src, index);
        add({
          rule: "css/external-transition",
          file: rel,
          line,
          col,
          snippet: match.trim(),
          hint: "Add `@media (prefers-reduced-motion: reduce) { ... transition: none !important }` in this file or move the rule into styles.css.",
        });
      }
    }
  }
}

// ---------- Report ----------
const totalRules = Object.keys(RULES).length;
const usedRules = new Set(findings.map((f) => f.rule));
const okRules = Object.keys(RULES).filter((r) => !usedRules.has(r));

if (findings.length === 0) {
  console.log("\n✅ Reduced-motion accessibility check passed.");
  console.log(`   ${totalRules}/${totalRules} rules satisfied:`);
  for (const r of Object.keys(RULES)) console.log(`     • ${r}`);
  console.log("");
  process.exit(0);
}

// Group findings by rule for the detailed report.
const byRule = new Map();
for (const f of findings) {
  if (!byRule.has(f.rule)) byRule.set(f.rule, []);
  byRule.get(f.rule).push(f);
}

const RED = (s) => `\x1b[31m${s}\x1b[0m`;
const YEL = (s) => `\x1b[33m${s}\x1b[0m`;
const DIM = (s) => `\x1b[2m${s}\x1b[0m`;
const BOLD = (s) => `\x1b[1m${s}\x1b[0m`;
const GREEN = (s) => `\x1b[32m${s}\x1b[0m`;

console.error("");
console.error(RED(BOLD("❌ Reduced-motion accessibility check failed")));
console.error(
  DIM(
    `   ${findings.length} finding(s) across ${byRule.size} rule(s) · ${okRules.length}/${totalRules} rules passing`,
  ),
);
console.error("");

for (const [rule, items] of byRule) {
  console.error(BOLD(YEL(`  [${rule}] `)) + RULES[rule]);
  console.error(DIM(`  ${items.length} occurrence${items.length === 1 ? "" : "s"}`));
  for (const f of items) {
    const loc = f.line ? `${f.file}:${f.line}:${f.col}` : f.file;
    console.error(`    → ${loc}`);
    if (f.snippet) console.error(DIM(`        ${f.snippet}`));
    if (f.hint && f.hint !== RULES[rule]) console.error(DIM(`        hint: ${f.hint}`));
  }
  console.error("");
}

if (okRules.length) {
  console.error(GREEN("  Passing rules:"));
  for (const r of okRules) console.error(DIM(`    ✓ ${r}`));
  console.error("");
}

console.error(DIM(`  See scripts/check-reduced-motion.mjs for the full ruleset and allowlists.`));
console.error("");
process.exit(1);
