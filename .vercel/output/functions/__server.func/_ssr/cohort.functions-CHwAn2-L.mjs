import { c as createServerRpc } from "./createServerRpc-wV0Vk4NU.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CGVBerDj.mjs";
import { c as createServerFn } from "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { p as objectType, q as stringType, x as numberType, w as booleanType } from "../_libs/zod.mjs";
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
const idSchema = objectType({
  id: stringType().min(1).max(64)
});
async function assertAdmin(ctx) {
  const {
    data,
    error
  } = await ctx.supabase.rpc("has_role", {
    _user_id: ctx.userId,
    _role: "admin"
  });
  if (error) throw new Response("Forbidden", {
    status: 403
  });
  if (!data) throw new Response("Forbidden", {
    status: 403
  });
}
const getCohortStatus_createServerFn_handler = createServerRpc({
  id: "7a98acfaade324c88e03d14178be0063ccc35feb91462129eacecc7c0e40289b",
  name: "getCohortStatus",
  filename: "src/lib/cohort.functions.ts"
}, (opts) => getCohortStatus.__executeServer(opts));
const getCohortStatus = createServerFn({
  method: "GET"
}).inputValidator((i) => idSchema.parse(i)).handler(getCohortStatus_createServerFn_handler, async ({
  data
}) => {
  const {
    createClient
  } = await import("../_libs/supabase__supabase-js.mjs");
  const url = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY ?? process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return null;
  const sb = createClient(url, key, {
    auth: {
      storage: void 0,
      persistSession: false,
      autoRefreshToken: false
    }
  });
  const {
    data: rows,
    error
  } = await sb.rpc("get_cohort_status", {
    p_id: data.id
  });
  if (error) {
    console.error("[getCohortStatus]", error);
    return null;
  }
  const row = Array.isArray(rows) ? rows[0] : rows;
  if (!row) return null;
  return {
    id: row.id,
    displayLabel: row.display_label,
    startsAt: row.starts_at,
    lockAt: row.lock_at,
    seatsCap: row.seats_cap,
    seatsTaken: row.seats_taken,
    seatsLeft: row.seats_left,
    isLocked: row.is_locked,
    lockReason: row.lock_reason ?? null,
    effectiveLocked: row.effective_locked,
    serverNow: row.server_now
  };
});
const setCapSchema = objectType({
  id: stringType().min(1).max(64),
  cap: numberType().int().min(1).max(1e4)
});
const setLockSchema = objectType({
  id: stringType().min(1).max(64),
  locked: booleanType(),
  reason: stringType().trim().max(240).optional().nullable()
});
const adminSetCohortCapacity_createServerFn_handler = createServerRpc({
  id: "7c41091e72cb4cab84bab5013eeea465ce6dea2c4bf9071b90ab9bacaecd89b1",
  name: "adminSetCohortCapacity",
  filename: "src/lib/cohort.functions.ts"
}, (opts) => adminSetCohortCapacity.__executeServer(opts));
const adminSetCohortCapacity = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((i) => setCapSchema.parse(i)).handler(adminSetCohortCapacity_createServerFn_handler, async ({
  data,
  context
}) => {
  await assertAdmin(context);
  const {
    error
  } = await context.supabase.rpc("admin_set_cohort_capacity", {
    p_id: data.id,
    p_cap: data.cap
  });
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
const adminSetCohortLock_createServerFn_handler = createServerRpc({
  id: "05f900eb27aca4e512202f172c250ebf0165a1ef17e61003b0e4ca314f92d775",
  name: "adminSetCohortLock",
  filename: "src/lib/cohort.functions.ts"
}, (opts) => adminSetCohortLock.__executeServer(opts));
const adminSetCohortLock = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((i) => setLockSchema.parse(i)).handler(adminSetCohortLock_createServerFn_handler, async ({
  data,
  context
}) => {
  await assertAdmin(context);
  const {
    error
  } = await context.supabase.rpc("admin_set_cohort_lock", {
    p_id: data.id,
    p_locked: data.locked,
    p_reason: data.reason ?? null
  });
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
const adminListCohorts_createServerFn_handler = createServerRpc({
  id: "eedba752e2a5170f3845d9ca2ae5113ad38a65bdef2958ab514b06c9d60bd1cc",
  name: "adminListCohorts",
  filename: "src/lib/cohort.functions.ts"
}, (opts) => adminListCohorts.__executeServer(opts));
const adminListCohorts = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(adminListCohorts_createServerFn_handler, async ({
  context
}) => {
  await assertAdmin(context);
  const {
    data,
    error
  } = await context.supabase.rpc("admin_list_cohorts");
  if (error) throw new Error(error.message);
  return data ?? [];
});
const auditSchema = objectType({
  id: stringType().min(1).max(64).optional().nullable(),
  limit: numberType().int().min(1).max(500).optional()
});
const adminCohortAudit_createServerFn_handler = createServerRpc({
  id: "4fd3072c6e3418404251d01685d259646cc47a57cabfd47730d9ed6e0e741bfd",
  name: "adminCohortAudit",
  filename: "src/lib/cohort.functions.ts"
}, (opts) => adminCohortAudit.__executeServer(opts));
const adminCohortAudit = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((i) => auditSchema.parse(i)).handler(adminCohortAudit_createServerFn_handler, async ({
  data,
  context
}) => {
  await assertAdmin(context);
  const {
    data: rows,
    error
  } = await context.supabase.rpc("admin_cohort_audit", {
    p_id: data.id ?? null,
    p_limit: data.limit ?? 100
  });
  if (error) throw new Error(error.message);
  return rows ?? [];
});
export {
  adminCohortAudit_createServerFn_handler,
  adminListCohorts_createServerFn_handler,
  adminSetCohortCapacity_createServerFn_handler,
  adminSetCohortLock_createServerFn_handler,
  getCohortStatus_createServerFn_handler
};
