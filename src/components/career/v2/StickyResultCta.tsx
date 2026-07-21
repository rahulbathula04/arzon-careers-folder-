import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle } from "lucide-react";
import { PRICE_CAREER, waLink } from "@/components/landing/constants";
import { trackCECtaClicked } from "@/lib/careerEngineAnalytics";
import { getAttemptId } from "@/lib/careerEngineApi";

/**
 * Bottom-pinned conversion bar. Appears once the user has scrolled past
 * the verdict header. WhatsApp link routes to the founder's number
 * silently — digits are never printed.
 */
export function StickyResultCta({ leadId }: { leadId: string | null }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => setVisible(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const waText = "Hi Arzon — I just got my Career Brief and want sharp guidance on the next step.";

  return (
    <div
      aria-hidden={!visible}
      className={`pointer-events-none fixed inset-x-0 bottom-0 z-40 transition-all duration-300 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      <div className="pointer-events-auto mx-auto max-w-3xl px-3 pb-3 sm:pb-4">
        <div className="flex flex-col items-stretch gap-2 rounded-2xl border border-white/12 bg-[#040d1c]/95 p-2.5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.7)] backdrop-blur sm:flex-row sm:items-center sm:gap-3 sm:p-3">
          <a
            href={waLink(waText)}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="brief-whatsapp"
            onClick={() =>
              trackCECtaClicked({
                step: "result",
                target: "whatsapp",
                leadId,
                attemptId: getAttemptId(),
              })
            }
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/[0.07]"
          >
            <MessageCircle className="h-4 w-4" aria-hidden focusable="false" />
            Talk to a counsellor on WhatsApp
          </a>
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
            className="btn btn-gold inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold"
          >
            <span>Lock my seat · {PRICE_CAREER}</span>
            <span data-arrow aria-hidden>
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} focusable="false" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default StickyResultCta;
