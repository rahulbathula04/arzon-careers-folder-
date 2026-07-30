import type { CourseCategory } from "@/data/courses";

export interface GapPair {
  rejected: string;
  hired: string;
}

/** Beat 03 fallback - category-keyed "what recruiters reject vs hire" pairs.
 *  Used when a course doesn't supply jd.commonGaps. */
export const COMMON_GAPS_BY_CATEGORY: Record<CourseCategory, GapPair[]> = {
  "Pharmacy & Life Sciences": [
    {
      rejected: "“I studied PV theory in college.”",
      hired: "“I’ve processed 40+ ICSRs in Argus with E2B(R3) export.”",
    },
    {
      rejected: "“I know MedDRA exists.”",
      hired: "“I coded 120 adverse events to LLT/PT with seriousness logic.”",
    },
    {
      rejected: "“I can learn the SOP.”",
      hired: "“I followed the IQVIA case-intake SOP end-to-end on a real batch.”",
    },
  ],
  "Tech Programmes": [
    {
      rejected: "“I built a to-do app in college.”",
      hired: "“I shipped a load-tested payments microservice with CI/CD.”",
    },
    {
      rejected: "“I know React.”",
      hired: "“I refactored a production component tree and cut TTI by 38%.”",
    },
    {
      rejected: "“I can solve LeetCode mediums.”",
      hired: "“I debugged a flaky integration test that blocked release.”",
    },
  ],
  "Commerce & Marketing": [
    {
      rejected: "“I ran my college fest Instagram.”",
      hired: "“I scaled a D2C brand from ₹2L to ₹14L MRR in 90 days.”",
    },
    {
      rejected: "“I know Excel.”",
      hired: "“I modelled a CAC-LTV cohort and presented to the founder.”",
    },
    {
      rejected: "“I’m a fast learner.”",
      hired: "“I owned the weekly P&L review and flagged a margin leak.”",
    },
  ],
};
