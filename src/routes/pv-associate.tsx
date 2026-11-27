import React, { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  MessageCircle,
  ArrowRight,
  Play,
  Check,
  CheckCircle2,
  Plus,
  Minus,
  ShieldCheck,
  FileText,
  Database,
  Award,
  Briefcase,
  Clock,
  Laptop,
  Users,
  Activity,
  FileCheck,
  Shield,
  BarChart3,
  X,
  BookOpen,
  Info,
  Calendar,
  GraduationCap,
  Star,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Phone,
  Building2,
  Pill,
  Globe,
  Tag,
  Stethoscope,
} from "lucide-react";
import { COUNSELLOR_PHONE, SITE, absUrl } from "@/components/landing/constants";
import { trackEvent } from "@/lib/analytics";
import { openCounsellorModal } from "@/components/system/CounsellorLeadModal";
import mentorKumailImg from "@/assets/mentor-kumail.jpg";

// ── Masterclass Direct Link ──────────────────────────────────────────────────
const PV_MASTERCLASS_URL =
  "https://drive.google.com/file/d/1MZVnxdlyC2JBMfFqjs5jt_8KLrLJ91tb/view?usp=sharing&t=690.918";

// ── WhatsApp URL Helper ───────────────────────────────────────────────────────
const waMsg = (text: string) =>
  `https://wa.me/${COUNSELLOR_PHONE}?text=${encodeURIComponent(text)}`;

// ── Route Definition & SEO Metadata ──────────────────────────────────────────
export const Route = createFileRoute("/pv-associate")({
  head: () => {
    const title = "Pharmacovigilance & Drug Safety Associate 12-Week Pathway | Arzon Global";
    const desc =
      "Build the skills to start your career in Pharmacovigilance. Learn how drug safety teams process adverse event reports, assess safety information and document cases. Mentored by Mohamed Kumail Abbas.";
    const url = `${SITE.origin}/pv-associate`;
    const og = absUrl(SITE.ogImage.inauguration);
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        {
          name: "keywords",
          content:
            "pharmacovigilance associate, drug safety associate, pv training, bpharm pharmacovigilance, pharmd drug safety, mpharm pv jobs, icsr case processing, Standardized Medical Coding, mohamed kumail abbas, Enterprise Safety Database",
        },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { property: "og:image", content: og },
        { property: "og:locale", content: "en_IN" },
        { property: "og:site_name", content: "Arzon Global" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: desc },
        { name: "twitter:image", content: og },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            name: "Pharmacovigilance & Drug Safety Associate 12-Week Pathway",
            description: desc,
            provider: {
              "@type": "Organization",
              name: "Arzon Global",
              sameAs: SITE.origin,
            },
            instructor: {
              "@type": "Person",
              name: "Mohamed Kumail Abbas",
              jobTitle: "Manager, Pharmacovigilance Operations",
            },
            timeRequired: "P12W",
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE.origin },
              { "@type": "ListItem", position: 2, name: "Programmes", item: absUrl("/courses") },
              { "@type": "ListItem", position: 3, name: "Pharmacovigilance Associate", item: url },
            ],
          }),
        },
      ],
    };
  },
  component: PVAssociateBlueprintPage,
});

// ── Degree Options for Quick Callback ─────────────────────────────────────────
const DEGREES = [
  "B.Pharm (Bachelor of Pharmacy)",
  "M.Pharm (Pharmacology / Clinical / Pharmaceutics)",
  "Pharm.D (Doctor of Pharmacy)",
  "MBBS / Medical Graduate",
  "BDS / Dental Graduate",
  "B.Sc / M.Sc Life Sciences / Biotechnology",
  "B.Sc / M.Sc Nursing",
  "Other Healthcare / Science Degree",
];

const PASSING_YEARS = [
  "2026 (Final Year / Pursuing)",
  "2025 (Recent Graduate)",
  "2024",
  "2023 or earlier",
];

// ── Work Samples Data (Section 07 Tabs) ────────────────────────────────────────
const WORK_SAMPLES = [
  {
    id: "icsr-triage",
    tabLabel: "ICSR Triage Dossier",
    tag: "ICH E2A / E2D",
    caseId: "ARZ-ICSR-2026-009",
    reporter: "Clinical Pharmacist, Oncology Center",
    suspectDrug: "ImmunoRx (Monoclonal Antibody, 100mg)",
    reportedEvent: "Grade 3 Infusion-Related Reaction",
    triageVerdict: "Valid ICSR · SERIOUS (Hospitalized)",
    criteriaBreakdown: [
      { label: "Identifiable Patient", value: "Female, 54 Yrs (M.K.) [VALID]" },
      { label: "Identifiable Reporter", value: "Dr. S. Nair, MD (Cardiologist) [VALID]" },
      { label: "Suspect Drug", value: "ImmunoRx 100mg IV Infusion [VALID]" },
      { label: "Adverse Event", value: "Acute laryngeal edema & hypotension [VALID]" },
    ],
  },
  {
    id: "standardized medical coding-coding",
    tabLabel: "Standardized Medical Coding Record",
    tag: "Standardized Medical Coding",
    caseId: "ARZ-MED-2026-014",
    reporter: "Hospital Inpatient Emergency Ward",
    suspectDrug: "CardioVas® (Lisinopril 20mg)",
    reportedEvent: "Acute Angioedema & Throat Tightness",
    triageVerdict: "Hierarchy Mapped to SOC 10021428",
    criteriaBreakdown: [
      { label: "Reported Term (Verbatim)", value: "Severe facial swelling with throat tightness" },
      { label: "Lowest Level Term (LLT)", value: "Swelling of lips and face [10024561]" },
      { label: "Preferred Term (PT)", value: "Angioedema [10002424]" },
      { label: "System Organ Class (SOC)", value: "Immune system disorders [10021428]" },
    ],
  },
  {
    id: "cioms-narrative",
    tabLabel: "CIOMS I Narrative",
    tag: "CIOMS I Format",
    caseId: "ARZ-CIOMS-2026-009",
    reporter: "Specialist Physician Follow-Up",
    suspectDrug: "ImmunoRx (100mg IV)",
    reportedEvent: "Infusion Anaphylactoid Syndrome",
    triageVerdict: "Narrative Drafted & Sign-off Ready",
    criteriaBreakdown: [
      {
        label: "Case Narrative Excerpt",
        value:
          "A 54-year-old female patient developed acute angioedema and respiratory tightness 4 hours post-dose. Discontinuation of suspect therapy with emergency IV epinephrine resulted in prompt resolution within 18 hours (positive dechallenge). Causality assessed as probable.",
      },
    ],
  },
  {
    id: "regulatory-clock",
    tabLabel: "Expedited Clock Matrix",
    tag: "ICH E2B(R3)",
    caseId: "ARZ-EXP-2026-088",
    reporter: "Regulatory Compliance Lead",
    suspectDrug: "Investigational Agent RX-402",
    reportedEvent: "Suspected Unexpected Serious ADR (SUSAR)",
    triageVerdict: "15-Day Expedited Gate Cleared",
    criteriaBreakdown: [
      { label: "Receipt Timestamp (Day 0)", value: "14-Oct-2026, 09:30 IST [Logged]" },
      { label: "Medical Review Sign-Off", value: "Day 8 (22-Oct-2026) [Completed]" },
      { label: "Health Authority Gateway", value: "US FDA FAERS & EMA EudraVigilance" },
      { label: "Transmission Deadline", value: "Day 15 (29-Oct-2026, 23:59 GMT)" },
    ],
  },
];

// ── FAQs Data (Section 10) ────────────────────────────────────────────────────
const BLUEPRINT_FAQS = [
  {
    q: "Who can join this program?",
    a: "Graduates and final-year students of B.Pharm, M.Pharm, Pharm.D, MBBS, BDS, and Life Sciences (B.Sc / M.Sc). Your educational background provides the pharmacological and anatomical foundation needed for safety evaluation.",
  },
  {
    q: "Will I receive a job guarantee?",
    a: "No. Arzon maintains strict transparency: we do not offer deceptive 100% placement guarantees. We provide practical role-based case training, portfolio deliverables, and technical interview preparation. Hiring decisions remain the sole discretion of employers.",
  },
  {
    q: "Do I need prior experience?",
    a: "No. The 12-week curriculum is organized progressively from foundational drug safety concepts through hands-on case triage, Standardized Medical Coding, and narrative synthesis.",
  },
  {
    q: "How is the assessment conducted?",
    a: "Assessments are practical and case-based. You will review simulated adverse reaction reports, code diagnoses using standardized medical coding terminology, and draft structured narratives reviewed by industry mentors.",
  },
  {
    q: "What tools will I learn?",
    a: "You will master the architecture of commercial safety databases (Enterprise Safety Database concepts), the 5-tier Standardized Medical Coding dictionary hierarchy, CIOMS I case report formats, and regulatory clock tracking.",
  },
  {
    q: "What if I am from a non-pharmacy background?",
    a: "Life sciences, biotechnology, and nursing graduates are eligible provided they have foundational coursework in human biology, pharmacology, or clinical medicine.",
  },
  {
    q: "What is the duration and mode?",
    a: "The program is 12 weeks, conducted online through structured interactive modules, weekend mentor case clinics, and hands-on portfolio assignments.",
  },
  {
    q: "How do I speak to a counsellor?",
    a: "Click 'Talk to a Career Counsellor' anywhere on this page to share your academic background. Our team will schedule a zero-pressure 15-minute diagnostic call to answer your questions.",
  },
];

// ── Main Component ───────────────────────────────────────────────────────────
function PVAssociateBlueprintPage() {
  const [activeWorkSampleTab, setActiveWorkSampleTab] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    trackEvent("pv_page_view", {
      path: "/pv-associate",
      source: "blueprint_alignment_v1",
    });

    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openCounsellor = (triggerSource = "direct") => {
    trackEvent("counsellor_modal_open", { source: triggerSource });
    openCounsellorModal({
      programme: "Pharmacovigilance & Drug Safety",
      source: `pv_associate_${triggerSource}`,
    });
  };

  const currentSample = WORK_SAMPLES[activeWorkSampleTab];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#081F38] font-sans antialiased selection:bg-[#008F83] selection:text-white pb-24 sm:pb-0">
      {/* ── 01. HERO (ABOVE THE FOLD) ────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white tone-light card-light border-b border-slate-200/80 pt-8 pb-14 sm:pt-16 sm:pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation (Mobile-safe scrollbar hidden) */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-[11px] sm:text-xs font-mono text-[#526B67] mb-4 sm:mb-8 overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-1"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <Link to="/" className="hover:text-[#063F39] transition-colors shrink-0">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <Link to="/courses" className="hover:text-[#063F39] transition-colors shrink-0">Programmes</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-[#063F39] font-bold shrink-0">Pharmacovigilance Associate</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF5F3] border border-[#C2DDD7] text-[#004B45] font-semibold text-[10.5px] sm:text-xs tracking-wide shadow-2xs whitespace-nowrap shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-[#008F83] shrink-0" />
                <span className="sm:hidden">DRUG SAFETY · 12-WEEK PATHWAY</span>
                <span className="hidden sm:inline">PHARMACOVIGILANCE · 12-WEEK CLINICAL PATHWAY</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-bold tracking-tight text-[#063F39] leading-[1.12]">
                Build the Skills to Start Your Career in{" "}
                <span className="text-[#008F83]">
                  Pharmacovigilance.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#526B67] font-normal leading-relaxed">
                Learn how drug safety teams process adverse event reports, assess safety information and document cases. Develop practical skills through structured training, case-based exercises and career preparation.
              </p>

              {/* Direct 2 CTAs: Side-by-side Apple-grade ergonomics */}
              <div className="flex flex-row items-center gap-2.5 sm:gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => openCounsellor("hero_whatsapp")}
                  className="inline-flex h-11 flex-1 sm:flex-initial items-center justify-center gap-2 px-4 sm:px-6 rounded-full bg-[#004B45] hover:bg-[#00675D] text-white font-bold text-[12.5px] sm:text-sm shadow-[0_6px_20px_rgba(0,75,69,0.18)] transition-all active:scale-[0.98] cursor-pointer whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  <span>Talk to Experts</span>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                </button>

                <Link
                  to="/career-assessment"
                  className="inline-flex h-11 flex-1 sm:flex-initial items-center justify-center gap-1.5 px-4 sm:px-6 rounded-full bg-white tone-light card-light border border-[#C2D6D2] hover:bg-[#F4FAF8] text-[#063F39] font-bold text-[12.5px] sm:text-sm shadow-2xs transition-all active:scale-[0.98] cursor-pointer whitespace-nowrap"
                >
                  <span>Check Fit Score</span>
                </Link>
              </div>

              {/* 4 Feature Trust Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-200/80 text-xs text-[#526B67]">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-[#008F83] shrink-0" />
                  <span className="font-medium text-[#063F39] leading-tight">Guided by Industry Professionals</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#008F83] shrink-0" />
                  <span className="font-medium text-[#063F39] leading-tight">Practical Case Exercises</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-[#008F83] shrink-0" />
                  <span className="font-medium text-[#063F39] leading-tight">Designed for Healthcare Graduates</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#10B981] shrink-0" />
                  <span className="font-medium text-[#063F39] leading-tight">Transparent Guidance (No Guarantee)</span>
                </div>
              </div>
            </div>

            {/* Right Workstation Visual Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border border-slate-200/80 bg-white tone-light card-light shadow-xl">
                <img
                  src="/images/pv-clinical-workstation.jpg"
                  alt="Pharmacovigilance specialist analyzing case data at dual-monitor workstation"
                  className="w-full h-80 sm:h-96 object-cover object-center"
                />

                {/* Floating Walkthrough Badge */}
                <a
                  href={PV_MASTERCLASS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-4 inset-x-4 p-3.5 rounded-2xl bg-white/95 tone-light card-light backdrop-blur-md border border-slate-200/90 shadow-lg flex items-center justify-between gap-3 transition-transform hover:scale-[1.01] cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#004B45] flex items-center justify-center text-white shrink-0 shadow-xs">
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </div>
                    <div className="text-left">
                      <strong className="text-xs font-bold text-[#063F39] block leading-tight">
                        See a Real Case Walkthrough
                      </strong>
                      <span className="text-[11px] text-[#526B67] block leading-tight">
                        From intake to regulatory reporting.
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#008F83] shrink-0" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 02. UNDERSTAND THE CAREER (WHAT IS PHARMACOVIGILANCE?) ─────────────── */}
      <section className="py-16 sm:py-24 bg-[#F8FAFC] border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Narrative */}
            <div className="lg:col-span-5 space-y-4 text-left">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-[#C2DDD7] bg-[#EBF5F3] px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-[#004B45] shadow-2xs tone-light card-light">
                <span className="w-1.5 h-1.5 rounded-full bg-[#008F83]" />
                <span>02 · UNDERSTAND THE CAREER</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#063F39]">
                What is{" "}
                <span className="text-[#008F83]">
                  Pharmacovigilance?
                </span>
              </h2>
              <p className="text-sm sm:text-base text-[#526B67] leading-relaxed">
                Pharmacovigilance is the field responsible for detecting, assessing, understanding and preventing adverse effects and other medicine-related problems. It helps ensure patient safety throughout the lifecycle of a medicine.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => openCounsellor("section_02_explore")}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#004B45] hover:text-[#00675D] transition-colors cursor-pointer"
                >
                  <span>Explore the Career Path</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right 6 Modular Icon Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              {[
                {
                  icon: Pill,
                  title: "Monitor Medicine Safety",
                  desc: "Review and assess adverse event reports from patients, HCPs and clinical trials.",
                },
                {
                  icon: FileCheck,
                  title: "Evaluate Case Information",
                  desc: "Assess seriousness, expectedness, causality and relevant safety information.",
                },
                {
                  icon: FileText,
                  title: "Document and Report",
                  desc: "Prepare clear, structured case narratives and submit reports to regulatory authorities.",
                },
                {
                  icon: Database,
                  title: "Use Standardized Terminology",
                  desc: "Apply Standardized Medical Coding, WHO-UMC, CIOMS and other international standards.",
                },
                {
                  icon: ShieldCheck,
                  title: "Ensure Quality and Compliance",
                  desc: "Follow defined procedures and quality checks in line with global regulatory requirements.",
                },
                {
                  icon: Globe,
                  title: "Work with Global Teams",
                  desc: "Collaborate with clinical, medical and regulatory teams across different locations.",
                },
              ].map((card, idx) => {
                const IconComponent = card.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white tone-light card-light border border-slate-200/80 shadow-2xs space-y-2.5 transition-all hover:border-[#C2DDD7]"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#EBF5F3] flex items-center justify-center text-[#004B45]">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-bold text-[#063F39]">{card.title}</h3>
                    <p className="text-xs text-[#526B67] leading-relaxed">{card.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── 03. CAREER OPPORTUNITIES (COMPARE PATHS) ──────────────────────────── */}
      <section className="py-16 sm:py-24 bg-white tone-light card-light border-b border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-left">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[#C2DDD7] bg-[#EBF5F3] px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-[#004B45] shadow-2xs tone-light card-light">
              <span className="w-1.5 h-1.5 rounded-full bg-[#008F83]" />
              <span>03 · CAREER OPPORTUNITIES</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#063F39]">
              From Pharmacy to{" "}
              <span className="text-[#008F83]">
                Global Drug Safety Careers
              </span>
            </h2>
            <p className="text-sm sm:text-base text-[#526B67] leading-relaxed">
              Your healthcare background gives you a strong foundation. Explore how different career paths compare.
            </p>
          </div>

          {/* Comparison Split Cards with Center Arrow */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            {/* Card A: Academic Default */}
            <div className="md:col-span-5 p-7 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-bold text-[#526B67] uppercase">Academic Default</span>
                  <span className="text-xs font-mono text-[#526B67]">Retail &amp; Sales</span>
                </div>
                <h3 className="text-xl font-bold text-[#063F39]">Retail Pharmacy &amp; Field Sales</h3>

                <div className="space-y-3 text-xs sm:text-sm text-[#526B67]">
                  <div className="flex items-baseline justify-between py-2 border-b border-slate-200/60">
                    <span className="text-slate-500">Typical Starting Salary:</span>
                    <strong className="text-[#063F39] font-bold">₹1.80 – ₹2.50 LPA</strong>
                  </div>
                  <div className="flex items-baseline justify-between py-2 border-b border-slate-200/60">
                    <span className="text-slate-500">Work Environment:</span>
                    <span className="text-[#063F39] text-right">Retail pharmacy, medical sales</span>
                  </div>
                  <div className="flex items-baseline justify-between py-2">
                    <span className="text-slate-500">Long-Term Growth:</span>
                    <span className="text-[#063F39] text-right">Limited growth after 3–5 years</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Center Connective Indicator */}
            <div className="md:col-span-2 hidden md:flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-[#EBF5F3] border border-[#C2DDD7] flex items-center justify-center text-[#004B45] shadow-xs">
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>

            {/* Card B: Specialized Corporate Track */}
            <div className="md:col-span-5 p-7 rounded-2xl bg-[#EBF5F3] border border-[#C2DDD7] space-y-5 flex flex-col justify-between shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-bold text-[#004B45] uppercase">Specialized Track</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#004B45] text-white">Corporate MNC</span>
                </div>
                <h3 className="text-xl font-bold text-[#063F39]">Corporate Drug Safety Associate</h3>

                <div className="space-y-3 text-xs sm:text-sm text-[#063F39]">
                  <div className="flex items-baseline justify-between py-2 border-b border-[#C2DDD7]/60">
                    <span className="text-slate-600">Typical Starting Salary:</span>
                    <strong className="text-[#004B45] font-bold text-base">₹4.20 – ₹6.00 LPA</strong>
                  </div>
                  <div className="flex items-baseline justify-between py-2 border-b border-[#C2DDD7]/60">
                    <span className="text-slate-600">Work Environment:</span>
                    <span className="font-medium text-right">Global pharma GCCs, CROs</span>
                  </div>
                  <div className="flex items-baseline justify-between py-2">
                    <span className="text-slate-600">Long-Term Growth:</span>
                    <span className="font-medium text-right">Progression to Senior PV &amp; Ops Lead</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-[#C2DDD7]/60 flex items-center gap-2 text-xs text-[#004B45] font-medium">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-[#10B981]" />
                <span>Analytical desk environment · 5-day corporate schedule</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 04. SEE THE WORK (REAL CASE WORKFLOW) ─────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-[#F8FAFC] border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-left">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-[#C2DDD7] bg-[#EBF5F3] px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-[#004B45] shadow-2xs tone-light card-light">
                <span className="w-1.5 h-1.5 rounded-full bg-[#008F83]" />
                <span>04 · SEE THE WORK</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#063F39]">
                What Does a Pharmacovigilance{" "}
                <span className="text-[#008F83]">
                  Case Involve?
                </span>
              </h2>
              <p className="text-sm sm:text-base text-[#526B67] leading-relaxed">
                A safety case moves through several stages, from receiving the initial report to reviewing the information, documenting the case and completing the required regulatory steps.
              </p>
            </div>

            <a
              href="#work-samples"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#004B45] hover:text-[#00675D] transition-colors shrink-0"
            >
              <span>See a Detailed Case Example</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* 6 Connected Steps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
            {[
              {
                num: "01",
                title: "Intake",
                desc: "Receive and review the adverse event report.",
                icon: FileText,
              },
              {
                num: "02",
                title: "Triage",
                desc: "Assess seriousness and expectedness.",
                icon: FileCheck,
              },
              {
                num: "03",
                title: "Standardized Medical Coding",
                desc: "Apply standardized medical terminology.",
                icon: Tag,
              },
              {
                num: "04",
                title: "Narrative",
                desc: "Prepare a clear, structured case narrative.",
                icon: Laptop,
              },
              {
                num: "05",
                title: "Quality Review",
                desc: "Validate information and check compliance.",
                icon: ShieldCheck,
              },
              {
                num: "06",
                title: "Regulatory Reporting",
                desc: "Submit to regulatory authorities as required.",
                icon: Globe,
              },
            ].map((st, idx) => {
              const IconComp = st.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white tone-light card-light border border-slate-200/80 shadow-2xs space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-[#008F83]">{st.num}</span>
                      <IconComp className="w-4 h-4 text-slate-400" />
                    </div>
                    <h3 className="font-bold text-sm text-[#063F39]">{st.title}</h3>
                  </div>
                  <p className="text-xs text-[#526B67] leading-relaxed">{st.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 05. SKILLS EMPLOYERS LOOK FOR (INDUSTRY INSIGHTS) ─────────────────── */}
      <section className="py-16 sm:py-24 bg-white tone-light card-light border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-left">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[#C2DDD7] bg-[#EBF5F3] px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-[#004B45] shadow-2xs tone-light card-light">
              <span className="w-1.5 h-1.5 rounded-full bg-[#008F83]" />
              <span>05 · SKILLS EMPLOYERS LOOK FOR</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#063F39]">
              Key Skills &amp;{" "}
              <span className="text-[#008F83]">
                Knowledge Areas
              </span>
            </h2>
            <p className="text-sm sm:text-base text-[#526B67] leading-relaxed">
              Based on analysis of recent job descriptions for entry-level pharmacovigilance roles across major pharma employers.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Visual Bar Chart */}
            <div className="lg:col-span-6 p-7 rounded-3xl bg-[#F8FAFC] border border-slate-200/80 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <span className="font-mono text-xs font-bold text-[#063F39] uppercase">
                  Screening Demand Benchmark
                </span>
                <span className="text-[11px] font-mono text-[#526B67]">Relative Frequency</span>
              </div>

              <div className="space-y-4">
                {[
                  { label: "ICSR Case Intake & Minimum Criteria", pct: 95 },
                  { label: "standardized medical coding terminology (LLT, PT, SOC)", pct: 90 },
                  { label: "Clinical Case Narrative Drafting (CIOMS)", pct: 88 },
                  { label: "Enterprise Safety Database / Safety Systems", pct: 84 },
                  { label: "Day-0 & 15-Day Regulatory Timelines", pct: 82 },
                ].map((row, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-medium text-[#063F39]">
                      <span>{row.label}</span>
                      <strong className="font-mono font-bold text-[#004B45]">{row.pct}%</strong>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[#008F83]"
                        style={{ width: `${row.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-[11px] font-mono text-[#526B67] leading-relaxed pt-2 border-t border-slate-200/60">
                Note: Based on recent job descriptions from global pharma GCCs, CROs and healthcare companies. Percentages indicate relative frequency in reviewed postings, not individual employer requirements.
              </p>
            </div>

            {/* Right Column: 4 Skill Categories (2x2 Grid) */}
            <div className="lg:col-span-6 space-y-4">
              <h3 className="font-bold text-base text-[#063F39]">Skills you need to develop</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white tone-light card-light border border-slate-200/80 shadow-2xs space-y-2">
                  <div className="w-7 h-7 rounded-lg bg-[#EBF5F3] flex items-center justify-center text-[#004B45]">
                    <BookOpen className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="font-bold text-sm text-[#063F39]">Core knowledge</h4>
                  <ul className="text-xs text-[#526B67] space-y-1">
                    <li>• Pharmacology &amp; ADRs</li>
                    <li>• PV principles</li>
                    <li>• Regulatory requirements</li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-white tone-light card-light border border-slate-200/80 shadow-2xs space-y-2">
                  <div className="w-7 h-7 rounded-lg bg-[#EBF5F3] flex items-center justify-center text-[#004B45]">
                    <Activity className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="font-bold text-sm text-[#063F39]">Practical skills</h4>
                  <ul className="text-xs text-[#526B67] space-y-1">
                    <li>• Case processing</li>
                    <li>• Standardized Medical Coding</li>
                    <li>• Case narratives</li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-white tone-light card-light border border-slate-200/80 shadow-2xs space-y-2">
                  <div className="w-7 h-7 rounded-lg bg-[#EBF5F3] flex items-center justify-center text-[#004B45]">
                    <Laptop className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="font-bold text-sm text-[#063F39]">Tools and systems</h4>
                  <ul className="text-xs text-[#526B67] space-y-1">
                    <li>• Enterprise Safety Database (basics)</li>
                    <li>• Safety databases</li>
                    <li>• Documentation workflows</li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-white tone-light card-light border border-slate-200/80 shadow-2xs space-y-2">
                  <div className="w-7 h-7 rounded-lg bg-[#EBF5F3] flex items-center justify-center text-[#004B45]">
                    <Users className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="font-bold text-sm text-[#063F39]">Professional skills</h4>
                  <ul className="text-xs text-[#526B67] space-y-1">
                    <li>• Attention to detail</li>
                    <li>• Clear communication</li>
                    <li>• Confidentiality</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 06. THE 12-WEEK LEARNING PATHWAY ─────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-[#F8FAFC] border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-left">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[#C2DDD7] bg-[#EBF5F3] px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-[#004B45] shadow-2xs tone-light card-light">
              <span className="w-1.5 h-1.5 rounded-full bg-[#008F83]" />
              <span>06 · THE 12-WEEK LEARNING PATHWAY</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#063F39]">
              From Foundations to{" "}
              <span className="text-[#008F83]">
                Applied Pharmacovigilance Work.
              </span>
            </h2>
            <p className="text-sm sm:text-base text-[#526B67] leading-relaxed">
              Every cohort curriculum is updated from real-time employer hiring data across global pharma GCCs and CROs.
            </p>
          </div>

          {/* Live Employer Research Benchmark Banner */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white tone-light card-light border border-[#C2DDD7] shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#008F83]" />
                <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-[#004B45]">
                  Trailing 12-Month Employer Hiring Benchmark (Audited for Every Batch)
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#526B67] leading-relaxed max-w-3xl">
                Curriculum, case sandboxes, and interview screening elimination gates calibrated directly against active job requisitions from <strong>Novartis, Sun Pharma, Dr. Reddy’s Laboratories, Amgen, Parexel, and Cognizant</strong>.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 shrink-0">
              <span className="px-2.5 py-1 rounded-md bg-[#EBF5F3] border border-[#C2DDD7] font-mono text-[10px] font-bold text-[#004B45]">
                Argus Safety v8.2+
              </span>
              <span className="px-2.5 py-1 rounded-md bg-[#EBF5F3] border border-[#C2DDD7] font-mono text-[10px] font-bold text-[#004B45]">
                MedDRA v26.1+
              </span>
              <span className="px-2.5 py-1 rounded-md bg-[#EBF5F3] border border-[#C2DDD7] font-mono text-[10px] font-bold text-[#004B45]">
                ICH E2B(R3)
              </span>
            </div>
          </div>

          {/* 3 Phased Cards with Arrows */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-7 rounded-3xl bg-white tone-light card-light border border-slate-200/80 shadow-2xs space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="font-mono text-xs font-bold text-[#008F83]">WEEKS 1–4</span>
                <h3 className="text-lg font-bold text-[#063F39]">Build Your Drug Safety Foundations</h3>
                <ul className="text-xs text-[#526B67] space-y-2">
                  <li className="flex items-start gap-1.5">• Introduction to PV & Global Safety Architecture</li>
                  <li className="flex items-start gap-1.5">• Adverse Drug Reactions (ADRs) & Causality Criteria</li>
                  <li className="flex items-start gap-1.5">• 4 Minimum ICSR Criteria (Patient, Reporter, Suspect, AE)</li>
                  <li className="flex items-start gap-1.5">• Day-0 Clock Triage & 15-Day Expedited Gate Rules</li>
                </ul>
              </div>
              <div className="p-3 rounded-xl bg-[#F4FAF8] border border-[#C2DDD7] text-xs font-mono text-[#004B45]">
                Milestone: Valid ICSR Triage Record (Novartis & Amgen Specs)
              </div>
            </div>

            <div className="p-7 rounded-3xl bg-white tone-light card-light border border-slate-200/80 shadow-2xs space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="font-mono text-xs font-bold text-[#008F83]">WEEKS 5–8</span>
                <h3 className="text-lg font-bold text-[#063F39]">Learn the Case-Processing Workflow</h3>
                <ul className="text-xs text-[#526B67] space-y-2">
                  <li className="flex items-start gap-1.5">• MedDRA 5-Tier Hierarchy (SOC down to LLT/PT)</li>
                  <li className="flex items-start gap-1.5">• WHO Drug Global (WHO-DD) Formulation Coding</li>
                  <li className="flex items-start gap-1.5">• Chronological Clinical Narrative Writing (Past Tense)</li>
                  <li className="flex items-start gap-1.5">• Quality Review, Duplicate Search & CIOMS I Output</li>
                </ul>
              </div>
              <div className="p-3 rounded-xl bg-[#F4FAF8] border border-[#C2DDD7] text-xs font-mono text-[#004B45]">
                Milestone: Standardized MedDRA Coding & Narrative Dossier
              </div>
            </div>

            <div className="p-7 rounded-3xl bg-white tone-light card-light border border-slate-200/80 shadow-2xs space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="font-mono text-xs font-bold text-[#008F83]">WEEKS 9–12</span>
                <h3 className="text-lg font-bold text-[#063F39]">Apply Your Knowledge &amp; Prepare</h3>
                <ul className="text-xs text-[#526B67] space-y-2">
                  <li className="flex items-start gap-1.5">• End-to-End Synthetic Case Processing (Trial & Spontaneous)</li>
                  <li className="flex items-start gap-1.5">• Aggregate Safety Overview (PSUR / PBRER Concepts)</li>
                  <li className="flex items-start gap-1.5">• Technical Interview Elimination Drills & Case Audits</li>
                  <li className="flex items-start gap-1.5">• Role-Specific Resume Architecture & Portfolio Review</li>
                </ul>
              </div>
              <div className="p-3 rounded-xl bg-[#F4FAF8] border border-[#C2DDD7] text-xs font-mono text-[#004B45]">
                Milestone: 4 Verified Portfolio Case Dossiers
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 07. WORK SAMPLES (REAL OUTPUT & EVIDENCE) ─────────────────────────── */}
      <section id="work-samples" className="py-16 sm:py-24 bg-white tone-light card-light border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-left">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[#C2DDD7] bg-[#EBF5F3] px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-[#004B45] shadow-2xs tone-light card-light">
              <span className="w-1.5 h-1.5 rounded-full bg-[#008F83]" />
              <span>07 · WORK SAMPLES</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#063F39]">
              Do Not Just List Skills on Your Resume.{" "}
              <span className="text-[#008F83]">
                Practise Applying Them.
              </span>
            </h2>
            <p className="text-sm sm:text-base text-[#526B67] leading-relaxed">
              Complete case-based exercises and build a portfolio of work samples with review feedback.
            </p>
          </div>

          {/* Interactive Tabbed Portfolio Section */}
          <div className="space-y-6">
            {/* Tabs Bar */}
            <div
              className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {WORK_SAMPLES.map((sample, idx) => (
                <button
                  key={sample.id}
                  type="button"
                  onClick={() => {
                    setActiveWorkSampleTab(idx);
                    trackEvent("work_sample_tab_click", { tab: sample.id });
                  }}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold font-mono transition-all cursor-pointer whitespace-nowrap ${
                    activeWorkSampleTab === idx
                      ? "bg-[#004B45] text-white shadow-sm"
                      : "bg-[#F8FAFC] text-[#526B67] hover:text-[#063F39] border border-slate-200"
                  }`}
                >
                  {sample.tabLabel}
                </button>
              ))}
            </div>

            {/* Split Content: Left Dossier / Right Checklist */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Left Panel: Simulated Dossier Card */}
              <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-[#F8FAFC] border border-slate-200/80 space-y-5">
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono font-bold text-[#008F83] uppercase">
                      CASE TRACKING ID: {currentSample.caseId}
                    </span>
                    <h3 className="text-lg font-bold text-[#063F39]">
                      {currentSample.tabLabel}
                    </h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-[#E6F7F1] text-[#10B981]">
                    {currentSample.tag}
                  </span>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div className="flex items-baseline justify-between py-1.5 border-b border-slate-200/40">
                    <span className="text-[#64748B]">Reporter:</span>
                    <strong className="text-[#081F38]">{currentSample.reporter}</strong>
                  </div>
                  <div className="flex items-baseline justify-between py-1.5 border-b border-slate-200/40">
                    <span className="text-[#64748B]">Suspect Drug:</span>
                    <strong className="text-[#081F38]">{currentSample.suspectDrug}</strong>
                  </div>
                  <div className="flex items-baseline justify-between py-1.5 border-b border-slate-200/40">
                    <span className="text-[#64748B]">Reported Event:</span>
                    <strong className="text-[#081F38]">{currentSample.reportedEvent}</strong>
                  </div>
                  <div className="flex items-baseline justify-between py-1.5">
                    <span className="text-[#526B67]">Triage Verdict:</span>
                    <span className="text-[#004B45] font-bold">{currentSample.triageVerdict}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200/60 space-y-2">
                  <span className="text-[11px] font-mono font-bold text-[#526B67] uppercase block">
                    Detailed Parameters:
                  </span>
                  <div className="space-y-1.5">
                    {currentSample.criteriaBreakdown.map((crit, cIdx) => (
                      <div
                        key={cIdx}
                        className="p-2.5 rounded-xl bg-white tone-light card-light border border-slate-200/60 text-xs flex flex-col sm:flex-row sm:items-baseline justify-between gap-1"
                      >
                        <span className="text-[#526B67] font-mono">{crit.label}:</span>
                        <strong className="text-[#063F39] font-mono text-right">{crit.value}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Panel: Recruiter Value Checklist */}
              <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-[#EBF5F3] border border-[#C2DDD7] space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <h3 className="font-bold text-lg text-[#063F39]">
                    What these exercises demonstrate
                  </h3>

                  <ul className="space-y-3.5 text-xs sm:text-sm text-[#063F39]">
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#008F83] shrink-0 mt-0.5" />
                      <span>Your understanding of the safety workflow</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#008F83] shrink-0 mt-0.5" />
                      <span>Your attention to documentation quality and casework</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#008F83] shrink-0 mt-0.5" />
                      <span>Your ability to organize case information</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#008F83] shrink-0 mt-0.5" />
                      <span>Your ability to explain your action or coding decisions</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#008F83] shrink-0 mt-0.5" />
                      <span>Your familiarity with relevant industry terminology</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#C2DDD7]/60">
                  <button
                    type="button"
                    onClick={() => openCounsellor("section_07_portfolio")}
                    className="w-full py-3.5 rounded-full bg-[#004B45] hover:bg-[#00675D] text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                  >
                    Discuss Portfolio Requirements With a Counsellor →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 08. MENTOR AND MASTERCLASS (LEARN FROM EXPERTS) ───────────────────── */}
      <section className="py-16 sm:py-24 bg-[#F8FAFC] border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-left">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[#C2DDD7] bg-[#EBF5F3] px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-[#004B45] shadow-2xs tone-light card-light">
              <span className="w-1.5 h-1.5 rounded-full bg-[#008F83]" />
              <span>08 · MENTOR AND MASTERCLASS</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#063F39]">
              Learn from{" "}
              <span className="text-[#008F83]">
                Industry Experience.
              </span>
            </h2>
          </div>

          {/* 3-Column Horizontal Card Layout */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white tone-light card-light border border-slate-200/80 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Mentor Profile */}
            <div className="lg:col-span-4 flex items-center gap-4">
              <img
                src={mentorKumailImg}
                alt="Mohamed Kumail Abbas"
                className="w-20 h-20 rounded-2xl object-cover object-top border border-slate-200 shrink-0"
              />
              <div className="space-y-1">
                <h3 className="font-bold text-base text-[#063F39]">Mohamed Kumail Abbas</h3>
                <p className="text-xs font-semibold text-[#008F83]">Manager - Pharmacovigilance</p>
                <p className="text-[11px] text-[#526B67]">Ex-Cognizant, Quintiles, Accenture</p>
              </div>
            </div>

            {/* Middle: Mentor Direct Quote */}
            <div className="lg:col-span-4 py-4 lg:py-0 lg:px-6 lg:border-x lg:border-slate-200">
              <p className="text-xs sm:text-sm text-[#063F39] italic leading-relaxed">
                "Understanding pharmacovigilance means more than knowing the terminology. You need to understand how information moves through a safety workflow and how accuracy affects the quality of the final case."
              </p>
            </div>

            {/* Right: Video Masterclass Card */}
            <div className="lg:col-span-4">
              <a
                href={PV_MASTERCLASS_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("masterclass_click", { source: "section_08_card" })}
                className="group block p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200 hover:border-[#C2DDD7] transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#004B45] flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  </div>
                  <div className="min-w-0">
                    <strong className="text-xs font-bold text-[#063F39] block truncate">
                      Watch the Free Masterclass
                    </strong>
                    <span className="text-[11px] text-[#526B67] block truncate">
                      4 operational concepts walked through (24 min)
                    </span>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 09. CAREER GUIDANCE & NEXT STEPS ─────────────────────────────────── */}
      <section id="counselling" className="py-16 sm:py-24 bg-white tone-light card-light border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 text-left">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[#C2DDD7] bg-[#EBF5F3] px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-[#004B45] shadow-2xs tone-light card-light">
              <span className="w-1.5 h-1.5 rounded-full bg-[#008F83]" />
              <span>09 · CAREER GUIDANCE</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#063F39]">
              Document What You Have Learned.{" "}
              <span className="text-[#008F83]">
                Take Your Next Step.
              </span>
            </h2>
            <p className="text-sm sm:text-base text-[#526B67] leading-relaxed">
              Eligible participants who meet the completion requirements receive a program certificate and 1-on-1 guidance.
            </p>
          </div>

          {/* 3-Step Guidance Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 space-y-2">
              <span className="font-mono text-xs font-bold text-[#008F83]">STEP 01</span>
              <h3 className="font-bold text-base text-[#063F39]">Profile &amp; Degree Diagnostic</h3>
              <p className="text-xs text-[#526B67] leading-relaxed">
                Review your background, degree, and graduation year to confirm clinical eligibility for corporate drug safety roles.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 space-y-2">
              <span className="font-mono text-xs font-bold text-[#008F83]">STEP 02</span>
              <h3 className="font-bold text-base text-[#063F39]">Role &amp; Skill Gap Analysis</h3>
              <p className="text-xs text-[#526B67] leading-relaxed">
                Compare your current pharmacological profile against the practical requirements of Tier-1 CROs and MNCs.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 space-y-2">
              <span className="font-mono text-xs font-bold text-[#008F83]">STEP 03</span>
              <h3 className="font-bold text-base text-[#063F39]">Personalized Career Plan</h3>
              <p className="text-xs text-[#526B67] leading-relaxed">
                Get clear information on the 12-week schedule, portfolio deliverables, and cohort options to decide with confidence.
              </p>
            </div>
          </div>

          {/* Decisive CTA Conversion Banner */}
          <div className="p-8 sm:p-12 rounded-3xl bg-[#063F39] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 max-w-xl">
              <h3 className="text-2xl font-bold text-white">
                Ready to explore your{" "}
                <span className="text-[#008F83]">
                  pharmacovigilance fit?
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Speak directly with an Arzon career counsellor. No upfront commitments required.
              </p>
            </div>

            <button
              type="button"
              onClick={() => openCounsellor("counselling_banner")}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#008F83] hover:bg-[#00675D] text-white font-bold text-sm shadow-sm transition-all active:scale-[0.99] cursor-pointer shrink-0"
            >
              <Phone className="w-4 h-4" />
              <span>Talk to Experts</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ── 10. FREQUENTLY ASKED QUESTIONS ────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-[#F8FAFC] border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-left">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[#C2DDD7] bg-[#EBF5F3] px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-[#004B45] shadow-2xs tone-light card-light">
              <span className="w-1.5 h-1.5 rounded-full bg-[#008F83]" />
              <span>10 · FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#063F39]">
              Frequently Asked{" "}
              <span className="text-[#008F83]">
                Questions
              </span>
            </h2>
          </div>

          {/* 2-Column Clean Accordion Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            {BLUEPRINT_FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200/80 bg-white tone-light card-light overflow-hidden shadow-2xs transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="font-bold text-xs sm:text-sm text-[#063F39]">
                      {faq.q}
                    </span>
                    <div className="w-6 h-6 rounded-full bg-[#F4FAF8] border border-[#C2DDD7] flex items-center justify-center text-[#004B45] shrink-0">
                      {isOpen ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-[#526B67] leading-relaxed border-t border-slate-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 11. INSTITUTIONAL & REGULATORY TRANSPARENCY NOTICE ─────────────────── */}
      <section className="py-10 bg-white tone-light card-light border-b border-slate-200/80 text-xs text-[#64748B]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2 text-left">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#10B981]" />
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#081F38]">
              Institutional &amp; Regulatory Transparency Notice
            </span>
          </div>
          <p className="leading-relaxed">
            Arzon Careers provides professional skill preparation and career guidance. Program completion does not guarantee employment, specific salary bands, or interviews with particular employers. Admission, certificate requirements, and guidance support are governed by current program terms. Hiring decisions remain the sole discretion of respective employers.
          </p>
        </div>
      </section>

      {/* ── MOBILE STICKY ACTION DOCK (Shown only after scrolling past Hero fold) ────────────────────────────────────────── */}
      <div
        className={`sm:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 tone-light card-light backdrop-blur-md border-t border-[#DCE8E4] p-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out ${
          showStickyBar
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="text-left">
            <span className="text-[11px] font-bold text-[#063F39] block leading-tight">
              Exploring Pharmacovigilance?
            </span>
            <a
              href={PV_MASTERCLASS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-mono font-bold text-[#008F83] hover:underline inline-flex items-center gap-0.5"
            >
              <span>Watch Free Class</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>

          <button
            type="button"
            onClick={() => openCounsellor("mobile_sticky")}
            className="px-5 py-2.5 rounded-full bg-[#004B45] hover:bg-[#00675D] text-white font-bold text-xs shadow-sm transition-all active:scale-[0.98] cursor-pointer shrink-0"
          >
            Talk to Experts
          </button>
        </div>
      </div>
    </div>
  );
}
export default PVAssociateBlueprintPage;
