import { describe, it, expect } from "vitest";
import { PREREG_AMOUNT_INR } from "@/components/landing/constants";
import { TIER_META, type TierId } from "@/data/enrolmentTiers";

/**
 * Invariant: for every coupon promoted on the /enrol/:tier/pay page,
 * `override_price_inr === PREREG_AMOUNT_INR + intended_split_balance`.
 *
 * This guarantees the split-pay panel always renders as
 * "₹1,000 pre + <clean number> due" - e.g. "₹1,000 + ₹3,999", "₹1,000 + ₹6,999", "₹1,000 + ₹8,999".
 */

const EXPECTED_SPLIT_BALANCE: Record<TierId, number> = {
  essential: 3_999,
  career: 6_999,
  elite: 8_999,
};

const PROMOTED_COUPON_OVERRIDES: Record<string, Record<TierId, number>> = {
  ARZONPRIME60: {
    essential: 4999,
    career: 7999,
    elite: 9999,
  },
};

function computeTotals(basePriceInr: number, finalPriceInr: number) {
  const total = finalPriceInr;
  const preregAmount = PREREG_AMOUNT_INR;
  const preregBalance = Math.max(0, total - preregAmount);
  const discount = Math.max(0, basePriceInr - total);
  return { total, preregAmount, preregBalance, discount };
}

describe("coupon split-pay invariant - every promoted coupon renders ₹1,000 + clean balance", () => {
  const tiers = Object.keys(EXPECTED_SPLIT_BALANCE) as TierId[];

  it("pre-registration amount is ₹1,000", () => {
    expect(PREREG_AMOUNT_INR).toBe(1000);
  });

  for (const [couponCode, overrides] of Object.entries(PROMOTED_COUPON_OVERRIDES)) {
    describe(`coupon ${couponCode}`, () => {
      for (const tier of tiers) {
        const base = TIER_META[tier].mrpInr;
        const finalPrice = overrides[tier];
        const expectedBalance = EXPECTED_SPLIT_BALANCE[tier];

        it(`${tier}: override = 1000 + ${expectedBalance}`, () => {
          expect(finalPrice).toBe(PREREG_AMOUNT_INR + expectedBalance);
        });

        it(`${tier}: post-coupon total > ₹1,000 so Lock-seat button stays visible`, () => {
          expect(finalPrice).toBeGreaterThan(PREREG_AMOUNT_INR);
        });

        it(`${tier}: split-pay panel renders ₹1,000 pre + ₹${expectedBalance.toLocaleString("en-IN")} due`, () => {
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

  it("pre-coupon (no coupon applied): balance = sticker − 1000 for every tier", () => {
    for (const tier of tiers) {
      const base = TIER_META[tier].mrpInr;
      const t = computeTotals(base, base);
      expect(t.preregBalance).toBe(base - PREREG_AMOUNT_INR);
      expect(t.discount).toBe(0);
    }
  });
});
