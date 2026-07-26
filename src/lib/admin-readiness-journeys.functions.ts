import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { requireAdmin } from "@/server/auth-guards.server";

const STATUSES = ["all", "started", "submitted", "paid"] as const;

const Schema = z.object({
  status: z.enum(STATUSES).optional(),
  sinceHours: z
    .number()
    .int()
    .min(1)
    .max(24 * 365)
    .optional(),
  limit: z.number().int().min(1).max(1000).optional(),
});

export type ReadinessJourneyRow = {
  id: string;
  sessionId: string;
  leadId: string | null;
  startedAt: string | null;
  submittedAt: string | null;
  paidAt: string | null;
  archetype: string | null;
  scoreBand: string | null;
  amountInr: number | null;
  utm: Record<string, string> | null;
  leadName: string | null;
  leadEmail: string | null;
  leadPhone: string | null;
};

export const listReadinessJourneys = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => Schema.parse(data ?? {}))
  .handler(async ({ data, context }): Promise<{ rows: ReadinessJourneyRow[] }> => {
    await requireAdmin(context.userId);

    const since = data.sinceHours
      ? new Date(Date.now() - data.sinceHours * 3_600_000).toISOString()
      : null;
    const limit = data.limit ?? 500;
    const status = data.status ?? "all";

    let q = (supabaseAdmin as any)
      .from("readiness_journey")
      .select(
        "id, session_id, lead_id, started_at, submitted_at, paid_at, archetype, score_band, amount_inr, utm",
      )
      .order("created_at", { ascending: false })
      .limit(limit);

    if (since) q = q.gte("created_at", since);
    if (status === "paid") q = q.not("paid_at", "is", null);
    else if (status === "submitted") q = q.not("submitted_at", "is", null).is("paid_at", null);
    else if (status === "started") q = q.not("started_at", "is", null).is("submitted_at", null);

    const { data: rows, error } = await q;
    if (error) throw new Error(error.message);

    const journeys = (rows ?? []) as Array<{
      id: string;
      session_id: string;
      lead_id: string | null;
      started_at: string | null;
      submitted_at: string | null;
      paid_at: string | null;
      archetype: string | null;
      score_band: string | null;
      amount_inr: number | null;
      utm: Record<string, string> | null;
    }>;

    // Hydrate lead contact details for journeys that captured a lead.
    const leadIds = Array.from(new Set(journeys.map((r) => r.lead_id).filter(Boolean) as string[]));
    const leadMap = new Map<
      string,
      { name: string | null; email: string | null; phone: string | null }
    >();
    if (leadIds.length > 0) {
      const { data: leads, error: leadErr } = await (supabaseAdmin as any)
        .from("career_engine_leads")
        .select("id, name, email, phone")
        .in("id", leadIds);
      if (leadErr) throw new Error(leadErr.message);
      for (const l of (leads ?? []) as Array<{
        id: string;
        name: string | null;
        email: string | null;
        phone: string | null;
      }>) {
        leadMap.set(l.id, { name: l.name, email: l.email, phone: l.phone });
      }
    }

    const out: ReadinessJourneyRow[] = journeys.map((r) => {
      const lead = r.lead_id ? leadMap.get(r.lead_id) : undefined;
      return {
        id: r.id,
        sessionId: r.session_id,
        leadId: r.lead_id,
        startedAt: r.started_at,
        submittedAt: r.submitted_at,
        paidAt: r.paid_at,
        archetype: r.archetype,
        scoreBand: r.score_band,
        amountInr: r.amount_inr,
        utm: r.utm,
        leadName: lead?.name ?? null,
        leadEmail: lead?.email ?? null,
        leadPhone: lead?.phone ?? null,
      };
    });

    return { rows: out };
  });
