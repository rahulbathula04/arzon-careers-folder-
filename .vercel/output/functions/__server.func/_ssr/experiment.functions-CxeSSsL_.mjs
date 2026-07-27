import { c as createServerRpc } from "./createServerRpc-wV0Vk4NU.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CGVBerDj.mjs";
import { supabaseAdmin } from "./client.server-DUn3rRvm.mjs";
import { a as requireStaff } from "./auth-guards.server-Cz9eye0S.mjs";
import { c as createServerFn } from "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { p as objectType, x as numberType, q as stringType } from "../_libs/zod.mjs";
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
  experiment: stringType().min(1).max(64).default("sticky_cta_placement"),
  windowDays: numberType().int().min(1).max(90).default(14)
});
function normCdf(z2) {
  const t = 1 / (1 + 0.2316419 * Math.abs(z2));
  const d = 0.3989422804014327 * Math.exp(-(z2 * z2) / 2);
  const p = d * t * (0.31938153 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
  return z2 > 0 ? 1 - p : p;
}
function twoProportionTest(successA, trialsA, successB, trialsB) {
  if (trialsA < 1 || trialsB < 1) {
    return {
      lift: 0,
      z: 0,
      pValue: 1,
      ciLow: 0,
      ciHigh: 0,
      significant: false
    };
  }
  const pA = successA / trialsA;
  const pB = successB / trialsB;
  const pPool = (successA + successB) / (trialsA + trialsB);
  const se = Math.sqrt(pPool * (1 - pPool) * (1 / trialsA + 1 / trialsB));
  const z2 = se ? (pB - pA) / se : 0;
  const pValue = 2 * (1 - normCdf(Math.abs(z2)));
  const seDiff = Math.sqrt(pA * (1 - pA) / trialsA + pB * (1 - pB) / trialsB);
  const diff = pB - pA;
  const ciLow = diff - 1.96 * seDiff;
  const ciHigh = diff + 1.96 * seDiff;
  const lift = pA ? (pB - pA) / pA : 0;
  return {
    lift,
    z: z2,
    pValue,
    ciLow,
    ciHigh,
    significant: pValue < 0.05 && trialsA >= 100 && trialsB >= 100
  };
}
const getExperimentResults_createServerFn_handler = createServerRpc({
  id: "4a986f8563d5452ec6529c252949789ae60f7d2f53ec15fe0ca109067991d83b",
  name: "getExperimentResults",
  filename: "src/lib/experiment.functions.ts"
}, (opts) => getExperimentResults.__executeServer(opts));
const getExperimentResults = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((data) => Schema.parse(data ?? {})).handler(getExperimentResults_createServerFn_handler, async ({
  data,
  context
}) => {
  await requireStaff(context.userId);
  const since = new Date(Date.now() - data.windowDays * 864e5).toISOString();
  const {
    data: rows,
    error
  } = await supabaseAdmin.from("analytics_events").select("event_name, anon_id, session_id, created_at, props").gte("created_at", since).in("event_name", ["ab_assignment", "apply_cta_click", "apply_submitted"]).order("created_at", {
    ascending: true
  }).limit(5e4);
  if (error) throw new Error(error.message);
  const all = rows ?? [];
  const assignment = /* @__PURE__ */ new Map();
  const sessionVariants = /* @__PURE__ */ new Map();
  for (const r of all) {
    if (r.event_name !== "ab_assignment" || !r.anon_id) continue;
    const p = r.props ?? {};
    if (p.experiment !== data.experiment || !p.variant) continue;
    if (!assignment.has(r.anon_id)) assignment.set(r.anon_id, p.variant);
  }
  const groups = /* @__PURE__ */ new Map();
  const ensure = (v) => {
    let b = groups.get(v);
    if (!b) {
      b = {
        visitors: /* @__PURE__ */ new Set(),
        ctaClickers: /* @__PURE__ */ new Set(),
        submitters: /* @__PURE__ */ new Set(),
        ctaClicks: 0
      };
      groups.set(v, b);
    }
    return b;
  };
  for (const [anon, v] of assignment) ensure(v).visitors.add(anon);
  for (const r of all) {
    if (!r.anon_id) continue;
    const v = assignment.get(r.anon_id);
    if (!v) continue;
    const b = ensure(v);
    if (r.event_name === "apply_cta_click") {
      b.ctaClickers.add(r.anon_id);
      b.ctaClicks++;
      if (r.session_id) {
        const s = sessionVariants.get(r.session_id) ?? /* @__PURE__ */ new Set();
        const cv = (r.props ?? {}).experiment_variant;
        if (cv) s.add(cv);
        s.add(v);
        sessionVariants.set(r.session_id, s);
      }
    } else if (r.event_name === "apply_submitted") {
      b.submitters.add(r.anon_id);
    }
  }
  const driftSessions = [];
  for (const [sid, set] of sessionVariants) {
    if (set.size > 1) driftSessions.push({
      sessionId: sid,
      variants: [...set]
    });
  }
  const variants = [...groups.keys()].sort();
  const controlKey = variants.includes("control") ? "control" : variants[0];
  const control = controlKey ? groups.get(controlKey) : null;
  const arms = variants.map((v) => {
    const b = groups.get(v);
    const visitors = b.visitors.size;
    const ctaClickers = b.ctaClickers.size;
    const submitters = b.submitters.size;
    const ctr = visitors ? ctaClickers / visitors : 0;
    const submitRate = ctaClickers ? submitters / ctaClickers : 0;
    const test = control && controlKey && v !== controlKey ? twoProportionTest(control.ctaClickers.size, control.visitors.size, ctaClickers, visitors) : null;
    return {
      variant: v,
      isControl: v === controlKey,
      visitors,
      ctaClicks: b.ctaClicks,
      ctaClickers,
      submitters,
      ctr,
      submitRate,
      test
    };
  });
  return {
    experiment: data.experiment,
    windowDays: data.windowDays,
    arms,
    drift: {
      offendingSessions: driftSessions.slice(0, 50),
      totalOffending: driftSessions.length
    }
  };
});
export {
  getExperimentResults_createServerFn_handler
};
