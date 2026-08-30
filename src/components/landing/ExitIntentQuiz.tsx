import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Link } from "@tanstack/react-router";
import { Sparkles, ArrowRight, GraduationCap, ClipboardCheck, X } from "lucide-react";
import { PremiumChip } from "@/components/ui/PremiumChip";

const STORAGE_KEY = "az_exit_quiz_seen_v1";
const SCROLL_TRIGGER_PCT = 65;

/**
 * Exit-intent + scroll-depth re-engagement modal. Triggers on either:
 *   - desktop cursor leaving the viewport at the top (classic exit-intent), OR
 *   - any device once the user passes ~65% scroll depth.
 * Offers a free 90-second "Is pharma right for me?" fit-check that funnels
 * to /career-engine/start. Suppresses itself after one dismissal per device
 * via localStorage.
 */
export function ExitIntentQuiz() {
  const [open, setOpen] = useState(false);
  const [primed, setPrimed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (localStorage.getItem(STORAGE_KEY)) return;
    } catch {
      // ignore storage errors
    }
    // Don't arm before 8s - avoid hitting visitors who immediately bounce
    const armTimer = window.setTimeout(() => setPrimed(true), 8000);
    return () => window.clearTimeout(armTimer);
  }, []);

  useEffect(() => {
    if (!primed) return;

    const trigger = () => {
      setOpen(true);
      cleanup();
    };

    const onMouseOut = (e: MouseEvent) => {
      // Only when the pointer exits via the top of the viewport
      if (e.relatedTarget === null && e.clientY <= 0) trigger();
    };

    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      if (max <= 0) return;
      const pct = (h.scrollTop / max) * 100;
      if (pct >= SCROLL_TRIGGER_PCT) trigger();
    };

    const cleanup = () => {
      document.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("scroll", onScroll);
    };

    document.addEventListener("mouseout", onMouseOut);
    window.addEventListener("scroll", onScroll, { passive: true });
    return cleanup;
  }, [primed]);

  const persistDismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch {
      // ignore storage errors
    }
  };

  const onOpenChange = (v: boolean) => {
    if (!v) persistDismiss();
    setOpen(v);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden border-0 bg-transparent p-0 shadow-none sm:max-w-[480px]">
        <DialogTitle className="sr-only">Free 90-second fit check</DialogTitle>

        <div className="relative overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-2xl">
          {/* Top gold brand strip */}
          <div
            aria-hidden
            className="h-1.5 w-full bg-gradient-to-r from-[#1B3F8B] via-[#8A6D1F] to-[#1B3F8B]"
          />

          <button
            onClick={() => onOpenChange(false)}
            aria-label="Close"
            className="absolute right-3.5 top-4 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-stone-100 text-stone-600 transition-colors hover:bg-stone-200 hover:text-stone-900 cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="relative p-6 sm:p-8 space-y-4">
            <div>
              <PremiumChip variant="gold" size="sm">
                FREE 90-SECOND FIT CHECK
              </PremiumChip>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A] leading-snug">
              Wait before you go — is healthcare{" "}
              <span className="text-[#1B3F8B] italic font-normal">your right fit?</span>
            </h2>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans font-normal">
              Most freshers don't know if Pharmacovigilance, Medical Coding, or CDM matches their
              skills. Answer 6 quick questions to get an instant salary benchmark and track recommendation.
            </p>

            <ul className="space-y-2 text-xs text-stone-700 font-sans">
              <li className="flex items-center gap-2">
                <ClipboardCheck className="h-4 w-4 shrink-0 text-[#1B3F8B]" />
                <span>Evaluates operational reasoning &amp; technical aptitude</span>
              </li>
              <li className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 shrink-0 text-[#8A6D1F]" />
                <span>Customized for B.Pharm, Pharm.D &amp; Life Sciences graduates</span>
              </li>
            </ul>

            <div className="pt-2 flex flex-col gap-2.5">
              <Link
                to="/career-engine/start"
                onClick={() => {
                  persistDismiss();
                  setOpen(false);
                }}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#1B3F8B] hover:bg-[#153270] text-slate-50 font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                <span>Take the 90-Second Test</span>
                <ArrowRight className="h-4 w-4 text-slate-50" />
              </Link>
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="text-center text-xs text-stone-500 hover:text-stone-800 underline underline-offset-4 transition-colors cursor-pointer py-1"
              >
                No thanks, I'll decide later
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
