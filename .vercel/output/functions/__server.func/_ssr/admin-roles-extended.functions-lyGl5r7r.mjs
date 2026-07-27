import { c as createServerRpc } from "./createServerRpc-wV0Vk4NU.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CGVBerDj.mjs";
import { supabaseAdmin } from "./client.server-DUn3rRvm.mjs";
import { r as requireAdmin } from "./auth-guards.server-Cz9eye0S.mjs";
import { c as createServerFn } from "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { p as objectType, v as enumType, q as stringType } from "../_libs/zod.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "./createMiddleware-BvN2ghIY.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "../_libs/isbot.mjs";
const ROLE_VALUES = ["admin", "reviewer", "support", "viewer", "analyst", "exporter"];
const listRoleAssignments_createServerFn_handler = createServerRpc({
  id: "bde3ffa4211e8425af7edd50706889c3432eb3d8df3f6dc842bd19bafe1d56a7",
  name: "listRoleAssignments",
  filename: "src/lib/admin-roles-extended.functions.ts"
}, (opts) => listRoleAssignments.__executeServer(opts));
const listRoleAssignments = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(listRoleAssignments_createServerFn_handler, async ({
  context
}) => {
  await requireAdmin(context.userId);
  const {
    data,
    error
  } = await supabaseAdmin.from("user_roles").select("user_id, role, created_at").is("deleted_at", null).in("role", [...ROLE_VALUES]).order("created_at", {
    ascending: true
  });
  if (error) throw new Error(error.message);
  const ids = Array.from(new Set((data ?? []).map((r) => r.user_id)));
  const emails = /* @__PURE__ */ new Map();
  for (const id of ids) {
    const {
      data: u
    } = await supabaseAdmin.auth.admin.getUserById(id);
    emails.set(id, u?.user?.email ?? null);
  }
  return (data ?? []).map((r) => ({
    userId: r.user_id,
    role: r.role,
    email: emails.get(r.user_id) ?? null,
    createdAt: r.created_at
  }));
});
async function findUserIdByEmail(email) {
  const perPage = 200;
  for (let page = 1; page <= 50; page++) {
    const {
      data,
      error
    } = await supabaseAdmin.auth.admin.listUsers({
      page,
      perPage
    });
    if (error) throw new Error(error.message);
    const match = data.users.find((u) => (u.email ?? "").toLowerCase() === email.toLowerCase());
    if (match) return match.id;
    if (data.users.length < perPage) break;
  }
  return null;
}
const grantWorkspaceRole_createServerFn_handler = createServerRpc({
  id: "ec4c41aad24db1ea5c2160fdb3230e161c8026c3e1eb10c54db41be4bab64649",
  name: "grantWorkspaceRole",
  filename: "src/lib/admin-roles-extended.functions.ts"
}, (opts) => grantWorkspaceRole.__executeServer(opts));
const grantWorkspaceRole = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => objectType({
  email: stringType().email().max(254),
  role: enumType(ROLE_VALUES)
}).parse(data)).handler(grantWorkspaceRole_createServerFn_handler, async ({
  data,
  context
}) => {
  await requireAdmin(context.userId);
  const userId = await findUserIdByEmail(data.email);
  if (!userId) {
    throw new Error("No account found with that email. Ask them to sign up at /admin/login first.");
  }
  const {
    error
  } = await supabaseAdmin.from("user_roles").insert({
    user_id: userId,
    role: data.role
  });
  if (error && !/duplicate key|unique/i.test(error.message)) {
    throw new Error(error.message);
  }
  try {
    await context.supabase.rpc("log_admin_action", {
      _action: "role_granted",
      _resource: "user_roles",
      _record_id: userId,
      _diff: {
        email: data.email,
        role: data.role
      }
    });
  } catch {
  }
  return {
    ok: true,
    userId
  };
});
const revokeWorkspaceRole_createServerFn_handler = createServerRpc({
  id: "b54e157f398325f26a2a54a40f1224f6cfcca0bd043554b3e77aa705aaf6c89a",
  name: "revokeWorkspaceRole",
  filename: "src/lib/admin-roles-extended.functions.ts"
}, (opts) => revokeWorkspaceRole.__executeServer(opts));
const revokeWorkspaceRole = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => objectType({
  userId: stringType().uuid(),
  role: enumType(ROLE_VALUES)
}).parse(data)).handler(revokeWorkspaceRole_createServerFn_handler, async ({
  data,
  context
}) => {
  await requireAdmin(context.userId);
  if (data.role === "admin" && data.userId === context.userId) {
    throw new Error("You cannot revoke your own admin role.");
  }
  if (data.role === "admin") {
    const {
      count,
      error: countErr
    } = await supabaseAdmin.from("user_roles").select("*", {
      count: "exact",
      head: true
    }).eq("role", "admin").is("deleted_at", null);
    if (countErr) throw new Error(countErr.message);
    if ((count ?? 0) <= 1) {
      throw new Error("Cannot revoke the last remaining admin.");
    }
  }
  const {
    error
  } = await supabaseAdmin.from("user_roles").update({
    deleted_at: (/* @__PURE__ */ new Date()).toISOString(),
    deleted_by: context.userId
  }).eq("user_id", data.userId).eq("role", data.role).is("deleted_at", null);
  if (error) throw new Error(error.message);
  try {
    await context.supabase.rpc("log_admin_action", {
      _action: "role_revoked",
      _resource: "user_roles",
      _record_id: data.userId,
      _diff: {
        role: data.role
      }
    });
  } catch {
  }
  return {
    ok: true
  };
});
export {
  grantWorkspaceRole_createServerFn_handler,
  listRoleAssignments_createServerFn_handler,
  revokeWorkspaceRole_createServerFn_handler
};
