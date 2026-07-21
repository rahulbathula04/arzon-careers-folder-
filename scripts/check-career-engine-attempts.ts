import { QUESTIONS, type Question, type Trait } from "../src/data/careerEngineQuestions";
import { computeResult } from "../src/data/careerEngineScoring";
import {
  buildAssessment,
  validateAssessment,
  visibleFromAssessment,
} from "../src/data/careerEngineSampler";

type Persona = { name: string; traits: Partial<Record<Trait, number>> };

const demographics: Record<string, string> = {
  stream: "BiPC",
  year: "3",
  course: "pharma",
  city: "tier2",
  english_self: "good",
};

const personas: Persona[] = [
  { name: "detail-compliance", traits: { detail: 3, compliance: 3, screen: 2, language: 1 } },
  { name: "patient-safety", traits: { patient: 3, empathy: 3, language: 2, writing: 1 } },
  { name: "data-logic", traits: { data: 3, logic: 3, tech: 1, detail: 1 } },
  { name: "ai-builder", traits: { tech: 4, logic: 3, data: 2, screen: 1 } },
  { name: "operator", traits: { sales: 4, pressure: 3, empathy: 1 } },
];

function scoreOption(q: Question, value: string, persona: Persona): number {
  const opt = q.options.find((o) => o.value === value);
  if (!opt) return Number.NEGATIVE_INFINITY;
  if (q.id in demographics) return demographics[q.id] === value ? 1000 : -1000;
  return (
    Object.entries(opt.weights ?? {}).reduce((sum, [trait, delta]) => {
      return sum + (persona.traits[trait as Trait] ?? 0) * (delta ?? 0);
    }, 0) + (opt.correct ? 0.35 : 0)
  );
}

function answerAssessment(assessment: Question[], persona: Persona): Record<string, string> {
  const answers: Record<string, string> = {};
  let guard = 0;
  while (guard++ < 80) {
    const visible = visibleFromAssessment(assessment, answers);
    const next = visible.find((q) => !answers[q.id]);
    if (!next) return answers;
    const chosen = [...next.options].sort(
      (a, b) => scoreOption(next, b.value, persona) - scoreOption(next, a.value, persona),
    )[0];
    answers[next.id] = chosen.value;
  }
  throw new Error(`Runner did not finish for ${persona.name}`);
}

const failures: string[] = [];
const archetypes = new Set<string>();
const fingerprints = new Set<string>();

for (const persona of personas) {
  const outputs = [];
  for (let i = 0; i < 14; i++) {
    const seed = `same-demo-${persona.name}-${i}`;
    const assessment = buildAssessment(seed);
    const validation = validateAssessment(assessment);
    if (!validation.ok)
      failures.push(`${persona.name}/${seed}: invalid assessment ${JSON.stringify(validation)}`);
    const answers = answerAssessment(assessment, persona);
    const result = computeResult(answers, {
      questions: assessment,
      meta: { assessmentSeed: seed, attemptId: `sim-${persona.name}-${i}` },
    });
    archetypes.add(result.archetypeId);
    fingerprints.add(
      `${result.archetypeId}:${result.fitScore}:${result.ranking.map((r) => `${r.id}-${r.fit}`).join("|")}:${result.evidence.topDrivers.map((e) => e.questionId).join(",")}`,
    );
    outputs.push(result);
  }
  const uniqueDiagnostics = new Set(
    outputs.map(
      (r) =>
        `${r.archetypeId}:${r.fitScore}:${r.evidence.topDrivers.map((e) => e.questionId).join(",")}`,
    ),
  );
  if (uniqueDiagnostics.size < 4)
    failures.push(
      `${persona.name}: only ${uniqueDiagnostics.size} unique diagnostic outputs across repeated attempts`,
    );
  if (outputs.some((r) => r.evidence.topDrivers.length < 3))
    failures.push(`${persona.name}: missing detailed evidence in one or more outputs`);
}

if (archetypes.size < 4)
  failures.push(`Only ${archetypes.size} archetypes reached; expected at least 4 across personas`);
if (fingerprints.size < 20)
  failures.push(`Only ${fingerprints.size} unique result fingerprints; expected at least 20`);
if (QUESTIONS.length < 90)
  failures.push(`Question bank has ${QUESTIONS.length} questions; expected a broad scalable bank`);

if (failures.length) {
  console.error("Career Engine repeated-attempt check failed:");
  for (const f of failures) console.error(`- ${f}`);
  process.exit(1);
}

console.log(
  `Career Engine repeated-attempt check passed: ${fingerprints.size} unique fingerprints, ${archetypes.size} archetypes reached.`,
);
