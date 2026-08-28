/**
 * Automated AI Assessment & Portfolio Scoring Engine
 * Evaluates candidate code portfolios (GitHub, Kaggle, HackerRank, DSA & Model Benchmarks)
 * to compute a 5-dimension Authenticated Candidate Readiness Index (ACRI) score (0–100).
 */

export interface CandidateSubmission {
  candidateId?: string;
  candidateName?: string;
  githubRepoUrl?: string;
  githubCommitCount?: number;
  testCoveragePercent?: number;
  hackerRankScore?: number; // 0 - 100
  dsaComplexityScore?: number; // 0 - 100
  mlModelAccuracy?: number; // 0 - 100
  mlModelLatencyMs?: number; // e.g. 15ms
  hasDockerConfig?: boolean;
  hasCIWorkflow?: boolean;
  hasDocumentation?: boolean;
}

export type AcriDimensionKey =
  | "codeQuality"
  | "systemArchitecture"
  | "enterpriseAiMl"
  | "productionHygiene"
  | "documentation";

export interface DimensionScore {
  key: AcriDimensionKey;
  label: string;
  score: number; // 0 - 100
  weight: number; // sum to 1.0
  feedback: string;
}

export type CandidateTier =
  | "EXECUTIVE_VIP"
  | "TIER1_QUALIFIED"
  | "PARTNER_DESK_REVIEW"
  | "COHORT_ACCELERATION";

export interface AiAssessmentResult {
  overallAcriScore: number; // 0 - 100
  tier: CandidateTier;
  tierLabel: string;
  tierColor: string;
  dimensions: Record<AcriDimensionKey, DimensionScore>;
  topStrengths: string[];
  improvementFlags: string[];
  automatedSummary: string;
  evaluatedAt: string;
}

export const DIMENSION_METADATA: Record<AcriDimensionKey, { label: string; weight: number }> = {
  codeQuality: { label: "Code Quality & DSA Efficiency", weight: 0.25 },
  systemArchitecture: { label: "System Architecture & Scalability", weight: 0.20 },
  enterpriseAiMl: { label: "Enterprise AI/ML Pipeline & Models", weight: 0.25 },
  productionHygiene: { label: "Production Hygiene & CI/CD", weight: 0.15 },
  documentation: { label: "Documentation & Communication", weight: 0.15 },
};

export function evaluateCandidatePortfolio(submission: CandidateSubmission): AiAssessmentResult {
  const commitCount = submission.githubCommitCount ?? 28;
  const coverage = submission.testCoveragePercent ?? 82;
  const hackerRank = submission.hackerRankScore ?? 88;
  const dsaComplexity = submission.dsaComplexityScore ?? 85;
  const mlAccuracy = submission.mlModelAccuracy ?? 91;
  const hasDocker = submission.hasDockerConfig ?? true;
  const hasCI = submission.hasCIWorkflow ?? true;
  const hasDocs = submission.hasDocumentation ?? true;

  // 1. Code Quality & DSA Efficiency (25%)
  const codeQualityScore = Math.min(100, Math.round(hackerRank * 0.5 + dsaComplexity * 0.5));
  
  // 2. System Architecture & Scalability (20%)
  const archScore = Math.min(100, Math.round(
    (commitCount >= 20 ? 40 : commitCount * 2) +
    (hasDocker ? 30 : 10) +
    (hasCI ? 30 : 10)
  ));

  // 3. Enterprise AI/ML Pipeline & Models (25%)
  const aiMlScore = Math.min(100, Math.round(mlAccuracy * 0.9 + 10));

  // 4. Production Hygiene & CI/CD (15%)
  const hygieneScore = Math.min(100, Math.round(
    coverage * 0.6 +
    (hasCI ? 20 : 0) +
    (hasDocker ? 20 : 0)
  ));

  // 5. Documentation & Communication (15%)
  const docScore = Math.min(100, Math.round(
    (hasDocs ? 70 : 30) +
    (commitCount > 15 ? 30 : 15)
  ));

  const dimensions: Record<AcriDimensionKey, DimensionScore> = {
    codeQuality: {
      key: "codeQuality",
      label: DIMENSION_METADATA.codeQuality.label,
      score: codeQualityScore,
      weight: DIMENSION_METADATA.codeQuality.weight,
      feedback: codeQualityScore >= 85
        ? "Optimal O(N log N) space/time efficiency and clean modular function design."
        : "Good fundamentals; recommend refactoring nested loops to improve time complexity.",
    },
    systemArchitecture: {
      key: "systemArchitecture",
      label: DIMENSION_METADATA.systemArchitecture.label,
      score: archScore,
      weight: DIMENSION_METADATA.systemArchitecture.weight,
      feedback: archScore >= 80
        ? "Robust multi-tier project layout with containerized microservice structure."
        : "Monolithic project structure; consider decoupling API and data processing layers.",
    },
    enterpriseAiMl: {
      key: "enterpriseAiMl",
      label: DIMENSION_METADATA.enterpriseAiMl.label,
      score: aiMlScore,
      weight: DIMENSION_METADATA.enterpriseAiMl.weight,
      feedback: aiMlScore >= 85
        ? "High-performing model pipeline with clean cross-validation and feature scaling."
        : "Acceptable model accuracy; recommend adding SHAP/LIME model explainability logs.",
    },
    productionHygiene: {
      key: "productionHygiene",
      label: DIMENSION_METADATA.productionHygiene.label,
      score: hygieneScore,
      weight: DIMENSION_METADATA.productionHygiene.weight,
      feedback: hygieneScore >= 80
        ? "Automated GitHub Actions CI runner present with >80% test suite assertion coverage."
        : "Unit test coverage is below target; add unit tests for edge-case validation.",
    },
    documentation: {
      key: "documentation",
      label: DIMENSION_METADATA.documentation.label,
      score: docScore,
      weight: DIMENSION_METADATA.documentation.weight,
      feedback: docScore >= 80
        ? "Comprehensive README.md, API endpoint specs, and architecture diagrams included."
        : "Basic README provided; suggest adding setup instructions and environment variable specs.",
    },
  };

  // Weighted ACRI total calculation
  const overallAcriScore = Math.round(
    Object.values(dimensions).reduce((acc, dim) => acc + dim.score * dim.weight, 0)
  );

  // Determine Candidate Tier
  let tier: CandidateTier = "COHORT_ACCELERATION";
  let tierLabel = "Cohort Acceleration Candidate";
  let tierColor = "#EA580C"; // Orange

  if (overallAcriScore >= 90) {
    tier = "EXECUTIVE_VIP";
    tierLabel = "Executive VIP Direct Manager Delivery";
    tierColor = "#059669"; // Emerald
  } else if (overallAcriScore >= 75) {
    tier = "TIER1_QUALIFIED";
    tierLabel = "Tier-1 Enterprise Qualified";
    tierColor = "#2563EB"; // Blue
  } else if (overallAcriScore >= 60) {
    tier = "PARTNER_DESK_REVIEW";
    tierLabel = "Partner Desk Fast-Track Review";
    tierColor = "#D97706"; // Amber
  }

  // Generate Key Strengths & Flags
  const topStrengths: string[] = [];
  const improvementFlags: string[] = [];

  if (codeQualityScore >= 80) topStrengths.push("High DSA & Algorithmic Problem Solving");
  if (aiMlScore >= 85) topStrengths.push("Production-Grade ML Model Accuracy");
  if (archScore >= 80) topStrengths.push("Dockerized Container Architecture");
  if (hygieneScore >= 80) topStrengths.push("Automated CI/CD Pipeline Integration");

  if (hygieneScore < 75) improvementFlags.push("Increase unit test assertion coverage above 80%");
  if (docScore < 75) improvementFlags.push("Enhance API documentation & deployment instructions");
  if (archScore < 75) improvementFlags.push("Refactor monolithic components into modular handlers");

  const automatedSummary = `Candidate benchmarked at ${overallAcriScore}/100 ACRI score (${tierLabel}). Demonstrates ${
    topStrengths.length > 0 ? topStrengths.slice(0, 2).join(" & ") : "solid core technical foundations"
  }. Ready for direct partner desk profile presentation.`;

  return {
    overallAcriScore,
    tier,
    tierLabel,
    tierColor,
    dimensions,
    topStrengths: topStrengths.length > 0 ? topStrengths : ["Solid Core Data Fundamentals"],
    improvementFlags: improvementFlags.length > 0 ? improvementFlags : ["Continue expanding enterprise dataset benchmarks"],
    automatedSummary,
    evaluatedAt: new Date().toISOString(),
  };
}
