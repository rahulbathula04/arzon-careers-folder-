import { test, expect } from "@playwright/test";

/**
 * Integration test for the enrolment funnel routing.
 *
 * Verifies, after submitting Step 1 of `/enrol/$tier`:
 *   1. The URL transitions to `/enrol/$tier/pay?intent=<uuid>`.
 *   2. The `tier` path param is preserved across the navigation.
 *   3. The `intent` search param is a valid UUID.
 *   4. The nested child outlet renders the Step 2 payment component
 *      (Step 1 contact form is unmounted; Step 2 "Confirm and pay" is mounted).
 *
 * The test uses the real server function + DB (same path the user takes),
 * because the dev server in `playwright.config.ts` boots the full app.
 */

const TIER = "essential";
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

test.describe("Enrol funnel · form → pay navigation", () => {
  test("preserves tier param and renders nested pay outlet with intent", async ({ page }) => {
    await page.goto(`/enrol/${TIER}`);

    // Step 1 is mounted.
    await expect(page.getByRole("heading", { level: 1, name: /Enrol in/i })).toBeVisible();
    await expect(page.getByText(/Step 1 of 2/i)).toBeVisible();

    // Fill the form with a unique email so we don't collide with prior runs.
    const stamp = Date.now();
    await page.getByPlaceholder(/Aditi Sharma/i).fill("Playwright Test");
    await page.getByPlaceholder(/\+91/).fill("+919999999999");
    await page.getByPlaceholder(/you@email\.com/i).fill(`pw+${stamp}@arzon.test`);

    // Submit and wait for the route transition.
    await Promise.all([
      page.waitForURL(
        (url) =>
          url.pathname === `/enrol/${TIER}/pay` &&
          UUID_RE.test(url.searchParams.get("intent") ?? ""),
        { timeout: 15_000 },
      ),
      page.getByRole("button", { name: /Continue to payment/i }).click(),
    ]);

    // (1) + (2) tier param preserved in path.
    const url = new URL(page.url());
    expect(url.pathname).toBe(`/enrol/${TIER}/pay`);

    // (3) intent search param is a UUID.
    const intent = url.searchParams.get("intent");
    expect(intent, "intent search param must be present").toBeTruthy();
    expect(intent!).toMatch(UUID_RE);

    // (4) Nested outlet rendered Step 2; Step 1 form is gone.
    await expect(page.getByText(/Step 2 of 2/i)).toBeVisible();
    await expect(page.getByRole("heading", { level: 1, name: /Confirm and pay/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /Pay .* securely/i })).toBeVisible();
    // Step 1 contact field must no longer exist in the DOM.
    await expect(page.getByPlaceholder(/Aditi Sharma/i)).toHaveCount(0);
  });

  test("invalid tier param triggers notFound (no pay outlet rendered)", async ({ page }) => {
    const resp = await page.goto("/enrol/not-a-real-tier");
    // Either a 404 response or the not-found UI rendered client-side.
    // We assert the Step 1 form is NOT mounted for an invalid tier.
    expect(resp?.status() ?? 200).toBeLessThan(500);
    await expect(page.getByText(/Step 1 of 2/i)).toHaveCount(0);
  });
});
