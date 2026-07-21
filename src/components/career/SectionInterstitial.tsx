import { useEffect, useState } from "react";
import { KIND_META } from "@/data/careerEngineKindMeta";
import type { QuestionKind } from "@/data/careerEngineQuestions";

const SECTION_TITLE: Record<QuestionKind, string> = {
  profile: "Quick context",
  scenario: "Real shift situations",
  behaviour: "How you work",
  micro: "Mini skill checks",
  lifestyle: "Your life fit",
  commitment: "Reality check",
};

/**
 * Brief chapter break shown when the test enters a new question kind.
 * Auto-dismisses after ~1.4s. Fades and never blocks the user — if they
 * answer the next question while it's up, it just fades.
 */
export function SectionInterstitial({ kind, nonce }: { kind: QuestionKind; nonce: number }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    setShow(true);
    const t = window.setTimeout(() => setShow(false), 1400);
    return () => window.clearTimeout(t);
  }, [kind, nonce]);

  if (!show) return null;
  const meta = KIND_META[kind];
  return (
    <div
      className="pointer-events-none mb-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-center motion-safe:animate-[fade-in_300ms_ease-out]"
      role="status"
      aria-live="polite"
    >
      <p className={`font-mono text-micro font-semibold uppercase tracking-[0.22em] ${meta.text}`}>
        New section
      </p>
      <p className="mt-1 font-grotesk text-sm font-bold text-white">{SECTION_TITLE[kind]}</p>
      <p className="mt-1 text-micro text-white/60">{meta.why}</p>
    </div>
  );
}
