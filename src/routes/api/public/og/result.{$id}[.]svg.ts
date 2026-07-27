import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

/**
 * Dynamic Open Graph card for a shared assessment result. Returns SVG (not
 * PNG) — modern social platforms (LinkedIn, Twitter/X, WhatsApp web preview)
 * accept `image/svg+xml` and SVG renders 100% Worker-safe with no native deps.
 * 1200x630 is the OG canonical aspect.
 */
export const Route = createFileRoute("/api/public/og/result/{$id}.svg")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const slug = (params as { id?: string }).id ?? "";
        // Validate slug shape before issuing a service-role DB query. This
        // bounds work per request and stops attackers from sending megabyte
        // path segments to inflate cost or probe for SQL behaviour.
        if (!slug || slug.length > 80 || !/^[a-zA-Z0-9_-]+$/.test(slug)) {
          return new Response("not found", { status: 404 });
        }
        const { createSafeAdminClient } = await import("@/lib/supabaseEnv");
        const sb = createSafeAdminClient();
        if (!sb) {
          return new Response("not found", { status: 404 });
        }
        const { data: row } = await sb
          .from("assessment_shares")
          .select("archetype_name, top_track_title, acri_overall, band_label")
          .eq("slug", slug)
          .maybeSingle();

        const score = row?.acri_overall ?? 0;
        const archetype = esc(row?.archetype_name ?? "Career Engine Result");
        const track = esc(row?.top_track_title ?? "Healthcare Career");
        const band = esc(row?.band_label ?? "ACRI Readiness Preview");
        const dash = (Math.max(0, Math.min(100, score)) / 100) * 565.5; // 2*pi*90

        const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#070A14"/>
      <stop offset="100%" stop-color="#0E1626"/>
    </linearGradient>
    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#C9A84C"/>
      <stop offset="100%" stop-color="#F0D78C"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.85" cy="0.15" r="0.6">
      <stop offset="0%" stop-color="#7BA3FF" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#7BA3FF" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <g font-family="Inter, system-ui, -apple-system, Segoe UI, sans-serif" fill="#ffffff">
    <text x="80" y="110" font-size="22" letter-spacing="6" fill="#7BA3FF" font-weight="600">ARZON CAREERS · ACRI</text>
    <text x="80" y="200" font-size="68" font-weight="700">They scored</text>
    <text x="80" y="300" font-size="180" font-weight="800" fill="url(#gold)">${score}</text>
    <text x="80" y="360" font-size="32" fill="#C9CDD6">${band}</text>
    <text x="80" y="450" font-size="26" fill="#9AA3B2" letter-spacing="2">TOP FIT</text>
    <text x="80" y="498" font-size="44" font-weight="700">${track}</text>
    <text x="80" y="540" font-size="22" fill="#9AA3B2">Archetype · ${archetype}</text>
    <text x="80" y="595" font-size="20" fill="#7BA3FF">Take yours · 4 min · arzonglobal.com</text>
  </g>
  <g transform="translate(950 315)">
    <circle cx="0" cy="0" r="180" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" stroke-width="2"/>
    <circle cx="0" cy="0" r="90" fill="none" stroke="rgba(255,255,255,0.10)" stroke-width="14"/>
    <circle cx="0" cy="0" r="90" fill="none" stroke="#7BA3FF" stroke-width="14" stroke-linecap="round"
            stroke-dasharray="${dash} 565.5" transform="rotate(-90)"/>
    <text x="0" y="6" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="62" font-weight="800" fill="#ffffff">${score}</text>
    <text x="0" y="42" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="16" letter-spacing="3" fill="#7BA3FF">/ 100 ACRI</text>
  </g>
</svg>`;
        return new Response(svg, {
          headers: {
            "content-type": "image/svg+xml; charset=utf-8",
            "cache-control": "public, max-age=86400, s-maxage=86400",
          },
        });
      },
    },
  },
});

function esc(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    c === "&" ? "&amp;" : c === "<" ? "&lt;" : c === ">" ? "&gt;" : c === '"' ? "&quot;" : "&apos;",
  );
}
