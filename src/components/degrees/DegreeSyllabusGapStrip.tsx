import { BookOpen, Building2, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function DegreeSyllabusGapStrip() {
  return (
    <section className="py-12 sm:py-16 bg-[#F8FAFC]/80 border-b border-[#E4EAF2] tone-light card-light">
      <div className="mb-8 sm:mb-10 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-mono font-semibold uppercase tracking-wider text-[#2563EB] mb-3 shadow-2xs tone-light card-light">
          <BookOpen className="h-3 w-3 text-[#2563EB]" />
          <span>CURRICULUM GAP ANALYSIS</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#081F38] tracking-tight">
          Why University Syllabi Leave an Operational Gap{" "}
          <span className="bg-gradient-to-r from-[#2563EB] via-[#0284C7] to-[#7C3AED] bg-clip-text text-transparent [box-decoration-break:clone]">
            (And How We Close It)
          </span>
        </h2>
        <p className="mt-2 text-sm sm:text-base text-[#475569] font-normal leading-relaxed">
          University curricula teach valuable biological and chemical theory, but Global Capability Centers (GCCs) and CROs evaluate candidates on practical database software competency from day one.
        </p>
      </div>

      {/* 3-Column Comparative Architecture */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch">
        {/* Column 1: Academic Curricula */}
        <div className="flex flex-col justify-between rounded-2xl border border-[#E2E8F0] bg-white p-5 sm:p-6 shadow-xs tone-light card-light relative">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-slate-100 text-[#475569] border border-slate-200">
                <BookOpen className="h-4.5 w-4.5" />
              </div>
              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 font-mono text-[10.5px] font-bold text-[#475569]">
                Academic Focus
              </span>
            </div>

            <h3 className="mt-4 text-lg font-bold text-[#081F38]">
              What Universities Teach
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-[#64748B] leading-relaxed">
              Designed around statutory regulatory boards (PCI, UGC) prioritizing theoretical biology, organic synthesis, and written exams.
            </p>

            <ul className="mt-4 space-y-2.5 text-xs text-[#334155]">
              <li className="flex items-start gap-2">
                <span className="text-[#94A3B8] font-mono mt-0.5">&bull;</span>
                <span>Pharmacological receptors, mechanisms of action, and organ systems</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#94A3B8] font-mono mt-0.5">&bull;</span>
                <span>Wet chemistry lab assays, titrations, and chemical synthesis</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#94A3B8] font-mono mt-0.5">&bull;</span>
                <span>Theoretical clinical trial phases without live electronic data access</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#94A3B8] font-mono mt-0.5">&bull;</span>
                <span>Pen-and-paper examinations and subjective definitions</span>
              </li>
            </ul>
          </div>

          <div className="mt-5 pt-3.5 border-t border-[#F1F5F9] text-[11px] font-mono text-[#64748B]">
            <span className="font-bold text-amber-700">The Delta:</span> Zero exposure to enterprise safety databases, ICD coding books, or CDISC SDTM datasets.
          </div>
        </div>

        {/* Column 2: GCC Operational Reality */}
        <div className="flex flex-col justify-between rounded-2xl border border-blue-200 bg-[#EEF6FF]/60 p-5 sm:p-6 shadow-xs tone-light card-light relative">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-blue-100">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-blue-100 text-[#1D4ED8] border border-blue-200">
                <Building2 className="h-4.5 w-4.5" />
              </div>
              <span className="rounded-full bg-blue-100 px-2.5 py-0.5 font-mono text-[10.5px] font-bold text-[#1D4ED8]">
                Corporate Hiring Bar
              </span>
            </div>

            <h3 className="mt-4 text-lg font-bold text-[#081F38]">
              What Recruiters Test on Day 1
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-[#475569] leading-relaxed">
              Global Capability Centers evaluate practical workflow throughput, error rates, and compliance standards.
            </p>

            <ul className="mt-4 space-y-2.5 text-xs text-[#081F38]">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#2563EB] shrink-0 mt-0.5" />
                <span>Processing live ICSR cases under E2B(R3) transmission standards</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#2563EB] shrink-0 mt-0.5" />
                <span>Navigating ICD-10-CM / CPT manuals with 95%+ audit accuracy</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#2563EB] shrink-0 mt-0.5" />
                <span>Resolving eCRF discrepancies in Electronic Data Capture (EDC) systems</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#2563EB] shrink-0 mt-0.5" />
                <span>Mapping clinical datasets to CDISC SDTM domains and ADaM structures</span>
              </li>
            </ul>
          </div>

          <div className="mt-5 pt-3.5 border-t border-blue-100 text-[11px] font-mono text-[#1E3A8A]">
            <span className="font-bold text-[#2563EB]">The Test:</span> Technical interviews test live scenario execution and software navigation.
          </div>
        </div>

        {/* Column 3: How Arzon Bridges It */}
        <div className="flex flex-col justify-between rounded-2xl border border-emerald-300 bg-white p-5 sm:p-6 shadow-md shadow-emerald-500/5 tone-light card-light relative">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#10B981] to-[#2563EB]" />

          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
                <Sparkles className="h-4.5 w-4.5" />
              </div>
              <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 font-mono text-[10.5px] font-bold text-emerald-800">
                Arzon Applied Bridge
              </span>
            </div>

            <h3 className="mt-4 text-lg font-bold text-[#081F38]">
              How Arzon Closes the Delta
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-[#475569] leading-relaxed">
              We translate academic knowledge into verifiable corporate tool proficiency through simulated industry practice.
            </p>

            <ul className="mt-4 space-y-2.5 text-xs text-[#081F38]">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#10B981] shrink-0 mt-0.5" />
                <span className="font-semibold">Enterprise simulator labs:</span>
                <span className="text-[#475569]">Hands-on practice on real workflows</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#10B981] shrink-0 mt-0.5" />
                <span className="font-semibold">De-identified work samples:</span>
                <span className="text-[#475569]">Verified portfolios recruiters inspect</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#10B981] shrink-0 mt-0.5" />
                <span className="font-semibold">TASK alignment:</span>
                <span className="text-[#475569]">Recognized by Govt. of Telangana standards</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#10B981] shrink-0 mt-0.5" />
                <span className="font-semibold">MNC interview calibration:</span>
                <span className="text-[#475569]">Targeted prep for screening rounds</span>
              </li>
            </ul>
          </div>

          <div className="mt-5 pt-3.5 border-t border-[#F1F5F9] flex items-center justify-between">
            <span className="font-mono text-[11px] font-bold text-emerald-800">
              12 Weeks to Corporate Readiness
            </span>
            <Link
              to="/career-engine/start"
              className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-[#2563EB] hover:text-[#1D4ED8]"
            >
              <span>Check Fit</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Metric Callouts Strip */}
      <div className="mt-8 pt-6 border-t border-[#E4EAF2] grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-center">
        <div className="p-3 rounded-xl bg-white border border-[#E2E8F0] tone-light card-light">
          <div className="text-xl sm:text-2xl font-extrabold text-[#081F38]">94%</div>
          <div className="text-[11px] text-[#64748B] font-medium mt-0.5">Freshers with zero database exposure</div>
        </div>
        <div className="p-3 rounded-xl bg-white border border-[#E2E8F0] tone-light card-light">
          <div className="text-xl sm:text-2xl font-extrabold text-[#2563EB]">2,000+</div>
          <div className="text-[11px] text-[#64748B] font-medium mt-0.5">Verified Indian GCC job descriptions</div>
        </div>
        <div className="p-3 rounded-xl bg-white border border-[#E2E8F0] tone-light card-light">
          <div className="text-xl sm:text-2xl font-extrabold text-emerald-700">12 Weeks</div>
          <div className="text-[11px] text-[#64748B] font-medium mt-0.5">Average time to audit-ready work samples</div>
        </div>
        <div className="p-3 rounded-xl bg-white border border-[#E2E8F0] tone-light card-light">
          <div className="text-xl sm:text-2xl font-extrabold text-[#081F38]">₹3.8L–₹7.0L</div>
          <div className="text-[11px] text-[#64748B] font-medium mt-0.5">Calibrated entry-level starting CTC bands</div>
        </div>
      </div>
    </section>
  );
}
