import { describe, it, expect } from "vitest";
import { PREREG_AMOUNT_INR } from "@/components/landing/constants";
import { TIER_META, type TierId } from "@/data/enrolmentTiers";

function computeTotals(opts: {
  basePriceInr: number;
  finalPriceInr: number | null;
  couponActive: boolean;
}) {
  const { basePriceInr, finalPriceInr, couponActive } = opts;
  const usable =
    couponActive && finalPriceInr != null && Number.isFinite(finalPriceInr)
      ? finalPriceInr
      : basePriceInr;
  const total = usable;
  const preregAmount = PREREG_AMOUNT_INR;
  const preregBalance = Math.max(0, total - preregAmount);
  const discount = Math.max(0, basePriceInr - total);
  return { total, preregAmount, preregBalance, discount };
}

const TIERS = Object.keys(TIER_META) as TierId[];

const OVERRIDES: Record<string, Record<TierId, number>> = {
  ARZONPRIME60: { essential: 4999, career: 7999, elite: 9999 },
};

function isRenderSafe(n: number) {
  return Number.isFinite(n) && Number.isInteger(n) && n >= 0;
}

function formatInr(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}

describe("coupon edge cases - tier rendering never breaks", () => {
  describe("A. invalid coupon (no override / NaN)", () => {
    for (const tier of TIERS) {
      const base = TIER_META[tier].mrpInr;

      it(`${tier}: no coupon → balance = base − 1000, discount = 0`, () => {
        const t = computeTotals({ basePriceInr: base, finalPriceInr: null, couponActive: false });
        expect(t.total).toBe(base);
        expect(t.preregBalance).toBe(base - PREREG_AMOUNT_INR);
        expect(t.discount).toBe(0);
      });

      it(`${tier}: couponActive=true but finalPriceInr=null → falls back to base`, () => {
        const t = computeTotals({ basePriceInr: base, finalPriceInr: null, couponActive: true });
        expect(t.total).toBe(base);
        expect(t.preregAmount).toBe(PREREG_AMOUNT_INR);
        expect(isRenderSafe(t.preregBalance)).toBe(true);
      });

      it(`${tier}: finalPriceInr=NaN → treated as no override, render-safe`, () => {
        const t = computeTotals({
          basePriceInr: base,
          finalPriceInr: Number.NaN,
          couponActive: true,
        });
        expect(isRenderSafe(t.preregBalance)).toBe(true);
        expect(Number.isFinite(t.total)).toBe(true);
        expect(t.total).toBe(base);
      });
    }
  });

  describe("B. expired coupon (countdown hit 0)", () => {
    for (const tier of TIERS) {
      const base = TIER_META[tier].mrpInr;
      const final = OVERRIDES.ARZONPRIME60[tier];

      it(`${tier}: expired → total reverts to base, discount = 0`, () => {
        const t = computeTotals({ basePriceInr: base, finalPriceInr: final, couponActive: false });
        expect(t.total).toBe(base);
        expect(t.preregBalance).toBe(base - PREREG_AMOUNT_INR);
        expect(t.discount).toBe(0);
      });

      it(`${tier}: preregAmount is invariant across active → expired`, () => {
        const active = computeTotals({
          basePriceInr: base,
          finalPriceInr: final,
          couponActive: true,
        });
        const expired = computeTotals({
          basePriceInr: base,
          finalPriceInr: final,
          couponActive: false,
        });
        expect(active.preregAmount).toBe(PREREG_AMOUNT_INR);
        expect(expired.preregAmount).toBe(PREREG_AMOUNT_INR);
      });

      it(`${tier}: re-apply after expiry restores discounted total`, () => {
        const reapplied = computeTotals({
          basePriceInr: base,
          finalPriceInr: final,
          couponActive: true,
        });
        expect(reapplied.total).toBe(final);
        expect(reapplied.preregBalance).toBe(final - PREREG_AMOUNT_INR);
      });
    }
  });

  describe("C. boundary balances", () => {
    for (const tier of TIERS) {
      const base = TIER_META[tier].mrpInr;

      it(`${tier}: final === 1000 → balance = 0, discount = base − 1000`, () => {
        const t = computeTotals({
          basePriceInr: base,
          finalPriceInr: PREREG_AMOUNT_INR,
          couponActive: true,
        });
        expect(t.preregBalance).toBe(0);
        expect(t.preregAmount).toBe(PREREG_AMOUNT_INR);
        expect(t.discount).toBe(base - PREREG_AMOUNT_INR);
      });

      it(`${tier}: final === 1001 → smallest positive balance = 1`, () => {
        const t = computeTotals({
          basePriceInr: base,
          finalPriceInr: PREREG_AMOUNT_INR + 1,
          couponActive: true,
        });
        expect(t.preregBalance).toBe(1);
      });

      it(`${tier}: final === 999 → balance floored at 0, never negative`, () => {
        const t = computeTotals({
          basePriceInr: base,
          finalPriceInr: PREREG_AMOUNT_INR - 1,
          couponActive: true,
        });
        expect(t.preregBalance).toBe(0);
      });
    }
  });
});
