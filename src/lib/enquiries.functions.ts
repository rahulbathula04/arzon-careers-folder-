import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const Schema = z.object({
  courseSlug: z.string().min(1).max(80),
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  phone: z.string().trim().min(10).max(15),
  city: z.string().trim().max(80).optional().default(""),
  preferredSlot: z.string().trim().max(120).optional().default(""),
  variantLayout: z.string().max(32).optional().default(""),
  variantCta: z.string().max(32).optional().default(""),
  expUid: z.string().max(64).optional().default(""),
  placement: z.enum(["hero", "mid", "final"]).default("hero"),
  basePriceInr: z.number().int().positive().max(1_000_000),
  utmSource: z.string().max(64).optional().default(""),
});

export const submitCourseEnquiry = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => Schema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: rows, error } = await (supabaseAdmin as any).rpc("submit_course_enquiry", {
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
      p_user_agent: null,
    });
    if (error) {
      console.error("[submitCourseEnquiry] rpc error", error);
      return { ok: false as const, error: error.message ?? "failed" };
    }
    const row = Array.isArray(rows) ? rows[0] : rows;
    return {
      ok: true as const,
      intentId: row?.id as string,
      intentToken: row?.intent_token as string,
    };
  });
