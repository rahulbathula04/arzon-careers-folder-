import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Building2,
  Briefcase,
  TrendingUp,
  ShieldCheck,
  MapPin,
  Clock,
  ArrowRight,
  AlertTriangle,
  Users,
  Target,
} from "lucide-react";
import { LIVE_EMPLOYER_OPENINGS } from "@/data/industry/liveEmployerOpenings";
import { EMPLOYER_WEIGHT_CONFIGS } from "@/data/employerScoringEngine";
import { CompanyBrandLogo } from "@/components/career/result/CompanyLogos";

export function TopEmployersRequisitionDeck() {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const activeOpening = LIVE_EMPLOYER_OPENINGS[selectedIdx];
  const cutoffConfig = EMPLOYER_WEIGHT_CONFIGS[activeOpening.shortName as keyof typeof EMPLOYER_WEIGHT_CONFIGS];
  const hiringCutoff = cutoffConfig?.hiringBarCutoff ?? 68;

  return (
    <section className="mt-8 rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] via-white/[0.01] to-transparent p-5 sm:p-8 backdrop-blur-md">
      {/* Banner Eyebrow */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[var(--arzon-blue-500)]/30 bg-[var(--arzon-blue-600)]/10 px-3.5 py-1 text-[11px] font-mono font-bold uppercase tracking-[0.14em] text-[var(--arzon-blue-500)] mb-2">
            <Building2 className="h-3.5 w-3.5 text-[var(--arzon-blue-500)]" />
            <span>2026 VERIFIED CAMPUS &amp; OFF-CAMPUS REQUISITIONS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-white">
            India’s Top 5 Healthcare Employers Hiring Freshers
          </h2>
          <p className="mt-1 text-sm text-white/70 max-w-2xl leading-relaxed font-sans">
            Verified hiring standards, screening cutoffs, and entry packages across India's largest healthcare and life-science employers.
          </p>
        </div>

        {/* Global Action Button */}
        <Link
          to="/career-engine/start"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--arzon-blue-600)] hover:bg-[var(--arzon-blue-700)] text-white px-5 py-2.5 text-xs font-bold transition-all shadow-[0_0_20px_rgba(21,87,214,0.35)] active:scale-95 shrink-0 self-start md:self-auto cursor-pointer"
        >
          <Target className="h-4 w-4" />
          <span>Screen Your Profile Against Cutoffs</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Tactile Requisition Switcher Tabs */}
      <div className="mt-6">
        <p className="text-xs font-mono font-bold text-white/50 uppercase tracking-wider mb-3">
          Select Employer Requisition to Inspect:
        </p>
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
          {LIVE_EMPLOYER_OPENINGS.map((emp, idx) => {
            const isSelected = selectedIdx === idx;
            const cutoff = EMPLOYER_WEIGHT_CONFIGS[emp.shortName as keyof typeof EMPLOYER_WEIGHT_CONFIGS]?.hiringBarCutoff ?? 68;

            return (
              <button
                key={emp.company}
                type="button"
                onClick={() => setSelectedIdx(idx)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl border transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? "border-[var(--arzon-blue-500)] bg-[var(--arzon-blue-600)]/20 text-white ring-1 ring-[var(--arzon-blue-500)]/40 shadow-sm"
                    : "border-white/10 bg-white/[0.02] text-white/70 hover:bg-white/[0.05] hover:text-white"
                }`}
              >
                <div className="h-6 flex items-center justify-center shrink-0">
                  <CompanyBrandLogo company={emp.shortName} className="h-4 sm:h-4.5 w-auto invert brightness-0" />
                </div>
                <div className="flex items-center gap-2 pl-2.5 border-l border-white/15">
                  <span className="font-mono text-xs font-bold text-white/90">
                    {cutoff}% Bar
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--arzon-teal-500)] shadow-[0_0_6px_rgba(52,211,153,0.7)]" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured Requisition Deep-Dive Card */}
      <div className="mt-6 rounded-2xl border border-white/15 bg-white/[0.03] p-5 sm:p-7 backdrop-blur-md">
        {/* Requisition Header Info */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-white/10">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-sans">
                {activeOpening.company}
              </h3>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--arzon-teal-500)]/10 border border-[var(--arzon-teal-500)]/30 px-2.5 py-0.5 text-[10px] font-mono font-bold text-[var(--arzon-teal-300)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--arzon-teal-500)] motion-safe:animate-pulse" />
                {activeOpening.activeOpenings.hiringStatus}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-[var(--arzon-blue-600)]/10 border border-[var(--arzon-blue-500)]/30 px-2.5 py-0.5 text-[10px] font-mono font-bold text-[var(--arzon-blue-300)]">
                {activeOpening.activeOpenings.reqId}
              </span>
            </div>

            {/* Role Title in Bold Accent */}
            <div className="mt-2 flex items-center gap-2 text-base font-bold text-[var(--arzon-blue-500)]">
              <Briefcase className="h-4 w-4 shrink-0" />
              <span>{activeOpening.activeOpenings.roleTitle}</span>
            </div>

            <p className="text-xs text-white/60 mt-1 leading-relaxed font-sans">
              {activeOpening.tagline} · <span className="text-white/80 font-medium">{activeOpening.activeOpenings.department}</span>
            </p>

            {/* Metadata Badges Ribbon */}
            <div className="mt-3.5 flex items-center gap-2 flex-wrap text-xs font-sans">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/[0.04] border border-white/10 text-[11px] text-white/80">
                <MapPin className="h-3.5 w-3.5 text-white/40 shrink-0" />
                <span>{activeOpening.activeOpenings.locations[0]}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/[0.04] border border-white/10 text-[11px] text-white/80">
                <Building2 className="h-3.5 w-3.5 text-white/40 shrink-0" />
                <span>{activeOpening.activeOpenings.workModel}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/[0.04] border border-white/10 text-[11px] text-white/80">
                <Clock className="h-3.5 w-3.5 text-white/40 shrink-0" />
                <span>{activeOpening.activeOpenings.experience}</span>
              </span>
            </div>
          </div>

          {/* Screening Cutoff Stat Box */}
          <div className="lg:w-52 rounded-2xl border border-white/15 bg-white/[0.02] p-4 flex flex-row lg:flex-col items-center justify-between lg:justify-center gap-2 shrink-0">
            <div className="text-left lg:text-center">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-white/50 block">
                Screening Cutoff Bar
              </span>
              <div className="flex items-baseline lg:justify-center gap-1 mt-0.5">
                <span className="text-3xl font-mono font-extrabold text-[var(--arzon-blue-500)]">{hiringCutoff}%</span>
                <span className="text-xs font-mono font-bold text-white/50">/ 100</span>
              </div>
            </div>
            <Link
              to="/career-engine/start"
              className="inline-flex items-center gap-1.5 text-[11px] font-bold text-white bg-[var(--arzon-blue-600)] hover:bg-[var(--arzon-blue-700)] px-3 py-1 rounded-full shadow-xs transition-colors"
            >
              <span>Test Fit Now</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

        {/* 3 Metrics Deck */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.02]">
            <div className="flex items-center gap-1.5 text-white/50 text-[10px] font-mono font-bold uppercase">
              <TrendingUp className="h-3.5 w-3.5 text-[var(--arzon-blue-500)]" />
              <span>Fresher Salary Band</span>
            </div>
            <p className="text-sm font-bold font-mono text-white mt-1">
              {activeOpening.activeOpenings.salaryBand.split("+")[0]?.trim()}
            </p>
            <p className="text-[10px] text-[var(--arzon-blue-300)] font-medium mt-0.5 truncate">
              {activeOpening.activeOpenings.salaryBand.includes("+")
                ? `+ ${activeOpening.activeOpenings.salaryBand.split("+")[1]?.trim()}`
                : `Verified Fresher CTC`}
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.02]">
            <div className="flex items-center gap-1.5 text-white/50 text-[10px] font-mono font-bold uppercase">
              <ShieldCheck className="h-3.5 w-3.5 text-[var(--arzon-teal-400)]" />
              <span>Academic Eligibility</span>
            </div>
            <p className="text-xs font-bold text-white mt-1 truncate">
              {activeOpening.eligibility.degrees.slice(0, 2).join(", ")}
            </p>
            <p className="text-[10px] text-[var(--arzon-teal-300)] font-medium mt-0.5">
              {activeOpening.eligibility.minMarks.split(";")[0]}
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.02]">
            <div className="flex items-center gap-1.5 text-white/50 text-[10px] font-mono font-bold uppercase">
              <Users className="h-3.5 w-3.5 text-gold" />
              <span>Active Pipeline</span>
            </div>
            <p className="text-sm font-bold font-mono text-white mt-1">
              {activeOpening.activeOpenings.openPositions} Requisition Seats
            </p>
            <p className="text-[10px] text-white/60 font-sans mt-0.5">
              Annual Intake: {activeOpening.annualFresherIntake.split(" ")[0]}
            </p>
          </div>
        </div>

        {/* 3-Stage Interview Process Overview */}
        <div className="mt-5 pt-5 border-t border-white/10">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white/60 mb-3">
            Official 3-Stage Evaluation Process:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {activeOpening.interviewStages.map((stage) => (
              <div
                key={stage.stage}
                className="p-3.5 rounded-xl border border-white/10 bg-white/[0.02] text-xs"
              >
                <div className="flex items-center justify-between gap-1 text-[10px] font-mono text-[var(--arzon-blue-500)] font-bold">
                  <span>{stage.stage}</span>
                  <span className="text-white/40">{stage.duration}</span>
                </div>
                <strong className="text-white font-sans block mt-1">{stage.name}</strong>
                <p className="text-[11px] text-white/60 mt-1 leading-normal font-sans">
                  {stage.keyCheck}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Fatal Gaps & ATS Filter Tokens */}
        <div className="mt-5 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-gold font-sans">
            <AlertTriangle className="h-4 w-4 shrink-0 text-gold" />
            <span>
              <strong>Primary Elimination Risk:</strong> {activeOpening.fatalGaps[0]}
            </span>
          </div>

          <Link
            to="/career-engine/start"
            className="inline-flex items-center gap-2 text-xs font-bold text-white bg-[var(--arzon-blue-600)] hover:bg-[var(--arzon-blue-700)] px-4 py-2 rounded-xl transition-all shadow-xs cursor-pointer shrink-0"
          >
            <span>Take {activeOpening.shortName} Diagnostic</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
