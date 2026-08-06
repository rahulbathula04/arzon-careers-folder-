import { Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle } from "lucide-react";
import {
  BATCH_DATE_LABEL,
  COUNSELLOR_PHONE_DISPLAY,
  PRICE_CAREER,
  waLink,
} from "@/components/landing/constants";
import { trackCECtaClicked } from "@/lib/careerEngineAnalytics";
import { getAttemptId } from "@/lib/careerEngineApi";

type Props = {
  leadId: string | null;
  archetype?: string;
};

/**
 * Conversion strip surfaced at the top of /career-engine/result.
 *
 * Why: result view is the highest-intent surface in the funnel. The
 * Career Fit Report is dense and reflective; without a clear "what now?"
 * primary action above it, users bounce. This card gives a single
 * "Confirm my seat" path with price + next batch date, plus a
 * counsellor fallback on WhatsApp.
 */
export function ResultConversionStrip({ leadId, archetype }: Props) {
  const waText = "Hi Arzon - I just finished the career fit test and want to talk about my result.";
  return (
    <aside
      aria-label="Next step"
      className="mb-6 overflow-hidden rounded-3xl border border-amber-300/30 bg-gradient-to-br from-[#1a1430] via-[#0f1a3d] to-[#0a1430] p-5 shadow-[0_24px_60px_-20px_rgba(251,191,36,0.35)] sm:p-7"
    >
      <p className="font-mono text-micro uppercase tracking-[0.18em] text-amber-200/90">
        Your next step
      </p>
      <h2
        className="mt-2 text-white"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          letterSpacing: "-0.02em",
          fontSize: "clamp(1.5rem, 3.4vw, 2rem)",
          lineHeight: 1.1,
        }}
      >
        Confirm your seat for the next cohort
      </h2>
      <p className="mt-3 max-w-2xl text-sm text-slate-200/85 sm:text-base">
        Lock the {PRICE_CAREER} Career tier · ₹999 seat lock token. Cohort starts {BATCH_DATE_LABEL}
        . Seats are released in the order they are confirmed.
      </p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Link
          to="/career-engine/enrol"
          search={leadId ? { id: leadId } : undefined}
          onClick={() =>
            trackCECtaClicked({
              step: "result",
              target: "confirm_seat",
              leadId,
              attemptId: getAttemptId(),
            })
          }
          className="btn btn-gold btn-xl btn-block btn-block-sm-auto"
        >
          <span>Confirm my seat</span>
          <span data-arrow aria-hidden>
            <ArrowRight className="h-5 w-5" strokeWidth={2.5} focusable="false" />
          </span>
        </Link>
        <a
          href={waLink(waText)}
          target="_blank" rel="noopener noreferrer"
          onClick={() =>
            trackCECtaClicked({
              step: "result",
              target: "whatsapp",
              leadId,
              attemptId: getAttemptId(),
            })
          }
          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
        >
          <MessageCircle className="h-4 w-4" aria-hidden focusable="false" />
          Talk to a counsellor · {COUNSELLOR_PHONE_DISPLAY}
        </a>
      </div>
      {archetype ? (
        <p className="mt-4 font-mono text-micro uppercase tracking-[0.18em] text-white/55">
          Matched archetype · {archetype.replace(/_/g, " ")}
        </p>
      ) : null}
    </aside>
  );
}

export default ResultConversionStrip;
