/**
 * report/progress.functions — read + upsert per-user report state
 * (role-fit quiz answers + employer apply tracker) so a signed-in
 * reader can resume across sessions and devices.
 */
import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export interface ReportProgressPayload {
  quizProfile: any;
  employerTracker: Record<string, any>;
  updatedAt: string | null;
}

export const getReportProgress = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<ReportProgressPayload> => {
    const { data, error } = await context.supabase
      .from("report_progress")
      .select("quiz_profile, employer_tracker, updated_at")
      .eq("user_id", context.userId)
      .maybeSingle();
    if (error) throw error;
    return {
      quizProfile: (data?.quiz_profile as any) ?? null,
      employerTracker: (data?.employer_tracker as Record<string, any>) ?? {},
      updatedAt: data?.updated_at ?? null,
    };
  });

export const upsertReportProgress = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { quizProfile: any; employerTracker: Record<string, any> }) => {
    if (!input || typeof input !== "object") throw new Error("Invalid payload");
    const tracker = input.employerTracker;
    if (tracker && typeof tracker !== "object") throw new Error("Invalid tracker");
    return {
      quizProfile: input.quizProfile ?? null,
      employerTracker: tracker ?? {},
    };
  })
  .handler(async ({ data, context }): Promise<{ ok: true; updatedAt: string }> => {
    const { data: row, error } = await context.supabase
      .from("report_progress")
      .upsert(
        {
          user_id: context.userId,
          quiz_profile: data.quizProfile,
          employer_tracker: data.employerTracker,
          updated_at: new Date().toISOString(),
        } as any,
        { onConflict: "user_id" },
      )
      .select("updated_at")
      .single();
    if (error) throw error;
    return { ok: true, updatedAt: row.updated_at as string };
  });
