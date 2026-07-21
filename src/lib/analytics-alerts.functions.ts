import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { requireStaff } from "@/server/auth-guards.server";

/**
 * Reads the analytics anomaly alerts (volume drops + payload-shape drift)
 * produced by `public.check_analytics_anomalies()` (runs hourly via pg_cron).
 *
 * Staff-only. Mutation lives in the SQL function — this endpoint is read-only.
 */

const ListSchema = z
  .object({
    limit: z.number().int().min(1).max(200).optional(),
    openOnly: z.boolean().optional(),
  })
  .optional();

export const getAnalyticsAlerts = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => ListSchema.parse(data ?? {}))
  .handler(async ({ data, context }) => {
    await requireStaff(context.userId);
    const limit = data?.limit ?? 50;
    let q = supabaseAdmin
      .from("analytics_alerts")
      .select("id, alert_type, event_name, details, fired_at, resolved_at")
      .order("fired_at", { ascending: false })
      .limit(limit);
    if (data?.openOnly) q = q.is("resolved_at", null);
    const { data: alerts, error } = await q;
    if (error) throw new Error(error.message);

    const { data: configs, error: cfgErr } = await supabaseAdmin
      .from("analytics_alert_config")
      .select("event_name, enabled, window_hours, min_count, required_props, notes")
      .order("event_name");
    if (cfgErr) throw new Error(cfgErr.message);

    return { alerts: alerts ?? [], configs: configs ?? [] };
  });

/**
 * Manual run for the on-call engineer — the same SQL function pg_cron calls,
 * exposed so staff can re-check immediately after pushing a fix.
 */
export const runAnalyticsAnomalyCheck = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await requireStaff(context.userId);
    const { data, error } = await supabaseAdmin.rpc("check_analytics_anomalies");
    if (error) throw new Error(error.message);
    return { alertsInserted: (data as number | null) ?? 0 };
  });
