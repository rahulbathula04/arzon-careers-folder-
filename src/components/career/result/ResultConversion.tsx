import { ArrowRight, MessageCircle, Compass, Database, FileCheck, Award, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { CareerEngineResult } from "@/data/careerEngineScoring";

interface Props {
  result: CareerEngineResult;
}

export function ResultConversion({ result }: Props) {
  const pathSlug =
    result.archetype?.topPaths?.[0]?.slug ??
    result.archetype?.pathSlug ??
    "pharmacovigilance";

  const programmeSlug =
    pathSlug === "medical-coding"
      ? "medical-coding"
      : pathSlug === "pharmacovigilance"
        ? "pharmacovigilance"
        : pathSlug === "clinical-data-management"
          ? "clinical-data-management"
          : pathSlug === "sas-clinical"
            ? "sas-clinical"
            : pathSlug === "regulatory-affairs"
              ? "regulatory-affairs"
              : pathSlug === "ai-intelligence"
                ? "ai-intelligence"
                : "pharmacovigilance";

  const roleName = result.archetype?.name ?? "Recommended Track";

  const whatsappCounsellorUrl = `https://wa.me/919121283638?text=${encodeURIComponent(
    `Hello Arzon Admissions Team, I just completed my Career Engine diagnostic. My top identity match is "${roleName}" (${Math.round(
      result.fitScore,
    )}% Fit). I'd like to consult with a senior career counsellor regarding role preparation and upcoming cohorts.`,
  )}`;

  return (
    <section className="rounded-3xl border border-slate-800 bg-gradient-to-b from-[#081F38] via-[#0B2545] to-[#081F38] text-white p-4 sm:p-10 shadow-[0_20px_50px_-10px_rgba(7,26,74,0.35),inset_0_1px_0_rgba(255,255,255,0.15)] relative overflow-hidden w-full max-w-full min-w-0">
      {/* Background Subtle Radial Accent */}
      <div className="pointer-events-none absolute right-0 bottom-0 translate-x-1/3 translate-y-1/3 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="pointer-events-none absolute left-0 top-0 -translate-x-1/3 -translate-y-1/3 h-60 w-60 rounded-full bg-indigo-500/15 blur-3xl" />

      <div className="relative z-10 max-w-3xl">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-3.5 py-1 text-[10px] font-mono font-bold uppercase tracking-[0.15em] text-amber-300 shadow-2xs">
          <Sparkles className="h-3 w-3" />
          <span>THE IMMEDIATE NEXT STEP</span>
        </span>

        <h2 className="mt-4 font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
          Turn Your Diagnostic Alignment Into Concrete Proof of Work.
        </h2>

        <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed font-sans max-w-2xl">
          Knowing your career archetype is step one. Step two is acquiring genuine production mastery (Enterprise Safety Databases, Standardized Medical Coding, EDC platforms) and building an audit-proof case portfolio that commands executive recruiter attention.
        </p>

        {/* 3 Pillars of ACRI Verification */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/5 border border-white/10 text-xs">
            <Database className="h-4 w-4 text-blue-400 shrink-0" />
            <span className="font-medium text-slate-200">Enterprise Database Simulation</span>
          </div>
          <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/5 border border-white/10 text-xs">
            <FileCheck className="h-4 w-4 text-emerald-400 shrink-0" />
            <span className="font-medium text-slate-200">Audit-Proof Portfolio Artifacts</span>
          </div>
          <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/5 border border-white/10 text-xs">
            <Award className="h-4 w-4 text-amber-400 shrink-0" />
            <span className="font-medium text-slate-200">Direct Recruiter Submission Ledger</span>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
          <Link
            to="/courses/$slug"
            params={{ slug: programmeSlug }}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 px-6 py-3.5 text-sm font-bold text-white shadow-[0_2px_12px_rgba(37,99,235,0.4),inset_0_1px_0_rgba(255,255,255,0.3)] transition-all duration-200 active:scale-[0.98] w-full sm:w-auto cursor-pointer"
          >
            <span>Explore {roleName} Pathway &amp; Work Simulation</span>
            <ArrowRight className="h-4 w-4" />
          </Link>

          <a
            href={whatsappCounsellorUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 active:scale-[0.98] shadow-sm w-full sm:w-auto cursor-pointer"
          >
            <MessageCircle className="h-4 w-4 text-[#25D366]" />
            <span>Consult Senior Counsellor on WhatsApp</span>
          </a>

          <Link
            to="/why-arzon"
            className="inline-flex min-h-10 items-center justify-center sm:justify-start gap-1.5 text-xs text-slate-300 hover:text-white transition-colors mt-2 sm:mt-0 font-semibold font-sans"
          >
            <Compass className="h-3.5 w-3.5 text-amber-300" />
            <span>How ACRI Verification Works →</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
