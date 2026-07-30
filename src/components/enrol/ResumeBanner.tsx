import { Link } from "@tanstack/react-router";
import { ArrowRight, RotateCcw, Clock } from "lucide-react";
import { TIER_META } from "@/data/enrolmentTiers";
import { useEnrolProgress } from "@/hooks/useEnrolProgress";
import { track } from "@/lib/track";
import { useEffect } from "react";

/**
 * Resume where you left off - shown on /enrol and /enrol/$tier when a
 * previous enrolment intent is still in localStorage. Clicking Resume
 * jumps straight to the payment step with the original intent + token.
 */
export function ResumeBanner() {
  const { state, clear } = useEnrolProgress();

  useEffect(() => {
    if (state?.intentId) {
      track("enrol_resume_shown", {
        program_slug: state.tier ?? null,
        props: { intent_id: state.intentId, step: state.step },
      });
    }
  }, [state?.intentId, state?.step, state?.tier]);

  if (!state?.intentId || !state.intentToken || !state.tier) return null;
  const meta = TIER_META[state.tier];
  const name = state.contact?.name?.split(" ")[0];

  return (
    <div
      role="status"
      className="tone-light card-light mb-6 rounded-2xl border border-[color:var(--teal-deep)]/25 bg-[color:var(--teal-soft)] p-4 shadow-sm"
    >
      <div className="flex items-start gap-3">
        <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[color:var(--teal-deep)]" aria-hidden />
        <div>
          <p className="text-sm font-semibold text-[color:var(--ink)]">
            {name ? `Welcome back, ${name}` : "Continue your enrolment"}
          </p>
          <p className="mt-0.5 text-xs text-[color:var(--ink-soft)]">
            {meta.name} programme · your seat is still held. Pick up at secure payment.
          </p>
        </div>
      </div>
      <div className="mt-4 flex flex-col items-stretch gap-2">
        <Link
          to="/enrol/$tier/pay"
          params={{ tier: state.tier }}
          search={{ intent: state.intentId, t: state.intentToken }}
          onClick={() =>
            track("enrol_resume_clicked", {
              program_slug: state.tier ?? null,
              props: { intent_id: state.intentId, step: state.step },
            })
          }
          className="cta-navy inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold shadow-md ring-1 ring-[color:var(--teal-deep)]/30 transition hover:opacity-95"
        >
          Resume payment <ArrowRight className="h-4 w-4" />
        </Link>
        <button
          type="button"
          onClick={() => {
            track("enrol_resume_cleared", {
              program_slug: state.tier ?? null,
              props: { intent_id: state.intentId },
            });
            clear();
          }}
          className="inline-flex items-center justify-center gap-1 self-center rounded-md px-3 py-1.5 text-xs font-medium text-[color:var(--ink-mute)] underline-offset-4 hover:text-[color:var(--ink-soft)] hover:underline"
        >
          <RotateCcw className="h-3 w-3" aria-hidden /> Start over
        </button>
      </div>
    </div>
  );
}
