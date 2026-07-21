import { describe, expect, it, mock, beforeEach } from "bun:test";

// Capture every track() call so we can assert event names + payload shape.
const calls: Array<{ name: string; extra: Record<string, unknown> }> = [];

mock.module("@/lib/track", () => ({
  track: (name: string, extra: Record<string, unknown>) => {
    calls.push({ name, extra });
  },
  getAnonId: () => "anon-test",
}));

// trackEvent is only used by retry-backed events we don't exercise here.
mock.module("@/lib/analytics.functions", () => ({
  trackEvent: async () => ({ ok: true }),
}));

import {
  trackAcriTrackClicked,
  trackAcriPvCtaClicked,
  trackCareerDirectionDetailViewed,
} from "../careerEngineAnalytics";

beforeEach(() => {
  calls.length = 0;
});

describe("trackAcriPvCtaClicked", () => {
  it("fires the dedicated funnel event with band + overall", () => {
    trackAcriPvCtaClicked({
      leadId: "lead-1",
      attemptId: "att-1",
      band: "developing",
      overall: 58,
    });
    expect(calls).toHaveLength(1);
    expect(calls[0].name).toBe("acri_pv_cta_clicked");
    expect(calls[0].extra).toEqual({
      session_id: null,
      lead_id: "lead-1",
      props: {
        attempt_id: "att-1",
        band: "developing",
        overall: 58,
      },
    });
  });

  it("does NOT collide with the generic recommended-track event", () => {
    trackAcriPvCtaClicked({ band: "foundation", overall: 12 });
    expect(calls[0].name).not.toBe("acri_track_clicked");
  });
});

describe("trackAcriTrackClicked", () => {
  it("fires acri_track_clicked for a flagship card click", () => {
    trackAcriTrackClicked({
      leadId: "lead-2",
      attemptId: "att-2",
      trackSlug: "pharmacovigilance",
      trackTag: "flagship",
      source: "card",
    });
    expect(calls).toHaveLength(1);
    expect(calls[0].name).toBe("acri_track_clicked");
    expect(calls[0].extra.props).toEqual({
      attempt_id: "att-2",
      track_slug: "pharmacovigilance",
      track_tag: "flagship",
      source: "card",
    });
  });

  it("fires acri_track_clicked for a secondary card click", () => {
    trackAcriTrackClicked({
      trackSlug: "medical-coding",
      trackTag: "secondary",
      source: "card",
    });
    expect(calls[0].extra.props).toMatchObject({
      track_slug: "medical-coding",
      track_tag: "secondary",
      source: "card",
    });
  });

  it("supports source=hero_cta so PV hero clicks are distinguishable", () => {
    trackAcriTrackClicked({
      trackSlug: "pharmacovigilance",
      trackTag: "flagship",
      source: "hero_cta",
    });
    expect((calls[0].extra.props as Record<string, unknown>).source).toBe("hero_cta");
  });
});

describe("trackCareerDirectionDetailViewed", () => {
  it("fires ce_career_direction_detail_viewed once with archetype", () => {
    trackCareerDirectionDetailViewed({
      leadId: "lead-3",
      attemptId: "att-3",
      archetype: "sentinel",
    });
    expect(calls).toHaveLength(1);
    expect(calls[0].name).toBe("ce_career_direction_detail_viewed");
    expect((calls[0].extra.props as Record<string, unknown>).archetype).toBe("sentinel");
  });
});

describe("schema validation drops invalid payloads", () => {
  let warnCount = 0;
  const originalWarn = console.warn;
  beforeEach(() => {
    warnCount = 0;

    console.warn = () => {
      warnCount++;
    };
  });

  it("drops acri_track_clicked when track_tag is invalid", () => {
    trackAcriTrackClicked({
      trackTag: "primary" as unknown as "flagship",
      trackSlug: "pharmacovigilance",
      source: "card",
    });
    expect(calls).toHaveLength(0);
    expect(warnCount).toBeGreaterThan(0);
  });

  it("drops acri_track_clicked when source is missing", () => {
    trackAcriTrackClicked({
      trackTag: "flagship",
      trackSlug: "pharmacovigilance",
      source: undefined as unknown as "card",
    });
    expect(calls).toHaveLength(0);
  });

  it("drops acri_track_clicked when track_slug is not a slug", () => {
    trackAcriTrackClicked({
      trackTag: "flagship",
      trackSlug: "Pharmacovigilance!",
      source: "card",
    });
    expect(calls).toHaveLength(0);
  });

  it("drops acri_pv_cta_clicked when overall is out of range", () => {
    trackAcriPvCtaClicked({ band: "developing", overall: 150 });
    expect(calls).toHaveLength(0);
  });

  it("drops acri_pv_cta_clicked when band is unknown", () => {
    trackAcriPvCtaClicked({ band: "elite", overall: 50 });
    expect(calls).toHaveLength(0);
  });

  it("drops acri_pv_cta_clicked when overall is NaN", () => {
    trackAcriPvCtaClicked({ band: "foundation", overall: NaN });
    expect(calls).toHaveLength(0);
  });

  it("drops ce_career_direction_detail_viewed when archetype is empty", () => {
    trackCareerDirectionDetailViewed({ archetype: "" });
    expect(calls).toHaveLength(0);
  });

  it("accepts a fully-valid payload (sanity)", () => {
    trackAcriPvCtaClicked({ band: "industry_ready", overall: 80 });
    expect(calls).toHaveLength(1);
    expect(calls[0].name).toBe("acri_pv_cta_clicked");
    // restore

    console.warn = originalWarn;
  });
});
