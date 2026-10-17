import { useState } from "react";
import { 
  Activity, 
  GitBranch, 
  Layers, 
  Briefcase, 
  HelpCircle, 
  Workflow, 
  Clock, 
  ShieldCheck, 
  Building2, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  CheckCircle2,
  Eye,
  FileCheck,
  Stethoscope,
  Scale
} from "lucide-react";

// The 5 Core Takeaways of the Masterclass with Homepage Accent Palette
const FIVE_OUTCOMES = [
  {
    num: "01",
    tag: "Patient Safety",
    title: "The Role Reality",
    desc: "What a Drug Safety Associate does daily across clinical trials and commercial medicines.",
    icon: Activity,
    accentLine: "from-[#2563EB] to-[#60A5FA]",
    badgeClass: "bg-[#EEF6FF] text-[#2563EB] border-[#BFDBFE]",
    iconBoxClass: "bg-[#2563EB] text-white shadow-2xs border border-[#2563EB]",
  },
  {
    num: "02",
    tag: "7-Stage Workflow",
    title: "The ICSR Pipeline",
    desc: "End-to-end case journey from Day-0 intake to standardized medical coding, QC, and submission.",
    icon: GitBranch,
    accentLine: "from-[#0284C7] to-[#38BDF8]",
    badgeClass: "bg-[#ECFEFF] text-[#0284C7] border-[#A5F3FC]",
    iconBoxClass: "bg-[#0284C7] text-white shadow-2xs border border-[#0284C7]",
  },
  {
    num: "03",
    tag: "Safety Systems",
    title: "Safety DB & Coding",
    desc: "Clinical safety database workflows, 5-tier medical terminology hierarchy, and product coding.",
    icon: Layers,
    accentLine: "from-[#7C3AED] to-[#A78BFA]",
    badgeClass: "bg-[#F5F3FF] text-[#7C3AED] border-[#DDD6FE]",
    iconBoxClass: "bg-[#7C3AED] text-white shadow-2xs border border-[#7C3AED]",
  },
  {
    num: "04",
    tag: "MNC Hiring",
    title: "Career Opportunities",
    desc: "Entry roles, CTC brackets, and what top employers look for in pharmacy graduates.",
    icon: Briefcase,
    accentLine: "from-[#10B981] to-[#34D399]",
    badgeClass: "bg-[#ECFDF5] text-[#059669] border-[#A7F3D0]",
    iconBoxClass: "bg-[#10B981] text-white shadow-2xs border border-[#10B981]",
  },
  {
    num: "05",
    tag: "Direct Access",
    title: "Live Faculty Q&A",
    desc: "Ask Mohamed Kumail Abbas direct questions on CV prep, interviews, and transition.",
    icon: HelpCircle,
    accentLine: "from-[#F59E0B] to-[#FBBF24]",
    badgeClass: "bg-[#FFFBEB] text-[#D97706] border-[#FDE68A]",
    iconBoxClass: "bg-[#F59E0B] text-white shadow-2xs border border-[#F59E0B]",
  },
];

// The 7-Stage ICSR Pipeline directly from Mohamed Kumail Abbas's live slide deck
const ICSR_PIPELINE = [
  {
    step: 1,
    short: "Receipt",
    name: "Case Receipt & Day-0 Trigger",
    timeline: "Day 0 Initial Clock",
    image: "/images/pv-case-triage.jpg",
    sop: "Adverse event arrives via spontaneous reports, clinical trials, or medical literature. The regulatory clock begins on Day 0 upon first receipt by any company employee.",
    lesson: "How Day-0 determination works in CROs and why missing this clock results in severe regulatory audit citations.",
    badge: "Clock Initiation",
  },
  {
    step: 2,
    short: "Triage",
    name: "Intake & 4 Minimum Criteria Triage",
    timeline: "Within 24 Hours",
    image: "/images/pv-case-triage.jpg",
    sop: "Verifies the 4 mandatory elements: (1) Identifiable Patient, (2) Identifiable Reporter, (3) Suspect Drug, (4) Adverse Event. Evaluates seriousness (death, hospitalization, disability).",
    lesson: "How triage specialists determine 15-day expedited reporting vs 90-day periodic safety updates in screening interviews.",
    badge: "Seriousness Filter",
  },
  {
    step: 3,
    short: "Data Entry",
    name: "Clinical Safety Database Capture",
    timeline: "Days 1 – 3",
    image: "/images/pv-workstation-realistic.jpg",
    sop: "Structured electronic entry of patient demographics, medical history, concurrent medications, dose schedules, laboratory findings, and dechallenge/rechallenge.",
    lesson: "Navigating clinical safety database tabs and avoiding the top data entry errors made by fresher associates.",
    badge: "Safety DB Entry",
  },
  {
    step: 4,
    short: "Coding",
    name: "Standardized Medical Terminology & Coding",
    timeline: "Days 3 – 5",
    image: "/images/pv-clinical-coding.jpg",
    sop: "Standardizing raw patient verbatims into the 5-level clinical terminology hierarchy: System Organ Class (SOC) down to Preferred Term (PT) and Lowest Level Term (LLT).",
    lesson: "How interviewers test your understanding of Preferred Terms (PT) versus Lowest Level Terms (LLT) in technical rounds.",
    badge: "Medical Coding",
  },
  {
    step: 5,
    short: "Narrative",
    name: "Safety Narrative Drafting",
    timeline: "Days 5 – 8",
    image: "/images/pv-regulatory-audit.jpg",
    sop: "Drafting an objective, chronological medical summary detailing patient timeline, symptom onset, therapy changes, and final clinical outcome.",
    lesson: "Writing audit-proof case narratives according to CIOMS guidelines without diagnostic speculation.",
    badge: "Medical Case Story",
  },
  {
    step: 6,
    short: "QC Audit",
    name: "Zero-Defect Quality Control Review",
    timeline: "Days 9 – 11",
    image: "/images/pv-regulatory-audit.jpg",
    sop: "Independent audit reconciling source documents against database fields, coding fidelity, and timeline compliance.",
    lesson: "Understanding QC checklists and how error rate metrics determine associate performance appraisal in MNCs.",
    badge: "Quality Audit",
  },
  {
    step: 7,
    short: "Submission",
    name: "Electronic Regulatory Submission",
    timeline: "Day 15 Expedited Gateway",
    image: "/images/pv-clinical-collaboration.jpg",
    sop: "ICH E2B(R3) XML electronic transmission to global health authorities including US FDA (MedWatch) and EMA (EudraVigilance).",
    lesson: "How global submission gateways operate and the statutory penalties for late pharmacovigilance reports.",
    badge: "Gateway Dispatch",
  },
];

// The 4 Core Pharmacovigilance Pillars from trainer slides
const FOUR_PILLARS = [
  { 
    title: "Detect Early", 
    tag: "Surveillance",
    desc: "Identify rare adverse drug reactions before widespread patient exposure.",
    icon: Eye,
    theme: {
      tagBg: "bg-[#EEF6FF]",
      tagText: "text-[#2563EB]",
      tagBorder: "border-[#BFDBFE]/70",
      iconBox: "bg-[#EEF6FF] text-[#2563EB] border-[#BFDBFE]/60 group-hover:bg-[#2563EB] group-hover:text-white group-hover:border-[#2563EB]",
    }
  },
  { 
    title: "Reduce Errors", 
    tag: "Safety Audits",
    desc: "Flag dosing discrepancies, contraindications & drug-drug interactions.",
    icon: FileCheck,
    theme: {
      tagBg: "bg-[#F0F9FF]",
      tagText: "text-[#0284C7]",
      tagBorder: "border-[#BAE6FD]/70",
      iconBox: "bg-[#F0F9FF] text-[#0284C7] border-[#BAE6FD]/60 group-hover:bg-[#0284C7] group-hover:text-white group-hover:border-[#0284C7]",
    }
  },
  { 
    title: "Patient Trust", 
    tag: "Commercial Care",
    desc: "Continuous post-market monitoring of approved commercial medicines.",
    icon: Stethoscope,
    theme: {
      tagBg: "bg-[#F5F3FF]",
      tagText: "text-[#7C3AED]",
      tagBorder: "border-[#DDD6FE]/70",
      iconBox: "bg-[#F5F3FF] text-[#7C3AED] border-[#DDD6FE]/60 group-hover:bg-[#7C3AED] group-hover:text-white group-hover:border-[#7C3AED]",
    }
  },
  { 
    title: "Regulatory Fit", 
    tag: "Compliance",
    desc: "Strict adherence to US FDA 21 CFR 314.80, EMA GVP & CDSCO mandates.",
    icon: Scale,
    theme: {
      tagBg: "bg-[#ECFDF5]",
      tagText: "text-[#059669]",
      tagBorder: "border-[#A7F3D0]/70",
      iconBox: "bg-[#ECFDF5] text-[#059669] border-[#A7F3D0]/60 group-hover:bg-[#10B981] group-hover:text-white group-hover:border-[#10B981]",
    }
  },
];

// Top Hiring Employers from trainer slides with distinctive brand styling
const TOP_EMPLOYERS = [
  { 
    name: "IQVIA", 
    tag: "Global Clinical CRO", 
    monogram: "IQ",
    monoBg: "bg-[#0070BA] text-white",
    tier: "Tier-1 CRO"
  },
  { 
    name: "Accenture", 
    tag: "Healthcare GCC", 
    monogram: ">", 
    monoBg: "bg-[#A100FF] text-white font-black",
    tier: "Global GCC"
  },
  { 
    name: "Cognizant", 
    tag: "Drug Safety Operations", 
    monogram: "CTS", 
    monoBg: "bg-[#0033A0] text-white",
    tier: "Enterprise PV"
  },
  { 
    name: "TCS", 
    tag: "Enterprise Life Sciences", 
    monogram: "TCS", 
    monoBg: "bg-[#1E293B] text-white",
    tier: "Pharma Tech"
  },
  { 
    name: "Pfizer", 
    tag: "Global Sponsor Hub", 
    monogram: "PFE", 
    monoBg: "bg-[#0000FF] text-white",
    tier: "Sponsor Hub"
  },
  { 
    name: "Novartis", 
    tag: "Commercial Safety Center", 
    monogram: "NVS", 
    monoBg: "bg-[#E54823] text-white",
    tier: "Biopharma"
  },
];

// Target Job Roles from trainer slides
const TARGET_ROLES = [
  "PV Associate",
  "Drug Safety Associate",
  "Case Processor",
  "Medical Reviewer",
  "Signal Detection Specialist",
];

export function MasterclassWalkaway() {
  const [activeStep, setActiveStep] = useState(1); // Default to Step 2: Triage
  const currentStep = ICSR_PIPELINE[activeStep];

  return (
    <section id="outcomes" className="py-16 sm:py-24 border-b border-[#E4EAF2] bg-[#F8FAFC]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: Apple Typography + Arzon Gradient Accent */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-blue-200/80 bg-blue-50/80 text-blue-700 font-mono text-xs font-semibold uppercase tracking-wider mb-3 shadow-2xs">
            <Workflow className="w-3.5 h-3.5 text-blue-600" />
            <span>02 · WHAT YOU'LL WALK AWAY WITH</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-bold text-[#081F38] tracking-[-0.03em] leading-tight">
            Understand the enterprise workflow{" "}
            <span className="bg-gradient-to-r from-[#2563EB] via-[#0284C7] to-[#7C3AED] bg-clip-text text-transparent [box-decoration-break:clone]">
              before you choose the career.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 font-sans leading-relaxed max-w-2xl mx-auto">
            Direct from enterprise drug safety practice. Inspect the exact 7-stage case processing pipeline, software tools, and hiring expectations used across global pharma.
          </p>
        </div>

        {/* Part 1: The 5 Core Masterclass Takeaways (Apple 3+2 Bento Layout with Homepage Accent Lines) */}
        <div className="space-y-4 mb-12">
          {/* Top Row: 3 Core Foundations */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {FIVE_OUTCOMES.slice(0, 3).map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.num}
                  className="relative overflow-hidden p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-white border border-[#E2E8F0] shadow-xs md:hover:shadow-md md:hover:border-blue-400 transition-all duration-200 tone-light card-light flex flex-col justify-between cursor-default select-none"
                >
                  {/* Top Micro Accent Line */}
                  <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${item.accentLine}`} />

                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className={`font-mono text-xs font-bold px-2.5 py-1 rounded-lg border ${item.badgeClass}`}>
                        {item.num}
                      </span>
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-2xs ${item.iconBoxClass}`}>
                        <Icon className="w-5 h-5 stroke-[2.2]" />
                      </div>
                    </div>

                    <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#2563EB] mb-1.5">
                      {item.tag}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-[#081F38] leading-snug mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-[13.5px] text-slate-600 leading-relaxed font-sans">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Row: 2 Wide Action Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {FIVE_OUTCOMES.slice(3, 5).map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.num}
                  className="relative overflow-hidden p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-white border border-[#E2E8F0] shadow-xs md:hover:shadow-md md:hover:border-blue-400 transition-all duration-200 tone-light card-light flex flex-col justify-between cursor-default select-none"
                >
                  {/* Top Micro Accent Line */}
                  <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${item.accentLine}`} />

                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className={`font-mono text-xs font-bold px-2.5 py-1 rounded-lg border ${item.badgeClass}`}>
                        {item.num}
                      </span>
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-2xs ${item.iconBoxClass}`}>
                        <Icon className="w-5 h-5 stroke-[2.2]" />
                      </div>
                    </div>

                    <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#2563EB] mb-1.5">
                      {item.tag}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-[#081F38] leading-snug mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-[13.5px] text-slate-600 leading-relaxed font-sans">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Part 2: The Core Hero Feature — 7-Stage ICSR Pipeline (Minimal Apple Stepper & Peak Detailing) */}
        <div className="rounded-2xl sm:rounded-3xl bg-white border border-[#E2E8F0] shadow-[0_4px_24px_rgba(0,0,0,0.03)] tone-light card-light p-4 sm:p-9 mb-8">
          
          {/* Stepper Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 sm:pb-6 mb-5 sm:mb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#10B981] motion-safe:animate-pulse" />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#2563EB] font-sans">
                  The 7-Stage ICSR Enterprise Pipeline
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#081F38] mt-1">
                Adverse Event Lifecycle
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5 font-sans">
                Follow an adverse drug reaction from initial hospital intake to global health authority transmission.
              </p>
            </div>
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EEF6FF] border border-[#BFDBFE] text-xs font-mono text-[#1D4ED8] font-semibold shrink-0 self-start sm:self-auto shadow-2xs">
              <Clock className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>Step 0{currentStep.step} of 07</span>
            </div>
          </div>

          {/* Apple Segmented Control (Smooth Clickable Capsule Bar with Mobile Touch Carousel) */}
          <div className="bg-slate-100/90 p-1 sm:p-1.5 rounded-2xl flex items-center gap-1.5 overflow-x-auto no-scrollbar mb-5 sm:mb-6 -mx-2 px-2 sm:mx-0 sm:px-1.5 snap-x">
            {ICSR_PIPELINE.map((st, idx) => {
              const isActive = idx === activeStep;
              return (
                <button
                  key={st.step}
                  type="button"
                  onClick={() => setActiveStep(idx)}
                  className={`flex-1 min-w-[96px] sm:min-w-[104px] py-2 sm:py-2.5 px-2.5 sm:px-3 rounded-xl text-left transition-all cursor-pointer flex items-center justify-between gap-1.5 snap-start shrink-0 min-h-[44px] ${
                    isActive
                      ? "bg-[#2563EB] text-white shadow-sm ring-1 ring-[#2563EB]"
                      : "text-slate-600 hover:text-[#2563EB] hover:bg-white"
                  }`}
                >
                  <span className={`text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded-md ${
                    isActive ? "bg-white/20 text-white" : "bg-slate-200/70 text-slate-600"
                  }`}>
                    0{st.step}
                  </span>
                  <span className="text-xs font-semibold truncate flex-1 text-center">
                    {st.short}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Stage Deep-Dive Card (Peak Apple Detailing with Top Accent Gradient) */}
          <div className="relative overflow-hidden p-4 sm:p-7 rounded-2xl sm:rounded-3xl bg-slate-50/70 border border-slate-200/70 text-left">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#2563EB] via-[#0284C7] to-[#7C3AED]" />

            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#EEF6FF] text-[#2563EB] font-mono text-[11px] font-semibold border border-[#BFDBFE]">
                  {currentStep.badge}
                </span>
                <span className="text-slate-300">·</span>
                <span className="text-xs font-mono text-slate-500">
                  Regulatory Clock: <strong className="text-slate-800 font-semibold">{currentStep.timeline}</strong>
                </span>
              </div>
            </div>

            <h4 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#081F38] mb-4 sm:mb-5">
              {currentStep.name}
            </h4>

            {/* Apple 2-Column Spec Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch mb-2">
              {/* Left: Stage Visual View */}
              <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-black/[0.08] shadow-sm relative aspect-[16/10] lg:aspect-auto min-h-[190px] sm:min-h-[220px]">
                <img
                  src={currentStep.image}
                  alt={currentStep.name}
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-3.5 bg-gradient-to-t from-black/75 via-black/30 to-transparent flex items-center justify-between text-white backdrop-blur-[1px]">
                  <span className="text-xs font-medium">Stage 0{currentStep.step} Operational View</span>
                  <span className="text-[10px] font-mono text-white/70">Case Walkthrough</span>
                </div>
              </div>

              {/* Right: Enterprise SOP Standard & Mohamed Kumail Takeaway */}
              <div className="lg:col-span-7 flex flex-col justify-between gap-3 sm:gap-3.5">
                <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-[#E2E8F0] tone-light card-light flex-1 shadow-2xs">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold mb-1.5">
                    Enterprise SOP Standard:
                  </div>
                  <p className="text-xs sm:text-[13.5px] text-slate-700 leading-relaxed font-sans">
                    {currentStep.sop}
                  </p>
                </div>

                <div className="p-3.5 sm:p-5 rounded-2xl bg-[#EEF6FF]/70 border border-[#BFDBFE]/80 flex-1 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-[#2563EB] font-bold mb-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
                    <span>What Mohamed Kumail Abbas Teaches You:</span>
                  </div>
                  <p className="text-xs sm:text-[13.5px] text-[#081F38] leading-relaxed font-sans font-medium">
                    {currentStep.lesson}
                  </p>
                </div>
              </div>
            </div>

            {/* Apple Minimalist Prev / Next Navigation Controls */}
            <div className="flex items-center justify-between pt-4 sm:pt-5 mt-4 sm:mt-5 border-t border-slate-200/70">
              <button
                type="button"
                onClick={() => setActiveStep((prev) => (prev > 0 ? prev - 1 : ICSR_PIPELINE.length - 1))}
                className="w-10 h-10 sm:w-9 sm:h-9 rounded-full border border-slate-200 bg-white card-light hover:bg-[#EEF6FF] hover:border-[#BFDBFE] flex items-center justify-center text-slate-600 hover:text-[#2563EB] transition-colors cursor-pointer shadow-2xs"
                aria-label="Previous Stage"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-1.5">
                {ICSR_PIPELINE.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveStep(i)}
                    aria-label={`Jump to stage ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      i === activeStep ? "w-6 bg-[#2563EB]" : "w-1.5 bg-slate-300 hover:bg-[#2563EB]/40"
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => setActiveStep((prev) => (prev < ICSR_PIPELINE.length - 1 ? prev + 1 : 0))}
                className="w-10 h-10 sm:w-9 sm:h-9 rounded-full border border-slate-200 bg-white card-light hover:bg-[#EEF6FF] hover:border-[#BFDBFE] flex items-center justify-center text-slate-600 hover:text-[#2563EB] transition-colors cursor-pointer shadow-2xs"
                aria-label="Next Stage"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Part 3: Two Supporting Bento Panels — Apple Minimalist Detailing */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          
          {/* Card A: 4 Core Pharmacovigilance Pillars */}
          <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-white border border-[#E2E8F0] shadow-[0_4px_24px_rgba(0,0,0,0.03)] tone-light card-light flex flex-col justify-between relative overflow-hidden">
            {/* Apple top micro-accent line */}
            <div aria-hidden="true" className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-[#2563EB] to-[#60A5FA]" />

            <div>
              {/* Eyebrow Header */}
              <div className="flex items-center justify-between gap-2 mb-4 pb-3.5 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#EEF6FF] text-[#2563EB] flex items-center justify-center border border-[#BFDBFE]/60 shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#081F38]">
                    Why Pharmacovigilance Matters
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5 text-[10.5px] font-mono text-[#059669] bg-[#ECFDF5] border border-[#A7F3D0] px-3 py-1 rounded-full font-bold shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] motion-safe:animate-pulse" />
                  Patient Safety
                </span>
              </div>

              <p className="text-xs sm:text-[13px] text-slate-500 font-sans leading-relaxed mb-4">
                Four statutory clinical mandates that make Drug Safety an essential, recession-proof division in global life sciences.
              </p>

              {/* 4 Pillars in Apple Micro-Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {FOUR_PILLARS.map((p, idx) => {
                  const IconComponent = p.icon;
                  return (
                    <div 
                      key={idx} 
                      className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#F8FAFC]/90 border border-[#E2E8F0] md:hover:bg-white md:hover:border-[#BFDBFE] md:hover:shadow-xs transition-all duration-200 flex flex-col justify-between tone-light card-light cursor-default select-none"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2.5">
                          <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${p.theme.tagBg} ${p.theme.tagText} ${p.theme.tagBorder}`}>
                            {p.tag}
                          </span>
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center border ${p.theme.iconBox}`}>
                            <IconComponent className="w-3.5 h-3.5" />
                          </div>
                        </div>
                        <div className="font-bold text-sm text-[#081F38] mb-1.5">
                          {p.title}
                        </div>
                        <div className="text-xs text-slate-600 leading-relaxed font-sans">
                          {p.desc}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Compliance Footnote */}
            <div className="mt-6 pt-3.5 border-t border-slate-100 flex items-center gap-2 text-[11px] text-slate-500 font-sans">
              <Scale className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
              <span>Mandatory compliance governed under US FDA 21 CFR 314.80 &amp; EMA Good Vigilance Practice (GVP).</span>
            </div>
          </div>

          {/* Card B: Target Roles & Top Hiring Employers */}
          <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-white border border-[#E2E8F0] shadow-[0_4px_24px_rgba(0,0,0,0.03)] tone-light card-light flex flex-col justify-between relative overflow-hidden">
            {/* Apple top micro-accent line */}
            <div aria-hidden="true" className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-[#0284C7] via-[#2563EB] to-[#7C3AED]" />

            <div>
              {/* Eyebrow Header */}
              <div className="flex items-center justify-between gap-2 mb-4 pb-3.5 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#EEF6FF] text-[#2563EB] flex items-center justify-center border border-[#BFDBFE]/60 shrink-0">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#081F38]">
                    Actively Recruiting Employers
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5 text-[10.5px] font-mono text-[#1D4ED8] bg-[#EEF6FF] border border-[#BFDBFE] px-3 py-1 rounded-full font-bold shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                  Enterprise Tier
                </span>
              </div>

              <p className="text-xs sm:text-[13px] text-slate-500 font-sans leading-relaxed mb-4">
                Global CROs and pharmaceutical sponsors continuously absorbing life sciences graduates across Indian GCCs.
              </p>

              {/* Employer Tiles with Distinctive Brand Monograms & Zero Truncation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-5">
                {TOP_EMPLOYERS.map((emp) => (
                  <div
                    key={emp.name}
                    className="p-3 rounded-2xl bg-[#F8FAFC]/90 border border-[#E2E8F0] hover:bg-white hover:border-[#BFDBFE] hover:shadow-xs transition-all duration-200 flex items-center justify-between gap-2.5 group tone-light card-light"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-mono text-[11px] font-bold shrink-0 shadow-2xs border border-white/20 ${emp.monoBg}`}>
                        {emp.monogram}
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-xs sm:text-[13px] text-[#081F38] group-hover:text-[#2563EB] transition-colors truncate">
                          {emp.name}
                        </div>
                        <div className="text-[11px] text-slate-500 font-sans truncate">
                          {emp.tag}
                        </div>
                      </div>
                    </div>
                    <span className="text-[9.5px] font-mono font-semibold uppercase px-2 py-0.5 rounded-md bg-white card-light border border-slate-200/80 text-slate-500 shrink-0">
                      {emp.tier}
                    </span>
                  </div>
                ))}
              </div>

              {/* Target Job Roles */}
              <div className="pt-2">
                <div className="flex items-center gap-1.5 text-[10.5px] font-mono uppercase tracking-wider text-slate-600 mb-2.5 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                  <span>Primary Roles Covered in Masterclass:</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {TARGET_ROLES.map((role) => (
                    <span
                      key={role}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F8FAFC] hover:bg-[#EEF6FF] border border-[#E2E8F0] hover:border-[#BFDBFE] text-xs font-semibold text-slate-700 hover:text-[#2563EB] transition-all shadow-2xs group cursor-default tone-light card-light"
                    >
                      <Check className="w-3.5 h-3.5 text-[#10B981] group-hover:scale-110 transition-transform" />
                      <span>{role}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Market Intelligence Footnote */}
            <div className="mt-6 pt-3.5 border-t border-slate-100 text-[11px] text-slate-500 font-sans leading-relaxed">
              <strong className="font-semibold text-slate-700">Market Reference:</strong> 12,000+ entry openings across Indian GCCs. Company names and trademarks are property of their respective holders and referenced strictly under nominative fair use for public hiring intelligence; no direct affiliation or endorsement implied.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
