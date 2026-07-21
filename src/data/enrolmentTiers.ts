export const TIER_META = {
  essential: { name: "Essential", priceInr: 14999, sub: "Self-paced + cohort access" },
  career: { name: "Career", priceInr: 24999, sub: "Live cohort · most picked" },
  elite: { name: "Elite", priceInr: 39999, sub: "1:1 mentor + guaranteed interviews" },
} as const;

export type TierId = keyof typeof TIER_META;

export const isTier = (s: string): s is TierId => s in TIER_META;

export const formatInr = (n: number) => "₹" + n.toLocaleString("en-IN");
