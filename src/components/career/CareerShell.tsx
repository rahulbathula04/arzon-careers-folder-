import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";

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
  const isBriefLike = isBrief || isReport;
  return (
    <main
      className={`tone-dark relative min-h-app pb-20 text-white ${isReport ? "report-page-bg" : "bg-[#070B16]"}`}
    >
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#040d1c]/85 backdrop-blur-md">
        <div
          className={
            isReport
              ? "mx-auto flex max-w-[1520px] items-center justify-between px-4 py-3 sm:px-6 lg:px-8"
              : "mx-auto flex max-w-3xl items-center justify-between px-4 py-3"
          }
        >
          <Link to="/" className="group inline-flex items-center gap-2">
            <span
              className="font-grotesk text-caption font-bold tracking-tight"
              style={{ color: "#F8FAFC" }}
            >
              Arzon{" "}
              <span style={{ color: "#7FB0D8" }}>
                {isReport ? "Career Report" : isBrief ? "Career Brief" : "Career Engine"}
              </span>
            </span>
          </Link>
          {!isBriefLike && (
            <span className="hidden items-center gap-1.5 font-mono text-micro uppercase tracking-[0.18em] text-white/70 sm:inline-flex">
              <ShieldCheck className="h-3 w-3 text-eyebrow" /> ISO 9001 · MSME · MCA
            </span>
          )}
        </div>
      </header>
      <div
        className={
          isReport
            ? "mx-auto max-w-[1520px] px-4 pt-6 pb-28 sm:px-6 sm:pt-8 lg:px-8"
            : isBrief
              ? "mx-auto max-w-3xl px-4 pt-6 pb-28 sm:pt-8"
              : "mx-auto max-w-3xl px-4 pt-8 sm:pt-12"
        }
      >
        {children}
      </div>
    </main>
  );
}
