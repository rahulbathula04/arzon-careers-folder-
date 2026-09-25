import type { AcriDecisionResult } from "@/data/acri/acriPvStandard";
import { AcriCareerIntelligenceReport } from "./AcriCareerIntelligenceReport";

export interface AcriResultScorecardProps {
  result: AcriDecisionResult;
  onRetake: () => void;
  onViewCertificate?: () => void;
  onViewReport?: () => void;
  mode?: "certified" | "practice";
  candidateName?: string;
  assessmentDate?: string;
}

export function AcriResultScorecard(props: AcriResultScorecardProps) {
  return <AcriCareerIntelligenceReport {...props} />;
}
