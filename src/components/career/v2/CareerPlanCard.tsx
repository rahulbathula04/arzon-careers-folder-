import { ArrowRight, CheckCircle2, Target, Wrench } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { CareerEngineResult } from "@/data/careerEngineScoring";
import { trackCECtaClicked } from "@/lib/careerEngineAnalytics";
import { getAttemptId } from "@/lib/careerEngineApi";

type Props = { result: CareerEngineResult; leadId: string | null };

const PLAN_BY_PATH: Record<string, {
  role: string; roleSlug: string; skills: string[]; project: string;
  programmeSlug?: string; programmeLabel?: string;
}> = {
  "medical-coding": { role: "Medical Coding Specialist", roleSlug: "outpatient-coder", skills: ["ICD-10-CM", "CPT / HCPCS", "Medical terminology", "Coding accuracy"], project: "Code a realistic outpatient chart set and defend your coding decisions.", programmeSlug: "medical-coding", programmeLabel: "Medical Coding" },
  pharmacovigilance: { role: "Drug Safety / PV Associate", roleSlug: "pv-associate", skills: ["Case processing", "MedDRA", "Causality assessment", "Safety narratives"], project: "Process sample adverse-event cases using a documented PV workflow.", programmeSlug: "pharmacovigilance", programmeLabel: "Pharmacovigilance" },
  "clinical-data-management": { role: "Clinical Data Associate", roleSlug: "cda", skills: ["EDC concepts", "Data cleaning", "Query management", "Clinical data standards"], project: "Clean a small clinical dataset and document queries through database lock.", programmeSlug: "clinical-data-management", programmeLabel: "Clinical Data Management" },
  "sas-clinical": { role: "Clinical SAS Programmer", roleSlug: "sas-programmer", skills: ["SAS programming", "SQL", "CDISC / SDTM", "Clinical reporting"], project: "Build a small clinical analysis pipeline from raw data to a reporting table.", programmeSlug: "sas-clinical", programmeLabel: "Clinical SAS" },
  "regulatory-affairs": { role: "Regulatory Affairs Associate", roleSlug: "ra-associate", skills: ["Regulatory writing", "Submission structure", "Labeling", "Compliance"], project: "Assemble a miniature regulatory submission package with an evidence trail.", programmeSlug: "regulatory-affairs", programmeLabel: "Regulatory Affairs" },
  "clinical-saas": { role: "Healthcare SaaS / Customer Success Associate", roleSlug: "csm-clinical-saas", skills: ["Discovery", "Healthcare workflows", "CRM discipline", "Customer communication"], project: "Run a mock healthcare SaaS discovery-to-onboarding workflow.", programmeSlug: "clinical-saas", programmeLabel: "Healthcare Technology" },
  "ai-intelligence": { role: "AI / ML Engineer in Healthcare", roleSlug: "ml-engineer-health", skills: ["Python", "Data handling", "ML fundamentals", "Healthcare problem framing"], project: "Ship a small healthcare ML workflow with documented evaluation.", programmeSlug: "ai-intelligence", programmeLabel: "AI in Healthcare" },
};

function normalisePath(result: CareerEngineResult) {
  return result.archetype?.topPaths?.[0]?.slug ?? result.archetype?.pathSlug ?? "";
}

export function CareerPlanCard({ result, leadId }: Props) {
  const plan = PLAN_BY_PATH[normalisePath(result)];
  if (!plan) return null;
  const topDrivers = result.evidence?.topDrivers?.slice(0, 2) ?? [];
  const gaps = result.evidence?.watchOuts?.slice(0, 3) ?? [];
  const traitScore = (trait: keyof typeof result.traitScores) => {
    const value = result.traitScores?.[trait];
    return typeof value === "number" ? Math.max(0, Math.min(100, Math.round(((value + 5) / 10) * 100))) : 50;
  };
  const skillSignals = [
    { skill: "Attention to detail", trait: "detail" as const },
    { skill: "Logical reasoning", trait: "logic" as const },
    { skill: "Professional language", trait: "language" as const },
    { skill: "Compliance discipline", trait: "compliance" as const },
  ].map((item) => ({ ...item, score: traitScore(item.trait) }));
  const capabilitySignal = Math.round(skillSignals.reduce((sum, item) => sum + item.score, 0) / skillSignals.length);


  return (
    <section className="arzon-v2-card p-5 sm:p-7">
      <div className="flex items-start gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[var(--arzon-blue-100)] text-[var(--arzon-blue-700)]"><Target className="h-5 w-5" /></div>
        <div>
          <span className="arzon-v2-eyebrow">YOUR CAREER PLAN</span>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-[var(--arzon-ink-strong)] sm:text-3xl">{plan.role}</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--arzon-ink-soft)]">Your assessment points toward this role. The next question is not “which course?” — it is “which capabilities do I need to demonstrate?”</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-[var(--arzon-border)] bg-[var(--arzon-surface)] p-5">
          <div className="flex items-center gap-2"><Wrench className="h-4 w-4 text-[var(--arzon-blue-700)]" /><p className="arzon-v2-data-label">Capability checklist</p></div>
          <div className="mt-4 space-y-2.5">
            {plan.skills.map((skill) => <div key={skill} className="flex items-center gap-2 text-sm text-[var(--arzon-ink-soft)]"><CheckCircle2 className="h-4 w-4 shrink-0 text-[var(--arzon-success)]" />{skill}</div>)}
          </div>
        </div>

        <div className="rounded-xl border border-[var(--arzon-border)] bg-[var(--arzon-surface)] p-5">
          <p className="arzon-v2-data-label">Proof-of-work project</p>
          <p className="mt-3 text-sm leading-6 text-[var(--arzon-ink-soft)]">{plan.project}</p>
          {topDrivers.length > 0 ? <div className="mt-4 border-t border-[var(--arzon-border)] pt-4"><p className="text-xs font-semibold text-[var(--arzon-ink)]">Why this path appeared</p><ul className="mt-2 space-y-1.5">{topDrivers.map((driver) => <li key={driver.questionId} className="text-xs leading-5 text-[var(--arzon-ink-soft)]">{driver.note ?? driver.chosenLabel}</li>)}</ul></div> : null}
        </div>
      <div className="mt-4 rounded-xl border border-[var(--arzon-border)] bg-[var(--arzon-surface)] p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="arzon-v2-data-label">Capability signal</p>
            <p className="mt-1 text-xs text-[var(--arzon-ink-soft)]">Assessment evidence mapped to core capabilities for this direction.</p>
          </div>
          <span className="text-lg font-bold text-[var(--arzon-ink-strong)]">{capabilitySignal}%</span>
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {skillSignals.map((item) => (
            <div key={item.skill} className="rounded-lg border border-[var(--arzon-border)] bg-[var(--arzon-surface-blue)] p-3 tone-light">
              <p className="text-xs font-semibold text-[var(--arzon-ink)]">{item.skill}</p>
              <p className="mt-1 text-xs text-[var(--arzon-ink-muted)]">{item.score}% signal</p>
            </div>
          ))}
        </div>
      </div>

      </div>

      {gaps.length > 0 ? <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-5"><p className="text-sm font-bold text-[var(--arzon-ink)]">Check these before committing</p><div className="mt-2 grid gap-2 sm:grid-cols-3">{gaps.map((gap) => <p key={gap.questionId} className="text-xs leading-5 text-[var(--arzon-ink-soft)]">{gap.note ?? gap.chosenLabel}</p>)}</div></div> : null}

      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
        <Link to="/roles/$slug" params={{ slug: plan.roleSlug }} onClick={() => trackCECtaClicked({ step: "result", target: "career_plan_role", leadId, attemptId: getAttemptId() })} className="arzon-button-secondary">Verify the role <ArrowRight className="h-4 w-4" /></Link>
        {plan.programmeSlug ? <Link to="/courses/$slug" params={{ slug: plan.programmeSlug }} onClick={() => trackCECtaClicked({ step: "result", target: "career_plan_programme", leadId, attemptId: getAttemptId() })} className="arzon-button-primary">Review {plan.programmeLabel} <ArrowRight className="h-4 w-4" /></Link> : null}
      </div>
    </section>
  );
}

export default CareerPlanCard;
