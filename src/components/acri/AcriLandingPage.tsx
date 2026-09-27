import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  ShieldAlert,
  Clock,
  Sparkles,
  BookOpen,
  Briefcase,
  Play,
  Layers,
  Search,
  Check,
  Building2,
  Activity,
  Award,
  ChevronDown,
  X,
  ExternalLink,
  MessageSquare,
  Lock,
} from "lucide-react";
import { toast } from "sonner";
import { ArzonCareerPathGrid } from "@/components/home/ArzonCareerPathGrid";

export function AcriLandingPage() {
  // Interactive Drawer & Modal States
  const [isCaseModalOpen, setIsCaseModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isCounsellorModalOpen, setIsCounsellorModalOpen] = useState(false);
  const [selectedSkillModal, setSelectedSkillModal] = useState<string | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Counsellor Form State
  const [counsellorForm, setCounsellorForm] = useState({
    name: "",
    phone: "",
    degree: "B.Pharm",
    passoutYear: "2024",
    preferredTime: "Evening (4 PM - 7 PM)",
  });
  const [dpdpConsent, setDpdpConsent] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Career Fit Interactive State
  const [matchedTraits, setMatchedTraits] = useState<Set<number>>(new Set([0, 1, 2]));

  // Active Laptop Pill Hover/Click state
  const [activeLaptopPill, setActiveLaptopPill] = useState<string | null>(null);
  const videoDialogRef = useRef<HTMLDivElement | null>(null);
  const videoCloseRef = useRef<HTMLButtonElement | null>(null);
  const videoTriggerRef = useRef<HTMLButtonElement | null>(null);
  const lastVideoTriggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isVideoModalOpen) return;

    lastVideoTriggerRef.current = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : videoTriggerRef.current;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusFrame = window.requestAnimationFrame(() => {
      videoCloseRef.current?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsVideoModalOpen(false);
        return;
      }

      if (event.key !== "Tab" || !videoDialogRef.current) return;

      const focusable = videoDialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex="0"]',
      );
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      lastVideoTriggerRef.current?.focus();
    };
  }, [isVideoModalOpen]);

  // Listen for global counsellor modal dispatch
  useEffect(() => {
    const handleOpen = () => setIsCounsellorModalOpen(true);
    window.addEventListener("arzon:open-counsellor-modal", handleOpen);
    return () => window.removeEventListener("arzon:open-counsellor-modal", handleOpen);
  }, []);

  const toggleTrait = (index: number) => {
    setMatchedTraits((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const handleCounsellorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!counsellorForm.name.trim() || !counsellorForm.phone.trim()) {
      toast.error("Please enter your name and phone number");
      return;
    }
    if (!dpdpConsent) {
      toast.error("Please provide consent to proceed with counselling");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsCounsellorModalOpen(false);
      toast.success(
        "Counsellor consultation request received! An Arzon Career Specialist will contact you within 2 business hours."
      );
      // Redirect to WhatsApp consultation
      const msg = encodeURIComponent(
        `Hi Arzon Career Counsellor! My name is ${counsellorForm.name} (${counsellorForm.degree}, ${counsellorForm.passoutYear}). I would like to schedule a 1-on-1 Pharmacovigilance career strategy discussion.`
      );
      window.open(`https://wa.me/918977626999?text=${msg}`, "_blank");
    }, 600);
  };

  return (
    <div className="bg-white min-h-screen text-[#071A4A] font-sans antialiased selection:bg-[#EEF6FF] selection:text-[#1557D6] tone-light">
      {/* ========================================================================= */}
      {/* SECTION 1: HERO (PIN-TO-PIN MATCH WITH BRANDING SPECIFICATION) */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden bg-white pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#E4EAF2] tone-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Proposition */}
            <div className="lg:col-span-6 space-y-6">
              {/* Eyebrow Pill */}
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D0E1FD] bg-[#EEF6FF] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#1557D6]">
                <span className="h-2 w-2 rounded-full bg-[#1557D6] motion-safe:animate-pulse" />
                <span>ARZON GLOBAL · HEALTHCARE CAREER INTELLIGENCE</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-[62px] font-bold tracking-tight text-[#071A4A] leading-[1.08]">
                Build toward the healthcare role you want.
              </h1>

              {/* Bold Subheading */}
              <p className="text-base sm:text-lg font-bold text-[#071A4A] leading-snug">
                Understand the role. See the skills. Build the evidence. Move toward hiring.
              </p>

              {/* Description */}
              <p className="text-sm sm:text-base text-[#3F4A60] leading-relaxed max-w-xl">
                Arzon helps B.Pharm, M.Pharm, Pharm.D and life-sciences graduates move from degree to role readiness across healthcare and clinical operations.
              </p>

              {/* Dual CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    window.location.href = "/career-engine";
                  }}
                  className="arzon-v2-button-primary text-sm sm:text-base cursor-pointer group"
                >
                  <Search className="h-4 w-4" />
                  <span>START CAREER ASSESSMENT</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <a
                  href="#career-paths"
                  className="arzon-v2-button-secondary text-sm cursor-pointer"
                >
                  <span>EXPLORE CAREER PATHS</span>
                  <ArrowRight className="h-4 w-4 text-[var(--arzon-blue-600)]" />
                </a>
              </div>

              {/* Microcopy */}
              <p className="text-xs text-[#69758A] pt-0.5">
                Not sure which path fits? Start with the free career assessment.
              </p>

              {/* 4 Feature Badges Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#E4EAF2]">
                <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-[#E4EAF2]">
                  <div className="h-6 w-6 rounded-full bg-[#EEF6FF] flex items-center justify-center text-[#1557D6] shrink-0">
                    <Activity className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-xs font-semibold text-[#071A4A] truncate">Role-First Learning</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-[#E4EAF2]">
                  <div className="h-6 w-6 rounded-full bg-[#EEF6FF] flex items-center justify-center text-[#1557D6] shrink-0">
                    <Search className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-xs font-semibold text-[#071A4A] truncate">Built from 247+ JDs</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-[#E4EAF2]">
                  <div className="h-6 w-6 rounded-full bg-[#EEF6FF] flex items-center justify-center text-[#1557D6] shrink-0">
                    <Layers className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-xs font-semibold text-[#071A4A] truncate">Hands-on Projects</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-[#E4EAF2]">
                  <div className="h-6 w-6 rounded-full bg-[#EEF6FF] flex items-center justify-center text-[#1557D6] shrink-0">
                    <Award className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-xs font-semibold text-[#071A4A] truncate">Readiness Report</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Showcase */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-[28px] overflow-hidden border border-[#E4EAF2] shadow-2xl bg-white tone-light card-light aspect-[4/3] sm:aspect-[16/11]">
                <img
                  src="/images/pv-landing/hero-student-hd.jpg?v=3"
                  alt="Young Indian pharmacy graduate preparing for Pharmacovigilance career"
                  className="w-full h-full object-cover object-center"
                  loading="eager"
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071A4A]/40 via-transparent to-transparent pointer-events-none" />

                {/* Floating Badge 1: ICSR Case (Top-Left) */}
                <div
                  onClick={() => setIsCaseModalOpen(true)}
                  className="absolute top-4 left-4 bg-white/95 backdrop-blur-md border border-[#E4EAF2] rounded-2xl p-3.5 shadow-xl max-w-[210px] cursor-pointer hover:border-[#1557D6] transition-all hover:scale-[1.02] tone-light card-light group select-none"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-[#E4EAF2] mb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#071A4A]">ICSR CASE</span>
                      <span className="h-2 w-2 rounded-full bg-emerald-500 motion-safe:animate-pulse" />
                    </div>
                    <span className="text-[10px] text-[#1557D6] font-bold group-hover:underline">VIEW &rarr;</span>
                  </div>
                  <div className="space-y-1 font-mono text-[10px] text-[#3F4A60]">
                    <div className="flex justify-between">
                      <span className="text-[#69758A]">Case ID:</span>
                      <span className="font-semibold text-[#071A4A]">PV-2048</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#69758A]">Patient:</span>
                      <span className="font-semibold text-[#071A4A]">34/F</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#69758A]">Suspect Drug:</span>
                      <span className="font-semibold text-[#071A4A]">Amoxicillin</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#69758A]">Adverse Event:</span>
                      <span className="font-bold text-red-600">Severe rash</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#69758A]">Seriousness:</span>
                      <span className="font-semibold text-amber-600">Under assess</span>
                    </div>
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-[#E4EAF2] text-[10px] font-bold text-[#1557D6] flex items-center justify-between">
                    <span>Action: Case processing</span>
                    <span>&rarr;</span>
                  </div>
                </div>

                {/* Floating Badge 2: Key Skills (Top-Right) */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md border border-[#E4EAF2] rounded-2xl p-3 shadow-xl space-y-2 tone-light card-light select-none hidden sm:block">
                  <div
                    onClick={() => setSelectedSkillModal("icsr")}
                    className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-[#EEF6FF] cursor-pointer transition-colors"
                  >
                    <FileText className="h-3.5 w-3.5 text-[#1557D6]" />
                    <span className="text-xs font-semibold text-[#071A4A]">ICSR Processing</span>
                  </div>
                  <div
                    onClick={() => setSelectedSkillModal("meddra")}
                    className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-[#EEF6FF] cursor-pointer transition-colors"
                  >
                    <Layers className="h-3.5 w-3.5 text-[#6946E8]" />
                    <span className="text-xs font-semibold text-[#071A4A]">MedDRA Coding</span>
                  </div>
                  <div
                    onClick={() => setSelectedSkillModal("safety")}
                    className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-[#EEF6FF] cursor-pointer transition-colors"
                  >
                    <ShieldAlert className="h-3.5 w-3.5 text-[#27B9B3]" />
                    <span className="text-xs font-semibold text-[#071A4A]">Safety Assessment</span>
                  </div>
                  <div
                    onClick={() => setSelectedSkillModal("narrative")}
                    className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-[#EEF6FF] cursor-pointer transition-colors"
                  >
                    <BookOpen className="h-3.5 w-3.5 text-[#1557D6]" />
                    <span className="text-xs font-semibold text-[#071A4A]">Case Narratives</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div id="career-paths">
        <ArzonCareerPathGrid />
      </div>

      {/* ========================================================================= */}
      {/* SECTION 2: WHAT DOES A PV ASSOCIATE ACTUALLY DO? (ROLE IN ACTION) */}
      {/* ========================================================================= */}
      <section id="role-in-action" className="py-16 lg:py-24 bg-slate-50 border-b border-[#E4EAF2]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1557D6] bg-[#EEF6FF] px-3.5 py-1 rounded-full border border-[#D0E1FD]">
              OPERATIONAL REALITY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#071A4A]">
              What Does a Pharmacovigilance Associate Actually Do?
            </h2>
            <p className="text-base text-[#3F4A60]">
              Every pharmaceutical product marketed in India, the US, and Europe requires continuous adverse event surveillance. Here is the operational workflow you will perform daily.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mt-12">
            {/* Workstation Simulation Visual */}
            <div className="lg:col-span-7">
              <button
                ref={videoTriggerRef}
                type="button"
                onClick={() => setIsVideoModalOpen(true)}
                aria-label="Open the Pharmacovigilance day-in-the-life walkthrough"
                className="relative block w-full overflow-hidden rounded-3xl border border-[#E4EAF2] bg-black p-0 text-left shadow-xl group cursor-pointer aspect-video focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1557D6] focus-visible:ring-offset-2"
              >
                <img
                  src="/images/pv-landing/video-workstation-hd.jpg?v=3"
                  alt="Clinical safety workstation inspecting safety narratives"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-[#071A4A]/40 flex items-center justify-center">
                  <div className="h-16 w-16 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#1557D6] shadow-2xl group-hover:scale-110 transition-transform tone-light">
                    <Play className="h-7 w-7 fill-[#1557D6] ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md rounded-2xl p-3 border border-white/40 text-xs flex items-center justify-between tone-light card-light">
                  <span className="font-semibold text-[#071A4A]">Watch a 2-Minute Day-in-the-Life Walkthrough</span>
                  <span className="font-mono text-[#1557D6] font-bold">02:14 &bull; HD</span>
                </div>
              </button>
            </div>

            {/* 4-Step Operational Progression */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-4 rounded-2xl bg-white border border-[#E4EAF2] shadow-sm tone-light card-light">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#1557D6] uppercase">
                  <span>Step 01</span>
                  <span>&bull;</span>
                  <span>Intake &amp; Triage</span>
                </div>
                <h4 className="text-sm font-bold text-[#071A4A] mt-1">Four Minimum Criteria Verification</h4>
                <p className="text-xs text-[#69758A] mt-0.5">
                  Confirm identifiable patient, reporter, suspect drug, and adverse event under ICH E2B(R3).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#E4EAF2] shadow-sm tone-light card-light">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#6946E8] uppercase">
                  <span>Step 02</span>
                  <span>&bull;</span>
                  <span>MedDRA 27.0 Coding</span>
                </div>
                <h4 className="text-sm font-bold text-[#071A4A] mt-1">Medical Terminology Mapping</h4>
                <p className="text-xs text-[#69758A] mt-0.5">
                  Translate verbatim reporter narratives into Lowest Level Terms (LLT) and Preferred Terms (PT).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#E4EAF2] shadow-sm tone-light card-light">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#27B9B3] uppercase">
                  <span>Step 03</span>
                  <span>&bull;</span>
                  <span>Safety Narrative Writing</span>
                </div>
                <h4 className="text-sm font-bold text-[#071A4A] mt-1">Chronological Medical Case Summary</h4>
                <p className="text-xs text-[#69758A] mt-0.5">
                  Author audit-ready medical narratives including patient baseline, dechallenge, and rechallenge data.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#E4EAF2] shadow-sm tone-light card-light">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#1557D6] uppercase">
                  <span>Step 04</span>
                  <span>&bull;</span>
                  <span>Expedited Regulatory Clock</span>
                </div>
                <h4 className="text-sm font-bold text-[#071A4A] mt-1">7-Day &amp; 15-Day Submission</h4>
                <p className="text-xs text-[#69758A] mt-0.5">
                  Meet mandatory US FDA 21 CFR 314.80 and EMA GVP expedited safety reporting timelines.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: WHY TRADITIONAL COURSES FAIL VS THE ARZON APPROACH */}
      {/* ========================================================================= */}
      <section className="py-16 lg:py-24 bg-white border-b border-[#E4EAF2] tone-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1557D6] bg-[#EEF6FF] px-3.5 py-1 rounded-full border border-[#D0E1FD]">
              THE PEDAGOGY SHIFT
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#071A4A]">
              Why Most Pharmacovigilance Training Fails
            </h2>
            <p className="text-base text-[#3F4A60]">
              Generic courses teach definitions from old slides. Pharmaceutical recruiters evaluate candidate performance on live case scenarios.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 max-w-5xl mx-auto">
            {/* The Old Model */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold font-mono uppercase text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-200">
                <span>✕ Traditional Courses</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-[#071A4A]">Passive Information Consumption</h3>
              <ul className="space-y-3 text-sm text-[#69758A]">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">&times;</span>
                  <span>Watching pre-recorded video lectures without software interaction</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">&times;</span>
                  <span>Multiple-choice quizzes that test memorization rather than clinical judgement</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">&times;</span>
                  <span>No hands-on MedDRA browser coding or ICH E2B(R3) case processing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">&times;</span>
                  <span>Zero tangible proof-of-work to present to CRO interviewers</span>
                </li>
              </ul>
            </div>

            {/* The Arzon Role-First Model */}
            <div className="p-8 rounded-3xl bg-[#EEF6FF]/50 border border-[#D0E1FD] space-y-4 shadow-sm">
              <div className="inline-flex items-center gap-2 text-xs font-bold font-mono uppercase text-[#1557D6] bg-white px-3 py-1 rounded-full border border-[#D0E1FD] tone-light">
                <span>✓ The Arzon Role-First Model</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-[#071A4A]">Demonstrated Clinical Capability</h3>
              <ul className="space-y-3 text-sm text-[#071A4A]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#1557D6] shrink-0 mt-0.5" />
                  <span>Processing raw adverse event source reports into validated ICSR dossiers</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#1557D6] shrink-0 mt-0.5" />
                  <span>Interactive MedDRA 27.0 coding exercises with hierarchy validation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#1557D6] shrink-0 mt-0.5" />
                  <span>Authoring audit-grade medical safety narratives under regulatory clocks</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#1557D6] shrink-0 mt-0.5" />
                  <span>Graduating with a verified proof-of-work portfolio and ACRI readiness score</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: THE 12-WEEK ROLE READINESS ARCHITECTURE */}
      {/* ========================================================================= */}
      <section className="py-16 lg:py-24 bg-slate-50 border-b border-[#E4EAF2]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1557D6] bg-[#EEF6FF] px-3.5 py-1 rounded-full border border-[#D0E1FD]">
              CURRICULUM SPECIFICATION
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#071A4A]">
              The 12-Week Role Readiness Architecture
            </h2>
            <p className="text-base text-[#3F4A60]">
              Engineered backwards from real entry-level Pharmacovigilance Associate job descriptions at global CROs and pharmaceutical sponsors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {/* Phase 1 */}
            <div className="p-6 rounded-3xl bg-white border border-[#E4EAF2] shadow-sm space-y-3 tone-light card-light">
              <span className="font-mono text-xs font-bold text-[#1557D6] uppercase">Weeks 01 &ndash; 03</span>
              <h3 className="font-serif text-lg font-bold text-[#071A4A]">Drug Safety Foundations</h3>
              <p className="text-xs text-[#69758A] leading-relaxed">
                Global regulatory frameworks: ICH E2A/E2B/E2D, US FDA 21 CFR 314.80, and EMA Good Vigilance Practice (GVP).
              </p>
              <div className="pt-2 border-t border-[#E4EAF2] text-[11px] font-semibold text-[#071A4A]">
                Key Deliverable: 4 Valid Criteria Triage Matrix
              </div>
            </div>

            {/* Phase 2 */}
            <div className="p-6 rounded-3xl bg-white border border-[#E4EAF2] shadow-sm space-y-3 tone-light card-light">
              <span className="font-mono text-xs font-bold text-[#6946E8] uppercase">Weeks 04 &ndash; 06</span>
              <h3 className="font-serif text-lg font-bold text-[#071A4A]">MedDRA 27.0 Hierarchy</h3>
              <p className="text-xs text-[#69758A] leading-relaxed">
                SOC, HLGT, HLT, PT, and LLT coding rules. Selection points (PT vs LLT) and ambiguous verbatim term resolution.
              </p>
              <div className="pt-2 border-t border-[#E4EAF2] text-[11px] font-semibold text-[#071A4A]">
                Key Deliverable: 50-Term Clinical Coding Dossier
              </div>
            </div>

            {/* Phase 3 */}
            <div className="p-6 rounded-3xl bg-white border border-[#E4EAF2] shadow-sm space-y-3 tone-light card-light">
              <span className="font-mono text-xs font-bold text-[#27B9B3] uppercase">Weeks 07 &ndash; 09</span>
              <h3 className="font-serif text-lg font-bold text-[#071A4A]">ICSR Processing &amp; Narratives</h3>
              <p className="text-xs text-[#69758A] leading-relaxed">
                Source document extraction, adverse event causality evaluation (WHO-UMC/Naranjo), and chronological safety narratives.
              </p>
              <div className="pt-2 border-t border-[#E4EAF2] text-[11px] font-semibold text-[#071A4A]">
                Key Deliverable: 10 Full ICSR Narrative Reports
              </div>
            </div>

            {/* Phase 4 */}
            <div className="p-6 rounded-3xl bg-white border border-[#E4EAF2] shadow-sm space-y-3 tone-light card-light">
              <span className="font-mono text-xs font-bold text-[#1557D6] uppercase">Weeks 10 &ndash; 12</span>
              <h3 className="font-serif text-lg font-bold text-[#071A4A]">Capstone Audit &amp; ACRI</h3>
              <p className="text-xs text-[#69758A] leading-relaxed">
                Simulated regulatory audit review, quality control check, signal detection introduction, and ACRI benchmarking.
              </p>
              <div className="pt-2 border-t border-[#E4EAF2] text-[11px] font-semibold text-[#071A4A]">
                Key Deliverable: ACRI Industry Ready Credential
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: BUILT FROM 247+ CRO & PHARMA JDS */}
      {/* ========================================================================= */}
      <section className="py-16 lg:py-24 bg-white border-b border-[#E4EAF2] tone-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1557D6] bg-[#EEF6FF] px-3.5 py-1 rounded-full border border-[#D0E1FD]">
                EVIDENCE-BASED DESIGN
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#071A4A]">
                Built from 247+ CRO &amp; Pharma Job Descriptions
              </h2>
              <p className="text-sm sm:text-base text-[#3F4A60] leading-relaxed">
                We analyzed hundreds of entry-level Pharmacovigilance Associate job postings across IQVIA, Cognizant, Parexel, Novartis, Accenture, and Syneos Health.
              </p>

              <div className="space-y-3">
                <div
                  onMouseEnter={() => setActiveLaptopPill("icsr")}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    activeLaptopPill === "icsr"
                      ? "border-[#1557D6] bg-[#EEF6FF]/60 shadow-sm"
                      : "border-[#E4EAF2] bg-white tone-light card-light"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold text-[#071A4A]">
                    <span>ICSR Case Intake &amp; Triage</span>
                    <span className="text-[#1557D6]">88% of JDs require</span>
                  </div>
                  <p className="text-xs text-[#69758A] mt-1">
                    Demonstrated ability to assess 4 valid criteria and distinguish between serious and non-serious adverse events.
                  </p>
                </div>

                <div
                  onMouseEnter={() => setActiveLaptopPill("meddra")}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    activeLaptopPill === "meddra"
                      ? "border-[#6946E8] bg-purple-50/60 shadow-sm"
                      : "border-[#E4EAF2] bg-white tone-light card-light"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold text-[#071A4A]">
                    <span>MedDRA Medical Coding</span>
                    <span className="text-[#6946E8]">94% of JDs require</span>
                  </div>
                  <p className="text-xs text-[#69758A] mt-1">
                    Precision in assigning accurate Preferred Terms (PT) without misrepresenting patient clinical records.
                  </p>
                </div>

                <div
                  onMouseEnter={() => setActiveLaptopPill("narrative")}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    activeLaptopPill === "narrative"
                      ? "border-[#27B9B3] bg-teal-50/60 shadow-sm"
                      : "border-[#E4EAF2] bg-white tone-light card-light"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold text-[#071A4A]">
                    <span>Safety Narrative Writing</span>
                    <span className="text-[#27B9B3]">81% of JDs require</span>
                  </div>
                  <p className="text-xs text-[#69758A] mt-1">
                    Writing clean, medical English narratives outlining concomitant medications, history, and dechallenge outcomes.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-3xl border border-[#E4EAF2] bg-slate-50 p-6 sm:p-8 space-y-6 shadow-md">
                <div className="flex items-center justify-between pb-4 border-b border-[#E4EAF2]">
                  <span className="font-mono text-xs font-bold uppercase text-[#071A4A]">TOP EMPLOYER SAMPLING</span>
                  <span className="text-xs text-[#1557D6] font-semibold">HYD &bull; BLR &bull; PUNE</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-xl bg-white border border-[#E4EAF2] tone-light card-light">
                    <span className="font-bold text-sm text-[#071A4A]">IQVIA</span>
                    <p className="text-[11px] text-[#69758A] mt-0.5">Drug Safety Associate I</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-[#E4EAF2] tone-light card-light">
                    <span className="font-bold text-sm text-[#071A4A]">Cognizant</span>
                    <p className="text-[11px] text-[#69758A] mt-0.5">Process Specialist - PV</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-[#E4EAF2] tone-light card-light">
                    <span className="font-bold text-sm text-[#071A4A]">Parexel</span>
                    <p className="text-[11px] text-[#69758A] mt-0.5">Safety Services Associate</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-[#E4EAF2] tone-light card-light">
                    <span className="font-bold text-sm text-[#071A4A]">Novartis</span>
                    <p className="text-[11px] text-[#69758A] mt-0.5">Clinical Safety Trainee</p>
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-[#EEF6FF] border border-[#D0E1FD] text-xs text-[#071A4A] flex items-center justify-between">
                  <span>Entry-Level Compensation Benchmark:</span>
                  <span className="font-bold text-[#1557D6] font-mono">₹4.2L &ndash; ₹6.5L PA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: WHO THIS PROGRAM IS FOR & CAREER FIT EVALUATOR */}
      {/* ========================================================================= */}
      <section className="py-16 lg:py-24 bg-slate-50 border-b border-[#E4EAF2]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1557D6] bg-[#EEF6FF] px-3.5 py-1 rounded-full border border-[#D0E1FD]">
              TARGET CANDIDATES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#071A4A]">
              Is Pharmacovigilance the Right Fit for You?
            </h2>
            <p className="text-base text-[#3F4A60]">
              Evaluate your degree and career traits against what global pharmacovigilance teams look for.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mt-12">
            {/* Degree Pathways Cards */}
            <div className="lg:col-span-7 space-y-3">
              <div className="p-4 rounded-2xl bg-white border border-[#E4EAF2] shadow-sm tone-light card-light">
                <h4 className="text-sm font-bold text-[#071A4A]">B.Pharm &amp; M.Pharm Graduates</h4>
                <p className="text-xs text-[#69758A] mt-1">
                  Transform textbook pharmacology and adverse drug reactions into high-growth corporate careers with CROs and MNCs.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-[#E4EAF2] shadow-sm tone-light card-light">
                <h4 className="text-sm font-bold text-[#071A4A]">Pharm.D Graduates</h4>
                <p className="text-xs text-[#69758A] mt-1">
                  Leverage clinical hospital clerkship experience directly into medical review, complex case triage, and causality assessment.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-[#E4EAF2] shadow-sm tone-light card-light">
                <h4 className="text-sm font-bold text-[#071A4A]">BDS &amp; MBBS Doctors</h4>
                <p className="text-xs text-[#69758A] mt-1">
                  Step into high-leverage Medical Safety Reviewer and Safety Physician tracks without hospital night shifts.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-[#E4EAF2] shadow-sm tone-light card-light">
                <h4 className="text-sm font-bold text-[#071A4A]">Life Sciences (B.Sc / M.Sc Biotech, Biochem)</h4>
                <p className="text-xs text-[#69758A] mt-1">
                  Structured bridge into corporate pharmaceutical data operations with zero prior IT experience needed.
                </p>
              </div>
            </div>

            {/* Interactive Trait Matcher */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-[#E4EAF2] bg-white p-6 sm:p-8 space-y-5 shadow-xl tone-light card-light">
                <div className="flex items-center justify-between pb-3 border-b border-[#E4EAF2]">
                  <span className="font-mono text-xs font-bold uppercase text-[#071A4A]">ROLE FIT CALCULATOR</span>
                  <span className="text-xs font-bold text-[#1557D6] bg-[#EEF6FF] px-2.5 py-1 rounded-full">
                    Match: {matchedTraits.size} / 5 Traits
                  </span>
                </div>

                <p className="text-xs text-[#69758A]">
                  Select the characteristics that match your strengths:
                </p>

                <div className="space-y-2">
                  {[
                    "High attention to medical & typographical detail",
                    "Interest in drug safety regulations & ethics",
                    "Comfort with clinical reports & medical records",
                    "Preference for desk-based corporate clinical work",
                    "Strong written English communication",
                  ].map((trait, idx) => (
                    <div
                      key={idx}
                      onClick={() => toggleTrait(idx)}
                      className={`p-2.5 rounded-xl border text-xs font-medium cursor-pointer transition-colors flex items-center justify-between ${
                        matchedTraits.has(idx)
                          ? "border-[#1557D6] bg-[#EEF6FF] text-[#071A4A]"
                          : "border-[#E4EAF2] text-[#69758A] hover:bg-slate-50"
                      }`}
                    >
                      <span>{trait}</span>
                      {matchedTraits.has(idx) ? (
                        <Check className="h-4 w-4 text-[#1557D6] shrink-0" />
                      ) : (
                        <div className="h-4 w-4 rounded border border-slate-300 shrink-0" />
                      )}
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setIsCounsellorModalOpen(true)}
                    className="w-full py-3 rounded-full bg-[#071A4A] hover:bg-[#1557D6] text-white text-xs font-bold transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Discuss Your Fit with a Counsellor</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7: REAL DELIVERABLES & INTERNSHIP PROOF-OF-WORK */}
      {/* ========================================================================= */}
      <section className="py-16 lg:py-24 bg-white border-b border-[#E4EAF2] tone-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1557D6] bg-[#EEF6FF] px-3.5 py-1 rounded-full border border-[#D0E1FD]">
              VERIFIED OUTPUTS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#071A4A]">
              Walk Into Interviews with Concrete Proof of Work
            </h2>
            <p className="text-base text-[#3F4A60]">
              Rather than asking interviewers to believe what you studied, place your verified clinical case dossiers on the table.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="p-6 rounded-3xl border border-[#E4EAF2] bg-slate-50 space-y-4">
              <div className="h-10 w-10 rounded-2xl bg-[#EEF6FF] flex items-center justify-center text-[#1557D6]">
                <FileText className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#071A4A]">ICSR Processing Portfolio</h3>
              <p className="text-xs text-[#69758A] leading-relaxed">
                Complete triage, causality score sheet, and source document audit trail for 10 simulated real-world cases.
              </p>
            </div>

            <div className="p-6 rounded-3xl border border-[#E4EAF2] bg-slate-50 space-y-4">
              <div className="h-10 w-10 rounded-2xl bg-purple-50 flex items-center justify-center text-[#6946E8]">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#071A4A]">MedDRA Coding Audit Record</h3>
              <p className="text-xs text-[#69758A] leading-relaxed">
                Documented term mapping demonstrating precise distinction between Preferred Terms (PT) and Lowest Level Terms (LLT).
              </p>
            </div>

            <div className="p-6 rounded-3xl border border-[#E4EAF2] bg-slate-50 space-y-4">
              <div className="h-10 w-10 rounded-2xl bg-teal-50 flex items-center justify-center text-[#27B9B3]">
                <Award className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#071A4A]">ACRI Verified Credential</h3>
              <p className="text-xs text-[#69758A] leading-relaxed">
                Verifiable 100-point candidate benchmark report detailing accuracy in regulatory clock adherence and narrative clarity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 8: FOR COLLEGES & INSTITUTIONAL PARTNERS */}
      {/* ========================================================================= */}
      <section className="py-16 lg:py-24 bg-slate-50 border-b border-[#E4EAF2]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1557D6] bg-[#EEF6FF] px-3.5 py-1 rounded-full border border-[#D0E1FD]">
                CAMPUS TO CORPORATE
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#071A4A]">
                Empowering Pharmacy Colleges with Industry-Aligned Labs
              </h2>
              <p className="text-base text-[#3F4A60] leading-relaxed">
                We collaborate directly with pharmacy institutions, universities, and training directors to integrate practical clinical data workflows into pre-placement semesters.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-[#EEF6FF] flex items-center justify-center text-[#1557D6] shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-sm text-[#071A4A] font-medium">
                    Integrated ICSR case processing labs for final-year B.Pharm &amp; Pharm.D cohorts
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-[#EEF6FF] flex items-center justify-center text-[#1557D6] shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-sm text-[#071A4A] font-medium">
                    Guest masterclasses led by active CRO team leads and safety physicians
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-[#EEF6FF] flex items-center justify-center text-[#1557D6] shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-sm text-[#071A4A] font-medium">
                    Institutional placement readiness indexing with direct recruitment pipelines
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="p-8 rounded-3xl bg-white border border-[#E4EAF2] shadow-xl text-center space-y-5 tone-light card-light">
                <Building2 className="h-12 w-12 text-[#1557D6] mx-auto" />
                <h3 className="font-serif text-2xl font-bold text-[#071A4A]">College Partnership Inquiry</h3>
                <p className="text-xs text-[#69758A]">
                  Connect with Arzon Institutional Advisory to explore workshops, labs, and placement collaboration for your campus.
                </p>
                <Link
                  to="/recruiters"
                  className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-full bg-[#071A4A] hover:bg-[#1557D6] text-white text-xs font-bold transition-colors"
                >
                  <span>Explore Institutional Partnerships</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 9: COMPREHENSIVE CANDIDATE FAQS */}
      {/* ========================================================================= */}
      <section className="py-16 lg:py-24 bg-white border-b border-[#E4EAF2] tone-light">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1557D6] bg-[#EEF6FF] px-3.5 py-1 rounded-full border border-[#D0E1FD]">
              QUESTIONS ANSWERED
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#071A4A]">
              Frequently Asked Questions
            </h2>
            <p className="text-base text-[#3F4A60]">
              Everything you need to know about starting your Pharmacovigilance journey.
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                q: "Can I join while completing my final year of B.Pharm, M.Pharm, or Pharm.D?",
                a: "Yes. In fact, final-year students benefit the most because they complete their role readiness deliverables before campus and off-campus recruitment drives commence, giving them a significant advantage over peers.",
              },
              {
                q: "Do I need coding or software experience to learn MedDRA and ICSR processing?",
                a: "No software coding is required. Pharmacovigilance is a medical and clinical data discipline, not computer programming. You will work with medical dictionaries, case narrative templates, and safety tracking systems.",
              },
              {
                q: "How much time per week is required for the 12-week program?",
                a: "The program is designed for students and working professionals, requiring approximately 6 to 8 hours per week, including guided case study reviews, MedDRA assignments, and live mentor Q&A sessions.",
              },
              {
                q: "What is the difference between this program and generic video courses?",
                a: "Generic courses offer passive video watching. Arzon trains you through hands-on ICSR case files, MedDRA 27.0 term mapping, and safety narrative authoring under regulatory clocks, culminating in verified proof of work.",
              },
              {
                q: "How does the 1-on-1 Career Counsellor discussion work?",
                a: "It is a complimentary 15-minute diagnostic session with an Arzon career specialist who reviews your degree, graduation timeline, and career preferences to map your optimal entry point into clinical data careers.",
              },
            ].map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-[#E4EAF2] overflow-hidden bg-slate-50/50"
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-sm sm:text-base font-bold text-[#071A4A] hover:bg-slate-50 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-[#69758A] transition-transform shrink-0 ml-2 ${
                      activeFaq === idx ? "rotate-180 text-[#1557D6]" : ""
                    }`}
                  />
                </button>
                {activeFaq === idx && (
                  <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-[#3F4A60] leading-relaxed border-t border-[#E4EAF2] pt-3 bg-white tone-light">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 10: CLOSING HIGH-AUTHORITY CTA BAND */}
      {/* ========================================================================= */}
      <section className="py-20 lg:py-28 bg-[#071A4A] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient from-[#1557D6]/20 via-transparent to-transparent pointer-events-none" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative space-y-6">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-300 bg-white/10 px-4 py-1.5 rounded-full border border-white/20 tone-light">
            START YOUR JOURNEY TODAY
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            Ready to Build Toward a Pharmacovigilance Career?
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
            Speak directly with an Arzon healthcare career specialist. We will evaluate your degree, identify high-growth CRO roles, and guide your readiness.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              type="button"
              onClick={() => setIsCounsellorModalOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full bg-white text-[#071A4A] hover:bg-[#EEF6FF] px-8 py-4 text-sm sm:text-base font-bold transition-all shadow-xl hover:scale-[1.02] cursor-pointer tone-light"
            >
              <MessageSquare className="h-4 w-4 text-[#1557D6]" />
              <span>TALK TO A CAREER COUNSELLOR</span>
              <ArrowRight className="h-4 w-4 text-[#1557D6]" />
            </button>

            <a
              href="https://wa.me/918977626999?text=Hello%20Arzon%2C%20I%20would%20like%20to%20talk%20to%20a%20career%20counsellor"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/5 hover:bg-white/10 px-7 py-4 text-sm font-semibold text-white transition-colors tone-light"
            >
              <span>DIRECT WHATSAPP CHAT</span>
              <ExternalLink className="h-4 w-4 text-slate-300" />
            </a>
          </div>

          <p className="text-xs text-slate-400 pt-2">
            No fees &bull; No automated marketing calls &bull; Direct conversation with clinical career advisors
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* MODAL 1: LIVE ICSR CASE INSPECTION DRAWER */}
      {/* ========================================================================= */}
      {isCaseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white tone-light card-light border border-[#E4EAF2] rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setIsCaseModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-[#69758A]"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#1557D6] uppercase">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span>ICH E2B(R3) CASE INSPECTION LAB</span>
            </div>

            <h3 className="font-serif text-2xl font-bold text-[#071A4A]">Case Dossier: PV-2048</h3>

            <div className="space-y-4 text-xs font-mono bg-slate-50 p-4 rounded-2xl border border-[#E4EAF2]">
              <div>
                <span className="text-[#69758A] block mb-1">Source Clinical Narrative:</span>
                <p className="text-[#071A4A] bg-white p-3 rounded-xl border border-[#E4EAF2] leading-relaxed tone-light">
                  &ldquo;A 34-year-old female patient presented with severe diffuse maculopapular rash 3 days following the initiation of oral Amoxicillin 500mg TID for streptococcal pharyngitis. Patient had no prior history of penicillin hypersensitivity. Dechallenge was positive upon drug discontinuation.&rdquo;
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[#69758A] block mb-1">Suspect Drug:</span>
                  <span className="font-bold text-[#071A4A]">Amoxicillin 500mg TID</span>
                </div>
                <div>
                  <span className="text-[#69758A] block mb-1">MedDRA 27.0 PT:</span>
                  <span className="font-bold text-[#6946E8]">Rash maculo-papular (10037868)</span>
                </div>
                <div>
                  <span className="text-[#69758A] block mb-1">WHO-UMC Causality:</span>
                  <span className="font-bold text-emerald-700">Probable / Likely</span>
                </div>
                <div>
                  <span className="text-[#69758A] block mb-1">Regulatory Clock:</span>
                  <span className="font-bold text-amber-600">15-Day Expedited</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsCaseModalOpen(false)}
                className="px-5 py-2.5 rounded-full border border-[#E4EAF2] text-xs font-bold text-[#071A4A] hover:bg-slate-50"
              >
                Close Drawer
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsCaseModalOpen(false);
                  setIsCounsellorModalOpen(true);
                }}
                className="px-5 py-2.5 rounded-full bg-[#071A4A] hover:bg-[#1557D6] text-white text-xs font-bold"
              >
                Practice Similar Cases &rarr;
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: PV DAY-IN-THE-LIFE WALKTHROUGH MODAL */}
      {/* ========================================================================= */}
      {isVideoModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-[#071A4A]/75 p-4 sm:items-center sm:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsVideoModalOpen(false);
          }}
        >
          <div
            ref={videoDialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="pv-walkthrough-title"
            aria-describedby="pv-walkthrough-description"
            className="my-auto flex w-full max-w-2xl flex-col overflow-hidden rounded-[28px] border border-[#DCE4EE] bg-white tone-light card-light shadow-[0_30px_90px_rgba(7,26,74,0.28)]"
          >
            <div className="flex items-start justify-between gap-5 border-b border-[#E4EAF2] px-6 py-5 sm:px-8">
              <div className="min-w-0">
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-[#1557D6]">
                  Operational walkthrough
                </span>
                <h3
                  id="pv-walkthrough-title"
                  className="mt-1 font-serif text-2xl font-bold leading-tight text-[#071A4A] sm:text-[30px]"
                >
                  Inside a Global Drug Safety Operations Hub
                </h3>
              </div>

              <button
                ref={videoCloseRef}
                type="button"
                onClick={() => setIsVideoModalOpen(false)}
                aria-label="Close walkthrough"
                className="shrink-0 rounded-full p-2 text-[#69758A] transition-colors hover:bg-[#F5F7FA] hover:text-[#071A4A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1557D6] focus-visible:ring-offset-2"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="p-5 sm:p-7">
              <div
                id="pv-walkthrough-description"
                className="arzon-dark-modal rounded-2xl border border-white/10 bg-slate-900 p-5 text-white sm:p-6"
              >
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <span className="relative flex h-3 w-3 shrink-0" aria-hidden="true">
                    <span className="absolute inset-0 rounded-full bg-red-400 opacity-30" />
                    <span className="relative h-3 w-3 rounded-full bg-red-400" />
                  </span>
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-slate-300">
                    Simulated PV Associate workday
                  </span>
                </div>

                <div className="mt-5 space-y-3">
                  {[
                    "Check the safety mailbox for CIOMS-I and MedWatch source reports.",
                    "Run duplicate checks against the safety database before case processing.",
                    "Query the MedDRA browser and select the appropriate medical terminology.",
                    "Draft the chronological safety narrative and flag the regulatory submission date.",
                  ].map((step, index) => (
                    <div key={step} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-white/10 font-mono text-[10px] font-bold text-white">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p className="text-sm leading-6 text-slate-300">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs leading-5 text-[#69758A]">
                  A simulated workflow showing the type of operational sequence taught in the programme.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsVideoModalOpen(false);
                    setIsCounsellorModalOpen(true);
                  }}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#071A4A] px-5 text-xs font-bold text-white transition-colors hover:bg-[#1557D6] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1557D6] focus-visible:ring-offset-2"
                >
                  Discuss training with a counsellor
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: SKILL DETAIL MODAL */}
      {/* ========================================================================= */}
      {selectedSkillModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white tone-light card-light border border-[#E4EAF2] rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-4 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setSelectedSkillModal(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-[#69758A]"
            >
              <X className="h-5 w-5" />
            </button>

            <span className="text-xs font-mono font-bold uppercase text-[#1557D6]">COMPETENCY BENCHMARK</span>
            <h3 className="font-serif text-2xl font-bold text-[#071A4A]">
              {selectedSkillModal === "icsr" && "ICSR Case Processing"}
              {selectedSkillModal === "meddra" && "MedDRA 27.0 Hierarchy"}
              {selectedSkillModal === "safety" && "Safety Assessment & Triage"}
              {selectedSkillModal === "narrative" && "Clinical Safety Narratives"}
            </h3>

            <p className="text-sm text-[#3F4A60] leading-relaxed">
              {selectedSkillModal === "icsr" &&
                "Learn the end-to-end receipt, validation, prioritization, and triage of spontaneous, clinical trial, and literature adverse event cases under ICH E2B(R3) global standards."}
              {selectedSkillModal === "meddra" &&
                "Master the hierarchical assignment of medical concepts across SOC, HLGT, HLT, PT, and LLT with precision, adhering to Points to Consider (PtC) regulatory guidelines."}
              {selectedSkillModal === "safety" &&
                "Understand seriousness criteria (death, life-threatening, hospitalization, disability, congenital anomaly) and WHO-UMC causality evaluation algorithms."}
              {selectedSkillModal === "narrative" &&
                "Author concise, comprehensive, and legally robust clinical case narratives summarizing complex patient courses for FDA and EMA regulatory inspectors."}
            </p>

            <div className="pt-3 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedSkillModal(null)}
                className="px-5 py-2.5 rounded-full bg-[#071A4A] text-white text-xs font-bold hover:bg-[#1557D6]"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 4: COUNSELLOR CONSULTATION SCHEDULER (WITH DPDP 2023 CONSENT) */}
      {/* ========================================================================= */}
      {isCounsellorModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white tone-light card-light border border-[#E4EAF2] rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl relative max-h-[95vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setIsCounsellorModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-[#69758A]"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#1557D6] uppercase">
              <MessageSquare className="h-4 w-4 text-emerald-500" />
              <span>CAREER COUNSELLOR SESSION</span>
            </div>

            <h3 className="font-serif text-2xl font-bold text-[#071A4A]">
              Schedule a 1-on-1 Consultation
            </h3>

            <p className="text-xs text-[#69758A] leading-relaxed">
              Discuss your pharmacy/life-science background, target CRO salaries, and whether Pharmacovigilance is the right career for you.
            </p>

            <form onSubmit={handleCounsellorSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-[#071A4A] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={counsellorForm.name}
                  onChange={(e) => setCounsellorForm({ ...counsellorForm, name: e.target.value })}
                  placeholder="e.g. Priya Sharma"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E4EAF2] bg-slate-50 tone-light text-[#071A4A] focus:outline-none focus:ring-1 focus:ring-[#1557D6]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#071A4A] mb-1">
                  WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  value={counsellorForm.phone}
                  onChange={(e) => setCounsellorForm({ ...counsellorForm, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E4EAF2] bg-slate-50 tone-light text-[#071A4A] focus:outline-none focus:ring-1 focus:ring-[#1557D6]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#071A4A] mb-1">
                    Degree
                  </label>
                  <select
                    value={counsellorForm.degree}
                    onChange={(e) => setCounsellorForm({ ...counsellorForm, degree: e.target.value })}
                    className="w-full px-3 py-2.5 text-xs rounded-xl border border-[#E4EAF2] bg-slate-50 tone-light text-[#071A4A]"
                  >
                    <option value="B.Pharm">B.Pharm</option>
                    <option value="M.Pharm">M.Pharm</option>
                    <option value="Pharm.D">Pharm.D</option>
                    <option value="BDS/MBBS">BDS / MBBS</option>
                    <option value="B.Sc/M.Sc Life Sciences">B.Sc / M.Sc Life Sciences</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#071A4A] mb-1">
                    Passout Year
                  </label>
                  <select
                    value={counsellorForm.passoutYear}
                    onChange={(e) => setCounsellorForm({ ...counsellorForm, passoutYear: e.target.value })}
                    className="w-full px-3 py-2.5 text-xs rounded-xl border border-[#E4EAF2] bg-slate-50 tone-light text-[#071A4A]"
                  >
                    <option value="2026">2026 (Final Year)</option>
                    <option value="2025">2025</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="Earlier">Earlier</option>
                  </select>
                </div>
              </div>

              {/* DPDP Act 2023 Legal Consent Checkbox */}
              <div className="pt-2 flex items-start gap-2.5 text-[11px] text-[#69758A]">
                <input
                  type="checkbox"
                  id="dpdp-consent-home"
                  checked={dpdpConsent}
                  onChange={(e) => setDpdpConsent(e.target.checked)}
                  className="mt-0.5 h-3.5 w-3.5 rounded border-[#E4EAF2] text-[#1557D6] focus:ring-[#1557D6]"
                />
                <label htmlFor="dpdp-consent-home" className="leading-tight">
                  I consent to Arzon Global contacting me via WhatsApp/Phone for career counselling in accordance with the Digital Personal Data Protection (DPDP) Act, 2023.
                </label>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-full bg-[#071A4A] hover:bg-[#1557D6] text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Lock className="h-3.5 w-3.5 text-emerald-400" />
                  <span>{isSubmitting ? "Connecting..." : "CONFIRM & CONNECT WITH COUNSELLOR"}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}