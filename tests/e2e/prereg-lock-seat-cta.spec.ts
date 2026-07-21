import { test, expect } from "@playwright/test";

/**
 * Verifies the ₹1,065 "Lock seat" pre-registration CTA renders on the pay
 * step whenever the learner qualifies for split payment — i.e. the tier
 * total is greater than the ₹1,065 pre-reg amount — even when NO coupon
 * has been applied.
 *
 * Regression guard: the split-pay CTA is gated only by
 *   `!preregLocked && total > PREREG_AMOUNT_INR`
 * and must never be hidden just because the learner hasn't entered a
 * coupon code. See src/routes/enrol.$tier.pay.tsx.
 */

const TIER = "essential";
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

test.describe("Enrol pay · ₹1,065 lock-seat CTA (no coupon)", () => {
  test("renders the split-pay Lock seat CTA at ₹1,065 without any coupon applied", async ({
    page,
  }) => {
    // Step 1 — create a fresh intent via the real form + server fn path.
    await page.goto(`/enrol/${TIER}`);

    const stamp = Date.now();
    await page.getByPlaceholder(/Aditi Sharma/i).fill("Playwright LockSeat");
    await page.getByPlaceholder(/\+91/).fill("+919999999998");
    await page.getByPlaceholder(/you@email\.com/i).fill(`pw-lockseat+${stamp}@arzon.test`);

    await Promise.all([
      page.waitForURL(
        (url) =>
          url.pathname === `/enrol/${TIER}/pay` &&
          UUID_RE.test(url.searchParams.get("intent") ?? ""),
        { timeout: 15_000 },
      ),
      page.getByRole("button", { name: /Continue to payment/i }).click(),
    ]);

    // Step 2 is mounted.
    await expect(page.getByRole("heading", { level: 1, name: /Confirm and pay/i })).toBeVisible();

    // Pre-reg CTA container is present. It is the sole gate for split-pay
    // eligibility (no coupon has been entered on this fresh intent).
    const prereg = page.getByTestId("prereg-cta");
    await expect(prereg).toBeVisible();

    // "or lock your seat" divider copy.
    await expect(prereg).toContainText(/or lock your seat/i);

    // The button itself must show the ₹1,065 lock-seat label.
    const preregButton = page.getByTestId("prereg-cta-button");
    await expect(preregButton).toBeVisible();
    await expect(preregButton).toBeEnabled();
    await expect(preregButton).toHaveText(/Lock seat.*₹\s*1,065\s*now/i);

    // Helper copy also references the ₹1,065 amount.
    await expect(prereg).toContainText(/₹\s*1,065/);

    // Sanity: the locked-state card is NOT rendered before the user clicks.
    await expect(page.getByTestId("prereg-locked-card")).toHaveCount(0);

    // Sanity: no coupon is active on this intent — no "coupon applied"
    // affordance should be visible on the page.
    await expect(page.getByText(/coupon applied/i)).toHaveCount(0);
  });
});
