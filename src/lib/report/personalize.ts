/**
 * Personalization helpers driven by the RoleFitQuiz profile.
 * Pure functions — safe to import from client + server.
 */
import type { QuizProfile } from "@/components/career/report/ReportStateContext";

export type ToolTag = "priority" | "familiar" | "later";

export interface PersonalizedToolItem {
  name: string;
  why: string;
  frequency: string;
  tag: ToolTag;
  reason: string;
}

/** Match on lowercased tokens contained in the tool name. */
function ownsTool(profile: QuizProfile | null, name: string): boolean {
  if (!profile) return false;
  const n = name.toLowerCase();
  return profile.skills.some((s) => {
    const k = s.toLowerCase();
    return n.includes(k) || k.includes(n);
  });
}

export function tagTool(
  profile: QuizProfile | null,
  name: string,
  frequency: string,
): { tag: ToolTag; reason: string } {
  if (ownsTool(profile, name)) {
    return {
      tag: "familiar",
      reason: "You marked this as an existing skill — use it as leverage in interviews.",
    };
  }
  if (frequency === "daily") {
    return { tag: "priority", reason: "Daily-use tool — learn this in weeks 1–2." };
  }
  if (frequency === "weekly") {
    return { tag: "priority", reason: "Weekly-use tool — layer in by week 4." };
  }
  return { tag: "later", reason: "Occasional use — safe to defer until day 60+." };
}

export function personalizeToolList<T extends { name: string; frequency: string; why: string }>(
  items: T[],
  profile: QuizProfile | null,
): (T & { tag: ToolTag; reason: string })[] {
  const scored = items.map((i) => ({ ...i, ...tagTool(profile, i.name, i.frequency) }));
  // Priority first, then later, then familiar (deprioritise familiar).
  const order: Record<ToolTag, number> = { priority: 0, later: 1, familiar: 2 };
  return scored.sort((a, b) => order[a.tag] - order[b.tag]);
}

export interface PersonalizedWeekAnnotation {
  weekNudge: string | null;
  toolSubstitutions: { drop: string; reason: string }[];
}

export function personalizeFirst90Week(
  weekIndex: number,
  weekTools: string[],
  profile: QuizProfile | null,
): PersonalizedWeekAnnotation {
  if (!profile) return { weekNudge: null, toolSubstitutions: [] };

  const familiarInWeek = weekTools.filter((t) => ownsTool(profile, t));
  const subs = familiarInWeek.map((t) => ({
    drop: t,
    reason: "Already in your skill list — spend this hour on a stretch goal instead.",
  }));

  let nudge: string | null = null;
  if (weekIndex === 1 && profile.gradYear && profile.gradYear > new Date().getFullYear()) {
    nudge = "You're pre-graduation — treat weeks 1–4 as an internship simulation, not a job.";
  } else if (weekIndex === 4 && profile.domain) {
    nudge = `Domain focus: ${profile.domain} — bias week 4 deliverables toward this vertical.`;
  } else if (weekIndex === 12 && familiarInWeek.length > 0) {
    nudge = `You already own ${familiarInWeek.length} tool(s) here — use week 12 to build a public portfolio piece instead of drills.`;
  }

  return { weekNudge: nudge, toolSubstitutions: subs };
}

export function summarizeProfile(profile: QuizProfile | null): string {
  if (!profile) return "Not personalised";
  const parts: string[] = [];
  if (profile.domain) parts.push(profile.domain);
  if (profile.gradYear) parts.push(`Grad ${profile.gradYear}`);
  if (profile.skills.length) parts.push(`${profile.skills.length} known skill(s)`);
  return parts.join(" · ") || "Personalised";
}
