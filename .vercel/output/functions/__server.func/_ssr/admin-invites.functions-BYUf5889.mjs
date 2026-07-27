import { c as createServerRpc } from "./createServerRpc-wV0Vk4NU.mjs";
import { createClient } from "../_libs/supabase__supabase-js.mjs";
import { randomBytes } from "crypto";
import { r as requireSupabaseAuth } from "./auth-middleware-CGVBerDj.mjs";
import { supabaseAdmin } from "./client.server-DUn3rRvm.mjs";
import { r as requireAdmin } from "./auth-guards.server-Cz9eye0S.mjs";
import { c as createServerFn } from "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { p as objectType, v as enumType, q as stringType } from "../_libs/zod.mjs";
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
import "../_libs/isbot.mjs";
function admin() {
  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      persistSession: false
    }
  });
}
const CreateSchema = objectType({
  email: stringType().email().max(120),
  role: enumType(["admin", "reviewer", "support"])
});
const createAdminInvite_createServerFn_handler = createServerRpc({
  id: "9949d2ccdb384234bb4cd72e2c530026131f6df50e84d8a201af20bd07cdde27",
  name: "createAdminInvite",
  filename: "src/lib/admin-invites.functions.ts"
}, (opts) => createAdminInvite.__executeServer(opts));
const createAdminInvite = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => CreateSchema.parse(d)).handler(createAdminInvite_createServerFn_handler, async ({
  data,
  context
}) => {
  await requireAdmin(context.userId);
  const sb = supabaseAdmin;
  const token = randomBytes(24).toString("hex");
  const {
    data: inv,
    error
  } = await sb.from("admin_invites").insert({
    email: data.email.toLowerCase(),
    role: data.role,
    token
  }).select("id, email, role, token, expires_at, created_at").single();
  if (error) throw new Error(error.message);
  return {
    invite: inv
  };
});
const listAdminInvites_createServerFn_handler = createServerRpc({
  id: "7d7b27bfcbaf284a7147ca03bbdbf8b2685cb738bdf1484f1243c2d85fc9a7bb",
  name: "listAdminInvites",
  filename: "src/lib/admin-invites.functions.ts"
}, (opts) => listAdminInvites.__executeServer(opts));
const listAdminInvites = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(listAdminInvites_createServerFn_handler, async ({
  context
}) => {
  await requireAdmin(context.userId);
  const sb = supabaseAdmin;
  const {
    data,
    error
  } = await sb.from("admin_invites").select("id, email, role, token, expires_at, created_at, used_at").is("deleted_at", null).order("created_at", {
    ascending: false
  });
  if (error) throw new Error(error.message);
  return {
    invites: data ?? []
  };
});
const revokeAdminInvite_createServerFn_handler = createServerRpc({
  id: "09796c945a727fa41907b08b6db9c5e89db2c188c221b4791e4271d733de288a",
  name: "revokeAdminInvite",
  filename: "src/lib/admin-invites.functions.ts"
}, (opts) => revokeAdminInvite.__executeServer(opts));
const revokeAdminInvite = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  id: stringType().uuid()
}).parse(d)).handler(revokeAdminInvite_createServerFn_handler, async ({
  data,
  context
}) => {
  await requireAdmin(context.userId);
  const sb = supabaseAdmin;
  const {
    error
  } = await sb.from("admin_invites").update({
    deleted_at: (/* @__PURE__ */ new Date()).toISOString(),
    deleted_by: context.userId
  }).eq("id", data.id);
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
const LookupSchema = objectType({
  token: stringType().min(8).max(128)
});
const lookupAdminInvite_createServerFn_handler = createServerRpc({
  id: "1db86a91a0eca2f3c64d5fdadf547c620414385132db6db9ab5fe068eab67971",
  name: "lookupAdminInvite",
  filename: "src/lib/admin-invites.functions.ts"
}, (opts) => lookupAdminInvite.__executeServer(opts));
const lookupAdminInvite = createServerFn({
  method: "GET"
}).inputValidator((d) => LookupSchema.parse(d)).handler(lookupAdminInvite_createServerFn_handler, async ({
  data
}) => {
  const sb = admin();
  const {
    data: rows,
    error
  } = await sb.rpc("lookup_admin_invite", {
    p_token: data.token
  });
  if (error) throw new Error(error.message);
  const row = Array.isArray(rows) ? rows[0] : rows;
  if (!row) throw new Error("Invite not found");
  return {
    invite: row
  };
});
export {
  createAdminInvite_createServerFn_handler,
  listAdminInvites_createServerFn_handler,
  lookupAdminInvite_createServerFn_handler,
  revokeAdminInvite_createServerFn_handler
};
