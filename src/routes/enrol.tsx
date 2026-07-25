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
    <main className="min-h-screen bg-[#070B19] text-white w-full">
      <header className="border-b border-white/10 bg-[#0A1024]/90 backdrop-blur-xl w-full">
        <div className="mx-auto flex max-w-[1728px] w-full items-center justify-between px-4 sm:px-8 lg:px-12 py-4">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg bg-[#070B17] ring-1 ring-white/20">
              <img src={arzonIcon} alt="" className="h-full w-full object-contain" />
            </div>
            <div className="leading-none">
              <p className="font-mono text-xs font-semibold tracking-[0.28em] text-white">
                ARZON
              </p>
              <p className="font-mono text-[10px] tracking-[0.42em] text-slate-400">
                GLOBAL
              </p>
            </div>
          </Link>
          {!isPayStep && (
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white font-medium transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to home
            </Link>
          )}
        </div>
      </header>
      <FunnelProgress />
      <div className="mx-auto max-w-[1728px] w-full px-4 sm:px-8 lg:px-12 pb-16 pt-6">
        <Outlet />
      </div>
    </main>
  );
}
