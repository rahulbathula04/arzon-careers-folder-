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
    <div className="arzon-career-shell relative min-h-full pb-8 sm:pb-12 arzon-v2-page bg-white text-[var(--arzon-ink)] font-sans antialiased tone-light selection:bg-blue-600 selection:text-white overflow-hidden flex flex-col">
      {/* Navigation is owned by the application shell. Focused assessment routes own their own chrome. */}

      <div
        className={
          isReport
            ? "arzon-v2-container w-full flex-1 px-0 pb-16 pt-6 sm:pt-8"
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
