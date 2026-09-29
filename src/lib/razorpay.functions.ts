import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { logEnrolError, logEnrolWarn, newCorrelationId } from "./serverErrorLog";
import { redis } from "./redis.server";
import { getEnrolmentIntent } from "./enrolment.functions";
import { NEXT_COHORT } from "@/components/landing/constants";
import { enforcePublicRateLimit } from "@/server/public-rate-limit.server";

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

    const allowed = await enforcePublicRateLimit("razorpay_order", 5, 60);\n    if (!allowed) {\n      logEnrolWarn("rate limited razorpay creation", {\n        op: "createRazorpayOrder",\n        code: "rate_limited",\n        intentId: data.intentId,\n        correlationId,\n      });\n      return {\n        ok: false as const,\n        error: "Too many attempts. Please wait a minute and try again.",\n      };\n    }

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    const publicKeyId = process.env.VITE_RAZORPAY_KEY_ID ?? keyId;

    // Load intent securely using our resilient fallback-aware helper
    let intentRow;
    try {
      intentRow = await getEnrolmentIntent({
        data: { intentId: data.intentId, intentToken: data.intentToken },
      });
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

    // Payment is allowed only for the authoritative upcoming cohort.
    // Never create a Razorpay order after the cohort is full or its application
    // window has closed. The database row is the source of truth for capacity.
    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const { data: cohort, error: cohortError } = await (supabaseAdmin as any)
        .from("cohorts")
        .select("id,display_label,seats_taken,seats_cap,is_locked,lock_at,starts_at")
        .eq("id", NEXT_COHORT.id)
        .maybeSingle();

      if (cohortError || !cohort) {
        logEnrolError(cohortError?.message ?? "cohort not found", {
          op: "createRazorpayOrder",
          code: "cohort_unavailable",
          intentId: data.intentId,
          correlationId,
        });
        return {
          ok: false as const,
          code: "cohort_locked" as const,
          cohortLabel: NEXT_COHORT.label,
          waitlistUrl: "/cohorts",
          error: "The next cohort is temporarily unavailable. Please join the waitlist or contact support.",
        };
      }

      const cohortLocked =
        cohort.is_locked ||
        Number(cohort.seats_taken) >= Number(cohort.seats_cap) ||
        new Date(cohort.lock_at).getTime() <= Date.now() ||
        new Date(cohort.starts_at).getTime() <= Date.now();

      if (cohortLocked) {
        return {
          ok: false as const,
          code: "cohort_locked" as const,
          cohortLabel: cohort.display_label,
          waitlistUrl: "/cohorts",
          error: "This cohort is no longer accepting payments. Please choose the next available cohort.",
        };
      }
    } catch (err) {
      logEnrolError("cohort authority lookup failed", {
        op: "createRazorpayOrder",
        code: "cohort_lookup_failed",
        intentId: data.intentId,
        correlationId,
      });
      return {
        ok: false as const,
        code: "cohort_locked" as const,
        cohortLabel: NEXT_COHORT.label,
        waitlistUrl: "/cohorts",
        error: "We could not verify cohort availability. Please retry in a moment.",
      };
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
        // IMPORTANT: Do NOT fall through to isTestMode here.
        // A real HTTP error from Razorpay (outage, bad credentials, etc.)
        // must surface as a user-visible error — not a fake test payment.
        return {
          ok: false as const,
          error: "Payment gateway is temporarily unavailable. Please try again in a moment, or contact support if this persists.",
        };
      }

      const order = (await orderRes.json()) as {
        id: string;
        amount: number;
        currency: string;
        status: string;
      };

      if (
        !order.id ||
        order.amount !== amountPaise ||
        order.currency !== "INR" ||
        order.status !== "created"
      ) {
        logEnrolError("Razorpay returned an unexpected order", {
          op: "createRazorpayOrder",
          code: "razorpay_order_mismatch",
          intentId: data.intentId,
          correlationId,
        });
        return {
          ok: false as const,
          error: "Payment gateway returned an invalid order. Please try again.",
        };
      }

      try {
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { error: attachError } = await (supabaseAdmin as any).rpc("attach_razorpay_order", {
          p_intent_id: data.intentId,
          p_order_id: order.id,
          p_amount_paise: order.amount,
          p_currency: order.currency,
        });
        if (attachError) {
          logEnrolError(attachError.message, {
            op: "createRazorpayOrder",
            code: "attach_order_failed",
            intentId: data.intentId,
            correlationId,
          });
          return {
            ok: false as const,
            error: "Could not secure the payment order. Please try again.",
          };
        }
      } catch {
        return {
          ok: false as const,
          error: "Could not secure the payment order. Please try again.",
        };
      }

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
      logEnrolError("Razorpay API fetch threw (network failure)", {
        op: "createRazorpayOrder",
        code: "razorpay_network_error",
        intentId: data.intentId,
        correlationId,
      });
      return {
        ok: false as const,
        error: "Could not reach the payment gateway. Please check your connection and try again.",
      };
    }
  });
