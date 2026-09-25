import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ShieldCheck,
  ChevronDown,
  ArrowRight,
  BookOpen,
  FileCheck,
  Stethoscope,
  Code2,
  FileText,
  CheckCircle2,
  Search,
  AlertTriangle,
  Brain,
} from "lucide-react";

interface CompetencyItem {
  id: string;
  num: string;
  title: string;
  headline: string;
  icon: typeof ShieldCheck;
  image: string;
  description: string;
  workplaceStandard: string;
  fresherFailureMode: string;
  industryBenchmark: string;
}

const COMPETENCIES: CompetencyItem[] = [
  {
    id: "pv-fundamentals",
    num: "01",
    title: "PV Fundamentals",
    headline: "Understand the safety pipeline and terminology",
    icon: BookOpen,
    image: "/images/pv-clinical-collaboration.jpg",
    description: "Deep comprehension of drug safety lifecycle, post-marketing surveillance, ICH guidelines, and regulatory health authority oversight (FDA, EMA, CDSCO).",
    workplaceStandard: "Correctly identifies clinical study phases, post-marketing obligations, and regulatory reporting mandates without manual supervision.",
    fresherFailureMode: "Confusing clinical trial adverse events (AE) with post-marketing individual case safety reports (ICSR).",
    industryBenchmark: "85% minimum accuracy on regulatory definitions and compliance timelines.",
  },
  {
    id: "icsr-processing",
    num: "02",
    title: "ICSR Processing",
    headline: "Work through real adverse event cases",
    icon: FileCheck,
    image: "/images/pv-case-triage.jpg",
    description: "Rapidly triage spontaneous reports, literature cases, and clinical study reports to verify the 4 mandatory ICSR validity criteria (patient, reporter, suspect drug, adverse event).",
    workplaceStandard: "Validates case intake within 15 minutes of receipt, flags missing critical parameters, and initiates targeted follow-up queries.",
    fresherFailureMode: "Logging invalid cases with unidentifiable reporters or non-medicinal exposures into the live safety database.",
    industryBenchmark: "100% precision on the 4 ICSR validity criteria (Zero-Tolerance Decision Gate).",
  },
  {
    id: "case-assessment",
    num: "03",
    title: "Case Assessment",
    headline: "Evaluate seriousness, causality, and expectedness",
    icon: AlertTriangle,
    image: "/images/pv-clinical-workstation.jpg",
    description: "Apply standard regulatory seriousness criteria (death, life-threatening, hospitalization, disability, congenital anomaly) and determine WHO-UMC causality.",
    workplaceStandard: "Classifies seriousness instantly to trigger either 15-day expedited reporting or periodic aggregate safety review.",
    fresherFailureMode: "Down-grading an in-patient hospitalization event to non-serious based on transient symptomatic recovery.",
    industryBenchmark: "90% alignment with Senior Safety Physician consensus scoring.",
  },
  {
    id: "medical-interpretation",
    num: "04",
    title: "Medical Interpretation",
    headline: "Extract clinical details from narratives",
    icon: Stethoscope,
    image: "/images/pv-student-hero.jpg",
    description: "Analyze messy, unstructured handwritten physician notes, lab panel values, and discharge summaries to reconstruct accurate temporal timelines.",
    workplaceStandard: "Reconstructs chronology of exposure, onset latency, de-challenge, and re-challenge outcomes from complex hospital files.",
    fresherFailureMode: "Overlooking concomitant medications that introduce confounding drug-drug interactions.",
    industryBenchmark: "Accurate temporal reconstruction across 95% of clinical audit vignettes.",
  },
  {
    id: "meddra-coding",
    num: "05",
    title: "MedDRA & Coding",
    headline: "Apply medical terminology accurately",
    icon: Code2,
    image: "/images/pv-meddra-coding.jpg",
    description: "Navigate the MedDRA hierarchical structure (SOC, HLGT, HLT, PT, LLT) and WHO Drug Global to assign verbatim terms to appropriate Lowest Level Terms.",
    workplaceStandard: "Applies 'Points to Consider' (PtC) coding rules without modifying original clinical reporter intent.",
    fresherFailureMode: "Selecting a diagnostic PT for an unconfirmed provisional symptom, skewing signal detection statistics.",
    industryBenchmark: "Exact match on MedDRA PT assignment for standard adverse event expressions.",
  },
  {
    id: "documentation",
    num: "06",
    title: "Documentation",
    headline: "Create audit-compliant event narratives",
    icon: FileText,
    image: "/images/pv-regulatory-audit.jpg",
    description: "Draft chronological, concise, and audit-ready clinical case narratives according to ICH E2B(R3) specifications.",
    workplaceStandard: "Narratives provide self-contained, objective accounts allowing external inspectors to independently assess safety profiles.",
    fresherFailureMode: "Injecting subjective speculation ('the drug probably caused the rash') instead of factual chronological documentation.",
    industryBenchmark: "Audit-ready narrative structure with zero grammatical ambiguities.",
  },
  {
    id: "quality-compliance",
    num: "07",
    title: "Quality & Compliance",
    headline: "Follow global regulations like GVP Module VI",
    icon: ShieldCheck,
    image: "/images/pv-regulatory-audit.jpg",
    description: "Adhere to Good Pharmacovigilance Practices (GVP), 21 CFR 314.80, and institutional Standard Operating Procedures (SOPs) under strict audit trails.",
    workplaceStandard: "Maintains complete data integrity, electronic signature timestamps, and strict adherence to Day-0 clock rules.",
    fresherFailureMode: "Miscalculating Day 0 when receipt occurs across differing international time zones.",
    industryBenchmark: "Zero critical audit findings during mock inspection challenges.",
  },
  {
    id: "analytical-reasoning",
    num: "08",
    title: "Analytical Reasoning",
    headline: "Identify patterns and make defensible decisions",
    icon: Search,
    image: "/images/pv-clinical-workstation.jpg",
    description: "Evaluate disproportionality metrics (PRR, ROR), detect safety signals in aggregate data, and synthesize multi-source clinical evidence.",
    workplaceStandard: "Differentiates true safety signals from statistical noise or background disease prevalence.",
    fresherFailureMode: "Treating expected underlying disease progression as an unprecedented safety hazard.",
    industryBenchmark: "80%+ score on complex multi-case correlation challenges.",
  },
  {
    id: "situational-judgment",
    num: "09",
    title: "Situational Judgment",
    headline: "Handle high-pressure, ambiguous workplace scenarios",
    icon: Brain,
    image: "/images/pv-clinical-collaboration.jpg",
    description: "Resolve operational ambiguities when facing incomplete reporter information, tight submission deadlines, and competing stakeholder demands.",
    workplaceStandard: "Executes risk-proportionate triage, escalates genuine safety concerns to qualified persons (QPPV), and meets legal timelines.",
    fresherFailureMode: "Delaying regulatory reporting while waiting for optional non-critical lab results.",
    industryBenchmark: "Zero regulatory clock breach under 40-minute simulation stress tests.",
  },
];

export function AcriCompetenciesGrid() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId((curr) => (curr === id ? null : id));
  };

  return (
    <section id="competencies-grid" className="bg-white tone-light py-16 lg:py-24 border-b border-stone-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header matching comp */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-stone-200/80">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F7F1] border border-[#005B4F]/20 text-[#005B4F] text-[11px] font-mono font-bold uppercase tracking-wider mb-3">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>WHAT WE MEASURE</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1325] tracking-tight">
              9 Competencies That Define Pharmacovigilance Readiness
            </h2>
            <p className="mt-2 text-sm sm:text-base text-stone-600 max-w-2xl">
              Real-world capabilities. Real industry expectations. Every ACRI assessment benchmarks these 9 clinical dimensions.
            </p>
          </div>

          <Link
            to="/acri/competencies"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#005B4F] hover:text-[#00473E] group shrink-0"
          >
            <span>View Detailed Framework</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 9 Competencies Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {COMPETENCIES.map((comp) => {
            const Icon = comp.icon;
            const isExpanded = expandedId === comp.id;

            return (
              <div
                key={comp.id}
                className={`card-light rounded-2xl border transition-all duration-200 flex flex-col justify-between overflow-hidden ${
                  isExpanded
                    ? "border-[#005B4F] shadow-lg ring-1 ring-[#005B4F]/20 bg-white"
                    : "border-stone-200 bg-white tone-light hover:border-stone-300 hover:shadow-md"
                }`}
              >
                <div>
                  {/* Photo Header */}
                  <div className="relative h-44 w-full bg-stone-100 overflow-hidden">
                    <img
                      src={comp.image}
                      alt={comp.title}
                      width={380}
                      height={180}
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1325]/80 via-[#0B1325]/20 to-transparent pointer-events-none" />
                    
                    {/* Top Pill with Number */}
                    <div className="absolute top-3 left-3 bg-[#0B1325]/80 backdrop-blur-xs text-white text-[10px] font-mono font-bold px-2.5 py-1 rounded-md">
                      COMPETENCY {comp.num}
                    </div>

                    {/* Bottom Title on Image */}
                    <div className="absolute bottom-3 left-3 right-3 text-white flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-lg bg-[#005B4F] flex items-center justify-center text-white">
                          <Icon className="h-4 w-4 text-emerald-300" />
                        </div>
                        <h3 className="font-serif font-bold text-base tracking-tight">
                          {comp.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5">
                    <h4 className="text-xs font-bold text-[#005B4F] uppercase tracking-wide font-mono mb-1.5">
                      {comp.headline}
                    </h4>
                    <p className="text-xs text-stone-600 leading-relaxed mb-4">
                      {comp.description}
                    </p>

                    {/* Expandable Technical Specification Drawer */}
                    {isExpanded && (
                      <div className="space-y-3 pt-3 border-t border-stone-100 animate-in fade-in duration-200 text-xs">
                        <div className="p-2.5 rounded-lg bg-emerald-50/70 border border-emerald-200/60">
                          <span className="font-mono text-[10px] font-bold text-[#005B4F] uppercase block mb-0.5">
                            Workplace Expectation
                          </span>
                          <p className="text-stone-700 text-[11px] leading-relaxed">
                            {comp.workplaceStandard}
                          </p>
                        </div>

                        <div className="p-2.5 rounded-lg bg-amber-50/70 border border-amber-200/60">
                          <span className="font-mono text-[10px] font-bold text-amber-800 uppercase block mb-0.5">
                            Common Fresher Mistake
                          </span>
                          <p className="text-stone-700 text-[11px] leading-relaxed">
                            {comp.fresherFailureMode}
                          </p>
                        </div>

                        <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200">
                          <span className="font-mono text-[10px] font-bold text-stone-500 uppercase block mb-0.5">
                            ACRI Pass Benchmark
                          </span>
                          <p className="text-stone-900 font-semibold text-[11px]">
                            {comp.industryBenchmark}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Footer Toggle */}
                <div className="p-4 pt-0">
                  <button
                    type="button"
                    onClick={() => toggleExpand(comp.id)}
                    className="w-full py-2 px-3 rounded-lg border border-stone-200 hover:bg-stone-50 text-stone-700 text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span>{isExpanded ? "Hide Details" : "View Technical Rubric"}</span>
                    <ChevronDown
                      className={`h-4 w-4 text-stone-400 transition-transform duration-200 ${
                        isExpanded ? "rotate-180 text-[#005B4F]" : ""
                      }`}
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
