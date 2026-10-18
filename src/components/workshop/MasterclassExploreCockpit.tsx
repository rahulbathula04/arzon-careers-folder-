import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  AlertCircle,
  ArrowRight,
  Award,
  CheckCircle2,
  Clock,
  Cpu,
  Database,
  ExternalLink,
  FileCheck2,
  FileSpreadsheet,
  FileText,
  GitBranch,
  Layers,
  SendHorizontal,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Terminal,
  X,
} from "lucide-react";

export interface MasterclassTopic {
  id: string;
  index: string;
  category: string;
  title: string;
  shortLabel: string;
  tagline: string;
  icon: typeof Activity;
  accentColor: string;
  accentBg: string;
  accentBorder: string;
  accentBadge: string;
  standard: {
    code: string;
    authority: string;
    rule: string;
  };
  tools: {
    primary: string;
    secondary: string;
    badge: string;
  };
  interviewSignal: {
    cro: string;
    question: string;
    passRate: string;
  };
  artifactType: "criteria" | "triage" | "meddra" | "database" | "narrative" | "regulatory";
  fullScenario: {
    caseContext: string;
    learningPoints: string[];
    technicalSkill: string;
  };
}

export const MASTERCLASS_TOPICS: MasterclassTopic[] = [
  {
    id: "icsr",
    index: "01",
    category: "INTAKE & COMPLIANCE",
    title: "ICSR Case Processing",
    shortLabel: "ICSR Processing",
    tagline: "End-to-end case intake, minimum 4 criteria validation, and Day-0 regulatory clock initiation.",
    icon: FileSpreadsheet,
    accentColor: "#2563EB",
    accentBg: "bg-blue-50/90",
    accentBorder: "border-blue-200/80",
    accentBadge: "text-blue-700 bg-blue-50 border-blue-200",
    standard: {
      code: "ICH E2B(R3)",
      authority: "US FDA 21 CFR 314.80 / EMA GVP VI",
      rule: "Day-0 begins when any company employee receives the 4 mandatory elements.",
    },
    tools: {
      primary: "Oracle Argus Safety 8.2",
      secondary: "ArisG · XML E2B Validator",
      badge: "Enterprise Safety DB",
    },
    interviewSignal: {
      cro: "IQVIA & Parexel Technical Round",
      question: "Given a 1-paragraph spontaneous adverse event email, identify all 4 valid ICSR criteria and determine if the Day-0 clock has triggered.",
      passRate: "94% of interviewers test this within the first 10 minutes",
    },
    artifactType: "criteria",
    fullScenario: {
      caseContext: "A physician emails the medical information desk reporting that a 54-year-old female patient developed severe rhabdomyolysis 12 days after starting Atorvastatin 40mg. You must determine if Day-0 has begun.",
      learningPoints: [
        "Verifying the 4 minimum regulatory criteria: Patient, Reporter, Suspect Drug, Adverse Event.",
        "How missing the Day-0 regulatory clock leads to FDA Form 483 audit observations.",
        "Navigating Book-in workflows inside Oracle Argus Safety 8.2.",
      ],
      technicalSkill: "Intake Triage, Source Document Verification, E2B(R3) Field Mapping",
    },
  },
  {
    id: "triage",
    index: "02",
    category: "SERIOUSNESS & CAUSALITY",
    title: "Adverse Event Triage",
    shortLabel: "AE Triage",
    tagline: "Seriousness filtering, WHO-UMC causality algorithms, and SmPC expectedness assessment.",
    icon: ShieldAlert,
    accentColor: "#0284C7",
    accentBg: "bg-sky-50/90",
    accentBorder: "border-sky-200/80",
    accentBadge: "text-sky-700 bg-sky-50 border-sky-200",
    standard: {
      code: "CIOMS I & WHO-UMC",
      authority: "ICH E2A Clinical Safety Guidance",
      rule: "Serious criteria (death, hospitalization, disability) triggers expedited dispatch.",
    },
    tools: {
      primary: "SmPC Section 4.8 Reference",
      secondary: "Investigator Brochure (IB) · RSI Matrix",
      badge: "Clinical Safety Matrix",
    },
    interviewSignal: {
      cro: "Cognizant Life Sciences & Fortrea",
      question: "A patient took a drug and was admitted to ICU overnight for monitoring. Is this an AE or SAE? Does hospitalization automatically trigger 15-day expedited reporting?",
      passRate: "Core screening filter for fresher drug safety associates",
    },
    artifactType: "triage",
    fullScenario: {
      caseContext: "A patient experiences an acute event requiring unexpected ICU admission. You must evaluate seriousness under CIOMS I guidelines, test causality via the WHO-UMC algorithm, and check Section 4.8 of the SmPC for expectedness.",
      learningPoints: [
        "Applying the 6 CIOMS seriousness criteria: Death, Life-Threatening, Hospitalization, Disability, Congenital Anomaly, Medically Significant.",
        "Evaluating positive and negative de-challenge and re-challenge scenarios.",
        "Distinguishing between 'Adverse Event' (AE) and 'Adverse Drug Reaction' (ADR).",
      ],
      technicalSkill: "Causality Grading, SmPC Expectedness Audit, Expedited Threshold Analysis",
    },
  },
  {
    id: "coding",
    index: "03",
    category: "TERMINOLOGY HIERARCHY",
    title: "Standardized Medical Coding",
    shortLabel: "Medical Coding",
    tagline: "Translating unstructured verbatims into calibrated MedDRA 5-level terminology hierarchies.",
    icon: GitBranch,
    accentColor: "#7C3AED",
    accentBg: "bg-purple-50/90",
    accentBorder: "border-purple-200/80",
    accentBadge: "text-purple-700 bg-purple-50 border-purple-200",
    standard: {
      code: "MedDRA v27.0 & WHO-DD",
      authority: "ICH M1 Standardization / MSSO Rules",
      rule: "Point-to-point verbatim matching without subjective clinical diagnostic leaps.",
    },
    tools: {
      primary: "MedDRA Desktop Browser v27.0",
      secondary: "WHO Drug Global Dictionary B3/C3",
      badge: "Hierarchical Terminology",
    },
    interviewSignal: {
      cro: "Accenture Health & Parexel PV Ops",
      question: "What is the structural hierarchy between Preferred Term (PT) and Lowest Level Term (LLT)? Why can an investigator verbatim never be coded directly to an SOC?",
      passRate: "88% of applicants confuse PT with LLT without practical coding exposure",
    },
    artifactType: "meddra",
    fullScenario: {
      caseContext: "An investigator writes: 'Patient had extreme muscle breakdown and dark brown urine.' You must select the precise Lowest Level Term (LLT) and map it up the 5-tier MedDRA hierarchy to the System Organ Class (SOC).",
      learningPoints: [
        "Navigating the 5 MedDRA tiers: SOC ➔ HLGT ➔ HLT ➔ PT ➔ LLT.",
        "Strict adherence to MSSO 'Points to Consider' coding conventions.",
        "Coding suspect and concomitant medications using the WHO Drug Dictionary.",
      ],
      technicalSkill: "MedDRA Coding Conventions, WHO-DD Search, Terminology Calibration",
    },
  },
  {
    id: "database",
    index: "04",
    category: "ENTERPRISE SYSTEMS",
    title: "Safety Database Architecture",
    shortLabel: "Safety DB Systems",
    tagline: "Enterprise database schema, 5-stage routing workflows, and 21 CFR Part 11 audit trails.",
    icon: Database,
    accentColor: "#0D9488",
    accentBg: "bg-teal-50/90",
    accentBorder: "border-teal-200/80",
    accentBadge: "text-teal-700 bg-teal-50 border-teal-200",
    standard: {
      code: "21 CFR Part 11 & GAMP 5",
      authority: "EMA GVP Module I / FDA Data Integrity",
      rule: "Zero record deletions allowed; cryptographic audit log of all field changes.",
    },
    tools: {
      primary: "Enterprise Safety Database 8.2",
      secondary: "Relational E2B SQL Schema · Worklists",
      badge: "Audit-Ready Workflows",
    },
    interviewSignal: {
      cro: "IQVIA Enterprise PV & TCS Life Sciences",
      question: "Walk through the lifecycle of a case from 'Book-in' through 'Quality Review' and 'Submissions Gateway' inside an enterprise safety database.",
      passRate: "Separates candidates with hands-on tool fluency from rote memorizers",
    },
    artifactType: "database",
    fullScenario: {
      caseContext: "You are assigned an enterprise worklist queue in an E2B(R3)-compliant safety database. You must navigate tabs, enter narrative text, verify audit trail logs, and route the case to Quality Review.",
      learningPoints: [
        "5-stage case lifecycle: Book-in ➔ Data Entry ➔ Medical Review ➔ Quality Review ➔ Regulatory Gateway.",
        "Understanding electronic signatures and 21 CFR Part 11 compliance.",
        "Performing duplicate searches to prevent redundant case creation.",
      ],
      technicalSkill: "Worklist Management, Audit Trail Review, Record Locking Protocols",
    },
  },
  {
    id: "narrative",
    index: "05",
    category: "CLINICAL CHRONOLOGY",
    title: "Medical Narrative Writing",
    shortLabel: "Narrative Writing",
    tagline: "Drafting chronological, audit-defensible clinical summaries with laboratory correlations.",
    icon: FileText,
    accentColor: "#D97706",
    accentBg: "bg-amber-50/90",
    accentBorder: "border-amber-200/80",
    accentBadge: "text-amber-800 bg-amber-50 border-amber-200",
    standard: {
      code: "ICH E2C(R2) & CIOMS",
      authority: "GVP Module VI / Post-Marketing SOP",
      rule: "Chronological medical storytelling without speculation; clear de-challenge details.",
    },
    tools: {
      primary: "CIOMS Form I Generator",
      secondary: "Biomarker & CPK Trend Analyzer",
      badge: "Clinical Case Story",
    },
    interviewSignal: {
      cro: "Parexel & Syneos Health",
      question: "Draft the opening sentence of a medical narrative for a 62-year-old male presenting with acute hepatotoxicity after initiation of an anti-tubercular regimen.",
      passRate: "Evaluates clinical English, passive voice precision, and chronology logic",
    },
    artifactType: "narrative",
    fullScenario: {
      caseContext: "You have 3 separate medical records: a triage intake form, lab report showing elevated serum CPK (12,400 IU/L), and hospital discharge summary. You must weave these into an objective, chronological CIOMS narrative.",
      learningPoints: [
        "Structuring the narrative: Patient Demographics ➔ Medical History ➔ Drug Therapy ➔ Event Onset ➔ Lab Data ➔ De-challenge ➔ Outcome.",
        "Writing in objective clinical passive voice without ungrounded diagnostic speculation.",
        "Documenting positive de-challenge and re-challenge with exact timelines.",
      ],
      technicalSkill: "Medical English Drafting, Laboratory Data Correlation, CIOMS Narrative Formatting",
    },
  },
  {
    id: "regulatory",
    index: "06",
    category: "STATUTORY SUBMISSIONS",
    title: "Expedited Regulatory Reporting",
    shortLabel: "Regulatory Reporting",
    tagline: "High-stakes regulatory dispatch adhering to strict 7-day and 15-day statutory deadlines.",
    icon: SendHorizontal,
    accentColor: "#E11D48",
    accentBg: "bg-rose-50/90",
    accentBorder: "border-rose-200/80",
    accentBadge: "text-rose-700 bg-rose-50 border-rose-200",
    standard: {
      code: "FDA 15-Day & EMA 7-Day",
      authority: "US FDA ESG / EudraVigilance Gateway",
      rule: "Fatal / life-threatening unexpected reactions must be dispatched within 7 calendar days.",
    },
    tools: {
      primary: "FDA Electronic Submissions Gateway",
      secondary: "EudraVigilance EVWEB · PMDA XML",
      badge: "Global Authority Gateways",
    },
    interviewSignal: {
      cro: "Novartis Sandoz & IQVIA Regulatory",
      question: "What is the difference between a 7-day initial clock and a 15-day SUSAR timeline? What happens if an electronic ACK-2 receipt is not received from the FDA?",
      passRate: "Critical compliance test — late reports result in FDA Form 483 citations",
    },
    artifactType: "regulatory",
    fullScenario: {
      caseContext: "A fatal adverse event is reported in an ongoing clinical trial. You must calculate the exact 7-day initial statutory deadline and ensure valid E2B(R3) XML transmission to FDA ESG and EMA EudraVigilance.",
      learningPoints: [
        "7-day fatal/life-threatening vs 15-day serious unexpected reporting rules.",
        "Validating XML schema against E2B(R3) gateway specifications.",
        "Tracking electronic receipts: ACK-1 (Gateway Receipt) and ACK-2 (Regulatory Validation).",
      ],
      technicalSkill: "Statutory Deadline Scheduling, XML E2B Validation, Health Authority Transmission",
    },
  },
];

interface MasterclassExploreCockpitProps {
  onReserveClick?: () => void;
}

export function MasterclassExploreCockpit({ onReserveClick }: MasterclassExploreCockpitProps) {
  const [selectedTopic, setSelectedTopic] = useState<MasterclassTopic | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedTopic(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="w-full mt-12 pt-10 border-t border-[#E4EAF2] text-left">
      {/* ── Apple-Grade Section Header with Authoritative Eyebrow ── */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-200/80 bg-blue-50/90 backdrop-blur-md text-xs font-mono font-bold tracking-wider uppercase text-blue-700 shadow-2xs mb-3.5 tone-light card-light">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span>6 Core Industry Modules · Live CRO Simulation</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-bold text-[#081F38] tracking-tight font-serif mb-3">
          What You’ll Explore In This Session
        </h2>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans max-w-2xl mx-auto">
          Every module mirrors the real-world operational workflows, clinical software, and regulatory timelines evaluated in top-tier MNC &amp; CRO pharmacovigilance hiring.
        </p>
      </div>

      {/* ── The 6 Apple Bento Cards (Peak UI/UX Detailing) ── */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {MASTERCLASS_TOPICS.map((topic) => {
          const Icon = topic.icon;

          return (
            <div
              key={topic.id}
              onClick={() => setSelectedTopic(topic)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedTopic(topic);
                }
              }}
              className="group relative rounded-[26px] bg-white/95 backdrop-blur-2xl border border-slate-200/90 p-5 sm:p-6 shadow-[0_4px_20px_-2px_rgba(8,31,56,0.06),0_1px_2px_rgba(8,31,56,0.03)] hover:shadow-[0_20px_40px_-12px_rgba(8,31,56,0.12)] hover:border-blue-400/80 transition-all duration-300 flex flex-col justify-between cursor-pointer tone-light card-light overflow-hidden before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/90 before:to-transparent"
            >
              {/* Top Corner Radial Glow in Accent Color */}
              <div
                className="absolute top-0 right-0 w-44 h-44 rounded-full blur-2xl opacity-25 group-hover:opacity-45 transition-opacity duration-500 pointer-events-none -z-10"
                style={{ backgroundColor: topic.accentColor }}
                aria-hidden="true"
              />

              <div className="space-y-4">
                {/* 1. Module Eyebrow + Icon Badge */}
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100/90 border border-slate-200/80 text-[10.5px] font-mono font-bold text-slate-600 tracking-wider">
                    <span className="text-[#081F38] font-extrabold">{topic.index}</span>
                    <span className="text-slate-300">·</span>
                    <span className="uppercase text-[9.5px] text-slate-500">{topic.category}</span>
                  </div>

                  {/* Frosted Icon Glyph */}
                  <div
                    className="w-9 h-9 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-2xs border"
                    style={{
                      backgroundColor: `${topic.accentColor}12`,
                      borderColor: `${topic.accentColor}30`,
                      color: topic.accentColor,
                    }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                {/* 2. Title & Lead Description */}
                <div>
                  <h3 className="text-lg font-bold text-[#081F38] tracking-tight group-hover:text-blue-600 transition-colors font-serif">
                    {topic.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed font-sans line-clamp-2">
                    {topic.tagline}
                  </p>
                </div>

                {/* 3. PEAK APPLE GRAPHIC ARTIFACT (Bespoke Visual Telemetry Widget) */}
                <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-3 tone-light card-light group-hover:bg-blue-50/30 transition-colors">
                  {topic.artifactType === "criteria" && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 uppercase font-semibold">
                        <span>4 E2B(R3) Criteria</span>
                        <span className="text-emerald-700 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Validated
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-1.5 font-mono text-[10px]">
                        <div className="px-2 py-1 rounded-lg bg-white tone-light card-light border border-slate-200/80 text-slate-700 flex items-center gap-1">
                          <span className="text-emerald-500 font-bold">✓</span> Patient: 54F
                        </div>
                        <div className="px-2 py-1 rounded-lg bg-white tone-light card-light border border-slate-200/80 text-slate-700 flex items-center gap-1">
                          <span className="text-emerald-500 font-bold">✓</span> Reporter: MD
                        </div>
                        <div className="px-2 py-1 rounded-lg bg-white tone-light card-light border border-slate-200/80 text-slate-700 flex items-center gap-1">
                          <span className="text-emerald-500 font-bold">✓</span> Atorvastatin
                        </div>
                        <div className="px-2 py-1 rounded-lg bg-white tone-light card-light border border-slate-200/80 text-slate-700 flex items-center gap-1">
                          <span className="text-emerald-500 font-bold">✓</span> Rhabdo (AE)
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-1 text-[10px] text-blue-700 font-mono font-semibold">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-blue-600" />
                          Day-0 Compliance Clock
                        </span>
                        <span className="text-blue-900 font-bold">15-Day SUSAR</span>
                      </div>
                    </div>
                  )}

                  {topic.artifactType === "triage" && (
                    <div className="space-y-1.5 font-sans">
                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 uppercase font-semibold">
                        <span>Triage Decision Matrix</span>
                        <span className="text-sky-700 font-bold">ICH E2A</span>
                      </div>
                      <div className="flex items-center justify-between p-1.5 rounded-lg bg-white tone-light card-light border border-slate-200/80 text-[10.5px]">
                        <span className="text-slate-500">Seriousness:</span>
                        <span className="font-bold text-rose-700 font-mono text-[10px] px-1.5 py-0.5 rounded bg-rose-50 border border-rose-200">
                          SAE · Hospitalization
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-1.5 rounded-lg bg-white tone-light card-light border border-slate-200/80 text-[10.5px]">
                        <span className="text-slate-500">Causality:</span>
                        <span className="font-bold text-emerald-700 font-mono text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 border border-emerald-200">
                          Probable (WHO-UMC)
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-slate-500 pt-0.5">
                        <span>SmPC Section 4.8:</span>
                        <span className="font-semibold text-[#081F38]">Unexpected Reaction</span>
                      </div>
                    </div>
                  )}

                  {topic.artifactType === "coding" && (
                    <div className="space-y-1.5 font-mono">
                      <div className="flex items-center justify-between text-[10px] text-slate-500 uppercase font-semibold">
                        <span>MedDRA Hierarchy Tree</span>
                        <span className="text-purple-700 font-bold">v27.0</span>
                      </div>
                      <div className="space-y-1 text-[10px]">
                        <div className="flex items-center gap-1 text-slate-500 truncate">
                          <span className="px-1 py-0.2 rounded bg-slate-200 text-slate-700 text-[8.5px] font-bold">SOC</span>
                          <span className="truncate">Musculoskeletal Disorders</span>
                        </div>
                        <div className="flex items-center gap-1 text-slate-600 pl-2 border-l border-slate-300 truncate">
                          <span className="px-1 py-0.2 rounded bg-slate-200 text-slate-700 text-[8.5px] font-bold">HLT</span>
                          <span className="truncate">Myopathies</span>
                        </div>
                        <div className="flex items-center gap-1 text-purple-700 font-bold pl-4 border-l-2 border-purple-500 bg-purple-50/80 py-0.5 rounded-r truncate">
                          <span className="px-1 py-0.2 rounded bg-purple-200 text-purple-900 text-[8.5px]">PT</span>
                          <span className="truncate">Rhabdomyolysis [10039020]</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {topic.artifactType === "database" && (
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 uppercase font-semibold">
                        <span>Safety DB 5-Stage Life Cycle</span>
                        <span className="text-teal-700 font-bold">Argus 8.2</span>
                      </div>
                      <div className="grid grid-cols-5 gap-0.5 text-center font-mono text-[9px]">
                        {[
                          { label: "Book-in", active: true },
                          { label: "Entry", active: true },
                          { label: "Review", active: true },
                          { label: "QC", active: false },
                          { label: "Gate", active: false },
                        ].map((stage) => (
                          <div
                            key={stage.label}
                            className={`py-1 px-0.5 rounded ${
                              stage.active
                                ? "bg-teal-500 text-white font-bold"
                                : "bg-slate-200/80 text-slate-500"
                            }`}
                          >
                            {stage.label}
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-between pt-1 text-[10px] font-mono text-teal-800">
                        <span className="flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3 text-teal-600" />
                          21 CFR Part 11
                        </span>
                        <span className="text-slate-500">SHA-256 Hash Log</span>
                      </div>
                    </div>
                  )}

                  {topic.artifactType === "narrative" && (
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 uppercase font-semibold">
                        <span>CIOMS Narrative Terminal</span>
                        <span className="text-amber-700 font-bold">Standardized</span>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-900 text-slate-200 font-mono text-[9.5px] leading-relaxed max-h-[56px] overflow-hidden border border-slate-800">
                        <p className="truncate text-amber-300">
                          &gt; 54F on Atorvastatin 40mg PO OD...
                        </p>
                        <p className="truncate text-slate-300">
                          &gt; CPK: 12,400 IU/L ➔ Dechallenge (+)
                        </p>
                        <p className="truncate text-emerald-400">
                          &gt; Outcome: Recovered (CPK 210)
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 text-[9.5px] font-mono text-slate-500 pt-0.5">
                        <span className="px-1 py-0.2 rounded bg-slate-200/80">Chronology</span>
                        <span className="px-1 py-0.2 rounded bg-slate-200/80">Biomarkers</span>
                        <span className="px-1 py-0.2 rounded bg-slate-200/80">De-challenge</span>
                      </div>
                    </div>
                  )}

                  {topic.artifactType === "regulatory" && (
                    <div className="space-y-1.5 font-mono">
                      <div className="flex items-center justify-between text-[10px] text-slate-500 uppercase font-semibold">
                        <span>Statutory Timelines Dial</span>
                        <span className="text-rose-700 font-bold">Global Reg</span>
                      </div>
                      <div className="grid grid-cols-2 gap-1 text-[9.5px]">
                        <div className="p-1.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-950 font-bold">
                          <div>7 Calendar Days</div>
                          <div className="text-[8.5px] text-rose-700 font-normal">Fatal / Life-Threat</div>
                        </div>
                        <div className="p-1.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-950 font-bold">
                          <div>15 Calendar Days</div>
                          <div className="text-[8.5px] text-blue-700 font-normal">SUSAR Expedited</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-0.5 text-[10px] text-emerald-700 font-bold">
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Gateway Status
                        </span>
                        <span>ACK-2 Confirmed</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* 4. Standards & Tech Stack Chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-mono text-[10.5px] font-semibold border border-slate-200/80">
                    {topic.standard.code}
                  </span>
                  <span
                    className="px-2.5 py-1 rounded-full font-mono text-[10.5px] font-semibold border"
                    style={{
                      backgroundColor: `${topic.accentColor}10`,
                      borderColor: `${topic.accentColor}30`,
                      color: topic.accentColor,
                    }}
                  >
                    {topic.tools.badge}
                  </span>
                </div>
              </div>

              {/* 5. Card Footer: Interview Signal + Apple Action */}
              <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-slate-500 font-medium text-[11px] truncate max-w-[170px] sm:max-w-[190px]">
                  <Award className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span className="truncate">{topic.interviewSignal.cro}</span>
                </div>

                <div className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 group-hover:text-blue-800 transition-colors">
                  <span>Inspect Workflow</span>
                  <div className="w-5 h-5 rounded-full bg-blue-50 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-all duration-300">
                    <ArrowRight className="w-3 h-3 stroke-[2.5]" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Apple-Grade Detail Inspection Modal ── */}
      <AnimatePresence>
        {selectedTopic && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-md">
            {/* Backdrop click dismiss */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTopic(null)}
              className="absolute inset-0 cursor-pointer"
              aria-hidden="true"
            />

            {/* Modal Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", stiffness: 450, damping: 35 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white/95 backdrop-blur-2xl border border-slate-200/90 shadow-2xl p-6 sm:p-8 tone-light card-light z-10 text-left"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedTopic(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                aria-label="Close details"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-mono font-bold uppercase mb-3">
                <span>MODULE {selectedTopic.index} OF 06</span>
                <span>·</span>
                <span>{selectedTopic.category}</span>
              </div>

              {/* Title & Tagline */}
              <h3 className="text-2xl sm:text-3xl font-bold text-[#081F38] font-serif tracking-tight">
                {selectedTopic.title}
              </h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed font-sans">
                {selectedTopic.tagline}
              </p>

              {/* Case Context Box */}
              <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 tone-light card-light">
                <div className="text-xs font-mono font-bold uppercase text-slate-500 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-blue-600" />
                  Live Operational Simulation Scenario
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                  {selectedTopic.fullScenario.caseContext}
                </p>
              </div>

              {/* What You Master In This Module */}
              <div className="mt-6 space-y-3">
                <h4 className="text-xs font-mono font-bold uppercase text-[#081F38] tracking-wider">
                  Technical Competencies Evaluated in MNC Hiring
                </h4>
                <div className="space-y-2">
                  {selectedTopic.fullScenario.learningPoints.map((point) => (
                    <div key={point} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2-Column Standards & Tools */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <div className="font-mono text-[10px] text-slate-400 uppercase font-semibold">
                    Regulatory Standard
                  </div>
                  <div className="font-bold text-[#081F38]">{selectedTopic.standard.code}</div>
                  <div className="text-[11px] text-slate-500">{selectedTopic.standard.authority}</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <div className="font-mono text-[10px] text-slate-400 uppercase font-semibold">
                    Primary Software Tool
                  </div>
                  <div className="font-bold text-[#081F38]">{selectedTopic.tools.primary}</div>
                  <div className="text-[11px] text-slate-500">{selectedTopic.tools.secondary}</div>
                </div>
              </div>

              {/* Authentic Technical Round Question */}
              <div className="mt-6 p-4 rounded-2xl bg-blue-50/80 border border-blue-200/80 space-y-1.5 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-blue-900">
                  <Award className="w-4 h-4 text-blue-600" />
                  <span>{selectedTopic.interviewSignal.cro}</span>
                </div>
                <p className="text-blue-950 font-serif italic text-xs sm:text-sm">
                  "{selectedTopic.interviewSignal.question}"
                </p>
                <div className="text-[11px] text-blue-700 font-mono">
                  ★ {selectedTopic.interviewSignal.passRate}
                </div>
              </div>

              {/* Modal CTA */}
              <div className="mt-8 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-slate-500 text-xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% Free Live Masterclass · Practical Case Work</span>
                </div>

                {onReserveClick && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedTopic(null);
                      onReserveClick();
                    }}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
                  >
                    <span>Reserve My Seat To Practice This</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
