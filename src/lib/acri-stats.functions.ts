import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";

/**
 * Public ACRI calibration stats. Returns aggregate counts only — no PII,
 * no per-user data. Powers the honesty block on /acri.
 */
function pub() {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, {
    auth: { persistSession: false },
  });
}

export type AcriStats = {
  completedAttempts: number;
  leadsCount: number;
  reliabilityReady: boolean;
  reliabilityThreshold: number;
};

export const fetchAcriStats = createServerFn({ method: "GET" }).handler(
  async (): Promise<AcriStats> => {
    const sb = pub();
    const reliabilityThreshold = 500;

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
  },
);
