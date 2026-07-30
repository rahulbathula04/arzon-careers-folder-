import { test, expect, type Page } from "@playwright/test";

/**
 * E2E: ACRI recommended-track + PV flagship CTA analytics.
 *
 * Verifies the click handlers on `/career-engine/result` actually emit:
 *   - acri_track_clicked  (flagship card)   → track_slug=pharmacovigilance, source=card
 *   - acri_track_clicked  (secondary card)  → track_slug=ai-intelligence,   source=card
 *   - acri_pv_cta_clicked (hero PV CTA)     → band + overall in props
 *
 * Strategy:
 *   1. addInitScript seeds sessionStorage with a cached `ce_result` so the
 *      Career Engine guard lets us into /career-engine/result without doing
 *      the full lead → start → test funnel.
 *   2. addInitScript wraps window.fetch to capture every analytics POST body
 *      onto window.__capturedAnalytics - the trackEvent server function
 *      goes through fetch, so this catches every track() emission.
 *   3. A capture-phase click listener calls preventDefault() on every <a>
 *      so navigation is suppressed but React's bubble-phase onClick (which
 *      fires the analytics call) still runs.
 */

const SEEDED_RESULT = {
  archetypeId: "coder", // → flagship PV + secondary "ai-intelligence"
  fitScore: 78,
  confidence: 72,
  confidenceBand: "recommended",
  ranking: [{ id: "coder", fit: 78 }],
  notFit: { id: "operator", fit: 12 },
  notFitReasons: [],
  microAccuracy: 0.8,
  breakdown: { aptitude: 0.8, interest: 0.8, background: 0.6, commitment: 0.7 },
  risks: [],
  // Non-empty traitScores - required so the page does NOT fall through to
  // AcriPreviewFallback. Mix gives a stable preview score across dimensions.
  traitScores: { detail: 8, logic: 7, tech: 6, data: 5, language: 4 },
  evidence: {
    summary: "seed",
    topDrivers: [],
    watchOuts: [],
    pathDrivers: {},
    tieBreakers: [],
    scoring: { answered: 60, assessmentSize: 60, topGap: 5, topPathFits: [] },
  },
};

async function seedAndCapture(page: Page) {
  await page.addInitScript((seeded) => {
    try {
      sessionStorage.setItem("ce_result", JSON.stringify(seeded));
    } catch {
      /* noop */
    }

    // Capture every fetch payload so we can assert analytics calls.
    const w = window as unknown as { __capturedAnalytics: string[]; fetch: typeof fetch };
    w.__capturedAnalytics = [];
    const originalFetch = w.fetch.bind(window);
    w.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
      try {
        let body: string | null = null;
        if (init?.body) {
          if (typeof init.body === "string") body = init.body;
          else {
            try {
              body = await new Response(init.body).clone().text();
            } catch {
              /* noop */
            }
          }
        }
        if (body && body.includes("event_name")) {
          w.__capturedAnalytics.push(body);
        }
      } catch {
        /* noop */
      }
      return originalFetch(input, init);
    };

    // Suppress link navigation so async analytics calls survive long enough
    // to be observed. React's bubble-phase onClick still fires.
    window.addEventListener(
      "click",
      (e) => {
        const a = (e.target as Element | null)?.closest?.("a");
        if (a) e.preventDefault();
      },
      true,
    );
  }, SEEDED_RESULT);
}

async function getCapturedEvent(page: Page, eventName: string) {
  return page.evaluate((name) => {
    const captured =
      (window as unknown as { __capturedAnalytics: string[] }).__capturedAnalytics ?? [];
    for (const raw of captured) {
      try {
        const parsed = JSON.parse(raw);
        // trackEvent server fn wraps payload as { data: { event_name, ... } }
        const evt = parsed?.data ?? parsed;
        if (evt?.event_name === name) return evt;
      } catch {
        /* noop */
      }
    }
    return null;
  }, eventName);
}

async function waitForEvent(page: Page, eventName: string) {
  await expect
    .poll(async () => Boolean(await getCapturedEvent(page, eventName)), {
      timeout: 5_000,
      message: `expected analytics event ${eventName} to fire`,
    })
    .toBe(true);
  return getCapturedEvent(page, eventName);
}

test.describe("Career Engine ACRI · click analytics", () => {
  test("flagship card click fires acri_track_clicked with PV slug", async ({ page }) => {
    await seedAndCapture(page);
    await page.goto("/career-engine/result");

    await expect(page.getByRole("heading", { name: /Your ACRI Readiness Preview/i })).toBeVisible();

    await page
      .getByRole("link", { name: /See the flagship track/i })
      .first()
      .click();

    const evt = await waitForEvent(page, "acri_track_clicked");
    expect(evt).toBeTruthy();
    expect(evt!.props.track_slug).toBe("pharmacovigilance");
    expect(evt!.props.track_tag).toBe("flagship");
    expect(evt!.props.source).toBe("card");
  });

  test("secondary card click fires acri_track_clicked with secondary tag", async ({ page }) => {
    await seedAndCapture(page);
    await page.goto("/career-engine/result");

    await expect(page.getByRole("heading", { name: /Your ACRI Readiness Preview/i })).toBeVisible();

    await page
      .getByRole("link", { name: /See the secondary track/i })
      .first()
      .click();

    const evt = await waitForEvent(page, "acri_track_clicked");
    expect(evt).toBeTruthy();
    expect(evt!.props.track_tag).toBe("secondary");
    expect(evt!.props.source).toBe("card");
    // For archetype="coder", the secondary track is "ai-intelligence".
    expect(evt!.props.track_slug).toBe("ai-intelligence");
  });

  test("hero PV CTA fires the dedicated acri_pv_cta_clicked funnel event", async ({ page }) => {
    await seedAndCapture(page);
    await page.goto("/career-engine/result");

    await expect(page.getByRole("heading", { name: /Your ACRI Readiness Preview/i })).toBeVisible();

    await page.getByRole("link", { name: /Start the PV flagship track/i }).click();

    const evt = await waitForEvent(page, "acri_pv_cta_clicked");
    expect(evt).toBeTruthy();
    expect(typeof evt!.props.band).toBe("string");
    expect(typeof evt!.props.overall).toBe("number");
    expect(evt!.props.overall).toBeGreaterThanOrEqual(0);
    expect(evt!.props.overall).toBeLessThanOrEqual(100);

    // Importantly, it is NOT the generic recommended-track event.
    const generic = await getCapturedEvent(page, "acri_track_clicked");
    expect(generic, "PV hero CTA must emit acri_pv_cta_clicked, not acri_track_clicked").toBeNull();
  });
});
