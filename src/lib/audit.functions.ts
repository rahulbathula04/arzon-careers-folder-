import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { requireAdmin } from "@/server/auth-guards.server";

const SOFT_DELETE_TABLES = [
  "applications",
  "career_engine_leads",
  "enrolment_intents",
  "counsellor_leads",
  "arzonprime60_waitlist",
  "demand_votes",
  "certificates",
  "admin_invites",
  "user_roles",
  "course_thumbnail_overrides",
] as const;

const ListSchema = z.object({
  table: z.string().max(64).optional(),
  action: z.enum(["insert", "update", "archive", "restore", "hard_delete"]).optional(),
  limit: z.number().int().min(1).max(500).optional(),
});

export const listAuditLog = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => ListSchema.parse(d ?? {}))
  .handler(async ({ data, context }) => {
    await requireAdmin(context.userId);
    let q = supabaseAdmin
      .from("audit_log")
      .select("id, occurred_at, actor_id, table_name, record_id, action, diff")
      .order("occurred_at", { ascending: false })
      .limit(data.limit ?? 200);
    if (data.table) q = q.eq("table_name", data.table);
    if (data.action) q = q.eq("action", data.action);
    const { data: rows, error } = await q;
    if (error) throw new Error(error.message);
    return { rows: rows ?? [] };
  });

const RestoreSchema = z.object({
  table: z.enum(SOFT_DELETE_TABLES),
  id: z.string().min(1).max(64),
});

export const restoreRecord = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => RestoreSchema.parse(d))
  .handler(async ({ data, context }) => {
    await requireAdmin(context.userId);
    // Table is validated against SOFT_DELETE_TABLES above; cast for the
    // narrowed Supabase update generic.
    const { error } = await (
      supabaseAdmin.from(data.table) as unknown as {
        update: (v: Record<string, unknown>) => {
          eq: (col: string, val: string) => Promise<{ error: { message: string } | null }>;
        };
      }
    )
      .update({ deleted_at: null, deleted_by: null })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const auditTables = SOFT_DELETE_TABLES;
