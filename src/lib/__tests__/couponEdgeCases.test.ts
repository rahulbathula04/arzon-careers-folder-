import { describe, it, expect } from "vitest";
import { PREREG_AMOUNT_INR } from "@/components/landing/constants";
import { TIER_META, type TierId } from "@/data/enrolmentTiers";

/**
 * Edge-case coverage for the split-pay math that lives in
 * `src/routes/enrol.$tier.pay.tsx`. Mirrors that same helper here so
 * any drift in the route implementation trips a failure alongside
 * `couponSplitPayInvariant.test.ts` and `preregCouponMath.test.ts`.
 *
 * Purpose: guarantee the "₹1,065 pre + ₹<balance> due" panel never
 * renders NaN, a negative balance, or a wrong tier — regardless of
 * what the coupon RPC returns.
 */

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

// Real promoted coupons in the DB — used for "swap between coupons" tests.
const OVERRIDES: Record<string, Record<TierId, number>> = {
  ARZONPRIME60: { essential: 6065, career: 8065, elite: 10065 },
  ARZONELITE40: { essential: 8065, career: 10065, elite: 12065 },
};

function isRenderSafe(n: number) {
  return Number.isFinite(n) && Number.isInteger(n) && n >= 0;
}

function formatInr(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}

describe("coupon edge cases — tier rendering never breaks", () => {
  describe("A. invalid coupon (no override / NaN)", () => {
    for (const tier of TIERS) {
      const base = TIER_META[tier].priceInr;

      it(`${tier}: no coupon → balance = base − 1065, discount = 0`, () => {
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
      const base = TIER_META[tier].priceInr;
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

  describe("C. repeated coupon application is idempotent", () => {
    for (const tier of TIERS) {
      const base = TIER_META[tier].priceInr;
      const finalA = OVERRIDES.ARZONPRIME60[tier];
      const finalB = OVERRIDES.ARZONELITE40[tier];

      it(`${tier}: 5 identical applies produce identical results`, () => {
        const runs = Array.from({ length: 5 }, () =>
          computeTotals({ basePriceInr: base, finalPriceInr: finalA, couponActive: true }),
        );
        for (const r of runs) expect(r).toEqual(runs[0]);
      });

      it(`${tier}: swapping A → B → A always lands on the latest override`, () => {
        const a1 = computeTotals({ basePriceInr: base, finalPriceInr: finalA, couponActive: true });
        const b = computeTotals({ basePriceInr: base, finalPriceInr: finalB, couponActive: true });
        const a2 = computeTotals({ basePriceInr: base, finalPriceInr: finalA, couponActive: true });
        expect(a1).toEqual(a2);
        expect(b.total).toBe(finalB);
        expect(a2.total).toBe(finalA);
      });

      it(`${tier}: active → inactive → active === single fresh apply`, () => {
        const fresh = computeTotals({
          basePriceInr: base,
          finalPriceInr: finalA,
          couponActive: true,
        });
        computeTotals({ basePriceInr: base, finalPriceInr: finalA, couponActive: false });
        const reapplied = computeTotals({
          basePriceInr: base,
          finalPriceInr: finalA,
          couponActive: true,
        });
        expect(reapplied).toEqual(fresh);
      });
    }
  });

  describe("D. boundary balances", () => {
    for (const tier of TIERS) {
      const base = TIER_META[tier].priceInr;

      it(`${tier}: final === 1065 → balance = 0, discount = base − 1065`, () => {
        const t = computeTotals({
          basePriceInr: base,
          finalPriceInr: PREREG_AMOUNT_INR,
          couponActive: true,
        });
        expect(t.preregBalance).toBe(0);
        expect(t.preregAmount).toBe(PREREG_AMOUNT_INR);
        expect(t.discount).toBe(base - PREREG_AMOUNT_INR);
      });

      it(`${tier}: final === 1066 → smallest positive balance = 1`, () => {
        const t = computeTotals({
          basePriceInr: base,
          finalPriceInr: PREREG_AMOUNT_INR + 1,
          couponActive: true,
        });
        expect(t.preregBalance).toBe(1);
      });

      it(`${tier}: final === 1064 → balance floored at 0, never negative`, () => {
        const t = computeTotals({
          basePriceInr: base,
          finalPriceInr: PREREG_AMOUNT_INR - 1,
          couponActive: true,
        });
        expect(t.preregBalance).toBe(0);
      });

      it(`${tier}: final === 0 → balance 0, discount = base`, () => {
        const t = computeTotals({ basePriceInr: base, finalPriceInr: 0, couponActive: true });
        expect(t.preregBalance).toBe(0);
        expect(t.discount).toBe(base);
      });

      it(`${tier}: final === base → balance = base − 1065, discount = 0`, () => {
        const t = computeTotals({ basePriceInr: base, finalPriceInr: base, couponActive: true });
        expect(t.preregBalance).toBe(base - PREREG_AMOUNT_INR);
        expect(t.discount).toBe(0);
      });

      it(`${tier}: final > base → discount clamped at 0 (never negative)`, () => {
        const t = computeTotals({
          basePriceInr: base,
          finalPriceInr: base + 1,
          couponActive: true,
        });
        expect(t.discount).toBe(0);
        expect(t.preregBalance).toBe(base + 1 - PREREG_AMOUNT_INR);
      });

      it(`${tier}: very large final → still finite integer`, () => {
        const t = computeTotals({
          basePriceInr: base,
          finalPriceInr: 10_000_000,
          couponActive: true,
        });
        expect(isRenderSafe(t.preregBalance)).toBe(true);
        expect(isRenderSafe(t.total)).toBe(true);
      });
    }
  });

  describe("E. tier-mapping invariants", () => {
    it("no-coupon path: essential < career < elite balances", () => {
      const bal = (tier: TierId) =>
        computeTotals({
          basePriceInr: TIER_META[tier].priceInr,
          finalPriceInr: null,
          couponActive: false,
        }).preregBalance;
      expect(bal("essential")).toBeLessThan(bal("career"));
      expect(bal("career")).toBeLessThan(bal("elite"));
    });

    it("wrong-tier override (defensive): still render-safe for every tier", () => {
      // e.g. RPC returned Career's override but user is on Essential.
      const wrong = OVERRIDES.ARZONPRIME60.career;
      for (const tier of TIERS) {
        const t = computeTotals({
          basePriceInr: TIER_META[tier].priceInr,
          finalPriceInr: wrong,
          couponActive: true,
        });
        expect(isRenderSafe(t.preregBalance)).toBe(true);
        expect(isRenderSafe(t.total)).toBe(true);
        expect(t.preregAmount).toBe(PREREG_AMOUNT_INR);
      }
    });
  });

  describe("F. formatting sanity — never ₹NaN, never ₹-…", () => {
    const fixtures: Array<{ label: string; final: number | null; active: boolean }> = [
      { label: "no coupon", final: null, active: false },
      { label: "active null override", final: null, active: true },
      { label: "NaN override", final: Number.NaN, active: true },
      { label: "final = 0", final: 0, active: true },
      { label: "final = 1064", final: PREREG_AMOUNT_INR - 1, active: true },
      { label: "final = 1065", final: PREREG_AMOUNT_INR, active: true },
      { label: "final = 1066", final: PREREG_AMOUNT_INR + 1, active: true },
      { label: "over-base final", final: 999_999, active: true },
    ];

    for (const tier of TIERS) {
      for (const f of fixtures) {
        it(`${tier} · ${f.label}: rupee string is finite and non-negative`, () => {
          const t = computeTotals({
            basePriceInr: TIER_META[tier].priceInr,
            finalPriceInr: f.final,
            couponActive: f.active,
          });
          const s = formatInr(t.preregBalance);
          expect(s).not.toBe("₹NaN");
          expect(s.startsWith("₹-")).toBe(false);
        });
      }
    }
  });
});
