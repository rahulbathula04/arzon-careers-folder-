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
    offerPriceInr: 14999,
    savingsInr: 0,
    tagline: "Self-Paced Career Track",
    sub: "Learn at your own pace with structured modules, practice and lifetime reference access.",
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
    offerPriceInr: 24999,
    savingsInr: 0,
    tagline: "Recruiter Track",
    sub: "Live mentor support, practical projects and structured recruiter preparation.",
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
    offerPriceInr: 39999,
    savingsInr: 0,
    tagline: "Elite One-on-One",
    sub: "One-on-one guidance with senior industry mentors and focused career support.",
    perks: [
      "Everything in Career",
      "1:1 dedicated mentor pairing with senior industry mentors",
      "Priority interview preparation and recruiter support",
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
