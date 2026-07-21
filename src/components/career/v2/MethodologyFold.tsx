import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";

/**
 * Collapsed methodology + ASSAY handoff. Lives at the bottom of the
 * brief so the hero stays clean.
 */
export function MethodologyFold({ leadId: _leadId }: { leadId: string | null }) {
  return (
    <section className="rounded-3xl border border-white/8 bg-white/[0.02] p-6 sm:p-7">
      <details className="group">
        <summary className="cursor-pointer list-none">
          <div className="flex items-center justify-between gap-3">
            <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-white/55">
              How this brief was built
            </p>
            <span className="font-mono text-micro uppercase tracking-[0.22em] text-white/45 group-open:hidden">
              expand
            </span>
            <span className="hidden font-mono text-micro uppercase tracking-[0.22em] text-white/45 group-open:inline">
              collapse
            </span>
          </div>
        </summary>

        <div className="mt-4 space-y-3 text-sm text-white/75">
          <p>
            Five pillars feed every fit score: <span className="text-white">eligibility</span> (your
            degree against the role's hard prerequisites),{" "}
            <span className="text-white">work style</span> (rhythm, attention to detail, autonomy),{" "}
            <span className="text-white">niche evidence</span> (specific signals — patient ID
            lookups, query CRFs, ICD-10), <span className="text-white">consistency</span> (do your
            answers agree with each other?) and <span className="text-white">market demand</span>{" "}
            (how many live Indian JDs the role is moving right now).
          </p>
          <p>
            Fit % is a directional signal from your 40-answer test — not a validated employability
            score. Salary bands anchor to the JD counts shown above and refresh quarterly. We never
            auto-promise placement.
          </p>
        </div>
      </details>

      <div className="mt-6 rounded-2xl border border-accent-glow/25 bg-accent-glow/[0.05] p-5">
        <Sparkles className="h-5 w-5 text-eyebrow" />
        <p className="mt-2 font-grotesk text-lg font-extrabold text-white">
          Want to know if you're job-ready?
        </p>
        <p className="mt-1.5 text-sm text-white/75">
          This brief tells you <em>which</em> career fits. ASSAY tells you <em>whether</em> you'd
          get hired today — documentation, communication, domain knowledge, simulations.
        </p>
        <Link
          to="/career-engine/enrol"
          className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-accent-glow/40 bg-accent-glow/[0.08] px-4 py-2 text-sm font-bold text-eyebrow-strong transition hover:border-accent-glow/70"
        >
          Take ASSAY <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  );
}

export default MethodologyFold;
