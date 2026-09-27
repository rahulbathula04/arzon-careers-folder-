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
  leadId: z.string().uuid().optional().nullable(),
  utmSource: z.string().trim().max(64).optional().nullable(),
  userAgent: z.string().trim().max(256).optional().nullable(),
  courseSlug: z.string().trim().max(80).optional().nullable(),
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
          p_lead_id: data.leadId ?? null,
          p_utm_source: data.utmSource ?? null,
          p_user_agent: data.userAgent ?? null,
          p_course_slug: data.courseSlug ?? null,
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
          throw new Error(
            `Unable to create enrolment intent: ${error.message}`,
          );
        }
      } catch (err) {
        console.error("[enrolment] createEnrolmentIntent failed:", err);
        throw new Error("Unable to create enrolment intent. Please try again.");
      }
    }

    if (process.env.NODE_ENV === "production") {
      throw new Error("Enrolment service is unavailable. Please try again.");
    }

    // Development-only fallback. Production never fabricates money-path state.
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
