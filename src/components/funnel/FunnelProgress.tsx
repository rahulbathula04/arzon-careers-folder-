import { useRouterState } from "@tanstack/react-router";
import { Check } from "lucide-react";

/**
 * Unified funnel progress bar spanning the apply → enrol → pay → confirmed flow.
 * One component so users see their position even when crossing the apply/enrol boundary.
 */
type PhaseId = "profile" | "programme" | "seat" | "payment" | "confirmed";

const PHASES: { id: PhaseId; label: string; short: string }[] = [
  { id: "profile", label: "Your profile", short: "Profile" },
  { id: "programme", label: "Pick programme", short: "Program" },
  { id: "seat", label: "Apply", short: "Seat" },
  { id: "payment", label: "Payment", short: "Pay" },
  { id: "confirmed", label: "Confirmed", short: "Done" },
];

function phaseFromPath(pathname: string): PhaseId {
  if (pathname === "/enrol/success" || pathname === "/apply/success") return "confirmed";
  if (pathname.endsWith("/pay")) return "payment";
  if (pathname === "/enrol") return "programme";
  if (/^\/enrol\/[^/]+$/.test(pathname)) return "seat";
  if (pathname === "/apply/confirm") return "seat";
  if (pathname === "/apply/review") return "programme";
  return "profile";
}

interface Props {
  /** Override pathname (for storybook / testing). */
  pathnameOverride?: string;
  /** Tighter padding for use inside dialog-like shells. */
  compact?: boolean;
}

export function FunnelProgress({ pathnameOverride, compact = false }: Props) {
  const livePath = useRouterState({ select: (s) => s.location.pathname });
  const pathname = pathnameOverride ?? livePath;
  const currentId = phaseFromPath(pathname);
  const currentIndex = PHASES.findIndex((p) => p.id === currentId);

  return (
    <nav
      aria-label="Enrolment progress"
      className="border-b border-white/10 bg-[#0B132B]/80 backdrop-blur-xl text-white w-full"
    >
      <div
        className={`mx-auto max-w-[1728px] w-full px-4 sm:px-8 lg:px-12 ${compact ? "py-3" : "py-4 sm:py-5"}`}
      >
        <p className="sr-only">
          Step {currentIndex + 1} of {PHASES.length}: {PHASES[currentIndex]?.label}
        </p>
        <ol className="flex items-center gap-1 sm:gap-4">
          {PHASES.map((phase, i) => {
            const done = i < currentIndex;
            const active = i === currentIndex;
            return (
              <li
                key={phase.id}
                className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3"
                aria-current={active ? "step" : undefined}
              >
                <span
                  aria-hidden="true"
                  className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold sm:h-7 sm:w-7 transition-all ${
                    done
                      ? "bg-emerald-500 text-slate-950 font-bold"
                      : active
                        ? "bg-blue-600 text-white ring-2 ring-blue-400/50 shadow-lg shadow-blue-900/50"
                        : "bg-white/10 text-slate-400"
                  }`}
                >
                  {done ? <Check className="h-3.5 w-3.5 stroke-[3]" /> : i + 1}
                </span>
                <span
                  className={`hidden text-xs font-semibold md:inline tracking-wide ${
                    active ? "text-white font-bold" : done ? "text-slate-300" : "text-slate-500"
                  }`}
                >
                  {phase.label}
                </span>
                <span
                  className={`truncate text-[11px] font-semibold md:hidden ${
                    active ? "text-white font-bold" : done ? "text-slate-300" : "text-slate-500"
                  }`}
                >
                  {phase.short}
                </span>
                {i < PHASES.length - 1 && (
                  <span
                    aria-hidden="true"
                    className={`hidden h-0.5 flex-1 sm:mx-2 sm:inline-block rounded-full ${
                      done ? "bg-emerald-500/60" : "bg-white/10"
                    }`}
                  />
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
