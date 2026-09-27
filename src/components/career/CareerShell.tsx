import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { ArzonLogo } from "@/components/acri/ArzonLogo";

type Chrome = "default" | "brief" | "report";

export function CareerShell({
  children,
  chrome = "default",
  showHeader = false,
}: {
  children: ReactNode;
  chrome?: Chrome;
  showHeader?: boolean;
}) {
  const isBrief = chrome === "brief";
  const isReport = chrome === "report";

  return (
    <div className="relative min-h-full pb-8 sm:pb-12 arzon-v2-page bg-white text-[var(--arzon-ink)] font-sans antialiased tone-light selection:bg-[var(--arzon-blue-700)] selection:text-white overflow-hidden flex flex-col">
      {showHeader && (
        <header className="sticky top-0 z-30 border-b border-[var(--arzon-border)] bg-white/95 backdrop-blur-xl shrink-0">
          <div
            className={
              isReport
                ? "mx-auto flex max-w-[1520px] items-center justify-between px-4 py-3 sm:px-6 lg:px-8"
                : "mx-auto flex max-w-3xl items-center justify-between px-4 py-3"
            }
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2.5 transition hover:opacity-90"
            >
              <ArzonLogo variant="light" size="sm" />
              <span className="hidden sm:inline-block border-l border-[var(--arzon-border)] pl-2.5 font-sans font-medium text-xs text-[var(--arzon-ink-muted)]">
                {isReport ? "Career Fit Report" : isBrief ? "Career Brief" : "Career Diagnostic"}
              </span>
            </Link>

            <span className="hidden items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--arzon-blue-700)] sm:inline-flex bg-[var(--arzon-blue-100)] border border-[var(--arzon-border)] px-3 py-1 rounded-full ">
              <ShieldCheck className="h-3.5 w-3.5 text-[var(--arzon-blue-700)]" /> Evidence-led career assessment
            </span>
          </div>
        </header>
      )}

      <div
        className={
          isReport
            ? "relative z-10 mx-auto max-w-[1520px] px-4 pt-6 pb-16 sm:px-6 sm:pt-8 lg:px-8 flex-1 w-full"
            : isBrief
              ? "relative z-10 mx-auto max-w-3xl px-4 pt-6 pb-16 sm:pt-8 flex-1 w-full"
              : "relative z-10 mx-auto max-w-4xl px-4 pt-6 sm:pt-10 flex-1 flex flex-col justify-center w-full"
        }
      >
        {children}
      </div>
    </div>
  );
}
