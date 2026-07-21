import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type RecruiterViewsPayload = {
  week: number;
  total: number;
  trendVsLastWeek: number; // signed integer
  actions: string[];
};

export const RECRUITER_ACTIONS: string[] = [
  "Complete one more learning module to raise your industry readiness score.",
  "Publish an ASSAY artefact — recruiters filter by verified work samples.",
  "Add your cohort tag and target city so recruiters can shortlist you.",
  "Boost your Deployment Score by addressing the skill gaps identified by our AI.",
];

export const getRecruiterViews = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<RecruiterViewsPayload> => {
    const { supabase, userId } = context;
    const now = Date.now();
    const weekAgo = new Date(now - 7 * 24 * 60 * 60 * 1000).toISOString();
    const twoWeeksAgo = new Date(now - 14 * 24 * 60 * 60 * 1000).toISOString();

    const [totalRes, weekRes, prevRes] = await Promise.all([
      supabase
        .from("recruiter_profile_views")
        .select("id", { count: "exact", head: true })
        .eq("user_id", userId),
      supabase
        .from("recruiter_profile_views")
        .select("id", { count: "exact", head: true })
        .eq("user_id", userId)
        .gte("viewed_at", weekAgo),
      supabase
        .from("recruiter_profile_views")
        .select("id", { count: "exact", head: true })
        .eq("user_id", userId)
        .gte("viewed_at", twoWeeksAgo)
        .lt("viewed_at", weekAgo),
    ]);

    if (totalRes.error) throw totalRes.error;
    if (weekRes.error) throw weekRes.error;
    if (prevRes.error) throw prevRes.error;

    const week = weekRes.count ?? 0;
    const prev = prevRes.count ?? 0;

    return {
      week,
      total: totalRes.count ?? 0,
      trendVsLastWeek: week - prev,
      actions: RECRUITER_ACTIONS,
    };
  });
