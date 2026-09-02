import { useState, useRef, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import arzonIcon from "@/assets/arzon-icon.webp";
import {
  Calendar,
  Clock,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Building2,
  ExternalLink,
  ChevronRight,
  Ticket,
  Sparkles,
  HelpCircle,
  FileText,
  Layers,
  ChevronDown,
  UserCheck,
  Award,
  Check,
  QrCode,
} from "lucide-react";
import { Footer } from "@/components/landing/Footer";
import { pageSeo } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/jsonLd";
import { SITE } from "@/components/landing/constants";
import { submitWorkshopLead } from "@/lib/workshop.functions";
import { track } from "@/lib/track";

export const Route = createFileRoute("/healthcare-career-workshop")({
  head: () => {
    const title = "Pharmacovigilance Industry Connect | Arzon Global";
    const description =
      "You studied Pharmacology. Now see how Pharmacovigilance actually works. An exclusive industry interaction with 20+ years of PV operations and leadership experience.";
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
            name: "Pharmacovigilance Industry Connect",
            description:
              "An industry interaction with experienced Pharmacovigilance professionals covering real PV workflows, ICSR operations, industry roles and the skills used in the field.",
            startDate: "2026-09-06T11:00:00+05:30",
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

const WHATSAPP_COMMUNITY_URL = "https://chat.whatsapp.com/Ltg8V4sGOgbK8kbgYMuaHz";

const EXPERIENCE_CARDS = [
  {
    num: "01",
    title: "INSIDE PHARMACOVIGILANCE",
    desc: "Understand how PV works in the real industry beyond academic definitions.",
  },
  {
    num: "02",
    title: "REAL PV WORKFLOWS",
    desc: "Explore ICSR processing, MedDRA, narratives, QC and safety operations.",
  },
  {
    num: "03",
    title: "INDUSTRY PERSPECTIVE",
    desc: "Understand how PV teams operate and what skills actually matter on day one.",
  },
  {
    num: "04",
    title: "DIRECT MENTOR INTERACTION",
    desc: "Ask questions directly to experienced professionals who led global teams.",
  },
  {
    num: "05",
    title: "CAREER EXPLORATION",
    desc: "Understand roles, responsibilities, career progression and industry opportunities.",
  },
];

const PV_WORKFLOW_STEPS = [
  {
    name: "SAFETY REPORT",
    detail: "Spontaneous report or clinical trial notification received from physician, patient, or literature.",
  },
  {
    name: "CASE RECEIPT",
    detail: "Initial logging into the central safety database and timestamp verification for regulatory clock calculation.",
  },
  {
    name: "TRIAGE",
    detail: "Verification of the 4 minimum validity criteria: identifiable patient, reporter, suspect drug, and adverse event.",
  },
  {
    name: "CASE PROCESSING",
    detail: "Entering medical history, indication, concomitant drugs, laboratory values, and dechallenge response.",
  },
  {
    name: "MEDDRA CODING",
    detail: "Mapping verbatim clinical events to Lowest Level Terms (LLTs) and primary System Organ Classes (SOCs).",
  },
  {
    name: "NARRATIVE",
    detail: "Formulating a chronological clinical case narrative adhering to ICH-E2D and Company Core Safety standards.",
  },
  {
    name: "QUALITY REVIEW",
    detail: "100% First-Time-Right verification of case accuracy and data completeness before physician sign-off.",
  },
  {
    name: "MEDICAL REVIEW",
    detail: "Causality assessment, listedness review, and determination of expedited regulatory reporting.",
  },
  {
    name: "REGULATORY PROCESS",
    detail: "Electronic E2B(R3) transmission to regulatory authorities (US FDA, EMA, MHRA) within 7 or 15 days.",
  },
];

const PV_ROLES = [
  {
    title: "ICSR PROCESSING",
    desc: "Reviewing incoming safety reports, performing triage, and inputting structured clinical data into enterprise safety databases.",
  },
  {
    title: "MEDDRA CODING",
    desc: "Translating verbatim medical descriptions from physician notes into standardized international dictionary codes.",
  },
  {
    title: "NARRATIVE WRITING",
    desc: "Drafting complete, chronological clinical safety summaries that withstand health authority audits.",
  },
  {
    title: "QUALITY REVIEW (QC)",
    desc: "Auditing case drafts to ensure 100% compliance with Good Pharmacovigilance Practices (GVP) and zero documentation defects.",
  },
  {
    title: "SAFETY OPERATIONS",
    desc: "Monitoring expedited submission clocks (7-day and 15-day SLAs) to prevent regulatory non-compliance.",
  },
  {
    title: "TEAM & CLIENT OPERATIONS",
    desc: "Coordinating cross-functional delivery teams, managing partner compliance, and presenting operational metrics to pharmaceutical sponsors.",
  },
];

const CAREER_TIMELINE = [
  {
    org: "Quintiles Technologies",
    role: "Senior Drug Safety Associate",
    focus: "Spontaneous case triage, manual coding, label review, and end-to-end case processing & QC.",
  },
  {
    org: "Indegene",
    role: "Analyst · Literature Surveillance",
    focus: "Screening PubMed and biomedical databases to identify serious and non-serious adverse events in published literature.",
  },
  {
    org: "Norwich Clinical Services",
    role: "Assistant Manager · PV Operations",
    focus: "Managing a team of 10 associates, overseeing case allocation, QC compliance, CAPA, and medical information contact center (MICC).",
  },
  {
    org: "Accenture",
    role: "Team Lead · Pharmacovigilance",
    focus: "Leading team of 15 associates, managing SLA/KPI adherence, health authority compliance, and operational training.",
  },
  {
    org: "Cognizant Technology Solutions",
    role: "Team Lead · Pharmacovigilance",
    focus: "Managing 30 associates and medics (case processors, QC reviewers, and medical reviewers for ICSRs); regulatory and partner compliance.",
  },
  {
    org: "Novaspire Biosciences",
    role: "Manager · Pharmacovigilance",
    focus: "Governing PV SOPs, regulatory audits and inspections, establishing literature search and ICSR systems, training junior staff.",
  },
];

const STUDENT_QUESTIONS = [
  "What does a PV fresher actually do?",
  "What skills matter in the first job?",
  "How important is MedDRA?",
  "What is ICSR processing really like?",
  "What does a typical PV workday look like?",
  "What do interviewers look for?",
  "How does someone progress in PV?",
  "What is changing because of AI?",
  "CRO or pharma?",
  "What should I learn before applying?",
];

const AUDIENCE_CARDS = [
  { degree: "B.PHARM", desc: "Graduates & final-year students looking to transition from academics into pharmaceutical clinical operations." },
  { degree: "M.PHARM", desc: "Postgraduates in Pharmacology, QA, or Regulatory seeking high-trajectory roles in QC, aggregate analysis, or safety." },
  { degree: "PHARM.D", desc: "Clinical pharmacy graduates exploring careers in adverse event causality assessment, narrative evaluation, and medical review." },
  { degree: "LIFE SCIENCES", desc: "Biotechnology, Biochemistry, and Microbiology graduates exploring entry-level clinical triage and medical documentation." },
];

function PharmacovigilanceIndustryConnectPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [qualification, setQualification] = useState("");
  const [gradYear, setGradYear] = useState("");
  const [mentorQuestion, setMentorQuestion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [activeWorkflowIdx, setActiveWorkflowIdx] = useState(2); // Default to Triage
  const [activeCaseTab, setActiveCaseTab] = useState<"validity" | "seriousness" | "missing" | "meddra" | "qc">("validity");

  const [showStickyBar, setShowStickyBar] = useState(false);

  const formRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const hasTrackedFormStart = useRef(false);

  useEffect(() => {
    track("page_view", {
      program_slug: "pv-industry-connect",
      props: { path: "/healthcare-career-workshop" },
    });

    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleFormFocus = () => {
    if (!hasTrackedFormStart.current) {
      hasTrackedFormStart.current = true;
      track("workshop_form_started", {
        program_slug: "pv-industry-connect",
      });
    }
  };

  const handleCaseTabClick = (tab: "validity" | "seriousness" | "missing" | "meddra" | "qc") => {
    setActiveCaseTab(tab);
    track("workshop_case_tab_click", {
      program_slug: "pv-industry-connect",
      props: { tab },
    });
  };

  const handleWorkflowClick = (idx: number) => {
    setActiveWorkflowIdx(idx);
    track("workshop_workflow_step_click", {
      program_slug: "pv-industry-connect",
      props: { step_index: idx + 1, step_name: PV_WORKFLOW_STEPS[idx]?.name },
    });
  };

  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => {
        nameInputRef.current?.focus();
      }, 400);
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
      setErrorMessage("Please select your qualification.");
      return;
    }
    if (!gradYear) {
      setErrorMessage("Please select your graduation year.");
      return;
    }

    setIsSubmitting(true);

    try {
      await submitWorkshopLead({
        data: {
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          degree: `${qualification} (${gradYear})${mentorQuestion ? ` | Q: ${mentorQuestion.trim()}` : ""}`,
          source: "pv-industry-connect",
          utmSource: "pv_connect_hero",
        },
      });
      setIsSuccess(true);
    } catch (err: any) {
      console.warn("Registration notice:", err);
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const passId = phone.length >= 4 ? `PV-${phone.slice(-4)}8` : "PV-94821";

  return (
    <div className="tone-light min-h-screen bg-[#FAF8F5] text-[#1A1A1A] font-sans antialiased">
      <Nav />

      <main className="relative z-10 pt-20 sm:pt-24">
        {/* ─────────────────────────────────────────────────────────────
            01 · HERO: MINIMAL, HIGH-AUTHORITY, PRODUCT-FIRST
           ───────────────────────────────────────────────────────────── */}
        <section className="border-b border-stone-200/90 bg-[#FAF8F5] py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
            {/* Header Badge */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-stone-300 bg-white px-4 py-1.5 shadow-2xs">
              <img src={arzonIcon} alt="Arzon Global" className="h-4 w-4 object-contain" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-stone-800">
                ARZON GLOBAL · PHARMACOVIGILANCE INDUSTRY CONNECT
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-4 max-w-3xl mx-auto">
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1A1A1A] leading-[1.12]">
                You studied Pharmacology. <br />
                <span className="italic text-[#1B3F8B]">Now see how Pharmacovigilance actually works.</span>
              </h1>
              <p className="text-base sm:text-lg text-stone-700 font-sans leading-relaxed max-w-2xl mx-auto">
                An industry interaction with experienced Pharmacovigilance professionals covering real PV workflows, ICSR operations, industry roles and the skills used in the field.
              </p>
            </div>

            {/* Credibility Anchors */}
            <div className="space-y-3 pt-2">
              <div className="inline-flex flex-wrap items-center justify-center gap-2 font-mono text-xs font-bold text-stone-900">
                <span className="rounded-md bg-stone-900 text-slate-50 px-2.5 py-1 uppercase tracking-wider">
                  20+ YEARS OF PHARMACOVIGILANCE EXPERIENCE
                </span>
                <span className="rounded-md bg-white border border-stone-300 text-stone-700 px-2.5 py-1">
                  Leadership Experience · Accenture · Cognizant
                </span>
              </div>

              {/* Event Telemetry */}
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs font-mono text-stone-600">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-[#1B3F8B]" />
                  <span>Sunday, 11:00 AM – 12:15 PM IST</span>
                </span>
                <span className="text-stone-300 hidden sm:inline">|</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-[#8A6D1F]" />
                  <span>Live Online · Interactive Session</span>
                </span>
                <span className="text-stone-300 hidden sm:inline">|</span>
                <span className="text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Complimentary Industry Pass
                </span>
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="pt-3">
              <button
                type="button"
                onClick={scrollToForm}
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-[#0B1325] hover:bg-[#1B3F8B] text-slate-50 font-bold text-xs tracking-wider uppercase transition-all shadow-md cursor-pointer hover:-translate-y-0.5"
              >
                <span>RESERVE MY INDUSTRY PASS</span>
                <ArrowRight className="h-4 w-4 text-slate-50" />
              </button>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            02 · MENTOR HERO CARD (THE REASON TO BELIEVE)
           ───────────────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 border-b border-stone-200 bg-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#8A6D1F]">
                FACULTY AUTHORITY
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
                Meet Industry Mentors With 20+ Years of Experience
              </h2>
            </div>

            <div className="rounded-3xl border border-stone-200 bg-[#FAF8F5] p-6 sm:p-10 space-y-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200/80 pb-6">
                <div>
                  <div className="inline-block font-mono text-[11px] font-bold uppercase tracking-wider text-[#1B3F8B] bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-md mb-2">
                    Industry Veteran &amp; Faculty Lead
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
                    Senior Pharmacovigilance Professional &amp; Industry Leader
                  </h3>
                  <p className="text-xs sm:text-sm font-mono text-stone-600 mt-1">
                    20+ Years Experience · Master of Pharmacy (M.Pharm)
                  </p>
                </div>
                <div className="shrink-0 text-left sm:text-right">
                  <span className="font-mono text-xs font-bold text-stone-500 uppercase block">CORE COMPETENCIES</span>
                  <span className="font-mono text-xs font-bold text-stone-800">
                    ICSR · PV Operations · Quality · Leadership
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-mono font-bold uppercase tracking-wider text-stone-500">
                  Experience across leading organizations including:
                </p>
                <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                  <span className="rounded-xl border border-stone-300 bg-white px-3.5 py-1.5 font-mono text-xs font-bold text-stone-900 shadow-2xs">
                    Accenture
                  </span>
                  <span className="rounded-xl border border-stone-300 bg-white px-3.5 py-1.5 font-mono text-xs font-bold text-stone-900 shadow-2xs">
                    Cognizant
                  </span>
                  <span className="rounded-xl border border-stone-300 bg-white px-3.5 py-1.5 font-mono text-xs font-bold text-stone-900 shadow-2xs">
                    Novaspire Biosciences
                  </span>
                  <span className="rounded-xl border border-stone-200 bg-stone-100 px-3 py-1 font-mono text-xs text-stone-700">
                    Quintiles
                  </span>
                  <span className="rounded-xl border border-stone-200 bg-stone-100 px-3 py-1 font-mono text-xs text-stone-700">
                    Indegene
                  </span>
                  <span className="rounded-xl border border-stone-200 bg-stone-100 px-3 py-1 font-mono text-xs text-stone-700">
                    Norwich Clinical Services
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
                <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-1.5">
                  <h4 className="font-bold text-stone-900 font-sans">Enterprise Operations &amp; Team Scale</h4>
                  <p>
                    Managed high-performing teams of 30+ associates, case processors, quality reviewers, and medical reviewers (MBBS medics) handling high-throughput global ICSR pipelines.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-1.5">
                  <h4 className="font-bold text-stone-900 font-sans">Regulatory &amp; Partner Compliance</h4>
                  <p>
                    Established PV SOPs, oversaw critical regulatory audits and inspections, managed adverse event literature search systems, and governed 7-day and 15-day expedited submission compliance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            03 · WHAT STUDENTS WILL EXPERIENCE (5 CARDS)
           ───────────────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 border-b border-stone-200 bg-[#FAF8F5]">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="space-y-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B]">
                SESSION STRUCTURE
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
                What You'll Experience
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {EXPERIENCE_CARDS.map((item, idx) => (
                <div
                  key={item.num}
                  className={`rounded-2xl border border-stone-200 bg-white p-5 space-y-2.5 shadow-2xs ${
                    idx === 0 ? "sm:col-span-2 lg:col-span-1" : ""
                  }`}
                >
                  <div className="flex items-center justify-between pb-1 border-b border-stone-100">
                    <span className="font-mono text-xs font-bold text-[#1B3F8B]">
                      {item.num}
                    </span>
                    <span className="font-mono text-[10px] text-stone-400 uppercase">EXPERIENCE</span>
                  </div>
                  <h3 className="font-bold text-xs sm:text-sm text-stone-900 font-mono uppercase tracking-wide">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-600 font-sans leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            04 · THE COMPLETE 9-STAGE PV WORKFLOW (INTERACTIVE)
           ───────────────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 border-b border-stone-200 bg-white">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#8A6D1F]">
                OPERATIONAL ARCHITECTURE
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
                From Safety Report to Regulatory Submission
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 font-sans">
                Click through the 9 stages below to inspect how a real case travels across enterprise departments.
              </p>
            </div>

            {/* Workflow Progression Stepper */}
            <div className="rounded-3xl border border-stone-200 bg-[#FAF8F5] p-5 sm:p-7 shadow-xs space-y-6">
              <div className="flex flex-wrap items-center justify-center gap-2">
                {PV_WORKFLOW_STEPS.map((step, idx) => (
                  <button
                    key={step.name}
                    type="button"
                    onClick={() => handleWorkflowClick(idx)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                      activeWorkflowIdx === idx
                        ? "bg-[#0B1325] text-slate-50 shadow-sm"
                        : "bg-white border border-stone-200 text-stone-700 hover:border-stone-400"
                    }`}
                  >
                    <span>{idx + 1}.</span>
                    <span>{step.name}</span>
                  </button>
                ))}
              </div>

              {/* Active Stage Inspector */}
              <div className="rounded-2xl border border-stone-300 bg-white p-5 sm:p-6 space-y-2 shadow-2xs">
                <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                  <span className="font-mono text-xs font-bold text-[#1B3F8B]">
                    STAGE 0{activeWorkflowIdx + 1} OF 09
                  </span>
                  <span className="font-mono text-[10px] uppercase text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                    Enterprise SOP
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1A1A1A]">
                  {PV_WORKFLOW_STEPS[activeWorkflowIdx].name}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
                  {PV_WORKFLOW_STEPS[activeWorkflowIdx].detail}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            05 · REAL CLINICAL CASE INTERACTION
           ───────────────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 border-b border-stone-200 bg-[#FAF8F5]">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="space-y-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-rose-700">
                CLINICAL EXERCISE
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
                Real Adverse Event Case Interaction
              </h2>
            </div>

            {/* Case Scenario Box */}
            <div className="rounded-3xl border-2 border-stone-800 bg-[#0B1325] text-slate-100 p-6 sm:p-8 space-y-4 shadow-lg">
              <div className="flex items-center justify-between text-xs font-mono border-b border-stone-800 pb-3 text-stone-400">
                <span>CASE SIMULATION · INTAKE TRANSCRIPT</span>
                <span className="text-amber-400 font-bold">DAY 1 TRIAGE SCENARIO</span>
              </div>
              <blockquote className="font-serif text-lg sm:text-xl italic text-slate-50 leading-relaxed">
                "A patient reports severe dizziness after starting a medicine and is subsequently hospitalized."
              </blockquote>
              <p className="font-mono text-xs font-bold text-amber-300 uppercase tracking-wider">
                What would you do next?
              </p>
            </div>

            {/* Interactive Question Tabs */}
            <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex flex-wrap gap-2 pb-2 border-b border-stone-200">
                <button
                  type="button"
                  onClick={() => handleCaseTabClick("validity")}
                  className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer ${
                    activeCaseTab === "validity"
                      ? "bg-[#1B3F8B] text-slate-50"
                      : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                  }`}
                >
                  Is this a valid ICSR?
                </button>
                <button
                  type="button"
                  onClick={() => handleCaseTabClick("seriousness")}
                  className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer ${
                    activeCaseTab === "seriousness"
                      ? "bg-[#1B3F8B] text-slate-50"
                      : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                  }`}
                >
                  Is the case serious?
                </button>
                <button
                  type="button"
                  onClick={() => handleCaseTabClick("missing")}
                  className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer ${
                    activeCaseTab === "missing"
                      ? "bg-[#1B3F8B] text-slate-50"
                      : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                  }`}
                >
                  What information is missing?
                </button>
                <button
                  type="button"
                  onClick={() => handleCaseTabClick("meddra")}
                  className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer ${
                    activeCaseTab === "meddra"
                      ? "bg-[#1B3F8B] text-slate-50"
                      : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                  }`}
                >
                  What needs to be coded?
                </button>
                <button
                  type="button"
                  onClick={() => handleCaseTabClick("qc")}
                  className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer ${
                    activeCaseTab === "qc"
                      ? "bg-[#1B3F8B] text-slate-50"
                      : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                  }`}
                >
                  What happens during QC?
                </button>
              </div>

              {/* Tab Answers */}
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200 text-xs sm:text-sm font-sans space-y-2">
                {activeCaseTab === "validity" && (
                  <>
                    <h4 className="font-bold text-stone-900">The 4 Minimum Criteria for ICSR Validity</h4>
                    <p className="text-stone-600 leading-relaxed">
                      To be valid under ICH-E2D guidelines, four elements must exist: <strong>(1) An identifiable patient</strong>, <strong>(2) An identifiable reporter</strong>, <strong>(3) At least one suspect drug</strong>, and <strong>(4) At least one adverse event</strong>. If any one is missing, the case is invalid and triggers an immediate follow-up query.
                    </p>
                  </>
                )}
                {activeCaseTab === "seriousness" && (
                  <>
                    <h4 className="font-bold text-stone-900">ICH-E2A Seriousness Assessment</h4>
                    <p className="text-stone-600 leading-relaxed">
                      <strong>Yes, serious.</strong> Inpatient hospitalization meets mandatory ICH seriousness criteria. This immediately triggers an expedited regulatory submission clock (15 calendar days from Day-0 receipt).
                    </p>
                  </>
                )}
                {activeCaseTab === "missing" && (
                  <>
                    <h4 className="font-bold text-stone-900">Crucial Follow-up Queries</h4>
                    <p className="text-stone-600 leading-relaxed">
                      Before closing the case: What was the exact dosage and lot number? What were the concomitant drugs? Did dechallenge occur (did dizziness resolve after stopping the drug)? Was there a medical history of hypotension?
                    </p>
                  </>
                )}
                {activeCaseTab === "meddra" && (
                  <>
                    <h4 className="font-bold text-stone-900">MedDRA 27.0 Hierarchy Mapping</h4>
                    <p className="text-stone-600 leading-relaxed">
                      The verbatim phrase <em>"severe dizziness"</em> maps to Lowest Level Term (LLT) <code>Severe dizziness [10013589]</code> under Preferred Term (PT) <code>Dizziness [10013573]</code> within the System Organ Class (SOC) <code>Nervous system disorders</code>.
                    </p>
                  </>
                )}
                {activeCaseTab === "qc" && (
                  <>
                    <h4 className="font-bold text-stone-900">Quality Review Verification</h4>
                    <p className="text-stone-600 leading-relaxed">
                      The Senior QC reviewer inspects source document alignment, confirms seriousness flagging, verifies that narrative dates are chronological, and signs off before forwarding to the Medical Safety Officer.
                    </p>
                  </>
                )}
              </div>

              <div className="pt-2 border-t border-stone-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-xs font-serif italic text-stone-700">
                  Explore the complete case with the industry mentor during Industry Connect.
                </p>
                <button
                  type="button"
                  onClick={scrollToForm}
                  className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#1B3F8B] hover:text-[#0B1325] underline cursor-pointer"
                >
                  <span>Reserve pass to attend live case discussion →</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            06 · WHAT DOES A PV PROFESSIONAL ACTUALLY DO? (ROLE CARDS)
           ───────────────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 border-b border-stone-200 bg-white">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="space-y-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B]">
                ROLE ARCHITECTURE
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
                What Does a Pharmacovigilance Professional Actually Do?
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {PV_ROLES.map((role) => (
                <div
                  key={role.title}
                  className="rounded-2xl border border-stone-200 bg-[#FAF8F5] p-5 space-y-2 shadow-2xs"
                >
                  <h3 className="font-mono text-xs font-bold text-stone-900 uppercase tracking-wide">
                    {role.title}
                  </h3>
                  <p className="text-xs text-stone-600 font-sans leading-relaxed">
                    {role.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            07 · CAREER PROGRESSION
           ───────────────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 border-b border-stone-200 bg-[#FAF8F5]">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="space-y-2 text-center sm:text-left">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#8A6D1F]">
                CAREER TRAJECTORY
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
                How Careers Evolve in Pharmacovigilance
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div className="rounded-2xl border border-stone-200 bg-white p-5 space-y-2 shadow-2xs">
                <span className="font-mono text-[10px] font-bold text-stone-400 uppercase">STEP 01</span>
                <h3 className="font-mono text-xs font-bold text-stone-900 uppercase">STUDENT</h3>
                <p className="text-xs text-stone-600 font-sans">
                  B.Pharm · M.Pharm · Pharm.D · Life Sciences
                </p>
              </div>

              <div className="rounded-2xl border border-stone-200 bg-white p-5 space-y-2 shadow-2xs">
                <span className="font-mono text-[10px] font-bold text-[#1B3F8B] uppercase">STEP 02</span>
                <h3 className="font-mono text-xs font-bold text-stone-900 uppercase">ENTRY LEVEL</h3>
                <p className="text-xs text-stone-600 font-sans">
                  PV Associate · Case Processing · ICSR Operations
                </p>
              </div>

              <div className="rounded-2xl border border-stone-200 bg-white p-5 space-y-2 shadow-2xs">
                <span className="font-mono text-[10px] font-bold text-emerald-700 uppercase">STEP 03</span>
                <h3 className="font-mono text-xs font-bold text-stone-900 uppercase">EXPERIENCED</h3>
                <p className="text-xs text-stone-600 font-sans">
                  Senior Associate · QC Reviewer · Aggregate Specialist
                </p>
              </div>

              <div className="rounded-2xl border border-stone-200 bg-white p-5 space-y-2 shadow-2xs">
                <span className="font-mono text-[10px] font-bold text-[#8A6D1F] uppercase">STEP 04</span>
                <h3 className="font-mono text-xs font-bold text-stone-900 uppercase">LEADERSHIP</h3>
                <p className="text-xs text-stone-600 font-sans">
                  Team Lead · PV Manager · Operations Leadership
                </p>
              </div>
            </div>

            <p className="text-[11px] font-mono text-stone-500 text-center sm:text-left">
              * Career progression varies by organization, role, individual performance, and industry experience.
            </p>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            08 · MENTOR CAREER TIMELINE (AUTHENTIC VERIFIED HISTORY)
           ───────────────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 border-b border-stone-200 bg-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="space-y-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B]">
                AUTHENTIC TIMELINE
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
                The Mentor's Verified Experience Timeline
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 font-sans">
                A 20-year career built across global CROs, life sciences consultancies, and pharmaceutical enterprises.
              </p>
            </div>

            <div className="space-y-3 relative border-l-2 border-stone-200 pl-4 sm:pl-6 ml-2 sm:ml-4">
              {CAREER_TIMELINE.map((item, idx) => (
                <div key={item.org} className="space-y-1 relative">
                  <div className="absolute -left-[23px] sm:-left-[31px] top-1.5 h-3 w-3 rounded-full bg-[#1B3F8B] ring-4 ring-white" />
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-serif text-base font-bold text-[#1A1A1A]">
                      {item.org}
                    </h3>
                    <span className="text-stone-300">·</span>
                    <span className="font-mono text-xs font-bold text-[#8A6D1F]">
                      {item.role}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 font-sans leading-relaxed">
                    {item.focus}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            09 · QUESTIONS STUDENTS CAN BRING
           ───────────────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 border-b border-stone-200 bg-[#FAF8F5]">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="space-y-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-stone-500">
                UNFILTERED ACCESS
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
                Questions Students Can Bring to the Mentor
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {STUDENT_QUESTIONS.map((q, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-stone-200 bg-white p-4 flex items-center gap-3 shadow-2xs"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-stone-100 text-stone-700 font-mono text-xs font-bold">
                    ?
                  </span>
                  <span className="font-sans text-xs sm:text-sm font-semibold text-stone-800">
                    {q}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={scrollToForm}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1B3F8B] hover:bg-[#153270] text-slate-50 font-bold text-xs tracking-wide transition-all shadow-md cursor-pointer"
              >
                <span>Ask Your Question in Sunday's Session</span>
                <ArrowRight className="h-4 w-4 text-slate-50" />
              </button>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            10 · WHO SHOULD ATTEND
           ───────────────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 border-b border-stone-200 bg-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="space-y-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B]">
                ACADEMIC ELIGIBILITY
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
                Who Should Attend?
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 font-sans">
                Students, fresh graduates and early-career professionals exploring Pharmacovigilance.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {AUDIENCE_CARDS.map((item) => (
                <div
                  key={item.degree}
                  className="rounded-2xl border border-stone-200 bg-[#FAF8F5] p-5 space-y-2 shadow-2xs"
                >
                  <h3 className="font-mono text-sm font-bold text-stone-900">
                    {item.degree}
                  </h3>
                  <p className="text-xs text-stone-600 font-sans leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            11 · REGISTRATION: DYNAMIC VIP PASS GENERATOR & FORM
           ───────────────────────────────────────────────────────────── */}
        <section
          ref={formRef}
          id="pass-reservation"
          className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-stone-200"
        >
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#8A6D1F]">
                RESERVE YOUR INDUSTRY PASS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
                Pharmacovigilance Industry Connect
              </h2>
              <p className="font-mono text-xs text-stone-600">
                Live Online · Sunday, 11:00 AM IST · Limited Live Registrations
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Real-Time Dynamic Industry Pass */}
              <div className="lg:col-span-5 space-y-3">
                <div className="rounded-3xl border border-stone-800 bg-gradient-to-br from-[#0B1325] via-[#101C38] to-[#0B1325] p-6 text-slate-100 shadow-xl space-y-4 relative overflow-hidden">
                  <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                    <div className="flex items-center gap-2">
                      <img src={arzonIcon} alt="Arzon" className="h-4 w-4 object-contain" />
                      <span className="font-mono text-[11px] font-black tracking-widest uppercase text-slate-100">
                        ARZON GLOBAL
                      </span>
                    </div>
                    <span className="font-mono text-[9px] text-amber-400 bg-amber-950/60 border border-amber-800 px-2 py-0.5 rounded">
                      INDUSTRY PASS
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="font-mono text-[9px] text-stone-400 uppercase tracking-wider">
                      INTERACTION TITLE
                    </span>
                    <h4 className="font-serif text-sm font-bold text-slate-50 uppercase tracking-wide">
                      Pharmacovigilance Industry Connect
                    </h4>
                  </div>

                  <div className="space-y-1 pt-1 border-t border-stone-800/80">
                    <span className="font-mono text-[9px] text-stone-400 uppercase tracking-wider">
                      ATTENDEE
                    </span>
                    <p className="font-mono text-sm font-bold tracking-wide text-amber-300 uppercase truncate">
                      {name.trim() ? name.trim() : "RESERVED ATTENDEE"}
                    </p>
                    <p className="font-mono text-[11px] text-stone-300 truncate">
                      {qualification ? `${qualification}${gradYear ? ` · Class of ${gradYear}` : ""}` : "Academic Candidate"}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[10.5px] font-mono pt-2 border-t border-stone-800/80">
                    <div>
                      <span className="text-stone-400 block text-[9px]">PASS ID</span>
                      <span className="text-slate-100 font-bold">{passId}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[9px]">DATE &amp; TIME</span>
                      <span className="text-slate-100">Sunday · 11:00 AM</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-stone-800/80 flex items-center justify-between text-[10px] font-mono text-stone-400">
                    <span>LIVE ON ZOOM</span>
                    <span className="text-emerald-400 font-bold">100% FREE PASS</span>
                  </div>
                </div>

                <p className="text-[11px] font-mono text-stone-500 text-center">
                  Official pass details will be dispatched to your WhatsApp upon submission.
                </p>
              </div>

              {/* Right Column: Registration Form Card */}
              <div className="lg:col-span-7">
                <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 shadow-sm">
                  {isSuccess ? (
                    <div className="space-y-5 text-center py-4">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 ring-4 ring-emerald-50">
                        <CheckCircle2 className="h-6 w-6" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-serif text-2xl font-bold text-[#1A1A1A]">
                          Your Industry Pass is Reserved
                        </h3>
                        <p className="text-xs sm:text-sm text-stone-600 font-sans">
                          We have reserved your seat for the live session. Pass ID: <strong className="font-mono text-stone-900">{passId}</strong>.
                        </p>
                      </div>

                      <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4 space-y-2 text-left text-xs font-mono">
                        <div className="flex justify-between border-b border-stone-200 pb-1.5">
                          <span className="text-stone-500">ATTENDEE</span>
                          <span className="font-bold text-stone-900 uppercase">{name}</span>
                        </div>
                        <div className="flex justify-between border-b border-stone-200 pb-1.5">
                          <span className="text-stone-500">SESSION</span>
                          <span className="text-stone-800">Sunday · 11:00 AM – 12:15 PM IST</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-stone-500">FORMAT</span>
                          <span className="text-emerald-800 font-bold">Direct Zoom Interactive Link</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                        <a
                          href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Pharmacovigilance+Industry+Connect+(Arzon)&details=Live+interaction+with+20%2B+year+PV+veterans.+Link:+https://arzoncareers.in/healthcare-career-workshop"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => {
                            track("workshop_calendar_click", {
                              program_slug: "pv-industry-connect",
                            });
                          }}
                          className="px-3 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs font-mono transition-all flex items-center justify-center gap-1.5 border border-stone-300"
                        >
                          <Calendar className="h-3.5 w-3.5 text-[#1B3F8B]" />
                          <span>Add to Calendar</span>
                        </a>

                        <a
                          href={WHATSAPP_COMMUNITY_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => {
                            track("whatsapp_click", {
                              program_slug: "pv-industry-connect",
                              props: { source: "workshop_confirmed_pass" },
                            });
                          }}
                          className="px-3 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-slate-50 font-bold text-xs font-mono transition-all flex items-center justify-center gap-1.5 shadow-sm"
                        >
                          <span>Join WhatsApp Channel</span>
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-3.5">
                      <div className="border-b border-stone-100 pb-2 flex items-center justify-between">
                        <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-stone-800">
                          RESERVE YOUR INDUSTRY PASS
                        </h3>
                        <span className="font-mono text-[10px] text-emerald-800 font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                          100% Free
                        </span>
                      </div>

                      {errorMessage && (
                        <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium">
                          {errorMessage}
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
                          onFocus={handleFormFocus}
                          onChange={(e) => {
                            handleFormFocus();
                            setName(e.target.value);
                          }}
                          placeholder="e.g. Priya Sharma"
                          className="w-full h-10 px-3.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-xs placeholder:text-stone-400 focus:bg-white focus:outline-none focus:border-[#1B3F8B] focus:ring-1 focus:ring-[#1B3F8B] transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-stone-800 mb-1 font-sans">
                          WhatsApp Number <span className="text-rose-500">*</span>
                        </label>
                        <div className="flex items-center">
                          <span className="h-10 px-3 inline-flex items-center rounded-l-xl bg-stone-100 border border-r-0 border-stone-300 text-stone-700 text-xs font-mono font-bold">
                            +91
                          </span>
                          <input
                            type="tel"
                            required
                            maxLength={10}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                            placeholder="98765 43210"
                            className="w-full h-10 px-3.5 rounded-r-xl bg-stone-50 border border-stone-300 text-stone-900 text-xs placeholder:text-stone-400 focus:bg-white focus:outline-none focus:border-[#1B3F8B] focus:ring-1 focus:ring-[#1B3F8B] transition-all"
                          />
                        </div>
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
                          placeholder="priya@example.com"
                          className="w-full h-10 px-3.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-xs placeholder:text-stone-400 focus:bg-white focus:outline-none focus:border-[#1B3F8B] focus:ring-1 focus:ring-[#1B3F8B] transition-all"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-stone-800 mb-1 font-sans">
                            Qualification <span className="text-rose-500">*</span>
                          </label>
                          <select
                            value={qualification}
                            onChange={(e) => setQualification(e.target.value)}
                            required
                            className="w-full h-10 px-3 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-xs focus:bg-white focus:outline-none focus:border-[#1B3F8B] focus:ring-1 focus:ring-[#1B3F8B] transition-all cursor-pointer"
                          >
                            <option value="">Select Degree</option>
                            <option value="B.Pharm">B.Pharm</option>
                            <option value="M.Pharm">M.Pharm</option>
                            <option value="Pharm.D">Pharm.D</option>
                            <option value="Life Sciences">Life Sciences (B.Sc/M.Sc)</option>
                            <option value="Other Clinical">Other Clinical</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-stone-800 mb-1 font-sans">
                            Graduation Year <span className="text-rose-500">*</span>
                          </label>
                          <select
                            value={gradYear}
                            onChange={(e) => setGradYear(e.target.value)}
                            required
                            className="w-full h-10 px-3 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-xs focus:bg-white focus:outline-none focus:border-[#1B3F8B] focus:ring-1 focus:ring-[#1B3F8B] transition-all cursor-pointer"
                          >
                            <option value="">Select Year</option>
                            <option value="2027">2027 (Pre-final)</option>
                            <option value="2026">2026 (Final Year)</option>
                            <option value="2025">2025 (Graduate)</option>
                            <option value="2024">2024 (Graduate)</option>
                            <option value="2023 or Earlier">2023 or Earlier</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-stone-800 mb-1 font-sans">
                          Question for the Mentor <span className="text-stone-400 font-normal">(Optional)</span>
                        </label>
                        <input
                          type="text"
                          value={mentorQuestion}
                          onChange={(e) => setMentorQuestion(e.target.value)}
                          placeholder="e.g. What skills matter most in the first 90 days?"
                          className="w-full h-10 px-3.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-xs placeholder:text-stone-400 focus:bg-white focus:outline-none focus:border-[#1B3F8B] focus:ring-1 focus:ring-[#1B3F8B] transition-all"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-11 inline-flex items-center justify-center gap-2 rounded-xl bg-[#0B1325] hover:bg-[#1B3F8B] text-slate-50 font-bold text-xs tracking-wider uppercase transition-all shadow-md cursor-pointer disabled:opacity-50 mt-1"
                      >
                        {isSubmitting ? (
                          <span>Reserving Pass…</span>
                        ) : (
                          <>
                            <span>RESERVE MY INDUSTRY PASS</span>
                            <ArrowRight className="h-4 w-4" />
                          </>
                        )}
                      </button>

                      <p className="text-[10px] text-stone-500 font-mono text-center pt-1">
                        Pass confirmation dispatched via WhatsApp &amp; Email.
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ─────────────────────────────────────────────────────────────
          12 · MOBILE STICKY QUICK-REGISTER BAR
         ───────────────────────────────────────────────────────────── */}
      {showStickyBar && !isSuccess && (
        <div
          className="fixed bottom-0 inset-x-0 z-50 border-t border-stone-300 bg-white/95 backdrop-blur-md shadow-2xl py-3 px-4 sm:hidden"
          style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-bold text-stone-900 truncate">
                PV Industry Connect
              </p>
              <p className="text-[10px] text-stone-500 font-mono">
                Sunday · 11:00 AM IST
              </p>
            </div>
            <button
              type="button"
              onClick={scrollToForm}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0B1325] text-slate-50 font-bold text-xs font-mono uppercase tracking-wider shadow-sm cursor-pointer shrink-0"
            >
              <span>Reserve Pass</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
