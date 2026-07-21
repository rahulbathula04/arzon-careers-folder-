import { useEffect, useState, type ReactNode } from "react";

/**
 * Cinematic intro frame for the result reveal. Mounts a centered
 * "scoring…" caption for ~900ms, then crossfades into children. Pure
 * CSS keyframes, motion-safe.
 */
export function RevealStage({ children }: { children: ReactNode }) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      setRevealed(true);
      return;
    }
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setRevealed(true);
      return;
    }
    const t = window.setTimeout(() => setRevealed(true), 900);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div className="relative">
      {!revealed ? (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-start pt-20">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 motion-safe:animate-pulse rounded-full bg-primary-glow" />
            <span className="h-1.5 w-1.5 motion-safe:animate-pulse rounded-full bg-primary-glow [animation-delay:200ms]" />
            <span className="h-1.5 w-1.5 motion-safe:animate-pulse rounded-full bg-primary-glow [animation-delay:400ms]" />
          </div>
          <p className="mt-4 font-mono text-micro uppercase tracking-[0.22em] text-white/55">
            Scoring 13 traits across 6 paths…
          </p>
        </div>
      ) : null}
      <div
        className="transition-[opacity,transform] duration-[600ms] ease-out"
        style={{
          opacity: revealed ? 1 : 0,
          transform: revealed ? "translateY(0)" : "translateY(8px)",
        }}
      >
        {children}
      </div>
    </div>
  );
}
