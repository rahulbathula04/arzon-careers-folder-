const TIER_META = {
  essential: {
    id: "essential",
    name: "Essential",
    mrpInr: 14999,
    priceInr: 14999,
    offerPriceInr: 4999,
    savingsInr: 1e4,
    tagline: "Build the foundation",
    sub: "For self-starters who'll watch on their own pace",
    perks: [
      "8-week recorded video curriculum",
      "Course completion certificate",
      "Community cohort group access"
    ],
    preregAmountInr: 1e3
  },
  career: {
    id: "career",
    name: "Career",
    mrpInr: 24999,
    priceInr: 24999,
    offerPriceInr: 7999,
    savingsInr: 17e3,
    tagline: "Transition seekers · Live mentorship",
    sub: "Live cohort · most picked",
    perks: [
      "Everything in Essential",
      "Live mentor sessions (8 weeks)",
      "Real-data labs + capstone projects",
      "Job placement support + mock interviews"
    ],
    preregAmountInr: 1e3
  },
  elite: {
    id: "elite",
    name: "Elite",
    mrpInr: 39999,
    priceInr: 39999,
    offerPriceInr: 9999,
    savingsInr: 3e4,
    tagline: "Land interviews, guaranteed",
    sub: "Concierge · 1:1 mentor",
    perks: [
      "Everything in Career",
      "1:1 dedicated mentor pairing (weekly)",
      "3 guaranteed hiring partner interviews",
      "Resume & LinkedIn rewrite by experts"
    ],
    preregAmountInr: 1e3
  }
};
const isTier = (s) => s in TIER_META;
const formatInr = (n) => "₹" + n.toLocaleString("en-IN");
function getTierPricing(tier, couponCode) {
  const meta = TIER_META[tier];
  const codeUpper = couponCode?.toUpperCase() ?? "";
  const isSpecialCoupon = [
    "ARZONPRIME60",
    "PRIME60",
    "UNLOCK60",
    "EARLYBIRD",
    "SCHOLARSHIP"
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
  const discountPct = Math.round(savingsInr / meta.mrpInr * 100);
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
    isOfferApplied: savingsInr > 0
  };
}
export {
  TIER_META as T,
  formatInr as f,
  getTierPricing as g,
  isTier as i
};
