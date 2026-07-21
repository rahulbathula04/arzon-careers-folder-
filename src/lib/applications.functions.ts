import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { recordServerEvent } from "@/server/analytics.server";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { requireRole, requireStaff } from "@/server/auth-guards.server";

const SubmitSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email().max(120),
  phone: z.string().min(10).max(20),
  programSlug: z.string().min(1).max(80),
  programName: z.string().max(120).optional(),
  whatsappOptin: z.boolean().optional(),
  leadId: z.string().uuid().optional().nullable(),
  utmSource: z.string().max(64).optional(),
  userAgent: z.string().max(256).optional(),
});

function admin() {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
}

export const submitApplication = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => SubmitSchema.parse(data))
  .handler(async ({ data }) => {
    const sb = admin();
    const { data: id, error } = await sb.rpc("submit_application", {
      p_name: data.name,
      p_email: data.email,
      p_phone: data.phone,
      p_program_slug: data.programSlug,
      p_program_name: data.programName ?? null,
      p_whatsapp_optin: data.whatsappOptin ?? true,
      p_lead_id: data.leadId ?? null,
      p_utm_source: data.utmSource ?? null,
      p_user_agent: data.userAgent ?? null,
    });
    if (error) throw new Error(error.message);
    return { applicationId: id as string };
  });

const ListSchema = z.object({
  status: z.string().optional(),
  limit: z.number().int().min(1).max(500).optional(),
  page: z.number().int().min(0).max(10_000).optional(),
  pageSize: z.number().int().min(10).max(200).optional(),
});

export const listApplications = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => ListSchema.parse(data ?? {}))
  .handler(async ({ data, context }) => {
    await requireStaff(context.userId);
    const sb = admin();
    const pageSize = data.pageSize ?? data.limit ?? 50;
    const page = data.page ?? 0;
    const from = page * pageSize;
    const to = from + pageSize - 1;
    let q = sb
      .from("applications")
      .select(
        "id, created_at, name, email, phone, program_slug, program_name, status, notes, utm_source",
        { count: "exact" },
      )
      .is("deleted_at", null)
      .order("created_at", { ascending: false })
      .range(from, to);
    if (data.status) q = q.eq("status", data.status);
    const { data: rows, error, count } = await q;
    if (error) throw new Error(error.message);
    return { applications: rows ?? [], total: count ?? 0, page, pageSize };
  });

const UpdateStatusSchema = z.object({
  id: z.string().uuid(),
  status: z.enum([
    "submitted",
    "reviewing",
    "shortlisted",
    "rejected",
    "accepted",
    "enrolled",
    "withdrawn",
  ]),
  notes: z.string().max(2000).optional(),
});

export const updateApplicationStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => UpdateStatusSchema.parse(data))
  .handler(async ({ data, context }) => {
    await requireRole(context.userId, ["admin", "reviewer"]);
    const sb = admin();
    const patch: Record<string, unknown> = { status: data.status };
    if (data.notes !== undefined) patch.notes = data.notes;
    // capture previous status for the event
    const { data: prev } = await sb
      .from("applications")
      .select("status, program_slug")
      .eq("id", data.id)
      .maybeSingle();
    const { error } = await sb.from("applications").update(patch).eq("id", data.id);
    if (error) throw new Error(error.message);
    await recordServerEvent({
      event_name: "admin_application_status_changed",
      application_id: data.id,
      program_slug: prev?.program_slug ?? null,
      props: {
        from_status: prev?.status ?? null,
        to_status: data.status,
      },
    });
    return { ok: true };
  });
