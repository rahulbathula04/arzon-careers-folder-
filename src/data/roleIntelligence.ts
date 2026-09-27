import type { CareerRole } from "./careerRoles";

export interface RoleIntelligence {
  roleSlug: string;
  whatIsThisRole: string;
  dayToDay: string[];
  employerRequirements: string[];
  tools: string[];
  eligibility: string[];
  skillGaps: string[];
  whatNext: string[];
  relatedRoles: string[];
  programmeSlug: string;
  programmeLabel: string;
  marketContext: string;
}

export const ROLE_INTELLIGENCE: Record<string, RoleIntelligence> = {
  "pv-associate": {
    roleSlug: "pv-associate",
    whatIsThisRole:
      "A PV Associate processes and reviews individual case safety reports, codes clinical information, writes case narratives, follows up for missing information, and works within pharmacovigilance procedures and timelines.",
    dayToDay: [
      "Review adverse-event source information and identify the reportable safety case.",
      "Enter and review patient, product, event, and reporter information in a safety database.",
      "Apply MedDRA coding conventions and maintain case consistency.",
      "Write or update the clinical case narrative and document follow-up.",
      "Perform quality checks and route cases through the required review workflow.",
    ],
    employerRequirements: [
      "Working knowledge of pharmacovigilance and ICSR case processing.",
      "Medical terminology and basic clinical interpretation.",
      "MedDRA coding concepts and accurate documentation.",
      "Awareness of GVP and case-processing timelines.",
      "Clear written communication and strong attention to detail.",
    ],
    tools: ["Oracle Argus Safety", "ARISg", "MedDRA", "WHO Drug Dictionary", "Excel"],
    eligibility: [
      "Common backgrounds include B.Pharm, M.Pharm, Pharm.D and related life-science degrees.",
      "Entry-level roles may differ by employer, project, location and shift requirements.",
    ],
    skillGaps: [
      "ICSR case-processing workflow",
      "MedDRA coding practice",
      "Safety-database workflow",
      "Narrative writing and case follow-up",
    ],
    whatNext: [
      "Check your current fit against the role requirements.",
      "Use the Career Engine to identify your strongest role family and gaps.",
      "Close the highest-priority PV skill gaps with practical case exercises.",
    ],
    relatedRoles: ["drug-safety-associate", "senior-pv-associate", "signal-detection-associate"],
    programmeSlug: "pharmacovigilance",
    programmeLabel: "Pharmacovigilance",
    marketContext:
      "Arzon's current role catalogue records this as an entry-level PV role. The linked JD evidence is refreshed for the Jan-Jun 2026 observation window.",
  },
  "medical-coder": {
    roleSlug: "medical-coder",
    whatIsThisRole:
      "A Medical Coder reviews clinical documentation and assigns standard diagnosis and procedure codes used in US healthcare reimbursement and reporting workflows.",
    dayToDay: [
      "Read physician notes, discharge summaries, operative reports, and related documentation.",
      "Identify diagnoses, procedures, conditions, and documented clinical details that affect coding.",
      "Assign appropriate ICD-10-CM, CPT and HCPCS Level II codes according to coding guidelines.",
      "Apply documentation, modifier, and compliance rules where applicable.",
      "Review coding accuracy and resolve documentation or coding queries.",
    ],
    employerRequirements: [
      "Strong medical terminology, anatomy and pathology fundamentals.",
      "Working knowledge of ICD-10-CM, CPT and HCPCS Level II.",
      "Understanding of coding guidelines and compliance concepts.",
      "Ability to interpret clinical documentation accurately.",
      "Consistent production quality, attention to detail and written communication.",
    ],
    tools: ["ICD-10-CM", "CPT", "HCPCS Level II", "Encoder / coding software", "EHR documentation"],
    eligibility: [
      "Common entry backgrounds include pharmacy, life sciences, nursing and related healthcare degrees.",
      "Certification requirements vary by employer and role, so candidates should verify the current job description.",
    ],
    skillGaps: [
      "ICD-10-CM diagnosis coding",
      "CPT procedure coding",
      "HCPCS Level II",
      "E/M and modifier application",
      "Coding compliance and audit practice",
    ],
    whatNext: [
      "Check your current fit against the role requirements.",
      "Use the Career Engine to identify your strongest healthcare role family.",
      "Build coding accuracy through documented chart and audit practice before applying.",
    ],
    relatedRoles: ["inpatient-coder", "outpatient-coder", "ed-coder"],
    programmeSlug: "medical-coding",
    programmeLabel: "Medical Coding",
    marketContext:
      "Arzon's current role catalogue records Medical Coder as an entry-level medical-coding pathway. The linked JD evidence is refreshed for the Jan-Jun 2026 observation window.",
  },
};

export function getRoleIntelligence(role: CareerRole): RoleIntelligence {
  const cleanSlug = role.slug.split(".").pop() || role.slug;
  const explicit = ROLE_INTELLIGENCE[cleanSlug];
  if (explicit) return explicit;

  return {
    roleSlug: cleanSlug,
    whatIsThisRole: role.blurb,
    dayToDay: role.skills.map((skill) => `Work involving ${skill} as part of the role's normal operating workflow.`),
    employerRequirements: role.skills,
    tools: role.skills,
    eligibility: role.eligibility?.required || [],
    skillGaps: role.skills,
    whatNext: [
      "Check your current fit against the role requirements.",
      "Use the Career Engine to identify your role fit and current gaps.",
      "Build evidence for the highest-priority skills before applying.",
    ],
    relatedRoles: [],
    programmeSlug: role.learningPathSlug || "pharmacovigilance",
    programmeLabel: role.learningPathSlug || "Recommended programme",
    marketContext: "Role intelligence is being expanded from the core career-role catalogue.",
  };
}
