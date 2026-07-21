import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type Pillar = "Domain" | "Process" | "Tool" | "Workplace";
export type ModuleStatus = "done" | "current" | "locked";

export type LearningModule = {
  id: string;
  slug: string;
  title: string;
  pillar: Pillar;
  minutes: number;
  lift: number;
  gaps: string[];
  deepLink: string;
  status: ModuleStatus;
};

export type LearningPathPayload = {
  modules: LearningModule[];
  currentScore: number;
  targetScore: number;
  projected: number;
};

// Employability score is served by the Career Engine; we keep sensible
// defaults here so the projection UI always has numbers.
const CURRENT_SCORE = 62;
const TARGET_SCORE = 85;

function computeProjected(mods: LearningModule[]) {
  return CURRENT_SCORE + mods.reduce((s, m) => (m.status === "done" ? s : s + m.lift), 0);
}

function assemble(
  catalog: Array<{
    id: string;
    slug: string;
    title: string;
    pillar: string;
    minutes: number;
    lift: number;
    gaps: string[];
    deep_link: string;
    sort_order: number;
  }>,
  progress: Array<{ module_id: string; status: string }>,
): LearningModule[] {
  const byId = new Map(progress.map((p) => [p.module_id, p.status]));
  const sorted = [...catalog].sort((a, b) => a.sort_order - b.sort_order);
  // Find the earliest non-done module -> current; everything after -> locked.
  const firstNonDoneIdx = sorted.findIndex((m) => byId.get(m.id) !== "done");
  return sorted.map((m, idx): LearningModule => {
    const raw = byId.get(m.id);
    let status: ModuleStatus = "locked";
    if (raw === "done") status = "done";
    else if (idx === firstNonDoneIdx) status = "current";
    return {
      id: m.id,
      slug: m.slug,
      title: m.title,
      pillar: m.pillar as Pillar,
      minutes: m.minutes,
      lift: m.lift,
      gaps: m.gaps ?? [],
      deepLink: m.deep_link,
      status,
    };
  });
}

export const getLearningPath = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<LearningPathPayload> => {
    const { supabase, userId } = context;
    const [catalogRes, progressRes] = await Promise.all([
      supabase.from("learning_modules").select("*").order("sort_order"),
      supabase.from("student_module_progress").select("module_id, status").eq("user_id", userId),
    ]);
    if (catalogRes.error) throw catalogRes.error;
    if (progressRes.error) throw progressRes.error;

    const modules = assemble(catalogRes.data ?? [], progressRes.data ?? []);
    return {
      modules,
      currentScore: CURRENT_SCORE,
      targetScore: TARGET_SCORE,
      projected: computeProjected(modules),
    };
  });

export const markModuleComplete = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { moduleId: string }) => input)
  .handler(async ({ context, data }): Promise<LearningPathPayload> => {
    const { supabase, userId } = context;
    const { error } = await supabase.from("student_module_progress").upsert(
      {
        user_id: userId,
        module_id: data.moduleId,
        status: "done",
        completed_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id,module_id" },
    );
    if (error) throw error;

    const [catalogRes, progressRes] = await Promise.all([
      supabase.from("learning_modules").select("*").order("sort_order"),
      supabase.from("student_module_progress").select("module_id, status").eq("user_id", userId),
    ]);
    if (catalogRes.error) throw catalogRes.error;
    if (progressRes.error) throw progressRes.error;

    const modules = assemble(catalogRes.data ?? [], progressRes.data ?? []);
    return {
      modules,
      currentScore: CURRENT_SCORE,
      targetScore: TARGET_SCORE,
      projected: computeProjected(modules),
    };
  });
