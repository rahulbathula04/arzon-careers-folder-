import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { requireResultsExport } from "@/server/auth-guards.server";

/**
 * Rate-limits + audits an admin CSV export. Must be called BEFORE the file
 * is downloaded - server throws on rate-limit, which aborts the download.
 *
 * Backed by public.record_admin_export(_resource, _row_count, _details).
 * Rate limit: 10 exports per 5 minutes per (admin user_id, resource).
 */
export const recordAdminExport = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    (input: { resource: string; rowCount: number; details?: Record<string, unknown> }) =>
      z
        .object({
          resource: z
            .string()
            .min(1)
            .max(64)
            .regex(/^[a-z0-9_\-]+$/),
          rowCount: z.number().int().min(0).max(1_000_000),
          details: z.record(z.string().min(1).max(64), z.unknown()).optional(),
        })
        .parse(input),
  )
  .handler(async ({ data, context }) => {
    const { supabase } = context;
    // Resource-specific gates. /admin/results exports require the exporter
    // (or admin) role; other resources fall back to the underlying RPC's
    // staff check.
    if (data.resource === "career_engine_results") {
      await requireResultsExport(context.userId);
    }
    const { error } = await supabase.rpc("record_admin_export", {
      _resource: data.resource,
      _row_count: data.rowCount,
      _details: (data.details ?? {}) as never,
    });
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });
