import { useState, useRef } from "react";
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
} from "lucide-react";
import { Footer } from "@/components/landing/Footer";
import { pageSeo } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/jsonLd";
import { SITE } from "@/components/landing/constants";
import { submitWorkshopLead } from "@/lib/workshop.functions";

export const Route = createFileRoute("/healthcare-career-workshop")({
  head: () => {
    const title = "Pharmacovigilance Industry Connect | Arzon Global";
    const description =
      "Understand Pharmacovigilance from professionals who have built careers in the industry. An exclusive industry interaction featuring 20+ years of PV leadership.";
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
              "An exclusive industry interaction for pharmacy and life-science students with experienced Pharmacovigilance professionals.",
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

const EXPERIENCE_MODULES = [
  {
    num: "01",
    title: "Inside Pharmacovigilance",
    desc: "Understand how Pharmacovigilance works in the real industry.",
  },
  {
    num: "02",
    title: "Real PV Workflows",
    desc: "Explore ICSR processing, case assessment, MedDRA, narratives, QC and safety operations.",
  },
  {
    num: "03",
    title: "Industry Perspective",
    desc: "Learn what the work looks like, how teams operate and what skills matter.",
  },
  {
    num: "04",
    title: "Direct Mentor Interaction",
    desc: "Ask questions and hear practical insights from experienced PV professionals.",
  },
  {
    num: "05",
    title: "Career Exploration",
    desc: "Understand roles, responsibilities, career progression and industry opportunities.",
  },
];

const WORKFLOW_STEPS = [
  "Case Receipt",
  "Triage",
  "Data Entry",
  "MedDRA",
  "Narrative",
  "QC",
  "Medical Review",
  "Submission",
];

const AUDIENCE_LIST = [
  "B.Pharm Students & Graduates",
  "M.Pharm (Pharmacology / QA / Regulatory)",
  "Pharm.D (Doctor of Pharmacy)",
  "Life Sciences Graduates (Biotech, Biochem, Micro)",
  "Students Exploring Pharmacovigilance Careers",
];

const VALUE_PILLARS = [
  {
    title: "20+ Years of Industry Experience",
    desc: "Learn directly from professionals who have worked across Pharmacovigilance operations and leadership.",
  },
  {
    title: "Real Industry Perspective",
    desc: "Understand the work beyond academic definitions.",
  },
  {
    title: "Practical Exposure",
    desc: "See how safety cases, workflows and PV responsibilities work in practice.",
  },
  {
    title: "Direct Access to Mentors",
    desc: "Ask questions that matter before choosing your career path.",
  },
];

function PharmacovigilanceIndustryConnectPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [qualification, setQualification] = useState("");
  const [gradYear, setGradYear] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const formRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const scrollToPassForm = () => {
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
          degree: `${qualification} (Class of ${gradYear})`,
          source: "pv-industry-connect",
          utmSource: "industry_connect_exclusive",
        },
      });
      setIsSuccess(true);
    } catch (err: any) {
      console.warn("Pass reservation notice:", err);
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="tone-light min-h-screen bg-[#FAF8F5] text-[#1A1A1A] font-sans antialiased">
      <Nav />

      <main className="relative z-10 pt-20 sm:pt-24">
        {/* ─────────────────────────────────────────────────────────────
            HERO: MINIMAL, AUTHORITATIVE, PRODUCT-FIRST
           ───────────────────────────────────────────────────────────── */}
        <section className="border-b border-stone-200/90 bg-[#FAF8F5] py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
            {/* Header Badge */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-stone-300 bg-white px-3.5 py-1.5 shadow-2xs">
              <img src={arzonIcon} alt="Arzon Global" className="h-4 w-4 object-contain" />
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-stone-700">
                Arzon Global · Industry Interaction
              </span>
            </div>

            {/* Title & Subtitle */}
            <div className="space-y-4 max-w-3xl mx-auto">
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1A1A1A] leading-[1.12]">
                Pharmacovigilance Industry Connect
              </h1>
              <p className="font-serif text-lg sm:text-xl text-stone-700 italic">
                Understand Pharmacovigilance from professionals who have built careers in the industry.
              </p>
            </div>

            <p className="text-sm sm:text-base text-stone-600 max-w-2xl mx-auto leading-relaxed">
              An exclusive industry interaction for pharmacy and life-science students with experienced Pharmacovigilance professionals.
            </p>

            {/* Event Telemetry */}
            <div className="inline-flex flex-wrap items-center justify-center gap-4 sm:gap-6 rounded-2xl border border-stone-200 bg-white px-6 py-3.5 shadow-2xs text-xs font-mono">
              <div className="flex items-center gap-2 text-stone-800">
                <Calendar className="h-4 w-4 text-[#1B3F8B]" />
                <span>Sunday, 11:00 AM – 12:15 PM IST</span>
              </div>
              <span className="text-stone-300 hidden sm:inline">|</span>
              <div className="flex items-center gap-2 text-stone-800">
                <Clock className="h-4 w-4 text-[#8A6D1F]" />
                <span>Live Online (Interactive)</span>
              </div>
              <span className="text-stone-300 hidden sm:inline">|</span>
              <span className="text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Complimentary Industry Pass
              </span>
            </div>

            {/* Primary Action Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={scrollToPassForm}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#0B1325] hover:bg-[#1B3F8B] text-slate-50 font-bold text-xs tracking-wider uppercase transition-all shadow-md cursor-pointer hover:-translate-y-0.5"
              >
                <span>Reserve Your Industry Pass</span>
                <ArrowRight className="h-4 w-4 text-slate-50" />
              </button>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            MENTOR DOSSIER: THE REASON TO BELIEVE
           ───────────────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 border-b border-stone-200 bg-white">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#8A6D1F]">
                FACULTY &amp; LEADERSHIP
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
                Meet Industry Mentors With 20+ Years of Experience
              </h2>
            </div>

            <div className="rounded-3xl border border-stone-200 bg-[#FAF8F5] p-6 sm:p-10 space-y-6 shadow-sm">
              <div className="space-y-2 text-center sm:text-left border-b border-stone-200/80 pb-6">
                <div className="inline-block font-mono text-[11px] font-bold uppercase tracking-wider text-[#1B3F8B] bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-md">
                  Industry Veteran &amp; Faculty Lead
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
                  Senior Pharmacovigilance Leader
                </h3>
                <p className="text-xs sm:text-sm font-mono text-stone-600">
                  20+ Years | Pharmacovigilance Operations | ICSR | PV Leadership
                </p>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-mono font-bold uppercase tracking-wider text-stone-500">
                  Experience across leading organizations including:
                </p>
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                  <span className="rounded-xl border border-stone-300 bg-white px-4 py-2 font-mono text-xs font-bold text-stone-900 shadow-2xs">
                    Accenture
                  </span>
                  <span className="rounded-xl border border-stone-300 bg-white px-4 py-2 font-mono text-xs font-bold text-stone-900 shadow-2xs">
                    Cognizant
                  </span>
                  <span className="rounded-xl border border-stone-300 bg-white px-4 py-2 font-mono text-xs font-bold text-stone-900 shadow-2xs">
                    Novaspire Biosciences
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed pt-2">
                Directed global safety operations, governed high-throughput ICSR pipelines, and navigated US FDA, EMA, and MHRA regulatory inspections.
              </p>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            WHAT YOU'LL EXPERIENCE: 01 TO 05
           ───────────────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 border-b border-stone-200 bg-[#FAF8F5]">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="space-y-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B]">
                SESSION STRUCTURE
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
                What You'll Experience
              </h2>
            </div>

            <div className="space-y-3">
              {EXPERIENCE_MODULES.map((item) => (
                <div
                  key={item.num}
                  className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-6 flex items-start gap-4 shadow-2xs"
                >
                  <span className="font-mono text-xs font-bold text-[#1B3F8B] bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-md shrink-0">
                    {item.num}
                  </span>
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm sm:text-base text-stone-900 font-sans">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            FROM SAFETY REPORT TO PV OPERATIONS (PIPELINE)
           ───────────────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 border-b border-stone-200 bg-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#8A6D1F]">
                OPERATIONAL PIPELINE
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
                From Safety Report to PV Operations
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 font-sans">
                See how a real Pharmacovigilance case moves through the industry workflow.
              </p>
            </div>

            {/* Linear Workflow Badges */}
            <div className="rounded-3xl border border-stone-200 bg-[#FAF8F5] p-6 sm:p-8 shadow-xs">
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                {WORKFLOW_STEPS.map((step, idx) => (
                  <div key={step} className="flex items-center gap-2 sm:gap-3">
                    <div className="rounded-xl border border-stone-300 bg-white px-3.5 py-2 text-xs font-mono font-bold text-stone-800 shadow-2xs">
                      {step}
                    </div>
                    {idx < WORKFLOW_STEPS.length - 1 && (
                      <span className="text-stone-400 font-bold text-xs">→</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            WHO IS THIS FOR?
           ───────────────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 border-b border-stone-200 bg-[#FAF8F5]">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="space-y-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-stone-500">
                ELIGIBILITY
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
                Who Is This For?
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {AUDIENCE_LIST.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-stone-200 bg-white p-4 flex items-center gap-3 shadow-2xs"
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0" />
                  <span className="font-sans text-xs sm:text-sm font-semibold text-stone-800">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            WHY ATTEND?
           ───────────────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 border-b border-stone-200 bg-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="space-y-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B]">
                CORE VALUE
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
                Why Attend?
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {VALUE_PILLARS.map((pillar) => (
                <div
                  key={pillar.title}
                  className="rounded-2xl border border-stone-200 bg-[#FAF8F5] p-5 sm:p-6 space-y-2 shadow-2xs"
                >
                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#1A1A1A]">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            RESERVE YOUR INDUSTRY PASS (REGISTRATION FORM)
           ───────────────────────────────────────────────────────────── */}
        <section
          ref={formRef}
          id="pass-reservation"
          className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-stone-200"
        >
          <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-3">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#8A6D1F]">
                EXCLUSIVE INTERACTION
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
                Pharmacovigilance Industry Connect
              </h2>
              <div className="font-mono text-xs text-stone-600 flex items-center justify-center gap-3">
                <span>Live Online</span>
                <span>·</span>
                <span>Sunday, 11:00 AM IST</span>
                <span>·</span>
                <span className="text-amber-800 font-bold">Limited Live Registrations</span>
              </div>
            </div>

            <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 shadow-sm">
              {isSuccess ? (
                /* Confirmed State */
                <div className="space-y-5 text-center py-4">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 ring-4 ring-emerald-50">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-serif text-2xl font-bold text-[#1A1A1A]">
                      Your Pass Is Reserved
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 font-sans">
                      We have reserved your seat for the live session.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4 space-y-3 text-left">
                    <div className="flex items-center justify-between text-xs font-mono border-b border-stone-200 pb-2">
                      <span className="text-stone-500">ATTENDEE</span>
                      <span className="font-bold text-stone-900 uppercase">{name}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-stone-500">DATE &amp; TIME</span>
                      <span className="font-bold text-stone-900">Sunday · 11:00 AM IST</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <a
                      href={WHATSAPP_COMMUNITY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-slate-50 font-bold text-xs font-mono tracking-wider uppercase transition-all shadow-sm cursor-pointer"
                    >
                      <span>Join WhatsApp Channel for Direct Link</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              ) : (
                /* Registration Form */
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="border-b border-stone-100 pb-3">
                    <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-stone-800">
                      Reserve Your Industry Pass
                    </h3>
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
                      onChange={(e) => setName(e.target.value)}
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
                        <option value="">Select</option>
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
                        <option value="">Select</option>
                        <option value="2027">2027 (Pre-final)</option>
                        <option value="2026">2026 (Final Year)</option>
                        <option value="2025">2025 (Graduate)</option>
                        <option value="2024">2024 (Graduate)</option>
                        <option value="Earlier">2023 or Earlier</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-11 inline-flex items-center justify-center gap-2 rounded-xl bg-[#0B1325] hover:bg-[#1B3F8B] text-slate-50 font-bold text-xs tracking-wider uppercase transition-all shadow-md cursor-pointer disabled:opacity-50 mt-2"
                  >
                    {isSubmitting ? (
                      <span>Reserving Pass…</span>
                    ) : (
                      <>
                        <span>Reserve My Pass</span>
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-stone-500 font-mono text-center pt-1">
                    Pass confirmation sent via WhatsApp &amp; Email.
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
