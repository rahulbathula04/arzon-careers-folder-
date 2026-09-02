import { useState, useRef, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import arzonIcon from "@/assets/arzon-icon.webp";
import {
  Calendar,
  Clock,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Building2,
  Briefcase,
  Layers,
  HelpCircle,
  Users,
  GraduationCap,
  FileText,
  AlertCircle,
  ExternalLink,
  ChevronDown,
  Check,
  Zap,
  MessageCircle,
  Send,
  Award,
  Stethoscope,
  Database,
  Code,
  BookOpen,
  Share2,
  Lock,
  TrendingUp,
  TrendingDown,
  ScanLine,
  Sliders,
  CheckCircle,
  XCircle,
  X,
  UserCheck,
  FileCheck2,
  Target,
  MessageSquareQuote,
  ShieldAlert,
  Compass,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { isReducedMotion } from "@/hooks/useReducedMotion";
import { Footer } from "@/components/landing/Footer";
import { pageSeo } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/jsonLd";
import { SITE } from "@/components/landing/constants";
import { submitWorkshopLead } from "@/lib/workshop.functions";
import { PremiumChip } from "@/components/ui/PremiumChip";

export const Route = createFileRoute("/healthcare-career-workshop")({
  head: () => {
    const title = "Inside Pharmacovigilance: An Industry Interaction | Arzon Global";
    const description =
      "Not a webinar. Not a course pitch. Talk directly with senior Pharmacovigilance professionals with 20+ years of industry experience, including leadership at Accenture & Cognizant.";
    const ps = pageSeo({
      path: "/healthcare-career-workshop",
      title,
      description,
      image: SITE.ogImages.about,
    });

    return {
      meta: [{ title }, ...ps.meta],
      links: ps.links,
      scripts: [
        {
          type: "application/ld+json",
          children: breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "PV Industry Connect", path: "/healthcare-career-workshop" },
          ]),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationEvent",
            name: "Pharmacovigilance Industry Connect 2026",
            description:
              "An open, unfiltered industry interaction for Pharmacy and Life Sciences graduates with 20+ year PV industry leaders. Walk through real ICSR adverse event workflows.",
            startDate: WORKSHOP_START_ISO,
            endDate: "2026-09-06T12:15:00+05:30",
            eventStatus: "https://schema.org/EventScheduled",
            eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
            location: {
              "@type": "VirtualLocation",
              url: "https://arzoncareers.in/healthcare-career-workshop",
            },
            organizer: {
              "@type": "Organization",
              name: "Arzon Global",
              url: "https://arzoncareers.in",
            },
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "INR",
              availability: "https://schema.org/InStock",
            },
          }),
        },
      ],
    };
  },
  component: PharmacovigilanceIndustryConnectPage,
});

// Official WhatsApp Community Link
const WHATSAPP_COMMUNITY_URL = "https://chat.whatsapp.com/Ltg8V4sGOgbK8kbgYMuaHz";

/** Next live session — keep in sync with EducationEvent JSON-LD `startDate`. */
const WORKSHOP_START_ISO = "2026-09-06T11:00:00+05:30";

const RECENT_STUDENT_QUESTIONS = [
  "What does a fresher actually do during the first 90 days in a PV team?",
  "What is the day-to-day difference between working at a CRO vs Pharma MNC?",
  "Is Pharmacovigilance mostly repetitive documentation or analytical clinical thinking?",
  "How critical is knowing Oracle Argus vs MedDRA before giving an interview?",
  "Does AI or automation threaten entry-level case processing jobs in 2026?",
  "What specific interview questions do technical panel managers actually ask?",
];

const ICSR_WORKFLOW_STEPS = [
  {
    step: "01",
    title: "Patient Report",
    role: "Spontaneous / Clinical",
    detail: "Initial notification of an adverse event received from healthcare professional, clinical site, or patient.",
    fresherInvolvement: "Low (Automated Intake)",
  },
  {
    step: "02",
    title: "Case Receipt & Triage",
    role: "Intake Associate",
    detail: "Verifying the 4 minimum ICSR validity criteria (patient, reporter, drug, event) and assessing seriousness.",
    fresherInvolvement: "Core Fresher Responsibility",
  },
  {
    step: "03",
    title: "Data Entry & MedDRA Coding",
    role: "Drug Safety Associate",
    detail: "Entering medical history, dosage, lab tests, and mapping reported terms to Lowest Level Terms (LLTs).",
    fresherInvolvement: "Core Fresher Responsibility",
  },
  {
    step: "04",
    title: "Narrative Writing",
    role: "Safety Specialist",
    detail: "Drafting chronological clinical case summary adhering to ICH-E2D and company Core Safety Information.",
    fresherInvolvement: "Core Fresher Responsibility",
  },
  {
    step: "05",
    title: "Quality Review (QC)",
    role: "Senior Safety Associate",
    detail: "100% verification of coded fields, temporal relationship, and missing information follow-up requests.",
    fresherInvolvement: "Junior Checker (Post-6 Mos)",
  },
  {
    step: "06",
    title: "Medical Review & Sign-Off",
    role: "Medical Safety Officer (MBBS)",
    detail: "Causality assessment, labeling review (listed vs unlisted), and determination of expedited reporting status.",
    fresherInvolvement: "Physician Level",
  },
  {
    step: "07",
    title: "Regulatory Submission",
    role: "E2B Gateway Ops",
    detail: "XML transmission to US FDA FAERS, EMA EudraVigilance, and MHRA within mandatory 7 or 15-day timelines.",
    fresherInvolvement: "Submission Team",
  },
];

const FAQ_ITEMS = [
  {
    q: "Is this really 100% free, or will you pitch a course at the end?",
    a: "It is genuinely 100% free and there is zero course sales pitch. We do not stop the session at minute 50 to sell an expensive training package, nor do we run fake discount timers. The goal of Arzon Industry Connect is simple: let students speak to seasoned professionals who have actually lived this career before making any educational or financial decisions.",
  },
  {
    q: "Will telecallers call me afterwards trying to sell me something?",
    a: "No. You will never receive aggressive sales or counsellor calls. Your details are used strictly to send your Zoom access link, Google Calendar reminder, and optional WhatsApp group notification.",
  },
  {
    q: "Who is this interaction intended for?",
    a: "This session is designed specifically for B.Pharm, M.Pharm, Pharm.D, and Life Sciences (Biotechnology, Biochemistry, Microbiology, B.Sc/M.Sc) graduates and final-year students who want an unfiltered, real-world understanding of Pharmacovigilance.",
  },
  {
    q: "What if I can't attend live at 11:00 AM this Sunday?",
    a: "We strongly recommend attending live because 25 minutes are dedicated exclusively to live, unfiltered student Q&A with the mentor. However, registered attendees will also receive the 18-page ICSR Workflow Blueprint and key discussion notes via email.",
  },
  {
    q: "Can I ask my own specific career or interview questions?",
    a: "Yes. You can submit your question right now when registering, or raise your hand and ask the mentor directly during the live interactive Q&A segment.",
  },
];

function PharmacovigilanceIndustryConnectPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [qualification, setQualification] = useState("");
  const [studentQuestion, setStudentQuestion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const formRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const [showStickyBar, setShowStickyBar] = useState(false);
  const [stickyDismissed, setStickyDismissed] = useState(false);

  const [activeConsoleTab, setActiveConsoleTab] = useState<"intake" | "meddra" | "seriousness" | "gateway">("intake");
  const [selectedRoleDegree, setSelectedRoleDegree] = useState<"bpharm" | "pharmd" | "mpharm" | "lifesci">("bpharm");

  // Show sticky bar when scrolled past hero form
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 550);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => {
        nameInputRef.current?.focus();
      }, 450);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!name.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }
    if (!phone.trim() || phone.replace(/\D/g, "").length < 10) {
      setErrorMessage("Please enter a valid 10-digit WhatsApp number.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (!qualification) {
      setErrorMessage("Please select your current qualification.");
      return;
    }

    setIsSubmitting(true);

    try {
      await submitWorkshopLead({
        data: {
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          degree: qualification + (studentQuestion ? ` | Q: ${studentQuestion.trim()}` : ""),
          source: "pv-industry-connect",
          utmSource: "industry_connect_organic",
        },
      });
      setIsSuccess(true);
    } catch (err: any) {
      console.warn("Industry Connect submission notice:", err);
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="tone-light min-h-screen bg-[#FAF8F5] text-[#1A1A1A] font-sans antialiased overflow-x-hidden">
      <Nav />

      <main className="relative z-10 pt-20 sm:pt-24">
        {/* ─────────────────────────────────────────────────────────────
            01 · HERO: HONEST INDUSTRY PROMISE (ANTI-WEBINAR POSITIONING)
           ───────────────────────────────────────────────────────────── */}
        <section className="relative border-b border-stone-200/80 bg-[#FAF8F5] py-12 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              {/* Left Column: Core Positioning & Mentor Stature */}
              <div className="lg:col-span-7 space-y-6">
                {/* Official Arzon Global Branding Header */}
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#0B1325] ring-2 ring-stone-900/10 shadow-sm p-2">
                    <img src={arzonIcon} alt="Arzon Global" className="h-full w-full object-contain" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-black tracking-[0.24em] text-[#0B1325]">
                        ARZON GLOBAL
                      </span>
                      <span className="text-stone-400">·</span>
                      <span className="font-mono text-[10px] font-bold tracking-[0.16em] text-[#8A6D1F]">
                        ACADEMIC CAREER INITIATIVE
                      </span>
                    </div>
                    <p className="text-[11px] font-mono text-stone-500 font-semibold">
                      Independent Healthcare Workforce Intelligence
                    </p>
                  </div>
                </div>

                {/* Anti-Webinar Flag */}
                <div className="inline-flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-stone-900 text-stone-100 px-3 py-1 font-mono text-[10.5px] font-bold uppercase tracking-wider">
                    PHARMACOVIGILANCE INDUSTRY CONNECT
                  </span>
                  <span className="rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 px-2.5 py-0.5 font-mono text-[10.5px] font-bold">
                    NOT A WEBINAR · ZERO SALES PITCH
                  </span>
                </div>

                <div className="space-y-4">
                  <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A1A1A] tracking-tight leading-[1.12]">
                    Before you spend money learning Pharmacovigilance,{" "}
                    <span className="italic text-[#1B3F8B]">talk to someone who spent 20 years doing it.</span>
                  </h1>

                  <p className="text-base sm:text-lg text-stone-700 font-sans leading-relaxed">
                    Not a webinar. Not a course pitch. Not a sales presentation. An open, honest industry interaction with senior Pharmacovigilance leaders who actually lived the career—including leadership roles at{" "}
                    <strong className="text-stone-900">Accenture</strong> and{" "}
                    <strong className="text-stone-900">Cognizant</strong>.
                  </p>
                </div>

                {/* The 4 Anti-EdTech Guarantees */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="rounded-2xl border border-stone-200 bg-white p-4 space-y-1.5 shadow-2xs">
                    <div className="flex items-center gap-2 text-xs font-bold text-stone-900">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-100 text-rose-700 font-mono text-[11px]">
                        ✕
                      </span>
                      <span>No Course Pitch</span>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed font-sans">
                      We will not switch slides at minute 50 to sell an expensive certification. No sales ambush.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-stone-200 bg-white p-4 space-y-1.5 shadow-2xs">
                    <div className="flex items-center gap-2 text-xs font-bold text-stone-900">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-100 text-rose-700 font-mono text-[11px]">
                        ✕
                      </span>
                      <span>No Counsellor Calls</span>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed font-sans">
                      You will never receive aggressive telecaller calls chasing you to make a payment.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-stone-200 bg-white p-4 space-y-1.5 shadow-2xs">
                    <div className="flex items-center gap-2 text-xs font-bold text-stone-900">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 font-mono text-[11px]">
                        ✓
                      </span>
                      <span>Real ICSR Case Dissection</span>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed font-sans">
                      Walk through a live adverse event report from triage to MedDRA coding and FDA submission.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-stone-200 bg-white p-4 space-y-1.5 shadow-2xs">
                    <div className="flex items-center gap-2 text-xs font-bold text-stone-900">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 font-mono text-[11px]">
                        ✓
                      </span>
                      <span>Decide For Yourself</span>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed font-sans">
                      Understand the day-to-day work first, then decide whether Pharmacovigilance is right for you.
                    </p>
                  </div>
                </div>

                {/* Session Stature Strip */}
                <div className="rounded-2xl border border-stone-200 bg-white p-4 flex flex-wrap items-center justify-between gap-4 shadow-xs">
                  <div className="space-y-0.5">
                    <p className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-[#1B3F8B]" />
                      <span>Live Interactive Session</span>
                    </p>
                    <p className="text-sm font-bold text-stone-900">This Sunday · 11:00 AM – 12:15 PM IST</p>
                  </div>

                  <div className="space-y-0.5">
                    <p className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-[#8A6D1F]" />
                      <span>Duration &amp; Format</span>
                    </p>
                    <p className="text-sm font-bold text-stone-900">60–75 Mins Live on Zoom</p>
                  </div>

                  <div className="space-y-0.5">
                    <p className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-700" />
                      <span>Admission</span>
                    </p>
                    <p className="text-sm font-bold text-emerald-800">100% Free · Open to All Students</p>
                  </div>
                </div>

                {/* Mentor Credentials Snapshot */}
                <div className="rounded-2xl border border-blue-200/90 bg-gradient-to-r from-blue-50/70 via-stone-50 to-white p-4 sm:p-5 flex items-start gap-4 shadow-xs">
                  <div className="h-12 w-12 rounded-xl bg-[#0B1325] text-slate-50 flex items-center justify-center font-serif text-lg font-bold shrink-0 shadow-sm">
                    PV
                  </div>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-sm text-stone-900 font-sans">
                        Featuring Senior Pharmacovigilance Leadership
                      </span>
                      <span className="rounded bg-blue-100 text-blue-900 px-2 py-0.5 font-mono text-[10px] font-bold">
                        20+ Years Industry Tenure
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 font-sans leading-relaxed">
                      Started as a day-one case processor. Progressed through ICSR operations, medical coding, quality control, and management across global organizations including{" "}
                      <strong className="text-stone-900">Accenture</strong> and{" "}
                      <strong className="text-stone-900">Cognizant</strong>.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: High-Dignity Registration Card */}
              <div className="lg:col-span-5" ref={formRef} id="register-section">
                <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 shadow-xl space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                    <div className="flex items-center gap-2">
                      <span className="flex h-2.5 w-2.5 rounded-full bg-[#1B3F8B] motion-safe:animate-pulse" />
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B]">
                        {isSuccess ? "Registration Confirmed" : "Reserve Free Interaction Pass"}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md">
                      100% Free
                    </span>
                  </div>

                  {/* Takeaway Incentive Callout */}
                  {!isSuccess && (
                    <div className="rounded-xl border border-blue-200 bg-blue-50/80 p-2.5 flex items-center gap-2.5 text-xs text-blue-950 font-medium">
                      <Sparkles className="h-4 w-4 text-[#1B3F8B] shrink-0" />
                      <span>
                        Includes <strong>2 Free Takeaway Blueprints</strong> (18-Page ICSR Guide + Top 25 Interview Q&amp;As)
                      </span>
                    </div>
                  )}

                  {isSuccess ? (
                    /* Post-Registration Success State */
                    <div className="space-y-4 py-2">
                      <div className="text-center space-y-2">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 ring-4 ring-emerald-50">
                          <CheckCircle2 className="h-7 w-7" />
                        </div>
                        <h3 className="font-serif text-2xl font-bold text-[#1A1A1A]">YOU'RE IN!</h3>
                        <p className="text-xs text-stone-600 font-sans leading-relaxed">
                          Your seat for the <strong className="text-[#1B3F8B]">Pharmacovigilance Industry Connect</strong> is reserved.
                        </p>
                      </div>

                      {/* Step 1: Add to Calendar */}
                      <div className="rounded-xl border border-stone-200 bg-stone-50 p-3.5 flex items-center justify-between gap-3 shadow-2xs">
                        <div className="space-y-0.5">
                          <p className="text-xs font-bold text-stone-900">1. Add to Google Calendar</p>
                          <p className="text-[11px] text-stone-500">Sunday 11:00 AM IST · Zoom link included</p>
                        </div>
                        <a
                          href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Pharmacovigilance+Industry+Connect+(Arzon)&details=Live+open+interaction+with+20%2B+year+PV+veterans.+No+course+pitch.+Link:+https://arzoncareers.in/healthcare-career-workshop"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-white hover:bg-stone-100 text-stone-800 font-bold text-xs border border-stone-300 transition-all shrink-0 inline-flex items-center gap-1.5 shadow-2xs"
                        >
                          <Calendar className="h-3.5 w-3.5 text-[#1B3F8B]" />
                          <span>Add</span>
                        </a>
                      </div>

                      {/* Step 2: WhatsApp Community */}
                      <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-3.5 space-y-2 shadow-2xs">
                        <div className="space-y-0.5">
                          <p className="text-xs font-bold text-emerald-950">2. Join Official WhatsApp Community</p>
                          <p className="text-[11px] text-emerald-800">
                            Instant Zoom pass, 18-page ICSR workflow summary &amp; direct Q&amp;A updates
                          </p>
                        </div>
                        <a
                          href={WHATSAPP_COMMUNITY_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-slate-50 font-bold text-xs transition-all shadow-md cursor-pointer"
                        >
                          <MessageCircle className="h-4 w-4" />
                          <span>Join WhatsApp Community</span>
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      </div>

                      <div className="text-center pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            setIsSuccess(false);
                            setName("");
                            setPhone("");
                            setEmail("");
                            setQualification("");
                            setStudentQuestion("");
                          }}
                          className="text-[11px] text-stone-500 hover:text-stone-800 underline cursor-pointer"
                        >
                          Register another classmate or colleague
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Registration Form */
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {errorMessage && (
                        <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2 font-medium">
                          <AlertCircle className="h-4 w-4 shrink-0" />
                          <span>{errorMessage}</span>
                        </div>
                      )}

                      <div>
                        <label className="block text-xs font-bold text-stone-800 mb-1 font-sans">
                          Full Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          ref={nameInputRef}
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Rahul Sharma"
                          className="w-full h-11 px-3.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-xs placeholder:text-stone-400 focus:bg-white focus:outline-none focus:border-[#1B3F8B] focus:ring-1 focus:ring-[#1B3F8B] transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-stone-800 mb-1 font-sans">
                          WhatsApp Phone Number <span className="text-rose-500">*</span>
                        </label>
                        <div className="flex items-center">
                          <span className="h-11 px-3.5 inline-flex items-center rounded-l-xl bg-stone-100 border border-r-0 border-stone-300 text-stone-700 text-xs font-mono font-bold">
                            +91
                          </span>
                          <input
                            type="tel"
                            required
                            maxLength={10}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                            placeholder="98765 43210"
                            className="w-full h-11 px-3.5 rounded-r-xl bg-stone-50 border border-stone-300 text-stone-900 text-xs placeholder:text-stone-400 focus:bg-white focus:outline-none focus:border-[#1B3F8B] focus:ring-1 focus:ring-[#1B3F8B] transition-all"
                          />
                        </div>
                        <p className="text-[10px] text-stone-500 mt-1 font-sans">
                          Zoom pass &amp; session link will be sent to your WhatsApp.
                        </p>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-stone-800 mb-1 font-sans">
                          Email Address <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="rahul@example.com"
                          className="w-full h-11 px-3.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-xs placeholder:text-stone-400 focus:bg-white focus:outline-none focus:border-[#1B3F8B] focus:ring-1 focus:ring-[#1B3F8B] transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-stone-800 mb-1 font-sans">
                          Current Qualification <span className="text-rose-500">*</span>
                        </label>
                        <select
                          value={qualification}
                          onChange={(e) => setQualification(e.target.value)}
                          required
                          className="w-full h-11 px-3.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-xs focus:bg-white focus:outline-none focus:border-[#1B3F8B] focus:ring-1 focus:ring-[#1B3F8B] transition-all cursor-pointer"
                        >
                          <option value="">Select your background</option>
                          <option value="B.Pharm (Pursuing / Graduate)">B.Pharm (Pursuing or Graduate)</option>
                          <option value="M.Pharm (Pharmacology / QA / Other)">M.Pharm (Pharmacology, QA, or Other)</option>
                          <option value="Pharm.D (Pursuing / Graduate)">Pharm.D (Doctor of Pharmacy)</option>
                          <option value="B.Sc / M.Sc Life Sciences (Biotech, Biochem, Micro)">
                            B.Sc / M.Sc Life Sciences (Biotech, Biochem, Micro)
                          </option>
                          <option value="MBBS / BDS / Nursing / Other Clinical">
                            MBBS / BDS / Nursing / Clinical
                          </option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-stone-800 mb-1 font-sans">
                          What is your #1 question for the PV mentor? <span className="text-stone-400 font-normal">(Optional)</span>
                        </label>
                        <input
                          type="text"
                          value={studentQuestion}
                          onChange={(e) => setStudentQuestion(e.target.value)}
                          placeholder="e.g. Do freshers really need Argus before interviews?"
                          className="w-full h-11 px-3.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-xs placeholder:text-stone-400 focus:bg-white focus:outline-none focus:border-[#1B3F8B] focus:ring-1 focus:ring-[#1B3F8B] transition-all"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-12 inline-flex items-center justify-center gap-2 rounded-xl bg-[#1B3F8B] hover:bg-[#153270] text-slate-50 font-bold text-xs tracking-wide transition-all shadow-md cursor-pointer disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <span>Reserving Your Seat…</span>
                        ) : (
                          <>
                            <span>Join Free Industry Interaction</span>
                            <ArrowRight className="h-4 w-4" />
                          </>
                        )}
                      </button>

                      <div className="text-center pt-1">
                        <p className="text-[11px] text-stone-500 font-sans flex items-center justify-center gap-1.5">
                          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                          <span>100% Free · No sales pitch · Zero counsellor phone harassment</span>
                        </p>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            02 · THE CONTRAST: EDTECH WEBINAR VS ARZON INDUSTRY CONNECT
           ───────────────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 border-b border-stone-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="text-center space-y-2 max-w-3xl mx-auto">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-rose-700">
                THE PROBLEM WITH EDTECH WEBINARS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
                You've seen the predictable funnel. Here is why this is different.
              </h2>
              <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed">
                Most students attend free webinars only to find themselves trapped in a 60-minute marketing slide deck followed by telecallers harassing them to pay ₹20,000 the next morning.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card 1: The Predictable EdTech Funnel */}
              <div className="rounded-3xl border border-stone-200 bg-stone-50/70 p-6 sm:p-8 space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-rose-700">
                    TYPICAL EDTECH WEBINAR
                  </span>
                  <span className="text-xs font-mono font-bold text-rose-600 bg-rose-100 px-2 py-0.5 rounded">
                    Sales Engine
                  </span>
                </div>

                <ul className="space-y-3 text-xs sm:text-sm text-stone-600 font-sans">
                  <li className="flex items-start gap-2.5">
                    <span className="text-rose-500 font-bold">✕</span>
                    <span><strong>Generic Industry Hype:</strong> Endless slides talking about how "pharma is a $1.5 Trillion industry" with zero tactical depth.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-rose-500 font-bold">✕</span>
                    <span><strong>Theory Over Reality:</strong> Taught by trainers who have never processed an actual ICSR under FDA regulatory audit pressure.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-rose-500 font-bold">✕</span>
                    <span><strong>The Minute-50 Ambush:</strong> The presentation stops abruptly to introduce a ₹20,000–₹40,000 course with a fake countdown timer.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-rose-500 font-bold">✕</span>
                    <span><strong>Aggressive Counsellors:</strong> Your phone rings 5 times the next morning with salespeople pushing for immediate deposits.</span>
                  </li>
                </ul>
              </div>

              {/* Card 2: Arzon Industry Connect */}
              <div className="rounded-3xl border-2 border-[#1B3F8B]/30 bg-blue-50/[0.15] p-6 sm:p-8 space-y-5 shadow-sm">
                <div className="flex items-center justify-between pb-3 border-b border-blue-200">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B]">
                    ARZON PV INDUSTRY CONNECT
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                    True Industry Reality
                  </span>
                </div>

                <ul className="space-y-3 text-xs sm:text-sm text-stone-800 font-sans">
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-700 font-bold">✓</span>
                    <span><strong>20+ Year Industry Veterans:</strong> Talk directly to professionals who managed drug safety delivery at Accenture and Cognizant.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-700 font-bold">✓</span>
                    <span><strong>Live Case Study Simulation:</strong> See how an adverse event report is actually evaluated, coded, and audited in real life.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-700 font-bold">✓</span>
                    <span><strong>Zero Course Sales Pitch:</strong> No course introduction, no payment links, no manufactured urgency. Just honest industry insight.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-700 font-bold">✓</span>
                    <span><strong>Unfiltered Q&amp;A:</strong> Ask anything about starting salaries, CRO vs Pharma, working hours, and entry-level interview traps.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            02B · THE EXECUTIVE MENTOR DOSSIER
           ───────────────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-24 border-b border-stone-200 bg-[#FAF8F5]">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center space-y-3 max-w-3xl mx-auto">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B]">
                EXECUTIVE FACULTY DOSSIER
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A]">
                20+ Years in Pharmacovigilance. 50,000+ ICSRs Audited. Zero Sales Scripts.
              </h2>
              <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed">
                You are not learning from a full-time course marketer. You are interacting with an industry leader who directed global drug safety operations across global giants.
              </p>
            </div>

            {/* 3 Quantified Stature KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-2xs space-y-2 text-center sm:text-left">
                <span className="font-mono text-xs font-bold text-[#1B3F8B] uppercase tracking-wider">
                  VOLUME GOVERNED
                </span>
                <p className="font-serif text-3xl sm:text-4xl font-extrabold text-[#1A1A1A]">
                  50,000+
                </p>
                <p className="text-xs text-stone-600 font-sans leading-relaxed">
                  Individual Case Safety Reports (ICSRs) processed, triaged, and medically reviewed for global market authorization.
                </p>
              </div>

              <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-2xs space-y-2 text-center sm:text-left">
                <span className="font-mono text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  AUDIT INTEGRITY
                </span>
                <p className="font-serif text-3xl sm:text-4xl font-extrabold text-[#1A1A1A]">
                  14 Zero-483s
                </p>
                <p className="text-xs text-stone-600 font-sans leading-relaxed">
                  US FDA, EMA, and MHRA regulatory inspections navigated without a single critical non-compliance finding.
                </p>
              </div>

              <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-2xs space-y-2 text-center sm:text-left">
                <span className="font-mono text-xs font-bold text-[#8A6D1F] uppercase tracking-wider">
                  ENTERPRISE LEADERSHIP
                </span>
                <p className="font-serif text-3xl sm:text-4xl font-extrabold text-[#1A1A1A]">
                  20+ Years
                </p>
                <p className="text-xs text-stone-600 font-sans leading-relaxed">
                  Active industry tenure, including high-stakes delivery and QC governance at <strong className="text-stone-900">Accenture</strong> and <strong className="text-stone-900">Cognizant</strong>.
                </p>
              </div>
            </div>

            {/* Verified Career Progression Timeline */}
            <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-10 shadow-sm space-y-8">
              <div className="border-b border-stone-200 pb-4">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-stone-500">
                  CAREER ARCHITECTURE
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#1A1A1A] mt-1">
                  How a Pharmacovigilance Career Actually Evolves
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                {/* Stage 1 */}
                <div className="rounded-2xl border border-stone-200 bg-[#FAF8F5] p-5 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                    <span className="font-mono text-xs font-bold text-[#1B3F8B]">YEARS 01 – 03</span>
                    <span className="font-mono text-[10px] text-stone-500 bg-white px-2 py-0.5 rounded border border-stone-200">
                      Case Processing
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-stone-900 font-sans">
                    Drug Safety Associate (The Fresher Trench)
                  </h4>
                  <p className="text-xs text-stone-600 font-sans leading-relaxed">
                    Started on the ground floor: reading doctor notes, verifying 4 validity criteria, entering data into Oracle Argus, and drafting 15 clinical narratives every shift under strict 24-hour turn-around SLAs.
                  </p>
                </div>

                {/* Stage 2 */}
                <div className="rounded-2xl border border-stone-200 bg-[#FAF8F5] p-5 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                    <span className="font-mono text-xs font-bold text-[#1B3F8B]">YEARS 04 – 08</span>
                    <span className="font-mono text-[10px] text-stone-500 bg-white px-2 py-0.5 rounded border border-stone-200">
                      Quality Control
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-stone-900 font-sans">
                    Senior Safety Specialist &amp; Quality Lead
                  </h4>
                  <p className="text-xs text-stone-600 font-sans leading-relaxed">
                    Elevated to First-Time-Right (FTR) quality reviewer: auditing junior narratives, resolving complex MedDRA coding ambiguities, and preparing expedited submissions to the US FDA and EMA.
                  </p>
                </div>

                {/* Stage 3 */}
                <div className="rounded-2xl border border-stone-200 bg-[#FAF8F5] p-5 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                    <span className="font-mono text-xs font-bold text-[#1B3F8B]">YEARS 09 – 20+</span>
                    <span className="font-mono text-[10px] text-stone-500 bg-white px-2 py-0.5 rounded border border-stone-200">
                      Executive Delivery
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-stone-900 font-sans">
                    Operations Manager &amp; Delivery Lead
                  </h4>
                  <p className="text-xs text-stone-600 font-sans leading-relaxed">
                    Directed 100+ member clinical safety teams at global IT and healthcare consulting firms including Accenture and Cognizant. Governed global client audits, safety agreements, and hiring panel interviews.
                  </p>
                </div>
              </div>

              {/* Mentor's Unvarnished Statement */}
              <div className="rounded-2xl border-2 border-stone-900/10 bg-gradient-to-r from-stone-900 via-[#0B1325] to-[#1B3F8B] text-slate-100 p-6 sm:p-8 space-y-4 shadow-lg">
                <div className="flex items-center gap-2 text-amber-300 font-mono text-xs font-bold uppercase tracking-wider">
                  <MessageSquareQuote className="h-4 w-4" />
                  <span>The Mentor's Direct Statement To Students</span>
                </div>
                <blockquote className="font-serif text-sm sm:text-base italic leading-relaxed text-stone-200">
                  "When I started 20 years ago, there was no course seller trying to charge ₹25,000 to pharmacy graduates. You learned by doing the work under strict regulatory scrutiny. Today, freshers are told PV is just 'data entry' or 'has huge scope' without understanding the intense medical and legal forensic precision required. I agreed to lead this interaction with Arzon for one reason: to show you the real software, the actual 15-day regulatory clocks, and what interview panels truly test. Then, you decide for yourself."
                </blockquote>
                <div className="flex items-center gap-3 pt-2 text-xs font-mono text-stone-300">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span>Independent Industry Interaction · Zero Commercial Affiliation</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            02C · THE 2 FREE TAKEAWAY BLUEPRINTS
           ───────────────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-24 border-b border-stone-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center space-y-3 max-w-3xl mx-auto">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full inline-block">
                INCLUDED 100% FREE WITH REGISTRATION
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
                Two Production-Grade Career Assets Delivered Instantly
              </h2>
              <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed">
                As soon as you reserve your free seat, these two verified industry reference documents will be delivered directly to your WhatsApp and Email.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Asset 01 */}
              <div className="rounded-3xl border border-stone-200 bg-[#FAF8F5] p-6 sm:p-8 space-y-5 shadow-sm hover:border-[#1B3F8B]/50 transition-all">
                <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-[#1B3F8B]" />
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B]">
                      TAKEAWAY ASSET #01
                    </span>
                  </div>
                  <span className="font-mono text-[10px] font-bold text-stone-500 bg-white px-2 py-0.5 rounded border border-stone-200">
                    18-PAGE PDF
                  </span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1A1A1A]">
                  The ICSR Clinical Case Processor Blueprint
                </h3>

                <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
                  The identical desk reference used by junior safety associates across Tier-1 CROs to verify regulatory compliance before submitting cases to quality review.
                </p>

                <ul className="space-y-2.5 text-xs text-stone-700 font-sans border-t border-stone-200/80 pt-4">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Full MedDRA 27.0 Hierarchy Cheatsheet:</strong> How to navigate from SOC to HLGT, HLT, PT, and LLT without coding errors.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>ICH-E2A Seriousness Decision Flowchart:</strong> The exact clinical triggers for hospitalization, disability, and life-threatening tags.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>CRO Standard Narrative Template:</strong> Chronological sentence-by-sentence syntax that clears FDA and EMA inspections.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Day-0 to Day-15 Clock Calculator:</strong> Regulatory submission SLA rules for expedited vs periodic aggregate reporting.</span>
                  </li>
                </ul>
              </div>

              {/* Asset 02 */}
              <div className="rounded-3xl border border-stone-200 bg-[#FAF8F5] p-6 sm:p-8 space-y-5 shadow-sm hover:border-[#1B3F8B]/50 transition-all">
                <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-[#8A6D1F]" />
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#8A6D1F]">
                      TAKEAWAY ASSET #02
                    </span>
                  </div>
                  <span className="font-mono text-[10px] font-bold text-stone-500 bg-white px-2 py-0.5 rounded border border-stone-200">
                    INTERVIEW INTEL
                  </span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1A1A1A]">
                  Top 25 PV Technical Interview Questions &amp; Model Answers
                </h3>

                <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
                  Compiled from over 400+ technical interviews conducted at Cognizant, Parexel, IQVIA, and Novartis for entry-level Drug Safety Associate roles.
                </p>

                <ul className="space-y-2.5 text-xs text-stone-700 font-sans border-t border-stone-200/80 pt-4">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>The Core Distinction Questions:</strong> How to answer "What is the clinical difference between an AE and an ADR?" with zero hesitation.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Listedness &amp; Expectedness Scenarios:</strong> How to interpret Company Core Data Sheets (CCDS) during technical panel tests.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Missing Information Handling:</strong> How hiring managers test your protocol for initiating targeted follow-up queries with physicians.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>The 3 Automatic Red Flags:</strong> Common mistakes freshers make during salary discussions and technical rounds that lead to instant rejections.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={scrollToForm}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1B3F8B] hover:bg-[#153270] text-slate-50 font-bold text-xs tracking-wide transition-all shadow-md cursor-pointer"
              >
                <span>Reserve Free Pass &amp; Claim Both Blueprints</span>
                <ArrowRight className="h-4 w-4 text-slate-50" />
              </button>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            03 · THE 60-75 MINUTE BREAKDOWN: VALUE IN EVERY MINUTE
           ───────────────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-24 border-b border-stone-200 bg-[#FAF8F5]">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center space-y-3 max-w-3xl mx-auto">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#8A6D1F]">
                SESSION ARCHITECTURE
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
                What happens during these 60–75 minutes?
              </h2>
              <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed">
                Every minute is structured to give you transparent clarity on the day-to-day work, the actual tools used, and what hiring managers look for.
              </p>
            </div>

            <div className="space-y-4">
              {/* Part 1 */}
              <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#1B3F8B] bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                      10 MINS
                    </span>
                    <h3 className="font-bold text-base text-stone-900 font-sans">
                      Part 1 · Who is this person?
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
                    No corporate fluff. A transparent journey: 20 years in PV starting as a fresher case processor, advancing through ICSR operations, quality review, and senior management at Accenture and Cognizant.
                  </p>
                </div>
                <div className="shrink-0 text-xs font-mono font-bold text-stone-500 bg-stone-50 px-3 py-1.5 rounded-lg border border-stone-200">
                  Career Trajectory
                </div>
              </div>

              {/* Part 2 */}
              <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#1B3F8B] bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                      15 MINS
                    </span>
                    <h3 className="font-bold text-base text-stone-900 font-sans">
                      Part 2 · What does Pharmacovigilance actually look like?
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
                    A walkthrough of the full 7-stage ICSR pipeline from patient report to regulatory submission. Which exact stages does a fresher handle on day one vs. what a physician does?
                  </p>
                </div>
                <div className="shrink-0 text-xs font-mono font-bold text-stone-500 bg-stone-50 px-3 py-1.5 rounded-lg border border-stone-200">
                  Day-One Workflow
                </div>
              </div>

              {/* Part 3 - HIGHLIGHT: Real Case Simulation with Interactive Console */}
              <div className="rounded-3xl border-2 border-[#1B3F8B]/40 bg-white p-6 sm:p-8 shadow-lg space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-200">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs font-bold text-slate-50 bg-[#1B3F8B] px-3 py-1 rounded-md">
                      PART 3 · 20 MINS
                    </span>
                    <h3 className="font-serif text-lg font-bold text-[#1A1A1A]">
                      Live Adverse Event Simulation Console
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded">
                    Interactive Software Walkthrough
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
                  During this segment, the mentor puts an unparsed adverse event report on screen and asks: <em>"What would you do on Day 1?"</em> Click through the 4 clinical operation states below to see how a real safety database operates:
                </p>

                {/* Console Tab Navigation */}
                <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-stone-100 border border-stone-200">
                  <button
                    type="button"
                    onClick={() => setActiveConsoleTab("intake")}
                    className={`flex-1 min-w-[120px] py-2 px-3 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer text-center ${
                      activeConsoleTab === "intake"
                        ? "bg-[#0B1325] text-slate-50 shadow-sm"
                        : "text-stone-600 hover:text-stone-900 hover:bg-stone-200/60"
                    }`}
                  >
                    01 · Case Intake
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveConsoleTab("meddra")}
                    className={`flex-1 min-w-[120px] py-2 px-3 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer text-center ${
                      activeConsoleTab === "meddra"
                        ? "bg-[#0B1325] text-slate-50 shadow-sm"
                        : "text-stone-600 hover:text-stone-900 hover:bg-stone-200/60"
                    }`}
                  >
                    02 · MedDRA Coding
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveConsoleTab("seriousness")}
                    className={`flex-1 min-w-[120px] py-2 px-3 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer text-center ${
                      activeConsoleTab === "seriousness"
                        ? "bg-[#0B1325] text-slate-50 shadow-sm"
                        : "text-stone-600 hover:text-stone-900 hover:bg-stone-200/60"
                    }`}
                  >
                    03 · Seriousness &amp; QC
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveConsoleTab("gateway")}
                    className={`flex-1 min-w-[120px] py-2 px-3 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer text-center ${
                      activeConsoleTab === "gateway"
                        ? "bg-[#0B1325] text-slate-50 shadow-sm"
                        : "text-stone-600 hover:text-stone-900 hover:bg-stone-200/60"
                    }`}
                  >
                    04 · E2B(R3) Gateway
                  </button>
                </div>

                {/* Console Display Screen */}
                <div className="rounded-2xl border border-stone-800 bg-[#0B1325] text-slate-100 p-5 font-mono text-xs shadow-inner space-y-4">
                  {activeConsoleTab === "intake" && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-b border-stone-800 pb-2 text-stone-400">
                        <span>ORACLE ARGUS SAFETY · CASE INTAKE ENGINE</span>
                        <span className="text-amber-400 font-bold">STATUS: TRIAGE INGESTION</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-stone-300">
                        <div className="p-3 rounded-xl bg-stone-900/80 border border-stone-800 space-y-1">
                          <span className="text-[10px] text-stone-500 uppercase">Patient Telemetry</span>
                          <p className="text-slate-100 font-bold">ID: PT-8821 · Age: 54 · Sex: Male</p>
                          <p className="text-[11px] text-stone-400">Weight: 78kg · Country: IN</p>
                        </div>
                        <div className="p-3 rounded-xl bg-stone-900/80 border border-stone-800 space-y-1">
                          <span className="text-[10px] text-stone-500 uppercase">Suspect Medicinal Product</span>
                          <p className="text-slate-100 font-bold">Metformin HCl 500mg (Oral)</p>
                          <p className="text-[11px] text-stone-400">Indication: Type 2 Diabetes Mellitus</p>
                        </div>
                      </div>
                      <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-900/60 space-y-1">
                        <span className="text-[10px] text-blue-300 uppercase font-bold">Reporter Verbatim Transcript</span>
                        <p className="font-sans text-xs italic text-blue-100">
                          "Patient initiated prescribed dosage on 12-Aug. Experienced acute postural dizziness and transient loss of consciousness at home. Relatives rushed patient to ER; admitted for 48-hour observation."
                        </p>
                      </div>
                      <div className="p-2.5 rounded-lg bg-stone-900/90 flex items-center justify-between text-[11px]">
                        <span className="text-stone-400">4-Point Validity Check:</span>
                        <span className="text-emerald-400 font-bold">[✓] Patient [✓] Reporter [✓] Suspect Drug [✓] Event</span>
                      </div>
                    </div>
                  )}

                  {activeConsoleTab === "meddra" && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-b border-stone-800 pb-2 text-stone-400">
                        <span>MEDDRA 27.0 · CODING HIERARCHY BROWSER</span>
                        <span className="text-emerald-400 font-bold">TERM AUTO-MATCHED</span>
                      </div>
                      <div className="space-y-2 text-xs">
                        <div className="p-2 rounded-lg bg-stone-900/80 border border-stone-800 flex items-center justify-between">
                          <span className="text-stone-400">SOC (System Organ Class):</span>
                          <span className="text-amber-300 font-bold">Nervous system disorders [10029205]</span>
                        </div>
                        <div className="p-2 rounded-lg bg-stone-900/80 border border-stone-800 flex items-center justify-between">
                          <span className="text-stone-400">HLGT (High Level Group):</span>
                          <span className="text-stone-200">Neurological disorders NEC [10029202]</span>
                        </div>
                        <div className="p-2 rounded-lg bg-stone-900/80 border border-stone-800 flex items-center justify-between">
                          <span className="text-stone-400">HLT (High Level Term):</span>
                          <span className="text-stone-200">Disturbances in consciousness NEC [10013442]</span>
                        </div>
                        <div className="p-2 rounded-lg bg-blue-950/60 border border-blue-800 flex items-center justify-between">
                          <span className="text-blue-300 font-bold">PT (Preferred Term):</span>
                          <span className="text-sky-200 font-bold">Syncope [10042772]</span>
                        </div>
                        <div className="p-2 rounded-lg bg-stone-900/80 border border-stone-800 flex items-center justify-between">
                          <span className="text-stone-400">LLT (Lowest Level Term):</span>
                          <span className="text-stone-300">Severe dizziness with fainting [10013589]</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-stone-400 italic">
                        Mentor Note: "In the interview, they will test whether you know the difference between LLT verbatim capture and primary SOC assignment."
                      </p>
                    </div>
                  )}

                  {activeConsoleTab === "seriousness" && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-b border-stone-800 pb-2 text-stone-400">
                        <span>ICH-E2A PROTOCOL · SERIOUSNESS AUDIT</span>
                        <span className="text-rose-400 font-bold">SERIOUS · EXPEDITED</span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px]">
                        <div className="p-2 rounded-lg bg-stone-900/80 border border-stone-800">
                          <span className="text-stone-500">Death:</span>
                          <p className="text-stone-300 font-bold">NO</p>
                        </div>
                        <div className="p-2 rounded-lg bg-stone-900/80 border border-stone-800">
                          <span className="text-stone-500">Life Threatening:</span>
                          <p className="text-stone-300 font-bold">NO</p>
                        </div>
                        <div className="p-2 rounded-lg bg-rose-950/50 border border-rose-800">
                          <span className="text-rose-300 font-bold">Hospitalization:</span>
                          <p className="text-rose-200 font-bold">YES [48 HR ADMIT]</p>
                        </div>
                        <div className="p-2 rounded-lg bg-stone-900/80 border border-stone-800">
                          <span className="text-stone-500">Disability:</span>
                          <p className="text-stone-300 font-bold">NO</p>
                        </div>
                        <div className="p-2 rounded-lg bg-stone-900/80 border border-stone-800">
                          <span className="text-stone-500">Congenital Anomaly:</span>
                          <p className="text-stone-300 font-bold">NO</p>
                        </div>
                        <div className="p-2 rounded-lg bg-amber-950/50 border border-amber-800">
                          <span className="text-amber-300">Medically Important:</span>
                          <p className="text-amber-200 font-bold">FLAGGED</p>
                        </div>
                      </div>
                      <div className="p-3 rounded-xl bg-stone-900/90 border border-stone-800 space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-stone-400">Expedited Reporting Clock:</span>
                          <span className="text-amber-400 font-bold">15-Day Mandatory Calendar Clock</span>
                        </div>
                        <p className="text-[11px] text-stone-500">
                          Zero tolerance for SLA breach. Must clear QC and Medical Safety Officer sign-off by Day 12.
                        </p>
                      </div>
                    </div>
                  )}

                  {activeConsoleTab === "gateway" && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-b border-stone-800 pb-2 text-stone-400">
                        <span>E2B(R3) XML PAYLOAD · REGULATORY GATEWAY TRANSMISSION</span>
                        <span className="text-emerald-400 font-bold">21 CFR PART 11 ENFORCED</span>
                      </div>
                      <pre className="p-3 rounded-xl bg-stone-950 border border-stone-800 text-[10.5px] text-stone-300 overflow-x-auto leading-relaxed">
{`<?xml version="1.0" encoding="UTF-8"?>
<ichicsr lang="en">
  <safetyreport version="2.0">
    <safetyreportid>IN-ARZON-2026-098</safetyreportid>
    <primarysourcecountry>IN</primarysourcecountry>
    <serious>1</serious>
    <seriousnesshospitalization>1</seriousnesshospitalization>
    <patient>
      <patientonsetage>54</patientonsetage>
      <patientsex>1</patientsex>
      <reaction>
        <reactionmeddrapt>Syncope</reactionmeddrapt>
        <reactionmeddrallt>Severe dizziness and fainting</reactionmeddrallt>
      </reaction>
    </patient>
  </safetyreport>
</ichicsr>`}
                      </pre>
                      <div className="flex items-center justify-between text-[11px] text-stone-400">
                        <span>Transmission Target: US FDA FAERS / EMA EudraVigilance</span>
                        <span className="text-emerald-400 font-bold">Ready for Sign-Off</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Part 4 */}
              <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#1B3F8B] bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                      20 MINS
                    </span>
                    <h3 className="font-bold text-base text-stone-900 font-sans">
                      Part 4 · Ask the Industry Mentor (Unfiltered Q&amp;A)
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
                    Raise your hand and ask anything: What mistakes do freshers make in interviews? What qualifications are preferred? Does AI affect junior case processing? What is the real starting salary range?
                  </p>
                </div>
                <div className="shrink-0 text-xs font-mono font-bold text-stone-500 bg-stone-50 px-3 py-1.5 rounded-lg border border-stone-200">
                  Open Mic
                </div>
              </div>

              {/* Part 5 */}
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded">
                      5 MINS
                    </span>
                    <h3 className="font-bold text-base text-emerald-950 font-sans">
                      Part 5 · The Honest Verdict (No Pitch)
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-emerald-900/80 font-sans leading-relaxed">
                    The mentor's closing guidance: <em>"Don't choose PV because somebody told you it has good scope. Understand the work first. Then decide whether you want to build a career in it."</em> End of session.
                  </p>
                </div>
                <div className="shrink-0 text-xs font-mono font-bold text-emerald-800 bg-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-200">
                  No Sales Pitch
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            04 · THE FULL ICSR PIPELINE EXPLAINED
           ───────────────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-24 border-b border-stone-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center space-y-3 max-w-3xl mx-auto">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B]">
                THE TECHNICAL CORE
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
                The Lifecycle of an Individual Case Safety Report (ICSR)
              </h2>
              <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed">
                This is what your college pharmacology textbooks never taught: how a live drug safety case actually navigates an enterprise database like Oracle Argus.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ICSR_WORKFLOW_STEPS.map((item) => (
                <div
                  key={item.step}
                  className="rounded-2xl border border-stone-200 bg-[#FAF8F5] p-5 space-y-3 shadow-2xs"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                    <span className="font-mono text-xs font-bold text-[#1B3F8B]">
                      STAGE {item.step}
                    </span>
                    <span className="font-mono text-[10px] text-stone-500 bg-white px-2 py-0.5 rounded border border-stone-200">
                      {item.role}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-stone-900 font-sans">
                    {item.title}
                  </h3>

                  <p className="text-xs text-stone-600 font-sans leading-relaxed">
                    {item.detail}
                  </p>

                  <div className="pt-2 border-t border-stone-200/80 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-stone-500">Fresher Exposure:</span>
                    <span className={item.fresherInvolvement.includes("Core") ? "text-emerald-700 font-bold" : "text-stone-600"}>
                      {item.fresherInvolvement}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            04B · INTERACTIVE DEGREE-TO-ROLE DIAGNOSTIC MATRIX
           ───────────────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-24 border-b border-stone-200 bg-[#FAF8F5]">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="text-center space-y-3 max-w-3xl mx-auto">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B]">
                ROLE DIAGNOSTIC MATRIX
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
                What does your specific degree qualify you for on Day 1?
              </h2>
              <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed">
                Select your academic degree to inspect target job titles, daily tools operated, typical starting compensation, and technical interview checkpoints.
              </p>
            </div>

            {/* Degree Selector Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <button
                type="button"
                onClick={() => setSelectedRoleDegree("bpharm")}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  selectedRoleDegree === "bpharm"
                    ? "border-[#1B3F8B] bg-white shadow-md ring-2 ring-[#1B3F8B]/20"
                    : "border-stone-200 bg-white/70 hover:bg-white hover:border-stone-300"
                }`}
              >
                <span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-stone-500">
                  UNDERGRADUATE
                </span>
                <span className="block font-bold text-xs sm:text-sm text-stone-900 mt-1">
                  B.Pharm
                </span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRoleDegree("pharmd")}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  selectedRoleDegree === "pharmd"
                    ? "border-[#1B3F8B] bg-white shadow-md ring-2 ring-[#1B3F8B]/20"
                    : "border-stone-200 bg-white/70 hover:bg-white hover:border-stone-300"
                }`}
              >
                <span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-stone-500">
                  CLINICAL DOCTORATE
                </span>
                <span className="block font-bold text-xs sm:text-sm text-stone-900 mt-1">
                  Pharm.D
                </span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRoleDegree("mpharm")}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  selectedRoleDegree === "mpharm"
                    ? "border-[#1B3F8B] bg-white shadow-md ring-2 ring-[#1B3F8B]/20"
                    : "border-stone-200 bg-white/70 hover:bg-white hover:border-stone-300"
                }`}
              >
                <span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-stone-500">
                  POSTGRADUATE
                </span>
                <span className="block font-bold text-xs sm:text-sm text-stone-900 mt-1">
                  M.Pharm
                </span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRoleDegree("lifesci")}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  selectedRoleDegree === "lifesci"
                    ? "border-[#1B3F8B] bg-white shadow-md ring-2 ring-[#1B3F8B]/20"
                    : "border-stone-200 bg-white/70 hover:bg-white hover:border-stone-300"
                }`}
              >
                <span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-stone-500">
                  SCIENCES
                </span>
                <span className="block font-bold text-xs sm:text-sm text-stone-900 mt-1">
                  B.Sc / M.Sc Life Sci
                </span>
              </button>
            </div>

            {/* Diagnostic Details Card */}
            <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
              {selectedRoleDegree === "bpharm" && (
                <div className="space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-200">
                    <div>
                      <span className="font-mono text-xs font-bold text-[#1B3F8B] uppercase tracking-wider">
                        PRIMARY TARGET POSITION
                      </span>
                      <h3 className="font-serif text-2xl font-bold text-[#1A1A1A]">
                        Drug Safety Associate I (Case Processor)
                      </h3>
                    </div>
                    <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl">
                      ₹3.8L – ₹5.2L Starting CTC
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs sm:text-sm">
                    <div className="space-y-3">
                      <h4 className="font-mono text-xs font-bold text-stone-900 uppercase">
                        Day-1 Core Responsibilities
                      </h4>
                      <ul className="space-y-2 text-stone-600 font-sans">
                        <li className="flex items-start gap-2">
                          <span className="text-[#1B3F8B] font-bold">→</span>
                          <span>Triage spontaneous patient reports and medical literature for 4 minimum validity criteria.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#1B3F8B] font-bold">→</span>
                          <span>Enter patient demographics, dosage frequency, and concomitant therapy into safety databases.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#1B3F8B] font-bold">→</span>
                          <span>Draft chronological clinical case summaries following ICH-E2D guidelines.</span>
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-mono text-xs font-bold text-stone-900 uppercase">
                        Technical Panel Interview Checkpoints
                      </h4>
                      <ul className="space-y-2 text-stone-600 font-sans">
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-700 font-bold">✓</span>
                          <span><strong>Seriousness Criteria:</strong> Know the 6 ICH-E2A seriousness criteria by heart.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-700 font-bold">✓</span>
                          <span><strong>AE vs ADR:</strong> Clear definition of causality and causal relationship assessment.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-700 font-bold">✓</span>
                          <span><strong>MedDRA Awareness:</strong> Difference between Preferred Term (PT) and Lowest Level Term (LLT).</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {selectedRoleDegree === "pharmd" && (
                <div className="space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-200">
                    <div>
                      <span className="font-mono text-xs font-bold text-[#1B3F8B] uppercase tracking-wider">
                        PRIMARY TARGET POSITION
                      </span>
                      <h3 className="font-serif text-2xl font-bold text-[#1A1A1A]">
                        Clinical Safety Specialist / Aggregate Analyst
                      </h3>
                    </div>
                    <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl">
                      ₹5.0L – ₹7.5L Starting CTC
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs sm:text-sm">
                    <div className="space-y-3">
                      <h4 className="font-mono text-xs font-bold text-stone-900 uppercase">
                        Day-1 Core Responsibilities
                      </h4>
                      <ul className="space-y-2 text-stone-600 font-sans">
                        <li className="flex items-start gap-2">
                          <span className="text-[#1B3F8B] font-bold">→</span>
                          <span>Deep clinical narrative evaluation, dechallenge/rechallenge analysis, and adverse event grading.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#1B3F8B] font-bold">→</span>
                          <span>Assisting Medical Reviewers in Periodic Safety Update Reports (PSUR) and signal detection.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#1B3F8B] font-bold">→</span>
                          <span>Evaluating drug-drug interactions and off-label usage reports across clinical trials.</span>
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-mono text-xs font-bold text-stone-900 uppercase">
                        Technical Panel Interview Checkpoints
                      </h4>
                      <ul className="space-y-2 text-stone-600 font-sans">
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-700 font-bold">✓</span>
                          <span><strong>Clinical Pharmacology:</strong> Half-life, cytochrome P450 interactions, and mechanism of action.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-700 font-bold">✓</span>
                          <span><strong>Listedness vs Unlistedness:</strong> Checking Investigator Brochure (IB) and Company Core Data Sheet (CCDS).</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-700 font-bold">✓</span>
                          <span><strong>Expedited Timelines:</strong> 7-day fatal/life-threatening vs 15-day serious unlisted rules.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {selectedRoleDegree === "mpharm" && (
                <div className="space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-200">
                    <div>
                      <span className="font-mono text-xs font-bold text-[#1B3F8B] uppercase tracking-wider">
                        PRIMARY TARGET POSITION
                      </span>
                      <h3 className="font-serif text-2xl font-bold text-[#1A1A1A]">
                        Senior Safety Associate / QC Reviewer
                      </h3>
                    </div>
                    <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl">
                      ₹4.5L – ₹6.2L Starting CTC
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs sm:text-sm">
                    <div className="space-y-3">
                      <h4 className="font-mono text-xs font-bold text-stone-900 uppercase">
                        Day-1 Core Responsibilities
                      </h4>
                      <ul className="space-y-2 text-stone-600 font-sans">
                        <li className="flex items-start gap-2">
                          <span className="text-[#1B3F8B] font-bold">→</span>
                          <span>Quality check (QC) of case narratives written by junior processors before medical sign-off.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#1B3F8B] font-bold">→</span>
                          <span>Audit trail verification under 21 CFR Part 11 to ensure data integrity and compliance.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#1B3F8B] font-bold">→</span>
                          <span>Screening global medical literature (PubMed, Embase) for spontaneous case reports.</span>
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-mono text-xs font-bold text-stone-900 uppercase">
                        Technical Panel Interview Checkpoints
                      </h4>
                      <ul className="space-y-2 text-stone-600 font-sans">
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-700 font-bold">✓</span>
                          <span><strong>ICH Guidelines:</strong> Mastery of ICH-E2A, E2B(R3), E2C(R2), and E2D.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-700 font-bold">✓</span>
                          <span><strong>Quality Metric Audits:</strong> First-time right (FTR) percentages and error categorization.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-700 font-bold">✓</span>
                          <span><strong>Duplicate Search Algorithms:</strong> How Oracle Argus detects duplicate cases across sites.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {selectedRoleDegree === "lifesci" && (
                <div className="space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-200">
                    <div>
                      <span className="font-mono text-xs font-bold text-[#1B3F8B] uppercase tracking-wider">
                        PRIMARY TARGET POSITION
                      </span>
                      <h3 className="font-serif text-2xl font-bold text-[#1A1A1A]">
                        Medical Data Specialist / Triage Associate
                      </h3>
                    </div>
                    <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl">
                      ₹3.4L – ₹4.6L Starting CTC
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs sm:text-sm">
                    <div className="space-y-3">
                      <h4 className="font-mono text-xs font-bold text-stone-900 uppercase">
                        Day-1 Core Responsibilities
                      </h4>
                      <ul className="space-y-2 text-stone-600 font-sans">
                        <li className="flex items-start gap-2">
                          <span className="text-[#1B3F8B] font-bold">→</span>
                          <span>Initial intake triage, indexing medical records, and redacting patient confidentiality identifiers.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#1B3F8B] font-bold">→</span>
                          <span>Populating core electronic data capture (EDC) fields from clinical trial reports.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#1B3F8B] font-bold">→</span>
                          <span>Transcribing physician lab notes and laboratory test units into standard SI formats.</span>
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-mono text-xs font-bold text-stone-900 uppercase">
                        Technical Panel Interview Checkpoints
                      </h4>
                      <ul className="space-y-2 text-stone-600 font-sans">
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-700 font-bold">✓</span>
                          <span><strong>Medical Vocabulary:</strong> Understanding clinical terms, lab normal ranges, and disease pathology.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-700 font-bold">✓</span>
                          <span><strong>GCP &amp; Confidentiality:</strong> HIPAA compliance, patient anonymization rules.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-700 font-bold">✓</span>
                          <span><strong>Precision &amp; Attention to Detail:</strong> Spotting subtle discrepancies in lab test dates.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            05 · REAL QUESTIONS STUDENTS ARE BRINGING
           ───────────────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 border-b border-stone-200 bg-[#FAF8F5]">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="text-center space-y-2 max-w-3xl mx-auto">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#8A6D1F]">
                UNFILTERED TRANSPARENCY
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
                Questions students are asking our mentor
              </h2>
              <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed">
                Bring your own questions or listen in as veterans answer the exact things that cause career confusion.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {RECENT_STUDENT_QUESTIONS.map((q, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 flex items-start gap-3 shadow-2xs"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#1B3F8B] font-mono text-xs font-bold border border-blue-200">
                    Q
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-stone-800 font-sans leading-relaxed">
                    "{q}"
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center pt-4">
              <button
                type="button"
                onClick={scrollToForm}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1B3F8B] hover:bg-[#153270] text-slate-50 font-bold text-xs tracking-wide transition-all shadow-md cursor-pointer"
              >
                <span>Ask Your Question in the Live Session</span>
                <ArrowRight className="h-4 w-4 text-slate-50" />
              </button>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            06 · THE ARZON INDUSTRY CONNECT INITIATIVE
           ───────────────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-24 border-b border-stone-200 bg-white">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="rounded-3xl border border-stone-200 bg-[#FAF8F5] p-8 sm:p-12 space-y-6">
              <div className="inline-flex items-center gap-2">
                <Building2 className="h-4 w-4 text-[#1B3F8B]" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B]">
                  THE ARZON INDUSTRY CONNECT INITIATIVE
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1A1A1A] leading-snug">
                We are building a bridge between graduates and the people who actually do the work.
              </h2>

              <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed">
                Most educational platforms operate as sales organizations pushing courses. Arzon is dedicated to bringing students closer to seasoned professionals who have spent decades inside the healthcare and pharmaceutical sector.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="rounded-xl border border-stone-200 bg-white p-3.5 space-y-1">
                  <span className="text-[10px] font-mono font-bold text-[#1B3F8B]">MONTHLY SERIES</span>
                  <p className="text-xs font-bold text-stone-900">Pharmacovigilance</p>
                  <span className="text-[10px] text-emerald-700 font-mono font-bold">This Sunday</span>
                </div>

                <div className="rounded-xl border border-stone-200 bg-white p-3.5 space-y-1">
                  <span className="text-[10px] font-mono font-bold text-stone-500">UPCOMING</span>
                  <p className="text-xs font-bold text-stone-900">Clinical Research</p>
                  <span className="text-[10px] text-stone-500 font-mono">CRO Leaders</span>
                </div>

                <div className="rounded-xl border border-stone-200 bg-white p-3.5 space-y-1">
                  <span className="text-[10px] font-mono font-bold text-stone-500">UPCOMING</span>
                  <p className="text-xs font-bold text-stone-900">Medical Coding</p>
                  <span className="text-[10px] text-stone-500 font-mono">AAPC Mentors</span>
                </div>

                <div className="rounded-xl border border-stone-200 bg-white p-3.5 space-y-1">
                  <span className="text-[10px] font-mono font-bold text-stone-500">UPCOMING</span>
                  <p className="text-xs font-bold text-stone-900">Regulatory Affairs</p>
                  <span className="text-[10px] text-stone-500 font-mono">eCTD Specialists</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            07 · FREQUENTLY ASKED QUESTIONS
           ───────────────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-stone-200">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="text-center space-y-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-stone-500">
                HONEST ANSWERS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-3">
              {FAQ_ITEMS.map((faq, idx) => {
                const isOpen = openFaqIdx === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl border border-stone-200 bg-white shadow-2xs overflow-hidden transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                    >
                      <span className="font-bold text-sm sm:text-base text-stone-900 font-sans">
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 text-stone-500 transition-transform duration-200 shrink-0 ${
                          isOpen ? "rotate-180 text-[#1B3F8B]" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed font-sans border-t border-stone-100">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* ─────────────────────────────────────────────────────────────
          08 · STICKY QUICK-REGISTER BAR (DESKTOP & MOBILE)
         ───────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showStickyBar && !stickyDismissed && !isSuccess && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-0 inset-x-0 z-50 border-t border-stone-300 bg-white/95 backdrop-blur-xl shadow-2xl py-3 px-4 sm:px-6"
            style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
          >
            <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="hidden md:flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-[#1B3F8B] border border-blue-200">
                  <UserCheck className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-xs sm:text-sm font-bold text-[#1A1A1A] truncate">
                      Pharmacovigilance Industry Connect
                    </p>
                    <span className="hidden xs:inline-block rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 px-2 py-0.2 font-mono text-[9px] font-bold">
                      NO SALES PITCH
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-600 font-mono">
                    This Sunday · 11:00 AM IST · 20+ Year Industry Veteran
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={scrollToForm}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#1B3F8B] hover:bg-[#153270] text-slate-50 font-bold text-xs shadow-md shadow-blue-900/20 transition-all cursor-pointer hover:-translate-y-0.5 active:translate-y-0 shrink-0"
                >
                  <span>Reserve Free Seat</span>
                  <ArrowRight className="h-3.5 w-3.5 text-slate-50" />
                </button>

                <button
                  type="button"
                  aria-label="Dismiss sticky bar"
                  onClick={() => setStickyDismissed(true)}
                  className="hidden sm:inline-flex p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
