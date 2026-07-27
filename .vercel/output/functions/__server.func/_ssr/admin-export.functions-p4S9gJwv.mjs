import { c as createServerRpc } from "./createServerRpc-wV0Vk4NU.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CGVBerDj.mjs";
import { b as requireResultsExport } from "./auth-guards.server-Cz9eye0S.mjs";
import { c as createServerFn } from "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { p as objectType, z as recordType, q as stringType, A as unknownType, x as numberType } from "../_libs/zod.mjs";
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
import "./client.server-DUn3rRvm.mjs";
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
const recordAdminExport_createServerFn_handler = createServerRpc({
  id: "efadad4220f15a12f94dc520a2d24405c59cb6340d8567694c8b7ea17cc3b0c8",
  name: "recordAdminExport",
  filename: "src/lib/admin-export.functions.ts"
}, (opts) => recordAdminExport.__executeServer(opts));
const recordAdminExport = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  resource: stringType().min(1).max(64).regex(/^[a-z0-9_\-]+$/),
  rowCount: numberType().int().min(0).max(1e6),
  details: recordType(stringType().min(1).max(64), unknownType()).optional()
}).parse(input)).handler(recordAdminExport_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabase
  } = context;
  if (data.resource === "career_engine_results") {
    await requireResultsExport(context.userId);
  }
  const {
    error
  } = await supabase.rpc("record_admin_export", {
    _resource: data.resource,
    _row_count: data.rowCount,
    _details: data.details ?? {}
  });
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
export {
  recordAdminExport_createServerFn_handler
};
