import {
  ArrowRight,
  BarChart3,
  BookOpen,
  CheckCircle2,
  Clock,
  Database,
  FileText,
  Monitor,
  Pill,
  ShieldCheck,
  Target,
} from "lucide-react";
import { Link } from "@tanstack/react-router";

export function HomeProgrammesShowcase() {
  return (
    <section id="programmes" className="py-16 sm:py-24 bg-[#F8FAFC] border-b border-slate-200/80 tone-light card-light">
      <div className="ap-shell">
        {/* Eyebrow & Top Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#1557D6] mb-3">
              <BookOpen className="h-3.5 w-3.5 text-[#1557D6]" />
              <span>ROLE-FOCUSED LEARNING</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#071A4A] leading-[1.12]">
              Role-Focused Programmes.<br />
              <span className="text-[#1557D6]">Verifiable Outcomes.</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
              Choose a programme built around the work, tools, and deliverables relevant to your target role.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3 shrink-0">
            <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200/80 rounded-2xl p-2 shadow-2xs tone-light card-light">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-blue-50 text-[#1557D6]">
                <Target className="h-3.5 w-3.5" />
                <span>Aligned with real job descriptions</span>
              </span>
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-50 text-slate-700">
                <BarChart3 className="h-3.5 w-3.5 text-blue-600" />
                <span>Practical, hands-on learning</span>
              </span>
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-50 text-slate-700">
                <ShieldCheck className="h-3.5 w-3.5 text-blue-600" />
                <span>Clear deliverables and skill evidence</span>
              </span>
            </div>

            <Link
              to="/courses"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-xs font-bold text-[#071A4A] hover:bg-slate-50 hover:border-slate-400 transition-all shadow-2xs tone-light card-light"
            >
              <span>View all programmes</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* 2x2 Grid Matching Image media_1791902832916_fe2cf7a7.jpg */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Card 1: Pharmacovigilance */}
          <article className="flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs hover:shadow-lg transition-shadow tone-light card-light">
            <div className="space-y-5">
              {/* Card Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-200/80 flex items-center justify-center text-[#1557D6] shrink-0">
                    <Pill className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#071A4A] leading-snug">
                      Pharmacovigilance & Drug Safety Associate
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Train for entry-level drug safety roles with real-world case practice.
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 font-mono text-xs font-bold text-[#1557D6]">
                    <Clock className="h-3 w-3" />
                    12 Weeks
                  </span>
                  <div className="text-[10px] text-slate-400 mt-1">
                    Live online · Interactive case practice
                  </div>
                </div>
              </div>

              {/* Core Modules */}
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                  CORE CURRICULUM MODULES
                </span>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#1557D6] shrink-0 mt-0.5" />
                    <span>ICSR adverse event triage & Day-0 regulatory clocks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#1557D6] shrink-0 mt-0.5" />
                    <span>Standardized multi-axial medical coding (SOC, PT, LLT)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#1557D6] shrink-0 mt-0.5" />
                    <span>Audit-ready narrative writing with dechallenge/rechallenge</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#1557D6] shrink-0 mt-0.5" />
                    <span>E2B(R3) XML and expedited reporting (15-Day vs 7-Day SUSARs)</span>
                  </li>
                </ul>
              </div>

              {/* Green Capstone Box */}
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-3.5 flex items-start gap-3">
                <FileText className="h-4 w-4 text-emerald-700 mt-0.5 shrink-0" />
                <div>
                  <strong className="block text-xs font-bold text-emerald-900">
                    CAPSTONE · Process and document sample safety cases
                  </strong>
                  <span className="block text-[11px] text-emerald-800 mt-0.5">
                    Work on structured, real-world style ICSR cases in clinical safety databases.
                  </span>
                </div>
              </div>

              {/* Tools You'll Work With */}
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  TOOLS YOU'LL WORK WITH
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {["Safety Database", "Clinical Coding", "WHO-UMC", "CIOMS"].map((t) => (
                    <span
                      key={t}
                      className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-[11px] font-semibold text-slate-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-7 pt-4 border-t border-slate-100">
              <Link
                to="/pv-associate"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#071A4A] py-3.5 px-6 text-xs font-bold text-white hover:bg-[#1557D6] transition-all shadow-xs"
              >
                <span>Explore Programme</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </article>

          {/* Card 2: Medical Coding */}
          <article className="flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs hover:shadow-lg transition-shadow tone-light card-light">
            <div className="space-y-5">
              {/* Card Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-200/80 flex items-center justify-center text-[#1557D6] shrink-0">
                    <Monitor className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#071A4A] leading-snug">
                      Medical Coding & Clinical Informatics
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Learn to translate clinical information into standardized codes.
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 font-mono text-xs font-bold text-[#1557D6]">
                    <Clock className="h-3 w-3" />
                    10 Weeks
                  </span>
                  <div className="text-[10px] text-slate-400 mt-1">
                    Live online · Practical chart audits
                  </div>
                </div>
              </div>

              {/* Core Modules */}
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                  CORE CURRICULUM MODULES
                </span>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#1557D6] shrink-0 mt-0.5" />
                    <span>ICD-10-CM diagnostic coding guidelines</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#1557D6] shrink-0 mt-0.5" />
                    <span>CPT-4 surgical & procedural coding</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#1557D6] shrink-0 mt-0.5" />
                    <span>HCPCS Level II national codes & modifiers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#1557D6] shrink-0 mt-0.5" />
                    <span>AAPC CPC certification preparation & mock tests</span>
                  </li>
                </ul>
              </div>

              {/* Green Capstone Box */}
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-3.5 flex items-start gap-3">
                <FileText className="h-4 w-4 text-emerald-700 mt-0.5 shrink-0" />
                <div>
                  <strong className="block text-xs font-bold text-emerald-900">
                    CAPSTONE · Audited practice charts with documented coding rationale
                  </strong>
                  <span className="block text-[11px] text-emerald-800 mt-0.5">
                    Work on inpatient and outpatient charts with structured feedback.
                  </span>
                </div>
              </div>

              {/* Tools You'll Work With */}
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  TOOLS YOU'LL WORK WITH
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {["ICD-10-CM", "CPT-4", "HCPCS", "AAPC CPC prep"].map((t) => (
                    <span
                      key={t}
                      className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-[11px] font-semibold text-slate-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-7 pt-4 border-t border-slate-100">
              <Link
                to="/courses/$slug"
                params={{ slug: "medical-coding" }}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#071A4A] py-3.5 px-6 text-xs font-bold text-white hover:bg-[#1557D6] transition-all shadow-xs"
              >
                <span>Explore Programme</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </article>

          {/* Card 3: Clinical Data Management */}
          <article className="flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs hover:shadow-lg transition-shadow tone-light card-light">
            <div className="space-y-5">
              {/* Card Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-200/80 flex items-center justify-center text-[#1557D6] shrink-0">
                    <Database className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#071A4A] leading-snug">
                      Clinical Data Management (CDM)
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Learn to manage clinical trial data with hands-on workflows.
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 font-mono text-xs font-bold text-[#1557D6]">
                    <Clock className="h-3 w-3" />
                    Programme Details
                  </span>
                  <div className="text-[10px] text-slate-400 mt-1">
                    Live online · Practical data workflows
                  </div>
                </div>
              </div>

              {/* Core Modules */}
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                  CORE CURRICULUM MODULES
                </span>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#1557D6] shrink-0 mt-0.5" />
                    <span>eCRF design and configuration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#1557D6] shrink-0 mt-0.5" />
                    <span>Data validation specifications and edit checks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#1557D6] shrink-0 mt-0.5" />
                    <span>Query management and discrepancy workflows</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#1557D6] shrink-0 mt-0.5" />
                    <span>SAE reconciliation and clinical database lock</span>
                  </li>
                </ul>
              </div>

              {/* Green Capstone Box */}
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-3.5 flex items-start gap-3">
                <FileText className="h-4 w-4 text-emerald-700 mt-0.5 shrink-0" />
                <div>
                  <strong className="block text-xs font-bold text-emerald-900">
                    CAPSTONE · Data validation and discrepancy workflow exercise
                  </strong>
                  <span className="block text-[11px] text-emerald-800 mt-0.5">
                    Work on real-world style datasets in a training environment.
                  </span>
                </div>
              </div>

              {/* Tools You'll Work With */}
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  TOOLS YOU'LL WORK WITH
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {["EDC", "CDASH", "Edit checks", "SAE reconciliation"].map((t) => (
                    <span
                      key={t}
                      className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-[11px] font-semibold text-slate-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-7 pt-4 border-t border-slate-100">
              <Link
                to="/courses/$slug"
                params={{ slug: "clinical-data-management" }}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#071A4A] py-3.5 px-6 text-xs font-bold text-white hover:bg-[#1557D6] transition-all shadow-xs"
              >
                <span>Explore Programme</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </article>

          {/* Card 4: Clinical SAS */}
          <article className="flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs hover:shadow-lg transition-shadow tone-light card-light">
            <div className="space-y-5">
              {/* Card Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-200/80 flex items-center justify-center text-[#1557D6] shrink-0">
                    <BarChart3 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#071A4A] leading-snug">
                      Clinical SAS & Biostatistical Programming
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Work with clinical data to generate analysis datasets and reports.
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 font-mono text-xs font-bold text-[#1557D6]">
                    <Clock className="h-3 w-3" />
                    Programme Details
                  </span>
                  <div className="text-[10px] text-slate-400 mt-1">
                    Live online · Applied statistical programming
                  </div>
                </div>
              </div>

              {/* Core Modules */}
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                  CORE CURRICULUM MODULES
                </span>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#1557D6] shrink-0 mt-0.5" />
                    <span>SAS programming for clinical data</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#1557D6] shrink-0 mt-0.5" />
                    <span>SDTM concepts and dataset creation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#1557D6] shrink-0 mt-0.5" />
                    <span>ADaM concepts and analysis datasets</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#1557D6] shrink-0 mt-0.5" />
                    <span>TLF generation (Tables, Listings, and Figures)</span>
                  </li>
                </ul>
              </div>

              {/* Green Capstone Box */}
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-3.5 flex items-start gap-3">
                <FileText className="h-4 w-4 text-emerald-700 mt-0.5 shrink-0" />
                <div>
                  <strong className="block text-xs font-bold text-emerald-900">
                    CAPSTONE · Structured programming exercise and report
                  </strong>
                  <span className="block text-[11px] text-emerald-800 mt-0.5">
                    Build SDTM and ADaM datasets and generate sample TLFs.
                  </span>
                </div>
              </div>

              {/* Tools You'll Work With */}
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  TOOLS YOU'LL WORK WITH
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {["SAS", "SAS/STAT", "SDTM", "ADaM"].map((t) => (
                    <span
                      key={t}
                      className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-[11px] font-semibold text-slate-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-7 pt-4 border-t border-slate-100">
              <Link
                to="/courses/$slug"
                params={{ slug: "sas-clinical" }}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#071A4A] py-3.5 px-6 text-xs font-bold text-white hover:bg-[#1557D6] transition-all shadow-xs"
              >
                <span>Explore Programme</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </article>
        </div>

        {/* Bottom 3 Points Strip */}
        <div className="mt-12 pt-8 border-t border-slate-200/80 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-200/80 flex items-center justify-center text-[#1557D6] shrink-0">
              <Target className="h-5 w-5" />
            </div>
            <div>
              <strong className="block text-sm font-bold text-[#071A4A]">Role-relevant curriculum</strong>
              <span className="block text-xs text-slate-500">Built around real job requirements</span>
            </div>
          </div>
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-200/80 flex items-center justify-center text-[#1557D6] shrink-0">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <strong className="block text-sm font-bold text-[#071A4A]">Practical work samples</strong>
              <span className="block text-xs text-slate-500">Build evidence of your skills</span>
            </div>
          </div>
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-200/80 flex items-center justify-center text-[#1557D6] shrink-0">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <strong className="block text-sm font-bold text-[#071A4A]">Clear programme details</strong>
              <span className="block text-xs text-slate-500">Know what you'll learn and deliver</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
