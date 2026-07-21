/**
 * Career Families — groups roles by the healthcare career family they
 * belong to. Each family carries an ordered ladder of roles defined in
 * `careerRoles.ts`, plus eligibility blockers + bridges ("what to do
 * instead") for students whose degree rules out the family.
 */

export type FamilyId =
  | "drug-safety"
  | "clinical-data"
  | "regulatory"
  | "medical-coding"
  | "health-analytics-ai"
  | "commercial-healthcare";

export interface FamilyBridge {
  label: string;
  familyId?: FamilyId;
  why: string;
}

export interface CareerFamily {
  id: FamilyId;
  name: string;
  description: string;
  primaryPathSlug: string;
  alsoIncludes?: string[];
  eligibility: {
    required?: string[];
    preferred?: string[];
    blockers?: string[];
  };
  /** Plain-English explanation shown when a student is blocked. */
  blockerExplain?: string;
  /** "What to do instead" — alternate routes for blocked students. */
  bridges?: FamilyBridge[];
  /** One-line day-in-the-life used in the family overview card. */
  dayInLife?: string;
}

export const FAMILIES: Record<FamilyId, CareerFamily> = {
  "drug-safety": {
    id: "drug-safety",
    name: "Drug Safety & Compliance",
    description:
      "Catch, document and report what drugs do to people. Reading-heavy, regulator-facing.",
    primaryPathSlug: "pharmacovigilance",
    eligibility: {
      required: ["B.Pharm", "PharmD", "M.Pharm"],
      preferred: ["BSc Life Sciences", "BSc Nursing", "MBBS", "BDS"],
      blockers: ["B.Com", "BBA"],
    },
    blockerExplain:
      "Drug-safety case processing is regulated. Most employers (IQVIA, Cognizant, Accenture, Parexel) require a life-sciences or pharma degree because case reviewers sign off as scientifically qualified.",
    bridges: [
      {
        label: "Pivot to Commercial Healthcare",
        familyId: "commercial-healthcare",
        why: "Pharma commercial teams hire BBA/B.Com graduates aggressively into MR and CSM roles.",
      },
      {
        label: "Add a 6-month Clinical Research diploma",
        why: "ICRI/CDSA diplomas sometimes bridge a non-life-sciences UG for entry-level safety associate roles at CROs.",
      },
    ],
    dayInLife:
      "Read case safety reports → code adverse events in MedDRA → write narratives → submit to regulators on tight timelines.",
  },
  "clinical-data": {
    id: "clinical-data",
    name: "Clinical Data",
    description: "Own the data behind every trial — clean, query, lock, programme the analyses.",
    primaryPathSlug: "clinical-data-management",
    alsoIncludes: ["sas-clinical"],
    eligibility: {
      required: ["B.Pharm", "BSc Life Sciences", "B.Tech (Bio/IT)"],
      preferred: ["PharmD", "MSc", "BCA"],
    },
    bridges: [
      {
        label: "Move into Health Analytics & AI",
        familyId: "health-analytics-ai",
        why: "If you love data more than the trial domain, BA/analyst roles pay better and hire from any UG with SQL.",
      },
    ],
    dayInLife:
      "Review trial data in EDC tools → raise queries → liaise with sites → lock the database before stat. analysis.",
  },
  regulatory: {
    id: "regulatory",
    name: "Regulatory Affairs",
    description:
      "Build the dossier between drug and regulator. Long documents, high compliance bar.",
    primaryPathSlug: "regulatory-affairs",
    eligibility: {
      required: ["B.Pharm", "M.Pharm", "PharmD"],
      preferred: ["BSc Life Sciences", "MBBS"],
      blockers: ["B.Com", "BBA", "BA"],
    },
    blockerExplain:
      "Regulatory submissions must be authored by someone the regulator recognises as scientifically qualified. Indian and US/EU dossiers specifically name pharma/life-sciences degrees in the qualification clause.",
    bridges: [
      {
        label: "Pivot to Commercial Healthcare",
        familyId: "commercial-healthcare",
        why: "Pharma sales and key account roles welcome BBA/B.Com graduates.",
      },
      {
        label: "Add an M.Pharm or PG diploma in Regulatory",
        familyId: "regulatory",
        why: "A PG bridges the qualification gap for industry-entry RA roles.",
      },
    ],
    dayInLife:
      "Author CMC / labeling / clinical sections → respond to health-authority queries → manage submission timelines across markets.",
  },
  "medical-coding": {
    id: "medical-coding",
    name: "Medical Coding & HIM",
    description:
      "Translate clinical care into ICD/CPT codes for US/EU payers. Desk-heavy, night shift common.",
    primaryPathSlug: "medical-coding",
    eligibility: {
      required: ["BSc Life Sciences", "BSc Nursing", "B.Pharm", "PharmD"],
      preferred: ["BPT", "BHMS", "BAMS", "BDS"],
    },
    bridges: [
      {
        label: "Move into Drug Safety",
        familyId: "drug-safety",
        why: "Same desk-based, documentation-heavy work — but day-shift-friendly and pharma-side.",
      },
    ],
    dayInLife:
      "Read patient charts → assign ICD-10-CM / CPT / HCPCS codes → meet daily chart quotas with audit-grade accuracy.",
  },
  "health-analytics-ai": {
    id: "health-analytics-ai",
    name: "Health Analytics & AI",
    description:
      "Programme analyses, build models, and ship AI tools for clinical and payer workflows.",
    primaryPathSlug: "ai-intelligence",
    alsoIncludes: ["business-analyst", "software-engineer"],
    eligibility: {
      required: ["B.Tech", "B.E.", "BCA", "MCA"],
      preferred: ["B.Pharm", "BSc Stats/Maths"],
    },
    bridges: [
      {
        label: "Start in Clinical Data, grow into Analytics",
        familyId: "clinical-data",
        why: "CDM → CDISC → Stat. Programmer is a real path if your UG isn't tech.",
      },
    ],
    dayInLife:
      "SQL + Python in the morning, dashboard or model in the afternoon, stand-up with the clinical team to validate the output.",
  },
  "commercial-healthcare": {
    id: "commercial-healthcare",
    name: "Commercial Healthcare",
    description:
      "Customer-facing roles at clinical SaaS, pharma commercial and health-tech. People + systems hybrid.",
    primaryPathSlug: "clinical-saas",
    alsoIncludes: ["b2b-saas-sales"],
    eligibility: {
      required: ["BBA", "B.Com", "any UG"],
      preferred: ["B.Pharm", "BSc"],
    },
    bridges: [
      {
        label: "Move into Drug Safety if you prefer desk work",
        familyId: "drug-safety",
        why: "If you have a B.Pharm and people-facing work drains you, safety associate is a calmer fit.",
      },
    ],
    dayInLife:
      "Customer calls, demos, account reviews — every week, a renewal or quota number to hit.",
  },
};

/** Look up a family by its anchor path slug. */
export function familyForPathSlug(slug: string): CareerFamily | null {
  for (const f of Object.values(FAMILIES)) {
    if (f.primaryPathSlug === slug) return f;
    if (f.alsoIncludes?.includes(slug)) return f;
  }
  return null;
}

/** All path slugs inside a family, in display order. */
export function pathSlugsInFamily(f: CareerFamily): string[] {
  return [f.primaryPathSlug, ...(f.alsoIncludes ?? [])];
}

/** Cheap eligibility check against a student's `course` profile answer. */
export function eligibilityFitForCourse(
  family: CareerFamily,
  course: string | undefined,
): { tier: "required" | "preferred" | "blocker" | "unknown"; note: string } {
  if (!course) return { tier: "unknown", note: "Course not specified" };
  const lc = course.toLowerCase();
  const match = (list?: string[]) => list?.some((d) => lc.includes(d.toLowerCase().split(" ")[0]));
  if (match(family.eligibility.blockers)) {
    return { tier: "blocker", note: `${course} is not the typical entry path here.` };
  }
  if (match(family.eligibility.required)) {
    return { tier: "required", note: `${course} is a strong fit on eligibility.` };
  }
  if (match(family.eligibility.preferred)) {
    return { tier: "preferred", note: `${course} is an accepted entry path.` };
  }
  return { tier: "unknown", note: `${course} — entry varies; check role JDs.` };
}
