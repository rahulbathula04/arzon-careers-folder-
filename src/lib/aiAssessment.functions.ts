import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { evaluateCandidatePortfolio, type CandidateSubmission, type AiAssessmentResult } from "./aiAssessmentEngine";

const submissionSchema = z.object({
  candidateId: z.string().optional(),
  candidateName: z.string().optional(),
  candidatePhone: z.string().optional(),
  qualification: z.string().optional(),
  targetTrack: z.string().optional(),
  pvScore: z.number().optional(),
  codingScore: z.number().optional(),
  cdmScore: z.number().optional(),
  sasScore: z.number().optional(),
  regWritingScore: z.number().optional(),
});

export const evaluateCandidateFn = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => submissionSchema.parse(data))
  .handler(async ({ data }): Promise<AiAssessmentResult> => {
    // Run automated deterministic & AI evaluation heuristics
    return evaluateCandidatePortfolio(data as CandidateSubmission);
  });
