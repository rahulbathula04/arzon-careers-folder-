/**
 * ACRI QA Boundary Fixtures & Validation Suite
 *
 * Provides calibrated test candidate response sets targeting key score thresholds:
 * - 40% (Foundation / Developing boundary)
 * - 61% (Approaching Readiness baseline)
 * - 79% (Sub-80% near-ready threshold)
 * - 80% (Industry Ready threshold boundary)
 * - 82% (Baseline certified candidate)
 * - 92% (High-distinction profile)
 * - 100% (Perfect mastery score)
 */

import { AUTHORED_ACRI_ITEM_BANK, assembleAssessmentForm } from "./acriQuestionBank";
import type { CandidateResponses } from "./acriScoringEngine";

export interface BoundaryFixture {
  targetScore: number;
  expectedReadiness: "industry_ready" | "near_ready" | "developing" | "building_foundations";
  description: string;
  responses: CandidateResponses;
}

// Canonical 40 items for deterministic boundary fixture calibration
const CANONICAL_ITEMS = assembleAssessmentForm("ACRI-CANONICAL-FIXTURE-SEED", 40);

function getCorrectAnswerKey(item: any): string {
  if (item.correctAnswer && typeof item.correctAnswer === "string") {
    return item.correctAnswer;
  }
  const correctOpt = item.options?.find((o: any) => o.isCorrect);
  return correctOpt ? correctOpt.key : "A";
}

function getIncorrectAnswerKey(item: any): string {
  const incorrectOpt = item.options?.find((o: any) => !o.isCorrect);
  return incorrectOpt ? incorrectOpt.key : "Z";
}

/**
 * Builds candidate answers to achieve target composite score on canonical 40-item bank
 */
export function buildAnswersForTargetScore(targetPercentage: number): Record<string, string> {
  const answers: Record<string, string> = {};
  
  // Set of indices to mark correct for each target
  // Sections:
  // 0-3: pvFundamentals (4)
  // 4-9: icsrProcessing (6)
  // 10-15: caseAssessment (6)
  // 16-19: medicalInterpretation (4)
  // 20-24: meddraCoding (5)
  // 25-28: documentation (4)
  // 29-32: qualityCompliance (4)
  // 33-36: analyticalReasoning (4)
  // 37-39: situationalJudgment (3)
  
  let correctIndices: number[] = [];

  switch (targetPercentage) {
    case 100:
      correctIndices = Array.from({ length: 40 }, (_, i) => i);
      break;
    case 92:
      correctIndices = [0,1,2,3,4,6,7,9,10,12,13,14,15,16,17,18,19,20,21,22,23,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39];
      break;
    case 82:
      correctIndices = [0,1,2,3,4,5,6,7,8,9,10,11,13,14,15,16,17,18,19,20,21,22,23,24,27,28,29,30,31,32,34,36,37,38];
      break;
    case 80:
      correctIndices = [0,1,2,3,4,6,9,11,12,13,14,15,16,17,18,19,20,22,23,25,27,28,29,30,31,32,33,34,36,37,38,39];
      break;
    case 79:
      correctIndices = [0,2,3,4,6,7,8,9,10,11,13,14,15,16,17,18,19,21,22,23,26,27,29,31,32,33,34,35,36,37,38,39];
      break;
    case 61:
      correctIndices = [2,4,5,6,7,8,9,10,11,12,17,18,19,21,23,25,26,28,29,30,31,32,35,37,38];
      break;
    case 40:
      correctIndices = [3,4,7,9,10,13,15,16,18,19,20,23,26,30,33,35,39];
      break;
    default:
      const count = Math.round((targetPercentage / 100) * 40);
      correctIndices = Array.from({ length: count }, (_, i) => i);
      break;
  }

  const correctSet = new Set(correctIndices);

  CANONICAL_ITEMS.forEach((item, idx) => {
    answers[item.itemId] = correctSet.has(idx)
      ? getCorrectAnswerKey(item)
      : getIncorrectAnswerKey(item);
  });

  return answers;
}

export const TEST_CANDIDATE_100: CandidateResponses = {
  attemptId: "QA-FIXTURE-100",
  answers: buildAnswersForTargetScore(100),
};

export const TEST_CANDIDATE_92: CandidateResponses = {
  attemptId: "QA-FIXTURE-92",
  answers: buildAnswersForTargetScore(92),
};

export const TEST_CANDIDATE_82: CandidateResponses = {
  attemptId: "QA-FIXTURE-82",
  answers: buildAnswersForTargetScore(82),
};

export const TEST_CANDIDATE_80: CandidateResponses = {
  attemptId: "QA-FIXTURE-80",
  answers: buildAnswersForTargetScore(80),
};

export const TEST_CANDIDATE_79: CandidateResponses = {
  attemptId: "QA-FIXTURE-79",
  answers: buildAnswersForTargetScore(79),
};

export const TEST_CANDIDATE_61: CandidateResponses = {
  attemptId: "QA-FIXTURE-61",
  answers: buildAnswersForTargetScore(61),
};

export const TEST_CANDIDATE_40: CandidateResponses = {
  attemptId: "QA-FIXTURE-40",
  answers: buildAnswersForTargetScore(40),
};
