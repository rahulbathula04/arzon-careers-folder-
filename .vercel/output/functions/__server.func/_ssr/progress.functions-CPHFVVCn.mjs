import { c as createServerRpc } from "./createServerRpc-wV0Vk4NU.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CGVBerDj.mjs";
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
const getReportProgress_createServerFn_handler = createServerRpc({
  id: "5a0e7287677644406295efb8a53182a6dd7feedafedb0d6ea484bc8de85025b3",
  name: "getReportProgress",
  filename: "src/lib/report/progress.functions.ts"
}, (opts) => getReportProgress.__executeServer(opts));
const getReportProgress = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(getReportProgress_createServerFn_handler, async ({
  context
}) => {
  const {
    data,
    error
  } = await context.supabase.from("report_progress").select("quiz_profile, employer_tracker, updated_at").eq("user_id", context.userId).maybeSingle();
  if (error) throw error;
  return {
    quizProfile: data?.quiz_profile ?? null,
    employerTracker: data?.employer_tracker ?? {},
    updatedAt: data?.updated_at ?? null
  };
});
const upsertReportProgress_createServerFn_handler = createServerRpc({
  id: "a3ebb223cc220de939232ba0fc9ae82cf18b63993ae0de577b59edc789e37fa6",
  name: "upsertReportProgress",
  filename: "src/lib/report/progress.functions.ts"
}, (opts) => upsertReportProgress.__executeServer(opts));
const upsertReportProgress = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => {
  if (!input || typeof input !== "object") throw new Error("Invalid payload");
  const tracker = input.employerTracker;
  if (tracker && typeof tracker !== "object") throw new Error("Invalid tracker");
  return {
    quizProfile: input.quizProfile ?? null,
    employerTracker: tracker ?? {}
  };
}).handler(upsertReportProgress_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    data: row,
    error
  } = await context.supabase.from("report_progress").upsert({
    user_id: context.userId,
    quiz_profile: data.quizProfile,
    employer_tracker: data.employerTracker,
    updated_at: (/* @__PURE__ */ new Date()).toISOString()
  }, {
    onConflict: "user_id"
  }).select("updated_at").single();
  if (error) throw error;
  return {
    ok: true,
    updatedAt: row.updated_at
  };
});
export {
  getReportProgress_createServerFn_handler,
  upsertReportProgress_createServerFn_handler
};
