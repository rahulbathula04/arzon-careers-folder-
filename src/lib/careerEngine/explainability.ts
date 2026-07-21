/**
 * Explainability — answers "why did I get PV instead of Regulatory Affairs?"
 *
 * We don't re-run scoring. We diff the path weights of the top match vs the
 * runner-up against the student's normalised trait scores. Traits where the
 * top match leans harder AND the student scored well become "why top won".
 * Traits where the runner-up leans harder AND the student scored low become
 * "why runner-up lost".
 */

import type { CareerEngineResult } from "@/data/careerEngineScoring";
import { PATHS } from "@/data/careerEngineScoring";

const TRAIT_LABEL: Record<string, string> = {
  detail: "attention to detail",
  compliance: "compliance discipline",
  screen: "screen tolerance",
  logic: "logical reasoning",
  language: "English reading",
  empathy: "empathy & patient orientation",
  writing: "writing evidence",
  patient: "patient orientation",
  data: "data fluency",
  tech: "technical aptitude",
  sales: "sales / persuasion",
  pressure: "pressure handling",
};

function label(trait: string): string {
  return TRAIT_LABEL[trait] ?? trait;
}

export interface VsRunnerUp {
  topSlug: string;
  topTitle: string;
  topFit: number;
  runnerSlug: string;
  runnerTitle: string;
  runnerFit: number;
  delta: number;
  topWonOn: string[]; // "PV scored higher because…"
  runnerLostOn: string[]; // "RA lost points because…"
}

export function buildVsRunnerUp(result: CareerEngineResult): VsRunnerUp | null {
  const fits = result.evidence?.scoring?.topPathFits ?? [];
  if (fits.length < 2) return null;
  const top = fits[0];
  const runner = fits[1];
  const topPath = PATHS[top.slug];
  const runnerPath = PATHS[runner.slug];
  if (!topPath || !runnerPath) return null;

  const traits = result.traitScores ?? {};

  const traitDiffs: { trait: string; topW: number; runW: number; score: number; lean: number }[] =
    [];
  const allTraits = new Set<string>([
    ...Object.keys(topPath.weights),
    ...Object.keys(runnerPath.weights),
  ]);
  for (const t of allTraits) {
    const topW = (topPath.weights as Record<string, number>)[t] ?? 0;
    const runW = (runnerPath.weights as Record<string, number>)[t] ?? 0;
    const score = (traits as Record<string, number>)[t] ?? 0;
    traitDiffs.push({ trait: t, topW, runW, score, lean: topW - runW });
  }

  // "Top won on" — traits where top leans harder AND student scored well.
  const topWonOn = traitDiffs
    .filter((d) => d.lean > 0.5 && d.score > 0)
    .sort((a, b) => b.lean * (b.score + 1) - a.lean * (a.score + 1))
    .slice(0, 3)
    .map((d) => `Higher on ${label(d.trait)}`);

  // "Runner lost on" — traits where runner leans harder AND student scored low.
  const runnerLostOn = traitDiffs
    .filter((d) => d.lean < -0.5 && d.score <= 0)
    .sort((a, b) => a.lean * (a.score - 1) - b.lean * (b.score - 1))
    .slice(0, 3)
    .map((d) => `Lower on ${label(d.trait)}`);

  return {
    topSlug: top.slug,
    topTitle: top.title,
    topFit: top.fit,
    runnerSlug: runner.slug,
    runnerTitle: runner.title,
    runnerFit: runner.fit,
    delta: Math.round((top.fit - runner.fit) * 10) / 10,
    topWonOn,
    runnerLostOn,
  };
}

/**
 * Pillar breakdown — re-frames existing engine outputs as the 5-pillar
 * model (eligibility 35 / work-style 25 / micro 20 / commitment 10 / demand 10).
 * This is a DERIVATION, not a re-score; the underlying fit % still comes from
 * the 13-trait engine. A full pillar-native rebuild is Phase 2.
 */
export interface PillarBreakdown {
  eligibility: number; // 0–100
  workStyle: number;
  micro: number;
  commitment: number;
  demand: number;
}

export function derivePillars(
  result: CareerEngineResult,
  demandLabel: string | null,
): PillarBreakdown {
  const b = result.breakdown ?? { aptitude: 0, interest: 0, background: 0, commitment: 0 };
  const demandMap: Record<string, number> = { High: 90, Moderate: 65, Emerging: 55, Niche: 40 };
  return {
    eligibility: Math.round(b.background ?? 0),
    workStyle: Math.round(b.interest ?? 0),
    micro: Math.round(result.microAccuracy ?? 0), // already 0–100
    commitment: Math.round(b.commitment ?? 0),
    demand: demandLabel ? (demandMap[demandLabel] ?? 60) : 60,
  };
}
