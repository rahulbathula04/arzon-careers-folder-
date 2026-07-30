import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ShieldCheck, Globe } from "lucide-react";

type Chrome = "default" | "brief" | "report";

export function CareerShell({
  children,
  chrome = "default",
}: {
  children: ReactNode;
  chrome?: Chrome;
}) {
  const isBrief = chrome === "brief";
  const isReport = chrome === "report";

  return (
    <main className="relative min-h-screen pb-4 sm:pb-6 bg-[#000000] text-white tone-dark selection:bg-sky-500 selection:text-white overflow-hidden flex flex-col">
      {/* Background Ambient Spotlights - Rich Sky-Blue Atmospheric Glows */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-80"
        style={{
          background: `
            radial-gradient(ellipse 90% 55% at 50% -10%, rgba(56, 189, 248, 0.26), rgba(2, 132, 199, 0.1) 50%, rgba(0, 0, 0, 0) 100%),
            radial-gradient(ellipse 70% 40% at 50% 105%, rgba(56, 189, 248, 0.18), rgba(0, 0, 0, 0) 80%),
            radial-gradient(ellipse 35% 50% at 0% 35%, rgba(56, 189, 248, 0.12), transparent 70%),
            radial-gradient(ellipse 35% 50% at 100% 35%, rgba(56, 189, 248, 0.12), transparent 70%)
          `,
        }}
      />

      <header className="sticky top-0 z-30 border-b border-white/10 bg-black/90 backdrop-blur-2xl shrink-0">
        <div
          className={
            isReport
              ? "mx-auto flex max-w-[1520px] items-center justify-between px-4 py-2.5 sm:px-6 lg:px-8"
              : "mx-auto flex max-w-3xl items-center justify-between px-4 py-2.5"
          }
        >
          <Link
            to="/"
            className="group inline-flex items-center gap-2.5 rounded-full border border-sky-500/20 bg-sky-500/10 px-3.5 py-1.5 shadow-[0_0_15px_rgba(56,189,248,0.2)] transition hover:border-sky-400/50 hover:bg-sky-500/20 hover:shadow-[0_0_25px_rgba(56,189,248,0.35)]"
          >
            <Globe className="h-4.5 w-4.5 text-sky-400 drop-shadow-[0_0_10px_rgba(56,189,248,0.9)] animate-pulse" />
            <span className="font-serif text-base font-extrabold tracking-tight bg-gradient-to-r from-white via-sky-100 to-sky-400 bg-clip-text text-transparent">
              Arzon{" "}
              <span className="italic text-sky-400 font-medium tracking-normal font-grotesk text-sm ml-1">
                {isReport ? "Career Fit Report" : isBrief ? "Career Brief" : "Career Engine"}
              </span>
            </span>
          </Link>

          <span className="hidden items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-sky-200 sm:inline-flex bg-sky-500/10 border border-sky-500/30 px-3.5 py-1 rounded-full shadow-[0_0_12px_rgba(56,189,248,0.15)] font-bold">
            <ShieldCheck className="h-3.5 w-3.5 text-sky-400" /> ISO 9001 · MSME · MCA VERIFIED
          </span>
        </div>
      </header>

      <div
        className={
          isReport
            ? "relative z-10 mx-auto max-w-[1520px] px-4 pt-4 pb-12 sm:px-6 sm:pt-6 lg:px-8 flex-1"
            : isBrief
              ? "relative z-10 mx-auto max-w-3xl px-4 pt-4 pb-12 sm:pt-6 flex-1"
              : "relative z-10 mx-auto max-w-3xl px-4 pt-3 sm:pt-4 flex-1 flex flex-col justify-center"
        }
      >
        {children}
      </div>
    </main>
  );
}
