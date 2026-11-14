import { ArrowRight, MessageCircle, BookOpen, Award, CheckCircle2, Target, Sparkles, Clock, ShieldCheck } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { CareerEngineResult } from "@/data/careerEngineScoring";

interface Props {
  result: CareerEngineResult;
  candidateName?: string;
  leadId?: string | null;
}

export function ResultConversion({ result, candidateName: initialName, leadId }: Props) {
  const topPillarKey =
    result.archetype?.topPaths?.[0]?.slug ??
    result.archetype?.pathSlug ??
    "pharmacovigilance";

  const roleName = result.archetype?.topPaths?.[0]?.title ?? result.archetype?.name ?? "Healthcare Specialist";
  const candidate = initialName && initialName !== "Candidate" ? initialName : "Healthcare Graduate";
  const qualification = result.profile?.course ?? "Healthcare Graduate";
  const fitPct = Math.round(result.fitScore);

  // Generate deterministic audit reference
  const rawId = leadId || result.resultMeta?.attemptId || "career-engine-report";
  const shortRef = Math.abs(
    rawId.split("").reduce((acc, char) => (acc << 5) - acc + char.charCodeAt(0), 0),
  )
    .toString(16)
    .toUpperCase()
    .padStart(8, "0")
    .slice(-8);
  const referenceId = `CE-REPORT-${new Date().getFullYear()}-${shortRef}`;

  const topGaps = result.pillarResults?.[topPillarKey]?.gaps?.length
    ? result.pillarResults[topPillarKey].gaps.slice(0, 3)
    : result.aiAnalysis?.skillGaps?.slice(0, 3) ?? [
        "Standardized Medical Terminology & Clinical Coding Guidelines",
        "Enterprise Database Navigation (Safety & EDC Platforms)",
        "Audit-Defensible Narrative & Discrepancy Writing",
      ];

  const planUrl = leadId && !leadId.startsWith("lead_local_")
    ? `/career-engine/plan?id=${encodeURIComponent(leadId)}`
    : `/career-engine/plan`;

  const whatsappMessage = `Hello Arzon Admissions Team,

I have completed my Healthcare Career Intelligence Assessment (Ref: ${referenceId}).

• Candidate: ${candidate}
• Qualification: ${qualification}
• Primary Career Match: ${roleName} (${fitPct}% Fit Index)
• Diagnostic Confidence: ${result.evidenceConfidence || "High"}

I would like to request official certification review, verify my academic eligibility, and explore upcoming cohort enrolment.`;

  const whatsappUrl = `https://wa.me/919121283638?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section className="rounded-3xl border border-slate-800 bg-gradient-to-b from-[#081F38] via-[#0B2545] to-[#081F38] text-white p-5 sm:p-10 shadow-[0_20px_50px_-10px_rgba(7,26,74,0.35),inset_0_1px_0_rgba(255,255,255,0.15)] relative overflow-hidden w-full max-w-full min-w-0 space-y-8">
      {/* Background Subtle Radial Accent */}
      <div className="pointer-events-none absolute right-0 bottom-0 translate-x-1/3 translate-y-1/3 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="pointer-events-none absolute left-0 top-0 -translate-x-1/3 -translate-y-1/3 h-72 w-72 rounded-full bg-indigo-500/15 blur-3xl" />

      {/* Header */}
      <div className="relative z-10 max-w-3xl">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-3.5 py-1 text-[10px] font-mono font-bold uppercase tracking-[0.15em] text-amber-300 shadow-2xs">
          <Sparkles className="h-3 w-3" />
          <span>YOUR POST-ASSESSMENT ACTION HUB</span>
        </span>

        <h2 className="mt-4 font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
          Where Do You Go From Here?
        </h2>

        <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed font-sans max-w-2xl">
          You now have an objective, evidence-backed diagnostic of your clinical and operational alignment for{" "}
          <strong className="text-white font-semibold">{roleName}</strong>. Choose the path that matches your current goal:
        </p>
      </div>

      {/* Dual Options Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {/* OPTION 1: Close Your Skill Gaps */}
        <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-7 backdrop-blur-sm hover:border-white/20 transition-all duration-200">
          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/20 px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-blue-300 border border-blue-400/30">
                <Target className="h-3 w-3" />
                <span>OPTION 1 · FREE &amp; SELF-PACED</span>
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-400">
                <Clock className="h-3 w-3" /> ~20 min/day
              </span>
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight">
              Close Your Skill Gaps
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              Work through a structured, 7-day learning roadmap tailored specifically to your diagnostic gaps in {roleName}.
            </p>

            <div className="mt-5 space-y-2.5 pt-4 border-t border-white/10 text-xs">
              <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">
                Priority Gaps You Will Target:
              </span>
              {topGaps.map((gap, idx) => (
                <div key={idx} className="flex items-start gap-2 text-slate-200">
                  <CheckCircle2 className="h-3.5 w-3.5 text-blue-400 mt-0.5 shrink-0" />
                  <span className="leading-snug">{gap}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-7 pt-5 border-t border-white/10">
            <Link
              to={planUrl}
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 px-6 py-3 text-sm font-bold text-white shadow-[0_2px_12px_rgba(37,99,235,0.4),inset_0_1px_0_rgba(255,255,255,0.3)] transition-all duration-200 active:scale-[0.98] cursor-pointer"
            >
              <BookOpen className="h-4 w-4" />
              <span>Start 7-Day Learning Plan</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* OPTION 2: Request Certification */}
        <div className="flex flex-col justify-between rounded-2xl border border-amber-400/30 bg-gradient-to-br from-amber-400/[0.08] via-white/[0.04] to-transparent p-6 sm:p-7 backdrop-blur-sm hover:border-amber-400/50 transition-all duration-200">
          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/20 px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-amber-300 border border-amber-400/40">
                <ShieldCheck className="h-3 w-3" />
                <span>OPTION 2 · OFFICIAL ADMISSIONS</span>
              </span>
              <span className="font-mono text-[11px] text-amber-300/80 font-bold">
                REF: {shortRef}
              </span>
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight">
              Request Certification
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              Submit your verified assessment dossier directly to Arzon Admissions to verify eligibility, review casework requirements, and secure cohort enrolment.
            </p>

            <div className="mt-5 space-y-2.5 pt-4 border-t border-white/10 text-xs">
              <span className="font-mono text-[10px] text-amber-300/80 uppercase tracking-wider block font-semibold">
                What Arzon Admissions Verifies:
              </span>
              <div className="flex items-start gap-2 text-slate-200">
                <CheckCircle2 className="h-3.5 w-3.5 text-amber-400 mt-0.5 shrink-0" />
                <span className="leading-snug">Academic degree eligibility ({qualification})</span>
              </div>
              <div className="flex items-start gap-2 text-slate-200">
                <CheckCircle2 className="h-3.5 w-3.5 text-amber-400 mt-0.5 shrink-0" />
                <span className="leading-snug">Evaluation score ({fitPct}% {roleName} Fit Index)</span>
              </div>
              <div className="flex items-start gap-2 text-slate-200">
                <CheckCircle2 className="h-3.5 w-3.5 text-amber-400 mt-0.5 shrink-0" />
                <span className="leading-snug">Upcoming batch schedules, seat availability &amp; fee structure</span>
              </div>
            </div>
          </div>

          <div className="mt-7 pt-5 border-t border-white/10">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] px-6 py-3 text-sm font-bold text-slate-950 shadow-[0_2px_12px_rgba(37,211,102,0.35),inset_0_1px_0_rgba(255,255,255,0.4)] transition-all duration-200 active:scale-[0.98] cursor-pointer"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Request Certification via WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Trust Guarantee Footer */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pt-2 text-xs text-slate-400 font-sans border-t border-white/10">
        <div className="flex items-center gap-2">
          <Award className="h-4 w-4 text-amber-400" />
          <span>Diagnostic Reference: <strong className="text-slate-200 font-mono">{referenceId}</strong></span>
        </div>
        <p className="text-[11px] text-slate-400">
          Official Arzon Career Intelligence System · Dedicated Admissions Support: +91 91212 83638
        </p>
      </div>
    </section>
  );
}
