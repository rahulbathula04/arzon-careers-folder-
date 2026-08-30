import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ShieldCheck, Globe } from "lucide-react";
import { PremiumChip } from "@/components/ui/PremiumChip";

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
    <main className="relative min-h-screen pb-4 sm:pb-6 bg-[#FAF8F5] text-[#1A1A1A] font-sans antialiased tone-light selection:bg-sky-500 selection:text-white overflow-hidden flex flex-col">
      <header className="sticky top-0 z-30 border-b border-stone-200 bg-white/90 backdrop-blur-xl shrink-0">
        <div
          className={
            isReport
              ? "mx-auto flex max-w-[1520px] items-center justify-between px-4 py-3 sm:px-6 lg:px-8"
              : "mx-auto flex max-w-3xl items-center justify-between px-4 py-3"
          }
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 transition hover:opacity-90"
          >
            <Globe className="h-4.5 w-4.5 text-[#1B3F8B]" />
            <span className="font-serif text-lg font-bold tracking-tight text-[#1A1A1A]">
              Arzon{" "}
              <span className="italic text-[#8A6D1F] font-normal text-sm ml-1 font-sans">
                {isReport ? "Career Fit Report" : isBrief ? "Career Brief" : "Career Engine"}
              </span>
            </span>
          </Link>

          <span className="hidden items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-[#1B3F8B] sm:inline-flex bg-sky-50 border border-sky-200 px-3 py-1 rounded-full shadow-2xs">
            <ShieldCheck className="h-3.5 w-3.5 text-[#1B3F8B]" /> ISO 9001 · MSME · MCA VERIFIED
          </span>
        </div>
      </header>

      <div
        className={
          isReport
            ? "relative z-10 mx-auto max-w-[1520px] px-4 pt-6 pb-16 sm:px-6 sm:pt-8 lg:px-8 flex-1"
            : isBrief
              ? "relative z-10 mx-auto max-w-3xl px-4 pt-6 pb-16 sm:pt-8 flex-1"
              : "relative z-10 mx-auto max-w-3xl px-4 pt-4 sm:pt-6 flex-1 flex flex-col justify-center"
        }
      >
        {children}
      </div>
    </main>
  );
}
