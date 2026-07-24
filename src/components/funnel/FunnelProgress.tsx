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
      className={`border-b border-ink/10 bg-white/70 backdrop-blur ${compact ? "" : ""}`}
    >
      <div className={`mx-auto max-w-5xl px-3 sm:px-6 ${compact ? "py-3" : "py-4 sm:py-5"}`}>
        <p className="sr-only">
          Step {currentIndex + 1} of {PHASES.length}: {PHASES[currentIndex]?.label}
        </p>
        <ol className="flex items-center gap-1 sm:gap-3">
          {PHASES.map((phase, i) => {
            const done = i < currentIndex;
            const active = i === currentIndex;
            return (
              <li
                key={phase.id}
                className="flex min-w-0 flex-1 items-center gap-1 sm:gap-3"
                aria-current={active ? "step" : undefined}
              >
                <span
                  aria-hidden="true"
                  className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-micro font-semibold sm:h-7 sm:w-7 ${
                    done
                      ? "bg-[color:var(--teal-deep)] text-white"
                      : active
                        ? "bg-navy text-white"
                        : "bg-ink/10 text-[color:var(--ink-mute)]"
                  }`}
                >
                  {done ? <Check className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> : i + 1}
                </span>
                <span
                  className={`hidden text-xs font-medium md:inline ${
                    active
                      ? "text-[color:var(--ink)]"
                      : done
                        ? "text-[color:var(--ink-soft)]"
                        : "text-[color:var(--ink-mute)]"
                  }`}
                >
                  {phase.label}
                </span>
                <span
                  className={`truncate text-micro font-medium md:hidden ${
                    active
                      ? "text-[color:var(--ink)]"
                      : done
                        ? "text-[color:var(--ink-soft)]"
                        : "text-[color:var(--ink-mute)]"
                  }`}
                >
                  {phase.short}
                </span>
                {i < PHASES.length - 1 && (
                  <span
                    aria-hidden="true"
                    className={`hidden h-px flex-1 sm:mx-1 sm:inline-block ${done ? "bg-[color:var(--teal-deep)]/60" : "bg-ink/10"}`}
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
