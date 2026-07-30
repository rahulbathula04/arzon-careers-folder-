/**
 * Role-level scoring - derives a per-role fit % on top of the existing
 * 13-trait engine. We do NOT re-run scoring; we re-apply the role's
 * overlay against the candidate's normalised trait scores and add it
 * to the anchor path's fit.
 *
 * Per-role fit % =
 *   clamp( pathFit
 *        + roleOverlay
 *        - seniorityPenalty
 *        - commitmentPenalty
 *        - eligibilityPenalty
 *        , 0, 100 )
 */

import type { CareerEngineResult } from "@/data/careerEngineScoring";
import type { CareerRole } from "@/data/careerRoles";
import { FAMILIES, type CareerFamily } from "@/data/careerFamilies";

export interface RoleFitContext {
  course?: string;
  commitmentRelocate?: boolean;
  commitmentShifts?: boolean;
}

export interface RoleFitVerdict {
  slug: string;
  fit: number; // 0–100
  eligible: boolean; // false → render in "Ruled out for you"
  eligibilityNote?: string;
  caveats: string[]; // amber warnings: shift work, travel, training
  isBestEntry: boolean;
}

function scoreCourseAgainstRole(
  role: CareerRole,
  course: string | undefined,
): { eligible: boolean; note?: string; penalty: number } {
  if (!course) return { eligible: true, penalty: 0 };
  const lc = course.toLowerCase();
  const match = (list?: string[]) => list?.some((d) => lc.includes(d.toLowerCase().split(" ")[0]));

  // Role-level eligibility wins over family-level.
  if (role.eligibility) {
    if (match(role.eligibility.blockers)) {
      return {
        eligible: false,
        note: role.eligibility.note ?? `${course} is not the typical entry path for this role.`,
        penalty: 100,
      };
    }
    if (role.eligibility.required?.length && !match(role.eligibility.required)) {
      // Not blocked, but doesn't meet required → soft penalty + note.
      return { eligible: true, note: role.eligibility.note, penalty: 8 };
    }
  }

  // Family-level eligibility.
  const fam: CareerFamily | undefined = FAMILIES[role.familyId];
  if (fam) {
    if (match(fam.eligibility.blockers)) {
      return {
        eligible: false,
        note: `${course} typically doesn't qualify for ${fam.name} entry.`,
        penalty: 100,
      };
    }
    if (match(fam.eligibility.required)) return { eligible: true, penalty: 0 };
    if (match(fam.eligibility.preferred)) return { eligible: true, penalty: 2 };
  }

  return { eligible: true, penalty: 4 }; // unknown course-family combo: small uncertainty penalty
}

function overlayScore(result: CareerEngineResult, role: CareerRole): number {
  if (!role.roleWeights) return 0;
  const traits = result.traitScores ?? {};
  let bonus = 0;
  for (const [trait, weight] of Object.entries(role.roleWeights)) {
    const score = (traits as Record<string, number>)[trait] ?? 0;
    // Each trait score is ~-1..+2; weight is 1..3. Cap the overlay's per-trait nudge at ±4.
    bonus += Math.max(-4, Math.min(4, score * (weight as number)));
  }
  return bonus;
}

function seniorityPenalty(role: CareerRole): number {
  // We don't capture experience yet, so mid roles are slightly downweighted
  // and senior roles heavily - they belong in the ladder, not in #1.
  if (role.seniority === "mid") return 8;
  if (role.seniority === "senior") return 22;
  return 0;
}

function commitmentCaveats(
  role: CareerRole,
  ctx: RoleFitContext,
): { caveats: string[]; penalty: number } {
  const caveats: string[] = [];
  let penalty = 0;
  if (role.commitment?.nightShift && ctx.commitmentShifts === false) {
    caveats.push("Night shift required - your answers said you'd prefer day shift.");
    penalty += 6;
  } else if (role.commitment?.nightShift) {
    caveats.push("US night-shift work is common in this role.");
  }
  if (role.commitment?.relocation && ctx.commitmentRelocate === false) {
    caveats.push("Field role - relocation typically required.");
    penalty += 6;
  }
  if ((role.commitment?.travelPct ?? 0) >= 50) {
    caveats.push(`Travel ~${role.commitment?.travelPct}% of the time.`);
  }
  if ((role.commitment?.trainingMonths ?? 0) >= 4) {
    caveats.push(`${role.commitment?.trainingMonths}-month formal training before billable work.`);
  }
  return { caveats, penalty };
}

export function scoreRolesForFamily(
  result: CareerEngineResult,
  roles: CareerRole[],
  ctx: RoleFitContext,
): RoleFitVerdict[] {
  const pathFits = result.evidence?.scoring?.topPathFits ?? [];
  const fitByPath: Record<string, number> = {};
  for (const p of pathFits) fitByPath[p.slug] = p.fit;

  const verdicts: RoleFitVerdict[] = roles.map((role) => {
    const pathFit = fitByPath[role.pathSlug] ?? 50; // unknown path → neutral
    const overlay = overlayScore(result, role);
    const elig = scoreCourseAgainstRole(role, ctx.course);
    const sen = seniorityPenalty(role);
    const com = commitmentCaveats(role, ctx);
    const raw = pathFit + overlay - sen - com.penalty - (elig.eligible ? elig.penalty : 0);
    return {
      slug: role.slug,
      fit: Math.max(0, Math.min(100, Math.round(raw))),
      eligible: elig.eligible,
      eligibilityNote: elig.note,
      caveats: com.caveats,
      isBestEntry: false,
    };
  });

  // Mark the highest-fit eligible entry-level role as "Best entry today".
  const eligibleEntries = verdicts.filter((v, i) => v.eligible && roles[i].seniority === "entry");
  if (eligibleEntries.length) {
    const best = eligibleEntries.reduce((a, b) => (a.fit >= b.fit ? a : b));
    best.isBestEntry = true;
  }

  return verdicts;
}

/** Read commitment answers off the result payload. */
export function extractCommitmentCtx(result: CareerEngineResult): RoleFitContext {
  // The result currently exposes profile.course only. Commitment answers live
  // on the raw answers object but aren't projected onto the result type yet,
  // so we leave shift / relocate as undefined (neutral) for now.
  return {
    course: result.profile?.course,
    commitmentShifts: undefined,
    commitmentRelocate: undefined,
  };
}
