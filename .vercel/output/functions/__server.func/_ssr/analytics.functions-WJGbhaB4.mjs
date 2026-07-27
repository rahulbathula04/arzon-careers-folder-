import { c as createServerRpc } from "./createServerRpc-wV0Vk4NU.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CGVBerDj.mjs";
import { h as hashIp } from "./analytics.server-CrqWaWZN.mjs";
import { a as requireStaff } from "./auth-guards.server-Cz9eye0S.mjs";
import { r as redis } from "./redis.server-jD5sLB4g.mjs";
import { c as checkRateLimit } from "./ratelimit.server-Bh_u6tnu.mjs";
import { c as createServerFn, g as getRequestHeader, a as getRequestIP$1 } from "./server-BKkhNWog.mjs";
import { supabaseAdmin } from "./client.server-DUn3rRvm.mjs";
import "../_libs/upstash__redis.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { p as objectType, z as recordType, q as stringType, A as unknownType, x as numberType } from "../_libs/zod.mjs";
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
import "crypto";
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
import "../_libs/isbot.mjs";
import "../_libs/uncrypto.mjs";
import "node:crypto";
async function withCache(key, ttlSeconds, fetcher) {
  if (!process.env.UPSTASH_REDIS_REST_URL) {
    return fetcher();
  }
  try {
    const cached = await redis.get(key);
    if (cached !== null) {
      return cached;
    }
  } catch (err) {
    console.warn(`[cache] Failed to GET key "${key}":`, err);
  }
  const fresh = await fetcher();
  try {
    await redis.set(key, fresh, { ex: ttlSeconds });
  } catch (err) {
    console.warn(`[cache] Failed to SET key "${key}":`, err);
  }
  return fresh;
}
const TrackSchema = objectType({
  event_name: stringType().min(1).max(64),
  anon_id: stringType().uuid().optional().nullable(),
  session_id: stringType().uuid().optional().nullable(),
  application_id: stringType().uuid().optional().nullable(),
  lead_id: stringType().uuid().optional().nullable(),
  path: stringType().max(256).optional().nullable(),
  referrer: stringType().max(256).optional().nullable(),
  utm_source: stringType().max(64).optional().nullable(),
  program_slug: stringType().max(80).optional().nullable(),
  cohort: stringType().max(64).optional().nullable(),
  props: recordType(stringType(), unknownType()).optional()
});
const trackEvent_createServerFn_handler = createServerRpc({
  id: "39a0417704f811794703987a71b321d62c2696baad2dc944fcb08205fb9476df",
  name: "trackEvent",
  filename: "src/lib/analytics.functions.ts"
}, (opts) => trackEvent.__executeServer(opts));
const trackEvent = createServerFn({
  method: "POST"
}).inputValidator((data) => {
  const r = TrackSchema.safeParse(data);
  return r.success ? r.data : null;
}).handler(trackEvent_createServerFn_handler, async ({
  data
}) => {
  if (!data) return {
    ok: true
  };
  try {
    const ua = getRequestHeader("user-agent") ?? void 0;
    const ip = getRequestIP$1({
      xForwardedFor: true
    }) || "unknown";
    const rl = await checkRateLimit(ip, "track_event", 100, 60);
    if (!rl.success) {
      console.warn(`[analytics] Rate limit exceeded for IP ${ip}`);
      return {
        ok: true
      };
    }
    const eventPayload = {
      p_event_name: data.event_name,
      p_anon_id: data.anon_id ?? void 0,
      p_session_id: data.session_id ?? void 0,
      p_application_id: data.application_id ?? void 0,
      p_lead_id: data.lead_id ?? void 0,
      p_path: data.path ?? void 0,
      p_referrer: data.referrer ?? void 0,
      p_utm_source: data.utm_source ?? void 0,
      p_program_slug: data.program_slug ?? void 0,
      p_cohort: data.cohort ?? void 0,
      p_props: data.props ?? {},
      p_user_agent: ua,
      p_ip_hash: hashIp(ip) ?? void 0,
      _timestamp: (/* @__PURE__ */ new Date()).toISOString()
      // Injected for buffer processing
    };
    if (process.env.UPSTASH_REDIS_REST_URL) {
      await redis.lpush("buffer:analytics_events", eventPayload);
    } else {
      await supabaseAdmin.rpc("track_event", eventPayload);
    }
  } catch (err) {
    console.error("[analytics] trackEvent failed", err);
  }
  return {
    ok: true
  };
});
const FunnelSchema = objectType({
  fromDays: numberType().int().min(1).max(365).optional(),
  utm_source: stringType().max(64).optional(),
  program_slug: stringType().max(80).optional()
});
function uniqueAnons(rows, event) {
  const out = /* @__PURE__ */ new Set();
  for (const r of rows) if (r.event_name === event && r.anon_id) out.add(r.anon_id);
  return out;
}
function countEvents(rows, event) {
  let n = 0;
  for (const r of rows) if (r.event_name === event) n++;
  return n;
}
const getFunnel_createServerFn_handler = createServerRpc({
  id: "3c29fca30de0f7d71f6a255060add7718a14707c7c777f21ba6f49b077035149",
  name: "getFunnel",
  filename: "src/lib/analytics.functions.ts"
}, (opts) => getFunnel.__executeServer(opts));
const getFunnel = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((data) => FunnelSchema.parse(data ?? {})).handler(getFunnel_createServerFn_handler, async ({
  data,
  context
}) => {
  await requireStaff(context.userId);
  const cacheKey = `analytics:funnel:${data.fromDays ?? 30}:${data.utm_source ?? "all"}:${data.program_slug ?? "all"}`;
  return withCache(cacheKey, 300, async () => {
    const since = new Date(Date.now() - (data.fromDays ?? 30) * 864e5).toISOString();
    let q = supabaseAdmin.from("analytics_events").select("event_name, anon_id, application_id, lead_id, path, utm_source, program_slug, created_at, props").gte("created_at", since).order("created_at", {
      ascending: false
    }).limit(5e4);
    if (data.utm_source) q = q.eq("utm_source", data.utm_source);
    if (data.program_slug) q = q.eq("program_slug", data.program_slug);
    const {
      data: rows,
      error
    } = await q;
    if (error) throw new Error(error.message);
    const events = rows ?? [];
    const quizSteps = ["quiz_started", "quiz_completed", "lead_submitted"];
    const applySteps = ["apply_started", "apply_programme_selected", "apply_submitted", "apply_success_viewed"];
    const adminSteps = ["apply_submitted", "admin_application_viewed", "admin_application_status_changed"];
    const paymentSteps = ["enrol_intent_created", "checkout_started", "payment_started", "payment_success"];
    function buildFunnel(steps) {
      return steps.map((s) => ({
        step: s,
        users: uniqueAnons(events, s).size,
        events: countEvents(events, s)
      }));
    }
    const whatsappBySource = {};
    let whatsappTotal = 0;
    for (const r of events) {
      if (r.event_name !== "whatsapp_click") continue;
      whatsappTotal++;
      const src = (r.props && typeof r.props === "object" ? r.props.source : void 0) ?? "unknown";
      whatsappBySource[src] = (whatsappBySource[src] ?? 0) + 1;
    }
    const paymentFailures = countEvents(events, "payment_failure") + countEvents(events, "payment_failed") + countEvents(events, "payment_cancelled");
    return {
      since,
      total: events.length,
      quiz: buildFunnel(quizSteps),
      apply: buildFunnel(applySteps),
      admin: buildFunnel(adminSteps),
      payment: buildFunnel(paymentSteps),
      whatsapp: {
        total_clicks: whatsappTotal,
        unique_users: uniqueAnons(events, "whatsapp_click").size,
        by_source: whatsappBySource
      },
      payment_outcomes: {
        success: countEvents(events, "payment_success"),
        failure: paymentFailures
      }
    };
  });
});
const getRecentEvents_createServerFn_handler = createServerRpc({
  id: "d9f5ca7dbe41852cd55ccffc85669ee3be9e876632c24521c6f7af9c001c93cf",
  name: "getRecentEvents",
  filename: "src/lib/analytics.functions.ts"
}, (opts) => getRecentEvents.__executeServer(opts));
const getRecentEvents = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(getRecentEvents_createServerFn_handler, async ({
  context
}) => {
  await requireStaff(context.userId);
  const {
    data,
    error
  } = await supabaseAdmin.from("analytics_events").select("id, created_at, event_name, anon_id, path, program_slug, application_id, lead_id, utm_source, props").order("created_at", {
    ascending: false
  }).limit(200);
  if (error) throw new Error(error.message);
  return {
    events: data ?? []
  };
});
const CONVERSION_STEPS = ["page_view", "apply_cta_click", "apply_started", "apply_profile_completed", "apply_submitted", "payment_started", "payment_success"];
const getConversionFunnel_createServerFn_handler = createServerRpc({
  id: "c65ba4535ca8c74e1c6c28e86729c8f287f251e7c255f446c0cdfa7fc6948f78",
  name: "getConversionFunnel",
  filename: "src/lib/analytics.functions.ts"
}, (opts) => getConversionFunnel.__executeServer(opts));
const getConversionFunnel = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((data) => FunnelSchema.parse(data ?? {})).handler(getConversionFunnel_createServerFn_handler, async ({
  data,
  context
}) => {
  await requireStaff(context.userId);
  const since = new Date(Date.now() - (data.fromDays ?? 30) * 864e5).toISOString();
  const {
    data: rows,
    error
  } = await supabaseAdmin.from("analytics_events").select("event_name, anon_id, created_at, props").gte("created_at", since).in("event_name", [...CONVERSION_STEPS, "whatsapp_click", "apply_whatsapp_handoff", "payment_failed"]).limit(5e4);
  if (error) throw new Error(error.message);
  const events = rows ?? [];
  const steps = CONVERSION_STEPS.map((s) => ({
    step: s,
    users: uniqueAnons(events, s).size,
    events: countEvents(events, s)
  }));
  const sparkDays = 14;
  const buckets = new Array(sparkDays).fill(0);
  const dayMs = 864e5;
  const nowDay = Math.floor(Date.now() / dayMs);
  for (const r of events) {
    if (r.event_name !== "payment_success") continue;
    const d = Math.floor(new Date(r.created_at).getTime() / dayMs);
    const idx = sparkDays - 1 - (nowDay - d);
    if (idx >= 0 && idx < sparkDays) buckets[idx]++;
  }
  return {
    since,
    steps,
    whatsapp_total: countEvents(events, "whatsapp_click"),
    whatsapp_handoff: countEvents(events, "apply_whatsapp_handoff"),
    payment_failed: countEvents(events, "payment_failed"),
    sparkline: buckets
  };
});
const ExperimentSchema = objectType({
  experiment: stringType().min(1).max(64),
  fromDays: numberType().int().min(1).max(365).optional()
});
function propString(p, k) {
  if (!p || typeof p !== "object") return null;
  const v = p[k];
  return typeof v === "string" ? v : null;
}
const getExperimentLift_createServerFn_handler = createServerRpc({
  id: "961354ebbeb96325964931171493ec5e10f3e5b4d8d3b8ee32859f54ad17f3c8",
  name: "getExperimentLift",
  filename: "src/lib/analytics.functions.ts"
}, (opts) => getExperimentLift.__executeServer(opts));
const getExperimentLift = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((data) => ExperimentSchema.parse(data ?? {})).handler(getExperimentLift_createServerFn_handler, async ({
  data,
  context
}) => {
  await requireStaff(context.userId);
  const cacheKey = `analytics:experiment_lift:${data.experiment}:${data.fromDays ?? 30}`;
  return withCache(cacheKey, 300, async () => {
    const since = new Date(Date.now() - (data.fromDays ?? 30) * 864e5).toISOString();
    const {
      data: rows,
      error
    } = await supabaseAdmin.from("analytics_events").select("event_name, anon_id, props, created_at").gte("created_at", since).in("event_name", ["ab_assignment", "apply_submitted", "payment_success", "apply_cta_click"]).limit(8e4);
    if (error) throw new Error(error.message);
    const events = rows ?? [];
    const variantOf = /* @__PURE__ */ new Map();
    for (const r of events) {
      if (r.event_name !== "ab_assignment" || !r.anon_id) continue;
      const exp = propString(r.props, "experiment");
      const variant = propString(r.props, "variant");
      if (exp !== data.experiment || !variant) continue;
      if (!variantOf.has(r.anon_id)) variantOf.set(r.anon_id, variant);
    }
    const stats = /* @__PURE__ */ new Map();
    const ensure = (v) => {
      let s = stats.get(v);
      if (!s) {
        s = {
          assignments: 0,
          cta: /* @__PURE__ */ new Set(),
          submitted: /* @__PURE__ */ new Set(),
          paid: /* @__PURE__ */ new Set()
        };
        stats.set(v, s);
      }
      return s;
    };
    for (const [anon, v] of variantOf) {
      const s = ensure(v);
      s.assignments += 1;
    }
    for (const r of events) {
      if (!r.anon_id) continue;
      const v = variantOf.get(r.anon_id);
      if (!v) continue;
      const s = ensure(v);
      if (r.event_name === "apply_cta_click") s.cta.add(r.anon_id);
      else if (r.event_name === "apply_submitted") s.submitted.add(r.anon_id);
      else if (r.event_name === "payment_success") s.paid.add(r.anon_id);
    }
    const order = Array.from(stats.keys()).sort((a, b) => {
      if (a === "control") return -1;
      if (b === "control") return 1;
      return a.localeCompare(b);
    });
    const control = stats.get("control");
    const controlRate = control && control.assignments > 0 ? control.paid.size / control.assignments : null;
    const rowsOut = order.map((v) => {
      const s = stats.get(v);
      const rate = s.assignments > 0 ? s.paid.size / s.assignments : 0;
      const lift = controlRate && controlRate > 0 ? (rate - controlRate) / controlRate : null;
      return {
        variant: v,
        assignments: s.assignments,
        cta_clicks: s.cta.size,
        submitted: s.submitted.size,
        paid: s.paid.size,
        cvr: rate,
        lift_vs_control: lift
      };
    });
    return {
      experiment: data.experiment,
      since,
      variants: rowsOut
    };
  });
});
const DROPOFF_STEPS = ["page_view", "quiz_started", "quiz_completed", "lead_submitted", "apply_started", "apply_programme_selected", "apply_submitted", "payment_started", "payment_success"];
const getFunnelDropoff_createServerFn_handler = createServerRpc({
  id: "87f6f71f4dd451d3da8673de63ffc5b495598be85d3ab0087c9f8951e2ebb22e",
  name: "getFunnelDropoff",
  filename: "src/lib/analytics.functions.ts"
}, (opts) => getFunnelDropoff.__executeServer(opts));
const getFunnelDropoff = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((data) => FunnelSchema.parse(data ?? {})).handler(getFunnelDropoff_createServerFn_handler, async ({
  data,
  context
}) => {
  await requireStaff(context.userId);
  const cacheKey = `analytics:funnel_dropoff:${data.fromDays ?? 30}`;
  return withCache(cacheKey, 300, async () => {
    const since = new Date(Date.now() - (data.fromDays ?? 30) * 864e5).toISOString();
    const {
      data: rows,
      error
    } = await supabaseAdmin.from("analytics_events").select("event_name, anon_id, path, created_at").gte("created_at", since).in("event_name", DROPOFF_STEPS).order("created_at", {
      ascending: true
    }).limit(8e4);
    if (error) throw new Error(error.message);
    const events = rows ?? [];
    const stepUsers = Object.fromEntries(DROPOFF_STEPS.map((s) => [s, /* @__PURE__ */ new Set()]));
    const stepFirstAt = Object.fromEntries(DROPOFF_STEPS.map((s) => [s, /* @__PURE__ */ new Map()]));
    const pageViewsByAnon = /* @__PURE__ */ new Map();
    for (const r of events) {
      if (!r.anon_id) continue;
      const t = new Date(r.created_at).getTime();
      if (r.event_name === "page_view") {
        const list = pageViewsByAnon.get(r.anon_id) ?? [];
        if (r.path) list.push({
          path: r.path,
          t
        });
        pageViewsByAnon.set(r.anon_id, list);
      }
      if (DROPOFF_STEPS.includes(r.event_name)) {
        const k = r.event_name;
        stepUsers[k].add(r.anon_id);
        if (!stepFirstAt[k].has(r.anon_id)) stepFirstAt[k].set(r.anon_id, t);
      }
    }
    const HALF_HOUR = 30 * 6e4;
    const funnel = DROPOFF_STEPS.map((step, i) => {
      const users = stepUsers[step].size;
      const next = DROPOFF_STEPS[i + 1];
      const nextUsers = next ? stepUsers[next].size : null;
      const dropUsers = next ? Math.max(0, users - (nextUsers ?? 0)) : null;
      const dropRate = next && users > 0 ? Math.max(0, 1 - (nextUsers ?? 0) / users) : null;
      let medianMs = null;
      if (next) {
        const deltas = [];
        for (const anon of stepUsers[step]) {
          const a = stepFirstAt[step].get(anon);
          const b = stepFirstAt[next].get(anon);
          if (a != null && b != null && b > a) deltas.push(b - a);
        }
        if (deltas.length) {
          deltas.sort((x, y) => x - y);
          medianMs = deltas[Math.floor(deltas.length / 2)] ?? null;
        }
      }
      const exitCounts = /* @__PURE__ */ new Map();
      if (next) {
        for (const anon of stepUsers[step]) {
          if (stepUsers[next].has(anon)) continue;
          const stepAt = stepFirstAt[step].get(anon);
          if (stepAt == null) continue;
          const views = pageViewsByAnon.get(anon) ?? [];
          let last = null;
          let lastT = -Infinity;
          for (const v of views) {
            if (v.t > stepAt + HALF_HOUR) break;
            if (v.t >= stepAt - 5 * 6e4 && v.t > lastT) {
              last = v.path;
              lastT = v.t;
            }
          }
          if (last) exitCounts.set(last, (exitCounts.get(last) ?? 0) + 1);
        }
      }
      const topExits = Array.from(exitCounts.entries()).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([path, count]) => ({
        path,
        count
      }));
      return {
        step,
        users,
        drop_users: dropUsers,
        drop_rate: dropRate,
        median_to_next_ms: medianMs,
        top_exits: topExits
      };
    });
    return {
      since,
      funnel
    };
  });
});
const getWhatsAppConversion_createServerFn_handler = createServerRpc({
  id: "3e8b233ddd754a91ab6de5feb9d161a29ddf4c85a22ca10910f8a99b4e71cc46",
  name: "getWhatsAppConversion",
  filename: "src/lib/analytics.functions.ts"
}, (opts) => getWhatsAppConversion.__executeServer(opts));
const getWhatsAppConversion = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((data) => FunnelSchema.parse(data ?? {})).handler(getWhatsAppConversion_createServerFn_handler, async ({
  data,
  context
}) => {
  await requireStaff(context.userId);
  const since = new Date(Date.now() - (data.fromDays ?? 30) * 864e5).toISOString();
  const {
    data: rows,
    error
  } = await supabaseAdmin.from("analytics_events").select("event_name, anon_id, path, created_at, props").gte("created_at", since).in("event_name", ["whatsapp_click", "whatsapp_message_created", "payment_success"]).order("created_at", {
    ascending: true
  }).limit(4e4);
  if (error) throw new Error(error.message);
  const events = rows ?? [];
  const clicksByAnon = /* @__PURE__ */ new Map();
  const messageCreatedAnons = /* @__PURE__ */ new Set();
  const paidAt = /* @__PURE__ */ new Map();
  for (const r of events) {
    if (!r.anon_id) continue;
    const t = new Date(r.created_at).getTime();
    if (r.event_name === "whatsapp_click") {
      const src = propString(r.props, "source") ?? r.path ?? "unknown";
      const list = clicksByAnon.get(r.anon_id) ?? [];
      list.push({
        t,
        source: src
      });
      clicksByAnon.set(r.anon_id, list);
    } else if (r.event_name === "whatsapp_message_created") {
      messageCreatedAnons.add(r.anon_id);
    } else if (r.event_name === "payment_success") {
      if (!paidAt.has(r.anon_id)) paidAt.set(r.anon_id, t);
    }
  }
  const bySource = /* @__PURE__ */ new Map();
  const ensure = (k) => {
    let b = bySource.get(k);
    if (!b) {
      b = {
        clicks: 0,
        clickers: /* @__PURE__ */ new Set(),
        paid: /* @__PURE__ */ new Set(),
        message_created: /* @__PURE__ */ new Set()
      };
      bySource.set(k, b);
    }
    return b;
  };
  const SEVEN_DAYS = 7 * 864e5;
  let totalClicks = 0;
  const allClickers = /* @__PURE__ */ new Set();
  const allPaidClickers = /* @__PURE__ */ new Set();
  const allMsgCreated = /* @__PURE__ */ new Set();
  for (const [anon, clicks] of clicksByAnon) {
    allClickers.add(anon);
    const paidT = paidAt.get(anon);
    const wasPaidViaClick = paidT != null && clicks.some((c) => paidT >= c.t && paidT - c.t <= SEVEN_DAYS);
    if (wasPaidViaClick) allPaidClickers.add(anon);
    const msgCreated = messageCreatedAnons.has(anon);
    if (msgCreated) allMsgCreated.add(anon);
    const lastSrc = clicks[clicks.length - 1]?.source ?? "unknown";
    for (const c of clicks) {
      const b = ensure(c.source);
      b.clicks++;
      totalClicks++;
    }
    const lastB = ensure(lastSrc);
    lastB.clickers.add(anon);
    if (wasPaidViaClick) lastB.paid.add(anon);
    if (msgCreated) lastB.message_created.add(anon);
  }
  const sources = Array.from(bySource.entries()).map(([source, b]) => ({
    source,
    clicks: b.clicks,
    clickers: b.clickers.size,
    message_created: b.message_created.size,
    paid: b.paid.size,
    cvr: b.clickers.size > 0 ? b.paid.size / b.clickers.size : 0
  })).sort((a, b) => b.clickers - a.clickers);
  return {
    since,
    total_clicks: totalClicks,
    unique_clickers: allClickers.size,
    message_created: allMsgCreated.size,
    paid_within_7d: allPaidClickers.size,
    cvr: allClickers.size > 0 ? allPaidClickers.size / allClickers.size : 0,
    by_source: sources
  };
});
const SsrErrorsSchema = objectType({
  fromDays: numberType().int().min(1).max(90).optional()
});
const getSsrErrors_createServerFn_handler = createServerRpc({
  id: "450426229cf1934f598f5b5ad0bdaafee285ce98077c165e4fe0daf751eccd17",
  name: "getSsrErrors",
  filename: "src/lib/analytics.functions.ts"
}, (opts) => getSsrErrors.__executeServer(opts));
const getSsrErrors = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((data) => SsrErrorsSchema.parse(data ?? {})).handler(getSsrErrors_createServerFn_handler, async ({
  data,
  context
}) => {
  await requireStaff(context.userId);
  const days = data.fromDays ?? 7;
  const since = new Date(Date.now() - days * 864e5).toISOString();
  const {
    data: rows,
    error
  } = await supabaseAdmin.from("analytics_events").select("id, created_at, path, program_slug, props, anon_id").eq("event_name", "ssr_hydration_error").gte("created_at", since).order("created_at", {
    ascending: false
  }).limit(2e3);
  if (error) throw new Error(error.message);
  const all = rows ?? [];
  const map = /* @__PURE__ */ new Map();
  for (const r of all) {
    const props = r.props ?? {};
    const kind = String(props.kind ?? "unknown");
    const path = r.path ?? "(unknown)";
    const key = `${path}|${kind}`;
    let g = map.get(key);
    if (!g) {
      g = {
        path,
        kind,
        slug: r.program_slug,
        total: 0,
        unique_users: 0,
        last_seen: r.created_at,
        sample_message: String(props.message ?? ""),
        _users: /* @__PURE__ */ new Set()
      };
      map.set(key, g);
    }
    g.total += 1;
    if (r.anon_id) g._users.add(r.anon_id);
    if (r.created_at > g.last_seen) g.last_seen = r.created_at;
    if (!g.sample_message && props.message) g.sample_message = String(props.message);
  }
  const groups = [...map.values()].map(({
    _users,
    ...g
  }) => ({
    ...g,
    unique_users: _users.size
  })).sort((a, b) => b.total - a.total);
  const buckets = [];
  const now = /* @__PURE__ */ new Date();
  for (let i = 23; i >= 0; i--) {
    const t = new Date(now);
    t.setUTCMinutes(0, 0, 0);
    t.setUTCHours(now.getUTCHours() - i);
    buckets.push({
      hour: t.toISOString(),
      count: 0
    });
  }
  const horizon = Date.now() - 24 * 36e5;
  for (const r of all) {
    const t = Date.parse(r.created_at);
    if (!Number.isFinite(t) || t < horizon) continue;
    const hour = new Date(t);
    hour.setUTCMinutes(0, 0, 0);
    const iso = hour.toISOString();
    const b = buckets.find((x) => x.hour === iso);
    if (b) b.count += 1;
  }
  return {
    since,
    total: all.length,
    groups,
    sparkline24h: buckets,
    recent: all.slice(0, 50).map((r) => ({
      id: r.id,
      at: r.created_at,
      path: r.path,
      slug: r.program_slug,
      kind: String((r.props ?? {}).kind ?? "unknown"),
      source: String((r.props ?? {}).source ?? ""),
      message: String((r.props ?? {}).message ?? "")
    }))
  };
});
const CE_FUNNEL_STEPS = ["ce_test_viewed", "ce_lead_form_viewed", "lead_submitted", "payment_started", "payment_success"];
const CE_FAILURE_EVENTS = ["lead_form_validation_error", "test_timeout", "payment_failed", "razorpay_verify_failed"];
const getCareerEngineFunnel_createServerFn_handler = createServerRpc({
  id: "2e7b552e0fcd7f1c3e4d64a5f756d2ab0099591de70fd8d1f15aaf127e1b8451",
  name: "getCareerEngineFunnel",
  filename: "src/lib/analytics.functions.ts"
}, (opts) => getCareerEngineFunnel.__executeServer(opts));
const getCareerEngineFunnel = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((data) => FunnelSchema.parse(data ?? {})).handler(getCareerEngineFunnel_createServerFn_handler, async ({
  data,
  context
}) => {
  await requireStaff(context.userId);
  const cacheKey = `analytics:career_engine_funnel:${data.fromDays ?? 30}`;
  return withCache(cacheKey, 300, async () => {
    const since = new Date(Date.now() - (data.fromDays ?? 30) * 864e5).toISOString();
    const {
      data: rows,
      error
    } = await supabaseAdmin.from("analytics_events").select("event_name, anon_id, utm_source, created_at, props").gte("created_at", since).in("event_name", [...CE_FUNNEL_STEPS, ...CE_FAILURE_EVENTS]).limit(8e4);
    if (error) throw new Error(error.message);
    const events = rows ?? [];
    const steps = CE_FUNNEL_STEPS.map((s, i) => {
      const users = uniqueAnons(events, s).size;
      const eventsCount = countEvents(events, s);
      const prevUsers = i > 0 ? uniqueAnons(events, CE_FUNNEL_STEPS[i - 1]).size : null;
      const dropUsers = prevUsers !== null ? Math.max(0, prevUsers - users) : null;
      const dropRate = prevUsers && prevUsers > 0 ? Math.max(0, 1 - users / prevUsers) : null;
      return {
        step: s,
        users,
        events: eventsCount,
        drop_users: dropUsers,
        drop_rate: dropRate
      };
    });
    const lastStepByAnon = /* @__PURE__ */ new Map();
    for (const r of events) {
      if (!r.anon_id) continue;
      if (!CE_FUNNEL_STEPS.includes(r.event_name)) continue;
      lastStepByAnon.set(r.anon_id, r.event_name);
    }
    const exitCounts = {};
    for (const s of CE_FUNNEL_STEPS) exitCounts[s] = 0;
    for (const last of lastStepByAnon.values()) {
      if (last === "payment_success") continue;
      exitCounts[last] = (exitCounts[last] ?? 0) + 1;
    }
    const failures = {};
    for (const f of CE_FAILURE_EVENTS) failures[f] = countEvents(events, f);
    const utmCounts = /* @__PURE__ */ new Map();
    const ensure = (k) => {
      let v = utmCounts.get(k);
      if (!v) {
        v = {
          reached: /* @__PURE__ */ new Set(),
          paid: /* @__PURE__ */ new Set()
        };
        utmCounts.set(k, v);
      }
      return v;
    };
    for (const r of events) {
      if (!r.anon_id) continue;
      const src = r.utm_source ?? "(direct)";
      if (r.event_name === "ce_test_viewed") ensure(src).reached.add(r.anon_id);
      if (r.event_name === "payment_success") ensure(src).paid.add(r.anon_id);
    }
    const utm = Array.from(utmCounts.entries()).map(([source, v]) => ({
      source,
      reached: v.reached.size,
      paid: v.paid.size,
      cvr: v.reached.size > 0 ? v.paid.size / v.reached.size : 0
    })).sort((a, b) => b.reached - a.reached).slice(0, 12);
    const top = steps[0]?.users ?? 0;
    const bottom = steps[steps.length - 1]?.users ?? 0;
    const overallCvr = top > 0 ? bottom / top : 0;
    return {
      since,
      overall_cvr: overallCvr,
      steps,
      exit_counts: exitCounts,
      failures,
      utm
    };
  });
});
export {
  getCareerEngineFunnel_createServerFn_handler,
  getConversionFunnel_createServerFn_handler,
  getExperimentLift_createServerFn_handler,
  getFunnelDropoff_createServerFn_handler,
  getFunnel_createServerFn_handler,
  getRecentEvents_createServerFn_handler,
  getSsrErrors_createServerFn_handler,
  getWhatsAppConversion_createServerFn_handler,
  trackEvent_createServerFn_handler
};
