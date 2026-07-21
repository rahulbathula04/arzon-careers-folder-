import { createFileRoute } from "@tanstack/react-router";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { verifyHookSecret } from "@/lib/hook-auth.server";

const GATEWAY = "https://connector-gateway.lovable.dev/google_search_console/webmasters/v3";
const SITE_URL = "https://arzoncareers.in/";
const SITE_ENC = encodeURIComponent(SITE_URL);

function isoDaysAgo(days: number) {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - days);
  return d.toISOString().slice(0, 10);
}

type Row = { keys?: string[]; clicks: number; impressions: number; ctr: number; position: number };

async function gscQuery(body: Record<string, unknown>): Promise<Row[]> {
  const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
  const GSC_KEY = process.env.GOOGLE_SEARCH_CONSOLE_API_KEY;
  if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY missing");
  if (!GSC_KEY) throw new Error("GOOGLE_SEARCH_CONSOLE_API_KEY missing");
  const res = await fetch(`${GATEWAY}/sites/${SITE_ENC}/searchAnalytics/query`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "X-Connection-Api-Key": GSC_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`GSC ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const json = (await res.json()) as { rows?: Row[] };
  return json.rows ?? [];
}

export const Route = createFileRoute("/api/public/hooks/seo-alerts")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const unauthorized = verifyHookSecret(request);
        if (unauthorized) return unauthorized;
        try {
          // Curr window: last 7 days (GSC has ~2 day lag)
          const currEnd = isoDaysAgo(2);
          const currStart = isoDaysAgo(9);
          const prevEnd = isoDaysAgo(10);
          const prevStart = isoDaysAgo(17);

          const { data: cfgRow } = await supabaseAdmin
            .from("seo_alert_config")
            .select("min_impressions, drop_pct")
            .eq("id", 1)
            .maybeSingle();
          const minImpressions = cfgRow?.min_impressions ?? 20;
          const dropPct = Number(cfgRow?.drop_pct ?? 50);

          const [curr, prev] = await Promise.all([
            gscQuery({
              startDate: currStart,
              endDate: currEnd,
              dimensions: ["query"],
              rowLimit: 50,
            }),
            gscQuery({
              startDate: prevStart,
              endDate: prevEnd,
              dimensions: ["query"],
              rowLimit: 250,
            }),
          ]);

          // Snapshot the current top queries
          const snapshotRows = curr
            .map((r) => ({
              window_start: currStart,
              window_end: currEnd,
              query: r.keys?.[0] ?? "",
              clicks: Math.round(r.clicks),
              impressions: Math.round(r.impressions),
              ctr: Number(r.ctr.toFixed(4)),
              position: Number(r.position.toFixed(2)),
            }))
            .filter((r) => r.query);
          if (snapshotRows.length) {
            await supabaseAdmin.from("seo_query_snapshots").insert(snapshotRows);
          }

          // Build prev lookup
          const prevMap = new Map<string, Row>();
          for (const r of prev) {
            const q = r.keys?.[0];
            if (q) prevMap.set(q, r);
          }

          // Compare and queue alerts
          const alerts: Array<{
            query: string;
            metric: "clicks" | "impressions";
            prev_value: number;
            curr_value: number;
            pct_change: number;
            prev_window_start: string;
            prev_window_end: string;
            curr_window_start: string;
            curr_window_end: string;
          }> = [];

          for (const c of curr) {
            const q = c.keys?.[0];
            if (!q) continue;
            const p = prevMap.get(q);
            if (!p) continue;
            // Only consider queries that had a meaningful baseline
            if (p.impressions < minImpressions) continue;

            for (const metric of ["clicks", "impressions"] as const) {
              const prevV = Math.round(p[metric]);
              const currV = Math.round(c[metric]);
              if (prevV <= 0) continue;
              const delta = ((currV - prevV) / prevV) * 100;
              if (delta <= -dropPct) {
                alerts.push({
                  query: q,
                  metric,
                  prev_value: prevV,
                  curr_value: currV,
                  pct_change: Number(delta.toFixed(2)),
                  prev_window_start: prevStart,
                  prev_window_end: prevEnd,
                  curr_window_start: currStart,
                  curr_window_end: currEnd,
                });
              }
            }
          }

          // De-dupe against alerts already raised for the same query+metric+curr window
          let inserted = 0;
          if (alerts.length) {
            const { data: existing } = await supabaseAdmin
              .from("seo_alerts")
              .select("query, metric")
              .gte("curr_window_start", currStart)
              .lte("curr_window_end", currEnd);
            const seen = new Set((existing ?? []).map((e) => `${e.query}::${e.metric}`));
            const toInsert = alerts.filter((a) => !seen.has(`${a.query}::${a.metric}`));
            if (toInsert.length) {
              const { error } = await supabaseAdmin.from("seo_alerts").insert(toInsert);
              if (error) throw error;
              inserted = toInsert.length;
            }
          }

          return new Response(
            JSON.stringify({
              ok: true,
              snapshotted: snapshotRows.length,
              candidates: alerts.length,
              inserted,
              window: { currStart, currEnd, prevStart, prevEnd },
              thresholds: { minImpressions, dropPct },
            }),
            { headers: { "Content-Type": "application/json" } },
          );
        } catch (e) {
          const msg = e instanceof Error ? e.message : String(e);
          console.error("seo-alerts hook failed:", msg);
          return new Response(JSON.stringify({ ok: false, error: msg }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
    },
  },
});
