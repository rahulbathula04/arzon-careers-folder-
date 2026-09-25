import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Users,
  Award,
  BarChart3,
  Stethoscope,
  Database,
  Code2,
  FileCheck2,
  Clock,
  Sparkles,
  MessageCircle,
  Building2,
  ExternalLink,
  ChevronRight,
  Check,
  Zap,
  Target,
  FileText,
  AlertCircle,
  TrendingUp,
} from "lucide-react";
import { CareerShell } from "@/components/career/CareerShell";
import { LIVE_LEARNERS_LABEL, waLink, SITE, ACRI_FULL } from "@/components/landing/constants";
import { pageSeo } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/jsonLd";
import { trackCEFunnelStep, trackCECtaClicked } from "@/lib/careerEngineAnalytics";

export const Route = createFileRoute("/career-engine/")({
  head: () => {
    const ps = pageSeo({
      path: "/career-engine",
      title: "Healthcare Career Diagnostic & ACRI Index · Arzon",
      description:
        "Free 3-minute healthcare career diagnostic scored against real Indian pharma job descriptions. Discover role fit across Pharmacovigilance, CDM, Medical Coding, and Regulatory Affairs.",
      image: SITE.ogImages.careerEngine,
    });
    return {
      meta: [
        { title: "Healthcare Career Diagnostic & ACRI Index · Arzon" },
        {
          name: "keywords",
          content:
            "career test for pharma students, pharmacovigilance readiness, ACRI assessment, clinical data management jobs, medical coding certification, Arzon Global",
        },
        ...ps.meta,
      ],
      links: ps.links,
      scripts: [
        {
          type: "application/ld+json",
          children: breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Career Engine", path: "/career-engine" },
          ]),
        },
      ],
    };
  },
  component: CareerEngineLanding,
});

const ROLE_TRACKS = [
  {
    id: "pv",
    title: "Pharmacovigilance (PV) Associate",
    tagline: "Drug Safety & Adverse Event Case Processing",
    salary: "₹4.5L – ₹7.5L CTC",
    demand: "High Growth · 850+ Openings",
    tools: ["Oracle Argus Safety", "MedDRA v27.0", "WHO-UMC Algorithm", "ICH E2A / E2B(R3)"],
    eligibility: "B.Pharm, M.Pharm, Pharm.D, MBBS, BDS, Life Sciences",
    coreTask: "Triage ICSR adverse event reports, code adverse events, evaluate causality, write clinical narratives, and meet expedited 7/15-day regulatory timelines.",
    icon: Stethoscope,
    badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
  },
  {
    id: "cdm",
    title: "Clinical Data Coordinator (CDM)",
    tagline: "Clinical Trial Data Management & Query Resolution",
    salary: "₹4.0L – ₹6.8L CTC",
    demand: "Steady Demand · 620+ Openings",
    tools: ["Medidata Rave", "Oracle InForm", "CDISC SDTM", "Good Clinical Data Practice (GCDP)"],
    eligibility: "B.Pharm, M.Pharm, B.Sc/M.Sc Biotech, Microbiology, Biochemistry",
    coreTask: "Design eCRFs, perform electronic data cleaning, issue and reconcile data queries, and validate clinical trial databases for regulatory lock.",
    icon: Database,
    badgeColor: "bg-sky-50 text-sky-800 border-sky-200",
  },
  {
    id: "mc",
    title: "Medical Coder (CPC / CRC)",
    tagline: "Clinical Chart Auditing & Healthcare Reimbursement",
    salary: "₹3.6L – ₹6.2L CTC",
    demand: "Surging Demand · 1,200+ Openings",
    tools: ["ICD-10-CM", "CPT-4", "HCPCS Level II", "AAPC / AHIMA Standards"],
    eligibility: "Any Life Sciences / Pharmacy Graduate, Nursing, Physiotherapy",
    coreTask: "Review physician documentation, translate diagnoses and procedures into alphanumeric standardized medical codes for US healthcare claims.",
    icon: Code2,
    badgeColor: "bg-indigo-50 text-indigo-800 border-indigo-200",
  },
  {
    id: "ra",
    title: "Regulatory Affairs (RA) Specialist",
    tagline: "Global Drug Dossier Filing & Compliance",
    salary: "₹5.0L – ₹8.5L CTC",
    demand: "High Value · 410+ Openings",
    tools: ["eCTD Software", "21 CFR Part 11", "CDSCO SUGAM", "ICH CTD Guidelines"],
    eligibility: "M.Pharm (Regulatory Affairs/Pharmaceutics), Pharm.D, M.Sc",
    coreTask: "Assemble Module 1–5 eCTD dossiers, handle query responses from US FDA/EMA/CDSCO, and maintain post-approval lifecycle variations.",
    icon: FileCheck2,
    badgeColor: "bg-amber-50 text-amber-800 border-amber-200",
  },
];

const EVALUATED_COMPETENCIES = [
  { id: "icsr", name: "ICSR Processing", desc: "4 minimum criteria, suspect drug vs concomitant triage" },
  { id: "meddra", name: "MedDRA Coding", desc: "LLT to PT mapping under MedDRA v27.0 conventions" },
  { id: "seriousness", name: "Seriousness Criteria", desc: "ICH E2A death, life-threatening, hospitalization gates" },
  { id: "expectedness", name: "Expectedness & RSI", desc: "SmPC / IB reference safety information validation" },
  { id: "narrative", name: "Clinical Narrative", desc: "Chronological, neutral, objective event summaries" },
  { id: "causality", name: "WHO-UMC Causality", desc: "Algorithmic Certain / Probable / Possible classification" },
  { id: "timelines", name: "Expedited Timelines", desc: "Strict adherence to 7-day (fatal) and 15-day reporting" },
  { id: "dechallenge", name: "De-challenge & Re-challenge", desc: "Action taken with drug and clinical event resolution" },
  { id: "quality", name: "Quality & QC Review", desc: "Zero-defect audit trails for global regulatory scrutiny" },
];

function CareerEngineLanding() {
  const [selectedRole, setSelectedRole] = useState(ROLE_TRACKS[0]);

  useEffect(() => {
    trackCEFunnelStep({ step: "interested" });
  }, []);

  const onStartCta = (target: string) => () => trackCECtaClicked({ step: "interested", target });

  return (
    <CareerShell>
      {/* ─── Hero Diagnostic Header ────────────────────────────────────────── */}
      <section className="text-center pt-2 pb-8 sm:pb-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-stone-100/80 px-3.5 py-1 text-[11px] font-mono font-bold tracking-wider text-[#1B3F8B] uppercase shadow-2xs">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" /> Healthcare Career Intelligence · 2026 Recruitment Standard
        </div>

        <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-serif font-bold text-stone-900 tracking-tight leading-[1.15] max-w-3xl mx-auto">
          Find the Clinical Role India is{" "}
          <span className="italic font-serif text-[#1B3F8B] font-medium">Actively Hiring You For.</span>
        </h1>

        <p className="mt-4 text-base sm:text-lg text-stone-700 max-w-2xl mx-auto leading-relaxed">
          Over 250,000 healthcare graduates apply blindly to CROs every year. Your{" "}
          <strong className="font-semibold text-stone-900">{ACRI_FULL}</strong> scores your operational readiness against real job descriptions, maps your skill gaps, and unlocks your 30-day hiring roadmap.
        </p>

        {/* Eligibility Chips */}
        <div className="mt-6 flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
          {["Pharm.D & B.Pharm", "M.Pharm (Pharmacology / RA)", "B.Sc & M.Sc Life Sciences", "MBBS, BDS & Allied Health"].map((stream) => (
            <span
              key={stream}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-stone-100 text-stone-700 text-xs font-medium border border-stone-200/80"
            >
              <Check className="h-3 w-3 text-emerald-600" /> {stream}
            </span>
          ))}
        </div>

        {/* ─── Two Distinct Evaluation Gateways ──────────────────────────────── */}
        <div className="mt-8 sm:mt-10 grid gap-4 sm:grid-cols-2 text-left max-w-3xl mx-auto">
          {/* Gateway 1: Flagship ACRI Certification */}
          <div className="relative rounded-2xl border-2 border-[#1B3F8B] bg-white tone-light p-6 shadow-md flex flex-col justify-between hover:shadow-lg transition-shadow">
            <div className="absolute -top-3 left-6 inline-flex items-center gap-1.5 rounded-full bg-[#1B3F8B] px-3 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-slate-50 shadow-xs">
              <Sparkles className="h-3 w-3 text-amber-400" /> Flagship Work Simulation
            </div>

            <div>
              <div className="flex items-center justify-between mt-1">
                <span className="font-mono text-xs font-semibold text-[#1B3F8B] uppercase tracking-wider">
                  25 Min · 9 Competencies
                </span>
                <span className="inline-flex items-center text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Verifiable Credential
                </span>
              </div>

              <h2 className="mt-3 text-xl font-bold font-serif text-stone-900">
                ACRI Pharmacovigilance Certification
              </h2>

              <p className="mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed">
                Take the official ICSR simulation assessment. Screened against ICH E2A criteria and MedDRA v27.0. Earn a verified credential ID shared with leading CRO recruiters.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-100">
              <Link
                to="/acri/pharmacovigilance-certification"
                onClick={onStartCta("acri_cert_hero")}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#0B1325] px-4 py-3 text-sm font-semibold text-slate-50 shadow-sm hover:bg-[#1B3F8B] active:scale-[0.98] transition-all"
              >
                Apply for Cohort Invite <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-wider text-stone-500">
                Invite Code Required · Batch Limited to 100
              </p>
            </div>
          </div>

          {/* Gateway 2: Fast 3-Minute Role Alignment Test */}
          <div className="relative rounded-2xl border border-stone-200 bg-white tone-light p-6 shadow-xs flex flex-col justify-between hover:border-stone-300 transition-colors">
            <div className="absolute -top-3 left-6 inline-flex items-center gap-1.5 rounded-full bg-stone-100 border border-stone-300 px-3 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-stone-700 shadow-2xs">
              <Zap className="h-3 w-3 text-amber-600" /> Fast Role Diagnostic
            </div>

            <div>
              <div className="flex items-center justify-between mt-1">
                <span className="font-mono text-xs font-semibold text-stone-500 uppercase tracking-wider">
                  3 Min · 5 Dimensions
                </span>
                <span className="inline-flex items-center text-[11px] font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                  Instant Results
                </span>
              </div>

              <h2 className="mt-3 text-xl font-bold font-serif text-stone-900">
                3-Minute Role Fit Test
              </h2>

              <p className="mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed">
                Discover which healthcare track aligns best with your degree and aptitude. Compare Pharmacovigilance, CDM, Medical Coding, and Regulatory Affairs in 3 minutes.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-100">
              <Link
                to="/career-engine/test"
                onClick={onStartCta("fast_fit_hero")}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-stone-300 bg-stone-50 tone-light px-4 py-3 text-sm font-semibold text-stone-900 shadow-2xs hover:bg-stone-100 hover:border-stone-400 active:scale-[0.98] transition-all"
              >
                Take the Free Career Fit Test <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-wider text-stone-500">
                100% Free · No Login · No Credit Card
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Institutional Trust & Numbers Strip ───────────────────────────── */}
      <section className="mt-4 sm:mt-6 rounded-2xl border border-stone-200 bg-white tone-light p-5 sm:p-6 shadow-2xs">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-stone-200">
          <div className="text-center pt-2 sm:pt-0">
            <p className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">{LIVE_LEARNERS_LABEL}</p>
            <p className="mt-1 font-mono text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-stone-500">
              Graduates Benchmarked
            </p>
          </div>
          <div className="text-center pt-2 sm:pt-0 sm:pl-4">
            <p className="text-2xl sm:text-3xl font-serif font-bold text-emerald-700">80% Threshold</p>
            <p className="mt-1 font-mono text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-stone-500">
              Operational Independence
            </p>
          </div>
          <div className="text-center pt-2 sm:pt-0 sm:pl-4">
            <p className="text-2xl sm:text-3xl font-serif font-bold text-[#1B3F8B]">₹4.2L – ₹8.5L</p>
            <p className="mt-1 font-mono text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-stone-500">
              Entry Salary Spectrum
            </p>
          </div>
          <div className="text-center pt-2 sm:pt-0 sm:pl-4">
            <p className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">ISO 9001:2015</p>
            <p className="mt-1 font-mono text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-stone-500">
              Quality Assessment Standard
            </p>
          </div>
        </div>
      </section>

      {/* ─── The 4 Clinical Career Tracks ──────────────────────────────────── */}
      <section className="mt-10 sm:mt-14">
        <div className="text-center max-w-2xl mx-auto">
          <span className="font-mono text-xs font-bold text-[#1B3F8B] uppercase tracking-widest">
            Role Landscape & Market Economics
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-serif font-bold text-stone-900">
            The 4 Clinical Data Careers India is Hiring For
          </h2>
          <p className="mt-2 text-sm text-stone-600">
            Compare salary bands, hiring volume, and tool requirements across the top pharmaceutical and CRO tracks.
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {ROLE_TRACKS.map((role) => {
            const isSelected = selectedRole.id === role.id;
            return (
              <button
                key={role.id}
                type="button"
                onClick={() => setSelectedRole(role)}
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-all ${
                  isSelected
                    ? "bg-[#0B1325] text-slate-50 shadow-sm"
                    : "bg-white tone-light text-stone-700 border border-stone-200 hover:border-stone-300"
                }`}
              >
                <role.icon className="h-4 w-4" />
                {role.title.split("(")[0].trim()}
              </button>
            );
          })}
        </div>

        {/* Selected Role Dossier Card */}
        <div className="mt-6 rounded-2xl border border-stone-200 bg-white tone-light p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-100 pb-5">
            <div>
              <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded border ${selectedRole.badgeColor}`}>
                {selectedRole.demand}
              </span>
              <h3 className="mt-2 text-2xl font-serif font-bold text-stone-900">{selectedRole.title}</h3>
              <p className="text-sm text-stone-600">{selectedRole.tagline}</p>
            </div>
            <div className="bg-stone-50 rounded-xl p-3 sm:px-4 sm:py-3 border border-stone-200 shrink-0 text-left md:text-right">
              <span className="font-mono text-[10px] uppercase tracking-wider text-stone-500 font-semibold block">
                Typical Starting Package
              </span>
              <span className="text-lg sm:text-xl font-bold font-serif text-[#1B3F8B]">{selectedRole.salary}</span>
            </div>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Core Operational Responsibility
              </h4>
              <p className="mt-2 text-xs sm:text-sm text-stone-700 leading-relaxed bg-stone-50 p-3.5 rounded-xl border border-stone-200/70">
                {selectedRole.coreTask}
              </p>

              <h4 className="mt-4 font-mono text-xs font-bold uppercase tracking-wider text-stone-900">
                Eligible Academic Backgrounds
              </h4>
              <p className="mt-1 text-xs sm:text-sm text-stone-600">{selectedRole.eligibility}</p>
            </div>

            <div>
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center gap-1.5">
                <Code2 className="h-4 w-4 text-[#1B3F8B]" /> Standard Tool & Guideline Stack
              </h4>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {selectedRole.tools.map((t) => (
                  <div key={t} className="rounded-lg border border-stone-200 bg-stone-50 p-2.5 text-xs font-medium text-stone-800">
                    {t}
                  </div>
                ))}
              </div>

              <div className="mt-5 p-3.5 rounded-xl bg-sky-50/70 border border-sky-200/80">
                <p className="text-xs text-sky-950 font-medium">
                  <strong>Evaluated in ACRI:</strong> Candidates benchmarked on this track undergo simulated case scenarios matching real CRO screening standards.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-xs text-stone-500">
              Evaluated by recruiters at IQVIA, Parexel, Novartis, Cognizant, and Syneos Health.
            </span>
            <Link
              to="/career-engine/test"
              onClick={onStartCta(`role_fit_${selectedRole.id}`)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0B1325] px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-50 hover:bg-[#1B3F8B] transition-colors"
            >
              Test My Fit for {selectedRole.title.split("(")[0].trim()} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── The 9 Evaluated Clinical Competencies ─────────────────────────── */}
      <section className="mt-12 sm:mt-16">
        <div className="text-center max-w-2xl mx-auto">
          <span className="font-mono text-xs font-bold text-[#1B3F8B] uppercase tracking-widest">
            Psychometric & Clinical Rigor
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-serif font-bold text-stone-900">
            The 9 Competencies Assessed in ACRI
          </h2>
          <p className="mt-2 text-sm text-stone-600">
            Academic exams test theory. ACRI tests whether you can handle live adverse event case files without making regulatory errors.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {EVALUATED_COMPETENCIES.map((comp, idx) => (
            <div
              key={comp.id}
              className="rounded-xl border border-stone-200 bg-white tone-light p-4 shadow-2xs hover:border-stone-300 transition-colors text-left"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold text-stone-500 uppercase tracking-wider">
                  Gate {idx + 1}
                </span>
                <span className="font-mono text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                  80% Benchmark
                </span>
              </div>
              <h3 className="mt-2 text-sm font-bold text-stone-900 font-sans">{comp.name}</h3>
              <p className="mt-1 text-xs text-stone-600 leading-relaxed">{comp.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/acri/methodology"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#1B3F8B] hover:underline"
          >
            Read the full ACRI Clinical Standard Setting & Psychometric Methodology <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ─── Institutional Trust & College Benchmarks ─────────────────────── */}
      <section className="mt-12 sm:mt-16 rounded-2xl border border-stone-200 bg-stone-50 p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              <Users className="h-3.5 w-3.5 text-emerald-600" /> {LIVE_LEARNERS_LABEL} Candidates Evaluated
            </span>
            <h3 className="mt-3 text-xl sm:text-2xl font-serif font-bold text-stone-900">
              Trusted by Candidates from Top Pharmacy & Science Colleges
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed">
              Students and graduates from institutions including Manipal College of Pharmaceutical Sciences, JSS College of Pharmacy, Bombay College of Pharmacy, Poona College of Pharmacy, and NIPER have benchmarked their readiness with ACRI.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href={waLink("Hi Arzon, I would like guidance on which clinical career path fits my qualification.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-stone-300 bg-white tone-light px-4 py-2.5 text-xs sm:text-sm font-semibold text-stone-800 shadow-2xs hover:bg-stone-50 transition-colors"
            >
              <MessageCircle className="h-4 w-4 text-emerald-600" /> WhatsApp Counsellor
            </a>
            <Link
              to="/acri/leaderboard"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0B1325] px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-50 hover:bg-[#1B3F8B] transition-colors"
            >
              <Award className="h-4 w-4 text-amber-400" /> View Leaderboard
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Final Action CTA Strip ────────────────────────────────────────── */}
      <section className="mt-12 sm:mt-16 text-center pb-8 border-t border-stone-200 pt-10">
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
          Ready to Discover Your Industry Readiness?
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-stone-600 max-w-xl mx-auto">
          Take the structured 3-minute test. No login required. Get your immediate competency gap map and tailored recruitment plan.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/career-engine/test"
            onClick={onStartCta("start_bottom_primary")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#0B1325] px-6 py-3.5 text-sm font-semibold text-slate-50 shadow-md hover:bg-[#1B3F8B] active:scale-[0.98] transition-all"
          >
            Start the Free Career Test <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/acri/pharmacovigilance-certification"
            onClick={onStartCta("start_bottom_acri")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-stone-300 bg-white tone-light px-6 py-3.5 text-sm font-semibold text-stone-900 shadow-2xs hover:bg-stone-50 transition-colors"
          >
            Apply for ACRI Cohort Invite <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-6">
          <Link to="/" className="text-xs font-semibold text-stone-500 hover:text-stone-900 transition-colors">
            ← Return to Arzon Global Home
          </Link>
        </div>
      </section>
    </CareerShell>
  );
}
