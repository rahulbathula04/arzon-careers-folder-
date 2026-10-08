import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { requireAdmin } from "@/server/auth-guards.server";
import { createSafeAdminClient } from "@/lib/supabaseEnv";

const StatusStateSchema = z.enum(["operational", "degraded", "down", "maintenance"]);

const UpdateStatusSchema = z.object({
  id: z.string().uuid(),
  state: StatusStateSchema,
  note: z.string().trim().max(500).nullable().optional(),
});

export type AdminStatusComponent = {
  id: string;
  name: string;
  state: z.infer<typeof StatusStateSchema>;
  note: string | null;
  updated_at: string;
};

export const listAdminStatusComponents = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await requireAdmin(context.userId);
    const sb = createSafeAdminClient();
    const { data, error } = await sb
      .from("status_components")
      .select("id,name,state,note,updated_at")
      .order("name", { ascending: true });

    if (error) throw new Error("Unable to load system status.");
    return { components: (data ?? []) as AdminStatusComponent[] };
  });

export const updateAdminStatusComponent = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => UpdateStatusSchema.parse(data))
  .handler(async ({ data, context }) => {
    await requireAdmin(context.userId);
    const sb = createSafeAdminClient();
    const { data: updated, error } = await sb
      .from("status_components")
      .update({
        state: data.state,
        note: data.note?.trim() || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", data.id)
      .select("id,name,state,note,updated_at")
      .maybeSingle();

    if (error || !updated) {
      throw new Error("Unable to update system status.");
    }

    return { component: updated as AdminStatusComponent };
  });
