import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Activity,
  ArrowRight,
  Award,
  CheckCircle2,
  ChevronRight,
  Database,
  FileSpreadsheet,
  FileText,
  GitBranch,
  SendHorizontal,
  ShieldAlert,
  ShieldCheck,
  Terminal,
  X,
} from "lucide-react";

export interface MasterclassTopic {
  id: string;
  index: string;
  category: string;
  title: string;
  summary: string;
  icon: typeof Activity;
  accentColor: string;
  tool: string;
  cro: string;
  standard: {
    code: string;
    authority: string;
  };
  interviewQuestion: string;
  interviewTip: string;
  scenario: string;
  learningPoints: string[];
}

export const MASTERCLASS_TOPICS: MasterclassTopic[] = [
  {
    id: "icsr",
    index: "01",
    category: "Intake",
    title: "ICSR Case Intake",
    summary: "Spot the 4 mandatory regulatory criteria and start the strict Day-0 compliance clock.",
    icon: FileSpreadsheet,
    accentColor: "#2563EB",
    tool: "Oracle Argus 8.2",
    cro: "IQVIA & Parexel",
    standard: {
      code: "ICH E2B(R3)",
      authority: "US FDA 21 CFR 314.80 / EMA GVP VI",
    },
    interviewQuestion: "Given a 1-paragraph adverse event email, identify all 4 valid ICSR criteria and determine if the Day-0 clock has triggered.",
    interviewTip: "94% of technical interviewers test Day-0 rules in the first 10 minutes.",
    scenario: "A physician reports that a 54-year-old female patient developed severe rhabdomyolysis after starting Atorvastatin 40mg. You verify source documents, check validity, and log initial intake.",
    learningPoints: [
      "The 4 mandatory ICSR elements: Identifiable Patient, Reporter, Suspect Drug, and Adverse Event.",
      "How missing the Day-0 clock results in critical FDA Form 483 audit observations.",
      "Navigating Book-in workflows inside Oracle Argus Safety 8.2.",
    ],
  },
  {
    id: "triage",
    index: "02",
    category: "Triage",
    title: "Adverse Event Triage",
    summary: "Classify seriousness (hospitalization vs mild) and grade causality using WHO-UMC.",
    icon: ShieldAlert,
    accentColor: "#0284C7",
    tool: "SmPC Section 4.8",
    cro: "Cognizant & Novartis",
    standard: {
      code: "CIOMS I & WHO-UMC",
      authority: "ICH E2A Clinical Safety Guidance",
    },
    interviewQuestion: "A patient took a drug and was kept in ICU overnight for monitoring. Is this an AE or SAE? Does hospitalization automatically trigger expedited reporting?",
    interviewTip: "Core screening filter for entry-level Drug Safety Associates.",
    scenario: "An acute event requires ICU admission. You apply the 6 CIOMS seriousness criteria, evaluate causality via the WHO-UMC algorithm, and audit expectedness against Section 4.8 of the SmPC.",
    learningPoints: [
      "The 6 CIOMS seriousness criteria: Death, Life-Threatening, Hospitalization, Disability, Congenital Anomaly, Medically Significant.",
      "De-challenge and re-challenge assessment for causality grading.",
      "Distinguishing Adverse Events (AE) from Adverse Drug Reactions (ADR).",
    ],
  },
  {
    id: "coding",
    index: "03",
    category: "Coding",
    title: "MedDRA Medical Coding",
    summary: "Map verbatim doctor notes to international standard terms across 5 MedDRA levels.",
    icon: GitBranch,
    accentColor: "#7C3AED",
    tool: "MedDRA v27.0",
    cro: "Accenture & Parexel",
    standard: {
      code: "MedDRA v27.0 & WHO-DD",
      authority: "ICH M1 Standardization / MSSO Rules",
    },
    interviewQuestion: "What is the structural hierarchy between Preferred Term (PT) and Lowest Level Term (LLT)? Why can an investigator verbatim never be coded directly to an SOC?",
    interviewTip: "Tests practical dictionary fluency over theoretical memorization.",
    scenario: "An investigator writes: 'Patient had extreme muscle breakdown and dark brown urine.' You select the precise Lowest Level Term (LLT) and map it up the 5 tiers to System Organ Class.",
    learningPoints: [
      "The 5-tier MedDRA structure: SOC ➔ HLGT ➔ HLT ➔ PT ➔ LLT.",
      "Adhering strictly to MSSO 'Points to Consider' coding conventions.",
      "Coding suspect and concomitant medications using the WHO Drug Dictionary.",
    ],
  },
  {
    id: "database",
    index: "04",
    category: "Workflows",
    title: "Safety Database Entry",
    summary: "Walk through the 5-stage case lifecycle from Book-in to QC with 21 CFR Part 11 audit trails.",
    icon: Database,
    accentColor: "#0D9488",
    tool: "21 CFR Part 11",
    cro: "TCS & IQVIA",
    standard: {
      code: "21 CFR Part 11 & GAMP 5",
      authority: "EMA GVP Module I / FDA Data Integrity",
    },
    interviewQuestion: "Walk through the lifecycle of a case from 'Book-in' through 'Quality Review' and 'Submissions Gateway' inside an enterprise safety database.",
    interviewTip: "Separates candidates with simulated tool experience from fresh grads.",
    scenario: "Working inside an enterprise safety worklist, you perform duplicate checks, navigate tabbed workflows, log narrative text, and verify cryptographic audit trail entries.",
    learningPoints: [
      "5-stage case lifecycle: Book-in ➔ Data Entry ➔ Medical Review ➔ QC ➔ Gateway.",
      "Electronic signatures and audit trails under 21 CFR Part 11.",
      "Performing duplicate searches to protect clinical data integrity.",
    ],
  },
  {
    id: "narrative",
    index: "05",
    category: "Narrative",
    title: "Medical Narrative Writing",
    summary: "Draft objective, audit-defensible case stories correlating drug history, labs, and de-challenge.",
    icon: FileText,
    accentColor: "#D97706",
    tool: "CIOMS Form I",
    cro: "Syneos & Parexel",
    standard: {
      code: "ICH E2C(R2) & CIOMS",
      authority: "GVP Module VI / Post-Marketing SOP",
    },
    interviewQuestion: "Draft the opening sentence of a medical narrative for a 62-year-old male presenting with acute hepatotoxicity after an anti-tubercular regimen.",
    interviewTip: "Evaluates clinical English, passive voice accuracy, and chronology logic.",
    scenario: "Synthesizing an intake email, hospital discharge summary, and elevated serum CPK lab trends (12,400 IU/L), you craft an objective, chronological CIOMS narrative.",
    learningPoints: [
      "Chronological structure: Demographics ➔ History ➔ Drug Therapy ➔ Onset ➔ Labs ➔ Outcome.",
      "Writing in clear clinical passive voice without ungrounded diagnostic speculation.",
      "Documenting positive de-challenge and re-challenge with precise timelines.",
    ],
  },
  {
    id: "regulatory",
    index: "06",
    category: "Submissions",
    title: "Expedited Reporting",
    summary: "Calculate statutory submission deadlines (7-day fatal vs 15-day SUSAR) for FDA & EMA.",
    icon: SendHorizontal,
    accentColor: "#E11D48",
    tool: "FDA ESG & EMA",
    cro: "Novartis & ICON",
    standard: {
      code: "FDA 15-Day & EMA 7-Day",
      authority: "US FDA ESG / EudraVigilance Gateway",
    },
    interviewQuestion: "What is the difference between a 7-day initial clock and a 15-day SUSAR timeline? What happens if an electronic ACK-2 receipt is delayed?",
    interviewTip: "Critical compliance test — late submissions trigger regulatory citations.",
    scenario: "A fatal clinical trial reaction occurs. You calculate the 7-day initial statutory deadline and verify E2B(R3) XML transmission and receipt confirmations with the health authority.",
    learningPoints: [
      "7-day fatal/life-threatening vs 15-day serious unexpected reporting rules.",
      "Validating XML schemas against E2B(R3) electronic gateway specifications.",
      "Tracking ACK-1 (Gateway Receipt) and ACK-2 (Regulatory Validation) confirmations.",
    ],
  },
];

interface MasterclassExploreCockpitProps {
  onReserveClick?: () => void;
}

export function MasterclassExploreCockpit({ onReserveClick }: MasterclassExploreCockpitProps) {
  const [selectedTopic, setSelectedTopic] = useState<MasterclassTopic | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll tracking across the section for responsive bidirectional feel
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 90%", "end 20%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 30,
    restDelta: 0.001,
  });

  // Scale and opacity driven by bidirectional scroll
  const sectionScale = useTransform(smoothProgress, [0, 0.15, 0.9, 1], [0.97, 1, 1, 0.98]);
  const sectionOpacity = useTransform(smoothProgress, [0, 0.1, 0.9, 1], [0.65, 1, 1, 0.75]);

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
    <div
      ref={containerRef}
      className="w-full mt-6 pt-6 sm:mt-8 sm:pt-8 border-t border-slate-200/70 text-left relative"
    >
      {/* ── Peak Apple Eyebrow & Compact Header (Scroll-Aware Motion Release) ── */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
        className="text-center max-w-xl mx-auto mb-4 sm:mb-6"
      >
        <motion.div
          whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
          whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
          transition={{ type: "spring", stiffness: 450, damping: 25 }}
          className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-blue-200/70 bg-blue-50/70 text-[10px] font-mono font-bold tracking-wider uppercase text-blue-700 shadow-2xs mb-2 tone-light card-light cursor-default"
        >
          <span className="relative flex h-1.5 w-1.5 shrink-0">
            <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
          </span>
          <span>6 Hands-On Phases · 90 Minutes</span>
        </motion.div>

        <h2 className="text-xl sm:text-3xl font-bold text-[#081F38] tracking-[-0.03em] font-serif">
          What You’ll Explore{" "}
          <span className="bg-gradient-to-r from-[#2563EB] via-[#0284C7] to-[#7C3AED] bg-clip-text text-transparent [box-decoration-break:clone]">
            In This Session
          </span>
        </h2>

        <p className="text-[11px] sm:text-xs text-slate-500 mt-1 max-w-md mx-auto">
          The complete adverse event operational workflow simulated live — tap any step to inspect technical interview questions.
        </p>
      </motion.div>

      {/* ── Peak Apple Unified Bento Card with Interactive Spring Physics & Scroll Telemetry ── */}
      <motion.div
        style={shouldReduceMotion ? {} : { scale: sectionScale, opacity: sectionOpacity }}
        initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ type: "spring", stiffness: 320, damping: 26 }}
        className="max-w-4xl mx-auto rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-[0_2px_16px_-4px_rgba(8,31,56,0.05)] overflow-hidden tone-light card-light relative"
      >
        {/* Apple Dynamic Scroll Progress Hairline (tracks scrolling forward & coming back) */}
        <motion.div
          style={shouldReduceMotion ? { scaleX: 1 } : { scaleX: smoothProgress, transformOrigin: "0%" }}
          className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-blue-500 via-sky-400 to-indigo-500 z-10"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          {/* Column 1 (Steps 01 - 03) */}
          <div className="divide-y divide-slate-100">
            {MASTERCLASS_TOPICS.slice(0, 3).map((topic, idx) => (
              <ModuleRow
                key={topic.id}
                topic={topic}
                index={idx}
                shouldReduceMotion={shouldReduceMotion}
                onSelect={() => setSelectedTopic(topic)}
              />
            ))}
          </div>

          {/* Column 2 (Steps 04 - 06) */}
          <div className="divide-y divide-slate-100">
            {MASTERCLASS_TOPICS.slice(3, 6).map((topic, idx) => (
              <ModuleRow
                key={topic.id}
                topic={topic}
                index={idx + 3}
                shouldReduceMotion={shouldReduceMotion}
                onSelect={() => setSelectedTopic(topic)}
              />
            ))}
          </div>
        </div>

        {/* Micro Bottom Utility Bar with Live Telemetry Badge */}
        <div className="px-3.5 py-2 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500 font-mono">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            ICH E2B(R3) &amp; CIOMS Standards
          </span>
          <span className="text-slate-400">
            Simulated on Real De-identified Datasets
          </span>
        </div>
      </motion.div>

      {/* ── Apple-Grade Detail Modal (Smooth Spring Release & Exit) ── */}
      <AnimatePresence>
        {selectedTopic && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={() => setSelectedTopic(null)}
              className="absolute inset-0 cursor-pointer"
              aria-hidden="true"
            />

            <motion.div
              initial={shouldReduceMotion ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 12 }}
              transition={{ type: "spring", stiffness: 480, damping: 32 }}
              className="relative w-full max-w-lg max-h-[86vh] overflow-y-auto rounded-3xl bg-white/95 backdrop-blur-2xl border border-slate-200/90 shadow-2xl p-5 sm:p-6 tone-light card-light z-10 text-left"
            >
              <button
                type="button"
                onClick={() => setSelectedTopic(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                aria-label="Close details"
              >
                <X className="w-3.5 h-3.5" />
              </button>

              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-mono font-bold uppercase mb-2">
                <span>MODULE {selectedTopic.index} OF 06</span>
                <span>·</span>
                <span>{selectedTopic.category}</span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-[#081F38] font-sans tracking-tight">
                {selectedTopic.title}
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed font-sans">
                {selectedTopic.summary}
              </p>

              {/* Scenario Context */}
              <div className="mt-3.5 p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1 tone-light card-light">
                <div className="text-[10px] font-mono font-bold uppercase text-slate-500 flex items-center gap-1.5">
                  <Terminal className="w-3 h-3 text-blue-600" />
                  Live Simulation Scenario
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-sans">
                  {selectedTopic.scenario}
                </p>
              </div>

              {/* Technical Question */}
              <div className="mt-3.5 p-3.5 rounded-2xl bg-blue-50/80 border border-blue-200/80 space-y-1 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-blue-900 text-[11px]">
                  <Award className="w-3.5 h-3.5 text-blue-600" />
                  <span>{selectedTopic.cro} Technical Interview Question</span>
                </div>
                <p className="text-blue-950 font-sans italic text-xs leading-relaxed">
                  "{selectedTopic.interviewQuestion}"
                </p>
                <div className="text-[10px] text-blue-700 font-mono pt-0.5">
                  ★ {selectedTopic.interviewTip}
                </div>
              </div>

              {/* Learning Outcomes */}
              <div className="mt-3.5 space-y-1.5">
                <h4 className="text-[10.5px] font-mono font-bold uppercase text-[#081F38] tracking-wider">
                  Key Skills You Master
                </h4>
                <div className="space-y-1">
                  {selectedTopic.learningPoints.map((point) => (
                    <div key={point} className="flex items-start gap-1.5 text-xs text-slate-600 leading-snug">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer CTA */}
              <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-3">
                <div className="text-[10.5px] font-mono text-slate-500">
                  Tool: <strong className="text-[#081F38]">{selectedTopic.tool}</strong>
                </div>

                {onReserveClick && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedTopic(null);
                      onReserveClick();
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
                  >
                    <span>Reserve My Seat</span>
                    <ArrowRight className="w-3 h-3" />
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

function ModuleRow({
  topic,
  index,
  shouldReduceMotion,
  onSelect,
}: {
  topic: MasterclassTopic;
  index: number;
  shouldReduceMotion: boolean | null;
  onSelect: () => void;
}) {
  const Icon = topic.icon;

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{
        type: "spring",
        stiffness: 380,
        damping: 26,
        delay: shouldReduceMotion ? 0 : index * 0.04,
      }}
      whileHover={shouldReduceMotion ? {} : { x: 3, backgroundColor: "rgba(248, 250, 252, 0.95)" }}
      whileTap={shouldReduceMotion ? {} : { scale: 0.985 }}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      className="group relative px-3.5 py-3 sm:px-4 sm:py-3.5 transition-colors flex items-center justify-between gap-3 cursor-pointer text-left overflow-hidden"
    >
      <div className="flex items-center gap-3 min-w-0">
        {/* Step Index Badge with Subtle Micro Spring */}
        <motion.span
          whileHover={shouldReduceMotion ? {} : { scale: 1.08 }}
          transition={{ type: "spring", stiffness: 500, damping: 25 }}
          className="shrink-0 w-6 h-6 rounded-lg bg-slate-100 border border-slate-200/80 text-[10px] font-mono font-extrabold text-[#081F38] flex items-center justify-center shadow-2xs"
        >
          {topic.index}
        </motion.span>

        {/* Tinted Glyph with Soft Hover Scale */}
        <motion.div
          whileHover={shouldReduceMotion ? {} : { scale: 1.12, rotate: 2 }}
          transition={{ type: "spring", stiffness: 450, damping: 22 }}
          className="shrink-0 w-7 h-7 rounded-xl flex items-center justify-center border shadow-2xs"
          style={{
            backgroundColor: `${topic.accentColor}10`,
            borderColor: `${topic.accentColor}25`,
            color: topic.accentColor,
          }}
        >
          <Icon className="w-3.5 h-3.5" />
        </motion.div>

        {/* Title & 1-line Summary */}
        <div className="min-w-0 pr-1">
          <div className="flex items-center gap-2">
            <h3 className="text-xs sm:text-sm font-bold text-[#081F38] group-hover:text-blue-600 transition-colors truncate">
              {topic.title}
            </h3>
            <span className="hidden sm:inline-block px-1.5 py-0.2 rounded text-[9px] font-mono font-medium text-slate-500 bg-slate-100 border border-slate-200/60 shrink-0">
              {topic.tool}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 truncate leading-tight mt-0.5">
            {topic.summary}
          </p>
        </div>
      </div>

      {/* Right Indicator: CRO & Chevron with Spring Slide */}
      <div className="shrink-0 flex items-center gap-1.5 text-slate-400 group-hover:text-blue-600 transition-colors">
        <span className="hidden lg:inline text-[10px] font-mono text-slate-400">
          {topic.cro.split("&")[0].trim()}
        </span>
        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </div>
    </motion.div>
  );
}
