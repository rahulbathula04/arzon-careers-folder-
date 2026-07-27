import { g as generateObject } from "../_libs/ai.mjs";
import { o as openai } from "../_libs/ai-sdk__openai.mjs";
import { p as objectType, x as numberType, q as stringType, C as arrayType } from "../_libs/zod.mjs";
import "../_libs/ai-sdk__gateway.mjs";
import "../_libs/ai-sdk__provider-utils.mjs";
import "../_libs/ai-sdk__provider.mjs";
import "../_libs/eventsource-parser.mjs";
import "../_libs/@vercel/oidc.mjs";
import "path";
import "fs";
import "os";
import "../_libs/react.mjs";
import "../_libs/workflow__serde.mjs";
const aiAnalysisSchema = objectType({
  skillGaps: arrayType(stringType()).max(5).describe("List of 3-5 weak skills identified from the assessment."),
  studyPlan: arrayType(
    objectType({
      week: numberType(),
      focus: stringType(),
      description: stringType()
    })
  ).max(6).describe("A 6-week progressive study plan tailored to the candidate's gaps."),
  estimatedSalary: stringType().describe("Estimated starting salary based on the chosen path (e.g., '₹4.5L')"),
  industryReadiness: numberType().min(0).max(100).describe("A percentage indicating how ready they are for the industry right now.")
});
async function generateAIAnalysis(result) {
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
    temperature: 0.3
  });
  return object;
}
export {
  generateAIAnalysis
};
