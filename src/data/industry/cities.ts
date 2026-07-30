/**
 * Programmatic city × role SEO targets. Each city carries a CoL (cost of
 * living) multiplier vs Hyderabad baseline, and a hiring-density note we
 * surface on the city page.
 */
export type CityProfile = {
  slug: string;
  name: string;
  /** Used to match against PayBand.city in roles.ts. */
  matchKeys: string[];
  hiringDensity: "Very High" | "High" | "Moderate";
  hubFor: string[];
  costOfLivingNote: string;
  liveNote: string;
};

export const CITIES: CityProfile[] = [
  {
    slug: "bengaluru",
    name: "Bengaluru",
    matchKeys: ["Bengaluru", "Bangalore"],
    hiringDensity: "Very High",
    hubFor: ["Pharmacovigilance", "Clinical Data Management", "AI in Healthcare"],
    costOfLivingNote:
      "Highest CoL among PV hubs. Single-room PG in Marathahalli/Bellandur ₹12–18k. Compensates with the densest hiring market.",
    liveNote: "MNC CRO HQ city. Best for IQVIA, Parexel, ICON, Labcorp inside the same metro.",
  },
  {
    slug: "hyderabad",
    name: "Hyderabad",
    matchKeys: ["Hyderabad"],
    hiringDensity: "Very High",
    hubFor: ["Pharmacovigilance", "Regulatory Affairs", "Medical Coding"],
    costOfLivingNote:
      "Lowest CoL among Tier-1 PV hubs. PG in Gachibowli/Madhapur ₹8–12k. Highest savings rate for freshers.",
    liveNote:
      "India's PV capital. Genome Valley + ICON Hyderabad campus drive most fresher hiring.",
  },
  {
    slug: "mumbai",
    name: "Mumbai",
    matchKeys: ["Mumbai"],
    hiringDensity: "High",
    hubFor: ["Regulatory Affairs", "Pharmacovigilance"],
    costOfLivingNote:
      "Highest CoL nationally. Powai/Andheri PG ₹15–25k. Domestic pharma HQ city - pay premiums offset rent.",
    liveNote: "Sun, Cipla, Lupin, Glenmark HQ city. Best for Indian-pharma RA roles.",
  },
  {
    slug: "pune",
    name: "Pune",
    matchKeys: ["Pune"],
    hiringDensity: "High",
    hubFor: ["Clinical Data Management", "Pharmacovigilance"],
    costOfLivingNote:
      "Mid CoL. PG in Hinjewadi/Kharadi ₹10–14k. Tier-1 lifestyle without Mumbai rent.",
    liveNote: "Cytel, Syneos, Veeva Pune campuses anchor CDM + biostats hiring.",
  },
  {
    slug: "chennai",
    name: "Chennai",
    matchKeys: ["Chennai"],
    hiringDensity: "Very High",
    hubFor: ["Medical Coding", "Pharmacovigilance"],
    costOfLivingNote: "Low–mid CoL. PG in OMR/Velachery ₹8–12k. Best CoL-to-pay ratio in coding.",
    liveNote:
      "India's medical-coding capital. Omega, Access, AGS Health hire 2,000+ freshers/yr each.",
  },
  {
    slug: "delhi-ncr",
    name: "Delhi NCR",
    matchKeys: ["NCR", "Delhi", "Gurgaon", "Noida"],
    hiringDensity: "High",
    hubFor: ["Regulatory Affairs", "Medical Coding"],
    costOfLivingNote:
      "Mid–high CoL. PG in Gurgaon/Noida ₹10–16k. Better for experienced shifts than freshers.",
    liveNote: "Optum Gurgaon + Cognizant Noida anchor coding + RCM. Pharma is split with Mumbai.",
  },
];

export const CITIES_BY_SLUG: Record<string, CityProfile> = Object.fromEntries(
  CITIES.map((c) => [c.slug, c]),
);

export function findPayBand<T extends { city: string }>(
  bands: T[],
  city: CityProfile,
): T | undefined {
  for (const k of city.matchKeys) {
    const hit = bands.find((b) => b.city.toLowerCase() === k.toLowerCase());
    if (hit) return hit;
  }
  return undefined;
}
