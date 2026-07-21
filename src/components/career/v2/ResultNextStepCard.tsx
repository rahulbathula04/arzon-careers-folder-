import { ArrowRight, CalendarDays, MessageCircle, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { SEAT_FEE, waLink } from "@/components/landing/constants";
import { getAttemptId } from "@/lib/careerEngineApi";
import { trackCECtaClicked } from "@/lib/careerEngineAnalytics";

export function ResultNextStepCard({
  leadId,
  archetypeLabel,
  fitScore,
}: {
  leadId: string | null;
  archetypeLabel: string;
  fitScore: number;
}) {
  const waText = `Hi Arzon — I got a ${archetypeLabel} fit score of ${fitScore}/100 and want help choosing the next step.`;

  return (
    <section className="mt-10 rounded-[28px] border border-white/12 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-5 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.75)] sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 font-mono text-micro font-semibold uppercase tracking-[0.18em] text-gold">
            <Sparkles className="h-3.5 w-3.5" /> Strongest next move
          </div>
          <h2 className="mt-4 font-grotesk text-2xl font-bold text-white">Reserve your seat</h2>
          <p className="mt-2 text-sm leading-6 text-white/75">
            Your fit report is most useful when you act while it is fresh. Lock in the next open
            cohort, get a 1-on-1 onboarding call, and keep your place fully adjusted against the
            full programme fee.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#091425]/80 px-4 py-3 text-sm text-white/80">
          <p className="font-mono text-micro uppercase tracking-[0.2em] text-white/50">
            Seat reservation
          </p>
          <p className="mt-1 font-grotesk text-xl font-semibold text-white">{SEAT_FEE}</p>
          <p className="mt-1 text-xs text-white/60">Fully adjusted in your fee</p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <CalendarDays className="h-4 w-4 text-gold" />
          <p className="mt-2 font-grotesk text-sm font-semibold text-white">Next cohort</p>
          <p className="mt-1 text-sm text-white/70">Choose the next live batch before it fills.</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <ShieldCheck className="h-4 w-4 text-gold" />
          <p className="mt-2 font-grotesk text-sm font-semibold text-white">Proof-backed path</p>
          <p className="mt-1 text-sm text-white/70">
            Your reservation is credited against the full programme fee.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <MessageCircle className="h-4 w-4 text-gold" />
          <p className="mt-2 font-grotesk text-sm font-semibold text-white">1-on-1 onboarding</p>
          <p className="mt-1 text-sm text-white/70">
            A counsellor helps you move from insight to action within 24 hours.
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Link
          to="/career-engine/enrol"
          onClick={() =>
            trackCECtaClicked({
              step: "result",
              target: "confirm_seat",
              leadId,
              attemptId: getAttemptId(),
            })
          }
          className="btn btn-gold inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold"
        >
          Reserve my seat · {SEAT_FEE}
          <ArrowRight className="h-4 w-4" />
        </Link>
        <a
          href={waLink(waText)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackCECtaClicked({
              step: "result",
              target: "whatsapp",
              leadId,
              attemptId: getAttemptId(),
            })
          }
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/[0.07]"
        >
          <MessageCircle className="h-4 w-4" /> Talk to a counsellor
        </a>
      </div>
    </section>
  );
}

export default ResultNextStepCard;
