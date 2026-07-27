import { createServerFn } from "@tanstack/react-start";
import { createSafePublicClient } from "@/lib/supabaseEnv";

export type AcriStats = {
  completedAttempts: number;
  leadsCount: number;
  reliabilityReady: boolean;
  reliabilityThreshold: number;
};

export const fetchAcriStats = createServerFn({ method: "GET" }).handler(
  async (): Promise<AcriStats> => {
    const reliabilityThreshold = 500;
    try {
      const sb = createSafePublicClient();

      // Aggregate counts only; both tables are append-only for completed runs.
      const [{ count: sessions }, { count: leads }] = await Promise.all([
        sb.from("career_engine_sessions").select("id", { count: "exact", head: true }),
        sb.from("career_engine_leads").select("id", { count: "exact", head: true }),
      ]);

      const completedAttempts = sessions ?? 0;
      return {
        completedAttempts,
        leadsCount: leads ?? 0,
        reliabilityReady: completedAttempts >= reliabilityThreshold,
        reliabilityThreshold,
      };
    } catch (err) {
      console.error("[fetchAcriStats] Error, returning fallback:", err);
      return {
        completedAttempts: 0,
        leadsCount: 0,
        reliabilityReady: false,
        reliabilityThreshold,
      };
    }
  },
);
