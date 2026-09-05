import { useState } from "react";
import {
  FileText,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Clock,
  Layers,
  Activity,
  Check,
  Zap,
} from "lucide-react";

interface ArzonEventCaseStudyProps {
  onReserveClick: () => void;
  isRegistered?: boolean;
}

type WorkflowStep = "reported" | "validate" | "assess" | "code" | "document";

export function ArzonEventCaseStudy({ onReserveClick, isRegistered = false }: ArzonEventCaseStudyProps) {
  const [currentStep, setCurrentStep] = useState<WorkflowStep>("reported");

  const steps: { id: WorkflowStep; stepNum: string; title: string; subtitle: string; tag: string }[] = [
    {
      id: "reported",
      stepNum: "01",
      title: "REPORTED",
      subtitle: "Adverse Event Intake",
      tag: "DAY 0 CLOCK",
    },
    {
      id: "validate",
      stepNum: "02",
      title: "VALIDATE",
      subtitle: "4 Minimum Criteria",
      tag: "ICH E2D AUDIT",
    },
    {
      id: "assess",
      stepNum: "03",
      title: "ASSESS",
      subtitle: "Seriousness & Causality",
      tag: "15-DAY EXPEDITED",
    },
    {
      id: "code",
      stepNum: "04",
      title: "CODE",
      subtitle: "MedDRA Hierarchy",
      tag: "PT & SOC MAPPING",
    },
    {
      id: "document",
      stepNum: "05",
      title: "DOCUMENT",
      subtitle: "Narrative & Dispatch",
      tag: "E2B(R3) XML",
    },
  ];

  return (
    <section
      id="simulated-case"
      className="w-full py-16 sm:py-20 bg-[var(--color-case-dark)] tone-dark border-y border-[#122238] text-left text-[var(--color-warm-paper)] overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-4 bg-[var(--color-editorial-amber)] rounded-sm"></div>
              <span className="font-mono text-[11px] font-bold text-[var(--color-editorial-amber)] uppercase tracking-widest">
                LIVE CASE DEMONSTRATION · SIM-PV-METFORMIN-01
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--color-warm-paper)] tracking-tight">
              What does a real PV case actually look like?
            </h2>
            <p className="font-sans text-sm sm:text-base text-stone-300 leading-relaxed max-w-2xl">
              Safety operations teams do not spend their days memorizing definitions. They process, triage,
              and report live patient safety data under strict statutory deadlines. Here is the exact case we will process together.
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs text-stone-400 shrink-0">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-[var(--color-clinical-teal)] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-clinical-teal)] motion-safe:animate-pulse"></span>
              ICH E2A / E2D SPECIFICATION
            </span>
          </div>
        </div>

        {/* Master Case Demonstration Record */}
        <div className="rounded-2xl border border-white/10 bg-[#0B172B] shadow-2xl overflow-hidden">
          {/* Top Operational Record Header */}
          <div className="px-5 sm:px-8 py-4 bg-[#081324] border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold text-[var(--color-clinical-teal)] uppercase tracking-wider px-2 py-0.5 rounded bg-[var(--color-clinical-teal)]/15 border border-[var(--color-clinical-teal)]/30">
                CLINICAL TRIAGE DOSSIER
              </span>
              <span className="font-mono text-xs text-stone-300">
                Case Reference: <strong className="text-white">SIM-PV-METFORMIN-01</strong>
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono text-stone-400">
              <span>SUSPECT: <strong className="text-white">Metformin ER 1000 mg</strong></span>
              <span className="hidden sm:inline text-white/20">|</span>
              <span className="hidden sm:inline">INDICATION: <strong className="text-white">Type-2 Diabetes</strong></span>
            </div>
          </div>

          {/* Fixed 5-Step Workflow Rail */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 border-b border-white/10 bg-[#071120]">
            {steps.map((step) => {
              const isActive = currentStep === step.id;
              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setCurrentStep(step.id)}
                  onMouseEnter={() => setCurrentStep(step.id)}
                  className={`p-4 sm:p-5 text-left transition-all border-r last:border-r-0 border-white/5 cursor-pointer relative group ${
                    isActive
                      ? "bg-[#102444] text-white"
                      : "hover:bg-white/5 text-stone-400 hover:text-stone-200"
                  }`}
                >
                  {/* Top Active Indicator Bar */}
                  {isActive && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--color-clinical-teal)]"></div>
                  )}

                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-mono text-xs font-bold text-[var(--color-editorial-amber)]">
                      {step.stepNum}
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/5 text-stone-300">
                      {step.tag}
                    </span>
                  </div>

                  <h4 className="font-mono text-sm font-bold tracking-tight text-white group-hover:text-white transition-colors">
                    {step.title}
                  </h4>
                  <p className="font-sans text-xs text-stone-300/80 truncate mt-0.5">
                    {step.subtitle}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Interactive Content-Pane Swap (Locked Decision 2) */}
          <div className="p-6 sm:p-8 lg:p-10 bg-[#0A1628] min-h-[380px] flex flex-col justify-between">
            {/* Step 1: REPORTED */}
            {currentStep === "reported" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                  <div>
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--color-editorial-amber)] block mb-1">
                      STAGE 01 · INITIAL INTAKE & TRIAGE
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-white">
                      Raw Inpatient Safety Report Received
                    </h3>
                  </div>
                  <span className="font-mono text-xs px-3 py-1 rounded bg-amber-500/15 border border-amber-500/30 text-amber-300 font-bold self-start sm:self-auto">
                    Day 0 Clock Running
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs font-sans">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                    <span className="font-mono text-[10px] text-stone-400 uppercase tracking-wider block font-semibold">
                      Patient Demographics
                    </span>
                    <p className="font-bold text-white text-sm">Female, 58 Years Old</p>
                    <p className="text-stone-300">Initial: M.K. · T2D 12 years · Creatinine: 2.8 mg/dL</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                    <span className="font-mono text-[10px] text-stone-400 uppercase tracking-wider block font-semibold">
                      Suspect Medication
                    </span>
                    <p className="font-bold text-white text-sm">Metformin ER 500 mg</p>
                    <p className="text-stone-300">Dose: 1000 mg daily oral · Concomitant IV Contrast</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                    <span className="font-mono text-[10px] text-stone-400 uppercase tracking-wider block font-semibold">
                      Initial Reporter
                    </span>
                    <p className="font-bold text-white text-sm">Dr. R. Verma (HCP)</p>
                    <p className="text-stone-300">Department of Nephrology, Tertiary Care Centre</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#081220] border border-white/10 space-y-2">
                  <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-[var(--color-clinical-teal)] block">
                    CLINICAL PRESENTATION SUMMARY
                  </span>
                  <p className="font-sans text-xs sm:text-sm text-stone-300 leading-relaxed">
                    Patient admitted through emergency ICU presenting severe lethargy, hypothermia, tachypnea (deep Kussmaul respirations),
                    and abdominal pain. Arterial blood gas confirmed severe metabolic acidosis (pH 7.08, serum lactate 9.4 mmol/L).
                    Physician suspects Metformin-Associated Lactic Acidosis (MALA) precipitated by acute renal impairment.
                  </p>
                </div>
              </div>
            )}

            {/* Step 2: VALIDATE */}
            {currentStep === "validate" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                  <div>
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--color-clinical-teal)] block mb-1">
                      STAGE 02 · 4 MINIMUM VALIDITY PILLARS (ICH E2D)
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-white">
                      All 4 Criteria Confirmed for Regulatory Action
                    </h3>
                  </div>
                  <span className="font-mono text-xs px-3 py-1 rounded bg-[var(--color-clinical-teal)]/20 border border-[var(--color-clinical-teal)]/40 text-[var(--color-clinical-teal)] font-bold self-start sm:self-auto">
                    ✓ Valid ICSR
                  </span>
                </div>

                <p className="font-sans text-xs sm:text-sm text-stone-300 leading-relaxed">
                  Under global pharmacovigilance regulations, if any ONE of the 4 pillars is missing, the case cannot be submitted as an expedited report.
                  Here, the case triage officer checks all four:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-sans">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-stone-400 uppercase font-semibold">Pillar 1</span>
                      <Check className="w-4 h-4 text-[var(--color-clinical-teal)]" />
                    </div>
                    <p className="font-bold text-white text-sm">Identifiable Patient</p>
                    <p className="text-stone-300">Initials M.K., Female, 58 Yrs</p>
                    <span className="font-mono text-[10px] text-[var(--color-clinical-teal)] block font-bold">VERIFIED ✓</span>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-stone-400 uppercase font-semibold">Pillar 2</span>
                      <Check className="w-4 h-4 text-[var(--color-clinical-teal)]" />
                    </div>
                    <p className="font-bold text-white text-sm">Identifiable Reporter</p>
                    <p className="text-stone-300">Dr. R. Verma, Hospital Nephrologist</p>
                    <span className="font-mono text-[10px] text-[var(--color-clinical-teal)] block font-bold">VERIFIED ✓</span>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-stone-400 uppercase font-semibold">Pillar 3</span>
                      <Check className="w-4 h-4 text-[var(--color-clinical-teal)]" />
                    </div>
                    <p className="font-bold text-white text-sm">Suspect Drug</p>
                    <p className="text-stone-300">Metformin ER 500 mg (1000 mg/day)</p>
                    <span className="font-mono text-[10px] text-[var(--color-clinical-teal)] block font-bold">VERIFIED ✓</span>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-stone-400 uppercase font-semibold">Pillar 4</span>
                      <Check className="w-4 h-4 text-[var(--color-clinical-teal)]" />
                    </div>
                    <p className="font-bold text-white text-sm">Adverse Event</p>
                    <p className="text-stone-300">Metabolic Acidosis & Renal Distress</p>
                    <span className="font-mono text-[10px] text-[var(--color-clinical-teal)] block font-bold">VERIFIED ✓</span>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: ASSESS */}
            {currentStep === "assess" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                  <div>
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--color-editorial-amber)] block mb-1">
                      STAGE 03 · SERIOUSNESS & CAUSALITY ASSESSMENT
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-white">
                      Life-Threatening Criterion Triggered: 15-Day Expedited Clock
                    </h3>
                  </div>
                  <span className="font-mono text-xs px-3 py-1 rounded bg-rose-500/20 border border-rose-500/40 text-rose-300 font-bold self-start sm:self-auto">
                    CRITICAL EXPEDITED
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs font-sans">
                  <div className="p-5 rounded-xl bg-[#081220] border border-white/10 space-y-3">
                    <span className="font-mono text-xs font-bold text-[var(--color-editorial-amber)] uppercase tracking-wider block">
                      SERIOUSNESS CRITERIA (ICH E2A)
                    </span>
                    <ul className="space-y-2 text-stone-300">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                        <strong className="text-white">Life-Threatening:</strong> Patient presented in severe shock (pH 7.08).
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                        <strong className="text-white">Inpatient Hospitalization:</strong> Immediate ICU admission with hemodialysis.
                      </li>
                    </ul>
                  </div>

                  <div className="p-5 rounded-xl bg-[#081220] border border-white/10 space-y-3">
                    <span className="font-mono text-xs font-bold text-[var(--color-clinical-teal)] uppercase tracking-wider block">
                      WHO-UMC CAUSALITY CLASSIFICATION
                    </span>
                    <div className="space-y-1 text-stone-300">
                      <p className="font-bold text-white text-sm">Category: Probable / Likely</p>
                      <p className="leading-relaxed">
                        Reasonable temporal sequence, known pharmacological accumulation mechanism in renal failure,
                        and improvement post-hemodialysis cessation.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-3 text-xs text-amber-200">
                  <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <strong>Regulatory Impact:</strong> Under US FDA 21 CFR 314.80 and EMA GVP Module VI, serious unexpected events
                    must be submitted electronically within <strong>15 calendar days</strong>. Missing this deadline causes non-compliance inspection findings.
                  </p>
                </div>
              </div>
            )}

            {/* Step 4: CODE */}
            {currentStep === "code" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                  <div>
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--color-clinical-teal)] block mb-1">
                      STAGE 04 · MedDRA CODING & HIERARCHY MAPPING
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-white">
                      Translating Clinical Verbatim into Standardized Terms
                    </h3>
                  </div>
                  <span className="font-mono text-xs px-3 py-1 rounded bg-[var(--color-clinical-teal)]/20 border border-[var(--color-clinical-teal)]/40 text-[var(--color-clinical-teal)] font-bold self-start sm:self-auto">
                    MedDRA v27.0 Compliant
                  </span>
                </div>

                <p className="font-sans text-xs sm:text-sm text-stone-300 leading-relaxed">
                  Safety databases like Oracle Argus and ARISg require standardized Medical Dictionary for Regulatory Activities (MedDRA) coding.
                  Candidates are frequently tested on this exact mapping:
                </p>

                <div className="p-5 rounded-xl bg-[#081220] border border-white/10 space-y-4 font-mono text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pb-3 border-b border-white/10 text-stone-400 uppercase text-[10px] font-bold">
                    <span>Hierarchy Level</span>
                    <span className="sm:col-span-2">Coded Medical Term</span>
                    <span>MedDRA Code</span>
                    <span>Status</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-center py-1">
                    <span className="text-[var(--color-editorial-amber)] font-bold">Reporter Verbatim</span>
                    <span className="sm:col-span-2 text-white font-sans text-xs">"Severe lactic acidosis and renal shutdown"</span>
                    <span className="text-stone-500">—</span>
                    <span className="text-stone-400">Raw Input</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-center py-1">
                    <span className="text-[var(--color-clinical-teal)] font-bold">Lowest Level (LLT)</span>
                    <span className="sm:col-span-2 text-white font-semibold">Lactic acidosis</span>
                    <span className="text-stone-300">10023635</span>
                    <span className="text-[var(--color-clinical-teal)] font-bold">Matched ✓</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-center py-1">
                    <span className="text-[var(--color-clinical-teal)] font-bold">Preferred Term (PT)</span>
                    <span className="sm:col-span-2 text-white font-semibold">Lactic acidosis</span>
                    <span className="text-stone-300">10023635</span>
                    <span className="text-[var(--color-clinical-teal)] font-bold">Primary Event</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-center py-1">
                    <span className="text-[var(--color-clinical-teal)] font-bold">System Organ Class (SOC)</span>
                    <span className="sm:col-span-2 text-white font-semibold">Metabolism and nutrition disorders</span>
                    <span className="text-stone-300">10027433</span>
                    <span className="text-[var(--color-clinical-teal)] font-bold">Top Level</span>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: DOCUMENT */}
            {currentStep === "document" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                  <div>
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--color-editorial-amber)] block mb-1">
                      STAGE 05 · NARRATIVE WRITING & ELECTRONIC DISPATCH
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-white">
                      CIOMS I & ICH E2B(R3) Electronic Gateway Submission
                    </h3>
                  </div>
                  <span className="font-mono text-xs px-3 py-1 rounded bg-[var(--color-clinical-teal)]/20 border border-[var(--color-clinical-teal)]/40 text-[var(--color-clinical-teal)] font-bold self-start sm:self-auto">
                    Ready For Gateway Dispatch
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 text-xs font-sans">
                  <div className="p-4 rounded-xl bg-[#081220] border border-white/10 space-y-2">
                    <span className="font-mono text-[10px] text-stone-400 uppercase font-bold tracking-wider block">
                      STRUCTURED SAFETY NARRATIVE (SBAR FORMAT)
                    </span>
                    <p className="text-stone-300 leading-relaxed font-sans text-xs">
                      "A 58-year-old female patient with a 12-year history of Type-2 Diabetes experienced acute metabolic acidosis
                      following 1000 mg/day Metformin ER administration. The patient was admitted to intensive care in critical shock
                      with a serum lactate of 9.4 mmol/L. Hemodialysis was initiated with prompt clinical improvement.
                      The event is deemed serious (life-threatening and hospitalization) with probable drug causality."
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#081220] border border-white/10 space-y-2 font-mono text-[11px]">
                    <span className="text-[10px] text-stone-400 uppercase font-bold tracking-wider block">
                      ICH E2B(R3) XML PAYLOAD GENERATION
                    </span>
                    <div className="p-3 rounded bg-black/40 text-stone-300 border border-white/5 space-y-1">
                      <p className="text-stone-400">&lt;safetyreport version="2.0"&gt;</p>
                      <p className="pl-3 text-[var(--color-clinical-teal)]">&lt;safetyreportid&gt;ARZON-2026-IND-001&lt;/safetyreportid&gt;</p>
                      <p className="pl-3 text-[var(--color-editorial-amber)]">&lt;serious&gt;1&lt;/serious&gt; &lt;seriousnesslifethreatening&gt;1&lt;/seriousnesslifethreatening&gt;</p>
                      <p className="pl-3 text-stone-300">&lt;patientonsetage&gt;58&lt;/patientonsetage&gt;</p>
                      <p className="text-stone-400">&lt;/safetyreport&gt;</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Secondary CTA to Reserve Seat */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-0.5 text-center sm:text-left">
                <span className="font-mono text-xs text-[var(--color-editorial-amber)] font-bold block">
                  WANT TO PROCESS THIS CASE LIVE WITH MENTOR KUMAIL?
                </span>
                <p className="font-sans text-xs text-stone-300">
                  Reserve your free seat to receive the complete case packet and live walkthrough.
                </p>
              </div>

              <button
                type="button"
                onClick={onReserveClick}
                className="inline-flex items-center gap-2 py-3 px-5 rounded-xl bg-[var(--color-medical-navy)] hover:bg-[#163c75] border border-white/20 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer shrink-0"
              >
                <span>RESERVE FREE SEAT FOR CASE PACKET</span>
                <ArrowRight className="w-3.5 h-3.5 text-[var(--color-editorial-amber)]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
