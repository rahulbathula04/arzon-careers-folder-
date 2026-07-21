import { describe, expect, it, mock, beforeEach, spyOn } from "bun:test";

const calls: Array<{ name: string; extra: Record<string, unknown> }> = [];

mock.module("@/lib/track", () => ({
  track: (name: string, extra: Record<string, unknown>) => {
    calls.push({ name, extra });
  },
  getAnonId: () => "anon-test",
}));
mock.module("@/lib/analytics.functions", () => ({
  trackEvent: async () => ({ ok: true }),
}));

import {
  trackUrgencyStripViewed,
  trackUrgencyCtaClicked,
  trackUrgencyCouponLowTime,
} from "../urgencyAnalytics";

beforeEach(() => {
  calls.length = 0;
});

describe("trackUrgencyStripViewed", () => {
  it("emits urgency_strip_viewed with full payload", () => {
    trackUrgencyStripViewed({
      cohortId: "may-2026",
      daysToClose: 3,
      hoursToClose: 7,
      counsellorsOnline: true,
      seatsLabel: "1,200+",
      closed: false,
    });
    expect(calls).toHaveLength(1);
    expect(calls[0].name).toBe("urgency_strip_viewed");
    expect(calls[0].extra.props).toEqual({
      cohort_id: "may-2026",
      days_to_close: 3,
      hours_to_close: 7,
      counsellors_online: true,
      seats_label: "1,200+",
      closed: false,
    });
  });

  it("normalises a missing seatsLabel to null in the payload", () => {
    trackUrgencyStripViewed({
      cohortId: "aug-2026",
      daysToClose: 0,
      hoursToClose: 0,
      counsellorsOnline: false,
      closed: true,
    });
    expect(calls[0].extra.props).toMatchObject({
      cohort_id: "aug-2026",
      seats_label: null,
      closed: true,
      counsellors_online: false,
    });
  });

  it("drops events with an invalid cohort slug", () => {
    const warn = spyOn(console, "warn").mockImplementation(() => {});
    trackUrgencyStripViewed({
      cohortId: "May 2026!" as string,
      daysToClose: 1,
      hoursToClose: 1,
      counsellorsOnline: false,
      closed: false,
    });
    expect(calls).toHaveLength(0);
    expect(warn).toHaveBeenCalled();
    warn.mockRestore();
  });

  it("drops events with out-of-range hours", () => {
    const warn = spyOn(console, "warn").mockImplementation(() => {});
    trackUrgencyStripViewed({
      cohortId: "may-2026",
      daysToClose: 2,
      hoursToClose: 99,
      counsellorsOnline: false,
      closed: false,
    });
    expect(calls).toHaveLength(0);
    warn.mockRestore();
  });
});

describe("trackUrgencyCtaClicked", () => {
  it("emits the readiness target", () => {
    trackUrgencyCtaClicked({
      target: "readiness_assessment",
      cohortId: "may-2026",
      daysToClose: 2,
      hoursToClose: 5,
    });
    expect(calls[0].name).toBe("urgency_cta_clicked");
    expect(calls[0].extra.props).toEqual({
      target: "readiness_assessment",
      cohort_id: "may-2026",
      days_to_close: 2,
      hours_to_close: 5,
    });
  });

  it("emits the whatsapp target", () => {
    trackUrgencyCtaClicked({
      target: "whatsapp_counsellor",
      cohortId: "may-2026",
      daysToClose: 0,
      hoursToClose: 0,
    });
    expect(calls[0].extra.props).toMatchObject({
      target: "whatsapp_counsellor",
    });
  });

  it("drops a CTA with an unknown target", () => {
    const warn = spyOn(console, "warn").mockImplementation(() => {});
    trackUrgencyCtaClicked({
      // @ts-expect-error — runtime drift case
      target: "facebook_dm",
      cohortId: "may-2026",
      daysToClose: 1,
      hoursToClose: 1,
    });
    expect(calls).toHaveLength(0);
    warn.mockRestore();
  });
});

describe("trackUrgencyCouponLowTime", () => {
  it("emits with intent + tier + remaining_ms", () => {
    trackUrgencyCouponLowTime({
      intentId: "11111111-1111-4111-8111-111111111111",
      tier: "career",
      remainingMs: 9 * 60 * 1000,
    });
    expect(calls[0].name).toBe("urgency_coupon_low_time");
    expect(calls[0].extra).toEqual({
      program_slug: "career",
      props: {
        intent_id: "11111111-1111-4111-8111-111111111111",
        tier: "career",
        remaining_ms: 9 * 60 * 1000,
      },
    });
  });

  it("drops events whose intentId is not a uuid", () => {
    const warn = spyOn(console, "warn").mockImplementation(() => {});
    trackUrgencyCouponLowTime({
      intentId: "not-a-uuid",
      tier: "career",
      remainingMs: 1000,
    });
    expect(calls).toHaveLength(0);
    warn.mockRestore();
  });

  it("drops events whose tier is unknown", () => {
    const warn = spyOn(console, "warn").mockImplementation(() => {});
    trackUrgencyCouponLowTime({
      intentId: "11111111-1111-4111-8111-111111111111",
      // @ts-expect-error — runtime drift case
      tier: "platinum",
      remainingMs: 1000,
    });
    expect(calls).toHaveLength(0);
    warn.mockRestore();
  });

  it("drops events with negative remaining_ms", () => {
    const warn = spyOn(console, "warn").mockImplementation(() => {});
    trackUrgencyCouponLowTime({
      intentId: "11111111-1111-4111-8111-111111111111",
      tier: "essential",
      remainingMs: -1,
    });
    expect(calls).toHaveLength(0);
    warn.mockRestore();
  });
});
