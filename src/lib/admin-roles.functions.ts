import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { requireAdmin } from "@/server/auth-guards.server";

export type AdminRow = {
  userId: string;
  email: string | null;
  createdAt: string;
};

export const listAdmins = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<AdminRow[]> => {
    await requireAdmin(context.userId);

    const { data: roles, error } = await supabaseAdmin
      .from("user_roles")
      .select("user_id, created_at")
      .eq("role", "admin")
      .is("deleted_at", null)
      .order("created_at", { ascending: true });
    if (error) throw new Error(error.message);

    const rows: AdminRow[] = [];
    for (const r of roles ?? []) {
      const { data: u } = await supabaseAdmin.auth.admin.getUserById(r.user_id);
      rows.push({
        userId: r.user_id,
        email: u?.user?.email ?? null,
        createdAt: r.created_at,
      });
    }
    return rows;
  });

async function findUserIdByEmail(email: string): Promise<string | null> {
  // Page through users to find a match (no direct getUserByEmail API).
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

export const grantAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => z.object({ email: z.string().email().max(254) }).parse(data))
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
      .insert({ user_id: userId, role: "admin" });
    // Ignore unique-violation duplicates.
    if (error && !/duplicate key|unique/i.test(error.message)) {
      throw new Error(error.message);
    }
    return { ok: true, userId };
  });

export const revokeAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => z.object({ userId: z.string().uuid() }).parse(data))
  .handler(async ({ data, context }) => {
    await requireAdmin(context.userId);
    if (data.userId === context.userId) {
      throw new Error("You cannot revoke your own admin role.");
    }
    // Prevent removing the last admin.
    const { count, error: countErr } = await supabaseAdmin
      .from("user_roles")
      .select("*", { count: "exact", head: true })
      .eq("role", "admin")
      .is("deleted_at", null);
    if (countErr) throw new Error(countErr.message);
    if ((count ?? 0) <= 1) {
      throw new Error("Cannot revoke the last remaining admin.");
    }
    const { error } = await supabaseAdmin
      .from("user_roles")
      .update({ deleted_at: new Date().toISOString(), deleted_by: context.userId })
      .eq("user_id", data.userId)
      .eq("role", "admin")
      .is("deleted_at", null);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
