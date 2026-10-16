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
  AlertCircle,
  Search,
  Eye,
  CheckSquare,
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
  component: PVAssociateBrandedPage,
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

// ── Real B.Pharm / Pharm.D Student Reviews ────────────────────────────────────
const STUDENT_REVIEWS = [
  {
    name: "Anya Tiwari",
    role: "B.Pharm · JSS College of Pharmacy, Ooty",
    avatar: "/images/testimonials/anya-tiwari.png",
    initials: "AT",
    rating: 5,
    quote:
      "Comparing Pharmacovigilance against retail pharmacy made my direction crystal clear. The ICSR case exercises and MedDRA coding gave me the exact vocabulary needed for MNC technical rounds.",
  },
  {
    name: "Arun Jain",
    role: "B.Pharm · Dayanand Sagar College of Pharmacy",
    avatar: "/images/testimonials/arun-jain.png",
    initials: "AJ",
    rating: 5,
    quote:
      "The practical exposure to ADR reporting, Day-0 clock rules, and MedDRA hierarchy coding gave me immense confidence to tackle scenario-based questions at Tier-1 CROs.",
  },
  {
    name: "Sneha Rao",
    role: "B.Pharm · Osmania University, Hyderabad",
    avatar: "/images/testimonials/sneha-rao.jpg",
    initials: "SR",
    rating: 5,
    quote:
      "Learning directly how information moves through a drug safety workflow—from case triage to narrative drafting—was completely different from textbook memorization.",
  },
  {
    name: "Pooja Patel",
    role: "Pharm.D · JSS College of Pharmacy, Ooty",
    avatar: "/images/testimonials/pooja-patel.jpg",
    initials: "PP",
    rating: 5,
    quote:
      "Having verified case deliverables in my portfolio proved to recruiters that I understand case validity, seriousness criteria, and expedited reporting timelines.",
  },
];

// ── Interactive 6-Stage Case Simulation Data ─────────────────────────────────
const CASE_SIMULATOR_STAGES = [
  {
    step: "01",
    tabLabel: "01. Case Intake",
    title: "Case Intake and Initial Review",
    subtitle: "Capture, timestamp, and assign Day 0 clock to incoming safety data",
    desc: "Safety information arrives from healthcare professionals, patients, clinical studies, literature or regulatory authorities. The primary task is recording receipt date (Day 0) and logging initial case source details.",
    tag: "ICH E2D Standard",
    badge: "Day 0 Timestamp Active",
    mockFile: {
      caseId: "ARZ-PV-2026-042",
      source: "Spontaneous Report (Physician / Cardiology Dept)",
      patient: "Female, 54 Yrs (Initials: M.K.)",
      suspectDrug: "CardioVas® (Lisinopril 20mg Tablet)",
      reportedEvent: "Sudden onset severe facial swelling and respiratory tightness after 3rd dose",
      receivedDate: "Day 0 · 09:15 AM IST",
    },
    keyTakeaway: "Accurately establish the Day 0 date clock; every subsequent reporting timeline depends on this moment.",
  },
  {
    step: "02",
    tabLabel: "02. Validity & Triage",
    title: "Case Validity and Triage Assessment",
    subtitle: "Screen against the 4 Minimum Criteria and evaluate seriousness criteria",
    desc: "Review the minimum criteria for a valid case and evaluate whether the adverse reaction meets regulatory seriousness criteria (death, life-threatening, hospitalization, disability, or congenital anomaly).",
    tag: "ICH E2A Criteria",
    badge: "4/4 Criteria Validated · Serious",
    mockCriteria: [
      { label: "1. Identifiable Patient", val: "Female, 54 Yrs (Initials M.K., DOB: 1972)", valid: true },
      { label: "2. Identifiable Reporter", val: "Dr. S. Nair, MD (Cardiologist, City Care Hospital)", valid: true },
      { label: "3. Suspect Medicinal Product", val: "CardioVas® (Lisinopril 20mg OD, Batch #CV992)", valid: true },
      { label: "4. Suspected Adverse Reaction", val: "Angioedema with acute laryngeal edema", valid: true },
    ],
    seriousness: "SERIOUS: Required Hospitalization & Emergency Intervention (IV Epinephrine)",
    keyTakeaway: "If all 4 criteria are present, the report is legally valid and triage proceeds immediately into coding and narrative drafting.",
  },
  {
    step: "03",
    tabLabel: "03. MedDRA Coding",
    title: "Medical Coding with MedDRA 27.0",
    subtitle: "Map verbatim clinical descriptions into standardized regulatory terminology",
    desc: "Convert verbatim reported terms into the 5-level MedDRA hierarchy. Ensure highest level of specificity without introducing unsupported clinical assumptions.",
    tag: "MedDRA 27.0 MSSO",
    badge: "Hierarchical Alignment Verified",
    codingTree: [
      { level: "Reported Verbatim", term: "Severe facial and lip swelling with throat tightness", code: "—" },
      { level: "Lowest Level Term (LLT)", term: "Swelling of lips and face", code: "10024561" },
      { level: "Preferred Term (PT)", term: "Angioedema", code: "10002424" },
      { level: "High Level Term (HLT)", term: "Allergic conditions NEC", code: "10001718" },
      { level: "High Level Group Term (HLGT)", term: "Allergic conditions", code: "10001717" },
      { level: "System Organ Class (SOC)", term: "Immune system disorders", code: "10021428" },
    ],
    keyTakeaway: "Accurate PT mapping ensures signals are detectable across global regulatory safety databases (EudraVigilance / FAERS).",
  },
  {
    step: "04",
    tabLabel: "04. Narrative Drafting",
    title: "Clinical Case Narrative Preparation",
    subtitle: "Organize medical history, chronological event course, and outcome into CIOMS format",
    desc: "Draft a clear, structured clinical narrative that tells the complete medical story without losing critical clinical chronology, laboratory values, or dechallenge details.",
    tag: "CIOMS I Format",
    badge: "Chronological Sequence Approved",
    narrativePreview:
      "A 54-year-old female patient (M.K.) with essential hypertension was initiated on Lisinopril 20mg orally once daily on 12-Oct-2026. Approximately 4 hours following the third dose on 14-Oct-2026, the patient developed acute facial swelling, lip edema, and laryngeal tightness. The patient presented to the emergency department, where acute angioedema was diagnosed. Lisinopril was permanently discontinued (positive dechallenge). The patient was treated with intravenous epinephrine and corticosteroids. Symptoms resolved within 18 hours. The reporting cardiologist assessed the event as probable causality related to Lisinopril.",
    keyTakeaway: "A well-crafted narrative enables medical reviewers to assess causality in seconds without re-reading raw source hospital records.",
  },
  {
    step: "05",
    tabLabel: "05. Quality Review",
    title: "Quality Review & Consistency Check",
    subtitle: "Perform SOP checks, cross-field validation, and duplicate detection",
    desc: "Check case data for completeness, internal consistency, accuracy of coding, and absence of conflicting dates before final medical review and gateway submission.",
    tag: "GVP Module VI QA",
    badge: "Quality Pass Score: 100%",
    qaChecks: [
      { check: "Patient demographics consistent across all forms", status: "PASS" },
      { check: "Chronology check: Adverse event date occurred after drug initiation", status: "PASS" },
      { check: "MedDRA PT 'Angioedema' matches reported clinical findings", status: "PASS" },
      { check: "Dechallenge positive documented; no rechallenge attempted", status: "PASS" },
      { check: "Expedited regulatory clock calculation confirmed", status: "PASS" },
    ],
    keyTakeaway: "Rigorous quality review prevents regulatory audit findings and costly submission rejections from authorities.",
  },
  {
    step: "06",
    tabLabel: "06. Regulatory Reporting",
    title: "Regulatory Reporting & Transmission",
    subtitle: "Determine reporting timelines and prepare electronic transmission gateway files",
    desc: "Understand how applicable reporting timelines (15-day expedited vs periodic safety update reports), country-specific health authority rules, and ICH E2B(R3) standards guide electronic submission.",
    tag: "FDA / EMA Gateway",
    badge: "15-Day Expedited Clock Active",
    clockSchedule: {
      caseClassification: "Serious & Unexpected Adverse Drug Reaction (SUSAR / Serious ADR)",
      regulatoryClock: "15 Calendar Days from Day 0",
      day0Date: "14-Oct-2026",
      submissionDeadline: "29-Oct-2026 (Day 15)",
      status: "E2B(R3) XML File Generated & Validated for Electronic Gateway Transmission",
    },
    keyTakeaway: "Timely submission safeguards public health and maintains market compliance for global pharmaceutical sponsors.",
  },
];

// ── Interactive Proof-of-Work Deliverables Data ──────────────────────────────
const PROOF_OF_WORK_ARTIFACTS = [
  {
    id: "artifact-01",
    tabTitle: "ICSR Triage Dossier",
    badge: "ICH E2A / E2D",
    workSampleNum: "WORK SAMPLE 01",
    title: "ICSR Triage and Validity Review Dossier",
    desc: "Practise reviewing incoming adverse event reports against the 4 minimum criteria, documenting missing fields, and recording Day-0 timelines for corporate safety compliance.",
    rubricPoints: [
      "Validation of Patient, Reporter, Suspect Drug, and Adverse Event",
      "Identification of missing critical data for follow-up queries",
      "Seriousness criteria classification checklist",
    ],
    mockDoc: {
      type: "CLINICAL SAFETY TRIAGE RECORD",
      caseNum: "ARZ-ICSR-2026-089",
      reporter: "Clinical Pharmacist, Oncology Day Care",
      drug: "Immunox® (Targeted Monoclonal Antibody)",
      event: "Grade 3 Infusion-Related Reaction (Hypotension, Urticaria)",
      validityVerdict: "VALID ICSR · SERIOUS (Medically Significant)",
      actionRequired: "Priority 1 Triage; Dispatch Day-0 Notification to Global Safety Lead",
    },
  },
  {
    id: "artifact-02",
    tabTitle: "MedDRA Coding Record",
    badge: "MedDRA 27.0",
    workSampleNum: "WORK SAMPLE 02",
    title: "MedDRA Multi-Axial Hierarchy Assignment Record",
    desc: "Work through real-world case scenarios to map complex clinical narratives into standardized MedDRA terms following international Point to Consider (PtC) coding rules.",
    rubricPoints: [
      "Selection of most specific Lowest Level Term (LLT)",
      "Understanding primary vs secondary System Organ Class (SOC) mapping",
      "Avoiding split-coding errors and diagnostic assumptions",
    ],
    mockDoc: {
      type: "MEDDRA CODING SPECIFICATION RECORD",
      sourceVerbatim: "Elevated serum alanine aminotransferase and jaundice 2 weeks post treatment",
      term1: "LLT: ALT increased [10001551] ➔ PT: Alanine aminotransferase increased [10001551] ➔ SOC: Investigations",
      term2: "LLT: Jaundice [10023126] ➔ PT: Jaundice [10023126] ➔ SOC: Hepatobiliary disorders",
      codingRuleApplied: "Separate coding of distinct clinical symptoms and laboratory investigations per MedDRA PtC Section 2.3",
      coderSignoff: "Verified & Quality Audited",
    },
  },
  {
    id: "artifact-03",
    tabTitle: "CIOMS I Narrative",
    badge: "CIOMS I Standard",
    workSampleNum: "WORK SAMPLE 03",
    title: "CIOMS I Structured Clinical Case Narrative",
    desc: "Prepare structured, audit-ready clinical narratives from complex case scenario notes, organizing medical history, timeline of therapy, adverse event progression, and outcome.",
    rubricPoints: [
      "Standard chronological presentation format",
      "Dechallenge and rechallenge documentation accuracy",
      "Clear differentiation between facts and medical opinions",
    ],
    mockDoc: {
      type: "STRUCTURED CLINICAL NARRATIVE",
      patientProfile: "62-year-old male, history of Type 2 Diabetes and Hypertension",
      therapyHistory: "Metformin 1000mg BID (3 years), Atorvastatin 20mg OD (1 year)",
      incidentSummary:
        "On Day 14 of new antibiotic therapy, patient developed generalized pruritic maculopapular rash. Therapy discontinued; antihistamines administered with complete resolution within 48 hours.",
      dechallengeVerdict: "Positive Dechallenge documented; drug withdrawal resulted in resolution of reaction.",
      auditGrade: "Auditor Score: 98/100 · Ready for Medical Review",
    },
  },
  {
    id: "artifact-04",
    tabTitle: "Expedited Clock Matrix",
    badge: "GVP Module VI",
    workSampleNum: "WORK SAMPLE 04",
    title: "Expedited Reporting Decision Matrix",
    desc: "Analyze safety reports to determine regulatory submission obligations, applying 7-day fatal/life-threatening vs 15-day serious clock logic across FDA, EMA, and CDSCO rules.",
    rubricPoints: [
      "Calculation of Day 0 across spontaneous vs clinical trial sources",
      "Determination of expectedness using Reference Safety Information (RSI / SmPC)",
      "Expedited vs Periodic Safety Update Report (PSUR / PBRER) routing",
    ],
    mockDoc: {
      type: "REGULATORY REPORTING PATHWAY MATRIX",
      caseType: "Spontaneous Serious Unexpected Adverse Reaction",
      referenceSafetyDoc: "Investigator's Brochure (IB) v4.0 / Package Insert",
      listedness: "UNLISTED / UNEXPECTED in Section 4.8 of SmPC",
      regulatoryAction: "15-Calendar Day Expedited Submission Required (US FDA MedWatch 3500A & EMA)",
      calendarCountdown: "Day 0 = Oct 14 ➔ Electronic Gateway Deadline = Oct 29, 23:59 GMT",
    },
  },
];

// ── Main Page Component ──────────────────────────────────────────────────────
function PVAssociateBrandedPage() {
  const [isCounsellorModalOpen, setIsCounsellorModalOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Interactive Component State
  const [activeSimulatorStage, setActiveSimulatorStage] = useState(0);
  const [activeArtifactTab, setActiveArtifactTab] = useState(0);
  const [activeMilestonePhase, setActiveMilestonePhase] = useState(0);
  const [selectedDegree, setSelectedDegree] = useState("B.Pharm");

  // Counsellor Form State (Option B: Quick 3-field Callback)
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
      source: "branded_visual_master_copy_v2",
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

    // Instant receipt & direct WhatsApp launch
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      try {
        const text = `Hi Arzon Guidance Team! I submitted my details on the Pharmacovigilance page:\nName: ${counsellorForm.name}\nPhone: ${counsellorForm.phone}\nDegree: ${counsellorForm.degree} (${counsellorForm.year})\nI would like to discuss my eligibility and the 12-week program.`;
        window.open(waMsg(text), "_blank");
      } catch {}
    }, 400);
  };

  const currentStage = CASE_SIMULATOR_STAGES[activeSimulatorStage];
  const currentArtifact = PROOF_OF_WORK_ARTIFACTS[activeArtifactTab];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#081F38] font-sans antialiased selection:bg-[#2563EB] selection:text-white">
      {/* ── 01. HERO SECTION (MASTER COPY + INTERACTIVE BENTO CARD) ──────────── */}
      <section className="relative overflow-hidden bg-white tone-light card-light border-b border-[#E2E8F0] pt-8 pb-14 sm:pt-14 sm:pb-20">
        {/* Subtle Ambient Background Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#E2E8F0_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Arzon Breadcrumbs & Authority Chip */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#E2E8F0]/80">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-semibold text-[#64748B]">
              <Link to="/" className="hover:text-[#081F38] transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5 text-[#94A3B8]" />
              <Link to="/courses" className="hover:text-[#081F38] transition-colors">Programmes</Link>
              <ChevronRight className="w-3.5 h-3.5 text-[#94A3B8]" />
              <span className="text-[#081F38] font-bold">Pharmacovigilance Associate</span>
            </nav>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] text-[11px] font-mono font-bold text-[#081F38]">
              <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
              Arzon Global Healthcare Careers · Role Readiness
            </span>
          </div>

          {/* Master Hero Grid: Left Copy & CTAs + Right Interactive Bento Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column (7 cols): Copy, CTAs, Indicators */}
            <div className="lg:col-span-7 space-y-6">
              {/* Eyebrow Pill */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E6F7F1] border border-[#10B981]/30 text-[#081F38] font-mono text-xs font-bold uppercase tracking-wider shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-[#10B981] motion-safe:animate-pulse" />
                  PHARMACOVIGILANCE CAREER PATHWAY · 12-WEEK PROGRAM
                </span>
              </div>

              {/* Primary H1 Headline */}
              <div className="space-y-4">
                <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-bold tracking-tight text-[#081F38] leading-[1.12]">
                  Build the Skills to Start Your Career in Pharmacovigilance.
                </h1>
                <p className="text-base sm:text-lg text-[#64748B] leading-relaxed">
                  Understand how drug safety teams process adverse event reports, assess safety information and document cases. Develop practical skills aligned with entry-level pharmacovigilance work through structured training, case-based exercises and career preparation.
                </p>
              </div>

              {/* Faculty Trust Micro-Badge (Above-the-Fold Authority) */}
              <div className="inline-flex items-center gap-3.5 p-2 pr-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] shadow-2xs">
                <img
                  src={mentorKumailImg}
                  alt="Mohamed Kumail Abbas"
                  className="w-12 h-12 rounded-xl object-cover object-top border border-[#E2E8F0] shadow-2xs shrink-0"
                />
                <div className="text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-[#081F38]">
                      Mentored by Mohamed Kumail Abbas
                    </span>
                    <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-bold uppercase bg-[#E6F7F1] text-[#10B981] border border-[#10B981]/30">
                      Lead Mentor
                    </span>
                  </div>
                  <p className="text-[11px] text-[#64748B] font-mono">
                    Manager, PV Operations · Ex-Cognizant, Quintiles, Accenture
                  </p>
                </div>
              </div>

              {/* Dual Call To Actions */}
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
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white tone-light card-light border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#081F38] font-bold text-sm shadow-2xs transition-all active:scale-[0.99] cursor-pointer group"
                >
                  <div className="w-5 h-5 rounded-full bg-[#EEF6FF] text-[#2563EB] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-3 h-3 fill-current ml-0.5" />
                  </div>
                  <span>Watch the Free Masterclass</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#64748B]" />
                </a>
              </div>

              {/* Supporting Copy */}
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                Not sure whether pharmacovigilance is right for you? Speak with our career guidance team to understand the role, eligibility and training pathway before making a decision.
              </p>
            </div>

            {/* Right Column (5 cols): Interactive Workstation Bento Card with Degree Selector */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-[#E2E8F0] bg-white tone-light card-light p-3.5 shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden group space-y-3">
                {/* Visual Workstation Media */}
                <div className="relative rounded-2xl overflow-hidden aspect-4/3 bg-slate-900">
                  <img
                    src="/images/pv-clinical-workstation.jpg"
                    alt="Clinical Pharmacovigilance Case Processing Workstation"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#081F38]/90 via-[#081F38]/30 to-transparent pointer-events-none" />

                  {/* Top Floating Badge */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md font-mono text-[10px] font-bold text-[#081F38] border border-white/50 shadow-xs flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                      CLINICAL SAFETY OPERATIONS
                    </span>
                    <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-[#2563EB] text-white">
                      12 WEEKS
                    </span>
                  </div>

                  {/* Floating Frosted Dossier Pill */}
                  <div className="absolute bottom-3 inset-x-3 rounded-xl backdrop-blur-md bg-white/95 border border-white/80 p-3 shadow-sm tone-light card-light">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="h-8 w-8 rounded-lg bg-[#2563EB] text-white flex items-center justify-center font-mono font-bold text-xs shrink-0 shadow-2xs">
                          PV
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-[#081F38] truncate flex items-center gap-1.5">
                            <span>ICSR Triage &amp; Safety Cases</span>
                            <span className="text-[9px] bg-[#E6F7F1] text-[#10B981] border border-[#10B981]/30 px-1 py-0.2 rounded font-mono font-bold">
                              PRACTICAL
                            </span>
                          </div>
                          <div className="text-[10px] text-[#64748B] font-mono truncate">
                            Workflows: <span className="font-semibold text-[#081F38]">Oracle Argus Safety &amp; MedDRA</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Interactive Degree Fitment Selector */}
                <div className="p-3 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
                      Check Your Eligibility
                    </span>
                    <span className="font-mono text-[10px] font-bold text-[#10B981] flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-[#10B981]" />
                      Eligible Track
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
                            degree: deg.includes("Pharm")
                              ? `${deg} (Pharmacy Graduate)`
                              : `${deg} (Healthcare Graduate)`,
                          }));
                        }}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold font-mono transition-all cursor-pointer ${
                          selectedDegree === deg
                            ? "bg-[#2563EB] text-white shadow-2xs scale-102"
                            : "bg-white tone-light card-light border border-[#E2E8F0] text-[#081F38] hover:bg-[#EEF6FF]"
                        }`}
                      >
                        {deg}
                      </button>
                    ))}
                  </div>

                  <p className="text-[11px] text-[#64748B] pt-0.5">
                    Selected: <strong className="text-[#081F38]">{selectedDegree}</strong> meets the academic prerequisites for entry-level drug safety roles.
                  </p>
                </div>

                {/* Micro Metric Ticker */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                    <span className="block font-bold text-[#081F38] text-xs">15+ Cases</span>
                    <span className="text-[10px] text-[#64748B] font-mono">ICSR Practice</span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                    <span className="block font-bold text-[#081F38] text-xs">MedDRA 27.0</span>
                    <span className="text-[10px] text-[#64748B] font-mono">LLT/PT Coding</span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                    <span className="block font-bold text-[#081F38] text-xs">1-on-1 Prep</span>
                    <span className="text-[10px] text-[#64748B] font-mono">MNC Interviews</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Trust Indicators Bar */}
          <div className="pt-6 border-t border-[#E2E8F0]">
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

            {/* Audience Line */}
            <p className="mt-4 text-xs font-mono text-[#64748B]">
              <span className="font-bold text-[#081F38]">Audience:</span> For eligible B.Pharm, M.Pharm, Pharm.D, MBBS, BDS and Life Sciences graduates.
            </p>
          </div>
        </div>
      </section>

      {/* ── 02. UNDERSTAND THE CAREER (CAREER TRANSITION MATRIX + ROLES) ──────── */}
      <section className="py-16 sm:py-20 bg-[#F8FAFC] border-b border-[#E2E8F0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-4">
            <span className="font-mono text-xs font-bold text-[#2563EB] uppercase tracking-wider block">
              SECTION 02 · UNDERSTAND THE CAREER
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#081F38]">
              Your Pharmacy Degree Can Lead to More Than You Think.
            </h2>
            <div className="space-y-3 text-sm sm:text-base text-[#64748B] leading-relaxed">
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

          {/* VISUAL CAREER TRANSITION MATRIX: Traditional Retail vs Corporate Drug Safety */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column: Traditional Pharmacy Options */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white tone-light card-light border border-[#E2E8F0] space-y-5 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#F1F5F9] text-[#64748B]">
                  ACADEMIC DEFAULT ROUTE
                </span>
                <span className="font-mono text-xs text-[#64748B]">Local Scope</span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#081F38]">
                  Retail Pharmacy &amp; Field Sales
                </h3>
                <p className="text-xs text-[#64748B] mt-1">
                  Common default jobs taken by fresh graduates without specialized operational training
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
                  <span className="text-[11px] font-mono text-[#64748B] block">Starting Compensation</span>
                  <span className="text-base font-bold text-[#081F38]">₹1.80 – ₹2.50 LPA</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
                  <span className="text-[11px] font-mono text-[#64748B] block">Daily Work Environment</span>
                  <p className="text-xs text-[#64748B]">Standing counters, retail prescription billing, inventory stocking, 6-day rotational shifts.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
                  <span className="text-[11px] font-mono text-[#64748B] block">Career Trajectory</span>
                  <p className="text-xs text-[#64748B]">Store manager or regional sales rep with severe growth plateau after 3-5 years.</p>
                </div>
              </div>
            </div>

            {/* Right Column: Corporate Drug Safety Associate (Featured) */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#EEF6FF] border-2 border-[#2563EB] space-y-5 shadow-md relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#2563EB] text-white">
                  HIGH-GROWTH GLOBAL TRACK
                </span>
                <span className="font-mono text-xs font-bold text-[#2563EB]">MNC Campus</span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#081F38]">
                  Corporate Drug Safety Associate (PV)
                </h3>
                <p className="text-xs text-[#64748B] mt-1">
                  Specialized analytical operations across global pharma GCCs and Tier-1 CROs
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="p-3.5 rounded-xl bg-white tone-light card-light border border-[#BFDBFE] space-y-1">
                  <span className="text-[11px] font-mono text-[#2563EB] font-bold block">Benchmark Starting Compensation</span>
                  <span className="text-lg font-bold text-[#081F38]">₹4.20 – ₹6.00 LPA</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white tone-light card-light border border-[#BFDBFE] space-y-1">
                  <span className="text-[11px] font-mono text-[#2563EB] font-bold block">Daily Work Environment</span>
                  <p className="text-xs text-[#081F38] font-medium">Modern corporate technology campus (Cognizant, Quintiles, Accenture), Monday-to-Friday schedule, clinical data workstations.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-white tone-light card-light border border-[#BFDBFE] space-y-1">
                  <span className="text-[11px] font-mono text-[#2563EB] font-bold block">Career Trajectory</span>
                  <p className="text-xs text-[#081F38] font-medium">Clear progression: Safety Associate ➔ Senior Associate ➔ PV Lead ➔ Operations Manager ➔ Global Safety Director.</p>
                </div>
              </div>
            </div>
          </div>

          {/* What does a Drug Safety Associate do? Visual Blueprint */}
          <div className="rounded-3xl bg-white tone-light card-light border border-[#E2E8F0] p-6 sm:p-10 shadow-sm space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E8F0] pb-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#081F38]">
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
                    className={`p-5 rounded-2xl border transition-all ${
                      item.isMeta
                        ? "bg-[#F8FAFC] border-[#E2E8F0] border-dashed text-[#64748B]"
                        : "bg-white tone-light card-light border-[#E2E8F0] hover:border-[#2563EB]/40 shadow-2xs"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-[#EEF6FF] text-[#2563EB] flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      {item.badge && (
                        <span className="font-mono text-[10px] font-bold text-[#2563EB] bg-[#EEF6FF] px-2 py-0.5 rounded border border-[#D0E1FD]">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <h4 className="font-bold text-sm sm:text-base text-[#081F38] mb-1.5">
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

      {/* ── 03. THE CAREER GAP (THEORY VS OPERATIONS COMPETENCY SCANNER) ──────── */}
      <section className="py-16 sm:py-20 bg-white tone-light card-light border-b border-[#E2E8F0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-4">
            <span className="font-mono text-xs font-bold text-[#2563EB] uppercase tracking-wider block">
              SECTION 03 · THE CAREER GAP
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#081F38]">
              Knowing Pharmacology Is One Thing. Applying It to Drug Safety Work Is Another.
            </h2>
            <div className="space-y-3 text-sm sm:text-base text-[#64748B] leading-relaxed">
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

          {/* Comparative Matrix: Academic Theory vs Applied Operations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
              <span className="font-mono text-xs font-bold text-[#64748B] uppercase tracking-wider block">
                WHAT PHARMACY COLLEGE TEACHES
              </span>
              <h4 className="font-bold text-base text-[#081F38]">
                Foundational Sciences &amp; Theory
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-[#64748B]">
                {[
                  "Mechanism of action & receptor binding kinetics",
                  "Therapeutic classification of medicinal substances",
                  "Pathology, human anatomy and clinical diseases",
                  "Basic adverse drug reaction (ADR) terminology",
                ].map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#64748B]">•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-3xl bg-[#EEF6FF] border border-[#BFDBFE] space-y-3">
              <span className="font-mono text-xs font-bold text-[#2563EB] uppercase tracking-wider block">
                WHAT DRUG SAFETY TEAMS SCREEN FOR
              </span>
              <h4 className="font-bold text-base text-[#081F38]">
                Applied Operations &amp; Documentation
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-[#081F38]">
                {[
                  "Validating the 4 minimum ICSR criteria on Day 0",
                  "MedDRA hierarchy term mapping (LLT, PT, SOC)",
                  "Structured chronological narrative drafting (CIOMS I)",
                  "Expedited 15-day vs periodic safety reporting clock logic",
                ].map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5 stroke-[2.5]" />
                    <span className="font-medium">{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* The Skills You Need to Understand: Visual Gauge Cards */}
          <div className="space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-[#081F38]">
              The skills you need to understand
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  num: "01",
                  title: "Case processing",
                  desc: "Learn how safety information is collected, reviewed and organized into an Individual Case Safety Report (ICSR).",
                  metric: "95% Recruiter Screening Weight",
                  barPct: "w-[95%]",
                },
                {
                  num: "02",
                  title: "Medical terminology coding",
                  desc: "Understand the MedDRA hierarchy and how medical concepts are mapped to standardized terminology.",
                  metric: "90% Recruiter Screening Weight",
                  barPct: "w-[90%]",
                },
                {
                  num: "03",
                  title: "Clinical documentation",
                  desc: "Practise organizing case information and writing structured narratives without losing important medical details.",
                  metric: "88% Recruiter Screening Weight",
                  barPct: "w-[88%]",
                },
                {
                  num: "04",
                  title: "Safety assessment",
                  desc: "Understand the concepts used to evaluate adverse events, seriousness, causality and reporting requirements.",
                  metric: "86% Recruiter Screening Weight",
                  barPct: "w-[86%]",
                },
                {
                  num: "05",
                  title: "Quality and compliance",
                  desc: "Learn why accuracy, traceability, confidentiality and standard operating procedures matter in drug safety operations.",
                  metric: "84% Recruiter Screening Weight",
                  barPct: "w-[84%]",
                },
                {
                  num: "->",
                  title: "Interview Readiness",
                  desc: "Connect these operational concepts together so you can articulate your decisions during technical hiring rounds.",
                  metric: "Complete Capstone Portfolio",
                  barPct: "w-[100%]",
                  isHighlight: true,
                },
              ].map((skill, idx) => (
                <div
                  key={idx}
                  className={`p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                    skill.isHighlight
                      ? "bg-[#EEF6FF] border-[#60A5FA]/40 text-[#081F38]"
                      : "bg-[#F8FAFC] border-[#E2E8F0] hover:border-[#2563EB]/40"
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-[#2563EB]">
                        {skill.num}
                      </span>
                      <span className="font-mono text-[10px] font-bold text-[#10B981] bg-[#E6F7F1] px-2 py-0.5 rounded">
                        PRACTICAL
                      </span>
                    </div>
                    <h4 className="font-bold text-base text-[#081F38]">
                      {skill.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                      {skill.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#E2E8F0] space-y-1.5">
                    <div className="flex justify-between text-[10px] font-mono font-bold text-[#64748B]">
                      <span>Screening Priority</span>
                      <span className="text-[#2563EB]">{skill.metric}</span>
                    </div>
                    <div className="h-1.5 w-full bg-[#E2E8F0] rounded-full overflow-hidden">
                      <div className={`h-full bg-[#2563EB] rounded-full ${skill.barPct}`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Closing Box & CTA */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <p className="text-sm sm:text-base text-[#081F38] leading-relaxed max-w-2xl font-medium">
              The objective is not simply to finish a course. It is to develop a clearer understanding of the work, practise relevant tasks and prepare to discuss your knowledge in an interview.
            </p>

            <button
              type="button"
              onClick={() => openCounsellor("section_03_gap")}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-sm shadow-sm transition-all active:scale-[0.99] cursor-pointer shrink-0"
            >
              <span>Discuss Your Career Goals</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ── 04. LEARN FROM INDUSTRY EXPERIENCE (LEAD MENTOR DOSSIER) ─────────── */}
      <section id="mentor" className="py-16 sm:py-24 bg-[#F8FAFC] border-b border-[#E2E8F0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <span className="font-mono text-xs font-bold text-[#2563EB] uppercase tracking-wider block">
              SECTION 04 · LEARN FROM INDUSTRY EXPERIENCE
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#081F38]">
              Learn How Pharmacovigilance Works Beyond the Textbook.
            </h2>
            <p className="text-base text-[#64748B]">
              Meet Mohamed Kumail Abbas, the lead mentor identified for this program.
            </p>
          </div>

          {/* Master Faculty Dossier Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left: Mentor Portrait & Verified Identity (5 Cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-3xl overflow-hidden bg-white tone-light card-light border border-[#E2E8F0] shadow-md">
                <img
                  src={mentorKumailImg}
                  alt="Mohamed Kumail Abbas - Manager, Pharmacovigilance Operations"
                  className="w-full h-auto aspect-4/5 object-cover object-top"
                />
                <div className="p-6 space-y-2 border-t border-[#E2E8F0]">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#E6F7F1] border border-[#10B981]/30 font-mono text-[10px] font-bold text-[#10B981] uppercase">
                      VERIFIED PRACTITIONER
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

              <p className="text-xs text-[#64748B] leading-relaxed p-4 rounded-xl bg-white tone-light card-light border border-[#E2E8F0]">
                His experience provides the foundation for connecting pharmacovigilance concepts with the workflows, documentation standards and practical expectations associated with drug safety operations.
              </p>

              {/* Functional Competency Tags */}
              <div className="p-5 rounded-2xl bg-white tone-light card-light border border-[#E2E8F0] space-y-3">
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#64748B] block">
                  Core Technical Competencies
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "ICSR Intake & Triage (ICH E2A / E2D)",
                    "MedDRA 27.0 Hierarchy (LLT, PT, SOC)",
                    "Safety Narratives & Case Structuring",
                    "Oracle Argus Safety Concepts",
                    "Regulatory Timelines (Day 0 & Expedited)",
                    "Technical Interview Case Studies",
                  ].map((skill, idx) => (
                    <span
                      key={idx}
                      className="font-mono text-[11px] px-2.5 py-1 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[#081F38] font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: What You Learn + Mentor Quote + Career Progression (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Mentor Direct Statement Quote */}
              <blockquote className="p-6 sm:p-7 rounded-2xl bg-white tone-light card-light border-l-4 border-[#2563EB] border-y border-r border-[#E2E8F0] shadow-2xs space-y-3">
                <p className="font-serif italic text-base sm:text-lg text-[#081F38] leading-relaxed">
                  "Understanding pharmacovigilance means more than knowing the terminology. You need to understand how information moves through a safety workflow, why each step matters and how accuracy affects the quality of the final case."
                </p>
                <footer className="font-mono text-xs font-semibold text-[#64748B]">
                  — Mohamed Kumail Abbas, Lead Program Mentor
                </footer>
              </blockquote>

              {/* What You Should Learn From The Mentor-Led Experience */}
              <div className="p-6 sm:p-7 rounded-2xl bg-white tone-light card-light border border-[#E2E8F0] space-y-4">
                <h4 className="font-bold text-base text-[#081F38]">
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

                <div className="pt-4 border-t border-[#E2E8F0]">
                  <button
                    type="button"
                    onClick={() => openCounsellor("section_04_mentor")}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#081F38] hover:bg-[#2563EB] text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <span>Talk to a Counsellor About the Program</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Career Progression Timeline */}
              <div className="p-6 rounded-2xl bg-white tone-light card-light border border-[#E2E8F0] space-y-4">
                <span className="font-mono text-xs font-bold text-[#64748B] uppercase tracking-wider block">
                  Documented Career Track
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  {[
                    { company: "Quintiles", role: "Triage Line (Post-M.Pharm)" },
                    { company: "Indegene", role: "Safety Case Processing" },
                    { company: "Cognizant / Accenture", role: "Lead Safety & Aggregate" },
                    { company: "Novaspire", role: "Manager, PV Operations" },
                  ].map((step, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
                      <span className="font-mono text-[10px] text-[#2563EB] font-bold block">
                        Step 0{idx + 1}
                      </span>
                      <h5 className="font-bold text-xs text-[#081F38]">{step.company}</h5>
                      <p className="text-[10px] text-[#64748B] leading-tight">{step.role}</p>
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

      {/* ── 05. WATCH THE FREE MASTERCLASS (INTERACTIVE THEATRE STAGE) ───────── */}
      <section className="py-16 sm:py-20 bg-white tone-light card-light border-b border-[#E2E8F0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-3xl space-y-3">
            <span className="font-mono text-xs font-bold text-[#2563EB] uppercase tracking-wider block">
              SECTION 05 · WATCH THE FREE MASTERCLASS
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#081F38]">
              See the Work Before You Decide.
            </h2>
            <p className="text-base text-[#64748B] leading-relaxed">
              Explore an introductory pharmacovigilance masterclass featuring Mohamed Kumail Abbas. Get an introduction to the concepts involved in safety case processing and understand what practical learning in this field can look like.
            </p>
          </div>

          {/* Masterclass Feature Card */}
          <div className="rounded-3xl bg-[#081F38] text-white p-6 sm:p-10 shadow-xl overflow-hidden relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Direct Launch Video Thumbnail (6 Cols) */}
              <div className="lg:col-span-6">
                <a
                  href={PV_MASTERCLASS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("masterclass_card_click", { section: "section_05" })}
                  className="group relative rounded-2xl overflow-hidden border border-white/10 shadow-lg cursor-pointer aspect-video w-full bg-black block"
                  aria-label="Watch Mohamed Kumail Abbas pharmacovigilance masterclass on Google Drive (Starts at 11:30)"
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

              {/* Right Column: Topics Covered in Masterclass (6 Cols) */}
              <div className="lg:col-span-6 space-y-6">
                <div className="space-y-2">
                  <span className="font-mono text-xs font-bold text-[#60A5FA] uppercase tracking-wider block">
                    What to look for in the masterclass
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    4 Operational Concepts Walked Through on Screen
                  </h3>
                </div>

                <div className="space-y-4">
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
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm">
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

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                  <a
                    href={PV_MASTERCLASS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <span>Watch the Free Masterclass</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    type="button"
                    onClick={() => openCounsellor("section_05_modal")}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <span>Talk to a Counsellor</span>
                  </button>
                </div>
              </div>
            </div>

            <p className="text-[10px] font-mono text-slate-400 mt-6 pt-4 border-t border-white/10 italic">
              *The masterclass link and the topics covered in the recording should be verified before this section goes live.
            </p>
          </div>
        </div>
      </section>

      {/* ── 06. A DAY IN PHARMACOVIGILANCE (INTERACTIVE 6-STAGE CASE SIMULATOR) ─ */}
      <section id="workflow" className="py-16 sm:py-24 bg-[#F8FAFC] border-b border-[#E2E8F0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <span className="font-mono text-xs font-bold text-[#2563EB] uppercase tracking-wider block">
              SECTION 06 · A DAY IN PHARMACOVIGILANCE
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#081F38]">
              What Does the Work Actually Involve?
            </h2>
            <p className="text-base text-[#64748B] leading-relaxed">
              Pharmacovigilance is a process-driven field. Each activity contributes to the accurate assessment and documentation of medicine safety information. Click through the 6 stages of an actual adverse event report below to see how clinical data is transformed into regulatory compliance.
            </p>
          </div>

          {/* Interactive 6-Stage Case Processing Simulator */}
          <div className="rounded-3xl bg-white tone-light card-light border border-[#E2E8F0] shadow-md overflow-hidden">
            {/* Top Interactive Stage Tab Selector Bar */}
            <div className="border-b border-[#E2E8F0] bg-[#F8FAFC] p-2 sm:p-3 overflow-x-auto scrollbar-none">
              <div className="flex items-center gap-1.5 min-w-max">
                {CASE_SIMULATOR_STAGES.map((st, idx) => (
                  <button
                    key={st.step}
                    type="button"
                    onClick={() => {
                      setActiveSimulatorStage(idx);
                      trackEvent("simulator_stage_click", { stage: st.step });
                    }}
                    className={`px-3.5 py-2.5 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 cursor-pointer ${
                      activeSimulatorStage === idx
                        ? "bg-[#2563EB] text-white shadow-xs"
                        : "bg-white tone-light card-light border border-[#E2E8F0] text-[#64748B] hover:text-[#081F38] hover:bg-slate-50"
                    }`}
                  >
                    <span>{st.tabLabel}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Live Interactive Case Workstation Display */}
            <div className="p-6 sm:p-10 space-y-8">
              {/* Stage Header & Context */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E2E8F0]">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-[#EEF6FF] text-[#2563EB] border border-[#BFDBFE]">
                      STAGE {currentStage.step} OF 06
                    </span>
                    <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-[#E6F7F1] text-[#10B981] border border-[#10B981]/30">
                      {currentStage.badge}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#081F38]">
                    {currentStage.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#64748B] mt-1">
                    {currentStage.subtitle}
                  </p>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  <span className="text-xs font-mono text-[#64748B]">Regulatory Protocol:</span>
                  <span className="font-mono text-xs font-bold text-[#081F38] px-2.5 py-1 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
                    {currentStage.tag}
                  </span>
                </div>
              </div>

              {/* Main Content: Stage Explanatory Copy + Real Clinical Data Artifact */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left (5 cols): Operational Description */}
                <div className="lg:col-span-5 space-y-4">
                  <h4 className="font-bold text-sm text-[#081F38] uppercase tracking-wider font-mono">
                    Operational Responsibility
                  </h4>
                  <p className="text-sm text-[#64748B] leading-relaxed">
                    {currentStage.desc}
                  </p>

                  <div className="p-4 rounded-2xl bg-[#EEF6FF] border border-[#BFDBFE] space-y-1.5">
                    <span className="font-mono text-[10px] font-bold text-[#2563EB] uppercase block">
                      Core Quality Takeaway
                    </span>
                    <p className="text-xs text-[#081F38] font-medium leading-relaxed">
                      {currentStage.keyTakeaway}
                    </p>
                  </div>
                </div>

                {/* Right (7 cols): Interactive Live Simulated Clinical File */}
                <div className="lg:col-span-7 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-5 sm:p-6 space-y-4 shadow-2xs font-mono text-xs">
                  <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
                    <span className="font-bold text-[#081F38] flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                      SIMULATED SAFETY WORKSTATION
                    </span>
                    <span className="text-[11px] text-[#64748B]">
                      File: ARZ-PV-2026-042
                    </span>
                  </div>

                  {/* Dynamic Artifact Preview per Stage */}
                  {activeSimulatorStage === 0 && (
                    <div className="space-y-2.5 text-xs">
                      <div className="flex justify-between py-1 border-b border-[#E2E8F0]">
                        <span className="text-[#64748B]">Source Type:</span>
                        <strong className="text-[#081F38]">{currentStage.mockFile?.source}</strong>
                      </div>
                      <div className="flex justify-between py-1 border-b border-[#E2E8F0]">
                        <span className="text-[#64748B]">Patient Initials:</span>
                        <strong className="text-[#081F38]">{currentStage.mockFile?.patient}</strong>
                      </div>
                      <div className="flex justify-between py-1 border-b border-[#E2E8F0]">
                        <span className="text-[#64748B]">Suspect Medicinal Product:</span>
                        <strong className="text-[#2563EB]">{currentStage.mockFile?.suspectDrug}</strong>
                      </div>
                      <div className="flex justify-between py-1 border-b border-[#E2E8F0]">
                        <span className="text-[#64748B]">Reported Adverse Reaction:</span>
                        <strong className="text-[#081F38]">{currentStage.mockFile?.reportedEvent}</strong>
                      </div>
                      <div className="p-2.5 rounded-lg bg-[#E6F7F1] text-[#10B981] font-bold text-center">
                        ✓ {currentStage.mockFile?.receivedDate} Assigned
                      </div>
                    </div>
                  )}

                  {activeSimulatorStage === 1 && (
                    <div className="space-y-2.5">
                      <span className="text-[11px] font-bold text-[#081F38] block">
                        4 Minimum Criteria Checklist:
                      </span>
                      {currentStage.mockCriteria?.map((crit, cIdx) => (
                        <div key={cIdx} className="p-2.5 rounded-lg bg-white tone-light card-light border border-[#E2E8F0] flex items-center justify-between">
                          <span className="text-[#081F38] font-bold">{crit.label}:</span>
                          <span className="text-[#64748B] text-[11px]">{crit.val}</span>
                          <span className="text-[#10B981] font-bold">✓ PASS</span>
                        </div>
                      ))}
                      <div className="p-2.5 rounded-lg bg-[#EEF6FF] border border-[#BFDBFE] text-[#2563EB] text-[11px] font-bold">
                        {currentStage.seriousness}
                      </div>
                    </div>
                  )}

                  {activeSimulatorStage === 2 && (
                    <div className="space-y-2 text-xs">
                      <span className="text-[11px] font-bold text-[#081F38] block">
                        MedDRA 27.0 Hierarchy Alignment:
                      </span>
                      <div className="space-y-1.5">
                        {currentStage.codingTree?.map((node, nIdx) => (
                          <div key={nIdx} className="p-2 rounded bg-white tone-light card-light border border-[#E2E8F0] flex items-center justify-between">
                            <span className="text-[#64748B] text-[10px]">{node.level}:</span>
                            <span className="text-[#081F38] font-bold">{node.term}</span>
                            <span className="text-[10px] text-[#2563EB]">{node.code}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeSimulatorStage === 3 && (
                    <div className="space-y-2">
                      <span className="text-[11px] font-bold text-[#081F38] block">
                        CIOMS I Structured Narrative Draft:
                      </span>
                      <div className="p-3.5 rounded-xl bg-white tone-light card-light border border-[#E2E8F0] text-xs font-sans text-[#081F38] leading-relaxed">
                        "{currentStage.narrativePreview}"
                      </div>
                      <span className="text-[10px] text-[#10B981] font-bold block text-right">
                        ✓ Medical Chronology &amp; Dechallenge Validated
                      </span>
                    </div>
                  )}

                  {activeSimulatorStage === 4 && (
                    <div className="space-y-2">
                      <span className="text-[11px] font-bold text-[#081F38] block">
                        Pre-Submission Quality Audit Checklist:
                      </span>
                      {currentStage.qaChecks?.map((qa, qIdx) => (
                        <div key={qIdx} className="p-2 rounded bg-white tone-light card-light border border-[#E2E8F0] flex items-center justify-between text-[11px]">
                          <span className="text-[#081F38]">{qa.check}</span>
                          <span className="text-[#10B981] font-bold">✓ {qa.status}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeSimulatorStage === 5 && (
                    <div className="space-y-2.5">
                      <span className="text-[11px] font-bold text-[#081F38] block">
                        Regulatory Gateway Transmission Clock:
                      </span>
                      <div className="p-3 rounded-lg bg-[#081F38] text-white space-y-1.5 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-300">Case Classification:</span>
                          <span className="text-[#FCD34D] font-bold">{currentStage.clockSchedule?.caseClassification}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-300">Reporting Rule:</span>
                          <span className="text-[#60A5FA] font-bold">{currentStage.clockSchedule?.regulatoryClock}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-300">Gateway Deadline:</span>
                          <span className="text-emerald-400 font-bold">{currentStage.clockSchedule?.submissionDeadline}</span>
                        </div>
                      </div>
                      <p className="text-[10px] text-[#64748B]">
                        ✓ {currentStage.clockSchedule?.status}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Quick Navigation & Important Note */}
              <div className="pt-6 border-t border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={activeSimulatorStage === 0}
                    onClick={() => setActiveSimulatorStage((prev) => Math.max(0, prev - 1))}
                    className="px-4 py-2 rounded-lg border border-[#E2E8F0] bg-white tone-light text-xs font-bold font-mono text-[#081F38] hover:bg-[#F8FAFC] disabled:opacity-40 cursor-pointer"
                  >
                    ← Previous Stage
                  </button>
                  <button
                    type="button"
                    disabled={activeSimulatorStage === CASE_SIMULATOR_STAGES.length - 1}
                    onClick={() => setActiveSimulatorStage((prev) => Math.min(CASE_SIMULATOR_STAGES.length - 1, prev + 1))}
                    className="px-4 py-2 rounded-lg bg-[#2563EB] text-white text-xs font-bold font-mono hover:bg-[#1D4ED8] disabled:opacity-40 cursor-pointer"
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

      {/* ── 07. THE SKILLS EMPLOYERS LOOK FOR (RECRUITER SCREENING HEATMAP) ──── */}
      <section className="py-16 sm:py-20 bg-white tone-light card-light border-b border-[#E2E8F0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-3xl space-y-3">
            <span className="font-mono text-xs font-bold text-[#2563EB] uppercase tracking-wider block">
              SECTION 07 · THE SKILLS EMPLOYERS LOOK FOR
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#081F38]">
              Prepare for the Work Behind the Job Description.
            </h2>
            <p className="text-base text-[#64748B] leading-relaxed">
              Pharmacovigilance job descriptions differ by employer and experience level. The skills below represent areas candidates should understand when preparing for entry-level drug safety opportunities.
            </p>
          </div>

          {/* Employer Hiring Market Benchmark Strip */}
          <div className="rounded-2xl p-5 bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
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

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
              <div className="px-3 py-1.5 rounded-lg bg-white tone-light card-light border border-[#E2E8F0]">
                <span className="text-[#64748B]">Benchmark CTC: </span>
                <strong className="text-[#081F38]">₹4.20 – ₹6.00 LPA</strong>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-white tone-light card-light border border-[#E2E8F0]">
                <span className="text-[#64748B]">Data Source: </span>
                <strong className="text-[#081F38]">120+ JDs Analysed</strong>
              </div>
            </div>
          </div>

          {/* VISUAL RECRUITER SCREENING HEATMAP */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E2E8F0] pb-4">
              <div>
                <h3 className="font-bold text-base text-[#081F38]">
                  Recruiter Screening Priority &amp; Weightage
                </h3>
                <p className="text-xs text-[#64748B]">
                  Weighted analysis based on technical screening questions across 120+ entry-level PV openings
                </p>
              </div>
              <span className="font-mono text-xs font-bold text-[#2563EB]">
                Technical Interview Focus
              </span>
            </div>

            <div className="space-y-4">
              {[
                { label: "ICSR Case Intake & 4 Minimum Criteria Validation", weight: 95, tag: "ESSENTIAL" },
                { label: "MedDRA 27.0 Hierarchy Term Mapping (LLT ➔ PT ➔ SOC)", weight: 90, tag: "ESSENTIAL" },
                { label: "CIOMS I Structured Clinical Case Narrative Drafting", weight: 88, tag: "ESSENTIAL" },
                { label: "Oracle Argus Safety Core Navigation & Tab Workflows", weight: 84, tag: "HIGH ADVANTAGE" },
                { label: "Day-0 & 15-Day Expedited Regulatory Clock Calculations", weight: 82, tag: "HIGH ADVANTAGE" },
              ].map((bar, bIdx) => (
                <div key={bIdx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#081F38]">{bar.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] font-bold text-[#2563EB] bg-[#EEF6FF] px-2 py-0.5 rounded">
                        {bar.tag}
                      </span>
                      <span className="font-mono font-bold text-[#081F38]">{bar.weight}%</span>
                    </div>
                  </div>
                  <div className="h-2 w-full bg-[#E2E8F0] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#2563EB] rounded-full transition-all duration-700"
                      style={{ width: `${bar.weight}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4 Skill Category Grids */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  className="p-6 sm:p-7 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#EEF6FF] text-[#2563EB] flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-lg text-[#081F38]">
                      {group.category}
                    </h3>
                  </div>

                  <ul className="space-y-2.5 text-xs sm:text-sm text-[#64748B]">
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

          {/* Supporting Callout & Action */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#EEF6FF] border border-[#60A5FA]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <p className="text-sm sm:text-base text-[#081F38] leading-relaxed max-w-2xl font-medium">
              You do not need to pretend that you already have industry experience. You need to understand the role, build relevant knowledge and demonstrate what you have learned through your work.
            </p>

            <button
              type="button"
              onClick={() => openCounsellor("section_07_skills")}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-sm shadow-sm transition-all active:scale-[0.99] cursor-pointer shrink-0"
            >
              <span>Find Out Which Skills You Need</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ── 08. YOUR 12-WEEK LEARNING PATHWAY (INTERACTIVE 3-PHASE ROADMAP) ───── */}
      <section className="py-16 sm:py-24 bg-[#F8FAFC] border-b border-[#E2E8F0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <span className="font-mono text-xs font-bold text-[#2563EB] uppercase tracking-wider block">
              SECTION 08 · YOUR 12-WEEK LEARNING PATHWAY
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#081F38]">
              From Foundations to Applied Pharmacovigilance Work.
            </h2>
            <p className="text-base text-[#64748B] leading-relaxed">
              The program is organized into three learning phases, progressing from core concepts to case-processing practice and career preparation. Click each phase to inspect weekly milestones and portfolio unlock deliverables.
            </p>
          </div>

          {/* Interactive Phase Selector Pills */}
          <div className="flex flex-wrap gap-2.5">
            {[
              { phaseNum: 0, label: "Phase 1: Weeks 1–4", subtitle: "Drug Safety Foundations" },
              { phaseNum: 1, label: "Phase 2: Weeks 5–8", subtitle: "Case-Processing Workflow" },
              { phaseNum: 2, label: "Phase 3: Weeks 9–12", subtitle: "Applied Portfolio & Hiring" },
            ].map((p) => (
              <button
                key={p.phaseNum}
                type="button"
                onClick={() => {
                  setActiveMilestonePhase(p.phaseNum);
                  trackEvent("pathway_phase_click", { phase: p.phaseNum });
                }}
                className={`px-5 py-3 rounded-2xl text-xs font-bold font-mono transition-all text-left cursor-pointer ${
                  activeMilestonePhase === p.phaseNum
                    ? "bg-[#2563EB] text-white shadow-sm scale-102"
                    : "bg-white tone-light card-light border border-[#E2E8F0] text-[#081F38] hover:bg-[#EEF6FF]"
                }`}
              >
                <span className="block text-[10px] opacity-80 uppercase tracking-wider">{p.label}</span>
                <span className="text-sm font-bold">{p.subtitle}</span>
              </button>
            ))}
          </div>

          {/* 3-Phase Structured Roadmap Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[
              {
                phaseNum: 0,
                phase: "PHASE 01 · WEEKS 1-4",
                title: "Build Your Drug Safety Foundations",
                desc: "Understand the principles behind pharmacovigilance and the purpose of safety reporting.",
                badge: "Unlock: Triage Specialist",
                caseCount: "5 Foundational Cases",
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
                phaseNum: 1,
                phase: "PHASE 02 · WEEKS 5-8",
                title: "Learn the Case-Processing Workflow",
                desc: "Apply your foundational knowledge to structured exercises and simulated case-processing tasks.",
                badge: "Unlock: MedDRA Coder",
                caseCount: "6 Workflow Cases",
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
                phaseNum: 2,
                phase: "PHASE 03 · WEEKS 9-12",
                title: "Apply Your Knowledge and Prepare for Interviews",
                desc: "Bring your learning together through applied exercises, feedback and role-focused career preparation.",
                badge: "Unlock: Role-Ready Associate",
                caseCount: "4 Capstone Deliverables",
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
            ].map((p, idx) => {
              const isSelected = activeMilestonePhase === p.phaseNum;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveMilestonePhase(p.phaseNum)}
                  className={`p-6 sm:p-7 rounded-3xl transition-all cursor-pointer flex flex-col justify-between space-y-6 ${
                    isSelected
                      ? "bg-white tone-light card-light border-2 border-[#2563EB] shadow-lg scale-102"
                      : "bg-white tone-light card-light border border-[#E2E8F0] shadow-2xs hover:border-[#60A5FA]"
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-[#2563EB] tracking-wider">
                        {p.phase}
                      </span>
                      <span className="font-mono text-[10px] font-bold text-[#10B981] bg-[#E6F7F1] px-2 py-0.5 rounded">
                        {p.caseCount}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-[#081F38] leading-snug">
                      {p.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                      {p.desc}
                    </p>

                    <div className="pt-2 space-y-2 border-t border-[#E2E8F0]">
                      <span className="font-mono text-[11px] font-bold text-[#081F38] uppercase block">
                        Learning areas:
                      </span>
                      <ul className="space-y-1.5 text-xs text-[#64748B]">
                        {p.areas.map((a, aIdx) => (
                          <li key={aIdx} className="flex items-start gap-2">
                            <span className="text-[#2563EB] font-bold">•</span>
                            <span>{a}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs space-y-1">
                      <span className="font-mono text-[10px] font-bold text-[#2563EB] uppercase block">
                        Phase objective:
                      </span>
                      <p className="text-[#64748B] leading-relaxed">
                        {p.objective}
                      </p>
                    </div>

                    <div className="text-center font-mono text-[10px] font-bold text-[#10B981] pt-1">
                      ✓ {p.badge}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Closing & CTA */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white tone-light card-light border border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <p className="text-sm sm:text-base text-[#081F38] leading-relaxed max-w-2xl font-medium">
              The aim is to move from understanding the concepts to applying them in structured exercises and explaining your work with confidence.
            </p>

            <button
              type="button"
              onClick={() => openCounsellor("section_08_pathway")}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-sm shadow-sm transition-all active:scale-[0.99] cursor-pointer shrink-0"
            >
              <span>Discuss the 12-Week Program</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ── 09. BUILD WORK YOU CAN EXPLAIN (INTERACTIVE PROOF-OF-WORK HUB) ────── */}
      <section className="py-16 sm:py-20 bg-white tone-light card-light border-b border-[#E2E8F0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-3xl space-y-3">
            <span className="font-mono text-xs font-bold text-[#2563EB] uppercase tracking-wider block">
              SECTION 09 · BUILD WORK YOU CAN EXPLAIN
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#081F38]">
              Do Not Just List Skills on Your Resume. Practise Applying Them.
            </h2>
            <p className="text-base text-[#64748B] leading-relaxed">
              A practical learning experience should give you opportunities to apply concepts, receive feedback and understand how your work is evaluated. Click each work sample tab below to inspect real mock deliverables you will build.
            </p>
          </div>

          {/* Interactive Proof-of-Work Artifact Inspector */}
          <div className="rounded-3xl border border-[#E2E8F0] bg-[#F8FAFC] overflow-hidden shadow-sm">
            {/* Artifact Tab Bar */}
            <div className="p-3 bg-white tone-light card-light border-b border-[#E2E8F0] overflow-x-auto scrollbar-none">
              <div className="flex items-center gap-2 min-w-max">
                {PROOF_OF_WORK_ARTIFACTS.map((art, idx) => (
                  <button
                    key={art.id}
                    type="button"
                    onClick={() => {
                      setActiveArtifactTab(idx);
                      trackEvent("proof_of_work_tab_click", { artifact: art.tabTitle });
                    }}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 cursor-pointer ${
                      activeArtifactTab === idx
                        ? "bg-[#2563EB] text-white shadow-xs"
                        : "bg-[#F8FAFC] border border-[#E2E8F0] text-[#64748B] hover:text-[#081F38]"
                    }`}
                  >
                    <span>{art.tabTitle}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Artifact Inspection View */}
            <div className="p-6 sm:p-10 space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E2E8F0]">
                <div>
                  <span className="font-mono text-xs font-bold text-[#2563EB]">
                    {currentArtifact.workSampleNum}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#081F38] mt-1">
                    {currentArtifact.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#64748B] mt-1">
                    {currentArtifact.desc}
                  </p>
                </div>

                <span className="font-mono text-xs font-bold text-[#10B981] bg-[#E6F7F1] px-3 py-1 rounded-full border border-[#10B981]/30 shrink-0">
                  {currentArtifact.badge}
                </span>
              </div>

              {/* Artifact Document Card Preview */}
              <div className="rounded-2xl border border-[#E2E8F0] bg-white tone-light card-light p-6 shadow-sm space-y-5">
                <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3 text-xs font-mono">
                  <span className="font-bold text-[#081F38] flex items-center gap-1.5">
                    <FileCheck className="w-4 h-4 text-[#2563EB]" />
                    {currentArtifact.mockDoc.type}
                  </span>
                  <span className="text-[#10B981] font-bold">
                    ✓ Verified Deliverable
                  </span>
                </div>

                {/* Body of Mock Document */}
                <div className="space-y-3 text-xs font-mono text-[#081F38]">
                  {activeArtifactTab === 0 && (
                    <div className="space-y-2">
                      <div className="p-2.5 rounded bg-[#F8FAFC] border border-[#E2E8F0] flex justify-between">
                        <span className="text-[#64748B]">Case Tracking ID:</span>
                        <strong>{currentArtifact.mockDoc.caseNum}</strong>
                      </div>
                      <div className="p-2.5 rounded bg-[#F8FAFC] border border-[#E2E8F0] flex justify-between">
                        <span className="text-[#64748B]">Reporter Qualification:</span>
                        <strong>{currentArtifact.mockDoc.reporter}</strong>
                      </div>
                      <div className="p-2.5 rounded bg-[#F8FAFC] border border-[#E2E8F0] flex justify-between">
                        <span className="text-[#64748B]">Suspect Product:</span>
                        <strong className="text-[#2563EB]">{currentArtifact.mockDoc.drug}</strong>
                      </div>
                      <div className="p-2.5 rounded bg-[#F8FAFC] border border-[#E2E8F0] flex justify-between">
                        <span className="text-[#64748B]">Reported Reaction:</span>
                        <strong>{currentArtifact.mockDoc.event}</strong>
                      </div>
                      <div className="p-3 rounded-lg bg-[#E6F7F1] text-[#10B981] font-bold">
                        Status: {currentArtifact.mockDoc.validityVerdict}
                      </div>
                    </div>
                  )}

                  {activeArtifactTab === 1 && (
                    <div className="space-y-2">
                      <div className="p-2.5 rounded bg-[#F8FAFC] border border-[#E2E8F0]">
                        <span className="text-[#64748B] block mb-1">Verbatim Complaint:</span>
                        <strong>"{currentArtifact.mockDoc.sourceVerbatim}"</strong>
                      </div>
                      <div className="p-2.5 rounded bg-[#EEF6FF] border border-[#BFDBFE] text-[#2563EB]">
                        {currentArtifact.mockDoc.term1}
                      </div>
                      <div className="p-2.5 rounded bg-[#EEF6FF] border border-[#BFDBFE] text-[#2563EB]">
                        {currentArtifact.mockDoc.term2}
                      </div>
                      <p className="text-[11px] text-[#64748B] pt-1">
                        Applied Standard: {currentArtifact.mockDoc.codingRuleApplied}
                      </p>
                    </div>
                  )}

                  {activeArtifactTab === 2 && (
                    <div className="space-y-2">
                      <div className="p-2.5 rounded bg-[#F8FAFC] border border-[#E2E8F0]">
                        <span className="text-[#64748B] block mb-1">Patient History:</span>
                        <strong>{currentArtifact.mockDoc.patientProfile}</strong>
                      </div>
                      <div className="p-3.5 rounded bg-white tone-light card-light border border-[#E2E8F0] font-sans text-xs leading-relaxed text-[#081F38]">
                        "{currentArtifact.mockDoc.incidentSummary}"
                      </div>
                      <div className="p-2.5 rounded bg-[#E6F7F1] text-[#10B981] font-bold">
                        {currentArtifact.mockDoc.dechallengeVerdict}
                      </div>
                    </div>
                  )}

                  {activeArtifactTab === 3 && (
                    <div className="space-y-2">
                      <div className="p-2.5 rounded bg-[#F8FAFC] border border-[#E2E8F0] flex justify-between">
                        <span className="text-[#64748B]">Classification:</span>
                        <strong>{currentArtifact.mockDoc.caseType}</strong>
                      </div>
                      <div className="p-2.5 rounded bg-[#F8FAFC] border border-[#E2E8F0] flex justify-between">
                        <span className="text-[#64748B]">RSI Document:</span>
                        <strong>{currentArtifact.mockDoc.referenceSafetyDoc}</strong>
                      </div>
                      <div className="p-3 rounded-lg bg-[#081F38] text-white">
                        <span className="text-[#60A5FA] block mb-1">Transmission Directive:</span>
                        <strong className="text-[#FCD34D]">{currentArtifact.mockDoc.regulatoryAction}</strong>
                        <span className="block text-slate-300 text-[10px] mt-1">{currentArtifact.mockDoc.calendarCountdown}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Deliverable Evaluation Rubric */}
                <div className="pt-3 border-t border-[#E2E8F0] space-y-2">
                  <span className="text-[11px] font-mono font-bold text-[#64748B] uppercase block">
                    What Mentors Evaluate In This Work Sample:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-[#081F38]">
                    {currentArtifact.rubricPoints.map((rb, rIdx) => (
                      <div key={rIdx} className="p-2 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-[#10B981] shrink-0 mt-0.5" />
                        <span>{rb}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* What These Exercises Are Designed to Demonstrate */}
              <div className="p-6 rounded-2xl bg-white tone-light card-light border border-[#E2E8F0] space-y-4">
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

                <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#E2E8F0]">
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

      {/* ── 10. YOUR CERTIFICATE AND LEARNING RECORD (HIGH-RES PREVIEW) ──────── */}
      <section className="py-16 sm:py-20 bg-[#F8FAFC] border-b border-[#E2E8F0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-3xl space-y-3">
            <span className="font-mono text-xs font-bold text-[#2563EB] uppercase tracking-wider block">
              SECTION 10 · YOUR CERTIFICATE AND LEARNING RECORD
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#081F38]">
              Document What You Have Learned.
            </h2>
            <p className="text-base text-[#64748B] leading-relaxed">
              At the end of the program, eligible participants who meet the applicable completion requirements can receive the certificate specified by the program. The certificate and any accompanying transcript should reflect the training completed and the applicable assessment requirements.
            </p>
          </div>

          {/* Certificate Terms & Preview Card */}
          <div className="rounded-3xl bg-white tone-light card-light border border-[#E2E8F0] p-6 sm:p-10 shadow-sm space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column (7 cols): Certificate Details */}
              <div className="lg:col-span-7 space-y-5">
                <h3 className="text-xl font-bold text-[#081F38]">
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

                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed pt-2">
                  A certificate documents your participation or achievement according to its stated terms. It does not replace employer assessments, professional experience or independent evidence of your skills.
                </p>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => openCounsellor("section_10_cert")}
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <span>Ask About Certification</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Right Column (5 cols): High-Res Certificate Mockup */}
              <div className="lg:col-span-5 p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-4 text-center">
                <div className="relative rounded-xl overflow-hidden border border-[#E2E8F0] shadow-sm bg-white tone-light card-light">
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

                <div className="p-3 rounded-xl bg-white tone-light card-light border border-[#E2E8F0] text-[11px] font-mono text-[#64748B] space-y-1 text-left">
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

            <p className="text-[11px] font-mono text-[#64748B] italic border-t border-[#E2E8F0] pt-4">
              *Display the certificate preview, QR verification and documented lab hours only if those features are operational and available to participants.
            </p>
          </div>
        </div>
      </section>

      {/* ── 11. CAREER GUIDANCE & LEARNER FEEDBACK (3-STEP ADVISORY JOURNEY) ──── */}
      <section className="py-16 sm:py-20 bg-white tone-light card-light border-b border-[#E2E8F0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <span className="font-mono text-xs font-bold text-[#2563EB] uppercase tracking-wider block">
              SECTION 11 · CAREER GUIDANCE AND EMPLOYMENT PREPARATION
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#081F38]">
              Understand Your Next Step Before You Commit.
            </h2>
            <div className="space-y-3 text-sm sm:text-base text-[#64748B] leading-relaxed">
              <p>
                Choosing a career path is a significant decision. You should understand the role, the skills it requires and the work involved before deciding which training is appropriate for you.
              </p>
              <p className="font-semibold text-[#081F38]">
                Our career guidance team has guided 1,000+ students toward career opportunities and can help you understand the available pathway.
              </p>
            </div>
          </div>

          {/* Real Pharmacy & Healthcare Graduate Social Proof */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg sm:text-xl font-bold text-[#081F38]">
                Hear from pharmacy and healthcare graduates
              </h3>
              <span className="font-mono text-xs text-[#2563EB] font-bold">
                Verified Feedback
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {STUDENT_REVIEWS.map((st, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3 flex flex-col justify-between"
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

                  <div className="pt-3 border-t border-[#E2E8F0] flex items-center gap-2.5">
                    <img
                      src={st.avatar}
                      alt={st.name}
                      className="w-8 h-8 rounded-full object-cover border border-[#E2E8F0] shrink-0"
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

          {/* 3-STEP 1-ON-1 GUIDANCE JOURNEY */}
          <div className="p-6 sm:p-10 rounded-3xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-8">
            <div className="max-w-2xl space-y-2">
              <span className="font-mono text-xs font-bold text-[#2563EB] uppercase tracking-wider block">
                Counsellor Consultation Roadmap
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#081F38]">
                What Happens When You Speak With Our Guidance Team?
              </h3>
              <p className="text-xs sm:text-sm text-[#64748B]">
                A transparent, zero-pressure diagnostic session designed to give you clarity on eligibility, skill gaps, and employer readiness.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  step: "STEP 01",
                  title: "Profile & Degree Diagnostic",
                  desc: "Review your B.Pharm, Pharm.D, or science degree background to confirm technical eligibility and prerequisite coursework.",
                  badge: "5 Minutes",
                },
                {
                  step: "STEP 02",
                  title: "Role & Skill Gap Analysis",
                  desc: "Compare your current understanding of pharmacology against corporate ICSR case-processing expectations.",
                  badge: "10 Minutes",
                },
                {
                  step: "STEP 03",
                  title: "Personalized Career Plan",
                  desc: "Receive clear information on the 12-week schedule, capstone projects, payment terms, and interview preparation.",
                  badge: "Next Steps",
                },
              ].map((s, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-white tone-light card-light border border-[#E2E8F0] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#2563EB]">{s.step}</span>
                    <span className="font-mono text-[10px] text-[#64748B] bg-[#F8FAFC] px-2 py-0.5 rounded border border-[#E2E8F0]">{s.badge}</span>
                  </div>
                  <h4 className="font-bold text-base text-[#081F38]">{s.title}</h4>
                  <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>

            {/* What You Can Discuss Callout */}
            <div className="rounded-2xl bg-white tone-light card-light border border-[#E2E8F0] p-6 space-y-4">
              <h4 className="font-bold text-sm text-[#081F38] uppercase font-mono tracking-wider">
                Topics Covered During Consultation:
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-[#64748B]">
                {[
                  "Your eligibility & degree fitment",
                  "Entry-level drug safety roles",
                  "Current technical skill gaps",
                  "12-week schedule & format",
                  "MNC interview preparation",
                  "Available career guidance terms",
                ].map((top, tIdx) => (
                  <div key={tIdx} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#10B981] shrink-0 stroke-[2.5]" />
                    <span>{top}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[#E2E8F0]">
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

      {/* ── 12. FREQUENTLY ASKED QUESTIONS ───────────────────────────────────── */}
      <section id="faqs" className="py-16 sm:py-24 bg-[#F8FAFC] border-b border-[#E2E8F0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3">
            <span className="font-mono text-xs font-bold text-[#2563EB] uppercase tracking-wider block">
              SECTION 12 · FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#081F38]">
              Have Questions About Pharmacovigilance?
            </h2>
            <p className="text-sm sm:text-base text-[#64748B]">
              Transparent answers to help you evaluate if this career path is the right fit.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-[#E2E8F0] bg-white tone-light card-light overflow-hidden shadow-2xs transition-all"
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
                    <div className="w-7 h-7 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#2563EB] shrink-0">
                      {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-[#64748B] leading-relaxed border-t border-[#E2E8F0] pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FINAL HIGH-CONVERTING CLOSING CTA BANNER ─────────────────────────── */}
      <section className="py-20 sm:py-28 bg-white tone-light card-light border-b border-[#E2E8F0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#081F38]">
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
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white tone-light card-light border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#081F38] font-bold text-sm shadow-2xs transition-all active:scale-[0.99] cursor-pointer group"
            >
              <div className="w-5 h-5 rounded-full bg-[#EEF6FF] text-[#2563EB] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-3 h-3 fill-current ml-0.5" />
              </div>
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
      <section className="py-10 bg-[#F8FAFC] border-t border-[#E2E8F0] text-xs text-[#64748B]">
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
      <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 tone-light card-light backdrop-blur-md border-t border-[#E2E8F0] p-3 shadow-lg">
        <div className="flex items-center justify-between gap-3">
          <div className="text-left">
            <span className="text-[11px] font-bold text-[#081F38] block leading-tight">
              Exploring a Career in Drug Safety?
            </span>
            <a
              href={PV_MASTERCLASS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-mono font-bold text-[#2563EB] hover:underline inline-flex items-center gap-0.5"
            >
              <span>Watch Free Masterclass</span>
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
          <div className="relative w-full max-w-lg rounded-3xl bg-white tone-light card-light p-6 sm:p-8 shadow-2xl border border-[#E2E8F0] space-y-6 my-auto">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsCounsellorModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#081F38] transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
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
                {/* Field 1: Name */}
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
                    className="w-full h-11 px-3.5 rounded-xl border border-[#E2E8F0] bg-white tone-light text-sm text-[#081F38] placeholder:text-[#64748B]/60 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all"
                  />
                </div>

                {/* Field 2: WhatsApp Number */}
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
                    className="w-full h-11 px-3.5 rounded-xl border border-[#E2E8F0] bg-white tone-light text-sm text-[#081F38] placeholder:text-[#64748B]/60 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all"
                  />
                </div>

                {/* Field 3: Degree & Passing Year */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#081F38] mb-1 font-mono uppercase tracking-wider">
                      Degree Background *
                    </label>
                    <select
                      value={counsellorForm.degree}
                      onChange={(e) => setCounsellorForm({ ...counsellorForm, degree: e.target.value })}
                      className="w-full h-11 px-3 rounded-xl border border-[#E2E8F0] bg-white tone-light text-xs text-[#081F38] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all cursor-pointer"
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
                      className="w-full h-11 px-3 rounded-xl border border-[#E2E8F0] bg-white tone-light text-xs text-[#081F38] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all cursor-pointer"
                    >
                      {PASSING_YEARS.map((yr) => (
                        <option key={yr} value={yr}>{yr}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Submit Button */}
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
export default PVAssociateBrandedPage;
