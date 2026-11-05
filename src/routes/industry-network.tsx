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
  FileCheck2,
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
  Coins,
  Scroll,
  Stamp,
  Rocket,
  Flag,
  Zap,
  TrendingUp,
  Gift,
  Trophy,
  Megaphone,
  Network,
  Layers,
  Target,
  UserCheck,
  User,
} from "lucide-react";
import { COUNSELLOR_PHONE, SITE, absUrl } from "@/components/landing/constants";
import { trackEvent } from "@/lib/analytics";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { submitFastCounsellorLead } from "@/lib/workshop.functions";
import {
  submitIndustryNetworkAppFn,
  type IndustryNetworkApplicationRecord,
} from "@/lib/industryNetwork.functions";

// ── WhatsApp URL Helper ───────────────────────────────────────────────────────
const waMsg = (text: string) =>
  `https://wa.me/${COUNSELLOR_PHONE}?text=${encodeURIComponent(text)}`;

// ── Route Definition & SEO Metadata ──────────────────────────────────────────
export const Route = createFileRoute("/industry-network")({
  head: () => {
    const title = "Industry Network Lead Role · Official Campus Executive Appointment | Arzon Global";
    const desc =
      "Join the Arzon Global Industry Network Lead cohort. Access professional training, industry mentorship, and receive verified credentials: an official Appointment Letter, 6-Month Experience Certificate, and Director LOR.";
    const url = `${SITE.origin}/industry-network`;
    const og = absUrl("/images/industry-network/hero-campus-leads-duo.webp");

    return {
      meta: [
        { title },
        { name: "description", content: desc },
        {
          name: "keywords",
          content:
            "industry network lead, arzon global campus ambassador, campus lead earnings, official appointment letter, experience letter student, letter of recommendation lor, pharmacy campus leadership, bpharm career networking, pharmd campus lead, biotechnology student mentorship, healthcare campus connect",
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
            "@type": "JobPosting",
            title: "Industry Network Lead (Student Campus Executive Appointment)",
            description: desc,
            identifier: {
              "@type": "PropertyValue",
              name: "Arzon Global",
              value: "AG-INL-2026",
            },
            hiringOrganization: {
              "@type": "Organization",
              name: "Arzon Global",
              sameAs: SITE.origin,
            },
            jobLocationType: "TELECOMMUTE",
            employmentType: "PART_TIME",
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE.origin },
              { "@type": "ListItem", position: 2, name: "Leadership", item: absUrl("/industry-network") },
              { "@type": "ListItem", position: 3, name: "Industry Network Lead", item: url },
            ],
          }),
        },
      ],
    };
  },
  component: IndustryNetworkLeadPage,
});

// ── Degree Options for Quick Callback ─────────────────────────────────────────
const DEGREES = [
  "B.Pharm (Bachelor of Pharmacy)",
  "M.Pharm (Pharmacology / Clinical / Pharmaceutics)",
  "Pharm.D (Doctor of Pharmacy)",
  "D.Pharm (Diploma in Pharmacy)",
  "B.Sc / M.Sc Biotechnology",
  "B.Sc / M.Sc Life Sciences",
  "B.Tech / B.E (Biomedical / Biotech / Health-Tech)",
  "Other Healthcare / Allied Science Degree",
];

const PASSING_YEARS = [
  "First Year (2029 / 2030 Batch)",
  "Second Year (2028 Batch)",
  "Third Year (2027 Batch)",
  "Final Year (2026 Batch)",
];

// ── Official Credential Work Samples (Section 07 Tabs) ────────────────────────
const CREDENTIAL_SAMPLES = [
  {
    id: "appointment-letter",
    tabLabel: "Official Appointment Letter",
    icon: FileText,
    tag: "DAY 1 INDUCTION",
    trackingId: "ARZ-INL-2026-APPT",
    signatory: "Managing Director & Directorate of Campus Operations",
    recipient: "Appointed Student Executive",
    scope: "Designated Campus Jurisdiction – Institutional Leadership",
    verdict: "Formal Corporate Appointment Confirmed",
    details: [
      { label: "Document Type", value: "Official Appointment Offer Letter (Executive Mandate)" },
      { label: "Executive Designation", value: "Industry Network Lead (INL)" },
      { label: "Designated Authority", value: "Departmental Representation & Pre-Placement Liaison" },
      { label: "Verification Status", value: "Unique Credential ID · Corporate Letterhead with Seal" },
    ],
    recruiterValue: [
      "Official legal proof of holding an executive campus appointment",
      "Immediate distinction from peer applicants on LinkedIn and resumes",
      "Demonstrable authorization to coordinate corporate industry initiatives",
      "Direct communication channel with Arzon Global executive leadership",
    ],
  },
  {
    id: "experience-letter",
    tabLabel: "6-Month Experience Certificate",
    icon: Award,
    tag: "6-MONTH TENURE",
    trackingId: "ARZ-EXP-2026-TENURE",
    signatory: "Head of Human Resources & Corporate Talent Directorate",
    recipient: "Tenure-Completed Industry Network Lead",
    scope: "6 Months Active Corporate Leadership & Operations",
    verdict: "Corporate Experience Verified & Signed",
    details: [
      { label: "Document Type", value: "Formal Corporate Experience Certificate" },
      { label: "Tenure Duration", value: "6 Months (Active Executive Engagement)" },
      { label: "Key Competencies", value: "Stakeholder Management, Case Workshop Coordination, Peer Mentorship" },
      { label: "Recruiter Verification", value: "Direct HR reference verification check supported" },
    ],
    recruiterValue: [
      "Completely solves the 'zero prior experience' paradox for freshers",
      "Verified corporate proof of leadership, teamwork, and execution",
      "Direct resume validation for campus and off-campus recruitment drives",
      "Recognized by hiring teams across Tier-1 CROs and biopharma capability centers",
    ],
  },
  {
    id: "director-lor",
    tabLabel: "Director Recommendation Letter (LOR)",
    icon: Users,
    tag: "DIRECTOR ENDORSED",
    trackingId: "ARZ-LOR-2026-EXEC",
    signatory: "Senior Operational Director, Arzon Global",
    recipient: "High-Performing Industry Network Lead",
    scope: "Higher Education (MS/MBA) & Corporate Placements",
    verdict: "Authoritative Reference Endorsement",
    details: [
      { label: "Document Type", value: "Executive Letter of Recommendation (LOR)" },
      { label: "Scope & Jurisdiction", value: "Corporate job hiring & top-tier global graduate admissions" },
      { label: "Focus Areas", value: "Analytical initiative, professional integrity, communication rigor" },
      { label: "Endorsement Level", value: "Personally signed by biopharma corporate leadership" },
    ],
    recruiterValue: [
      "Authoritative reference letter for competitive job screening",
      "Customized for MS / MBA / PhD admissions in US, UK, and Europe",
      "Validates professional maturity, ethics, and strategic mindset",
      "Direct contact details provided for employer background checks",
    ],
  },
  {
    id: "training-credential",
    tabLabel: "ISO Domain Training Credential",
    icon: Layers,
    tag: "COMPLIMENTARY ACCESS",
    trackingId: "ARZ-CERT-2026-PV",
    signatory: "Academic Board & ISO 9001:2015 Accreditation Council",
    recipient: "Certified Industry Network Lead",
    scope: "Flagship Biopharma Domain Track (PV / CDM / Med Writing / Reg Affairs)",
    verdict: "100% Corporate Sponsorship Applied",
    details: [
      { label: "Curriculum Scope", value: "Full professional domain specialization with live case labs" },
      { label: "Training Access", value: "100% Corporate Sponsored (Complimentary Enrollment)" },
      { label: "Practical Assessment", value: "ICSR Case Processing, Standardized Coding & CIOMS Narrative" },
      { label: "Accreditation", value: "ISO 9001:2015 certified verifiable digital credential" },
    ],
    recruiterValue: [
      "Verified practical competence in real biopharma safety workflows",
      "Sharable digital credential badge for LinkedIn & digital portfolios",
      "Tangible proof of specialized technical skill beyond university coursework",
      "Prepares candidates to clear technical screening tests on Day 1",
    ],
  },
];

// ── FAQs Data (Section 10) ────────────────────────────────────────────────────
const BLUEPRINT_FAQS = [
  {
    q: "Who can apply for the Industry Network Lead role?",
    a: "Undergraduate, postgraduate, and doctoral students currently enrolled in B.Pharm, M.Pharm, Pharm.D, D.Pharm, Biotechnology, Life Sciences, Allied Health, and Engineering programs. We select strictly 8 leads per participating campus (2 First Year, 2 Second Year, 2 Third Year, and 2 Final Year).",
  },
  {
    q: "Are incentives and awards provided?",
    a: "Yes. Selected Industry Network Leads can receive performance-based incentives based on contribution, active campus engagement, and student workshop initiatives, as well as compete for annual National Excellence Awards.",
  },
  {
    q: "What official corporate documentation will I receive?",
    a: "Every appointed Industry Network Lead receives three formal career credentials: (1) An official Appointment & Offer Letter with designated authority upon induction; (2) A 6-Month Corporate Experience Certificate verifying leadership tenure; and (3) An Executive Letter of Recommendation (LOR) signed by Arzon Global Leadership for corporate placements and Master's/MS/MBA applications abroad.",
  },
  {
    q: "Will I receive professional domain training?",
    a: "Yes. Selected Industry Network Leads receive complimentary training in one selected domain from Arzon Global's portfolio of 22+ healthcare and life-sciences domains, subject to programme completion and assessment requirements. There are no tuition fees or charges for appointed leads.",
  },
  {
    q: "Do I need prior corporate or marketing experience to join?",
    a: "No prior corporate experience is required. We look for proactive communication, enthusiasm for life sciences careers, and active campus involvement. All appointed leads receive an executive orientation kit and direct guidance from the Arzon campus directorate.",
  },
  {
    q: "What is the weekly time commitment required?",
    a: "Approximately 3 to 5 hours per week. The role is designed specifically for active university students to seamlessly balance academic coursework with high-impact campus leadership.",
  },
  {
    q: "How does the selection process work?",
    a: "Applications are screened on academic background, leadership aptitude, and campus involvement. Shortlisted candidates complete a brief 10-minute virtual interaction with the Arzon campus directorate, followed by formal appointment offers.",
  },
  {
    q: "How do I speak to a counsellor about this role?",
    a: "Click 'Talk to a Campus Counsellor' anywhere on this page to share your academic background. Our campus team will connect with you via WhatsApp or a brief call to explain the quota for your college.",
  },
];

// ── Discipline Intelligence Data (Section 09) ─────────────────────────────────
const DISCIPLINE_DATA: Record<
  string,
  { tracks: string[]; roleAdvantage: string; popularRoles: string[] }
> = {
  "B.Pharm": {
    tracks: ["Pharmacovigilance (ICSR/PSUR)", "Clinical SAS Programming", "Medical Writing", "Drug Regulatory Affairs"],
    roleAdvantage:
      "B.Pharm leads bridge clinical pharmacology curriculum with global pharmacovigilance operations and regulatory reporting.",
    popularRoles: ["Drug Safety Associate", "Junior Medical Writer", "Clinical Operations Trainee"],
  },
  "M.Pharm": {
    tracks: ["Regulatory Submissions (eCTD)", "Formulation QA/QC", "Clinical Pharmacology", "Medical Affairs"],
    roleAdvantage:
      "M.Pharm leads provide advanced technical authority, organizing departmental case study workshops and mentoring junior cohorts.",
    popularRoles: ["Regulatory Affairs Specialist", "QC/QA Analyst", "Pharmacovigilance Scientist"],
  },
  "Pharm.D": {
    tracks: ["Clinical Trial Monitoring", "Medical Science Liaison (MSL)", "Health Economics & Outcomes (HEOR)"],
    roleAdvantage:
      "Pharm.D leads leverage direct hospital ward rotation insights to champion patient-centric clinical trials and protocol management.",
    popularRoles: ["Clinical Research Associate (CRA)", "Medical Information Specialist", "HEOR Analyst"],
  },
  "D.Pharm": {
    tracks: ["Healthcare Retail Operations", "Hospital Dispensary Operations", "Pharmaceutical Supply Chain"],
    roleAdvantage:
      "D.Pharm leads connect frontline pharmacy students with modern healthcare distribution systems and hospital careers.",
    popularRoles: ["Hospital Pharmacist", "Pharmacy Operations Lead", "Quality Inspection Officer"],
  },
  Biotechnology: {
    tracks: ["Bio-Manufacturing", "Bioinformatics & Genomic Analytics", "Biologics QA", "Cell Culture Operations"],
    roleAdvantage:
      "Biotechnology leads bridge upstream molecular sciences with modern biomanufacturing and computational genomics pipelines.",
    popularRoles: ["Bioinformatics Associate", "Bioprocess Trainee", "Bio-Analytical Chemist"],
  },
  "Life Sciences": {
    tracks: ["Clinical Data Management (EDC)", "Scientific Literature Review", "Diagnostic Laboratory Analytics"],
    roleAdvantage:
      "Life Sciences leads excel in data-intensive clinical disciplines including database build, data discrepancy review, and EDC workflows.",
    popularRoles: ["Clinical Data Coordinator", "Lab Operations Analyst", "Scientific Reviewer"],
  },
  Engineering: {
    tracks: ["Healthcare IT & EHR Systems", "Medical Device Software", "Biomedical Instrumentation", "Health AI"],
    roleAdvantage:
      "Engineering leads pioneer health-tech cross-functional initiatives, combining technical problem-solving with clinical digital transformation.",
    popularRoles: ["Health-Tech Systems Engineer", "Biomedical Equipment Specialist", "Data Engineer"],
  },
  "Other Disciplines": {
    tracks: ["Healthcare Administration", "Public Health Research", "Medical Communications", "Healthcare Analytics"],
    roleAdvantage:
      "Diverse academic backgrounds bring multidisciplinary perspectives, critical for modern global clinical supply chains and hospital administration.",
    popularRoles: ["Healthcare Operations Associate", "Clinical Project Coordinator", "Research Assistant"],
  },
};

// ── Main Component ───────────────────────────────────────────────────────────
function IndustryNetworkLeadPage() {
  const [isCounsellorModalOpen, setIsCounsellorModalOpen] = useState(false);
  const [activeCredentialTab, setActiveCredentialTab] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>("B.Pharm");

  // Frictionless Quick Apply Modal State (4 fields only)
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [applyForm, setApplyForm] = useState({
    fullName: "",
    mobileNumber: "",
    email: "",
    collegeName: "",
  });
  const [applyErrors, setApplyErrors] = useState<Record<string, string>>({});
  const [isSubmittingApply, setIsSubmittingApply] = useState(false);
  const [applySuccessRecord, setApplySuccessRecord] =
    useState<IndustryNetworkApplicationRecord | null>(null);

  const submitApp = useServerFn(submitIndustryNetworkAppFn);

  const openApplyModal = (source = "direct") => {
    trackEvent("quick_apply_modal_open", { source });
    setApplyErrors({});
    setIsApplyModalOpen(true);
  };

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};

    if (!applyForm.fullName.trim() || applyForm.fullName.trim().length < 2) {
      errs.fullName = "Please enter your full legal name";
    }

    const cleanMobile = applyForm.mobileNumber.replace(/[\s\-\+]/g, "").replace(/^91/, "");
    if (!/^[6-9]\d{9}$/.test(cleanMobile)) {
      errs.mobileNumber = "Enter a valid 10-digit Indian WhatsApp mobile number (starting with 6-9)";
    }

    if (!applyForm.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(applyForm.email)) {
      errs.email = "Please enter a valid email address";
    }

    if (!applyForm.collegeName.trim() || applyForm.collegeName.trim().length < 2) {
      errs.collegeName = "Please enter your college / university name";
    }

    if (Object.keys(errs).length > 0) {
      setApplyErrors(errs);
      return;
    }

    setApplyErrors({});
    setIsSubmittingApply(true);
    trackEvent("quick_apply_submit_attempt", { college: applyForm.collegeName });

    try {
      const res = await submitApp({
        data: {
          fullName: applyForm.fullName.trim(),
          mobileNumber: cleanMobile,
          email: applyForm.email.trim(),
          collegeName: applyForm.collegeName.trim(),
        },
      });

      if (res.success && res.record) {
        setApplySuccessRecord(res.record);
        toast.success("Application submitted successfully!");
        trackEvent("quick_apply_success", {
          appNumber: res.record.applicationNumber,
        });
      } else {
        toast.error(res.message || "Could not submit application.");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to submit. Please try again or WhatsApp us.");
    } finally {
      setIsSubmittingApply(false);
    }
  };

  // Counsellor Form State
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
    trackEvent("industry_network_page_view", {
      path: "/industry-network",
      source: "pv_associate_blueprint_alignment",
    });
  }, []);

  const openCounsellor = (triggerSource = "direct") => {
    trackEvent("counsellor_modal_open", { source: triggerSource });
    setFormSubmitted(false);
    setIsCounsellorModalOpen(true);
  };

  const handleCounsellorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!counsellorForm.name.trim() || !counsellorForm.phone.trim()) return;

    setIsSubmitting(true);
    trackEvent("counsellor_form_submit", {
      degree: counsellorForm.degree,
      year: counsellorForm.year,
    });

    try {
      await submitFastCounsellorLead({
        data: {
          name: counsellorForm.name.trim(),
          phone: counsellorForm.phone.trim(),
          source: "industry_network_counsellor",
          degree: counsellorForm.degree,
          academicYear: counsellorForm.year,
          programName: "Industry Network Lead",
          question: counsellorForm.question || "Discussing campus lead quota and selection",
        },
      });
    } catch (err) {
      console.warn("[IndustryNetwork] Failed to save counsellor lead before WhatsApp redirect:", err);
    }

    setIsSubmitting(false);
    setFormSubmitted(true);
    try {
      const text = `Hi Arzon Campus Team! I am interested in the Industry Network Lead role:\nName: ${counsellorForm.name}\nPhone: ${counsellorForm.phone}\nDegree: ${counsellorForm.degree} (${counsellorForm.year})\nQuestion: ${counsellorForm.question || "Discussing campus lead quota and selection"}`;
      window.open(waMsg(text), "_blank");
    } catch {}
  };

  const currentCredential = CREDENTIALS_SAMPLES_SAFE(activeCredentialTab);

  function CREDENTIALS_SAMPLES_SAFE(idx: number) {
    return CREDENTIAL_SAMPLES[idx] || CREDENTIAL_SAMPLES[0];
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#081F38] font-sans antialiased selection:bg-[#2563EB] selection:text-white">
      {/* ── 01. HERO (EXACTLY MATCHING HOMEPAGE PALETTE & ARCHITECTURE) ───────── */}
      <section className="relative overflow-hidden bg-white tone-light card-light border-b border-[#E4EAF2] pt-10 pb-14 sm:pt-16 sm:pb-20">
        {/* Ambient Radial Accent exactly as homepage */}
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(37,99,235,0.06),rgba(255,255,255,0))] pointer-events-none"
          aria-hidden="true"
        />

        {/* Decorative Royal Blue Corner Accent */}
        <div
          aria-hidden="true"
          className="absolute -top-12 -right-12 w-64 h-64 sm:w-80 sm:h-80 lg:w-[440px] lg:h-[440px] bg-gradient-to-bl from-[#2563EB] via-[#1D4ED8] to-[#1E40AF] [clip-path:polygon(100%_0,20%_0,100%_80%)] opacity-90 pointer-events-none -z-0"
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Eyebrow Cohort Badge matching homepage */}
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEF6FF]/95 backdrop-blur-xs border border-[#BFDBFE] text-[#1D4ED8] font-mono text-xs font-bold uppercase tracking-wider shadow-2xs">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
                </span>
                APPOINTMENT COHORT 2026
              </span>

              {/* Headline with Homepage Signature Gradient */}
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-[#081F38] leading-[1.12]">
                Industry Network Lead.
                <span className="block font-serif italic font-medium tracking-normal mt-1">
                  A Recognised{" "}
                  <span className="bg-gradient-to-r from-[#2563EB] via-[#0284C7] to-[#7C3AED] bg-clip-text text-transparent [box-decoration-break:clone]">
                    Campus Role.
                  </span>
                </span>
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg text-[#475569] font-normal leading-relaxed max-w-xl">
                Represent Arzon Global at your university. Gain industry exposure, practical experience and professional recognition through an official Appointment Letter, 6-month Experience Certificate and Director LOR.
              </p>

              {/* Dual CTA Actions matching homepage */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => openApplyModal("hero")}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-sm shadow-md shadow-blue-600/15 transition-all active:scale-[0.98] cursor-pointer"
                >
                  <Users className="w-4 h-4" />
                  <span>Apply Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => openCounsellor("hero_secondary")}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white tone-light card-light border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#081F38] font-bold text-sm shadow-2xs transition-all active:scale-[0.99] cursor-pointer"
                >
                  <Play className="w-4 h-4 text-[#2563EB] fill-[#2563EB]/20" />
                  <span>Talk to Experts</span>
                </button>
              </div>
            </div>

            {/* Right Student Photography Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl lg:rounded-[32px] overflow-hidden border border-[#E4EAF2] bg-white tone-light card-light shadow-xl">
                <img
                  src="/images/industry-network/hero-campus-leads-duo.webp"
                  alt="Arzon Global Industry Network Leads standing in front of university campus"
                  className="w-full h-80 sm:h-96 lg:h-[400px] object-cover object-center"
                />
              </div>
            </div>
          </div>

          {/* Bottom 4-Column Feature Card (Floating Outcomes Bar) matching homepage */}
          <div className="mt-12 sm:mt-16 p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-white tone-light card-light border border-[#E4EAF2] shadow-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[#E4EAF2]">
              {/* Item 1 */}
              <div className="flex items-center gap-3.5 pl-0 sm:pl-2">
                <div className="w-12 h-12 rounded-2xl bg-[#EEF6FF] border border-[#BFDBFE]/60 flex items-center justify-center text-[#2563EB] shrink-0 shadow-2xs">
                  <FileText className="w-6 h-6 stroke-[1.8]" />
                </div>
                <div>
                  <strong className="text-sm sm:text-base font-bold text-[#081F38] block leading-tight">
                    Appointment Letter
                  </strong>
                  <span className="text-xs text-[#64748B] block mt-0.5 font-medium">
                    Official Designation
                  </span>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex items-center gap-3.5 pt-4 sm:pt-0 sm:pl-6">
                <div className="w-12 h-12 rounded-2xl bg-[#EEF6FF] border border-[#BFDBFE]/60 flex items-center justify-center text-[#2563EB] shrink-0 shadow-2xs">
                  <Award className="w-6 h-6 stroke-[1.8]" />
                </div>
                <div>
                  <strong className="text-sm sm:text-base font-bold text-[#081F38] block leading-tight">
                    6-Month Experience
                  </strong>
                  <span className="text-xs text-[#64748B] block mt-0.5 font-medium">
                    Industry Exposure
                  </span>
                </div>
              </div>

              {/* Item 3 */}
              <div className="flex items-center gap-3.5 pt-4 sm:pt-0 sm:pl-6">
                <div className="w-12 h-12 rounded-2xl bg-[#EEF6FF] border border-[#BFDBFE]/60 flex items-center justify-center text-[#2563EB] shrink-0 shadow-2xs">
                  <GraduationCap className="w-6 h-6 stroke-[1.8]" />
                </div>
                <div>
                  <strong className="text-sm sm:text-base font-bold text-[#081F38] block leading-tight">
                    Director LOR
                  </strong>
                  <span className="text-xs text-[#64748B] block mt-0.5 font-medium">
                    Leadership Reference
                  </span>
                </div>
              </div>

              {/* Item 4 */}
              <div className="flex items-center gap-3.5 pt-4 sm:pt-0 sm:pl-6">
                <div className="w-12 h-12 rounded-2xl bg-[#EEF6FF] border border-[#BFDBFE]/60 flex items-center justify-center text-[#2563EB] shrink-0 shadow-2xs">
                  <Layers className="w-6 h-6 stroke-[1.8]" />
                </div>
                <div>
                  <strong className="text-sm sm:text-base font-bold text-[#081F38] block leading-tight">
                    Professional Training
                  </strong>
                  <span className="text-xs text-[#64748B] block mt-0.5 font-medium">
                    Domain &amp; Compliance
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 02. UNDERSTAND THE ROLE (HOMEPAGE COLOR SYSTEM) ───────────────── */}
      <section className="py-16 sm:py-24 bg-white tone-light card-light border-b border-[#E4EAF2]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Narrative Column with Building Image */}
            <div className="lg:col-span-5 space-y-5 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEF6FF]/95 backdrop-blur-xs border border-[#BFDBFE] text-[#1D4ED8] font-mono text-xs font-bold uppercase tracking-wider shadow-2xs">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
                </span>
                <span>02 · UNDERSTAND THE ROLE</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#081F38] leading-[1.12]">
                What is an{" "}
                <span className="bg-gradient-to-r from-[#2563EB] via-[#0284C7] to-[#7C3AED] bg-clip-text text-transparent [box-decoration-break:clone]">
                  Industry Network Lead?
                </span>
              </h2>

              <p className="text-base sm:text-lg text-[#475569] leading-relaxed max-w-md font-normal">
                A student representative who bridges your campus with real industry opportunities in biopharma, clinical data, and life sciences, working closely with Arzon Global and its hiring partners.
              </p>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => openApplyModal("section_02_role")}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-sm shadow-md shadow-blue-600/15 transition-all active:scale-[0.98] cursor-pointer"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Corporate Headquarters Architecture Visual */}
              <div className="pt-6 hidden sm:block">
                <div className="relative rounded-3xl overflow-hidden border border-[#E4EAF2] shadow-md max-w-[340px]">
                  <img
                    src="/images/industry-network/arzon-corporate-headquarters.webp"
                    alt="Arzon Global Corporate Headquarters Building"
                    className="w-full h-44 sm:h-52 object-cover object-center"
                  />
                </div>
              </div>
            </div>

            {/* Right 6 Modular Icon Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              {[
                {
                  icon: Flag,
                  title: "Represent Arzon Global",
                  desc: "Be the official institutional voice within your university departments and student unions.",
                },
                {
                  icon: Users,
                  title: "Connect Student Peers",
                  desc: "Build a community of students interested in biopharma careers, internships, and placement drives.",
                },
                {
                  icon: Megaphone,
                  title: "Distribute Career Briefings",
                  desc: "Share verified industry intelligence, clinical trial updates, and corporate masterclasses.",
                },
                {
                  icon: Calendar,
                  title: "Coordinate Campus Drives",
                  desc: "Host approved campus readiness workshops, pre-placement talks, and diagnostic webinars.",
                },
                {
                  icon: Users,
                  title: "Liaise with Faculty & Deans",
                  desc: "Build executive relationships with professors and placement directors on behalf of Arzon Global.",
                },
                {
                  icon: TrendingUp,
                  title: "Fast-Track Your Placement",
                  desc: "Enable your campus to access direct referrals to 50+ hiring partner CROs and global pharma GCCs.",
                },
              ].map((card, idx) => {
                const IconComponent = card.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-3xl bg-white tone-light card-light border border-[#E4EAF2] shadow-2xs hover:border-[#2563EB]/40 hover:shadow-lg transition-all space-y-3"
                  >
                    <div className="w-11 h-11 rounded-2xl bg-[#EEF6FF] border border-[#BFDBFE]/60 flex items-center justify-center text-[#2563EB] shadow-2xs">
                      <IconComponent className="w-5 h-5 stroke-[1.8]" />
                    </div>
                    <h3 className="text-base font-bold text-[#081F38]">{card.title}</h3>
                    <p className="text-xs sm:text-[13px] text-[#64748B] leading-relaxed">{card.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── 03. THE OUTCOME (HOMEPAGE COLOR SYSTEM) ─────────────────────────── */}
      <section id="outcomes" className="py-16 sm:py-24 bg-[#F8FAFC] border-b border-[#E2E8F0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-left">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEF6FF]/95 backdrop-blur-xs border border-[#BFDBFE] text-[#1D4ED8] font-mono text-xs font-bold uppercase tracking-wider shadow-2xs">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
              </span>
              <span>03 · THE OUTCOME</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#081F38] leading-[1.12]">
              From a Campus Student to an Appointed{" "}
              <span className="bg-gradient-to-r from-[#2563EB] via-[#0284C7] to-[#7C3AED] bg-clip-text text-transparent [box-decoration-break:clone]">
                Industry Network Lead
              </span>
            </h2>
            <p className="text-base sm:text-lg text-[#475569] leading-relaxed font-normal">
              See how your profile, exposure, and opportunities level up when you take on the official Industry Network Lead role.
            </p>
          </div>

          {/* Comparison Split Cards with Center Arrow */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Card A: Academic Default */}
            <div className="md:col-span-5 p-7 rounded-3xl bg-white tone-light card-light border border-[#E2E8F0] space-y-5 shadow-xs">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] font-bold text-slate-700 uppercase bg-[#F1F5F9] px-2.5 py-1 rounded-md">
                    TYPICAL PATH
                  </span>
                  <span className="text-xs text-slate-500 font-medium">As a General Student</span>
                </div>
                <h3 className="text-xl font-extrabold text-[#081F38]">Standard Student Profile</h3>

                <div className="space-y-3.5 text-xs sm:text-sm text-[#64748B] pt-2">
                  <div className="flex items-center justify-between py-2 border-b border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#EEF6FF] flex items-center justify-center text-[#2563EB] shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <span className="text-slate-700 font-medium">Corporate Letters</span>
                    </div>
                    <span className="text-[#64748B] text-right font-medium">None (no experience proof)</span>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#EEF6FF] flex items-center justify-center text-[#2563EB] shrink-0">
                        <Layers className="w-4 h-4" />
                      </div>
                      <span className="text-slate-700 font-medium">Domain Training</span>
                    </div>
                    <span className="text-[#64748B] text-right font-medium">Self-funded commercial tuition</span>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#EEF6FF] flex items-center justify-center text-[#2563EB] shrink-0">
                        <Trophy className="w-4 h-4" />
                      </div>
                      <span className="text-slate-700 font-medium">Performance Incentives</span>
                    </div>
                    <span className="text-[#64748B] text-right font-medium">None (standard student status)</span>
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#EEF6FF] flex items-center justify-center text-[#2563EB] shrink-0">
                        <Users className="w-4 h-4" />
                      </div>
                      <span className="text-slate-700 font-medium">Placement Screening</span>
                    </div>
                    <span className="text-[#64748B] text-right font-medium">Competes in a crowded fresher queue</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Center Connective Arrow */}
            <div className="md:col-span-2 hidden md:flex items-center justify-center">
              <div className="w-11 h-11 rounded-full bg-[#EEF6FF] border border-[#BFDBFE] flex items-center justify-center text-[#2563EB] shadow-xs">
                <ArrowRight className="w-5 h-5 stroke-[2]" />
              </div>
            </div>

            {/* Card B: Industry Network Lead */}
            <div className="md:col-span-5 p-7 rounded-3xl bg-white tone-light card-light border-2 border-[#2563EB]/40 space-y-5 shadow-md relative">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-bold text-[#1D4ED8] uppercase bg-[#EEF6FF] border border-[#BFDBFE] px-2.5 py-1 rounded-md">
                    WITH OFFICIAL APPOINTMENT
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#2563EB] text-white shadow-xs">
                    <Users className="w-3.5 h-3.5" />
                    Industry Network Lead
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-[#081F38]">An Appointed Industry Network Lead</h3>

                <div className="space-y-3.5 text-xs sm:text-sm text-[#081F38] pt-2">
                  <div className="flex items-center justify-between py-2 border-b border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#EEF6FF] flex items-center justify-center text-[#2563EB] shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <span className="text-slate-700 font-medium">Corporate Letters</span>
                    </div>
                    <strong className="text-[#2563EB] font-bold text-right">Offer Letter + Experience Letter + LOR</strong>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#EEF6FF] flex items-center justify-center text-[#2563EB] shrink-0">
                        <Layers className="w-4 h-4" />
                      </div>
                      <span className="text-slate-700 font-medium">Domain Training</span>
                    </div>
                    <strong className="text-[#2563EB] font-bold text-right">100% Complimentary Sponsorship</strong>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#EEF6FF] flex items-center justify-center text-[#2563EB] shrink-0">
                        <Trophy className="w-4 h-4" />
                      </div>
                      <span className="text-slate-700 font-medium">Performance Incentives</span>
                    </div>
                    <strong className="text-[#2563EB] font-bold text-right">Merit Incentives &amp; National Recognition</strong>
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#EEF6FF] flex items-center justify-center text-[#2563EB] shrink-0">
                        <Rocket className="w-4 h-4" />
                      </div>
                      <span className="text-slate-700 font-medium">Placement Screening</span>
                    </div>
                    <strong className="text-[#2563EB] font-bold text-right">Priority Referrals to Hiring Partners</strong>
                  </div>
                </div>
              </div>

              {/* Bottom Strip inside Card B */}
              <div className="p-3.5 rounded-xl bg-[#EEF6FF] border border-[#BFDBFE] flex items-center gap-2.5 text-xs sm:text-sm font-bold text-[#1D4ED8]">
                <Calendar className="w-4 h-4 shrink-0 text-[#2563EB]" />
                <span>A 6-month, verifiable corporate experience on your profile.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 04. SELECTION STRUCTURE (HOMEPAGE COLOR SYSTEM) ─────────────────── */}
      <section className="py-16 sm:py-24 bg-white tone-light card-light border-b border-[#E4EAF2]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-left">
          {/* Header Row with 08 Leads Metric Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center justify-between">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEF6FF]/95 backdrop-blur-xs border border-[#BFDBFE] text-[#1D4ED8] font-mono text-xs font-bold uppercase tracking-wider shadow-2xs">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
                </span>
                <span>04 · SELECTION STRUCTURE</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#081F38] leading-[1.12]">
                Eight Students.{" "}
                <span className="bg-gradient-to-r from-[#2563EB] via-[#0284C7] to-[#7C3AED] bg-clip-text text-transparent [box-decoration-break:clone]">
                  One College Network.
                </span>
              </h2>
              <p className="text-base sm:text-lg text-[#475569] leading-relaxed max-w-2xl font-normal">
                We select strictly eight Industry Network Leads from each participating college to ensure balanced representation across every academic year.
              </p>
            </div>

            {/* Right 08 Summary Card */}
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <div className="p-5 rounded-3xl bg-white tone-light card-light border border-[#E4EAF2] shadow-xs flex items-center gap-4 w-full sm:w-auto">
                <div className="w-14 h-14 rounded-2xl bg-[#EEF6FF] border border-[#BFDBFE]/60 flex items-center justify-center text-[#2563EB] shrink-0">
                  <Users className="w-7 h-7 stroke-[1.8]" />
                </div>
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-[#2563EB] to-[#0284C7] bg-clip-text text-transparent tracking-tight">08</span>
                  </div>
                  <strong className="text-sm font-bold text-[#081F38] block leading-tight">
                    Industry Network Leads
                  </strong>
                  <span className="text-xs text-[#64748B] block mt-0.5">
                    Selected per participating college
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Connected Batch Quota Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                year: "First Year",
                tag: "Foundation Lead",
                icon: GraduationCap,
                quota: "02",
                desc: "Drive early career awareness and orient fresh cohorts toward life sciences tracks.",
              },
              {
                year: "Second Year",
                tag: "Domain Track Lead",
                icon: Layers,
                quota: "02",
                desc: "Select complimentary domain training and organize technical department workshops.",
              },
              {
                year: "Third Year",
                tag: "Pre-Placement Lead",
                icon: BarChart3,
                quota: "02",
                desc: "Complete live case studies, mock interviews, and coordinate campus placement talks.",
              },
              {
                year: "Final Year",
                tag: "Executive Guild Lead",
                icon: Award,
                quota: "02",
                desc: "Receive direct partner referrals, interview fast-tracking, and mentor junior leads.",
              },
            ].map((b, idx) => {
              const BatchIcon = b.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-white tone-light card-light border border-[#E4EAF2] shadow-xs hover:border-[#2563EB]/40 hover:shadow-lg transition-all space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-2xl bg-[#EEF6FF] border border-[#BFDBFE]/60 flex items-center justify-center text-[#2563EB]">
                        <BatchIcon className="w-5 h-5 stroke-[1.8]" />
                      </div>
                      <span className="font-mono text-[10px] font-bold text-emerald-700 bg-[#ECFDF5] border border-[#A7F3D0] px-2.5 py-0.5 rounded-full">
                        {b.tag}
                      </span>
                    </div>

                    <strong className="text-base font-bold text-[#081F38] block leading-tight">
                      {b.year}
                    </strong>

                    <div className="flex items-baseline gap-1.5 pt-1">
                      <span className="text-3xl font-black text-[#2563EB]">{b.quota}</span>
                      <span className="text-lg font-bold text-[#081F38]">Students</span>
                    </div>

                    <p className="text-xs sm:text-[13px] text-[#64748B] leading-relaxed">
                      {b.desc}
                    </p>
                  </div>

                  {/* Card Footer Designation */}
                  <div className="pt-3 border-t border-slate-100 flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-[#EEF6FF] flex items-center justify-center text-[#2563EB] shrink-0">
                      <Users className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block font-mono leading-none">Designation</span>
                      <strong className="text-xs font-bold text-[#081F38] block leading-tight mt-0.5">
                        Industry Network Lead
                      </strong>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Center CTA Button */}
          <div className="flex justify-center pt-2">
            <button
              type="button"
              onClick={() => openApplyModal("section_04_quota")}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-sm shadow-md shadow-blue-600/15 transition-all active:scale-[0.98] cursor-pointer"
            >
              <span>Apply Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ── 05. SKILLS & COMPLIMENTARY DOMAIN TRAINING ────────────────────────── */}
      <section className="py-16 sm:py-24 bg-white tone-light card-light border-b border-[#E4EAF2]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-left">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEF6FF]/95 backdrop-blur-xs border border-[#BFDBFE] text-[#1D4ED8] font-mono text-xs font-bold uppercase tracking-wider shadow-2xs">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
              </span>
              <span>05 · DOMAIN TRAINING &amp; SKILLS</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#081F38]">
              Complimentary Training in One Domain.{" "}
              <span className="bg-gradient-to-r from-[#2563EB] via-[#0284C7] to-[#7C3AED] bg-clip-text text-transparent [box-decoration-break:clone]">
                22+ Healthcare &amp; Life Sciences Tracks.
              </span>
            </h2>
            <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
              Every appointed Industry Network Lead receives complimentary corporate sponsorship for one flagship specialization track from Arzon Global's 22+ healthcare and life sciences domains.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Sponsoring Benchmark */}
            <div className="lg:col-span-6 p-7 rounded-3xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <span className="font-mono text-xs font-bold text-[#081F38] uppercase">
                  Flagship Domain Portfolio
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-[#E6F7F1] text-emerald-800 border border-emerald-200">
                  100% COMPLIMENTARY
                </span>
              </div>

              <div className="space-y-4">
                {[
                  { label: "Pharmacovigilance (ICSR Triage, MedDRA & CIOMS)", pct: 100 },
                  { label: "Clinical Data Management (EDC Systems & Discrepancies)", pct: 100 },
                  { label: "Medical Writing (Clinical Study Reports & Protocols)", pct: 100 },
                  { label: "Regulatory Affairs (eCTD Modules & Submissions)", pct: 100 },
                  { label: "Clinical SAS Programming & SDTM/ADaM Datasets", pct: 100 },
                ].map((row, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-medium text-[#081F38]">
                      <span>{row.label}</span>
                      <strong className="font-mono font-bold text-[#2563EB]">100% Sponsored</strong>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[#2563EB]"
                        style={{ width: `${row.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-[11px] font-mono text-[#64748B] leading-relaxed pt-2 border-t border-slate-200/60">
                Note: Includes live case exercises, mentor reviews, and an ISO 9001:2015 verifiable completion certificate with zero tuition fee or hidden charges.
              </p>
            </div>

            {/* Right Column: 4 Skill Categories (2x2 Grid) */}
            <div className="lg:col-span-6 space-y-4">
              <h3 className="font-bold text-base text-[#081F38]">Competencies you build as an appointed lead</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white tone-light card-light border border-[#E4EAF2] shadow-2xs hover:border-[#2563EB]/40 transition-all space-y-2">
                  <div className="w-7 h-7 rounded-lg bg-[#EEF6FF] flex items-center justify-center text-[#2563EB]">
                    <BookOpen className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="font-bold text-sm text-[#081F38]">Domain Specialization</h4>
                  <ul className="text-xs text-[#64748B] space-y-1">
                    <li>• ICSR Case Processing</li>
                    <li>• Regulatory Reporting</li>
                    <li>• Clinical Trial Data</li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-white tone-light card-light border border-[#E4EAF2] shadow-2xs hover:border-[#2563EB]/40 transition-all space-y-2">
                  <div className="w-7 h-7 rounded-lg bg-[#EEF6FF] flex items-center justify-center text-[#2563EB]">
                    <Activity className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="font-bold text-sm text-[#081F38]">Executive Leadership</h4>
                  <ul className="text-xs text-[#64748B] space-y-1">
                    <li>• Campus Stakeholder Liaison</li>
                    <li>• Workshop Coordination</li>
                    <li>• Public Speaking</li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-white tone-light card-light border border-[#E4EAF2] shadow-2xs hover:border-[#2563EB]/40 transition-all space-y-2">
                  <div className="w-7 h-7 rounded-lg bg-[#EEF6FF] flex items-center justify-center text-[#2563EB]">
                    <Laptop className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="font-bold text-sm text-[#081F38]">Digital Career Tools</h4>
                  <ul className="text-xs text-[#64748B] space-y-1">
                    <li>• Safety Database Architecture</li>
                    <li>• ATS Resume Optimization</li>
                    <li>• LinkedIn Brand Authority</li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-white tone-light card-light border border-[#E4EAF2] shadow-2xs hover:border-[#2563EB]/40 transition-all space-y-2">
                  <div className="w-7 h-7 rounded-lg bg-[#EEF6FF] flex items-center justify-center text-[#2563EB]">
                    <Users className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="font-bold text-sm text-[#081F38]">Direct Mentorship</h4>
                  <ul className="text-xs text-[#64748B] space-y-1">
                    <li>• 1-on-1 Director Reviews</li>
                    <li>• Mock Interview Clinics</li>
                    <li>• Recruiter Referrals</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 06. THE 6-MONTH LEADERSHIP TIMELINE ───────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-[#F8FAFC] border-b border-[#E2E8F0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-left">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEF6FF]/95 backdrop-blur-xs border border-[#BFDBFE] text-[#1D4ED8] font-mono text-xs font-bold uppercase tracking-wider shadow-2xs">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
              </span>
              <span>06 · THE 6-MONTH TENURE ROADMAP</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#081F38]">
              From Induction to{" "}
              <span className="bg-gradient-to-r from-[#2563EB] via-[#0284C7] to-[#7C3AED] bg-clip-text text-transparent [box-decoration-break:clone]">
                Verified Corporate Experience.
              </span>
            </h2>
            <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
              The 6-month leadership appointment is organized into three structured phases, ensuring consistent professional growth alongside university coursework.
            </p>
          </div>

          {/* 3 Phased Cards with Arrows */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-7 rounded-3xl bg-white tone-light card-light border border-[#E4EAF2] shadow-2xs hover:border-[#2563EB]/40 hover:shadow-lg transition-all space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="font-mono text-xs font-bold text-[#2563EB]">MONTHS 1–2</span>
                <h3 className="text-lg font-bold text-[#081F38]">Induction, Orientation &amp; Authority</h3>
                <ul className="text-xs text-[#64748B] space-y-2">
                  <li className="flex items-start gap-1.5">• Receive official Appointment Offer Letter</li>
                  <li className="flex items-start gap-1.5">• Physical Welcome Kit &amp; Folio dispatched</li>
                  <li className="flex items-start gap-1.5">• Directorate orientation &amp; leadership briefing</li>
                  <li className="flex items-start gap-1.5">• Establish campus presence &amp; peer network</li>
                </ul>
              </div>
              <div className="p-3 rounded-xl bg-[#F8FAFC] border border-slate-200/60 text-xs font-mono text-[#081F38]">
                Milestone: Official Appointment Formalized
              </div>
            </div>

            <div className="p-7 rounded-3xl bg-white tone-light card-light border border-[#E4EAF2] shadow-2xs hover:border-[#2563EB]/40 hover:shadow-lg transition-all space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="font-mono text-xs font-bold text-[#2563EB]">MONTHS 3–4</span>
                <h3 className="text-lg font-bold text-[#081F38]">Domain Specialization &amp; Campus Drives</h3>
                <ul className="text-xs text-[#64748B] space-y-2">
                  <li className="flex items-start gap-1.5">• Complimentary professional domain training access</li>
                  <li className="flex items-start gap-1.5">• Hands-on regulatory case simulations</li>
                  <li className="flex items-start gap-1.5">• Host approved campus career masterclasses</li>
                  <li className="flex items-start gap-1.5">• Receive performance-based milestone incentives</li>
                </ul>
              </div>
              <div className="p-3 rounded-xl bg-[#F8FAFC] border border-slate-200/60 text-xs font-mono text-[#081F38]">
                Milestone: Domain Certified &amp; Performance Recognized
              </div>
            </div>

            <div className="p-7 rounded-3xl bg-white tone-light card-light border border-[#E4EAF2] shadow-2xs hover:border-[#2563EB]/40 hover:shadow-lg transition-all space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="font-mono text-xs font-bold text-[#2563EB]">MONTHS 5–6</span>
                <h3 className="text-lg font-bold text-[#081F38]">Corporate Credentials &amp; Placement Pipeline</h3>
                <ul className="text-xs text-[#64748B] space-y-2">
                  <li className="flex items-start gap-1.5">• Receive 6-Month Corporate Experience Certificate</li>
                  <li className="flex items-start gap-1.5">• Receive Director Letter of Recommendation (LOR)</li>
                  <li className="flex items-start gap-1.5">• Priority referral submissions to 50+ partner CROs</li>
                  <li className="flex items-start gap-1.5">• National Excellence Awards competition</li>
                </ul>
              </div>
              <div className="p-3 rounded-xl bg-[#F8FAFC] border border-slate-200/60 text-xs font-mono text-[#081F38]">
                Milestone: Verified Experience Letter &amp; LOR Issued
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 07. CREDENTIALS DOSSIER (HOMEPAGE COLOR SYSTEM) ───────────────── */}
      <section id="credentials-dossier" className="py-16 sm:py-24 bg-white tone-light card-light border-b border-[#E4EAF2] relative overflow-hidden">
        {/* Ambient Radial Accent */}
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(37,99,235,0.06),rgba(255,255,255,0))] pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-left z-10">
          {/* Section Header with Right Executive Portfolio Image */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEF6FF]/95 backdrop-blur-xs border border-[#BFDBFE] text-[#1D4ED8] font-mono text-xs font-bold uppercase tracking-wider shadow-2xs">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
                </span>
                <span>OFFICIAL CREDENTIALS DOSSIER</span>
              </div>

              <h2 className="text-3xl sm:text-5xl lg:text-[46px] font-extrabold tracking-tight text-[#081F38] leading-[1.12]">
                Signed, Sealed, and Verified.{" "}
                <span className="block font-serif italic font-medium tracking-normal mt-1">
                  Tangible{" "}
                  <span className="bg-gradient-to-r from-[#2563EB] via-[#0284C7] to-[#7C3AED] bg-clip-text text-transparent [box-decoration-break:clone]">
                    Proof of Leadership.
                  </span>
                </span>
              </h2>

              <p className="text-base sm:text-lg text-[#475569] leading-relaxed max-w-xl font-normal">
                Every appointed Industry Network Lead builds a verified career portfolio that eliminates the fresher-with-zero-experience dilemma before graduation.
              </p>
            </div>

            {/* Right Leather Binder & Pen Visual */}
            <div className="hidden lg:block lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#E4EAF2] max-w-[420px] ml-auto">
                <img
                  src="/images/industry-network/executive-portfolio-binder.webp"
                  alt="Arzon Global Executive Leather Portfolio and Fountain Pen"
                  className="w-full h-56 lg:h-64 object-cover object-center"
                />
              </div>
            </div>
          </div>

          {/* 4 Rounded Pill Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {CREDENTIAL_SAMPLES.map((sample, idx) => {
              const isActive = activeCredentialTab === idx;
              const TabIcon = sample.icon;
              return (
                <button
                  key={sample.id}
                  type="button"
                  onClick={() => {
                    setActiveCredentialTab(idx);
                    trackEvent("credential_sample_tab_click", { tab: sample.id });
                  }}
                  className={`flex items-center gap-2.5 px-4 py-3 rounded-full text-xs sm:text-[13px] font-bold font-sans transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#2563EB] text-white shadow-md shadow-blue-600/15"
                      : "bg-white tone-light card-light text-[#081F38] hover:bg-slate-50 border border-[#E4EAF2] shadow-2xs"
                  }`}
                >
                  <TabIcon className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-[#2563EB]"}`} />
                  <span className="truncate">{sample.tabLabel}</span>
                </button>
              );
            })}
          </div>

          {/* The Main Interactive Dossier Card Container */}
          <div className="p-6 sm:p-8 lg:p-10 rounded-3xl lg:rounded-[36px] bg-[#F8FAFC] border border-[#E2E8F0] shadow-sm relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
              {/* Column 1: Simulated 3D Document Preview */}
              <div className="lg:col-span-4 flex items-center justify-center relative">
                <div className="relative w-full max-w-[260px] h-[340px]">
                  {/* Tilted Dark Navy Leather Folio Underneath */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[#081F38] rounded-2xl transform -rotate-3 translate-x-1 translate-y-2 shadow-lg"
                  />

                  {/* Crisp White Letterhead Sheet On Top */}
                  <div className="relative z-10 w-full h-full bg-white tone-light card-light rounded-2xl border border-[#E4EAF2] shadow-xl p-5 flex flex-col justify-between">
                    <div>
                      {/* Document Header Logo */}
                      <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
                        <div className="w-5 h-5 rounded-full bg-[#081F38] flex items-center justify-center text-white text-[9px] font-bold">
                          A
                        </div>
                        <span className="text-[10px] font-extrabold tracking-wider text-[#081F38]">
                          ARZON GLOBAL®
                        </span>
                      </div>

                      {/* Document Title */}
                      <h4 className="text-[12px] font-extrabold text-[#081F38] mt-3 leading-snug">
                        {currentCredential.tabLabel}
                      </h4>

                      {/* Simulated Clauses Skeleton Lines */}
                      <div className="mt-4 space-y-2">
                        <div className="h-1.5 bg-slate-200 rounded w-full" />
                        <div className="h-1.5 bg-slate-200 rounded w-5/6" />
                        <div className="h-1.5 bg-slate-200 rounded w-4/6" />
                        <div className="h-1.5 bg-slate-200 rounded w-full mt-3" />
                        <div className="h-1.5 bg-slate-200 rounded w-5/6" />
                        <div className="h-1.5 bg-slate-200 rounded w-3/4" />
                      </div>
                    </div>

                    {/* Document Footer: Signature & Official Seal */}
                    <div className="flex items-end justify-between pt-3 border-t border-slate-100 mt-auto">
                      {/* Cursive Signature Graphic */}
                      <div className="space-y-0.5">
                        <svg className="w-16 h-5 text-[#2563EB]" viewBox="0 0 100 30" fill="none" stroke="currentColor">
                          <path
                            d="M5 22 C 15 5, 25 25, 35 12 C 45 2, 50 20, 65 14 C 75 10, 85 22, 95 18"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M15 25 C 30 26, 60 25, 80 24"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                          />
                        </svg>
                        <span className="text-[8px] font-mono text-slate-400 block">Authorized Signatory</span>
                      </div>

                      {/* Official Corporate Stamp Seal */}
                      <div className="w-11 h-11 rounded-full border-2 border-[#2563EB] flex flex-col items-center justify-center text-[#2563EB] p-0.5 text-center shadow-xs">
                        <span className="text-[5.5px] font-black tracking-tighter uppercase leading-none">ARZON GLOBAL</span>
                        <div className="w-4 h-4 rounded-full border border-[#2563EB]/60 flex items-center justify-center my-0.5">
                          <span className="text-[7px] font-black">A</span>
                        </div>
                        <span className="text-[5px] font-bold tracking-tighter uppercase leading-none">VERIFIED</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Column 2: Credential Record & Key Details */}
              <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
                <div>
                  <span className="text-xs font-mono font-bold text-[#2563EB] uppercase tracking-wider block mb-1">
                    CREDENTIAL RECORD
                  </span>
                  <div className="flex flex-wrap items-center gap-2 justify-between pb-4 border-b border-slate-200/70">
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#081F38]">
                      {currentCredential.tabLabel}
                    </h3>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-emerald-700 font-mono text-xs font-bold whitespace-nowrap">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      VERIFIED CREDENTIAL
                    </span>
                  </div>

                  {/* Detail Parameters List */}
                  <div className="space-y-4 pt-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#EEF6FF] flex items-center justify-center text-[#2563EB] shrink-0 mt-0.5">
                        <User className="w-4 h-4" />
                      </div>
                      <div className="flex-1 grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 items-baseline">
                        <span className="sm:col-span-5 text-xs font-bold text-[#081F38]">Signatory Authority</span>
                        <span className="sm:col-span-7 text-xs text-[#475569] leading-relaxed font-medium">
                          {currentCredential.signatory}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#EEF6FF] flex items-center justify-center text-[#2563EB] shrink-0 mt-0.5">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div className="flex-1 grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 items-baseline">
                        <span className="sm:col-span-5 text-xs font-bold text-[#081F38]">Jurisdiction / Scope</span>
                        <span className="sm:col-span-7 text-xs text-[#475569] leading-relaxed font-medium">
                          {currentCredential.scope}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#EEF6FF] flex items-center justify-center text-[#2563EB] shrink-0 mt-0.5">
                        <UserCheck className="w-4 h-4" />
                      </div>
                      <div className="flex-1 grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 items-baseline">
                        <span className="sm:col-span-5 text-xs font-bold text-[#081F38]">Recipient</span>
                        <span className="sm:col-span-7 text-xs text-[#475569] leading-relaxed font-medium">
                          {currentCredential.recipient}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#EEF6FF] flex items-center justify-center text-[#2563EB] shrink-0 mt-0.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      </div>
                      <div className="flex-1 grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 items-center">
                        <span className="sm:col-span-5 text-xs font-bold text-[#081F38]">Legal Standing</span>
                        <div className="sm:col-span-7">
                          <span className="inline-block px-3 py-1 rounded-md bg-[#EEF6FF] border border-[#BFDBFE] text-[#1D4ED8] font-semibold text-xs">
                            {currentCredential.verdict}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Column 3: "What this credential proves to recruiters" Box */}
              <div className="lg:col-span-4 p-6 sm:p-7 rounded-2xl bg-white tone-light card-light border border-[#E4EAF2] shadow-sm space-y-5 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#EEF6FF] flex items-center justify-center text-[#2563EB] shrink-0">
                      <Target className="w-4 h-4" />
                    </div>
                    <h4 className="font-bold text-sm sm:text-base text-[#081F38] leading-tight">
                      What this credential proves to recruiters
                    </h4>
                  </div>

                  <ul className="space-y-3 text-xs sm:text-[13px] text-[#081F38]">
                    {currentCredential.recruiterValue.map((val, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <div className="w-4 h-4 rounded-full bg-[#ECFDF5] flex items-center justify-center text-[#10B981] shrink-0 mt-0.5">
                          <Check className="w-3 h-3 stroke-[2.5]" />
                        </div>
                        <span className="text-[#334155] leading-snug font-medium">{val}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => openApplyModal("section_07_dossier")}
                    className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-600/15 transition-all active:scale-[0.98] cursor-pointer"
                  >
                    <span>Apply Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom 4-Pillar Feature Strip */}
          <div className="mt-12 pt-8 border-t border-[#E4EAF2] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[#E4EAF2]">
            {/* Item 1 */}
            <div className="flex items-center gap-3.5 pl-0 sm:pl-2">
              <div className="w-12 h-12 rounded-2xl bg-[#EEF6FF] border border-[#BFDBFE]/60 flex items-center justify-center text-[#2563EB] shrink-0 shadow-2xs">
                <Calendar className="w-6 h-6 stroke-[1.8]" />
              </div>
              <div>
                <strong className="text-sm font-bold text-[#081F38] block leading-tight">
                  6-Month Tenure
                </strong>
                <span className="text-xs text-[#64748B] block mt-0.5 font-medium">
                  Real Industry Exposure
                </span>
              </div>
            </div>

            {/* Item 2 */}
            <div className="flex items-center gap-3.5 pt-4 sm:pt-0 sm:pl-6">
              <div className="w-12 h-12 rounded-2xl bg-[#EEF6FF] border border-[#BFDBFE]/60 flex items-center justify-center text-[#2563EB] shrink-0 shadow-2xs">
                <Award className="w-6 h-6 stroke-[1.8]" />
              </div>
              <div>
                <strong className="text-sm font-bold text-[#081F38] block leading-tight">
                  Verified Credentials
                </strong>
                <span className="text-xs text-[#64748B] block mt-0.5 font-medium">
                  Build a Stronger Profile
                </span>
              </div>
            </div>

            {/* Item 3 */}
            <div className="flex items-center gap-3.5 pt-4 sm:pt-0 sm:pl-6">
              <div className="w-12 h-12 rounded-2xl bg-[#EEF6FF] border border-[#BFDBFE]/60 flex items-center justify-center text-[#2563EB] shrink-0 shadow-2xs">
                <Users className="w-6 h-6 stroke-[1.8]" />
              </div>
              <div>
                <strong className="text-sm font-bold text-[#081F38] block leading-tight">
                  Industry Recognition
                </strong>
                <span className="text-xs text-[#64748B] block mt-0.5 font-medium">
                  Stand Out to Recruiters
                </span>
              </div>
            </div>

            {/* Item 4 */}
            <div className="flex items-center gap-3.5 pt-4 sm:pt-0 sm:pl-6">
              <div className="w-12 h-12 rounded-2xl bg-[#EEF6FF] border border-[#BFDBFE]/60 flex items-center justify-center text-[#2563EB] shrink-0 shadow-2xs">
                <BarChart3 className="w-6 h-6 stroke-[1.8]" />
              </div>
              <div>
                <strong className="text-sm font-bold text-[#081F38] block leading-tight">
                  Career Advantage
                </strong>
                <span className="text-xs text-[#64748B] block mt-0.5 font-medium">
                  Beyond the Classroom
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 08. THE 10 PROGRAMME PRIVILEGES (HOMEPAGE COLOR SYSTEM) ─────────── */}
      <section className="py-16 sm:py-24 bg-[#F8FAFC] border-b border-[#E2E8F0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-left">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEF6FF]/95 backdrop-blur-xs border border-[#BFDBFE] text-[#1D4ED8] font-mono text-xs font-bold uppercase tracking-wider shadow-2xs">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
              </span>
              <span>08 · PROGRAMME PRIVILEGES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#081F38] leading-[1.12]">
              More than a College Title.{" "}
              <span className="bg-gradient-to-r from-[#2563EB] via-[#0284C7] to-[#7C3AED] bg-clip-text text-transparent [box-decoration-break:clone]">
                Ten Tangible Career Advantages.
              </span>
            </h2>
            <p className="text-base sm:text-lg text-[#475569] leading-relaxed font-normal">
              Every appointed Industry Network Lead unlocks an integrated suite of institutional privileges, training grants, and verified credentials.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              {
                id: "01",
                icon: GraduationCap,
                title: "Professional Training",
                desc: "Complimentary training in one selected domain from Arzon Global's portfolio of 22+ healthcare and life-sciences domains.",
                badge: "COMPLIMENTARY",
              },
              {
                id: "02",
                icon: Award,
                title: "ISO Certification",
                desc: "Receive formal certification subject to programme completion and assessment standards.",
                badge: "VERIFIED CREDENTIAL",
              },
              {
                id: "03",
                icon: Building2,
                title: "Industry Exposure",
                desc: "Interact with senior industry professionals, corporate recruiters, and institutional heads.",
                badge: "CORPORATE ACCESS",
              },
              {
                id: "04",
                icon: Users,
                title: "1-on-1 Mentorship",
                desc: "Access experienced directors for career discussions, interview prep, and CV auditing.",
                badge: "DIRECTOR LEVEL",
              },
              {
                id: "05",
                icon: Briefcase,
                title: "Career Opportunities",
                desc: "Priority access to relevant entry-level job openings shared by Arzon hiring partners.",
                badge: "FAST-TRACK PIPELINE",
              },
              {
                id: "06",
                icon: FileText,
                title: "Official Appointment Letter",
                desc: "Receive an official legal Appointment Letter designating campus executive leadership.",
                badge: "DAY 1 INDUCTION",
              },
              {
                id: "07",
                icon: Calendar,
                title: "Experience Certificate",
                desc: "Receive an Experience Letter & Certificate after six months of active campus service.",
                badge: "6-MONTH TENURE",
              },
              {
                id: "08",
                icon: TrendingUp,
                title: "Performance-Based Incentives",
                desc: "Opportunities to receive financial incentives based on contribution, active campus engagement, and performance.",
                badge: "MERIT INCENTIVES",
              },
              {
                id: "09",
                icon: Trophy,
                title: "National Excellence Awards",
                desc: "Compete for Best Campus Leadership, Best Institutional Engagement, and Best Initiative.",
                badge: "ANNUAL TROPHIES",
              },
              {
                id: "10",
                icon: Sparkles,
                title: "Annual Industry Event",
                desc: "Participate in the flagship annual life-sciences leadership symposium with top recruiters.",
                badge: "DELEGATE PASS",
              },
            ].map((p, idx) => {
              const IconComp = p.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-white tone-light card-light border border-[#E2E8F0] shadow-2xs hover:border-[#2563EB]/40 hover:shadow-lg transition-all flex flex-col justify-between space-y-4 text-left"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="w-11 h-11 rounded-2xl bg-[#EEF6FF] border border-[#BFDBFE]/60 flex items-center justify-center text-[#2563EB] shrink-0 shadow-2xs">
                        <IconComp className="w-5 h-5 stroke-[1.8]" />
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="font-mono text-sm font-bold text-[#2563EB]">{p.id}</span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#EEF6FF] border border-[#BFDBFE]/60 text-[9px] font-mono font-bold text-[#1D4ED8] uppercase tracking-wider">
                          {p.badge}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="font-bold text-base text-[#081F38] leading-snug">{p.title}</h3>
                      <p className="text-xs text-[#64748B] leading-relaxed font-normal">{p.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 09. ACADEMIC ELIGIBILITY & DISCIPLINE INTELLIGENCE ─────────────────── */}
      <section className="py-16 sm:py-24 bg-white tone-light card-light border-b border-[#E4EAF2]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-left">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEF6FF]/95 backdrop-blur-xs border border-[#BFDBFE] text-[#1D4ED8] font-mono text-xs font-bold uppercase tracking-wider shadow-2xs">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
              </span>
              <span>09 · ACADEMIC ELIGIBILITY</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#081F38]">
              Open to Students Across{" "}
              <span className="bg-gradient-to-r from-[#2563EB] via-[#0284C7] to-[#7C3AED] bg-clip-text text-transparent [box-decoration-break:clone]">
                Healthcare Disciplines.
              </span>
            </h2>
            <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
              Select your academic background to inspect how your curriculum aligns with global biopharma domain tracks.
            </p>
          </div>

          {/* Interactive Bento Card */}
          <div className="p-7 sm:p-10 rounded-3xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-7">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#2563EB]">
                SELECT YOUR DEGREE PROGRAMME
              </span>
              <span className="text-xs font-mono text-slate-400">
                Selected: <strong className="text-slate-800">{selectedDiscipline}</strong>
              </span>
            </div>

            {/* Discipline Pills */}
            <div className="flex flex-wrap gap-2.5">
              {Object.keys(DISCIPLINE_DATA).map((disc) => (
                <button
                  key={disc}
                  type="button"
                  onClick={() => setSelectedDiscipline(disc)}
                  className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                    selectedDiscipline === disc
                      ? "bg-[#2563EB] text-white shadow-xs"
                      : "bg-white border border-[#E4EAF2] text-slate-700 hover:bg-slate-50 tone-light"
                  }`}
                >
                  {disc}
                </button>
              ))}
            </div>

            {/* Dynamic Card */}
            <div className="p-7 rounded-2xl bg-white tone-light card-light border border-[#E4EAF2] space-y-5">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-bold text-[#081F38]">
                    {selectedDiscipline} · Strategic Role Advantage
                  </h4>
                  <span className="font-mono text-[10px] font-bold text-[#1D4ED8] bg-[#EEF6FF] px-2.5 py-0.5 rounded-full border border-[#BFDBFE]">
                    High Placement Alignment
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                  {DISCIPLINE_DATA[selectedDiscipline].roleAdvantage}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                <div className="p-5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2.5">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Recommended Complimentary Training Tracks (Free)
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {DISCIPLINE_DATA[selectedDiscipline].tracks.map((track, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-lg bg-[#EEF6FF] border border-[#BFDBFE] text-xs font-medium text-[#1D4ED8]"
                      >
                        {track}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2.5">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    High-Demand Partner Hiring Roles
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {DISCIPLINE_DATA[selectedDiscipline].popularRoles.map((role, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-800"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 10. DIRECTORATE FOREWORD & 4-STEP SELECTION PROCESS ────────────────── */}
      <section className="py-16 sm:py-24 bg-[#F8FAFC] border-b border-[#E2E8F0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-left">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEF6FF]/95 backdrop-blur-xs border border-[#BFDBFE] text-[#1D4ED8] font-mono text-xs font-bold uppercase tracking-wider shadow-2xs">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
              </span>
              <span>10 · SELECTION PROCESS</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#081F38]">
              Four Steps to Your{" "}
              <span className="bg-gradient-to-r from-[#2563EB] via-[#0284C7] to-[#7C3AED] bg-clip-text text-transparent [box-decoration-break:clone]">
                Official Appointment.
              </span>
            </h2>
            <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
              A transparent, merit-based selection timeline ensuring equal opportunity across all participating colleges.
            </p>
          </div>

          {/* 4 Steps Horizontal Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-6 rounded-2xl bg-white tone-light card-light border border-[#E2E8F0] space-y-2">
              <span className="font-mono text-xs font-bold text-[#2563EB]">STEP 01</span>
              <h3 className="font-bold text-base text-[#081F38]">Submit Application</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Complete the brief online form with your personal, academic, and campus details (takes 3 mins).
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white tone-light card-light border border-[#E2E8F0] space-y-2">
              <span className="font-mono text-xs font-bold text-[#2563EB]">STEP 02</span>
              <h3 className="font-bold text-base text-[#081F38]">Profile Review</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Our campus directorate screens communication skills, campus leadership, and year quota fit (48 hours).
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white tone-light card-light border border-[#E2E8F0] space-y-2">
              <span className="font-mono text-xs font-bold text-[#2563EB]">STEP 03</span>
              <h3 className="font-bold text-base text-[#081F38]">Personal Interaction</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Shortlisted applicants complete a brief 10-minute virtual interaction with the campus operations director.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white tone-light card-light border border-[#E2E8F0] space-y-2">
              <span className="font-mono text-xs font-bold text-[#2563EB]">STEP 04</span>
              <h3 className="font-bold text-base text-[#081F38]">Appointment Letter</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Final selections receive their official legal Appointment Letter and physical Executive Welcome Kit.
              </p>
            </div>
          </div>

          {/* Decisive CTA Conversion Banner matching homepage closing card */}
          <div className="p-8 sm:p-12 rounded-3xl bg-[#081F38] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 max-w-xl">
              <h3 className="text-2xl font-bold text-white">
                Ready to represent your university as an{" "}
                <span className="bg-gradient-to-r from-[#60A5FA] via-[#38BDF8] to-[#A78BFA] bg-clip-text text-transparent [box-decoration-break:clone]">
                  Industry Network Lead?
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Official Appointment Offer Letter, 6-Month Experience Certificate, and Executive Director LOR included.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => openApplyModal("directorate_banner")}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-sm shadow-md shadow-blue-600/15 transition-all active:scale-[0.98] cursor-pointer"
              >
                <span>Apply Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => openCounsellor("counselling_banner")}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>Talk to Experts</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 11. FREQUENTLY ASKED QUESTIONS ────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-white tone-light card-light border-b border-[#E4EAF2]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-left">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEF6FF]/95 backdrop-blur-xs border border-[#BFDBFE] text-[#1D4ED8] font-mono text-xs font-bold uppercase tracking-wider shadow-2xs">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
              </span>
              <span>11 · FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#081F38]">
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-[#2563EB] via-[#0284C7] to-[#7C3AED] bg-clip-text text-transparent [box-decoration-break:clone]">
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
                  className="rounded-2xl border border-[#E4EAF2] bg-white tone-light card-light overflow-hidden shadow-2xs transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="font-bold text-xs sm:text-sm text-[#081F38]">
                      {faq.q}
                    </span>
                    <div className="w-6 h-6 rounded-full bg-[#EEF6FF] border border-[#BFDBFE]/60 flex items-center justify-center text-[#2563EB] shrink-0">
                      {isOpen ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-[#64748B] leading-relaxed border-t border-slate-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 12. INSTITUTIONAL & REGULATORY TRANSPARENCY NOTICE ─────────────────── */}
      <section className="py-10 bg-[#F8FAFC] border-b border-[#E2E8F0] text-xs text-[#64748B]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2 text-left">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#10B981]" />
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#081F38]">
              Institutional &amp; Regulatory Transparency Notice
            </span>
          </div>
          <p className="leading-relaxed">
            The Arzon Global Industry Network Lead appointment is a student leadership and career readiness role. Selection is merit-based with strictly eight positions per participating university. Experience letters, Letters of Recommendation, and domain certifications are issued subject to satisfactory performance and tenure completion requirements. Performance-based incentives are governed by verified institutional milestones and program guidelines.
          </p>
        </div>
      </section>

      {/* ── MOBILE STICKY ACTION DOCK ────────────────────────────────────────── */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 tone-light card-light backdrop-blur-md border-t border-[#E4EAF2] p-3 shadow-lg">
        <div className="flex items-center justify-between gap-3">
          <div className="text-left">
            <span className="text-[11px] font-bold text-[#081F38] block leading-tight">
              Campus Executive Role
            </span>
            <span className="text-[10px] font-mono font-bold text-emerald-800">
              8 Leads Per College Quota
            </span>
          </div>

          <button
            type="button"
            onClick={() => openApplyModal("mobile_dock")}
            className="px-5 py-2.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs shadow-sm transition-all active:scale-[0.98] cursor-pointer shrink-0"
          >
            Apply Now
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
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {formSubmitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#E6F7F1] border border-[#10B981]/30 flex items-center justify-center text-[#10B981] mx-auto">
                  <Check className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-[#081F38]">Guidance Request Received</h3>
                  <p className="text-xs sm:text-sm text-[#64748B]">
                    Thank you, {counsellorForm.name}. An Arzon campus advisor will connect with you via WhatsApp/phone to discuss your eligibility, quota, and selection process.
                  </p>
                </div>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setIsCounsellorModalOpen(false)}
                    className="px-6 py-2.5 rounded-full bg-[#2563EB] text-white font-bold text-xs hover:bg-[#1D4ED8] transition-colors cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleCounsellorSubmit} className="space-y-5">
                <div className="space-y-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF6FF] border border-[#BFDBFE] text-[#2563EB] font-mono text-[10px] font-bold uppercase tracking-wider">
                    ARZON INDUSTRY ADVISORY · TALK TO EXPERTS
                  </span>
                  <h3 className="text-2xl font-bold text-[#081F38]">Talk to Experts</h3>
                  <p className="text-xs text-[#64748B]">
                    Connect directly with senior biopharma advisors regarding role expectations, college quota, and your career roadmap.
                  </p>
                </div>

                <div className="space-y-3.5">
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono font-bold text-[#081F38] uppercase block">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Bathula"
                      value={counsellorForm.name}
                      onChange={(e) => setCounsellorForm({ ...counsellorForm, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white tone-light card-light text-xs sm:text-sm text-[#081F38] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono font-bold text-[#081F38] uppercase block">
                      WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 98765 43210"
                      value={counsellorForm.phone}
                      onChange={(e) => setCounsellorForm({ ...counsellorForm, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white tone-light card-light text-xs sm:text-sm text-[#081F38] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono font-bold text-[#081F38] uppercase block">
                        Degree Background *
                      </label>
                      <select
                        value={counsellorForm.degree}
                        onChange={(e) => setCounsellorForm({ ...counsellorForm, degree: e.target.value })}
                        className="w-full px-3 py-3 rounded-xl border border-slate-200 bg-white tone-light card-light text-xs text-[#081F38] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB]"
                      >
                        {DEGREES.map((deg, dIdx) => (
                          <option key={dIdx} value={deg}>{deg}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-mono font-bold text-[#081F38] uppercase block">
                        Academic Year *
                      </label>
                      <select
                        value={counsellorForm.year}
                        onChange={(e) => setCounsellorForm({ ...counsellorForm, year: e.target.value })}
                        className="w-full px-3 py-3 rounded-xl border border-slate-200 bg-white tone-light card-light text-xs text-[#081F38] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB]"
                      >
                        {PASSING_YEARS.map((yr, yIdx) => (
                          <option key={yIdx} value={yr}>{yr}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono font-bold text-[#64748B] uppercase block">
                      College Name / Question
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Bombay College of Pharmacy · When do selections close?"
                      value={counsellorForm.question}
                      onChange={(e) => setCounsellorForm({ ...counsellorForm, question: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white tone-light card-light text-xs sm:text-sm text-[#081F38] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB]"
                    />
                  </div>
                </div>

                <div className="pt-2 space-y-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer shadow-sm"
                  >
                    {isSubmitting ? "Submitting Request..." : "Request Free Campus Call →"}
                  </button>

                  <p className="text-[10px] text-center text-[#64748B]">
                    Zero spam. We only contact you to discuss your college quota and selection.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ── FRICTIONLESS QUICK APPLY MODAL (4 FIELDS ONLY) ────────────────────── */}
      {isApplyModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsApplyModalOpen(false);
          }}
        >
          <div className="relative w-full max-w-lg rounded-3xl bg-white tone-light card-light p-6 sm:p-8 shadow-2xl border border-slate-200/80 space-y-6 my-auto text-left">
            <button
              type="button"
              onClick={() => {
                setIsApplyModalOpen(false);
                setApplySuccessRecord(null);
              }}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {applySuccessRecord ? (
              <div className="text-center py-4 space-y-5 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-3xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto text-emerald-600 shadow-sm">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full inline-block">
                    ● Application Submitted · Under Review
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#081F38] pt-1">
                    Welcome Aboard, {applySuccessRecord.fullName.split(" ")[0]}!
                  </h3>
                  <p className="text-xs sm:text-sm text-[#475569] max-w-sm mx-auto leading-relaxed">
                    Your application for <strong className="text-[#081F38]">{applySuccessRecord.collegeName}</strong> has been logged directly into the Arzon Global Directorate.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E4EAF2] text-xs font-mono text-[#081F38] space-y-1 text-center">
                  <p className="text-slate-400 uppercase text-[10px] font-bold tracking-wider">
                    Official Application Reference
                  </p>
                  <p className="text-base sm:text-lg font-bold text-[#2563EB]">
                    {applySuccessRecord.applicationNumber}
                  </p>
                  <p className="text-slate-500 text-[11px]">
                    Registered Mobile: +91 {applySuccessRecord.mobileNumber}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <a
                    href={waMsg(
                      `Hi Arzon Campus Directorate! I just submitted my Industry Network Lead application (${applySuccessRecord.applicationNumber}) for ${applySuccessRecord.collegeName}. My name is ${applySuccessRecord.fullName}.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#10B981] hover:bg-[#059669] text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-[0.98] cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Chat on WhatsApp</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setIsApplyModalOpen(false);
                      setApplySuccessRecord(null);
                      setApplyForm({ fullName: "", mobileNumber: "", email: "", collegeName: "" });
                    }}
                    className="px-6 py-3.5 rounded-full border border-slate-200 hover:bg-slate-50 text-[#081F38] font-bold text-xs sm:text-sm transition-all cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="space-y-4" noValidate>
                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EEF6FF] border border-[#BFDBFE] text-[#1D4ED8] font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">
                    <span className="relative flex h-2 w-2 shrink-0">
                      <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
                    </span>
                    <span>APPOINTMENT COHORT 2026 · QUICK APPLY</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#081F38] tracking-tight">
                    Apply Now
                  </h2>
                  <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                    Represent your college as an Industry Network Lead. Receive official Appointment Letter, Experience Certificate &amp; Director LOR.
                  </p>
                </div>

                {/* 4 Fields Only */}
                <div className="space-y-3.5 pt-1">
                  {/* Field 1: Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-[#081F38] mb-1">
                      Full Legal Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={applyForm.fullName}
                      onChange={(e) =>
                        setApplyForm({ ...applyForm, fullName: e.target.value })
                      }
                      placeholder="e.g. Rahul Sharma"
                      className="w-full h-11 px-3.5 rounded-xl border border-[#CBD5E1] bg-white tone-light text-sm text-[#081F38] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all"
                    />
                    {applyErrors.fullName && (
                      <p className="text-[11px] text-rose-500 font-medium mt-1">
                        {applyErrors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Field 2: Mobile Number (WhatsApp) */}
                  <div>
                    <label className="block text-xs font-bold text-[#081F38] mb-1">
                      Mobile Number (WhatsApp) <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-3.5 text-xs font-mono font-bold text-slate-500 select-none">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        value={applyForm.mobileNumber}
                        onChange={(e) =>
                          setApplyForm({
                            ...applyForm,
                            mobileNumber: e.target.value.replace(/\D/g, ""),
                          })
                        }
                        placeholder="98765 43210"
                        className="w-full h-11 pl-12 pr-3.5 rounded-xl border border-[#CBD5E1] bg-white tone-light text-sm font-mono text-[#081F38] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all"
                      />
                    </div>
                    {applyErrors.mobileNumber && (
                      <p className="text-[11px] text-rose-500 font-medium mt-1">
                        {applyErrors.mobileNumber}
                      </p>
                    )}
                  </div>

                  {/* Field 3: Email Address */}
                  <div>
                    <label className="block text-xs font-bold text-[#081F38] mb-1">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={applyForm.email}
                      onChange={(e) =>
                        setApplyForm({ ...applyForm, email: e.target.value })
                      }
                      placeholder="e.g. rahul@example.com"
                      className="w-full h-11 px-3.5 rounded-xl border border-[#CBD5E1] bg-white tone-light text-sm text-[#081F38] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all"
                    />
                    {applyErrors.email && (
                      <p className="text-[11px] text-rose-500 font-medium mt-1">
                        {applyErrors.email}
                      </p>
                    )}
                  </div>

                  {/* Field 4: College Name */}
                  <div>
                    <label className="block text-xs font-bold text-[#081F38] mb-1">
                      College / University Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={applyForm.collegeName}
                      onChange={(e) =>
                        setApplyForm({ ...applyForm, collegeName: e.target.value })
                      }
                      placeholder="e.g. Manipal College of Pharmaceutical Sciences"
                      className="w-full h-11 px-3.5 rounded-xl border border-[#CBD5E1] bg-white tone-light text-sm text-[#081F38] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all"
                    />
                    {applyErrors.collegeName && (
                      <p className="text-[11px] text-rose-500 font-medium mt-1">
                        {applyErrors.collegeName}
                      </p>
                    )}
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-2 space-y-2.5">
                  <button
                    type="submit"
                    disabled={isSubmittingApply}
                    className="w-full h-12 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] disabled:opacity-70 text-white font-bold text-sm shadow-md shadow-blue-600/15 flex items-center justify-center gap-2 transition-all active:scale-[0.99] cursor-pointer"
                  >
                    {isSubmittingApply ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full motion-safe:animate-spin" />
                        <span>Submitting Application…</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Application</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-center text-slate-400 font-sans">
                    🔒 100% Free · No registration fees · Official Appointment consideration
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default IndustryNetworkLeadPage;