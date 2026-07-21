import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/server/analytics.server";
import { requireStaff } from "@/server/auth-guards.server";

const FUNNEL = [
  "exposure",
  "cta_click",
  "form_open",
  "form_submit",
  "whatsapp_click",
  "razorpay_open",
  "razorpay_success",
  "enrolment_paid",
] as const;

type FunnelStep = (typeof FUNNEL)[number];

const Schema = z.object({
  experiments: z
    .array(z.string().min(1).max(64))
    .default(["curriculum_layout_v1", "cta_timing_v1"]),
  windowDays: z.number().int().min(1).max(90).default(14),
  courseSlug: z.string().min(1).max(80).optional(),
});

type Row = {
  uid: string;
  experiment: string;
  variant: string;
  event: string;
  course_slug: string | null;
  created_at: string;
};

/** Standard normal CDF (Abramowitz & Stegun 26.2.17). */
function normCdf(z: number): number {
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989422804014327 * Math.exp(-(z * z) / 2);
  const p =
    d *
    t *
    (0.31938153 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
  return z > 0 ? 1 - p : p;
}

function twoProp(a: number, na: number, b: number, nb: number) {
  if (na < 1 || nb < 1) return { lift: 0, p: 1, sig: false };
  const pa = a / na;
  const pb = b / nb;
  const pool = (a + b) / (na + nb);
  const se = Math.sqrt(pool * (1 - pool) * (1 / na + 1 / nb));
  const z = se ? (pb - pa) / se : 0;
  const p = 2 * (1 - normCdf(Math.abs(z)));
  return {
    lift: pa ? (pb - pa) / pa : 0,
    p,
    sig: p < 0.05 && na >= 100 && nb >= 100,
  };
}

export const getCurriculumExperimentResults = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => Schema.parse(data ?? {}))
  .handler(async ({ data, context }) => {
    await requireStaff(context.userId);
    const since = new Date(Date.now() - data.windowDays * 86_400_000).toISOString();
    let q = supabaseAdmin
      .from("experiment_events")
      .select("uid, experiment, variant, event, course_slug, created_at")
      .in("experiment", data.experiments)
      .gte("created_at", since)
      .order("created_at", { ascending: true })
      .limit(100_000);
    if (data.courseSlug) q = q.eq("course_slug", data.courseSlug);
    const { data: rows, error } = await q;
    if (error) throw new Error(error.message);

    const all = (rows ?? []) as Row[];

    type Bucket = Record<FunnelStep, Set<string>>;
    const newBucket = (): Bucket =>
      Object.fromEntries(FUNNEL.map((s) => [s, new Set<string>()])) as Bucket;

    // experiment -> variant -> bucket
    const groups = new Map<string, Map<string, Bucket>>();
    for (const r of all) {
      if (!FUNNEL.includes(r.event as FunnelStep)) continue;
      let g = groups.get(r.experiment);
      if (!g) groups.set(r.experiment, (g = new Map()));
      let b = g.get(r.variant);
      if (!b) g.set(r.variant, (b = newBucket()));
      b[r.event as FunnelStep].add(r.uid);
    }

    // Daily series of exposures vs paid per experiment (last N days).
    const days = Array.from({ length: data.windowDays }, (_, i) => {
      const d = new Date(Date.now() - (data.windowDays - 1 - i) * 86_400_000);
      return d.toISOString().slice(0, 10);
    });

    const experimentReports = data.experiments.map((exp) => {
      const g = groups.get(exp) ?? new Map<string, Bucket>();
      const variantNames = Array.from(g.keys()).sort();
      const arms = variantNames.map((variant) => {
        const b = g.get(variant)!;
        const counts: Record<FunnelStep, number> = Object.fromEntries(
          FUNNEL.map((s) => [s, b[s].size]),
        ) as Record<FunnelStep, number>;
        const exposure = counts.exposure;
        const paid = counts.enrolment_paid;
        return {
          variant,
          isControl: variant === "control",
          counts,
          conversion: exposure ? paid / exposure : 0,
        };
      });

      const control = arms.find((a) => a.isControl);
      const armsWithTest = arms.map((a) => {
        if (!control || a.isControl) return { ...a, test: null };
        const t = twoProp(
          control.counts.enrolment_paid,
          control.counts.exposure,
          a.counts.enrolment_paid,
          a.counts.exposure,
        );
        return { ...a, test: t };
      });

      // Daily series
      const dayBuckets: Record<string, { exposure: number; paid: number }> = Object.fromEntries(
        days.map((d) => [d, { exposure: 0, paid: 0 }]),
      );
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
        paid: dayBuckets[d].paid,
      }));

      return { experiment: exp, arms: armsWithTest, series, funnel: FUNNEL as readonly string[] };
    });

    return {
      windowDays: data.windowDays,
      courseSlug: data.courseSlug ?? null,
      experiments: experimentReports,
    };
  });
