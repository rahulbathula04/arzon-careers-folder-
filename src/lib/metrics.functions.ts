import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/server/analytics.server";
import { requireStaff } from "@/server/auth-guards.server";

/**
 * Metrics for the "domain-grid removal" hypothesis and the sticky-CTA A/B.
 *
 * Compares two windows (`before` / `after`) of equal length around a
 * cutover date and returns:
 *   - apply_cta_click rate per unique visitor
 *   - apply funnel conversion (cta -> submitted)
 *   - home_* engagement signals (dwell, search, scroll, legacy grid hits)
 *   - per-variant breakdown for the sticky_cta_placement experiment
 */
const Schema = z.object({
  cutoverISO: z.string().min(1),
  windowDays: z.number().int().min(1).max(90).default(14),
  experiment: z.string().max(64).default("sticky_cta_placement"),
});

type Row = {
  event_name: string;
  anon_id: string | null;
  created_at: string;
  props: Record<string, unknown> | null;
};

function bucket(rows: Row[]) {
  const visitors = new Set<string>();
  const ctaClickers = new Set<string>();
  const submitters = new Set<string>();
  let ctaClicks = 0;
  let submits = 0;
  let domainGridHits = 0;
  let dwellNoCta = 0;
  let searchKeypress = 0;
  const scrollDepth: Record<string, number> = {};
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
        const d = String((r.props as { depth?: number } | null)?.depth ?? "?");
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
    scrollDepth,
  };
}

function variantBucket(rows: Row[], experiment: string) {
  const assignments = new Map<string, string>(); // anon -> variant
  for (const r of rows) {
    if (r.event_name !== "ab_assignment") continue;
    const p = (r.props ?? {}) as { experiment?: string; variant?: string };
    if (p.experiment !== experiment || !r.anon_id || !p.variant) continue;
    if (!assignments.has(r.anon_id)) assignments.set(r.anon_id, p.variant);
  }
  const groups: Record<string, { visitors: number; ctaClickers: number; submitters: number }> = {};
  const ctaSeen: Record<string, Set<string>> = {};
  const submitSeen: Record<string, Set<string>> = {};
  const visitorSeen: Record<string, Set<string>> = {};
  for (const [anon, variant] of assignments) {
    visitorSeen[variant] ??= new Set();
    visitorSeen[variant].add(anon);
  }
  for (const r of rows) {
    if (!r.anon_id) continue;
    const v = assignments.get(r.anon_id);
    if (!v) continue;
    if (r.event_name === "apply_cta_click") {
      ctaSeen[v] ??= new Set();
      ctaSeen[v].add(r.anon_id);
    } else if (r.event_name === "apply_submitted") {
      submitSeen[v] ??= new Set();
      submitSeen[v].add(r.anon_id);
    }
  }
  for (const v of Object.keys(visitorSeen)) {
    groups[v] = {
      visitors: visitorSeen[v]!.size,
      ctaClickers: ctaSeen[v]?.size ?? 0,
      submitters: submitSeen[v]?.size ?? 0,
    };
  }
  return groups;
}

export const getDomainGridMetrics = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => Schema.parse(data ?? {}))
  .handler(async ({ data, context }) => {
    await requireStaff(context.userId);
    const cutover = new Date(data.cutoverISO);
    const ms = data.windowDays * 86_400_000;
    const beforeStart = new Date(cutover.getTime() - ms).toISOString();
    const afterEnd = new Date(cutover.getTime() + ms).toISOString();
    const { data: rows, error } = await supabaseAdmin
      .from("analytics_events")
      .select("event_name, anon_id, created_at, props")
      .gte("created_at", beforeStart)
      .lte("created_at", afterEnd)
      .limit(100_000);
    if (error) throw new Error(error.message);
    const all = (rows ?? []) as Row[];
    const cutISO = cutover.toISOString();
    const before = all.filter((r) => r.created_at < cutISO);
    const after = all.filter((r) => r.created_at >= cutISO);
    return {
      window: {
        beforeStart,
        cutover: cutISO,
        afterEnd,
        days: data.windowDays,
      },
      before: bucket(before),
      after: bucket(after),
      experiment: {
        key: data.experiment,
        variants: variantBucket(after, data.experiment),
      },
    };
  });

/**
 * Per-session join of the apply funnel
 * (apply_cta_click → apply_started → apply_submitted) for the post
 * domain-grid-removal hypothesis. Reads vw_apply_funnel_sessions and
 * collapses to surface- and variant-level aggregates.
 */
const FunnelSchema = z.object({
  sinceISO: z.string().min(1),
});

export const getApplyFunnel = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => FunnelSchema.parse(data))
  .handler(async ({ data, context }) => {
    await requireStaff(context.userId);
    const { data: rows, error } = await supabaseAdmin
      .from("vw_apply_funnel_sessions")
      .select("session_id, surface, assigned_variant, reached_form, reached_submit, cta_at")
      .gte("cta_at", data.sinceISO)
      .limit(50_000);
    if (error) throw new Error(error.message);

    const total = rows?.length ?? 0;
    let reachedForm = 0;
    let reachedSubmit = 0;
    const bySurface = new Map<string, { cta: number; form: number; submit: number }>();
    const byVariant = new Map<string, { cta: number; form: number; submit: number }>();
    for (const r of rows ?? []) {
      if (r.reached_form) reachedForm++;
      if (r.reached_submit) reachedSubmit++;
      const s = r.surface ?? "unknown";
      const sb = bySurface.get(s) ?? { cta: 0, form: 0, submit: 0 };
      sb.cta++;
      if (r.reached_form) sb.form++;
      if (r.reached_submit) sb.submit++;
      bySurface.set(s, sb);
      const v = r.assigned_variant ?? "unassigned";
      const vb = byVariant.get(v) ?? { cta: 0, form: 0, submit: 0 };
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
      bySurface: [...bySurface.entries()].map(([surface, v]) => ({ surface, ...v })),
      byVariant: [...byVariant.entries()].map(([variant, v]) => ({ variant, ...v })),
    };
  });
