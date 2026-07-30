import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { requireStaff } from "@/server/auth-guards.server";

// ----------------------------------------------------------------------------
// ARZONPRIME60 funnel - Shown → CTA clicked → Coupon applied → Paid
// ----------------------------------------------------------------------------
// We anchor uniqueness on `anon_id` (the localStorage UUID the tracker mints
// for every browser). That gives us per-user conversion across surfaces.
//
// Tier breakdown is only meaningful from the click step onward, because the
// offer card itself displays all three tiers at once. The total "shown"
// number is therefore a single bucket, while clicked / applied / paid are
// split per tier.

const Input = z.object({
  fromDays: z.number().int().min(1).max(365).optional(),
});

type TierId = "essential" | "career" | "elite";
const TIERS: TierId[] = ["essential", "career", "elite"];

type EventRow = {
  event_name: string;
  anon_id: string | null;
  program_slug: string | null;
  created_at: string;
  props: Record<string, unknown> | null;
};

function tierFromRow(row: EventRow): TierId | null {
  const fromProps = (row.props?.tier as string | undefined) ?? null;
  const candidate = fromProps ?? row.program_slug ?? null;
  return candidate && (TIERS as string[]).includes(candidate) ? (candidate as TierId) : null;
}

function uniq(rows: EventRow[], predicate: (r: EventRow) => boolean): number {
  const seen = new Set<string>();
  for (const r of rows) {
    if (!r.anon_id) continue;
    if (predicate(r)) seen.add(r.anon_id);
  }
  return seen.size;
}

export type Prime60FunnelTierRow = {
  tier: TierId;
  clicked: number;
  applied: number;
  paid: number;
  // Conversion of clicks → paid for this tier.
  clickToPayPct: number;
};

export type Prime60FunnelResult = {
  since: string;
  totalEvents: number;
  totals: {
    shown: number;
    clicked: number;
    applied: number;
    paid: number;
    shownToPaidPct: number;
    clickToPayPct: number;
    applyToPayPct: number;
  };
  byTier: Prime60FunnelTierRow[];
  bySurface: Array<{ surface: string; clicked: number }>;
};

export const getArzonPrime60Funnel = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => Input.parse(data ?? {}))
  .handler(async ({ data, context }): Promise<Prime60FunnelResult> => {
    await requireStaff(context.userId);

    const since = new Date(Date.now() - (data.fromDays ?? 30) * 86_400_000).toISOString();

    const { data: rows, error } = await supabaseAdmin
      .from("analytics_events")
      .select("event_name, anon_id, program_slug, created_at, props")
      .gte("created_at", since)
      .in("event_name", [
        "arzonprime60_offer_shown",
        "arzonprime60_offer_cta_clicked",
        "coupon_applied",
        "enrol_paid",
      ])
      .limit(50_000);
    if (error) throw new Error(error.message);

    const events = (rows ?? []) as EventRow[];

    // Filter helpers for ARZONPRIME60-specific events.
    const isPrime60Apply = (r: EventRow) =>
      r.event_name === "coupon_applied" &&
      (r.props?.code as string | undefined)?.toUpperCase() === "ARZONPRIME60";
    const isPrime60Paid = (r: EventRow) =>
      r.event_name === "enrol_paid" &&
      (r.props?.coupon as string | undefined)?.toUpperCase() === "ARZONPRIME60";
    const isClicked = (r: EventRow) => r.event_name === "arzonprime60_offer_cta_clicked";
    const isShown = (r: EventRow) => r.event_name === "arzonprime60_offer_shown";

    // Per-tier breakdown.
    const byTier: Prime60FunnelTierRow[] = TIERS.map((tier) => {
      const clicked = uniq(events, (r) => isClicked(r) && tierFromRow(r) === tier);
      const applied = uniq(events, (r) => isPrime60Apply(r) && tierFromRow(r) === tier);
      const paid = uniq(events, (r) => isPrime60Paid(r) && tierFromRow(r) === tier);
      const clickToPayPct = clicked ? Math.round((paid / clicked) * 1000) / 10 : 0;
      return { tier, clicked, applied, paid, clickToPayPct };
    });

    // Totals (unique anons across all tiers).
    const totalShown = uniq(events, isShown);
    const totalClicked = uniq(events, isClicked);
    const totalApplied = uniq(events, isPrime60Apply);
    const totalPaid = uniq(events, isPrime60Paid);

    const totals = {
      shown: totalShown,
      clicked: totalClicked,
      applied: totalApplied,
      paid: totalPaid,
      shownToPaidPct: totalShown ? Math.round((totalPaid / totalShown) * 1000) / 10 : 0,
      clickToPayPct: totalClicked ? Math.round((totalPaid / totalClicked) * 1000) / 10 : 0,
      applyToPayPct: totalApplied ? Math.round((totalPaid / totalApplied) * 1000) / 10 : 0,
    };

    // Surface breakdown for clicks (helps see which entry point converts).
    const surfaceMap = new Map<string, Set<string>>();
    for (const r of events) {
      if (!isClicked(r) || !r.anon_id) continue;
      const surface = (r.props?.surface as string | undefined) ?? "unknown";
      let set = surfaceMap.get(surface);
      if (!set) {
        set = new Set();
        surfaceMap.set(surface, set);
      }
      set.add(r.anon_id);
    }
    const bySurface = Array.from(surfaceMap.entries())
      .map(([surface, set]) => ({ surface, clicked: set.size }))
      .sort((a, b) => b.clicked - a.clicked);

    return {
      since,
      totalEvents: events.length,
      totals,
      byTier,
      bySurface,
    };
  });
