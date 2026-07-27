import { c as createServerRpc } from "./createServerRpc-wV0Vk4NU.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CGVBerDj.mjs";
import { supabaseAdmin } from "./client.server-DUn3rRvm.mjs";
import { a as requireStaff } from "./auth-guards.server-Cz9eye0S.mjs";
import { c as createServerFn } from "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { p as objectType, q as stringType, x as numberType } from "../_libs/zod.mjs";
import "../_libs/supabase__supabase-js.mjs";
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
const Schema = objectType({
  cutoverISO: stringType().min(1),
  windowDays: numberType().int().min(1).max(90).default(14),
  experiment: stringType().max(64).default("sticky_cta_placement")
});
function bucket(rows) {
  const visitors = /* @__PURE__ */ new Set();
  const ctaClickers = /* @__PURE__ */ new Set();
  const submitters = /* @__PURE__ */ new Set();
  let ctaClicks = 0;
  let submits = 0;
  let domainGridHits = 0;
  let dwellNoCta = 0;
  let searchKeypress = 0;
  const scrollDepth = {};
  for (const r of rows) {
    if (r.anon_id) visitors.add(r.anon_id);
    switch (r.event_name) {
      case "apply_cta_click":
        ctaClicks++;
        if (r.anon_id) ctaClickers.add(r.anon_id);
        break;
      case "apply_submitted":
        submits++;
        if (r.anon_id) submitters.add(r.anon_id);
        break;
      case "home_domain_grid_search_signal":
        domainGridHits++;
        break;
      case "home_dwell_no_cta":
        dwellNoCta++;
        break;
      case "home_search_keypress":
        searchKeypress++;
        break;
      case "home_scroll_depth": {
        const d = String(r.props?.depth ?? "?");
        scrollDepth[d] = (scrollDepth[d] ?? 0) + 1;
        break;
      }
    }
  }
  const v = visitors.size || 1;
  return {
    visitors: visitors.size,
    ctaClicks,
    ctaClickers: ctaClickers.size,
    ctaClickRate: ctaClickers.size / v,
    submits,
    submitters: submitters.size,
    ctaToSubmitRate: ctaClickers.size ? submitters.size / ctaClickers.size : 0,
    domainGridHits,
    dwellNoCta,
    searchKeypress,
    scrollDepth
  };
}
function variantBucket(rows, experiment) {
  const assignments = /* @__PURE__ */ new Map();
  for (const r of rows) {
    if (r.event_name !== "ab_assignment") continue;
    const p = r.props ?? {};
    if (p.experiment !== experiment || !r.anon_id || !p.variant) continue;
    if (!assignments.has(r.anon_id)) assignments.set(r.anon_id, p.variant);
  }
  const groups = {};
  const ctaSeen = {};
  const submitSeen = {};
  const visitorSeen = {};
  for (const [anon, variant] of assignments) {
    visitorSeen[variant] ??= /* @__PURE__ */ new Set();
    visitorSeen[variant].add(anon);
  }
  for (const r of rows) {
    if (!r.anon_id) continue;
    const v = assignments.get(r.anon_id);
    if (!v) continue;
    if (r.event_name === "apply_cta_click") {
      ctaSeen[v] ??= /* @__PURE__ */ new Set();
      ctaSeen[v].add(r.anon_id);
    } else if (r.event_name === "apply_submitted") {
      submitSeen[v] ??= /* @__PURE__ */ new Set();
      submitSeen[v].add(r.anon_id);
    }
  }
  for (const v of Object.keys(visitorSeen)) {
    groups[v] = {
      visitors: visitorSeen[v].size,
      ctaClickers: ctaSeen[v]?.size ?? 0,
      submitters: submitSeen[v]?.size ?? 0
    };
  }
  return groups;
}
const getDomainGridMetrics_createServerFn_handler = createServerRpc({
  id: "c83da84564b2feda11fe88ba7a3e8a4a7dacc3927fee34d33e1b131e84ab1e13",
  name: "getDomainGridMetrics",
  filename: "src/lib/metrics.functions.ts"
}, (opts) => getDomainGridMetrics.__executeServer(opts));
const getDomainGridMetrics = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((data) => Schema.parse(data ?? {})).handler(getDomainGridMetrics_createServerFn_handler, async ({
  data,
  context
}) => {
  await requireStaff(context.userId);
  const cutover = new Date(data.cutoverISO);
  const ms = data.windowDays * 864e5;
  const beforeStart = new Date(cutover.getTime() - ms).toISOString();
  const afterEnd = new Date(cutover.getTime() + ms).toISOString();
  const {
    data: rows,
    error
  } = await supabaseAdmin.from("analytics_events").select("event_name, anon_id, created_at, props").gte("created_at", beforeStart).lte("created_at", afterEnd).limit(1e5);
  if (error) throw new Error(error.message);
  const all = rows ?? [];
  const cutISO = cutover.toISOString();
  const before = all.filter((r) => r.created_at < cutISO);
  const after = all.filter((r) => r.created_at >= cutISO);
  return {
    window: {
      beforeStart,
      cutover: cutISO,
      afterEnd,
      days: data.windowDays
    },
    before: bucket(before),
    after: bucket(after),
    experiment: {
      key: data.experiment,
      variants: variantBucket(after, data.experiment)
    }
  };
});
const FunnelSchema = objectType({
  sinceISO: stringType().min(1)
});
const getApplyFunnel_createServerFn_handler = createServerRpc({
  id: "e980f9e0d0d9887b7ac1705c01f14f5bfd92b741068390a00347704efe96edb2",
  name: "getApplyFunnel",
  filename: "src/lib/metrics.functions.ts"
}, (opts) => getApplyFunnel.__executeServer(opts));
const getApplyFunnel = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((data) => FunnelSchema.parse(data)).handler(getApplyFunnel_createServerFn_handler, async ({
  data,
  context
}) => {
  await requireStaff(context.userId);
  const {
    data: rows,
    error
  } = await supabaseAdmin.from("vw_apply_funnel_sessions").select("session_id, surface, assigned_variant, reached_form, reached_submit, cta_at").gte("cta_at", data.sinceISO).limit(5e4);
  if (error) throw new Error(error.message);
  const total = rows?.length ?? 0;
  let reachedForm = 0;
  let reachedSubmit = 0;
  const bySurface = /* @__PURE__ */ new Map();
  const byVariant = /* @__PURE__ */ new Map();
  for (const r of rows ?? []) {
    if (r.reached_form) reachedForm++;
    if (r.reached_submit) reachedSubmit++;
    const s = r.surface ?? "unknown";
    const sb = bySurface.get(s) ?? {
      cta: 0,
      form: 0,
      submit: 0
    };
    sb.cta++;
    if (r.reached_form) sb.form++;
    if (r.reached_submit) sb.submit++;
    bySurface.set(s, sb);
    const v = r.assigned_variant ?? "unassigned";
    const vb = byVariant.get(v) ?? {
      cta: 0,
      form: 0,
      submit: 0
    };
    vb.cta++;
    if (r.reached_form) vb.form++;
    if (r.reached_submit) vb.submit++;
    byVariant.set(v, vb);
  }
  return {
    total,
    reachedForm,
    reachedSubmit,
    ctaToFormRate: total ? reachedForm / total : 0,
    ctaToSubmitRate: total ? reachedSubmit / total : 0,
    bySurface: [...bySurface.entries()].map(([surface, v]) => ({
      surface,
      ...v
    })),
    byVariant: [...byVariant.entries()].map(([variant, v]) => ({
      variant,
      ...v
    }))
  };
});
export {
  getApplyFunnel_createServerFn_handler,
  getDomainGridMetrics_createServerFn_handler
};
