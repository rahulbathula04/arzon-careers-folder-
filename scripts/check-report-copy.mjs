#!/usr/bin/env node
/**
 * Lightweight grammar / copy QA for the career-report UI.
 *
 * Scans string and JSX literals inside `src/components/career/report/**` for
 * a small set of high-signal issues we've hit repeatedly in the report:
 *
 *   1. Pluralization gone wrong — "1 roles", "2 role", "1 companies",
 *      "1 skills", "1 days", "1 years"; and the reverse "2 role" /
 *      "3 company".
 *   2. Tie-phrase drift — the report has an official tie phrase
 *      ("close tie with", never "tied with", "tie between", "tie to", or
 *      the double "a tie tie").
 *   3. Double words ("the the", "a a", "of of", "and and", "is is").
 *   4. Space-before-punctuation ("word ,", "word .").
 *   5. Placeholder copy left behind ("Lorem ipsum", "TODO:", "TK ",
 *      "xxx placeholder").
 *
 * These rules are intentionally narrow — a full grammar linter would be too
 * noisy for JSX. If a hit is a false positive, wrap the literal with a
 * trailing `/* copy-qa-allow *\/` comment on the same line.
 *
 * Usage:   node scripts/check-report-copy.mjs
 * Exit:    0 on clean, 1 on any offense.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOTS = ["src/components/career/report"];
const EXT = /\.(tsx?|mdx?)$/;
const ALLOW_MARK = "copy-qa-allow";

const RULES = [
  {
    id: "plural-1-with-s",
    // "1 roles" / "1 companies" / "1 skills" / "1 days" / "1 years"
    re: /\b1\s+(roles|companies|skills|days|years|months|weeks|hours|minutes|matches|options|paths|tracks|tools|tags|sources|reviews|questions|jobs|openings|employers)\b/gi,
    hint: 'Use the singular form after "1" (e.g. "1 role", "1 company").',
  },
  {
    id: "plural-N-singular",
    // "2 role" / "3 company" / "4 skill" — a small digit N > 1 followed by
    // the singular form of one of our known list nouns.
    // Skip when the singular noun is followed by another word (compound
    // modifier like "3 tool artefacts", "5 skill gaps") — those are
    // grammatically fine.
    re: /\b([2-9]|\d{2,})\s+(role|company|skill|day|year|month|week|hour|minute|match|option|path|track|tool|tag|source|review|question|job|opening|employer)\b(?!s|ies|-)(?!\s+[a-zA-Z])/g,
    hint: 'Use the plural form after a count > 1 (e.g. "2 roles", "3 companies").',
  },
  {
    id: "tie-phrase-drift",
    re: /\b(tied with|tie between|tie to|a tie tie|tie tie)\b/gi,
    hint: 'Use the canonical tie phrase "close tie with" in report copy.',
  },
  {
    id: "double-word",
    re: /\b(the|a|an|of|and|is|to|in|on|for|with)\s+\1\b/gi,
    hint: "Duplicate word — remove the repeat.",
  },
  {
    id: "space-before-punct",
    // Restrict to prose punctuation. `?` and `:` are omitted because JSX
    // conditionals ("cond ? a : b") appear inside template literals and
    // produce noisy false positives.
    re: /[A-Za-z0-9)]\s+([,.;!])(?=\s|$)/g,
    hint: "Remove the space before punctuation.",
  },
  {
    id: "placeholder-copy",
    re: /\b(lorem ipsum|TODO:|FIXME:|TK |xxx placeholder|placeholder text)\b/gi,
    hint: "Placeholder copy left in the report — replace before publishing.",
  },
];

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (name === "__tests__" || name === "node_modules") continue;
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) walk(p, out);
    else if (EXT.test(name)) out.push(p);
  }
  return out;
}

/**
 * Extract "human copy" spans from a source file. We only scan:
 *   - string / template literals
 *   - JSX text children (between > and <)
 * Everything else is code and gets skipped, which keeps rules like
 * "double word" from firing on `is is` in `is(is)` calls, or on
 * `for for` in a comment.
 */
function extractSpans(source) {
  const spans = [];
  // JSX text: naive — anything between `>` and `<` that isn't a tag.
  const jsxTextRe = />([^<>{}\n][^<>{}]*)</g;
  let m;
  while ((m = jsxTextRe.exec(source))) {
    const text = m[1].trim();
    if (text.length < 3) continue;
    spans.push({ text, index: m.index + 1 });
  }
  // String + template literals — avoid import paths and `className=""`.
  const strRe = /(["'`])((?:\\.|(?!\1).)*?)\1/g;
  while ((m = strRe.exec(source))) {
    const text = m[2];
    if (text.length < 3) continue;
    if (/^[./@#\w-]+$/.test(text)) continue; // path/id-like
    if (!/\s/.test(text) && !/[.!?,]/.test(text)) continue; // single tokens
    spans.push({ text, index: m.index + 1 });
  }
  return spans;
}

function lineColFor(source, index) {
  let line = 1;
  let last = 0;
  for (let i = 0; i < index && i < source.length; i++) {
    if (source[i] === "\n") {
      line++;
      last = i + 1;
    }
  }
  return { line, col: index - last + 1 };
}

function lineOf(source, index) {
  const start = source.lastIndexOf("\n", index) + 1;
  const endNl = source.indexOf("\n", index);
  const end = endNl === -1 ? source.length : endNl;
  return source.slice(start, end);
}

const offenses = [];
for (const root of ROOTS) {
  let files = [];
  try {
    files = walk(root);
  } catch {
    continue;
  }
  for (const file of files) {
    const source = readFileSync(file, "utf8");
    const spans = extractSpans(source);
    for (const rule of RULES) {
      for (const span of spans) {
        rule.re.lastIndex = 0;
        let hit;
        while ((hit = rule.re.exec(span.text))) {
          const absIndex = span.index + hit.index;
          const line = lineOf(source, absIndex);
          if (line.includes(ALLOW_MARK)) continue;
          const { line: ln, col } = lineColFor(source, absIndex);
          offenses.push({
            file,
            line: ln,
            col,
            rule: rule.id,
            hint: rule.hint,
            excerpt: hit[0],
            context: line.trim().slice(0, 160),
          });
        }
      }
    }
  }
}

if (!offenses.length) {
  console.log("✓ Report copy QA passed — no grammar / tie-phrase issues found.");
  process.exit(0);
}

console.log(`✗ Report copy QA found ${offenses.length} issue(s):\n`);
for (const o of offenses) {
  console.log(`  ${o.file}:${o.line}:${o.col}  [${o.rule}]`);
  console.log(`    match: "${o.excerpt}"`);
  console.log(`    line : ${o.context}`);
  console.log(`    hint : ${o.hint}\n`);
}
console.log(`To intentionally allow a match, append the comment /* ${ALLOW_MARK} */ on that line.`);
process.exit(1);
