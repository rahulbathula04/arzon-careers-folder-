import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { logEnrolError, logEnrolWarn, newCorrelationId } from "./serverErrorLog";
import { redis } from "./redis.server";
import { getEnrolmentIntent } from "./enrolment.functions";

const inputSchema = z.object({
  intentId: z.string().uuid(),
  intentToken: z.string().min(16).max(64),
});

type CreateRazorpayOrderResult =
  | {
      ok: true;
      isTestMode?: boolean;
      orderId: string;
      amount: number;
      currency: string;
      keyId: string;
      name: string;
      email: string;
      phone: string;
    }
  | {
      ok: false;
      code?: "coupon_expired";
      couponCode?: string;
      couponExpiresAt?: string;
      basePriceInr?: number;
      error: string;
    }
  | {
      ok: false;
      code: "cohort_locked";
      cohortLabel: string;
      waitlistUrl: string;
      error: string;
    };

/**
 * Creates a Razorpay order for an enrolment intent.
 * Reads the canonical price from the DB / fallback intent engine.
 */
export const createRazorpayOrder = createServerFn({ method: "POST" })
  .inputValidator((i: unknown) => inputSchema.parse(i))
  .handler(async ({ data }): Promise<CreateRazorpayOrderResult> => {
    const correlationId = newCorrelationId();

    // Rate Limiting (Distributed via Redis)
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
        correlationId,
      });
      return {
        ok: false as const,
        error: "Too many attempts. Please wait a minute and try again.",
      };
    }

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    const publicKeyId = process.env.VITE_RAZORPAY_KEY_ID ?? keyId;

    // Load intent securely using our resilient fallback-aware helper
    let intentRow;
    try {
      intentRow = await getEnrolmentIntent({ data: { intentId: data.intentId, intentToken: data.intentToken } });
    } catch (e) {
      logEnrolError("getEnrolmentIntent error in createRazorpayOrder", {
        op: "createRazorpayOrder",
        code: "get_intent_failed",
        intentId: data.intentId,
        correlationId,
      });
      return { ok: false as const, error: "Could not load order details. Please try again." };
    }

    if (!intentRow) {
      return { ok: false as const, error: "Order not found." };
    }

    const basePrice = intentRow.basePriceInr;
    const finalPrice = intentRow.finalPriceInr ?? basePrice;
    const couponExpiresAt = intentRow.couponExpiresAt;
    const couponCode = intentRow.couponCode;

    // Hard server-side coupon expiry check
    if (couponCode && couponExpiresAt && new Date(couponExpiresAt).getTime() < Date.now()) {
      return {
        ok: false as const,
        code: "coupon_expired" as const,
        couponCode,
        couponExpiresAt,
        basePriceInr: basePrice,
        error: `Your ${couponCode} coupon expired before checkout. The offer price is no longer available.`,
      };
    }

    // Check if Razorpay keys are configured
    if (!keyId || !keySecret || keyId.includes("paste_your")) {
      logEnrolWarn("razorpay keys missing or placeholder, generating test order", {
        op: "createRazorpayOrder",
        code: "not_configured",
        intentId: data.intentId,
        correlationId,
      });
      return {
        ok: true as const,
        isTestMode: true as const,
        orderId: `order_test_${data.intentId.slice(0, 14)}`,
        amount: Math.round(finalPrice * 100),
        currency: "INR",
        keyId: publicKeyId || "rzp_test_mockkey",
        name: intentRow.name,
        email: intentRow.email,
        phone: intentRow.phone,
      };
    }

    const resolvedKeyId: string = publicKeyId ?? keyId;
    const amountInr = finalPrice;
    const amountPaise = Math.round(amountInr * 100);

    // Create Razorpay order via REST API
    try {
      const auth = "Basic " + Buffer.from(`${keyId}:${keySecret}`).toString("base64");
      const orderRes = await fetch("https://api.razorpay.com/v1/orders", {
        method: "POST",
        headers: {
          Authorization: auth,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amountPaise,
          currency: "INR",
          receipt: `enr_${data.intentId.slice(0, 30)}`,
          notes: {
            intent_id: data.intentId,
            tier: intentRow.tier,
            email: intentRow.email,
          },
        }),
      });

      if (!orderRes.ok) {
        const errBody = await orderRes.text();
        logEnrolError(errBody, {
          op: "createRazorpayOrder",
          code: "razorpay_http_error",
          intentId: data.intentId,
          httpStatus: orderRes.status,
          correlationId,
        });
        return {
          ok: true as const,
          isTestMode: true as const,
          orderId: `order_test_${data.intentId.slice(0, 14)}`,
          amount: amountPaise,
          currency: "INR",
          keyId: resolvedKeyId,
          name: intentRow.name,
          email: intentRow.email,
          phone: intentRow.phone,
        };
      }

      const order = (await orderRes.json()) as {
        id: string;
        amount: number;
        currency: string;
        status: string;
      };

      return {
        ok: true as const,
        isTestMode: false as const,
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId: resolvedKeyId,
        name: intentRow.name,
        email: intentRow.email,
        phone: intentRow.phone,
      };
    } catch (err) {
      console.warn("Razorpay API fetch failed, using test mode order:", err);
      return {
        ok: true as const,
        isTestMode: true as const,
        orderId: `order_test_${data.intentId.slice(0, 14)}`,
        amount: amountPaise,
        currency: "INR",
        keyId: resolvedKeyId,
        name: intentRow.name,
        email: intentRow.email,
        phone: intentRow.phone,
      };
    }
  });
