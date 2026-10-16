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
  MapPin,
  TrendingUp,
  Compass,
  Stethoscope,
  Layers,
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

// ── Route Definition ─────────────────────────────────────────────────────────
export const Route = createFileRoute("/pv-associate")({
  head: () => {
    const title = "Pharmacovigilance & Drug Safety Associate 12-Week Pathway | Arzon Global";
    const desc =
      "Build the skills to start your career in Pharmacovigilance. A 12-week structured learning pathway for B.Pharm, M.Pharm, Pharm.D, MBBS, BDS, and Life Sciences graduates mentored by Mohamed Kumail Abbas (Manager, PV Operations; Ex-Cognizant, Quintiles).";
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
  component: PVAssociateMinimalPage,
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

// ── FAQs Data (Verbatim from User Master Copy) ────────────────────────────────
const FAQS = [
  {
    q: "What is pharmacovigilance?",
    a: "Pharmacovigilance is the science and set of activities concerned with detecting, assessing, understanding and preventing adverse effects and other medicine-related problems.",
  },
  {
    q: "Who can apply for the program?",
    a: "The proposed audience includes B.Pharm, M.Pharm, Pharm.D, MBBS, BDS and Life Sciences graduates. Final eligibility depends on the program's published admission criteria.",
  },
  {
    q: "Do I need prior pharmacovigilance experience?",
    a: "The pathway is designed to introduce relevant concepts and practical tasks. Discuss your academic background and prior experience with a counsellor to understand whether the program is suitable for you.",
  },
  {
    q: "How long is the program?",
    a: "The program is structured as a 12-week learning pathway covering foundations, case-processing practice and career preparation.",
  },
  {
    q: "What will I learn?",
    a: "The curriculum covers pharmacovigilance fundamentals, ICSR processing, MedDRA coding, case documentation, narrative writing, safety workflow concepts and applied exercises.",
  },
  {
    q: "Will I work on practical cases?",
    a: "The proposed curriculum includes case-based exercises and portfolio work. Ask the counselling team to confirm the current practical assignments, feedback process and final deliverables.",
  },
  {
    q: "Will I receive a certificate?",
    a: "Certificate eligibility, issuer and completion requirements depend on the current program terms. These details can be explained during counselling.",
  },
  {
    q: "Does the program guarantee a job?",
    a: "No employment outcome should be assumed or promised unless a documented guarantee explicitly applies. Career preparation and placement assistance, where offered, do not automatically guarantee an interview or job offer.",
  },
  {
    q: "Will I receive placement assistance?",
    a: "Ask the counsellor to explain the specific assistance included in the current program, such as resume preparation, interview practice, job application guidance or employer introductions, where available.",
  },
  {
    q: "How much does the program cost?",
    a: "Speak with a counsellor to understand the current program options, applicable fees, payment terms and available support before making an enrollment decision.",
  },
  {
    q: "Can I watch a class before enrolling?",
    a: "You can start with the free introductory masterclass linked on this page, subject to the availability of the recording.",
  },
  {
    q: "How do I get started?",
    a: "Use the Talk to a Counsellor option to discuss your background, career interests, eligibility and the program details.",
  },
];

// ── Student Reviews ──────────────────────────────────────────────────────────
const STUDENT_REVIEWS = [
  {
    name: "Anya Tiwari",
    role: "B.Pharm · JSS College of Pharmacy, Ooty",
    avatar: "/images/testimonials/anya-tiwari.png",
    rating: 5,
    quote:
      "Comparing Pharmacovigilance against retail pharmacy made my direction crystal clear. The ICSR case exercises and MedDRA coding gave me the exact vocabulary needed for MNC technical rounds.",
  },
  {
    name: "Arun Jain",
    role: "B.Pharm · Dayanand Sagar College of Pharmacy",
    avatar: "/images/testimonials/arun-jain.png",
    rating: 5,
    quote:
      "The practical exposure to ADR reporting, Day-0 clock rules, and MedDRA hierarchy coding gave me immense confidence to tackle scenario-based questions at Tier-1 CROs.",
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

// ── Interactive Case Simulator Stages ────────────────────────────────────────
const SIMULATOR_STAGES = [
  {
    id: "01",
    label: "01 Intake",
    name: "Case Intake & Day 0",
    summary: "Timestamping receipt and initiating regulatory reporting clock",
    protocol: "ICH E2D",
    statusBadge: "Day 0 Active",
    desc: "Safety information arrives from physicians, clinical trials, or patient reports. The primary operational task is establishing the legally binding Day 0 receipt date.",
    data: [
      { label: "Case Tracking ID", value: "ARZ-PV-2026-042" },
      { label: "Report Source", value: "Spontaneous (Cardiology Dept, Hospital)" },
      { label: "Patient Profile", value: "Female, 54 Yrs (Initials: M.K.)" },
      { label: "Suspect Drug", value: "CardioVas® (Lisinopril 20mg)" },
      { label: "Reported Event", value: "Acute facial angioedema with throat tightness" },
    ],
    takeaway: "Day 0 precision governs all subsequent international health authority deadlines.",
  },
  {
    id: "02",
    label: "02 Triage",
    name: "Case Validity & Triage",
    summary: "Validating the 4 minimum criteria and assessing seriousness",
    protocol: "ICH E2A",
    statusBadge: "4/4 Validated · Serious",
    desc: "Every report must meet 4 criteria to be deemed an Individual Case Safety Report (ICSR). Seriousness criteria determine whether expedited reporting applies.",
    data: [
      { label: "1. Identifiable Patient", value: "Female, 54 Yrs (DOB: 1972) — VALID" },
      { label: "2. Identifiable Reporter", value: "Dr. S. Nair, MD (Cardiologist) — VALID" },
      { label: "3. Suspect Medicinal Product", value: "CardioVas® (Lisinopril 20mg) — VALID" },
      { label: "4. Suspected Adverse Reaction", value: "Angioedema & laryngeal edema — VALID" },
    ],
    takeaway: "Confirmed serious due to emergency hospitalization; routed to expedited timeline.",
  },
  {
    id: "03",
    label: "03 MedDRA",
    name: "Medical Coding (MedDRA 27.0)",
    summary: "Translating clinical verbatims into standardized hierarchy",
    protocol: "MSSO PtC",
    statusBadge: "Hierarchy Aligned",
    desc: "Clinical terminology is classified through the 5-tier MedDRA hierarchy to ensure international database signal detection across FDA FAERS and EMA EudraVigilance.",
    data: [
      { label: "Verbatim Text", value: "Severe facial and lip swelling with throat tightness" },
      { label: "Lowest Level Term (LLT)", value: "Swelling of lips and face [10024561]" },
      { label: "Preferred Term (PT)", value: "Angioedema [10002424]" },
      { label: "System Organ Class (SOC)", value: "Immune system disorders [10021428]" },
    ],
    takeaway: "Precise PT selection prevents signal distortion in global safety aggregations.",
  },
  {
    id: "04",
    label: "04 Narrative",
    name: "Narrative Preparation (CIOMS I)",
    summary: "Structuring clinical chronology, dechallenge, and causality",
    protocol: "CIOMS I",
    statusBadge: "Chronology Verified",
    desc: "Drafting an audit-ready medical narrative that preserves the chronological clinical course, lab findings, dechallenge outcomes, and reporter assessment.",
    narrativeText:
      "A 54-year-old female patient (M.K.) with essential hypertension was initiated on Lisinopril 20mg once daily on 12-Oct-2026. Approximately 4 hours following the third dose on 14-Oct-2026, the patient developed acute facial swelling, lip edema, and laryngeal tightness requiring emergency hospitalization. Lisinopril was permanently discontinued (positive dechallenge). Intravenous epinephrine was administered with symptom resolution within 18 hours. Causality assessed as probable.",
    takeaway: "Allows medical reviewers to evaluate causality without parsing raw medical charts.",
  },
  {
    id: "05",
    label: "05 Quality Review",
    name: "Quality Review & SOP Audit",
    summary: "Zero-defect check across dates, coding specificity, and attachments",
    protocol: "GVP Module VI",
    statusBadge: "Pass: 100%",
    desc: "Performing rigorous cross-field validation, duplicate searches, causality consistency checks, and source document reconciliation prior to transmission.",
    data: [
      { label: "Demographic Consistency", value: "Confirmed across hospital discharge records" },
      { label: "Temporal Plausibility", value: "Reaction occurred after drug administration" },
      { label: "Dechallenge Verification", value: "Positive dechallenge explicitly documented" },
      { label: "Duplicate Search", value: "No match in global safety repository" },
    ],
    takeaway: "Prevents critical audit findings and regulatory submission rejections.",
  },
  {
    id: "06",
    label: "06 Regulatory",
    name: "Regulatory Gateway Submission",
    summary: "Calculating reporting clocks and generating E2B(R3) transmissions",
    protocol: "FDA / EMA E2B",
    statusBadge: "15-Day Expedited Clock",
    desc: "Submitting electronic E2B XML payloads to health authorities within mandatory legal clocks (15 calendar days for serious unlisted ADRs).",
    data: [
      { label: "Case Classification", value: "Serious & Unexpected Adverse Reaction" },
      { label: "Clock Timeline", value: "15 Calendar Days from Day 0" },
      { label: "Submission Deadline", value: "29-Oct-2026, 23:59 GMT" },
      { label: "Transmission Format", value: "ICH E2B(R3) XML Gateway Package" },
    ],
    takeaway: "Safeguards patient safety while upholding pharma sponsor regulatory licenses.",
  },
];

// ── Interactive Artifact Gallery Data ────────────────────────────────────────
const ARTIFACT_GALLERY = [
  {
    id: "01",
    name: "ICSR Triage Dossier",
    standard: "ICH E2A / E2D",
    workSampleNum: "WORK SAMPLE 01",
    title: "ICSR Triage and Validity Review Dossier",
    desc: "Practise reviewing incoming adverse event reports against the 4 minimum criteria, documenting missing fields, and recording Day-0 timelines for corporate safety compliance.",
    records: [
      { key: "Case Tracking ID", val: "ARZ-ICSR-2026-089" },
      { key: "Reporter Credential", val: "Clinical Pharmacist, Oncology Center" },
      { key: "Suspect Drug", val: "Immunox® (Monoclonal Antibody)" },
      { key: "Reported Event", val: "Grade 3 Infusion-Related Reaction" },
      { key: "Triage Verdict", val: "VALID ICSR · SERIOUS (Hospitalized)" },
    ],
    rubrics: [
      "4 Minimum Criteria verification",
      "Seriousness criteria assignment",
      "Follow-up query generation",
    ],
  },
  {
    id: "02",
    name: "MedDRA Coding Record",
    standard: "MedDRA 27.0",
    workSampleNum: "WORK SAMPLE 02",
    title: "MedDRA Multi-Axial Hierarchy Assignment Record",
    desc: "Work through real-world case scenarios to map complex clinical narratives into standardized MedDRA terms following international Point to Consider (PtC) coding rules.",
    records: [
      { key: "Reported Verbatim", val: "Elevated liver enzymes and jaundice 2 weeks post therapy" },
      { key: "Coded Term 01", val: "LLT: ALT increased ➔ PT: Alanine aminotransferase increased [10001551]" },
      { key: "Coded Term 02", val: "LLT: Jaundice ➔ PT: Jaundice [10023126]" },
      { key: "Primary SOC", val: "Hepatobiliary disorders & Investigations" },
      { key: "Coding Sign-off", val: "Verified against MedDRA PtC v27.0" },
    ],
    rubrics: [
      "Lowest Level Term specificity",
      "Primary vs secondary SOC mapping",
      "Avoiding diagnostic over-interpretation",
    ],
  },
  {
    id: "03",
    name: "CIOMS I Narrative",
    standard: "CIOMS I Standard",
    workSampleNum: "WORK SAMPLE 03",
    title: "CIOMS I Structured Clinical Case Narrative",
    desc: "Prepare structured, audit-ready clinical narratives from complex case scenario notes, organizing medical history, timeline of therapy, adverse event progression, and outcome.",
    records: [
      { key: "Patient Context", val: "62-year-old male, Type 2 Diabetes, Hypertension" },
      { key: "Concurrent Meds", val: "Metformin 1000mg BID, Atorvastatin 20mg OD" },
      { key: "Clinical Incident", val: "Generalized pruritic maculopapular rash on Day 14 of therapy" },
      { key: "Dechallenge", val: "Positive dechallenge; resolved 48h after drug withdrawal" },
      { key: "Narrative Audit", val: "Score: 98/100 · Approved for Medical Review" },
    ],
    rubrics: [
      "Strict chronological organization",
      "Dechallenge / rechallenge documentation",
      "Objective medical fact preservation",
    ],
  },
  {
    id: "04",
    name: "Expedited Clock Matrix",
    standard: "GVP Module VI",
    workSampleNum: "WORK SAMPLE 04",
    title: "Expedited Reporting Decision Matrix",
    desc: "Analyze safety reports to determine regulatory submission obligations, applying 7-day fatal/life-threatening vs 15-day serious clock logic across FDA, EMA, and CDSCO rules.",
    records: [
      { key: "Report Type", val: "Spontaneous Serious Unexpected Adverse Drug Reaction" },
      { key: "Safety Reference (RSI)", val: "Summary of Product Characteristics (SmPC) Sec 4.8" },
      { key: "Expectedness", val: "UNLISTED in current regulatory reference" },
      { key: "Mandatory Clock", val: "15 Calendar Days from Day 0 receipt" },
      { key: "Gateway Status", val: "Electronic transmission XML validated" },
    ],
    rubrics: [
      "Accurate Day 0 calculation",
      "Expectedness determination against RSI",
      "Expedited vs periodic routing logic",
    ],
  },
];

// ── Main Page Component ──────────────────────────────────────────────────────
function PVAssociateMinimalPage() {
  const [isCounsellorModalOpen, setIsCounsellorModalOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Minimalist State
  const [activeStageIdx, setActiveStageIdx] = useState(0);
  const [activeArtifactIdx, setActiveArtifactIdx] = useState(0);
  const [selectedDegree, setSelectedDegree] = useState("B.Pharm");

  // Counsellor Form State
  const [counsellorForm, setCounsellorForm] = useState({
    name: "",
    phone: "",
    degree: DEGREES[0],
    year: PASSING_YEARS[0],
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    trackEvent("pv_page_view", {
      path: "/pv-associate",
      source: "minimal_apple_doctrine_v1",
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
        const text = `Hi Arzon Guidance Team! I submitted my details on the Pharmacovigilance page:\nName: ${counsellorForm.name}\nPhone: ${counsellorForm.phone}\nDegree: ${counsellorForm.degree} (${counsellorForm.year})\nI would like to discuss my eligibility and the 12-week program.`;
        window.open(waMsg(text), "_blank");
      } catch {}
    }, 400);
  };

  const currentStage = SIMULATOR_STAGES[activeStageIdx];
  const currentArtifact = ARTIFACT_GALLERY[activeArtifactIdx];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#081F38] font-sans antialiased selection:bg-[#2563EB] selection:text-white">
      {/* ── 01. HERO (APPLE-GRADE EDITORIAL FOCUS) ──────────────────────────── */}
      <section className="relative overflow-hidden bg-white tone-light card-light border-b border-slate-200/80 pt-10 pb-20 sm:pt-16 sm:pb-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Subtle Top Breadcrumb */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#64748B]">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 font-medium">
              <Link to="/" className="hover:text-[#081F38] transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <Link to="/courses" className="hover:text-[#081F38] transition-colors">Programmes</Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-[#081F38] font-bold">Pharmacovigilance Associate</span>
            </nav>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F8FAFC] border border-slate-200/80 text-[11px] font-bold text-[#081F38]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
              Role Readiness Track · 12 Weeks
            </span>
          </div>

          {/* Master Hero Grid: Confident Headline + Clean Workstation Display */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column (7 cols): Typography, Mentor Anchor & Actions */}
            <div className="lg:col-span-7 space-y-7 text-left">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E6F7F1] border border-[#10B981]/25 text-[#081F38] font-mono text-xs font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] motion-safe:animate-pulse" />
                PHARMACOVIGILANCE CAREER PATHWAY · 12-WEEK PROGRAM
              </span>

              <div className="space-y-4">
                <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-bold tracking-tight text-[#081F38] leading-[1.08]">
                  Build the Skills to Start Your Career in Pharmacovigilance.
                </h1>
                <p className="text-base sm:text-lg text-[#64748B] font-normal leading-relaxed max-w-2xl">
                  Understand how drug safety teams process adverse event reports, assess safety information and document cases. Develop practical skills aligned with entry-level pharmacovigilance work through structured training, case-based exercises and career preparation.
                </p>
              </div>

              {/* Minimalist Mentor Anchor Capsule */}
              <div className="inline-flex items-center gap-3.5 p-2 pr-4 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 shadow-2xs">
                <img
                  src={mentorKumailImg}
                  alt="Mohamed Kumail Abbas"
                  className="w-11 h-11 rounded-xl object-cover object-top border border-slate-200 shrink-0"
                />
                <div className="text-left leading-tight">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-[#081F38]">
                      Mohamed Kumail Abbas
                    </span>
                    <span className="text-[10px] font-mono font-bold uppercase text-[#10B981] bg-[#E6F7F1] px-1.5 py-0.2 rounded">
                      Lead Mentor
                    </span>
                  </div>
                  <p className="text-[11px] text-[#64748B] mt-0.5">
                    Manager, PV Operations · Ex-Cognizant, Quintiles, Accenture
                  </p>
                </div>
              </div>

              {/* Decisive Touch Targets */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
                <button
                  type="button"
                  onClick={() => openCounsellor("hero_primary")}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-sm shadow-sm transition-all active:scale-[0.99] cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  <span>Talk to a Counsellor</span>
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
                  <span>Watch Free Masterclass</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#64748B]" />
                </a>
              </div>

              <p className="text-xs text-[#64748B] leading-relaxed">
                Not sure whether pharmacovigilance is right for you? Speak with our career guidance team to understand the role, eligibility and training pathway before making a decision.
              </p>
            </div>

            {/* Right Column (5 cols): Steve Jobs Product Stage */}
            <div className="lg:col-span-5">
              <div className="rounded-[28px] border border-slate-200/80 bg-white tone-light card-light p-3.5 shadow-xl hover:shadow-2xl transition-all space-y-3.5">
                {/* Visual Glass Display */}
                <div className="relative rounded-2xl overflow-hidden aspect-4/3 bg-slate-950">
                  <img
                    src="/images/pv-clinical-workstation.jpg"
                    alt="Clinical Pharmacovigilance Case Processing Workstation"
                    className="w-full h-full object-cover opacity-90 hover:scale-103 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#081F38]/90 via-[#081F38]/20 to-transparent pointer-events-none" />

                  <div className="absolute top-3 inset-x-3 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md font-mono text-[10px] font-bold text-[#081F38] border border-white/60 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                      CLINICAL OPERATIONS
                    </span>
                    <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-[#2563EB] text-white">
                      12 WEEKS
                    </span>
                  </div>

                  <div className="absolute bottom-3 inset-x-3 rounded-xl backdrop-blur-md bg-white/95 border border-white/80 p-3 shadow-xs tone-light card-light">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="h-8 w-8 rounded-lg bg-[#2563EB] text-white flex items-center justify-center font-mono font-bold text-xs shrink-0">
                          PV
                        </div>
                        <div className="min-w-0 text-left">
                          <div className="text-xs font-bold text-[#081F38] truncate">
                            ICSR Triage &amp; Safety Cases
                          </div>
                          <div className="text-[10px] text-[#64748B] font-mono truncate">
                            Workflows: <span className="font-semibold text-[#081F38]">Oracle Argus Safety &amp; MedDRA</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Minimalist Degree Eligibility Selector Pill */}
                <div className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 space-y-2.5 text-left">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
                      Select Your Background
                    </span>
                    <span className="font-mono text-[10px] font-bold text-[#10B981] flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-[#10B981]" />
                      Eligible
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {["B.Pharm", "Pharm.D", "M.Pharm", "Life Sciences", "MBBS / BDS"].map((deg) => (
                      <button
                        key={deg}
                        type="button"
                        onClick={() => {
                          setSelectedDegree(deg);
                          setCounsellorForm((prev) => ({
                            ...prev,
                            degree: `${deg} (Healthcare Graduate)`,
                          }));
                        }}
                        className={`px-3 py-1 rounded-full text-xs font-semibold font-mono transition-all cursor-pointer ${
                          selectedDegree === deg
                            ? "bg-[#2563EB] text-white shadow-2xs"
                            : "bg-white tone-light card-light border border-slate-200 text-[#081F38] hover:bg-slate-100"
                        }`}
                      >
                        {deg}
                      </button>
                    ))}
                  </div>

                  <p className="text-[11px] text-[#64748B]">
                    <strong className="text-[#081F38]">{selectedDegree}</strong> meets the core requirements for entry-level drug safety roles.
                  </p>
                </div>

                {/* Micro Metric Triple */}
                <div className="grid grid-cols-3 gap-2 text-center pt-0.5">
                  <div className="p-2 rounded-xl bg-[#F8FAFC] border border-slate-200/80">
                    <span className="block font-bold text-[#081F38] text-xs">15+ Cases</span>
                    <span className="text-[10px] text-[#64748B] font-mono">ICSR Practice</span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#F8FAFC] border border-slate-200/80">
                    <span className="block font-bold text-[#081F38] text-xs">MedDRA 27.0</span>
                    <span className="text-[10px] text-[#64748B] font-mono">LLT/PT Coding</span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#F8FAFC] border border-slate-200/80">
                    <span className="block font-bold text-[#081F38] text-xs">1-on-1 Prep</span>
                    <span className="text-[10px] text-[#64748B] font-mono">Interview Prep</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Minimal 4-Pill Trust Bar */}
          <div className="pt-8 border-t border-slate-200/80">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-semibold text-[#081F38]">
              {[
                "12-week structured learning pathway",
                "Practical case-based learning",
                "Industry-focused curriculum",
                "Career guidance and interview preparation",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-[#E6F7F1] text-[#10B981] flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <p className="mt-4 text-xs font-mono text-[#64748B] text-center sm:text-left">
              <span className="font-bold text-[#081F38]">Audience:</span> For eligible B.Pharm, M.Pharm, Pharm.D, MBBS, BDS and Life Sciences graduates.
            </p>
          </div>
        </div>
      </section>

      {/* ── 02. UNDERSTAND THE CAREER (APPLE-STYLE COMPARISON) ───────────────── */}
      <section className="py-20 sm:py-28 bg-[#F8FAFC] border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="max-w-3xl space-y-4">
            <span className="font-mono text-xs font-bold text-[#2563EB] uppercase tracking-widest block">
              SECTION 02 · UNDERSTAND THE CAREER
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#081F38]">
              Your Pharmacy Degree Can Lead to More Than You Think.
            </h2>
            <div className="space-y-3 text-base text-[#64748B] font-normal leading-relaxed">
              <p>
                Medicines save lives, but their safety must continue to be monitored after they enter clinical use.
              </p>
              <p>
                Pharmacovigilance is the field responsible for detecting, assessing, understanding and preventing adverse effects and other medicine-related problems.
              </p>
              <p>
                Pharmacovigilance professionals help maintain patient safety by processing safety reports, reviewing medical information, documenting cases and supporting regulatory reporting.
              </p>
              <p className="font-semibold text-[#081F38]">
                For healthcare graduates interested in analytical work, medical documentation and drug safety, this can be a career path worth exploring.
              </p>
            </div>
          </div>

          {/* Minimalist Apple-Grade Comparison Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 rounded-[28px] bg-white tone-light card-light border border-slate-200/80 space-y-6 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#64748B] px-3 py-1 rounded-full bg-slate-100">
                  Academic Default
                </span>
                <span className="text-xs font-mono text-[#64748B]">Retail &amp; Sales</span>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-[#081F38]">
                  Retail Pharmacy &amp; Field Sales
                </h3>
                <p className="text-xs text-[#64748B] mt-1">
                  Common default paths taken without specialized operational training
                </p>
              </div>

              <div className="space-y-4 pt-2 border-t border-slate-100 text-xs">
                <div>
                  <span className="font-mono text-[#64748B] block">Starting Compensation</span>
                  <span className="text-base font-bold text-[#081F38]">₹1.80 – ₹2.50 LPA</span>
                </div>
                <div>
                  <span className="font-mono text-[#64748B] block">Work Environment</span>
                  <p className="text-[#64748B] mt-0.5 leading-relaxed">
                    Standing counters, retail prescription billing, inventory stocking, 6-day rotational shifts.
                  </p>
                </div>
                <div>
                  <span className="font-mono text-[#64748B] block">Long-Term Trajectory</span>
                  <p className="text-[#64748B] mt-0.5 leading-relaxed">
                    Store manager or regional sales rep with severe growth plateau after 3-5 years.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-[28px] bg-[#EEF6FF] border border-[#2563EB]/40 space-y-6 shadow-md relative">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-white px-3 py-1 rounded-full bg-[#2563EB]">
                  Specialized Track
                </span>
                <span className="text-xs font-mono font-bold text-[#2563EB]">Corporate MNC</span>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-[#081F38]">
                  Corporate Drug Safety Associate (PV)
                </h3>
                <p className="text-xs text-[#64748B] mt-1">
                  Specialized analytical operations across global pharma GCCs and Tier-1 CROs
                </p>
              </div>

              <div className="space-y-4 pt-2 border-t border-[#BFDBFE]/60 text-xs">
                <div>
                  <span className="font-mono text-[#2563EB] font-bold block">Benchmark Compensation</span>
                  <span className="text-lg font-bold text-[#081F38]">₹4.20 – ₹6.00 LPA</span>
                </div>
                <div>
                  <span className="font-mono text-[#2563EB] font-bold block">Work Environment</span>
                  <p className="text-[#081F38] font-medium mt-0.5 leading-relaxed">
                    Modern corporate technology campus (Cognizant, Quintiles, Accenture), Monday-to-Friday schedule, clinical data workstations.
                  </p>
                </div>
                <div>
                  <span className="font-mono text-[#2563EB] font-bold block">Long-Term Trajectory</span>
                  <p className="text-[#081F38] font-medium mt-0.5 leading-relaxed">
                    Clear progression: Safety Associate ➔ Senior Associate ➔ PV Lead ➔ Operations Manager ➔ Global Safety Director.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* What does a Drug Safety Associate do? Refined 5 Responsibilities */}
          <div className="rounded-[28px] bg-white tone-light card-light border border-slate-200/80 p-8 sm:p-12 shadow-sm space-y-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
              <div>
                <h3 className="text-2xl font-bold text-[#081F38]">
                  What does a Drug Safety Associate do?
                </h3>
                <p className="text-xs sm:text-sm text-[#64748B] mt-1">
                  Core responsibilities across global clinical safety operations
                </p>
              </div>

              <button
                type="button"
                onClick={() => openCounsellor("section_02_explore")}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#2563EB] hover:text-[#081F38] cursor-pointer transition-colors"
              >
                <span>Explore the Pharmacovigilance Career Path</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Process safety reports",
                  desc: "Review information about suspected adverse reactions and identify the details needed for a valid safety case.",
                  icon: FileText,
                  badge: "ICH E2A / E2D",
                },
                {
                  title: "Evaluate case information",
                  desc: "Understand seriousness, expectedness, reportability and relevant safety information according to the applicable workflow and reporting requirements.",
                  icon: ShieldCheck,
                  badge: "Seriousness Criteria",
                },
                {
                  title: "Code medical terminology",
                  desc: "Use standardized medical terminology, including MedDRA, to classify reported events and medical concepts.",
                  icon: Database,
                  badge: "MedDRA 27.0",
                },
                {
                  title: "Document case narratives",
                  desc: "Organize clinical information into clear, structured narratives that preserve the relevant facts of a safety case.",
                  icon: FileCheck,
                  badge: "CIOMS I Standards",
                },
                {
                  title: "Support regulatory compliance",
                  desc: "Follow defined procedures, documentation standards, quality checks and reporting timelines.",
                  icon: Shield,
                  badge: "Day-0 Clock",
                },
                {
                  title: "Role Variability Note",
                  desc: "The precise responsibilities vary by employer, product, market and level of experience.",
                  icon: Info,
                  isMeta: true,
                },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className={`p-6 rounded-2xl border transition-all ${
                      item.isMeta
                        ? "bg-[#F8FAFC] border-slate-200/80 border-dashed text-[#64748B]"
                        : "bg-white tone-light card-light border-slate-200/80 hover:border-[#2563EB]/40 shadow-2xs"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-[#EEF6FF] text-[#2563EB] flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      {item.badge && (
                        <span className="font-mono text-[10px] font-bold text-[#2563EB] bg-[#EEF6FF] px-2.5 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <h4 className="font-bold text-base text-[#081F38] mb-1.5">
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            <p className="text-[11px] font-mono text-[#64748B] italic pt-2">
              *The precise responsibilities vary by employer, product, market and level of experience.
            </p>
          </div>
        </div>
      </section>

      {/* ── 03. THE CAREER GAP (ACADEMIC VS OPERATIONAL REALITY) ─────────────── */}
      <section className="py-20 sm:py-28 bg-white tone-light card-light border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="max-w-3xl space-y-4">
            <span className="font-mono text-xs font-bold text-[#2563EB] uppercase tracking-widest block">
              SECTION 03 · THE CAREER GAP
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#081F38]">
              Knowing Pharmacology Is One Thing. Applying It to Drug Safety Work Is Another.
            </h2>
            <div className="space-y-3 text-base text-[#64748B] font-normal leading-relaxed">
              <p>
                Your degree gives you a foundation in medicines, diseases, clinical concepts and patient safety.
              </p>
              <p>
                Entry-level pharmacovigilance roles can also require familiarity with specific workflows, terminology, documentation practices and quality expectations.
              </p>
              <p className="font-semibold text-[#081F38]">
                That is where practical preparation matters.
              </p>
            </div>
          </div>

          {/* Minimal 2-Column Split: Theory vs Operations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 rounded-[28px] bg-[#F8FAFC] border border-slate-200/80 space-y-4">
              <span className="font-mono text-xs font-bold text-[#64748B] uppercase tracking-wider block">
                WHAT PHARMACY COLLEGE TEACHES
              </span>
              <h4 className="font-bold text-lg text-[#081F38]">
                Foundational Sciences &amp; Theory
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#64748B]">
                {[
                  "Mechanism of action & receptor binding kinetics",
                  "Therapeutic classification of medicinal substances",
                  "Pathology, human anatomy and clinical diseases",
                  "Basic adverse drug reaction (ADR) terminology",
                ].map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-[#64748B] font-bold">•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 rounded-[28px] bg-[#EEF6FF] border border-[#BFDBFE] space-y-4">
              <span className="font-mono text-xs font-bold text-[#2563EB] uppercase tracking-wider block">
                WHAT DRUG SAFETY TEAMS SCREEN FOR
              </span>
              <h4 className="font-bold text-lg text-[#081F38]">
                Applied Operations &amp; Documentation
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#081F38]">
                {[
                  "Validating the 4 minimum ICSR criteria on Day 0",
                  "MedDRA hierarchy term mapping (LLT, PT, SOC)",
                  "Structured chronological narrative drafting (CIOMS I)",
                  "Expedited 15-day vs periodic safety reporting clock logic",
                ].map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5 stroke-[2.5]" />
                    <span className="font-medium">{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* The Skills You Need to Understand */}
          <div className="space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold text-[#081F38]">
              The skills you need to understand
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  num: "01",
                  title: "Case processing",
                  desc: "Learn how safety information is collected, reviewed and organized into an Individual Case Safety Report (ICSR).",
                  metric: "95% Screening Weight",
                },
                {
                  num: "02",
                  title: "Medical terminology coding",
                  desc: "Understand the MedDRA hierarchy and how medical concepts are mapped to standardized terminology.",
                  metric: "90% Screening Weight",
                },
                {
                  num: "03",
                  title: "Clinical documentation",
                  desc: "Practise organizing case information and writing structured narratives without losing important medical details.",
                  metric: "88% Screening Weight",
                },
                {
                  num: "04",
                  title: "Safety assessment",
                  desc: "Understand the concepts used to evaluate adverse events, seriousness, causality and reporting requirements.",
                  metric: "86% Screening Weight",
                },
                {
                  num: "05",
                  title: "Quality and compliance",
                  desc: "Learn why accuracy, traceability, confidentiality and standard operating procedures matter in drug safety operations.",
                  metric: "84% Screening Weight",
                },
                {
                  num: "->",
                  title: "Interview Readiness",
                  desc: "Connect these operational concepts together so you can articulate your decisions during technical hiring rounds.",
                  metric: "Role-Ready Portfolio",
                  isHighlight: true,
                },
              ].map((skill, idx) => (
                <div
                  key={idx}
                  className={`p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                    skill.isHighlight
                      ? "bg-[#EEF6FF] border-[#60A5FA]/40 text-[#081F38]"
                      : "bg-[#F8FAFC] border-slate-200/80 hover:border-[#2563EB]/40"
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-[#2563EB]">
                        {skill.num}
                      </span>
                      <span className="font-mono text-[10px] font-bold text-[#10B981] bg-[#E6F7F1] px-2 py-0.5 rounded-full">
                        {skill.metric}
                      </span>
                    </div>
                    <h4 className="font-bold text-base text-[#081F38]">
                      {skill.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                      {skill.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Box */}
          <div className="p-8 rounded-[28px] bg-[#F8FAFC] border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <p className="text-base text-[#081F38] leading-relaxed max-w-2xl font-medium">
              The objective is not simply to finish a course. It is to develop a clearer understanding of the work, practise relevant tasks and prepare to discuss your knowledge in an interview.
            </p>

            <button
              type="button"
              onClick={() => openCounsellor("section_03_gap")}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-sm shadow-sm transition-all active:scale-[0.99] cursor-pointer shrink-0"
            >
              <span>Discuss Your Career Goals</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ── 04. LEARN FROM INDUSTRY EXPERIENCE (LEAD MENTOR DOSSIER) ─────────── */}
      <section id="mentor" className="py-20 sm:py-28 bg-[#F8FAFC] border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="max-w-3xl space-y-3">
            <span className="font-mono text-xs font-bold text-[#2563EB] uppercase tracking-widest block">
              SECTION 04 · LEARN FROM INDUSTRY EXPERIENCE
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#081F38]">
              Learn How Pharmacovigilance Works Beyond the Textbook.
            </h2>
            <p className="text-base text-[#64748B]">
              Meet Mohamed Kumail Abbas, the lead mentor identified for this program.
            </p>
          </div>

          {/* Steve Jobs Keynote Profile Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-[28px] overflow-hidden bg-white tone-light card-light border border-slate-200/80 shadow-md">
                <img
                  src={mentorKumailImg}
                  alt="Mohamed Kumail Abbas - Manager, Pharmacovigilance Operations"
                  className="w-full h-auto aspect-4/5 object-cover object-top"
                />
                <div className="p-6 space-y-2 border-t border-slate-100 text-left">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#E6F7F1] border border-[#10B981]/30 font-mono text-[10px] font-bold text-[#10B981] uppercase">
                      PRACTITIONER DOSSIER
                    </span>
                    <span className="text-xs font-mono font-bold text-[#2563EB]">
                      15+ Yrs Industry
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#081F38]">
                    Mohamed Kumail Abbas, M.Pharm
                  </h3>
                  <p className="text-sm font-semibold text-[#2563EB]">
                    Manager, Pharmacovigilance Operations
                  </p>
                  <p className="text-xs font-mono text-[#64748B] pt-1">
                    Industry experience includes: Cognizant, Accenture, Indegene and Quintiles.
                  </p>
                </div>
              </div>

              <p className="text-xs text-[#64748B] leading-relaxed p-4 rounded-2xl bg-white tone-light card-light border border-slate-200/80">
                His experience provides the foundation for connecting pharmacovigilance concepts with the workflows, documentation standards and practical expectations associated with drug safety operations.
              </p>
            </div>

            <div className="lg:col-span-7 space-y-8 text-left">
              <blockquote className="p-8 rounded-[28px] bg-white tone-light card-light border-l-4 border-[#2563EB] border-y border-r border-slate-200/80 shadow-sm space-y-3">
                <p className="italic text-base sm:text-lg text-[#081F38] leading-relaxed font-serif">
                  "Understanding pharmacovigilance means more than knowing the terminology. You need to understand how information moves through a safety workflow, why each step matters and how accuracy affects the quality of the final case."
                </p>
                <footer className="font-mono text-xs font-semibold text-[#64748B]">
                  — Mohamed Kumail Abbas, Lead Program Mentor
                </footer>
              </blockquote>

              <div className="p-8 rounded-[28px] bg-white tone-light card-light border border-slate-200/80 space-y-5">
                <h4 className="font-bold text-lg text-[#081F38]">
                  What you should learn from the mentor-led experience
                </h4>

                <ul className="space-y-3 text-sm text-[#64748B]">
                  {[
                    "How safety cases are reviewed and processed.",
                    "How medical information is organized and documented.",
                    "How MedDRA terminology is applied in case coding.",
                    "How to approach common technical interview questions.",
                    "How to identify gaps in your current understanding and improve them.",
                  ].map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#EEF6FF] text-[#2563EB] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span className="leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => openCounsellor("section_04_mentor")}
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#081F38] hover:bg-[#2563EB] text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <span>Talk to a Counsellor About the Program</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Minimalist Career Progression */}
              <div className="p-6 rounded-2xl bg-white tone-light card-light border border-slate-200/80 space-y-3">
                <span className="font-mono text-xs font-bold text-[#64748B] uppercase tracking-wider block">
                  Documented Career Track
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  {[
                    { company: "Quintiles", role: "Triage Line" },
                    { company: "Indegene", role: "Safety Case Processing" },
                    { company: "Cognizant / Accenture", role: "Lead Safety & Aggregate" },
                    { company: "Novaspire", role: "Manager, PV Operations" },
                  ].map((step, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-[#F8FAFC] border border-slate-200/80 space-y-1">
                      <span className="font-mono text-[10px] text-[#2563EB] font-bold block">
                        0{idx + 1}
                      </span>
                      <h5 className="font-bold text-xs text-[#081F38]">{step.company}</h5>
                      <p className="text-[10px] text-[#64748B]">{step.role}</p>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-[11px] font-mono text-[#64748B] italic">
                *Mentor credentials, current employment details and the quoted statement must be confirmed before publication.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 05. WATCH THE FREE MASTERCLASS (APPLE THEATER CARD) ──────────────── */}
      <section className="py-20 sm:py-28 bg-white tone-light card-light border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <span className="font-mono text-xs font-bold text-[#2563EB] uppercase tracking-widest block">
              SECTION 05 · WATCH THE FREE MASTERCLASS
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#081F38]">
              See the Work Before You Decide.
            </h2>
            <p className="text-base text-[#64748B] leading-relaxed">
              Explore an introductory pharmacovigilance masterclass featuring Mohamed Kumail Abbas. Get an introduction to the concepts involved in safety case processing and understand what practical learning in this field can look like.
            </p>
          </div>

          {/* Apple Theater Card */}
          <div className="rounded-[32px] bg-[#081F38] text-white p-8 sm:p-14 shadow-2xl overflow-hidden relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6">
                <a
                  href={PV_MASTERCLASS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("masterclass_card_click", { section: "section_05" })}
                  className="group relative rounded-2xl overflow-hidden border border-white/10 shadow-lg cursor-pointer aspect-video w-full bg-black block"
                >
                  <img
                    src="/images/pv-landing/video-workstation-hd.jpg?v=3"
                    alt="Pharmacovigilance Masterclass Workstation"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                    onError={(e) => {
                      e.currentTarget.src = "/images/pv-clinical-workstation.jpg";
                    }}
                  />
                  <div className="absolute inset-0 bg-[#081F38]/60 group-hover:bg-[#081F38]/40 transition-colors flex flex-col items-center justify-center text-center p-4">
                    <div className="h-16 w-16 rounded-full bg-white tone-light shadow-xl flex items-center justify-center text-[#2563EB] group-hover:scale-110 transition-transform">
                      <Play className="h-7 w-7 fill-current ml-1 text-[#2563EB]" />
                    </div>
                    <div className="mt-4 font-bold text-sm text-white flex items-center gap-1.5">
                      <span>Launch Masterclass Recording</span>
                      <ExternalLink className="w-4 h-4 text-[#60A5FA]" />
                    </div>
                    <span className="text-[11px] font-mono text-slate-300 mt-1">
                      Faculty Walkthrough · Starts at 11:30 (Google Drive) ↗
                    </span>
                  </div>
                </a>
              </div>

              <div className="lg:col-span-6 space-y-6 text-left">
                <div className="space-y-2">
                  <span className="font-mono text-xs font-bold text-[#60A5FA] uppercase tracking-wider block">
                    What to look for in the masterclass
                  </span>
                  <h3 className="text-2xl font-bold text-white">
                    4 Operational Concepts Walked Through on Screen
                  </h3>
                </div>

                <div className="space-y-4 text-xs sm:text-sm">
                  {[
                    {
                      title: "ICSR fundamentals",
                      desc: "Understand the minimum information required to establish a valid Individual Case Safety Report.",
                    },
                    {
                      title: "Reporting timelines",
                      desc: "Learn the basic concepts behind Day 0 and expedited reporting timelines, including why applicable rules and case classifications matter.",
                    },
                    {
                      title: "MedDRA terminology",
                      desc: "Understand the relationship between Lowest Level Terms, Preferred Terms and System Organ Classes.",
                    },
                    {
                      title: "Practical case processing",
                      desc: "See how pharmacovigilance concepts are applied to case-based work.",
                    },
                  ].map((topic, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-white/10 text-[#60A5FA] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <div>
                        <strong className="text-white block">{topic.title}:</strong>
                        <span className="text-slate-300 leading-relaxed">{topic.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                  <a
                    href={PV_MASTERCLASS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <span>Watch the Free Masterclass</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    type="button"
                    onClick={() => openCounsellor("section_05_modal")}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <span>Talk to a Counsellor</span>
                  </button>
                </div>
              </div>
            </div>

            <p className="text-[10px] font-mono text-slate-400 mt-8 pt-4 border-t border-white/10 italic text-left">
              *The masterclass link and the topics covered in the recording should be verified before this section goes live.
            </p>
          </div>
        </div>
      </section>

      {/* ── 06. A DAY IN PHARMACOVIGILANCE (MACOS-STYLE CASE SIMULATOR) ──────── */}
      <section id="workflow" className="py-20 sm:py-28 bg-[#F8FAFC] border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="max-w-3xl space-y-3">
            <span className="font-mono text-xs font-bold text-[#2563EB] uppercase tracking-widest block">
              SECTION 06 · A DAY IN PHARMACOVIGILANCE
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#081F38]">
              What Does the Work Actually Involve?
            </h2>
            <p className="text-base text-[#64748B] leading-relaxed">
              Pharmacovigilance is a process-driven field. Each activity contributes to the accurate assessment and documentation of medicine safety information. Click through the 6 stages of an actual adverse event report below to see how clinical data is transformed into regulatory compliance.
            </p>
          </div>

          {/* Unified macOS-Style Segmented Case Terminal */}
          <div className="rounded-[32px] bg-white tone-light card-light border border-slate-200/80 shadow-md overflow-hidden">
            {/* Minimalist Segmented Pill Switcher */}
            <div className="border-b border-slate-200/80 bg-[#F8FAFC] p-3 overflow-x-auto scrollbar-none">
              <div className="flex items-center gap-1.5 min-w-max mx-auto">
                {SIMULATOR_STAGES.map((st, idx) => (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => {
                      setActiveStageIdx(idx);
                      trackEvent("simulator_stage_click", { stage: st.id });
                    }}
                    className={`px-4 py-2 rounded-full text-xs font-bold font-mono transition-all cursor-pointer ${
                      activeStageIdx === idx
                        ? "bg-[#2563EB] text-white shadow-2xs"
                        : "text-[#64748B] hover:text-[#081F38] hover:bg-slate-200/50"
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Terminal Canvas */}
            <div className="p-8 sm:p-12 space-y-8 text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-mono text-[10px] font-bold uppercase text-[#2563EB] bg-[#EEF6FF] px-2.5 py-0.5 rounded-full">
                      STAGE {currentStage.id} OF 06
                    </span>
                    <span className="font-mono text-[10px] font-bold text-[#10B981] bg-[#E6F7F1] px-2.5 py-0.5 rounded-full">
                      {currentStage.statusBadge}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-[#081F38]">
                    {currentStage.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
                    {currentStage.summary}
                  </p>
                </div>

                <span className="font-mono text-xs font-bold text-[#081F38] px-3 py-1 rounded-lg bg-[#F8FAFC] border border-slate-200/80 shrink-0">
                  {currentStage.protocol}
                </span>
              </div>

              {/* Split Content: Left Philosophy + Right File */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-5 space-y-5">
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#64748B]">
                    Operational Directive
                  </h4>
                  <p className="text-sm text-[#64748B] leading-relaxed">
                    {currentStage.desc}
                  </p>

                  <div className="p-4 rounded-2xl bg-[#EEF6FF] border border-[#BFDBFE]/60 space-y-1">
                    <span className="font-mono text-[10px] font-bold text-[#2563EB] uppercase block">
                      Core Quality Standard
                    </span>
                    <p className="text-xs text-[#081F38] font-medium leading-relaxed">
                      {currentStage.takeaway}
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-7 rounded-2xl border border-slate-200/80 bg-[#F8FAFC] p-6 space-y-4 font-mono text-xs">
                  <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
                    <span className="font-bold text-[#081F38] flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                      SIMULATED CLINICAL SAFETY TERMINAL
                    </span>
                    <span className="text-[11px] text-[#64748B]">Case: ARZ-PV-2026-042</span>
                  </div>

                  {currentStage.data && (
                    <div className="space-y-2">
                      {currentStage.data.map((row, rIdx) => (
                        <div key={rIdx} className="p-2.5 rounded-xl bg-white tone-light card-light border border-slate-200/80 flex items-center justify-between">
                          <span className="text-[#64748B] text-[11px]">{row.label}:</span>
                          <strong className="text-[#081F38] text-[11px] text-right">{row.value}</strong>
                        </div>
                      ))}
                    </div>
                  )}

                  {currentStage.narrativeText && (
                    <div className="space-y-2">
                      <span className="text-[11px] font-bold text-[#081F38] block">
                        CIOMS I Structured Case Text:
                      </span>
                      <div className="p-4 rounded-xl bg-white tone-light card-light border border-slate-200/80 font-sans text-xs leading-relaxed text-[#081F38]">
                        "{currentStage.narrativeText}"
                      </div>
                      <span className="text-[10px] text-[#10B981] font-bold block text-right">
                        ✓ Dechallenge &amp; Causality Logic Formatted
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Stepper Bar */}
              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={activeStageIdx === 0}
                    onClick={() => setActiveStageIdx((prev) => Math.max(0, prev - 1))}
                    className="px-4 py-2 rounded-full border border-slate-200 bg-white tone-light text-xs font-bold font-mono text-[#081F38] hover:bg-[#F8FAFC] disabled:opacity-30 cursor-pointer"
                  >
                    ← Previous
                  </button>
                  <button
                    type="button"
                    disabled={activeStageIdx === SIMULATOR_STAGES.length - 1}
                    onClick={() => setActiveStageIdx((prev) => Math.min(SIMULATOR_STAGES.length - 1, prev + 1))}
                    className="px-5 py-2 rounded-full bg-[#2563EB] text-white text-xs font-bold font-mono hover:bg-[#1D4ED8] disabled:opacity-30 cursor-pointer"
                  >
                    Next Stage →
                  </button>
                </div>

                <p className="text-[11px] font-mono text-[#64748B] italic">
                  *Important note: The exact sequence and responsibilities differ across organizations and workflows. These examples explain common activities, not a guaranteed daily schedule for every employee.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 07. THE SKILLS EMPLOYERS LOOK FOR (MINIMAL SCREENING HEATMAP) ────── */}
      <section className="py-20 sm:py-28 bg-white tone-light card-light border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="max-w-3xl space-y-3">
            <span className="font-mono text-xs font-bold text-[#2563EB] uppercase tracking-widest block">
              SECTION 07 · THE SKILLS EMPLOYERS LOOK FOR
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#081F38]">
              Prepare for the Work Behind the Job Description.
            </h2>
            <p className="text-base text-[#64748B] leading-relaxed">
              Pharmacovigilance job descriptions differ by employer and experience level. The skills below represent areas candidates should understand when preparing for entry-level drug safety opportunities.
            </p>
          </div>

          {/* Minimal Benchmark Strip */}
          <div className="rounded-[28px] p-6 bg-[#F8FAFC] border border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#EEF6FF] text-[#2563EB] flex items-center justify-center shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <span className="font-mono text-[10px] font-bold text-[#2563EB] uppercase tracking-wider block">
                  HIRING BENCHMARK RESEARCH
                </span>
                <h4 className="font-bold text-sm text-[#081F38]">
                  Global Pharma Safety GCCs &amp; Tier-1 CROs (Cognizant, IQVIA, Accenture)
                </h4>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
              <div className="px-3 py-1.5 rounded-lg bg-white tone-light card-light border border-slate-200/80">
                <span className="text-[#64748B]">Benchmark CTC: </span>
                <strong className="text-[#081F38]">₹4.20 – ₹6.00 LPA</strong>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-white tone-light card-light border border-slate-200/80">
                <span className="text-[#64748B]">Source: </span>
                <strong className="text-[#081F38]">120+ JDs Analysed</strong>
              </div>
            </div>
          </div>

          {/* Sleek Minimalist Heatmap Bars */}
          <div className="p-8 rounded-[28px] bg-[#F8FAFC] border border-slate-200/80 space-y-5">
            <div className="flex justify-between items-center border-b border-slate-200/80 pb-3">
              <span className="font-mono text-xs font-bold text-[#081F38] uppercase tracking-wider">
                Technical Screening Importance
              </span>
              <span className="font-mono text-xs font-bold text-[#2563EB]">Weighted Priority</span>
            </div>

            <div className="space-y-4">
              {[
                { label: "ICSR Case Intake & 4 Minimum Criteria Validation", pct: 95 },
                { label: "MedDRA 27.0 Hierarchy Term Mapping (LLT ➔ PT ➔ SOC)", pct: 90 },
                { label: "CIOMS I Structured Clinical Case Narrative Drafting", pct: 88 },
                { label: "Oracle Argus Safety Core Navigation & Tab Workflows", pct: 84 },
                { label: "Day-0 & 15-Day Expedited Regulatory Clock Calculations", pct: 82 },
              ].map((bar, idx) => (
                <div key={idx} className="space-y-1.5 text-xs text-left">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-[#081F38]">{bar.label}</span>
                    <span className="font-mono font-bold text-[#2563EB]">{bar.pct}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-200/80 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#2563EB] rounded-full transition-all duration-700"
                      style={{ width: `${bar.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4 Skill Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {[
              {
                category: "Core knowledge",
                icon: BookOpen,
                items: [
                  "Pharmacology and adverse drug reactions",
                  "Pharmacovigilance principles",
                  "ICSR minimum criteria and case intake",
                  "Seriousness and causality concepts",
                  "Regulatory reporting fundamentals",
                ],
              },
              {
                category: "Practical skills",
                icon: FileCheck,
                items: [
                  "Case processing and data review",
                  "MedDRA terminology coding",
                  "Clinical case narrative writing",
                  "Medical information organization",
                  "Documentation and quality checks",
                ],
              },
              {
                category: "Tools and systems",
                icon: Laptop,
                items: [
                  "Safety database concepts",
                  "Exposure to simulated case-processing workflows",
                  "Familiarity with the purpose of systems such as Oracle Argus Safety",
                  "Understanding of standardized terminology and controlled documentation",
                ],
              },
              {
                category: "Professional skills",
                icon: Users,
                items: [
                  "Attention to detail",
                  "Clear written communication",
                  "Structured thinking",
                  "Ability to follow defined procedures",
                  "Responsible handling of confidential information",
                ],
              },
            ].map((group, idx) => {
              const Icon = group.icon;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-[28px] bg-[#F8FAFC] border border-slate-200/80 space-y-5"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#EEF6FF] text-[#2563EB] flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-lg text-[#081F38]">
                      {group.category}
                    </h3>
                  </div>

                  <ul className="space-y-3 text-xs sm:text-sm text-[#64748B]">
                    {group.items.map((skill, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5 stroke-[2.5]" />
                        <span className="leading-relaxed">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="p-8 rounded-[28px] bg-[#EEF6FF] border border-[#60A5FA]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-6 text-left">
            <p className="text-base text-[#081F38] leading-relaxed max-w-2xl font-medium">
              You do not need to pretend that you already have industry experience. You need to understand the role, build relevant knowledge and demonstrate what you have learned through your work.
            </p>

            <button
              type="button"
              onClick={() => openCounsellor("section_07_skills")}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-sm shadow-sm transition-all active:scale-[0.99] cursor-pointer shrink-0"
            >
              <span>Find Out Which Skills You Need</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ── 08. YOUR 12-WEEK LEARNING PATHWAY (MINIMAL 3-COLUMN ROADMAP) ────── */}
      <section className="py-20 sm:py-28 bg-[#F8FAFC] border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="max-w-3xl space-y-3">
            <span className="font-mono text-xs font-bold text-[#2563EB] uppercase tracking-widest block">
              SECTION 08 · YOUR 12-WEEK LEARNING PATHWAY
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#081F38]">
              From Foundations to Applied Pharmacovigilance Work.
            </h2>
            <p className="text-base text-[#64748B] leading-relaxed">
              The program is organized into three learning phases, progressing from core concepts to case-processing practice and career preparation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
            {[
              {
                num: "01",
                phase: "WEEKS 1–4",
                title: "Build Your Drug Safety Foundations",
                desc: "Understand the principles behind pharmacovigilance and the purpose of safety reporting.",
                areas: [
                  "Introduction to pharmacovigilance",
                  "Adverse drug reactions and adverse events",
                  "Drug safety terminology",
                  "ICSR fundamentals and minimum criteria",
                  "Case intake and initial assessment",
                  "Seriousness and reporting concepts",
                ],
                objective:
                  "Develop a foundation for understanding the information handled by drug safety teams and the purpose of each stage in case processing.",
              },
              {
                num: "02",
                phase: "WEEKS 5–8",
                title: "Learn the Case-Processing Workflow",
                desc: "Apply your foundational knowledge to structured exercises and simulated case-processing tasks.",
                areas: [
                  "MedDRA terminology and hierarchy",
                  "Medical concept coding exercises",
                  "Case data review and organization",
                  "Safety database workflow concepts",
                  "Documentation quality checks",
                  "Case-processing practice",
                ],
                objective:
                  "Build familiarity with the structured tasks involved in processing and documenting safety information.",
              },
              {
                num: "03",
                phase: "WEEKS 9–12",
                title: "Apply Your Knowledge and Prepare for Interviews",
                desc: "Bring your learning together through applied exercises, feedback and role-focused career preparation.",
                areas: [
                  "Clinical case narrative preparation",
                  "Integrated case-processing exercises",
                  "Quality review and error identification",
                  "Applied project completion",
                  "Resume preparation for relevant roles",
                  "Technical interview preparation",
                ],
                objective:
                  "Complete the assigned learning activities and develop work samples that demonstrate your understanding of selected pharmacovigilance tasks.",
              },
            ].map((p, idx) => (
              <div
                key={idx}
                className="p-8 rounded-[28px] bg-white tone-light card-light border border-slate-200/80 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#2563EB]">
                      {p.phase}
                    </span>
                    <span className="font-mono text-2xl font-bold text-slate-300">
                      {p.num}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#081F38] leading-snug">
                    {p.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                    {p.desc}
                  </p>

                  <div className="pt-3 space-y-2 border-t border-slate-100">
                    <span className="font-mono text-[11px] font-bold text-[#081F38] uppercase block">
                      Learning Areas:
                    </span>
                    <ul className="space-y-2 text-xs text-[#64748B]">
                      {p.areas.map((a, aIdx) => (
                        <li key={aIdx} className="flex items-start gap-2">
                          <span className="text-[#2563EB] font-bold">•</span>
                          <span>{a}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200/80 text-xs space-y-1">
                  <span className="font-mono text-[10px] font-bold text-[#2563EB] uppercase block">
                    Phase Objective:
                  </span>
                  <p className="text-[#64748B] leading-relaxed">
                    {p.objective}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-8 rounded-[28px] bg-white tone-light card-light border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-6 text-left">
            <p className="text-base text-[#081F38] leading-relaxed max-w-2xl font-medium">
              The aim is to move from understanding the concepts to applying them in structured exercises and explaining your work with confidence.
            </p>

            <button
              type="button"
              onClick={() => openCounsellor("section_08_pathway")}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-sm shadow-sm transition-all active:scale-[0.99] cursor-pointer shrink-0"
            >
              <span>Discuss the 12-Week Program</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ── 09. BUILD WORK YOU CAN EXPLAIN (MINIMAL ARTIFACT SPEC-SHEET) ─────── */}
      <section className="py-20 sm:py-28 bg-white tone-light card-light border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="max-w-3xl space-y-3">
            <span className="font-mono text-xs font-bold text-[#2563EB] uppercase tracking-widest block">
              SECTION 09 · BUILD WORK YOU CAN EXPLAIN
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#081F38]">
              Do Not Just List Skills on Your Resume. Practise Applying Them.
            </h2>
            <p className="text-base text-[#64748B] leading-relaxed">
              A practical learning experience should give you opportunities to apply concepts, receive feedback and understand how your work is evaluated. The program's proposed portfolio includes four work samples.
            </p>
          </div>

          {/* Minimalist Tabbed Spec Sheet */}
          <div className="rounded-[32px] border border-slate-200/80 bg-[#F8FAFC] overflow-hidden shadow-sm">
            <div className="p-3 bg-white tone-light card-light border-b border-slate-200/80 overflow-x-auto scrollbar-none">
              <div className="flex items-center gap-2 min-w-max mx-auto">
                {ARTIFACT_GALLERY.map((art, idx) => (
                  <button
                    key={art.id}
                    type="button"
                    onClick={() => {
                      setActiveArtifactIdx(idx);
                      trackEvent("proof_of_work_tab_click", { artifact: art.name });
                    }}
                    className={`px-4 py-2 rounded-full text-xs font-bold font-mono transition-all cursor-pointer ${
                      activeArtifactIdx === idx
                        ? "bg-[#2563EB] text-white shadow-2xs"
                        : "text-[#64748B] hover:text-[#081F38] hover:bg-slate-100"
                    }`}
                  >
                    {art.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-8 sm:p-12 space-y-8 text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/80">
                <div>
                  <span className="font-mono text-xs font-bold text-[#2563EB]">
                    {currentArtifact.workSampleNum}
                  </span>
                  <h3 className="text-2xl font-bold text-[#081F38] mt-1">
                    {currentArtifact.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#64748B] mt-1">
                    {currentArtifact.desc}
                  </p>
                </div>

                <span className="font-mono text-xs font-bold text-[#10B981] bg-[#E6F7F1] px-3 py-1 rounded-full border border-[#10B981]/30 shrink-0">
                  {currentArtifact.standard}
                </span>
              </div>

              {/* Document Spec Card */}
              <div className="rounded-2xl border border-slate-200/80 bg-white tone-light card-light p-6 space-y-4 shadow-2xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 text-xs font-mono">
                  <span className="font-bold text-[#081F38] flex items-center gap-1.5">
                    <FileCheck className="w-4 h-4 text-[#2563EB]" />
                    SIMULATED WORK SAMPLE OUTPUT
                  </span>
                  <span className="text-[#10B981] font-bold">✓ Verified Deliverable</span>
                </div>

                <div className="space-y-2 font-mono text-xs">
                  {currentArtifact.records.map((r, rIdx) => (
                    <div key={rIdx} className="p-3 rounded-xl bg-[#F8FAFC] border border-slate-200/80 flex items-center justify-between">
                      <span className="text-[#64748B] text-[11px]">{r.key}:</span>
                      <strong className="text-[#081F38] text-[11px] text-right">{r.val}</strong>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <span className="text-[11px] font-mono font-bold text-[#64748B] uppercase block">
                    What Mentors Evaluate:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-[#081F38]">
                    {currentArtifact.rubrics.map((rb, rbIdx) => (
                      <div key={rbIdx} className="p-2.5 rounded-lg bg-[#F8FAFC] border border-slate-200/80 flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-[#10B981] shrink-0 mt-0.5" />
                        <span>{rb}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* What These Exercises Demonstrate */}
              <div className="p-6 rounded-2xl bg-white tone-light card-light border border-slate-200/80 space-y-4">
                <h4 className="font-bold text-base text-[#081F38]">
                  What these exercises are designed to demonstrate:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs sm:text-sm text-[#64748B]">
                  {[
                    "Your understanding of the workflow.",
                    "Your ability to organize case information.",
                    "Your familiarity with relevant terminology.",
                    "Your attention to documentation quality.",
                    "Your ability to explain your decisions.",
                  ].map((bullet, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#10B981] shrink-0 stroke-[2.5]" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => openCounsellor("section_09_projects")}
                    className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#081F38] hover:bg-[#2563EB] text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <span>Ask About Practical Projects</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <span className="text-[11px] font-mono text-[#64748B] italic">
                    *Portfolio samples should use fictional or appropriately de-identified information. Publish these as program deliverables only after confirming that all four exercises are included in the actual curriculum.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 10. CERTIFICATE AND LEARNING RECORD ─────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-[#F8FAFC] border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="max-w-3xl space-y-3">
            <span className="font-mono text-xs font-bold text-[#2563EB] uppercase tracking-widest block">
              SECTION 10 · YOUR CERTIFICATE AND LEARNING RECORD
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#081F38]">
              Document What You Have Learned.
            </h2>
            <p className="text-base text-[#64748B] leading-relaxed">
              At the end of the program, eligible participants who meet the applicable completion requirements can receive the certificate specified by the program. The certificate and any accompanying transcript should reflect the training completed and the applicable assessment requirements.
            </p>
          </div>

          <div className="rounded-[32px] bg-white tone-light card-light border border-slate-200/80 p-8 sm:p-12 shadow-sm space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center text-left">
              <div className="lg:col-span-7 space-y-6">
                <h3 className="text-2xl font-bold text-[#081F38]">
                  What to understand before enrolling
                </h3>

                <ul className="space-y-3 text-xs sm:text-sm text-[#64748B]">
                  {[
                    "Certificate issuer: Arzon Global official credential.",
                    "Course completion requirements: Satisfactory coursework progress across all 12 weeks.",
                    "Assessments and project requirements: Submission of required portfolio deliverables and rubric evaluations.",
                    "Whether a transcript is included: Documented breakdown of practical case processing hours.",
                    "How the certificate can be verified: Digital verification identifier where available.",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#EEF6FF] text-[#2563EB] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>

                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  A certificate documents your participation or achievement according to its stated terms. It does not replace employer assessments, professional experience or independent evidence of your skills.
                </p>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => openCounsellor("section_10_cert")}
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <span>Ask About Certification</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5 p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 space-y-4 text-center">
                <div className="relative rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-white tone-light card-light">
                  <img
                    src="/images/acri-certification-ai.webp"
                    alt="Official Arzon Global Certificate of Completion Preview"
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-[#081F38]/85 text-white font-mono text-[9px] font-bold">
                    SAMPLE PREVIEW
                  </div>
                </div>

                <div>
                  <span className="font-mono text-[10px] font-bold text-[#2563EB] uppercase tracking-wider block">
                    Official Credential
                  </span>
                  <h4 className="font-bold text-base text-[#081F38]">
                    Certificate of Completion
                  </h4>
                  <p className="text-xs text-[#64748B] mt-0.5">
                    Documented Pharmacovigilance Associate Role Readiness
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-white tone-light card-light border border-slate-200/80 text-[11px] font-mono text-[#64748B] space-y-1 text-left">
                  <div className="flex justify-between">
                    <span>Issuer:</span>
                    <strong className="text-[#081F38]">Arzon Global Careers</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Format:</span>
                    <strong className="text-[#081F38]">12 Weeks Practical Track</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Verification:</span>
                    <strong className="text-[#2563EB]">Digital QR Credential</strong>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-[11px] font-mono text-[#64748B] italic border-t border-slate-100 pt-4 text-left">
              *Display the certificate preview, QR verification and documented lab hours only if those features are operational and available to participants.
            </p>
          </div>
        </div>
      </section>

      {/* ── 11. CAREER GUIDANCE & LEARNER FEEDBACK ───────────────────────────── */}
      <section className="py-20 sm:py-28 bg-white tone-light card-light border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="max-w-3xl space-y-3">
            <span className="font-mono text-xs font-bold text-[#2563EB] uppercase tracking-widest block">
              SECTION 11 · CAREER GUIDANCE AND EMPLOYMENT PREPARATION
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#081F38]">
              Understand Your Next Step Before You Commit.
            </h2>
            <div className="space-y-3 text-base text-[#64748B] leading-relaxed">
              <p>
                Choosing a career path is a significant decision. You should understand the role, the skills it requires and the work involved before deciding which training is appropriate for you.
              </p>
              <p className="font-semibold text-[#081F38]">
                Our career guidance team has guided 1,000+ students toward career opportunities and can help you understand the available pathway.
              </p>
            </div>
          </div>

          {/* Real Pharmacy & Healthcare Graduate Social Proof */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-[#081F38]">
                Hear from pharmacy and healthcare graduates
              </h3>
              <span className="font-mono text-xs text-[#2563EB] font-bold">
                Verified Feedback
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
              {STUDENT_REVIEWS.map((st, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-[24px] bg-[#F8FAFC] border border-slate-200/80 space-y-4 flex flex-col justify-between"
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

                  <div className="pt-3 border-t border-slate-200/80 flex items-center gap-2.5">
                    <img
                      src={st.avatar}
                      alt={st.name}
                      className="w-8 h-8 rounded-full object-cover border border-slate-200 shrink-0"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                    <div className="min-w-0 text-left">
                      <h5 className="font-bold text-xs text-[#081F38] truncate">{st.name}</h5>
                      <p className="text-[10px] text-[#64748B] truncate">{st.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Minimal 3-Step Guidance Flow */}
          <div className="p-8 sm:p-12 rounded-[32px] bg-[#F8FAFC] border border-slate-200/80 space-y-8 text-left">
            <div className="max-w-2xl space-y-2">
              <span className="font-mono text-xs font-bold text-[#2563EB] uppercase tracking-wider block">
                Counsellor Consultation Roadmap
              </span>
              <h3 className="text-2xl font-bold text-[#081F38]">
                What Happens When You Speak With Our Guidance Team?
              </h3>
              <p className="text-xs sm:text-sm text-[#64748B]">
                A transparent, zero-pressure diagnostic session designed to give you clarity on eligibility, skill gaps, and employer readiness.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  step: "01",
                  title: "Profile & Degree Diagnostic",
                  desc: "Review your B.Pharm, Pharm.D, or science degree background to confirm technical eligibility and prerequisite coursework.",
                },
                {
                  step: "02",
                  title: "Role & Skill Gap Analysis",
                  desc: "Compare your current understanding of pharmacology against corporate ICSR case-processing expectations.",
                },
                {
                  step: "03",
                  title: "Personalized Career Plan",
                  desc: "Receive clear information on the 12-week schedule, capstone projects, payment terms, and interview preparation.",
                },
              ].map((s, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-white tone-light card-light border border-slate-200/80 space-y-2.5">
                  <span className="font-mono text-xs font-bold text-[#2563EB]">STEP {s.step}</span>
                  <h4 className="font-bold text-base text-[#081F38]">{s.title}</h4>
                  <p className="text-xs text-[#64748B] leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-200/80">
              <button
                type="button"
                onClick={() => openCounsellor("section_11_cta")}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-sm shadow-sm transition-all active:scale-[0.99] cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>Talk to a Counsellor</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <span className="text-xs text-[#64748B]">
                Have questions about the role or the program? Discuss them with our team before deciding.
              </span>
            </div>

            <p className="text-[11px] font-mono text-[#64748B] italic">
              *The 1,000+ student claim and the precise scope of employment support should be backed by internal records before publication.
            </p>
          </div>
        </div>
      </section>

      {/* ── 12. FREQUENTLY ASKED QUESTIONS (CLEAN APPLE ACCORDION) ───────────── */}
      <section id="faqs" className="py-20 sm:py-28 bg-[#F8FAFC] border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <span className="font-mono text-xs font-bold text-[#2563EB] uppercase tracking-widest block">
              SECTION 12 · FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#081F38]">
              Have Questions About Pharmacovigilance?
            </h2>
            <p className="text-sm sm:text-base text-[#64748B]">
              Transparent answers to help you evaluate if this career path is the right fit.
            </p>
          </div>

          <div className="space-y-3 text-left">
            {FAQS.map((faq, idx) => {
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
                      {idx + 1}. {faq.q}
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
      </section>

      {/* ── FINAL CLOSING CTA BANNER ─────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 bg-white tone-light card-light border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-6xl font-bold tracking-tight text-[#081F38] leading-tight">
              Your Next Career Decision Should Start With Clarity.
            </h2>
            <p className="text-base sm:text-lg text-[#64748B] leading-relaxed max-w-2xl mx-auto">
              Pharmacovigilance may be worth exploring if you are interested in medicines, patient safety, medical documentation and structured analytical work. Understand the role. Identify the skills you need. Learn what the training involves before deciding on your next step.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => openCounsellor("final_cta_primary")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-sm shadow-sm transition-all active:scale-[0.99] cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>Talk to a Counsellor</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={PV_MASTERCLASS_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("masterclass_click", { source: "final_cta_secondary" })}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white tone-light card-light border border-slate-200/80 hover:bg-[#F8FAFC] text-[#081F38] font-bold text-sm shadow-2xs transition-all active:scale-[0.99] cursor-pointer group"
            >
              <Play className="w-3.5 h-3.5 fill-current text-[#2563EB]" />
              <span>Watch the Free Masterclass</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#64748B]" />
            </a>
          </div>

          <div className="space-y-1 text-xs text-[#64748B]">
            <p>
              Speak with our career guidance team about eligibility, the learning pathway and the support available.
            </p>
            <p className="font-medium text-[#081F38]">
              No pressure to decide before you understand the program.
            </p>
          </div>
        </div>
      </section>

      {/* ── INSTITUTIONAL COMPLIANCE & EDUCATIONAL DISCLAIMER ─────────────────── */}
      <section className="py-10 bg-[#F8FAFC] border-t border-slate-200/80 text-xs text-[#64748B] text-left">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#10B981]" />
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#081F38]">
              Institutional &amp; Regulatory Transparency Notice
            </span>
          </div>
          <p className="leading-relaxed">
            Arzon Careers provides educational training and career preparation. Program completion does not guarantee employment, a particular salary, an interview or placement with any specific employer. Eligibility, curriculum, certificate requirements and career support are subject to the current program terms. Employment decisions are made by employers according to their own requirements.
          </p>
        </div>
      </section>

      {/* ── MOBILE STICKY CTA DOCK ───────────────────────────────────────────── */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 tone-light card-light backdrop-blur-md border-t border-slate-200/80 p-3 shadow-lg">
        <div className="flex items-center justify-between gap-3">
          <div className="text-left">
            <span className="text-[11px] font-bold text-[#081F38] block leading-tight">
              Exploring Drug Safety?
            </span>
            <a
              href={PV_MASTERCLASS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-mono font-bold text-[#2563EB] hover:underline inline-flex items-center gap-0.5"
            >
              <span>Free Masterclass</span>
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

      {/* ── COUNSELLOR CALLBACK MODAL (OPTION B: QUICK 3-FIELD FORM) ─────────── */}
      {isCounsellorModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsCounsellorModalOpen(false);
          }}
        >
          <div className="relative w-full max-w-lg rounded-[28px] bg-white tone-light card-light p-8 sm:p-10 shadow-2xl border border-slate-200/80 space-y-6 my-auto text-left">
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
              <h3 className="text-2xl font-bold text-[#081F38]">
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
                    className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white tone-light text-sm text-[#081F38] placeholder:text-[#64748B]/60 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all"
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
                    className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white tone-light text-sm text-[#081F38] placeholder:text-[#64748B]/60 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all"
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
                      className="w-full h-12 px-3.5 rounded-xl border border-slate-200 bg-white tone-light text-xs text-[#081F38] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all cursor-pointer"
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
                      className="w-full h-12 px-3.5 rounded-xl border border-slate-200 bg-white tone-light text-xs text-[#081F38] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all cursor-pointer"
                    >
                      {PASSING_YEARS.map((yr) => (
                        <option key={yr} value={yr}>{yr}</option>
                      ))}
                    </select>
                  </div>
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
                  Zero spam. We will only contact you to discuss your eligibility and program pathway.
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
export default PVAssociateMinimalPage;
