// import "server-only"; (Removed to fix TanStack Start client bundle crash)
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import type { CareerEngineResult, AIAnalysisResult } from "@/data/careerEngineScoring";

const aiAnalysisSchema = z.object({
  skillGaps: z
    .array(z.string())
    .max(5)
    .describe("List of 3-5 weak skills identified from the assessment."),
  studyPlan: z
    .array(
      z.object({
        week: z.number(),
        focus: z.string(),
        description: z.string(),
      }),
    )
    .max(6)
    .describe("A 6-week progressive study plan tailored to the candidate's gaps."),
  estimatedSalary: z
    .string()
    .describe("Estimated starting salary based on the chosen path (e.g., '₹4.5L')"),
  industryReadiness: z
    .number()
    .min(0)
    .max(100)
    .describe("A percentage indicating how ready they are for the industry right now."),
});

export async function generateAIAnalysis(result: CareerEngineResult): Promise<AIAnalysisResult> {
  const prompt = `
    You are an expert Healthcare/Tech Career Coach.
    Analyze the following candidate's assessment results and generate a personalized skill gap analysis and 6-week study plan.
    
    Candidate's Top Path: ${result.archetype.name}
    Top Path Target: ${result.archetype.topPaths[0]?.title ?? "Healthcare Data"}
    Trait Scores: ${JSON.stringify(result.traitScores)}
    Micro-accuracy (Aptitude test): ${result.microAccuracy}%
    
    Based on their trait scores, identify 3-5 weak skills (e.g., if 'detail' is low, they need 'Attention to Detail').
    Create a practical 6-week study plan to prepare them for their Top Path.
  `;

  const { object } = await generateObject({
    model: openai("gpt-4o-mini"),
    schema: aiAnalysisSchema,
    prompt,
    temperature: 0.3,
  });

  return object;
}
