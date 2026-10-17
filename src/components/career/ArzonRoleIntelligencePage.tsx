import { useState } from "react";
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  ShieldCheck,
  Wrench,
  Building2,
  BarChart3,
  Clock,
  FileText,
  AlertTriangle,
  Layers,
  Database,
  Check,
  ChevronRight,
  Sparkles,
  Search,
  BookOpen,
  HelpCircle,
  Award,
  Users,
  Activity,
  Terminal,
  ShieldAlert,
  ArrowUpRight,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { CAREER_ROLES, type CareerRole } from "@/data/careerRoles";
import { PV_ROLE_ENHANCED_DATA, type PvRoleInteractiveMeta } from "@/data/pvRoleInteractiveData";

export function ArzonRoleIntelligencePage({
  role,
  courseSlug,
  provenance,
}: {
  role: CareerRole;
  courseSlug: string;
  provenance: { refreshedOn: string; topJdPhrases: Array<{ phrase: string; satisfiedByModule?: string | null }> } | null;
}) {
  const cleanSlug = role.slug.split(".").pop() ?? role.slug;
  const assessmentSearch = { role: cleanSlug };
  const relatedRoles = CAREER_ROLES.filter(
    (item) => item.slug !== role.slug && (item.familyId === role.familyId || item.pathSlug === role.pathSlug),
  ).slice(0, 6);

  const ROLE_HERO_IMAGES: Record<string, string> = {
    "drug-safety-associate": "/images/roles/drug-safety-associate-hero.jpg",
    "icsr-case-processor": "/images/roles/icsr-case-processor-hero.jpg",
    "pv-associate": "/images/roles/pv-associate-hero.jpg",
  };

  const heroImage =
    ROLE_HERO_IMAGES[cleanSlug] ??
    (role.familyId === "drug-safety"
      ? "/images/roles/drug-safety-associate-hero.jpg"
      : "/images/bpharm-female-graduate-hero.jpg");
  const employers = role.topCompanies.slice(0, 8);

  // Check if we have specialized PV visual metadata
  const pvMeta: PvRoleInteractiveMeta | undefined = PV_ROLE_ENHANCED_DATA[cleanSlug];

  // Interactive tab state for case simulation
  const [activeSimTab, setActiveSimTab] = useState<"transcript" | "criteria" | "coding" | "narrative" | "triage">(
    "transcript",
  );
  // Interactive active workflow step
  const [activeWorkflowIndex, setActiveWorkflowIndex] = useState<number>(0);
  // Active defense FAQ
  const [openDefenseIndex, setOpenDefenseIndex] = useState<number | null>(0);

  return (
    <main className="min-h-screen bg-[#F8FAFC] tone-light font-sans antialiased text-[#1E293B]">
      {/* ── 01. EXECUTIVE INSTITUTIONAL HERO WITH FULL ROLE IMAGE BANNER ─────── */}
      <section className="relative overflow-hidden border-b border-[#E2E8F0] bg-white tone-light">
        <div className="absolute inset-0 bg-radial-[at_top_right] from-[#EEF6FF]/70 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 sm:pt-12 sm:pb-16 relative z-10 space-y-8">
          {/* Top Breadcrumb & Badge Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#64748B]">
              <Link to="/roles" className="hover:text-[#071A4A] transition-colors">Career Taxonomy</Link>
              <span>/</span>
              <span className="text-[#1557D6]">{role.familyId === "drug-safety" ? "Drug Safety & PV" : role.familyId}</span>
              <span>/</span>
              <span className="text-[#071A4A]">{role.name}</span>
            </nav>

            <div className="inline-flex items-center gap-2 rounded-full border border-[#D0E1FD] bg-[#EEF6FF] px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider text-[#1557D6]">
              <span className="h-2 w-2 rounded-full bg-[#1557D6] motion-safe:animate-pulse" />
              <span>{pvMeta?.badgeLabel ?? `${role.seniority.toUpperCase()} ROLE INTELLIGENCE · 2026 EDITION`}</span>
            </div>
          </div>

          {/* Cinematic Role Header Image Banner (Visual Anchor matching screenshots) */}
          <div className="relative overflow-hidden rounded-3xl border border-[#CBD5E1] bg-[#071A4A] shadow-xl">
            <img
              src={heroImage}
              alt={`${role.name} in clinical operations environment`}
              className="h-64 sm:h-80 lg:h-96 w-full object-cover object-center filter brightness-[0.82] transition duration-700"
              loading="eager"
            />
            {/* Soft Ambient Overlay for readability & brand contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#071A4A] via-[#071A4A]/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#071A4A]/80 via-transparent to-transparent" />

            {/* In-Image Overlay Content */}
            <div className="absolute inset-x-6 sm:inset-x-10 bottom-6 sm:bottom-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 text-white">
              <div className="space-y-2 max-w-2xl">
                <span className="inline-block rounded-full bg-white/20 backdrop-blur-md px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-widest text-sky-200 border border-white/20">
                  {role.familyId === "drug-safety" ? "Pharmacovigilance Operations" : role.familyId}
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                  {role.name}
                </h1>
                <p className="text-xs sm:text-sm text-slate-200 font-medium line-clamp-2 sm:line-clamp-none">
                  {pvMeta?.heroSubhead ?? role.blurb}
                </p>
              </div>

              {/* In-Image Quick Badge */}
              <div className="flex items-center gap-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-3 sm:p-4 shrink-0 text-right">
                <div className="text-left sm:text-right">
                  <div className="text-[10px] font-mono uppercase text-sky-300 font-bold">From Reports to Safer Medicines</div>
                  <div className="text-xs font-semibold text-white">Your Work Makes a Clinical Difference</div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Content Grid: Metrics, Value Proposition, Action CTAs & Shifts */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pt-2">
            {/* Left Column: Title, Authority Dossier, Value & CTA */}
            <div className="lg:col-span-7 space-y-6">
              {/* Eyebrow Pill */}
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D0E1FD] bg-[#EEF6FF] px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider text-[#1557D6]">
                <span className="h-2 w-2 rounded-full bg-[#1557D6] motion-safe:animate-pulse" />
                <span>{pvMeta?.badgeLabel ?? `${role.seniority.toUpperCase()} ROLE INTELLIGENCE · 2026 EDITION`}</span>
              </div>

              {/* Headline */}
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#071A4A] leading-[1.12]">
                {role.name}
                <span className="block text-xl sm:text-2xl font-sans font-bold text-[#1557D6] mt-2">
                  Role Blueprint, Case Mechanics & Production Readiness
                </span>
              </h1>

              {/* Lead Blurb */}
              <p className="text-base sm:text-lg text-[#334155] leading-relaxed">
                {pvMeta?.leadParagraph ?? role.blurb}
              </p>

              {/* Live Metric Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="rounded-xl border border-[#E2E8F0] bg-white tone-light card-light p-3.5 shadow-xs">
                  <div className="text-[11px] font-mono uppercase font-bold text-[#64748B]">Live JD Evidence</div>
                  <div className="text-xl font-extrabold text-[#071A4A] mt-1">{role.evidence ? `${role.evidence.jdCount}+` : "210+"}</div>
                  <div className="text-[10px] text-[#1557D6] font-medium mt-0.5">Verified Indian Vacancies</div>
                </div>

                <div className="rounded-xl border border-[#E2E8F0] bg-white tone-light card-light p-3.5 shadow-xs">
                  <div className="text-[11px] font-mono uppercase font-bold text-[#64748B]">Entry Pay Band</div>
                  <div className="text-xl font-extrabold text-[#071A4A] mt-1">₹{role.salary?.entry.min ?? 3.5}–{role.salary?.entry.max ?? 5.0} LPA</div>
                  <div className="text-[10px] text-emerald-600 font-medium mt-0.5">Top CROs & Pharma</div>
                </div>

                <div className="rounded-xl border border-[#E2E8F0] bg-white tone-light card-light p-3.5 shadow-xs">
                  <div className="text-[11px] font-mono uppercase font-bold text-[#64748B]">AI Automation Risk</div>
                  <div className="text-xl font-extrabold text-[#071A4A] mt-1">{role.aiRisk}</div>
                  <div className="text-[10px] text-[#64748B] font-medium mt-0.5">Human sign-off mandated</div>
                </div>

                <div className="rounded-xl border border-[#E2E8F0] bg-white tone-light card-light p-3.5 shadow-xs">
                  <div className="text-[11px] font-mono uppercase font-bold text-[#64748B]">Hiring Demand</div>
                  <div className="text-xl font-extrabold text-[#1557D6] mt-1">{role.demandIndia}</div>
                  <div className="text-[10px] text-[#64748B] font-medium mt-0.5">Hyd · Blr · Pune · Mum</div>
                </div>
              </div>

              {/* CTA Action Row */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/career-engine/start"
                  search={assessmentSearch}
                  className="inline-flex items-center gap-2 rounded-full bg-[#071A4A] hover:bg-[#1557D6] text-white px-6 py-3.5 text-sm font-bold shadow-md transition-all duration-200"
                >
                  <span>Evaluate My Role Fit (Diagnostic)</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  to="/pv-associate"
                  className="inline-flex items-center gap-2 rounded-full border border-[#D0E1FD] bg-white tone-light card-light hover:bg-[#EEF6FF] text-[#071A4A] px-6 py-3.5 text-sm font-bold transition-all duration-200"
                >
                  <BookOpen className="h-4 w-4 text-[#1557D6]" />
                  <span>12-Week Production Track</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Visual Terminal / Daily Operations Radar */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-2xl border border-[#CBD5E1] bg-white tone-light card-light shadow-lg overflow-hidden">
                {/* Window Bar */}
                <div className="bg-[#071A4A] px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                    <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                    <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    <span className="ml-2 font-mono text-[11px] font-bold text-white tracking-wider">
                      OPERATIONAL_LEDGER · {role.name.toUpperCase()}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono bg-white/10 text-white/80 px-2 py-0.5 rounded">
                    SLA_STANDARD
                  </span>
                </div>

                {/* Operations Breakdown */}
                <div className="p-5 space-y-5">
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold text-[#071A4A] mb-2">
                      <span className="uppercase font-mono tracking-wider text-[#64748B]">Daily Working Shift Allocation</span>
                      <span className="font-mono text-[#1557D6]">8-Hour Production Cycle</span>
                    </div>

                    <div className="space-y-3">
                      {(pvMeta?.dailyTimeSplit ?? [
                        { label: "Intake Triage & Day-0 Validity", pct: 25, detail: "Source verification, 4 criteria check", color: "#1557D6" },
                        { label: "Standardized Medical Coding", pct: 25, detail: "LLT/PT mapping, ATC product coding", color: "#6946E8" },
                        { label: "Chronological Narrative Writing", pct: 30, detail: "Storytelling, dechallenge, labs", color: "#27B9B3" },
                        { label: "Self-QC & Duplicate Reconciliation", pct: 20, detail: "Defect review, clock compliance", color: "#071A4A" },
                      ]).map((item) => (
                        <div key={item.label} className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="font-semibold text-[#1E293B]">{item.label}</span>
                            <span className="font-mono font-bold text-[#071A4A]">{item.pct}%</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-[#E2E8F0] overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{ width: `${item.pct}%`, backgroundColor: item.color }}
                            />
                          </div>
                          <p className="text-[11px] text-[#64748B]">{item.detail}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Operational SLAs */}
                  <div className="pt-3 border-t border-[#E2E8F0] grid grid-cols-2 gap-2 text-xs">
                    <div className="rounded-lg bg-[#F8FAFC] p-2.5 border border-[#E2E8F0]">
                      <div className="text-[10px] font-mono text-[#64748B] uppercase">Daily Target</div>
                      <div className="font-bold text-[#071A4A] mt-0.5">{pvMeta?.productionMetrics.dailyTarget ?? "3–4 Cases / Shift"}</div>
                    </div>
                    <div className="rounded-lg bg-[#F8FAFC] p-2.5 border border-[#E2E8F0]">
                      <div className="text-[10px] font-mono text-[#64748B] uppercase">Turnaround SLA</div>
                      <div className="font-bold text-[#071A4A] mt-0.5">{pvMeta?.productionMetrics.averageSla ?? "24–48 Hours"}</div>
                    </div>
                    <div className="rounded-lg bg-[#F8FAFC] p-2.5 border border-[#E2E8F0]">
                      <div className="text-[10px] font-mono text-[#64748B] uppercase">Quality AQL</div>
                      <div className="font-bold text-[#1557D6] mt-0.5">{pvMeta?.productionMetrics.rightFirstTimeAql ?? "≥ 98.0% RFT"}</div>
                    </div>
                    <div className="rounded-lg bg-[#F8FAFC] p-2.5 border border-[#E2E8F0]">
                      <div className="text-[10px] font-mono text-[#64748B] uppercase">Critical Defect Gate</div>
                      <div className="font-bold text-red-600 mt-0.5">{pvMeta?.productionMetrics.criticalErrorTolerance ?? "0% (Zero Tolerance)"}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Human Mentor & Verification Note */}
              <div className="rounded-xl border border-[#D0E1FD] bg-[#EEF6FF] p-4 flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 text-[#1557D6] shrink-0 mt-0.5" />
                <div className="text-xs text-[#1E293B] leading-relaxed">
                  <strong className="text-[#071A4A] block mb-0.5">Auditable Production Standard</strong>
                  This role profile reflects active fresher hiring benchmarks across Hyderabad, Bengaluru, Pune, and Chennai CRO centers. Governed by ICH E2D(R1), E2B(R3), and CDSCO/PvPI guidelines.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 02. INTERACTIVE CASE PROCESSING WORKFLOW (THE 4 OPERATIONAL PILLARS) ── */}
      <section className="py-16 sm:py-20 border-b border-[#E2E8F0] bg-[#F8FAFC] tone-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D0E1FD] bg-[#EEF6FF] px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider text-[#1557D6]">
              <span>WHAT FRESHERS ACTUALLY DO EVERY DAY</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#071A4A] tracking-tight">
              The 4 Core Operational Workflows of a {role.name}
            </h2>
            <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
              Employers do not hire candidates for reciting definitions. They test whether you can intake a messy clinical file, map standardized medical terms, author an objective narrative, and dispatch before regulatory clocks expire.
            </p>
          </div>

          {/* Interactive 4-Step Architecture */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Step Selector Buttons */}
            <div className="lg:col-span-5 space-y-3">
              {(pvMeta?.coreWorkflows ?? [
                {
                  step: "01",
                  title: "Intake & 4 Minimum Criteria Validation",
                  tagline: "Determining Regulatory Reportability & Day-0",
                  description: "Confirm identifiable patient, identifiable reporter, suspect product, and adverse event. Lock receipt date.",
                  toolBadge: "Intake Ledger",
                  regulatoryRef: "ICH E2D(R1)",
                  sampleArtifact: "Case Validity Checklist",
                },
                {
                  step: "02",
                  title: "Dual Medical Dictionary Coding",
                  tagline: "Standardized Medical & Drug Coding",
                  description: "Map verbatim terms to Lowest Level Term (LLT) and Preferred Term (PT). Code drugs to standardized medicinal product dictionaries.",
                  toolBadge: "Clinical Coding Browser",
                  regulatoryRef: "ICH M1 (MTS:PTC)",
                  sampleArtifact: "Coding Rationale Table",
                },
                {
                  step: "03",
                  title: "Chronological Clinical Narrative Construction",
                  tagline: "Regulatory Storytelling without Speculation",
                  description: "Structure patient history, onset, dechallenge, lab markers, and physician causality comments.",
                  toolBadge: "Narrative Editor",
                  regulatoryRef: "ICH E2B(R3) B.5",
                  sampleArtifact: "Standard Narrative",
                },
                {
                  step: "04",
                  title: "Triage, Listedness & Expedited Routing",
                  tagline: "Seriousness Classification & Gateway Dispatch",
                  description: "Evaluate against 6 seriousness criteria and CCDS/SmPC reference safety documents. Route for 15-day alert.",
                  toolBadge: "Safety Gateway",
                  regulatoryRef: "US FDA / EMA GVP VI",
                  sampleArtifact: "Triage & Clock Ledger",
                },
              ]).map((wf, idx) => {
                const isActive = activeWorkflowIndex === idx;
                return (
                  <button
                    key={wf.step}
                    onClick={() => setActiveWorkflowIndex(idx)}
                    className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex items-start gap-4 ${
                      isActive
                        ? "border-[#1557D6] bg-white tone-light card-light shadow-md ring-2 ring-[#1557D6]/10"
                        : "border-[#E2E8F0] bg-white/70 tone-light hover:bg-white hover:border-[#CBD5E1]"
                    }`}
                  >
                    <div
                      className={`h-9 w-9 rounded-xl font-mono text-xs font-extrabold flex items-center justify-center shrink-0 ${
                        isActive ? "bg-[#1557D6] text-white" : "bg-[#F1F5F9] text-[#64748B]"
                      }`}
                    >
                      {wf.step}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-[#1557D6] uppercase tracking-wider">{wf.regulatoryRef}</span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-[#071A4A]">{wf.title}</h3>
                      <p className="text-xs text-[#64748B]">{wf.tagline}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Step Detail Dossier Display */}
            <div className="lg:col-span-7">
              {(() => {
                const current = (pvMeta?.coreWorkflows ?? [])[activeWorkflowIndex] ?? {
                  step: "01",
                  title: "Intake & 4 Minimum Criteria Validation",
                  tagline: "Determining Regulatory Reportability & Day-0",
                  description: "Review primary intake documentation across spontaneous calls, hospital emails, and clinical trial SAE forms. Confirm the 4 essential pillars: identifiable patient, identifiable reporter, suspect medicinal product, and adverse event. Record Day-0 timestamp immediately to lock regulatory clock.",
                  toolBadge: "Intake Ledger / OCR Triage",
                  regulatoryRef: "ICH E2D(R1) & E2A",
                  sampleArtifact: "Case Validity Checklist with Day-0 Clock Stamp",
                };
                return (
                  <div className="rounded-2xl border border-[#CBD5E1] bg-white tone-light card-light shadow-lg p-6 sm:p-8 space-y-6">
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#E2E8F0]">
                      <div className="flex items-center gap-3">
                        <span className="h-8 w-8 rounded-lg bg-[#071A4A] text-white font-mono text-xs font-bold flex items-center justify-center">
                          {current.step}
                        </span>
                        <div>
                          <span className="text-[11px] font-mono uppercase font-bold text-[#1557D6]">
                            {current.regulatoryRef}
                          </span>
                          <h4 className="text-lg font-bold text-[#071A4A]">{current.title}</h4>
                        </div>
                      </div>

                      <span className="rounded-full bg-[#EEF6FF] border border-[#D0E1FD] px-3 py-1 font-mono text-xs font-semibold text-[#1557D6]">
                        {current.toolBadge}
                      </span>
                    </div>

                    <div className="space-y-4">
                      <h5 className="text-xs font-mono uppercase tracking-wider font-bold text-[#64748B]">Operational Mission</h5>
                      <p className="text-sm sm:text-base text-[#334155] leading-relaxed">
                        {current.description}
                      </p>
                    </div>

                    {/* Operational Mechanics Grid */}
                    <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-5 space-y-3">
                      <div className="text-xs font-mono uppercase font-bold text-[#071A4A]">Verifiable Work Deliverable</div>
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-[#1557D6] shrink-0" />
                        <span className="text-sm font-semibold text-[#1E293B]">{current.sampleArtifact}</span>
                      </div>
                      <p className="text-xs text-[#64748B] leading-relaxed">
                        Trainees compile this artifact across 20+ assigned cases in Minor Project 1 and 35+ cases in the Major Capstone. Hiring managers inspect this exact document during technical interviews.
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs text-[#64748B]">
                        Classroom Coverage: <strong className="text-[#071A4A]">Weeks 2–5 of the 12-Week Track</strong>
                      </span>
                      <Link
                        to="/pv-associate"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1557D6] hover:underline"
                      >
                        <span>See Syllabus Session</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* ── 03. LIVE CLINICAL CASE STUDY EXPLORER (MAX VISUAL EVIDENCE) ──────── */}
      {pvMeta && (
        <section className="py-16 sm:py-20 border-b border-[#E2E8F0] bg-white tone-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            {/* Heading */}
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider text-emerald-700">
                <Sparkles className="h-3.5 w-3.5" />
                <span>INTERACTIVE CLINICAL DOSSIER</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#071A4A] tracking-tight">
                Case Simulation: Inspect How a Safety Associate Solves This Case
              </h2>
              <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
                Click through each tab below to see how raw medical intake data is parsed into valid criteria, coded to standardized hierarchy, turned into a regulatory narrative, and triaged under regulatory clocks.
              </p>
            </div>

            {/* Dossier Terminal Container */}
            <div className="rounded-2xl border border-[#CBD5E1] bg-white tone-light card-light shadow-xl overflow-hidden">
              {/* Dossier Header */}
              <div className="bg-[#071A4A] p-4 sm:p-5 text-white flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold bg-[#1557D6] px-2.5 py-0.5 rounded">
                      CASE_ID: {pvMeta.interactiveCaseStudy.caseId}
                    </span>
                    <span className="text-xs text-white/80">{pvMeta.interactiveCaseStudy.sourceType}</span>
                  </div>
                  <div className="text-xs font-mono text-emerald-400">
                    ⏱ {pvMeta.interactiveCaseStudy.receiptClock}
                  </div>
                </div>

                {/* Sub-tab Navigation */}
                <div className="flex flex-wrap items-center gap-1.5 bg-white/10 p-1 rounded-xl">
                  {[
                    { id: "transcript", label: "01 Source Report" },
                    { id: "criteria", label: "02 4-Criteria Triage" },
                    { id: "coding", label: "03 Standardized Coding" },
                    { id: "narrative", label: "04 Regulatory Narrative" },
                    { id: "triage", label: "05 Reporting Decision" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveSimTab(tab.id as any)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        activeSimTab === tab.id
                          ? "bg-white text-[#071A4A] shadow-xs"
                          : "text-white/80 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dossier Body Content */}
              <div className="p-6 sm:p-8 bg-[#F8FAFC]">
                {/* 1. Source Transcript */}
                {activeSimTab === "transcript" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase font-bold text-[#64748B]">Raw Inbound Intake Document</span>
                      <span className="text-xs font-mono text-[#1557D6] font-semibold">Unstructured Physician Notes</span>
                    </div>
                    <div className="rounded-xl border border-[#CBD5E1] bg-white tone-light card-light p-5 font-mono text-xs text-[#1E293B] leading-relaxed shadow-xs">
                      {pvMeta.interactiveCaseStudy.rawTranscript}
                    </div>
                    <p className="text-xs text-[#64748B]">
                      <strong>Processor Task:</strong> Scan raw text for patient identifiers, physician credentials, drug therapy duration, onset timeline, dechallenge outcomes, and lab values.
                    </p>
                  </div>
                )}

                {/* 2. 4 Criteria Checklist */}
                {activeSimTab === "criteria" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase font-bold text-[#64748B]">ICH E2D(R1) Minimum ICSR Validity Check</span>
                      <span className="text-xs font-mono text-emerald-600 font-bold">STATUS: VALID ICSR</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {pvMeta.interactiveCaseStudy.intakeChecklist.map((c) => (
                        <div key={c.item} className="rounded-xl border border-[#E2E8F0] bg-white tone-light card-light p-4 flex items-start gap-3 shadow-xs">
                          <div className="h-6 w-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="h-3.5 w-3.5 stroke-[3]" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-[#071A4A]">{c.item}</div>
                            <div className="text-xs text-[#64748B] mt-0.5">{c.note}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-800">
                      ✓ All 4 criteria confirmed. Case book-in initialized in safety database. Regulatory clock active.
                    </div>
                  </div>
                )}

                {/* 3. Standardized Coding Tree */}
                {activeSimTab === "coding" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase font-bold text-[#64748B]">5-Tier Clinical Hierarchy Path (MTS:PTC Guidelines)</span>
                      <span className="text-xs font-mono text-[#1557D6] font-semibold">Standardized Medical Coding</span>
                    </div>

                    <div className="rounded-xl border border-[#CBD5E1] bg-white tone-light card-light p-5 space-y-3 shadow-xs font-mono text-xs">
                      <div className="flex items-center gap-3 py-1.5 border-b border-[#E2E8F0]">
                        <span className="w-16 font-bold text-[#64748B]">SOC:</span>
                        <span className="font-bold text-[#071A4A]">{pvMeta.interactiveCaseStudy.codingHierarchy.soc}</span>
                      </div>
                      <div className="flex items-center gap-3 py-1.5 border-b border-[#E2E8F0] pl-4">
                        <span className="w-16 font-bold text-[#64748B]">HLGT:</span>
                        <span className="text-[#334155]">{pvMeta.interactiveCaseStudy.codingHierarchy.hlgt}</span>
                      </div>
                      <div className="flex items-center gap-3 py-1.5 border-b border-[#E2E8F0] pl-8">
                        <span className="w-16 font-bold text-[#64748B]">HLT:</span>
                        <span className="text-[#334155]">{pvMeta.interactiveCaseStudy.codingHierarchy.hlt}</span>
                      </div>
                      <div className="flex items-center gap-3 py-1.5 border-b border-[#E2E8F0] pl-12 bg-[#EEF6FF] rounded">
                        <span className="w-16 font-bold text-[#1557D6]">PT:</span>
                        <span className="font-extrabold text-[#1557D6]">{pvMeta.interactiveCaseStudy.codingHierarchy.pt}</span>
                        <span className="text-[10px] bg-[#1557D6] text-white px-2 py-0.5 rounded ml-auto">REGULATORY LEVEL</span>
                      </div>
                      <div className="flex items-center gap-3 py-1.5 pl-16">
                        <span className="w-16 font-bold text-[#64748B]">LLT:</span>
                        <span className="text-[#334155]">{pvMeta.interactiveCaseStudy.codingHierarchy.llt} ({pvMeta.interactiveCaseStudy.codingHierarchy.code})</span>
                      </div>
                    </div>
                    <p className="text-xs text-[#64748B]">
                      <strong>Coding Rationale:</strong> The clinical verbatim mentions severe muscle pain and tea-colored urine with massive CK elevation. Coded to primary diagnosis 'Rhabdomyolysis' rather than isolated symptoms under MTS:PTC rule 2.1.
                    </p>
                  </div>
                )}

                {/* 4. Regulatory Narrative */}
                {activeSimTab === "narrative" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase font-bold text-[#64748B]">Submission-Standard Chronological Narrative</span>
                      <span className="text-xs font-mono text-[#1557D6] font-semibold">ICH E2B(R3) Field B.5</span>
                    </div>

                    <div className="rounded-xl border border-[#CBD5E1] bg-white tone-light card-light p-6 text-sm text-[#1E293B] leading-relaxed shadow-xs font-serif">
                      {pvMeta.interactiveCaseStudy.chronologicalNarrative}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div className="rounded-lg bg-white tone-light p-3 border border-[#E2E8F0]">
                        <span className="text-[10px] font-mono text-[#64748B] block uppercase">Pillar 1: Chronology</span>
                        Clear start date (28-Sep), onset (08-Oct), and resolution trajectory.
                      </div>
                      <div className="rounded-lg bg-white tone-light p-3 border border-[#E2E8F0]">
                        <span className="text-[10px] font-mono text-[#64748B] block uppercase">Pillar 2: Dechallenge</span>
                        Positive dechallenge explicitly noted when drug stopped and CK normalized.
                      </div>
                      <div className="rounded-lg bg-white tone-light p-3 border border-[#E2E8F0]">
                        <span className="text-[10px] font-mono text-[#64748B] block uppercase">Pillar 3: Neutrality</span>
                        No speculative statements or subjective adjectives. Pure clinical ledger.
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. Triage & Reporting Decision */}
                {activeSimTab === "triage" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase font-bold text-[#64748B]">Final Triage & Regulatory Routing Decision</span>
                      <span className="text-xs font-mono text-red-600 font-bold">EXPEDITED ROUTING</span>
                    </div>

                    <div className="rounded-xl border border-[#CBD5E1] bg-white tone-light card-light p-5 space-y-4 shadow-xs">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <div className="text-xs font-mono text-[#64748B] uppercase">Seriousness Classification</div>
                          <div className="text-base font-bold text-red-600 mt-1">
                            {pvMeta.interactiveCaseStudy.triageDecision.seriousness}
                          </div>
                          <div className="text-xs text-[#64748B] mt-0.5">
                            Criteria: {pvMeta.interactiveCaseStudy.triageDecision.criteria.join(", ")}
                          </div>
                        </div>

                        <div>
                          <div className="text-xs font-mono text-[#64748B] uppercase">Causality Rating</div>
                          <div className="text-base font-bold text-[#071A4A] mt-1">
                            {pvMeta.interactiveCaseStudy.triageDecision.causality} (WHO-UMC)
                          </div>
                          <div className="text-xs text-[#64748B] mt-0.5">
                            Plausible time window + positive dechallenge
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-[#E2E8F0] grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <div className="text-xs font-mono text-[#64748B] uppercase">Reporting Clock</div>
                          <div className="text-sm font-bold text-[#1557D6] mt-1">
                            {pvMeta.interactiveCaseStudy.triageDecision.reportingClock}
                          </div>
                        </div>

                        <div>
                          <div className="text-xs font-mono text-[#64748B] uppercase">Submission Gateway</div>
                          <div className="text-sm font-bold text-[#071A4A] mt-1">
                            {pvMeta.interactiveCaseStudy.triageDecision.submissionTarget}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── 04. QUALITY CONTROL DEFECT TAXONOMY (AQL AUDITING) ───────────────── */}
      {pvMeta && (
        <section className="py-16 sm:py-20 border-b border-[#E2E8F0] bg-[#F8FAFC] tone-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider text-red-700">
                <ShieldAlert className="h-3.5 w-3.5" />
                <span>CASE QUALITY CONTROL & AUDIT STANDARDS</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#071A4A] tracking-tight">
                Quality Defect Taxonomy: What Separates Passing from Failure
              </h2>
              <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
                In production drug safety teams, every case is audited against strict Acceptable Quality Limits (AQL). Here is how defects are classified during trainee evaluations and real client audits.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pvMeta.defectClassificationSystem.map((defect) => {
                const isCrit = defect.severity === "Critical";
                const isMaj = defect.severity === "Major";
                return (
                  <div
                    key={defect.severity}
                    className={`rounded-2xl border bg-white tone-light card-light p-6 shadow-sm space-y-4 ${
                      isCrit
                        ? "border-red-300 ring-1 ring-red-100"
                        : isMaj
                        ? "border-amber-300 ring-1 ring-amber-100"
                        : "border-sky-300 ring-1 ring-sky-100"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`font-mono text-xs font-bold uppercase px-2.5 py-1 rounded-md ${
                          isCrit
                            ? "bg-red-100 text-red-700"
                            : isMaj
                            ? "bg-amber-100 text-amber-800"
                            : "bg-sky-100 text-sky-800"
                        }`}
                      >
                        {defect.severity} Defect
                      </span>
                      <span className="text-[11px] font-mono text-[#64748B]">
                        {isCrit ? "0% Tolerance" : isMaj ? "Mandatory Rework" : "Minor Point Loss"}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-sm font-bold text-[#071A4A]">{defect.definition}</h3>
                    </div>

                    <div className="rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] p-3.5 space-y-2 text-xs">
                      <div>
                        <span className="font-mono text-[10px] uppercase text-[#64748B] block font-bold">Real-World Example</span>
                        <span className="text-[#1E293B] font-medium">{defect.realWorldExample}</span>
                      </div>
                      <div className="pt-2 border-t border-[#E2E8F0]">
                        <span className="font-mono text-[10px] uppercase text-[#64748B] block font-bold">Audit Impact</span>
                        <span className="text-[#334155]">{defect.qualityImpact}</span>
                      </div>
                    </div>

                    <div className="text-xs text-[#64748B]">
                      <strong>Required Rework:</strong> {defect.reworkRequired}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── 05. SKILLS TRACEABILITY MATRIX (JD DEMAND TO SYLLABUS MAPPING) ───── */}
      {pvMeta && (
        <section className="py-16 sm:py-20 border-b border-[#E2E8F0] bg-white tone-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D0E1FD] bg-[#EEF6FF] px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider text-[#1557D6]">
                <Activity className="h-3.5 w-3.5" />
                <span>END-TO-END TRACEABILITY LEDGER</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#071A4A] tracking-tight">
                Every Employer Requirement Mapped to Proof of Work
              </h2>
              <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
                See exactly which classroom session, assessed project, and portfolio deliverable backs up each required skill.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-[#CBD5E1] bg-white tone-light card-light shadow-md">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#071A4A] text-white font-mono uppercase text-[11px] tracking-wider">
                    <th className="p-4 font-bold">Employer Mandated Skill</th>
                    <th className="p-4 font-bold">Why CROs Hire For It</th>
                    <th className="p-4 font-bold">Classroom Session</th>
                    <th className="p-4 font-bold">Assessed Deliverable</th>
                    <th className="p-4 font-bold">Project Verification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0] text-[#334155]">
                  {pvMeta.skillsTraceabilityMatrix.map((row) => (
                    <tr key={row.employerDemand} className="hover:bg-[#F8FAFC] transition-colors">
                      <td className="p-4 font-bold text-[#071A4A]">
                        {row.employerDemand}
                      </td>
                      <td className="p-4 text-[#475569] max-w-xs leading-relaxed">
                        {row.whyCROsHireForIt}
                      </td>
                      <td className="p-4 font-mono font-bold text-[#1557D6]">
                        {row.syllabusClass}
                      </td>
                      <td className="p-4 font-medium text-[#1E293B]">
                        {row.practicalOutput}
                      </td>
                      <td className="p-4">
                        <span className="inline-block rounded-md bg-[#EEF6FF] text-[#1557D6] font-mono text-[10px] font-bold px-2 py-0.5">
                          {row.testedInProject}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* ── 06. VERIFIED CRO & PHARMA EMPLOYER DATASET ───────────────────────── */}
      <section className="py-16 sm:py-20 border-b border-[#E2E8F0] bg-[#F8FAFC] tone-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D0E1FD] bg-[#EEF6FF] px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider text-[#1557D6]">
              <Building2 className="h-3.5 w-3.5" />
              <span>INDIAN RECRUITER EVIDENCE</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#071A4A] tracking-tight">
              Top Employers Hiring for {role.name} Roles
            </h2>
            <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
              Based on recent vacancies parsed across Hyderabad, Bengaluru, Pune, Mumbai, and Chennai.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(pvMeta?.verifiedEmployersDataset ?? employers.map((emp) => ({
              name: emp,
              location: "Hyderabad / Bengaluru / Pune",
              fresherTitle: `${role.name} - Trainee`,
              jdFrequency: "High hiring frequency",
              keySkillsMandated: role.skills.slice(0, 3),
              sampleSalaryBand: `₹${role.salary?.entry.min ?? 3.5}–${role.salary?.entry.max ?? 5.0} LPA`,
            }))).map((emp) => (
              <div key={emp.name} className="rounded-2xl border border-[#CBD5E1] bg-white tone-light card-light p-6 shadow-xs space-y-4">
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#1557D6] uppercase tracking-wider">
                    {emp.jdFrequency}
                  </span>
                  <h3 className="text-base font-extrabold text-[#071A4A] mt-1">{emp.name}</h3>
                  <div className="text-xs text-[#64748B] mt-0.5">{emp.location}</div>
                </div>

                <div className="rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] p-3 text-xs space-y-1">
                  <div className="text-[10px] font-mono text-[#64748B] uppercase">Typical Fresher Title</div>
                  <div className="font-bold text-[#1E293B]">{emp.fresherTitle}</div>
                  <div className="text-[11px] text-emerald-600 font-bold mt-1">{emp.sampleSalaryBand}</div>
                </div>

                <div className="space-y-1.5">
                  <div className="text-[10px] font-mono text-[#64748B] uppercase font-bold">Mandated In JDs</div>
                  <div className="flex flex-wrap gap-1.5">
                    {emp.keySkillsMandated.map((sk) => (
                      <span key={sk} className="rounded bg-[#EEF6FF] text-[#1557D6] text-[10px] font-semibold px-2 py-0.5">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 07. TECHNICAL INTERVIEW & ORAL VIVA DEFENSE QUESTIONS ────────────── */}
      {pvMeta && (
        <section className="py-16 sm:py-20 border-b border-[#E2E8F0] bg-white tone-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider text-purple-700">
                <HelpCircle className="h-3.5 w-3.5" />
                <span>INTERVIEW PREPARATION & VIVA SIMULATION</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#071A4A] tracking-tight">
                How to Defend Your Decisions to Hiring Managers
              </h2>
              <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
                Senior Safety Reviewers look for operational logic, not rote memorization. These are real technical questions asked in CRO panel rounds with model defenses.
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-4">
              {pvMeta.interviewDefenseQuestions.map((q, idx) => {
                const isOpen = openDefenseIndex === idx;
                return (
                  <div
                    key={q.question}
                    className="rounded-2xl border border-[#CBD5E1] bg-white tone-light card-light shadow-xs overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => setOpenDefenseIndex(isOpen ? null : idx)}
                      className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 hover:bg-[#F8FAFC]"
                    >
                      <div className="space-y-1">
                        <span className="font-mono text-xs font-bold text-[#1557D6]">Question 0{idx + 1}</span>
                        <h3 className="text-base font-bold text-[#071A4A]">{q.question}</h3>
                        <p className="text-xs text-[#64748B] font-medium">Panel focus: {q.whatPanelEvaluates}</p>
                      </div>
                      <div className="h-7 w-7 rounded-full bg-[#EEF6FF] text-[#1557D6] flex items-center justify-center shrink-0 font-bold text-sm">
                        {isOpen ? "−" : "+"}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="p-5 sm:p-6 pt-0 border-t border-[#E2E8F0] bg-[#F8FAFC] space-y-2">
                        <span className="text-[10px] font-mono uppercase font-bold text-[#1557D6] block">
                          Model Defense & Clinical Rationale
                        </span>
                        <p className="text-xs sm:text-sm text-[#334155] leading-relaxed">
                          {q.modelDefense}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── 08. FINAL DECISION: MEASURE YOUR READINESS (CALL TO ACTION) ───────── */}
      <section className="py-16 sm:py-24 bg-[#071A4A] text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#EEF6FF]">
            <Sparkles className="h-3.5 w-3.5 text-sky-300" />
            <span>MEASURE YOUR ROLE FIT BEFORE APPLYING</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Ready to test your readiness for <br className="hidden sm:block" />
            <span className="text-[#38BDF8]">{role.name}</span> roles?
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Take the free 10-minute Arzon Career Engine assessment. Discover your personal role fit %, identify missing ICSR and coding competencies, and receive your tailored preparation roadmap.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              to="/career-engine/start"
              search={assessmentSearch}
              className="inline-flex items-center gap-2 rounded-full bg-[#1557D6] hover:bg-[#2878F0] text-white px-8 py-4 text-sm font-bold shadow-lg transition-all duration-200"
            >
              <span>Take Free Role Fit Test</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              to="/pv-associate"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 hover:bg-white/20 text-white px-8 py-4 text-sm font-bold transition-all duration-200"
            >
              <BookOpen className="h-4 w-4 text-sky-300" />
              <span>Explore 12-Week Production Track</span>
            </Link>
          </div>

          <div className="pt-8 flex flex-wrap items-center justify-center gap-8 text-xs font-mono text-slate-400">
            <span>✓ 60+ Synthetic Cases</span>
            <span>✓ Standardized Medical Coding</span>
            <span>✓ 0% Critical Defect Gate</span>
            <span>✓ Verified Work Portfolio</span>
          </div>
        </div>
      </section>

      {/* ── 09. RELATED ROLES TAXONOMY ───────────────────────────────────────── */}
      <section className="py-12 bg-white tone-light border-t border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-mono uppercase font-bold text-[#1557D6]">CAREER LADDER & ADJACENT ROLES</span>
              <h3 className="text-xl font-bold text-[#071A4A]">Explore Adjacent Pharmacovigilance & Data Paths</h3>
            </div>
            <Link to="/roles" className="text-xs font-bold text-[#1557D6] hover:underline flex items-center gap-1">
              <span>View All 60 Roles</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedRoles.map((r) => {
              const relSlug = r.slug.split(".").pop() ?? r.slug;
              return (
                <Link
                  key={r.slug}
                  to="/roles/$slug"
                  params={{ slug: relSlug }}
                  className="rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] p-4 hover:border-[#1557D6] hover:bg-white transition-all group"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#64748B] mb-1">
                    <span className="uppercase font-bold text-[#1557D6]">{r.seniority}</span>
                    <span>₹{r.salary?.entry.min ?? 3.5}–{r.salary?.entry.max ?? 5.0} LPA</span>
                  </div>
                  <h4 className="text-sm font-bold text-[#071A4A] group-hover:text-[#1557D6] transition-colors">{r.name}</h4>
                  <p className="text-xs text-[#64748B] line-clamp-2 mt-1">{r.blurb}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
