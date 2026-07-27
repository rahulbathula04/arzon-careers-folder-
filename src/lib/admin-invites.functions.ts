import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { randomBytes } from "crypto";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { requireAdmin } from "@/server/auth-guards.server";

import { createSafeAdminClient, createSafePublicClient } from "@/lib/supabaseEnv";

function admin() {
  return createSafeAdminClient();
}

function userClient(authHeader: string | null) {
  return createSafePublicClient(authHeader);
}

const CreateSchema = z.object({
  email: z.string().email().max(120),
  role: z.enum(["admin", "reviewer", "support"]),
});

export const createAdminInvite = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => CreateSchema.parse(d))
  .handler(async ({ data, context }) => {
    await requireAdmin(context.userId);
    const sb = supabaseAdmin;
    const token = randomBytes(24).toString("hex");
    const { data: inv, error } = await sb
      .from("admin_invites")
      .insert({
        email: data.email.toLowerCase(),
        role: data.role,
        token,
      })
      .select("id, email, role, token, expires_at, created_at")
      .single();
    if (error) throw new Error(error.message);
    return { invite: inv };
  });

export const listAdminInvites = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await requireAdmin(context.userId);
    const sb = supabaseAdmin;
    const { data, error } = await sb
      .from("admin_invites")
      .select("id, email, role, token, expires_at, created_at, used_at")
      .is("deleted_at", null)
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return { invites: data ?? [] };
  });

export const revokeAdminInvite = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    await requireAdmin(context.userId);
    const sb = supabaseAdmin;
    const { error } = await sb
      .from("admin_invites")
      .update({ deleted_at: new Date().toISOString(), deleted_by: context.userId })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

const LookupSchema = z.object({ token: z.string().min(8).max(128) });

export const lookupAdminInvite = createServerFn({ method: "GET" })
  .inputValidator((d: unknown) => LookupSchema.parse(d))
  .handler(async ({ data }) => {
    const sb = admin();
    const { data: rows, error } = await sb.rpc("lookup_admin_invite", { p_token: data.token });
    if (error) throw new Error(error.message);
    const row = Array.isArray(rows) ? rows[0] : rows;
    if (!row) throw new Error("Invite not found");
    return { invite: row as { email: string; role: string; expires_at: string; used: boolean } };
  });
