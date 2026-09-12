/**
 * Arzon Global & Arzon Careers · Knowledge Graph Entity Architecture.
 *
 * Defines the unified semantic knowledge graph connecting Degrees, Roles, Skills,
 * Careers, Training, Internships, Locations, Research Reports, and Comparisons.
 */

export interface EntityNode {
  id: string;
  type: "degree" | "role" | "skill" | "career" | "training" | "internship" | "location" | "research" | "comparison";
  label: string;
  path: string;
  connectedEntityIds: string[];
}

export const KNOWLEDGE_GRAPH: EntityNode[] = [
  // Degrees
  {
    id: "degree-bpharm",
    type: "degree",
    label: "Bachelor of Pharmacy (B.Pharm)",
    path: "/careers/after-bpharm",
    connectedEntityIds: ["role-pv-assoc", "role-[#medical-coder]", "role-cdm-assoc", "role-ra-assoc"],
  },
  {
    id: "degree-pharmd",
    type: "degree",
    label: "Doctor of Pharmacy (Pharm.D)",
    path: "/careers/after-pharmd",
    connectedEntityIds: ["role-pv-assoc", "role-medical-writer", "role-ra-assoc"],
  },
  {
    id: "degree-[#lifesci]",
    type: "degree",
    label: "Life Sciences & Biotechnology",
    path: "/careers/life-sciences",
    connectedEntityIds: ["role-cdm-assoc", "role-sas-programmer", "role-hda-analyst"],
  },

  // Roles
  {
    id: "role-pv-assoc",
    type: "role",
    label: "Drug Safety & Pharmacovigilance Associate",
    path: "/roles/drug-safety-associate",
    connectedEntityIds: ["skill-argus", "skill-meddra", "training-pv", "internship-pv", "location-hyderabad", "research-pv-jd"],
  },
  {
    id: "role-medical-coder",
    type: "role",
    label: "Certified Medical Coder (CPC)",
    path: "/roles/medical-coder",
    connectedEntityIds: ["skill-icd10", "skill-cpt", "training-coding", "internship-coding", "location-hyderabad", "research-denial-audit"],
  },
  {
    id: "role-cdm-assoc",
    type: "role",
    label: "Clinical Data Management Coordinator",
    path: "/roles/clinical-data-coordinator",
    connectedEntityIds: ["skill-rave", "skill-cdisc", "training-cdm", "internship-cdm", "location-[#bangalore]"],
  },

  // Skills & Software Tools
  {
    id: "skill-argus",
    type: "skill",
    label: "Oracle Argus Safety v8.4+",
    path: "/blog/pharmacovigilance-career-guide-2026",
    connectedEntityIds: ["role-pv-assoc", "training-pv"],
  },
  {
    id: "skill-meddra",
    type: "skill",
    label: "MedDRA Dictionary Hierarchy v27.0",
    path: "/blog/pharmacovigilance-career-guide-2026",
    connectedEntityIds: ["role-pv-assoc", "training-pv"],
  },
  {
    id: "skill-icd10",
    type: "skill",
    label: "ICD-10-CM & CPT Guidelines",
    path: "/blog/medical-coding-cpc-guide-2026",
    connectedEntityIds: ["role-medical-coder", "training-coding"],
  },

  // Locations
  {
    id: "location-hyderabad",
    type: "location",
    label: "Hyderabad Healthcare Capability Hub",
    path: "/industry/pharmacovigilance/hyderabad",
    connectedEntityIds: ["role-pv-assoc", "role-medical-coder", "research-living-cost"],
  },

  // Research Reports
  {
    id: "research-living-cost",
    type: "research",
    label: "2026 Hyderabad Healthcare Training & Living Cost Report",
    path: "/research/2026-hyderabad-healthcare-training-living-cost-report",
    connectedEntityIds: ["location-hyderabad", "degree-bpharm"],
  },
  {
    id: "research-pv-jd",
    type: "research",
    label: "2026 Pharmacovigilance 300+ Verified JD Skill Frequency Report",
    path: "/research/2026-pharmacovigilance-300-jd-skill-frequency-report",
    connectedEntityIds: ["role-pv-assoc", "skill-argus", "skill-meddra"],
  },
];
