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
const getMyEnrolments_createServerFn_handler = createServerRpc({
  id: "1eadefdb5aed79b1fd8e077a7a5dfbdf0ff6b3cb86441f17e8f395116222618b",
  name: "getMyEnrolments",
  filename: "src/lib/learner.functions.ts"
}, (opts) => getMyEnrolments.__executeServer(opts));
const getMyEnrolments = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(getMyEnrolments_createServerFn_handler, async ({
  context
}) => {
  const {
    supabase,
    userId
  } = context;
  const {
    data,
    error
  } = await supabase.from("enrolments").select("id, tier, cohort_id, status, amount_inr, paid_at, provisioned_at, email").eq("user_id", userId).order("paid_at", {
    ascending: false
  });
  if (error) throw new Error(error.message);
  return data ?? [];
});
const getMySubmissions_createServerFn_handler = createServerRpc({
  id: "a0f94959601c3f74f420d2101f1ae301511c74759e46ab165f8d7effba5a5285",
  name: "getMySubmissions",
  filename: "src/lib/learner.functions.ts"
}, (opts) => getMySubmissions.__executeServer(opts));
const getMySubmissions = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(getMySubmissions_createServerFn_handler, async ({
  context
}) => {
  const {
    supabase,
    userId
  } = context;
  const {
    data,
    error
  } = await supabase.from("submissions").select("id, enrolment_id, title, status, submitted_at, reviewed_at, mentor_feedback").eq("user_id", userId).order("submitted_at", {
    ascending: false
  }).limit(50);
  if (error) throw new Error(error.message);
  return data ?? [];
});
export {
  getMyEnrolments_createServerFn_handler,
  getMySubmissions_createServerFn_handler
};
