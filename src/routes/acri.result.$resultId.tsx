import { useState, useMemo } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { AcriCareerIntelligenceReport } from "@/components/acri/assessment/AcriCareerIntelligenceReport";
import type { AcriDecisionResult } from "@/data/acri/acriPvStandard";
import { ACRI_PV_COMPETENCIES } from "@/data/acri/acriPvStandard";
import { pageSeo } from "@/lib/seo";
import { getAcriResultById, getLatestAcriResult, AcriSavedResult } from "@/lib/acri/acriCandidateStore";

const resultSearchSchema = z.object({
  score: z.coerce.number().optional(),
  name: z.string().optional(),
  college: z.string().optional(),
  qualification: z.string().optional(),
  mode: z.enum(["certified", "practice"]).optional(),
});

export const Route = createFileRoute("/acri/result/$resultId")({
  validateSearch: (input) => resultSearchSchema.parse(input),
  head: () => {
    const ps = pageSeo({
      path: "/acri/result",
      title: "ACRI Career Intelligence Report · Arzon Global",
      description:
        "Official ACRI Pharmacovigilance readiness intelligence report and competency profile.",
      noindex: true,
    });
    return {
      meta: [
        { title: "ACRI Career Intelligence Report · Arzon Global" },
        { name: "robots", content: "noindex,nofollow" },
        ...ps.meta,
      ],
      links: ps.links,
    };
  },
  component: AcriResultPage,
});

function createDefaultCalibratedResult(scoreTarget: number = 78): AcriDecisionResult {
  const is92 = scoreTarget >= 85;

  const dimensionScores: Record<string, number> = is92
    ? {
        pvFundamentals: 82,
        icsrProcessing: 92,
        caseAssessment: 100,
        medicalInterpretation: 82,
        meddraCoding: 100,
        documentation: 99,
        qualityCompliance: 100,
        analyticalReasoning: 100,
        situationalJudgment: 30,
      }
    : {
        caseAssessment: 100,
        documentation: 100,
        analyticalReasoning: 100,
        icsrProcessing: 84,
        pvFundamentals: 82,
        medicalInterpretation: 82,
        qualityCompliance: 67,
        situationalJudgment: 45,
        meddraCoding: 0,
      };

  return {
    decision: is92 ? "Industry Ready" : "Readiness Gap Identified",
    compositeScore: scoreTarget,
    passedGates: is92,
    failedGates: [],
    dimensionScores,
    strengths: [
      { dimension: ACRI_PV_COMPETENCIES.caseAssessment, score: 100 },
      { dimension: ACRI_PV_COMPETENCIES.documentation, score: is92 ? 99 : 100 },
      { dimension: ACRI_PV_COMPETENCIES.analyticalReasoning, score: 100 },
    ],
    developmentGaps: [
      {
        dimension: ACRI_PV_COMPETENCIES.meddraCoding,
        score: is92 ? 100 : 0,
        gap: is92 ? 0 : 75,
      },
      {
        dimension: ACRI_PV_COMPETENCIES.situationalJudgment,
        score: is92 ? 30 : 45,
        gap: 30,
      },
    ],
    tailoredRemediation: [
      "MedDRA hierarchy navigation drills",
      "Expedited reporting 7-day vs 15-day timeline protocols",
      "High-pressure situational triage decision drills",
    ],
  };
}

function AcriResultPage() {
  const { resultId } = Route.useParams();
  const search = Route.useSearch();
  const navigate = useNavigate();

  // Attempt to load from stored persistent results
  const savedResult: AcriSavedResult | null = useMemo(() => {
    return getAcriResultById(resultId) || getLatestAcriResult();
  }, [resultId]);

  const candidateScore = search.score ?? savedResult?.score ?? 78;
  const candidateName = search.name || savedResult?.candidateName || "Rahul Bathula";
  const candidateCollege = search.college || savedResult?.college || "JSS College of Pharmacy";
  const candidateQualification = search.qualification || savedResult?.qualification || "B.Pharm (Bachelor of Pharmacy)";
  const mode = search.mode || savedResult?.mode || "certified";
  const credentialId = savedResult?.credentialId || `AZ-ACRI-EVAL-403067`;
  const assessmentDate = savedResult?.completedAt || "24 Sep 2026";

  const resultData: AcriDecisionResult = useMemo(() => {
    if (savedResult?.dimensionScores) {
      return {
        decision: savedResult.decision,
        compositeScore: savedResult.score,
        passedGates: savedResult.passedGates,
        failedGates: [],
        dimensionScores: savedResult.dimensionScores,
        strengths: [
          { dimension: ACRI_PV_COMPETENCIES.caseAssessment, score: savedResult.dimensionScores.caseAssessment ?? 100 },
          { dimension: ACRI_PV_COMPETENCIES.documentation, score: savedResult.dimensionScores.documentation ?? 100 },
          { dimension: ACRI_PV_COMPETENCIES.analyticalReasoning, score: savedResult.dimensionScores.analyticalReasoning ?? 100 },
        ],
        developmentGaps: [
          {
            dimension: ACRI_PV_COMPETENCIES.meddraCoding,
            score: savedResult.dimensionScores.meddraCoding ?? 0,
            gap: 75,
          },
        ],
        tailoredRemediation: [
          "MedDRA hierarchy navigation drills",
          "Expedited reporting 7-day vs 15-day timeline protocols",
          "High-pressure situational triage decision drills",
        ],
      };
    }
    return createDefaultCalibratedResult(candidateScore);
  }, [savedResult, candidateScore]);

  return (
    <div className="relative">
      <AcriCareerIntelligenceReport
        result={resultData}
        mode={mode}
        candidateName={candidateName}
        candidateCollege={candidateCollege}
        candidateQualification={candidateQualification}
        credentialId={credentialId}
        assessmentDate={assessmentDate}
        onRetake={() => navigate({ to: "/career-engine/test" })}
      />
    </div>
  );
}
