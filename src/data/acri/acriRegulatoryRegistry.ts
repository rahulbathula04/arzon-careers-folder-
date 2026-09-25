/**
 * ACRI Regulatory Reference & Standard Registry
 *
 * Authoritative registry of global and national pharmacovigilance standards,
 * guidelines, and versions. Every assessment item is bound to a specific
 * regulatory reference, version, and jurisdiction.
 */

export interface RegulatoryFramework {
  id: string;
  shortName: string;
  fullName: string;
  governingBody: string;
  jurisdiction: "Global (ICH)" | "European Union (EMA)" | "India (CDSCO)" | "United States (FDA)";
  activeVersion: string;
  effectiveFrom: string; // ISO date
  documentUrl?: string;
  scopeSummary: string;
  keyMandates: {
    ruleId: string;
    description: string;
    statutoryTimeline?: string;
  }[];
}

export const REGULATORY_REGISTRY: Record<string, RegulatoryFramework> = {
  "ICH-E2D-R1": {
    id: "ICH-E2D-R1",
    shortName: "ICH E2D(R1)",
    fullName: "Post-Approval Safety Data Management: Definitions and Standards for Management and Expedited Reporting of Individual Case Safety Reports",
    governingBody: "International Council for Harmonisation (ICH)",
    jurisdiction: "Global (ICH)",
    activeVersion: "Step 4 Final Guideline (15 September 2025)",
    effectiveFrom: "2025-09-15",
    documentUrl: "https://database.ich.org/sites/default/files/ICH_E2D(R1)_Step4_FinalGuideline_2025_0819.pdf",
    scopeSummary: "Harmonized principles for post-marketing ICSR collection, 4 minimum criteria validity, source classification, and global expedited reporting standards.",
    keyMandates: [
      {
        ruleId: "ICH-E2D-R1-MIN4",
        description: "An ICSR is legally valid if and only if 4 core elements exist: an identifiable patient, an identifiable reporter, at least one suspect medicinal product, and at least one adverse event.",
        statutoryTimeline: "Determined at Day 0 intake",
      },
      {
        ruleId: "ICH-E2D-R1-EXPEDITED",
        description: "Serious, unexpected adverse drug reactions must be submitted on an expedited basis to relevant competent authorities.",
        statutoryTimeline: "15 calendar days from Day 0",
      },
    ],
  },

  "EMA-GVP-MOD-VI": {
    id: "EMA-GVP-MOD-VI",
    shortName: "EMA GVP Module VI",
    fullName: "Guideline on Good Pharmacovigilance Practices (GVP) Module VI – Collection, management and submission of reports of suspected adverse reactions to medicinal products",
    governingBody: "European Medicines Agency (EMA)",
    jurisdiction: "European Union (EMA)",
    activeVersion: "Revision 2 (with 2025 E2D-R1 updates)",
    effectiveFrom: "2025-01-01",
    documentUrl: "https://www.ema.europa.eu/en/human-regulatory-overview/post-authorisation/pharmacovigilance-post-authorisation/good-pharmacovigilance-practices-gvp",
    scopeSummary: "EU requirements for recording, validating, managing, and transmitting spontaneous and study reports to EudraVigilance.",
    keyMandates: [
      {
        ruleId: "EMA-GVP-DAY0",
        description: "Clock starts on Day 0 (the date when any personnel of the marketing authorization holder first receives the minimum information). Calendar days apply strictly.",
        statutoryTimeline: "Day 0 = Receipt Date",
      },
      {
        ruleId: "EMA-GVP-DUPLICATES",
        description: "MAHs must perform routine duplicate screening. When duplicates are confirmed, information must be integrated into a master case without data loss.",
        statutoryTimeline: "Continuous ongoing surveillance",
      },
    ],
  },

  "EMA-GVP-MOD-IX": {
    id: "EMA-GVP-MOD-IX",
    shortName: "EMA GVP Module IX",
    fullName: "Guideline on Good Pharmacovigilance Practices (GVP) Module IX – Signal management",
    governingBody: "European Medicines Agency (EMA)",
    jurisdiction: "European Union (EMA)",
    activeVersion: "Revision 1",
    effectiveFrom: "2020-02-01",
    scopeSummary: "Statistical signal detection methods, disproportionality metrics (PRR, ROR), validation, and signal prioritization.",
    keyMandates: [
      {
        ruleId: "EMA-GVP-PRR-THRESHOLD",
        description: "Evans criteria for statistical signal: PRR >= 2.0, Chi-square >= 4.0, and number of cases >= 3. A signal is a hypothesis requiring clinical review, not proof of causality.",
        statutoryTimeline: "Periodic aggregate review",
      },
    ],
  },

  "CDSCO-PVPI-2024": {
    id: "CDSCO-PVPI-2024",
    shortName: "CDSCO 2024 Guidance",
    fullName: "Central Drugs Standard Control Organisation & Pharmacovigilance Programme of India (PvPI) Regulatory Guidance for Marketing Authorization Holders",
    governingBody: "Central Drugs Standard Control Organisation (CDSCO), Ministry of Health, India",
    jurisdiction: "India (CDSCO)",
    activeVersion: "2024 Guidance Document for PSUR & PV",
    effectiveFrom: "2024-01-01",
    documentUrl: "https://cdsco.gov.in/",
    scopeSummary: "National framework for adverse event reporting in India, PSUR schedules, and causality assessment under PvPI.",
    keyMandates: [
      {
        ruleId: "CDSCO-EXPEDITED-15D",
        description: "Serious unexpected adverse drug reactions occurring in India must be reported to the licensing authority within 15 calendar days of receipt.",
        statutoryTimeline: "15 calendar days",
      },
      {
        ruleId: "CDSCO-NONSERIOUS-90D",
        description: "All non-serious adverse drug reactions are collated and submitted in periodic safety reports or within 90 calendar days in specified regulatory frameworks.",
        statutoryTimeline: "90 calendar days / Periodic",
      },
      {
        ruleId: "CDSCO-WHO-UMC",
        description: "PvPI mandates the use of the WHO-UMC causality assessment system for attributing adverse events to suspect medicines.",
        statutoryTimeline: "Prior to regulatory transmission",
      },
    ],
  },

  "FDA-21CFR-314-80": {
    id: "FDA-21CFR-314-80",
    shortName: "US FDA 21 CFR 314.80",
    fullName: "Title 21 Code of Federal Regulations Part 314.80 – Postmarketing reporting of adverse drug experiences",
    governingBody: "United States Food and Drug Administration (US FDA)",
    jurisdiction: "United States (FDA)",
    activeVersion: "Annual Code of Federal Regulations",
    effectiveFrom: "2024-01-01",
    scopeSummary: "15-day Alert Reports for serious and unexpected postmarketing events, periodic reporting, and record preservation requirements.",
    keyMandates: [
      {
        ruleId: "FDA-15DAY-ALERT",
        description: "Each adverse drug experience that is both serious and unexpected must be reported within 15 calendar days of initial receipt by the applicant.",
        statutoryTimeline: "15 calendar days",
      },
    ],
  },

  "WHO-UMC-CAUSALITY": {
    id: "WHO-UMC-CAUSALITY",
    shortName: "WHO-UMC System",
    fullName: "The Use of the WHO-UMC System for Standardised Case Causality Assessment",
    governingBody: "World Health Organization – Uppsala Monitoring Centre (WHO-UMC)",
    jurisdiction: "Global (ICH)",
    activeVersion: "Standard International Table",
    effectiveFrom: "2020-01-01",
    scopeSummary: "Standardized 6-tier causality categories: Certain, Probable/Likely, Possible, Unlikely, Conditional/Unclassified, and Unassessable/Unclassifiable.",
    keyMandates: [
      {
        ruleId: "WHO-UMC-CERTAIN-RECHALLENGE",
        description: "'Certain' strictly requires plausible time relationship, positive dechallenge, definitive laboratory test or positive rechallenge, and event cannot be explained by disease or other drugs.",
        statutoryTimeline: "Case assessment gate",
      },
    ],
  },

  "ICH-MEDDRA-PTC": {
    id: "ICH-MEDDRA-PTC",
    shortName: "MedDRA PtC v27.0",
    fullName: "MedDRA Term Selection: Points to Consider – ICH-Endorsed Guide for MedDRA Users",
    governingBody: "ICH MedDRA Management Committee (MSSO)",
    jurisdiction: "Global (ICH)",
    activeVersion: "Release 27.0",
    effectiveFrom: "2024-03-01",
    scopeSummary: "Standardized rules for coding verbatim terms to Lowest Level Terms (LLT) and Preferred Terms (PT) without introducing diagnostic bias.",
    keyMandates: [
      {
        ruleId: "MEDDRA-PTC-VERBATIM",
        description: "Select the LLT that most accurately reflects the reporter's verbatim words. Do not assign a provisional diagnosis code when only symptoms are documented.",
        statutoryTimeline: "Coding workflow",
      },
    ],
  },
};

export const ACRI_REGULATORY_REGISTRY = REGULATORY_REGISTRY;
