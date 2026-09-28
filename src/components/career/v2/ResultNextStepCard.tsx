import { ArrowRight, MessageCircle, ShieldCheck } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { waLink } from "@/components/landing/constants";
import { getAttemptId } from "@/lib/careerEngineApi";
import { trackCECtaClicked } from "@/lib/careerEngineAnalytics";

const PROGRAMMES: Record<string, { slug: string; roleSlug: string; label: string }> = {
  "medical-coding": { slug: "medical-coding", roleSlug: "outpatient-coder", label: "Medical Coding" },
  "clinical-data-management": { slug: "clinical-data-management", roleSlug: "cda", label: "Clinical Data Management" },
  "pharmacovigilance": { slug: "pharmacovigilance", roleSlug: "pv-associate", label: "Pharmacovigilance" },
  "sas-clinical": { slug: "sas-clinical", roleSlug: "sas-programmer", label: "Clinical SAS" },
  "regulatory-affairs": { slug: "regulatory-affairs", roleSlug: "ra-associate", label: "Regulatory Affairs" },
  "clinical-saas": { slug: "clinical-saas", roleSlug: "medical-rep", label: "Healthcare Technology" },
  "ai-intelligence": { slug: "ai-intelligence", roleSlug: "ml-engineer-health", label: "AI in Healthcare" },
};

export function ResultNextStepCard({
  leadId,
  archetypeLabel,
  fitScore,
  recommendedPathSlug,
}: {
  leadId: string | null;
  archetypeLabel: string;
  fitScore: number;
  confidence: number;
  recommendedPathSlug?: string | null;
}) {
  const programme = recommendedPathSlug ? PROGRAMMES[recommendedPathSlug] : null;
  const confidenceSignal = Math.round(Math.max(0, Math.min(100, confidence)));
  const nextAction =
    confidenceSignal < 55
      ? { label: "Compare nearby roles first", target: "browse_roles", reason: "Your result has more uncertainty, so comparing adjacent roles can give you better context before choosing a programme." }
      : confidenceSignal < 75
        ? { label: "Strengthen the key capabilities", target: "career_plan", reason: "Your direction is promising, but the assessment suggests you should inspect the capability gaps before committing." }
        : { label: "Review the preparation path", target: "recommended_programme", reason: "Your assessment has a clearer role signal. Review the preparation requirements and decide whether the programme matches them." };
  const waText = "Hi Arzon. I completed the Career Engine and my strongest path is " +
    (programme?.label ?? archetypeLabel) +
    ". I want help understanding the next step.";

  return (
    <section className="arzon-v2-card p-5 sm:p-7">
      <div className="max-w-3xl">
        <span className="arzon-v2-eyebrow">YOUR NEXT STEP</span>
        <h2 className="mt-4 text-2xl font-bold tracking-tight text-[var(--arzon-ink-strong)] sm:text-3xl">
          Use the result to make a better career decision.
        </h2>
        <p className="mt-2 text-sm leading-6 text-[var(--arzon-ink-soft)]">
          Your strongest path is <strong>{programme?.label ?? archetypeLabel}</strong>. Review the role first, then inspect the matching programme. Your readiness signal is {Math.round(fitScore)}/100, and it is a guidance signal, not a hiring or placement prediction.
        </p>
      </div>

      {programme ? (
        <div className="mt-6 rounded-[var(--arzon-radius-lg)] border border-[var(--arzon-blue-200)] bg-[var(--arzon-surface-blue)] p-5 tone-light">
          <p className="arzon-v2-data-label">NEXT BEST ACTION</p>
          <h3 className="mt-2 text-lg font-bold text-[var(--arzon-ink-strong)]">{nextAction.label}</h3>
          <p className="mt-1 text-sm leading-6 text-[var(--arzon-ink-soft)]">{nextAction.reason}</p>
          <div className="mt-4">
            {nextAction.target === "browse_roles" ? (
              <Link to="/roles" onClick={() => trackCECtaClicked({ step: "result", target: nextAction.target, leadId, attemptId: getAttemptId(), pathSlug: recommendedPathSlug, programmeSlug: programme?.slug, confidence: confidenceSignal, decision: nextAction.target === "browse_roles" ? "compare_roles" : nextAction.target === "career_plan" ? "strengthen_capabilities" : "review_preparation" })} className="arzon-button-secondary">
                Compare roles <ArrowRight className="h-4 w-4" />
              </Link>
            ) : nextAction.target === "career_plan" ? (
              <a href="#career-plan" onClick={() => trackCECtaClicked({ step: "result", target: nextAction.target, leadId, attemptId: getAttemptId() })} className="arzon-button-secondary">
                Inspect capability plan <ArrowRight className="h-4 w-4" />
              </a>
            ) : programme ? (
              <Link to="/courses/$slug" params={{ slug: programme.slug }} onClick={() => trackCECtaClicked({ step: "result", target: nextAction.target, leadId, attemptId: getAttemptId() })} className="arzon-button-primary">
                Review preparation <ArrowRight className="h-4 w-4" />
              </Link>
            ) : null}
          </div>
        </div>

        <div id="career-plan" className="rounded-[var(--arzon-radius-lg)] border border-[var(--arzon-border)] bg-[var(--arzon-surface)] p-5">
          <div className="flex items-start gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[var(--arzon-blue-100)] text-[var(--arzon-blue-700)]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="arzon-v2-data-label">Suggested preparation path</p>
              <h3 className="mt-1 text-lg font-bold text-[var(--arzon-ink-strong)]">{programme.label}</h3>
              <p className="mt-1 text-sm leading-6 text-[var(--arzon-ink-soft)]">
                Review the syllabus, projects, tools, duration and cohort details before deciding whether this programme fits your goals.
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <Link
              to="/courses/$slug"
              params={{ slug: programme.slug }}
              onClick={() => trackCECtaClicked({ step: "result", target: "recommended_programme", leadId, attemptId: getAttemptId() })}
              className="arzon-button-primary"
            >
              Review {programme.label} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/roles/$slug"
              params={{ slug: programme.roleSlug }}
              onClick={() => trackCECtaClicked({ step: "result", target: "recommended_role", leadId, attemptId: getAttemptId() })}
              className="arzon-button-secondary"
            >
              Inspect the role
            </Link>
          </div>
        </div>
      ) : null}

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <div className="rounded-lg border border-[var(--arzon-border)] bg-white p-4">
          <p className="text-sm font-semibold text-[var(--arzon-ink-strong)]">Understand the role</p>
          <p className="mt-1 text-xs leading-5 text-[var(--arzon-ink-soft)]">See the actual work, skills, tools and employer context.</p>
        </div>
        <div className="rounded-lg border border-[var(--arzon-border)] bg-white p-4">
          <p className="text-sm font-semibold text-[var(--arzon-ink-strong)]">Check the preparation</p>
          <p className="mt-1 text-xs leading-5 text-[var(--arzon-ink-soft)]">Compare projects and programme coverage against the role.</p>
        </div>
        <div className="rounded-lg border border-[var(--arzon-border)] bg-white p-4">
          <p className="text-sm font-semibold text-[var(--arzon-ink-strong)]">Ask if you need context</p>
          <p className="mt-1 text-xs leading-5 text-[var(--arzon-ink-soft)]">Talk to a counsellor without committing to a programme.</p>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
        <a
          href={waLink(waText)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackCECtaClicked({ step: "result", target: "whatsapp", leadId, attemptId: getAttemptId() })}
          className="arzon-button-secondary"
        >
          <MessageCircle className="h-4 w-4" /> Talk to a counsellor
        </a>
        <Link
          to="/roles"
          onClick={() => trackCECtaClicked({ step: "result", target: "browse_roles", leadId, attemptId: getAttemptId() })}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold text-[var(--arzon-blue-700)] hover:bg-[var(--arzon-blue-100)]"
        >
          Explore other roles <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

export default ResultNextStepCard;
