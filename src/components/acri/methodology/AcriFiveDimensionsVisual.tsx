import { useState } from "react";
import {
  Brain,
  ShieldCheck,
  Search,
  Stethoscope,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

interface DimensionModel {
  id: string;
  dimensionCode: string;
  number: string;
  name: string;
  weightPct: number;
  icon: typeof Brain;
  coreQuestion: string;
  regulatoryStandard: string;
  occupationalFocus: string;
  workSimulationExcerpt: string;
  keySignals: string[];
  typicalFailureMode: string;
}

const FIVE_DIMENSIONS: DimensionModel[] = [
  {
    id: "cognitive",
    dimensionCode: "DIM-01",
    number: "01",
    name: "Cognitive Aptitude & Operational Reasoning",
    weightPct: 20,
    icon: Brain,
    coreQuestion: "Can the candidate synthesize unstructured clinical data into ordered execution workflows?",
    regulatoryStandard: "ICH E2A / Operational SOPs",
    occupationalFocus: "Translating ambiguous physician notes, multi-event chronology, and rapid triage logic.",
    workSimulationExcerpt:
      "A patient taking Drug X experiences acute urticaria within 15 minutes of infusion, followed by hypotension at hour 2. The candidate must establish the precise sequence of onset to determine anaphylactoid reaction versus secondary vasovagal syncope.",
    keySignals: [
      "Chronological sequence mapping",
      "Dechallenge & rechallenge inference",
      "Ambiguity resolution in source documents",
    ],
    typicalFailureMode: "Treating concurrent medical events as independent episodes without temporal linkage.",
  },
  {
    id: "regulatory",
    dimensionCode: "DIM-02",
    number: "02",
    name: "Regulatory & Compliance Discipline",
    weightPct: 25,
    icon: ShieldCheck,
    coreQuestion: "Does the candidate enforce non-negotiable regulatory timelines and validity protocols?",
    regulatoryStandard: "EMA GVP Module VI & FDA 21 CFR 314.80",
    occupationalFocus: "Expedited submission clocks (7-day fatal/life-threatening vs 15-day serious), 4-criteria ICSR validity.",
    workSimulationExcerpt:
      "Day 0 clock calculation for a spontaneous adverse event received via an affiliate email at 17:30 on Friday. The candidate must calculate the exact regulatory submission deadline (Day 15) without misattributing business days to calendar days.",
    keySignals: [
      "7-day vs 15-day expedited clock precision",
      "4 minimum criteria verification (Patient, Reporter, Drug, Event)",
      "Audit trail compliance and SOP adherence",
    ],
    typicalFailureMode: "Confusing calendar-day regulatory clocks with internal working-day queues.",
  },
  {
    id: "precision",
    dimensionCode: "DIM-03",
    number: "03",
    name: "Precision, Error Detection & Detail",
    weightPct: 20,
    icon: Search,
    coreQuestion: "Does the candidate spot discrepancies between raw medical notes and standardized databases?",
    regulatoryStandard: "MedDRA v27.0 & ICH E2B(R3)",
    occupationalFocus: "MedDRA hierarchy assignment (LLT to PT), dosage discrepancies, duplicate case identification.",
    workSimulationExcerpt:
      "A discharge summary mentions 'mild myocardial infarction rule-out' under admission notes, but the final diagnosis confirms 'Gastroesophageal Reflux Disease'. The candidate must select GERD as the confirmed adverse event rather than erroneously coding MI.",
    keySignals: [
      "Exact Lowest Level Term (LLT) selection",
      "Conflicting laboratory data detection",
      "Duplicate report recognition across hospital networks",
    ],
    typicalFailureMode: "Over-coding preliminary diagnostic rule-outs as confirmed adverse reactions.",
  },
  {
    id: "problem_solving",
    dimensionCode: "DIM-04",
    number: "04",
    name: "Applied Clinical Problem Solving",
    weightPct: 20,
    icon: Stethoscope,
    coreQuestion: "Can the candidate evaluate multi-drug confounding and WHO-UMC causality systematically?",
    regulatoryStandard: "WHO-UMC Causality Framework",
    occupationalFocus: "Concomitant medications, drug-drug interactions, background disease rates, causality classification.",
    workSimulationExcerpt:
      "A 68-year-old oncology patient receiving Monoclonal Antibody A develops acute pancreatitis while also taking 6 concomitant cardiac and antibiotic medications. The candidate must weigh the suspect timeline against known risk factors to classify causality.",
    keySignals: [
      "WHO-UMC 6-category classification (Certain to Unassessable)",
      "Concomitant vs Suspect drug discrimination",
      "Underlying disease progression vs true ADR attribution",
    ],
    typicalFailureMode: "Defaulting to 'Certain' causality whenever an event occurs post-dose without dechallenge proof.",
  },
  {
    id: "communication",
    dimensionCode: "DIM-05",
    number: "05",
    name: "Scientific Communication & Case Narrative",
    weightPct: 15,
    icon: FileSpreadsheet,
    coreQuestion: "Can the candidate author objective, audit-ready clinical narratives suitable for health authorities?",
    regulatoryStandard: "CIOMS I & MedWatch Form 3500A",
    occupationalFocus: "Chronological narrative drafting, medical terminology, query generation to healthcare providers.",
    workSimulationExcerpt:
      "Drafting a 150-word standardized safety narrative for an expedited regulatory submission, including patient demographics, baseline comorbidities, onset timeline, interventions, lab trajectories, and clinical outcome without speculative commentary.",
    keySignals: [
      "Standardized chronological structure (History → Event → Outcome)",
      "Precise medical phrasing free of emotional adjectives",
      "Actionable physician query generation for missing information",
    ],
    typicalFailureMode: "Writing rambling or disorganized narrative summaries that omit key timeline anchors.",
  },
];

export function AcriFiveDimensionsVisual() {
  const [selectedDimensionId, setSelectedDimensionId] = useState<string>("regulatory");
  const selectedDimension =
    FIVE_DIMENSIONS.find((d) => d.id === selectedDimensionId) || FIVE_DIMENSIONS[1];

  return (
    <div className="space-y-6">
      {/* ── Dimension Cards Row (Interactive Architecture) ── */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {FIVE_DIMENSIONS.map((dim) => {
          const Icon = dim.icon;
          const isSelected = dim.id === selectedDimensionId;
          return (
            <button
              key={dim.id}
              onClick={() => setSelectedDimensionId(dim.id)}
              className={`p-4 rounded-2xl border text-left transition-all relative flex flex-col justify-between ${
                isSelected
                  ? "bg-white card-light tone-light border-[#005B4F] shadow-sm ring-2 ring-[#005B4F]/20"
                  : "bg-white card-light tone-light border-stone-200 hover:border-stone-300 hover:bg-stone-50/50"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[10px] font-bold text-stone-500 uppercase tracking-wider">
                    {dim.dimensionCode}
                  </span>
                  <div
                    className={`h-7 w-7 rounded-lg flex items-center justify-center ${
                      isSelected
                        ? "bg-[#005B4F] text-white"
                        : "bg-stone-100 text-stone-600"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                </div>

                <div className="font-serif font-bold text-xs sm:text-sm text-stone-900 leading-snug">
                  {dim.name}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                <span className="font-mono text-[10px] text-stone-500">Weight</span>
                <span className="font-mono text-xs font-bold text-[#005B4F]">
                  {dim.weightPct}%
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* ── Active Dimension Detailed Dossier Breakdown ── */}
      <div className="rounded-2xl border border-stone-200 bg-white card-light tone-light p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-200">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-[#0B1325] text-white flex items-center justify-center font-serif font-bold text-lg shrink-0">
              {selectedDimension.number}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] font-bold text-[#1B3F8B] uppercase tracking-wider">
                  {selectedDimension.dimensionCode} · WEIGHT {selectedDimension.weightPct}%
                </span>
                <span className="text-stone-300">|</span>
                <span className="font-mono text-[10px] text-stone-600 font-semibold">
                  {selectedDimension.regulatoryStandard}
                </span>
              </div>
              <h3 className="font-serif font-bold text-xl sm:text-2xl text-stone-900 mt-0.5">
                {selectedDimension.name}
              </h3>
            </div>
          </div>

          <div className="bg-[#E8F7F1] border border-[#005B4F]/20 px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold text-[#005B4F] self-start md:self-auto">
            {selectedDimension.weightPct}% of ACRI Score
          </div>
        </div>

        {/* Core Evaluative Question Callout */}
        <div className="mt-6 p-4 rounded-xl bg-[#FAF9F6] border border-stone-200">
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
            CORE EVALUATIVE QUESTION
          </span>
          <p className="font-serif text-sm sm:text-base font-medium text-stone-900 italic">
            "{selectedDimension.coreQuestion}"
          </p>
        </div>

        {/* Two-Column Deep Specification */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
          {/* Left: Clinical Work Simulation Item Excerpt */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-5 rounded-xl border border-stone-200 bg-white tone-light space-y-2">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                <FileSpreadsheet className="h-3.5 w-3.5 text-[#1B3F8B]" />
                <span>AUTHENTIC WORK SIMULATION ITEM (EXCERPT)</span>
              </span>
              <p className="font-sans text-xs sm:text-sm text-stone-700 leading-relaxed bg-stone-50 p-3.5 rounded-lg border border-stone-100 font-normal">
                {selectedDimension.workSimulationExcerpt}
              </p>
            </div>

            <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/40 text-xs text-rose-900 space-y-1">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-rose-700 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                <span>FRESHER FAILURE MODE (SCREENED OUT)</span>
              </span>
              <p className="font-sans leading-relaxed text-stone-700">
                {selectedDimension.typicalFailureMode}
              </p>
            </div>
          </div>

          {/* Right: Key Evaluated Signals & Clinical Skills */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 rounded-xl border border-stone-200 bg-white tone-light space-y-3">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
                EVALUATED COMPETENCY SIGNALS
              </span>
              <div className="space-y-2">
                {selectedDimension.keySignals.map((signal, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-stone-700">
                    <CheckCircle2 className="h-4 w-4 text-[#005B4F] shrink-0 mt-0.5" />
                    <span>{signal}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 text-xs text-stone-600 space-y-1">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
                OCCUPATIONAL WORKFLOW IMPACT
              </span>
              <p className="leading-relaxed">
                {selectedDimension.occupationalFocus}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
