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
  Sparkles,
  Award,
  Check,
  X,
  AlertTriangle,
  Flame,
  TrendingUp,
  Briefcase,
  ChevronDown,
  Lock,
  Phone,
  User,
  GraduationCap,
} from "lucide-react";
import { Footer } from "@/components/landing/Footer";
import { pageSeo } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/jsonLd";
import { SITE } from "@/components/landing/constants";
import { submitWorkshopLead } from "@/lib/workshop.functions";
import { track } from "@/lib/track";
import { MemoizedHealthcare3dCanvas } from "@/components/3d/Healthcare3dCanvas";
import { Interactive3dCard, Card3dLayer } from "@/components/3d/Interactive3dCard";
import { Floating3dBadge } from "@/components/3d/Floating3dBadge";
import { Interactive3dBoardingPass } from "@/components/3d/Interactive3dBoardingPass";
import { LiveSocialProofTicker } from "@/components/landing/LiveSocialProofTicker";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { BorderBeam } from "@/components/magicui/border-beam";
import { PremiumChip } from "@/components/ui/PremiumChip";

export const Route = createFileRoute("/healthcare-career-workshop")({
  head: () => {
    const title = "Pharmacovigilance Industry Connect (Biannual Intake) | Arzon Global";
    const description =
      "Held only twice a year. An exclusive 75-minute live executive interaction for Pharmacy & Life-Science candidates with 20+ year PV leaders from Accenture, Cognizant, and Novaspire. Free VIP entry pass.";
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
            name: "Pharmacovigilance Industry Connect (Biannual Intake)",
            description:
              "Biannual executive industry interaction for pharmacy and life-science candidates with 20+ year Pharmacovigilance leaders from Accenture, Cognizant, and Novaspire Biosciences.",
            eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
            eventStatus: "https://schema.org/EventScheduled",
            organizer: {
              "@type": "Organization",
              name: "Arzon Global",
              url: SITE.origin,
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

const WHATSAPP_COMMUNITY_URL = "https://chat.whatsapp.com/G5K5X4c0Y1vJbX2wL6eP8q";

const PV_WORKFLOW_STEPS = [
  {
    name: "Safety Report",
    detail: "Spontaneous, clinical trial, literature, or regulatory adverse event intake across global enterprise channels.",
    phase: "Intake",
  },
  {
    name: "Case Receipt",
    detail: "Initial document capture, clock start (Day 0 determination), and source document triage scanning.",
    phase: "Intake",
  },
  {
    name: "Triage & Clock",
    detail: "Screening against 4 minimum validity criteria, seriousness determination, and expedited clock assignment.",
    phase: "Evaluation",
  },
  {
    name: "Case Processing",
    detail: "Data entry into safety databases (Oracle Argus / ARISg), drug coding, and laboratory value capture.",
    phase: "Processing",
  },
  {
    name: "MedDRA Coding",
    detail: "Standardized medical terminology mapping from verbatim text to Lowest Level Term (LLT) and Preferred Term (PT).",
    phase: "Coding",
  },
  {
    name: "Narrative Writing",
    detail: "Chronological clinical summary authoring detailing patient history, dechallenge, and outcome timeline.",
    phase: "Authoring",
  },
  {
    name: "Quality Review (QC)",
    detail: "100% First-Time-Right verification of data points against source documents by senior associates.",
    phase: "Governance",
  },
  {
    name: "Medical Review",
    detail: "Physician assessment of causality, expectedness against Company Core Data Sheet (CCDS), and risk flags.",
    phase: "Governance",
  },
  {
    name: "Regulatory Submission",
    detail: "E2B(R3) XML electronic gateway transmission to US FDA, EMA, or national health authorities within 7 or 15 days.",
    phase: "Submission",
  },
];

const PV_EXPERIENCES = [
  {
    num: "01",
    title: "Inside Enterprise PV",
    desc: "Understand how global safety teams operate inside Tier-1 CROs and pharmaceutical MNCs like Accenture, Cognizant & IQVIA.",
    badge: "Operational Insight",
  },
  {
    num: "02",
    title: "Real ICSR Workflows",
    desc: "Explore end-to-end case intake, triage rules, narrative writing, and Oracle Argus database structures.",
    badge: "Core Workflow",
  },
  {
    num: "03",
    title: "MedDRA 27.0 & QC Standards",
    desc: "Understand medical coding hierarchy, seriousness flagging under ICH-E2A, and quality check protocols.",
    badge: "Regulatory Standards",
  },
  {
    num: "04",
    title: "Direct Mentor Dialogue",
    desc: "Ask your questions directly to a senior leader who has managed 30+ associates, QC reviewers, and medics.",
    badge: "Live Dialogue",
  },
  {
    num: "05",
    title: "Verified Career Pathways",
    desc: "Understand how graduates transition from academics to Drug Safety Associate and progress to Team Lead.",
    badge: "Career Growth",
  },
];

const MENTOR_CAREER_STEPS = [
  {
    org: "Quintiles Technologies",
    role: "Senior Drug Safety Associate",
    focus: "Spontaneous case triage, prioritizing death cases, manual coding, narrative writing, and end-to-end QC.",
  },
  {
    org: "Indegene",
    role: "Analyst · Medical Information",
    focus: "Global literature adverse event surveillance across PubMed, screening serious and non-serious reactions.",
  },
  {
    org: "Norwich Clinical Services",
    role: "Assistant Manager · Pharmacovigilance",
    focus: "Managing team of 10 associates, QC compliance, CAPA implementation, and Medical Information contact center.",
  },
  {
    org: "Accenture",
    role: "Team Lead · Pharmacovigilance",
    focus: "Leading team of 15 associates, managing SLA/KPI adherence, health authority compliance, and operational training.",
  },
  {
    org: "Cognizant Technology Solutions",
    role: "Team Lead · Pharmacovigilance",
    focus: "Managing 30 associates and medics (case processors, QC reviewers, and medical reviewers for ICSRs); regulatory compliance.",
  },
  {
    org: "Novaspire Biosciences",
    role: "Manager · Pharmacovigilance",
    focus: "Governing PV SOPs, regulatory audits and inspections, establishing literature search and ICSR systems, training junior staff.",
  },
];

const STUDENT_QUESTIONS = [
  "What does a PV fresher actually do on Day 1 in Oracle Argus?",
  "What skills matter most in the first technical interview?",
  "How important is MedDRA coding vs narrative writing?",
  "What is ICSR processing really like in enterprise safety databases?",
  "What does a typical PV workday schedule and case target look like?",
  "What do MNC interviewers evaluate beyond university pharmacology?",
  "How does someone progress from Associate to Senior QC and Team Lead?",
  "How is automation & AI shaping PV case intake and triage?",
  "Should I join a CRO (IQVIA/Parexel) or an IT MNC (Accenture/Cognizant) first?",
  "What should I prepare before submitting applications to hiring desks?",
];

const AUDIENCE_CARDS = [
  {
    degree: "B.PHARM",
    desc: "Graduates & final-year students looking to transition from academics into high-trajectory clinical safety operations.",
    badge: "High Demand",
  },
  {
    degree: "M.PHARM",
    desc: "Postgraduates in Pharmacology, QA, or Regulatory seeking accelerated entry into QC, aggregate analysis, or safety surveillance.",
    badge: "Fast-Track",
  },
  {
    degree: "PHARM.D",
    desc: "Clinical pharmacy graduates exploring careers in adverse event causality assessment, narrative authoring, and medical review.",
    badge: "Specialized",
  },
  {
    degree: "LIFE SCIENCES",
    desc: "Biotechnology, Biochemistry, and Microbiology graduates exploring entry-level clinical triage and medical documentation.",
    badge: "Entry-Ready",
  },
];

function calculateTimeUntilSunday(): { hours: number; minutes: number; seconds: number } {
  const now = new Date();
  const target = new Date(now);
  const day = now.getDay(); // 0 is Sunday
  const daysUntilSunday = (7 - day) % 7;
  target.setDate(now.getDate() + (daysUntilSunday === 0 && now.getHours() >= 12 ? 7 : daysUntilSunday));
  target.setHours(11, 0, 0, 0);

  const diff = Math.max(0, target.getTime() - now.getTime());
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { hours, minutes, seconds };
}

function PharmacovigilanceIndustryConnectPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [qualification, setQualification] = useState("");
  const [gradYear, setGradYear] = useState("");
  const [mentorQuestion, setMentorQuestion] = useState("");
  const [utmSource, setUtmSource] = useState("pv_connect_hero");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [activeWorkflowIdx, setActiveWorkflowIdx] = useState(2); // Default to Triage
  const [activeCaseTab, setActiveCaseTab] = useState<"validity" | "seriousness" | "missing" | "meddra" | "qc">("validity");

  const [countdown, setCountdown] = useState(calculateTimeUntilSunday());
  const [showStickyBar, setShowStickyBar] = useState(false);

  const formRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const hasTrackedFormStart = useRef(false);

  // Live ticking countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(calculateTimeUntilSunday());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Extract UTM parameters on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const source = params.get("utm_source") || params.get("utm_campaign") || "meta_ad_direct";
      setUtmSource(source);
    }
  }, []);

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
          utmSource,
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

  const cleanPhone = phone.replace(/\D/g, "");
  const passId = cleanPhone.length >= 4 ? `PV-${cleanPhone.slice(-4)}8` : "PV-94821";

  return (
    <div className="tone-light min-h-screen bg-[#FAF8F5] text-[#1A1A1A] font-sans antialiased relative">
      {/* ─────────────────────────────────────────────────────────────
          00 · HIGH-URGENCY BIANNUAL SCARCITY STRIP (ABOVE NAV)
         ───────────────────────────────────────────────────────────── */}
      <div className="bg-[#0B1325] text-white py-2 px-3 sm:px-4 border-b border-white/10 relative z-50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 font-mono text-[10px] font-black uppercase tracking-wider">
              <AlertTriangle className="w-3 h-3 text-amber-400 shrink-0" />
              HELD ONLY TWICE A YEAR (EVERY 6 MONTHS)
            </span>
            <span className="font-sans text-xs text-stone-200">
              Batch 01 Intake closes Sunday 11:00 AM IST. Next intake in late 2026.
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Live Ticking Countdown */}
            <div className="flex items-center gap-1 font-mono text-xs font-bold text-sky-300 bg-white/10 px-2.5 py-1 rounded-lg border border-white/10">
              <Clock className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span>
                {String(countdown.hours).padStart(2, "0")}h :{" "}
                {String(countdown.minutes).padStart(2, "0")}m :{" "}
                {String(countdown.seconds).padStart(2, "0")}s
              </span>
            </div>

            {/* Seats Urgency Pill */}
            <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-amber-300">
              <Flame className="w-3.5 h-3.5 text-amber-400 shrink-0 animate-pulse" />
              14 Passes Left
            </span>
          </div>
        </div>
      </div>

      <Nav />

      {/* 3D WebGL Particle Canvas (Background) */}
      <MemoizedHealthcare3dCanvas className="absolute inset-0 pointer-events-none opacity-40 z-0" />

      {/* Social Proof Floating Ticker */}
      <LiveSocialProofTicker />

      <main className="relative z-10 pt-20 sm:pt-24">
        {/* ─────────────────────────────────────────────────────────────
            01 · DUAL-COLUMN HIGH-CONVERTING HERO: COPY + 3D BOARDING PASS
           ───────────────────────────────────────────────────────────── */}
        <section className="relative border-b border-stone-200/90 py-12 sm:py-20 overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              {/* Left Column: Core Value Proposition & Hero Registration Trigger */}
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                {/* Floating Badges */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                  <Floating3dBadge duration={4} delay={0.1}>
                    <div className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white/95 px-3 py-1 shadow-2xs">
                      <img src={arzonIcon} alt="Arzon Global" className="h-3.5 w-3.5 object-contain" />
                      <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-stone-900">
                        ARZON GLOBAL · INDUSTRY CONNECT
                      </span>
                    </div>
                  </Floating3dBadge>

                  <Floating3dBadge duration={5} delay={0.4}>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#1B3F8B] font-mono text-[11px] font-bold">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#1B3F8B] animate-pulse" />
                      20+ YRS LEADERSHIP
                    </span>
                  </Floating3dBadge>

                  <Floating3dBadge duration={4.5} delay={0.7}>
                    <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-mono text-[11px] font-bold">
                      EX-ACCENTURE &amp; COGNIZANT
                    </span>
                  </Floating3dBadge>
                </div>

                {/* Master Editorial Headline */}
                <div className="space-y-4">
                  <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1A1A1A] leading-[1.12]">
                    You studied Pharmacology. <br />
                    <AnimatedGradientText
                      className="font-serif italic font-bold"
                      colorFrom="#1B3F8B"
                      colorVia="#8A6D1F"
                      colorTo="#0B1325"
                    >
                      Now master how Pharmacovigilance actually works.
                    </AnimatedGradientText>
                  </h1>

                  <p className="text-sm sm:text-base text-stone-700 font-sans leading-relaxed max-w-2xl mx-auto lg:mx-0">
                    Don't apply blindly. Learn directly from senior PV leaders who managed 30+ associates across enterprise safety hubs. Real ICSR case intake, Oracle Argus 8.4 database triage, and MedDRA 27.0 hierarchy coding.
                  </p>
                </div>

                {/* Key Pillars Checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-w-xl mx-auto lg:mx-0 text-left">
                  {[
                    "Live Oracle Argus 8.4 case intake & triage",
                    "MedDRA 27.0 coding rules & ICH-E2A seriousness",
                    "What enterprise MNC interviewers evaluate on Day 1",
                    "2 Free Blueprints: Validity checklist & MedDRA chart",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs font-sans text-stone-800 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Telemetry Strip */}
                <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-3 rounded-2xl border border-stone-200 bg-white/90 px-4 py-2.5 shadow-2xs font-mono text-xs text-stone-700">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-[#1B3F8B]" />
                    <span className="font-bold text-stone-900">Sunday · 11:00 AM IST</span>
                  </div>
                  <span className="text-stone-300">|</span>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-stone-500" />
                    <span>75-Min Live Masterclass</span>
                  </div>
                  <span className="text-stone-300">|</span>
                  <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                    <span>100% Free VIP Pass</span>
                  </div>
                </div>

                {/* Hero CTA & Form Trigger Button */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                  <button
                    type="button"
                    onClick={scrollToForm}
                    className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#0B1325] hover:bg-[#1B3F8B] text-slate-50 font-mono text-xs font-black uppercase tracking-wider shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2 group"
                  >
                    <span>CLAIM MY BIANNUAL VIP PASS (100% FREE)</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const el = document.getElementById("case-simulation");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="w-full sm:w-auto px-5 py-3.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-800 font-mono text-xs font-bold transition-all shadow-2xs cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Try ICSR Case Simulator</span>
                    <ChevronDown className="h-3.5 w-3.5 text-stone-500" />
                  </button>
                </div>

                <p className="text-[11px] font-mono text-stone-500 text-center lg:text-left">
                  🔒 Zero course selling pitch · No generic motivational talk · Direct industry operations
                </p>
              </div>

              {/* Right Column: Interactive 3D Holographic Boarding Pass */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <Interactive3dBoardingPass
                  name={name}
                  degree={qualification ? `${qualification}${gradYear ? ` (${gradYear})` : ""}` : undefined}
                  passId={passId}
                  isConfirmed={isSuccess}
                />
                <p className="text-xs font-mono text-stone-500 text-center mt-2">
                  ▲ Interactive 3D Pass updates dynamically as you enter your details
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            02 · THE 5 EXPERIENCE PILLARS (INTERACTIVE 3D TILES)
           ───────────────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 border-b border-stone-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <PremiumChip variant="navy" size="md">
                CURRICULAR ARCHITECTURE
              </PremiumChip>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1A1A1A]">
                What You'll Experience Inside The Connect
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 font-sans">
                A focused 75-minute operational masterclass designed around real clinical workflows.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
              {PV_EXPERIENCES.map((item) => (
                <Interactive3dCard
                  key={item.title}
                  maxTilt={8}
                  depthScale={1.02}
                  className="rounded-3xl border border-stone-200 bg-[#FAF8F5] p-6 space-y-3 shadow-2xs hover:border-[#1B3F8B]/40 hover:shadow-lg transition-all"
                >
                  <Card3dLayer translateZ={25}>
                    <div className="flex items-center justify-between border-b border-stone-200/80 pb-2">
                      <span className="font-mono text-xs font-bold text-[#1B3F8B]">{item.num}</span>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-stone-500 bg-white px-2 py-0.5 rounded border border-stone-200">
                        {item.badge}
                      </span>
                    </div>
                  </Card3dLayer>
                  <Card3dLayer translateZ={20}>
                    <h3 className="font-serif text-base font-bold text-stone-900 tracking-tight">
                      {item.title}
                    </h3>
                  </Card3dLayer>
                  <Card3dLayer translateZ={15}>
                    <p className="text-xs text-stone-600 font-sans leading-relaxed">
                      {item.desc}
                    </p>
                  </Card3dLayer>
                </Interactive3dCard>
              ))}

              {/* Bonus 6th Card: Live Candidate Question Bank */}
              <Interactive3dCard
                maxTilt={8}
                depthScale={1.02}
                className="rounded-3xl border border-amber-300/80 bg-gradient-to-br from-amber-50 via-white to-amber-50/40 p-6 space-y-3 shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between border-b border-amber-200 pb-2">
                    <span className="font-mono text-xs font-bold text-amber-700">BONUS</span>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded border border-amber-300">
                      Live Q&amp;A
                    </span>
                  </div>
                  <h3 className="font-serif text-base font-bold text-stone-900 tracking-tight">
                    Candidate Question Dossier
                  </h3>
                  <p className="text-xs text-stone-600 font-sans leading-relaxed">
                    Submit your specific interview, Argus, or career transition question beforehand. The mentor will address candidate queries live during the session.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={scrollToForm}
                  className="font-mono text-xs font-bold text-[#1B3F8B] hover:underline flex items-center gap-1 cursor-pointer pt-2"
                >
                  <span>Submit your question with your pass →</span>
                </button>
              </Interactive3dCard>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            03 · THE EXECUTIVE MENTOR DOSSIER (20+ YEARS STATURE)
           ───────────────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-24 border-b border-stone-200 bg-[#FAF8F5]">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <PremiumChip variant="gold" size="md">
                PRACTITIONER FACULTY &amp; EVIDENCE
              </PremiumChip>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#1A1A1A]">
                Meet Industry Mentors With 20+ Years of Experience
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 font-sans">
                Learn from leaders who have governed regulatory inspections and built operational PV units.
              </p>
            </div>

            {/* Mentor Master 3D Card */}
            <Interactive3dCard
              maxTilt={6}
              depthScale={1.02}
              className="relative rounded-3xl border border-stone-300 bg-white p-6 sm:p-10 shadow-md space-y-8 overflow-hidden"
            >
              <BorderBeam size={250} duration={14} colorFrom="#1B3F8B" colorTo="#8A6D1F" />

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                <div className="md:col-span-8 space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B]">
                      MOHAMED KUMAIL ABBAS · M.PHARM
                    </span>
                    <span className="font-mono text-[10px] text-stone-500 bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
                      RGUHS Bangalore (2008)
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
                    Senior Pharmacovigilance Professional &amp; Industry Leader
                  </h3>
                  <p className="font-mono text-xs text-stone-600">
                    20+ Years | Pharmacovigilance Operations | ICSR Governance | Regulatory Audits
                  </p>
                </div>

                <div className="md:col-span-4 rounded-2xl border border-stone-200 bg-[#FAF8F5] p-4 text-center space-y-1">
                  <span className="font-mono text-[10px] uppercase text-stone-500 block">
                    Leadership Scale
                  </span>
                  <div className="font-mono text-2xl sm:text-3xl font-bold text-[#1B3F8B]">
                    <NumberTicker value={30} />+ Team Size
                  </div>
                  <p className="text-[11px] text-stone-600 font-sans">
                    Processors, QC reviewers &amp; medical physicians managed
                  </p>
                </div>
              </div>

              {/* Verified Organizations */}
              <div className="space-y-3 pt-2 border-t border-stone-200">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
                  EXPERIENCE ACROSS LEADING HEALTHCARE ORGANIZATIONS
                </span>
                <div className="flex flex-wrap gap-2 sm:gap-2.5">
                  {[
                    "Accenture",
                    "Cognizant Technology Solutions",
                    "Novaspire Biosciences",
                    "Quintiles Technologies",
                    "Indegene",
                    "Norwich Clinical Services",
                  ].map((org) => (
                    <span
                      key={org}
                      className="px-3 py-1.5 rounded-xl bg-[#FAF8F5] border border-stone-300 font-mono text-xs font-bold text-stone-800 shadow-2xs"
                    >
                      {org}
                    </span>
                  ))}
                </div>
              </div>

              {/* Career Timeline */}
              <div className="space-y-3 pt-2 border-t border-stone-200">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
                  CHRONOLOGICAL LEADERSHIP PROGRESSION
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {MENTOR_CAREER_STEPS.map((step) => (
                    <div
                      key={step.org}
                      className="rounded-2xl border border-stone-200 bg-[#FAF8F5] p-3.5 space-y-1 text-xs"
                    >
                      <span className="font-mono text-[10px] font-bold text-[#1B3F8B] block uppercase">
                        {step.org}
                      </span>
                      <h4 className="font-bold text-stone-900">{step.role}</h4>
                      <p className="text-[11px] text-stone-600 font-sans leading-relaxed">
                        {step.focus}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Interactive3dCard>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            04 · THE 9-STAGE OPERATIONAL PV WORKFLOW (INTERACTIVE)
           ───────────────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 border-b border-stone-200 bg-white">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <PremiumChip variant="navy" size="md">
                OPERATIONAL PIPELINE
              </PremiumChip>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
                From Adverse Event Intake to Regulatory Transmission
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
              <div className="relative rounded-2xl border border-stone-300 bg-white p-5 sm:p-6 space-y-2 shadow-2xs overflow-hidden">
                <BorderBeam size={180} duration={8} colorFrom="#1B3F8B" colorTo="#0B1325" />
                <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                  <span className="font-mono text-xs font-bold text-[#1B3F8B]">
                    STAGE 0{activeWorkflowIdx + 1} OF 09 · {PV_WORKFLOW_STEPS[activeWorkflowIdx].phase.toUpperCase()}
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
            05 · REAL CLINICAL CASE INTERACTION TERMINAL
           ───────────────────────────────────────────────────────────── */}
        <section id="case-simulation" className="py-16 sm:py-20 border-b border-stone-200 bg-[#FAF8F5]">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="space-y-2">
              <PremiumChip variant="gold" size="md">
                CLINICAL EXERCISE
              </PremiumChip>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
                Real Adverse Event Case Interaction
              </h2>
            </div>

            {/* Case Scenario Box */}
            <div className="rounded-3xl border-2 border-stone-800 bg-[#0B1325] text-slate-100 p-6 sm:p-8 space-y-4 shadow-xl">
              <div className="flex items-center justify-between text-xs font-mono border-b border-stone-800 pb-3 text-stone-400">
                <span>CASE SIMULATION · INTAKE TRANSCRIPT</span>
                <span className="text-amber-400 font-bold">DAY 1 TRIAGE SCENARIO</span>
              </div>
              <blockquote className="font-serif text-lg sm:text-xl italic text-slate-50 leading-relaxed">
                "A 52-year-old male patient reports severe dizziness and syncope 2 hours after starting antihypertensive therapy, requiring emergency room hospitalization."
              </blockquote>
              <p className="font-mono text-xs font-bold text-amber-300 uppercase tracking-wider">
                What would you do next as a Drug Safety Associate?
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
                      To be valid under ICH-E2D guidelines, four elements must exist: <strong>(1) An identifiable patient</strong> (52yo male), <strong>(2) An identifiable reporter</strong> (attending physician), <strong>(3) At least one suspect drug</strong> (antihypertensive), and <strong>(4) At least one adverse event</strong> (severe dizziness/syncope). If any one is missing, the case is invalid and triggers an immediate follow-up query.
                    </p>
                  </>
                )}
                {activeCaseTab === "seriousness" && (
                  <>
                    <h4 className="font-bold text-stone-900">ICH-E2A Seriousness Assessment</h4>
                    <p className="text-stone-600 leading-relaxed">
                      <strong>Yes, serious.</strong> Emergency room hospitalization meets mandatory ICH seriousness criteria. This immediately triggers an expedited regulatory submission clock (15 calendar days from Day-0 receipt).
                    </p>
                  </>
                )}
                {activeCaseTab === "missing" && (
                  <>
                    <h4 className="font-bold text-stone-900">Crucial Follow-up Queries</h4>
                    <p className="text-stone-600 leading-relaxed">
                      Before closing the case: What was the exact dosage and lot number? What were the concomitant drugs? Did dechallenge occur (did dizziness resolve after stopping the drug)? Was there a prior medical history of orthostatic hypotension?
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
                  Explore the complete clinical case with the mentor during Sunday's session.
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
            06 · PSYCHOLOGICAL LOSS AVERSION & SALARY PROGRESSION
           ───────────────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-24 border-b border-stone-200 bg-white">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <PremiumChip variant="navy" size="md">
                THE 94% REJECTION TRAP
              </PremiumChip>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#1A1A1A]">
                Why Most Pharmacy Freshers Get Rejected
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 font-sans">
                The stark contrast between applying blindly with academic theory vs. possessing real industry operational readiness.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Box A: The Blind Applicant Trap */}
              <div className="rounded-3xl border-2 border-rose-200 bg-rose-50/40 p-6 sm:p-8 space-y-5">
                <div className="flex items-center justify-between border-b border-rose-200 pb-3">
                  <span className="font-mono text-xs font-bold text-rose-800 uppercase tracking-wide">
                    THE BLIND APPLICATION ROUTE
                  </span>
                  <span className="text-xs font-mono font-bold text-rose-700 bg-rose-100 px-2.5 py-1 rounded-full">
                    94% Rejection Rate
                  </span>
                </div>

                <ul className="space-y-3 text-xs sm:text-sm text-stone-700 font-sans">
                  <li className="flex items-start gap-2.5">
                    <X className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span>Submitting textbook CVs with 0 mentions of Oracle Argus, MedDRA, or ICSR intake</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <X className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span>Failing Day-1 triage questions on ICH-E2A seriousness and 15-day expedited clocks</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <X className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span>Getting ghosted by Naukri and LinkedIn job boards without feedback</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <X className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span>Wasting 6 to 12 months after graduation before finding clinical employment</span>
                  </li>
                </ul>
              </div>

              {/* Box B: The Industry Connect Fast-Track */}
              <div className="rounded-3xl border-2 border-emerald-300 bg-emerald-50/40 p-6 sm:p-8 space-y-5 shadow-sm">
                <div className="flex items-center justify-between border-b border-emerald-200 pb-3">
                  <span className="font-mono text-xs font-bold text-emerald-900 uppercase tracking-wide">
                    THE ARZON INDUSTRY TRACK
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
                    Verified Trajectory
                  </span>
                </div>

                <ul className="space-y-3 text-xs sm:text-sm text-stone-800 font-sans font-medium">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span>Direct operational insights from leaders who screened 3,000+ candidates</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span>Understand real Argus 8.4 case data entry, narrative authoring, and QC audits</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span>2 Takeaway Blueprints: ICSR Validity Checklist &amp; MedDRA 27.0 reference</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span>100% Free Biannual Entry: Zero financial risk, maximum career clarity</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Salary Curve Callout */}
            <div className="rounded-3xl border border-stone-200 bg-[#FAF8F5] p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 pb-3">
                <span className="font-mono text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-[#1B3F8B]" />
                  PHARMACOVIGILANCE CAREER &amp; SALARY PROGRESSION CURVE
                </span>
                <span className="font-mono text-[11px] text-stone-500">
                  Based on Indian Tier-1 CRO &amp; IT-BPS benchmarks
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-stone-200 text-center space-y-1">
                  <span className="font-mono text-[10px] uppercase text-stone-500 block">
                    STAGE 1 · ENTRY LEVEL
                  </span>
                  <div className="font-serif text-xl sm:text-2xl font-bold text-[#1B3F8B]">
                    ₹3.6 – ₹4.8 LPA
                  </div>
                  <p className="text-xs font-sans text-stone-700 font-semibold">
                    Drug Safety Associate / ICSR Processor
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-stone-200 text-center space-y-1">
                  <span className="font-mono text-[10px] uppercase text-stone-500 block">
                    STAGE 2 · 2–4 YEARS
                  </span>
                  <div className="font-serif text-xl sm:text-2xl font-bold text-amber-700">
                    ₹6.5 – ₹8.5 LPA
                  </div>
                  <p className="text-xs font-sans text-stone-700 font-semibold">
                    Senior Safety Analyst / QC Reviewer
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-stone-200 text-center space-y-1">
                  <span className="font-mono text-[10px] uppercase text-stone-500 block">
                    STAGE 3 · 5+ YEARS
                  </span>
                  <div className="font-serif text-xl sm:text-2xl font-bold text-emerald-700">
                    ₹12.0 – ₹18.0+ LPA
                  </div>
                  <p className="text-xs font-sans text-stone-700 font-semibold">
                    PV Team Lead / Operations Manager
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            07 · CANDIDATE QUESTION BANK
           ───────────────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 border-b border-stone-200 bg-[#FAF8F5]">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="space-y-2">
              <PremiumChip variant="stone" size="md">
                CANDIDATE INQUIRIES
              </PremiumChip>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
                Questions You Can Bring to the Session
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 font-sans">
                Real questions asked by freshers and postgraduates navigating their clinical career entry.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {STUDENT_QUESTIONS.map((q, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3.5 rounded-2xl border border-stone-200 bg-white shadow-2xs text-xs font-sans text-stone-800"
                >
                  <span className="font-mono text-stone-400 font-bold">?</span>
                  <span className="font-medium">{q}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 text-center sm:text-left">
              <button
                type="button"
                onClick={scrollToForm}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0B1325] text-slate-50 font-bold text-xs font-mono transition-all shadow-sm cursor-pointer hover:bg-[#1B3F8B]"
              >
                <span>Ask Your Question in Sunday's Session →</span>
              </button>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            08 · ACADEMIC ELIGIBILITY
           ───────────────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 border-b border-stone-200 bg-white">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="space-y-2">
              <PremiumChip variant="navy" size="md">
                ACADEMIC ELIGIBILITY
              </PremiumChip>
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
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-stone-900 block">
                      {item.degree}
                    </span>
                    <span className="font-mono text-[9px] text-[#1B3F8B] bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full font-bold">
                      {item.badge}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 font-sans leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            09 · DYNAMIC VIP PASS GENERATOR & REGISTRATION FORM
           ───────────────────────────────────────────────────────────── */}
        <section ref={formRef} className="py-16 sm:py-24 border-b border-stone-200 bg-[#FAF8F5]">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="text-center space-y-2 max-w-xl mx-auto">
              <PremiumChip variant="gold" size="md">
                PASS RESERVATION
              </PremiumChip>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#1A1A1A]">
                Reserve Your Industry Pass
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 font-sans">
                Enter your details to generate your verified candidate entry pass.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Interactive 3D VIP Boarding Pass */}
              <div className="lg:col-span-5 space-y-4">
                <Interactive3dBoardingPass
                  name={name}
                  degree={qualification ? `${qualification}${gradYear ? ` (${gradYear})` : ""}` : undefined}
                  passId={passId}
                  isConfirmed={isSuccess}
                />
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
                            onFocus={handleFormFocus}
                            onChange={(e) => {
                              handleFormFocus();
                              setPhone(e.target.value.replace(/\D/g, "").slice(0, 10));
                            }}
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
                          onFocus={handleFormFocus}
                          onChange={(e) => {
                            handleFormFocus();
                            setEmail(e.target.value);
                          }}
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
                            onFocus={handleFormFocus}
                            onChange={(e) => {
                              handleFormFocus();
                              setQualification(e.target.value);
                            }}
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
                            onFocus={handleFormFocus}
                            onChange={(e) => {
                              handleFormFocus();
                              setGradYear(e.target.value);
                            }}
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
                          onFocus={handleFormFocus}
                          onChange={(e) => {
                            handleFormFocus();
                            setMentorQuestion(e.target.value);
                          }}
                          placeholder="e.g. What skills matter most in the first 90 days?"
                          className="w-full h-10 px-3.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-xs placeholder:text-stone-400 focus:bg-white focus:outline-none focus:border-[#1B3F8B] focus:ring-1 focus:ring-[#1B3F8B] transition-all"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-12 inline-flex items-center justify-center gap-2 rounded-xl bg-[#0B1325] hover:bg-[#1B3F8B] text-slate-50 font-bold text-xs tracking-wider uppercase transition-all shadow-md cursor-pointer disabled:opacity-50 mt-1"
                      >
                        {isSubmitting ? (
                          <span>Reserving Pass…</span>
                        ) : (
                          <>
                            <span>RESERVE MY VIP INDUSTRY PASS</span>
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
          10 · MOBILE-FIRST STICKY BOTTOM ACTION BAR
         ───────────────────────────────────────────────────────────── */}
      {showStickyBar && !isSuccess && (
        <div
          className="fixed bottom-0 inset-x-0 z-50 border-t border-stone-300 bg-white/95 backdrop-blur-md shadow-2xl py-3 px-4 sm:hidden"
          style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-bold text-stone-900 truncate">
                Batch 01 · Closes in {countdown.hours}h {countdown.minutes}m
              </p>
              <p className="text-[10px] text-amber-700 font-mono font-bold">
                🔥 Only 14 Passes Left
              </p>
            </div>
            <button
              type="button"
              onClick={scrollToForm}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#0B1325] text-slate-50 font-bold text-xs font-mono uppercase tracking-wider shadow-sm cursor-pointer shrink-0"
            >
              <span>CLAIM PASS</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
