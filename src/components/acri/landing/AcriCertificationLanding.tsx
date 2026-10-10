import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Briefcase,
  Building,
  CheckCircle2,
  Clock,
  Compass,
  FileCheck,
  FileText,
  GraduationCap,
  HelpCircle,
  Layers,
  LineChart,
  Lock,
  MessageSquare,
  Scale,
  Shield,
  ShieldCheck,
  Stethoscope,
  Target,
  Zap,
} from "lucide-react";
import { ProductComparisonTable } from "@/components/career/ProductComparisonTable";
import { AcriCandidateModal } from "@/components/acri/landing/AcriCandidateModal";
import { logAcriFunnelEvent } from "@/lib/acri/acriCandidateStore";

export function AcriCertificationLanding() {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    logAcriFunnelEvent("landing_viewed", { page: "acri_certification_landing" });

    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("apply") === "true" || params.get("apply") === "1") {
        setModalOpen(true);
      }
    }
  }, []);

  const openInviteModal = () => {
    logAcriFunnelEvent("cta_clicked", { location: "acri_landing_hero" });
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-slate-800 pb-16">
      {/* =========================================================================
          1. HERO SECTION (DARK THEME - EXACT CLONE OF MOCKUP RIGHT)
          ========================================================================= */}
      <section className="bg-gradient-to-b from-[#071A4A] via-[#0A1D54] to-[#08173E] text-white pt-8 sm:pt-12 pb-12 sm:pb-16 border-b border-[#1E3A8A]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            {/* Left Hero Content (7 cols) */}
            <div className="lg:col-span-7">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-300">
                ACRI CERTIFICATION
              </span>

              <h1 className="mt-2 text-3xl sm:text-4xl lg:text-[2.75rem] font-serif font-bold tracking-tight text-white leading-[1.18]">
                Knowing the role is one thing. <br />
                <span className="text-[#A78BFA] sm:text-[#B197FC]">Demonstrating readiness is another.</span>
              </h1>

              <p className="mt-3.5 max-w-xl text-sm sm:text-base leading-relaxed text-slate-300">
                ACRI (Arzon Critical Research Index) is a role-specific Pharmacovigilance assessment that
                evaluates how you apply your knowledge to real drug-safety case scenarios.
              </p>

              {/* Badges Pill Row */}
              <div className="mt-6 flex flex-wrap gap-2 text-xs">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-medium text-slate-200 backdrop-blur-xs">
                  <Clock className="h-3.5 w-3.5 text-cyan-300" /> 25 minutes
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-medium text-slate-200 backdrop-blur-xs">
                  <Briefcase className="h-3.5 w-3.5 text-purple-300" /> Practical case scenarios
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-medium text-slate-200 backdrop-blur-xs">
                  <LineChart className="h-3.5 w-3.5 text-blue-300" /> Industry-relevant evaluation
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-medium text-slate-200 backdrop-blur-xs">
                  <Lock className="h-3.5 w-3.5 text-amber-300" /> Invite-only access
                </span>
              </div>

              {/* Primary CTA Button */}
              <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <button
                  type="button"
                  onClick={openInviteModal}
                  className="inline-flex h-12 items-center justify-center rounded-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-7 text-sm font-bold shadow-lg shadow-purple-900/30 transition-all active:scale-[0.98]"
                >
                  Apply for an ACRI Invite <ArrowRight className="ml-2 h-4 w-4" />
                </button>
                <Link
                  to="/acri/invite"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white px-5 text-xs sm:text-sm font-semibold transition-colors"
                >
                  Have an invite code? Enter code →
                </Link>
              </div>
            </div>

            {/* Right Hero Graphic: Professional Photo & Circular Readiness Scorecard (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-[420px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-slate-900">
                <img
                  src="/images/acri-professional.jpg"
                  alt="Clinical research professional completing ACRI assessment"
                  className="w-full h-[360px] sm:h-[400px] object-cover object-center brightness-95"
                />

                {/* Scorecard Widget Layered Over Right Top/Center */}
                <div
                  className="absolute top-4 right-4 sm:top-5 sm:right-5 bg-white tone-light card-light rounded-2xl p-4 shadow-2xl border border-slate-200 max-w-[210px] animate-in fade-in zoom-in-95 duration-300"
                  style={{ color: "#0F172A", backgroundColor: "#FFFFFF" }}
                >
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2">
                    <span className="font-bold text-xs" style={{ color: "#071A4A" }}>ACRI</span>
                    <span className="text-[10px] font-semibold" style={{ color: "#64748B" }}>Role Readiness Score</span>
                  </div>

                  {/* Circular Donut Gauge Graphic */}
                  <div className="flex flex-col items-center justify-center my-1.5">
                    <div className="relative flex items-center justify-center">
                      <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          strokeWidth="3.2"
                          stroke="#E2E8F0"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          strokeDasharray="82, 100"
                          strokeWidth="3.2"
                          strokeLinecap="round"
                          stroke="#10B981"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <div className="absolute text-center">
                        <span className="text-xl font-bold font-mono" style={{ color: "#071A4A" }}>82%</span>
                      </div>
                    </div>
                    <span
                      className="mt-1 text-[11px] font-bold px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: "#ECFDF5", color: "#065F46" }}
                    >
                      Industry Ready
                    </span>
                  </div>

                  {/* Checklist items */}
                  <div className="mt-2.5 space-y-1 text-[11px] border-t border-slate-100 pt-2 font-medium">
                    <div className="flex items-center gap-1.5" style={{ color: "#334155" }}>
                      <CheckCircle2 className="h-3 w-3 text-emerald-600 shrink-0" />
                      <span>ICSR Processing</span>
                    </div>
                    <div className="flex items-center gap-1.5" style={{ color: "#334155" }}>
                      <CheckCircle2 className="h-3 w-3 text-emerald-600 shrink-0" />
                      <span>Causality Assessment</span>
                    </div>
                    <div className="flex items-center gap-1.5" style={{ color: "#334155" }}>
                      <CheckCircle2 className="h-3 w-3 text-emerald-600 shrink-0" />
                      <span>MedDRA Coding</span>
                    </div>
                    <div className="flex items-center gap-1.5" style={{ color: "#94A3B8" }}>
                      <div className="h-2.5 w-2.5 rounded-full border border-slate-300 shrink-0 ml-0.5" />
                      <span>Signal Detection</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. WHO SHOULD TAKE ACRI? (3 HORIZONTAL CARDS)
          ========================================================================= */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 mt-12 sm:mt-16">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#071A4A]">
            Who should take ACRI?
          </h2>
        </div>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-slate-200 bg-white tone-light card-light p-5 shadow-xs">
            <div className="h-9 w-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
              <GraduationCap className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-[#071A4A]">Students & Fresh Graduates</h3>
            <p className="mt-1 text-xs text-slate-600 leading-relaxed">
              Who want to demonstrate Pharmacovigilance readiness.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white tone-light card-light p-5 shadow-xs">
            <div className="h-9 w-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
              <Briefcase className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-[#071A4A]">Early-Career Professionals</h3>
            <p className="mt-1 text-xs text-slate-600 leading-relaxed">
              Who want to validate their practical understanding.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white tone-light card-light p-5 shadow-xs">
            <div className="h-9 w-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
              <Building className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-[#071A4A]">Career Switchers</h3>
            <p className="mt-1 text-xs text-slate-600 leading-relaxed">
              Who want to prove their industry readiness with a verifiable assessment.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. WHAT ACRI EVALUATES (3x3 GRID - 9 COMPETENCIES)
          ========================================================================= */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 mt-12 sm:mt-16">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#071A4A]">
              What ACRI evaluates
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-600">
              Nine key competency areas based on real industry requirements.
            </p>
          </div>
          <Link to="/acri/competencies" className="text-xs font-bold text-purple-700 hover:underline">
            See detailed syllabus →
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {/* 1 */}
          <div className="rounded-xl border border-slate-200 bg-white tone-light card-light p-4 shadow-2xs">
            <div className="flex items-center gap-2.5">
              <div className="h-7 w-7 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center shrink-0">
                <Target className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-[#071A4A]">PV Fundamentals</h3>
                <p className="text-[11px] text-slate-500">Core drug-safety concepts</p>
              </div>
            </div>
          </div>

          {/* 2 */}
          <div className="rounded-xl border border-slate-200 bg-white tone-light card-light p-4 shadow-2xs">
            <div className="flex items-center gap-2.5">
              <div className="h-7 w-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <FileCheck className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-[#071A4A]">ICSR Processing</h3>
                <p className="text-[11px] text-slate-500">Case intake and evaluation</p>
              </div>
            </div>
          </div>

          {/* 3 */}
          <div className="rounded-xl border border-slate-200 bg-white tone-light card-light p-4 shadow-2xs">
            <div className="flex items-center gap-2.5">
              <div className="h-7 w-7 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-[#071A4A]">Case Assessment</h3>
                <p className="text-[11px] text-slate-500">Causality and seriousness</p>
              </div>
            </div>
          </div>

          {/* 4 */}
          <div className="rounded-xl border border-slate-200 bg-white tone-light card-light p-4 shadow-2xs">
            <div className="flex items-center gap-2.5">
              <div className="h-7 w-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                <Stethoscope className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-[#071A4A]">Medical Interpretation</h3>
                <p className="text-[11px] text-slate-500">Clinical and medical review</p>
              </div>
            </div>
          </div>

          {/* 5 */}
          <div className="rounded-xl border border-slate-200 bg-white tone-light card-light p-4 shadow-2xs">
            <div className="flex items-center gap-2.5">
              <div className="h-7 w-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                <Layers className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-[#071A4A]">MedDRA and Coding</h3>
                <p className="text-[11px] text-slate-500">Classification and coding</p>
              </div>
            </div>
          </div>

          {/* 6 */}
          <div className="rounded-xl border border-slate-200 bg-white tone-light card-light p-4 shadow-2xs">
            <div className="flex items-center gap-2.5">
              <div className="h-7 w-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <FileText className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-[#071A4A]">Documentation</h3>
                <p className="text-[11px] text-slate-500">Case narratives and records</p>
              </div>
            </div>
          </div>

          {/* 7 */}
          <div className="rounded-xl border border-slate-200 bg-white tone-light card-light p-4 shadow-2xs">
            <div className="flex items-center gap-2.5">
              <div className="h-7 w-7 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0">
                <Shield className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-[#071A4A]">Quality and Compliance</h3>
                <p className="text-[11px] text-slate-500">Process and reporting</p>
              </div>
            </div>
          </div>

          {/* 8 */}
          <div className="rounded-xl border border-slate-200 bg-white tone-light card-light p-4 shadow-2xs">
            <div className="flex items-center gap-2.5">
              <div className="h-7 w-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                <Scale className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-[#071A4A]">Analytical Reasoning</h3>
                <p className="text-[11px] text-slate-500">Evidence-based decisions</p>
              </div>
            </div>
          </div>

          {/* 9 */}
          <div className="rounded-xl border border-slate-200 bg-white tone-light card-light p-4 shadow-2xs">
            <div className="flex items-center gap-2.5">
              <div className="h-7 w-7 rounded-lg bg-violet-50 text-violet-700 flex items-center justify-center shrink-0">
                <MessageSquare className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-[#071A4A]">Situational Judgement</h3>
                <p className="text-[11px] text-slate-500">Respond to real work scenarios</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. HOW THE ACRI PROCESS WORKS (4 STEPS CONNECTED WITH ARROWS)
          ========================================================================= */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 mt-12 sm:mt-16">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#071A4A]">
            How the ACRI process works
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-600">
            Invite → Assessment → Results → Credential
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
          {/* Step 1 */}
          <div className="rounded-2xl border border-slate-200 bg-white tone-light card-light p-5 shadow-xs relative">
            <div className="flex items-center justify-between mb-3">
              <div className="h-8 w-8 rounded-full bg-blue-600 text-white font-mono font-bold text-xs flex items-center justify-center">
                1
              </div>
              <span className="hidden lg:block text-slate-300 font-bold text-lg">→</span>
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-[#071A4A]">Apply for an invite</h3>
            <p className="mt-1 text-[11px] text-slate-600 leading-relaxed">
              Submit a short application for review.
            </p>
          </div>

          {/* Step 2 */}
          <div className="rounded-2xl border border-slate-200 bg-white tone-light card-light p-5 shadow-xs relative">
            <div className="flex items-center justify-between mb-3">
              <div className="h-8 w-8 rounded-full bg-purple-600 text-white font-mono font-bold text-xs flex items-center justify-center">
                2
              </div>
              <span className="hidden lg:block text-slate-300 font-bold text-lg">→</span>
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-[#071A4A]">Get approved</h3>
            <p className="mt-1 text-[11px] text-slate-600 leading-relaxed">
              Receive an access key by email.
            </p>
          </div>

          {/* Step 3 */}
          <div className="rounded-2xl border border-slate-200 bg-white tone-light card-light p-5 shadow-xs relative">
            <div className="flex items-center justify-between mb-3">
              <div className="h-8 w-8 rounded-full bg-blue-700 text-white font-mono font-bold text-xs flex items-center justify-center">
                3
              </div>
              <span className="hidden lg:block text-slate-300 font-bold text-lg">→</span>
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-[#071A4A]">Take the assessment</h3>
            <p className="mt-1 text-[11px] text-slate-600 leading-relaxed">
              Complete 25-minute, practical cases.
            </p>
          </div>

          {/* Step 4 */}
          <div className="rounded-2xl border border-slate-200 bg-white tone-light card-light p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="h-8 w-8 rounded-full bg-[#071A4A] text-white font-mono font-bold text-xs flex items-center justify-center">
                4
              </div>
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-[#071A4A]">Get your results</h3>
            <p className="mt-1 text-[11px] text-slate-600 leading-relaxed">
              See your ACRI score, competency profile and credential eligibility.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. PRODUCT COMPARISON (SECTION 5 REQUIREMENT)
          ========================================================================= */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 mt-12 sm:mt-16">
        <ProductComparisonTable activeProduct="acri" onApplyAcri={openInviteModal} />
      </section>

      {/* =========================================================================
          6. BOTTOM CONVERSION BANNER (DARK THEME - EXACT CLONE)
          ========================================================================= */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 mt-12 sm:mt-16">
        <div className="rounded-3xl border border-[#1E3A8A] bg-gradient-to-r from-[#071A4A] via-[#091D54] to-[#0A1B44] text-white p-6 sm:p-9 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
                Ready to demonstrate your Pharmacovigilance capability?
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-300">
                Apply for an ACRI invite and take the next step towards a verified credential.
              </p>
            </div>

            <div className="shrink-0">
              <button
                type="button"
                onClick={openInviteModal}
                style={{ color: "#071A4A", backgroundColor: "#FFFFFF" }}
                className="inline-flex h-11 items-center justify-center rounded-full bg-white tone-light font-extrabold px-6 text-xs sm:text-sm shadow-md transition-all hover:bg-slate-100 active:scale-[0.98]"
              >
                Apply for an ACRI Invite <ArrowRight className="ml-2 h-4 w-4" style={{ color: "#071A4A" }} />
              </button>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center gap-4 text-[11px] text-slate-300 font-medium">
            <span className="flex items-center gap-1.5">
              <Lock className="h-3 w-3 text-amber-300" /> Invite only
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3 w-3 text-cyan-300" /> 25 minutes
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3 w-3 text-emerald-400" /> Industry Ready at 80+
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-3 w-3 text-purple-300" /> Verifiable credential
            </span>
          </div>
        </div>
      </section>

      {/* Invite Application Modal */}
      <AcriCandidateModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
