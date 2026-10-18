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
    liveNote: "Cytel, Syneos, Enterprise Life Sciences Cloud Pune campuses anchor CDM + biostats hiring.",
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
    matchKeys: ["NCR", "Delhi", "Gurgaon", "Noida", "Delhi NCR"],
    hiringDensity: "High",
    hubFor: ["Regulatory Affairs", "Medical Coding"],
    costOfLivingNote:
      "Mid–high CoL. PG in Gurgaon/Noida ₹10–16k. Better for experienced shifts than freshers.",
    liveNote: "Optum Gurgaon + Cognizant Noida anchor coding + RCM. Pharma is split with Mumbai.",
  },
  {
    slug: "ahmedabad",
    name: "Ahmedabad",
    matchKeys: ["Ahmedabad", "Ahmadabad"],
    hiringDensity: "High",
    hubFor: ["Regulatory Affairs", "Clinical Research", "Quality Assurance"],
    costOfLivingNote:
      "Moderate CoL. PG in SG Highway / Prahlad Nagar ₹7–11k. High pharmaceutical industry presence with domestic formulation leaders.",
    liveNote:
      "Gujarat pharma capital. Zydus Lifesciences, Torrent Pharma, Intas, and Cadila global headquarters anchor clinical trial and regulatory affairs operations.",
  },
  {
    slug: "kochi",
    name: "Kochi",
    matchKeys: ["Kochi", "Cochin", "Ernakulam"],
    hiringDensity: "High",
    hubFor: ["Pharmacovigilance", "Medical Coding", "Clinical Data Management"],
    costOfLivingNote:
      "Moderate-low CoL. PG in Infopark Kakkanad / Edappally ₹6–10k. Excellent coastal quality of life with rapidly growing healthtech and CRO campuses.",
    liveNote:
      "Kerala's premier bio-services corridor. Anchored by IQVIA Infopark Kochi, Aster DM Healthcare, and Muthoot Healthcare research divisions.",
  },
  {
    slug: "coimbatore",
    name: "Coimbatore",
    matchKeys: ["Coimbatore", "Kovai"],
    hiringDensity: "High",
    hubFor: ["Medical Coding", "Revenue Cycle Management", "Health Informatics"],
    costOfLivingNote:
      "Low CoL. PG in Saravanampatti / Peelamedu ₹5–8k. Highest savings-to-salary ratio for entry-level medical coders in South India.",
    liveNote:
      "Major medical coding & RCM power hub. Large offshore delivery centres for Omega Healthcare, Access Healthcare, and Vee Technologies.",
  },
  {
    slug: "kolkata",
    name: "Kolkata",
    matchKeys: ["Kolkata", "Calcutta"],
    hiringDensity: "Moderate",
    hubFor: ["Clinical Data Management", "Pharmacovigilance", "Medical Writing"],
    costOfLivingNote:
      "Lowest CoL among major metros. PG in Salt Lake Sector V / New Town ₹5–9k. High affordability allows freshers to maximize net savings.",
    liveNote:
      "Eastern India bio-hub. Salt Lake Sector V anchors Cognizant Life Sciences, Wipro Health, and local site-management organizations (SMOs).",
  },
  {
    slug: "vijayawada",
    name: "Vijayawada",
    matchKeys: ["Vijayawada", "Guntur", "Amaravati"],
    hiringDensity: "Moderate",
    hubFor: ["Medical Coding", "Pharmacovigilance", "Clinical Research"],
    costOfLivingNote:
      "Low CoL. PG in Benz Circle / Auto Nagar ₹5–8k. Feeder hub for Telangana/AP life-sciences talent, with expanding remote-first CRO workforces.",
    liveNote:
      "Andhra Pradesh talent springboard. Strong academic pipeline from Siddhartha and Guntur medical/pharmacy colleges feeding Hyderabad and domestic CRO hubs.",
  },
  {
    slug: "visakhapatnam",
    name: "Visakhapatnam",
    matchKeys: ["Visakhapatnam", "Vizag"],
    hiringDensity: "Moderate",
    hubFor: ["Regulatory Affairs", "Pharmacovigilance", "Clinical Quality"],
    costOfLivingNote:
      "Low-moderate CoL. PG in Madhurawada / Gajuwaka ₹6–9k. Coastal lifestyle with substantial pharmaceutical manufacturing and export clusters.",
    liveNote:
      "Jawaharlal Nehru Pharma City (JNPC) corridor. Anchors API and formulation giants including Pfizer, Eisai, Mylan (Viatris), and Hetero Labs.",
  },
  {
    slug: "lucknow",
    name: "Lucknow",
    matchKeys: ["Lucknow"],
    hiringDensity: "Moderate",
    hubFor: ["Clinical Research", "Pharmacovigilance", "Medical Writing"],
    costOfLivingNote:
      "Low CoL. PG in Gomti Nagar / Aliganj ₹5–8k. Low barrier to entry with leading scientific research institutes and trial hospitals.",
    liveNote:
      "Northern India biomedical research seat. Home to CDRI (Central Drug Research Institute), IITR, KGMU, and SGPGI clinical trial registries.",
  },
  {
    slug: "jaipur",
    name: "Jaipur",
    matchKeys: ["Jaipur"],
    hiringDensity: "Moderate",
    hubFor: ["Medical Coding", "Regulatory Affairs", "Pharmacovigilance"],
    costOfLivingNote:
      "Low-moderate CoL. PG in Malviya Nagar / Sitapura ₹6–9k. Affordable student accommodation and active IT/pharma SEZ clusters.",
    liveNote:
      "Rajasthan bio-services & formulation corridor. Sitapura Industrial Area houses Sun Pharma, Genpact Healthcare, and domestic formulation facilities.",
  },
  {
    slug: "nagpur",
    name: "Nagpur",
    matchKeys: ["Nagpur"],
    hiringDensity: "Moderate",
    hubFor: ["Medical Coding", "Clinical Data Management", "Regulatory Affairs"],
    costOfLivingNote:
      "Low CoL. PG in MIHAN / Dharampeth ₹5–8k. Central India logistics and emerging IT-health SEZ with high disposable income ratios.",
    liveNote:
      "Central India gateway. MIHAN SEZ hosts TCS Health and Infosys Life Sciences delivery teams supporting Western and global pharma accounts.",
  },
  {
    slug: "chandigarh",
    name: "Chandigarh",
    matchKeys: ["Chandigarh", "Mohali", "Panchkula"],
    hiringDensity: "High",
    hubFor: ["Clinical Research", "Clinical Data Management", "Pharmacovigilance"],
    costOfLivingNote:
      "Moderate CoL. PG in Phase 7 Mohali / Sector 34 ₹7–11k. Cleanest urban infrastructure in North India with strong CRO presence.",
    liveNote:
      "Tricity clinical trial capital. Parexel Mohali campus, Fortis Clinical Research, and PGIMER clinical trial ecosystem drive regional hiring.",
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
