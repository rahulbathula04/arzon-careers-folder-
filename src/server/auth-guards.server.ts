import { supabaseAdmin } from "@/integrations/supabase/client.server";

export type AppRole = "admin" | "reviewer" | "support" | "viewer" | "analyst" | "exporter";

/** Forbidden error that surfaces as a 403 when thrown from a server fn. */
export class ForbiddenError extends Error {
  status = 403;
  constructor(message = "Forbidden") {
    super(message);
    this.name = "ForbiddenError";
  }
}

/**
 * Returns the set of roles the user holds. Uses the service-role client so
 * the lookup is not subject to RLS recursion or row visibility.
 */
async function loadRoles(userId: string): Promise<AppRole[]> {
  if (!userId) return [];
  const { data, error } = await supabaseAdmin
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .is("deleted_at", null);
  if (error) throw new Error(error.message);
  return (data ?? []).map((r) => r.role as AppRole);
}

/** Throws ForbiddenError unless the caller holds at least one of `allowed`. */
export async function requireRole(
  userId: string,
  allowed: AppRole[] = ["admin", "reviewer", "support"],
): Promise<AppRole[]> {
  const roles = await loadRoles(userId);
  if (!roles.some((r) => allowed.includes(r))) {
    throw new ForbiddenError(`Forbidden: requires one of ${allowed.join(", ")}`);
  }
  return roles;
}

/** Convenience for admin-only endpoints. */
export const requireAdmin = (userId: string) => requireRole(userId, ["admin"]);

/** Convenience for staff endpoints (admin/reviewer/support). */
export const requireStaff = (userId: string) =>
  requireRole(userId, ["admin", "reviewer", "support"]);

/** Read-only access to /admin/results (PII may be masked depending on role). */
export const requireResultsView = (userId: string) =>
  requireRole(userId, ["admin", "analyst", "exporter", "viewer"]);

/** Permission to see un-masked PII on /admin/results. */
export const requireResultsPII = (userId: string) =>
  requireRole(userId, ["admin", "analyst", "exporter"]);

/** Permission to download CSV exports from /admin/results. */
export const requireResultsExport = (userId: string) => requireRole(userId, ["admin", "exporter"]);

/** Read all roles without enforcing - used for capability flags on the client. */
export async function loadUserRoles(userId: string): Promise<AppRole[]> {
  if (!userId) return [];
  const { data, error } = await supabaseAdmin
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .is("deleted_at", null);
  if (error) throw new Error(error.message);
  return (data ?? []).map((r) => r.role as AppRole);
}
