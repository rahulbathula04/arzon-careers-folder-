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
  Lock,
  TrendingUp,
  TrendingDown,
  ScanLine,
  Sliders,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { isReducedMotion } from "@/hooks/useReducedMotion";
import { Nav } from "@/components/landing/Nav";
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
            "@type": "EducationEvent",
            name: "Healthcare Career Intelligence Workshop 2026",
            description:
              "A live 60-minute workforce intelligence briefing decoding 300+ recent healthcare and pharma job descriptions across India and global GCCs.",
            startDate: "2026-09-06T11:00:00+05:30",
            endDate: "2026-09-06T12:00:00+05:30",
            eventStatus: "https://schema.org/EventScheduled",
            eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
            location: {
              "@type": "VirtualLocation",
              url: "https://arzonglobal.com/healthcare-career-workshop",
            },
            organizer: {
              "@type": "Organization",
              name: "Arzon Global",
              url: "https://arzonglobal.com",
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
  component: HealthcareCareerWorkshopPage,
});

// Official WhatsApp Community Link
const WHATSAPP_COMMUNITY_URL =
  "https://chat.whatsapp.com/Ltg8V4sGOgbK8kbgYMuaHz";

const HIRING_COMPANIES = [
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
  "Thermo Fisher",
  "Medpace",
];

// Live Simulated Registrations Ticker
const LIVE_REGISTRATIONS = [
  { name: "Pooja M.", degree: "Pharm.D", city: "Hyderabad", time: "Just now" },
  { name: "Rahul S.", degree: "B.Pharm", city: "Bengaluru", time: "2m ago" },
  { name: "Ananya K.", degree: "M.Pharm (Pharmacology)", city: "Pune", time: "4m ago" },
  { name: "Karthik R.", degree: "B.Sc Biotechnology", city: "Chennai", time: "6m ago" },
  { name: "Sneha D.", degree: "Pharm.D", city: "Mumbai", time: "8m ago" },
];

type TrackKey = "pv" | "coding" | "cdm" | "writing" | "ra" | "analytics";

const TRACK_DATA: Record<
  TrackKey,
  {
    id: TrackKey;
    title: string;
    icon: typeof Stethoscope;
    badge: string;
    jdCount: string;
    startingSalary: string;
    tagline: string;
    skills: { name: string; percentage: number; isCore: boolean }[];
    tools: string[];
    fresherReality: string;
    dayOneWork: string;
    eligibleDegrees: string[];
    salaryTrajectory: { y1: string; y3: string; y5: string };
  }
> = {
  pv: {
    id: "pv",
    title: "Pharmacovigilance",
    icon: Stethoscope,
    badge: "High Hiring Volume",
    jdCount: "84+ Active JDs",
    startingSalary: "₹4.5L – ₹6.2L LPA",
    tagline: "Drug Safety, ICSR Case Processing & Medical Review",
    skills: [
      { name: "Oracle Argus Safety / ArisG Databases", percentage: 88, isCore: true },
      { name: "MedDRA & WHODrug Standard Dictionaries", percentage: 92, isCore: true },
      { name: "ICSR Case Narrative Writing & Triage", percentage: 84, isCore: true },
      { name: "Expedited & Aggregate Regulatory Reporting (PSUR/PBRER)", percentage: 68, isCore: false },
      { name: "Signal Detection & Benefit-Risk Assessment", percentage: 54, isCore: false },
    ],
    tools: ["Oracle Argus Safety", "MedDRA Desktop Browser", "WHODrug C3", "Safety Gateway"],
    fresherReality:
      "Zero tolerance for medical narrative errors. Hands-on experience logging ICSR cases into Oracle Argus yields the highest technical shortlist rate.",
    dayOneWork: "Intake of spontaneous adverse event reports, triage, medical coding to MedDRA PT/LLT, and draft safety narrative compilation.",
    eligibleDegrees: ["B.Pharm", "Pharm.D", "M.Pharm (Pharmacology/QA)", "BDS / MBBS", "M.Sc Life Sciences"],
    salaryTrajectory: { y1: "₹4.5L – ₹6.2L", y3: "₹7.5L – ₹10.5L", y5: "₹12L – ₹18L+" },
  },
  coding: {
    id: "coding",
    title: "Medical Coding",
    icon: FileText,
    badge: "Fastest Placement",
    jdCount: "92+ Active JDs",
    startingSalary: "₹3.8L – ₹5.5L LPA",
    tagline: "Inpatient, Outpatient & HCC Risk Adjustment Coding",
    skills: [
      { name: "ICD-10-CM Coding Guidelines & Conventions", percentage: 96, isCore: true },
      { name: "CPT & HCPCS Level II Procedural Rules", percentage: 89, isCore: true },
      { name: "Clinical Anatomy, Physiology & Pathology", percentage: 94, isCore: true },
      { name: "Evaluation & Management (E/M) Chart Auditing", percentage: 76, isCore: false },
      { name: "HCC Risk Adjustment & Medical Record Audit", percentage: 64, isCore: false },
    ],
    tools: ["3M Codefinder", "Optum360 EncoderPro", "Find-A-Code", "EHR/EMR Systems"],
    fresherReality:
      "Recruiters test code look-up speed and anatomical specificity rather than theoretical memorization during the 60-minute entry exam.",
    dayOneWork: "Reviewing physician clinical notes and operative summaries to assign accurate ICD-10-CM and CPT alphanumeric codes for billing.",
    eligibleDegrees: ["B.Pharm", "M.Pharm", "Pharm.D", "B.Sc Life Sciences / Biotech", "Nursing / Paramedical"],
    salaryTrajectory: { y1: "₹3.8L – ₹5.5L", y3: "₹6.5L – ₹9.0L", y5: "₹11L – ₹15L+" },
  },
  cdm: {
    id: "cdm",
    title: "Clinical Research & CDM",
    icon: Database,
    badge: "Core Global CRO Role",
    jdCount: "68+ Active JDs",
    startingSalary: "₹4.2L – ₹6.0L LPA",
    tagline: "Clinical Operations, EDC Systems & Data Management",
    skills: [
      { name: "ICH-GCP E6(R2) Regulatory Protocols", percentage: 95, isCore: true },
      { name: "Electronic Data Capture (EDC - Medidata RAVE)", percentage: 82, isCore: true },
      { name: "eCRF Design & Data Discrepancy Reconciliation", percentage: 78, isCore: true },
      { name: "Trial Master File (TMF) Audit Readiness", percentage: 71, isCore: false },
      { name: "Clinical Trial Monitoring & Site Initiation", percentage: 60, isCore: false },
    ],
    tools: ["Medidata RAVE", "Oracle InForm", "Veeva Vault CDMS", "Trial Interactive"],
    fresherReality:
      "Global CROs prioritize freshers who understand protocol deviations, query management lifecycles, and GCP compliance.",
    dayOneWork: "Cleaning clinical trial case report forms, issuing data queries to trial sites, and reconciling lab discrepancies.",
    eligibleDegrees: ["B.Pharm", "Pharm.D", "M.Pharm", "M.Sc Biotech / Microbiology", "B.Sc Life Sciences"],
    salaryTrajectory: { y1: "₹4.2L – ₹6.0L", y3: "₹7.0L – ₹10.0L", y5: "₹12L – ₹17L+" },
  },
  writing: {
    id: "writing",
    title: "Medical Writing",
    icon: BookOpen,
    badge: "High Starting CTC",
    jdCount: "44+ Active JDs",
    startingSalary: "₹5.2L – ₹7.5L LPA",
    tagline: "Regulatory Documents & Clinical Study Reports (CSR)",
    skills: [
      { name: "Clinical Study Reports (CSR) to ICH E3", percentage: 88, isCore: true },
      { name: "Protocol Summaries & Investigator Brochures", percentage: 79, isCore: true },
      { name: "Patient Safety Narratives & Summary Drafting", percentage: 86, isCore: true },
      { name: "Scientific Literature Search & Meta-Analysis", percentage: 72, isCore: false },
      { name: "Regulatory Submissions (Module 2 CTD Summaries)", percentage: 65, isCore: false },
    ],
    tools: ["Starting Point Document Vaults", "EndNote / Mendeley", "PubMed / EMBASE", "P-Value Analyzers"],
    fresherReality:
      "Writing clarity, grammatical precision, and structured data interpretation are evaluated via an on-the-spot 30-minute writing exercise.",
    dayOneWork: "Transforming raw statistical output tables into clear, concise narrative summaries for CSRs and safety dossiers.",
    eligibleDegrees: ["Pharm.D", "M.Pharm (Pharmacology)", "M.Sc Biochemistry / Biotech", "B.Pharm (with strong writing)"],
    salaryTrajectory: { y1: "₹5.2L – ₹7.5L", y3: "₹9.0L – ₹13.0L", y5: "₹15L – ₹22L+" },
  },
  ra: {
    id: "ra",
    title: "Regulatory Affairs",
    icon: Award,
    badge: "Long-Term Prestige",
    jdCount: "38+ Active JDs",
    startingSalary: "₹4.5L – ₹6.5L LPA",
    tagline: "Global Filings, Dossier Preparation & eCTD Lifecycles",
    skills: [
      { name: "eCTD Electronic Dossier Structure (M1-M5)", percentage: 91, isCore: true },
      { name: "DMF / ANDA / NDA Submission Lifecycles", percentage: 84, isCore: true },
      { name: "USFDA, EMA & CDSCO Guideline Compliance", percentage: 78, isCore: true },
      { name: "Regulatory Change Control & Variations", percentage: 69, isCore: false },
      { name: "Product Labeling & SmPC Artwork Proofing", percentage: 58, isCore: false },
    ],
    tools: ["Lorenz docuBridge", "Extedo eCTDmanager", "MasterControl", "FDA ESG Portal"],
    fresherReality:
      "Freshers who understand the 5 modules of the Common Technical Document (CTD) and lifecycle variation filings stand out instantly.",
    dayOneWork: "Reviewing analytical data packages, compiling Module 3 (CMC) sections, and preparing sequence updates for regulatory submissions.",
    eligibleDegrees: ["M.Pharm (DRA / QA / Chemistry)", "B.Pharm", "M.Sc Chemistry / Life Sciences"],
    salaryTrajectory: { y1: "₹4.5L – ₹6.5L", y3: "₹8.0L – ₹11.5L", y5: "₹14L – ₹20L+" },
  },
  analytics: {
    id: "analytics",
    title: "Healthcare Analytics",
    icon: Code,
    badge: "Fast Growing",
    jdCount: "52+ Active JDs",
    startingSalary: "₹5.5L – ₹8.5L LPA",
    tagline: "Clinical SAS Programming, SDTM/ADaM & RWE",
    skills: [
      { name: "Base & Advanced SAS Programming Workflows", percentage: 94, isCore: true },
      { name: "CDISC Standards (SDTM & ADaM Domains)", percentage: 96, isCore: true },
      { name: "Statistical Summary Tables, Listings & Figures (TLFs)", percentage: 89, isCore: true },
      { name: "SQL Queries & Relational Health Database Joins", percentage: 70, isCore: false },
      { name: "Real-World Evidence (RWE) & Outcomes Research", percentage: 59, isCore: false },
    ],
    tools: ["SAS Studio / Enterprise Guide", "R & Python for Biostats", "CDISC Express", "SQL Server"],
    fresherReality:
      "Surging demand across Global Capability Centers (GCCs) in Bengaluru and Hyderabad for validated statistical programmers.",
    dayOneWork: "Writing SAS macros to map clinical trial datasets into standardized CDISC SDTM domains and generating validated TLF outputs.",
    eligibleDegrees: ["B.Pharm / M.Pharm", "Pharm.D", "B.Tech / B.Sc Statistics", "B.Sc / M.Sc Life Sciences"],
    salaryTrajectory: { y1: "₹5.5L – ₹8.5L", y3: "₹10.0L – ₹15.0L", y5: "₹18L – ₹28L+" },
  },
};

const DEGREE_PROFILES = [
  {
    id: "bpharm",
    title: "B.Pharm Graduate",
    bestTracks: ["Pharmacovigilance", "Medical Coding", "Clinical Data Management"],
    avgSalary: "₹4.5L – ₹5.8L LPA",
    recruiterInsight: "Highest volume fresher hiring in 2026. Prioritize Oracle Argus or ICD-10 practical cases over pure textbook theory.",
    immediateAdvantage: "Strong pharmacology foundation matches day-one drug safety triage.",
  },
  {
    id: "pharmd",
    title: "Pharm.D Doctor of Pharmacy",
    bestTracks: ["Pharmacovigilance (Medical Review)", "Medical Writing", "Clinical Research"],
    avgSalary: "₹5.5L – ₹7.5L LPA",
    recruiterInsight: "6 years of clinical exposure qualifies you directly for accelerated associate roles and medical review tracks in Top GCCs.",
    immediateAdvantage: "Clinical interpretation and patient chart evaluation ready on day one.",
  },
  {
    id: "mpharm",
    title: "M.Pharm Specialist",
    bestTracks: ["Regulatory Affairs", "Pharmacovigilance", "Clinical SAS / Analytics"],
    avgSalary: "₹5.2L – ₹7.0L LPA",
    recruiterInsight: "Specialization in Pharmacology, QA, or DRA is heavily rewarded if backed by hands-on regulatory dossier or safety database exposure.",
    immediateAdvantage: "Deep academic specialization provides rapid advancement to Senior Associate.",
  },
  {
    id: "lifesciences",
    title: "B.Sc / M.Sc Life Sciences & Biotech",
    bestTracks: ["Medical Coding", "Clinical Data Management", "Healthcare Analytics"],
    avgSalary: "₹3.8L – ₹5.5L LPA",
    recruiterInsight: "Life science graduates find rapid entry into Medical Coding and CDM by demonstrating strong anatomical accuracy and EDC proficiency.",
    immediateAdvantage: "Broad biological sciences grounding bridges technical data roles quickly.",
  },
];

const SKILLS_OBSOLESCENCE_RADAR = [
  {
    obsoleteSkill: "Traditional Manual Lab Notebook Entry",
    obsoleteDelta: "-72%",
    demandedSkill: "Oracle Argus Safety & Electronic ICSR Triage",
    demandedDelta: "+214%",
    impactReason: "Global pharma enterprises have automated intake; recruiters mandate database triage.",
  },
  {
    obsoleteSkill: "Memorized Pharmacology Drug Classification Lists",
    obsoleteDelta: "-65%",
    demandedSkill: "MedDRA Standard Terminology & WHODrug Coding",
    demandedDelta: "+198%",
    impactReason: "Adverse events require standardized dictionary lookups and preferred term mapping.",
  },
  {
    obsoleteSkill: "Generic Paper Case Report Forms (CRF)",
    obsoleteDelta: "-84%",
    demandedSkill: "Electronic Data Capture (Medidata RAVE / InForm)",
    demandedDelta: "+182%",
    impactReason: "100% of global clinical trials run on cloud EDC suites requiring query reconciliation.",
  },
  {
    obsoleteSkill: "Basic Theoretical Anatomy Rote Learning",
    obsoleteDelta: "-60%",
    demandedSkill: "ICD-10-CM / CPT Procedural Chart Auditing",
    demandedDelta: "+176%",
    impactReason: "US healthcare RCM centers hire for speed and precision on complex clinical chart notes.",
  },
];

const MASTERCLASS_AGENDA = [
  {
    time: "00 – 10 min",
    title: "The 2026 Healthcare Hiring Reality Map",
    desc: "Active vacancy breakdown across Global Pharma GCCs, Tier-1 CROs, and IT Healthcare verticals. Why traditional fresher applications get rejected.",
    badge: "Market Map",
  },
  {
    time: "10 – 25 min",
    title: "The 300+ JD Empirical Data Release",
    desc: "The exact line-item frequency of tools (Oracle Argus, MedDRA, Medidata RAVE, SAS, ICD-10) and the critical 3 checkboxes every ATS tests.",
    badge: "Empirical Data",
  },
  {
    time: "25 – 40 min",
    title: "Track-by-Track Expectations & Salary Math",
    desc: "Day-one operational walkthrough for PV Associates, Medical Coders, and Clinical Data Coordinators with verified fresher salary distributions.",
    badge: "Role Breakdown",
  },
  {
    time: "40 – 50 min",
    title: "Recruiter Resume Shortlisting Teardowns",
    desc: "Side-by-side audit of an unshortlisted academic resume vs. a high-converting, artifact-backed fresher CV that bypasses screening algorithms.",
    badge: "CV Audit",
  },
  {
    time: "50 – 60 min",
    title: "Unfiltered Mentor Panel & Live Q&A",
    desc: "Direct answers from practicing industry managers on your specific educational eligibility, career gaps, and immediate next steps.",
    badge: "Live Q&A",
  },
];

const MENTOR_PANEL = [
  {
    name: "Dr. K. Srinivas, M.Pharm, Ph.D.",
    role: "Former Director of Safety & PV Operations",
    affiliation: "Ex-Novartis · 18+ Yrs Experience",
    quote: "Freshers who can talk intelligently about MedDRA coding and ICSR narrative triage stand out in the first 5 minutes of a technical interview.",
  },
  {
    name: "Meera Venkatesh, CPC, CPMA",
    role: "Senior Lead Medical Coding Auditor",
    affiliation: "Ex-Optum / UnitedHealth · 14+ Yrs Experience",
    quote: "We don't test whether you memorized codes; we test your speed and accuracy in navigating guidelines on real chart notes.",
  },
  {
    name: "Rahul Nambiar, M.S. Biostats",
    role: "Principal Clinical Data Scientist",
    affiliation: "Ex-IQVIA & ICON · 12+ Yrs Experience",
    quote: "Clinical trials require data integrity from day one. Understanding GCP protocol deviations is the single biggest differentiator for freshers.",
  },
];

const MASTERCLASS_KIT = [
  {
    icon: FileText,
    title: "18-Page 300+ Healthcare JD Research Executive Summary",
    desc: "Complete dataset with tool frequencies, skill distribution charts, and employer hiring criteria.",
    badge: "PDF Report",
  },
  {
    icon: TrendingUp,
    title: "2026 Life Sciences Fresher Salary & Growth Benchmark",
    desc: "Verified 25th, 50th, and 75th percentile fresher packages across Hyderabad, Bengaluru, Pune & Chennai.",
    badge: "Salary Guide",
  },
  {
    icon: Award,
    title: "ATS-Ready Life Sciences Resume Template & Skill Checklist",
    desc: "The exact formatting, action verbs, and keyword structure that pass Applicant Tracking Systems.",
    badge: "Template",
  },
  {
    icon: MessageCircle,
    title: "Direct Access to the Arzon Career Community",
    desc: "Network with fellow graduates, receive verified job updates, and interact with working industry mentors.",
    badge: "Community",
  },
];

const FAQS = [
  {
    q: "Is this workshop really 100% free?",
    a: "Yes. The quarterly Healthcare Career Intelligence Workshop is completely free. There is no payment required, no credit card asked, and no high-pressure course pitch during the research presentation.",
  },
  {
    q: "Who is eligible to attend?",
    a: "The workshop is specifically designed for B.Pharm, M.Pharm, Pharm.D, B.Sc/M.Sc Life Sciences, Biotechnology, Microbiology, and healthcare/nursing students and recent graduates looking to launch corporate careers.",
  },
  {
    q: "How will I receive the live Zoom link and research materials?",
    a: "Immediately upon submitting your registration, you will receive a 1-tap Google Calendar sync link and direct entry into the Arzon WhatsApp Community, where the live Zoom link and 18-page Research Summary PDF are delivered.",
  },
  {
    q: "What if I am still in my final year of college?",
    a: "Final-year students benefit the most. Understanding employer hiring benchmarks 6 months before graduating allows you to build the exact software skills (Argus, MedDRA, EDC, ICD-10) recruiters look for on day one.",
  },
  {
    q: "Will there be a replay available?",
    a: "The core research summary PDF will be shared with all registered participants in the WhatsApp Community. However, live attendance is strongly recommended to participate in the interactive mentor Q&A session.",
  },
];

function HealthcareCareerWorkshopPage() {
  const [activeTrack, setActiveTrack] = useState<TrackKey>("pv");
  const [selectedDegree, setSelectedDegree] = useState<string>("bpharm");
  const [resumeMode, setResumeMode] = useState<"standard" | "optimized">("optimized");
  const [selectedExpStage, setSelectedExpStage] = useState<"y1" | "y3" | "y5">("y1");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [currentTickerIdx, setCurrentTickerIdx] = useState(0);

  // Form State
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [careerTrack, setCareerTrack] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userQuestion, setUserQuestion] = useState("");
  const [questionSubmitted, setQuestionSubmitted] = useState(false);

  const formRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  // Live Registration Ticker Rotation
  useEffect(() => {
    if (isReducedMotion()) return;
    const timer = setInterval(() => {
      setCurrentTickerIdx((prev) => (prev + 1) % LIVE_REGISTRATIONS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

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

  const currentTrackData = TRACK_DATA[activeTrack];
  const currentDegreeProfile =
    DEGREE_PROFILES.find((p) => p.id === selectedDegree) || DEGREE_PROFILES[0];
  const liveReg = LIVE_REGISTRATIONS[currentTickerIdx];

  return (
    <div className="tone-light min-h-screen bg-[#FAF8F5] text-[#1A1A1A] font-sans antialiased overflow-x-hidden">
      <Nav />

      <main className="relative z-10">
        {/* ─────────────────────────────────────────────────────────────
            01 · HERO SECTION: 2050 WORKFORCE INTELLIGENCE MASTERCLASS
           ───────────────────────────────────────────────────────────── */}
        <section className="pt-24 pb-16 sm:pt-32 sm:pb-24 border-b border-stone-200 bg-white relative">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              {/* Left Column: Research Value Proposition & Institutional Proof */}
              <div className="lg:col-span-7 space-y-6 pt-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3.5 py-1 text-xs font-mono font-bold text-[#1B3F8B] shadow-2xs">
                    <span className="flex h-2 w-2 rounded-full bg-[#1B3F8B] motion-safe:animate-pulse" />
                    <span>2026 WORKFORCE INTELLIGENCE BRIEFING</span>
                    <span className="text-sky-300">·</span>
                    <span className="text-emerald-700 font-bold">100% FREE</span>
                  </span>
                  <span className="font-mono text-xs text-stone-500 font-bold hidden sm:inline">
                    LIVE ON ZOOM
                  </span>
                </div>

                <div className="space-y-4">
                  <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1A1A1A] leading-[1.12]">
                    What Are Healthcare Companies{" "}
                    <span className="italic font-normal text-[#8A6D1F]">Actually Looking For</span>{" "}
                    In 2026?
                  </h1>
                  <p className="font-mono text-sm sm:text-base font-bold text-[#1B3F8B] tracking-wide">
                    We decoded 300+ recent job descriptions across Top Healthcare GCCs, Pharma MNCs &amp; CROs.
                  </p>
                  <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed max-w-2xl font-normal">
                    Stop guessing what recruiters want. Join this live 60-minute workforce intelligence briefing
                    to discover empirical tool requirements, verified fresher salary benchmarks, and the 3
                    critical checkboxes that pass ATS screening.
                  </p>
                </div>

                {/* Event Highlights Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl border border-stone-200 bg-[#FAF8F5] shadow-xs">
                  <div className="space-y-1">
                    <p className="text-[10px] font-mono uppercase tracking-wider text-stone-500 flex items-center gap-1.5 font-bold">
                      <Calendar className="h-3.5 w-3.5 text-[#1B3F8B]" />
                      <span>Next Session</span>
                    </p>
                    <p className="text-xs sm:text-sm font-bold text-[#1A1A1A]">This Sunday</p>
                    <p className="text-[11px] text-stone-600 font-mono">11:00 AM – 12:00 PM IST</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-[10px] font-mono uppercase tracking-wider text-stone-500 flex items-center gap-1.5 font-bold">
                      <Clock className="h-3.5 w-3.5 text-[#8A6D1F]" />
                      <span>Format</span>
                    </p>
                    <p className="text-xs sm:text-sm font-bold text-[#1A1A1A]">60 Mins Live</p>
                    <p className="text-[11px] text-stone-600 font-mono">Zoom + Live Mentor Q&amp;A</p>
                  </div>

                  <div className="col-span-2 sm:col-span-1 space-y-1">
                    <p className="text-[10px] font-mono uppercase tracking-wider text-stone-500 flex items-center gap-1.5 font-bold">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                      <span>Commitment</span>
                    </p>
                    <p className="text-xs sm:text-sm font-bold text-emerald-800">100% Free</p>
                    <p className="text-[11px] text-stone-600 font-mono">No Course Purchase Required</p>
                  </div>
                </div>

                {/* Social Proof & Attendee Trust Overlap */}
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <div className="flex -space-x-2 overflow-hidden">
                    <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-[#1B3F8B] text-slate-50 text-[11px] font-bold flex items-center justify-center">
                      RS
                    </div>
                    <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-[#8A6D1F] text-slate-50 text-[11px] font-bold flex items-center justify-center">
                      AP
                    </div>
                    <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-emerald-700 text-slate-50 text-[11px] font-bold flex items-center justify-center">
                      MK
                    </div>
                    <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-sky-800 text-slate-50 text-[11px] font-bold flex items-center justify-center">
                      +2k
                    </div>
                  </div>
                  <span className="text-xs text-stone-700 font-sans font-medium">
                    Over <strong>2,400+</strong> Life Sciences graduates have attended Arzon intelligence sessions.
                  </span>
                </div>

                {/* Live Activity Ticker (Ambient Social Validation) */}
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-stone-100/90 border border-stone-200 text-xs text-stone-700 font-sans shadow-2xs">
                  <span className="flex h-2 w-2 rounded-full bg-emerald-500 motion-safe:animate-pulse" />
                  <span>
                    <strong>{liveReg.name}</strong> ({liveReg.degree}, {liveReg.city}) registered{" "}
                    <span className="text-stone-500 font-mono">{liveReg.time}</span>
                  </span>
                </div>

                {/* Interactive Oracle Argus & JD Intelligence Native Terminal */}
                <div className="rounded-2xl border border-stone-300 bg-stone-900 text-stone-100 shadow-xl overflow-hidden mt-6">
                  {/* Terminal Titlebar */}
                  <div className="flex items-center justify-between px-4 py-3 bg-stone-950 border-b border-stone-800">
                    <div className="flex items-center gap-2">
                      <div className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                      <div className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                      <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                      <span className="ml-2 font-mono text-[11px] text-stone-400 font-bold tracking-wide">
                        ORACLE ARGUS SAFETY · REQ_AUDIT_300.TERMINAL
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-mono text-[10px] font-bold">
                      LIVE TELEMETRY
                    </span>
                  </div>

                  {/* Terminal Content */}
                  <div className="p-4 sm:p-5 space-y-4 font-mono text-xs">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pb-3 border-b border-stone-800 text-[11px]">
                      <div className="p-2 rounded-lg bg-stone-800/70 border border-stone-700/60">
                        <span className="text-stone-400 block text-[10px]">CASE TRIAGE</span>
                        <span className="text-emerald-400 font-bold">EXPEDITED (7-DAY)</span>
                      </div>
                      <div className="p-2 rounded-lg bg-stone-800/70 border border-stone-700/60">
                        <span className="text-stone-400 block text-[10px]">MEDDRA CODING</span>
                        <span className="text-sky-400 font-bold">PT: 10000804</span>
                      </div>
                      <div className="p-2 rounded-lg bg-stone-800/70 border border-stone-700/60">
                        <span className="text-stone-400 block text-[10px]">COMPLIANCE</span>
                        <span className="text-amber-400 font-bold">ICH E2B(R3)</span>
                      </div>
                      <div className="p-2 rounded-lg bg-stone-800/70 border border-stone-700/60">
                        <span className="text-stone-400 block text-[10px]">ATS FREQUENCY</span>
                        <span className="text-emerald-400 font-bold">84% ACROSS JDs</span>
                      </div>
                    </div>

                    <div className="space-y-1.5 text-stone-300 text-[11px] leading-relaxed">
                      <div className="flex items-center gap-2 text-stone-400">
                        <span className="text-[#8A6D1F] font-bold">$</span>
                        <span>arzon-intel --scan-requisitions --tier1-gccs</span>
                      </div>
                      <p className="text-stone-300 pl-3 border-l-2 border-[#1B3F8B]">
                        [+] Decoded 300+ Job Requisitions at Novartis, IQVIA, Parexel, Pfizer &amp; Dr. Reddy's.
                      </p>
                      <p className="text-emerald-400 pl-3 border-l-2 border-emerald-600">
                        [✓] Critical prerequisite identified: Enterprise software workflow mastery over theoretical definitions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: High-Converting Seat Reservation Card */}
              <div className="lg:col-span-5" ref={formRef} id="register-section">
                <div className="relative rounded-2xl border border-stone-200 bg-white p-6 sm:p-8 shadow-xl">
                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-4 mb-5 border-b border-stone-200">
                    <div className="flex items-center gap-2">
                      <span className="flex h-2.5 w-2.5 rounded-full bg-[#1B3F8B] motion-safe:animate-pulse" />
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B]">
                        {isSuccess ? "Registration Confirmed" : "Reserve Free Seat"}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md">
                      Free Live Access
                    </span>
                  </div>

                  {isSuccess ? (
                    /* ── 4-STEP POST-REGISTRATION ONBOARDING ── */
                    <div className="space-y-4 animate-in fade-in zoom-in-95 duration-300">
                      <div className="text-center space-y-1.5">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 ring-4 ring-emerald-50">
                          <CheckCircle2 className="h-7 w-7" />
                        </div>
                        <h3 className="font-serif text-2xl font-bold text-[#1A1A1A]">YOU'RE IN!</h3>
                        <p className="text-xs text-stone-600 font-sans">
                          Seat confirmed for <strong className="text-[#1B3F8B]">{name}</strong>. Complete the quick steps below:
                        </p>
                      </div>

                      {/* Step 1: Add to Calendar */}
                      <div className="rounded-xl border border-stone-200 bg-stone-50 p-3.5 flex items-center justify-between gap-3 shadow-2xs">
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-100 text-[#1B3F8B] text-xs font-mono font-bold">
                            01
                          </div>
                          <div>
                            <p className="text-xs font-bold text-stone-900">Add to Calendar</p>
                            <p className="text-[11px] text-stone-500">Never miss the live research session</p>
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
                      <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-3.5 space-y-2 shadow-2xs">
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-200 text-emerald-900 text-xs font-mono font-bold">
                            02
                          </div>
                          <div>
                            <p className="text-xs font-bold text-emerald-950">Join WhatsApp Career Community</p>
                            <p className="text-[11px] text-emerald-800">Instant PDF download link &amp; Zoom pass</p>
                          </div>
                        </div>
                        <a
                          href={WHATSAPP_COMMUNITY_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-slate-50 font-bold text-xs transition-all shadow-md cursor-pointer"
                        >
                          <MessageCircle className="h-4 w-4" />
                          <span>Join Arzon WhatsApp Community</span>
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      </div>

                      {/* Step 3: Ask Mentors in Advance */}
                      <div className="rounded-xl border border-stone-200 bg-stone-50 p-3.5 space-y-2 shadow-2xs">
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-100 text-[#8A6D1F] text-xs font-mono font-bold">
                            03
                          </div>
                          <div>
                            <p className="text-xs font-bold text-stone-900">Ask Mentors in Advance (Optional)</p>
                            <p className="text-[11px] text-stone-500">Have your personal query answered live</p>
                          </div>
                        </div>

                        {questionSubmitted ? (
                          <div className="p-2 rounded-lg bg-teal-50 border border-teal-200 text-teal-800 text-xs flex items-center gap-2 font-medium">
                            <Check className="h-4 w-4 text-teal-600" />
                            <span>Question submitted to the mentor panel!</span>
                          </div>
                        ) : (
                          <form onSubmit={handleQuestionSubmit} className="flex gap-2">
                            <input
                              type="text"
                              value={userQuestion}
                              onChange={(e) => setUserQuestion(e.target.value)}
                              placeholder="e.g. Can B.Pharm freshers enter PV directly?"
                              className="flex-1 h-9 px-3 rounded-lg bg-white border border-stone-300 text-stone-900 placeholder-stone-400 text-xs focus:outline-none focus:border-[#1B3F8B]"
                            />
                            <button
                              type="submit"
                              className="h-9 px-3.5 rounded-lg bg-[#1B3F8B] hover:bg-[#153270] text-slate-50 font-bold text-xs transition-all shrink-0 flex items-center gap-1 cursor-pointer"
                            >
                              <Send className="h-3 w-3" />
                              <span>Send</span>
                            </button>
                          </form>
                        )}
                      </div>

                      {/* Step 4: Invite a Classmate Loop */}
                      <div className="rounded-xl border border-sky-200 bg-sky-50/70 p-3.5 space-y-2 shadow-2xs">
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-200 text-[#1B3F8B] text-xs font-mono font-bold">
                            04
                          </div>
                          <div>
                            <p className="text-xs font-bold text-stone-900">Invite a Classmate (Unlock Salary Dataset)</p>
                            <p className="text-[11px] text-stone-600">Share with your college group or batchmates</p>
                          </div>
                        </div>
                        <a
                          href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                            "Hey! I just registered for the free Arzon Healthcare Career Intelligence Workshop (analyzing 300+ JDs across Pharma, PV & Clinical Research). Reserve your free seat here: https://arzonglobal.com/healthcare-career-workshop"
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-[#1B3F8B] hover:bg-[#153270] text-slate-50 font-bold text-xs transition-all shadow-2xs cursor-pointer"
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
                          <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2 font-medium">
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
                            WhatsApp Number <span className="text-rose-500">*</span>
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
                            Primary Career Track of Interest <span className="text-rose-500">*</span>
                          </label>
                          <select
                            required
                            value={careerTrack}
                            onChange={(e) => setCareerTrack(e.target.value)}
                            className="w-full h-11 px-3.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-xs focus:bg-white focus:outline-none focus:border-[#1B3F8B] focus:ring-1 focus:ring-[#1B3F8B] transition-all"
                          >
                            <option value="">Select your target track...</option>
                            <option value="Pharmacovigilance">Pharmacovigilance (Drug Safety &amp; ICSR)</option>
                            <option value="Medical Coding">Medical Coding (ICD-10-CM &amp; CPT)</option>
                            <option value="Clinical Research">Clinical Research &amp; CDM (GCP &amp; EDC)</option>
                            <option value="Medical Writing">Medical Writing (CSR &amp; Regulatory Summaries)</option>
                            <option value="Regulatory Affairs">Regulatory Affairs (eCTD Dossiers)</option>
                            <option value="Healthcare Analytics">Healthcare Analytics (Clinical SAS &amp; RWE)</option>
                            <option value="Undecided">Undecided / Exploring Options</option>
                          </select>
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full h-12 rounded-xl bg-[#1B3F8B] hover:bg-[#153270] text-slate-50 font-bold text-sm tracking-wide shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                        >
                          {isSubmitting ? (
                            <>
                              <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent motion-safe:animate-spin" />
                              <span>Reserving Free Seat...</span>
                            </>
                          ) : (
                            <>
                              <Lock className="h-4 w-4 text-slate-50" />
                              <span>Reserve My Free Seat Now</span>
                              <ArrowRight className="h-4 w-4 text-slate-50" />
                            </>
                          )}
                        </button>
                      </form>

                      <div className="pt-2 text-center space-y-1">
                        <p className="text-[11px] text-stone-500 font-sans flex items-center justify-center gap-1.5">
                          <ShieldCheck className="h-3.5 w-3.5 text-[#8A6D1F]" />
                          <span>100% Free · No sales pitch during research session · No spam</span>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            02 · THE 2026 SKILLS RADAR: OBSOLESCENCE VS SURGING DEMAND
           ───────────────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-24 border-b border-stone-200 bg-[#FAF8F5]">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center space-y-3 max-w-3xl mx-auto">
              <PremiumChip variant="gold" size="md">
                2026 WORKFORCE SHIFT
              </PremiumChip>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-tight">
                THE 2026 SKILLS OBSOLESCENCE RADAR
              </h2>
              <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed">
                Why generic college graduates face an uphill battle: What the healthcare industry is eliminating vs.
                the specialized software skills commanding ₹5L+ starting packages.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {SKILLS_OBSOLESCENCE_RADAR.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs space-y-5"
                >
                  <div className="grid grid-cols-2 gap-4 pb-4 border-b border-stone-200">
                    {/* Fading Skill */}
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-1 text-[11px] font-mono font-bold text-rose-700">
                        <TrendingDown className="h-3.5 w-3.5" />
                        <span>FADING PROTOCOL ({item.obsoleteDelta})</span>
                      </div>
                      <p className="text-xs font-bold text-stone-700 line-through decoration-rose-400">
                        {item.obsoleteSkill}
                      </p>
                    </div>

                    {/* Surging Demanded Skill */}
                    <div className="space-y-1.5 border-l border-stone-200 pl-4">
                      <div className="flex items-center gap-1 text-[11px] font-mono font-bold text-emerald-800">
                        <TrendingUp className="h-3.5 w-3.5" />
                        <span>2026 DEMAND ({item.demandedDelta})</span>
                      </div>
                      <p className="text-xs font-bold text-[#1B3F8B]">
                        {item.demandedSkill}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 font-sans leading-relaxed font-normal">
                    📌 <strong>Enterprise Reality:</strong> {item.impactReason}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            02B · INSIDE THE TIER-1 GLOBAL CAPABILITY CENTER
           ───────────────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-24 border-b border-stone-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-6 space-y-5">
                <PremiumChip variant="navy" size="md">
                  THE HIRING REALITY
                </PremiumChip>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-tight">
                  WHAT HAPPENS INSIDE THE CORPORATE BOARDROOM
                </h2>
                <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed">
                  When global life-sciences directors review fresher candidates, they aren’t looking for textbook definitions. They look for professionals who understand live clinical trial workflows, aggregate case safety triages, and audit-ready documentation.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="rounded-xl border border-stone-200 bg-[#FAF8F5] p-4 flex items-start gap-3 shadow-2xs">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-stone-900 font-sans">Empirical Requisition Mapping</p>
                      <p className="text-xs text-stone-600 font-sans">
                        Every module is mapped to actual day-one responsibilities across 14+ Tier-1 hiring GCCs in Hyderabad, Bengaluru &amp; Mumbai.
                      </p>
                    </div>
                  </div>
                  <div className="rounded-xl border border-stone-200 bg-[#FAF8F5] p-4 flex items-start gap-3 shadow-2xs">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-stone-900 font-sans">Eliminating the 'Fresher Rejection Loop'</p>
                      <p className="text-xs text-stone-600 font-sans">
                        Candidates with enterprise tool exposure command 40% to 65% higher starting salary bands than generic applicants.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                {/* Native Clinical Trial & Safety Operations Matrix */}
                <div className="rounded-2xl border border-stone-200 bg-[#FAF8F5] p-6 sm:p-7 shadow-lg space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-[#1B3F8B]" />
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-stone-900">
                        GCC CLINICAL OPS PROTOCOL
                      </span>
                    </div>
                    <span className="font-mono text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                      21 CFR PART 11 READY
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="rounded-xl border border-stone-200 bg-white p-3.5 space-y-1 shadow-2xs">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono font-bold text-[#1B3F8B]">01 · CASE INTAKE &amp; TRIAGE</span>
                        <span className="text-stone-500 font-mono text-[10px]">Oracle Argus 8.4</span>
                      </div>
                      <p className="text-[11px] text-stone-600 font-sans">
                        Automated CIOMS-I import &amp; duplicate search against historical safety databases.
                      </p>
                    </div>

                    <div className="rounded-xl border border-stone-200 bg-white p-3.5 space-y-1 shadow-2xs">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono font-bold text-[#1B3F8B]">02 · MEDICAL CODING</span>
                        <span className="text-stone-500 font-mono text-[10px]">MedDRA 27.0</span>
                      </div>
                      <p className="text-[11px] text-stone-600 font-sans">
                        Hierarchical mapping from Reported Term (LLT) to Preferred Term (PT) and System Organ Class (SOC).
                      </p>
                    </div>

                    <div className="rounded-xl border border-stone-200 bg-white p-3.5 space-y-1 shadow-2xs">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono font-bold text-[#1B3F8B]">03 · AGGREGATE SAFETY &amp; PBRER</span>
                        <span className="text-stone-500 font-mono text-[10px]">ICH E2C(R2)</span>
                      </div>
                      <p className="text-[11px] text-stone-600 font-sans">
                        Benefit-risk evaluation narratives and regulatory safety signal documentation.
                      </p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-sky-50 border border-sky-200 text-xs text-stone-700 flex items-center justify-between font-mono">
                    <span>HIRING ACCELERATION FACTOR:</span>
                    <span className="font-bold text-[#1B3F8B]">+2.4X SHORTLIST RATE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            03 · INTERACTIVE ATS RESUME DIAGNOSTIC X-RAY
           ───────────────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-24 border-b border-stone-200 bg-[#FAF8F5]">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center space-y-3 max-w-3xl mx-auto">
              <PremiumChip variant="navy" size="md">
                ALGORITHMIC SCREENING
              </PremiumChip>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-tight">
                THE ATS RESUME DIAGNOSTIC X-RAY
              </h2>
              <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed">
                See what enterprise Applicant Tracking Systems (Workday, Taleo, Greenhouse) actually detect when scanning fresher CVs.
              </p>
            </div>

            {/* Resume Mode Switcher */}
            <div className="flex justify-center">
              <div className="inline-flex rounded-xl bg-stone-100 p-1 border border-stone-200">
                <button
                  type="button"
                  onClick={() => setResumeMode("standard")}
                  className={`px-5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    resumeMode === "standard"
                      ? "bg-rose-600 text-slate-50 shadow-xs"
                      : "text-stone-600 hover:text-stone-900"
                  }`}
                >
                  Standard College CV (91% Rejection Rate)
                </button>
                <button
                  type="button"
                  onClick={() => setResumeMode("optimized")}
                  className={`px-5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    resumeMode === "optimized"
                      ? "bg-[#1B3F8B] text-slate-50 shadow-xs"
                      : "text-stone-600 hover:text-stone-900"
                  }`}
                >
                  Intelligence-Optimized CV (84% Shortlist Rate)
                </button>
              </div>
            </div>

            {/* Resume X-Ray Visualization Box */}
            <div className="max-w-4xl mx-auto rounded-2xl border border-stone-200 bg-[#FAF8F5] p-6 sm:p-10 shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                <div className="flex items-center gap-2">
                  <ScanLine className="h-5 w-5 text-[#1B3F8B]" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-stone-800">
                    {resumeMode === "standard"
                      ? "🔴 ATS PARSER OUTPUT: UNINDEXED / FLAGGED"
                      : "🟢 ATS PARSER OUTPUT: HIGH-INTENT MATCH (94/100)"}
                  </span>
                </div>
                <span
                  className={`font-mono text-xs font-bold px-3 py-1 rounded-md ${
                    resumeMode === "standard"
                      ? "bg-rose-100 text-rose-900 border border-rose-200"
                      : "bg-emerald-100 text-emerald-900 border border-emerald-200"
                  }`}
                >
                  {resumeMode === "standard" ? "ATS Match Score: 18%" : "ATS Match Score: 94%"}
                </span>
              </div>

              {resumeMode === "standard" ? (
                <div className="space-y-4 font-mono text-xs text-stone-700 bg-white p-6 rounded-xl border border-stone-200 shadow-2xs">
                  <div className="text-stone-400">// ACADEMIC EXPERIENCE SECTION</div>
                  <div className="p-3 bg-rose-50/60 border border-rose-200 rounded-lg text-rose-900 flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Generic Summary:</strong> "Enthusiastic pharmacy graduate seeking an entry-level position in a reputed pharma company."
                      <br />
                      <em className="text-stone-500">→ ATS Parser: 0 keywords matched. Ranked bottom 10% of applicant pool.</em>
                    </span>
                  </div>

                  <div className="p-3 bg-rose-50/60 border border-rose-200 rounded-lg text-rose-900 flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Coursework:</strong> "Studied Pharmacology, Organic Chemistry, and Pharmaceutics."
                      <br />
                      <em className="text-stone-500">→ ATS Parser: No enterprise software tools detected (Missing Argus, MedDRA, EDC, ICD-10).</em>
                    </span>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 font-mono text-xs text-stone-700 bg-white p-6 rounded-xl border border-stone-200 shadow-2xs">
                  <div className="text-stone-400">// WORKFORCE INTELLIGENCE INDEXED SECTION</div>
                  <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-lg text-emerald-950 flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Verified Core Competencies:</strong> Oracle Argus Safety (ICSR intake, MedDRA PT coding, safety narrative drafting).
                      <br />
                      <em className="text-emerald-800">→ ATS Parser: 5 Tier-1 GCC keyword matches. Routed to Senior Hiring Manager queue.</em>
                    </span>
                  </div>

                  <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-lg text-emerald-950 flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Artifact Proof:</strong> "Compiled 15 mock ICSR cases adhering to ICH-E2B(R3) regulatory timelines."
                      <br />
                      <em className="text-emerald-800">→ ATS Parser: Practical project proof score: 98th percentile among freshers.</em>
                    </span>
                  </div>
                </div>
              )}

              <div className="text-center pt-2">
                <p className="text-xs text-stone-600 font-sans">
                  During Sunday's live masterclass, we will conduct a live teardown of 3 actual candidate resumes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            04 · THE 300+ JD INTELLIGENCE TERMINAL
           ───────────────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-24 border-b border-stone-200 bg-[#FAF8F5]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center space-y-3 max-w-3xl mx-auto">
              <PremiumChip variant="gold" size="md">
                EMPIRICAL HIRING DATA
              </PremiumChip>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-tight">
                THE 300+ JD INTELLIGENCE TERMINAL
              </h2>
              <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed">
                Click across the 6 major healthcare career tracks to inspect real tool requirements,
                hiring frequencies, and salary spectrums decoded directly from active employer listings.
              </p>
            </div>

            {/* Track Selector Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
              {(Object.keys(TRACK_DATA) as TrackKey[]).map((key) => {
                const trk = TRACK_DATA[key];
                const Icon = trk.icon;
                const isSelected = activeTrack === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveTrack(key)}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#1B3F8B] text-slate-50 shadow-md"
                        : "bg-white text-stone-700 border border-stone-200 hover:bg-stone-100"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{trk.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Track Terminal Display Card */}
            <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-10 shadow-xs space-y-8 max-w-5xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <span className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
                      {currentTrackData.title}
                    </span>
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#1B3F8B] bg-sky-50 border border-sky-200 px-2.5 py-0.5 rounded-md">
                      {currentTrackData.badge}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-600 font-sans">
                    {currentTrackData.tagline}
                  </p>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right">
                    <p className="text-[10px] font-mono uppercase tracking-wider text-stone-500 font-bold">
                      Starting Package
                    </p>
                    <p className="text-lg font-serif font-bold text-[#8A6D1F]">
                      {currentTrackData.startingSalary}
                    </p>
                  </div>
                  <div className="text-right border-l border-stone-200 pl-4">
                    <p className="text-[10px] font-mono uppercase tracking-wider text-stone-500 font-bold">
                      Dataset Sample
                    </p>
                    <p className="text-lg font-serif font-bold text-[#1B3F8B]">
                      {currentTrackData.jdCount}
                    </p>
                  </div>
                </div>
              </div>

              {/* Skills Frequency Bars Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-7 space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-stone-700">
                      Top Skills Line-Item Frequency (300+ JDs)
                    </span>
                    <span className="font-mono text-[11px] text-stone-500 font-bold">% of JDs Testing</span>
                  </div>

                  <div className="space-y-3.5">
                    {currentTrackData.skills.map((sk, idx) => (
                      <div key={idx} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-sans">
                          <span className="font-medium text-stone-900 flex items-center gap-1.5">
                            {sk.isCore && (
                              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#1B3F8B]" />
                            )}
                            <span>{sk.name}</span>
                          </span>
                          <span className="font-mono font-bold text-[#1B3F8B]">{sk.percentage}%</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-stone-100">
                          <div
                            className="h-full rounded-full bg-[#1B3F8B] transition-all duration-500"
                            style={{ width: `${sk.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-5 space-y-5 rounded-xl border border-stone-200 bg-[#FAF8F5] p-5">
                  <div>
                    <p className="font-mono text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                      Required Software Tools
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {currentTrackData.tools.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-md bg-white border border-stone-200 font-mono text-[11px] font-bold text-stone-800 shadow-2xs"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-stone-200">
                    <p className="font-mono text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                      Day-One Operational Reality
                    </p>
                    <p className="text-xs text-stone-600 leading-relaxed font-sans font-normal">
                      {currentTrackData.dayOneWork}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-stone-200">
                    <p className="font-mono text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                      Eligible Degrees
                    </p>
                    <p className="text-[11px] text-stone-700 font-mono">
                      {currentTrackData.eligibleDegrees.join(" · ")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Recruiter Reality Callout */}
              <div className="rounded-xl border border-sky-200 bg-sky-50/50 p-4 text-xs text-stone-700 font-sans leading-relaxed flex items-start gap-3">
                <Sparkles className="h-4 w-4 text-[#1B3F8B] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1B3F8B]">Recruiter Reality Check:</strong>{" "}
                  {currentTrackData.fresherReality}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            05 · INTERACTIVE 5-YEAR SALARY TRAJECTORY SIMULATOR
           ───────────────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-24 border-b border-stone-200 bg-white">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <PremiumChip variant="navy" size="md">
                GROWTH MATHEMATICS
              </PremiumChip>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-tight">
                5-YEAR EARNING VELOCITY SIMULATOR
              </h2>
              <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed">
                Compare realistic salary progressions across career stages for the {currentTrackData.title} track.
              </p>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-[#FAF8F5] p-6 sm:p-10 shadow-xs space-y-8 max-w-4xl mx-auto">
              {/* Experience Stage Selector */}
              <div className="flex justify-center">
                <div className="inline-flex rounded-xl bg-white p-1 border border-stone-200 shadow-2xs">
                  <button
                    type="button"
                    onClick={() => setSelectedExpStage("y1")}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      selectedExpStage === "y1"
                        ? "bg-[#1B3F8B] text-slate-50 shadow-xs"
                        : "text-stone-600 hover:text-stone-900"
                    }`}
                  >
                    Entry-Level (Year 1)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedExpStage("y3")}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      selectedExpStage === "y3"
                        ? "bg-[#1B3F8B] text-slate-50 shadow-xs"
                        : "text-stone-600 hover:text-stone-900"
                    }`}
                  >
                    Senior Associate (Year 3)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedExpStage("y5")}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      selectedExpStage === "y5"
                        ? "bg-[#1B3F8B] text-slate-50 shadow-xs"
                        : "text-stone-600 hover:text-stone-900"
                    }`}
                  >
                    Team Lead / Manager (Year 5+)
                  </button>
                </div>
              </div>

              {/* Dynamic Metric Display */}
              <div className="grid gap-6 sm:grid-cols-2 text-center">
                <div className="rounded-xl bg-white border border-stone-200 p-6 space-y-2 shadow-2xs">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-stone-500 font-bold">
                    Projected CTC Band ({currentTrackData.title})
                  </span>
                  <p className="font-serif text-3xl sm:text-4xl font-bold text-[#8A6D1F]">
                    {selectedExpStage === "y1"
                      ? currentTrackData.salaryTrajectory.y1
                      : selectedExpStage === "y3"
                      ? currentTrackData.salaryTrajectory.y3
                      : currentTrackData.salaryTrajectory.y5}
                  </p>
                  <p className="text-[11px] text-stone-500 font-mono">Verified across Top Indian GCCs &amp; MNCs</p>
                </div>

                <div className="rounded-xl bg-white border border-stone-200 p-6 space-y-2 shadow-2xs flex flex-col justify-center">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-stone-500 font-bold">
                    Key Accelerating Factor
                  </span>
                  <p className="text-xs sm:text-sm text-stone-800 font-sans font-medium">
                    {selectedExpStage === "y1"
                      ? "Day-one database literacy (Oracle Argus / RAVE / ICD-10)"
                      : selectedExpStage === "y3"
                      ? "Independent aggregate report generation & query handling"
                      : "Regulatory audit defense & cross-functional safety leadership"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            06 · DEGREE-TO-ROLE PERSONAL FIT MATCHER
           ───────────────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-24 border-b border-stone-200 bg-[#FAF8F5]">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <PremiumChip variant="gold" size="md">
                PERSONALIZED FIT CHECK
              </PremiumChip>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-tight">
                FIND YOUR DEGREE MATCH
              </h2>
              <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed">
                Select your academic degree to view immediate high-probability corporate career paths and fresher compensation benchmarks.
              </p>
            </div>

            {/* Degree Selector Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              {DEGREE_PROFILES.map((deg) => (
                <button
                  key={deg.id}
                  type="button"
                  onClick={() => setSelectedDegree(deg.id)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedDegree === deg.id
                      ? "bg-[#1B3F8B] text-slate-50 shadow-md"
                      : "bg-white text-stone-700 border border-stone-200 hover:bg-stone-100"
                  }`}
                >
                  {deg.title}
                </button>
              ))}
            </div>

            {/* Degree Card Output */}
            <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-10 shadow-xs space-y-6 max-w-4xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
                <div>
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-stone-500">
                    Target Degree Profile
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A] mt-1">
                    {currentDegreeProfile.title}
                  </h3>
                </div>
                <div className="text-left sm:text-right">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-stone-500">
                    Typical Starting Range
                  </span>
                  <p className="font-serif text-2xl font-bold text-[#8A6D1F] mt-0.5">
                    {currentDegreeProfile.avgSalary}
                  </p>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-xl bg-[#FAF8F5] border border-stone-200 p-5 space-y-2 shadow-2xs">
                  <p className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B]">
                    Recommended Career Tracks
                  </p>
                  <ul className="space-y-1.5 text-xs text-stone-800 font-sans">
                    {currentDegreeProfile.bestTracks.map((tr, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                        <span className="font-semibold">{tr}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl bg-[#FAF8F5] border border-stone-200 p-5 space-y-2 shadow-2xs">
                  <p className="font-mono text-xs font-bold uppercase tracking-wider text-[#8A6D1F]">
                    Day-One Academic Advantage
                  </p>
                  <p className="text-xs text-stone-700 leading-relaxed font-sans font-normal">
                    {currentDegreeProfile.immediateAdvantage}
                  </p>
                </div>
              </div>

              <div className="rounded-xl bg-[#FAF8F5] border border-stone-200 p-4 text-xs text-stone-700 leading-relaxed font-sans">
                💡 <strong>Hiring Manager Guidance:</strong> {currentDegreeProfile.recruiterInsight}
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            07 · 60-MINUTE MINUTE-BY-MINUTE MASTERCLASS AGENDA
           ───────────────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-24 border-b border-stone-200 bg-white">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <PremiumChip variant="navy" size="md">
                SESSION TIMELINE
              </PremiumChip>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-tight">
                THE 60-MINUTE MASTERCLASS BREAKDOWN
              </h2>
              <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed">
                Structured, data-dense, and zero fluff. Exactly what we will decode during the live session.
              </p>
            </div>

            {/* Native Live Keynote & Real-Time Q&A Interface */}
            <div className="rounded-2xl border border-stone-300 bg-stone-900 text-stone-100 shadow-xl overflow-hidden max-w-3xl mx-auto">
              <div className="flex items-center justify-between px-4 py-3 bg-stone-950 border-b border-stone-800">
                <div className="flex items-center gap-2">
                  <span className="flex h-2 w-2 rounded-full bg-rose-500 motion-safe:animate-pulse" />
                  <span className="font-mono text-xs font-bold text-stone-300 uppercase tracking-wider">
                    LIVE WORKSHOP STREAM · ARZON GLOBAL
                  </span>
                </div>
                <span className="font-mono text-[10px] font-bold text-emerald-400 bg-emerald-950 border border-emerald-800 px-2 py-0.5 rounded">
                  340+ ATTENDEES ONLINE
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
                {/* Keynote Slide Mockup */}
                <div className="md:col-span-7 p-5 sm:p-6 border-b md:border-b-0 md:border-r border-stone-800 space-y-4 bg-gradient-to-br from-stone-900 to-stone-950">
                  <div className="flex items-center justify-between text-[11px] font-mono text-stone-400 pb-2 border-b border-stone-800">
                    <span>SLIDE 14 / 36</span>
                    <span className="text-[#8A6D1F]">JD DEEP-DIVE</span>
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono font-bold text-sky-400 uppercase tracking-wider">PHARMACOVIGILANCE CORE</span>
                    <h4 className="font-serif text-lg font-bold text-white">Oracle Argus Safety vs Manual Case Narrative</h4>
                  </div>
                  <div className="space-y-2 pt-1 font-mono text-[11px]">
                    <div className="space-y-1">
                      <div className="flex justify-between text-stone-400">
                        <span>Oracle Argus Software Fluency</span>
                        <span className="text-emerald-400 font-bold">84% of JDs</span>
                      </div>
                      <div className="h-2 rounded-full bg-stone-800 overflow-hidden">
                        <div className="h-full bg-emerald-500 w-[84%]" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-stone-400">
                        <span>MedDRA Medical Coding Dictionary</span>
                        <span className="text-sky-400 font-bold">78% of JDs</span>
                      </div>
                      <div className="h-2 rounded-full bg-stone-800 overflow-hidden">
                        <div className="h-full bg-[#1B3F8B] w-[78%]" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Live Q&A Stream */}
                <div className="md:col-span-5 p-4 space-y-3 bg-stone-950/80 font-sans text-xs">
                  <span className="font-mono text-[10px] font-bold text-stone-400 uppercase tracking-wider block pb-1 border-b border-stone-800">
                    LIVE CANDIDATE Q&amp;A
                  </span>
                  <div className="space-y-2.5">
                    <div className="rounded-lg bg-stone-900/90 p-2.5 border border-stone-800 space-y-1">
                      <div className="flex items-center justify-between text-[10px] text-stone-400">
                        <span className="font-bold text-stone-200">Pooja M. (Pharm.D)</span>
                        <span>Just now</span>
                      </div>
                      <p className="text-[11px] text-stone-300">"Does Oracle Argus training help for fresher pharmacovigilance roles in Novartis Hyderabad?"</p>
                    </div>
                    <div className="rounded-lg bg-stone-900/90 p-2.5 border border-stone-800 space-y-1">
                      <div className="flex items-center justify-between text-[10px] text-stone-400">
                        <span className="font-bold text-stone-200">Dr. Rahul K. (BAMS)</span>
                        <span>1m ago</span>
                      </div>
                      <p className="text-[11px] text-stone-300">"How does MedDRA LLT to PT coding differ in expedited regulatory reporting?"</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 max-w-3xl mx-auto">
              {MASTERCLASS_AGENDA.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-stone-200 bg-[#FAF8F5] p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:border-[#1B3F8B]/40"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-xs font-bold text-[#1B3F8B] bg-sky-50 border border-sky-200 px-2.5 py-0.5 rounded-md">
                        {item.time}
                      </span>
                      <span className="font-mono text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                        {item.badge}
                      </span>
                    </div>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1A1A1A]">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={scrollToForm}
                className="inline-flex items-center gap-2 h-12 px-7 rounded-xl bg-[#1B3F8B] hover:bg-[#153270] text-slate-50 font-bold text-xs transition-all shadow-md cursor-pointer"
              >
                <span>Reserve Free Seat For Next Session</span>
                <ArrowRight className="h-4 w-4 text-slate-50" />
              </button>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            08 · PRACTITIONER MENTOR & RECRUITER PANEL
           ───────────────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-24 border-b border-stone-200 bg-[#FAF8F5]">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <PremiumChip variant="gold" size="md">
                PRACTITIONER FACULTY
              </PremiumChip>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-tight">
                LEARN DIRECTLY FROM INDUSTRY DIRECTORS
              </h2>
              <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed">
                Insights delivered by senior operational leaders who have personally screened thousands of fresher CVs across global enterprises.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              {MENTOR_PANEL.map((m, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-stone-200 bg-white p-6 flex flex-col justify-between space-y-5 shadow-xs"
                >
                  <div className="space-y-2">
                    <span className="font-mono text-[11px] font-bold text-[#1B3F8B] uppercase tracking-wider">
                      {m.affiliation}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-[#1A1A1A]">{m.name}</h3>
                    <p className="text-xs text-stone-600 font-sans">{m.role}</p>
                  </div>

                  <div className="rounded-xl bg-[#FAF8F5] border border-stone-200 p-4 text-xs text-stone-700 font-sans italic leading-relaxed shadow-2xs">
                    "{m.quote}"
                  </div>
                </div>
              ))}
            </div>

            {/* Employer Logo Wall Strip */}
            <div className="pt-6 text-center space-y-4">
              <p className="font-mono text-xs uppercase tracking-wider text-stone-500 font-bold">
                Public Job Descriptions Analyzed From These Enterprises
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 max-w-4xl mx-auto">
                {HIRING_COMPANIES.map((c, i) => (
                  <span
                    key={i}
                    className="px-3.5 py-1.5 rounded-lg bg-white text-stone-700 font-mono text-xs font-bold border border-stone-200 shadow-2xs"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            09 · THE MASTERCLASS TAKEAWAY KIT (FREE DELIVERABLES)
           ───────────────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-24 border-b border-stone-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <PremiumChip variant="navy" size="md">
                YOUR TANGIBLE ASSETS
              </PremiumChip>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-tight">
                THE MASTERCLASS TAKEAWAY KIT
              </h2>
              <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed">
                Every registered attendee receives instant access to these 4 proprietary career resources.
              </p>
            </div>

            {/* Editorial 18-Page Research Dossier Native Card */}
            <div className="rounded-2xl border border-stone-200 bg-[#FAF8F5] p-6 sm:p-8 shadow-lg max-w-4xl mx-auto space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-stone-200">
                <div className="space-y-1.5">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                    100% FREE FOR ATTENDEES
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
                    The 2026 Healthcare Career Intelligence Dossier
                  </h3>
                  <p className="text-xs text-stone-600 font-sans">
                    18-page empirical analysis of 300+ JDs, hiring rubrics, and ATS optimization benchmarks.
                  </p>
                </div>
                <div className="shrink-0">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1B3F8B] text-slate-50 text-xs font-mono font-bold shadow-xs">
                    <FileText className="h-4 w-4" />
                    <span>18-PAGE PDF DOSSIER</span>
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <div className="rounded-xl bg-white border border-stone-200 p-3.5 space-y-1 shadow-2xs">
                  <span className="text-stone-400 block text-[10px]">CHAPTER 01</span>
                  <span className="font-bold text-stone-800">300+ JD Matrix</span>
                </div>
                <div className="rounded-xl bg-white border border-stone-200 p-3.5 space-y-1 shadow-2xs">
                  <span className="text-stone-400 block text-[10px]">CHAPTER 02</span>
                  <span className="font-bold text-stone-800">ATS Keywords</span>
                </div>
                <div className="rounded-xl bg-white border border-stone-200 p-3.5 space-y-1 shadow-2xs">
                  <span className="text-stone-400 block text-[10px]">CHAPTER 03</span>
                  <span className="font-bold text-stone-800">Salary Velocity</span>
                </div>
                <div className="rounded-xl bg-white border border-stone-200 p-3.5 space-y-1 shadow-2xs">
                  <span className="text-stone-400 block text-[10px]">CHAPTER 04</span>
                  <span className="font-bold text-stone-800">Interview Rubrics</span>
                </div>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {MASTERCLASS_KIT.map((kit, idx) => {
                const Icon = kit.icon;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl border border-stone-200 bg-[#FAF8F5] p-6 space-y-4 shadow-xs flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 border border-sky-200 text-[#1B3F8B]">
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                          {kit.badge}
                        </span>
                      </div>
                      <h3 className="font-serif text-lg font-bold text-[#1A1A1A] leading-snug">
                        {kit.title}
                      </h3>
                      <p className="text-xs text-stone-600 font-sans leading-relaxed font-normal">
                        {kit.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            10 · FREQUENTLY ASKED QUESTIONS ACCORDION
           ───────────────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-24 border-b border-stone-200 bg-[#FAF8F5]">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <PremiumChip variant="gold" size="md">
                CLARITY &amp; TRUST
              </PremiumChip>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1A1A] tracking-tight">
                FREQUENTLY ASKED QUESTIONS
              </h2>
            </div>

            <div className="space-y-3">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl border border-stone-200 bg-white overflow-hidden transition-all shadow-2xs"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-stone-900 cursor-pointer"
                    >
                      <span className="font-serif text-base text-[#1A1A1A]">{faq.q}</span>
                      <ChevronDown
                        className={`h-4 w-4 text-stone-500 transition-transform duration-200 shrink-0 ${
                          isOpen ? "rotate-180 text-[#1B3F8B]" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed font-sans border-t border-stone-200/60">
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
            11 · FINAL HIGH-INTENT REGISTRATION SECTION
           ───────────────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <div className="rounded-3xl border border-stone-200 bg-[#FAF8F5] p-8 sm:p-14 shadow-md space-y-6">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#8A6D1F]">
                LIMITED LIVE Q&amp;A SLOTS
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#1A1A1A] tracking-tight">
                Reserve Your Free Masterclass Seat
              </h2>
              <p className="text-sm sm:text-base text-stone-600 font-sans max-w-xl mx-auto leading-relaxed">
                Join 2,400+ graduates who have eliminated career confusion with empirical industry data. 100% Free · This Sunday at 11:00 AM IST.
              </p>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={scrollToForm}
                  className="inline-flex items-center justify-center gap-2.5 h-13 px-8 rounded-xl bg-[#1B3F8B] hover:bg-[#153270] text-slate-50 font-bold text-sm shadow-lg transition-all cursor-pointer"
                >
                  <Calendar className="h-4 w-4 text-slate-50" />
                  <span>Reserve My Free Seat Now</span>
                  <ArrowRight className="h-4 w-4 text-slate-50" />
                </button>
              </div>

              <p className="text-xs text-stone-500 font-sans">
                ✓ Live on Zoom · Instant WhatsApp Community Access · 18-Page Research Summary PDF
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* ─────────────────────────────────────────────────────────────
          12 · STICKY MOBILE QUICK-REGISTER BAR
         ───────────────────────────────────────────────────────────── */}
      <div className="fixed bottom-3 inset-x-3 z-40 sm:hidden">
        <div className="rounded-2xl border border-stone-300 bg-white/95 backdrop-blur-xl p-3 shadow-2xl flex items-center justify-between gap-2.5">
          <div>
            <p className="text-[11px] font-bold text-[#1A1A1A] leading-tight">Free Live Workshop</p>
            <p className="text-[10px] font-mono text-amber-700 font-bold">Sunday 11 AM · 38 Spots Left</p>
          </div>
          <button
            type="button"
            onClick={scrollToForm}
            className="h-10 px-4 rounded-xl bg-[#1B3F8B] hover:bg-[#153270] text-slate-50 font-bold text-xs transition-all shadow-md shrink-0 flex items-center gap-1.5 cursor-pointer"
          >
            <span>Register Free</span>
            <ArrowRight className="h-3.5 w-3.5 text-slate-50" />
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
