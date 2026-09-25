import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ShieldCheck,
  Award,
  Layers,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  Activity,
  FileText,
  AlertCircle,
  Database,
  Search,
  BookOpen,
} from "lucide-react";
import { ACRI_PV_COMPETENCIES } from "@/data/acri/acriPvStandard";
import { pageSeo } from "@/lib/seo";

export const Route = createFileRoute("/acri/competencies")({
  head: () => {
    const ps = pageSeo({
      path: "/acri/competencies",
      title: "The 9 Pharmacovigilance Competencies · ACRI Standard",
      description:
        "Comprehensive taxonomy of the 9 core competencies evaluated in the ACRI Pharmacovigilance Certification assessment.",
    });
    return {
      meta: [
        { title: "The 9 Pharmacovigilance Competencies · ACRI Standard" },
        ...ps.meta,
      ],
      links: ps.links,
    };
  },
  component: AcriCompetenciesPage,
});

const COMPETENCY_DATA = [
  {
    id: "icsrProcessing",
    num: "01",
    name: "ICSR Intake & 4-Criteria Validation",
    benchmark: "80%",
    regulatoryStandard: "ICH E2A / E2D • GVP Module VI",
    description: "Ability to evaluate raw spontaneous or clinical trial adverse event reports and determine whether the four mandatory validity elements are satisfied: identifiable patient, identifiable reporter, suspect medicinal product, and adverse event.",
    practicalScenario: "Triage a handwritten consumer report mentioning rash after taking amoxicillin with missing doctor contact details.",
    weight: "12%",
  },
  {
    id: "documentation",
    num: "02",
    name: "E2B(R3) Field Extraction & Documentation",
    benchmark: "80%",
    regulatoryStandard: "ICH E2B(R3) Electronic Transmission",
    description: "Translating unstructured clinical narratives and doctor consultation notes into precise, compliant electronic E2B(R3) data fields without omissions or assumptions.",
    practicalScenario: "Extract primary source reporter qualification, country code, onset date, and batch numbers into Oracle Argus safety fields.",
    weight: "11%",
  },
  {
    id: "triageReasoning",
    num: "03",
    name: "Seriousness Criteria & Triage Reasoning",
    benchmark: "80%",
    regulatoryStandard: "21 CFR 314.80 • ICH E2A",
    description: "Correctly classifying adverse events as Serious vs. Non-Serious across the 6 standard criteria: Death, Life-Threatening, Hospitalization/Prolongation, Disability, Congenital Anomaly, or Important Medical Event (IME).",
    practicalScenario: "Evaluate an acute anaphylactic reaction requiring emergency adrenaline injection that resolved within 3 hours without hospital admission.",
    weight: "12%",
  },
  {
    id: "meddraCoding",
    num: "04",
    name: "MedDRA Coding & Hierarchy Navigation",
    benchmark: "80%",
    regulatoryStandard: "MSSO MedDRA v27.0 Guidelines",
    description: "Navigating the 5-level MedDRA hierarchy from Lowest Level Term (LLT) to Preferred Term (PT) and System Organ Class (SOC) following official MSSO points-to-consider rules.",
    practicalScenario: "Select the most specific LLT for 'feeling sick in the stomach after taking metformin' while avoiding over-coding.",
    weight: "12%",
  },
  {
    id: "causalityAssessment",
    num: "05",
    name: "WHO-UMC Causality Assessment",
    benchmark: "80%",
    regulatoryStandard: "WHO-UMC Causality System",
    description: "Evaluating the causal relationship between suspect drug administration and the adverse event considering temporal sequence, dechallenge, rechallenge, and confounding medical history.",
    practicalScenario: "Differentiate between 'Probable' and 'Possible' causality in an oncology patient receiving concurrent chemotherapeutic agents.",
    weight: "12%",
  },
  {
    id: "caseAssessment",
    num: "06",
    name: "Confounder Analysis & Medical Evaluation",
    benchmark: "80%",
    regulatoryStandard: "ICH E2B • Clinical Judgment",
    description: "Identifying underlying diseases, concomitant medications, and drug-drug interactions that explain or confound observed adverse events.",
    practicalScenario: "Analyze acute liver injury in a patient taking atorvastatin who recently started clarithromycin (CYP3A4 inhibitor).",
    weight: "11%",
  },
  {
    id: "regulatoryAwareness",
    num: "07",
    name: "Regulatory Awareness & Expedited Timelines",
    benchmark: "80%",
    regulatoryStandard: "FDA 15-Day Alert • EMA Expedited Submission",
    description: "Mastery of regulatory submission clock calculation: Day 0 determination, 7-day fatal/life-threatening clinical trial deadlines, 15-day expedited post-marketing alerts, and periodic aggregate report schedules.",
    practicalScenario: "Calculate Day 0 for a serious unlisted spontaneous adverse reaction received by a regional medical sales representative on a Saturday.",
    weight: "10%",
  },
  {
    id: "narrativeWriting",
    num: "08",
    name: "Clinical Safety Narrative Writing",
    benchmark: "80%",
    regulatoryStandard: "CIOMS I Format • Medical Writing",
    description: "Composing structured, chronological, factual, and concise clinical narratives summarizing patient demographics, suspect therapy, adverse event timeline, treatment, and final outcome.",
    practicalScenario: "Draft a 150-word standardized safety narrative following the chronological sequence for a severe cutaneous adverse reaction (SCAR).",
    weight: "10%",
  },
  {
    id: "qualityCompliance",
    num: "09",
    name: "Quality Control & Audit Readiness",
    benchmark: "80%",
    regulatoryStandard: "GVP Module II & IV • 21 CFR Part 11",
    description: "Understanding inspection readiness, audit trail preservation, query management, and quality control checks before case routing and lock.",
    practicalScenario: "Identify quality errors in an Argus case file prior to final medical review and electronic gateway dispatch.",
    weight: "10%",
  },
];

function AcriCompetenciesPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#0B1325] font-sans antialiased selection:bg-[#E8F7F1]">
      {/* ── Page Hero ── */}
      <section className="border-b border-stone-200 bg-white tone-light card-light py-16 sm:py-20 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F7F1] text-[#005B4F] text-xs font-mono font-bold">
            <Layers className="h-3.5 w-3.5" />
            <span>OCCUPATIONAL CAPABILITY TAXONOMY · ACRI STANDARD</span>
          </div>

          <h1 className="font-serif font-bold text-3xl sm:text-5xl text-stone-900 tracking-tight leading-tight">
            The 9 Core Competencies of Pharmacovigilance
          </h1>

          <p className="font-sans text-base sm:text-lg text-stone-700 leading-relaxed max-w-3xl">
            Derived directly from 1,247 active job descriptions across top CROs and multinational pharmaceutical companies, the ACRI Competency Framework establishes the exact skills required for entry-level operational independence.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              to="/acri/pharmacovigilance-certification"
              className="px-6 py-3 rounded-xl bg-[#0B1325] hover:bg-[#1B3F8B] text-white font-mono text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 transition-all shadow-sm"
            >
              <span>ASSESS YOUR READINESS</span>
              <ArrowRight className="h-3.5 w-3.5 text-emerald-300" />
            </Link>

            <Link
              to="/acri/methodology"
              className="px-6 py-3 rounded-xl border border-stone-300 bg-white tone-light hover:bg-stone-50 text-stone-800 font-mono text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 transition-all"
            >
              <span>VIEW METHODOLOGY</span>
              <ChevronRight className="h-3.5 w-3.5 text-stone-500" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Competencies Grid Ledger ── */}
      <main className="max-w-4xl mx-auto px-4 sm:px-8 py-12 sm:py-16 space-y-12">
        <div className="space-y-6">
          {COMPETENCY_DATA.map((c) => (
            <article
              key={c.id}
              className="p-6 sm:p-8 rounded-2xl bg-white card-light border border-stone-200 shadow-xs hover:border-stone-300 transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-[#E8F7F1] text-[#005B4F]">
                    COMPETENCY {c.num}
                  </span>
                  <h2 className="font-serif font-bold text-lg sm:text-xl text-stone-900">
                    {c.name}
                  </h2>
                </div>

                <div className="flex items-center gap-3 text-xs font-mono">
                  <span className="text-stone-500">BENCHMARK: {c.benchmark}</span>
                  <span className="text-[#1B3F8B] font-bold">WEIGHT: {c.weight}</span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="font-sans text-xs sm:text-sm text-stone-700 leading-relaxed">
                  {c.description}
                </p>

                <div className="rounded-xl p-3.5 bg-stone-50 border border-stone-200/80 space-y-1 mt-3">
                  <span className="font-mono text-[10px] font-bold text-stone-500 uppercase tracking-wider block">
                    SAMPLE EVALUATION SCENARIO:
                  </span>
                  <p className="font-sans text-xs text-stone-800 italic">
                    "{c.practicalScenario}"
                  </p>
                </div>
              </div>

              <div className="pt-1 flex items-center justify-between text-xs text-stone-500 font-mono">
                <span>STANDARD: {c.regulatoryStandard}</span>
                <Link
                  to="/acri/pharmacovigilance-certification"
                  className="text-[#005B4F] font-bold hover:underline inline-flex items-center gap-1"
                >
                  <span>Test this skill</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA Panel */}
        <section className="rounded-3xl bg-[#0B1325] text-white p-8 sm:p-12 text-center space-y-4">
          <span className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-widest">
            OPERATIONAL READINESS BENCHMARK
          </span>
          <h2 className="font-serif font-bold text-2xl sm:text-4xl text-white">
            See How Your Knowledge Translates to Real Work
          </h2>
          <p className="font-sans text-xs sm:text-sm text-stone-300 max-w-xl mx-auto leading-relaxed">
            The ACRI Certification takes 25 minutes. Receive your radar chart, competency breakdown, and verified industry credential.
          </p>
          <div className="pt-2">
            <Link
              to="/acri/pharmacovigilance-certification"
              className="px-8 py-3.5 rounded-xl bg-white tone-light text-stone-900 hover:bg-stone-100 font-mono text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 shadow-lg"
            >
              <span>APPLY FOR AN INVITE</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
