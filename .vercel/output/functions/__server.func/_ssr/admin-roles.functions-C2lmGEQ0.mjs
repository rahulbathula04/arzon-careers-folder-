import { c as createServerRpc } from "./createServerRpc-wV0Vk4NU.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CGVBerDj.mjs";
import { supabaseAdmin } from "./client.server-DUn3rRvm.mjs";
import { r as requireAdmin } from "./auth-guards.server-Cz9eye0S.mjs";
import { c as createServerFn } from "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { p as objectType, q as stringType } from "../_libs/zod.mjs";
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
const listAdmins_createServerFn_handler = createServerRpc({
  id: "43caaf065d858cec9ed6d45b059b3ce74b6bce0e6e14336e4d50f0df8fa4ff2c",
  name: "listAdmins",
  filename: "src/lib/admin-roles.functions.ts"
}, (opts) => listAdmins.__executeServer(opts));
const listAdmins = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(listAdmins_createServerFn_handler, async ({
  context
}) => {
  await requireAdmin(context.userId);
  const {
    data: roles,
    error
  } = await supabaseAdmin.from("user_roles").select("user_id, created_at").eq("role", "admin").is("deleted_at", null).order("created_at", {
    ascending: true
  });
  if (error) throw new Error(error.message);
  const rows = [];
  for (const r of roles ?? []) {
    const {
      data: u
    } = await supabaseAdmin.auth.admin.getUserById(r.user_id);
    rows.push({
      userId: r.user_id,
      email: u?.user?.email ?? null,
      createdAt: r.created_at
    });
  }
  return rows;
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
const grantAdmin_createServerFn_handler = createServerRpc({
  id: "4789a3aa90a64f04c586e359b5b9d8d96c2ca3cb297e290629e7c8b142fe8bfc",
  name: "grantAdmin",
  filename: "src/lib/admin-roles.functions.ts"
}, (opts) => grantAdmin.__executeServer(opts));
const grantAdmin = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => objectType({
  email: stringType().email().max(254)
}).parse(data)).handler(grantAdmin_createServerFn_handler, async ({
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
    role: "admin"
  });
  if (error && !/duplicate key|unique/i.test(error.message)) {
    throw new Error(error.message);
  }
  return {
    ok: true,
    userId
  };
});
const revokeAdmin_createServerFn_handler = createServerRpc({
  id: "29fe1a8fa1555f5ae3b80e31027016cafeaf59fd4c45a68533d2c9b052301b81",
  name: "revokeAdmin",
  filename: "src/lib/admin-roles.functions.ts"
}, (opts) => revokeAdmin.__executeServer(opts));
const revokeAdmin = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => objectType({
  userId: stringType().uuid()
}).parse(data)).handler(revokeAdmin_createServerFn_handler, async ({
  data,
  context
}) => {
  await requireAdmin(context.userId);
  if (data.userId === context.userId) {
    throw new Error("You cannot revoke your own admin role.");
  }
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
  const {
    error
  } = await supabaseAdmin.from("user_roles").update({
    deleted_at: (/* @__PURE__ */ new Date()).toISOString(),
    deleted_by: context.userId
  }).eq("user_id", data.userId).eq("role", "admin").is("deleted_at", null);
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
export {
  grantAdmin_createServerFn_handler,
  listAdmins_createServerFn_handler,
  revokeAdmin_createServerFn_handler
};
