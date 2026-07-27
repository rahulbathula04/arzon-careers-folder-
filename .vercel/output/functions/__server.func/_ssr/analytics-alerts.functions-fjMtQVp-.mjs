import { c as createServerRpc } from "./createServerRpc-wV0Vk4NU.mjs";
import { supabaseAdmin } from "./client.server-DUn3rRvm.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CGVBerDj.mjs";
import { a as requireStaff } from "./auth-guards.server-Cz9eye0S.mjs";
import { c as createServerFn } from "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { p as objectType, w as booleanType, x as numberType } from "../_libs/zod.mjs";
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
const ListSchema = objectType({
  limit: numberType().int().min(1).max(200).optional(),
  openOnly: booleanType().optional()
}).optional();
const getAnalyticsAlerts_createServerFn_handler = createServerRpc({
  id: "1bf5e239da7247688602bc0576f9a7ce34cae1d05979063c06613fdb110380f8",
  name: "getAnalyticsAlerts",
  filename: "src/lib/analytics-alerts.functions.ts"
}, (opts) => getAnalyticsAlerts.__executeServer(opts));
const getAnalyticsAlerts = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => ListSchema.parse(data ?? {})).handler(getAnalyticsAlerts_createServerFn_handler, async ({
  data,
  context
}) => {
  await requireStaff(context.userId);
  const limit = data?.limit ?? 50;
  let q = supabaseAdmin.from("analytics_alerts").select("id, alert_type, event_name, details, fired_at, resolved_at").order("fired_at", {
    ascending: false
  }).limit(limit);
  if (data?.openOnly) q = q.is("resolved_at", null);
  const {
    data: alerts,
    error
  } = await q;
  if (error) throw new Error(error.message);
  const {
    data: configs,
    error: cfgErr
  } = await supabaseAdmin.from("analytics_alert_config").select("event_name, enabled, window_hours, min_count, required_props, notes").order("event_name");
  if (cfgErr) throw new Error(cfgErr.message);
  return {
    alerts: alerts ?? [],
    configs: configs ?? []
  };
});
const runAnalyticsAnomalyCheck_createServerFn_handler = createServerRpc({
  id: "257b614ceea6b2d535878f78aef5452f09ced63b8fffb16ba0bfc01c741d42a1",
  name: "runAnalyticsAnomalyCheck",
  filename: "src/lib/analytics-alerts.functions.ts"
}, (opts) => runAnalyticsAnomalyCheck.__executeServer(opts));
const runAnalyticsAnomalyCheck = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).handler(runAnalyticsAnomalyCheck_createServerFn_handler, async ({
  context
}) => {
  await requireStaff(context.userId);
  const {
    data,
    error
  } = await supabaseAdmin.rpc("check_analytics_anomalies");
  if (error) throw new Error(error.message);
  return {
    alertsInserted: data ?? 0
  };
});
export {
  getAnalyticsAlerts_createServerFn_handler,
  runAnalyticsAnomalyCheck_createServerFn_handler
};
