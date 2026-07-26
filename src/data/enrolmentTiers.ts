export type TierId = "essential" | "career" | "elite";

export interface TierMeta {
  id: TierId;
  name: string;
  mrpInr: number;
  priceInr: number; // legacy alias for mrpInr
  offerPriceInr: number;
  savingsInr: number;
  tagline: string;
  sub: string;
  perks: string[];
  preregAmountInr: number;
}

export const TIER_META: Record<TierId, TierMeta> = {
  essential: {
    id: "essential",
    name: "Essential",
    mrpInr: 14999,
    priceInr: 14999,
    offerPriceInr: 4999,
    savingsInr: 10000,
    tagline: "Build the foundation",
    sub: "For self-starters who'll watch on their own pace",
    perks: [
      "8-week recorded video curriculum",
      "Course completion certificate",
      "Community cohort group access",
    ],
    preregAmountInr: 1000,
  },
  career: {
    id: "career",
    name: "Career",
    mrpInr: 24999,
    priceInr: 24999,
    offerPriceInr: 7999,
    savingsInr: 17000,
    tagline: "Transition seekers · Live mentorship",
    sub: "Live cohort · most picked",
    perks: [
      "Everything in Essential",
      "Live mentor sessions (8 weeks)",
      "Real-data labs + capstone projects",
      "Job placement support + mock interviews",
    ],
    preregAmountInr: 1000,
  },
  elite: {
    id: "elite",
    name: "Elite",
    mrpInr: 39999,
    priceInr: 39999,
    offerPriceInr: 9999,
    savingsInr: 30000,
    tagline: "Land interviews, guaranteed",
    sub: "Concierge · 1:1 mentor",
    perks: [
      "Everything in Career",
      "1:1 dedicated mentor pairing (weekly)",
      "3 guaranteed hiring partner interviews",
      "Resume & LinkedIn rewrite by experts",
    ],
    preregAmountInr: 1000,
  },
};

export const isTier = (s: string): s is TierId => s in TIER_META;
export const formatInr = (n: number) => "₹" + n.toLocaleString("en-IN");

// Calculation helper for tier prices and split pay
export function getTierPricing(tier: TierId, couponCode?: string | null) {
  const meta = TIER_META[tier];
  const codeUpper = couponCode?.toUpperCase() ?? "";
  const isSpecialCoupon = [
    "ARZONPRIME60",
    "PRIME60",
    "UNLOCK60",
    "EARLYBIRD",
    "SCHOLARSHIP",
  ].includes(codeUpper);

  let finalPriceInr = meta.mrpInr;
  if (isSpecialCoupon) {
    finalPriceInr = meta.offerPriceInr;
  } else if (codeUpper === "ARZON10" || codeUpper === "WELCOME10") {
    finalPriceInr = Math.round(meta.mrpInr * 0.9);
  } else if (codeUpper === "ARZON15") {
    finalPriceInr = Math.round(meta.mrpInr * 0.85);
  } else if (codeUpper === "ARZON20") {
    finalPriceInr = Math.round(meta.mrpInr * 0.8);
  }

  const savingsInr = meta.mrpInr - finalPriceInr;
  const discountPct = Math.round((savingsInr / meta.mrpInr) * 100);
  const preregAmountInr = meta.preregAmountInr;
  const balanceDueInr = finalPriceInr - preregAmountInr;

  return {
    mrpInr: meta.mrpInr,
    offerPriceInr: meta.offerPriceInr,
    finalPriceInr,
    savingsInr,
    discountPct,
    preregAmountInr,
    balanceDueInr,
    isOfferApplied: savingsInr > 0,
  };
}
