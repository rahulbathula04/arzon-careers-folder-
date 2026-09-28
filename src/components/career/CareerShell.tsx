import type { ReactNode } from "react";

type Chrome = "default" | "brief" | "report";

/**
 * Content-only shell for Career Engine pages.
 * The global ArzonHeader/Footer are owned by the root shell.
 */
export function CareerShell({
  children,
  chrome = "default",
  showHeader: _showHeader = false,
}: {
  children: ReactNode;
  chrome?: Chrome;
  showHeader?: boolean;
}) {
  const isBrief = chrome === "brief";
  const isReport = chrome === "report";

  return (
    <div
      className={[
        "arzon-career-shell relative min-h-full bg-white text-[var(--arzon-ink)] font-sans antialiased tone-light selection:bg-blue-600 selection:text-white",
        "overflow-hidden flex flex-col",
        isReport ? "pb-16" : "pb-10 sm:pb-16",
      ].join(" ")}
    >
      <div
        className={[
          "relative z-10 mx-auto w-full flex-1",
          isReport
            ? "max-w-[1200px] px-4 pt-5 sm:px-6 sm:pt-8"
            : isBrief
              ? "max-w-3xl px-4 pt-5 pb-8 sm:px-6 sm:pt-8 sm:pb-12"
              : "max-w-5xl px-4 pt-5 pb-8 sm:px-6 sm:pt-8 sm:pb-12",
        ].join(" ")}
      >
        {children}
      </div>
    </div>
  );
}
