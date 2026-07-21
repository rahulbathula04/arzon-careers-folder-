// Static manifest of QA validations shipped with this build.
// Update this file when you add or remove a test/script.

export type QaCategory = "copy" | "spacing" | "hydration" | "payment";

export type QaCheck = {
  id: string;
  category: QaCategory;
  name: string;
  description: string;
  source: string; // repo-relative path
  kind: "unit" | "e2e" | "script";
};

export const QA_CATEGORY_LABEL: Record<QaCategory, string> = {
  copy: "Copy & content",
  spacing: "Spacing & layout",
  hydration: "Hydration & SSR",
  payment: "Payment flow",
};

export const QA_CHECKS: QaCheck[] = [
  // Copy / content
  {
    id: "coupon-math",
    category: "copy",
    name: "Pre-registration coupon math",
    description:
      "Unit tests that lock in the ₹1,065 pre-reg number and per-tier remaining balances used in on-page copy.",
    source: "src/lib/__tests__/preregCouponMath.test.ts",
    kind: "unit",
  },
  {
    id: "coupon-invariant",
    category: "copy",
    name: "Coupon split-pay invariant",
    description:
      "Guarantees Essential / Career / Elite always show ₹5k / ₹7k / ₹9k remaining after any promoted coupon.",
    source: "src/lib/__tests__/couponSplitPayInvariant.test.ts",
    kind: "unit",
  },
  {
    id: "coupon-e2e",
    category: "copy",
    name: "Coupon copy end-to-end",
    description:
      "Applies each promoted coupon in a real browser and verifies the tier remaining balance and ₹1,065 visibility on the Pay screen.",
    source: "scripts/e2e/couponSplitPay.e2e.py",
    kind: "e2e",
  },

  // Spacing / layout
  {
    id: "visual-regression",
    category: "spacing",
    name: "Stepper & CTA visual regression",
    description:
      "Desktop + 384px mobile screenshots that fail if stepper pips or CTA chips are clipped, bleached, or missing.",
    source: "scripts/e2e/visualRegression.e2e.py",
    kind: "e2e",
  },

  // Hydration / SSR
  {
    id: "hydration-regression",
    category: "hydration",
    name: "Funnel & shell hydration scan",
    description:
      "Walks all funnel + shell routes and fails on any real React hydration mismatch, ignoring dev-inspector attribute drift.",
    source: "scripts/e2e/hydrationRegression.e2e.py",
    kind: "e2e",
  },

  // Payment flow
  {
    id: "full-funnel",
    category: "payment",
    name: "Program → Profile → Pay → Success",
    description:
      "End-to-end walk that submits the profile, triggers seat-hold + Razorpay order creation, and verifies the WhatsApp counsellor CTA on Success.",
    source: "scripts/e2e/fullFunnel.e2e.py",
    kind: "e2e",
  },
  {
    id: "razorpay-verify-contract",
    category: "payment",
    name: "Razorpay verify endpoint contract",
    description:
      "Direct POSTs to /api/public/razorpay/verify to confirm it rejects invalid signatures and malformed payloads with structured JSON errors.",
    source: "scripts/e2e/fullFunnel.e2e.py",
    kind: "e2e",
  },
];

// Build metadata injected by Vite at build time via `define`.
// Falls back to runtime timestamps in dev.
declare const __QA_BUILD_SHA__: string | undefined;
declare const __QA_BUILD_TIME__: string | undefined;

export function getQaBuildInfo(): { sha: string; builtAt: string } {
  const sha =
    typeof __QA_BUILD_SHA__ !== "undefined" && __QA_BUILD_SHA__ ? __QA_BUILD_SHA__ : "dev";
  const builtAt =
    typeof __QA_BUILD_TIME__ !== "undefined" && __QA_BUILD_TIME__
      ? __QA_BUILD_TIME__
      : new Date().toISOString();
  return { sha, builtAt };
}

export function groupChecks(checks: QaCheck[] = QA_CHECKS) {
  const groups: Record<QaCategory, QaCheck[]> = {
    copy: [],
    spacing: [],
    hydration: [],
    payment: [],
  };
  for (const c of checks) groups[c.category].push(c);
  return groups;
}
