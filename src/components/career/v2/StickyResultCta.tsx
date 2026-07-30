import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle, ShieldCheck } from "lucide-react";
import { PRICE_SEAT_LOCK, waLink } from "@/components/landing/constants";
import { trackCECtaClicked } from "@/lib/careerEngineAnalytics";
import { getAttemptId } from "@/lib/careerEngineApi";

export function StickyResultCta({ leadId }: { leadId: string | null }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => setVisible(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const waText =
    "Hi Arzon - I just completed my Career Brief and want to lock my seat for the upcoming cohort.";

  return (
    <div
      aria-hidden={!visible}
      className={`pointer-events-none fixed inset-x-0 bottom-0 z-40 transition-all duration-300 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      <div className="pointer-events-auto mx-auto max-w-3xl px-3 pb-3 sm:pb-4">
        <div className="rounded-2xl border border-white/15 bg-[#0B0F19]/95 p-3.5 shadow-2xl backdrop-blur-xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
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
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 px-4 py-3 text-xs font-bold text-emerald-400 transition-colors"
          >
            <MessageCircle className="h-4 w-4 text-emerald-400" />
            <span>Chat with Mentor on WhatsApp</span>
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
            className="flex-1 text-xs px-5 py-3 rounded-xl inline-flex flex-col items-center justify-center text-white font-bold bg-[#2563EB] hover:bg-[#1d4ed8] shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02]"
          >
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-white" />
              <span>Lock Seat · {PRICE_SEAT_LOCK} Deposit</span>
              <ArrowRight className="h-4 w-4" />
            </div>
            <span className="text-[10px] font-normal opacity-90">
              Fully adjusted on cohort start date
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default StickyResultCta;
