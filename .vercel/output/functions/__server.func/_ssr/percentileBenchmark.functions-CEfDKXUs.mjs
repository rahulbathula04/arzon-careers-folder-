import { c as createServerRpc } from "./createServerRpc-wV0Vk4NU.mjs";
import { createClient } from "../_libs/supabase__supabase-js.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CGVBerDj.mjs";
import { c as createServerFn } from "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "./createMiddleware-BvN2ghIY.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "../_libs/isbot.mjs";
const DIMENSION_LABELS = {
  analytical: "Analytical reasoning",
  domain: "Domain knowledge",
  detail: "Attention to detail",
  communication: "Communication",
  commitment: "Commitment signal"
};
function projectDimensions(traitScores) {
  const avg = (...keys) => {
    const vals = keys.map((k) => Number(traitScores?.[k] ?? 0));
    return vals.reduce((s, v) => s + v, 0) / (vals.length || 1);
  };
  return {
    analytical: avg("logic", "data"),
    domain: Number(traitScores?.compliance ?? 0),
    detail: Number(traitScores?.detail ?? 0),
    communication: avg("language", "writing"),
    commitment: Number(traitScores?.pressure ?? 0)
  };
}
function bandFor(topPct) {
  if (topPct <= 10) return "top10";
  if (topPct <= 25) return "top25";
  if (topPct <= 50) return "top50";
  return "bottom";
}
function percentileRank(value, cdf) {
  for (let i = cdf.length - 1; i >= 0; i--) {
    if (value >= Number(cdf[i])) return i * 5;
  }
  return 0;
}
function serverPublicClient() {
  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_PUBLISHABLE_KEY, {
    auth: {
      storage: void 0,
      persistSession: false,
      autoRefreshToken: false
    }
  });
}
const getPercentileBenchmark_createServerFn_handler = createServerRpc({
  id: "d041f1cc804ecbe4a9b42c9c8b06f2a4bc705b00c478b5da89685561c4fae43f",
  name: "getPercentileBenchmark",
  filename: "src/lib/percentileBenchmark.functions.ts"
}, (opts) => getPercentileBenchmark.__executeServer(opts));
const getPercentileBenchmark = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(getPercentileBenchmark_createServerFn_handler, async ({
  data
}) => {
  const supabase = serverPublicClient();
  const streamKey = (data.stream ?? "all").trim() || "all";
  const values = projectDimensions(data.traitScores ?? {});
  const dims = Object.keys(values);
  const {
    data: streamRows
  } = await supabase.from("ce_percentile_snapshots").select("*").eq("stream", streamKey);
  const {
    data: allRows
  } = await supabase.from("ce_percentile_snapshots").select("*").eq("stream", "all");
  const byDim = /* @__PURE__ */ new Map();
  for (const row of allRows ?? []) {
    byDim.set(row.dimension, {
      cdf: row.cdf ?? [],
      sample: row.sample_size,
      refreshed: row.refreshed_at,
      streamUsed: "all"
    });
  }
  for (const row of streamRows ?? []) {
    if ((row.sample_size ?? 0) >= 100) {
      byDim.set(row.dimension, {
        cdf: row.cdf ?? [],
        sample: row.sample_size,
        refreshed: row.refreshed_at,
        streamUsed: streamKey
      });
    }
  }
  const totalSample = Math.max(...Array.from(byDim.values()).map((v) => v.sample), 0);
  if (byDim.size === 0 || totalSample < 20) {
    return {
      rows: [],
      hidden: true
    };
  }
  const rows = dims.map((d) => {
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
      distribution: snap.cdf
    };
  }).filter((r) => r !== null);
  return {
    rows,
    hidden: rows.length === 0
  };
});
function computeCdf(values) {
  if (values.length === 0) return [];
  const sorted = [...values].sort((a, b) => a - b);
  const cdf = [];
  for (let p = 0; p <= 100; p += 5) {
    const idx = Math.min(sorted.length - 1, Math.floor(p / 100 * (sorted.length - 1)));
    cdf.push(sorted[idx]);
  }
  return cdf;
}
const refreshPercentileSnapshots_createServerFn_handler = createServerRpc({
  id: "f3ee55de12e3eb1fa27eabfe3cc945f779a39efbf0f7bd05bf4b0281f4216394",
  name: "refreshPercentileSnapshots",
  filename: "src/lib/percentileBenchmark.functions.ts"
}, (opts) => refreshPercentileSnapshots.__executeServer(opts));
const refreshPercentileSnapshots = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).handler(refreshPercentileSnapshots_createServerFn_handler, async ({
  context
}) => {
  const {
    data: isAdmin
  } = await context.supabase.rpc("has_role", {
    _user_id: context.userId,
    _role: "admin"
  });
  if (!isAdmin) throw new Error("Forbidden");
  const {
    supabaseAdmin
  } = await import("./client.server-DUn3rRvm.mjs");
  const since = new Date(Date.now() - 90 * 24 * 60 * 60 * 1e3).toISOString();
  const {
    data: leads,
    error
  } = await supabaseAdmin.from("career_engine_leads").select("result_payload, created_at").gte("created_at", since).not("result_payload", "is", null);
  if (error) throw error;
  const buckets = /* @__PURE__ */ new Map();
  const push = (stream, dim, v) => {
    if (!buckets.has(stream)) buckets.set(stream, /* @__PURE__ */ new Map());
    const inner = buckets.get(stream);
    if (!inner.has(dim)) inner.set(dim, []);
    inner.get(dim).push(v);
  };
  for (const lead of leads ?? []) {
    const payload = lead.result_payload ?? {};
    const traits = payload.traitScores;
    if (!traits) continue;
    const projected = projectDimensions(traits);
    const stream = (payload.profile?.stream ?? "").trim() || "all";
    for (const dim of Object.keys(projected)) {
      push("all", dim, projected[dim]);
      if (stream !== "all") push(stream, dim, projected[dim]);
    }
  }
  const upserts = [];
  const now = (/* @__PURE__ */ new Date()).toISOString();
  for (const [stream, inner] of buckets) {
    for (const [dim, values] of inner) {
      const cdf = computeCdf(values);
      if (cdf.length === 0) continue;
      upserts.push({
        stream,
        dimension: dim,
        cdf,
        sample_size: values.length,
        refreshed_at: now
      });
    }
  }
  if (upserts.length) {
    const {
      error: upErr
    } = await supabaseAdmin.from("ce_percentile_snapshots").upsert(upserts, {
      onConflict: "stream,dimension"
    });
    if (upErr) throw upErr;
  }
  return {
    streams: buckets.size,
    rowsWritten: upserts.length,
    leadsScanned: leads?.length ?? 0
  };
});
export {
  getPercentileBenchmark_createServerFn_handler,
  refreshPercentileSnapshots_createServerFn_handler
};
