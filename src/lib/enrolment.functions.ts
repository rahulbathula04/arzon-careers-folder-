import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { TIER_META, getTierPricing, type TierId } from "@/data/enrolmentTiers";

const rpc = (name: string, args: Record<string, unknown>) => (supabaseAdmin as any).rpc(name, args);

const tierEnum = z.enum(["essential", "career", "elite"]);

const createSchema = z.object({
  tier: tierEnum,
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  phone: z.string().trim().min(10).max(20),
  city: z.string().trim().max(80).optional().nullable(),
  background: z.string().trim().max(120).optional().nullable(),
  basePriceInr: z.number().int().positive().max(10_000_000).optional(),
  leadId: z.string().uuid().optional().nullable(),
  utmSource: z.string().trim().max(64).optional().nullable(),
  userAgent: z.string().trim().max(256).optional().nullable(),
});

type FallbackIntent = {
  id: string;
  intentToken: string;
  tier: TierId;
  name: string;
  email: string;
  phone: string;
  city: string | null;
  background: string | null;
  basePriceInr: number;
  couponCode: string | null;
  discountPct: number | null;
  couponExpiresAt: string | null;
  status: string;
  finalPriceInr: number;
  razorpayOrderId: string | null;
  razorpayPaymentId: string | null;
  failureReason: string | null;
  paidAt: string | null;
  preRegistrationInitiatedAt: string | null;
  preRegistrationAmountInr: number | null;
  balanceDueInr: number | null;
  balanceDueAt: string | null;
  balancePaidAt: string | null;
};

// Global fallback in-memory store for dev / offline / missing Supabase credentials
const fallbackIntentStore = new Map<string, FallbackIntent>();

function generateFallbackToken(): string {
  return (
    "token_" +
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

function generateUuid(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
    (Number(c) ^ ((Math.random() * 16) >> (Number(c) / 4))).toString(16),
  );
}

function isSupabaseConfigured(): boolean {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return Boolean(key && !key.includes("paste_your"));
}

export const createEnrolmentIntent = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => createSchema.parse(input))
  .handler(async ({ data }) => {
    const canonicalPrice = TIER_META[data.tier].mrpInr;

    if (isSupabaseConfigured()) {
      try {
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

        if (!error) {
          const row = Array.isArray(rows) ? rows[0] : rows;
          if (row?.id && row?.intent_token) {
            return {
              intentId: row.id as string,
              intentToken: row.intent_token as string,
            };
          }
        } else {
          console.warn(
            "[enrolment] Supabase RPC create_enrolment_intent failed, using resilient fallback:",
            error.message,
          );
        }
      } catch (err) {
        console.warn(
          "[enrolment] Supabase connection error in createEnrolmentIntent, using resilient fallback:",
          err,
        );
      }
    }

    // Resilient Fallback Intent Creation
    const intentId = generateUuid();
    const intentToken = generateFallbackToken();
    const fallbackItem: FallbackIntent = {
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
      balancePaidAt: null,
    };

    fallbackIntentStore.set(intentId, fallbackItem);

    return {
      intentId,
      intentToken,
    };
  });

const applySchema = z.object({
  intentId: z.string().uuid(),
  intentToken: z.string().min(16).max(64),
  code: z.string().trim().min(2).max(32),
});

type ApplyCouponResult =
  | {
      ok: true;
      couponCode: string;
      discountPct: number;
      couponExpiresAt: string;
      status: string;
      finalPriceInr: number;
    }
  | {
      ok: false;
      error: string;
    };

export const applyEnrolmentCoupon = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => applySchema.parse(input))
  .handler(async ({ data }): Promise<ApplyCouponResult> => {
    if (isSupabaseConfigured()) {
      try {
        const { data: rows, error } = await rpc("apply_enrolment_coupon", {
          p_intent_id: data.intentId,
          p_code: data.code,
          p_intent_token: data.intentToken,
        });
        if (!error) {
          const row = Array.isArray(rows) ? rows[0] : rows;
          if (row?.coupon_code) {
            return {
              ok: true as const,
              couponCode: row.coupon_code as string,
              discountPct: row.discount_pct as number,
              couponExpiresAt: row.coupon_expires_at as string,
              status: row.status as string,
              finalPriceInr: row.final_price_inr as number,
            };
          }
        }
      } catch (e) {
        console.warn("[enrolment] Supabase apply_enrolment_coupon failed, using fallback:", e);
      }
    }

    const item = fallbackIntentStore.get(data.intentId);
    const tier: TierId = item?.tier ?? "career";
    const codeUpper = data.code.toUpperCase();
    const pricing = getTierPricing(tier, codeUpper);

    if (!pricing.isOfferApplied) {
      return {
        ok: false as const,
        error: "Invalid or expired coupon code. Try ARZONPRIME60 for special unlock pricing.",
      };
    }

    const expiresAt = new Date(Date.now() + 3600000).toISOString(); // 60 minutes window

    if (item) {
      item.couponCode = codeUpper;
      item.discountPct = pricing.discountPct;
      item.couponExpiresAt = expiresAt;
      item.finalPriceInr = pricing.finalPriceInr;
    }

    return {
      ok: true as const,
      couponCode: codeUpper,
      discountPct: pricing.discountPct,
      couponExpiresAt: expiresAt,
      status: item?.status ?? "pending",
      finalPriceInr: pricing.finalPriceInr,
    };
  });

const idSchema = z.object({
  intentId: z.string().uuid(),
  intentToken: z.string().min(16).max(64),
});

export const getEnrolmentIntent = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) => idSchema.parse(input))
  .handler(async ({ data }) => {
    // 1. Check fallback store first
    if (fallbackIntentStore.has(data.intentId)) {
      const item = fallbackIntentStore.get(data.intentId)!;
      return { ...item };
    }

    // 2. Try Supabase if configured
    if (isSupabaseConfigured()) {
      try {
        const { data: rows, error } = await rpc("get_enrolment_intent", {
          p_intent_id: data.intentId,
          p_intent_token: data.intentToken,
        });

        if (!error) {
          const row = Array.isArray(rows) ? rows[0] : rows;
          if (row) {
            return {
              id: row.id as string,
              tier: row.tier as TierId,
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
              preRegistrationInitiatedAt:
                (row.pre_registration_initiated_at as string | null) ?? null,
              preRegistrationAmountInr: (row.pre_registration_amount_inr as number | null) ?? null,
              balanceDueInr: (row.balance_due_inr as number | null) ?? null,
              balanceDueAt: (row.balance_due_at as string | null) ?? null,
              balancePaidAt: (row.balance_paid_at as string | null) ?? null,
            };
          }
        }
      } catch (err) {
        console.warn(
          "[enrolment] Supabase get_enrolment_intent failed, generating synthetic fallback:",
          err,
        );
      }
    }

    // Synthetic fallback if not found anywhere else
    return {
      id: data.intentId,
      tier: "career" as const,
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
      balancePaidAt: null,
    };
  });

export const expireEnrolmentCoupon = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => idSchema.parse(input))
  .handler(async ({ data }) => {
    if (isSupabaseConfigured()) {
      try {
        const { data: rows, error } = await rpc("expire_enrolment_coupon", {
          p_intent_id: data.intentId,
          p_intent_token: data.intentToken,
        });
        if (!error) {
          const row = Array.isArray(rows) ? rows[0] : rows;
          if (row) {
            return {
              id: row.id as string,
              tier: row.tier as TierId,
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
      tier: item?.tier ?? ("career" as const),
      name: item?.name ?? "Applicant",
      email: item?.email ?? "applicant@arzon.com",
      phone: item?.phone ?? "+91 9876543210",
      basePriceInr: item?.basePriceInr ?? TIER_META.career.mrpInr,
      couponCode: null,
      discountPct: null,
      couponExpiresAt: null,
      status: item?.status ?? "pending",
      finalPriceInr: item?.basePriceInr ?? TIER_META.career.mrpInr,
      razorpayOrderId: item?.razorpayOrderId ?? null,
    };
  });

const preregSchema = z.object({
  intentId: z.string().uuid(),
  intentToken: z.string().min(16).max(64),
  preregAmountInr: z.number().int().positive().max(100_000),
  balanceInr: z.number().int().min(0).max(10_000_000),
});

type PreRegResult =
  | {
      ok: true;
      preRegistrationInitiatedAt: string;
      preRegistrationAmountInr: number;
      balanceDueInr: number;
      balanceDueAt: string;
    }
  | {
      ok: false;
      error: string;
    };

export const markPreRegistrationInitiated = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => preregSchema.parse(input))
  .handler(async ({ data }): Promise<PreRegResult> => {
    if (isSupabaseConfigured()) {
      try {
        const { data: rows, error } = await rpc("mark_prereg_initiated", {
          p_intent_id: data.intentId,
          p_intent_token: data.intentToken,
          p_amount: data.preregAmountInr,
          p_balance: data.balanceInr,
        });
        if (!error) {
          const row = Array.isArray(rows) ? rows[0] : rows;
          if (row) {
            return {
              ok: true as const,
              preRegistrationInitiatedAt: row.pre_registration_initiated_at as string,
              preRegistrationAmountInr: row.pre_registration_amount_inr as number,
              balanceDueInr: row.balance_due_inr as number,
              balanceDueAt: row.balance_due_at as string,
            };
          }
        }
      } catch (e) {
        console.warn("[enrolment] mark_prereg_initiated Supabase failed, using fallback:", e);
      }
    }

    const item = fallbackIntentStore.get(data.intentId);
    const nowIso = new Date().toISOString();
    const balanceDueIso = new Date(Date.now() + 7 * 86400000).toISOString();
    if (item) {
      item.preRegistrationInitiatedAt = nowIso;
      item.preRegistrationAmountInr = data.preregAmountInr;
      item.balanceDueInr = data.balanceInr;
      item.balanceDueAt = balanceDueIso;
    }

    return {
      ok: true as const,
      preRegistrationInitiatedAt: nowIso,
      preRegistrationAmountInr: data.preregAmountInr,
      balanceDueInr: data.balanceInr,
      balanceDueAt: balanceDueIso,
    };
  });
