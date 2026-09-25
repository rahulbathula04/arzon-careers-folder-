import { Building2, CheckCircle2, ArrowRight, ShieldCheck, UserCheck, Clock, Award } from "lucide-react";
import { Link } from "@tanstack/react-router";

interface AcriAudiencePanelsProps {
  onOpenRecruiterModal?: () => void;
}

export function AcriAudiencePanels({ onOpenRecruiterModal }: AcriAudiencePanelsProps) {
  return (
    <section id="employers-section" className="bg-white tone-light py-16 lg:py-24 border-b border-stone-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Employer Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F7F1] border border-[#005B4F]/20 text-[#005B4F] text-[11px] font-mono font-bold uppercase tracking-wider">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>EMPLOYER TALENT NETWORK</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0B1325] leading-tight">
              Hire Verified, <br />
              <span className="text-[#005B4F]">Job-Ready Talent.</span>
            </h2>

            <p className="text-base text-stone-600 leading-relaxed max-w-xl">
              Stop guessing based on degrees alone. See what candidates can actually do in real clinical scenarios before you interview.
            </p>

            {/* 4 Feature Points matching comp */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-stone-200/80 space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-stone-900">
                  <UserCheck className="h-4 w-4 text-[#005B4F]" />
                  <span>Pre-assessed Candidates</span>
                </div>
                <p className="text-[11px] text-stone-500 leading-relaxed">
                  Evaluated across 40 calibrated real-world ICSR cases and clinical scenarios.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-stone-200/80 space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-stone-900">
                  <Award className="h-4 w-4 text-[#005B4F]" />
                  <span>Multi-dimension Scores</span>
                </div>
                <p className="text-[11px] text-stone-500 leading-relaxed">
                  Granular breakdown across 9 competencies, 3 critical decision gates, and attention to detail.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-stone-200/80 space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-stone-900">
                  <CheckCircle2 className="h-4 w-4 text-[#005B4F]" />
                  <span>Real Case Performance</span>
                </div>
                <p className="text-[11px] text-stone-500 leading-relaxed">
                  Proven hands-on capability on Argus Safety, MedDRA coding, and WHO-UMC causality.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-stone-200/80 space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-stone-900">
                  <Clock className="h-4 w-4 text-[#005B4F]" />
                  <span>Faster Hiring Cycles</span>
                </div>
                <p className="text-[11px] text-stone-500 leading-relaxed">
                  Reduce fresher interview-to-offer screening time by 60% with zero credential fraud.
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onOpenRecruiterModal}
                className="inline-flex items-center gap-2 rounded-xl bg-[#005B4F] hover:bg-[#00473E] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-all shadow-sm hover:shadow-md cursor-pointer group"
              >
                <span>Partner With Us</span>
                <ArrowRight className="h-4 w-4 text-emerald-300 group-hover:translate-x-1 transition-transform" />
              </button>

              <Link
                to="/recruiters"
                className="text-xs font-semibold text-stone-700 hover:text-[#005B4F] underline underline-offset-4"
              >
                Explore Hiring Rubric &amp; Standards →
              </Link>
            </div>
          </div>

          {/* Right Column: Candidate Capability Preview Card */}
          <div className="lg:col-span-5 relative">
            <div className="card-light rounded-3xl border border-stone-200 bg-[#FAF8F5] p-6 shadow-xl relative overflow-hidden">
              {/* Header Badge */}
              <div className="flex items-center justify-between border-b border-stone-200 pb-3 mb-4">
                <span className="font-mono text-[10px] font-bold text-stone-500 uppercase tracking-wider">
                  VERIFIED CANDIDATE PROFILE
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold font-mono">
                  ACRI 86 / 100
                </span>
              </div>

              {/* Recruiter & Candidate Visual */}
              <div className="flex items-center gap-4 mb-5">
                <img
                  src="/images/pv-recruiter.jpg"
                  alt="Verified Candidate Evaluation by Talent Lead"
                  width={64}
                  height={64}
                  className="h-16 w-16 rounded-2xl object-cover border border-stone-200 shadow-xs"
                  loading="lazy"
                />
                <div>
                  <h3 className="font-serif text-base font-bold text-[#0B1325]">
                    Dr. Vikram Sethi
                  </h3>
                  <p className="text-xs text-stone-500">VP Pharmacovigilance, Global CRO</p>
                  <p className="text-[11px] text-emerald-800 font-semibold mt-0.5">
                    &ldquo;Arzon certified candidates ramp up 3x faster.&rdquo;
                  </p>
                </div>
              </div>

              {/* Candidate Capability Preview Strip */}
              <div className="space-y-2.5 p-4 rounded-2xl bg-white tone-light card-light border border-stone-200/80 shadow-2xs text-xs">
                <div className="flex justify-between items-center text-stone-700">
                  <span className="font-medium">4 Minimum ICSR Criteria:</span>
                  <span className="font-bold text-emerald-700">100% (Passed Gate 1)</span>
                </div>
                <div className="flex justify-between items-center text-stone-700">
                  <span className="font-medium">MedDRA LLT → PT Precision:</span>
                  <span className="font-bold text-stone-900">92%</span>
                </div>
                <div className="flex justify-between items-center text-stone-700">
                  <span className="font-medium">Expedited Reporting Clock:</span>
                  <span className="font-bold text-stone-900">15 Calendar Days (Pass)</span>
                </div>
                <div className="flex justify-between items-center text-stone-700">
                  <span className="font-medium">ICH E2B(R3) Narrative Quality:</span>
                  <span className="font-bold text-stone-900">Audit-Ready</span>
                </div>
              </div>

              {/* Footer Trust Link */}
              <div className="mt-4 pt-3 border-t border-stone-200/80 flex items-center justify-between text-[11px] text-stone-500">
                <span>Cryptographic verification:</span>
                <span className="font-mono text-[#005B4F] font-bold">arzoncareers.in/verify</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
