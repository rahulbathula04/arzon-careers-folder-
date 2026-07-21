import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Database } from "@/integrations/supabase/types";

export type BenchmarkDimension =
  | "analytical"
  | "domain"
  | "detail"
  | "communication"
  | "commitment";

export type BenchmarkRow = {
  dimension: BenchmarkDimension;
  label: string;
  topPct: number; // "Top X%" — 0..100, lower is better
  band: "top10" | "top25" | "top50" | "bottom";
  sampleSize: number;
  refreshedAt: string | null;
  streamUsed: string; // e.g. "MPC", "all"
  userValue: number;
  distribution: number[]; // 21 breakpoints p0..p100 step 5
};

export const DIMENSION_LABELS: Record<BenchmarkDimension, string> = {
  analytical: "Analytical reasoning",
  domain: "Domain knowledge",
  detail: "Attention to detail",
  communication: "Communication",
  commitment: "Commitment signal",
};

// Map the persisted 13-trait vector into the 5 benchmark dimensions.
// Trait keys come from src/data/careerEngineQuestions.ts.
export function projectDimensions(
  traitScores: Record<string, number>,
): Record<BenchmarkDimension, number> {
  const avg = (...keys: string[]) => {
    const vals = keys.map((k) => Number(traitScores?.[k] ?? 0));
    return vals.reduce((s, v) => s + v, 0) / (vals.length || 1);
  };
  return {
    analytical: avg("logic", "data"),
    domain: Number(traitScores?.compliance ?? 0),
    detail: Number(traitScores?.detail ?? 0),
    communication: avg("language", "writing"),
    commitment: Number(traitScores?.pressure ?? 0),
  };
}

function bandFor(topPct: number): BenchmarkRow["band"] {
  if (topPct <= 10) return "top10";
  if (topPct <= 25) return "top25";
  if (topPct <= 50) return "top50";
  return "bottom";
}

// cdf is 21 breakpoints (p0, p5, p10, ..., p100).
// Returns the student's percentile rank (0..100). "Top X%" = 100 - rank.
function percentileRank(value: number, cdf: number[]): number {
  for (let i = cdf.length - 1; i >= 0; i--) {
    if (value >= Number(cdf[i])) return i * 5;
  }
  return 0;
}

function serverPublicClient() {
  return createClient<Database>(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
  });
}

export const getPercentileBenchmark = createServerFn({ method: "POST" })
  .inputValidator((input: { stream: string | null; traitScores: Record<string, number> }) => input)
  .handler(async ({ data }): Promise<{ rows: BenchmarkRow[]; hidden: boolean }> => {
    const supabase = serverPublicClient();
    const streamKey = (data.stream ?? "all").trim() || "all";
    const values = projectDimensions(data.traitScores ?? {});
    const dims = Object.keys(values) as BenchmarkDimension[];

    // Try stream-specific snapshots first, fall back to "all".
    const { data: streamRows } = await supabase
      .from("ce_percentile_snapshots")
      .select("*")
      .eq("stream", streamKey);
    const { data: allRows } = await supabase
      .from("ce_percentile_snapshots")
      .select("*")
      .eq("stream", "all");

    const byDim = new Map<
      string,
      { cdf: number[]; sample: number; refreshed: string; streamUsed: string }
    >();
    for (const row of allRows ?? []) {
      byDim.set(row.dimension, {
        cdf: (row.cdf as unknown as number[]) ?? [],
        sample: row.sample_size,
        refreshed: row.refreshed_at,
        streamUsed: "all",
      });
    }
    for (const row of streamRows ?? []) {
      // Prefer stream-specific when large enough
      if ((row.sample_size ?? 0) >= 100) {
        byDim.set(row.dimension, {
          cdf: (row.cdf as unknown as number[]) ?? [],
          sample: row.sample_size,
          refreshed: row.refreshed_at,
          streamUsed: streamKey,
        });
      }
    }

    // If we have no snapshots at all, or the fallback "all" sample is below 20, hide.
    const totalSample = Math.max(...Array.from(byDim.values()).map((v) => v.sample), 0);
    if (byDim.size === 0 || totalSample < 20) {
      return { rows: [], hidden: true };
    }

    const rows: BenchmarkRow[] = dims
      .map((d): BenchmarkRow | null => {
        const snap = byDim.get(d);
        if (!snap || !snap.cdf?.length) return null;
        const rank = percentileRank(values[d], snap.cdf);
        const topPct = Math.max(1, 100 - rank);
        return {
          dimension: d,
          label: DIMENSION_LABELS[d],
          topPct,
          band: bandFor(topPct),
          sampleSize: snap.sample,
          refreshedAt: snap.refreshed ?? null,
          streamUsed: snap.streamUsed,
          userValue: Number(values[d].toFixed(3)),
          distribution: snap.cdf,
        };
      })
      .filter((r): r is BenchmarkRow => r !== null);

    return { rows, hidden: rows.length === 0 };
  });

// ---------- Admin refresh ----------
// Rebuilds snapshots from the last 90 days of completed leads.
// Admin-only: verified via has_role('admin').

function computeCdf(values: number[]): number[] {
  if (values.length === 0) return [];
  const sorted = [...values].sort((a, b) => a - b);
  const cdf: number[] = [];
  for (let p = 0; p <= 100; p += 5) {
    const idx = Math.min(sorted.length - 1, Math.floor((p / 100) * (sorted.length - 1)));
    cdf.push(sorted[idx]);
  }
  return cdf;
}

export const refreshPercentileSnapshots = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: isAdmin } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (!isAdmin) throw new Error("Forbidden");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const since = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString();
    const { data: leads, error } = await supabaseAdmin
      .from("career_engine_leads")
      .select("result_payload, created_at")
      .gte("created_at", since)
      .not("result_payload", "is", null);
    if (error) throw error;

    // Group projected values by (stream, dimension).
    const buckets = new Map<string, Map<BenchmarkDimension, number[]>>();
    const push = (stream: string, dim: BenchmarkDimension, v: number) => {
      if (!buckets.has(stream)) buckets.set(stream, new Map());
      const inner = buckets.get(stream)!;
      if (!inner.has(dim)) inner.set(dim, []);
      inner.get(dim)!.push(v);
    };

    for (const lead of leads ?? []) {
      const payload =
        (lead.result_payload as {
          traitScores?: Record<string, number>;
          profile?: { stream?: string };
        }) ?? {};
      const traits = payload.traitScores;
      if (!traits) continue;
      const projected = projectDimensions(traits);
      const stream = (payload.profile?.stream ?? "").trim() || "all";
      for (const dim of Object.keys(projected) as BenchmarkDimension[]) {
        push("all", dim, projected[dim]);
        if (stream !== "all") push(stream, dim, projected[dim]);
      }
    }

    const upserts: Array<{
      stream: string;
      dimension: BenchmarkDimension;
      cdf: number[];
      sample_size: number;
      refreshed_at: string;
    }> = [];
    const now = new Date().toISOString();
    for (const [stream, inner] of buckets) {
      for (const [dim, values] of inner) {
        const cdf = computeCdf(values);
        if (cdf.length === 0) continue;
        upserts.push({
          stream,
          dimension: dim,
          cdf,
          sample_size: values.length,
          refreshed_at: now,
        });
      }
    }

    if (upserts.length) {
      const { error: upErr } = await supabaseAdmin
        .from("ce_percentile_snapshots")
        .upsert(upserts, { onConflict: "stream,dimension" });
      if (upErr) throw upErr;
    }

    return { streams: buckets.size, rowsWritten: upserts.length, leadsScanned: leads?.length ?? 0 };
  });
