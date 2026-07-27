import { c as createServerRpc } from "./createServerRpc-wV0Vk4NU.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CGVBerDj.mjs";
import { supabaseAdmin } from "./client.server-DUn3rRvm.mjs";
import { a as requireStaff } from "./auth-guards.server-Cz9eye0S.mjs";
import { c as createServerFn } from "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { p as objectType, q as stringType, x as numberType, C as arrayType } from "../_libs/zod.mjs";
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
const FUNNEL = ["exposure", "cta_click", "form_open", "form_submit", "whatsapp_click", "razorpay_open", "razorpay_success", "enrolment_paid"];
const Schema = objectType({
  experiments: arrayType(stringType().min(1).max(64)).default(["curriculum_layout_v1", "cta_timing_v1"]),
  windowDays: numberType().int().min(1).max(90).default(14),
  courseSlug: stringType().min(1).max(80).optional()
});
function normCdf(z2) {
  const t = 1 / (1 + 0.2316419 * Math.abs(z2));
  const d = 0.3989422804014327 * Math.exp(-(z2 * z2) / 2);
  const p = d * t * (0.31938153 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
  return z2 > 0 ? 1 - p : p;
}
function twoProp(a, na, b, nb) {
  if (na < 1 || nb < 1) return {
    lift: 0,
    p: 1,
    sig: false
  };
  const pa = a / na;
  const pb = b / nb;
  const pool = (a + b) / (na + nb);
  const se = Math.sqrt(pool * (1 - pool) * (1 / na + 1 / nb));
  const z2 = se ? (pb - pa) / se : 0;
  const p = 2 * (1 - normCdf(Math.abs(z2)));
  return {
    lift: pa ? (pb - pa) / pa : 0,
    p,
    sig: p < 0.05 && na >= 100 && nb >= 100
  };
}
const getCurriculumExperimentResults_createServerFn_handler = createServerRpc({
  id: "69c41417e7cb89d63cdb91ecc4180a437367ec5c5975a76c3d221ab28168a171",
  name: "getCurriculumExperimentResults",
  filename: "src/lib/curriculumExperiments.functions.ts"
}, (opts) => getCurriculumExperimentResults.__executeServer(opts));
const getCurriculumExperimentResults = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => Schema.parse(data ?? {})).handler(getCurriculumExperimentResults_createServerFn_handler, async ({
  data,
  context
}) => {
  await requireStaff(context.userId);
  const since = new Date(Date.now() - data.windowDays * 864e5).toISOString();
  let q = supabaseAdmin.from("experiment_events").select("uid, experiment, variant, event, course_slug, created_at").in("experiment", data.experiments).gte("created_at", since).order("created_at", {
    ascending: true
  }).limit(1e5);
  if (data.courseSlug) q = q.eq("course_slug", data.courseSlug);
  const {
    data: rows,
    error
  } = await q;
  if (error) throw new Error(error.message);
  const all = rows ?? [];
  const newBucket = () => Object.fromEntries(FUNNEL.map((s) => [s, /* @__PURE__ */ new Set()]));
  const groups = /* @__PURE__ */ new Map();
  for (const r of all) {
    if (!FUNNEL.includes(r.event)) continue;
    let g = groups.get(r.experiment);
    if (!g) groups.set(r.experiment, g = /* @__PURE__ */ new Map());
    let b = g.get(r.variant);
    if (!b) g.set(r.variant, b = newBucket());
    b[r.event].add(r.uid);
  }
  const days = Array.from({
    length: data.windowDays
  }, (_, i) => {
    const d = new Date(Date.now() - (data.windowDays - 1 - i) * 864e5);
    return d.toISOString().slice(0, 10);
  });
  const experimentReports = data.experiments.map((exp) => {
    const g = groups.get(exp) ?? /* @__PURE__ */ new Map();
    const variantNames = Array.from(g.keys()).sort();
    const arms = variantNames.map((variant) => {
      const b = g.get(variant);
      const counts = Object.fromEntries(FUNNEL.map((s) => [s, b[s].size]));
      const exposure = counts.exposure;
      const paid = counts.enrolment_paid;
      return {
        variant,
        isControl: variant === "control",
        counts,
        conversion: exposure ? paid / exposure : 0
      };
    });
    const control = arms.find((a) => a.isControl);
    const armsWithTest = arms.map((a) => {
      if (!control || a.isControl) return {
        ...a,
        test: null
      };
      const t = twoProp(control.counts.enrolment_paid, control.counts.exposure, a.counts.enrolment_paid, a.counts.exposure);
      return {
        ...a,
        test: t
      };
    });
    const dayBuckets = Object.fromEntries(days.map((d) => [d, {
      exposure: 0,
      paid: 0
    }]));
    for (const r of all) {
      if (r.experiment !== exp) continue;
      const k = r.created_at.slice(0, 10);
      if (!(k in dayBuckets)) continue;
      if (r.event === "exposure") dayBuckets[k].exposure++;
      else if (r.event === "enrolment_paid") dayBuckets[k].paid++;
    }
    const series = days.map((d) => ({
      date: d,
      exposure: dayBuckets[d].exposure,
      paid: dayBuckets[d].paid
    }));
    return {
      experiment: exp,
      arms: armsWithTest,
      series,
      funnel: FUNNEL
    };
  });
  return {
    windowDays: data.windowDays,
    courseSlug: data.courseSlug ?? null,
    experiments: experimentReports
  };
});
export {
  getCurriculumExperimentResults_createServerFn_handler
};
