import { ArrowRight, CalendarDays, MessageCircle, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { SEAT_FEE, waLink } from "@/components/landing/constants";
import { getAttemptId } from "@/lib/careerEngineApi";
import { trackCECtaClicked } from "@/lib/careerEngineAnalytics";

const PROGRAMMES: Record<string, { slug: string; label: string }> = {
  "medical-coding": { slug: "medical-coding", label: "Medical Coding" },
  "clinical-data-management": { slug: "clinical-data-management", label: "Clinical Data Management" },
  "pharmacovigilance": { slug: "pharmacovigilance", label: "Pharmacovigilance" },
  "sas-clinical": { slug: "sas-clinical", label: "Clinical SAS" },
  "regulatory-affairs": { slug: "regulatory-affairs", label: "Regulatory Affairs" },
  "clinical-saas": { slug: "clinical-saas", label: "Healthcare Technology" },
  "ai-intelligence": { slug: "ai-intelligence", label: "AI in Healthcare" },
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
  recommendedPathSlug?: string | null;
}) {
  const programme = recommendedPathSlug ? PROGRAMMES[recommendedPathSlug] : null;
  const waText = `Hi Arzon - I got a ${archetypeLabel} fit score of ${fitScore}/100. My recommended path is ${programme?.label ?? "healthcare careers"}. I want help with the next step.`;

  return (
    <section className="mt-10 rounded-[28px] border border-white/12 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-5 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.75)] sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 font-mono text-micro font-semibold uppercase tracking-[0.18em] text-gold">
            <Sparkles className="h-3.5 w-3.5" /> Recommended next step
          </div>
          <h2 className="mt-4 font-grotesk text-2xl font-bold text-white">
            {programme ? `Build toward ${programme.label}` : "Choose your next career step"}
          </h2>
          <p className="mt-2 text-sm leading-6 text-white/75">
            Your assessment identifies a strongest path. Use the recommendation to inspect the matching programme before deciding whether it fits your goals.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#091425]/80 px-4 py-3 text-sm text-white/80">
          <p className="font-mono text-micro uppercase tracking-[0.2em] text-white/50">Fit score</p>
          <p className="mt-1 font-grotesk text-xl font-semibold text-white">{fitScore}/100</p>
          <p className="mt-1 text-xs text-white/60">{archetypeLabel}</p>
        </div>
      </div>

      {programme ? (
        <div className="mt-6 rounded-2xl border border-gold/25 bg-gold/[0.06] p-5">
          <p className="font-mono text-micro uppercase tracking-[0.16em] text-gold">Matched programme</p>
          <h3 className="mt-2 font-grotesk text-xl font-bold text-white">{programme.label}</h3>
          <p className="mt-1 text-sm text-white/70">This is the programme connected to your top Career Engine path. Review its syllabus, projects, duration and cohort details before enrolling.</p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/courses/$slug"
              params={{ slug: programme.slug }}
              onClick={() => trackCECtaClicked({ step: "result", target: "recommended_programme", leadId, attemptId: getAttemptId() })}
              className="btn btn-gold inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold"
            >
              View {programme.label} programme <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/courses"
              onClick={() => trackCECtaClicked({ step: "result", target: "compare_programmes", leadId, attemptId: getAttemptId() })}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-white"
            >
              Compare programmes
            </Link>
          </div>
        </div>
      ) : null}

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"><CalendarDays className="h-4 w-4 text-gold" /><p className="mt-2 font-grotesk text-sm font-semibold text-white">Next cohort</p><p className="mt-1 text-sm text-white/70">Review the next available cohort only after checking the programme fit.</p></div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"><ShieldCheck className="h-4 w-4 text-gold" /><p className="mt-2 font-grotesk text-sm font-semibold text-white">Role-linked preparation</p><p className="mt-1 text-sm text-white/70">The recommendation is tied to the path returned by the assessment, not a generic catalogue page.</p></div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"><MessageCircle className="h-4 w-4 text-gold" /><p className="mt-2 font-grotesk text-sm font-semibold text-white">Need context?</p><p className="mt-1 text-sm text-white/70">Ask a counsellor to review the result with you.</p></div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Link
          to="/career-engine/enrol"
          onClick={() => trackCECtaClicked({ step: "result", target: "confirm_seat", leadId, attemptId: getAttemptId() })}
          className="btn btn-gold inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold"
        >
          Reserve my seat · {SEAT_FEE} <ArrowRight className="h-4 w-4" />
        </Link>
        <a
          href={waLink(waText)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackCECtaClicked({ step: "result", target: "whatsapp", leadId, attemptId: getAttemptId() })}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-white"
        >
          <MessageCircle className="h-4 w-4" /> Talk to a counsellor
        </a>
      </div>
    </section>
  );
}

export default ResultNextStepCard;
