import { Link } from "@tanstack/react-router";
import { GraduationCap, Building2, CheckCircle2, ArrowRight } from "lucide-react";

interface AcriAudiencePanelsProps {
  onOpenRecruiterModal?: () => void;
}

export function AcriAudiencePanels({ onOpenRecruiterModal }: AcriAudiencePanelsProps) {
  return (
    <section className="bg-white tone-light py-16 lg:py-24 border-b border-stone-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {/* Card 1: For Students */}
          <div className="card-light rounded-3xl border border-stone-200 bg-[#FAF8F5] p-6 sm:p-8 flex flex-col justify-between overflow-hidden relative">
            {/* Top Content */}
            <div className="space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0B1325] text-white">
                <GraduationCap className="h-6 w-6 text-emerald-400" />
              </div>
              <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-[#0B1325]">
                For Students
              </h2>
              <p className="text-sm text-stone-600 leading-relaxed max-w-md">
                Understand your career potential, build job-ready skills, and stand out to top employers.
              </p>
              <div className="pt-2">
                <Link
                  to="/career-engine/start"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#0B1325] px-5 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#152342] transition-colors shadow-xs"
                >
                  <span>Start Your Assessment</span>
                  <ArrowRight className="h-3.5 w-3.5 text-emerald-400" />
                </Link>
              </div>
            </div>

            {/* Bottom Image with Editorial Note */}
            <div className="mt-8 relative flex justify-end">
              {/* Handwritten Note */}
              <div className="absolute top-4 left-2 sm:left-6 z-10 pointer-events-none -rotate-6">
                <span className="font-handwriting text-2xl sm:text-3xl text-stone-800 leading-tight block select-none drop-shadow-xs">
                  Future<br />You<br />Thanks<br />You
                </span>
              </div>

              <div className="w-56 sm:w-64 overflow-hidden rounded-2xl border border-stone-200 bg-white tone-light shadow-md">
                <img
                  src="/images/pv-student-card.jpg"
                  alt="Indian pharmacy student preparing for corporate career"
                  width={256}
                  height={256}
                  className="h-auto w-full object-cover aspect-square"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Card 2: For Recruiters & Employers */}
          <div className="card-light rounded-3xl border border-stone-200 bg-[#FAF8F5] p-6 sm:p-8 flex flex-col justify-between overflow-hidden relative">
            {/* Top Content */}
            <div className="space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0B1325] text-white">
                <Building2 className="h-6 w-6 text-emerald-400" />
              </div>
              <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-[#0B1325]">
                For Recruiters &amp; Employers
              </h2>
              <p className="text-sm text-stone-600 leading-relaxed max-w-md">
                Access a pool of ACRI-certified job-ready talent trained on real industry requirements.
              </p>

              {/* 4 Benefits */}
              <div className="grid grid-cols-2 gap-2.5 pt-2 text-xs font-semibold text-stone-800">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Verified Talent</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Role-ready Candidates</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Assessment-backed Skills</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Faster Hiring</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={onOpenRecruiterModal}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#0B1325] px-5 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#152342] transition-colors cursor-pointer shadow-xs"
                >
                  <span>Partner with Us</span>
                  <ArrowRight className="h-3.5 w-3.5 text-emerald-400" />
                </button>
              </div>
            </div>

            {/* Bottom Image */}
            <div className="mt-8 flex justify-end">
              <div className="w-56 sm:w-64 overflow-hidden rounded-2xl border border-stone-200 bg-white tone-light shadow-md">
                <img
                  src="/images/pv-recruiter.jpg"
                  alt="Indian Healthcare Recruiter and PV Operations Director"
                  width={256}
                  height={256}
                  className="h-auto w-full object-cover aspect-square"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
