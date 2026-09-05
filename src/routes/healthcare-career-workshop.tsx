import { useState, useRef, useEffect, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import mentorKumailImg from "@/assets/mentor-kumail.jpg";
import arzonIcon from "@/assets/arzon-icon.webp";
import {
  Calendar,
  Clock,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Check,
  Phone,
  Mail,
  Video,
  FileText,
  AlertCircle,
  Briefcase,
  ChevronDown,
  Activity,
  Award,
  ExternalLink,
  HelpCircle,
  X,
  User,
  Building2,
  Search,
  Target,
  Compass,
  Layers,
  Copy,
  CheckCheck,
  Download,
  AlertTriangle,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { Footer } from "@/components/landing/Footer";
import { pageSeo } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/jsonLd";
import { submitWorkshopLead } from "@/lib/workshop.functions";
import { track } from "@/lib/track";
import { WORKSHOP_CONFIG, buildGoogleCalendarUrl } from "@/data/workshopConfig";
import { WorkshopStarterKitTeaser } from "@/components/workshop/WorkshopStarterKitTeaser";
import { WorkshopCertificatePreview } from "@/components/workshop/WorkshopCertificatePreview";
import { generateStarterKitPDF } from "@/lib/starter-kit-pdf";
import { ExtremePremiumOnboardingView } from "@/components/workshop/ExtremePremiumOnboardingView";
import { z } from "zod";

const searchSchema = z
  .object({
    v: z.string().optional(),
    utm_source: z.string().optional(),
    utm_medium: z.string().optional(),
    utm_campaign: z.string().optional(),
    utm_content: z.string().optional(),
    utm_term: z.string().optional(),
    registered: z.any().optional(),
    onboarding: z.any().optional(),
  })
  .passthrough();

export const Route = createFileRoute("/healthcare-career-workshop")({
  validateSearch: (search: Record<string, unknown>) => {
    try {
      return searchSchema.parse(search);
    } catch {
      return {};
    }
  },
  head: () => {
    const title = "Arzon Healthcare Hiring Lab | 75-Min Live Case & Interview Simulation";
    const description =
      "See how healthcare employers test freshers before you spend money on another course. Live 75-minute simulated case triage, MedDRA coding, and technical interview simulation.";

    const ps = pageSeo({
      title,
      description,
      path: "/healthcare-career-workshop",
    });

    return {
      meta: [{ title }, ...ps.meta],
      links: ps.links,
      scripts: [
        {
          type: "application/ld+json",
          children: breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Healthcare Hiring Lab", path: "/healthcare-career-workshop" },
          ]),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationEvent",
            name: "Arzon Healthcare Hiring Lab: Live Case & Interview Simulation",
            description,
            eventStatus: "https://schema.org/EventScheduled",
            eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
            startDate: "2026-09-06T18:00:00+05:30",
            endDate: "2026-09-06T19:15:00+05:30",
            isAccessibleForFree: true,
            organizer: {
              "@type": "Organization",
              name: "Arzon Global",
              url: "https://arzoncareers.in",
            },
            performer: {
              "@type": "Person",
              name: "Mohamed Kumail Abbas",
              jobTitle: "Manager, Pharmacovigilance",
            },
            location: {
              "@type": "VirtualLocation",
              url: "https://meet.google.com/pyc-qvxs-quz",
            },
          }),
        },
      ],
    };
  },
  component: HealthcareCareerWorkshopPage,
});

export function HealthcareCareerWorkshopPage() {
  const search = Route.useSearch();
  const cfg = WORKSHOP_CONFIG;
  const isVariantB = search.v === "b";

  // ── Diagnostic Fresher Test State ──────────────────────────────────────────
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [testAnswered, setTestAnswered] = useState(false);

  // ── Real Case Interactive Step State ──────────────────────────────────────
  const [activeCaseStep, setActiveCaseStep] = useState<number>(0);

  // ── Live Questions Accordion / Open Item ──────────────────────────────────
  const [openQuestionIdx, setOpenQuestionIdx] = useState<number | null>(null);

  // ── Form State ─────────────────────────────────────────────────────────────
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [degree, setDegree] = useState(cfg.eligibleDegrees[0]);
  const [email, setEmail] = useState("");
  const [graduationYear, setGraduationYear] = useState("2025");
  const [currentStatus, setCurrentStatus] = useState("Recently graduated");
  const [interestTrack, setInterestTrack] = useState("Pharmacovigilance");
  const [appliedBefore, setAppliedBefore] = useState("No");

  const [showEmailField, setShowEmailField] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isRegisteredParam = Boolean(search.registered || search.onboarding);
  const [isSuccess, setIsSuccess] = useState(isRegisteredParam);
  const [showFullSyllabus, setShowFullSyllabus] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ name?: string; phone?: string; email?: string }>({});
  const [copiedMeet, setCopiedMeet] = useState(false);

  // Restore registered candidate session if exists, or prefill sample if URL has ?onboarding=1
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("arzon_registered_candidate");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.name) setName(parsed.name);
        if (parsed.phone) setPhone(parsed.phone);
        if (parsed.degree) setDegree(parsed.degree);
        if (parsed.email) setEmail(parsed.email);
        setIsSuccess(true);
      } else if (isRegisteredParam) {
        setName("Dr. Ananya Sharma");
        setPhone("9876543210");
        setDegree("Pharm.D");
      }
    } catch {
      // ignore
    }
  }, [isRegisteredParam]);

  // Post-registration career problem intent
  const [postRegProblem, setPostRegProblem] = useState<string | null>(null);

  // FAQ Accordion State
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  // Refs for section observation & scroll targets
  const [trackedFields, setTrackedFields] = useState<Set<string>>(new Set());
  const registrationStartTracked = useRef(false);

  const formRef = useRef<HTMLDivElement>(null);
  const caseRef = useRef<HTMLDivElement>(null);
  const mentorRef = useRef<HTMLDivElement>(null);
  const testRef = useRef<HTMLDivElement>(null);

  const handleCopyMeet = () => {
    navigator.clipboard.writeText(cfg.meetUrl);
    setCopiedMeet(true);
    setTimeout(() => setCopiedMeet(false), 2500);
  };

  const scrollToForm = () => {
    track("hero_cta_click", {
      props: {
        variant: isVariantB ? "b" : "a",
        source: "cta_button",
      },
    });
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      const firstInput = formRef.current.querySelector("input");
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 450);
      }
    }
  };

  // 1. Initial Page View Tracking
  useEffect(() => {
    track("page_view", {
      props: {
        path: "/healthcare-career-workshop",
        variant: isVariantB ? "b" : "a",
        utm_source: search.utm_source,
        utm_medium: search.utm_medium,
        utm_campaign: search.utm_campaign,
        utm_content: search.utm_content,
        utm_term: search.utm_term,
      },
    });
  }, [isVariantB, search]);

  // 2. Scroll Depth Tracking & Intersection Observer
  useEffect(() => {
    const trackedDepths = new Set<number>();

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      const progress = Math.round((window.scrollY / scrollHeight) * 100);

      [25, 50, 75, 90].forEach((depth) => {
        if (progress >= depth && !trackedDepths.has(depth)) {
          trackedDepths.add(depth);
          track(`scroll_${depth}` as any, {
            props: { variant: isVariantB ? "b" : "a" },
          });
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === caseRef.current) {
              track("case_section_view", { props: { variant: isVariantB ? "b" : "a" } });
            } else if (entry.target === mentorRef.current) {
              track("mentor_section_view", { props: { variant: isVariantB ? "b" : "a" } });
            }
          }
        });
      },
      { threshold: 0.15 }
    );

    if (caseRef.current) observer.observe(caseRef.current);
    if (mentorRef.current) observer.observe(mentorRef.current);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, [isVariantB]);

  const handleInputFocus = () => {
    if (!registrationStartTracked.current) {
      registrationStartTracked.current = true;
      track("registration_start", { props: { variant: isVariantB ? "b" : "a" } });
    }
  };

  const markFieldCompleted = (fieldName: string) => {
    if (!trackedFields.has(fieldName)) {
      setTrackedFields((prev) => new Set(prev).add(fieldName));
      track("registration_field_completed", {
        props: { field: fieldName, variant: isVariantB ? "b" : "a" },
      });
    }
  };

  const handleTestOptionClick = (option: string) => {
    setSelectedAnswer(option);
    setTestAnswered(true);
    track("test_option_selected", {
      props: {
        option,
        isCorrect: option === "B",
      },
    });
  };

  const handlePostRegProblemSelect = (problem: string) => {
    setPostRegProblem(problem);
    track("post_reg_intent_selected", {
      props: { problem },
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setErrorMsg(null);
    setFieldErrors({});

    const cleanName = name.trim();
    let cleanPhone = phone.trim().replace(/\D/g, "");

    // Normalize country code / leading zeros if user typed +91 or 0
    if (cleanPhone.length === 12 && cleanPhone.startsWith("91")) {
      cleanPhone = cleanPhone.slice(2);
    } else if (cleanPhone.length === 11 && cleanPhone.startsWith("0")) {
      cleanPhone = cleanPhone.slice(1);
    }

    if (cleanName.length < 2) {
      setErrorMsg("Please enter your full name (minimum 2 characters).");
      setFieldErrors({ name: "Please enter your full name." });
      document.getElementById("form-name")?.focus();
      return;
    }

    if (cleanPhone.length !== 10) {
      setErrorMsg("Please enter a valid 10-digit WhatsApp number (e.g. 98765 43210).");
      setFieldErrors({ phone: "Enter a valid 10-digit WhatsApp number." });
      document.getElementById("form-phone")?.focus();
      return;
    }

    const cleanEmail = email.trim();
    if (cleanEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setErrorMsg("Please enter a valid email address.");
      setFieldErrors({ email: "Enter a valid email address." });
      document.getElementById("form-email")?.focus();
      return;
    }

    setIsSubmitting(true);
    track("registration_submit", {
      props: {
        variant: isVariantB ? "b" : "a",
        degree,
      },
    });

    try {
      await submitWorkshopLead({
        data: {
          name: cleanName,
          phone: cleanPhone,
          degree,
          email: cleanEmail || undefined,
          graduationYear,
          currentStatus,
          interestTrack,
          appliedBefore,
          source: "workshop-landing-page",
          utmSource: search.utm_source ?? undefined,
          utmMedium: search.utm_medium ?? undefined,
          utmCampaign: search.utm_campaign ?? undefined,
          utmContent: search.utm_content ?? undefined,
          utmTerm: search.utm_term ?? undefined,
          variant: isVariantB ? "b" : "a",
        },
      });

      sessionStorage.setItem(
        "arzon_registered_candidate",
        JSON.stringify({
          name: cleanName,
          phone: cleanPhone,
          degree,
          email: cleanEmail || undefined,
        })
      );
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      track("registration_success", {
        props: {
          variant: isVariantB ? "b" : "a",
          degree,
        },
      });
    } catch (err: unknown) {
      console.error("[Workshop Registration Error]", err);
      const msg = err instanceof Error ? err.message : "";
      if (msg.includes("Already registered") || msg.includes("already registered")) {
        setErrorMsg("You are already registered for this workshop. Session details will be sent via WhatsApp.");
      } else if (msg.includes("Too many requests") || msg.includes("rate limit")) {
        setErrorMsg("Too many attempts. Please wait a moment and try again.");
      } else {
        setErrorMsg("Unable to reserve your seat right now. Please check your details and try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Case dossier steps data
  const caseSteps = [
    {
      id: "01",
      title: "Case Intake",
      summary: "Clinical incident arrives from hospital pharmacist",
      tag: "Intake Triage",
      detail:
        "Hospital clinical pharmacist submits an adverse event notification. Safety operations team verifies reporter credentials and records initial Day 0 timestamp.",
    },
    {
      id: "02",
      title: "Validity Check",
      summary: "ICH-E2D 4-element mandatory verification",
      tag: "Compliance Gate",
      detail:
        "All 4 mandatory elements verified: (1) Identifiable Patient (48yo female), (2) Identifiable Reporter (Hospital pharmacist), (3) Suspect Drug (Metformin ER 500mg), (4) Adverse Event (Acute lactic acidosis).",
    },
    {
      id: "03",
      title: "Medical Review",
      summary: "Clinical causality & timeline evaluation",
      tag: "Clinical Assessment",
      detail:
        "Physician safety assessment evaluates pre-existing renal insufficiency, drug dechallenge timeline, and potential concomitant medications contributing to acidosis.",
    },
    {
      id: "04",
      title: "MedDRA Coding",
      summary: "Standardized hierarchical term mapping",
      tag: "Dictionary Coding",
      detail:
        "Verbatim clinical phrase 'acute lactic acidosis with renal distress' mapped to MedDRA Preferred Term (PT): Lactic acidosis under System Organ Class (SOC): Metabolism and nutrition disorders.",
    },
    {
      id: "05",
      title: "Seriousness Check",
      summary: "Regulatory criteria triage",
      tag: "Regulatory Classification",
      detail:
        "Event meets international criteria for SERIOUS because it resulted in emergency inpatient hospitalization. Triggers expedited health authority requirements.",
    },
    {
      id: "06",
      title: "Reporting Clock",
      summary: "Expedited regulatory clock calculation",
      tag: "Timeline Control",
      detail:
        "Because the event is serious and labeled in package insert, a strict 15-day expedited reporting clock applies for submission to US FDA, EMA, and national regulators.",
    },
    {
      id: "07",
      title: "Submission",
      summary: "Safety database & E2B transmission",
      tag: "Gateway Transmission",
      detail:
        "Case file entered in safety database (e.g., Argus Safety), XML generated in E2B(R3) format, and transmitted electronically to regulatory agency gateways.",
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#FAF9F6] text-stone-900 font-sans selection:bg-[#1B3F8B]/15 selection:text-[#0B1325]">
      {/* ─────────────────────────────────────────────────────────────
          00 · MINIMAL SLIM HEADER (NO FLOATING TAGS)
         ───────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 h-14 sm:h-16 bg-white/95 backdrop-blur-md border-b border-stone-200/80 px-3 sm:px-6 lg:px-8 tone-light">
        <div className="mx-auto max-w-7xl h-full flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-6">
            <Link to="/" className="flex items-center gap-2 sm:gap-2.5 group">
              <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center overflow-hidden rounded-lg bg-black ring-1 ring-stone-900/10 shadow-2xs shrink-0">
                <img
                  src={arzonIcon}
                  alt="Arzon Global"
                  width={28}
                  height={28}
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="leading-none text-left">
                <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.22em] text-[#0B1325] block">
                  ARZON
                </span>
                <span className="font-mono text-[8px] sm:text-[9px] font-bold tracking-[0.28em] text-[#1B3F8B] block mt-0.5">
                  GLOBAL
                </span>
              </div>
            </Link>
            {isSuccess ? (
              <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full">
                <span className="h-2 w-2 rounded-full bg-emerald-500 motion-safe:animate-pulse" />
                <span>ADMISSION CONFIRMED · PRIORITY SEAT LOCKED</span>
              </div>
            ) : (
              <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-stone-600">
                <a href="#hiring-test" className="hover:text-[#1B3F8B] transition-colors">
                  Hiring Test
                </a>
                <a href="#real-case" className="hover:text-[#1B3F8B] transition-colors">
                  Real Case
                </a>
                <a href="#mentor" className="hover:text-[#1B3F8B] transition-colors">
                  Mentor
                </a>
                <a href="#faq" className="hover:text-[#1B3F8B] transition-colors">
                  FAQ
                </a>
              </nav>
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {isSuccess ? (
              <>
                <Link
                  to="/starter-kit"
                  className="inline-flex h-8 sm:h-9 items-center justify-center rounded-xl bg-[#0B1325] hover:bg-[#1B3F8B] px-3 sm:px-4 text-[11px] sm:text-xs font-bold text-white transition-all shadow-xs cursor-pointer shrink-0"
                >
                  Open Field Guide →
                </Link>
                <a
                  href={cfg.meetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex h-9 items-center justify-center rounded-xl border border-stone-300 bg-white hover:bg-stone-50 px-3.5 text-xs font-bold text-stone-800 transition-all cursor-pointer tone-light"
                >
                  Join Room
                </a>
              </>
            ) : (
              <>
                <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-stone-600 bg-stone-100/90 border border-stone-200 px-3 py-1.5 rounded-full">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span>Sun 6 Sept · 6:00 PM IST · Live</span>
                </div>
                <button
                  type="button"
                  onClick={scrollToForm}
                  className="inline-flex h-8 sm:h-9 items-center justify-center rounded-xl bg-[#0B1325] hover:bg-[#1B3F8B] px-3 sm:px-4 text-[11px] sm:text-xs font-bold text-white transition-all shadow-xs cursor-pointer shrink-0"
                >
                  Reserve Free Seat
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="relative z-10">
        {/* ── EXTREME PREMIUM ONBOARDING EXPERIENCE (WHEN REGISTERED) ── */}
        {isSuccess && (
          <section className="py-6 sm:py-14 border-b border-stone-200/90 bg-[#FAF9F6]">
            <div className="mx-auto max-w-4xl px-3 sm:px-6 lg:px-8">
              <ExtremePremiumOnboardingView
                candidateName={name}
                candidateDegree={degree}
                candidatePhone={phone}
                candidateEmail={email}
                cfg={cfg}
                isVariantB={isVariantB}
                copiedMeet={copiedMeet}
                onCopyMeet={handleCopyMeet}
                postRegProblem={postRegProblem}
                onSelectProblem={handlePostRegProblemSelect}
                onViewSyllabusToggle={() => setShowFullSyllabus((prev) => !prev)}
                isSyllabusVisible={showFullSyllabus}
              />
            </div>
          </section>
        )}

        {/* ── 22 ACQUISITION SECTIONS: SHOWN WHEN NOT REGISTERED OR WHEN USER EXPANDS SYLLABUS ── */}
        {(!isSuccess || showFullSyllabus) && (
          <>
            {/* ─────────────────────────────────────────────────────────────
                01 · HERO SECTION: YC-INSPIRED PRODUCT ACQUISITION
               ───────────────────────────────────────────────────────────── */}
            <section className="relative border-b border-stone-200/90 pt-6 sm:pt-14 pb-10 sm:pb-16 overflow-hidden bg-white tone-light">
          <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Problem Statement & Primary Action */}
              <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-left">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-stone-100 border border-stone-200/90 text-stone-800 font-mono text-[10px] sm:text-[11px] font-bold tracking-wider uppercase">
                    <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-emerald-500" />
                    ARZON HEALTHCARE HIRING LAB
                  </span>
                  <span className="font-mono text-[11px] sm:text-xs text-stone-500">
                    75-Min Live Case &amp; Interview Simulation
                  </span>
                </div>

                <div className="space-y-2.5 sm:space-y-3">
                  <h1 className="text-[26px] sm:text-4xl lg:text-[44px] font-serif font-bold tracking-tight text-stone-950 leading-[1.18] sm:leading-[1.14]">
                    You Have the Degree.
                    <br />
                    <span className="text-[#1B3F8B]">But Can You Pass the Technical Round?</span>
                  </h1>

                  <p className="text-sm sm:text-lg text-stone-700 font-sans leading-relaxed max-w-2xl">
                    Most healthcare graduates prepare from college notes. Entry-level hiring tests something very different: case handling, technical terminology, workflow decisions, and practical judgment.
                  </p>
                </div>

                {/* Core Mechanism Strip */}
                <div className="p-3 sm:p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs font-mono space-y-2">
                  <span className="text-[10px] text-stone-500 font-bold uppercase tracking-wider block">
                    HOW A CASE IS EVALUATED IN TECHNICAL SCREENING:
                  </span>
                  <div className="flex items-center gap-1.5 sm:gap-2 text-stone-800 font-bold text-[10px] sm:text-xs overflow-x-auto pb-1 scrollbar-none">
                    <span className="px-2 py-1 rounded bg-white border border-stone-200 shadow-2xs shrink-0">CASE INTAKE</span>
                    <span className="text-stone-400 shrink-0">→</span>
                    <span className="px-2 py-1 rounded bg-white border border-stone-200 shadow-2xs shrink-0">TRIAGE</span>
                    <span className="text-stone-400 shrink-0">→</span>
                    <span className="px-2 py-1 rounded bg-white border border-stone-200 shadow-2xs shrink-0">CODING</span>
                    <span className="text-stone-400 shrink-0">→</span>
                    <span className="px-2 py-1 rounded bg-white border border-stone-200 shadow-2xs shrink-0">REPORTING</span>
                    <span className="text-stone-400 shrink-0">→</span>
                    <span className="px-2 py-1 rounded bg-[#0B1325] text-white shrink-0">INTERVIEW</span>
                  </div>
                </div>

                {/* Single Dominant CTA */}
                <div className="pt-1 sm:pt-2 space-y-2.5 sm:space-y-3">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
                    <button
                      type="button"
                      onClick={scrollToForm}
                      className="w-full sm:w-auto px-7 py-3.5 sm:px-8 sm:py-4 rounded-xl bg-[#0B1325] hover:bg-[#1B3F8B] text-white font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>Reserve My Free Seat →</span>
                    </button>
                    <a
                      href="#hiring-test"
                      className="w-full sm:w-auto px-4 py-3 sm:px-5 sm:py-3.5 rounded-xl border border-stone-300 hover:border-stone-400 bg-white text-stone-800 font-mono text-xs font-semibold transition-all text-center"
                    >
                      Try The Fresher Test ↓
                    </a>
                  </div>
                  <p className="text-[11px] sm:text-xs text-stone-500 font-sans">
                    Free live session · 75 minutes · No prior PV experience required · No credit card
                  </p>
                </div>
              </div>

              {/* Right Column: Case Intelligence Interface (Visual Proof) */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-full max-w-md rounded-2xl border border-stone-300 bg-white shadow-xl overflow-hidden text-left tone-light">
                  <div className="p-3 sm:p-3.5 bg-stone-900 text-white flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 motion-safe:animate-pulse" />
                      <span className="font-bold tracking-wider text-[11px] sm:text-xs">CASE INTELLIGENCE INTERFACE</span>
                    </div>
                    <span className="text-[9px] sm:text-[10px] text-stone-400 bg-stone-800 px-1.5 sm:px-2 py-0.5 rounded border border-stone-700">
                      SIMULATED CASE
                    </span>
                  </div>

                  <div className="p-4 sm:p-5 space-y-3.5 font-mono text-xs bg-stone-50/70 border-b border-stone-200">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <span className="text-[10px] text-stone-500 uppercase block font-bold">CASE ID</span>
                        <span className="font-bold text-stone-900 text-sm">PV-2026-041</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-stone-500 uppercase block font-bold">STATUS</span>
                        <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block text-[11px] sm:text-xs">
                          CASE RECEIVED
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 border-t border-stone-200 pt-3">
                      <div>
                        <span className="text-[10px] text-stone-500 uppercase block font-bold">PATIENT</span>
                        <span className="text-stone-800 font-sans font-medium text-xs sm:text-sm">48-year-old female · Inpatient Hospitalization</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-stone-500 uppercase block font-bold">SUSPECT PRODUCT</span>
                        <span className="text-stone-800 font-sans font-medium text-xs sm:text-sm">Metformin ER 500 mg (Oral Administration)</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-stone-500 uppercase block font-bold">REPORTED EVENT</span>
                        <span className="text-rose-700 font-sans font-bold text-xs sm:text-sm">Acute Lactic Acidosis with Renal Distress</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-stone-500 uppercase block font-bold">REPORTER</span>
                        <span className="text-stone-800 font-sans font-medium text-xs sm:text-sm">Hospital Clinical Pharmacist + Attending Physician</span>
                      </div>
                    </div>
                  </div>

                  {/* Workflow Indicators */}
                  <div className="p-3 sm:p-4 bg-white space-y-2 tone-light">
                    <span className="text-[10px] font-mono text-stone-500 font-bold uppercase tracking-wider block">
                      OPERATIONAL WORKFLOW STAGES:
                    </span>
                    <div className="grid grid-cols-5 gap-1 text-center font-mono text-[9px] sm:text-[10px]">
                      <div className="p-1 sm:p-1.5 rounded bg-blue-50 border border-blue-200 text-[#1B3F8B] font-bold truncate">
                        IDENTIFY
                      </div>
                      <div className="p-1 sm:p-1.5 rounded bg-stone-100 border border-stone-200 text-stone-700 truncate">
                        REVIEW
                      </div>
                      <div className="p-1 sm:p-1.5 rounded bg-stone-100 border border-stone-200 text-stone-700 truncate">
                        CODE
                      </div>
                      <div className="p-1 sm:p-1.5 rounded bg-stone-100 border border-stone-200 text-stone-700 truncate">
                        ASSESS
                      </div>
                      <div className="p-1 sm:p-1.5 rounded bg-stone-100 border border-stone-200 text-stone-700 truncate">
                        REPORT
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            02 · EVENT INFORMATION RAIL
           ───────────────────────────────────────────────────────────── */}
        <section className="border-b border-stone-200 bg-stone-100/80 py-3 sm:py-4">
          <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 text-left font-mono text-xs text-stone-800">
              <div className="flex items-center gap-2 sm:gap-2.5 bg-white p-2.5 sm:p-3 rounded-xl border border-stone-200 shadow-2xs tone-light">
                <Calendar className="w-4 h-4 text-[#1B3F8B] shrink-0" />
                <div className="min-w-0">
                  <span className="text-[9px] sm:text-[10px] text-stone-400 block uppercase font-bold">DATE</span>
                  <span className="font-bold text-stone-900 truncate block text-[11px] sm:text-xs">Sun, 06 Sep 2026</span>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-2.5 bg-white p-2.5 sm:p-3 rounded-xl border border-stone-200 shadow-2xs tone-light">
                <Clock className="w-4 h-4 text-[#1B3F8B] shrink-0" />
                <div className="min-w-0">
                  <span className="text-[9px] sm:text-[10px] text-stone-400 block uppercase font-bold">TIME</span>
                  <span className="font-bold text-stone-900 truncate block text-[11px] sm:text-xs">6:00 PM IST</span>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-2.5 bg-white p-2.5 sm:p-3 rounded-xl border border-stone-200 shadow-2xs tone-light">
                <Activity className="w-4 h-4 text-[#1B3F8B] shrink-0" />
                <div className="min-w-0">
                  <span className="text-[9px] sm:text-[10px] text-stone-400 block uppercase font-bold">DURATION</span>
                  <span className="font-bold text-stone-900 truncate block text-[11px] sm:text-xs">75 Minutes</span>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-2.5 bg-white p-2.5 sm:p-3 rounded-xl border border-stone-200 shadow-2xs tone-light">
                <Video className="w-4 h-4 text-emerald-600 shrink-0" />
                <div className="min-w-0">
                  <span className="text-[9px] sm:text-[10px] text-stone-400 block uppercase font-bold">ROOM</span>
                  <span className="font-bold text-emerald-800 truncate block text-[11px] sm:text-xs">Google Meet</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            03 · INTERACTIVE FRESHER TEST (THE IMMEDIATE "AHA" MOMENT)
           ───────────────────────────────────────────────────────────── */}
        <section id="hiring-test" ref={testRef} className="py-10 sm:py-20 border-b border-stone-200 bg-white tone-light">
          <div className="mx-auto max-w-4xl px-3 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
            <div className="text-center space-y-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#1B3F8B] font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                <Search className="w-3.5 h-3.5" />
                INTERACTIVE DIAGNOSTIC
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-950">
                Let's Start with One Question.
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 font-sans">
                You have 30 seconds. See how corporate safety teams test freshers.
              </p>
            </div>

            {/* Question Card */}
            <div className="p-4 sm:p-8 rounded-2xl border-2 border-stone-300 bg-stone-50/50 shadow-md space-y-4 sm:space-y-6 text-left">
              <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-stone-200 space-y-2 font-mono text-xs tone-light">
                <div className="flex items-center justify-between text-stone-500 font-bold text-[10px] uppercase">
                  <span>A SAFETY REPORT ARRIVES AT YOUR DESK</span>
                  <span>TIME: DAY 0</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-stone-800">
                  <div><strong>Patient:</strong> 48-year-old female</div>
                  <div><strong>Drug:</strong> Metformin ER 500 mg</div>
                  <div><strong>Event:</strong> Acute lactic acidosis</div>
                  <div><strong>Reporter:</strong> Hospital clinical pharmacist</div>
                </div>
              </div>

              <div className="space-y-2.5 sm:space-y-3">
                <p className="font-sans font-bold text-sm sm:text-lg text-stone-950 leading-snug">
                  What would you check first before treating this as a valid Individual Case Safety Report (ICSR)?
                </p>

                {/* 4 Interactive Answer Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-1">
                  {[
                    { id: "A", text: "Drug mechanism and receptor binding" },
                    { id: "B", text: "Patient and reporter identifiability" },
                    { id: "C", text: "Drug price and batch revenue" },
                    { id: "D", text: "Manufacturer annual revenue" },
                  ].map((option) => {
                    const isSelected = selectedAnswer === option.id;
                    const isCorrect = option.id === "B";
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => handleTestOptionClick(option.id)}
                        className={`p-3.5 sm:p-4 rounded-xl border text-left font-sans text-xs sm:text-sm transition-all flex items-start gap-3 cursor-pointer min-h-[48px] ${
                          testAnswered
                            ? isCorrect
                              ? "border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold"
                              : isSelected
                              ? "border-rose-400 bg-rose-50 text-rose-950"
                              : "border-stone-200 bg-white text-stone-500 opacity-60"
                            : "border-stone-200 bg-white hover:border-[#1B3F8B] hover:shadow-sm text-stone-800"
                        }`}
                      >
                        <span
                          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg font-mono text-xs font-bold ${
                            testAnswered && isCorrect
                              ? "bg-emerald-600 text-white"
                              : isSelected
                              ? "bg-rose-600 text-white"
                              : "bg-stone-100 text-stone-700"
                          }`}
                        >
                          {option.id}
                        </span>
                        <span className="pt-0.5">{option.text}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Reveal Explanation */}
              {testAnswered && (
                <div className="p-4 sm:p-5 rounded-xl border border-stone-300 bg-white space-y-3 sm:space-y-4 tone-light animate-in fade-in duration-300">
                  <div className="flex items-center gap-2">
                    {selectedAnswer === "B" ? (
                      <div className="flex items-center gap-1.5 text-emerald-700 font-mono text-xs font-bold uppercase">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>✓ Correct Answer</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-amber-800 font-mono text-xs font-bold uppercase">
                        <AlertCircle className="w-4 h-4 text-amber-600" />
                        <span>Not quite. Correct Answer: B</span>
                      </div>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-stone-700 font-sans leading-relaxed">
                    Under international ICH-E2D guidelines, a safety report is legally valid only when 4 minimum criteria exist: an <strong>identifiable patient</strong>, an <strong>identifiable reporter</strong>, a <strong>suspect product</strong>, and an <strong>adverse event</strong>.
                  </p>

                  <div className="p-3.5 sm:p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
                    <div className="space-y-1">
                      <span className="font-mono text-xs font-bold text-stone-900 block uppercase">
                        THAT WAS THE EASY PART.
                      </span>
                      <p className="text-xs text-stone-600 font-sans">
                        Now imagine the technical interviewer hands you the full case file and asks: <em>"What happens next?"</em> Would you know how to assess seriousness, code MedDRA terms, calculate Day 0, or determine if a 15-day expedited clock applies?
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3 pt-1">
                      <span className="text-xs font-mono text-[#1B3F8B] font-bold">
                        See the complete case processed live this Sunday.
                      </span>
                      <button
                        type="button"
                        onClick={scrollToForm}
                        className="px-5 py-3 rounded-xl bg-[#0B1325] hover:bg-[#1B3F8B] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-xs shrink-0 text-center"
                      >
                        Reserve Free Seat →
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            04 · THE CAREER GAP: DEGREE KNOWLEDGE VS HIRING WORKFLOW
           ───────────────────────────────────────────────────────────── */}
        <section className="py-10 sm:py-20 border-b border-stone-200 bg-stone-50/70">
          <div className="mx-auto max-w-5xl px-3 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-2.5 sm:space-y-3">
              <span className="font-mono text-xs font-bold text-[#1B3F8B] uppercase tracking-wider">
                EDITORIAL COMPARISON
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-950">
                Your Degree is Not the Problem.
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
                The problem is that college examinations and corporate hiring evaluations test completely different skills.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-left">
              {/* College Column */}
              <div className="p-4.5 sm:p-6 rounded-2xl border border-stone-200 bg-white space-y-3.5 sm:space-y-4 shadow-xs tone-light">
                <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                  <span className="font-mono text-xs font-bold text-stone-500 uppercase tracking-wider">
                    COLLEGE PREPARATION
                  </span>
                  <span className="text-[10px] font-mono text-stone-400">Academic Scope</span>
                </div>
                <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-stone-600 font-sans">
                  <li className="flex items-start gap-2.5">
                    <span className="text-stone-400 font-bold mt-0.5">•</span>
                    <span>Memorizing chemical synthesis pathways and receptor mechanics</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-stone-400 font-bold mt-0.5">•</span>
                    <span>Reciting textbook definitions of pharmacology and classification</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-stone-400 font-bold mt-0.5">•</span>
                    <span>Written essay exams where answers have no regulatory deadline</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-stone-400 font-bold mt-0.5">•</span>
                    <span>Theoretical drug safety concepts with zero database exposure</span>
                  </li>
                </ul>
              </div>

              {/* Hiring Desk Column */}
              <div className="p-4.5 sm:p-6 rounded-2xl border-2 border-[#1B3F8B]/30 bg-white space-y-3.5 sm:space-y-4 shadow-xs tone-light">
                <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                  <span className="font-mono text-xs font-bold text-[#1B3F8B] uppercase tracking-wider">
                    HIRING EVALUATION (TECHNICAL ROUND)
                  </span>
                  <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Day 1 Expectations
                  </span>
                </div>
                <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-stone-800 font-sans">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Verifying the 4-point ICH-E2D validity criteria on real clinical notes</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Navigating 5-tier MedDRA hierarchies from verbatim to Preferred Term</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Seriousness triage (inpatient, life-threatening, disability)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Calculating Day 0 and complying with 7/15-day expedited reporting clocks</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Central Insight Banner */}
            <div className="p-4.5 sm:p-5 rounded-2xl bg-[#0B1325] text-white text-left flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3.5 sm:gap-4">
              <div>
                <span className="font-mono text-[10px] uppercase text-emerald-400 font-bold tracking-wider block">
                  THE CENTRAL REALITY
                </span>
                <p className="text-xs sm:text-sm font-sans text-stone-200 mt-0.5 leading-relaxed">
                  You may simply be preparing for the academic version of the job instead of the operational version.
                </p>
              </div>
              <button
                type="button"
                onClick={scrollToForm}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white hover:bg-stone-100 text-[#0B1325] font-mono text-xs font-bold uppercase tracking-wider transition-all shrink-0 cursor-pointer text-center"
              >
                See The Operational Version →
              </button>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            05 · REAL CASE SECTION: EXPANDABLE CLINICAL DOSSIER
           ───────────────────────────────────────────────────────────── */}
        <section id="real-case" ref={caseRef} className="py-10 sm:py-20 border-b border-stone-200 bg-white tone-light">
          <div className="mx-auto max-w-5xl px-3 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-2.5 sm:space-y-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#1B3F8B] font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                <FileText className="w-3.5 h-3.5" />
                SIMULATED TRAINING CASE
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-950">
                See the Case. Not the Theory.
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
                Click or swipe through each stage to see how an adverse event note transforms from raw clinical text into structured regulatory data.
              </p>
            </div>

            {/* Dossier Card */}
            <div className="rounded-2xl border-2 border-stone-300 bg-stone-50/50 shadow-lg overflow-hidden text-left">
              {/* Header Strip */}
              <div className="px-4 sm:px-6 py-3 bg-stone-900 text-white flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                  <span className="font-bold text-[11px] sm:text-xs truncate">SIMULATED SAFETY CASE · METFORMIN ER 500 MG</span>
                </div>
                <span className="text-[9px] sm:text-[10px] text-stone-300">ICH-E2D SPECIFICATION</span>
              </div>

              {/* Case Summary Pill Strip */}
              <div className="p-3.5 sm:p-5 bg-white border-b border-stone-200 text-xs font-mono grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 tone-light">
                <div>
                  <span className="text-[9px] sm:text-[10px] text-stone-400 block uppercase font-bold">Patient</span>
                  <span className="text-stone-800 font-bold text-xs sm:text-sm">48F (Inpatient)</span>
                </div>
                <div>
                  <span className="text-[9px] sm:text-[10px] text-stone-400 block uppercase font-bold">Suspect Drug</span>
                  <span className="text-stone-800 font-bold text-xs sm:text-sm">Metformin 500mg</span>
                </div>
                <div>
                  <span className="text-[9px] sm:text-[10px] text-stone-400 block uppercase font-bold">Reported Event</span>
                  <span className="text-rose-700 font-bold text-xs sm:text-sm">Lactic Acidosis</span>
                </div>
                <div>
                  <span className="text-[9px] sm:text-[10px] text-stone-400 block uppercase font-bold">Reporter</span>
                  <span className="text-stone-800 font-bold text-xs sm:text-sm">Clinical Pharmacist</span>
                </div>
              </div>

              {/* 7-Step Interactive Module Tabs with Mobile Swipe */}
              <div className="p-4 sm:p-6 space-y-4 sm:space-y-5 bg-stone-50/70">
                <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1.5 scrollbar-none">
                  {caseSteps.map((step, idx) => (
                    <button
                      key={step.id}
                      type="button"
                      onClick={() => {
                        setActiveCaseStep(idx);
                        track("case_module_clicked", { props: { step: step.title } });
                      }}
                      className={`px-3 py-2 rounded-lg font-mono text-xs transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                        activeCaseStep === idx
                          ? "bg-[#0B1325] text-white shadow-xs font-bold"
                          : "bg-white border border-stone-200 text-stone-700 hover:border-stone-300 font-medium"
                      }`}
                    >
                      <span className="opacity-75">{step.id}</span>
                      <span>{step.title}</span>
                    </button>
                  ))}
                </div>

                {/* Active Step Content Display */}
                <div className="p-4 sm:p-5 rounded-xl border border-stone-200 bg-white space-y-2.5 sm:space-y-3 tone-light">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#1B3F8B] uppercase tracking-wider">
                      STAGE {caseSteps[activeCaseStep].id} · {caseSteps[activeCaseStep].title}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-stone-600 bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
                      {caseSteps[activeCaseStep].tag}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-stone-950 font-sans">
                    {caseSteps[activeCaseStep].summary}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-700 font-sans leading-relaxed">
                    {caseSteps[activeCaseStep].detail}
                  </p>
                </div>

                {/* "Your Task" Prompt Box */}
                <div className="p-3.5 sm:p-4 rounded-xl bg-blue-50/70 border border-blue-200 space-y-1.5 text-xs">
                  <span className="font-mono font-bold text-[#1B3F8B] uppercase tracking-wider block">
                    YOUR TASK IN THE LIVE SESSION:
                  </span>
                  <p className="text-stone-800 font-sans leading-relaxed">
                    What makes this case valid? How serious is it? How would you code the event in MedDRA? What happens next? Does a 15-day regulatory clock apply? We will process the entire case together step-by-step.
                  </p>
                </div>
              </div>

              {/* Dossier Bottom CTA Bar */}
              <div className="p-3.5 sm:p-4 bg-stone-100 border-t border-stone-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
                <span className="text-stone-600 font-sans text-xs">
                  Live walkthrough conducted by Mohamed Kumail Abbas (Novaspire / Ex-Cognizant).
                </span>
                <button
                  type="button"
                  onClick={scrollToForm}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#0B1325] hover:bg-[#1B3F8B] text-white font-mono font-bold transition-all cursor-pointer shadow-xs shrink-0 text-center"
                >
                  Join Case Walkthrough →
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            06 · "NOT ANOTHER WEBINAR": OBJECTION BUSTER
           ───────────────────────────────────────────────────────────── */}
        <section className="py-10 sm:py-20 border-b border-stone-200 bg-stone-50/70">
          <div className="mx-auto max-w-5xl px-3 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-2.5 sm:space-y-3">
              <span className="font-mono text-xs font-bold text-rose-700 uppercase tracking-wider">
                TRANSPARENT DIFFERENTIATION
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-950">
                If You've Seen 20 Generic Career Webinars, This is Different.
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
                You won't spend 75 minutes looking at motivational quotes or a disguised sales pitch.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-left">
              {/* Generic Webinar */}
              <div className="p-4.5 sm:p-6 rounded-2xl border border-stone-200 bg-white space-y-3.5 sm:space-y-4 shadow-xs tone-light">
                <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                  <span className="font-mono text-xs font-bold text-rose-700 uppercase tracking-wider">
                    ✕ GENERIC CAREER WEBINAR
                  </span>
                  <span className="text-[10px] font-mono text-stone-400">Standard EdTech</span>
                </div>
                <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-stone-600 font-sans">
                  <li className="flex items-start gap-2.5">
                    <span className="text-rose-500 font-bold shrink-0">✕</span>
                    <span>40 slides of theoretical definitions from outdated syllabus</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-rose-500 font-bold shrink-0">✕</span>
                    <span>Generic motivation: "The healthcare industry is booming"</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-rose-500 font-bold shrink-0">✕</span>
                    <span>Surface-level advice: "Improve your resume and build confidence"</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-rose-500 font-bold shrink-0">✕</span>
                    <span>A high-pressure sales pitch disguised as educational training</span>
                  </li>
                </ul>
              </div>

              {/* Arzon Hiring Lab */}
              <div className="p-4.5 sm:p-6 rounded-2xl border-2 border-emerald-600/40 bg-white space-y-3.5 sm:space-y-4 shadow-sm tone-light">
                <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                  <span className="font-mono text-xs font-bold text-emerald-800 uppercase tracking-wider">
                    ✓ ARZON HEALTHCARE HIRING LAB
                  </span>
                  <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Simulation Environment
                  </span>
                </div>
                <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-stone-900 font-sans">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Work through a complete simulated ICSR case live from triage to report</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Learn standard 5-tier MedDRA coding and seriousness criteria</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Face the exact technical questions interviewers test freshers on</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Direct microphone access to ask an active PV manager your real questions</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            07 · WHAT HIRING TEAMS TEST / INTERVIEW ROOM
           ───────────────────────────────────────────────────────────── */}
        <section className="py-10 sm:py-20 border-b border-stone-200 bg-white tone-light">
          <div className="mx-auto max-w-5xl px-3 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-2.5 sm:space-y-3">
              <span className="font-mono text-xs font-bold text-[#1B3F8B] uppercase tracking-wider">
                THE INTERVIEW ROOM
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-950">
                Now the Interview Starts.
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
                These are realistic technical prompts used by hiring teams to test whether freshers understand operational workflow.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-5 text-left">
              {/* Question 01 */}
              <div className="p-4 sm:p-5 rounded-2xl border border-stone-200 bg-stone-50/60 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#1B3F8B]">PROMPT 01</span>
                    <span className="text-[10px] font-mono text-stone-500 bg-white px-2 py-0.5 rounded border border-stone-200">
                      Case Validity
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-900 font-sans font-semibold leading-snug">
                    "A safety report contains a suspect drug and adverse event, but the reporter cannot be identified. Can this proceed as a valid ICSR?"
                  </p>
                </div>
                <div className="pt-2 border-t border-stone-200 text-[11px] font-mono text-stone-500">
                  Tests: ICH-E2D Minimum Criteria
                </div>
              </div>

              {/* Question 02 */}
              <div className="p-4 sm:p-5 rounded-2xl border border-stone-200 bg-stone-50/60 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#1B3F8B]">PROMPT 02</span>
                    <span className="text-[10px] font-mono text-stone-500 bg-white px-2 py-0.5 rounded border border-stone-200">
                      Seriousness Triage
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-900 font-sans font-semibold leading-snug">
                    "A patient was hospitalized after the reported event. What part of your assessment and regulatory clock changes?"
                  </p>
                </div>
                <div className="pt-2 border-t border-stone-200 text-[11px] font-mono text-stone-500">
                  Tests: Expedited Clocks &amp; Seriousness
                </div>
              </div>

              {/* Question 03 */}
              <div className="p-4 sm:p-5 rounded-2xl border border-stone-200 bg-stone-50/60 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#1B3F8B]">PROMPT 03</span>
                    <span className="text-[10px] font-mono text-stone-500 bg-white px-2 py-0.5 rounded border border-stone-200">
                      Day 0 Clocks
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-900 font-sans font-semibold leading-snug">
                    "You receive the case on Day 0. What should an entry-level candidate understand about regulatory escalation?"
                  </p>
                </div>
                <div className="pt-2 border-t border-stone-200 text-[11px] font-mono text-stone-500">
                  Tests: Operational Timelines
                </div>
              </div>
            </div>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={scrollToForm}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#0B1325] hover:bg-[#1B3F8B] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md"
              >
                <span>See How the Full Interview Simulation Works →</span>
              </button>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            08 · MENTOR: VERIFIED INDUSTRY PRACTITIONER
           ───────────────────────────────────────────────────────────── */}
        <section id="mentor" ref={mentorRef} className="py-10 sm:py-20 border-b border-stone-200 bg-stone-50/70">
          <div className="mx-auto max-w-6xl px-3 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
              {/* Left Column: Portrait & Authority Dossier */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-full max-w-sm rounded-2xl overflow-hidden border border-stone-200 bg-white shadow-xl tone-light">
                  <div className="p-3 sm:p-3.5 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-stone-600 uppercase tracking-wider">
                      SESSION FACULTY · PRACTITIONER
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-[#1B3F8B] font-mono text-[10px] font-bold">
                      M.Pharm
                    </span>
                  </div>

                  <div className="relative bg-stone-100 overflow-hidden flex items-center justify-center p-2.5 sm:p-3">
                    <img
                      src={mentorKumailImg}
                      alt="Mohamed Kumail Abbas - Manager, Pharmacovigilance"
                      className="w-full h-auto object-contain rounded-xl"
                    />
                  </div>

                  <div className="p-4 sm:p-5 bg-white border-t border-stone-200 space-y-3.5 sm:space-y-4 text-left tone-light">
                    <div>
                      <h3 className="font-serif font-bold text-stone-900 text-lg sm:text-xl">
                        Mohamed Kumail Abbas
                      </h3>
                      <p className="text-xs text-stone-600 font-sans mt-0.5">
                        Manager, Pharmacovigilance · Novaspire
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-1.5 sm:gap-2 pt-2.5 sm:pt-3 border-t border-stone-100 text-center font-mono">
                      <div className="p-2 sm:p-2.5 rounded-xl bg-stone-50 border border-stone-200/80">
                        <span className="text-sm sm:text-base font-bold text-[#1B3F8B] block">10K+</span>
                        <span className="text-[9px] sm:text-[10px] text-stone-500 font-sans block mt-0.5">Cases Directed</span>
                      </div>
                      <div className="p-2 sm:p-2.5 rounded-xl bg-stone-50 border border-stone-200/80">
                        <span className="text-sm sm:text-base font-bold text-stone-900 block">12+</span>
                        <span className="text-[9px] sm:text-[10px] text-stone-500 font-sans block mt-0.5">Years in PV</span>
                      </div>
                      <div className="p-2 sm:p-2.5 rounded-xl bg-stone-50 border border-stone-200/80">
                        <span className="text-sm sm:text-base font-bold text-emerald-700 block">FDA/EMA</span>
                        <span className="text-[9px] sm:text-[10px] text-stone-500 font-sans block mt-0.5">Standards</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Verified Corporate Career Path */}
              <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-left">
                <div className="space-y-2.5 sm:space-y-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#1B3F8B] font-mono text-xs font-bold uppercase tracking-wider border border-blue-200">
                    <Award className="w-3.5 h-3.5" />
                    WHO IS TEACHING THIS?
                  </span>
                  <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-serif font-bold text-stone-900 leading-tight">
                    Learn from Someone Who Actually Manages the Work.
                  </h2>
                  <p className="text-xs sm:text-base text-stone-700 font-sans leading-relaxed">
                    He isn't coming to give a motivational speech. He is walking you through how safety work is handled inside global CROs and what entry-level candidates need to understand to pass technical rounds.
                  </p>
                </div>

                {/* Verified Career Timeline */}
                <div className="space-y-2 pt-1">
                  <span className="text-[11px] sm:text-xs font-mono text-stone-600 uppercase tracking-wider font-bold block">
                    Verified Corporate Career Timeline:
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5 text-xs font-mono">
                    <div className="p-2.5 sm:p-3 rounded-xl bg-white border border-stone-200 text-left tone-light">
                      <span className="text-[10px] text-stone-400 block font-mono">01</span>
                      <span className="font-bold text-stone-900 block font-sans text-xs sm:text-sm">Quintiles</span>
                      <span className="text-stone-500 text-[10px] sm:text-[11px] font-sans">Safety Operations</span>
                    </div>
                    <div className="p-2.5 sm:p-3 rounded-xl bg-white border border-stone-200 text-left tone-light">
                      <span className="text-[10px] text-stone-400 block font-mono">02</span>
                      <span className="font-bold text-stone-900 block font-sans text-xs sm:text-sm">Indegene</span>
                      <span className="text-stone-500 text-[10px] sm:text-[11px] font-sans">Case Operations</span>
                    </div>
                    <div className="p-2.5 sm:p-3 rounded-xl bg-white border border-stone-200 text-left tone-light">
                      <span className="text-[10px] text-stone-400 block font-mono">03</span>
                      <span className="font-bold text-stone-900 block font-sans text-xs sm:text-sm">Norwich Clinical</span>
                      <span className="text-stone-500 text-[10px] sm:text-[11px] font-sans">Clinical Safety</span>
                    </div>
                    <div className="p-2.5 sm:p-3 rounded-xl bg-white border border-stone-200 text-left tone-light">
                      <span className="text-[10px] text-stone-400 block font-mono">04</span>
                      <span className="font-bold text-stone-900 block font-sans text-xs sm:text-sm">Accenture</span>
                      <span className="text-stone-500 text-[10px] sm:text-[11px] font-sans">Life Sciences PV</span>
                    </div>
                    <div className="p-2.5 sm:p-3 rounded-xl bg-white border border-stone-200 text-left tone-light">
                      <span className="text-[10px] text-stone-400 block font-mono">05</span>
                      <span className="font-bold text-stone-900 block font-sans text-xs sm:text-sm">Cognizant</span>
                      <span className="text-stone-500 text-[10px] sm:text-[11px] font-sans">PV Leadership</span>
                    </div>
                    <div className="p-2.5 sm:p-3 rounded-xl bg-blue-50/70 border border-blue-200 text-left tone-light">
                      <span className="text-[10px] text-[#1B3F8B] font-bold block font-mono">CURRENT</span>
                      <span className="font-bold text-stone-900 block font-sans text-xs sm:text-sm">Novaspire</span>
                      <span className="text-[#1B3F8B] text-[10px] sm:text-[11px] font-sans font-semibold">Manager, PV</span>
                    </div>
                  </div>
                </div>

                {/* 3 Core Focus Pillars */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 text-xs font-sans pt-1">
                  <div className="p-3 sm:p-3.5 rounded-xl bg-white border border-stone-200 space-y-1 tone-light">
                    <span className="font-mono text-[10px] font-bold text-[#1B3F8B] uppercase block">
                      CASE WORK
                    </span>
                    <p className="text-stone-700 text-xs">How a safety case actually moves through the workflow.</p>
                  </div>
                  <div className="p-3 sm:p-3.5 rounded-xl bg-white border border-stone-200 space-y-1 tone-light">
                    <span className="font-mono text-[10px] font-bold text-[#1B3F8B] uppercase block">
                      HIRING TEST
                    </span>
                    <p className="text-stone-700 text-xs">What technical interviewers test beyond college theory.</p>
                  </div>
                  <div className="p-3 sm:p-3.5 rounded-xl bg-white border border-stone-200 space-y-1 tone-light">
                    <span className="font-mono text-[10px] font-bold text-[#1B3F8B] uppercase block">
                      CAREER DECISION
                    </span>
                    <p className="text-stone-700 text-xs">Practical comparison: PV vs CDM vs Medical Coding.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            09 · LIVE QUESTIONS: WHAT YOU CAN ACTUALLY ASK
           ───────────────────────────────────────────────────────────── */}
        <section className="py-10 sm:py-20 border-b border-stone-200 bg-white tone-light">
          <div className="mx-auto max-w-5xl px-3 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-2.5 sm:space-y-3">
              <span className="font-mono text-xs font-bold text-[#1B3F8B] uppercase tracking-wider">
                DIRECT PRACTITIONER ACCESS
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-950">
                These Are the Questions You Should Be Asking.
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
                These are not pre-recorded answers. You can ask Mohamed Kumail Abbas directly during the live session.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5 text-left">
              {[
                {
                  q: "What does a PV fresher actually do on Day 1?",
                  sub: "Intake, document scanning, preliminary triage, and mentor observation.",
                },
                {
                  q: "What questions are asked in PV technical rounds?",
                  sub: "The 4 validity elements, seriousness criteria, and MedDRA translation scenarios.",
                },
                {
                  q: "Why am I sending applications but not getting callbacks?",
                  sub: "Resume keyword mismatch with automated corporate HR filters.",
                },
                {
                  q: "PV vs Medical Coding vs CDM—which makes sense for me?",
                  sub: "How analytical vs clinical skills map to each track's daily routine.",
                },
                {
                  q: "Do I actually need another course before applying?",
                  sub: "Distinguishing between genuine operational gaps and redundant certificates.",
                },
                {
                  q: "What should I learn before sending my next application?",
                  sub: "The core regulatory vocabulary that sets candidates apart in initial screens.",
                },
                {
                  q: "What salary can a healthcare fresher realistically expect?",
                  sub: "Transparent starting CTC benchmarks for Hyderabad, Bengaluru, and Pune.",
                },
                {
                  q: "How long does it usually take to become employable?",
                  sub: "The realistic timeline to bridge college study with entry-level job criteria.",
                },
              ].map((item, idx) => (
                <div
                  key={item.q}
                  className="p-3.5 sm:p-4 rounded-xl border border-stone-200 bg-stone-50/60 hover:border-stone-300 transition-all space-y-1"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-sans font-bold text-stone-900 text-xs sm:text-sm leading-snug">{item.q}</span>
                    <span className="font-mono text-[10px] text-[#1B3F8B] font-bold shrink-0">
                      #{idx + 1}
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-stone-600 font-sans leading-relaxed">{item.sub}</p>
                </div>
              ))}
            </div>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={scrollToForm}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#0B1325] hover:bg-[#1B3F8B] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md"
              >
                Reserve Seat to Ask Your Questions →
              </button>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            10 · 75-MINUTE EXPERIENCE: 4 CONCRETE STAGES
           ───────────────────────────────────────────────────────────── */}
        <section className="py-10 sm:py-20 border-b border-stone-200 bg-stone-50/70">
          <div className="mx-auto max-w-5xl px-3 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-2.5 sm:space-y-3">
              <span className="font-mono text-xs font-bold text-[#1B3F8B] uppercase tracking-wider">
                SESSION TIMELINE
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-950">
                75 Minutes. One Case. Four Stages.
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
                Structured like a live operating session rather than an academic lecture.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-left">
              {/* Stage 1 */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-2.5 sm:space-y-3 flex flex-col justify-between tone-light">
                <div className="space-y-1.5 sm:space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#1B3F8B]">00 - 20 MIN</span>
                    <span className="text-[10px] font-mono text-stone-400">STAGE 01</span>
                  </div>
                  <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900">
                    The Case Arrives
                  </h3>
                  <p className="text-xs text-stone-600 font-sans leading-relaxed">
                    You receive the clinical report. We check patient, reporter, product, and adverse event. Can the case be processed?
                  </p>
                </div>
                <div className="pt-2 border-t border-stone-100 text-[11px] font-mono text-[#1B3F8B] font-bold">
                  4-Point Validity Check
                </div>
              </div>

              {/* Stage 2 */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-2.5 sm:space-y-3 flex flex-col justify-between tone-light">
                <div className="space-y-1.5 sm:space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#1B3F8B]">20 - 45 MIN</span>
                    <span className="text-[10px] font-mono text-stone-400">STAGE 02</span>
                  </div>
                  <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900">
                    Case Gets Processed
                  </h3>
                  <p className="text-xs text-stone-600 font-sans leading-relaxed">
                    Medical review, seriousness, MedDRA coding, and regulatory clock evaluation. Watch raw notes turn into structured safety data.
                  </p>
                </div>
                <div className="pt-2 border-t border-stone-100 text-[11px] font-mono text-[#1B3F8B] font-bold">
                  MedDRA &amp; 15-Day Clock
                </div>
              </div>

              {/* Stage 3 */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-2.5 sm:space-y-3 flex flex-col justify-between tone-light">
                <div className="space-y-1.5 sm:space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#1B3F8B]">45 - 60 MIN</span>
                    <span className="text-[10px] font-mono text-stone-400">STAGE 03</span>
                  </div>
                  <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900">
                    The Interview Begins
                  </h3>
                  <p className="text-xs text-stone-600 font-sans leading-relaxed">
                    You get the exact questions technical interviewers use to test whether you understand the workflow and regulatory vocabulary.
                  </p>
                </div>
                <div className="pt-2 border-t border-stone-100 text-[11px] font-mono text-[#1B3F8B] font-bold">
                  Technical Screening Test
                </div>
              </div>

              {/* Stage 4 */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-2.5 sm:space-y-3 flex flex-col justify-between tone-light">
                <div className="space-y-1.5 sm:space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#1B3F8B]">60 - 75 MIN</span>
                    <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.2 rounded">
                      LIVE
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900">
                    Open Floor Q&amp;A
                  </h3>
                  <p className="text-xs text-stone-600 font-sans leading-relaxed">
                    Ask the practitioner directly about jobs, skills, interviews, career tracks, courses, salaries, and eligibility.
                  </p>
                </div>
                <div className="pt-2 border-t border-stone-100 text-[11px] font-mono text-[#1B3F8B] font-bold">
                  Direct Microphone Access
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            11 · WHAT YOU WILL KNOW AFTERWARDS (8 OUTCOMES)
           ───────────────────────────────────────────────────────────── */}
        <section className="py-10 sm:py-20 border-b border-stone-200 bg-white tone-light">
          <div className="mx-auto max-w-5xl px-3 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-2.5 sm:space-y-3">
              <span className="font-mono text-xs font-bold text-[#1B3F8B] uppercase tracking-wider">
                TANGIBLE LEARNING OUTCOMES
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-950">
                When You Leave, You Should Be Able to Answer:
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
                Concrete operational competencies you will take away from the 75 minutes.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 text-left font-mono text-xs">
              {[
                { id: "01", title: "What PV work actually looks like inside a CRO" },
                { id: "02", title: "What an ICSR is and how validity is checked per ICH-E2D" },
                { id: "03", title: "How a safety case moves through triage to submission" },
                { id: "04", title: "Where MedDRA terminology fits into the process" },
                { id: "05", title: "How seriousness and reporting timelines affect a case" },
                { id: "06", title: "What technical interviewers test during fresher screening" },
                { id: "07", title: "Whether PV, CDM, or Medical Coding makes sense for you" },
                { id: "08", title: "What specific skills you need to learn before applying" },
              ].map((outcome) => (
                <div
                  key={outcome.id}
                  className="p-3 sm:p-4 rounded-xl border border-stone-200 bg-stone-50/70 space-y-1.5 sm:space-y-2 flex flex-col justify-between"
                >
                  <span className="text-[#1B3F8B] font-bold text-xs sm:text-sm">{outcome.id}</span>
                  <p className="text-stone-800 font-sans text-[11px] sm:text-xs leading-relaxed">{outcome.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            12 · BONUS: 2026 HEALTHCARE CAREER STARTER KIT
           ───────────────────────────────────────────────────────────── */}
        <WorkshopStarterKitTeaser
          onClaimClick={() => formRef.current?.scrollIntoView({ behavior: "smooth" })}
        />

        {/* ─────────────────────────────────────────────────────────────
            13 · CERTIFICATE OF PARTICIPATION (SECONDARY BENEFIT)
           ───────────────────────────────────────────────────────────── */}
        <WorkshopCertificatePreview
          onRegisterClick={() => formRef.current?.scrollIntoView({ behavior: "smooth" })}
        />

        {/* ─────────────────────────────────────────────────────────────
            14 · WHO THIS IS FOR & WHO IT IS NOT FOR
           ───────────────────────────────────────────────────────────── */}
        <section className="py-10 sm:py-20 border-b border-stone-200 bg-stone-50/70">
          <div className="mx-auto max-w-5xl px-3 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-2.5 sm:space-y-3">
              <span className="font-mono text-xs font-bold text-[#1B3F8B] uppercase tracking-wider">
                AUDIENCE QUALIFICATION
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-950">
                Is This Workshop For You?
              </h2>

              {/* Qualification Chips */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 pt-1 sm:pt-2">
                {["B.PHARM", "M.PHARM", "PHARM.D", "LIFE SCIENCES", "BIOTECH", "ALLIED HEALTH"].map((deg) => (
                  <span
                    key={deg}
                    className="px-2.5 sm:px-3 py-1 rounded-full bg-white border border-stone-200 text-stone-800 font-mono text-[10px] sm:text-[11px] font-bold shadow-2xs tone-light"
                  >
                    {deg}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-left">
              {/* Good Fit */}
              <div className="p-4.5 sm:p-6 rounded-2xl border border-emerald-200 bg-emerald-50/40 space-y-3">
                <span className="font-mono text-xs font-bold text-emerald-800 uppercase tracking-wider block">
                  ✓ GOOD FIT IF YOU ARE:
                </span>
                <ul className="space-y-2.5 text-xs sm:text-sm text-stone-800 font-sans">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold shrink-0">✓</span>
                    <span>A final-year healthcare student preparing for your first interviews</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold shrink-0">✓</span>
                    <span>A recent graduate who wants to understand entry-level corporate expectations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold shrink-0">✓</span>
                    <span>Actively applying for healthcare roles without receiving callbacks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold shrink-0">✓</span>
                    <span>Unsure whether Pharmacovigilance, CDM, or Medical Coding fits your background</span>
                  </li>
                </ul>
              </div>

              {/* Not For */}
              <div className="p-4.5 sm:p-6 rounded-2xl border border-stone-200 bg-white space-y-3 tone-light">
                <span className="font-mono text-xs font-bold text-stone-500 uppercase tracking-wider block">
                  ✕ PROBABLY NOT FOR YOU IF:
                </span>
                <ul className="space-y-2.5 text-xs sm:text-sm text-stone-600 font-sans">
                  <li className="flex items-start gap-2">
                    <span className="text-stone-400 font-bold shrink-0">✕</span>
                    <span>Experienced PV professionals looking for advanced aggregate report authoring</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-stone-400 font-bold shrink-0">✕</span>
                    <span>Anyone looking for a guaranteed job placement or quick certificate</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-stone-400 font-bold shrink-0">✕</span>
                    <span>People seeking passive lecture slides rather than interactive case work</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Factual Scarcity Notice */}
            <div className="p-3.5 sm:p-4 rounded-xl border border-stone-300 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 sm:gap-3 text-xs tone-light">
              <div className="flex items-center gap-2 text-stone-800 font-mono">
                <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                <span className="font-bold uppercase text-[11px] sm:text-xs">LIVE SESSION CAPACITY: 150 PARTICIPANTS</span>
              </div>
              <p className="text-stone-600 font-sans text-xs">
                We keep the live room limited so the Q&amp;A remains usable. Registration closes when live capacity is reached.
              </p>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            15 · REGISTRATION SECTION: 3-GROUP QUALIFIED APPLICATION
           ───────────────────────────────────────────────────────────── */}
        <section className="py-10 sm:py-20 border-b border-stone-200 bg-white tone-light">
          <div className={`mx-auto px-3.5 sm:px-6 lg:px-8 text-center space-y-5 sm:space-y-6 ${isSuccess ? "max-w-3xl" : "max-w-xl"}`}>
            {!isSuccess && (
              <div className="space-y-2">
                <span className="font-mono text-xs font-bold text-[#1B3F8B] uppercase tracking-wider">
                  FREE REGISTRATION
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                  Reserve Your Place in the Live Room.
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 font-sans">
                  Tell us a little about where you are in your healthcare career so we can understand who is attending.
                </p>
              </div>
            )}

            {/* Registration Form Card */}
            <div
              ref={formRef}
              id="registration-card"
              className={`rounded-2xl border ${
                isSuccess
                  ? "border-stone-300 bg-[#FAF9F6] p-4.5 sm:p-8 space-y-5 sm:space-y-6 shadow-sm tone-light text-left"
                  : "border-stone-300/90 bg-stone-50/50 p-4.5 sm:p-7 shadow-md text-left"
              }`}
            >
              {!isSuccess ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {errorMsg && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* GROUP 1: CONTACT */}
                  <div className="space-y-3">
                    <div className="font-mono text-[10px] font-bold text-stone-500 uppercase tracking-widest border-b border-stone-200 pb-1">
                      01 · CONTACT DETAILS
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="form-name" className="text-xs font-bold text-stone-800 font-mono flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-stone-500" />
                        FULL NAME <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="form-name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        value={name}
                        onFocus={handleInputFocus}
                        onBlur={() => {
                          if (name.trim().length >= 2) markFieldCompleted("name");
                        }}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (fieldErrors.name) setFieldErrors((prev) => ({ ...prev, name: undefined }));
                        }}
                        placeholder="e.g. Ananya Sharma"
                        className={`w-full px-4 py-3 rounded-xl border bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 font-sans transition-all tone-light ${
                          fieldErrors.name
                            ? "border-rose-400 focus:ring-rose-400/20 focus:border-rose-500"
                            : "border-stone-300 focus:ring-[#0B1325]/15 focus:border-[#0B1325]"
                        }`}
                      />
                      {fieldErrors.name && (
                        <p className="text-xs text-rose-600 font-sans flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{fieldErrors.name}</span>
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="form-phone" className="text-xs font-bold text-stone-800 font-mono flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-stone-500" />
                        WHATSAPP NUMBER <span className="text-rose-500">*</span>
                      </label>
                      <div className="flex gap-2">
                        <span className="inline-flex items-center px-3 rounded-xl border border-stone-300 bg-stone-100 text-xs font-mono font-bold text-stone-700 select-none shrink-0">
                          IN +91
                        </span>
                        <input
                          id="form-phone"
                          name="whatsapp"
                          type="tel"
                          inputMode="numeric"
                          autoComplete="tel"
                          required
                          value={phone}
                          onFocus={handleInputFocus}
                          onBlur={() => {
                            if (phone.trim().length >= 10) markFieldCompleted("phone");
                          }}
                          onChange={(e) => {
                            setPhone(e.target.value);
                            if (fieldErrors.phone) setFieldErrors((prev) => ({ ...prev, phone: undefined }));
                          }}
                          placeholder="98765 43210"
                          className={`flex-1 px-4 py-3 rounded-xl border bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 font-sans transition-all tone-light ${
                            fieldErrors.phone
                              ? "border-rose-400 focus:ring-rose-400/20 focus:border-rose-500"
                              : "border-stone-300 focus:ring-[#0B1325]/15 focus:border-[#0B1325]"
                          }`}
                        />
                      </div>
                      {fieldErrors.phone ? (
                        <p className="text-xs text-rose-600 font-sans flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{fieldErrors.phone}</span>
                        </p>
                      ) : (
                        <p className="text-[11px] text-stone-500 font-sans">
                          Session room link and case briefing are sent via WhatsApp.
                        </p>
                      )}
                    </div>

                    {/* Optional Email */}
                    <div>
                      {!showEmailField ? (
                        <button
                          type="button"
                          onClick={() => setShowEmailField(true)}
                          className="text-xs text-[#1B3F8B] hover:text-[#0B1325] font-mono flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          + Add Email (For Google Calendar Invite)
                        </button>
                      ) : (
                        <div className="space-y-1.5 pt-1 animate-in fade-in duration-200">
                          <label htmlFor="form-email" className="text-xs font-bold text-stone-800 font-mono flex items-center gap-1">
                            <Mail className="w-3.5 h-3.5 text-stone-500" />
                            EMAIL ADDRESS (CALENDAR INVITE)
                          </label>
                          <input
                            id="form-email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            value={email}
                            onFocus={handleInputFocus}
                            onBlur={() => {
                              if (email.trim().includes("@")) markFieldCompleted("email");
                            }}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              if (fieldErrors.email) setFieldErrors((prev) => ({ ...prev, email: undefined }));
                            }}
                            placeholder="ananya.sharma@example.com"
                            className={`w-full px-4 py-2.5 rounded-xl border bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 font-sans transition-all tone-light ${
                              fieldErrors.email
                                ? "border-rose-400 focus:ring-rose-400/20 focus:border-rose-500"
                                : "border-stone-300 focus:ring-[#0B1325]/15 focus:border-[#0B1325]"
                            }`}
                          />
                          {fieldErrors.email && (
                            <p className="text-xs text-rose-600 font-sans flex items-center gap-1 mt-1">
                              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                              <span>{fieldErrors.email}</span>
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* GROUP 2: BACKGROUND */}
                  <div className="space-y-3 pt-2">
                    <div className="font-mono text-[10px] font-bold text-stone-500 uppercase tracking-widest border-b border-stone-200 pb-1">
                      02 · QUALIFICATION &amp; STATUS
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label htmlFor="form-degree" className="text-xs font-bold text-stone-800 font-mono block">
                          QUALIFICATION <span className="text-rose-500">*</span>
                        </label>
                        <select
                          id="form-degree"
                          name="degree"
                          value={degree}
                          onChange={(e) => {
                            setDegree(e.target.value);
                            markFieldCompleted("degree");
                          }}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#0B1325]/15 focus:border-[#0B1325] font-sans cursor-pointer tone-light"
                        >
                          {cfg.eligibleDegrees.map((deg) => (
                            <option key={deg} value={deg}>
                              {deg}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="form-grad-year" className="text-xs font-bold text-stone-800 font-mono block">
                          GRADUATION YEAR <span className="text-rose-500">*</span>
                        </label>
                        <select
                          id="form-grad-year"
                          name="graduationYear"
                          value={graduationYear}
                          onChange={(e) => setGraduationYear(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#0B1325]/15 focus:border-[#0B1325] font-sans cursor-pointer tone-light"
                        >
                          <option value="2026">2026 (Final Year)</option>
                          <option value="2025">2025</option>
                          <option value="2024">2024</option>
                          <option value="2023">2023</option>
                          <option value="Earlier">Earlier</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="form-status" className="text-xs font-bold text-stone-800 font-mono block">
                        CURRENT STATUS <span className="text-rose-500">*</span>
                      </label>
                      <select
                        id="form-status"
                        name="currentStatus"
                        value={currentStatus}
                        onChange={(e) => setCurrentStatus(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#0B1325]/15 focus:border-[#0B1325] font-sans cursor-pointer tone-light"
                      >
                        <option value="Final year student">Final year student</option>
                        <option value="Recently graduated">Recently graduated</option>
                        <option value="Looking for healthcare job">Looking for healthcare job</option>
                        <option value="Currently working">Currently working</option>
                        <option value="Considering career change">Considering career change</option>
                      </select>
                    </div>
                  </div>

                  {/* GROUP 3: CAREER INTENT */}
                  <div className="space-y-3 pt-2">
                    <div className="font-mono text-[10px] font-bold text-stone-500 uppercase tracking-widest border-b border-stone-200 pb-1">
                      03 · CAREER INTENT
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label htmlFor="form-track" className="text-xs font-bold text-stone-800 font-mono block">
                          WHICH AREA INTERESTS YOU?
                        </label>
                        <select
                          id="form-track"
                          name="interestTrack"
                          value={interestTrack}
                          onChange={(e) => setInterestTrack(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#0B1325]/15 focus:border-[#0B1325] font-sans cursor-pointer tone-light"
                        >
                          <option value="Pharmacovigilance">Pharmacovigilance (Drug Safety)</option>
                          <option value="Medical Coding">Medical Coding</option>
                          <option value="Clinical Data Management">Clinical Data Management (CDM)</option>
                          <option value="Clinical Research">Clinical Research Operations</option>
                          <option value="Not sure yet">Not sure yet (Exploring)</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="form-applied" className="text-xs font-bold text-stone-800 font-mono block">
                          APPLIED FOR HEALTHCARE JOBS?
                        </label>
                        <select
                          id="form-applied"
                          name="appliedBefore"
                          value={appliedBefore}
                          onChange={(e) => setAppliedBefore(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#0B1325]/15 focus:border-[#0B1325] font-sans cursor-pointer tone-light"
                        >
                          <option value="No">No, haven't applied yet</option>
                          <option value="Yes, 1-10">Yes, 1 to 10 jobs</option>
                          <option value="Yes, 10+">Yes, 10+ jobs</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-xl bg-[#0B1325] hover:bg-[#1B3F8B] text-white font-mono text-sm font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 group disabled:opacity-50 mt-4"
                  >
                    {isSubmitting ? (
                      <span>Reserving Your Seat...</span>
                    ) : (
                      <span>Reserve My Free Seat →</span>
                    )}
                  </button>

                  <p className="text-[11px] text-center text-stone-500 font-sans">
                    No fee · Live on Google Meet · Free participation certificate included
                  </p>
                </form>
              ) : (
                <div className="py-8 sm:py-10 px-4 text-center space-y-4 animate-in fade-in duration-300">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div className="space-y-1.5 max-w-md mx-auto">
                    <span className="font-mono text-[11px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200 inline-block">
                      ADMISSION CONFIRMED
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-950">
                      Your Place in the Live Room is Reserved.
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
                      Session room credentials, your 2026 Healthcare Career Field Guide, and pre-session case files are available above.
                    </p>
                  </div>
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#0B1325] hover:bg-[#1B3F8B] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-xs"
                    >
                      View Your Boarding Pass ↑
                    </button>
                    <a
                      href={cfg.meetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-5 py-3 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-900 font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer tone-light"
                    >
                      Google Meet Link →
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            16 · FREQUENTLY ASKED QUESTIONS
           ───────────────────────────────────────────────────────────── */}
        <section id="faq" className="py-10 sm:py-20 border-b border-stone-200 bg-stone-50/70">
          <div className="mx-auto max-w-3xl px-3.5 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
            <div className="text-left space-y-1.5 sm:space-y-2">
              <span className="font-mono text-xs font-bold text-[#1B3F8B] uppercase tracking-wider">
                COMMON QUESTIONS
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-950">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-2.5 sm:space-y-3 text-left">
              {[
                {
                  q: "Is the workshop really free?",
                  a: "Yes. There is no payment required to reserve a seat. This is an open educational simulation to help healthcare graduates understand industry expectations before spending money on training.",
                },
                {
                  q: "Do I need prior Pharmacovigilance experience?",
                  a: "No. The session is designed specifically for freshers, students, and graduates who have clinical or pharmacy knowledge but have never worked inside a corporate safety team.",
                },
                {
                  q: "Is this only for B.Pharm students?",
                  a: "No. While B.Pharm is a common background, the session is equally relevant to M.Pharm, Pharm.D, B.Sc/M.Sc Life Sciences, and Biotechnology graduates exploring entry-level roles.",
                },
                {
                  q: "Will there be an aggressive sales pitch?",
                  a: "No. The session is focused entirely on practical learning, case triage, and open Q&A. For attendees who want to explore Arzon's structured role-training programs, those options are shared separately after the working session.",
                },
                {
                  q: "What happens if I cannot attend live?",
                  a: "We strongly recommend attending live for the interactive Q&A with Mohamed Kumail Abbas. Session takeaways and case reference notes are shared with registered attendees on WhatsApp.",
                },
                {
                  q: "Where will I receive the Google Meet joining link?",
                  a: "We send the room link and pre-session briefing directly to your registered WhatsApp number on Sunday before 6:00 PM IST.",
                },
              ].map((faq, idx) => {
                const isOpen = openFaqIdx === idx;
                return (
                  <div
                    key={faq.q}
                    className="rounded-2xl border border-stone-200 bg-white overflow-hidden transition-all tone-light"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        const next = isOpen ? null : idx;
                        setOpenFaqIdx(next);
                        if (next !== null) {
                          track("faq_open", {
                            props: { question: faq.q, variant: isVariantB ? "b" : "a" },
                          });
                        }
                      }}
                      className="w-full p-3.5 sm:p-5 text-left flex items-center justify-between gap-3 sm:gap-4 font-bold text-stone-900 text-sm sm:text-base font-sans cursor-pointer"
                    >
                      <span className="leading-snug">{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-stone-500 shrink-0 transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-[#1B3F8B]" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-3.5 sm:px-5 pb-4 sm:pb-5 text-xs sm:text-sm text-stone-600 font-sans leading-relaxed border-t border-stone-100 pt-2.5 sm:pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            17 · FINAL DECISIVE CTA: "SEE THE JOB BEFORE YOU BUY"
           ───────────────────────────────────────────────────────────── */}
        <section className="py-10 sm:py-20 bg-white text-center tone-light">
          <div className="mx-auto max-w-3xl px-3.5 sm:px-6 lg:px-8 space-y-4 sm:space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1 rounded-full bg-stone-100 border border-stone-200 text-stone-700 font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">
              ARZON HEALTHCARE HIRING LAB
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-serif font-bold text-stone-950 leading-tight">
              See the Job Before You Buy the Course.
            </h2>
            <p className="text-xs sm:text-base text-stone-600 font-sans max-w-xl mx-auto leading-relaxed">
              Join the live working session this Sunday with Mohamed Kumail Abbas. 75 minutes of real case triage and interview simulation.
            </p>
            <div className="font-mono text-[11px] sm:text-xs text-stone-500">
              Sunday · 6 September 2026 · 6:00 PM IST · Google Meet
            </div>
            <div className="pt-1">
              <button
                type="button"
                onClick={scrollToForm}
                className="w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-[#0B1325] hover:bg-[#1B3F8B] text-white font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer"
              >
                Reserve My Free Seat →
              </button>
            </div>
          </div>
        </section>
          </>
        )}
      </main>


      {/* Footer */}
      <Footer
        customCta={
          <div className="rounded-2xl border border-sky-400/30 bg-[#162648] p-6 sm:p-8 space-y-4 text-center max-w-3xl mx-auto shadow-xl">
            <div className="space-y-2 max-w-xl mx-auto">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-50 leading-tight">
                Still deciding?
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                You don't need to choose a career track today. Start by seeing what the work actually looks like.
              </p>
            </div>
            <div className="pt-1">
              <button
                type="button"
                onClick={scrollToForm}
                className="inline-flex items-center justify-center px-7 py-3 rounded-xl bg-white hover:bg-stone-100 font-sans text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer text-stone-900"
                style={{ color: "#0B1325" }}
              >
                Reserve your free workshop seat →
              </button>
            </div>
          </div>
        }
      />
    </div>
  );
}
