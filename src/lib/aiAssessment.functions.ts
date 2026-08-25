import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { evaluateCandidatePortfolio, type CandidateSubmission, type AiAssessmentResult } from "./aiAssessmentEngine";

const submissionSchema = z.object({
  candidateId: z.string().optional(),
  candidateName: z.string().optional(),
  githubRepoUrl: z.string().optional(),
  githubCommitCount: z.number().optional(),
  testCoveragePercent: z.number().optional(),
  hackerRankScore: z.number().optional(),
  dsaComplexityScore: z.number().optional(),
  mlModelAccuracy: z.number().optional(),
  mlModelLatencyMs: z.number().optional(),
  hasDockerConfig: z.boolean().optional(),
  hasCIWorkflow: z.boolean().optional(),
  hasDocumentation: z.boolean().optional(),
});

export const evaluateCandidateFn = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => submissionSchema.parse(data))
  .handler(async ({ data }): Promise<AiAssessmentResult> => {
    // Run automated deterministic & AI evaluation heuristics
    return evaluateCandidatePortfolio(data as CandidateSubmission);
  });
