import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { CareerEngineResult } from "@/data/careerEngineScoring";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const generateAtsResume = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => z.object({ result: z.any() }).parse(data))
  .handler(async ({ data }) => {
    const result = data.result as CareerEngineResult;

    const skillGaps = result.aiAnalysis?.skillGaps ?? [];
    const readiness = result.aiAnalysis?.industryReadiness ?? 50;

    const atsScore = Math.min(100, Math.round(readiness * 0.7 + (result.microAccuracy ?? 0) * 0.3));

    const resumeJson = {
      summary: `A detail-oriented candidate targeting ${result.archetype.topPaths[0]?.title ?? "Healthcare"} roles. Profile aligns with ${result.archetype.name} archetype.`,
      skills: Object.entries(result.traitScores)
        .filter(([_, score]) => score > 0)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([trait]) => trait),
      gapsToAddress: skillGaps,
      atsScore,
    };

    return { ok: true as const, resume: resumeJson };
  });
