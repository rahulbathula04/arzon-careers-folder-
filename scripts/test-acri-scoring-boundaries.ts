/**
 * ACRI Scoring Engine & Readiness Boundary Verification Test
 *
 * Runs all 7 boundary fixtures against the 40-item assessment item bank
 * and verifies that scores and readiness classifications adhere strictly
 * to the ACRI single consistent readiness model:
 *
 * < 40   -> building_foundations
 * 40-59  -> developing
 * 60-79  -> near_ready
 * >= 80  -> industry_ready (unconditionally)
 */

import {
  evaluateCandidateResponses,
  TEST_CANDIDATE_40,
  TEST_CANDIDATE_61,
  TEST_CANDIDATE_79,
  TEST_CANDIDATE_80,
  TEST_CANDIDATE_82,
  TEST_CANDIDATE_92,
  TEST_CANDIDATE_100,
} from "../src/lib/acri/acriScoringEngine";
import { assembleAssessmentForm } from "../src/lib/acri/acriQuestionBank";
import { getAcriReadinessState } from "../src/lib/acri/acriReadiness";

const canonicalItems = assembleAssessmentForm("ACRI-CANONICAL-FIXTURE-SEED", 40);

const testCases = [
  { name: "TEST_CANDIDATE_40", fixture: TEST_CANDIDATE_40, expectedScore: 40, expectedTier: "developing" },
  { name: "TEST_CANDIDATE_61", fixture: TEST_CANDIDATE_61, expectedScore: 61, expectedTier: "near_ready" },
  { name: "TEST_CANDIDATE_79", fixture: TEST_CANDIDATE_79, expectedScore: 79, expectedTier: "near_ready" },
  { name: "TEST_CANDIDATE_80", fixture: TEST_CANDIDATE_80, expectedScore: 80, expectedTier: "industry_ready" },
  { name: "TEST_CANDIDATE_82", fixture: TEST_CANDIDATE_82, expectedScore: 82, expectedTier: "industry_ready" },
  { name: "TEST_CANDIDATE_92", fixture: TEST_CANDIDATE_92, expectedScore: 92, expectedTier: "industry_ready" },
  { name: "TEST_CANDIDATE_100", fixture: TEST_CANDIDATE_100, expectedScore: 100, expectedTier: "industry_ready" },
];

let failed = false;

console.log("================================================================================");
console.log("ACRI SCORING ENGINE & READINESS BOUNDARY VERIFICATION");
console.log("================================================================================");

testCases.forEach(({ name, fixture, expectedScore, expectedTier }) => {
  const result = evaluateCandidateResponses(fixture, canonicalItems as any);
  const readiness = getAcriReadinessState(result.compositeScore);
  const scoreMatch = Math.abs(result.compositeScore - expectedScore) <= 1; // within +/- 1 pt
  const tierMatch = readiness === expectedTier;

  const passed = scoreMatch && tierMatch;
  if (!passed) failed = true;

  console.log(
    `${passed ? "✓ PASS" : "✗ FAIL"} | ${name.padEnd(20)} | Score: ${String(result.compositeScore).padStart(3)}% (Target: ${expectedScore}%) | Tier: ${readiness.padEnd(20)} (Expected: ${expectedTier}) | Decision: ${result.decision}`
  );
});

console.log("================================================================================");

if (failed) {
  console.error("BOUNDARY VERIFICATION FAILED!");
  process.exit(1);
} else {
  console.log("ALL 7 BOUNDARY VERIFICATION GATES PASSED PERFECTLY!");
  process.exit(0);
}
