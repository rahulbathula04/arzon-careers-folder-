import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { ACTIVE_COHORT_ID, cohortWaitlistUrl } from "./cohort.functions";
import { logEnrolError, logEnrolWarn, newCorrelationId } from "./serverErrorLog";
import { redis } from "./redis.server";

const inputSchema = z.object({
  intentId: z.string().uuid(),
  intentToken: z.string().min(16).max(64),
});

/**
 * Creates a Razorpay order for an enrolment intent.
 * Reads the canonical price from the DB — never trusts a client-supplied amount.
 */
export const createRazorpayOrder = createServerFn({ method: "POST" })
  .inputValidator((i: unknown) => inputSchema.parse(i))
  .handler(async ({ data }) => {
    const correlationId = newCorrelationId();

    // Rate Limiting (Distributed via Redis)
    // Prevents an attacker from spamming the same intent to exhaust Razorpay / DB quotas across edges.
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

    // Lazy-import the privileged client so this server-only module never
    // leaks into the route's client chunk through this file.
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const rpc = (name: string, args: Record<string, unknown>) =>
      (supabaseAdmin as any).rpc(name, args);

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    const publicKeyId = process.env.VITE_RAZORPAY_KEY_ID ?? keyId;

    if (!keyId || !keySecret) {
      logEnrolError("razorpay keys missing", {
        op: "createRazorpayOrder",
        code: "not_configured",
        intentId: data.intentId,
        correlationId,
      });
      return {
        ok: false as const,
        error: "Payments are not yet configured. Please contact your counsellor on WhatsApp.",
      };
    }
    const resolvedKeyId: string = publicKeyId ?? keyId;

    // Fetch canonical price from DB (token-gated)
    const { data: rows, error: rpcErr } = await rpc("get_enrolment_intent", {
      p_intent_id: data.intentId,
      p_intent_token: data.intentToken,
    });
    if (rpcErr) {
      logEnrolError(rpcErr, {
        op: "createRazorpayOrder",
        code: "get_intent_failed",
        intentId: data.intentId,
        correlationId,
      });
      return { ok: false as const, error: `Could not load your order. (ref ${correlationId})` };
    }
    const row = Array.isArray(rows) ? rows[0] : rows;
    if (!row) {
      logEnrolError("intent row missing", {
        op: "createRazorpayOrder",
        code: "not_found",
        intentId: data.intentId,
        correlationId,
      });
      return { ok: false as const, error: "Order not found." };
    }

    // Cohort lock gate: never let Razorpay open if the active cohort is
    // already locked (capacity hit OR admin override OR past lock_at).
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: cohortRows, error: cohortErr } = await (supabaseAdmin as any).rpc(
      "get_cohort_status",
      { p_id: ACTIVE_COHORT_ID },
    );
    if (cohortErr) {
      logEnrolWarn("cohort status lookup failed; proceeding", {
        op: "cohortStatus",
        code: "rpc_error",
        intentId: data.intentId,
        correlationId,
        extra: { message: (cohortErr as { message?: string }).message },
      });
    } else {
      const cohort = Array.isArray(cohortRows) ? cohortRows[0] : cohortRows;
      if (cohort?.effective_locked) {
        const label = cohort.display_label as string;
        return {
          ok: false as const,
          code: "cohort_locked" as const,
          cohortLabel: label,
          waitlistUrl: cohortWaitlistUrl(label),
          error: `The ${label} cohort is locked. Join the WhatsApp waitlist for the next batch.`,
        };
      }
    }

    const basePrice = row.base_price_inr as number;
    const finalPrice = (row.final_price_inr as number | null) ?? basePrice;
    const couponExpiresAt = row.coupon_expires_at as string | null;
    const couponCode = (row.coupon_code as string | null) ?? null;

    // Defense-in-depth for ARZONPRIME60: anchor the 60-minute window to
    // the email's FIRST application of the code across any intent, so
    // even if the stored coupon_expires_at on this row was somehow
    // extended, the order-create path still enforces the original
    // window. localStorage can't extend this.
    if (couponCode && couponCode.toUpperCase() === "ARZONPRIME60") {
      const email = row.email as string;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: firstRows, error: firstErr } = await (supabaseAdmin as any)
        .from("enrolment_intents")
        .select("coupon_applied_at")
        .eq("email", email)
        .eq("coupon_code", "ARZONPRIME60")
        .not("coupon_applied_at", "is", null)
        .order("coupon_applied_at", { ascending: true })
        .limit(1);
      if (firstErr) {
        logEnrolWarn("prime60 anchor lookup failed; proceeding", {
          op: "createRazorpayOrder",
          code: "prime60_lookup",
          intentId: data.intentId,
          correlationId,
        });
      } else {
        const firstRow = Array.isArray(firstRows) ? firstRows[0] : firstRows;
        const firstAppliedAt =
          firstRow &&
          typeof (firstRow as { coupon_applied_at?: string }).coupon_applied_at === "string"
            ? (firstRow as { coupon_applied_at: string }).coupon_applied_at
            : null;
        if (firstAppliedAt) {
          const anchoredExpiry = new Date(firstAppliedAt).getTime() + 60 * 60 * 1000;
          if (anchoredExpiry < Date.now()) {
            return {
              ok: false as const,
              code: "coupon_expired" as const,
              couponCode,
              couponExpiresAt: new Date(anchoredExpiry).toISOString(),
              basePriceInr: basePrice,
              error:
                "Your ARZONPRIME60 60-minute window has ended. The offer price is no longer available.",
            };
          }
        }
      }
    }

    // Hard server-side coupon expiry check. If a coupon was applied but its
    // window has elapsed, refuse to create an order and return a structured
    // error the client can use to show a clear "coupon expired" banner —
    // even when the client-side timer is still ticking due to clock drift
    // or a stale page state.
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

    const amountInr = finalPrice;

    const amountPaise = Math.round(amountInr * 100);

    // Create Razorpay order
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
          tier: row.tier,
          email: row.email,
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
        ok: false as const,
        error: `Could not create payment order (${orderRes.status}). Please try again. (ref ${correlationId})`,
      };
    }

    const order = (await orderRes.json()) as {
      id: string;
      amount: number;
      currency: string;
      status: string;
    };

    // Save order id on intent
    const { error: attachErr } = await rpc("attach_razorpay_order", {
      p_intent_id: data.intentId,
      p_order_id: order.id,
    });
    if (attachErr) {
      logEnrolWarn("attach_razorpay_order failed; order created", {
        op: "attachRazorpayOrder",
        code: "rpc_error",
        intentId: data.intentId,
        correlationId,
      });
    }

    return {
      ok: true as const,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: resolvedKeyId,
      name: row.name as string,
      email: row.email as string,
      phone: row.phone as string,
    };
  });
