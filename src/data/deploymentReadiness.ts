/**
 * Deployment-Ready data per course slug.
 *
 * Implements the Arzon 40/30/20/10 training formula:
 *   - 40% Domain Knowledge
 *   - 30% Process Training
 *   - 20% Tool Exposure
 *   - 10% Workplace Readiness
 *
 * Plus the four-part "Deployment-Ready Outcome" student promise:
 * I Know · I Understand · I Have Practiced · I Have Exposure To.
 *
 * Wired into <DeploymentReadyBlock /> on /courses/$slug and the
 * methodology page /deployment-model. Adding a new course? Add the
 * matching entry here so the block renders (block is hidden when
 * absent - non-breaking fallback).
 */

export type DeploymentPillarId = "domain" | "process" | "tools" | "workplace";

export interface DeploymentPillar {
  id: DeploymentPillarId;
  weight: 40 | 30 | 20 | 10;
  label: string;
  recruiterAsk: string;
  items: string[];
}

export interface DeploymentOutcome {
  /** "I Know" - industry, terminology, regulations. */
  know: string[];
  /** "I Understand" - responsibilities, workflows, documentation standards. */
  understand: string[];
  /** "I Have Practiced" - realistic scenarios, projects, case studies. */
  practiced: string[];
  /** "I Have Exposure To" - industry tools, processes, recruiter expectations. */
  exposureTo: string[];
}

export interface DeploymentReadiness {
  /** Exact JD role title this track trains for. */
  roleTitle: string;
  /** One-line recruiter-facing promise. */
  promise: string;
  pillars: [DeploymentPillar, DeploymentPillar, DeploymentPillar, DeploymentPillar];
  outcome: DeploymentOutcome;
}

const PILLAR_LABELS: Record<
  DeploymentPillarId,
  { label: string; weight: DeploymentPillar["weight"]; recruiterAsk: string }
> = {
  domain: {
    label: "Domain Knowledge",
    weight: 40,
    recruiterAsk: "Does this candidate know why the work exists?",
  },
  process: {
    label: "Process Training",
    weight: 30,
    recruiterAsk: "Can they follow the SOPs from day one?",
  },
  tools: {
    label: "Tool Exposure",
    weight: 20,
    recruiterAsk: "Do they recognise the screens and workflow?",
  },
  workplace: {
    label: "Workplace Readiness",
    weight: 10,
    recruiterAsk: "Will they communicate like a teammate?",
  },
};

function pillar(id: DeploymentPillarId, items: string[]): DeploymentPillar {
  const meta = PILLAR_LABELS[id];
  return { id, weight: meta.weight, label: meta.label, recruiterAsk: meta.recruiterAsk, items };
}

export const DEPLOYMENT_BY_SLUG: Record<string, DeploymentReadiness> = {
  pharmacovigilance: {
    roleTitle: "Drug Safety / PV Associate",
    promise:
      "A Deployment-Ready PV Associate who can book in an ICSR, code it in MedDRA, write a narrative and walk a recruiter through the lifecycle - on day one.",
    pillars: [
      pillar("domain", [
        "Pharmacovigilance & global drug-safety frameworks (ICH-GVP, E2)",
        "Adverse Events vs ADR vs SAE - terminology and regulatory weight",
        "Why post-marketing surveillance exists and who pays for missing it",
        "FDA / EMA / CDSCO roles in safety reporting",
      ]),
      pillar("process", [
        "ICSR lifecycle - intake, triage, processing, QC, submission",
        "Causality, seriousness and expectedness assessments",
        "Follow-up handling and source-document reconciliation",
        "Aggregate reporting cadence (PSUR / PBRER / DSUR)",
        "Escalation paths and SOP-driven decision-making",
      ]),
      pillar("tools", [
        "Argus Safety - case book-in, narrative, E2B(R3) submission screens",
        "MedDRA Browser - LLT → SOC navigation and coding conventions",
        "WHO Drug Dictionary concepts and lookup workflow",
        "EVDAS / VigiBase - signal-screening surfaces",
      ]),
      pillar("workplace", [
        "Writing a clean, regulator-ready case narrative",
        "Email etiquette with sponsors, sites and QA",
        "Daily case-load reporting and metrics communication",
        "Audit / inspection meeting etiquette",
      ]),
    ],
    outcome: {
      know: [
        "ICH-GVP modules",
        "Adverse event terminology",
        "FDA / EMA / CDSCO reporting timelines",
      ],
      understand: [
        "Daily PV case-processing workflow",
        "QC and follow-up loops",
        "PSUR / aggregate report structure",
      ],
      practiced: [
        "25 ICSR cases in an Argus-style simulation",
        "100-term MedDRA coding test",
        "Mini-PSUR draft for a sample drug",
      ],
      exposureTo: [
        "Argus Safety screens",
        "MedDRA Browser & WHO-DD",
        "Signal-detection surfaces (EVDAS, VigiBase)",
      ],
    },
  },

  "medical-coding": {
    roleTitle: "Medical Coder",
    promise:
      "A Deployment-Ready Medical Coder who can code an outpatient chart end-to-end, defend the modifiers and pass an AAPC-style audit on day one.",
    pillars: [
      pillar("domain", [
        "Anatomy, physiology and body-system fundamentals",
        "Medical terminology - roots, prefixes, suffixes",
        "Common drug classes and disease processes",
        "Why coding accuracy drives revenue cycle and compliance",
      ]),
      pillar("process", [
        "Outpatient coding workflow",
        "Inpatient (IP) coding workflow with DRG basics",
        "Claim lifecycle - submission, denial, appeal",
        "QA and audit feedback loops",
        "HIPAA & PHI handling SOPs",
      ]),
      pillar("tools", [
        "ICD-10-CM / ICD-10-PCS - codebook navigation and sequencing rules",
        "CPT® and HCPCS Level II - section navigation and modifier application",
        "3M Encoder / EncoderPro - encoder workflow concepts",
        "EHR coder views - chart-pull and abstraction flow",
      ]),
      pillar("workplace", [
        "Coder–QA email and query etiquette",
        "Productivity reporting (charts/hr, accuracy %)",
        "Denial-management collaboration with AR teams",
        "Daily standup and SLA communication",
      ]),
    ],
    outcome: {
      know: [
        "ICD-10-CM, CPT and HCPCS conventions",
        "HIPAA and NCCI rules",
        "Payer-side denial vocabulary",
      ],
      understand: [
        "Outpatient + IP coding workflows",
        "Modifier and bundling logic",
        "QA / audit feedback loop",
      ],
      practiced: [
        "100-chart ICD-10-CM exercise",
        "60-chart CPT + E/M test",
        "50-chart end-to-end audit",
      ],
      exposureTo: [
        "Encoder workflow (3M / EncoderPro)",
        "EHR coder views",
        "Denial-management case studies",
      ],
    },
  },

  "clinical-data-management": {
    roleTitle: "Clinical Data Associate",
    promise:
      "A Deployment-Ready Clinical Data Associate who can read a protocol, annotate a CRF, raise the right queries and walk through a lock checklist on day one.",
    pillars: [
      pillar("domain", [
        "Clinical trial phases I–IV and stakeholders (sponsor, CRO, site)",
        "GCP, 21 CFR Part 11 and CDISC standards",
        "Why data integrity drives regulatory approval",
        "Data lifecycle from first-patient-in to lock",
      ]),
      pillar("process", [
        "CRF design and annotation against the protocol",
        "Edit-check specification and UAT",
        "Query lifecycle - issue, response, closure",
        "SAE reconciliation between CDM and PV",
        "Database lock checklist and audit-trail review",
      ]),
      pillar("tools", [
        "Medidata Rave - study build and edit-check screens",
        "Oracle Clinical / RDC - concepts and navigation",
        "Veeva CDMS - workflow and user-management views",
        "CDISC SDTM mapping basics and Define-XML",
      ]),
      pillar("workplace", [
        "Site communication etiquette for queries",
        "Status reporting to data manager and biostats",
        "Cross-functional handover to PV and biostats",
        "Documentation discipline for inspection-readiness",
      ]),
    ],
    outcome: {
      know: [
        "ICH-GCP & 21 CFR Part 11",
        "CDISC SDTM / CDASH vocabulary",
        "Trial-phase responsibilities",
      ],
      understand: [
        "CRF design and query lifecycle",
        "SAE reconciliation flow",
        "Database lock checklist",
      ],
      practiced: [
        "Annotated CRF for an oncology Phase II",
        "Cleaning a 200-row dirty dataset",
        "Full study lock package",
      ],
      exposureTo: [
        "Medidata Rave screens",
        "Oracle Clinical / Veeva CDMS workflow",
        "SDTM mapping & Define-XML",
      ],
    },
  },
};

export function getDeploymentReadiness(slug: string): DeploymentReadiness | undefined {
  return DEPLOYMENT_BY_SLUG[slug];
}

/** Stable order for rendering the four pillars (Domain → Process → Tools → Workplace). */
export const PILLAR_ORDER: DeploymentPillarId[] = ["domain", "process", "tools", "workplace"];
