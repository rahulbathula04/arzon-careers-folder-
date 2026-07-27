import { c as createServerRpc } from "./createServerRpc-wV0Vk4NU.mjs";
import { supabaseAdmin } from "./client.server-DUn3rRvm.mjs";
import { T as TIER_META, g as getTierPricing } from "./enrolmentTiers-CKOrj6Lb.mjs";
import { c as createServerFn } from "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { v as enumType, p as objectType, q as stringType, x as numberType } from "../_libs/zod.mjs";
import "../_libs/supabase__supabase-js.mjs";
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
const rpc = (name, args) => supabaseAdmin.rpc(name, args);
const tierEnum = enumType(["essential", "career", "elite"]);
const createSchema = objectType({
  tier: tierEnum,
  name: stringType().trim().min(2).max(80),
  email: stringType().trim().email().max(120),
  phone: stringType().trim().min(10).max(20),
  city: stringType().trim().max(80).optional().nullable(),
  background: stringType().trim().max(120).optional().nullable(),
  basePriceInr: numberType().int().positive().max(1e7).optional(),
  leadId: stringType().uuid().optional().nullable(),
  utmSource: stringType().trim().max(64).optional().nullable(),
  userAgent: stringType().trim().max(256).optional().nullable()
});
const fallbackIntentStore = /* @__PURE__ */ new Map();
function generateFallbackToken() {
  return "token_" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
function generateUuid() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) => (Number(c) ^ Math.random() * 16 >> Number(c) / 4).toString(16));
}
function isSupabaseConfigured() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return Boolean(key && !key.includes("paste_your"));
}
const createEnrolmentIntent_createServerFn_handler = createServerRpc({
  id: "d53e9cafa332a86af343128fe4b60556305dd9fa429d0062e6a80075f3c3f573",
  name: "createEnrolmentIntent",
  filename: "src/lib/enrolment.functions.ts"
}, (opts) => createEnrolmentIntent.__executeServer(opts));
const createEnrolmentIntent = createServerFn({
  method: "POST"
}).inputValidator((input) => createSchema.parse(input)).handler(createEnrolmentIntent_createServerFn_handler, async ({
  data
}) => {
  const canonicalPrice = TIER_META[data.tier].mrpInr;
  if (isSupabaseConfigured()) {
    try {
      const {
        data: rows,
        error
      } = await rpc("create_enrolment_intent", {
        p_tier: data.tier,
        p_name: data.name,
        p_email: data.email,
        p_phone: data.phone,
        p_city: data.city ?? null,
        p_background: data.background ?? null,
        p_base_price_inr: canonicalPrice,
        p_lead_id: data.leadId ?? null,
        p_utm_source: data.utmSource ?? null,
        p_user_agent: data.userAgent ?? null
      });
      if (!error) {
        const row = Array.isArray(rows) ? rows[0] : rows;
        if (row?.id && row?.intent_token) {
          return {
            intentId: row.id,
            intentToken: row.intent_token
          };
        }
      } else {
        console.warn("[enrolment] Supabase RPC create_enrolment_intent failed, using resilient fallback:", error.message);
      }
    } catch (err) {
      console.warn("[enrolment] Supabase connection error in createEnrolmentIntent, using resilient fallback:", err);
    }
  }
  const intentId = generateUuid();
  const intentToken = generateFallbackToken();
  const fallbackItem = {
    id: intentId,
    intentToken,
    tier: data.tier,
    name: data.name,
    email: data.email,
    phone: data.phone,
    city: data.city ?? null,
    background: data.background ?? null,
    basePriceInr: canonicalPrice,
    couponCode: null,
    discountPct: null,
    couponExpiresAt: null,
    status: "pending",
    finalPriceInr: canonicalPrice,
    razorpayOrderId: null,
    razorpayPaymentId: null,
    failureReason: null,
    paidAt: null,
    preRegistrationInitiatedAt: null,
    preRegistrationAmountInr: null,
    balanceDueInr: null,
    balanceDueAt: null,
    balancePaidAt: null
  };
  fallbackIntentStore.set(intentId, fallbackItem);
  return {
    intentId,
    intentToken
  };
});
const applySchema = objectType({
  intentId: stringType().uuid(),
  intentToken: stringType().min(16).max(64),
  code: stringType().trim().min(2).max(32)
});
const applyEnrolmentCoupon_createServerFn_handler = createServerRpc({
  id: "9211b0cb4061e4e2ef55696ec54afd0774d6ec3fc5233af2f85224cd91073216",
  name: "applyEnrolmentCoupon",
  filename: "src/lib/enrolment.functions.ts"
}, (opts) => applyEnrolmentCoupon.__executeServer(opts));
const applyEnrolmentCoupon = createServerFn({
  method: "POST"
}).inputValidator((input) => applySchema.parse(input)).handler(applyEnrolmentCoupon_createServerFn_handler, async ({
  data
}) => {
  if (isSupabaseConfigured()) {
    try {
      const {
        data: rows,
        error
      } = await rpc("apply_enrolment_coupon", {
        p_intent_id: data.intentId,
        p_code: data.code,
        p_intent_token: data.intentToken
      });
      if (!error) {
        const row = Array.isArray(rows) ? rows[0] : rows;
        if (row?.coupon_code) {
          return {
            ok: true,
            couponCode: row.coupon_code,
            discountPct: row.discount_pct,
            couponExpiresAt: row.coupon_expires_at,
            status: row.status,
            finalPriceInr: row.final_price_inr
          };
        }
      }
    } catch (e) {
      console.warn("[enrolment] Supabase apply_enrolment_coupon failed, using fallback:", e);
    }
  }
  const item = fallbackIntentStore.get(data.intentId);
  const tier = item?.tier ?? "career";
  const codeUpper = data.code.toUpperCase();
  const pricing = getTierPricing(tier, codeUpper);
  if (!pricing.isOfferApplied) {
    return {
      ok: false,
      error: "Invalid or expired coupon code. Try ARZONPRIME60 for special unlock pricing."
    };
  }
  const expiresAt = new Date(Date.now() + 36e5).toISOString();
  if (item) {
    item.couponCode = codeUpper;
    item.discountPct = pricing.discountPct;
    item.couponExpiresAt = expiresAt;
    item.finalPriceInr = pricing.finalPriceInr;
  }
  return {
    ok: true,
    couponCode: codeUpper,
    discountPct: pricing.discountPct,
    couponExpiresAt: expiresAt,
    status: item?.status ?? "pending",
    finalPriceInr: pricing.finalPriceInr
  };
});
const idSchema = objectType({
  intentId: stringType().uuid(),
  intentToken: stringType().min(16).max(64)
});
const getEnrolmentIntent_createServerFn_handler = createServerRpc({
  id: "d3d24128135c3e28f586dda698c3eade75a2881b6aaf1c22b38298070065bc1a",
  name: "getEnrolmentIntent",
  filename: "src/lib/enrolment.functions.ts"
}, (opts) => getEnrolmentIntent.__executeServer(opts));
const getEnrolmentIntent = createServerFn({
  method: "GET"
}).inputValidator((input) => idSchema.parse(input)).handler(getEnrolmentIntent_createServerFn_handler, async ({
  data
}) => {
  if (fallbackIntentStore.has(data.intentId)) {
    const item = fallbackIntentStore.get(data.intentId);
    return {
      ...item
    };
  }
  if (isSupabaseConfigured()) {
    try {
      const {
        data: rows,
        error
      } = await rpc("get_enrolment_intent", {
        p_intent_id: data.intentId,
        p_intent_token: data.intentToken
      });
      if (!error) {
        const row = Array.isArray(rows) ? rows[0] : rows;
        if (row) {
          return {
            id: row.id,
            tier: row.tier,
            name: row.name,
            email: row.email,
            phone: row.phone,
            basePriceInr: row.base_price_inr,
            couponCode: row.coupon_code ?? null,
            discountPct: row.discount_pct ?? null,
            couponExpiresAt: row.coupon_expires_at ?? null,
            status: row.status,
            finalPriceInr: row.final_price_inr ?? null,
            razorpayOrderId: row.razorpay_order_id ?? null,
            razorpayPaymentId: row.razorpay_payment_id ?? null,
            failureReason: row.failure_reason ?? null,
            paidAt: row.paid_at ?? null,
            preRegistrationInitiatedAt: row.pre_registration_initiated_at ?? null,
            preRegistrationAmountInr: row.pre_registration_amount_inr ?? null,
            balanceDueInr: row.balance_due_inr ?? null,
            balanceDueAt: row.balance_due_at ?? null,
            balancePaidAt: row.balance_paid_at ?? null
          };
        }
      }
    } catch (err) {
      console.warn("[enrolment] Supabase get_enrolment_intent failed, generating synthetic fallback:", err);
    }
  }
  return {
    id: data.intentId,
    tier: "career",
    name: "Enrolment Applicant",
    email: "applicant@arzon.com",
    phone: "+91 9876543210",
    basePriceInr: TIER_META.career.mrpInr,
    couponCode: null,
    discountPct: null,
    couponExpiresAt: null,
    status: "pending",
    finalPriceInr: TIER_META.career.mrpInr,
    razorpayOrderId: "order_mock_" + data.intentId.slice(0, 8),
    razorpayPaymentId: null,
    failureReason: null,
    paidAt: null,
    preRegistrationInitiatedAt: null,
    preRegistrationAmountInr: null,
    balanceDueInr: null,
    balanceDueAt: null,
    balancePaidAt: null
  };
});
const expireEnrolmentCoupon_createServerFn_handler = createServerRpc({
  id: "90cde55ab49b6f4d624d321a492897beed377b04635571745ccc111bb54148c2",
  name: "expireEnrolmentCoupon",
  filename: "src/lib/enrolment.functions.ts"
}, (opts) => expireEnrolmentCoupon.__executeServer(opts));
const expireEnrolmentCoupon = createServerFn({
  method: "POST"
}).inputValidator((input) => idSchema.parse(input)).handler(expireEnrolmentCoupon_createServerFn_handler, async ({
  data
}) => {
  if (isSupabaseConfigured()) {
    try {
      const {
        data: rows,
        error
      } = await rpc("expire_enrolment_coupon", {
        p_intent_id: data.intentId,
        p_intent_token: data.intentToken
      });
      if (!error) {
        const row = Array.isArray(rows) ? rows[0] : rows;
        if (row) {
          return {
            id: row.id,
            tier: row.tier,
            name: row.name,
            email: row.email,
            phone: row.phone,
            basePriceInr: row.base_price_inr,
            couponCode: row.coupon_code ?? null,
            discountPct: row.discount_pct ?? null,
            couponExpiresAt: row.coupon_expires_at ?? null,
            status: row.status,
            finalPriceInr: row.final_price_inr ?? null,
            razorpayOrderId: row.razorpay_order_id ?? null
          };
        }
      }
    } catch (e) {
      console.warn("[enrolment] expire_enrolment_coupon Supabase failed, using fallback:", e);
    }
  }
  const item = fallbackIntentStore.get(data.intentId);
  if (item) {
    item.couponCode = null;
    item.discountPct = null;
    item.couponExpiresAt = null;
    item.finalPriceInr = item.basePriceInr;
  }
  return {
    id: data.intentId,
    tier: item?.tier ?? "career",
    name: item?.name ?? "Applicant",
    email: item?.email ?? "applicant@arzon.com",
    phone: item?.phone ?? "+91 9876543210",
    basePriceInr: item?.basePriceInr ?? TIER_META.career.mrpInr,
    couponCode: null,
    discountPct: null,
    couponExpiresAt: null,
    status: item?.status ?? "pending",
    finalPriceInr: item?.basePriceInr ?? TIER_META.career.mrpInr,
    razorpayOrderId: item?.razorpayOrderId ?? null
  };
});
const preregSchema = objectType({
  intentId: stringType().uuid(),
  intentToken: stringType().min(16).max(64),
  preregAmountInr: numberType().int().positive().max(1e5),
  balanceInr: numberType().int().min(0).max(1e7)
});
const markPreRegistrationInitiated_createServerFn_handler = createServerRpc({
  id: "2c88355db84b420cffbebaf207506c6d4ae671ce1597f853ffee8b6c23db0089",
  name: "markPreRegistrationInitiated",
  filename: "src/lib/enrolment.functions.ts"
}, (opts) => markPreRegistrationInitiated.__executeServer(opts));
const markPreRegistrationInitiated = createServerFn({
  method: "POST"
}).inputValidator((input) => preregSchema.parse(input)).handler(markPreRegistrationInitiated_createServerFn_handler, async ({
  data
}) => {
  if (isSupabaseConfigured()) {
    try {
      const {
        data: rows,
        error
      } = await rpc("mark_prereg_initiated", {
        p_intent_id: data.intentId,
        p_intent_token: data.intentToken,
        p_amount: data.preregAmountInr,
        p_balance: data.balanceInr
      });
      if (!error) {
        const row = Array.isArray(rows) ? rows[0] : rows;
        if (row) {
          return {
            ok: true,
            preRegistrationInitiatedAt: row.pre_registration_initiated_at,
            preRegistrationAmountInr: row.pre_registration_amount_inr,
            balanceDueInr: row.balance_due_inr,
            balanceDueAt: row.balance_due_at
          };
        }
      }
    } catch (e) {
      console.warn("[enrolment] mark_prereg_initiated Supabase failed, using fallback:", e);
    }
  }
  const item = fallbackIntentStore.get(data.intentId);
  const nowIso = (/* @__PURE__ */ new Date()).toISOString();
  const balanceDueIso = new Date(Date.now() + 7 * 864e5).toISOString();
  if (item) {
    item.preRegistrationInitiatedAt = nowIso;
    item.preRegistrationAmountInr = data.preregAmountInr;
    item.balanceDueInr = data.balanceInr;
    item.balanceDueAt = balanceDueIso;
  }
  return {
    ok: true,
    preRegistrationInitiatedAt: nowIso,
    preRegistrationAmountInr: data.preregAmountInr,
    balanceDueInr: data.balanceInr,
    balanceDueAt: balanceDueIso
  };
});
export {
  applyEnrolmentCoupon_createServerFn_handler,
  createEnrolmentIntent_createServerFn_handler,
  expireEnrolmentCoupon_createServerFn_handler,
  getEnrolmentIntent_createServerFn_handler,
  markPreRegistrationInitiated_createServerFn_handler
};
