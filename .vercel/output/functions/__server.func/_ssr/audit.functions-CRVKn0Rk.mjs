import { c as createServerRpc } from "./createServerRpc-wV0Vk4NU.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CGVBerDj.mjs";
import { supabaseAdmin } from "./client.server-DUn3rRvm.mjs";
import { r as requireAdmin } from "./auth-guards.server-Cz9eye0S.mjs";
import { c as createServerFn } from "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { p as objectType, x as numberType, v as enumType, q as stringType } from "../_libs/zod.mjs";
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
const SOFT_DELETE_TABLES = ["applications", "career_engine_leads", "enrolment_intents", "counsellor_leads", "arzonprime60_waitlist", "demand_votes", "certificates", "admin_invites", "user_roles", "course_thumbnail_overrides"];
const ListSchema = objectType({
  table: stringType().max(64).optional(),
  action: enumType(["insert", "update", "archive", "restore", "hard_delete"]).optional(),
  limit: numberType().int().min(1).max(500).optional()
});
const listAuditLog_createServerFn_handler = createServerRpc({
  id: "2457e6d5b2a6d8c9cffacf3a223926670d2a925f7f1bd62df2590832bd7113a0",
  name: "listAuditLog",
  filename: "src/lib/audit.functions.ts"
}, (opts) => listAuditLog.__executeServer(opts));
const listAuditLog = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((d) => ListSchema.parse(d ?? {})).handler(listAuditLog_createServerFn_handler, async ({
  data,
  context
}) => {
  await requireAdmin(context.userId);
  let q = supabaseAdmin.from("audit_log").select("id, occurred_at, actor_id, table_name, record_id, action, diff").order("occurred_at", {
    ascending: false
  }).limit(data.limit ?? 200);
  if (data.table) q = q.eq("table_name", data.table);
  if (data.action) q = q.eq("action", data.action);
  const {
    data: rows,
    error
  } = await q;
  if (error) throw new Error(error.message);
  return {
    rows: rows ?? []
  };
});
const RestoreSchema = objectType({
  table: enumType(SOFT_DELETE_TABLES),
  id: stringType().min(1).max(64)
});
const restoreRecord_createServerFn_handler = createServerRpc({
  id: "080d9565d89460dc658df79c1f7aa655d26197b4f1b8b1e984b213cd9a4529ed",
  name: "restoreRecord",
  filename: "src/lib/audit.functions.ts"
}, (opts) => restoreRecord.__executeServer(opts));
const restoreRecord = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => RestoreSchema.parse(d)).handler(restoreRecord_createServerFn_handler, async ({
  data,
  context
}) => {
  await requireAdmin(context.userId);
  const {
    error
  } = await supabaseAdmin.from(data.table).update({
    deleted_at: null,
    deleted_by: null
  }).eq("id", data.id);
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
export {
  listAuditLog_createServerFn_handler,
  restoreRecord_createServerFn_handler
};
