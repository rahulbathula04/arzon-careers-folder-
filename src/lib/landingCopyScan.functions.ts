import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { requireStaff } from "@/server/auth-guards.server";

// Bundle source of every landing/credibility component at build time so
// the scanner can read them at runtime in the edge worker (no fs needed).
const SOURCES = {
  ...import.meta.glob("/src/components/landing/*.tsx", {
    query: "?raw",
    import: "default",
    eager: true,
  }),
  ...import.meta.glob("/src/components/credibility/*.tsx", {
    query: "?raw",
    import: "default",
    eager: true,
  }),
} as Record<string, string>;

type Severity = "warn" | "info";
type Finding = {
  file: string;
  line: number;
  column: number;
  snippet: string;
  rule: string;
  severity: Severity;
  category: "typography" | "a11y";
};

/**
 * Punctuation/style rules. Each rule scans one line and yields zero or more
 * column offsets where it matched. The rules are deliberately conservative:
 * numeric ranges (`3–7`, `Week 1–2`) and code-only constructs are skipped.
 */
const RULES: Array<{
  id: string;
  label: string;
  severity: Severity;
  category: "typography" | "a11y";
  match: (line: string) => number[];
}> = [
  {
    id: "em-dash",
    label: "Em-dash in copy (-)",
    severity: "warn",
    category: "typography",
    match: (l) => indices(l, /-/g),
  },
  {
    id: "en-dash-non-numeric",
    label: "En-dash outside numeric range (–)",
    severity: "warn",
    category: "typography",
    match: (l) => {
      const hits: number[] = [];
      const re = /–/g;
      let m: RegExpExecArray | null;
      while ((m = re.exec(l))) {
        const before = l[m.index - 1] ?? "";
        const after = l[m.index + 1] ?? "";
        // skip when both neighbours are digits (e.g. 3–7, 1–2)
        if (/\d/.test(before) && /\d/.test(after)) continue;
        hits.push(m.index);
      }
      return hits;
    },
  },
  {
    id: "curly-double-quote",
    label: "Curly double quote (“ ”)",
    severity: "warn",
    category: "typography",
    match: (l) => indices(l, /[\u201C\u201D]/g),
  },
  {
    id: "curly-single-quote",
    label: "Curly single quote / apostrophe (‘ ’)",
    severity: "warn",
    category: "typography",
    match: (l) => indices(l, /[\u2018\u2019]/g),
  },
  {
    id: "triple-dot",
    label: "Three dots instead of ellipsis (…)",
    severity: "info",
    category: "typography",
    match: (l) => indices(l, /\.{3}/g),
  },
  {
    id: "double-space",
    label: "Double space inside copy",
    severity: "info",
    category: "typography",
    match: (l) => {
      // ignore indentation, only inside string literals or JSX text
      const trimmed = l.replace(/^\s+/, "");
      const offset = l.length - trimmed.length;
      const hits: number[] = [];
      const re = /[A-Za-z.,)] {2,}[A-Za-z(]/g;
      let m: RegExpExecArray | null;
      while ((m = re.exec(trimmed))) hits.push(offset + m.index + 1);
      return hits;
    },
  },
  {
    id: "todo",
    label: "TODO / FIXME marker",
    severity: "info",
    category: "typography",
    match: (l) => indices(l, /\b(TODO|FIXME)\b/g),
  },
];

function indices(line: string, re: RegExp): number[] {
  const hits: number[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(line))) hits.push(m.index);
  return hits;
}

function shortPath(absPath: string): string {
  // /src/components/landing/Foo.tsx → components/landing/Foo.tsx
  return absPath.replace(/^\/src\//, "");
}

function scan(): { findings: Finding[]; scannedFiles: number } {
  const findings: Finding[] = [];
  let scannedFiles = 0;
  for (const [absPath, source] of Object.entries(SOURCES)) {
    if (typeof source !== "string") continue;
    scannedFiles += 1;
    const lines = source.split(/\r?\n/);
    for (let i = 0; i < lines.length; i += 1) {
      const raw = lines[i];
      // Skip lines that are clearly imports or single-line comments - they
      // commonly contain punctuation that isn't user-visible copy.
      const trimmed = raw.trim();
      if (trimmed.startsWith("import ") || trimmed.startsWith("// ")) continue;
      for (const rule of RULES) {
        const cols = rule.match(raw);
        for (const col of cols) {
          findings.push({
            file: shortPath(absPath),
            line: i + 1,
            column: col + 1,
            snippet: raw.trim().slice(0, 200),
            rule: rule.label,
            severity: rule.severity,
            category: rule.category,
          });
        }
      }
    }
    // A11y: per-file pattern scan for icon-only buttons missing aria-label.
    // Heuristic: a <button ...> tag whose attribute block does not contain
    // aria-label= or aria-labelledby= AND whose children include an <Icon ../>
    // pattern only (no plain text). This is intentionally conservative.
    const buttonRe = /<button\b([^>]*)>([\s\S]*?)<\/button>/g;
    let bm: RegExpExecArray | null;
    while ((bm = buttonRe.exec(source))) {
      const attrs = bm[1];
      const inner = bm[2];
      const hasLabel = /\baria-label(?:ledby)?\s*=/.test(attrs);
      const innerStripped = inner
        .replace(/\{[^}]*\}/g, "")
        .replace(/<[^>]+\/?>/g, "")
        .trim();
      const innerHasText = innerStripped.length > 0;
      if (!hasLabel && !innerHasText) {
        const lineIdx = source.slice(0, bm.index).split(/\r?\n/).length;
        findings.push({
          file: shortPath(absPath),
          line: lineIdx,
          column: 1,
          snippet: source.slice(bm.index, bm.index + 120).split(/\r?\n/)[0],
          rule: "Icon-only <button> missing aria-label",
          severity: "warn",
          category: "a11y",
        });
      }
    }
  }
  return { findings, scannedFiles };
}

export const scanLandingCopy = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await requireStaff(context.userId);
    const { findings, scannedFiles } = scan();
    // Stable ordering: severity (warn first), then file, then line.
    findings.sort((a, b) => {
      if (a.severity !== b.severity) return a.severity === "warn" ? -1 : 1;
      if (a.file !== b.file) return a.file.localeCompare(b.file);
      return a.line - b.line;
    });
    const warnCount = findings.filter((f) => f.severity === "warn").length;
    const a11yWarnCount = findings.filter(
      (f) => f.severity === "warn" && f.category === "a11y",
    ).length;
    const typographyWarnCount = warnCount - a11yWarnCount;
    const publishReady = warnCount === 0;
    return {
      findings,
      scannedFiles,
      scannedAt: new Date().toISOString(),
      summary: {
        warnCount,
        typographyWarnCount,
        a11yWarnCount,
        infoCount: findings.length - warnCount,
        publishReady,
      },
    };
  });
