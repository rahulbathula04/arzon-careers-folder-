import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { CareerEngineResult } from "@/data/careerEngineScoring";

// We need a permissive schema since CareerEngineResult is quite large.
// We can just cast it internally or redefine the z.object.
const inputSchema = z.object({
  result: z.any(),
});

export const getAIAnalysis = createServerFn({ method: "POST" })
  .inputValidator((i: unknown) => inputSchema.parse(i))
  .handler(async ({ data }) => {
    try {
      const { generateAIAnalysis } = await import("./careerEngine/llm.server");
      const analysis = await generateAIAnalysis(data.result as CareerEngineResult);
      return { ok: true as const, analysis };
    } catch (e) {
      console.error("AI Analysis failed:", e);
      return { ok: false as const, error: "Failed to generate AI analysis." };
    }
  });
