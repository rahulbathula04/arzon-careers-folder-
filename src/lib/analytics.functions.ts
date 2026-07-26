import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader, getRequestIP } from "@tanstack/react-start/server";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { hashIp, supabaseAdmin } from "@/server/analytics.server";
import { requireStaff } from "@/server/auth-guards.server";
import { withCache } from "@/server/cache.server";

import { redis } from "@/lib/redis.server";
import { checkRateLimit } from "@/server/ratelimit.server";

const TrackSchema = z.object({
  event_name: z.string().min(1).max(64),
  anon_id: z.string().uuid().optional().nullable(),
  session_id: z.string().uuid().optional().nullable(),
  application_id: z.string().uuid().optional().nullable(),
  lead_id: z.string().uuid().optional().nullable(),
  path: z.string().max(256).optional().nullable(),
  referrer: z.string().max(256).optional().nullable(),
  utm_source: z.string().max(64).optional().nullable(),
  program_slug: z.string().max(80).optional().nullable(),
  cohort: z.string().max(64).optional().nullable(),
  props: z.record(z.string(), z.unknown()).optional(),
});

/**
 * Public tracker. Always returns ok:true so analytics never breaks the UX.
 */
export const trackEvent = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => {
    const r = TrackSchema.safeParse(data);
    return r.success ? r.data : null;
  })
  .handler(async ({ data }) => {
    if (!data) return { ok: true };
    try {
      const ua = getRequestHeader("user-agent") ?? undefined;
      const ip = getRequestIP({ xForwardedFor: true }) || "unknown";

      // Rate Limit: 100 analytics events per minute per IP
      const rl = await checkRateLimit(ip, "track_event", 100, 60);
      if (!rl.success) {
        console.warn(`[analytics] Rate limit exceeded for IP ${ip}`);
        return { ok: true }; // Silent drop
      }

      const eventPayload = {
        p_event_name: data.event_name,
        p_anon_id: data.anon_id ?? undefined,
        p_session_id: data.session_id ?? undefined,
        p_application_id: data.application_id ?? undefined,
        p_lead_id: data.lead_id ?? undefined,
        p_path: data.path ?? undefined,
        p_referrer: data.referrer ?? undefined,
        p_utm_source: data.utm_source ?? undefined,
        p_program_slug: data.program_slug ?? undefined,
        p_cohort: data.cohort ?? undefined,
        p_props: (data.props ?? {}) as any,
        p_user_agent: ua,
        p_ip_hash: hashIp(ip) ?? undefined,
        _timestamp: new Date().toISOString(), // Injected for buffer processing
      };

      if (process.env.UPSTASH_REDIS_REST_URL) {
        // O(1) buffer push
        await redis.lpush("buffer:analytics_events", eventPayload);
      } else {
        // Fallback to direct DB write if Redis is unavailable locally
        await supabaseAdmin.rpc("track_event", eventPayload);
      }
    } catch (err) {
      console.error("[analytics] trackEvent failed", err);
    }
    return { ok: true };
  });

const FunnelSchema = z.object({
  fromDays: z.number().int().min(1).max(365).optional(),
  utm_source: z.string().max(64).optional(),
  program_slug: z.string().max(80).optional(),
});

type EventRow = {
  event_name: string;
  anon_id: string | null;
  application_id: string | null;
  lead_id: string | null;
  path: string | null;
  utm_source: string | null;
  program_slug: string | null;
  created_at: string;
  props: Record<string, unknown> | null;
};

function uniqueAnons(rows: EventRow[], event: string): Set<string> {
  const out = new Set<string>();
  for (const r of rows) if (r.event_name === event && r.anon_id) out.add(r.anon_id);
  return out;
}
function countEvents(rows: EventRow[], event: string): number {
  let n = 0;
  for (const r of rows) if (r.event_name === event) n++;
  return n;
}

export const getFunnel = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => FunnelSchema.parse(data ?? {}))
  .handler(async ({ data, context }) => {
    await requireStaff(context.userId);

    const cacheKey = `analytics:funnel:${data.fromDays ?? 30}:${data.utm_source ?? "all"}:${data.program_slug ?? "all"}`;

    return withCache(cacheKey, 300, async () => {
      const since = new Date(Date.now() - (data.fromDays ?? 30) * 86_400_000).toISOString();
      let q = supabaseAdmin
        .from("analytics_events")
        .select(
          "event_name, anon_id, application_id, lead_id, path, utm_source, program_slug, created_at, props",
        )
        .gte("created_at", since)
        .order("created_at", { ascending: false })
        .limit(50_000);
      if (data.utm_source) q = q.eq("utm_source", data.utm_source);
      if (data.program_slug) q = q.eq("program_slug", data.program_slug);
      const { data: rows, error } = await q;
      if (error) throw new Error(error.message);
      const events = (rows ?? []) as EventRow[];

      const quizSteps = ["quiz_started", "quiz_completed", "lead_submitted"];
      const applySteps = [
        "apply_started",
        "apply_programme_selected",
        "apply_submitted",
        "apply_success_viewed",
      ];
      const adminSteps = [
        "apply_submitted",
        "admin_application_viewed",
        "admin_application_status_changed",
      ];
      const paymentSteps = [
        "enrol_intent_created",
        "checkout_started",
        "payment_started",
        "payment_success",
      ];

      function buildFunnel(steps: string[]) {
        return steps.map((s) => ({
          step: s,
          users: uniqueAnons(events, s).size,
          events: countEvents(events, s),
        }));
      }

      const whatsappBySource: Record<string, number> = {};
      let whatsappTotal = 0;
      for (const r of events) {
        if (r.event_name !== "whatsapp_click") continue;
        whatsappTotal++;
        const src =
          (r.props && typeof r.props === "object"
            ? (r.props as { source?: string }).source
            : undefined) ?? "unknown";
        whatsappBySource[src] = (whatsappBySource[src] ?? 0) + 1;
      }
      const paymentFailures =
        countEvents(events, "payment_failure") +
        countEvents(events, "payment_failed") +
        countEvents(events, "payment_cancelled");

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
          by_source: whatsappBySource,
        },
        payment_outcomes: {
          success: countEvents(events, "payment_success"),
          failure: paymentFailures,
        },
      };
    });
  });

export const getRecentEvents = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await requireStaff(context.userId);

    const { data, error } = await supabaseAdmin
      .from("analytics_events")
      .select(
        "id, created_at, event_name, anon_id, path, program_slug, application_id, lead_id, utm_source, props",
      )
      .order("created_at", { ascending: false })
      .limit(200);
    if (error) throw new Error(error.message);
    return { events: data ?? [] };
  });

/* ────────────────────────────────────────────────────────────────────────────
 * Conversion dashboard
 * Deduped funnel from page-view → apply_started → apply_submitted →
 * payment_started → payment_success, plus side counters for WhatsApp and
 * a per-experiment lift table for A/B analysis.
 * ──────────────────────────────────────────────────────────────────────── */

const CONVERSION_STEPS = [
  "page_view",
  "apply_cta_click",
  "apply_started",
  "apply_profile_completed",
  "apply_submitted",
  "payment_started",
  "payment_success",
] as const;

export const getConversionFunnel = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => FunnelSchema.parse(data ?? {}))
  .handler(async ({ data, context }) => {
    await requireStaff(context.userId);
    const since = new Date(Date.now() - (data.fromDays ?? 30) * 86_400_000).toISOString();
    const { data: rows, error } = await supabaseAdmin
      .from("analytics_events")
      .select("event_name, anon_id, created_at, props")
      .gte("created_at", since)
      .in("event_name", [
        ...CONVERSION_STEPS,
        "whatsapp_click",
        "apply_whatsapp_handoff",
        "payment_failed",
      ])
      .limit(50_000);
    if (error) throw new Error(error.message);
    const events = (rows ?? []) as EventRow[];

    const steps = CONVERSION_STEPS.map((s) => ({
      step: s,
      users: uniqueAnons(events, s).size,
      events: countEvents(events, s),
    }));

    // 14-day sparkline of payment_success counts.
    const sparkDays = 14;
    const buckets: number[] = new Array(sparkDays).fill(0);
    const dayMs = 86_400_000;
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
      sparkline: buckets,
    };
  });

const ExperimentSchema = z.object({
  experiment: z.string().min(1).max(64),
  fromDays: z.number().int().min(1).max(365).optional(),
});

function propString(p: Record<string, unknown> | null, k: string): string | null {
  if (!p || typeof p !== "object") return null;
  const v = (p as Record<string, unknown>)[k];
  return typeof v === "string" ? v : null;
}

/**
 * Compute per-variant conversion lift for an experiment.
 * Assignment is logged once per anon via `ab_assignment` (props.experiment,
 * props.variant). Outcomes are joined on anon_id from `apply_submitted` and
 * `payment_success`.
 */
export const getExperimentLift = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => ExperimentSchema.parse(data ?? {}))
  .handler(async ({ data, context }) => {
    await requireStaff(context.userId);

    const cacheKey = `analytics:experiment_lift:${data.experiment}:${data.fromDays ?? 30}`;

    return withCache(cacheKey, 300, async () => {
      const since = new Date(Date.now() - (data.fromDays ?? 30) * 86_400_000).toISOString();
      const { data: rows, error } = await supabaseAdmin
        .from("analytics_events")
        .select("event_name, anon_id, props, created_at")
        .gte("created_at", since)
        .in("event_name", [
          "ab_assignment",
          "apply_submitted",
          "payment_success",
          "apply_cta_click",
        ])
        .limit(80_000);
      if (error) throw new Error(error.message);
      const events = (rows ?? []) as EventRow[];

      // anon_id → variant. First assignment wins (sticky per anon).
      const variantOf = new Map<string, string>();
      for (const r of events) {
        if (r.event_name !== "ab_assignment" || !r.anon_id) continue;
        const exp = propString(r.props, "experiment");
        const variant = propString(r.props, "variant");
        if (exp !== data.experiment || !variant) continue;
        if (!variantOf.has(r.anon_id)) variantOf.set(r.anon_id, variant);
      }

      // Per-variant counters.
      type Stat = {
        assignments: number;
        cta: Set<string>;
        submitted: Set<string>;
        paid: Set<string>;
      };
      const stats = new Map<string, Stat>();
      const ensure = (v: string): Stat => {
        let s = stats.get(v);
        if (!s) {
          s = { assignments: 0, cta: new Set(), submitted: new Set(), paid: new Set() };
          stats.set(v, s);
        }
        return s;
      };
      for (const [anon, v] of variantOf) {
        const s = ensure(v);
        s.assignments += 1;
        // ensure entry exists for anon even with no outcomes
        void anon;
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

      // Build sorted rows (control first when present).
      const order = Array.from(stats.keys()).sort((a, b) => {
        if (a === "control") return -1;
        if (b === "control") return 1;
        return a.localeCompare(b);
      });

      const control = stats.get("control");
      const controlRate =
        control && control.assignments > 0 ? control.paid.size / control.assignments : null;

      const rowsOut = order.map((v) => {
        const s = stats.get(v)!;
        const rate = s.assignments > 0 ? s.paid.size / s.assignments : 0;
        const lift = controlRate && controlRate > 0 ? (rate - controlRate) / controlRate : null;
        return {
          variant: v,
          assignments: s.assignments,
          cta_clicks: s.cta.size,
          submitted: s.submitted.size,
          paid: s.paid.size,
          cvr: rate,
          lift_vs_control: lift,
        };
      });

      return { experiment: data.experiment, since, variants: rowsOut };
    });
  });

/* ────────────────────────────────────────────────────────────────────────────
 * Funnel drop-off report
 * Per-step abandonment %, absolute drop, and top exit pages for the
 * canonical career-engine → apply → payment chain.
 * ──────────────────────────────────────────────────────────────────────── */

const DROPOFF_STEPS = [
  "page_view",
  "quiz_started",
  "quiz_completed",
  "lead_submitted",
  "apply_started",
  "apply_programme_selected",
  "apply_submitted",
  "payment_started",
  "payment_success",
] as const;

type DropoffStep = (typeof DROPOFF_STEPS)[number];

export const getFunnelDropoff = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => FunnelSchema.parse(data ?? {}))
  .handler(async ({ data, context }) => {
    await requireStaff(context.userId);

    const cacheKey = `analytics:funnel_dropoff:${data.fromDays ?? 30}`;

    return withCache(cacheKey, 300, async () => {
      const since = new Date(Date.now() - (data.fromDays ?? 30) * 86_400_000).toISOString();

      const { data: rows, error } = await supabaseAdmin
        .from("analytics_events")
        .select("event_name, anon_id, path, created_at")
        .gte("created_at", since)
        .in("event_name", DROPOFF_STEPS as unknown as string[])
        .order("created_at", { ascending: true })
        .limit(80_000);
      if (error) throw new Error(error.message);
      const events = (rows ?? []) as Array<{
        event_name: string;
        anon_id: string | null;
        path: string | null;
        created_at: string;
      }>;

      // Per-step unique anon sets + first-occurrence timestamp per anon.
      const stepUsers: Record<DropoffStep, Set<string>> = Object.fromEntries(
        DROPOFF_STEPS.map((s) => [s, new Set<string>()]),
      ) as Record<DropoffStep, Set<string>>;
      const stepFirstAt: Record<DropoffStep, Map<string, number>> = Object.fromEntries(
        DROPOFF_STEPS.map((s) => [s, new Map<string, number>()]),
      ) as Record<DropoffStep, Map<string, number>>;
      const pageViewsByAnon = new Map<string, Array<{ path: string; t: number }>>();

      for (const r of events) {
        if (!r.anon_id) continue;
        const t = new Date(r.created_at).getTime();
        if (r.event_name === "page_view") {
          const list = pageViewsByAnon.get(r.anon_id) ?? [];
          if (r.path) list.push({ path: r.path, t });
          pageViewsByAnon.set(r.anon_id, list);
        }
        if ((DROPOFF_STEPS as readonly string[]).includes(r.event_name)) {
          const k = r.event_name as DropoffStep;
          stepUsers[k].add(r.anon_id);
          if (!stepFirstAt[k].has(r.anon_id)) stepFirstAt[k].set(r.anon_id, t);
        }
      }

      // Build the funnel + top-exit pages per step.
      const HALF_HOUR = 30 * 60_000;
      const funnel = DROPOFF_STEPS.map((step, i) => {
        const users = stepUsers[step].size;
        const next = DROPOFF_STEPS[i + 1];
        const nextUsers = next ? stepUsers[next].size : null;
        const dropUsers = next ? Math.max(0, users - (nextUsers ?? 0)) : null;
        const dropRate = next && users > 0 ? Math.max(0, 1 - (nextUsers ?? 0) / users) : null;

        // Median time from current step to next step among completers.
        let medianMs: number | null = null;
        if (next) {
          const deltas: number[] = [];
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

        // Top exit pages: among anons who reached `step` but not `next`,
        // the last page_view path within 30 min of their step timestamp.
        const exitCounts = new Map<string, number>();
        if (next) {
          for (const anon of stepUsers[step]) {
            if (stepUsers[next].has(anon)) continue;
            const stepAt = stepFirstAt[step].get(anon);
            if (stepAt == null) continue;
            const views = pageViewsByAnon.get(anon) ?? [];
            // Pick the latest view within [stepAt - 5min, stepAt + 30min].
            let last: string | null = null;
            let lastT = -Infinity;
            for (const v of views) {
              if (v.t > stepAt + HALF_HOUR) break;
              if (v.t >= stepAt - 5 * 60_000 && v.t > lastT) {
                last = v.path;
                lastT = v.t;
              }
            }
            if (last) exitCounts.set(last, (exitCounts.get(last) ?? 0) + 1);
          }
        }
        const topExits = Array.from(exitCounts.entries())
          .sort((a, b) => b[1] - a[1])
          .slice(0, 10)
          .map(([path, count]) => ({ path, count }));

        return {
          step,
          users,
          drop_users: dropUsers,
          drop_rate: dropRate,
          median_to_next_ms: medianMs,
          top_exits: topExits,
        };
      });

      return { since, funnel };
    });
  });

/* ────────────────────────────────────────────────────────────────────────────
 * WhatsApp → Payment correlation
 * Click → payment_success within 7 days, split by click source.
 * ──────────────────────────────────────────────────────────────────────── */

export const getWhatsAppConversion = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => FunnelSchema.parse(data ?? {}))
  .handler(async ({ data, context }) => {
    await requireStaff(context.userId);
    const since = new Date(Date.now() - (data.fromDays ?? 30) * 86_400_000).toISOString();

    const { data: rows, error } = await supabaseAdmin
      .from("analytics_events")
      .select("event_name, anon_id, path, created_at, props")
      .gte("created_at", since)
      .in("event_name", ["whatsapp_click", "whatsapp_message_created", "payment_success"])
      .order("created_at", { ascending: true })
      .limit(40_000);
    if (error) throw new Error(error.message);
    const events = (rows ?? []) as EventRow[];

    type Click = { t: number; source: string };
    const clicksByAnon = new Map<string, Click[]>();
    const messageCreatedAnons = new Set<string>();
    const paidAt = new Map<string, number>();

    for (const r of events) {
      if (!r.anon_id) continue;
      const t = new Date(r.created_at).getTime();
      if (r.event_name === "whatsapp_click") {
        const src = propString(r.props, "source") ?? r.path ?? "unknown";
        const list = clicksByAnon.get(r.anon_id) ?? [];
        list.push({ t, source: src });
        clicksByAnon.set(r.anon_id, list);
      } else if (r.event_name === "whatsapp_message_created") {
        messageCreatedAnons.add(r.anon_id);
      } else if (r.event_name === "payment_success") {
        if (!paidAt.has(r.anon_id)) paidAt.set(r.anon_id, t);
      }
    }

    type Bucket = {
      clicks: number;
      clickers: Set<string>;
      paid: Set<string>;
      message_created: Set<string>;
    };
    const bySource = new Map<string, Bucket>();
    const ensure = (k: string): Bucket => {
      let b = bySource.get(k);
      if (!b) {
        b = { clicks: 0, clickers: new Set(), paid: new Set(), message_created: new Set() };
        bySource.set(k, b);
      }
      return b;
    };

    const SEVEN_DAYS = 7 * 86_400_000;
    let totalClicks = 0;
    const allClickers = new Set<string>();
    const allPaidClickers = new Set<string>();
    const allMsgCreated = new Set<string>();

    for (const [anon, clicks] of clicksByAnon) {
      allClickers.add(anon);
      const paidT = paidAt.get(anon);
      const wasPaidViaClick =
        paidT != null && clicks.some((c) => paidT >= c.t && paidT - c.t <= SEVEN_DAYS);
      if (wasPaidViaClick) allPaidClickers.add(anon);
      const msgCreated = messageCreatedAnons.has(anon);
      if (msgCreated) allMsgCreated.add(anon);
      // Bucket by the most recent click source for this anon.
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

    const sources = Array.from(bySource.entries())
      .map(([source, b]) => ({
        source,
        clicks: b.clicks,
        clickers: b.clickers.size,
        message_created: b.message_created.size,
        paid: b.paid.size,
        cvr: b.clickers.size > 0 ? b.paid.size / b.clickers.size : 0,
      }))
      .sort((a, b) => b.clickers - a.clickers);

    return {
      since,
      total_clicks: totalClicks,
      unique_clickers: allClickers.size,
      message_created: allMsgCreated.size,
      paid_within_7d: allPaidClickers.size,
      cvr: allClickers.size > 0 ? allPaidClickers.size / allClickers.size : 0,
      by_source: sources,
    };
  });

/* ────────────────────────────────────────────────────────────────────────────
 * SSR hydration / dehydration / serialization error monitor
 * Reads `ssr_hydration_error` events out of analytics_events and rolls them
 * up so the admin dashboard can see which routes are blanking, how often,
 * and what the underlying error class is (hydration_invariant /
 * missing_dehydration / hydration_mismatch / seroval_serialization).
 * ──────────────────────────────────────────────────────────────────────── */

const SsrErrorsSchema = z.object({
  fromDays: z.number().int().min(1).max(90).optional(),
});

export const getSsrErrors = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => SsrErrorsSchema.parse(data ?? {}))
  .handler(async ({ data, context }) => {
    await requireStaff(context.userId);
    const days = data.fromDays ?? 7;
    const since = new Date(Date.now() - days * 86_400_000).toISOString();
    const { data: rows, error } = await supabaseAdmin
      .from("analytics_events")
      .select("id, created_at, path, program_slug, props, anon_id")
      .eq("event_name", "ssr_hydration_error")
      .gte("created_at", since)
      .order("created_at", { ascending: false })
      .limit(2_000);
    if (error) throw new Error(error.message);
    const all = (rows ?? []) as Array<{
      id: string;
      created_at: string;
      path: string | null;
      program_slug: string | null;
      anon_id: string | null;
      props: Record<string, unknown> | null;
    }>;

    // Roll up by (path, kind) so the dashboard shows a leaderboard of the
    // worst-affected routes rather than a flat log.
    type Group = {
      path: string;
      kind: string;
      slug: string | null;
      total: number;
      unique_users: number;
      last_seen: string;
      sample_message: string;
    };
    const map = new Map<string, Group & { _users: Set<string> }>();
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
          _users: new Set<string>(),
        };
        map.set(key, g);
      }
      g.total += 1;
      if (r.anon_id) g._users.add(r.anon_id);
      if (r.created_at > g.last_seen) g.last_seen = r.created_at;
      if (!g.sample_message && props.message) g.sample_message = String(props.message);
    }
    const groups: Group[] = [...map.values()]
      .map(({ _users, ...g }) => ({ ...g, unique_users: _users.size }))
      .sort((a, b) => b.total - a.total);

    // 24h sparkline (bucket per hour) for the alerting strip at the top.
    const buckets: Array<{ hour: string; count: number }> = [];
    const now = new Date();
    for (let i = 23; i >= 0; i--) {
      const t = new Date(now);
      t.setUTCMinutes(0, 0, 0);
      t.setUTCHours(now.getUTCHours() - i);
      buckets.push({ hour: t.toISOString(), count: 0 });
    }
    const horizon = Date.now() - 24 * 3_600_000;
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
        message: String((r.props ?? {}).message ?? ""),
      })),
    };
  });

/* ────────────────────────────────────────────────────────────────────────────
 * Career Engine end-to-end funnel
 * test_viewed → lead_form_viewed → lead_submitted → payment_started → payment_success
 * plus per-step drop-off, failure-event counts, and top UTM sources.
 * ──────────────────────────────────────────────────────────────────────── */

const CE_FUNNEL_STEPS = [
  "ce_test_viewed",
  "ce_lead_form_viewed",
  "lead_submitted",
  "payment_started",
  "payment_success",
] as const;

const CE_FAILURE_EVENTS = [
  "lead_form_validation_error",
  "test_timeout",
  "payment_failed",
  "razorpay_verify_failed",
] as const;

export const getCareerEngineFunnel = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => FunnelSchema.parse(data ?? {}))
  .handler(async ({ data, context }) => {
    await requireStaff(context.userId);

    const cacheKey = `analytics:career_engine_funnel:${data.fromDays ?? 30}`;

    return withCache(cacheKey, 300, async () => {
      const since = new Date(Date.now() - (data.fromDays ?? 30) * 86_400_000).toISOString();
      const { data: rows, error } = await supabaseAdmin
        .from("analytics_events")
        .select("event_name, anon_id, utm_source, created_at, props")
        .gte("created_at", since)
        .in("event_name", [...CE_FUNNEL_STEPS, ...CE_FAILURE_EVENTS] as unknown as string[])
        .limit(80_000);
      if (error) throw new Error(error.message);
      const events = (rows ?? []) as EventRow[];

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
          drop_rate: dropRate,
        };
      });

      // Top exit step per anon: the last CE_FUNNEL_STEPS event they reached.
      const lastStepByAnon = new Map<string, string>();
      for (const r of events) {
        if (!r.anon_id) continue;
        if (!(CE_FUNNEL_STEPS as readonly string[]).includes(r.event_name)) continue;
        lastStepByAnon.set(r.anon_id, r.event_name);
      }
      const exitCounts: Record<string, number> = {};
      for (const s of CE_FUNNEL_STEPS) exitCounts[s] = 0;
      for (const last of lastStepByAnon.values()) {
        if (last === "payment_success") continue;
        exitCounts[last] = (exitCounts[last] ?? 0) + 1;
      }

      const failures: Record<string, number> = {};
      for (const f of CE_FAILURE_EVENTS) failures[f] = countEvents(events, f);

      // Top UTM sources for users who reached test_viewed.
      const utmCounts = new Map<string, { reached: Set<string>; paid: Set<string> }>();
      const ensure = (k: string) => {
        let v = utmCounts.get(k);
        if (!v) {
          v = { reached: new Set(), paid: new Set() };
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
      const utm = Array.from(utmCounts.entries())
        .map(([source, v]) => ({
          source,
          reached: v.reached.size,
          paid: v.paid.size,
          cvr: v.reached.size > 0 ? v.paid.size / v.reached.size : 0,
        }))
        .sort((a, b) => b.reached - a.reached)
        .slice(0, 12);

      const top = steps[0]?.users ?? 0;
      const bottom = steps[steps.length - 1]?.users ?? 0;
      const overallCvr = top > 0 ? bottom / top : 0;

      return {
        since,
        overall_cvr: overallCvr,
        steps,
        exit_counts: exitCounts,
        failures,
        utm,
      };
    });
  });
