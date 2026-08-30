import { useState, useRef, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
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
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Footer } from "@/components/landing/Footer";
import { pageSeo } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/jsonLd";
import { SITE } from "@/components/landing/constants";
import { submitWorkshopLead } from "@/lib/workshop.functions";
import { PremiumChip } from "@/components/ui/PremiumChip";

export const Route = createFileRoute("/healthcare-career-workshop")({
  head: () => {
    const title = "Free Healthcare Career Intelligence Workshop | Arzon Global";
    const description =
      "What are healthcare companies actually looking for in 2026? We analyzed 300+ recent job descriptions. Join our free live intelligence workshop.";
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
            { name: "Healthcare Career Workshop", path: "/healthcare-career-workshop" },
          ]),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            name: "Arzon Healthcare Career Intelligence Workshop - 300+ JD Research Breakdown",
            description,
            eventStatus: "https://schema.org/EventScheduled",
            eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
            location: {
              "@type": "VirtualLocation",
              url: "https://arzonglobal.com/healthcare-career-workshop",
            },
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "INR",
              availability: "https://schema.org/InStock",
            },
            organizer: {
              "@type": "Organization",
              name: "Arzon Global",
              url: "https://arzonglobal.com",
            },
          }),
        },
      ],
    };
  },
  component: HealthcareCareerWorkshopPage,
});

const WHATSAPP_COMMUNITY_URL = "https://chat.whatsapp.com/EselO2BHnFyERYyERX9E8L?s=cl&p=a&ilr=1";

const COMPANIES = [
  "Dr. Reddy's",
  "Sun Pharma",
  "Aurobindo Pharma",
  "Eli Lilly",
  "Novartis",
  "Pfizer",
  "Roche",
  "AstraZeneca",
  "IQVIA",
  "ICON",
  "Parexel",
  "Syneos Health",
  "Thermo Fisher Scientific",
  "Medpace",
];

const RESEARCH_TRACKS = [
  {
    title: "Medical Coding",
    icon: FileText,
    jdCount: "50+ JDs",
    tagline: "Outpatient, Inpatient & Chart Auditing",
    borderClass: "border-teal-200 hover:border-teal-500/60 bg-white",
    badgeBg: "bg-teal-50 text-teal-800 border-teal-200",
    iconBg: "bg-teal-100 text-teal-700",
    barColor: "bg-teal-600",
    metrics: [
      { skill: "ICD-10-CM & CPT Coding Guidelines", freq: "82%" },
      { skill: "Clinical Anatomy & Medical Terminology", freq: "94%" },
      { skill: "Chart Auditing & E/M Guidelines", freq: "68%" },
    ],
    fresherReality:
      "High intake; recruiters test anatomical accuracy and code look-up speed over theory memorization.",
  },
  {
    title: "Pharmacovigilance",
    icon: Stethoscope,
    jdCount: "50+ JDs",
    tagline: "Drug Safety & ICSR Case Processing",
    borderClass: "border-sky-200 hover:border-[#1B3F8B]/60 bg-white",
    badgeBg: "bg-sky-50 text-[#1B3F8B] border-sky-200",
    iconBg: "bg-[#1B3F8B]/10 text-[#1B3F8B]",
    barColor: "bg-[#1B3F8B]",
    metrics: [
      { skill: "Oracle Argus Safety / ArisG Databases", freq: "84%" },
      { skill: "MedDRA & WHODrug Standard Dictionaries", freq: "91%" },
      { skill: "ICSR Case Narrative Writing & Triage", freq: "76%" },
    ],
    fresherReality:
      "Zero tolerance for narrative errors; hands-on safety database case logging gives the highest shortlist rate.",
  },
  {
    title: "Clinical Research",
    icon: Database,
    jdCount: "50+ JDs",
    tagline: "Clinical Operations & Data Management (CDM)",
    borderClass: "border-emerald-200 hover:border-emerald-500/60 bg-white",
    badgeBg: "bg-emerald-50 text-emerald-800 border-emerald-200",
    iconBg: "bg-emerald-100 text-emerald-700",
    barColor: "bg-emerald-600",
    metrics: [
      { skill: "ICH-GCP E6(R2) Compliance Guidelines", freq: "96%" },
      { skill: "EDC Systems (Medidata RAVE / Inform)", freq: "72%" },
      { skill: "Trial Master File (TMF) & Audit Trails", freq: "68%" },
    ],
    fresherReality:
      "CROs prioritize candidate readiness on GCP protocols and EDC data discrepancy reconciliation.",
  },
  {
    title: "Medical Writing",
    icon: BookOpen,
    jdCount: "50+ JDs",
    tagline: "Regulatory & Clinical Study Reports",
    borderClass: "border-amber-200 hover:border-amber-500/60 bg-white",
    badgeBg: "bg-amber-50 text-amber-900 border-amber-200",
    iconBg: "bg-amber-100 text-[#8A6D1F]",
    barColor: "bg-[#8A6D1F]",
    metrics: [
      { skill: "Clinical Study Reports (CSR) to ICH E3", freq: "80%" },
      { skill: "Protocol & Investigator Brochure Summaries", freq: "74%" },
      { skill: "Patient Safety & Narrative Compilation", freq: "88%" },
    ],
    fresherReality:
      "Clarity and scientific precision are tested via short written summary tasks during technical rounds.",
  },
  {
    title: "Regulatory Affairs",
    icon: Award,
    jdCount: "50+ JDs",
    tagline: "Global Filings & Dossier Lifecycles",
    borderClass: "border-purple-200 hover:border-purple-500/60 bg-white",
    badgeBg: "bg-purple-50 text-purple-800 border-purple-200",
    iconBg: "bg-purple-100 text-purple-700",
    barColor: "bg-purple-600",
    metrics: [
      { skill: "eCTD Electronic Dossier Structure (M1-M5)", freq: "86%" },
      { skill: "DMF / NDA / ANDA Submission Lifecycles", freq: "79%" },
      { skill: "USFDA, EMA & CDSCO Regulatory Norms", freq: "71%" },
    ],
    fresherReality:
      "Filing structure awareness and change-control compliance are key differentiators for freshers.",
  },
  {
    title: "Healthcare Analytics",
    icon: Code,
    jdCount: "50+ JDs",
    tagline: "Clinical SAS, RWE & HEOR Datasets",
    borderClass: "border-blue-200 hover:border-blue-500/60 bg-white",
    badgeBg: "bg-blue-50 text-blue-800 border-blue-200",
    iconBg: "bg-blue-100 text-blue-700",
    barColor: "bg-blue-600",
    metrics: [
      { skill: "Base & Advanced SAS Programming", freq: "88%" },
      { skill: "CDISC Standards (SDTM / ADaM Domains)", freq: "92%" },
      { skill: "SQL Queries & Health Outcomes Research", freq: "64%" },
    ],
    fresherReality:
      "Surging demand for automated safety tables and biostatistical programming in global pharma GCCs.",
  },
];

const WORKSHOP_AGENDA = [
  {
    time: "00 - 05 min",
    title: "Why This Research Exists",
    desc: "The systemic disconnect between college syllabus and corporate hiring benchmarks.",
    badge: "Orientation",
  },
  {
    time: "05 - 15 min",
    title: "2026 Healthcare Hiring Landscape",
    desc: "Active vacancy distributions across Pharma MNCs, CROs, IT Health verticals, and Hospital GCCs.",
    badge: "Market Map",
  },
  {
    time: "15 - 30 min",
    title: "The 300+ JD Deep Dive",
    desc: "Empirical frequency of tools (Argus, MedDRA, SAS, EDC), certifications, and skill gaps.",
    badge: "Core Data",
  },
  {
    time: "30 - 40 min",
    title: "Track-by-Track Reality Check",
    desc: "Day-one expectations for freshers entering Pharmacovigilance, Coding, CDM, CRA, and Analytics.",
    badge: "Role Deep Dive",
  },
  {
    time: "40 - 50 min",
    title: "Industry Mentor Panel",
    desc: "Practicing managers share what makes a fresher resume get shortlisted on recruiter desks.",
    badge: "Practitioner Advice",
  },
  {
    time: "50 - 60 min",
    title: "Live Unfiltered Q&A",
    desc: "Direct answers to your specific career choices, educational eligibility, and next steps.",
    badge: "Interactive Q&A",
  },
];

const BREAKDOWN_PILLARS = [
  {
    icon: Briefcase,
    title: "Job Roles",
    subtitle: "Which healthcare roles are companies hiring for?",
    desc: "Active volume distributions across safety data processing, clinical trial ops, and regulatory affairs.",
    accent: "text-[#1B3F8B]",
    bg: "bg-sky-50 text-[#1B3F8B] border border-sky-200",
  },
  {
    icon: Zap,
    title: "Skills",
    subtitle: "Which skills repeatedly appear in current job descriptions?",
    desc: "The critical hard and soft proficiencies that pass Applicant Tracking System (ATS) algorithms in 2026.",
    accent: "text-teal-700",
    bg: "bg-teal-50 text-teal-700 border border-teal-200",
  },
  {
    icon: Layers,
    title: "Tools",
    subtitle: "Which software & technical tools are employers asking for?",
    desc: "Oracle Argus Safety, MedDRA, WHODrug, Medidata RAVE, ICD-10-CM, CPT, and SAS datasets.",
    accent: "text-blue-700",
    bg: "bg-blue-50 text-blue-700 border border-blue-200",
  },
  {
    icon: GraduationCap,
    title: "Qualifications",
    subtitle: "Which degrees and educational backgrounds are accepted?",
    desc: "Clear qualification-to-role matching criteria across B.Pharm, M.Pharm, Pharm.D, and Life Sciences.",
    accent: "text-purple-700",
    bg: "bg-purple-50 text-purple-700 border border-purple-200",
  },
  {
    icon: Users,
    title: "Fresher Requirements",
    subtitle: "What are employers actually expecting from entry-level candidates?",
    desc: "What hiring managers evaluate when screening freshers with 0 years of full-time corporate experience.",
    accent: "text-emerald-700",
    bg: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  },
  {
    icon: FileText,
    title: "Role Expectations",
    subtitle: "What will you actually be expected to do after getting hired?",
    desc: "Daily operational tasks: ICSR triage, narrative drafting, trial master file reconciliation, or chart auditing.",
    accent: "text-orange-700",
    bg: "bg-orange-50 text-orange-700 border border-orange-200",
  },
  {
    icon: Sparkles,
    title: "Career Paths",
    subtitle: "Where can each career track take you?",
    desc: "3-year and 5-year salary progressions, leadership tracks, and global offshore mobility pathways.",
    accent: "text-[#8A6D1F]",
    bg: "bg-amber-50 text-[#8A6D1F] border border-amber-200",
  },
  {
    icon: AlertCircle,
    title: "Skill Gaps",
    subtitle: "What are graduates commonly missing?",
    desc: "The critical blindspots in standard academic curricula and how to bridge them with real case work.",
    accent: "text-rose-700",
    bg: "bg-rose-50 text-rose-700 border border-rose-200",
  },
];

const AUDIENCE_TAGS = [
  "B.Pharm Graduates & Final Years",
  "M.Pharm (Pharmacology / PV / QA / DRA)",
  "Pharm.D Doctors of Pharmacy",
  "B.Sc / M.Sc Life Sciences",
  "Biotechnology Graduates",
  "Microbiology Graduates",
  "Healthcare & Nursing Students",
  "Recent Science Graduates Looking for Jobs",
  "Anyone Planning a 2026 Healthcare Career",
];

const MENTOR_QUESTIONS = [
  "What would make you shortlist a fresher with 0 experience?",
  "Which software tools matter most on day 1 of the job?",
  "What common mistakes do graduates make during technical interviews?",
  "Which career track has the highest fresher intake in 2026?",
  "How should I position academic projects to prove practical competence?",
];

const WALK_AWAY_BENEFITS = [
  "A crystal-clear map of 6 healthcare career tracks and current 2026 demand",
  "Unfiltered employer requirements compiled from 300+ recent job descriptions",
  "Prioritized list of technical tools (Argus, MedDRA, SAS, ICD-10) to focus on",
  "Real understanding of entry-level salary benchmarks (₹2.8L - ₹5.2L starting) and growth curves",
  "Clear distinction between generic course promises vs actual recruiter criteria",
  "Direct answers from working industry mentors on your personal eligibility",
  "The official Arzon 300+ Healthcare JD Research Executive Summary",
];

const FAQS = [
  {
    q: "Is this workshop truly free?",
    a: "Yes, 100% free. No payment or credit card is required. Our mission is to publish transparent healthcare career intelligence so graduates can make informed career choices.",
  },
  {
    q: "Is there any course sales pitch during the research session?",
    a: "No. The entire 60-minute session is dedicated to breaking down our 300+ JD research findings, tools, skills, and answering your questions live with mentors.",
  },
  {
    q: "How do I attend the session?",
    a: "The session is held live online via Google Meet / Zoom. Once you register, you will receive calendar invites, WhatsApp reminders, and direct joining links.",
  },
  {
    q: "I am a fresher / final-year student. Is this relevant for me?",
    a: "Absolutely. In fact, it is designed specifically for students and fresh graduates who have degrees but want to know what skills employers actually require to shortlist candidates.",
  },
  {
    q: "Will I get the research report after the workshop?",
    a: "Yes. All registered attendees receive access to the Arzon 300+ Healthcare JD Research Executive Summary and career track cheat sheets.",
  },
];

const CAREER_TRACK_OPTIONS = [
  { value: "Medical Coding", label: "Medical Coding (Outpatient / Inpatient)" },
  { value: "Pharmacovigilance", label: "Pharmacovigilance (Drug Safety / ICSR)" },
  { value: "Clinical Research", label: "Clinical Research (CRC / CRA / CDM)" },
  { value: "Medical Writing", label: "Medical Writing (CSR / Regulatory)" },
  { value: "Regulatory Affairs", label: "Regulatory Affairs (eCTD / Filings)" },
  { value: "Healthcare Analytics", label: "Healthcare Analytics (Clinical SAS / RWE)" },
  { value: "All Tracks / Undecided", label: "Exploring All Tracks" },
];

interface CustomSelectProps {
  label: string;
  required?: boolean;
  value: string;
  onChange: (val: string) => void;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
}

function CustomSelect({
  label,
  required,
  value,
  onChange,
  options,
  placeholder = "Select an option",
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel = options.find((o) => o.value === value)?.label || "";

  return (
    <div className="relative" ref={ref}>
      <label className="block text-xs font-semibold text-stone-700 mb-1.5">
        {label} {required && <span className="text-[#1B3F8B]">*</span>}
      </label>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`w-full h-11 px-3.5 rounded-xl bg-white border text-xs flex items-center justify-between transition-all cursor-pointer ${
          open
            ? "border-[#1B3F8B] ring-1 ring-[#1B3F8B] text-stone-900 shadow-sm"
            : "border-stone-300 hover:border-stone-400 text-stone-800"
        }`}
      >
        <span
          className={
            value ? "text-stone-900 font-semibold truncate" : "text-stone-400 font-normal truncate"
          }
        >
          {selectedLabel || placeholder}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-stone-400 shrink-0 transition-transform duration-200 ${
            open ? "rotate-180 text-[#1B3F8B]" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 top-full mt-1.5 z-50 rounded-xl border border-stone-200 bg-white py-1.5 shadow-xl max-h-56 overflow-y-auto"
          >
            {options.map((opt) => {
              const isSelected = opt.value === value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                  className={`w-full px-3.5 py-2.5 text-left text-xs flex items-center justify-between transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-sky-50 text-[#1B3F8B] font-bold"
                      : "text-stone-700 hover:bg-stone-50 hover:text-stone-950"
                  }`}
                >
                  <span className="truncate">{opt.label}</span>
                  {isSelected && <Check className="h-3.5 w-3.5 text-[#1B3F8B] shrink-0" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function HealthcareCareerWorkshopPage() {
  const formRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  // Form State: Step 1 (Low friction)
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [careerTrack, setCareerTrack] = useState("");

  // Step 2 Question box
  const [userQuestion, setUserQuestion] = useState("");
  const [questionSubmitted, setQuestionSubmitted] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => {
        nameInputRef.current?.focus();
      }, 450);
    }
  };

  const handleStep1Submit = async (e: React.FormEvent) => {
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
    if (!careerTrack) {
      setErrorMessage("Please select your career track of interest.");
      return;
    }

    setIsSubmitting(true);

    try {
      await submitWorkshopLead({
        data: {
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          degree: `Track: ${careerTrack}`,
          source: "healthcare-career-workshop",
          utmSource: "300_jd_research_lp",
        },
      });
      setIsSuccess(true);
    } catch (err: any) {
      console.warn("Workshop submission notice:", err);
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userQuestion.trim()) {
      setQuestionSubmitted(true);
    }
  };

  return (
    <div className="tone-light min-h-screen bg-[#FAF8F5] text-[#1A1A1A] font-sans antialiased overflow-x-hidden">
      <main className="relative z-10">
        {/* ─────────────────────────────────────────────────────────────
            HERO SECTION: EDITORIAL LIGHT THEME (White / Ivory + Navy #1B3F8B + Gold #8A6D1F)
           ───────────────────────────────────────────────────────────── */}
        <section className="pt-24 pb-16 sm:pt-28 sm:pb-20 border-b border-stone-300/80 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              {/* Left Column: Research Value & Editorial Framing */}
              <div className="lg:col-span-7 space-y-6 pt-2">
                {/* Event Status Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="inline-flex items-center gap-2 rounded-full border border-sky-300 bg-sky-50 px-3 py-1 text-xs font-mono font-bold text-[#1B3F8B] shadow-2xs">
                    <span className="flex h-2 w-2 rounded-full bg-[#1B3F8B] motion-safe:animate-pulse" />
                    <span>LIVE</span>
                    <span className="text-sky-300">|</span>
                    <span className="text-emerald-700">100% FREE</span>
                    <span className="text-sky-300">|</span>
                    <span>QUARTERLY INTELLIGENCE REPORT</span>
                  </div>
                </div>

                {/* Main Outcome Editorial Headline */}
                <div className="space-y-3">
                  <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1A1A1A] leading-[1.14]">
                    What Are Healthcare Companies{" "}
                    <span className="italic font-normal text-[#8A6D1F]">Actually Looking For</span>{" "}
                    In 2026?
                  </h1>
                  <p className="font-mono text-sm sm:text-base font-bold text-[#1B3F8B] tracking-wide">
                    We analyzed 300+ recent healthcare job descriptions to find out.
                  </p>
                </div>

                {/* Event Metadata Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl border border-stone-200 bg-[#FAF8F5] shadow-xs">
                  <div className="space-y-1">
                    <p className="text-[10px] font-mono uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-[#1B3F8B]" />
                      <span>Next Session</span>
                    </p>
                    <p className="text-xs sm:text-sm font-bold text-[#1A1A1A]">
                      This Sunday, 11:00 AM IST
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-mono uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-[#8A6D1F]" />
                      <span>Duration</span>
                    </p>
                    <p className="text-xs sm:text-sm font-bold text-[#1A1A1A]">
                      60 Mins (Live + Q&A)
                    </p>
                  </div>
                  <div className="space-y-1 col-span-2 sm:col-span-1">
                    <p className="text-[10px] font-mono uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-teal-600" />
                      <span>Format</span>
                    </p>
                    <p className="text-xs sm:text-sm font-bold text-[#1A1A1A]">
                      Live Online Interactive
                    </p>
                  </div>
                </div>

                {/* Core Value Statement */}
                <div className="rounded-2xl border border-sky-200 bg-sky-50/60 p-5 space-y-3">
                  <p className="font-serif text-lg font-bold text-[#1B3F8B]">
                    Join Arzon's FREE Healthcare Career Intelligence Workshop
                  </p>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans font-normal">
                    A live industry-focused briefing where we break down what healthcare, pharma,
                    CRO, and life-sciences employers are actually asking for in their current
                    openings.
                  </p>
                  <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-mono text-stone-600 border-t border-sky-200/80">
                    <span className="inline-flex items-center gap-1.5 text-teal-800 font-bold">
                      <CheckCircle2 className="h-4 w-4 text-teal-600" /> 6+ Career Tracks
                    </span>
                    <span className="text-stone-300">·</span>
                    <span className="inline-flex items-center gap-1.5 text-[#8A6D1F] font-bold">
                      <CheckCircle2 className="h-4 w-4 text-[#8A6D1F]" /> Industry Mentors
                    </span>
                    <span className="text-stone-300">·</span>
                    <span className="inline-flex items-center gap-1.5 text-[#1B3F8B] font-bold">
                      <CheckCircle2 className="h-4 w-4 text-[#1B3F8B]" /> Real Recruiter
                      Requirements
                    </span>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-stone-600 pt-1">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                    <span>No payment required</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="h-4 w-4 text-emerald-600" />
                    <span>No course purchase required</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="h-4 w-4 text-[#1B3F8B]" />
                    <span className="text-stone-700 font-semibold">Limited live capacity</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Clean White Registration Card */}
              <div className="lg:col-span-5" ref={formRef} id="register-section">
                <div className="relative rounded-2xl border border-stone-200 bg-white p-6 sm:p-8 shadow-xl">
                  {/* Top Form Header */}
                  <div className="flex items-center justify-between pb-4 mb-5 border-b border-stone-200">
                    <div className="flex items-center gap-2">
                      <span className="flex h-2.5 w-2.5 rounded-full bg-[#1B3F8B] motion-safe:animate-pulse" />
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B]">
                        {isSuccess ? "Registration Confirmed" : "Reserve Free Seat"}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                      Free Live Access
                    </span>
                  </div>

                  {isSuccess ? (
                    /* ── POST-REGISTRATION HIGH-COMMITMENT ONBOARDING ── */
                    <div className="space-y-5 animate-in fade-in zoom-in-95 duration-300">
                      <div className="text-center space-y-2">
                        <div className="mx-auto flex h-13 w-13 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 ring-4 ring-emerald-50">
                          <CheckCircle2 className="h-8 w-8" />
                        </div>
                        <h3 className="font-serif text-2xl font-bold text-[#1A1A1A]">YOU'RE IN!</h3>
                        <p className="text-xs text-stone-600">
                          Seat confirmed for <strong className="text-[#1B3F8B]">{name}</strong>.
                          Complete the quick steps below:
                        </p>
                      </div>

                      {/* Step 1: Add to Calendar */}
                      <div className="rounded-xl border border-stone-200 bg-stone-50 p-3.5 flex items-center justify-between gap-3 shadow-xs">
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-100 text-[#1B3F8B] text-xs font-mono font-bold">
                            01
                          </div>
                          <div>
                            <p className="text-xs font-bold text-stone-900">Add to Calendar</p>
                            <p className="text-[11px] text-stone-500">
                              Never miss the live research breakdown
                            </p>
                          </div>
                        </div>
                        <a
                          href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Arzon+Healthcare+Career+Intelligence+Workshop&details=Live+session+breaking+down+300%2B+healthcare+job+descriptions.+Link:+https://arzonglobal.com/healthcare-career-workshop"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-white hover:bg-stone-100 text-stone-800 font-bold text-xs border border-stone-300 transition-all shrink-0 inline-flex items-center gap-1.5 shadow-2xs"
                        >
                          <Calendar className="h-3.5 w-3.5 text-[#1B3F8B]" />
                          <span>Add</span>
                        </a>
                      </div>

                      {/* Step 2: WhatsApp Community */}
                      <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-3.5 space-y-2.5 shadow-xs">
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-200 text-emerald-900 text-xs font-mono font-bold">
                            02
                          </div>
                          <div>
                            <p className="text-xs font-bold text-emerald-950">
                              Join WhatsApp Career Community
                            </p>
                            <p className="text-[11px] text-emerald-800">
                              Instant joining link & research PDF summary
                            </p>
                          </div>
                        </div>
                        <a
                          href={WHATSAPP_COMMUNITY_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs transition-all shadow-md shadow-emerald-600/20 cursor-pointer"
                        >
                          <MessageCircle className="h-4 w-4" />
                          <span>Join Arzon WhatsApp Community</span>
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      </div>

                      {/* Step 3: Ask Mentors in Advance */}
                      <div className="rounded-xl border border-stone-200 bg-stone-50 p-3.5 space-y-2.5 shadow-xs">
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-[#8A6D1F] text-xs font-mono font-bold">
                            03
                          </div>
                          <div>
                            <p className="text-xs font-bold text-stone-900">
                              Ask Mentors in Advance (Optional)
                            </p>
                            <p className="text-[11px] text-stone-500">
                              Have your question answered during live Q&A
                            </p>
                          </div>
                        </div>

                        {questionSubmitted ? (
                          <div className="p-2.5 rounded-lg bg-teal-50 border border-teal-200 text-teal-800 text-xs flex items-center gap-2 font-medium">
                            <Check className="h-4 w-4 text-teal-600" />
                            <span>Question submitted to the mentor panel!</span>
                          </div>
                        ) : (
                          <form onSubmit={handleQuestionSubmit} className="flex gap-2">
                            <input
                              type="text"
                              value={userQuestion}
                              onChange={(e) => setUserQuestion(e.target.value)}
                              placeholder="e.g. Can a B.Pharm fresher enter PV directly?"
                              className="flex-1 h-9 px-3 rounded-lg bg-white border border-stone-300 text-stone-900 placeholder-stone-400 text-xs focus:outline-none focus:border-[#1B3F8B]"
                            />
                            <button
                              type="submit"
                              className="h-9 px-3.5 rounded-lg bg-[#1B3F8B] hover:bg-[#153270] text-white font-bold text-xs transition-all shrink-0 flex items-center gap-1"
                            >
                              <Send className="h-3 w-3" />
                              <span>Send</span>
                            </button>
                          </form>
                        )}
                      </div>

                      {/* Step 4: Invite a Classmate */}
                      <div className="rounded-xl border border-sky-200 bg-sky-50/70 p-3.5 space-y-2.5 shadow-xs">
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-200 text-[#1B3F8B] text-xs font-mono font-bold">
                            04
                          </div>
                          <div>
                            <p className="text-xs font-bold text-stone-900">
                              Invite a Classmate (Unlock Salary Dataset)
                            </p>
                            <p className="text-[11px] text-stone-600">
                              Share with your college group or batchmates
                            </p>
                          </div>
                        </div>
                        <a
                          href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                            "Hey! I just registered for the free Arzon Healthcare Career Intelligence Workshop (analyzing 300+ JDs across Pharma, PV & Clinical Research). Reserve your free seat here: https://arzonglobal.com/healthcare-career-workshop"
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-[#1B3F8B] hover:bg-[#153270] text-white font-bold text-xs transition-all shadow-2xs cursor-pointer"
                        >
                          <Share2 className="h-3.5 w-3.5" />
                          <span>Share on WhatsApp</span>
                        </a>
                      </div>

                      <div className="text-center pt-1">
                        <button
                          type="button"
                          onClick={() => {
                            setIsSuccess(false);
                            setName("");
                            setPhone("");
                            setEmail("");
                            setCareerTrack("");
                          }}
                          className="text-[11px] text-stone-500 hover:text-stone-800 underline cursor-pointer"
                        >
                          Register another colleague
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* ── STEP 1: LOW-FRICTION REGISTRATION FORM ── */
                    <div className="space-y-4">
                      {/* Live Scarcity & Fast Filling Bar */}
                      <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 space-y-1.5 font-sans">
                        <div className="flex items-center justify-between text-xs font-bold text-amber-950">
                          <span className="flex items-center gap-1.5">
                            <span className="flex h-2 w-2 rounded-full bg-amber-500 motion-safe:animate-ping" />
                            <span>Fast Filling · 112 / 150 Registered</span>
                          </span>
                          <span className="font-mono text-[11px] text-amber-900 font-bold">38 Spots Left</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-amber-200/70">
                          <div className="h-full w-[74%] rounded-full bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-500" />
                        </div>
                      </div>

                      <form onSubmit={handleStep1Submit} className="space-y-4">
                        {errorMessage && (
                          <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
                            <span>{errorMessage}</span>
                          </div>
                        )}

                      {/* Full Name */}
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                          Full Name <span className="text-[#1B3F8B]">*</span>
                        </label>
                        <input
                          ref={nameInputRef}
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Rahul Sharma"
                          className="w-full h-11 px-3.5 rounded-xl bg-white border border-stone-300 text-stone-900 placeholder-stone-400 text-xs focus:outline-none focus:border-[#1B3F8B] focus:ring-1 focus:ring-[#1B3F8B] transition-all"
                        />
                      </div>

                      {/* WhatsApp Mobile Number & Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                            WhatsApp Number <span className="text-[#1B3F8B]">*</span>
                          </label>
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="10-digit number"
                            className="w-full h-11 px-3.5 rounded-xl bg-white border border-stone-300 text-stone-900 placeholder-stone-400 text-xs focus:outline-none focus:border-[#1B3F8B] focus:ring-1 focus:ring-[#1B3F8B] transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                            Email Address <span className="text-[#1B3F8B]">*</span>
                          </label>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@email.com"
                            className="w-full h-11 px-3.5 rounded-xl bg-white border border-stone-300 text-stone-900 placeholder-stone-400 text-xs focus:outline-none focus:border-[#1B3F8B] focus:ring-1 focus:ring-[#1B3F8B] transition-all"
                          />
                        </div>
                      </div>

                      {/* Career Track of Interest */}
                      <CustomSelect
                        label="Career Track of Interest"
                        required
                        value={careerTrack}
                        onChange={setCareerTrack}
                        options={CAREER_TRACK_OPTIONS}
                        placeholder="Select Track (or explore all)"
                      />

                      {/* Submit Action Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-12 rounded-xl bg-[#1B3F8B] hover:bg-[#153270] text-white font-extrabold text-sm tracking-wide shadow-lg shadow-[#1B3F8B]/25 active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent motion-safe:animate-spin" />
                            <span>Reserving Free Seat...</span>
                          </>
                        ) : (
                          <>
                            <span>Reserve My Free Seat</span>
                            <ArrowRight className="h-4 w-4" />
                          </>
                        )}
                      </button>

                      <p className="text-[10px] text-center text-stone-500 leading-tight">
                        *Instant calendar invitation & WhatsApp community link sent immediately upon
                        registration.
                      </p>
                    </form>
                  </div>
                )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            SECTION 2: YOUR DEGREE IS ONLY THE START (Editorial Flow)
           ───────────────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 border-b border-stone-300/80 bg-[#FAF8F5]">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-10">
            <div className="space-y-3 max-w-2xl mx-auto">
              <PremiumChip variant="navy" size="md">
                THE HIRING REALITY
              </PremiumChip>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-tight">
                YOUR DEGREE IS ONLY THE START.
              </h2>
              <p className="text-sm sm:text-base text-stone-700 font-sans">
                You may have the right degree. But do you know what employers are actually screening
                for in 2026?
              </p>
            </div>

            {/* Visual Progression Funnel */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                {
                  step: "01",
                  label: "Degree",
                  sub: "Academic Baseline",
                  color: "text-stone-800",
                  bg: "border-stone-200 bg-white",
                },
                {
                  step: "02",
                  label: "Skills",
                  sub: "ATS Keywords",
                  color: "text-teal-800",
                  bg: "border-teal-200 bg-teal-50/60",
                },
                {
                  step: "03",
                  label: "Tools",
                  sub: "Argus, SAS, ICD-10",
                  color: "text-[#1B3F8B]",
                  bg: "border-sky-200 bg-sky-50/60",
                },
                {
                  step: "04",
                  label: "Role Reality",
                  sub: "Day 1 Execution",
                  color: "text-purple-800",
                  bg: "border-purple-200 bg-purple-50/60",
                },
                {
                  step: "05",
                  label: "Interview",
                  sub: "Technical Screening",
                  color: "text-[#8A6D1F]",
                  bg: "border-amber-200 bg-amber-50/60",
                },
                {
                  step: "06",
                  label: "Job Offer",
                  sub: "Verified Role Fit",
                  color: "text-emerald-800",
                  bg: "border-emerald-200 bg-emerald-50/60",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border ${item.bg} text-left space-y-2 hover:shadow-md transition-all flex flex-col justify-between shadow-2xs`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#1B3F8B]">{item.step}</span>
                  </div>
                  <div>
                    <p className={`text-sm font-bold ${item.color}`}>{item.label}</p>
                    <p className="text-[11px] text-stone-500 leading-tight">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={scrollToForm}
                className="inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-white hover:bg-stone-50 text-stone-900 font-bold text-xs border border-stone-300 transition-all cursor-pointer shadow-xs"
              >
                <span>Reserve My Free Seat</span>
                <ArrowRight className="h-3.5 w-3.5 text-[#1B3F8B]" />
              </button>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            SECTION 3: 300+ JOB DESCRIPTIONS RESEARCH DASHBOARD
           ───────────────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 border-b border-stone-300/80 bg-white">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center space-y-3 max-w-3xl mx-auto">
              <PremiumChip variant="gold" size="md">
                PROPRIETARY INTELLIGENCE REPORT
              </PremiumChip>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-tight">
                300+ JOB DESCRIPTIONS. REAL EMPLOYER REQUIREMENTS.
              </h2>
              <p className="text-sm sm:text-base text-stone-700 font-sans">
                Arzon research teams analyzed{" "}
                <strong className="text-stone-950">
                  50+ recent job descriptions across 6 specialized healthcare career tracks
                </strong>
                .
              </p>
            </div>

            {/* Visual Research Track Cards with Palette-Coded Styling */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {RESEARCH_TRACKS.map((track, idx) => {
                const IconComponent = track.icon;
                return (
                  <div
                    key={idx}
                    className={`rounded-2xl border ${track.borderClass} p-6 space-y-5 transition-all flex flex-col justify-between shadow-xs hover:shadow-md`}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`flex h-9 w-9 items-center justify-center rounded-xl ${track.iconBg}`}
                          >
                            <IconComponent className="h-5 w-5" />
                          </div>
                          <h3 className="text-lg font-bold text-[#1A1A1A]">{track.title}</h3>
                        </div>
                        <span
                          className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${track.badgeBg}`}
                        >
                          {track.jdCount}
                        </span>
                      </div>

                      <p className="text-xs text-stone-500 font-medium">{track.tagline}</p>

                      {/* Frequency Percentages */}
                      <div className="space-y-2 pt-2 border-t border-stone-200">
                        <p className="text-[10px] font-mono uppercase tracking-wider text-stone-400">
                          Recruiter Frequency In JDs:
                        </p>
                        <div className="space-y-2.5">
                          {track.metrics.map((m, mIdx) => (
                            <div key={mIdx} className="space-y-1">
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-stone-800 font-semibold">{m.skill}</span>
                                <span className="font-mono font-bold text-[#1B3F8B]">{m.freq}</span>
                              </div>
                              {/* Progress bar visual */}
                              <div className="w-full h-1.5 rounded-full bg-stone-100 overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${track.barColor}`}
                                  style={{ width: m.freq }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-[11px] text-stone-700 leading-relaxed mt-2">
                      <strong className="text-[#1B3F8B]">Fresher Reality:</strong>{" "}
                      {track.fresherReality}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Researched Company Badges */}
            <div className="rounded-2xl border border-stone-200 bg-[#FAF8F5] p-6 sm:p-8 space-y-5">
              <p className="text-xs font-mono font-semibold uppercase tracking-wider text-stone-600 text-center">
                Studied from active postings across Tier-1 Pharma MNCs, CROs & Global Life Sciences:
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
                {COMPANIES.map((company, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3.5 py-1.5 rounded-lg bg-white border border-stone-200 text-xs sm:text-sm font-semibold text-stone-800 hover:border-[#1B3F8B]/50 hover:text-[#1B3F8B] transition-colors shadow-2xs"
                  >
                    <Building2 className="h-3.5 w-3.5 mr-1.5 text-[#1B3F8B]" />
                    {company}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            SECTION 4: THE 60-MINUTE WORKSHOP AGENDA
           ───────────────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 border-b border-stone-300/80 bg-[#FAF8F5]">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="text-center space-y-3">
              <PremiumChip variant="navy" size="md">
                STRUCTURED 60-MINUTE AGENDA
              </PremiumChip>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-tight">
                WHAT HAPPENS DURING THE LIVE SESSION
              </h2>
              <p className="text-sm text-stone-700 font-sans">
                A tight, zero-fluff 60-minute intelligence briefing structured for actionable
                takeaways.
              </p>
            </div>

            <div className="space-y-3">
              {WORKSHOP_AGENDA.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200 hover:border-stone-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all shadow-2xs"
                >
                  <div className="flex items-start sm:items-center gap-3">
                    <span className="px-2.5 py-1 rounded-md bg-sky-50 border border-sky-200 text-[#1B3F8B] font-mono text-xs font-bold shrink-0">
                      {item.time}
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-[#1A1A1A]">{item.title}</h3>
                      <p className="text-xs text-stone-600">{item.desc}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded bg-stone-100 text-stone-600 self-start sm:self-center shrink-0">
                    {item.badge}
                  </span>
                </div>
              ))}
            </div>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={scrollToForm}
                className="inline-flex items-center gap-2 h-12 px-7 rounded-xl bg-[#1B3F8B] hover:bg-[#153270] text-white font-extrabold text-xs transition-all cursor-pointer shadow-lg shadow-[#1B3F8B]/20"
              >
                <span>Reserve My Free Seat</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            SECTION 5: THE 8 RESEARCH INTELLIGENCE PILLARS
           ───────────────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 border-b border-stone-300/80 bg-white">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <PremiumChip variant="gold" size="md">
                WHAT WE'LL BREAK DOWN
              </PremiumChip>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-tight">
                8 DIMENSIONS OF HEALTHCARE HIRING
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {BREAKDOWN_PILLARS.map((pillar, idx) => {
                const IconComponent = pillar.icon;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl border border-stone-200 bg-white p-5 flex flex-col justify-between hover:border-stone-300 hover:shadow-xs transition-all shadow-2xs"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-xl ${pillar.bg}`}
                        >
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <span className="text-[11px] font-mono text-stone-400 font-bold">
                          0{idx + 1}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-sm font-bold text-[#1A1A1A] uppercase tracking-wider">
                          {pillar.title}
                        </h3>
                        <p className={`mt-1 text-xs font-semibold ${pillar.accent} leading-snug`}>
                          {pillar.subtitle}
                        </p>
                      </div>

                      <p className="text-xs text-stone-600 leading-relaxed">{pillar.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            SECTION 6: LEARN FROM PRACTICING INDUSTRY MENTORS
           ───────────────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 border-b border-stone-300/80 bg-[#FAF8F5]">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <PremiumChip variant="navy" size="md">
                PRACTITIONER PANEL
              </PremiumChip>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-tight">
                LEARN FROM PEOPLE WORKING IN THE INDUSTRY
              </h2>
              <p className="text-sm text-stone-700 font-sans">
                Our career sessions include industry professionals who decode what these
                requirements actually mean in corporate environments.
              </p>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8 space-y-6 shadow-xs">
              <p className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B]">
                Direct questions we will answer live:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {MENTOR_QUESTIONS.map((q, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex items-start gap-3 text-xs sm:text-sm font-semibold text-stone-800 hover:border-stone-300 transition-all"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky-100 text-[#1B3F8B] text-xs font-mono font-bold">
                      Q
                    </span>
                    <span>{q}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            SECTION 7: WHO SHOULD ATTEND & ELIGIBILITY
           ───────────────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 border-b border-stone-300/80 bg-white">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-10 text-center">
            <div className="space-y-3 max-w-2xl mx-auto">
              <PremiumChip variant="gold" size="md">
                WHO IS THIS FOR?
              </PremiumChip>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-tight">
                DESIGNED FOR DEGREE HOLDERS & FINAL YEARS
              </h2>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto">
              {AUDIENCE_TAGS.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-stone-200 text-xs sm:text-sm font-semibold text-stone-800 hover:border-[#1B3F8B]/50 hover:text-[#1B3F8B] transition-all shadow-2xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            SECTION 8: WHAT YOU WILL WALK AWAY WITH
           ───────────────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 border-b border-stone-300/80 bg-[#FAF8F5]">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="text-center space-y-3">
              <PremiumChip variant="navy" size="md">
                YOUR TANGIBLE TAKEAWAYS
              </PremiumChip>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-tight">
                WHAT YOU WILL WALK AWAY WITH
              </h2>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8 space-y-3.5 shadow-xs">
              {WALK_AWAY_BENEFITS.map((b, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-stone-800">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{b}</span>
                </div>
              ))}
            </div>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={scrollToForm}
                className="inline-flex items-center gap-2 h-12 px-7 rounded-xl bg-[#1B3F8B] hover:bg-[#153270] text-white font-extrabold text-xs transition-all cursor-pointer shadow-lg shadow-[#1B3F8B]/20"
              >
                <span>Reserve My Free Seat</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            SECTION 9: THE RESEARCH METHODOLOGY (Credibility Anchor)
           ───────────────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 border-b border-stone-300/80 bg-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1A1A] tracking-tight">
              THE ARZON RESEARCH METHODOLOGY
            </h2>
            <p className="text-sm text-stone-700 max-w-2xl mx-auto leading-relaxed font-sans">
              Every quarter, Arzon research teams evaluate 300+ live job listings directly from
              corporate careers portals, LinkedIn Recruiter feeds, and CRO recruitment drives across
              India and global markets.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 text-left">
              {[
                { title: "300+ JDs", desc: "Live job postings parsed" },
                { title: "6 Tracks", desc: "PV, Coding, CRA, Writing, RA, Analytics" },
                { title: "14+ Enterprises", desc: "Pharma MNCs & top CROs" },
                { title: "Quarterly Index", desc: "Updated for market shifts" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-stone-50 border border-stone-200 shadow-2xs"
                >
                  <p className="text-sm font-bold text-[#1B3F8B]">{item.title}</p>
                  <p className="text-[11px] text-stone-500 mt-0.5">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            SECTION 10: FREQUENTLY ASKED QUESTIONS
           ───────────────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 border-b border-stone-300/80 bg-[#FAF8F5]">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="text-center space-y-3">
              <PremiumChip variant="navy" size="md">
                COMMON QUESTIONS
              </PremiumChip>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1A1A] tracking-tight">
                FREQUENTLY ASKED QUESTIONS
              </h2>
            </div>

            <div className="space-y-4">
              {FAQS.map((faq, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white border border-stone-200 space-y-2 shadow-2xs"
                >
                  <h3 className="text-sm font-bold text-[#1A1A1A] flex items-center gap-2">
                    <HelpCircle className="h-4 w-4 text-[#1B3F8B] shrink-0" />
                    <span>{faq.q}</span>
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed pl-6">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            SECTION 11: FINAL EVENT REGISTRATION BANNER
           ───────────────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-[#1B3F8B] text-xs font-mono font-bold">
              <span>ARZON HEALTHCARE CAREER REPORT · Q4 2026</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#1A1A1A] tracking-tight leading-tight">
              JOIN THE NEXT ARZON HEALTHCARE CAREER WORKSHOP
            </h2>

            <p className="text-sm sm:text-base text-stone-700 max-w-2xl mx-auto font-sans">
              300+ Job Descriptions Analyzed · 6 Career Tracks · Real Industry Mentors · Free Live
              Access
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={scrollToForm}
                className="h-13 px-8 rounded-xl bg-[#1B3F8B] hover:bg-[#153270] text-white font-extrabold text-sm tracking-wide shadow-xl shadow-[#1B3F8B]/25 active:scale-[0.99] transition-all cursor-pointer inline-flex items-center justify-center gap-2"
              >
                <span>Reserve My Free Seat</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <p className="text-xs text-stone-500">
              No payment required · Free registration · Live interactive Q&A
            </p>
          </div>
        </section>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
