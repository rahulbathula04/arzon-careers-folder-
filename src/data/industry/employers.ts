import type { Employer } from "./types";

/**
 * Curated employer index. Tagged by role slug so role pages can filter and
 * the /industry/employers page can render the full grid. Numbers and bands
 * are JD-derived (Naukri + LinkedIn) and refreshed quarterly.
 */
export const EMPLOYERS: Employer[] = [
  // ── MNC CROs (PV + CDM + SAS heavy) ────────────────────────────────────
  {
    name: "IQVIA",
    tier: "MNC CRO",
    cities: ["Bengaluru", "Kochi", "Thane"],
    hiringFor: ["pharmacovigilance", "clinical-data-management", "sas-programming"],
    typicalBand: "₹4.2 – 7 LPA at L1",
  },
  {
    name: "Parexel",
    tier: "MNC CRO",
    cities: ["Hyderabad", "Bengaluru", "Mohali"],
    hiringFor: ["pharmacovigilance", "clinical-data-management"],
    typicalBand: "₹4 – 6.5 LPA at L1",
  },
  {
    name: "Syneos Health",
    tier: "MNC CRO",
    cities: ["Hyderabad", "Gurugram"],
    hiringFor: ["pharmacovigilance", "clinical-data-management"],
    typicalBand: "₹3.8 – 6 LPA at L1",
  },
  {
    name: "ICON plc",
    tier: "MNC CRO",
    cities: ["Chennai", "Bengaluru"],
    hiringFor: ["pharmacovigilance", "clinical-data-management", "sas-programming"],
    typicalBand: "₹4.5 – 7.5 LPA at L1",
  },
  {
    name: "Labcorp Drug Development",
    tier: "MNC CRO",
    cities: ["Bengaluru", "Mumbai"],
    hiringFor: ["pharmacovigilance", "clinical-data-management"],
    typicalBand: "₹4 – 7 LPA at L1",
  },
  {
    name: "Fortrea",
    tier: "MNC CRO",
    cities: ["Bengaluru"],
    hiringFor: ["clinical-data-management", "sas-programming"],
    typicalBand: "₹4.5 – 8 LPA at L1",
  },
  {
    name: "PPD (Thermo Fisher)",
    tier: "MNC CRO",
    cities: ["Bengaluru", "Mumbai"],
    hiringFor: ["pharmacovigilance", "clinical-data-management"],
    typicalBand: "₹4 – 7 LPA at L1",
  },
  {
    name: "Eversana",
    tier: "MNC CRO",
    cities: ["Pune", "Bengaluru"],
    hiringFor: ["pharmacovigilance"],
    typicalBand: "₹3.5 – 6 LPA at L1",
  },
  {
    name: "Indegene",
    tier: "MNC CRO",
    cities: ["Bengaluru", "Hyderabad"],
    hiringFor: ["pharmacovigilance", "clinical-data-management"],
    typicalBand: "₹4 – 6.8 LPA at L1",
  },

  // ── Indian CROs / pharma-services ──────────────────────────────────────
  {
    name: "TCS Life Sciences",
    tier: "Indian CRO",
    cities: ["Hyderabad", "Mumbai", "Pune"],
    hiringFor: ["pharmacovigilance", "clinical-data-management"],
    typicalBand: "₹3.6 – 5.8 LPA at L1",
  },
  {
    name: "Cognizant Life Sciences",
    tier: "Indian CRO",
    cities: ["Hyderabad", "Chennai", "Bengaluru"],
    hiringFor: ["pharmacovigilance", "medical-coding", "clinical-data-management"],
    typicalBand: "₹3.5 – 5.5 LPA at L1",
  },
  {
    name: "Accenture Health & Life Sciences",
    tier: "Indian CRO",
    cities: ["Bengaluru", "Hyderabad", "Mumbai"],
    hiringFor: ["pharmacovigilance", "medical-coding"],
    typicalBand: "₹3.8 – 6.2 LPA at L1",
  },
  {
    name: "Tech Mahindra Healthcare",
    tier: "Indian CRO",
    cities: ["Hyderabad", "Pune"],
    hiringFor: ["medical-coding", "pharmacovigilance"],
    typicalBand: "₹3.2 – 5.2 LPA at L1",
  },

  // ── Pharma majors ──────────────────────────────────────────────────────
  {
    name: "Dr. Reddy's",
    tier: "Pharma",
    cities: ["Hyderabad"],
    hiringFor: ["pharmacovigilance"],
    typicalBand: "₹4.2 – 7 LPA at L1",
  },
  {
    name: "Sun Pharma",
    tier: "Pharma",
    cities: ["Mumbai", "Vadodara"],
    hiringFor: ["pharmacovigilance"],
    typicalBand: "₹4 – 6.8 LPA at L1",
  },
  {
    name: "Cipla",
    tier: "Pharma",
    cities: ["Mumbai", "Goa"],
    hiringFor: ["pharmacovigilance"],
    typicalBand: "₹4 – 6.5 LPA at L1",
  },
  {
    name: "Novartis",
    tier: "Pharma",
    cities: ["Hyderabad"],
    hiringFor: ["pharmacovigilance", "clinical-data-management"],
    typicalBand: "₹5 – 8.5 LPA at L1",
  },
  {
    name: "Sanofi",
    tier: "Pharma",
    cities: ["Hyderabad"],
    hiringFor: ["pharmacovigilance"],
    typicalBand: "₹5 – 8 LPA at L1",
  },
  {
    name: "Aurobindo Pharma",
    tier: "Pharma",
    cities: ["Hyderabad"],
    hiringFor: ["pharmacovigilance"],
    typicalBand: "₹3.5 – 6 LPA at L1",
  },

  // ── BPO / RCM / Coding-heavy ───────────────────────────────────────────
  {
    name: "Optum (UnitedHealth)",
    tier: "BPO/RCM",
    cities: ["Hyderabad", "Chennai", "Noida", "Bengaluru"],
    hiringFor: ["medical-coding"],
    typicalBand: "₹3.5 – 6 LPA at L1",
  },
  {
    name: "R1 RCM",
    tier: "BPO/RCM",
    cities: ["Noida", "Chennai", "Hyderabad"],
    hiringFor: ["medical-coding"],
    typicalBand: "₹3 – 5 LPA at L1",
  },
  {
    name: "Omega Healthcare",
    tier: "BPO/RCM",
    cities: ["Bengaluru", "Chennai", "Trichy"],
    hiringFor: ["medical-coding"],
    typicalBand: "₹2.8 – 5 LPA at L1, +₹8k incentives",
  },
  {
    name: "Access Healthcare",
    tier: "BPO/RCM",
    cities: ["Chennai", "Coimbatore", "Mumbai"],
    hiringFor: ["medical-coding"],
    typicalBand: "₹2.6 – 4.8 LPA at L1",
  },
  {
    name: "AGS Health",
    tier: "BPO/RCM",
    cities: ["Chennai", "Bengaluru"],
    hiringFor: ["medical-coding"],
    typicalBand: "₹3 – 5.2 LPA at L1",
  },
  {
    name: "Sutherland Healthcare",
    tier: "BPO/RCM",
    cities: ["Chennai", "Hyderabad"],
    hiringFor: ["medical-coding"],
    typicalBand: "₹2.8 – 4.5 LPA at L1",
  },
  {
    name: "Wipro HPS",
    tier: "BPO/RCM",
    cities: ["Bengaluru", "Hyderabad"],
    hiringFor: ["medical-coding"],
    typicalBand: "₹3 – 5 LPA at L1",
  },
  {
    name: "Infosys BPM",
    tier: "BPO/RCM",
    cities: ["Bengaluru", "Pune"],
    hiringFor: ["medical-coding"],
    typicalBand: "₹3 – 5.2 LPA at L1",
  },
  {
    name: "GeBBS Healthcare",
    tier: "BPO/RCM",
    cities: ["Mumbai", "Navi Mumbai"],
    hiringFor: ["medical-coding"],
    typicalBand: "₹2.8 – 4.8 LPA at L1",
  },

  // ── Health Tech ────────────────────────────────────────────────────────
  {
    name: "Veeva Systems",
    tier: "Health Tech",
    cities: ["Hyderabad", "Bengaluru"],
    hiringFor: ["clinical-data-management"],
    typicalBand: "₹6 – 10 LPA at L1",
  },
  {
    name: "Medidata (Dassault)",
    tier: "Health Tech",
    cities: ["Hyderabad", "Pune"],
    hiringFor: ["clinical-data-management"],
    typicalBand: "₹5.5 – 9 LPA at L1",
  },
  {
    name: "Oracle Health Sciences",
    tier: "Health Tech",
    cities: ["Bengaluru", "Hyderabad"],
    hiringFor: ["clinical-data-management", "sas-programming"],
    typicalBand: "₹6 – 10 LPA at L1",
  },

  // ── Regulatory Affairs specialists ─────────────────────────────────────
  {
    name: "Freyr Solutions",
    tier: "MNC CRO",
    cities: ["Hyderabad", "Bengaluru"],
    hiringFor: ["regulatory-affairs"],
    typicalBand: "₹4 – 7 LPA at L1",
    note: "Largest pure-play RA services firm; 2,500+ RA hires/yr.",
  },
  {
    name: "ProPharma Group",
    tier: "MNC CRO",
    cities: ["Bengaluru", "Hyderabad"],
    hiringFor: ["regulatory-affairs", "pharmacovigilance"],
    typicalBand: "₹4.5 – 7.5 LPA at L1",
  },
  {
    name: "Navitas Life Sciences",
    tier: "MNC CRO",
    cities: ["Chennai", "Bengaluru"],
    hiringFor: ["regulatory-affairs", "pharmacovigilance"],
    typicalBand: "₹3.8 – 6.2 LPA at L1",
  },
  {
    name: "Lupin",
    tier: "Pharma",
    cities: ["Mumbai", "Pune"],
    hiringFor: ["regulatory-affairs", "pharmacovigilance"],
    typicalBand: "₹4.2 – 7 LPA at L1",
  },
  {
    name: "Biocon",
    tier: "Pharma",
    cities: ["Bengaluru"],
    hiringFor: ["regulatory-affairs", "pharmacovigilance"],
    typicalBand: "₹4.5 – 7.5 LPA at L1",
  },
  {
    name: "Glenmark",
    tier: "Pharma",
    cities: ["Mumbai"],
    hiringFor: ["regulatory-affairs", "pharmacovigilance"],
    typicalBand: "₹4 – 6.8 LPA at L1",
  },
  {
    name: "Zydus Lifesciences",
    tier: "Pharma",
    cities: ["Ahmedabad"],
    hiringFor: ["regulatory-affairs", "pharmacovigilance"],
    typicalBand: "₹3.8 – 6.5 LPA at L1",
  },

  // ── AI in Healthcare ───────────────────────────────────────────────────
  {
    name: "Innovaccer",
    tier: "Health Tech",
    cities: ["Noida", "Bengaluru"],
    hiringFor: ["ai-in-healthcare"],
    typicalBand: "₹8 – 14 LPA at L1",
  },
  {
    name: "Suki AI",
    tier: "Health Tech",
    cities: ["Bengaluru", "Remote"],
    hiringFor: ["ai-in-healthcare"],
    typicalBand: "₹10 – 18 LPA at L1",
  },
  {
    name: "Abridge",
    tier: "Health Tech",
    cities: ["Remote"],
    hiringFor: ["ai-in-healthcare"],
    typicalBand: "₹12 – 22 LPA at L1",
    note: "US-headquartered; hires Indian remote talent for clinical NLP review.",
  },
  {
    name: "Nuance / Microsoft DAX",
    tier: "Health Tech",
    cities: ["Bengaluru", "Hyderabad"],
    hiringFor: ["ai-in-healthcare"],
    typicalBand: "₹10 – 18 LPA at L1",
  },
  {
    name: "Google Health (Alphabet)",
    tier: "Health Tech",
    cities: ["Bengaluru", "Hyderabad"],
    hiringFor: ["ai-in-healthcare"],
    typicalBand: "₹15 – 28 LPA at L1",
  },
  {
    name: "Apollo 24/7",
    tier: "Health Tech",
    cities: ["Chennai", "Hyderabad"],
    hiringFor: ["ai-in-healthcare"],
    typicalBand: "₹6 – 11 LPA at L1",
  },
  {
    name: "Practo",
    tier: "Health Tech",
    cities: ["Bengaluru"],
    hiringFor: ["ai-in-healthcare"],
    typicalBand: "₹6 – 10 LPA at L1",
  },
  {
    name: "ZS Associates",
    tier: "Health Tech",
    cities: ["Pune", "Bengaluru", "Gurugram"],
    hiringFor: ["ai-in-healthcare", "sas-programming"],
    typicalBand: "₹9 – 15 LPA at L1",
  },
  {
    name: "HealthEM.AI",
    tier: "Health Tech",
    cities: ["Hyderabad", "Remote"],
    hiringFor: ["ai-in-healthcare"],
    typicalBand: "₹7 – 12 LPA at L1",
  },
];

export function employersForRole(slug: string): Employer[] {
  return EMPLOYERS.filter((e) => e.hiringFor.includes(slug));
}
