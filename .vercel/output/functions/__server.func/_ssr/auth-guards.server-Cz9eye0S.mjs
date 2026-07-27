import { supabaseAdmin } from "./client.server-DUn3rRvm.mjs";
class ForbiddenError extends Error {
  status = 403;
  constructor(message = "Forbidden") {
    super(message);
    this.name = "ForbiddenError";
  }
}
async function loadRoles(userId) {
  if (!userId) return [];
  const { data, error } = await supabaseAdmin.from("user_roles").select("role").eq("user_id", userId).is("deleted_at", null);
  if (error) throw new Error(error.message);
  return (data ?? []).map((r) => r.role);
}
async function requireRole(userId, allowed = ["admin", "reviewer", "support"]) {
  const roles = await loadRoles(userId);
  if (!roles.some((r) => allowed.includes(r))) {
    throw new ForbiddenError(`Forbidden: requires one of ${allowed.join(", ")}`);
  }
  return roles;
}
const requireAdmin = (userId) => requireRole(userId, ["admin"]);
const requireStaff = (userId) => requireRole(userId, ["admin", "reviewer", "support"]);
const requireResultsView = (userId) => requireRole(userId, ["admin", "analyst", "exporter", "viewer"]);
const requireResultsExport = (userId) => requireRole(userId, ["admin", "exporter"]);
async function loadUserRoles(userId) {
  if (!userId) return [];
  const { data, error } = await supabaseAdmin.from("user_roles").select("role").eq("user_id", userId).is("deleted_at", null);
  if (error) throw new Error(error.message);
  return (data ?? []).map((r) => r.role);
}
export {
  requireStaff as a,
  requireResultsExport as b,
  requireResultsView as c,
  requireRole as d,
  loadUserRoles as l,
  requireAdmin as r
};
