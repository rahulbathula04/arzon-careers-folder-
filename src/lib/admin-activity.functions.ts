import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { requireAdmin } from "@/server/auth-guards.server";

const ActivitySchema = z.object({
  action: z.string().max(64).optional(),
  actorId: z.string().uuid().optional(),
  resource: z.string().max(64).optional(),
  sinceHours: z
    .number()
    .int()
    .min(1)
    .max(24 * 365)
    .optional(),
  limit: z.number().int().min(1).max(2000).optional(),
});

export type ActivityRow = {
  id: string;
  occurredAt: string;
  actorId: string | null;
  actorEmail: string | null;
  actorRoles: string[];
  action: string;
  tableName: string;
  recordId: string;
  diff: { [x: string]: {} };
};

export const listAdminActivity = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => ActivitySchema.parse(data ?? {}))
  .handler(
    async ({
      data,
      context,
    }): Promise<{
      rows: ActivityRow[];
      actors: Array<{ id: string; email: string | null }>;
      actions: string[];
    }> => {
      await requireAdmin(context.userId);

      const since = data.sinceHours
        ? new Date(Date.now() - data.sinceHours * 3600_000).toISOString()
        : null;

      const { data: rows, error } = await supabaseAdmin.rpc("list_admin_activity", {
        _action: data.action ?? undefined,
        _actor_id: data.actorId ?? undefined,
        _resource: data.resource ?? undefined,
        _since: since ?? undefined,
        _limit: data.limit ?? 500,
      });
      if (error) throw new Error(error.message);

      const list = (rows ?? []) as Array<{
        id: string;
        occurred_at: string;
        actor_id: string | null;
        action: string;
        table_name: string;
        record_id: string;
        diff: { [x: string]: {} };
      }>;

      // Resolve actor emails + roles (cached per request)
      const actorIds = Array.from(new Set(list.map((r) => r.actor_id).filter(Boolean) as string[]));
      const emails = new Map<string, string | null>();
      const rolesByActor = new Map<string, string[]>();
      for (const id of actorIds) {
        const { data: u } = await supabaseAdmin.auth.admin.getUserById(id);
        emails.set(id, u?.user?.email ?? null);
        const { data: rr } = await supabaseAdmin
          .from("user_roles")
          .select("role")
          .eq("user_id", id)
          .is("deleted_at", null);
        rolesByActor.set(
          id,
          (rr ?? []).map((x) => String(x.role)),
        );
      }

      const out: ActivityRow[] = list.map((r) => ({
        id: r.id,
        occurredAt: r.occurred_at,
        actorId: r.actor_id,
        actorEmail: r.actor_id ? (emails.get(r.actor_id) ?? null) : null,
        actorRoles: r.actor_id ? (rolesByActor.get(r.actor_id) ?? []) : [],
        action: r.action,
        tableName: r.table_name,
        recordId: r.record_id,
        diff: r.diff ?? {},
      }));

      const actors = Array.from(
        new Map(
          actorIds.map((id) => [id, { id, email: emails.get(id) ?? null }] as const),
        ).values(),
      );
      const actions = Array.from(new Set(out.map((r) => r.action))).sort();

      return { rows: out, actors, actions };
    },
  );
