import { c as createServerRpc } from "./createServerRpc-wV0Vk4NU.mjs";
import { c as createServerFn } from "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { p as objectType, q as stringType, x as numberType, v as enumType } from "../_libs/zod.mjs";
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
  courseSlug: stringType().min(1).max(80),
  name: stringType().trim().min(2).max(80),
  email: stringType().trim().email().max(120),
  phone: stringType().trim().min(10).max(15),
  city: stringType().trim().max(80).optional().default(""),
  preferredSlot: stringType().trim().max(120).optional().default(""),
  variantLayout: stringType().max(32).optional().default(""),
  variantCta: stringType().max(32).optional().default(""),
  expUid: stringType().max(64).optional().default(""),
  placement: enumType(["hero", "mid", "final"]).default("hero"),
  basePriceInr: numberType().int().positive().max(1e6),
  utmSource: stringType().max(64).optional().default("")
});
const submitCourseEnquiry_createServerFn_handler = createServerRpc({
  id: "11728bdcd5f95d4e95a51c1aee4fd31e9ca9d32b201b812773d010406abd75ee",
  name: "submitCourseEnquiry",
  filename: "src/lib/enquiries.functions.ts"
}, (opts) => submitCourseEnquiry.__executeServer(opts));
const submitCourseEnquiry = createServerFn({
  method: "POST"
}).inputValidator((data) => Schema.parse(data)).handler(submitCourseEnquiry_createServerFn_handler, async ({
  data
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-DUn3rRvm.mjs");
  const {
    data: rows,
    error
  } = await supabaseAdmin.rpc("submit_course_enquiry", {
    p_course_slug: data.courseSlug,
    p_name: data.name,
    p_email: data.email,
    p_phone: data.phone,
    p_city: data.city ?? null,
    p_preferred_slot: data.preferredSlot ?? null,
    p_variant_layout: data.variantLayout ?? null,
    p_variant_cta: data.variantCta ?? null,
    p_exp_uid: data.expUid ?? null,
    p_placement: data.placement,
    p_base_price_inr: data.basePriceInr,
    p_utm_source: data.utmSource ?? null,
    p_user_agent: null
  });
  if (error) {
    console.error("[submitCourseEnquiry] rpc error", error);
    return {
      ok: false,
      error: error.message ?? "failed"
    };
  }
  const row = Array.isArray(rows) ? rows[0] : rows;
  return {
    ok: true,
    intentId: row?.id,
    intentToken: row?.intent_token
  };
});
export {
  submitCourseEnquiry_createServerFn_handler
};
