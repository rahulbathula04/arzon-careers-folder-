/**
 * Employer drilldown data — hand-curated by the Arzon employer desk from
 * Naukri + LinkedIn JD scrapes and quarterly employer briefings.
 * Only the top ~20 employers per shipping slug are covered; the report
 * falls back to a compact card with an honest "deep-dive coming soon" note
 * for the rest.
 */

export type WfhPolicy = "office" | "hybrid" | "wfh-common";

export interface EmployerDrilldown {
  /** Matches Employer.name in employers.ts. */
  name: string;
  /** Live JD volume — last 90-day sample from source. */
  jdCount90d: number;
  /** 1-5, drives the flame meter. */
  hiringSignal: 1 | 2 | 3 | 4 | 5;
  /** Most common titles they hire under. */
  commonTitles: string[];
  /** Real project categories they staff. */
  projectTypes: string[];
  wfhPolicy: WfhPolicy;
  /** Seasonal hiring shape, one line. */
  seasonalNote?: string;
  /** Source ids from sources.ts backing this drilldown. */
  sourceIds: string[];
}

export const EMPLOYER_DRILLDOWN: Record<string, EmployerDrilldown> = {
  IQVIA: {
    name: "IQVIA",
    jdCount90d: 142,
    hiringSignal: 5,
    commonTitles: ["Drug Safety Associate", "Clinical Data Coordinator", "SAS Programmer I"],
    projectTypes: [
      "ICSR triage for EU-MAH sponsors",
      "Aggregate PBRERs / PSURs",
      "EDC study builds on Rave",
      "SDTM/ADaM programming for Phase III",
    ],
    wfhPolicy: "hybrid",
    seasonalNote: "Two large fresher waves: Feb-Mar and Aug-Sep.",
    sourceIds: ["naukri_pv", "linkedin_hiring_pulse", "arzon_employer_desk"],
  },
  Parexel: {
    name: "Parexel",
    jdCount90d: 88,
    hiringSignal: 4,
    commonTitles: ["Drug Safety Associate", "Clinical Data Associate"],
    projectTypes: [
      "Serious ICSR narratives for oncology portfolios",
      "Literature signal detection",
      "Rave EDC build and study conduct",
    ],
    wfhPolicy: "hybrid",
    seasonalNote: "Rolling hiring; large Hyderabad campus wave every Q1.",
    sourceIds: ["naukri_pv", "linkedin_hiring_pulse"],
  },
  "ICON plc": {
    name: "ICON plc",
    jdCount90d: 96,
    hiringSignal: 5,
    commonTitles: [
      "Drug Safety Associate I",
      "Clinical Data Coordinator",
      "Biostatistical Programmer",
    ],
    projectTypes: [
      "Global safety intake for top-10 pharma sponsors",
      "Phase I-III CDM across therapy areas",
      "SAS programming for CDISC deliverables",
    ],
    wfhPolicy: "hybrid",
    sourceIds: ["naukri_pv", "arzon_employer_desk"],
  },
  "Syneos Health": {
    name: "Syneos Health",
    jdCount90d: 64,
    hiringSignal: 4,
    commonTitles: ["PV Associate", "CDM Associate"],
    projectTypes: ["ICSR case processing", "EDC study conduct", "Reg-submission support"],
    wfhPolicy: "hybrid",
    sourceIds: ["naukri_pv"],
  },
  "Labcorp Drug Development": {
    name: "Labcorp Drug Development",
    jdCount90d: 71,
    hiringSignal: 4,
    commonTitles: ["Drug Safety Associate", "Data Coordinator"],
    projectTypes: [
      "Vaccine safety programs",
      "Aggregate reports",
      "Central lab data reconciliation",
    ],
    wfhPolicy: "hybrid",
    sourceIds: ["naukri_pv"],
  },
  "PPD (Thermo Fisher)": {
    name: "PPD (Thermo Fisher)",
    jdCount90d: 58,
    hiringSignal: 4,
    commonTitles: ["Safety Associate", "Clinical Data Associate"],
    projectTypes: ["ICSR intake for US-hours desks", "Phase II-III CDM"],
    wfhPolicy: "hybrid",
    seasonalNote: "US-hours desks — some night-shift rotations.",
    sourceIds: ["naukri_pv"],
  },
  Indegene: {
    name: "Indegene",
    jdCount90d: 82,
    hiringSignal: 4,
    commonTitles: ["Pharmacovigilance Associate", "Medical Reviewer"],
    projectTypes: ["Literature screening + case triage", "Aggregate reports"],
    wfhPolicy: "hybrid",
    sourceIds: ["naukri_pv", "arzon_employer_desk"],
  },
  "TCS Life Sciences": {
    name: "TCS Life Sciences",
    jdCount90d: 118,
    hiringSignal: 5,
    commonTitles: ["Process Associate — PV", "CDM Executive", "Medical Coder"],
    projectTypes: ["ICSR case processing (managed services)", "EDC data cleaning at scale"],
    wfhPolicy: "office",
    seasonalNote: "Bulk campus + lateral hiring in Q1 and Q3.",
    sourceIds: ["naukri_pv", "linkedin_hiring_pulse"],
  },
  "Cognizant Life Sciences": {
    name: "Cognizant Life Sciences",
    jdCount90d: 134,
    hiringSignal: 5,
    commonTitles: ["Process Executive — PV", "Medical Coder", "CDM Associate"],
    projectTypes: ["Managed-services PV desks", "Coding factories for US payers"],
    wfhPolicy: "office",
    seasonalNote: "Large fresher waves across Hyderabad + Chennai every quarter.",
    sourceIds: ["naukri_pv", "naukri_medical_coding", "linkedin_hiring_pulse"],
  },
  "Accenture Health & Life Sciences": {
    name: "Accenture Health & Life Sciences",
    jdCount90d: 92,
    hiringSignal: 4,
    commonTitles: ["PV Analyst", "Medical Coder", "Regulatory Analyst"],
    projectTypes: ["End-to-end PV managed services", "Coding + RCM at scale"],
    wfhPolicy: "hybrid",
    sourceIds: ["naukri_pv", "naukri_medical_coding"],
  },
  "Dr. Reddy's": {
    name: "Dr. Reddy's",
    jdCount90d: 24,
    hiringSignal: 3,
    commonTitles: ["PV Executive", "RA Associate"],
    projectTypes: ["In-house safety desk for own portfolio", "US-DMF filings"],
    wfhPolicy: "office",
    sourceIds: ["naukri_pv", "naukri_ra"],
  },
  "Sun Pharma": {
    name: "Sun Pharma",
    jdCount90d: 21,
    hiringSignal: 3,
    commonTitles: ["PV Executive", "RA Officer"],
    projectTypes: ["Domestic + US safety database ownership", "ANDA / DMF filings"],
    wfhPolicy: "office",
    sourceIds: ["naukri_pv"],
  },
  Novartis: {
    name: "Novartis",
    jdCount90d: 46,
    hiringSignal: 4,
    commonTitles: ["Safety Scientist I", "Clinical Data Associate"],
    projectTypes: ["Global signal review", "Oncology safety programs"],
    wfhPolicy: "hybrid",
    sourceIds: ["naukri_pv", "arzon_employer_desk"],
  },
  Sanofi: {
    name: "Sanofi",
    jdCount90d: 38,
    hiringSignal: 4,
    commonTitles: ["Global Safety Associate", "Regulatory Specialist"],
    projectTypes: ["Vaccine safety desks", "Global reg-labelling"],
    wfhPolicy: "hybrid",
    sourceIds: ["naukri_pv"],
  },
  "Optum (UnitedHealth)": {
    name: "Optum (UnitedHealth)",
    jdCount90d: 168,
    hiringSignal: 5,
    commonTitles: ["Medical Coder", "Coding QA Analyst", "AR Caller"],
    projectTypes: [
      "Outpatient E/M coding factories",
      "Inpatient DRG coding",
      "Coding QA + audit desks",
    ],
    wfhPolicy: "wfh-common",
    seasonalNote: "Continuous hiring — largest medical-coding employer in India.",
    sourceIds: ["naukri_medical_coding", "linkedin_hiring_pulse", "arzon_employer_desk"],
  },
  "R1 RCM": {
    name: "R1 RCM",
    jdCount90d: 96,
    hiringSignal: 4,
    commonTitles: ["Medical Coder", "Charge Entry Specialist"],
    projectTypes: ["Physician / hospital coding for US payers"],
    wfhPolicy: "hybrid",
    sourceIds: ["naukri_medical_coding"],
  },
  "Omega Healthcare": {
    name: "Omega Healthcare",
    jdCount90d: 118,
    hiringSignal: 5,
    commonTitles: ["Medical Coder — Trainee", "Coder — E/M", "Coder — IP DRG"],
    projectTypes: [
      "High-volume outpatient coding",
      "IP-DRG teams",
      "Auditor rotations after 18 months",
    ],
    wfhPolicy: "office",
    seasonalNote: "Rolling batches every 2-3 weeks in Chennai + Bengaluru.",
    sourceIds: ["naukri_medical_coding", "arzon_employer_desk"],
  },
  "Access Healthcare": {
    name: "Access Healthcare",
    jdCount90d: 84,
    hiringSignal: 4,
    commonTitles: ["Medical Coder", "Denial Management Analyst"],
    projectTypes: ["End-to-end RCM for US physician groups"],
    wfhPolicy: "office",
    sourceIds: ["naukri_medical_coding"],
  },
  "Veeva Systems": {
    name: "Veeva Systems",
    jdCount90d: 42,
    hiringSignal: 4,
    commonTitles: ["Consultant — Vault EDC", "Data Manager"],
    projectTypes: ["Vault EDC study builds", "SDTM / ADaM programming"],
    wfhPolicy: "hybrid",
    sourceIds: ["naukri_cdm", "arzon_employer_desk"],
  },
  "Medidata (Dassault)": {
    name: "Medidata (Dassault)",
    jdCount90d: 36,
    hiringSignal: 4,
    commonTitles: ["Data Manager", "Rave Study Builder"],
    projectTypes: ["Rave EDC configuration", "Study-conduct data management"],
    wfhPolicy: "hybrid",
    sourceIds: ["naukri_cdm"],
  },
  "Freyr Solutions": {
    name: "Freyr Solutions",
    jdCount90d: 62,
    hiringSignal: 4,
    commonTitles: ["RA Associate", "eCTD Publisher"],
    projectTypes: [
      "EU / US regulatory submissions",
      "Label management",
      "eCTD publishing at scale",
    ],
    wfhPolicy: "hybrid",
    seasonalNote: "Largest pure-play RA employer in India — 2,500+ hires/yr.",
    sourceIds: ["naukri_ra", "arzon_employer_desk"],
  },
  Biocon: {
    name: "Biocon",
    jdCount90d: 22,
    hiringSignal: 3,
    commonTitles: ["RA Executive", "PV Associate"],
    projectTypes: ["Biosimilar reg submissions (US + EU)", "Global PV for own biosimilars"],
    wfhPolicy: "office",
    sourceIds: ["naukri_ra"],
  },
  Innovaccer: {
    name: "Innovaccer",
    jdCount90d: 48,
    hiringSignal: 4,
    commonTitles: ["ML Engineer — Healthcare", "Clinical Data Analyst"],
    projectTypes: ["Population health analytics", "Payer analytics + risk models"],
    wfhPolicy: "hybrid",
    sourceIds: ["naukri_ai_health", "nasscom_ai_health"],
  },
};

export function getEmployerDrilldown(name: string): EmployerDrilldown | null {
  return EMPLOYER_DRILLDOWN[name] ?? null;
}
