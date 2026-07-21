import { test, expect, type Page } from "@playwright/test";

/**
 * Real-route smoke test for `/career-engine/result`.
 *
 * The visual-regression harness at `/dev/cards` mocks the result-page
 * cards in isolation, but the actual gated route — which is what real
 * users land on — can break without the harness noticing (guard logic,
 * cached-result hydration, normaliser, etc.). This spec seeds the
 * sessionStorage the route expects and asserts the page renders past
 * the loading skeleton at both phone and desktop widths.
 */

const SEEDED_RESULT = {
  archetypeId: "coder",
  fitScore: 78,
  confidence: 72,
  confidenceBand: "recommended",
  ranking: [{ id: "coder", fit: 78 }],
  notFit: { id: "operator", fit: 12 },
  notFitReasons: [],
  microAccuracy: 0.8,
  breakdown: { aptitude: 0.8, interest: 0.8, background: 0.6, commitment: 0.7 },
  risks: [],
  traitScores: { detail: 8, logic: 7, tech: 6, data: 5, language: 4 },
  evidence: {
    summary: "smoke seed",
    topDrivers: [],
    watchOuts: [],
    pathDrivers: {},
    tieBreakers: [],
    scoring: { answered: 60, assessmentSize: 60, topGap: 5, topPathFits: [] },
  },
};

async function seed(page: Page) {
  await page.addInitScript((seeded) => {
    try {
      sessionStorage.setItem("ce_result", JSON.stringify(seeded));
    } catch {
      /* noop */
    }
  }, SEEDED_RESULT);
}

for (const vp of [
  { name: "mobile-390", width: 390, height: 844 },
  { name: "desktop-1280", width: 1280, height: 800 },
]) {
  test(`/career-engine/result renders past the skeleton @ ${vp.name}`, async ({ page }) => {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await seed(page);
    await page.goto("/career-engine/result");

    // The headline only renders when the result is hydrated. If it
    // appears, we're past the skeleton AND the page hasn't crashed.
    await expect(page.getByRole("heading", { name: /You match best with/i })).toBeVisible({
      timeout: 10_000,
    });

    // Recovery card must not be on screen when seeding succeeded.
    await expect(page.getByTestId("result-recovery")).toHaveCount(0);
  });
}

test("/career-engine/result highlights the reserve-seat next step", async ({ page }) => {
  await seed(page);
  await page.goto("/career-engine/result");

  await expect(page.getByRole("heading", { name: /Reserve your seat/i })).toBeVisible({
    timeout: 10_000,
  });
  await expect(page.getByText(/₹1,065/i)).toBeVisible();
  await expect(page.getByText(/1-on-1 onboarding/i)).toBeVisible();
});

test("/career-engine/result surfaces a recovery card when no result is seeded", async ({
  page,
}) => {
  await page.addInitScript(() => {
    // Pretend a lead exists so the session guard lets us through, but
    // omit ce_result so the page has nothing to render.
    try {
      sessionStorage.setItem("ce_lead_id", "missing-lead-for-smoke");
    } catch {
      /* noop */
    }
  });
  await page.goto("/career-engine/result");
  await expect(page.getByTestId("result-recovery")).toBeVisible({ timeout: 15_000 });
});

test("/career-engine/result restores a completed localStorage snapshot even after the attempt TTL", async ({
  page,
}) => {
  await page.addInitScript((seeded) => {
    try {
      sessionStorage.clear();
      localStorage.setItem(
        "ce_snapshot_v1",
        JSON.stringify({
          _savedAt: "1",
          ce_attempt_started_at: "1",
          ce_result: JSON.stringify(seeded),
        }),
      );
    } catch {
      /* noop */
    }
  }, SEEDED_RESULT);
  await page.goto("/career-engine/result");
  await expect(page.getByRole("heading", { name: /You match best with/i })).toBeVisible({
    timeout: 10_000,
  });
});
