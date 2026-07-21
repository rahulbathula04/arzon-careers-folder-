import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const getMyEnrolments = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data, error } = await supabase
      .from("enrolments")
      .select("id, tier, cohort_id, status, amount_inr, paid_at, provisioned_at, email")
      .eq("user_id", userId)
      .order("paid_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const getMySubmissions = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data, error } = await supabase
      .from("submissions")
      .select("id, enrolment_id, title, status, submitted_at, reviewed_at, mentor_feedback")
      .eq("user_id", userId)
      .order("submitted_at", { ascending: false })
      .limit(50);
    if (error) throw new Error(error.message);
    return data ?? [];
  });
