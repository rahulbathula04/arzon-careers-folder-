import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { requireAdmin } from "@/server/auth-guards.server";

export type WorkspaceRole = "admin" | "reviewer" | "support" | "viewer" | "analyst" | "exporter";

const ROLE_VALUES = ["admin", "reviewer", "support", "viewer", "analyst", "exporter"] as const;

export type RoleAssignment = {
  userId: string;
  email: string | null;
  role: WorkspaceRole;
  createdAt: string;
};

export const listRoleAssignments = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<RoleAssignment[]> => {
    await requireAdmin(context.userId);
    const { data, error } = await supabaseAdmin
      .from("user_roles")
      .select("user_id, role, created_at")
      .is("deleted_at", null)
      .in("role", [...ROLE_VALUES])
      .order("created_at", { ascending: true });
    if (error) throw new Error(error.message);

    // Resolve emails. Dedup user lookups.
    const ids = Array.from(new Set((data ?? []).map((r) => r.user_id)));
    const emails = new Map<string, string | null>();
    for (const id of ids) {
      const { data: u } = await supabaseAdmin.auth.admin.getUserById(id);
      emails.set(id, u?.user?.email ?? null);
    }
    return (data ?? []).map((r) => ({
      userId: r.user_id,
      role: r.role as WorkspaceRole,
      email: emails.get(r.user_id) ?? null,
      createdAt: r.created_at,
    }));
  });

async function findUserIdByEmail(email: string): Promise<string | null> {
  const perPage = 200;
  for (let page = 1; page <= 50; page++) {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers({ page, perPage });
    if (error) throw new Error(error.message);
    const match = data.users.find((u) => (u.email ?? "").toLowerCase() === email.toLowerCase());
    if (match) return match.id;
    if (data.users.length < perPage) break;
  }
  return null;
}

export const grantWorkspaceRole = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) =>
    z
      .object({
        email: z.string().email().max(254),
        role: z.enum(ROLE_VALUES),
      })
      .parse(data),
  )
  .handler(async ({ data, context }) => {
    await requireAdmin(context.userId);
    const userId = await findUserIdByEmail(data.email);
    if (!userId) {
      throw new Error(
        "No account found with that email. Ask them to sign up at /admin/login first.",
      );
    }
    const { error } = await supabaseAdmin
      .from("user_roles")
      .insert({ user_id: userId, role: data.role });
    if (error && !/duplicate key|unique/i.test(error.message)) {
      throw new Error(error.message);
    }
    // Audit via user-scoped client so auth.uid() resolves
    try {
      await context.supabase.rpc("log_admin_action", {
        _action: "role_granted",
        _resource: "user_roles",
        _record_id: userId,
        _diff: { email: data.email, role: data.role } as never,
      });
    } catch {
      /* swallow */
    }
    return { ok: true, userId };
  });

export const revokeWorkspaceRole = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) =>
    z
      .object({
        userId: z.string().uuid(),
        role: z.enum(ROLE_VALUES),
      })
      .parse(data),
  )
  .handler(async ({ data, context }) => {
    await requireAdmin(context.userId);
    if (data.role === "admin" && data.userId === context.userId) {
      throw new Error("You cannot revoke your own admin role.");
    }
    if (data.role === "admin") {
      const { count, error: countErr } = await supabaseAdmin
        .from("user_roles")
        .select("*", { count: "exact", head: true })
        .eq("role", "admin")
        .is("deleted_at", null);
      if (countErr) throw new Error(countErr.message);
      if ((count ?? 0) <= 1) {
        throw new Error("Cannot revoke the last remaining admin.");
      }
    }
    const { error } = await supabaseAdmin
      .from("user_roles")
      .update({ deleted_at: new Date().toISOString(), deleted_by: context.userId })
      .eq("user_id", data.userId)
      .eq("role", data.role)
      .is("deleted_at", null);
    if (error) throw new Error(error.message);
    try {
      await context.supabase.rpc("log_admin_action", {
        _action: "role_revoked",
        _resource: "user_roles",
        _record_id: data.userId,
        _diff: { role: data.role } as never,
      });
    } catch {
      /* swallow */
    }
    return { ok: true };
  });
