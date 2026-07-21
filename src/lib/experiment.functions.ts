import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/server/analytics.server";
import { requireStaff } from "@/server/auth-guards.server";

/**
 * Live A/B experiment results for the sticky-CTA placement test.
 *
 * Computes per-variant assignment, apply_cta_click and apply_submitted
 * counts, click-through and submit-conversion rates, and a two-proportion
 * z-test vs the control arm. Also returns a drift table: sessions that
 * somehow saw more than one variant (should always be zero).
 */
const Schema = z.object({
  experiment: z.string().min(1).max(64).default("sticky_cta_placement"),
  windowDays: z.number().int().min(1).max(90).default(14),
});

type Row = {
  event_name: string;
  anon_id: string | null;
  session_id: string | null;
  created_at: string;
  props: Record<string, unknown> | null;
};

/** Standard normal CDF approximation (Abramowitz & Stegun 26.2.17). */
function normCdf(z: number): number {
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989422804014327 * Math.exp(-(z * z) / 2);
  const p =
    d *
    t *
    (0.31938153 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
  return z > 0 ? 1 - p : p;
}

/** Two-proportion z-test (pooled). Returns lift, z, two-sided p, 95% CI. */
function twoProportionTest(successA: number, trialsA: number, successB: number, trialsB: number) {
  if (trialsA < 1 || trialsB < 1) {
    return { lift: 0, z: 0, pValue: 1, ciLow: 0, ciHigh: 0, significant: false };
  }
  const pA = successA / trialsA;
  const pB = successB / trialsB;
  const pPool = (successA + successB) / (trialsA + trialsB);
  const se = Math.sqrt(pPool * (1 - pPool) * (1 / trialsA + 1 / trialsB));
  const z = se ? (pB - pA) / se : 0;
  const pValue = 2 * (1 - normCdf(Math.abs(z)));
  const seDiff = Math.sqrt((pA * (1 - pA)) / trialsA + (pB * (1 - pB)) / trialsB);
  const diff = pB - pA;
  const ciLow = diff - 1.96 * seDiff;
  const ciHigh = diff + 1.96 * seDiff;
  const lift = pA ? (pB - pA) / pA : 0;
  return {
    lift,
    z,
    pValue,
    ciLow,
    ciHigh,
    significant: pValue < 0.05 && trialsA >= 100 && trialsB >= 100,
  };
}

export const getExperimentResults = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => Schema.parse(data ?? {}))
  .handler(async ({ data, context }) => {
    await requireStaff(context.userId);
    const since = new Date(Date.now() - data.windowDays * 86_400_000).toISOString();

    const { data: rows, error } = await supabaseAdmin
      .from("analytics_events")
      .select("event_name, anon_id, session_id, created_at, props")
      .gte("created_at", since)
      .in("event_name", ["ab_assignment", "apply_cta_click", "apply_submitted"])
      .order("created_at", { ascending: true })
      .limit(50_000);
    if (error) throw new Error(error.message);

    const all = (rows ?? []) as Row[];
    // anon_id → variant (first assignment wins)
    const assignment = new Map<string, string>();
    // session_id → Set<variant> (for drift detection)
    const sessionVariants = new Map<string, Set<string>>();

    for (const r of all) {
      if (r.event_name !== "ab_assignment" || !r.anon_id) continue;
      const p = (r.props ?? {}) as { experiment?: string; variant?: string };
      if (p.experiment !== data.experiment || !p.variant) continue;
      if (!assignment.has(r.anon_id)) assignment.set(r.anon_id, p.variant);
    }

    type Bucket = {
      visitors: Set<string>;
      ctaClickers: Set<string>;
      submitters: Set<string>;
      ctaClicks: number;
    };
    const groups = new Map<string, Bucket>();
    const ensure = (v: string): Bucket => {
      let b = groups.get(v);
      if (!b) {
        b = {
          visitors: new Set(),
          ctaClickers: new Set(),
          submitters: new Set(),
          ctaClicks: 0,
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
          const s = sessionVariants.get(r.session_id) ?? new Set<string>();
          const cv = ((r.props ?? {}) as { experiment_variant?: string }).experiment_variant;
          if (cv) s.add(cv);
          s.add(v);
          sessionVariants.set(r.session_id, s);
        }
      } else if (r.event_name === "apply_submitted") {
        b.submitters.add(r.anon_id);
      }
    }

    const driftSessions: { sessionId: string; variants: string[] }[] = [];
    for (const [sid, set] of sessionVariants) {
      if (set.size > 1) driftSessions.push({ sessionId: sid, variants: [...set] });
    }

    // Pick a control: prefer "control", else lexicographic-first variant.
    const variants = [...groups.keys()].sort();
    const controlKey = variants.includes("control") ? "control" : variants[0];
    const control = controlKey ? groups.get(controlKey)! : null;

    const arms = variants.map((v) => {
      const b = groups.get(v)!;
      const visitors = b.visitors.size;
      const ctaClickers = b.ctaClickers.size;
      const submitters = b.submitters.size;
      const ctr = visitors ? ctaClickers / visitors : 0;
      const submitRate = ctaClickers ? submitters / ctaClickers : 0;
      const test =
        control && controlKey && v !== controlKey
          ? twoProportionTest(
              control.ctaClickers.size,
              control.visitors.size,
              ctaClickers,
              visitors,
            )
          : null;
      return {
        variant: v,
        isControl: v === controlKey,
        visitors,
        ctaClicks: b.ctaClicks,
        ctaClickers,
        submitters,
        ctr,
        submitRate,
        test,
      };
    });

    return {
      experiment: data.experiment,
      windowDays: data.windowDays,
      arms,
      drift: {
        offendingSessions: driftSessions.slice(0, 50),
        totalOffending: driftSessions.length,
      },
    };
  });
