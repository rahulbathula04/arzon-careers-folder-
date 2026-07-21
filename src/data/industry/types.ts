export type AIRisk = "augmented" | "audit" | "resistant";
export type Demand = "Very High" | "High" | "Steady";
export type EmployerTier =
  | "MNC CRO"
  | "Indian CRO"
  | "Pharma"
  | "BPO/RCM"
  | "Health Tech"
  | "Hospital";

export interface PayBand {
  city: string; // Hyderabad, Bengaluru, Chennai, Pune, Mumbai, NCR, Kochi, Vizag, Remote
  fresher: [number, number]; // LPA range [low, high]
  midY3: [number, number]; // 2-3 yrs
  seniorY5: [number, number]; // 4-6 yrs
  leadY8: [number, number]; // 7+ yrs
  note?: string;
}

export interface Employer {
  name: string;
  tier: EmployerTier;
  cities: string[];
  hiringFor: string[]; // role slugs they hire for
  typicalBand?: string; // e.g. "₹3.8 – 6.2 LPA at L1"
  note?: string;
}

export interface LadderStep {
  yrs: string; // "Y0", "Y2", "Y5", "Y8+"
  role: string; // job title
  payInr: string; // "₹3.5 – 5 LPA"
  unlocks: string; // what gets you here
}

export interface AbroadMarket {
  country: string; // "UAE", "Saudi Arabia", "Singapore", "UK", "Ireland", "Philippines", "USA"
  flag: string; // emoji
  payInrEquiv: string; // "₹14 – 22 LPA equivalent"
  eligibility: string; // "DHA / HAAD / MOH licence + 1 yr exp"
  note: string; // 1-line context
}

export interface RoleProfile {
  slug: string; // "pharmacovigilance"
  name: string; // "Pharmacovigilance"
  shortName: string; // "PV"
  tagline: string; // 1 sentence
  whatIsIt: string; // 2-3 sentences, day-in-the-life
  whyHiring: string; // demand driver
  who: string; // who fits (eligibility)
  demand: Demand;
  aiRisk: AIRisk;
  aiNote: string; // what AI replaces vs what stays
  englishNeeded: "Conversational" | "Strong written" | "Strong verbal + written";
  workMode: "Mostly office" | "Hybrid" | "WFH common" | "Office-only";
  industrySize: string; // "India PV market: $XB by 2028"
  hiringRoles: string[]; // job titles
  skills: string[]; // tools / skills
  certs: { name: string; pays: string }[]; // CPC → +20% etc
  pay: PayBand[];
  ladder: LadderStep[];
  abroad: AbroadMarket[];
  topEmployers: string[]; // employer names (resolve in employers.ts)
  faqs: { q: string; a: string }[];
  arzonCourseSlug: string; // link to /courses/{slug}
  sources: string[]; // source IDs from sources.ts
  asOf: string; // "Nov 2025"
}
