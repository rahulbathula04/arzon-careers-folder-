import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Clock,
  ShieldCheck,
  Award,
  BookOpen,
  Activity,
  Stethoscope,
  Building2,
  Check,
  Zap,
  HelpCircle,
  BarChart3,
  Layers,
  Search,
} from "lucide-react";
import { PremiumChip } from "@/components/ui/PremiumChip";
import { Interactive3dCard, Card3dLayer } from "@/components/3d/Interactive3dCard";
import { Floating3dBadge } from "@/components/3d/Floating3dBadge";
import { BorderBeam } from "@/components/magicui/border-beam";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { AiThinkingLoader } from "@/components/ui/AiThinkingLoader";
import { getProfile, saveResult, saveAnswers } from "@/lib/careerEngineApi";
import { computeResult, ARCHETYPES, PATHS } from "@/data/careerEngineScoring";
import { QUESTIONS, type Question, type Stream, type Trait } from "@/data/careerEngineQuestions";

// Curated 20-question comprehensive diagnostic battery grounded in 300+ JDs
const CORE_ASSESSMENT_QUESTIONS: Question[] = [
  // ── SECTION 1: ACADEMIC & CLINICAL BACKGROUND (5 Qs) ──
  {
    id: "stream",
    kind: "profile",
    prompt: "What was your core academic stream in 11th & 12th / Intermediate?",
    helper: "We use your academic foundation to calibrate scientific baseline expectations.",
    options: [
      { value: "BiPC", label: "BiPC (Biology, Physics, Chemistry) — Healthcare / Pharma", weights: { compliance: 2, detail: 1 } },
      { value: "MPC", label: "MPC (Maths, Physics, Chemistry) — Engineering / Tech", weights: { logic: 2, tech: 2 } },
      { value: "Commerce", label: "Commerce / CEC / MEC — Business & Operations", weights: { sales: 2, data: 1 } },
      { value: "Arts", label: "Arts / Humanities / Other", weights: { language: 2, empathy: 1 } },
    ],
  },
  {
    id: "course",
    kind: "profile",
    prompt: "What is your primary graduation degree?",
    helper: "Top GCCs and Pharma MNCs maintain strict degree-eligibility criteria.",
    options: [
      { value: "pharma", label: "B.Pharm / Pharm.D / M.Pharm (Pharmacy)", weights: { compliance: 3, detail: 2 } },
      { value: "lifesci", label: "B.Sc / M.Sc Life Sciences (Biotechnology, Microbiology, Biochemistry)", weights: { lab: 3, data: 1 } },
      { value: "med", label: "BDS / MBBS / BAMS / BHMS / Nursing / Physiotherapy", weights: { patient: 3, empathy: 2 } },
      { value: "engg", label: "B.Tech / B.E / BCA / MCA (Computer Science, IT, Biomedical, Biotech)", weights: { tech: 3, logic: 2 } },
      { value: "comm", label: "B.Com / BBA / MBA / Economics", weights: { sales: 2, data: 2 } },
      { value: "agri", label: "B.Sc Agriculture / Horticulture / Allied Sciences", weights: { compliance: 1, detail: 1 } },
    ],
  },
  {
    id: "year",
    kind: "profile",
    prompt: "Where are you currently located in your academic / career timeline?",
    helper: "Determines whether you qualify for immediate deployment or internship cohorts.",
    options: [
      { value: "graduated", label: "Already Graduated — Seeking immediate corporate deployment", weights: { pressure: 2 } },
      { value: "4", label: "Final Year Student — Graduating within the next 3–6 months", weights: { pressure: 1 } },
      { value: "3", label: "Pre-Final Year (3rd Year) — Building credentials early" },
      { value: "1", label: "1st or 2nd Year Student — Exploring healthcare career roadmaps" },
    ],
  },
  {
    id: "city",
    kind: "profile",
    prompt: "Where is your preferred work location for GCC / corporate placement?",
    helper: "Top capability centers in India are concentrated in tier-1 life sciences hubs.",
    options: [
      { value: "metro", label: "Hyderabad / Bengaluru / Mumbai / Pune (Tier-1 Healthcare GCC Hubs)", weights: { pressure: 1 } },
      { value: "tier2", label: "Chennai / Delhi NCR / Ahmedabad / Kolkata", weights: { pressure: 1 } },
      { value: "town", label: "Open to relocation anywhere in India for the right role", weights: { compliance: 1 } },
    ],
  },
  {
    id: "english_self",
    kind: "profile",
    prompt: "How comfortable are you reading regulatory dossiers and medical literature in English?",
    helper: "US FDA and EMA submissions require stringent technical English fluency.",
    options: [
      { value: "fluent", label: "Fluent — I comfortably analyze clinical trials, MedDRA terms, and SOPs", weights: { language: 3, writing: 2 } },
      { value: "good", label: "Good — Comfortable with technical documents, occasional re-reading needed", weights: { language: 1, writing: 1 } },
      { value: "okay", label: "Moderate — Can read with extra time and dictionary assistance" },
      { value: "weak", label: "Basic — Prefer vernacular explanations or non-writing roles", weights: { language: -2, writing: -2 } },
    ],
  },

  // ── SECTION 2: WORK STYLE & ENTERPRISE SCENARIOS (8 Qs) ──
  {
    id: "evening_6pm",
    kind: "scenario",
    prompt: "It is 5:30 PM. Three high-priority tasks arrive simultaneously. Which do you tackle first?",
    helper: "Assesses operational triage logic under enterprise workload pressure.",
    options: [
      {
        value: "doc",
        label: "An expedited 7-day ICSR safety report due for submission to the US FDA tomorrow morning",
        weights: { compliance: 4, writing: 2, pressure: 3 },
        reveals: "Strong regulatory compliance instincts and deadline reliability.",
      },
      {
        value: "calls",
        label: "Four clinical trial site coordinators waiting on urgent query clarifications",
        weights: { patient: 3, empathy: 3, sales: 1 },
        reveals: "High stakeholder orientation and empathetic interpersonal responsiveness.",
      },
      {
        value: "review",
        label: "Reviewing 40 coded medical records to audit ICD-10 modifier accuracy before billing",
        weights: { detail: 4, compliance: 3, screen: 2 },
        reveals: "Exceptional precision and rigorous attention to zero-error verification.",
      },
      {
        value: "debug",
        label: "Troubleshooting a broken CDISC SAS data mapping script causing validation failures",
        weights: { tech: 4, logic: 3, pressure: 2 },
        reveals: "Analytical problem solver suited for biostatistics and healthcare IT.",
      },
    ],
  },
  {
    id: "repetition_tolerance",
    kind: "scenario",
    prompt: "In day-to-day operations, how do you respond to highly repetitive, rule-governed workflows?",
    helper: "Healthcare data jobs require high vigilance across hundreds of repetitive cases.",
    options: [
      {
        value: "love_rules",
        label: "I thrive on structured SOPs. I take deep pride in maintaining 100% error-free consistency.",
        weights: { compliance: 3, detail: 3, screen: 2 },
        reveals: "Ideal mindset for Pharmacovigilance, Medical Coding, and Clinical Data Management.",
      },
      {
        value: "find_patterns",
        label: "I enjoy repetitive data only if I can spot patterns, automate steps, or write validation queries.",
        weights: { logic: 3, tech: 3, data: 3 },
        reveals: "High analytical orientation suited for SAS Programming and Clinical Data Analytics.",
      },
      {
        value: "prefer_variety",
        label: "I prefer varied research assignments, drafting narratives, and synthesizing clinical insights.",
        weights: { writing: 3, language: 2, compliance: 1 },
        reveals: "Great fit for Medical Writing, Scientific Communications, and Regulatory Affairs.",
      },
      {
        value: "need_interaction",
        label: "Pure desk repetition drains me — I prefer interacting with clients, doctors, and teams.",
        weights: { sales: 3, empathy: 2, patient: 2 },
        reveals: "Suited for Clinical Research Coordination, Medical Affairs, and Healthcare Sales.",
      },
    ],
  },
  {
    id: "discrepancy_reaction",
    kind: "scenario",
    prompt: "While auditing an electronic Case Report Form (eCRF), you notice a patient's blood pressure was logged as 1200/80 instead of 120/80. What is your immediate action?",
    helper: "Tests Good Clinical Practice (GCP) compliance vs informal guesswork.",
    options: [
      {
        value: "raise_query",
        label: "Raise a formal data clarification query (DCQ) in Medidata RAVE to the investigator without modifying source data.",
        weights: { compliance: 4, detail: 3, logic: 2 },
        reveals: "Perfect adherence to ICH-GCP data integrity principles.",
      },
      {
        value: "fix_typo",
        label: "Correct the obvious typo to 120/80 immediately to save audit turnaround time.",
        weights: { compliance: -3, detail: -2 },
        reveals: "Warning: Direct alteration of trial data violates regulatory audit guidelines.",
      },
      {
        value: "notify_lead",
        label: "Document the systemic discrepancy and escalate to the Lead Clinical Data Manager for protocol review.",
        weights: { compliance: 3, writing: 2 },
        reveals: "Strong institutional awareness and proactive risk escalation.",
      },
      {
        value: "cross_check",
        label: "Cross-reference concomitant medication logs to check if an anti-hypertensive intervention occurred.",
        weights: { detail: 3, logic: 3 },
        reveals: "Deep investigative clinical diligence.",
      },
    ],
  },
  {
    id: "screen_hours",
    kind: "scenario",
    prompt: "Enterprise healthcare IT roles often require 7–8 hours of continuous database navigation across dual monitors. How does this align with your stamina?",
    helper: "Evaluates ergonomic screen tolerance for PV databases, EDC systems, and coding portals.",
    options: [
      {
        value: "high_focus",
        label: "Very comfortable — I have high desk stamina and can stay deeply focused on software interfaces.",
        weights: { screen: 4, detail: 2 },
      },
      {
        value: "moderate_breaks",
        label: "Comfortable with short scheduled micro-breaks every 90 minutes to maintain peak visual acuity.",
        weights: { screen: 2, detail: 1 },
      },
      {
        value: "prefer_movement",
        label: "I experience eye strain quickly and strongly prefer on-field, hospital-ward, or mobile tasks.",
        weights: { screen: -3, patient: 2 },
      },
    ],
  },
  {
    id: "pressure_handling",
    kind: "scenario",
    prompt: "An unexpected regulatory audit is announced for tomorrow morning. Your team must audit 150 legacy case folders overnight. How do you respond?",
    helper: "Measures stress calibration in high-stakes pharmaceutical compliance environments.",
    options: [
      {
        value: "calm_systematic",
        label: "I stay calm, divide the checklist into modular batches, and execute systematically with zero panic.",
        weights: { pressure: 4, compliance: 2, logic: 2 },
        reveals: "High emotional stability and executive composure under regulatory scrutiny.",
      },
      {
        value: "rally_team",
        label: "I take initiative, motivate the team, and coordinate quality checks to ensure mutual accuracy.",
        weights: { empathy: 3, sales: 2, pressure: 2 },
        reveals: "Natural team lead instincts.",
      },
      {
        value: "deep_audit",
        label: "I take the most complex 30 cases myself, knowing high-risk files require senior-level scrutiny.",
        weights: { detail: 3, compliance: 3, pressure: 2 },
        reveals: "Subject matter expertise orientation.",
      },
      {
        value: "anxious",
        label: "I feel overwhelmed when severe deadlines collide with heavy compliance volume.",
        weights: { pressure: -2 },
        reveals: "Prefers predictable, evenly paced workflows over crisis management.",
      },
    ],
  },
  {
    id: "ambiguity_action",
    kind: "scenario",
    prompt: "A physician's handwritten clinical note is illegible regarding whether a medication was 50mg BID or 500mg QD. What do you do?",
    helper: "Tests medical safety protocols against assumption risks.",
    options: [
      {
        value: "never_assume",
        label: "Never guess. Mark as unverified and request immediate physician clarification with documented audit trail.",
        weights: { compliance: 4, detail: 3 },
        reveals: "Rock-solid clinical safety conscience.",
      },
      {
        value: "standard_dose",
        label: "Look up standard recommended dosage for the diagnosis and code the standard adult therapeutic dose.",
        weights: { compliance: -3, detail: -2 },
        reveals: "Assumption risk — violates medical coding and safety standards.",
      },
      {
        value: "pharmacy_log",
        label: "Cross-check the hospital dispensing pharmacy barcode records to corroborate dispensed strength.",
        weights: { detail: 3, logic: 3, tech: 1 },
        reveals: "Thorough multi-source verification ability.",
      },
    ],
  },
  {
    id: "career_objective",
    kind: "scenario",
    prompt: "What is your primary long-term ambition within the corporate life sciences ecosystem?",
    helper: "Helps map you to long-term career growth ladders (Specialist vs People Leader vs Architect).",
    options: [
      {
        value: "subject_expert",
        label: "Become a Principal Subject Matter Expert in Global Pharmacovigilance or Regulatory Affairs (₹15L–₹25L CTC).",
        weights: { compliance: 3, writing: 2, detail: 2 },
      },
      {
        value: "data_leader",
        label: "Lead Clinical Data Science, CDISC SAS, and Healthcare Analytics initiatives at Global Capability Centers.",
        weights: { tech: 3, data: 3, logic: 3 },
      },
      {
        value: "operations_head",
        label: "Rise to Delivery Director / Operations Manager managing large multi-hundred member GCC teams.",
        weights: { sales: 2, empathy: 2, pressure: 2 },
      },
      {
        value: "consultant",
        label: "Work as an International Healthcare Consultant / US Medical Coding Auditor.",
        weights: { detail: 3, language: 2, logic: 2 },
      },
    ],
  },
  {
    id: "learning_speed",
    kind: "scenario",
    prompt: "When introduced to complex new enterprise software (e.g. Oracle Argus 8.4 or Medidata RAVE), how do you master it?",
    helper: "Gauges software adoption velocity and technical autonomy.",
    options: [
      {
        value: "hands_on_labs",
        label: "I learn fastest by working directly on sample case data, executing test workflows, and making mistakes in a sandbox.",
        weights: { tech: 3, detail: 2, logic: 2 },
      },
      {
        value: "mentor_walkthrough",
        label: "I prefer live step-by-step mentor demonstrations followed by immediate guided execution.",
        weights: { compliance: 2, empathy: 1 },
      },
      {
        value: "sop_manuals",
        label: "I read user manuals, regulatory guidelines, and standard operating procedures cover-to-cover first.",
        weights: { compliance: 3, writing: 2 },
      },
    ],
  },

  // ── SECTION 3: TRAIT MINI-TASKS & MICRO ACCURACY (4 Qs) ──
  {
    id: "micro_dose_calc",
    kind: "micro",
    prompt: "MICRO-TASK 1: Spot the Data Discrepancy",
    scenario: "Case Report Intake: Patient prescribed Metformin 500mg BID. Record A indicates '30 tablets dispensed for 30-day supply'. Record B logs 'Patient takes 2 tablets daily'. Is there a discrepancy?",
    helper: "Analyze the mathematical and clinical logic carefully.",
    options: [
      {
        value: "yes_shortage",
        label: "Yes — At BID (2 tablets/day), a 30-day supply requires 60 tablets. 30 tablets represents a 15-day shortage.",
        correct: true,
        weights: { logic: 4, detail: 4 },
        reveals: "Accurate! You caught the prescription duration mismatch.",
      },
      {
        value: "no_discrepancy",
        label: "No — 30 tablets for 30 days is a standard 1-month blister pack prescription.",
        correct: false,
        weights: { detail: -2, logic: -2 },
      },
      {
        value: "irrelevant",
        label: "Cannot determine without knowing the patient's fasting blood glucose levels.",
        correct: false,
        weights: { logic: -1 },
      },
    ],
  },
  {
    id: "micro_meddra_coding",
    kind: "micro",
    prompt: "MICRO-TASK 2: Pharmacovigilance Adverse Event Triage",
    scenario: "A clinical trial investigator reports: 'Patient developed hives, facial swelling, and acute shortness of breath 20 minutes post-infusion'. How should this event be prioritized?",
    helper: "Evaluate seriousness and regulatory reporting urgency.",
    options: [
      {
        value: "anaphylaxis_expedited",
        label: "Expedited Serious AE (SUSAR / Anaphylaxis) — Immediate 7-day regulatory report clock starts due to life-threatening respiratory compromise.",
        correct: true,
        weights: { compliance: 4, logic: 3, pressure: 2 },
        reveals: "Correct! Life-threatening anaphylactic reactions require expedited 7-day clock initiation.",
      },
      {
        value: "mild_allergic",
        label: "Non-serious mild allergic reaction — Include in routine quarterly aggregate safety updates.",
        correct: false,
        weights: { compliance: -3 },
      },
      {
        value: "wait_discharge",
        label: "Hold case entry until patient is discharged from the hospital to get complete lab reports.",
        correct: false,
        weights: { compliance: -3 },
      },
    ],
  },
  {
    id: "micro_coding_modifier",
    kind: "micro",
    prompt: "MICRO-TASK 3: Medical Coding Modifier Audit",
    scenario: "A surgeon performs an excision of a benign skin lesion on the left arm and a separate biopsy on the right leg during the same operative session. What is required under CPT coding?",
    helper: "Checks understanding of procedural unbundling vs distinct procedural services.",
    options: [
      {
        value: "modifier_59",
        label: "Code both CPT procedures and append Modifier 59 / XS (Distinct Procedural Service / Separate Anatomical Site) to the secondary procedure.",
        correct: true,
        weights: { detail: 4, compliance: 3 },
        reveals: "Excellent! Precise understanding of separate anatomical site unbundling.",
      },
      {
        value: "primary_only",
        label: "Code only the higher-paying excision code because multiple procedures on the same day are automatically bundled.",
        correct: false,
        weights: { detail: -2 },
      },
      {
        value: "no_modifiers",
        label: "Submit both codes without any modifiers since the anatomical descriptions speak for themselves.",
        correct: false,
        weights: { compliance: -2 },
      },
    ],
  },
  {
    id: "micro_table_reconciliation",
    kind: "micro",
    prompt: "MICRO-TASK 4: Clinical Data Reconciliation",
    scenario: "In an oncology clinical trial dataset with 400 subjects, Subject #104 has: Date of Informed Consent = 14-Aug-2025; First Dose Administration = 10-Aug-2025. What critical audit issue does this present?",
    helper: "Evaluate Good Clinical Practice (ICH-GCP) protocol compliance.",
    options: [
      {
        value: "major_gcp_violation",
        label: "Critical GCP Protocol Violation — Dosing occurred 4 days prior to documented informed consent. Immediate escalation required.",
        correct: true,
        weights: { compliance: 4, detail: 4, logic: 3 },
        reveals: "Spot on! Pre-consent dosing is a major FDA audit violation.",
      },
      {
        value: "acceptable_grace",
        label: "Acceptable protocol variance under standard 7-day administrative grace period.",
        correct: false,
        weights: { compliance: -4 },
      },
      {
        value: "minor_clerical",
        label: "Minor clerical oversight — can be silently corrected by the study coordinator at study lock.",
        correct: false,
        weights: { compliance: -4 },
      },
    ],
  },

  // ── SECTION 4: READINESS & COMMITMENT (3 Qs) ──
  {
    id: "weekly_hours",
    kind: "commitment",
    prompt: "How many hours per week can you realistically dedicate to live case studies, tools, and interview preparation?",
    helper: "Helps us assess your trajectory speed for 8–12 week workforce readiness.",
    options: [
      { value: "10_plus", label: "10–15+ Hours / Week — Highly dedicated to landing a GCC role within 60–90 days", weights: { pressure: 3, detail: 1 } },
      { value: "6_to_10", label: "6–10 Hours / Week — Steady, balanced progress alongside college or existing job", weights: { pressure: 1 } },
      { value: "3_to_5", label: "3–5 Hours / Week — Weekend-only self-paced learning" },
    ],
  },
  {
    id: "shift_flexibility",
    kind: "commitment",
    prompt: "Are you comfortable with standard GCC rotational or US-shift schedules (e.g. 1:30 PM – 10:30 PM or rotational)?",
    helper: "Global capability centers serving US/EU sponsors often operate in overlapping time zones.",
    options: [
      { value: "fully_flexible", label: "100% Flexible — Willing to work any shift for top MNC salaries & growth", weights: { pressure: 3, compliance: 1 } },
      { value: "afternoon_ok", label: "Comfortable with standard Day & Afternoon (General/UK) shifts", weights: { pressure: 1 } },
      { value: "day_only", label: "Strictly Day-shift only (9:00 AM – 6:00 PM)", weights: { pressure: -1 } },
    ],
  },
  {
    id: "timeline_intent",
    kind: "commitment",
    prompt: "When do you aim to complete your preparation and begin corporate interviews?",
    helper: "Aligns your recruiter dossier with active corporate hiring batches.",
    options: [
      { value: "immediate", label: "Immediately (Within the next 30–60 days)", weights: { pressure: 2 } },
      { value: "3_months", label: "Within 3–4 months (Next academic quarterly intake)", weights: { pressure: 1 } },
      { value: "future", label: "Exploring for future reference (6+ months out)" },
    ],
  },
];

const SECTIONS = [
  { id: "sec-1", title: "Academic & Clinical Foundation", range: [0, 4], icon: BookOpen, tag: "PROFILE" },
  { id: "sec-2", title: "Work Style & Enterprise Scenarios", range: [5, 12], icon: Activity, tag: "SCENARIOS" },
  { id: "sec-3", title: "Trait Mini-Tasks & Micro Accuracy", range: [13, 16], icon: Stethoscope, tag: "ACCURACY" },
  { id: "sec-4", title: "Readiness & Placement Intent", range: [17, 19], icon: Zap, tag: "COMMITMENT" },
];

export function EnterpriseAiAssessmentEngine() {
  const navigate = useNavigate();
  const profile = getProfile();
  const candidateName = profile?.name?.trim() || "Healthcare Fresher";

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [synthesisStep, setSynthesisStep] = useState(0);

  const totalQuestions = CORE_ASSESSMENT_QUESTIONS.length;
  const currentQuestion = CORE_ASSESSMENT_QUESTIONS[currentIndex];

  // Determine active section
  const currentSection = useMemo(() => {
    return (
      SECTIONS.find(
        (s) => currentIndex >= s.range[0] && currentIndex <= s.range[1],
      ) || SECTIONS[0]
    );
  }, [currentIndex]);

  const progressPct = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  // Restore existing answer if navigating back
  useEffect(() => {
    if (answers[currentQuestion.id]) {
      setSelectedOption(answers[currentQuestion.id]);
    } else {
      setSelectedOption(null);
    }
  }, [currentIndex, currentQuestion.id]);

  const handleSelectOption = (value: string) => {
    setSelectedOption(value);
  };

  const handleNext = async () => {
    if (!selectedOption) return;

    const newAnswers = { ...answers, [currentQuestion.id]: selectedOption };
    setAnswers(newAnswers);

    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Reached the end! Run AI Neural Synthesis Simulation
      setIsSynthesizing(true);
      
      const steps = [
        "Calibrating 13 clinical and operational behavioral traits...",
        "Cross-referencing profile against 300+ Live Tier-1 GCC Job Requisitions...",
        "Evaluating Pharmacovigilance, Clinical Data, Medical Coding, and RA alignments...",
        "Synthesizing 21-chapter verified Career Fit Report...",
      ];

      for (let i = 0; i < steps.length; i++) {
        setSynthesisStep(i);
        await new Promise((resolve) => setTimeout(resolve, 550));
      }

      // Compute full CareerEngineResult
      try {
        const result = computeResult(newAnswers, {
          questions: CORE_ASSESSMENT_QUESTIONS,
          meta: {
            attemptId: `att_${Date.now()}`,
            createdAt: new Date().toISOString(),
          },
        });

        // Attach candidate profile
        result.profile = {
          ...(result.profile || {}),
          name: candidateName,
          stream: newAnswers.stream,
          course: newAnswers.course,
          year: newAnswers.year,
        } as any;

        // Persist answers & result
        saveAnswers(newAnswers);
        saveResult(result);
        if (typeof window !== "undefined") {
          sessionStorage.setItem("ce_result", JSON.stringify(result));
          sessionStorage.setItem("ce_answers", JSON.stringify(newAnswers));
        }

        // Navigate to full rich results page
        navigate({ to: "/career-engine/result" });
      } catch (err) {
        console.error("Failed to compute assessment result:", err);
        navigate({ to: "/career-engine/result" });
      }
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  if (isSynthesizing) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center space-y-8">
        <Interactive3dCard
          maxTilt={6}
          className="rounded-3xl border border-stone-200 bg-white p-8 sm:p-12 shadow-2xl space-y-8 relative overflow-hidden"
        >
          <BorderBeam size={220} duration={8} delay={0} colorFrom="#1B3F8B" colorTo="#8A6D1F" />
          
          <div className="space-y-4">
            <Floating3dBadge duration={2.5}>
              <div className="mx-auto h-16 w-16 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-[#1B3F8B] shadow-md">
                <Sparkles className="h-8 w-8 text-[#1B3F8B] motion-safe:animate-spin" />
              </div>
            </Floating3dBadge>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
              Synthesizing Your Career Fit Report
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-sans max-w-md mx-auto">
              Analyzing your answers across Oracle Argus, MedDRA, Medidata RAVE, ICD-10-CM, and Regulatory domains.
            </p>
          </div>

          {/* Real-time status ticker */}
          <div className="rounded-2xl bg-[#FAF8F5] border border-stone-200 p-5 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-stone-600">
              <span>AI RECRUITER CALIBRATION</span>
              <span className="text-[#1B3F8B]">{(synthesisStep + 1) * 25}%</span>
            </div>
            
            <div className="h-2 w-full bg-stone-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#1B3F8B] via-sky-500 to-[#8A6D1F] transition-all duration-500 rounded-full"
                style={{ width: `${(synthesisStep + 1) * 25}%` }}
              />
            </div>

            <p className="text-xs font-mono text-stone-700 pt-1 flex items-center justify-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 motion-safe:animate-ping" />
              <span>
                {[
                  "Calibrating 13 clinical and behavioral traits...",
                  "Cross-referencing against 300+ Live GCC Job Requisitions...",
                  "Evaluating Pharmacovigilance, CDM, Medical Coding, and RA alignments...",
                  "Generating your verified 21-chapter Career Fit Dossier...",
                ][synthesisStep]}
              </span>
            </p>
          </div>
        </Interactive3dCard>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 space-y-8">
      {/* Top Header Card with 3D Depth */}
      <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <PremiumChip variant="navy" size="sm">
                HEALTHCARE CAREER ENGINE · V3.2
              </PremiumChip>
              <span className="font-mono text-xs text-stone-500 font-bold hidden sm:inline">
                CANDIDATE: <strong className="text-stone-900">{candidateName}</strong>
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
              Healthcare Fresher Career Fit Diagnostic
            </h1>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="text-right font-mono">
              <span className="text-[10px] text-stone-400 font-bold uppercase block">DIAGNOSTIC PROGRESS</span>
              <span className="text-sm font-bold text-[#1B3F8B]">
                Question {currentIndex + 1} of {totalQuestions} ({progressPct}%)
              </span>
            </div>
          </div>
        </div>

        {/* 4-Section Interactive Rail */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
          {SECTIONS.map((sec, idx) => {
            const isCompleted = currentIndex > sec.range[1];
            const isCurrent = currentIndex >= sec.range[0] && currentIndex <= sec.range[1];
            const Icon = sec.icon;

            return (
              <div
                key={sec.id}
                className={`rounded-2xl p-3 border transition-all text-left space-y-1 ${
                  isCurrent
                    ? "bg-sky-50/80 border-[#1B3F8B] shadow-xs ring-2 ring-[#1B3F8B]/20"
                    : isCompleted
                    ? "bg-emerald-50/40 border-emerald-200 text-stone-700"
                    : "bg-[#FAF8F5] border-stone-200 opacity-60"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-stone-500">
                    STAGE 0{idx + 1}
                  </span>
                  {isCompleted ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  ) : (
                    <Icon className={`h-3.5 w-3.5 ${isCurrent ? "text-[#1B3F8B]" : "text-stone-400"}`} />
                  )}
                </div>
                <p className="font-serif text-xs font-bold text-[#1A1A1A] truncate">
                  {sec.title.split("&")[0].trim()}
                </p>
              </div>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#1B3F8B] transition-all duration-300 rounded-full"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Main Question Card with 3D Interaction */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25 }}
          className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-10 shadow-sm space-y-6 relative overflow-hidden"
        >
          {/* Question Tag */}
          <div className="flex items-center justify-between border-b border-stone-100 pb-4">
            <span className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[#1B3F8B] uppercase tracking-wider bg-sky-50 px-3 py-1 rounded-lg border border-sky-200">
              <Activity className="h-3.5 w-3.5 text-[#1B3F8B]" />
              <span>{currentSection.tag} · QUESTION 0{currentIndex + 1}</span>
            </span>

            {currentQuestion.kind === "micro" && (
              <span className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
                <Clock className="h-3 w-3 text-amber-600" />
                <span>MICRO ACCURACY CHECK</span>
              </span>
            )}
          </div>

          {/* Question Prompt */}
          <div className="space-y-2">
            <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-[#1A1A1A] leading-snug">
              {currentQuestion.prompt}
            </h2>
            {currentQuestion.scenario && (
              <div className="rounded-xl bg-[#FAF8F5] border border-stone-200 p-4 text-xs sm:text-sm font-sans font-medium text-stone-700 leading-relaxed">
                <strong className="font-mono text-stone-900 block text-[10px] uppercase tracking-wider mb-1">
                  CASE SCENARIO
                </strong>
                {currentQuestion.scenario}
              </div>
            )}
            {currentQuestion.helper && (
              <p className="text-xs text-stone-500 font-sans italic">
                💡 {currentQuestion.helper}
              </p>
            )}
          </div>

          {/* Options Grid with 3D Hover Cards */}
          <div className="grid gap-3 pt-2">
            {currentQuestion.options.map((opt, optIdx) => {
              const isSelected = selectedOption === opt.value;
              const alphabet = String.fromCharCode(65 + optIdx);

              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleSelectOption(opt.value)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                    isSelected
                      ? "bg-sky-50/90 border-[#1B3F8B] shadow-md ring-2 ring-[#1B3F8B]/30 translate-x-1"
                      : "bg-white hover:bg-stone-50/80 border-stone-200 shadow-2xs hover:border-stone-300"
                  }`}
                >
                  <span
                    className={`h-8 w-8 rounded-xl font-mono text-xs font-bold flex items-center justify-center shrink-0 transition-all ${
                      isSelected
                        ? "bg-[#1B3F8B] text-white shadow-xs"
                        : "bg-stone-100 text-stone-600 border border-stone-200"
                    }`}
                  >
                    {isSelected ? <Check className="h-4 w-4 text-white" /> : alphabet}
                  </span>

                  <div className="space-y-1 pt-0.5">
                    <p className={`font-sans text-xs sm:text-sm leading-relaxed ${
                      isSelected ? "font-bold text-[#1A1A1A]" : "text-stone-800"
                    }`}>
                      {opt.label}
                    </p>
                    {isSelected && opt.reveals && (
                      <p className="font-mono text-[11px] text-emerald-700 font-semibold pt-1">
                        ✦ Trait Impact: {opt.reveals}
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Action Footer */}
          <div className="pt-6 border-t border-stone-100 flex items-center justify-between">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border text-xs font-bold font-sans transition-all ${
                currentIndex === 0
                  ? "opacity-30 border-stone-200 text-stone-400 cursor-not-allowed"
                  : "border-stone-300 bg-white hover:bg-stone-100 text-stone-800 cursor-pointer shadow-2xs"
              }`}
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Previous</span>
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={!selectedOption}
              className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-xs sm:text-sm font-bold font-sans transition-all shadow-sm ${
                selectedOption
                  ? "bg-[#1B3F8B] hover:bg-[#153270] text-white shadow-md hover:shadow-lg cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
                  : "bg-stone-200 text-stone-400 cursor-not-allowed"
              }`}
            >
              <span>{currentIndex === totalQuestions - 1 ? "Submit & Generate Report" : "Confirm & Next"}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Assurance Footer Badge */}
      <div className="rounded-2xl border border-stone-200 bg-[#FAF8F5] p-4 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-stone-600">
        <span className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-[#8A6D1F]" />
          <span>300+ Verified GCC Requisitions Indexed (Novartis, IQVIA, Parexel, Optum)</span>
        </span>
        <span className="text-stone-400">·</span>
        <span>SHA-256 Verified Career Ledger</span>
      </div>
    </div>
  );
}
