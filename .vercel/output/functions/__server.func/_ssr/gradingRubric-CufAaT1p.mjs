const GRADING_RUBRIC = [
  {
    slug: "pharmacovigilance",
    title: "Pharmacovigilance",
    jdRole: "Drug Safety Associate",
    gradedDeliverables: [
      "10 redacted ICSR cases, end-to-end (intake → MedDRA → narrative)",
      "1 aggregate-report section (PSUR / PBRER)",
      "Argus Safety hands-on capstone (simulated)"
    ],
    rows: [
      {
        band: "A",
        cutoff: "≥ 90 %",
        jdOutcome: "Owns ICSR end-to-end at ≥ 95% accuracy, MedDRA-codes without supervisor edits, drafts narrative + aggregate sections without rework.",
        recruiterRead: "Shippable from day 1. Skip the QC pod, put on live cases."
      },
      {
        band: "B+",
        cutoff: "75-89 %",
        jdOutcome: "Processes ICSRs with reviewer sign-off, MedDRA hit-rate ≥ 90%, narrative drafts need light editing.",
        recruiterRead: "Standard fresher hire — pair with senior for 4-6 weeks, then production."
      },
      {
        band: "B",
        cutoff: "60-74 %",
        jdOutcome: "Completes intake + coding but needs supervised QC on every case, narrative requires major rewrite.",
        recruiterRead: "Hire only into structured training pods (Cognizant / Accenture-style)."
      },
      {
        band: "NA",
        cutoff: "< 60 %",
        jdOutcome: "Certificate not awarded. Did not clear the production accuracy bar.",
        recruiterRead: "Not on the recruiter list."
      }
    ]
  },
  {
    slug: "medical-coding",
    title: "Medical Coding",
    jdRole: "Medical Coder (Fresher)",
    gradedDeliverables: [
      "200 ICD-10-CM coded charts (timed)",
      "50 CPT + E/M leveled encounters",
      "Mock CPC audit run (Pinnacle-style review)"
    ],
    rows: [
      {
        band: "A",
        cutoff: "≥ 90 %",
        jdOutcome: "Production accuracy ≥ 95% on the timed chart set, E/M leveling matches auditor, NCCI edits caught.",
        recruiterRead: "Audit-ready. Optum / Omega-grade fresher; goes straight to live charts."
      },
      {
        band: "B+",
        cutoff: "75-89 %",
        jdOutcome: "Accuracy 90-94%, E/M leveling within one level of auditor, occasional NCCI misses.",
        recruiterRead: "Standard fresher hire — 30-day production ramp."
      },
      {
        band: "B",
        cutoff: "60-74 %",
        jdOutcome: "Accuracy 85-89%, E/M needs review, multi-specialty exposure thin.",
        recruiterRead: "Inpatient or single-specialty work only until accuracy lifts."
      },
      {
        band: "NA",
        cutoff: "< 60 %",
        jdOutcome: "Certificate not awarded. Did not clear the 85% accuracy floor.",
        recruiterRead: "Not on the recruiter list."
      }
    ]
  },
  {
    slug: "clinical-data-management",
    title: "Clinical Data Management",
    jdRole: "Clinical Data Associate",
    gradedDeliverables: [
      "Live EDC build in Medidata Rave (1 study)",
      "Edit-check spec authored + executed",
      "Mock database lock with SAE reconciliation"
    ],
    rows: [
      {
        band: "A",
        cutoff: "≥ 90 %",
        jdOutcome: "Builds CDASH-aligned CRFs, writes executable edit-checks, runs SAE recon clean. Knows ICH-GCP at audit depth.",
        recruiterRead: "CRO-ready (IQVIA / Parexel / ICON fresher pool)."
      },
      {
        band: "B+",
        cutoff: "75-89 %",
        jdOutcome: "Executes the build with senior review, query rate within target, edit-checks need minor patching.",
        recruiterRead: "Standard CDA hire."
      },
      {
        band: "B",
        cutoff: "60-74 %",
        jdOutcome: "Can clean data and raise queries; build / edit-check authoring still supervised.",
        recruiterRead: "Junior data review pod only."
      },
      {
        band: "NA",
        cutoff: "< 60 %",
        jdOutcome: "Certificate not awarded.",
        recruiterRead: "Not on the recruiter list."
      }
    ]
  },
  {
    slug: "sas-clinical",
    title: "SAS Programming (Clinical)",
    jdRole: "Clinical SAS Programmer",
    gradedDeliverables: [
      "SDTM mapping for a sample study (per CDISC IG)",
      "ADaM dataset with traceability",
      "Pinnacle 21 validation pass + 1 TLF set"
    ],
    rows: [
      {
        band: "A",
        cutoff: "≥ 90 %",
        jdOutcome: "Builds SDTM + ADaM + TLFs that pass Pinnacle 21 first time, defines traceability cleanly.",
        recruiterRead: "Submission-grade fresher. Goes onto live study programming."
      },
      {
        band: "B+",
        cutoff: "75-89 %",
        jdOutcome: "Builds the datasets, validation issues fixed on second pass, TLF code well-commented.",
        recruiterRead: "Standard SAS hire — 30-day shadow then live."
      },
      {
        band: "B",
        cutoff: "60-74 %",
        jdOutcome: "Comfortable in Base SAS; SDTM mapping needs review.",
        recruiterRead: "Reporting-only or non-submission work to start."
      },
      {
        band: "NA",
        cutoff: "< 60 %",
        jdOutcome: "Certificate not awarded.",
        recruiterRead: "Not on the recruiter list."
      }
    ]
  },
  {
    slug: "regulatory-affairs",
    title: "Regulatory Affairs",
    jdRole: "Regulatory Affairs Associate",
    gradedDeliverables: [
      "eCTD module section drafted (Module 2 summary)",
      "Labeling & artwork QC checklist run",
      "Deficiency-letter response draft"
    ],
    rows: [
      {
        band: "A",
        cutoff: "≥ 90 %",
        jdOutcome: "Drafts eCTD-ready sections, runs Veeva Vault RIM cleanly, responds to deficiency letters with citations.",
        recruiterRead: "Pharma-RA-ready (Dr. Reddy's / Aurobindo fresher pool)."
      },
      {
        band: "B+",
        cutoff: "75-89 %",
        jdOutcome: "Drafts sections with reviewer edits, labeling QC accurate, RIM tool comfortable.",
        recruiterRead: "Standard RA hire."
      },
      {
        band: "B",
        cutoff: "60-74 %",
        jdOutcome: "Understands eCTD structure; long-form authoring needs heavy edit.",
        recruiterRead: "Coordinator / publishing-support role only."
      },
      {
        band: "NA",
        cutoff: "< 60 %",
        jdOutcome: "Certificate not awarded.",
        recruiterRead: "Not on the recruiter list."
      }
    ]
  },
  {
    slug: "medical-writing",
    title: "Medical Writing",
    jdRole: "Medical Writer (Associate)",
    gradedDeliverables: [
      "CSR section (ICH E3) — Efficacy or Safety",
      "Patient narrative set (5 cases)",
      "Manuscript outline (ICMJE / GPP-compliant)"
    ],
    rows: [
      {
        band: "A",
        cutoff: "≥ 90 %",
        jdOutcome: "Writes CSR sections to ICH E3, narratives need only editorial polish, lit-search workflow clean.",
        recruiterRead: "CRO / pharma writing pool ready."
      },
      {
        band: "B+",
        cutoff: "75-89 %",
        jdOutcome: "Drafts narratives + sections with senior review; AI-assist guardrails followed.",
        recruiterRead: "Standard MW hire."
      },
      {
        band: "B",
        cutoff: "60-74 %",
        jdOutcome: "Comfortable with style guide; long-form authoring still supervised.",
        recruiterRead: "Junior writing pod only."
      },
      {
        band: "NA",
        cutoff: "< 60 %",
        jdOutcome: "Certificate not awarded.",
        recruiterRead: "Not on the recruiter list."
      }
    ]
  }
];
const RUBRIC_BY_SLUG = Object.fromEntries(
  GRADING_RUBRIC.map((r) => [r.slug, r])
);
export {
  GRADING_RUBRIC as G,
  RUBRIC_BY_SLUG as R
};
