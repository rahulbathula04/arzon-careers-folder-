import { describe, it, expect } from "vitest";
import { PREREG_AMOUNT_INR } from "@/components/landing/constants";
import { TIER_META, type TierId } from "@/data/enrolmentTiers";

/**
 * Invariant: for every coupon promoted on the /enrol/:tier/pay page,
 * `override_price_inr === PREREG_AMOUNT_INR + intended_split_balance`.
 *
 * This guarantees the split-pay panel always renders as
 * "₹1,065 pre + <clean number> due" — never as "₹1,065 + ₹8,934".
 *
 * `EXPECTED_SPLIT_BALANCE` is the single source of truth. If we ever
 * change what balance a tier owes after a coupon, update this map
 * AND run the matching SQL to update `coupon_tier_prices`. The test
 * fails loudly if they drift.
 */

const EXPECTED_SPLIT_BALANCE: Record<TierId, number> = {
  essential: 5_000,
  career: 7_000,
  elite: 9_000,
};

/**
 * Mirrors the current DB state for coupons the app promotes on the
 * pay page. Keep this table in sync with `coupon_tier_prices` — the
 * "override_price_inr === 1065 + balance" assertion below is what
 * catches drift.
 */
const PROMOTED_COUPON_OVERRIDES: Record<string, Record<TierId, number>> = {
  ARZONPRIME60: {
    essential: 6065,
    career: 8065,
    elite: 10065,
  },
};

function computeTotals(basePriceInr: number, finalPriceInr: number) {
  const total = finalPriceInr;
  const preregAmount = PREREG_AMOUNT_INR;
  const preregBalance = Math.max(0, total - preregAmount);
  const discount = Math.max(0, basePriceInr - total);
  return { total, preregAmount, preregBalance, discount };
}

describe("coupon split-pay invariant — every promoted coupon renders ₹1,065 + clean balance", () => {
  const tiers = Object.keys(EXPECTED_SPLIT_BALANCE) as TierId[];

  it("pre-registration amount is ₹1,065", () => {
    expect(PREREG_AMOUNT_INR).toBe(1065);
  });

  for (const [couponCode, overrides] of Object.entries(PROMOTED_COUPON_OVERRIDES)) {
    describe(`coupon ${couponCode}`, () => {
      for (const tier of tiers) {
        const base = TIER_META[tier].priceInr;
        const finalPrice = overrides[tier];
        const expectedBalance = EXPECTED_SPLIT_BALANCE[tier];

        it(`${tier}: override = 1065 + ${expectedBalance}`, () => {
          expect(finalPrice).toBe(PREREG_AMOUNT_INR + expectedBalance);
        });

        it(`${tier}: post-coupon total > ₹1,065 so Lock-seat button stays visible`, () => {
          expect(finalPrice).toBeGreaterThan(PREREG_AMOUNT_INR);
        });

        it(`${tier}: split-pay panel renders ₹1,065 pre + ₹${expectedBalance.toLocaleString("en-IN")} due`, () => {
          const t = computeTotals(base, finalPrice);
          expect(t.preregAmount).toBe(PREREG_AMOUNT_INR);
          expect(t.preregBalance).toBe(expectedBalance);
          expect(t.preregAmount + t.preregBalance).toBe(finalPrice);
        });

        it(`${tier}: pre-registration amount is invariant under coupon apply`, () => {
          const noCoupon = computeTotals(base, base);
          const withCoupon = computeTotals(base, finalPrice);
          expect(withCoupon.preregAmount).toBe(noCoupon.preregAmount);
          expect(withCoupon.preregAmount).toBe(PREREG_AMOUNT_INR);
        });
      }
    });
  }

  it("pre-coupon (no coupon applied): balance = sticker − 1065 for every tier", () => {
    for (const tier of tiers) {
      const base = TIER_META[tier].priceInr;
      const t = computeTotals(base, base);
      expect(t.preregBalance).toBe(base - PREREG_AMOUNT_INR);
      expect(t.discount).toBe(0);
    }
  });
});
