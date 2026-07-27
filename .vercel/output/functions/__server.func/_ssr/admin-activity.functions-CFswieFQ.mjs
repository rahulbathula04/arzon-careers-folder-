import { c as createServerRpc } from "./createServerRpc-wV0Vk4NU.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CGVBerDj.mjs";
import { supabaseAdmin } from "./client.server-DUn3rRvm.mjs";
import { r as requireAdmin } from "./auth-guards.server-Cz9eye0S.mjs";
import { c as createServerFn } from "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { p as objectType, x as numberType, q as stringType } from "../_libs/zod.mjs";
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
const ActivitySchema = objectType({
  action: stringType().max(64).optional(),
  actorId: stringType().uuid().optional(),
  resource: stringType().max(64).optional(),
  sinceHours: numberType().int().min(1).max(24 * 365).optional(),
  limit: numberType().int().min(1).max(2e3).optional()
});
const listAdminActivity_createServerFn_handler = createServerRpc({
  id: "356f32c800efa18b7eba291d33e92a960fce2b39a6a58210bdaca33be64b399a",
  name: "listAdminActivity",
  filename: "src/lib/admin-activity.functions.ts"
}, (opts) => listAdminActivity.__executeServer(opts));
const listAdminActivity = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((data) => ActivitySchema.parse(data ?? {})).handler(listAdminActivity_createServerFn_handler, async ({
  data,
  context
}) => {
  await requireAdmin(context.userId);
  const since = data.sinceHours ? new Date(Date.now() - data.sinceHours * 36e5).toISOString() : null;
  const {
    data: rows,
    error
  } = await supabaseAdmin.rpc("list_admin_activity", {
    _action: data.action ?? void 0,
    _actor_id: data.actorId ?? void 0,
    _resource: data.resource ?? void 0,
    _since: since ?? void 0,
    _limit: data.limit ?? 500
  });
  if (error) throw new Error(error.message);
  const list = rows ?? [];
  const actorIds = Array.from(new Set(list.map((r) => r.actor_id).filter(Boolean)));
  const emails = /* @__PURE__ */ new Map();
  const rolesByActor = /* @__PURE__ */ new Map();
  for (const id of actorIds) {
    const {
      data: u
    } = await supabaseAdmin.auth.admin.getUserById(id);
    emails.set(id, u?.user?.email ?? null);
    const {
      data: rr
    } = await supabaseAdmin.from("user_roles").select("role").eq("user_id", id).is("deleted_at", null);
    rolesByActor.set(id, (rr ?? []).map((x) => String(x.role)));
  }
  const out = list.map((r) => ({
    id: r.id,
    occurredAt: r.occurred_at,
    actorId: r.actor_id,
    actorEmail: r.actor_id ? emails.get(r.actor_id) ?? null : null,
    actorRoles: r.actor_id ? rolesByActor.get(r.actor_id) ?? [] : [],
    action: r.action,
    tableName: r.table_name,
    recordId: r.record_id,
    diff: r.diff ?? {}
  }));
  const actors = Array.from(new Map(actorIds.map((id) => [id, {
    id,
    email: emails.get(id) ?? null
  }])).values());
  const actions = Array.from(new Set(out.map((r) => r.action))).sort();
  return {
    rows: out,
    actors,
    actions
  };
});
export {
  listAdminActivity_createServerFn_handler
};
