import { createFileRoute, Outlet, Link, useRouterState } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import arzonIcon from "@/assets/arzon-icon.webp";
import { FunnelProgress } from "@/components/funnel/FunnelProgress";
import { EnrolErrorFallback } from "@/components/enrol/EnrolErrorFallback";

export const Route = createFileRoute("/enrol")({
  head: () => ({
    meta: [
      { title: "Enrol now. Arzon Global" },
      {
        name: "description",
        content: "Skip the test and enrol directly in your Arzon Global programme.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: EnrolLayout,
  errorComponent: ({ error, reset }) => (
    <main className="min-h-app surface-page tone-light">
      <div className="mx-auto max-w-4xl px-4 pb-12 pt-10 sm:px-6">
        <EnrolErrorFallback error={error} reset={reset} where="enrolment" />
      </div>
    </main>
  ),
});

function EnrolLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isPayStep = pathname.endsWith("/pay");
  return (
    <main className="min-h-app surface-page tone-light">
      <header className="border-b border-ink/10 bg-card/70 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg bg-[#070B17] ring-1 ring-ink/10">
              <img src={arzonIcon} alt="" className="h-full w-full object-contain" />
            </div>
            <div className="leading-none">
              <p className="font-mono text-caption font-semibold tracking-[0.28em] text-[color:var(--ink)]">
                ARZON
              </p>
              <p className="font-mono text-micro tracking-[0.42em] text-[color:var(--ink-soft)]">
                GLOBAL
              </p>
            </div>
          </Link>
          {!isPayStep && (
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs text-[color:var(--ink-soft)] hover:text-[color:var(--ink)]"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to home
            </Link>
          )}
        </div>
      </header>
      <FunnelProgress />
      <div className="mx-auto max-w-4xl px-4 pb-12 pt-6 sm:px-6">
        <Outlet />
      </div>
    </main>
  );
}
