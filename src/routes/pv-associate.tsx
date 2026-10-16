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
} from "lucide-react";
import { COUNSELLOR_PHONE, SITE, absUrl } from "@/components/landing/constants";
import { trackEvent } from "@/lib/analytics";
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
      "Understand the pharmacovigilance role, see how drug safety cases are processed, and evaluate whether the 12-week practical pathway is right for your healthcare career transition. Mentored by Mohamed Kumail Abbas.";
    const url = `${SITE.origin}/pv-associate`;
    const og = absUrl(SITE.ogImage.inauguration);
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        {
          name: "keywords",
          content:
            "pharmacovigilance associate, drug safety associate, pv training, bpharm pharmacovigilance, pharmd drug safety, mpharm pv jobs, icsr case processing, meddra coding, mohamed kumail abbas, oracle argus safety",
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
  component: PVAssociateSignalPage,
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

// ── Real B.Pharm / Pharm.D Student Reviews ────────────────────────────────────
const STUDENT_REVIEWS = [
  {
    name: "Anya Tiwari",
    role: "B.Pharm · JSS College of Pharmacy, Ooty",
    avatar: "/images/testimonials/anya-tiwari.png",
    rating: 5,
    quote:
      "Comparing Pharmacovigilance against retail pharmacy gave me immediate career direction. The ICSR case exercises and MedDRA coding gave me the exact vocabulary needed for MNC technical rounds.",
  },
  {
    name: "Arun Jain",
    role: "B.Pharm · Dayanand Sagar College of Pharmacy",
    avatar: "/images/testimonials/arun-jain.png",
    rating: 5,
    quote:
      "The practical exposure to ADR reporting, Day-0 clock rules, and MedDRA hierarchy coding gave me immense confidence to answer scenario-based questions at Tier-1 CROs.",
  },
  {
    name: "Sneha Rao",
    role: "B.Pharm · Osmania University, Hyderabad",
    avatar: "/images/testimonials/sneha-rao.jpg",
    rating: 5,
    quote:
      "Learning directly how information moves through a drug safety workflow—from case triage to narrative drafting—was completely different from textbook memorization.",
  },
  {
    name: "Pooja Patel",
    role: "Pharm.D · JSS College of Pharmacy, Ooty",
    avatar: "/images/testimonials/pooja-patel.jpg",
    rating: 5,
    quote:
      "Having verified case deliverables in my portfolio proved to recruiters that I understand case validity, seriousness criteria, and expedited reporting timelines.",
  },
];

// ── Focused FAQs ─────────────────────────────────────────────────────────────
const FOCUSED_FAQS = [
  {
    q: "Who is eligible for this pharmacovigilance pathway?",
    a: "The program is designed for graduates and final-year students of B.Pharm, M.Pharm, Pharm.D, MBBS, BDS, and Life Sciences (B.Sc/M.Sc). Your background provides the foundational knowledge of pharmacology and human biology required for safety work.",
  },
  {
    q: "How does pharmacovigilance compare to retail pharmacy or sales?",
    a: "Pharmacovigilance is an analytical, corporate role conducted in global pharma Global Capability Centers (GCCs) and CROs. It typically follows regular business hours (Monday to Friday) and focuses on clinical data assessment, medical coding, and regulatory documentation rather than commercial sales or counter dispensing.",
  },
  {
    q: "What will I actually produce during the 12 weeks?",
    a: "You will build four tangible portfolio work samples from simulated, de-identified clinical cases: (1) an ICSR Triage and Validity Review, (2) a MedDRA 27.0 Hierarchy Coding Record, (3) a CIOMS I Structured Clinical Narrative, and (4) an Expedited Regulatory Reporting Assessment.",
  },
  {
    q: "Does Arzon guarantee a job offer?",
    a: "No. Arzon provides practical role training, hands-on portfolio preparation, and interview guidance. We do not make false 100% placement promises. Hiring decisions are made solely by prospective employers based on their requirements and your performance in interviews.",
  },
  {
    q: "What happens during the career counselling call?",
    a: "The consultation is a zero-pressure, 15-minute diagnostic. Our counsellor reviews your degree and year of passing, answers your specific questions about drug safety roles, outlines current cohort schedules and fees, and helps you evaluate if the pathway fits your career goals.",
  },
];

// ── Representative Case Demonstration Stages ─────────────────────────────────
const CASE_DEMO_STAGES = [
  {
    id: "01",
    stage: "01. Intake & Day 0",
    title: "Case Intake & Receipt Clock",
    desc: "Safety information arrives from a treating physician reporting an adverse reaction. The primary task is verifying receipt details and establishing the Day 0 clock that governs regulatory submission timelines.",
    sourceData: {
      type: "Spontaneous Hospital Report",
      patient: "Female, 54 Yrs (M.K.)",
      suspectDrug: "CardioVas® (Lisinopril 20mg Tablet)",
      reaction: "Acute facial swelling and respiratory tightness within 4 hours of dose",
      day0Date: "14-Oct-2026 · Receipt Timestamp Logged",
    },
    deliverable: "Day 0 Initial Case Receipt Log",
  },
  {
    id: "02",
    stage: "02. Validity & Triage",
    title: "The 4 Minimum Criteria & Seriousness",
    desc: "A report is legally valid only if it includes: (1) an identifiable patient, (2) an identifiable reporter, (3) a suspect medicinal product, and (4) an adverse reaction. If all four exist, seriousness criteria are assessed to determine urgency.",
    sourceData: {
      criteria1: "Patient: Female, 54 Yrs (Initials M.K.) [VALID]",
      criteria2: "Reporter: Dr. S. Nair, MD (Cardiologist) [VALID]",
      criteria3: "Suspect Drug: Lisinopril 20mg OD [VALID]",
      criteria4: "Event: Angioedema with acute laryngeal edema [VALID]",
      seriousness: "SERIOUS: Required Emergency Hospitalization & IV Epinephrine",
    },
    deliverable: "Validated ICSR Triage Dossier",
  },
  {
    id: "03",
    stage: "03. MedDRA Coding",
    title: "Medical Terminology Hierarchy",
    desc: "Reported symptoms are classified using the 5-tier MedDRA hierarchy to standardize clinical data across international safety databases like FDA FAERS and EMA EudraVigilance.",
    sourceData: {
      verbatim: "Severe facial and lip swelling with throat tightness",
      llt: "Lowest Level Term: Swelling of lips and face [10024561]",
      pt: "Preferred Term: Angioedema [10002424]",
      soc: "System Organ Class: Immune system disorders [10021428]",
    },
    deliverable: "MedDRA 27.0 Classification Sheet",
  },
  {
    id: "04",
    stage: "04. Clinical Narrative",
    title: "Chronological Case Narrative",
    desc: "The case is synthesized into a clear, structured clinical narrative in international CIOMS I format, detailing the patient's history, treatment timeline, dechallenge, and clinical outcome.",
    narrativeText:
      "A 54-year-old female patient with hypertension developed acute angioedema and throat tightness 4 hours post-dose of Lisinopril 20mg. Permanent discontinuation of Lisinopril resulted in complete resolution within 18 hours following emergency IV epinephrine (positive dechallenge). The cardiologist assessed causality as probable.",
    deliverable: "CIOMS I Structured Case Narrative",
  },
  {
    id: "05",
    stage: "05. Regulatory Reporting",
    title: "Regulatory Gateway Submission",
    desc: "Because the case is serious and unexpected (SUSAR), mandatory expedited reporting applies. An electronic E2B(R3) XML package must be submitted to regulatory authorities within 15 calendar days of Day 0.",
    sourceData: {
      clock: "15 Calendar Days from Day 0",
      deadline: "29-Oct-2026, 23:59 GMT",
      destination: "US FDA MedWatch 3500A & EMA Gateway",
      status: "E2B(R3) Electronic Package Validated for Transmission",
    },
    deliverable: "Expedited Reporting Decision Record",
  },
];

// ── Main Component ───────────────────────────────────────────────────────────
function PVAssociateSignalPage() {
  const [isCounsellorModalOpen, setIsCounsellorModalOpen] = useState(false);
  const [activeCaseStage, setActiveCaseStage] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Counsellor Form State: Short, qualified enquiry
  const [counsellorForm, setCounsellorForm] = useState({
    name: "",
    phone: "",
    degree: DEGREES[0],
    year: PASSING_YEARS[0],
    question: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    trackEvent("pv_page_view", {
      path: "/pv-associate",
      source: "signal_rebuild_v1",
    });
  }, []);

  const openCounsellor = (triggerSource = "direct") => {
    trackEvent("counsellor_modal_open", { source: triggerSource });
    setFormSubmitted(false);
    setIsCounsellorModalOpen(true);
  };

  const handleCounsellorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!counsellorForm.name.trim() || !counsellorForm.phone.trim()) return;

    setIsSubmitting(true);
    trackEvent("counsellor_form_submit", {
      degree: counsellorForm.degree,
      year: counsellorForm.year,
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      try {
        const text = `Hi Arzon Guidance Team! I would like to speak to a counsellor about the Pharmacovigilance 12-Week Pathway:\nName: ${counsellorForm.name}\nPhone: ${counsellorForm.phone}\nDegree: ${counsellorForm.degree} (${counsellorForm.year})\nQuestion: ${counsellorForm.question || "Discussing eligibility and curriculum"}`;
        window.open(waMsg(text), "_blank");
      } catch {}
    }, 400);
  };

  const currentCase = CASE_DEMO_STAGES[activeCaseStage];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#081F38] font-sans antialiased selection:bg-[#2563EB] selection:text-white">
      {/* ── 01. THE PROPOSITION (SIMPLIFIED HERO) ───────────────────────────── */}
      <section className="relative overflow-hidden bg-white tone-light card-light border-b border-slate-200/80 pt-10 pb-16 sm:pt-16 sm:pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-center sm:text-left">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-mono text-[#64748B]">
            <Link to="/" className="hover:text-[#081F38] transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link to="/courses" className="hover:text-[#081F38] transition-colors">Programmes</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#081F38] font-bold">Pharmacovigilance Associate</span>
          </nav>

          <div className="space-y-6 max-w-4xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E6F7F1] border border-[#10B981]/25 text-[#081F38] font-mono text-xs font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
              PHARMACOVIGILANCE CAREER PATHWAY · 12 WEEKS
            </span>

            <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-bold tracking-tight text-[#081F38] leading-[1.1]">
              Explore a Career in Pharmacovigilance. Understand the Work Before You Decide.
            </h1>

            <p className="text-base sm:text-lg text-[#64748B] font-normal leading-relaxed max-w-3xl">
              Pharmacovigilance professionals help monitor medicine safety by reviewing adverse-event information, documenting cases, and supporting regulatory safety reporting. Explore the role, understand the practical skills involved, and learn how structured case-based preparation can help you prepare for relevant entry-level opportunities.
            </p>
          </div>

          {/* Primary Action & Supporting Masterclass Link */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <button
              type="button"
              onClick={() => openCounsellor("hero_primary")}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-sm shadow-sm transition-all active:scale-[0.99] cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>Talk to a Career Counsellor</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={PV_MASTERCLASS_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("masterclass_click", { source: "hero_secondary" })}
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white tone-light card-light border border-slate-200/80 hover:bg-[#F8FAFC] text-[#081F38] font-bold text-sm shadow-2xs transition-all active:scale-[0.99] cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current text-[#2563EB]" />
              <span>Watch the Free Masterclass</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#64748B]" />
            </a>
          </div>

          {/* Audience & Key Prerequisites */}
          <div className="pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#64748B]">
            <p>
              <strong className="text-[#081F38]">Audience:</strong> For eligible B.Pharm, M.Pharm, Pharm.D, MBBS, BDS, and Life Sciences graduates.
            </p>
            <div className="flex items-center gap-4 text-[11px] font-mono">
              <span>• 12-Week Structured Track</span>
              <span>• Case-Based Learning</span>
              <span>• 1-on-1 Interview Preparation</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 02. UNDERSTAND THE CAREER (ROLE & OPERATIONAL ENVIRONMENT) ──────── */}
      <section className="py-16 sm:py-24 bg-[#F8FAFC] border-b border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="space-y-4 max-w-3xl">
            <span className="font-mono text-xs font-bold text-[#2563EB] uppercase tracking-widest block">
              01 · UNDERSTAND THE CAREER
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#081F38]">
              Your Pharmacy Degree Can Lead to More Than You Think.
            </h2>
            <div className="space-y-3 text-sm sm:text-base text-[#64748B] leading-relaxed">
              <p>
                Medicines save lives, but their safety must continue to be monitored throughout their commercial clinical use. Pharmacovigilance is the specialized discipline responsible for detecting, assessing, understanding, and preventing adverse reactions and medicine-related issues.
              </p>
              <p>
                Unlike retail pharmacy dispensing or field pharmaceutical sales, drug safety associates work in corporate clinical technology centers. They review medical case histories, code diagnoses using international terminologies, evaluate seriousness criteria, and prepare compliance reports for regulatory agencies like the US FDA and European EMA.
              </p>
            </div>
          </div>

          {/* Career Setting Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-7 rounded-2xl bg-white tone-light card-light border border-slate-200/80 space-y-4 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#64748B] uppercase">Academic Default</span>
                <span className="text-xs font-mono text-[#64748B]">Retail &amp; Sales</span>
              </div>
              <h3 className="text-xl font-bold text-[#081F38]">Retail Pharmacy &amp; Field Sales</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-[#64748B]">
                <li className="flex items-start gap-2">
                  <span className="text-slate-400">•</span>
                  <span><strong>Work Setting:</strong> Standing retail counters, patient prescription dispensing, or daily field medical rep visits.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-400">•</span>
                  <span><strong>Schedule:</strong> 6-day rotational shifts or high-pressure monthly sales targets.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-400">•</span>
                  <span><strong>Career Trajectory:</strong> Store management or regional territory sales with frequent growth ceilings.</span>
                </li>
              </ul>
            </div>

            <div className="p-7 rounded-2xl bg-[#EEF6FF] border border-[#BFDBFE] space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#2563EB] uppercase">Clinical Track</span>
                <span className="text-xs font-mono font-bold text-[#2563EB]">Corporate MNC</span>
              </div>
              <h3 className="text-xl font-bold text-[#081F38]">Corporate Drug Safety Associate</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-[#081F38]">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                  <span><strong>Work Setting:</strong> Modern Global Capability Centers (GCCs) and Tier-1 CROs (e.g. Cognizant, Quintiles, Accenture).</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                  <span><strong>Schedule:</strong> Structured Monday-to-Friday schedule focused on analytical case documentation.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                  <span><strong>Career Trajectory:</strong> Safety Associate ➔ Senior Associate ➔ Quality Reviewer ➔ Operations Lead ➔ Safety Manager.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 5 Core Responsibilities */}
          <div className="space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-[#081F38]">
              What does a Drug Safety Associate actually do?
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  title: "Process Safety Reports",
                  desc: "Review incoming adverse reaction reports and verify whether they satisfy minimum criteria for a valid safety case.",
                },
                {
                  title: "Evaluate Case Information",
                  desc: "Assess medical seriousness, expectedness against reference safety documents, and potential causality.",
                },
                {
                  title: "Code Medical Terminology",
                  desc: "Map reported symptoms and diagnoses to standardized terms using the international MedDRA hierarchy.",
                },
                {
                  title: "Document Case Narratives",
                  desc: "Synthesize clinical records into clear, chronological narratives following standardized CIOMS formats.",
                },
                {
                  title: "Support Regulatory Compliance",
                  desc: "Follow strict Standard Operating Procedures (SOPs) and respect mandatory health authority reporting clocks.",
                },
                {
                  title: "Role Variability Note",
                  desc: "Daily tasks vary by organization, commercial safety database, therapeutic area, and level of experience.",
                  isNote: true,
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`p-5 rounded-xl border ${
                    item.isNote
                      ? "bg-[#F8FAFC] border-slate-200 border-dashed text-[#64748B]"
                      : "bg-white tone-light card-light border-slate-200/80 shadow-2xs"
                  }`}
                >
                  <h4 className="font-bold text-sm sm:text-base text-[#081F38] mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 03. SEE THE WORK (ONE REPRESENTATIVE CASE DEMONSTRATION) ────────── */}
      <section id="case-study" className="py-16 sm:py-24 bg-white tone-light card-light border-b border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="space-y-4 max-w-3xl">
            <span className="font-mono text-xs font-bold text-[#2563EB] uppercase tracking-widest block">
              02 · SEE THE WORK IN ACTION
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#081F38]">
              What Does a Pharmacovigilance Case Involve?
            </h2>
            <p className="text-base text-[#64748B] leading-relaxed">
              A safety case moves through defined operational stages—from initial receipt to quality sign-off. Below is one representative, fictional clinical case showing what is reviewed at each stage and what you practise documenting.
            </p>
          </div>

          {/* Unified Representative Case Interface */}
          <div className="rounded-3xl border border-slate-200/80 bg-[#F8FAFC] shadow-sm overflow-hidden">
            {/* Stage Selector Header */}
            <div className="p-3 bg-white tone-light card-light border-b border-slate-200/80 overflow-x-auto scrollbar-none">
              <div className="flex items-center gap-1.5 min-w-max">
                {CASE_DEMO_STAGES.map((st, idx) => (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => {
                      setActiveCaseStage(idx);
                      trackEvent("case_stage_select", { stage: st.id });
                    }}
                    className={`px-4 py-2 rounded-full text-xs font-bold font-mono transition-all cursor-pointer ${
                      activeCaseStage === idx
                        ? "bg-[#2563EB] text-white shadow-xs"
                        : "text-[#64748B] hover:text-[#081F38] hover:bg-slate-100"
                    }`}
                  >
                    {st.stage}
                  </button>
                ))}
              </div>
            </div>

            {/* Stage Display Area */}
            <div className="p-6 sm:p-10 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200/80">
                <div>
                  <span className="font-mono text-xs font-bold text-[#2563EB]">
                    STAGE {currentCase.id} OF 05
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#081F38]">
                    {currentCase.title}
                  </h3>
                </div>

                <div className="text-xs font-mono text-[#64748B]">
                  Portfolio Output: <strong className="text-[#081F38]">{currentCase.deliverable}</strong>
                </div>
              </div>

              <p className="text-sm text-[#64748B] leading-relaxed">
                {currentCase.desc}
              </p>

              {/* Simulated Record Card */}
              <div className="p-5 rounded-2xl bg-white tone-light card-light border border-slate-200/80 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="font-bold text-[#081F38] flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#2563EB]" />
                    Case File: ARZ-PV-2026-042 (De-identified Practice Scenario)
                  </span>
                  <span className="text-[#10B981] font-bold">✓ Active Case File</span>
                </div>

                {currentCase.sourceData && (
                  <div className="space-y-1.5 pt-1">
                    {Object.entries(currentCase.sourceData).map(([k, v], vIdx) => (
                      <div key={vIdx} className="p-2 rounded-lg bg-[#F8FAFC] border border-slate-200/60 flex items-center justify-between">
                        <span className="text-[#64748B] capitalize">{k}:</span>
                        <strong className="text-[#081F38] text-right">{v}</strong>
                      </div>
                    ))}
                  </div>
                )}

                {currentCase.narrativeText && (
                  <div className="p-3.5 rounded-lg bg-[#F8FAFC] border border-slate-200/60 font-sans text-xs text-[#081F38] leading-relaxed">
                    "{currentCase.narrativeText}"
                  </div>
                )}
              </div>

              {/* Bottom Navigation */}
              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  disabled={activeCaseStage === 0}
                  onClick={() => setActiveCaseStage((prev) => Math.max(0, prev - 1))}
                  className="px-4 py-2 rounded-full border border-slate-200 bg-white tone-light text-xs font-bold font-mono text-[#081F38] hover:bg-[#F8FAFC] disabled:opacity-30 cursor-pointer"
                >
                  ← Previous Stage
                </button>
                <button
                  type="button"
                  disabled={activeCaseStage === CASE_DEMO_STAGES.length - 1}
                  onClick={() => setActiveCaseStage((prev) => Math.min(CASE_DEMO_STAGES.length - 1, prev + 1))}
                  className="px-5 py-2 rounded-full bg-[#2563EB] text-white text-xs font-bold font-mono hover:bg-[#1D4ED8] disabled:opacity-30 cursor-pointer"
                >
                  Next Stage →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 04. UNDERSTAND YOUR SKILL GAPS (THEORY VS PRACTICE) ─────────────── */}
      <section className="py-16 sm:py-24 bg-[#F8FAFC] border-b border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="space-y-4 max-w-3xl">
            <span className="font-mono text-xs font-bold text-[#2563EB] uppercase tracking-widest block">
              03 · UNDERSTAND YOUR SKILL GAPS
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#081F38]">
              Knowing Pharmacology Is One Thing. Applying It to Drug Safety Is Another.
            </h2>
            <p className="text-base text-[#64748B] leading-relaxed">
              Your degree gives you an excellent scientific grounding in medicines, anatomy, and clinical pathology. However, entry-level drug safety roles require applying that foundation to operational workflows, medical coding rules, and regulatory timelines.
            </p>
          </div>

          {/* Academic vs Operational Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-7 rounded-2xl bg-white tone-light card-light border border-slate-200/80 space-y-4">
              <span className="font-mono text-xs font-bold text-[#64748B] uppercase">Academic Syllabus Focus</span>
              <h3 className="font-bold text-lg text-[#081F38]">Theoretical Knowledge (What You Know)</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-[#64748B]">
                <li className="flex items-start gap-2">
                  <span className="text-slate-400">•</span>
                  <span>Mechanism of drug action and receptor binding kinetics</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-400">•</span>
                  <span>Pharmacokinetics, bioavailability, and drug-drug interactions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-400">•</span>
                  <span>General pathology and disease manifestations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-400">•</span>
                  <span>Basic textbook definitions of adverse drug reactions</span>
                </li>
              </ul>
            </div>

            <div className="p-7 rounded-2xl bg-white tone-light card-light border border-slate-200/80 space-y-4">
              <span className="font-mono text-xs font-bold text-[#2563EB] uppercase">Clinical Operations Focus</span>
              <h3 className="font-bold text-lg text-[#081F38]">Practical Skills (What You Need to Practise)</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-[#081F38]">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                  <span>Validating the 4 minimum ICSR criteria and recording Day-0 timelines</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                  <span>Classifying symptoms using the 5-tier MedDRA coding hierarchy</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                  <span>Drafting structured clinical case narratives in CIOMS I format</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                  <span>Differentiating 15-day expedited versus periodic safety update reports</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 4 Skill Domains */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-5 rounded-xl bg-white tone-light card-light border border-slate-200/80 space-y-2">
              <strong className="text-sm font-bold text-[#081F38] block">1. Core Knowledge</strong>
              <p className="text-[#64748B]">Pharmacology, causality assessment principles, and global regulatory frameworks.</p>
            </div>
            <div className="p-5 rounded-xl bg-white tone-light card-light border border-slate-200/80 space-y-2">
              <strong className="text-sm font-bold text-[#081F38] block">2. Practical Tasks</strong>
              <p className="text-[#64748B]">Case review, MedDRA mapping, narrative synthesis, and quality review checks.</p>
            </div>
            <div className="p-5 rounded-xl bg-white tone-light card-light border border-slate-200/80 space-y-2">
              <strong className="text-sm font-bold text-[#081F38] block">3. Safety Systems</strong>
              <p className="text-[#64748B]">Familiarity with the architecture and workflows of safety databases like Oracle Argus.</p>
            </div>
            <div className="p-5 rounded-xl bg-white tone-light card-light border border-slate-200/80 space-y-2">
              <strong className="text-sm font-bold text-[#081F38] block">4. Professional Skills</strong>
              <p className="text-[#64748B]">Precision documentation, standard operating procedure adherence, and data confidentiality.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 05. UNDERSTAND THE PROGRAMME (12-WEEK TRACK, MENTOR & CERTIFICATE) ─ */}
      <section id="curriculum" className="py-16 sm:py-24 bg-white tone-light card-light border-b border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="space-y-4 max-w-3xl">
            <span className="font-mono text-xs font-bold text-[#2563EB] uppercase tracking-widest block">
              04 · THE 12-WEEK LEARNING PATHWAY
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#081F38]">
              A Structured Pathway to Bridge Theory into Operations.
            </h2>
            <p className="text-base text-[#64748B] leading-relaxed">
              Organized into three distinct learning phases, progressing from fundamental concepts to hands-on case processing, portfolio deliverables, and technical interview preparation.
            </p>
          </div>

          {/* 3 Learning Phases */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-7 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="font-mono text-xs font-bold text-[#2563EB]">PHASE 01 · WEEKS 1–4</span>
                <h3 className="text-lg font-bold text-[#081F38]">Drug Safety Foundations</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Understand the regulatory architecture of pharmacovigilance, adverse event classifications, and the minimum criteria for valid ICSRs.
                </p>
                <div className="pt-2 border-t border-slate-200/60 text-xs text-[#64748B] space-y-1">
                  <div>• ICSR intake and Day 0 clock</div>
                  <div>• Seriousness and reportability rules</div>
                  <div>• Causality evaluation concepts</div>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-white tone-light card-light border border-slate-200 text-xs font-mono text-[#081F38]">
                Milestone: Valid ICSR Triage Record
              </div>
            </div>

            <div className="p-7 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="font-mono text-xs font-bold text-[#2563EB]">PHASE 02 · WEEKS 5–8</span>
                <h3 className="text-lg font-bold text-[#081F38]">Case Processing &amp; MedDRA</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Apply terminology coding rules and understand how case data is organized inside commercial safety database workflows.
                </p>
                <div className="pt-2 border-t border-slate-200/60 text-xs text-[#64748B] space-y-1">
                  <div>• MedDRA 27.0 hierarchy coding</div>
                  <div>• Data review and field consistency</div>
                  <div>• Safety database concepts (Argus)</div>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-white tone-light card-light border border-slate-200 text-xs font-mono text-[#081F38]">
                Milestone: MedDRA Coding Record
              </div>
            </div>

            <div className="p-7 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="font-mono text-xs font-bold text-[#2563EB]">PHASE 03 · WEEKS 9–12</span>
                <h3 className="text-lg font-bold text-[#081F38]">Narrative &amp; Career Prep</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Synthesize complete medical narratives, conduct quality reviews, and prepare to answer technical interview scenarios.
                </p>
                <div className="pt-2 border-t border-slate-200/60 text-xs text-[#64748B] space-y-1">
                  <div>• Structured CIOMS I narrative drafting</div>
                  <div>• Pre-submission quality audits</div>
                  <div>• Role-focused interview preparation</div>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-white tone-light card-light border border-slate-200 text-xs font-mono text-[#081F38]">
                Milestone: 4 Verified Portfolio Samples
              </div>
            </div>
          </div>

          {/* Lead Mentor & Masterclass Evidence */}
          <div className="p-8 rounded-3xl bg-[#F8FAFC] border border-slate-200/80 space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <img
                src={mentorKumailImg}
                alt="Mohamed Kumail Abbas"
                className="w-20 h-20 rounded-2xl object-cover object-top border border-slate-200 shrink-0"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-[#081F38]">
                    Mohamed Kumail Abbas, M.Pharm
                  </h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#E6F7F1] text-[#10B981]">
                    Lead Mentor
                  </span>
                </div>
                <p className="text-sm font-semibold text-[#2563EB]">
                  Manager, Pharmacovigilance Operations
                </p>
                <p className="text-xs text-[#64748B]">
                  15+ years across Cognizant, Quintiles, Accenture, Indegene, and Novaspire. Mentors learners on practical workflows, quality standards, and technical interviews.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white tone-light card-light border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-0.5">
                <strong className="text-sm font-bold text-[#081F38] block">
                  Watch Mohamed Kumail Abbas Walk Through ICSR Triage
                </strong>
                <span className="text-xs text-[#64748B]">
                  See the actual teaching style before enrolling. Masterclass recording begins at timestamp 11:30.
                </span>
              </div>

              <a
                href={PV_MASTERCLASS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs uppercase tracking-wider transition-colors shrink-0"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Watch Free Masterclass ↗</span>
              </a>
            </div>
          </div>

          {/* Certificate & Verification Note */}
          <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#64748B]">
            <div className="space-y-1">
              <strong className="text-[#081F38] text-sm block">Certificate of Completion &amp; Transcript</strong>
              <p>Eligible graduates who complete all 12 weeks of assignments receive an official Arzon Global credential documenting role readiness and lab hours.</p>
            </div>
            <span className="font-mono text-[11px] text-[#2563EB] bg-[#EEF6FF] px-3 py-1.5 rounded-lg border border-[#BFDBFE] shrink-0 font-bold">
              Digital QR Verification Included
            </span>
          </div>
        </div>
      </section>

      {/* ── 06. BUILD TRUST WITH EVIDENCE (ALUMNI REVIEWS) ──────────────────── */}
      <section className="py-16 sm:py-24 bg-[#F8FAFC] border-b border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="space-y-4 max-w-3xl">
            <span className="font-mono text-xs font-bold text-[#2563EB] uppercase tracking-widest block">
              05 · LEARNER FEEDBACK
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#081F38]">
              Hear from Pharmacy Graduates.
            </h2>
            <p className="text-base text-[#64748B] leading-relaxed">
              Read how fellow B.Pharm and Pharm.D graduates evaluated the role, developed practical confidence, and prepared for technical interview rounds.
            </p>
          </div>

          {/* 4 Authentic Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            {STUDENT_REVIEWS.map((st, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white tone-light card-light border border-slate-200/80 space-y-4 flex flex-col justify-between shadow-2xs"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center gap-1 text-[#F59E0B]">
                    {[...Array(st.rating)].map((_, rIdx) => (
                      <Star key={rIdx} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-[#64748B] italic leading-relaxed">
                    "{st.quote}"
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center gap-2.5">
                  <img
                    src={st.avatar}
                    alt={st.name}
                    className="w-8 h-8 rounded-full object-cover border border-slate-200 shrink-0"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                  <div className="min-w-0">
                    <h5 className="font-bold text-xs text-[#081F38] truncate">{st.name}</h5>
                    <p className="text-[10px] text-[#64748B] truncate">{st.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-[11px] font-mono text-[#64748B] italic">
            *Testimonials reflect the personal experiences of individual graduates. Career outcomes depend on individual academic background, interview performance, and employer vacancies.
          </p>
        </div>
      </section>

      {/* ── 07. MAKE THE NEXT STEP CLEAR (COUNSELLING & FAQS) ─────────────────── */}
      <section id="counselling" className="py-16 sm:py-24 bg-white tone-light card-light border-b border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="space-y-4 max-w-3xl">
            <span className="font-mono text-xs font-bold text-[#2563EB] uppercase tracking-widest block">
              06 · NEXT STEPS
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#081F38]">
              Understand Your Options Before You Commit.
            </h2>
            <p className="text-base text-[#64748B] leading-relaxed">
              Not sure whether pharmacovigilance is the right direction for you? Speak with our career guidance team to understand the role, discuss your educational background, and evaluate the pathway before making any decision.
            </p>
          </div>

          {/* 3-Step Consultation Flow */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 space-y-2">
              <span className="font-mono text-xs font-bold text-[#2563EB]">STEP 01</span>
              <h3 className="font-bold text-base text-[#081F38]">Share Your Background</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Submit your degree, passing year, and current career questions through our quick 1-minute form.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 space-y-2">
              <span className="font-mono text-xs font-bold text-[#2563EB]">STEP 02</span>
              <h3 className="font-bold text-base text-[#081F38]">15-Minute Guidance Call</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                A structured, zero-pressure diagnostic conversation covering role expectations, your eligibility, and practical curriculum details.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 space-y-2">
              <span className="font-mono text-xs font-bold text-[#2563EB]">STEP 03</span>
              <h3 className="font-bold text-base text-[#081F38]">Informed Next Step</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Receive clear program terms, fee schedules, and cohort options to decide whether to proceed or explore other clinical tracks.
              </p>
            </div>
          </div>

          {/* Decisive CTA Banner */}
          <div className="p-8 sm:p-12 rounded-3xl bg-[#081F38] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 max-w-xl">
              <h3 className="text-2xl font-bold text-white">
                Ready to explore your pharmacovigilance fit?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Speak directly with an Arzon career counsellor. No upfront commitments required.
              </p>
            </div>

            <button
              type="button"
              onClick={() => openCounsellor("counselling_section")}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-sm shadow-sm transition-all active:scale-[0.99] cursor-pointer shrink-0"
            >
              <Phone className="w-4 h-4" />
              <span>Talk to a Career Counsellor</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Focused FAQs */}
          <div className="space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold text-[#081F38]">
              Frequently Asked Questions
            </h3>

            <div className="space-y-3">
              {FOCUSED_FAQS.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl border border-slate-200/80 bg-white tone-light card-light overflow-hidden shadow-2xs transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                      aria-expanded={isOpen}
                    >
                      <span className="font-bold text-sm sm:text-base text-[#081F38]">
                        {faq.q}
                      </span>
                      <div className="w-7 h-7 rounded-full bg-[#F8FAFC] border border-slate-200 flex items-center justify-center text-[#2563EB] shrink-0">
                        {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-[#64748B] leading-relaxed border-t border-slate-100 pt-4">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── INSTITUTIONAL COMPLIANCE & TRANSPARENCY NOTICE ─────────────────────── */}
      <section className="py-10 bg-[#F8FAFC] border-t border-slate-200/80 text-xs text-[#64748B]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2">
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

      {/* ── MOBILE STICKY ACTION DOCK ────────────────────────────────────────── */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 tone-light card-light backdrop-blur-md border-t border-slate-200/80 p-3 shadow-lg">
        <div className="flex items-center justify-between gap-3">
          <div className="text-left">
            <span className="text-[11px] font-bold text-[#081F38] block leading-tight">
              Exploring Pharmacovigilance?
            </span>
            <a
              href={PV_MASTERCLASS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-mono font-bold text-[#2563EB] hover:underline inline-flex items-center gap-0.5"
            >
              <span>Watch Free Class</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>

          <button
            type="button"
            onClick={() => openCounsellor("mobile_sticky")}
            className="px-5 py-2.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs shadow-sm transition-all active:scale-[0.98] cursor-pointer shrink-0"
          >
            Talk to a Counsellor
          </button>
        </div>
      </div>

      {/* ── QUALIFIED COUNSELLOR CALLBACK MODAL ───────────────────────────────── */}
      {isCounsellorModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsCounsellorModalOpen(false);
          }}
        >
          <div className="relative w-full max-w-lg rounded-3xl bg-white tone-light card-light p-6 sm:p-8 shadow-2xl border border-slate-200/80 space-y-6 my-auto text-left">
            <button
              type="button"
              onClick={() => setIsCounsellorModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#081F38] transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1.5 pr-8">
              <span className="px-2.5 py-0.5 rounded-full bg-[#EEF6FF] border border-[#2563EB]/30 font-mono text-[10px] font-bold text-[#2563EB] uppercase tracking-wider">
                ARZON CAREER ADVISORY · 1-ON-1 GUIDANCE
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#081F38]">
                Talk to a Career Counsellor
              </h3>
              <p className="text-xs sm:text-sm text-[#64748B]">
                Discuss your eligibility, current skill gaps and the 12-week Pharmacovigilance learning pathway.
              </p>
            </div>

            {formSubmitted ? (
              <div className="p-6 rounded-2xl bg-[#E6F7F1] border border-[#10B981]/30 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#10B981] text-white flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <h4 className="font-bold text-base text-[#081F38]">
                  Request Submitted Successfully
                </h4>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  Our guidance counsellor will connect with you on WhatsApp shortly. You can also message us directly right now.
                </p>
                <div className="pt-2">
                  <a
                    href={waMsg(
                      `Hi Arzon Team! I requested a callback for Pharmacovigilance Associate training. My name is ${counsellorForm.name}.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#10B981] hover:bg-[#059669] text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Chat on WhatsApp Now</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleCounsellorSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#081F38] mb-1 font-mono uppercase tracking-wider">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={counsellorForm.name}
                    onChange={(e) => setCounsellorForm({ ...counsellorForm, name: e.target.value })}
                    placeholder="e.g. Rahul Bathula"
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-white tone-light text-sm text-[#081F38] placeholder:text-[#64748B]/60 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#081F38] mb-1 font-mono uppercase tracking-wider">
                    WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={counsellorForm.phone}
                    onChange={(e) => setCounsellorForm({ ...counsellorForm, phone: e.target.value })}
                    placeholder="e.g. 98765 43210"
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-white tone-light text-sm text-[#081F38] placeholder:text-[#64748B]/60 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#081F38] mb-1 font-mono uppercase tracking-wider">
                      Degree Background *
                    </label>
                    <select
                      value={counsellorForm.degree}
                      onChange={(e) => setCounsellorForm({ ...counsellorForm, degree: e.target.value })}
                      className="w-full h-11 px-3 rounded-xl border border-slate-200 bg-white tone-light text-xs text-[#081F38] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all cursor-pointer"
                    >
                      {DEGREES.map((deg) => (
                        <option key={deg} value={deg}>{deg}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#081F38] mb-1 font-mono uppercase tracking-wider">
                      Batch / Passing Year *
                    </label>
                    <select
                      value={counsellorForm.year}
                      onChange={(e) => setCounsellorForm({ ...counsellorForm, year: e.target.value })}
                      className="w-full h-11 px-3 rounded-xl border border-slate-200 bg-white tone-light text-xs text-[#081F38] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all cursor-pointer"
                    >
                      {PASSING_YEARS.map((yr) => (
                        <option key={yr} value={yr}>{yr}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#081F38] mb-1 font-mono uppercase tracking-wider">
                    What is your main career question or goal?
                  </label>
                  <input
                    type="text"
                    value={counsellorForm.question}
                    onChange={(e) => setCounsellorForm({ ...counsellorForm, question: e.target.value })}
                    placeholder="e.g. Is PV right for my B.Pharm background? When does next batch start?"
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-white tone-light text-xs text-[#081F38] placeholder:text-[#64748B]/60 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.99] cursor-pointer disabled:opacity-50"
                  >
                    <span>{isSubmitting ? "Connecting..." : "Request Free Career Call →"}</span>
                  </button>
                </div>

                <p className="text-[11px] text-[#64748B] text-center">
                  Zero spam. We only contact you to discuss your eligibility and program pathway.
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
export default PVAssociateSignalPage;
