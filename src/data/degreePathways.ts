export interface DegreePathway {
  slug: string;
  degreeName: string;
  shortTitle: string;
  metaDescription: string;
  overview: string;
  typicalDuration: string;
  coreSubjects: string[];
  eligibleRoles: {
    roleName: string;
    roleSlug: string;
    fitLevel: "High Alignment" | "Direct Prerequisite" | "Specialized Bridge";
    whyFit: string;
    keySkillsNeeded: string[];
    typicalStartingCtc: string;
  }[];
  arzonTrainingTracks: {
    trackName: string;
    trackSlug: string;
    duration: string;
    keyTools: string[];
  }[];
  eligibilityDisclaimer: string;
  transitionStrategy: {
    step: number;
    title: string;
    description: string;
  }[];
  faq: { question: string; answer: string }[];
}

export const DEGREE_PATHWAYS: DegreePathway[] = [
  {
    slug: "bpharm",
    degreeName: "B.Pharm (Bachelor of Pharmacy)",
    shortTitle: "B.Pharm Career Pathways",
    metaDescription: "Verified career options after B.Pharm in India (2026). Explore Pharmacovigilance, Medical Coding, CDM, and Regulatory Affairs role training.",
    overview: "B.Pharm graduates possess a strong foundational understanding of pharmacology, therapeutics, and drug chemistry. While university curricula cover drug mechanisms, global capability centers (GCCs) and CROs require practical database fluency in Argus Safety, ICD-10 coding, and MedDRA standards.",
    typicalDuration: "4 Years",
    coreSubjects: ["Pharmacology", "Medicinal Chemistry", "Pharmaceutics", "Pharmacokinetics", "Hospital & Clinical Pharmacy"],
    eligibleRoles: [
      {
        roleName: "Pharmacovigilance Associate (ICSR)",
        roleSlug: "pharmacovigilance-associate",
        fitLevel: "Direct Prerequisite",
        whyFit: "Pharmacology knowledge accelerates medical triage, adverse event severity scoring, and narrative drafting.",
        keySkillsNeeded: ["Oracle Argus Safety", "MedDRA Coding", "ICSR Processing", "E2B(R3) Compliance"],
        typicalStartingCtc: "₹3.8L – ₹5.2L"
      },
      {
        roleName: "Medical Coder (ICD-10-CM / CPT)",
        roleSlug: "medical-coder",
        fitLevel: "High Alignment",
        whyFit: "Deep anatomy and drug nomenclature knowledge simplifies chart review and procedural coding.",
        keySkillsNeeded: ["ICD-10-CM Coding", "CPT-4 Manuals", "HCPCS Level II", "Anatomy & Physiology"],
        typicalStartingCtc: "₹3.5L – ₹4.8L"
      },
      {
        roleName: "Clinical Data Associate (CDM)",
        roleSlug: "clinical-data-associate",
        fitLevel: "Specialized Bridge",
        whyFit: "Familiarity with clinical trial terminology aligns with electronic case report form (eCRF) validation.",
        keySkillsNeeded: ["Medidata RAVE", "eCRF Discrepancy Management", "CDISC ODM", "Data Validation"],
        typicalStartingCtc: "₹3.8L – ₹5.0L"
      }
    ],
    arzonTrainingTracks: [
      {
        trackName: "Pharmacovigilance Safety Specialist",
        trackSlug: "pharmacovigilance",
        duration: "12 Weeks (Blended + Applied Internship)",
        keyTools: ["Oracle Argus Safety 8.2", "MedDRA 26.0", "WHO-ART", "E2B(R3)"]
      },
      {
        trackName: "Certified Medical Coding Professional",
        trackSlug: "medical-coding",
        duration: "12 Weeks (Blended + Applied Internship)",
        keyTools: ["ICD-10-CM 2026", "CPT 2026", "HCPCS Level II", "EncoderPro"]
      }
    ],
    eligibilityDisclaimer: "Note: A B.Pharm degree provides strong academic eligibility, but entry-level hiring decisions depend on passing employer technical evaluations and database workflow assessments.",
    transitionStrategy: [
      {
        step: 1,
        title: "Identify Target Role Family",
        description: "Choose between drug safety (PV), clinical trial data (CDM), or healthcare billing (Medical Coding) based on your interest."
      },
      {
        step: 2,
        title: "Master Industry Tooling",
        description: "Transition from textbook definitions to live database entries in Oracle Argus, MedDRA, or Medidata RAVE."
      },
      {
        step: 3,
        title: "Complete Applied Internship",
        description: "Gain hands-on experience processing de-identified case safety reports or chart coding assignments."
      },
      {
        step: 4,
        title: "Prepare Technical Interview Dossier",
        description: "Practice answering technical questions sourced from 300+ verified employer job descriptions."
      }
    ],
    faq: [
      {
        question: "Can I enter Pharmacovigilance immediately after B.Pharm?",
        answer: "Yes. B.Pharm graduates are eligible for entry-level Drug Safety Associate roles, provided they demonstrate practical ICSR case processing skills and MedDRA coding fluency."
      },
      {
        question: "Is Medical Coding a good option for B.Pharm freshers?",
        answer: "Medical coding is one of the fastest-growing healthcare administrative tracks for B.Pharm freshers, offering immediate entry-level roles in US healthcare revenue cycle management."
      }
    ]
  },
  {
    slug: "pharmd",
    degreeName: "Pharm.D (Doctor of Pharmacy)",
    shortTitle: "Pharm.D Career Pathways",
    metaDescription: "Career opportunities for Pharm.D graduates in India (2026). Explore Pharmacovigilance, Medical Writing, and Clinical Research roles.",
    overview: "Pharm.D graduates possess advanced clinical pharmacology, pharmacotherapeutics, and patient care training. Their extensive clinical background makes them prime candidates for high-level drug safety evaluation, medical narrative writing, and clinical trial coordination.",
    typicalDuration: "6 Years (5 Years Academic + 1 Year Internship)",
    coreSubjects: ["Clinical Pharmacokinetics", "Pharmacotherapeutics", "Hospital Pharmacy", "Clinical Research", "Toxicology"],
    eligibleRoles: [
      {
        roleName: "Aggregate Safety Report Specialist (PBRER / PSUR)",
        roleSlug: "pharmacovigilance-associate",
        fitLevel: "Direct Prerequisite",
        whyFit: "Clinical therapeutics training enables deep signal evaluation and benefit-risk analysis for periodic safety reports.",
        keySkillsNeeded: ["PBRER Narrative Writing", "Signal Detection", "Oracle Argus", "MedDRA Coding"],
        typicalStartingCtc: "₹4.5L – ₹6.5L"
      },
      {
        roleName: "Medical Writer (Regulatory & Clinical)",
        roleSlug: "medical-writing",
        fitLevel: "Direct Prerequisite",
        whyFit: "Strong clinical understanding facilitates writing Clinical Study Reports (CSRs) and Investigator Brochures.",
        keySkillsNeeded: ["ICH-GCP E6(R2)", "CSR Drafting", "eCTD Module 2", "AMA Manual of Style"],
        typicalStartingCtc: "₹4.2L – ₹6.0L"
      }
    ],
    arzonTrainingTracks: [
      {
        trackName: "Pharmacovigilance & Safety Reporting",
        trackSlug: "pharmacovigilance",
        duration: "12 Weeks (Blended + Applied Internship)",
        keyTools: ["Oracle Argus 8.2", "MedDRA", "Signal Management", "PBRER Templates"]
      }
    ],
    eligibilityDisclaimer: "Note: Pharm.D graduates hold advanced clinical qualifications; however, commercial GCC environments mandate proficiency in standardized global software tools and submission formats.",
    transitionStrategy: [
      {
        step: 1,
        title: "Focus on High-Complexity Clinical Roles",
        description: "Target safety evaluation, aggregate report drafting (PSUR/PBRER), and regulatory medical writing."
      },
      {
        step: 2,
        title: "Bridge Clinical Knowledge with Database Fluency",
        description: "Learn how clinical adverse events translate into E2B(R3) XML structures in Oracle Argus."
      },
      {
        step: 3,
        title: "Build Verifiable Project Portfolio",
        description: "Complete hands-on safety narratives and mock clinical study report summaries."
      }
    ],
    faq: [
      {
        question: "Why should a Pharm.D graduate consider Pharmacovigilance?",
        answer: "PV offers structured career growth into Signal Detection, Medical Review, and Risk Management, leveraging the doctor of pharmacy clinical background."
      }
    ]
  },
  {
    slug: "mpharm",
    degreeName: "M.Pharm (Master of Pharmacy)",
    shortTitle: "M.Pharm Career Pathways",
    metaDescription: "Career pathways for M.Pharm postgraduates. Explore Regulatory Affairs, Pharmacovigilance, and Clinical Data Management.",
    overview: "M.Pharm postgraduates (Pharmacology, Pharmaceutics, Regulatory Affairs) have deep domain expertise. Combining postgraduate specialization with industry database skills opens doors to advanced roles in global pharmaceutical capability centers.",
    typicalDuration: "2 Years Post-B.Pharm",
    coreSubjects: ["Advanced Pharmacology", "Regulatory Affairs & Quality Assurance", "Biostatistics", "Industrial Pharmacy"],
    eligibleRoles: [
      {
        roleName: "Regulatory Affairs Executive",
        roleSlug: "regulatory-affairs",
        fitLevel: "Direct Prerequisite",
        whyFit: "Specialized knowledge in pharmaceutical regulatory documentation accelerates eCTD dossier creation.",
        keySkillsNeeded: ["eCTD Structure (Modules 1-5)", "USFDA 21 CFR Part 314", "EMA Submission Protocols"],
        typicalStartingCtc: "₹4.2L – ₹6.0L"
      },
      {
        roleName: "Senior Drug Safety Specialist",
        roleSlug: "pharmacovigilance-associate",
        fitLevel: "High Alignment",
        whyFit: "Postgraduate pharmacology research background enables comprehensive medical assessment of complex adverse event reports.",
        keySkillsNeeded: ["Oracle Argus Safety", "Signal Detection Methods", "Risk Management Plans (RMP)"],
        typicalStartingCtc: "₹4.5L – ₹6.2L"
      }
    ],
    arzonTrainingTracks: [
      {
        trackName: "Regulatory Affairs & eCTD Filings",
        trackSlug: "regulatory-affairs",
        duration: "12 Weeks (Blended + Applied Internship)",
        keyTools: ["eCTDxpress", "ESG Portal", "FDA Form 356h", "Health Canada Submissions"]
      }
    ],
    eligibilityDisclaimer: "Note: While postgraduates carry strong subject authority, global employers require hands-on software familiarity with regulatory portal submissions.",
    transitionStrategy: [
      {
        step: 1,
        title: "Select Specialized Regulatory or Safety Stream",
        description: "Align your M.Pharm specialization (Pharmacology or Pharmaceutics) with target GCC departments."
      },
      {
        step: 2,
        title: "Master Regional & Global Submission Formats",
        description: "Learn eCTD Module 1 to 5 structure and USFDA/EMA portal guidelines."
      }
    ],
    faq: [
      {
        question: "Is M.Pharm suitable for Regulatory Affairs roles?",
        answer: "Yes, M.Pharm is often the preferred postgraduate qualification for regulatory affairs and submission publishing teams."
      }
    ]
  },
  {
    slug: "bsc-lifesciences",
    degreeName: "B.Sc Life Sciences (Biotech / Biochem / Microbiology)",
    shortTitle: "B.Sc Life Sciences Career Pathways",
    metaDescription: "Career pathways for B.Sc Life Sciences graduates in India. Explore Medical Coding, Clinical Data Management, and Clinical Research.",
    overview: "B.Sc graduates in Biotechnology, Microbiology, Biochemistry, and Zoology have foundational biological science knowledge. Focused practical training in medical coding or clinical data management bridges the gap between general science and specialized healthcare administration.",
    typicalDuration: "3 Years",
    coreSubjects: ["Microbiology", "Biochemistry", "Molecular Biology", "Genetics", "Human Physiology"],
    eligibleRoles: [
      {
        roleName: "Medical Coder (Chart Auditor)",
        roleSlug: "medical-coder",
        fitLevel: "Direct Prerequisite",
        whyFit: "Understanding human anatomy and pathology enables quick learning of ICD-10 medical diagnostic codes.",
        keySkillsNeeded: ["ICD-10-CM Coding", "CPT Modifiers", "Medical Terminology", "HIPAA Rules"],
        typicalStartingCtc: "₹3.2L – ₹4.5L"
      },
      {
        roleName: "Clinical Research Coordinator (CRC)",
        roleSlug: "clinical-research-coordinator",
        fitLevel: "High Alignment",
        whyFit: "Biological science background simplifies clinical protocol understanding and site document management.",
        keySkillsNeeded: ["ICH-GCP Guidelines", "Informed Consent Workflow", "Source Document Verification"],
        typicalStartingCtc: "₹3.5L – ₹4.8L"
      }
    ],
    arzonTrainingTracks: [
      {
        trackName: "Medical Coding & Revenue Cycle Management",
        trackSlug: "medical-coding",
        duration: "12 Weeks (Blended + Applied Internship)",
        keyTools: ["ICD-10-CM", "CPT-4", "EncoderPro", "Optum360"]
      }
    ],
    eligibilityDisclaimer: "Note: B.Sc life science graduates benefit significantly from completing a structured certification and practical internship to meet entry-level IT/Healthcare hiring criteria.",
    transitionStrategy: [
      {
        step: 1,
        title: "Build Core Healthcare Software Skills",
        description: "Supplement your science degree with specialized medical coding or clinical trial software training."
      },
      {
        step: 2,
        title: "Complete Applied Internship",
        description: "Practice coding live clinical charts under trainer supervision to build confidence."
      }
    ],
    faq: [
      {
        question: "Can B.Sc Biotechnology freshers get jobs in healthcare IT?",
        answer: "Yes. B.Sc Biotech freshers are regularly hired for Medical Coding and Clinical Data Associate roles after practical tool training."
      }
    ]
  },
  {
    slug: "msc-lifesciences",
    degreeName: "M.Sc Life Sciences (Biotech / Microbiology / Clinical Research)",
    shortTitle: "M.Sc Life Sciences Career Pathways",
    metaDescription: "Career options for M.Sc Life Sciences graduates in India. Explore Clinical SAS Programming, Clinical Data Management, and PV.",
    overview: "M.Sc postgraduates bring advanced scientific analytical skills. Postgraduates seeking tech-enabled healthcare careers often excel in Clinical SAS programming, statistical data validation, and clinical data management.",
    typicalDuration: "2 Years Post-B.Sc",
    coreSubjects: ["Advanced Biotechnology", "Biostatistics", "Molecular Genetics", "Immunology", "Research Methodology"],
    eligibleRoles: [
      {
        roleName: "Clinical SAS Programmer",
        roleSlug: "clinical-sas-programmer",
        fitLevel: "High Alignment",
        whyFit: "Strong analytical and biostatistical background accelerates PROC SQL, SDTM domain, and ADAM dataset creation.",
        keySkillsNeeded: ["SAS Base & Macro", "PROC SQL", "CDISC SDTM Mapping", "TLF Generation"],
        typicalStartingCtc: "₹4.8L – ₹7.0L"
      },
      {
        roleName: "Clinical Data Manager (CDM)",
        roleSlug: "clinical-data-associate",
        fitLevel: "Direct Prerequisite",
        whyFit: "Comprehensive scientific training supports complex eCRF design, query management, and database lock procedures.",
        keySkillsNeeded: ["Medidata RAVE", "Oracle InForm", "Data Management Plan (DMP)", "Discrepancy Management"],
        typicalStartingCtc: "₹4.0L – ₹5.8L"
      }
    ],
    arzonTrainingTracks: [
      {
        trackName: "Healthcare Data Analytics (Clinical SAS)",
        trackSlug: "healthcare-analytics",
        duration: "12 Weeks (Blended + Applied Internship)",
        keyTools: ["SAS University / Studio", "PROC SQL", "CDISC SDTM/ADaM", "R/Python"]
      }
    ],
    eligibilityDisclaimer: "Note: M.Sc postgraduates command higher starting salary bands when equipped with CDISC SDTM standards and clinical programming skills.",
    transitionStrategy: [
      {
        step: 1,
        title: "Select Clinical Data or Programming Stream",
        description: "Determine whether you prefer clinical database management or statistical programming with SAS."
      },
      {
        step: 2,
        title: "Master CDISC Industry Standards",
        description: "Learn SDTM mapping, ADaM data structures, and TLF (Tables, Listings, Figures) generation."
      }
    ],
    faq: [
      {
        question: "Is Clinical SAS suitable for M.Sc freshers?",
        answer: "Clinical SAS programming offers premium entry-level starting CTCs for analytical M.Sc freshers across pharmaceutical GCCs."
      }
    ]
  }
];

export function getDegreePathway(slug: string): DegreePathway | undefined {
  return DEGREE_PATHWAYS.find((d) => d.slug.toLowerCase() === slug.toLowerCase());
}
