import { c as createServerRpc } from "./createServerRpc-wV0Vk4NU.mjs";
import { createClient } from "../_libs/supabase__supabase-js.mjs";
import { c as createServerFn } from "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { p as objectType, z as recordType, q as stringType, A as unknownType, v as enumType } from "../_libs/zod.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
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
const Schema = objectType({
  uid: stringType().min(8).max(64),
  experiment: stringType().min(1).max(64),
  variant: enumType(["control", "variant"]),
  event: enumType(["exposure", "cta_click", "form_open", "form_submit", "whatsapp_click", "razorpay_open", "razorpay_success", "enrolment_paid"]),
  courseSlug: stringType().min(1).max(80).optional(),
  props: recordType(stringType(), unknownType()).optional()
});
const logExperimentEvent_createServerFn_handler = createServerRpc({
  id: "f72ba63d20727a14eb4afab0da2bcc4d3dec13b84418233c1433cdce486b203f",
  name: "logExperimentEvent",
  filename: "src/lib/experiments.functions.ts"
}, (opts) => logExperimentEvent.__executeServer(opts));
const logExperimentEvent = createServerFn({
  method: "POST"
}).inputValidator((data) => Schema.parse(data)).handler(logExperimentEvent_createServerFn_handler, async ({
  data
}) => {
  const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_PUBLISHABLE_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
  const {
    error
  } = await sb.from("experiment_events").insert({
    uid: data.uid,
    experiment: data.experiment,
    variant: data.variant,
    event: data.event,
    course_slug: data.courseSlug ?? null,
    props: data.props ?? {}
  });
  if (error) return {
    ok: false,
    error: error.message
  };
  return {
    ok: true
  };
});
export {
  logExperimentEvent_createServerFn_handler
};
