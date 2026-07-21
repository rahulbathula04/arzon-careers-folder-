import { z } from "zod";
import { track } from "@/lib/track";

/**
 * Analytics for the urgency engine surfaces (deadline countdown strip,
 * counsellors-online pill, coupon countdown). Mirrors the safeEmit pattern
 * from `careerEngineAnalytics` so a malformed payload is dropped (with a
 * console.warn) instead of polluting `analytics_events`.
 *
 * Three events live here:
 *   - urgency_strip_viewed       → impression of the cohort countdown strip
 *   - urgency_cta_clicked        → click on a strip CTA (readiness / whatsapp)
 *   - urgency_coupon_low_time    → coupon countdown crossed the low-time
 *                                  threshold (last 10 minutes)
 *
 * View events fire ONCE per page mount. Callers must guard for that
 * (typically with `useInView` + a ref guard) — this module does not
 * deduplicate.
 */
function safeEmit<T>(
  eventName: string,
  schema: z.ZodType<T>,
  args: unknown,
  emit: (parsed: T) => void,
): void {
  const result = schema.safeParse(args);
  if (!result.success) {
    if (typeof console !== "undefined") {
      console.warn(
        `[analytics] dropped ${eventName}: invalid payload`,
        result.error.flatten().fieldErrors,
      );
    }
    return;
  }
  try {
    emit(result.data);
  } catch (err) {
    if (typeof console !== "undefined") {
      console.warn(`[analytics] emit threw for ${eventName}`, err);
    }
  }
}

const Slug = z
  .string()
  .min(1)
  .max(80)
  .regex(/^[a-z0-9-]+$/, "lowercase slug");
const NonNegInt = z.number().int().min(0).max(10_000);
const PositiveMs = z
  .number()
  .finite()
  .min(0)
  .max(7 * 24 * 60 * 60 * 1000);
const UrgencyTarget = z.enum(["readiness_assessment", "whatsapp_counsellor"]);

const StripViewSchema = z.object({
  cohortId: Slug,
  daysToClose: NonNegInt,
  hoursToClose: z.number().int().min(0).max(23),
  counsellorsOnline: z.boolean(),
  seatsLabel: z.string().min(1).max(64).optional(),
  closed: z.boolean(),
});
export type UrgencyStripViewArgs = z.infer<typeof StripViewSchema>;

export function trackUrgencyStripViewed(args: UrgencyStripViewArgs): void {
  safeEmit("urgency_strip_viewed", StripViewSchema, args, (a) => {
    track("urgency_strip_viewed", {
      props: {
        cohort_id: a.cohortId,
        days_to_close: a.daysToClose,
        hours_to_close: a.hoursToClose,
        counsellors_online: a.counsellorsOnline,
        seats_label: a.seatsLabel ?? null,
        closed: a.closed,
      },
    });
  });
}

const StripCtaSchema = z.object({
  target: UrgencyTarget,
  cohortId: Slug,
  daysToClose: NonNegInt,
  hoursToClose: z.number().int().min(0).max(23),
});
export type UrgencyCtaArgs = z.infer<typeof StripCtaSchema>;

export function trackUrgencyCtaClicked(args: UrgencyCtaArgs): void {
  safeEmit("urgency_cta_clicked", StripCtaSchema, args, (a) => {
    track("urgency_cta_clicked", {
      props: {
        target: a.target,
        cohort_id: a.cohortId,
        days_to_close: a.daysToClose,
        hours_to_close: a.hoursToClose,
      },
    });
  });
}

const CouponLowTimeSchema = z.object({
  intentId: z.string().uuid(),
  tier: z.enum(["essential", "career", "elite"]),
  remainingMs: PositiveMs,
});
export type CouponLowTimeArgs = z.infer<typeof CouponLowTimeSchema>;

/**
 * Fires once when a live coupon's countdown crosses below 10 minutes.
 * Caller guards with a ref so it doesn't re-fire every render.
 */
export function trackUrgencyCouponLowTime(args: CouponLowTimeArgs): void {
  safeEmit("urgency_coupon_low_time", CouponLowTimeSchema, args, (a) => {
    track("urgency_coupon_low_time", {
      program_slug: a.tier,
      props: {
        intent_id: a.intentId,
        tier: a.tier,
        remaining_ms: a.remainingMs,
      },
    });
  });
}
