import { c as createServerRpc } from "./createServerRpc-wV0Vk4NU.mjs";
import { r as redis } from "./redis.server-jD5sLB4g.mjs";
import { g as getEnrolmentIntent } from "./enrolment.functions-Cs_77DUe.mjs";
import { c as createServerFn } from "./server-BKkhNWog.mjs";
import "../_libs/upstash__redis.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { p as objectType, q as stringType } from "../_libs/zod.mjs";
import "./createSsrRpc-BV3sOdh8.mjs";
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
import "../_libs/uncrypto.mjs";
import "node:crypto";
function safeMessage(err) {
  if (!err) return "unknown error";
  if (err instanceof Error) return err.message;
  if (typeof err === "string") return err;
  try {
    return JSON.stringify(err).slice(0, 500);
  } catch {
    return String(err);
  }
}
function shortId(id) {
  if (!id) return void 0;
  return id.slice(0, 8);
}
function newCorrelationId() {
  return Math.random().toString(36).slice(2, 10);
}
function logEnrolError(err, ctx) {
  const correlationId = ctx.correlationId ?? newCorrelationId();
  const payload = {
    level: "error",
    scope: "enrolment",
    op: ctx.op,
    code: ctx.code ?? "unhandled",
    correlationId,
    intent: shortId(ctx.intentId),
    tier: ctx.tier ?? void 0,
    httpStatus: ctx.httpStatus,
    message: safeMessage(err).slice(0, 500),
    stack: err instanceof Error && typeof err.stack === "string" ? err.stack.slice(0, 1200) : void 0,
    ...ctx.extra,
    ts: (/* @__PURE__ */ new Date()).toISOString()
  };
  console.error(`[enrol-error] ${JSON.stringify(payload)}`);
  return { correlationId, message: payload.message };
}
function logEnrolWarn(message, ctx) {
  const correlationId = ctx.correlationId ?? newCorrelationId();
  const payload = {
    level: "warn",
    scope: "enrolment",
    op: ctx.op,
    code: ctx.code ?? "warn",
    correlationId,
    intent: shortId(ctx.intentId),
    tier: ctx.tier ?? void 0,
    httpStatus: ctx.httpStatus,
    message: message.slice(0, 500),
    ...ctx.extra,
    ts: (/* @__PURE__ */ new Date()).toISOString()
  };
  console.warn(`[enrol-warn] ${JSON.stringify(payload)}`);
  return { correlationId };
}
const inputSchema = objectType({
  intentId: stringType().uuid(),
  intentToken: stringType().min(16).max(64)
});
const createRazorpayOrder_createServerFn_handler = createServerRpc({
  id: "a6f1a7df2dd032270b33ae7f01da2576971e1b7652c3d182f28f0f762ce126d4",
  name: "createRazorpayOrder",
  filename: "src/lib/razorpay.functions.ts"
}, (opts) => createRazorpayOrder.__executeServer(opts));
const createRazorpayOrder = createServerFn({
  method: "POST"
}).inputValidator((i) => inputSchema.parse(i)).handler(createRazorpayOrder_createServerFn_handler, async ({
  data
}) => {
  const correlationId = newCorrelationId();
  const windowSeconds = 60;
  const maxAttempts = 5;
  const key = `ratelimit:razorpay:${data.intentId}`;
  let count = 1;
  try {
    count = await redis.incr(key);
    if (count === 1) {
      await redis.expire(key, windowSeconds);
    }
  } catch (e) {
    console.warn("Redis rate limit failed, failing open", e);
  }
  if (count > maxAttempts) {
    logEnrolWarn("rate limited razorpay creation", {
      op: "createRazorpayOrder",
      code: "rate_limited",
      intentId: data.intentId,
      correlationId
    });
    return {
      ok: false,
      error: "Too many attempts. Please wait a minute and try again."
    };
  }
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  const publicKeyId = process.env.VITE_RAZORPAY_KEY_ID ?? keyId;
  let intentRow;
  try {
    intentRow = await getEnrolmentIntent({
      data: {
        intentId: data.intentId,
        intentToken: data.intentToken
      }
    });
  } catch (e) {
    logEnrolError("getEnrolmentIntent error in createRazorpayOrder", {
      op: "createRazorpayOrder",
      code: "get_intent_failed",
      intentId: data.intentId,
      correlationId
    });
    return {
      ok: false,
      error: "Could not load order details. Please try again."
    };
  }
  if (!intentRow) {
    return {
      ok: false,
      error: "Order not found."
    };
  }
  const basePrice = intentRow.basePriceInr;
  const finalPrice = intentRow.finalPriceInr ?? basePrice;
  const couponExpiresAt = intentRow.couponExpiresAt;
  const couponCode = intentRow.couponCode;
  if (couponCode && couponExpiresAt && new Date(couponExpiresAt).getTime() < Date.now()) {
    return {
      ok: false,
      code: "coupon_expired",
      couponCode,
      couponExpiresAt,
      basePriceInr: basePrice,
      error: `Your ${couponCode} coupon expired before checkout. The offer price is no longer available.`
    };
  }
  if (!keyId || !keySecret || keyId.includes("paste_your")) {
    logEnrolWarn("razorpay keys missing or placeholder, generating test order", {
      op: "createRazorpayOrder",
      code: "not_configured",
      intentId: data.intentId,
      correlationId
    });
    return {
      ok: true,
      isTestMode: true,
      orderId: `order_test_${data.intentId.slice(0, 14)}`,
      amount: Math.round(finalPrice * 100),
      currency: "INR",
      keyId: publicKeyId || "rzp_test_mockkey",
      name: intentRow.name,
      email: intentRow.email,
      phone: intentRow.phone
    };
  }
  const resolvedKeyId = publicKeyId ?? keyId;
  const amountInr = finalPrice;
  const amountPaise = Math.round(amountInr * 100);
  try {
    const auth = "Basic " + Buffer.from(`${keyId}:${keySecret}`).toString("base64");
    const orderRes = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        Authorization: auth,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount: amountPaise,
        currency: "INR",
        receipt: `enr_${data.intentId.slice(0, 30)}`,
        notes: {
          intent_id: data.intentId,
          tier: intentRow.tier,
          email: intentRow.email
        }
      })
    });
    if (!orderRes.ok) {
      const errBody = await orderRes.text();
      logEnrolError(errBody, {
        op: "createRazorpayOrder",
        code: "razorpay_http_error",
        intentId: data.intentId,
        httpStatus: orderRes.status,
        correlationId
      });
      return {
        ok: true,
        isTestMode: true,
        orderId: `order_test_${data.intentId.slice(0, 14)}`,
        amount: amountPaise,
        currency: "INR",
        keyId: resolvedKeyId,
        name: intentRow.name,
        email: intentRow.email,
        phone: intentRow.phone
      };
    }
    const order = await orderRes.json();
    return {
      ok: true,
      isTestMode: false,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: resolvedKeyId,
      name: intentRow.name,
      email: intentRow.email,
      phone: intentRow.phone
    };
  } catch (err) {
    console.warn("Razorpay API fetch failed, using test mode order:", err);
    return {
      ok: true,
      isTestMode: true,
      orderId: `order_test_${data.intentId.slice(0, 14)}`,
      amount: amountPaise,
      currency: "INR",
      keyId: resolvedKeyId,
      name: intentRow.name,
      email: intentRow.email,
      phone: intentRow.phone
    };
  }
});
export {
  createRazorpayOrder_createServerFn_handler
};
