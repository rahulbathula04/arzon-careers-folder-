import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { 
  HelpCircle, 
  GraduationCap, 
  BookOpen, 
  Compass, 
  Briefcase, 
  ArrowRight, 
  CheckCircle2, 
  RotateCcw, 
  Sparkles, 
  Building2, 
  ShieldCheck, 
  Layers,
  Award,
  ChevronRight,
  FileCheck
} from "lucide-react";
import { getDiagnosticRecommendation, RoleDiagnosticNode } from "@/data/knowledgeGraphDataset";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";

export function StudentProblemSolverWizard() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedProblem, setSelectedProblem] = useState<string>("career-choice");
  const [selectedStage, setSelectedStage] = useState<string>("4th-year");
  const [selectedDegree, setSelectedDegree] = useState<string>("bpharm");
  const [selectedInterest, setSelectedInterest] = useState<string>("auto");

  // Options configuration
  const PROBLEMS = [
    {
      id: "career-choice",
      title: "I don't know what career options exist",
      desc: "I want to explore entry-level healthcare & life science roles suited for my degree.",
      badge: "EXPLORATION"
    },
    {
      id: "skill-gap",
      title: "I know the career but don't know what to learn",
      desc: "I need to know exact software tools and coding guidelines required by employers.",
      badge: "COMPETENCY GAP"
    },
    {
      id: "practical-exp",
      title: "I need practical software & project experience",
      desc: "I have textbook knowledge but lack hands-on experience on industry software.",
      badge: "HANDS-ON NEED"
    },
    {
      id: "internship",
      title: "I need an applied internship deliverable",
      desc: "I need a verifiable ISO 9001 internship credential to strengthen my resume.",
      badge: "INTERNSHIP NEED"
    },
    {
      id: "post-grad-prep",
      title: "I graduated and need to prepare fast",
      desc: "I completed my degree and want to eliminate post-graduation job search delay.",
      badge: "FAST-TRACK NEED"
    }
  ];

  const STAGES = [
    { id: "1st-2nd-year", label: "1st or 2nd Year Student", note: "Early exploration window" },
    { id: "3rd-year", label: "3rd Year Student", note: "12-month advance preparation" },
    { id: "4th-year", label: "4th / Final Year Student", note: "Pre-graduation role readiness" },
    { id: "graduated", label: "Recent Graduate", note: "Immediate fast-track preparation" }
  ];

  const DEGREES = [
    { id: "bpharm", label: "B.Pharm / Pharm.D", note: "Pharmacology & Therapeutics" },
    { id: "msc", label: "B.Sc / M.Sc Life Sciences", note: "Microbiology, Biochemistry, Biotech" },
    { id: "tech", label: "B.Tech / BE (Biotech / CS)", note: "Data, Coding & Systems" },
    { id: "other", label: "Other Science / Healthcare", note: "General Life Sciences" }
  ];

  const INTERESTS = [
    { id: "pv", label: "Drug Safety & Pharmacovigilance", desc: "ICSR processing, Argus Safety, MedDRA coding" },
    { id: "cdm", label: "Clinical Data Management", desc: "Medidata RAVE, eCRFs, query management" },
    { id: "coding", label: "Medical Coding & Chart Auditing", desc: "ICD-10-CM 2026, CPT, EncoderPro, RCM" },
    { id: "analytics", label: "Clinical SAS & Data Analytics", desc: "SAS Studio, PROC SQL, CDISC SDTM mapping" },
    { id: "auto", label: "Help Me Choose (Based on Market Demand)", desc: "Diagnose best fit based on my background" }
  ];

  const diagnosticResult: RoleDiagnosticNode = getDiagnosticRecommendation(
    selectedProblem,
    selectedStage,
    selectedDegree,
    selectedInterest
  );

  const getStageLabel = (id: string) => STAGES.find(s => s.id === id)?.label || id;
  const getDegreeLabel = (id: string) => DEGREES.find(d => d.id === id)?.label || id;
  const getProblemLabel = (id: string) => PROBLEMS.find(p => p.id === id)?.title || id;

  const resetWizard = () => {
    setCurrentStep(1);
  };

  return (
    <section id="problem-solver-wizard" className="py-12 sm:py-20 bg-[#FAF9F6] border-b border-stone-200 relative overflow-hidden">
      {/* Subtle Ambient Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#1B3F8B_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        {/* Header Title */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#1B3F8B] font-mono text-xs font-bold uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5" />
            <span>DIAGNOSTIC PROBLEM SOLVER ENGINE</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-stone-900 tracking-tight leading-tight">
            What Are You Trying to Solve Right Now?
          </h2>

          <p className="text-sm sm:text-base text-stone-700 font-sans leading-relaxed">
            Answer 4 quick diagnostic questions to generate your personalized role pathway, employer requirement breakdown, and applied internship options.
          </p>
        </div>

        {/* Step Indicator Bar */}
        <div className="max-w-xl mx-auto bg-stone-100 p-1.5 rounded-full border border-stone-200 flex items-center justify-between font-mono text-xs text-stone-600">
          {[1, 2, 3, 4, 5].map((step) => {
            const isActive = currentStep === step;
            const isDone = currentStep > step;
            return (
              <button
                key={step}
                onClick={() => step < currentStep && setCurrentStep(step)}
                disabled={step > currentStep}
                className={`flex-1 py-1.5 px-2 rounded-full text-center transition-all flex items-center justify-center gap-1.5 ${
                  isActive
                    ? "bg-[#1B3F8B] text-white font-bold shadow-sm"
                    : isDone
                    ? "bg-stone-200 text-stone-800 font-semibold cursor-pointer"
                    : "text-stone-400 cursor-not-allowed"
                }`}
              >
                <span>Step {step}</span>
                {step === 5 && <span>(Result)</span>}
              </button>
            );
          })}
        </div>

        {/* STEP 1: CORE PROBLEM */}
        {currentStep === 1 && (
          <div className="max-w-3xl mx-auto rounded-3xl border border-stone-300 bg-white tone-light p-6 sm:p-8 space-y-6 shadow-md">
            <div className="space-y-1">
              <span className="font-mono text-xs font-bold text-[#1B3F8B] uppercase tracking-wider">
                QUESTION 1 OF 4
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                What is your primary challenge or objective today?
              </h3>
            </div>

            <div className="space-y-3">
              {PROBLEMS.map((prob) => {
                const isSelected = selectedProblem === prob.id;
                return (
                  <button
                    key={prob.id}
                    onClick={() => setSelectedProblem(prob.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start justify-between gap-4 ${
                      isSelected
                        ? "border-[#1B3F8B] bg-blue-50/60 ring-2 ring-[#1B3F8B]/20"
                        : "border-stone-200 hover:border-stone-300 bg-stone-50/50 hover:bg-stone-50"
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-serif text-base font-bold text-stone-900">{prob.title}</span>
                        <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-stone-200 text-stone-700">
                          {prob.badge}
                        </span>
                      </div>
                      <p className="text-xs text-stone-600 font-sans">{prob.desc}</p>
                    </div>

                    <div className={`h-5 w-5 rounded-full border flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      isSelected ? "border-[#1B3F8B] bg-[#1B3F8B] text-white" : "border-stone-300 bg-white"
                    }`}>
                      {isSelected && <CheckCircle2 className="h-3.5 w-3.5" />}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setCurrentStep(2)}
                className="inline-flex items-center gap-2 bg-[#1B3F8B] hover:bg-[#153270] text-white font-mono text-xs font-bold px-6 py-3 rounded-xl transition-colors shadow-sm"
              >
                <span>Continue to Step 2</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: ACADEMIC STAGE */}
        {currentStep === 2 && (
          <div className="max-w-3xl mx-auto rounded-3xl border border-stone-300 bg-white tone-light p-6 sm:p-8 space-y-6 shadow-md">
            <div className="space-y-1">
              <span className="font-mono text-xs font-bold text-[#1B3F8B] uppercase tracking-wider">
                QUESTION 2 OF 4
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                Where are you in your academic timeline?
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {STAGES.map((stg) => {
                const isSelected = selectedStage === stg.id;
                return (
                  <button
                    key={stg.id}
                    onClick={() => setSelectedStage(stg.id)}
                    className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                      isSelected
                        ? "border-[#1B3F8B] bg-blue-50/60 ring-2 ring-[#1B3F8B]/20"
                        : "border-stone-200 hover:border-stone-300 bg-stone-50/50 hover:bg-stone-50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-base font-bold text-stone-900">{stg.label}</span>
                      <div className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                        isSelected ? "border-[#1B3F8B] bg-[#1B3F8B] text-white" : "border-stone-300"
                      }`}>
                        {isSelected && <CheckCircle2 className="h-3 w-3" />}
                      </div>
                    </div>
                    <p className="text-xs font-mono text-stone-500">{stg.note}</p>
                  </button>
                );
              })}
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={() => setCurrentStep(1)}
                className="text-xs font-mono font-bold text-stone-600 hover:text-stone-900"
              >
                ← Back
              </button>
              <button
                onClick={() => setCurrentStep(3)}
                className="inline-flex items-center gap-2 bg-[#1B3F8B] hover:bg-[#153270] text-white font-mono text-xs font-bold px-6 py-3 rounded-xl transition-colors shadow-sm"
              >
                <span>Continue to Step 3</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: DEGREE BACKGROUND */}
        {currentStep === 3 && (
          <div className="max-w-3xl mx-auto rounded-3xl border border-stone-300 bg-white tone-light p-6 sm:p-8 space-y-6 shadow-md">
            <div className="space-y-1">
              <span className="font-mono text-xs font-bold text-[#1B3F8B] uppercase tracking-wider">
                QUESTION 3 OF 4
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                What is your academic degree background?
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {DEGREES.map((deg) => {
                const isSelected = selectedDegree === deg.id;
                return (
                  <button
                    key={deg.id}
                    onClick={() => setSelectedDegree(deg.id)}
                    className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                      isSelected
                        ? "border-[#1B3F8B] bg-blue-50/60 ring-2 ring-[#1B3F8B]/20"
                        : "border-stone-200 hover:border-stone-300 bg-stone-50/50 hover:bg-stone-50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-base font-bold text-stone-900">{deg.label}</span>
                      <div className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                        isSelected ? "border-[#1B3F8B] bg-[#1B3F8B] text-white" : "border-stone-300"
                      }`}>
                        {isSelected && <CheckCircle2 className="h-3 w-3" />}
                      </div>
                    </div>
                    <p className="text-xs font-mono text-stone-500">{deg.note}</p>
                  </button>
                );
              })}
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={() => setCurrentStep(2)}
                className="text-xs font-mono font-bold text-stone-600 hover:text-stone-900"
              >
                ← Back
              </button>
              <button
                onClick={() => setCurrentStep(4)}
                className="inline-flex items-center gap-2 bg-[#1B3F8B] hover:bg-[#153270] text-white font-mono text-xs font-bold px-6 py-3 rounded-xl transition-colors shadow-sm"
              >
                <span>Continue to Step 4</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: CAREER INTEREST / GOAL */}
        {currentStep === 4 && (
          <div className="max-w-3xl mx-auto rounded-3xl border border-stone-300 bg-white tone-light p-6 sm:p-8 space-y-6 shadow-md">
            <div className="space-y-1">
              <span className="font-mono text-xs font-bold text-[#1B3F8B] uppercase tracking-wider">
                QUESTION 4 OF 4
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                Which career domain interests you most?
              </h3>
            </div>

            <div className="space-y-3">
              {INTERESTS.map((intr) => {
                const isSelected = selectedInterest === intr.id;
                return (
                  <button
                    key={intr.id}
                    onClick={() => setSelectedInterest(intr.id)}
                    className={`w-full p-4 rounded-2xl border text-left transition-all flex items-start justify-between gap-4 ${
                      isSelected
                        ? "border-[#1B3F8B] bg-blue-50/60 ring-2 ring-[#1B3F8B]/20"
                        : "border-stone-200 hover:border-stone-300 bg-stone-50/50 hover:bg-stone-50"
                    }`}
                  >
                    <div className="space-y-1">
                      <span className="font-serif text-base font-bold text-stone-900 block">{intr.label}</span>
                      <p className="text-xs text-stone-600 font-sans">{intr.desc}</p>
                    </div>

                    <div className={`h-5 w-5 rounded-full border flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      isSelected ? "border-[#1B3F8B] bg-[#1B3F8B] text-white" : "border-stone-300"
                    }`}>
                      {isSelected && <CheckCircle2 className="h-3.5 w-3.5" />}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={() => setCurrentStep(3)}
                className="text-xs font-mono font-bold text-stone-600 hover:text-stone-900"
              >
                ← Back
              </button>
              <button
                onClick={() => setCurrentStep(5)}
                className="inline-flex items-center gap-2 bg-[#1B3F8B] hover:bg-[#153270] text-white font-mono text-xs font-bold px-7 py-3 rounded-xl transition-colors shadow-md"
              >
                <span>Generate Diagnosis & Next Step</span>
                <Sparkles className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: DIAGNOSTIC RESULT ("YOUR NEXT STEP") */}
        {currentStep === 5 && diagnosticResult && (
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Diagnostic Summary Header */}
            <div className="rounded-3xl border border-stone-300 bg-white tone-light p-6 sm:p-8 space-y-4 shadow-lg">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-4">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#1B3F8B]">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>DIAGNOSTIC RECOMMENDATION COMPLETE</span>
                </div>
                <button
                  onClick={resetWizard}
                  className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-stone-600 hover:text-stone-900"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Change Inputs</span>
                </button>
              </div>

              <div className="space-y-2">
                <span className="font-mono text-xs text-stone-500 uppercase tracking-wider block">
                  Diagnostic Profile: {getStageLabel(selectedStage)} · {getDegreeLabel(selectedDegree)}
                </span>
                <h3 className="font-serif text-2xl sm:text-4xl font-bold text-stone-900 leading-tight">
                  Recommended Target Role:{" "}
                  <AnimatedGradientText className="font-serif italic font-bold">
                    {diagnosticResult.roleTitle}
                  </AnimatedGradientText>
                </h3>
                <p className="text-sm text-stone-700 font-sans leading-relaxed">
                  {diagnosticResult.shortDesc}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs">
                <span className="px-3 py-1 rounded bg-stone-100 border border-stone-200 text-stone-800 font-bold">
                  Indicative Entry CTC: {diagnosticResult.employerRequirements.entrySalaryRange}
                </span>
                <span className="px-3 py-1 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold">
                  ISO 9001 Verifiable Credential Attached
                </span>
              </div>
            </div>

            {/* 3-Layer Diagnostic Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Layer A: Industry Requirement */}
              <div className="rounded-3xl border border-stone-300 bg-white tone-light p-6 space-y-4 shadow-sm flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-[#1B3F8B]" />
                    <span className="font-mono text-xs font-bold text-[#1B3F8B] uppercase">
                      1. What Employers Ask For
                    </span>
                  </div>

                  <h4 className="font-serif text-lg font-bold text-stone-900">Industry JDs & Skills</h4>

                  <div className="space-y-2">
                    <span className="font-mono text-[11px] font-bold text-stone-500 block uppercase">
                      Software Tools Demanded:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {diagnosticResult.employerRequirements.industryTools.map((t, idx) => (
                        <span key={idx} className="font-mono text-[11px] px-2 py-0.5 rounded bg-stone-100 border border-stone-200 text-stone-800 font-bold">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <span className="font-mono text-[11px] font-bold text-stone-500 block uppercase">
                      Core Responsibilities:
                    </span>
                    <ul className="space-y-1 text-xs text-stone-700">
                      {diagnosticResult.employerRequirements.responsibilities.slice(0, 3).map((r, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-[#1B3F8B] font-bold">•</span>
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-100">
                  <Link
                    to="/roles/$slug"
                    params={{ slug: diagnosticResult.roleSlug }}
                    className="inline-flex items-center gap-1 font-mono text-xs font-bold text-[#1B3F8B] hover:underline"
                  >
                    <span>View Role Taxonomy →</span>
                  </Link>
                </div>
              </div>

              {/* Layer B: Arzon Curriculum */}
              <div className="rounded-3xl border border-stone-300 bg-white tone-light p-6 space-y-4 shadow-sm flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-[#1B3F8B]" />
                    <span className="font-mono text-xs font-bold text-[#1B3F8B] uppercase">
                      2. What Arzon Teaches
                    </span>
                  </div>

                  <h4 className="font-serif text-lg font-bold text-stone-900">{diagnosticResult.arzonCurriculum.trackName}</h4>

                  <div className="space-y-2">
                    <span className="font-mono text-[11px] font-bold text-stone-500 block uppercase">
                      Software Taught Hands-On:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {diagnosticResult.arzonCurriculum.softwareTaught.map((s, idx) => (
                        <span key={idx} className="font-mono text-[11px] px-2 py-0.5 rounded bg-blue-50 border border-blue-200 text-[#1B3F8B] font-bold">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <span className="font-mono text-[11px] font-bold text-stone-500 block uppercase">
                      12-Week Modules:
                    </span>
                    <ul className="space-y-1 text-xs text-stone-700">
                      {diagnosticResult.arzonCurriculum.keyModules.slice(0, 3).map((m, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-[#1B3F8B] font-bold">•</span>
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-100">
                  <Link
                    to="/training"
                    className="inline-flex items-center gap-1 font-mono text-xs font-bold text-[#1B3F8B] hover:underline"
                  >
                    <span>View 12-Week Training →</span>
                  </Link>
                </div>
              </div>

              {/* Layer C: Applied Internship */}
              <div className="rounded-3xl border border-stone-300 bg-white tone-light p-6 space-y-4 shadow-sm flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-[#1B3F8B]" />
                    <span className="font-mono text-xs font-bold text-[#1B3F8B] uppercase">
                      3. Applied Internship
                    </span>
                  </div>

                  <h4 className="font-serif text-lg font-bold text-stone-900">{diagnosticResult.appliedInternship.internshipTitle}</h4>

                  <div className="space-y-1.5">
                    <span className="font-mono text-[11px] font-bold text-stone-500 block uppercase">
                      Capstone Deliverables:
                    </span>
                    <ul className="space-y-1 text-xs text-stone-700">
                      {diagnosticResult.appliedInternship.deliverables.map((d, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-1">
                    <span className="font-mono text-[10px] font-bold px-2 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 inline-block">
                      {diagnosticResult.appliedInternship.credentialType}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-100">
                  <Link
                    to="/internships"
                    className="inline-flex items-center gap-1 font-mono text-xs font-bold text-[#1B3F8B] hover:underline"
                  >
                    <span>Explore Applied Internships →</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* YOUR NEXT STEP CTA BANNER */}
            <div className="rounded-3xl bg-gradient-to-br from-[#1B3F8B] to-[#0F2860] text-white p-6 sm:p-8 space-y-4 shadow-xl">
              <div className="space-y-2">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-blue-200 block">
                  YOUR RECOMMENDED NEXT ACTION
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  Ready to Start Your {diagnosticResult.roleTitle} Preparation?
                </h3>
                <p className="text-xs sm:text-sm text-blue-100 leading-relaxed font-sans max-w-2xl">
                  Explore full syllabus details, software sandbox access, and cost calculators for your diagnostic path.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/training"
                  className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-stone-950 font-mono text-xs font-bold px-6 py-3 rounded-xl transition-colors shadow-md"
                >
                  <span>Explore {diagnosticResult.roleTitle} Track</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/tools/cost-calculator"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold px-6 py-3 rounded-xl border border-white/20 transition-colors"
                >
                  <span>Calculate Decision & Opportunity Cost</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
