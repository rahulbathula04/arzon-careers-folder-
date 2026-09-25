import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import {
  ShieldCheck,
  Clock,
  Layers,
  BarChart3,
  Award,
  CheckCircle2,
  FileText,
  Check,
  ArrowRight,
  Sparkles,
  Users,
  ChevronRight,
  Share2,
  Star,
  Activity,
  BookOpen,
  Building,
} from "lucide-react";
import { AcriCandidateModal } from "./AcriCandidateModal";
import { getAcriCohortMetrics, type CohortMetrics, logAcriFunnelEvent } from "@/lib/acri/acriCandidateStore";

export function AcriLaunchLandingPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [cohort, setCohort] = useState<CohortMetrics>(() => getAcriCohortMetrics());

  useEffect(() => {
    logAcriFunnelEvent("landing_viewed", { page: "pharmacovigilance_certification" });

    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("apply") === "true" || params.get("apply") === "1") {
        setModalOpen(true);
      }
    }

    const handleUpdate = () => {
      setCohort(getAcriCohortMetrics());
    };
    const handleOpenModal = () => {
      logAcriFunnelEvent("cta_clicked", { location: "external_trigger" });
      setModalOpen(true);
    };

    window.addEventListener("arzon:acri:cohort-updated", handleUpdate);
    window.addEventListener("arzon:acri:candidates-updated", handleUpdate);
    window.addEventListener("arzon:open-acri-modal", handleOpenModal);
    return () => {
      window.removeEventListener("arzon:acri:cohort-updated", handleUpdate);
      window.removeEventListener("arzon:acri:candidates-updated", handleUpdate);
      window.removeEventListener("arzon:open-acri-modal", handleOpenModal);
    };
  }, []);

  const handleOpenModal = () => {
    logAcriFunnelEvent("cta_clicked", { location: "hero_primary" });
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F8F9F7] text-[#1D2939] font-sans antialiased selection:bg-[#E8F7F1] selection:text-[#005B4F] relative overflow-hidden">
      {/* ── Decorative Background SVG Watermarks (Reference: BG 01, BG 02, BG 03) ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        {/* Soft mint curve gradient */}
        <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-gradient-to-bl from-[#E8F7F1]/70 via-[#E8F7F1]/20 to-transparent rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/4" />
        <div className="absolute top-[40%] left-[-200px] w-[600px] h-[600px] bg-gradient-to-tr from-[#E8F7F1]/50 to-transparent rounded-full blur-3xl" />
        
        {/* Medical Cross SVG Pattern */}
        <svg
          className="absolute top-24 right-12 opacity-15 w-48 h-48 text-[#005B4F]"
          viewBox="0 0 100 100"
          fill="currentColor"
        >
          <path d="M40 0h20v40h40v20h-40v40h-20v-40h-40v-20h40z" />
        </svg>

        {/* Dot grid watermark */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: "radial-gradient(#005B4F 1.25px, transparent 1.25px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <main className="relative z-10">
        {/* ── SECTION 01: HERO (Image 2 Reference) ── */}
        <section className="pt-8 pb-16 sm:pt-14 sm:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Column: Headlines & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              {/* Eyebrow badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F7F1] border border-[#005B4F]/20 text-[#005B4F] text-xs font-mono font-bold uppercase tracking-wider">
                <ShieldCheck className="h-4 w-4 text-[#005B4F]" />
                <span>ACRI PHARMACOVIGILANCE</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-serif font-bold text-[#0B1325] tracking-tight leading-[1.12]">
                Find Out If You’re <br />
                <span className="text-[#005B4F]">Industry Ready.</span>
              </h1>

              {/* Supporting Copy */}
              <p className="text-base sm:text-lg text-[#555B66] max-w-xl leading-relaxed">
                Take the ACRI Pharmacovigilance Certification – a real-world assessment designed to measure your job readiness for Pharmacovigilance roles.
              </p>

              {/* 3 Proof Strip Tiles */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-2 max-w-lg">
                <div className="rounded-xl p-3 sm:p-3.5 bg-white card-light border border-[#D9DEE0] shadow-xs">
                  <div className="flex items-center gap-1.5 text-[#005B4F] mb-1">
                    <Clock className="h-4 w-4" />
                    <span className="font-mono text-xs font-bold">25 minutes</span>
                  </div>
                  <span className="text-[11px] text-stone-500 block leading-tight font-medium">
                    Timed assessment
                  </span>
                </div>

                <div className="rounded-xl p-3 sm:p-3.5 bg-white card-light border border-[#D9DEE0] shadow-xs">
                  <div className="flex items-center gap-1.5 text-[#005B4F] mb-1">
                    <Layers className="h-4 w-4" />
                    <span className="font-mono text-xs font-bold">9 competencies</span>
                  </div>
                  <span className="text-[11px] text-stone-500 block leading-tight font-medium">
                    Real PV scenarios
                  </span>
                </div>

                <div className="rounded-xl p-3 sm:p-3.5 bg-white card-light border border-[#D9DEE0] shadow-xs">
                  <div className="flex items-center gap-1.5 text-[#005B4F] mb-1">
                    <BarChart3 className="h-4 w-4" />
                    <span className="font-mono text-xs font-bold">ACRI score</span>
                  </div>
                  <span className="text-[11px] text-stone-500 block leading-tight font-medium">
                    Industry-ready benchmark
                  </span>
                </div>
              </div>

              {/* Primary CTA + Microcopy */}
              <div className="pt-3 space-y-2.5">
                <button
                  type="button"
                  onClick={handleOpenModal}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[#005B4F] hover:bg-[#00473E] text-white font-sans font-bold text-sm sm:text-base tracking-wide transition-all shadow-md hover:shadow-lg cursor-pointer group"
                >
                  <span>Apply for an ACRI Invite</span>
                  <ArrowRight className="h-4 w-4 text-emerald-300 group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span>No payment required for the launch cohort.</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual + Scarcity Card (Reference: Image 2 & 3) */}
            <div className="lg:col-span-5 relative">
              {/* Graduate Visual with Soft Organic Layering */}
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#E8F7F1]/80 to-[#D4EEE4]/50 border border-stone-200/80 shadow-xl aspect-4/5 max-w-md mx-auto">
                <img
                  src="/images/bpharm-female-graduate-hero.jpg"
                  alt="Future Pharmacovigilance Associate Graduate"
                  className="w-full h-full object-cover object-top"
                  loading="eager"
                />

                {/* Handwritten Calligraphy Text Overlay */}
                <div className="absolute top-6 left-6 font-serif italic text-white/90 text-sm sm:text-base drop-shadow-md select-none tracking-wide bg-black/25 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-white/20">
                  Safer Medicines. Brighter Futures. ♡
                </div>

                {/* Scarcity Card Floating Overlay (Pinned to bottom) */}
                <div className="absolute bottom-4 inset-x-4 rounded-2xl bg-white/95 backdrop-blur-md p-4 sm:p-5 border border-stone-200 shadow-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-stone-500 uppercase tracking-widest">
                      ACRI LAUNCH COHORT
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold font-mono uppercase">
                      Limited
                    </span>
                  </div>

                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif font-black text-3xl sm:text-4xl text-[#0B1325]">
                        {cohort.totalInvites}
                      </span>
                      <span className="text-xs font-semibold text-stone-600">Invites Available</span>
                    </div>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      Be part of the first ACRI Pharmacovigilance certification cohort.
                    </p>
                  </div>

                  {/* Progress bar: calculated dynamically, never hardcoded */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-stone-700 font-bold">
                        {cohort.claimedInvites} / {cohort.totalInvites} invites claimed
                      </span>
                      <span className="text-[#005B4F] font-bold">
                        {cohort.remainingInvites} remaining
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-stone-200 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[#005B4F] transition-all duration-700"
                        style={{ width: `${cohort.percentClaimed}%` }}
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleOpenModal}
                    className="w-full py-2.5 rounded-xl bg-[#E8F7F1] hover:bg-[#d6f2e8] text-[#005B4F] font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Join the Launch Cohort</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 02: VALUE SECTION (Your ACRI Assessment Includes) ── */}
        <section className="py-16 sm:py-20 bg-white card-light border-y border-[#E5E7EB]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="font-mono text-xs font-bold text-[#005B4F] uppercase tracking-widest bg-[#E8F7F1] px-3 py-1 rounded-full">
                STANDARDIZED EVALUATION
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0B1325] mt-3">
                Your ACRI Assessment Includes
              </h2>
              <p className="text-sm sm:text-base text-stone-600 mt-2">
                A rigorous, multi-competency evaluation structured around real pharmacovigilance operations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Card 01 */}
              <div className="rounded-2xl p-6 bg-[#FAF8F5] border border-[#D9DEE0] hover:border-[#005B4F]/40 transition-all shadow-xs group">
                <div className="h-11 w-11 rounded-xl bg-[#E8F7F1] text-[#005B4F] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <FileText className="h-5 w-5" />
                </div>
                <span className="font-mono text-[10px] text-stone-400 font-bold uppercase tracking-wider block mb-1">
                  01 · SCENARIO BATTERY
                </span>
                <h3 className="text-lg font-serif font-bold text-[#0B1325] mb-1.5">
                  Real PV Scenarios
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Case-based assessment derived from actual clinical safety workflows, ICSR triage, and causality evaluations.
                </p>
              </div>

              {/* Card 02 */}
              <div className="rounded-2xl p-6 bg-[#FAF8F5] border border-[#D9DEE0] hover:border-[#005B4F]/40 transition-all shadow-xs group">
                <div className="h-11 w-11 rounded-xl bg-[#E8F7F1] text-[#005B4F] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <Layers className="h-5 w-5" />
                </div>
                <span className="font-mono text-[10px] text-stone-400 font-bold uppercase tracking-wider block mb-1">
                  02 · CORE TAXONOMY
                </span>
                <h3 className="text-lg font-serif font-bold text-[#0B1325] mb-1.5">
                  9 Competency Areas
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Measures core PV capabilities including MedDRA coding, regulatory timelines, quality review, and documentation.
                </p>
              </div>

              {/* Card 03 */}
              <div className="rounded-2xl p-6 bg-[#FAF8F5] border border-[#D9DEE0] hover:border-[#005B4F]/40 transition-all shadow-xs group">
                <div className="h-11 w-11 rounded-xl bg-[#E8F7F1] text-[#005B4F] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <BarChart3 className="h-5 w-5" />
                </div>
                <span className="font-mono text-[10px] text-stone-400 font-bold uppercase tracking-wider block mb-1">
                  03 · OBJECTIVE METRICS
                </span>
                <h3 className="text-lg font-serif font-bold text-[#0B1325] mb-1.5">
                  ACRI Readiness Score
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Receive an authenticated score from 0–100 accompanied by detailed dimension breakdowns and diagnostic insights.
                </p>
              </div>

              {/* Card 04 */}
              <div className="rounded-2xl p-6 bg-[#FAF8F5] border border-[#D9DEE0] hover:border-[#005B4F]/40 transition-all shadow-xs group">
                <div className="h-11 w-11 rounded-xl bg-[#E8F7F1] text-[#005B4F] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <span className="font-mono text-[10px] text-stone-400 font-bold uppercase tracking-wider block mb-1">
                  04 · BENCHMARK
                </span>
                <h3 className="text-lg font-serif font-bold text-[#0B1325] mb-1.5">
                  Industry Ready Classification
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Candidates achieving 80+ receive the formal Arzon &ldquo;Industry Ready&rdquo; classification reflecting candidate readiness.
                </p>
              </div>

              {/* Card 05 */}
              <div className="rounded-2xl p-6 bg-[#FAF8F5] border border-[#D9DEE0] hover:border-[#005B4F]/40 transition-all shadow-xs group">
                <div className="h-11 w-11 rounded-xl bg-[#E8F7F1] text-[#005B4F] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <Share2 className="h-5 w-5" />
                </div>
                <span className="font-mono text-[10px] text-stone-400 font-bold uppercase tracking-wider block mb-1">
                  05 · RECOGNITION
                </span>
                <h3 className="text-lg font-serif font-bold text-[#0B1325] mb-1.5">
                  Shareable Result
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  A professional candidate profile and social card ready to share with recruiters, hiring managers, and on LinkedIn.
                </p>
              </div>

              {/* Card 06 */}
              <div className="rounded-2xl p-6 bg-[#FAF8F5] border border-[#D9DEE0] hover:border-[#005B4F]/40 transition-all shadow-xs group">
                <div className="h-11 w-11 rounded-xl bg-[#E8F7F1] text-[#005B4F] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <Award className="h-5 w-5" />
                </div>
                <span className="font-mono text-[10px] text-stone-400 font-bold uppercase tracking-wider block mb-1">
                  06 · VERIFICATION
                </span>
                <h3 className="text-lg font-serif font-bold text-[#0B1325] mb-1.5">
                  ACRI Credential
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Eligible candidates receive a cryptographically verified credential with a permanent public verification URL.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 03: HOW IT WORKS (5 Sequential Steps) ── */}
        <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="font-mono text-xs font-bold text-[#005B4F] uppercase tracking-widest bg-[#E8F7F1] px-3 py-1 rounded-full">
              CERTIFICATION FLOW
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0B1325] mt-3">
              How It Works
            </h2>
            <p className="text-sm sm:text-base text-stone-600 mt-2">
              From application to credential in five transparent, structured steps.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative">
            {/* Step 1 */}
            <div className="rounded-2xl p-5 bg-white card-light border border-[#D9DEE0] shadow-xs relative flex flex-col justify-between">
              <div>
                <div className="h-9 w-9 rounded-xl bg-[#005B4F] text-white flex items-center justify-center font-mono font-bold text-xs mb-3">
                  01
                </div>
                <h4 className="font-serif font-bold text-base text-[#0B1325] mb-1">
                  Apply for an Invite
                </h4>
                <p className="text-xs text-stone-600">
                  Share a few basic academic and contact details to request your cohort seat.
                </p>
              </div>
              <span className="text-[10px] font-mono text-[#005B4F] font-bold uppercase tracking-wider mt-4">
                Step 1 · Basic Details
              </span>
            </div>

            {/* Step 2 */}
            <div className="rounded-2xl p-5 bg-white card-light border border-[#D9DEE0] shadow-xs relative flex flex-col justify-between">
              <div>
                <div className="h-9 w-9 rounded-xl bg-[#005B4F] text-white flex items-center justify-center font-mono font-bold text-xs mb-3">
                  02
                </div>
                <h4 className="font-serif font-bold text-base text-[#0B1325] mb-1">
                  Receive Your Code
                </h4>
                <p className="text-xs text-stone-600">
                  Receive your unique single-use access code provisioned for your cohort.
                </p>
              </div>
              <span className="text-[10px] font-mono text-[#005B4F] font-bold uppercase tracking-wider mt-4">
                Step 2 · Code Issued
              </span>
            </div>

            {/* Step 3 */}
            <div className="rounded-2xl p-5 bg-white card-light border border-[#D9DEE0] shadow-xs relative flex flex-col justify-between">
              <div>
                <div className="h-9 w-9 rounded-xl bg-[#005B4F] text-white flex items-center justify-center font-mono font-bold text-xs mb-3">
                  03
                </div>
                <h4 className="font-serif font-bold text-base text-[#0B1325] mb-1">
                  Take Assessment
                </h4>
                <p className="text-xs text-stone-600">
                  Complete the 25-minute timed certification covering 9 real PV competencies.
                </p>
              </div>
              <span className="text-[10px] font-mono text-[#005B4F] font-bold uppercase tracking-wider mt-4">
                Step 3 · 25-Min Timer
              </span>
            </div>

            {/* Step 4 */}
            <div className="rounded-2xl p-5 bg-white card-light border border-[#D9DEE0] shadow-xs relative flex flex-col justify-between">
              <div>
                <div className="h-9 w-9 rounded-xl bg-[#005B4F] text-white flex items-center justify-center font-mono font-bold text-xs mb-3">
                  04
                </div>
                <h4 className="font-serif font-bold text-base text-[#0B1325] mb-1">
                  Get Your Result
                </h4>
                <p className="text-xs text-stone-600">
                  Instantly review your 0–100 score, strengths, and targeted development plan.
                </p>
              </div>
              <span className="text-[10px] font-mono text-[#005B4F] font-bold uppercase tracking-wider mt-4">
                Step 4 · Instant Analysis
              </span>
            </div>

            {/* Step 5 */}
            <div className="rounded-2xl p-5 bg-white card-light border border-[#D9DEE0] shadow-xs relative flex flex-col justify-between bg-gradient-to-b from-white to-[#E8F7F1]/30">
              <div>
                <div className="h-9 w-9 rounded-xl bg-[#005B4F] text-white flex items-center justify-center font-mono font-bold text-xs mb-3">
                  05
                </div>
                <h4 className="font-serif font-bold text-base text-[#0B1325] mb-1">
                  Earn Credential
                </h4>
                <p className="text-xs text-stone-600">
                  Score 80+ to receive your verified ACRI credential with public verification link.
                </p>
              </div>
              <span className="text-[10px] font-mono text-[#005B4F] font-bold uppercase tracking-wider mt-4">
                Step 5 · 80+ Threshold
              </span>
            </div>
          </div>
        </section>

        {/* ── SECTION 04: WHY TAKE ACRI? (Checklist + Testimonial + Credibility) ── */}
        <section className="py-16 bg-[#FAF8F5] border-t border-[#E5E7EB]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Why Take ACRI Checklist */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <span className="font-mono text-xs font-bold text-[#005B4F] uppercase tracking-widest bg-[#E8F7F1] px-3 py-1 rounded-full">
                    VALUE TO CANDIDATE
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0B1325] mt-3">
                    Why Take ACRI?
                  </h2>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-emerald-100 text-[#005B4F] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-stone-900">Stand out in the job market</h4>
                      <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
                        Prove your readiness with objective case-handling metrics rather than boilerplate resume keywords.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-emerald-100 text-[#005B4F] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-stone-900">Understand your skill gaps</h4>
                      <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
                        Pinpoint your exact proficiency across MedDRA, ICSR, narrative writing, and adverse event triage.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-emerald-100 text-[#005B4F] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-stone-900">Build confidence for real-world PV roles</h4>
                      <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
                        Experience the actual decisions, timelines, and case nuances encountered in leading CROs.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Testimonial & Credibility Card (Reference: Image 2) */}
              <div className="lg:col-span-6 space-y-4">
                {/* Candidate Testimonial */}
                <div className="rounded-2xl p-6 bg-white card-light border border-[#D9DEE0] shadow-xs space-y-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>

                  <p className="text-sm sm:text-base font-serif italic text-stone-800 leading-relaxed">
                    &ldquo;ACRI gave me clarity on where I stand. The scenarios felt just like real Pharmacovigilance work. Sharing my 88/100 score gave recruiters tangible proof of my capability.&rdquo;
                  </p>

                  <div className="flex items-center gap-3 pt-1 border-t border-stone-100">
                    <div className="h-10 w-10 rounded-full overflow-hidden bg-stone-200">
                      <img
                        src="/images/avatar-sneha.jpg"
                        alt="Ritika S."
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-stone-900 block">Ritika S.</span>
                      <span className="text-xs text-stone-500 font-mono">M.Pharm, 2024 · Cohort Early Access</span>
                    </div>
                  </div>
                </div>

                {/* Arzon Global Credibility Banner */}
                <div className="rounded-2xl p-6 bg-[#E8F7F1]/60 border border-[#005B4F]/20 flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-[#005B4F] text-white flex items-center justify-center shrink-0">
                    <Building className="h-5 w-5 text-emerald-300" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#005B4F]">
                      A credible, industry-relevant certification from Arzon Global.
                    </h4>
                    <p className="text-xs text-stone-600 mt-1 leading-normal">
                      Built for students, fresh graduates and professionals aspiring to build an authoritative career in Pharmacovigilance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 05: BOTTOM CTA BANNER (Reference: Image 2 Bottom) ── */}
        <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-[#005B4F] p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Background SVG decorative curves */}
            <div className="absolute right-0 bottom-0 opacity-15 pointer-events-none">
              <svg width="400" height="300" viewBox="0 0 400 300" fill="none">
                <circle cx="300" cy="200" r="180" stroke="white" strokeWidth="2" />
                <circle cx="300" cy="200" r="120" stroke="white" strokeWidth="1.5" />
                <circle cx="300" cy="200" r="60" stroke="white" strokeWidth="1" />
              </svg>
            </div>

            <div className="space-y-2 max-w-xl relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-mono font-bold uppercase tracking-wider">
                <Users className="h-3.5 w-3.5" />
                <span>LIMITED TO 100 SEATS</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
                Be Among the First 100.
              </h2>
              <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
                Join the ACRI launch cohort and take an authoritative step closer to a career in Pharmacovigilance.
              </p>
            </div>

            <div className="relative z-10 shrink-0">
              <button
                type="button"
                onClick={handleOpenModal}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-white card-light hover:bg-stone-100 text-[#005B4F] font-bold text-sm sm:text-base transition-all shadow-lg hover:shadow-xl cursor-pointer group"
              >
                <span>Apply for an ACRI Invite</span>
                <ArrowRight className="h-4 w-4 text-[#005B4F] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER & LEGAL DISCLAIMER ── */}
      <footer className="bg-white card-light border-t border-stone-200 py-12 text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-stone-200 pb-6">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-[#005B4F]" />
              <span className="font-serif font-bold text-base text-stone-900">
                Arzon Global ACRI System
              </span>
            </div>
            <div className="flex items-center gap-6 font-medium text-stone-600">
              <Link to="/acri" className="hover:text-[#005B4F]">
                Methodology
              </Link>
              <Link to="/courses" className="hover:text-[#005B4F]">
                Courses
              </Link>
              <Link to="/verify" className="hover:text-[#005B4F]">
                Verify Credential
              </Link>
              <Link to="/contact" className="hover:text-[#005B4F]">
                Support
              </Link>
            </div>
          </div>

          <div className="space-y-2">
            <p className="font-mono text-[11px] text-stone-500">
              <strong>Certification Standard Disclaimer:</strong> ACRI Industry Ready indicates that the candidate met the defined ACRI assessment standard at the time of assessment. It does not guarantee employment, interview selection, or workplace performance.
            </p>
            <p className="text-[11px] text-stone-400">
              &copy; {new Date().getFullYear()} Arzon Global. All rights reserved. Built for Healthcare Career Intelligence.
            </p>
          </div>
        </div>
      </footer>

      {/* Candidate Profile & Invite Generation Modal */}
      <AcriCandidateModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onInviteGenerated={(code) => {
          setCohort(getAcriCohortMetrics());
        }}
      />
    </div>
  );
}
