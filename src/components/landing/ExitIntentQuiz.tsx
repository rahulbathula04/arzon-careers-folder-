import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Sparkles, ArrowRight, GraduationCap, ClipboardCheck, X } from "lucide-react";

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

        <div className="relative overflow-hidden rounded-[20px] card-dark ring-1 ring-[#c9a84c]/30">
          {/* gold gradient strip */}
          <div
            aria-hidden
            className="h-1 w-full"
            style={{ background: "linear-gradient(90deg,#c9a84c 0%,#f0d78c 50%,#c9a84c 100%)" }}
          />

          {/* gold halo */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-16 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full opacity-60 blur-3xl"
            style={{ background: "radial-gradient(circle,rgba(201,168,76,0.45),transparent 70%)" }}
          />

          <button
            onClick={() => onOpenChange(false)}
            aria-label="Close"
            className="absolute right-3 top-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-50/10 text-slate-100/80 ring-1 ring-white/15 transition-colors hover:bg-slate-50/15 hover:text-slate-50"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="relative p-6 sm:p-8">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#c9a84c]/15 px-3 py-1 font-mono text-micro font-bold uppercase tracking-[0.22em] text-[#f0d78c] ring-1 ring-[#c9a84c]/40">
              <Sparkles className="h-3 w-3" />
              90-second fit check · free
            </span>

            <h2 className="font-display mt-4 text-h2 text-slate-50">
              Wait before you go, is healthcare even{" "}
              <span className="text-[#f0d78c]">your fit?</span>
            </h2>

            <p className="mt-3 text-body-sm leading-relaxed text-slate-100/75">
              Most people don't know if pharmacovigilance or medical coding suits them. Answer 6
              quick questions, get a personal track recommendation and a salary band for your city.
              No email required.
            </p>

            <ul className="mt-5 space-y-2 text-caption text-slate-100/85">
              <li className="flex items-center gap-2">
                <ClipboardCheck className="h-4 w-4 shrink-0 text-[#f0d78c]" />
                Scored on Operational reasoning + Domain awareness
              </li>
              <li className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 shrink-0 text-[#f0d78c]" />
                Built for graduates · 1st year through working pros
              </li>
            </ul>

            <div className="mt-6 flex flex-col gap-2.5">
              <Button asChild variant="premium" size="lg" className="w-full">
                <Link
                  to="/career-engine/start"
                  onClick={() => {
                    persistDismiss();
                    setOpen(false);
                  }}
                >
                  Take the 90-second test
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="text-center text-meta text-slate-100/55 underline underline-offset-4 transition-colors hover:text-slate-100/80"
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
