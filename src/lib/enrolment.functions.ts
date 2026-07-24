import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { TIER_META } from "@/data/enrolmentTiers";
import { logEnrolError } from "@/lib/serverErrorLog";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const rpc = (name: string, args: Record<string, unknown>) => (supabaseAdmin as any).rpc(name, args);

const tierEnum = z.enum(["essential", "career", "elite"]);

const createSchema = z.object({
  tier: tierEnum,
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  phone: z.string().trim().min(10).max(20),
  city: z.string().trim().max(80).optional().nullable(),
  background: z.string().trim().max(120).optional().nullable(),
  // basePriceInr is intentionally NOT accepted from the client — derived
  // server-side from TIER_META. Old callers may still send it; we ignore.
  basePriceInr: z.number().int().positive().max(10_000_000).optional(),
  leadId: z.string().uuid().optional().nullable(),
  utmSource: z.string().trim().max(64).optional().nullable(),
  userAgent: z.string().trim().max(256).optional().nullable(),
});

export const createEnrolmentIntent = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => createSchema.parse(input))
  .handler(async ({ data }) => {
    // CRITICAL: derive price server-side from the canonical tier table.
    // Never trust a client-supplied amount.
    const canonicalPrice = TIER_META[data.tier].priceInr;
    const { data: rows, error } = await rpc("create_enrolment_intent", {
      p_tier: data.tier,
      p_name: data.name,
      p_email: data.email,
      p_phone: data.phone,
      p_city: data.city ?? null,
      p_background: data.background ?? null,
      p_base_price_inr: canonicalPrice,
      p_lead_id: data.leadId ?? null,
      p_utm_source: data.utmSource ?? null,
      p_user_agent: data.userAgent ?? null,
    });
    if (error) {
      const { correlationId } = logEnrolError(error, {
        op: "createEnrolmentIntent",
        code: "rpc_error",
        tier: data.tier,
      });
      throw new Error(`${error.message} (ref ${correlationId})`);
    }
    const row = Array.isArray(rows) ? rows[0] : rows;
    if (!row) {
      const { correlationId } = logEnrolError("no row returned", {
        op: "createEnrolmentIntent",
        code: "no_row",
        tier: data.tier,
      });
      throw new Error(`intent not created (ref ${correlationId})`);
    }
    return {
      intentId: row.id as string,
      intentToken: row.intent_token as string,
    };
  });

const applySchema = z.object({
  intentId: z.string().uuid(),
  intentToken: z.string().min(16).max(64),
  code: z.string().trim().min(2).max(32),
});

export const applyEnrolmentCoupon = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => applySchema.parse(input))
  .handler(async ({ data }) => {
    const { data: rows, error } = await rpc("apply_enrolment_coupon", {
      p_intent_id: data.intentId,
      p_code: data.code,
      p_intent_token: data.intentToken,
    });
    if (error) {
      const { correlationId } = logEnrolError(error, {
        op: "applyEnrolmentCoupon",
        code: "rpc_error",
        intentId: data.intentId,
      });
      return { ok: false as const, error: `${error.message} (ref ${correlationId})` };
    }
    const row = Array.isArray(rows) ? rows[0] : rows;
    return {
      ok: true as const,
      couponCode: row.coupon_code as string,
      discountPct: row.discount_pct as number,
      couponExpiresAt: row.coupon_expires_at as string,
      status: row.status as string,
      finalPriceInr: row.final_price_inr as number,
    };
  });

const idSchema = z.object({
  intentId: z.string().uuid(),
  intentToken: z.string().min(16).max(64),
});

export const getEnrolmentIntent = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) => idSchema.parse(input))
  .handler(async ({ data }) => {
    // MOCK FOR LOCAL DEV
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY.includes("paste_your")) {
        return {
            id: data.intentId,
            tier: "career",
            name: "Test User",
            email: "test@example.com",
            phone: "1234567890",
            basePriceInr: 24999,
            couponCode: null,
            discountPct: null,
            couponExpiresAt: null,
            status: "pending",
            finalPriceInr: 24999,
            razorpayOrderId: "mock_order_id",
            razorpayPaymentId: null,
            failureReason: null,
            paidAt: null,
            preRegistrationInitiatedAt: null,
            preRegistrationAmountInr: null,
            balanceDueInr: null,
            balanceDueAt: null,
            balancePaidAt: null,
        };
    }
    const { data: rows, error } = await rpc("get_enrolment_intent", {
      p_intent_id: data.intentId,
      p_intent_token: data.intentToken,
    });
    if (error) {
      const { correlationId } = logEnrolError(error, {
        op: "getEnrolmentIntent",
        code: "rpc_error",
        intentId: data.intentId,
      });
      throw new Error(`${error.message} (ref ${correlationId})`);
    }
    const row = Array.isArray(rows) ? rows[0] : rows;
    if (!row) {
      logEnrolError("intent not found", {
        op: "getEnrolmentIntent",
        code: "not_found",
        intentId: data.intentId,
      });
      throw new Error("intent not found");
    }
    return {
      id: row.id as string,
      tier: row.tier as "essential" | "career" | "elite",
      name: row.name as string,
      email: row.email as string,
      phone: row.phone as string,
      basePriceInr: row.base_price_inr as number,
      couponCode: (row.coupon_code as string | null) ?? null,
      discountPct: (row.discount_pct as number | null) ?? null,
      couponExpiresAt: (row.coupon_expires_at as string | null) ?? null,
      status: row.status as string,
      finalPriceInr: (row.final_price_inr as number | null) ?? null,
      razorpayOrderId: (row.razorpay_order_id as string | null) ?? null,
      razorpayPaymentId: (row.razorpay_payment_id as string | null) ?? null,
      failureReason: (row.failure_reason as string | null) ?? null,
      paidAt: (row.paid_at as string | null) ?? null,
      preRegistrationInitiatedAt: (row.pre_registration_initiated_at as string | null) ?? null,
      preRegistrationAmountInr: (row.pre_registration_amount_inr as number | null) ?? null,
      balanceDueInr: (row.balance_due_inr as number | null) ?? null,
      balanceDueAt: (row.balance_due_at as string | null) ?? null,
      balancePaidAt: (row.balance_paid_at as string | null) ?? null,
    };
  });

export const expireEnrolmentCoupon = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => idSchema.parse(input))
  .handler(async ({ data }) => {
    const { data: rows, error } = await rpc("expire_enrolment_coupon", {
      p_intent_id: data.intentId,
      p_intent_token: data.intentToken,
    });
    if (error) {
      const { correlationId } = logEnrolError(error, {
        op: "expireEnrolmentCoupon",
        code: "rpc_error",
        intentId: data.intentId,
      });
      throw new Error(`${error.message} (ref ${correlationId})`);
    }
    const row = Array.isArray(rows) ? rows[0] : rows;
    if (!row) {
      logEnrolError("intent not found", {
        op: "expireEnrolmentCoupon",
        code: "not_found",
        intentId: data.intentId,
      });
      throw new Error("intent not found");
    }
    return {
      id: row.id as string,
      tier: row.tier as "essential" | "career" | "elite",
      name: row.name as string,
      email: row.email as string,
      phone: row.phone as string,
      basePriceInr: row.base_price_inr as number,
      couponCode: (row.coupon_code as string | null) ?? null,
      discountPct: (row.discount_pct as number | null) ?? null,
      couponExpiresAt: (row.coupon_expires_at as string | null) ?? null,
      status: row.status as string,
      finalPriceInr: (row.final_price_inr as number | null) ?? null,
      razorpayOrderId: (row.razorpay_order_id as string | null) ?? null,
    };
  });

const preregSchema = z.object({
  intentId: z.string().uuid(),
  intentToken: z.string().min(16).max(64),
  preregAmountInr: z.number().int().positive().max(100_000),
  balanceInr: z.number().int().min(0).max(10_000_000),
});

export const markPreRegistrationInitiated = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => preregSchema.parse(input))
  .handler(async ({ data }) => {
    const { data: rows, error } = await rpc("mark_prereg_initiated", {
      p_intent_id: data.intentId,
      p_intent_token: data.intentToken,
      p_amount: data.preregAmountInr,
      p_balance: data.balanceInr,
    });
    if (error) {
      const { correlationId } = logEnrolError(error, {
        op: "markPreRegistrationInitiated",
        code: "rpc_error",
        intentId: data.intentId,
      });
      return { ok: false as const, error: `${error.message} (ref ${correlationId})` };
    }
    const row = Array.isArray(rows) ? rows[0] : rows;
    if (!row) return { ok: false as const, error: "intent not found" };
    return {
      ok: true as const,
      preRegistrationInitiatedAt: row.pre_registration_initiated_at as string,
      preRegistrationAmountInr: row.pre_registration_amount_inr as number,
      balanceDueInr: row.balance_due_inr as number,
      balanceDueAt: row.balance_due_at as string,
    };
  });
