import { c as createServerRpc } from "./createServerRpc-wV0Vk4NU.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CGVBerDj.mjs";
import { supabaseAdmin } from "./client.server-DUn3rRvm.mjs";
import { r as requireAdmin } from "./auth-guards.server-Cz9eye0S.mjs";
import { c as createServerFn } from "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
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
const clearTestEvents_createServerFn_handler = createServerRpc({
  id: "ba002a653b4789a1f8574ccb866a2ebea1bb92ef717e01a2a113262057ed04aa",
  name: "clearTestEvents",
  filename: "src/lib/analytics-test.functions.ts"
}, (opts) => clearTestEvents.__executeServer(opts));
const clearTestEvents = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).handler(clearTestEvents_createServerFn_handler, async ({
  context
}) => {
  await requireAdmin(context.userId);
  const {
    error,
    count
  } = await supabaseAdmin.from("analytics_events").delete({
    count: "exact"
  }).filter("props->>test", "eq", "true");
  if (error) throw new Error(error.message);
  return {
    deleted: count ?? 0
  };
});
export {
  clearTestEvents_createServerFn_handler
};
