import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type WeeklyGoalPayload = {
  task: string;
  done: boolean;
  weekStart: string; // ISO date (yyyy-mm-dd), Monday
  moduleId: string | null;
  moduleSlug: string | null;
};

// Monday-start week, ISO date string yyyy-mm-dd.
function currentWeekStart(): string {
  const now = new Date();
  const day = now.getUTCDay(); // 0 Sun .. 6 Sat
  const diff = (day + 6) % 7; // days since Monday
  const monday = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - diff),
  );
  return monday.toISOString().slice(0, 10);
}

async function pickCurrentModule(
  supabase: import("@supabase/supabase-js").SupabaseClient,
  userId: string,
) {
  const [catalogRes, progressRes] = await Promise.all([
    supabase
      .from("learning_modules")
      .select("id, slug, title, minutes, sort_order")
      .order("sort_order"),
    supabase.from("student_module_progress").select("module_id, status").eq("user_id", userId),
  ]);
  const doneIds = new Set(
    (progressRes.data ?? []).filter((p) => p.status === "done").map((p) => p.module_id),
  );
  const next = (catalogRes.data ?? []).find((m) => !doneIds.has(m.id));
  return next ?? null;
}

function taskFor(mod: { title: string; minutes: number } | null) {
  if (!mod) return "Reflect on your career fit report and jot down one strength + one gap.";
  return `Finish "${mod.title}" - about ${mod.minutes} min. Mark it done by Sunday.`;
}

export const getWeeklyGoal = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<WeeklyGoalPayload> => {
    const { supabase, userId } = context;
    const weekStart = currentWeekStart();

    const { data: existing, error: readErr } = await supabase
      .from("student_weekly_goals")
      .select("id, task, done, module_id")
      .eq("user_id", userId)
      .eq("week_start", weekStart)
      .maybeSingle();
    if (readErr) throw readErr;

    if (existing) {
      let slug: string | null = null;
      if (existing.module_id) {
        const { data: mod } = await supabase
          .from("learning_modules")
          .select("slug")
          .eq("id", existing.module_id)
          .maybeSingle();
        slug = mod?.slug ?? null;
      }
      return {
        task: existing.task,
        done: existing.done,
        weekStart,
        moduleId: existing.module_id,
        moduleSlug: slug,
      };
    }

    // Auto-generate from the student's current module.
    const mod = await pickCurrentModule(supabase, userId);
    const task = taskFor(mod);
    const { data: inserted, error: insertErr } = await supabase
      .from("student_weekly_goals")
      .insert({
        user_id: userId,
        week_start: weekStart,
        module_id: mod?.id ?? null,
        task,
        done: false,
      })
      .select("id, task, done, module_id")
      .single();
    if (insertErr) throw insertErr;

    return {
      task: inserted.task,
      done: inserted.done,
      weekStart,
      moduleId: inserted.module_id,
      moduleSlug: mod?.slug ?? null,
    };
  });

export const toggleWeeklyGoal = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { done: boolean }) => input)
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    const weekStart = currentWeekStart();
    const { error } = await supabase
      .from("student_weekly_goals")
      .update({ done: data.done, updated_at: new Date().toISOString() })
      .eq("user_id", userId)
      .eq("week_start", weekStart);
    if (error) throw error;
    return { ok: true };
  });
