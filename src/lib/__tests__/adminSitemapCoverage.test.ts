import { describe, expect, it } from "bun:test";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const ROUTES_DIR = "src/routes";
const SITEMAP_FILE = "src/routes/sitemap[.]xml.ts";
const PARITY_SCRIPT = "scripts/check-sitemap-parity.mjs";

/**
 * Normalize a route path so dynamic segments are comparable across the three
 * conventions we accept:
 *   • TanStack file routes:  /admin/users/$userId
 *   • Sitemap entries:       /admin/users/:userId   (or any non-empty token)
 *   • Allowlist entries:     either form above, OR a regex-like pattern
 *
 * Every dynamic segment ($foo, :foo, {-$foo}, {$foo}) collapses to the literal
 * token `:param` so equality comparisons work regardless of which form the
 * author used. Trailing slashes are stripped (except for "/").
 */
function normalizeRoute(path: string): string {
  let p = path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;
  p = p
    .split("/")
    .map((seg) => {
      if (!seg) return seg;
      // Splat: `$` alone or `{-$}` → :splat
      if (seg === "$" || seg === "{-$}") return ":splat";
      // {-$name} optional, {$name} prefix-less braced, $name bare
      if (/^\{-?\$[^}]+\}$/.test(seg)) return ":param";
      if (/^\$[^/]+$/.test(seg)) return ":param";
      // Mixed prefix/suffix like post-{$id} or {$file}.txt → keep prefix/suffix
      if (/\{-?\$[^}]+\}/.test(seg)) {
        return seg.replace(/\{-?\$[^}]+\}/g, ":param");
      }
      // Already-normalized :name from sitemap/allowlist
      if (/^:[^/]+$/.test(seg)) return ":param";
      return seg;
    })
    .join("/");
  return p;
}

function getAdminRouteClaims(): string[] {
  const files = readdirSync(ROUTES_DIR).filter((f) => f.startsWith("admin") && f.endsWith(".tsx"));
  const claims: string[] = [];
  for (const f of files) {
    const src = readFileSync(join(ROUTES_DIR, f), "utf8");
    const m = src.match(/createFileRoute\("([^"]+)"\)/);
    if (m) claims.push(m[1]);
  }
  return claims;
}

function getSitemapPaths(): Set<string> {
  const src = readFileSync(SITEMAP_FILE, "utf8");
  const paths = new Set<string>();
  const staticBlock = src.match(/STATIC_PATHS\s*=\s*\[([\s\S]*?)\]/);
  if (staticBlock) {
    for (const m of staticBlock[1].matchAll(/"([^"]+)"/g)) paths.add(m[1]);
  }
  const entriesBlock = src.match(/STATIC_ENTRIES[\s\S]*?=\s*\[([\s\S]*?)\n\];/);
  if (entriesBlock) {
    for (const m of entriesBlock[1].matchAll(/path:\s*"([^"]+)"/g)) paths.add(m[1]);
  }
  return paths;
}

function getAllowlist(): Set<string> {
  const src = readFileSync(PARITY_SCRIPT, "utf8");
  const block = src.match(/ALLOWLIST = new Set\(\[([\s\S]*?)\]\)/);
  const out = new Set<string>();
  if (block) {
    for (const m of block[1].matchAll(/"([^"]+)"/g)) out.add(m[1]);
  }
  return out;
}

function normalizeSet(s: Set<string>): Set<string> {
  return new Set(Array.from(s).map(normalizeRoute));
}

/**
 * Cheap edit-distance for short route strings. Used only in failure output
 * to surface the closest candidates to the missing route.
 */
function editDistance(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  const dp: number[] = Array(n + 1)
    .fill(0)
    .map((_, i) => i);
  for (let i = 1; i <= m; i++) {
    let prev = dp[0];
    dp[0] = i;
    for (let j = 1; j <= n; j++) {
      const tmp = dp[j];
      dp[j] = a[i - 1] === b[j - 1] ? prev : 1 + Math.min(prev, dp[j], dp[j - 1]);
      prev = tmp;
    }
  }
  return dp[n];
}

function closestCandidates(
  target: string,
  pool: Set<string>,
  limit = 3,
): Array<{ path: string; distance: number }> {
  return Array.from(pool)
    .map((path) => ({ path, distance: editDistance(target, path) }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit);
}

describe("admin route sitemap coverage", () => {
  const claims = getAdminRouteClaims();
  const sitemap = normalizeSet(getSitemapPaths());
  const allowlist = normalizeSet(getAllowlist());

  it("discovers admin route files", () => {
    expect(claims.length).toBeGreaterThan(0);
    expect(claims).toContain("/admin/analytics-alerts");
  });

  it("normalizes dynamic segments consistently", () => {
    expect(normalizeRoute("/admin/users/$userId")).toBe("/admin/users/:param");
    expect(normalizeRoute("/admin/users/:userId")).toBe("/admin/users/:param");
    expect(normalizeRoute("/admin/posts/{-$slug}")).toBe("/admin/posts/:param");
    expect(normalizeRoute("/admin/files/$")).toBe("/admin/files/:splat");
    expect(normalizeRoute("/admin/post-{$id}")).toBe("/admin/post-:param");
    expect(normalizeRoute("/admin/")).toBe("/admin");
  });

  it("every admin route is in sitemap STATIC_PATHS or ALLOWLIST", () => {
    const missing: string[] = [];
    for (const claim of claims) {
      const norm = normalizeRoute(claim);
      if (!sitemap.has(norm) && !allowlist.has(norm)) missing.push(claim);
    }
    if (missing.length) {
      const sections: string[] = [
        "",
        `❌ ${missing.length} admin route(s) missing from sitemap and allowlist:`,
      ];
      for (const p of missing) {
        const norm = normalizeRoute(p);
        const sitemapNear = closestCandidates(norm, sitemap);
        const allowNear = closestCandidates(norm, allowlist);
        sections.push(
          "",
          `   • ${p}`,
          `       normalized:        ${norm}`,
          `       closest sitemap:   ${
            sitemapNear.map((c) => `${c.path} (Δ${c.distance})`).join(", ") || "(empty)"
          }`,
          `       closest allowlist: ${
            allowNear.map((c) => `${c.path} (Δ${c.distance})`).join(", ") || "(empty)"
          }`,
        );
      }
      sections.push(
        "",
        "Fix one of:",
        "  1. Add the path to STATIC_PATHS in src/routes/sitemap[.]xml.ts (public)",
        "  2. Add the path to ALLOWLIST in scripts/check-sitemap-parity.mjs (gated/internal)",
        "",
        "For dynamic routes, allowlist either the file form (/admin/x/$id) or",
        "the colon form (/admin/x/:id) — both normalize to the same value.",
        "",
      );
      throw new Error(sections.join("\n"));
    }
  });

  for (const claim of claims) {
    const norm = normalizeRoute(claim);
    it(`covers ${claim} via sitemap or allowlist`, () => {
      const covered = sitemap.has(norm) || allowlist.has(norm);
      expect(covered).toBe(true);
    });
  }
});
