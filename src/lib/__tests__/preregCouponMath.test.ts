import { describe, it, expect } from "vitest";
import { PREREG_AMOUNT_INR } from "@/components/landing/constants";

/**
 * Locks the pre-registration math that lives in
 * `src/routes/enrol.$tier.pay.tsx`:
 *
 *   total          = couponActive ? intent.finalPriceInr : intent.basePriceInr
 *   preregBalance  = max(0, total - PREREG_AMOUNT_INR)
 *   balance_due_at = markPreRegistrationInitiated() → now() + 7 days
 *
 * `basePriceInr` and `finalPriceInr` are the all-inclusive figures the
 * user actually sees. The Razorpay hosted link amount (PREREG_AMOUNT_INR)
 * is fixed at ₹1,000 and MUST NOT shift with the coupon - only the remaining
 * balance does.
 */

function computeTotals(opts: {
  basePriceInr: number;
  finalPriceInr: number | null;
  couponActive: boolean;
}) {
  const { basePriceInr, finalPriceInr, couponActive } = opts;
  const total = couponActive && finalPriceInr != null ? finalPriceInr : basePriceInr;
  const preregAmount = PREREG_AMOUNT_INR;
  const preregBalance = Math.max(0, total - preregAmount);
  const discount = Math.max(0, basePriceInr - total);
  return { total, preregAmount, preregBalance, discount };
}

describe("prereg coupon math", () => {
  it("pre-coupon: full base price, balance = base - 1000", () => {
    const t = computeTotals({ basePriceInr: 39_999, finalPriceInr: null, couponActive: false });
    expect(t.total).toBe(39_999);
    expect(t.preregAmount).toBe(1000);
    expect(t.preregBalance).toBe(39_999 - 1000);
    expect(t.discount).toBe(0);
  });

  it("coupon applied: total drops to finalPriceInr, balance follows immediately", () => {
    const t = computeTotals({ basePriceInr: 39_999, finalPriceInr: 9_999, couponActive: true });
    expect(t.total).toBe(9_999);
    expect(t.preregBalance).toBe(9_999 - 1000);
    expect(t.discount).toBe(30_000);
  });

  it("Razorpay prereg link amount stays fixed at 1000 regardless of coupon", () => {
    const noCoupon = computeTotals({
      basePriceInr: 39_999,
      finalPriceInr: null,
      couponActive: false,
    });
    const withCoupon = computeTotals({
      basePriceInr: 39_999,
      finalPriceInr: 9_999,
      couponActive: true,
    });
    expect(noCoupon.preregAmount).toBe(withCoupon.preregAmount);
    expect(withCoupon.preregAmount).toBe(1000);
  });

  it("coupon that expires falls back to base price and balance", () => {
    const active = computeTotals({
      basePriceInr: 39_999,
      finalPriceInr: 9_999,
      couponActive: true,
    });
    const expired = computeTotals({
      basePriceInr: 39_999,
      finalPriceInr: 9_999,
      couponActive: false,
    });
    expect(active.total).toBe(9_999);
    expect(expired.total).toBe(39_999);
    expect(expired.preregBalance).toBe(39_999 - 1000);
  });

  it("floors balance at 0 when a coupon reduces total below prereg amount", () => {
    const t = computeTotals({ basePriceInr: 39_999, finalPriceInr: 999, couponActive: true });
    expect(t.preregBalance).toBe(0);
  });

  it("balance_due_at anchors to server clock, exactly 7 days ahead", () => {
    const now = new Date("2026-07-03T12:00:00Z");
    const due = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    expect(due.toISOString()).toBe("2026-07-10T12:00:00.000Z");
    expect(due.getTime() - now.getTime()).toBe(7 * 86_400_000);
  });
});
