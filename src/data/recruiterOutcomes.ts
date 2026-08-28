/**
 * What a recruiter actually receives when an Arzon graduate applies.
 * Each row maps a concrete recruiter pain to the artefact our cohort
 * ships on Day 1 — no vague "soft skills" claims. Consumed by
 * `RecruiterOutcomes.tsx`.
 */
export type RecruiterOutcome = {
  pain: string;
  delivers: string;
  artifact: string;
};

export const RECRUITER_OUTCOMES: RecruiterOutcome[] = [
  {
    pain: "6-week ramp on Argus Safety",
    delivers: "Pre-trained on Argus 8.x case-entry workflow",
    artifact: "50-case processing log (PDF)",
  },
  {
    pain: "MedDRA coding errors in first month",
    delivers: "Hands-on MedDRA / WHO-DD coding practice",
    artifact: "Coded ICSR portfolio (20 cases)",
  },
  {
    pain: "No SOP / GVP literacy",
    delivers: "Reads GVP Module VI, writes case narratives unaided",
    artifact: "Sample CIOMS-I narrative",
  },
  {
    pain: "Communication risk in client calls",
    delivers: "Cleared scenario-based mock interview, English + Hindi",
    artifact: "Mock interview score-card",
  },
  {
    pain: "High fresher attrition (90-day)",
    delivers: "12-week paid bootcamp filters non-committers up front",
    artifact: "Attendance + assignment log shared on request",
  },
  {
    pain: "Verifying claims on a CV",
    delivers: "ISO 9001 certificate with public verifier URL",
    artifact: "Verify by certificate ID, no login",
  },
];
