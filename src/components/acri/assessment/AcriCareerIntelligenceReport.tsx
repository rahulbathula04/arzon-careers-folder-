import { useState, useMemo, useRef, useCallback, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import {
  Award,
  CheckCircle2,
  TrendingUp,
  Share2,
  Copy,
  Download,
  RotateCcw,
  ExternalLink,
  Linkedin,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  Sparkles,
  Trophy,
  Activity,
  Check,
  QrCode,
  FileCheck2,
  Clock,
  GraduationCap,
  Layers,
  ArrowUpRight,
  SlidersHorizontal,
} from "lucide-react";
import { toast } from "sonner";
import type { AcriDecisionResult } from "@/data/acri/acriPvStandard";
import { ACRI_PV_COMPETENCIES } from "@/data/acri/acriPvStandard";
import { getAcriReadinessState } from "@/lib/acri/acriReadiness";
import { ArzonLogo } from "../ArzonLogo";
import { AcriRadarChart, RadarDataPoint } from "./AcriRadarChart";
import {
  AcriCompetencyDetailModal,
  CompetencyDetailData,
} from "./AcriCompetencyDetailModal";
import { AcriOfficialCertificate } from "./AcriOfficialCertificate";

// ─── TYPES & INTERFACES ────────────────────────────────────────────────────────

interface AcriCareerIntelligenceReportProps {
  result: AcriDecisionResult;
  onRetake: () => void;
  onViewCertificate?: () => void;
  onViewReport?: () => void;
  mode?: "certified" | "practice";
  candidateName?: string;
  candidateCollege?: string;
  candidateQualification?: string;
  credentialId?: string;
  assessmentDate?: string;
}

// ─── COMPETENCY METADATA REPOSITORY ───────────────────────────────────────────

const COMPETENCY_METADATA: Record<
  string,
  {
    name: string;
    category: string;
    assessed: string[];
    recommendedFocus: string[];
  }
> = {
  caseAssessment: {
    name: "Case Assessment",
    category: "Technical Foundation",
    assessed: [
      "Seriousness criteria determination (death, hospitalization, disability)",
      "SmPC & Reference Safety Information (RSI) expectedness matching",
      "Event triage and primary source documentation verification",
      "Dechallenge & rechallenge timeline assessment",
    ],
    recommendedFocus: [
      "01 SmPC Section 4.8 adverse effect cross-referencing",
      "02 Serious vs non-serious criteria standard operating procedures",
      "03 Regulatory definitions under ICH E2A guideline",
      "04 Clinical case evaluation drills",
    ],
  },
  documentation: {
    name: "Documentation & Narratives",
    category: "Technical Foundation",
    assessed: [
      "Objective chronological timeline structuring",
      "CIOMS I & MedWatch 3500A narrative formatting",
      "Concomitant and suspect medication notation",
      "Absence of speculative clinical judgment",
    ],
    recommendedFocus: [
      "01 Narrative drafting conventions and chronology anchors",
      "02 Patient background and concomitant drug listing",
      "03 Adverse event progression and outcome documentation",
      "04 Audit-ready medical narrative writing",
    ],
  },
  analyticalReasoning: {
    name: "Analytical Reasoning",
    category: "Analysis",
    assessed: [
      "WHO-UMC causality algorithm application",
      "Confounding medical conditions and risk factor identification",
      "Temporal plausibility of adverse reactions",
      "Multi-drug attribution logic",
    ],
    recommendedFocus: [
      "01 WHO-UMC causality assessment categories",
      "02 Naranjo algorithm scoring methodology",
      "03 Differential causality in polypharmacy patients",
      "04 Confounder isolation and rechallenge interpretation",
    ],
  },
  icsrProcessing: {
    name: "ICSR Processing",
    category: "Workflow",
    assessed: [
      "Verification of 4 minimum ICSR criteria (Patient, Reporter, Suspect, Event)",
      "Duplicate case search protocols",
      "Expedited reporting clock initiation",
      "Initial vs follow-up safety report triage",
    ],
    recommendedFocus: [
      "01 ICH E2B(R3) electronic reporting standards",
      "02 Minimum criteria verification under pressure",
      "03 Follow-up information reconciliation workflows",
      "04 Duplicate identification in safety databases",
    ],
  },
  pvFundamentals: {
    name: "PV Fundamentals",
    category: "Core Knowledge",
    assessed: [
      "ICH, EMA GVP Module VI, and US FDA 21 CFR safety frameworks",
      "Adverse Event (AE) vs Adverse Drug Reaction (ADR) differentiation",
      "Signal detection foundations and post-marketing surveillance",
      "Sponsor and marketing authorization holder obligations",
    ],
    recommendedFocus: [
      "01 EMA GVP Module VI regulatory requirements",
      "02 CIOMS Working Group safety principles",
      "03 Post-authorization safety study (PASS) concepts",
      "04 Pharmacovigilance quality systems and audits",
    ],
  },
  medicalInterpretation: {
    name: "Medical Interpretation",
    category: "Clinical",
    assessed: [
      "Laboratory trajectory evaluation (liver enzymes, creatinine, CBC)",
      "Medical history baseline comparison",
      "Dose-response and drug-drug interaction mechanisms",
      "Diagnostic criteria matching",
    ],
    recommendedFocus: [
      "01 Drug-induced liver injury (DILI) & Hy's Law criteria",
      "02 Laboratory biomarker reference intervals and shifts",
      "03 Common drug interaction mechanisms (CYP450 pathways)",
      "04 Clinical toxicology & adverse syndrome recognition",
    ],
  },
  qualityCompliance: {
    name: "Quality & Compliance",
    category: "Quality Systems",
    assessed: [
      "Expedited 7-day vs 15-day regulatory submission timelines",
      "Good Pharmacovigilance Practice (GVP) audit adherence",
      "CAPA (Corrective and Preventive Action) documentation",
      "Regulatory inspection readiness protocols",
    ],
    recommendedFocus: [
      "01 Day 0 calculation standard operating procedures",
      "02 GVP Module II Pharmacovigilance System Master File (PSMF)",
      "03 Quality management systems in contract research organizations",
      "04 Inspection findings root cause analysis",
    ],
  },
  situationalJudgment: {
    name: "Situational Judgment",
    category: "Professional Practice",
    assessed: [
      "Handling ambiguous or conflicting medical reports",
      "Escalation protocols for potential safety signals",
      "Team communication during high-volume case spikes",
      "Ethical decision-making in clinical data integrity",
    ],
    recommendedFocus: [
      "01 Safety query formulation and physician outreach",
      "02 Cross-functional communication with medical monitors",
      "03 Professional ethics in adverse reaction reporting",
      "04 Prioritization matrices for urgent safety inquiries",
    ],
  },
  meddraCoding: {
    name: "MedDRA / Coding",
    category: "Technical Standards",
    assessed: [
      "Lowest Level Term (LLT) to Preferred Term (PT) hierarchy selection",
      "Points to Consider (PtC) regulatory coding guidelines",
      "Diagnosis vs sign/symptom split coding rules",
      "Standardised MedDRA Queries (SMQ) application",
    ],
    recommendedFocus: [
      "01 MedDRA MSSO term selection companion guideline",
      "02 Primary System Organ Class (SOC) allocation rules",
      "03 Medical dictionary browser navigation speed",
      "04 Differential coding in complex syndrome narratives",
    ],
  },
};

export function AcriCareerIntelligenceReport({
  result,
  onRetake,
  onViewCertificate,
  onViewReport,
  mode = "certified",
  candidateName = "Rahul Bathula",
  candidateCollege = "JSS College of Pharmacy",
  candidateQualification = "B.Pharm (Bachelor of Pharmacy)",
  credentialId: incomingCredId,
  assessmentDate = "24 Sep 2026",
}: AcriCareerIntelligenceReportProps) {
  const [selectedCompetencyKey, setSelectedCompetencyKey] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [mobileTab, setMobileTab] = useState<"radar" | "ledger">("radar");
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [showStickyDock, setShowStickyDock] = useState(false);
  const shareCardRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  // Score extraction
  const score = Math.round(result.compositeScore);
  const readinessTier = getAcriReadinessState(score);
  const isIndustryReady = readinessTier === "industry_ready";
  const isNearReady = readinessTier === "near_ready";
  const isDeveloping = readinessTier === "developing";

  // Calibrated Status Details
  const status = useMemo(() => {
    if (isIndustryReady) {
      return {
        label: "INDUSTRY READY",
        pillClass: "bg-emerald-50 text-emerald-800 border-emerald-300 ring-1 ring-emerald-500/20",
        badgeBg: "bg-emerald-600",
        radarStroke: "#059669",
        benchmarkDiff: score - 80,
        subtext: "Exceeds standard enterprise hiring threshold for autonomous case processing.",
        percentile: "Top 8% of Evaluated Cohort Candidates",
      };
    }
    if (isNearReady) {
      return {
        label: "APPROACHING READINESS",
        pillClass: "bg-amber-50 text-amber-900 border-amber-300 ring-1 ring-amber-500/20",
        badgeBg: "bg-amber-600",
        radarStroke: "#D97706",
        benchmarkDiff: 80 - score,
        subtext: `Strong foundational performance; ${80 - score} points from operational autonomy threshold.`,
        percentile: "Top 18% of Pharmacy Graduate Candidates",
      };
    }
    if (isDeveloping) {
      return {
        label: "DEVELOPING",
        pillClass: "bg-sky-50 text-sky-900 border-sky-300 ring-1 ring-sky-500/20",
        badgeBg: "bg-sky-600",
        radarStroke: "#0284C7",
        benchmarkDiff: 80 - score,
        subtext: "Baseline conceptual knowledge demonstrated; targeted drills required in ICSR processing.",
        percentile: "Emerging Occupational Competency",
      };
    }
    return {
      label: "FOUNDATION BUILDING",
      pillClass: "bg-stone-100 text-stone-800 border-stone-300",
      badgeBg: "bg-stone-700",
      radarStroke: "#475569",
      benchmarkDiff: 80 - score,
      subtext: "Core conceptual orientation required across standard PV guidelines and definitions.",
      percentile: "Foundational Progression Phase",
    };
  }, [isIndustryReady, isNearReady, isDeveloping, score]);

  // Stable Credential ID
  const credentialId = useMemo(() => {
    if (incomingCredId) return incomingCredId;
    const str = `${candidateName}-${assessmentDate}`;
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0;
    }
    const serial = Math.abs(hash % 900000) + 100000;
    const prefix = isIndustryReady ? "AZ-ACRI-PV-2026" : "AZ-ACRI-EVAL";
    return `${prefix}-${serial}`;
  }, [incomingCredId, isIndustryReady, candidateName, assessmentDate]);

  // Transform competencies for radar & tables
  const competencyItems = useMemo(() => {
    return Object.entries(ACRI_PV_COMPETENCIES).map(([key, def]) => {
      const compScore = result.dimensionScores[key] ?? 75;
      const meta = COMPETENCY_METADATA[key] || {
        name: def.name,
        category: "Pharmacovigilance",
        assessed: ["Technical execution", "Guideline compliance"],
        recommendedFocus: ["Core knowledge review", "Practice case decisions"],
      };

      let compStatus: "Strong" | "Developing" | "Priority Development" = "Strong";
      if (compScore < 60) compStatus = "Priority Development";
      else if (compScore < 85) compStatus = "Developing";

      let evidence = "Your responses demonstrated strong mastery of the evaluated parameters.";
      if (compScore === 0 || compScore < 40) {
        evidence = `Your responses did not demonstrate sufficient performance in the assessed ${meta.name.toLowerCase()} scenarios.`;
      } else if (compScore < 80) {
        evidence = `Your responses showed foundational comprehension with opportunities to sharpen precision in complex scenarios.`;
      }

      return {
        key,
        name: meta.name,
        category: meta.category,
        score: compScore,
        status: compStatus,
        assessed: meta.assessed,
        evidence,
        recommendedFocus: meta.recommendedFocus,
      };
    });
  }, [result.dimensionScores]);

  // Sort by score
  const sortedCompetencies = useMemo(() => {
    return [...competencyItems].sort((a, b) => b.score - a.score);
  }, [competencyItems]);

  // Key Highlight Cards
  const strongest = sortedCompetencies[0] || competencyItems[0];
  const priority = sortedCompetencies[sortedCompetencies.length - 1] || competencyItems[competencyItems.length - 1];
  const emerging =
    sortedCompetencies.find((c) => c.score >= 60 && c.score < 95) ||
    sortedCompetencies[1] ||
    competencyItems[1];

  // Radar points
  const radarData: RadarDataPoint[] = useMemo(() => {
    return competencyItems.map((c) => ({
      key: c.key,
      label: c.name,
      score: c.score,
    }));
  }, [competencyItems]);

  // Selected competency object for modal
  const activeCompetencyDetail = useMemo(() => {
    if (!selectedCompetencyKey) return null;
    return competencyItems.find((c) => c.key === selectedCompetencyKey) || null;
  }, [selectedCompetencyKey, competencyItems]);

  // Scroll listener for mobile sticky action dock
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 450) {
        setShowStickyDock(true);
      } else {
        setShowStickyDock(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll helper
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCopyLink = () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      toast.success("Public verification result link copied to clipboard!");
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleShareLinkedIn = () => {
    const text = encodeURIComponent(
      `I completed the ACRI Pharmacovigilance Assessment and scored ${score}/100 (${status.label}) for Pharmacovigilance Associate readiness on Arzon Global! Verify my credential: ${credentialId}`,
    );
    window.open(`https://www.linkedin.com/sharing/share-offsite/?text=${text}`, "_blank");
  };

  const handleShareWhatsApp = () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const text = encodeURIComponent(
      `I scored ${score}/100 (${status.label}) on the ACRI Pharmacovigilance Assessment! View my verified capability report on Arzon Global: ${url}`,
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  // Client PDF Generator
  const handleDownloadPdf = async () => {
    setIsDownloadingPdf(true);
    toast.loading("Generating high-resolution intelligence dossier...", { id: "pdf-gen" });

    try {
      const html2canvas = (await import("html2canvas-pro")).default;
      const { jsPDF } = await import("jspdf");

      const targetElement = document.getElementById("acri-official-certificate") || shareCardRef.current;
      if (targetElement) {
        const canvas = await html2canvas(targetElement, {
          scale: 3,
          useCORS: true,
          backgroundColor: "#060B18",
          logging: false,
        });

        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("landscape", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(
          imgData,
          "PNG",
          0,
          Math.max(0, (pdf.internal.pageSize.getHeight() - pdfHeight) / 2),
          pdfWidth,
          pdfHeight
        );
        pdf.save(`ACRI_Official_Credential_${candidateName.replace(/\s+/g, "_")}_${credentialId}.pdf`);

        toast.success("Credential Dossier PDF downloaded successfully!", { id: "pdf-gen" });
      } else {
        window.print();
        toast.dismiss("pdf-gen");
      }
    } catch (err) {
      console.warn("Falling back to window print:", err);
      window.print();
      toast.dismiss("pdf-gen");
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  const handleDownloadPng = async () => {
    try {
      const html2canvas = (await import("html2canvas-pro")).default;
      const targetElement = document.getElementById("acri-official-certificate");
      if (targetElement) {
        toast.loading("Exporting high-resolution credential...", { id: "png-gen" });
        const canvas = await html2canvas(targetElement, {
          scale: 3,
          useCORS: true,
          backgroundColor: "#060B18",
          logging: false,
        });
        const link = document.createElement("a");
        link.download = `ACRI_Credential_${candidateName.replace(/\s+/g, "_")}_${credentialId}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
        toast.success("Credential image exported successfully!", { id: "png-gen" });
      }
    } catch (err) {
      toast.error("Failed to export credential image", { id: "png-gen" });
    }
  };

  // Precision Clinical Instrument Dial Calculations
  const dialRadius = 78;
  const dialCircumference = 2 * Math.PI * dialRadius;
  const dialClampedScore = Math.min(100, Math.max(0, score));
  const dialOffset = dialCircumference - (dialClampedScore / 100) * dialCircumference;

  // 100 Engraved Micro-Ticks across the 360-degree circumference
  const dialTicks = useMemo(() => {
    return Array.from({ length: 100 }, (_, i) => {
      // 0 tick starts at top (-90 deg), progressing clockwise
      const angleDeg = -90 + (i / 100) * 360;
      const angleRad = (angleDeg * Math.PI) / 180;
      const isMajor = i % 10 === 0;
      const isMedium = i % 5 === 0;
      const isBenchmark = i === 80;
      const isPassed = i <= dialClampedScore;

      // Radial depths for micro-engraved dial aesthetics
      const outerR = isBenchmark ? 104 : isMajor ? 102 : isMedium ? 100 : 98;
      const innerR = isBenchmark ? 86 : isMajor ? 90 : isMedium ? 93 : 95;

      const x1 = 110 + innerR * Math.cos(angleRad);
      const y1 = 110 + innerR * Math.sin(angleRad);
      const x2 = 110 + outerR * Math.cos(angleRad);
      const y2 = 110 + outerR * Math.sin(angleRad);

      let stroke = "#CBD5E1"; // baseline inactive tick
      let strokeWidth = 1;

      if (isBenchmark) {
        stroke = "#C5A572"; // Gold benchmark indicator
        strokeWidth = 2.5;
      } else if (isPassed) {
        stroke = isIndustryReady ? "#059669" : isNearReady ? "#D97706" : "#475569";
        strokeWidth = isMajor ? 2 : isMedium ? 1.5 : 1;
      } else if (isMajor) {
        stroke = "#94A3B8";
        strokeWidth = 1.5;
      }

      return { i, x1, y1, x2, y2, stroke, strokeWidth, isBenchmark };
    });
  }, [dialClampedScore, isIndustryReady, isNearReady]);

  // Coordinates for the 80/100 Benchmark Indicator Flag
  const benchmarkAngleRad = ((-90 + 0.8 * 360) * Math.PI) / 180; // 198 deg
  const benchmarkFlagX = 110 + 107 * Math.cos(benchmarkAngleRad);
  const benchmarkFlagY = 110 + 107 * Math.sin(benchmarkAngleRad);

  return (
    <div className="min-h-screen bg-[#F7F8F5] text-[#0B1325] antialiased selection:bg-[#E8F7F1] selection:text-[#005B4F] pb-24 sm:pb-16">
      {/* ── TOP EXECUTIVE APP BAR ────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200 shadow-2xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
              <ArzonLogo variant="light" size="sm" />
            </Link>
            <span className="text-stone-300 text-sm hidden sm:inline">|</span>
            <div className="hidden sm:flex items-center gap-2">
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#005B4F]">
                ACRI Career Intelligence Dossier
              </span>
              <span className="text-[10px] font-mono text-stone-400 bg-stone-100 px-1.5 py-0.5 rounded border border-stone-200">
                PV v1.0
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={onRetake}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
              title="Retake evaluation session"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span className="hidden md:inline">Retake</span>
            </button>

            <Link
              to="/verify"
              search={{ id: credentialId }}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"
              title="Verify credential on ledger"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-[#005B4F]" />
              <span className="hidden md:inline">Verify Credential</span>
            </Link>

            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={isDownloadingPdf}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-stone-700 hover:text-stone-900 hover:bg-stone-100 border border-stone-200 rounded-lg transition-colors cursor-pointer"
              title="Download official PDF report"
            >
              <Download className="h-3.5 w-3.5 text-stone-600" />
              <span className="hidden lg:inline">PDF</span>
            </button>

            <button
              type="button"
              onClick={() => scrollToSection("share-section")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0B1325] hover:bg-[#1B3F8B] text-white text-xs font-mono font-bold uppercase tracking-wider rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              <Share2 className="h-3.5 w-3.5" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8 sm:space-y-12">
        {/* ── LAYER 01: THE EXECUTIVE HERO ACHIEVEMENT DOSSIER ────────── */}
        <section
          ref={heroRef}
          className="rounded-3xl border border-stone-300 bg-[#FAF9F6] tone-light card-light shadow-xl relative overflow-hidden"
        >
          {/* Dossier Midnight Navy Archival Header Strip */}
          <div className="px-6 py-3.5 bg-[#060B18] text-white flex flex-wrap items-center justify-between gap-3 text-[10px] sm:text-[11px] font-mono border-b border-stone-800">
            <div className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400 motion-safe:animate-pulse" />
              <span className="font-bold tracking-widest uppercase text-slate-100">
                ARZON CLINICAL READINESS INDEX
              </span>
              <span className="text-stone-600">•</span>
              <span className="text-[#C5A572] font-semibold">OFFICIAL OCCUPATIONAL DOSSIER</span>
            </div>
            <div className="flex items-center gap-3 text-stone-400">
              <span>LEDGER ID: <strong className="text-white font-mono font-bold">{credentialId}</strong></span>
              <span className="hidden sm:inline text-stone-600">•</span>
              <span className="hidden sm:inline">CONFERRED: {assessmentDate}</span>
            </div>
          </div>

          <div className="p-6 sm:p-10 relative z-10 space-y-8">
            {/* Candidate Passport Section */}
            <div className="bg-white tone-light card-light rounded-2xl border border-stone-200/90 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-2xs">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#005B4F] bg-[#E8F7F1] px-2.5 py-0.5 rounded-full border border-[#005B4F]/20">
                    CANDIDATE DOSSIER
                  </span>
                  <span className="text-[10px] font-mono text-stone-400">
                    BATCH 2026-01
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl font-serif font-bold text-[#0B1325]">
                  {candidateName}
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-stone-600 font-sans">
                  <span className="inline-flex items-center gap-1 font-semibold text-stone-800">
                    <GraduationCap className="h-3.5 w-3.5 text-stone-500" />
                    {candidateQualification}
                  </span>
                  <span className="text-stone-300">•</span>
                  <span>{candidateCollege}</span>
                </div>
              </div>

              <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-stone-200">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-stone-500">
                  TARGET OCCUPATION
                </span>
                <span className="text-sm font-sans font-bold text-[#0B1325] text-right">
                  Pharmacovigilance Associate
                </span>
                <span className="text-[11px] font-mono text-emerald-800 font-semibold">
                  ICH E2D · EMA GVP VI · MedDRA v27.0
                </span>
              </div>
            </div>

            {/* Precision Clinical Instrument Dial + Assessment Viewport */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-2">
              {/* Dial Column */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center">
                <div className="relative flex items-center justify-center shrink-0">
                  <svg
                    width="220"
                    height="220"
                    viewBox="0 0 220 220"
                    className="overflow-visible select-none"
                  >
                    <defs>
                      {/* Dynamic Dial Gradient */}
                      <linearGradient id="dial-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        {score >= 80 ? (
                          <>
                            <stop offset="0%" stopColor="#059669" />
                            <stop offset="70%" stopColor="#10B981" />
                            <stop offset="100%" stopColor="#D4AF37" />
                          </>
                        ) : score >= 60 ? (
                          <>
                            <stop offset="0%" stopColor="#D97706" />
                            <stop offset="100%" stopColor="#F59E0B" />
                          </>
                        ) : (
                          <>
                            <stop offset="0%" stopColor="#475569" />
                            <stop offset="100%" stopColor="#6366F1" />
                          </>
                        )}
                      </linearGradient>

                      {/* Recessed dial shadow */}
                      <filter id="dial-shadow" x="-10%" y="-10%" width="120%" height="120%">
                        <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.08" />
                      </filter>
                    </defs>

                    {/* Outer Bezel Calibrations */}
                    <circle
                      cx="110"
                      cy="110"
                      r="108"
                      fill="#FAF9F6"
                      stroke="#E2E8F0"
                      strokeWidth="1.5"
                      filter="url(#dial-shadow)"
                    />
                    <circle
                      cx="110"
                      cy="110"
                      r="86"
                      fill="none"
                      stroke="#F1F5F9"
                      strokeWidth="1"
                    />

                    {/* Recessed Instrument Arc Track */}
                    <circle
                      cx="110"
                      cy="110"
                      r={dialRadius}
                      fill="none"
                      stroke="#E7E5E4"
                      strokeWidth="9"
                      strokeLinecap="round"
                    />

                    {/* 100 Micro-Engraved Radial Ticks */}
                    {dialTicks.map((tick) => (
                      <line
                        key={tick.i}
                        x1={tick.x1}
                        y1={tick.y1}
                        x2={tick.x2}
                        y2={tick.y2}
                        stroke={tick.stroke}
                        strokeWidth={tick.strokeWidth}
                        strokeLinecap="round"
                      />
                    ))}

                    {/* Active Illuminated Progress Stroke */}
                    <circle
                      cx="110"
                      cy="110"
                      r={dialRadius}
                      fill="none"
                      stroke="url(#dial-gradient)"
                      strokeWidth="9"
                      strokeDasharray={dialCircumference}
                      strokeDashoffset={dialOffset}
                      strokeLinecap="round"
                      transform="rotate(-90 110 110)"
                      className="transition-all duration-1000 ease-out"
                    />

                    {/* Prominent 80/100 Benchmark Gate Indicator */}
                    <circle
                      cx={benchmarkFlagX}
                      cy={benchmarkFlagY}
                      r="3.5"
                      fill="#C5A572"
                      stroke="#0B1325"
                      strokeWidth="1.5"
                    />
                  </svg>

                  {/* Grand Center Readout */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                    <div className="flex items-baseline">
                      <span className="text-5xl sm:text-6xl font-serif font-black text-[#0B1325] tracking-tight">
                        {score}
                      </span>
                      <span className="text-xs font-mono font-bold text-stone-500 ml-1">
                        /100
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[9px] font-mono font-bold text-emerald-800 uppercase tracking-widest mt-0.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 motion-safe:animate-pulse" />
                      <span>GVP CALIBRATED</span>
                    </div>
                  </div>
                </div>

                {/* Benchmark Notch Caption */}
                <div className="mt-3 flex items-center gap-1.5 text-[11px] font-mono text-stone-500">
                  <span className="h-2 w-2 rounded-full bg-[#C5A572]" />
                  <span>80/100 Autonomy Threshold Gate</span>
                </div>
              </div>

              {/* Status Context, Narrative & Benchmark Gap Comparator */}
              <div className="lg:col-span-7 space-y-5">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-sans font-extrabold tracking-wider border shadow-2xs ${status.pillClass}`}
                    >
                      <span className="h-2 w-2 rounded-full bg-current" />
                      <span>{status.label}</span>
                    </span>

                    <span className="px-2.5 py-1 rounded-full bg-white card-light text-stone-700 text-[11px] font-mono font-semibold border border-stone-200">
                      {status.percentile}
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#0B1325] tracking-tight">
                    {isIndustryReady
                      ? "Autonomous Operational Clearance Achieved"
                      : "Strong Foundational Competency Demonstrated"}
                  </h1>

                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">
                    {isIndustryReady && (
                      <span>
                        Your calibrated performance meets the rigorous ACRI benchmark for independent
                        case processing, ICSR validation, and medical adverse event triage under global GVP Module VI standards.
                      </span>
                    )}
                    {isNearReady && (
                      <span>
                        You demonstrated strong operational capability across Core Case Assessment and Analytical Reasoning.
                        Targeted drills in MedDRA LLT hierarchy and expedited reporting clocks will bridge the remaining gap to autonomous case clearance.
                      </span>
                    )}
                    {!isIndustryReady && !isNearReady && (
                      <span>
                        Your assessment established an initial technical baseline across pharmacovigilance
                        concepts. A sequenced progression plan will advance your practical readiness toward operational autonomy.
                      </span>
                    )}
                  </p>
                </div>

                {/* Benchmark Gap Comparator Card */}
                <div className="rounded-2xl border border-stone-200 bg-white card-light p-4 space-y-3 shadow-2xs">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-stone-700 uppercase tracking-wider">
                      BENCHMARK GAP COMPARATOR
                    </span>
                    <span className="text-stone-500 font-bold">
                      {score >= 80 ? (
                        <span className="text-emerald-700 font-extrabold">+{score - 80} pts Above Gate</span>
                      ) : (
                        <span className="text-amber-800 font-extrabold">-{80 - score} pts to Gate</span>
                      )}
                    </span>
                  </div>

                  {/* Tri-benchmark visual track */}
                  <div className="space-y-1.5">
                    <div className="relative h-3 w-full bg-stone-100 rounded-full overflow-hidden border border-stone-200">
                      {/* Active score fill */}
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ${
                          score >= 80 ? "bg-emerald-600" : score >= 60 ? "bg-amber-500" : "bg-stone-500"
                        }`}
                        style={{ width: `${Math.min(100, Math.max(5, score))}%` }}
                      />
                      {/* 80 benchmark notch */}
                      <div
                        className="absolute top-0 bottom-0 w-0.5 bg-[#C5A572] z-10"
                        style={{ left: "80%" }}
                        title="80/100 Benchmark"
                      />
                    </div>

                    <div className="flex justify-between text-[10px] font-mono text-stone-500 pt-0.5">
                      <span>Cohort Avg: <strong>62/100</strong></span>
                      <span className="text-[#C5A572] font-bold">Autonomy Gate: 80/100</span>
                      <span className="text-stone-900 font-bold">Candidate: {score}/100</span>
                    </div>
                  </div>
                </div>

                {/* Strict 3-Tier CTAs */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  {/* TIER 1: PRIMARY CTA */}
                  <button
                    type="button"
                    onClick={onViewCertificate || (() => scrollToSection("share-section"))}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#0B1325] hover:bg-[#1B3F8B] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer flex items-center justify-center gap-2 group"
                  >
                    <span>OPEN OFFICIAL CERTIFICATE →</span>
                  </button>

                  {/* TIER 2: SECONDARY CTAs */}
                  <Link
                    to="/verify"
                    search={{ id: credentialId }}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl border border-stone-300 bg-white card-light hover:bg-stone-100 text-stone-900 font-mono text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <ShieldCheck className="h-4 w-4 text-[#005B4F]" />
                    <span>VERIFY ON PUBLIC LEDGER →</span>
                  </Link>

                  <button
                    type="button"
                    onClick={handleDownloadPdf}
                    disabled={isDownloadingPdf}
                    className="w-full sm:w-auto px-4 py-3 rounded-xl border border-stone-300 bg-white card-light hover:bg-stone-100 text-stone-700 font-mono text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Download className="h-4 w-4 text-stone-500" />
                    <span>DOWNLOAD PDF ↓</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── LAYER 02: SCORE INTERPRETATION THREE-TIER CONTINUUM ──────── */}
        <section className="bg-white tone-light card-light rounded-3xl border border-stone-200/90 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="max-w-2xl">
            <span className="font-mono text-xs font-bold text-[#005B4F] uppercase tracking-wider">
              Score Interpretation
            </span>
            <h2 className="text-2xl font-serif font-bold text-[#0B1325] mt-1">
              What does your score of {score} mean?
            </h2>
            <p className="text-sm text-stone-700 leading-relaxed mt-2 font-sans">
              The ACRI Pharmacovigilance benchmark calibrates candidate decisions against global
              regulatory standards. A score of 80/100 represents the threshold where global CROs and
              pharmaceutical sponsors trust a candidate to process ICSR case files without continuous supervision.
            </p>
          </div>

          {/* Three-Tier Calibrated Visual Bar */}
          <div className="pt-2 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Tier 1 */}
              <div className={`p-4 rounded-xl border text-xs space-y-1.5 transition-all ${
                score < 60 ? "bg-rose-50/70 border-rose-300 ring-2 ring-rose-500/20" : "bg-[#FAF8F5] border-stone-200"
              }`}>
                <div className="flex items-center justify-between font-mono font-bold">
                  <span className="text-stone-700">FOUNDATION</span>
                  <span>0–59%</span>
                </div>
                <p className="text-[11px] text-stone-600 leading-normal">
                  Supervised Training Required. Basic conceptual familiarity with adverse events.
                </p>
              </div>

              {/* Tier 2 */}
              <div className={`p-4 rounded-xl border text-xs space-y-1.5 transition-all ${
                isNearReady ? "bg-amber-50/70 border-amber-300 ring-2 ring-amber-500/20" : "bg-[#FAF8F5] border-stone-200"
              }`}>
                <div className="flex items-center justify-between font-mono font-bold">
                  <span className="text-amber-900 flex items-center gap-1">
                    NEAR READY
                    {isNearReady && <span className="h-1.5 w-1.5 rounded-full bg-amber-600" />}
                  </span>
                  <span className="text-amber-900">60–79%</span>
                </div>
                <p className="text-[11px] text-stone-700 leading-normal">
                  {isNearReady ? (
                    <strong className="text-amber-900 block font-semibold">Your Current Assessment Zone</strong>
                  ) : null}
                  Functional in standard ICSR intake and narrative drafting; refinement in coding required.
                </p>
              </div>

              {/* Tier 3 */}
              <div className={`p-4 rounded-xl border text-xs space-y-1.5 transition-all ${
                isIndustryReady ? "bg-emerald-50/70 border-emerald-300 ring-2 ring-emerald-500/20" : "bg-[#FAF8F5] border-stone-200"
              }`}>
                <div className="flex items-center justify-between font-mono font-bold">
                  <span className="text-emerald-900 flex items-center gap-1">
                    INDUSTRY READY
                    {isIndustryReady && <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />}
                  </span>
                  <span className="text-emerald-900">80–100%</span>
                </div>
                <p className="text-[11px] text-stone-700 leading-normal">
                  Operational Autonomy. Cleared for entry-level Case Processing &amp; Triage without remediation.
                </p>
              </div>
            </div>

            {/* Slider track visualization */}
            <div className="relative pt-4 pb-2">
              <div className="h-3 w-full rounded-full bg-stone-100 overflow-hidden flex">
                <div className="w-[60%] h-full bg-stone-300" />
                <div className="w-[20%] h-full bg-amber-500" />
                <div className="w-[20%] h-full bg-emerald-500" />
              </div>

              {/* Benchmark marker at 80% */}
              <div className="absolute top-2 left-[80%] -translate-x-1/2 flex flex-col items-center">
                <div className="w-0.5 h-7 bg-stone-800 z-10" />
                <span className="text-[10px] font-mono font-bold text-stone-800 bg-white tone-light px-1.5 py-0.5 rounded shadow-2xs border border-stone-300 mt-1">
                  80% Benchmark
                </span>
              </div>

              {/* Candidate current position pin */}
              <div
                className="absolute top-2.5 -translate-x-1/2 flex flex-col items-center z-20 transition-all duration-700"
                style={{ left: `${Math.min(98, Math.max(4, score))}%` }}
              >
                <div className="h-5 w-5 rounded-full bg-white tone-light border-3 border-[#005B4F] shadow-md flex items-center justify-center" />
                <span className="text-[11px] font-mono font-black text-white bg-[#005B4F] px-1.5 py-0.5 rounded shadow-xs mt-1">
                  {score}%
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── LAYER 03: ASSESSMENT INTELLIGENCE HIGHLIGHTS (3 CARDS) ──── */}
        <section id="intelligence-section" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
            <div>
              <span className="font-mono text-xs font-bold text-[#005B4F] uppercase tracking-wider">
                Core Capability Breakdown
              </span>
              <h2 className="text-2xl font-serif font-bold text-[#0B1325]">
                Your Assessment Highlights
              </h2>
            </div>
            <span className="text-xs text-stone-500 font-mono">
              Calibrated from 9 simulated clinical work cases
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Card 1: Strongest Capability */}
            <div className="bg-white tone-light card-light rounded-2xl border border-emerald-200/90 p-5 sm:p-6 shadow-xs flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-[10px] font-mono font-bold uppercase tracking-wider border border-emerald-200">
                    STRONGEST CAPABILITY
                  </span>
                  <Award className="h-4 w-4 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-lg font-serif font-bold text-[#0B1325]">
                    {strongest.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mt-1 text-emerald-800 font-serif font-black text-2xl">
                    <span>{strongest.score}</span>
                    <span className="text-xs font-mono text-stone-400 font-normal">/ 100</span>
                  </div>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Demonstrated flawless criteria identification for seriousness under ICH E2A and
                  expectedness cross-referencing with SmPC Section 4.8.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedCompetencyKey(strongest.key)}
                className="w-full py-2 px-3 text-xs font-semibold text-[#005B4F] hover:bg-[#E8F7F1]/50 rounded-lg flex items-center justify-between cursor-pointer border-t border-stone-100 transition-colors"
              >
                <span>Inspect Clinical Evidence</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Card 2: Emerging Capability */}
            <div className="bg-white tone-light card-light rounded-2xl border border-stone-200 p-5 sm:p-6 shadow-xs flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-md bg-stone-100 text-stone-700 text-[10px] font-mono font-bold uppercase tracking-wider border border-stone-200">
                    EMERGING CAPABILITY
                  </span>
                  <Activity className="h-4 w-4 text-[#005B4F]" />
                </div>
                <div>
                  <h3 className="text-lg font-serif font-bold text-[#0B1325]">
                    {emerging.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mt-1 text-[#005B4F] font-serif font-black text-2xl">
                    <span>{emerging.score}</span>
                    <span className="text-xs font-mono text-stone-400 font-normal">/ 100</span>
                  </div>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Accurate on 4 minimum ICSR criteria (Patient, Reporter, Suspect, Event); 15-day expedited
                  reporting clock calibration in progress.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedCompetencyKey(emerging.key)}
                className="w-full py-2 px-3 text-xs font-semibold text-[#005B4F] hover:bg-[#E8F7F1]/50 rounded-lg flex items-center justify-between cursor-pointer border-t border-stone-100 transition-colors"
              >
                <span>Inspect Clinical Evidence</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Card 3: Priority Development */}
            <div className="bg-white tone-light card-light rounded-2xl border border-amber-200/90 p-5 sm:p-6 shadow-xs flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-900 text-[10px] font-mono font-bold uppercase tracking-wider border border-amber-200">
                    PRIORITY DEVELOPMENT
                  </span>
                  <TrendingUp className="h-4 w-4 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-lg font-serif font-bold text-[#0B1325]">
                    {priority.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mt-1 text-amber-800 font-serif font-black text-2xl">
                    <span>{priority.score}</span>
                    <span className="text-xs font-mono text-stone-400 font-normal">/ 100</span>
                  </div>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  MedDRA hierarchy selection (LLT vs PT) showed gaps. Targeted term selection drills
                  will close the 2-point gap to Industry Ready standing.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedCompetencyKey(priority.key)}
                className="w-full py-2 px-3 text-xs font-semibold text-amber-900 hover:bg-amber-50 rounded-lg flex items-center justify-between cursor-pointer border-t border-stone-100 transition-colors"
              >
                <span>View Focus Plan</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </section>

        {/* ── LAYER 04: CAPABILITY PROFILE (MOBILE-MASTERED VIEW) ──────── */}
        <section className="bg-white tone-light card-light rounded-3xl border border-stone-200/90 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
            <div>
              <span className="font-mono text-xs font-bold text-[#005B4F] uppercase tracking-wider">
                Dimensional Analysis
              </span>
              <h2 className="text-2xl font-serif font-bold text-[#0B1325] mt-1">
                Your Capability Profile
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-1">
                Interactive 9-competency assessment map calibrated to Pharmacovigilance Associate job descriptions.
              </p>
            </div>

            {/* Mobile View Switcher Tab (< md) */}
            <div className="flex md:hidden items-center p-1 rounded-xl bg-stone-100 border border-stone-200 text-xs font-semibold self-start">
              <button
                type="button"
                onClick={() => setMobileTab("radar")}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  mobileTab === "radar"
                    ? "bg-white text-stone-900 shadow-2xs font-bold"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                ✦ Radar Map
              </button>
              <button
                type="button"
                onClick={() => setMobileTab("ledger")}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  mobileTab === "ledger"
                    ? "bg-white text-stone-900 shadow-2xs font-bold"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                ☰ Ledger (9)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left: SVG Radar Chart (Visible always on desktop; conditionally on mobile) */}
            <div
              className={`md:col-span-5 flex flex-col items-center justify-center p-4 sm:p-6 rounded-2xl bg-[#FAF8F5] border border-stone-200/80 ${
                mobileTab === "ledger" ? "hidden md:flex" : "flex"
              }`}
            >
              <div className="w-full flex items-center justify-between text-[11px] font-mono font-bold uppercase tracking-wider text-stone-500 mb-2">
                <span>YOUR READINESS MAP</span>
                <span className="text-[#005B4F] font-bold">9 DIMENSIONS</span>
              </div>

              <AcriRadarChart
                data={radarData}
                size={340}
                onSelectCompetency={(key) => setSelectedCompetencyKey(key)}
                selectedKey={selectedCompetencyKey}
                showBenchmark={true}
              />

              <span className="text-[11px] text-stone-500 mt-3 text-center">
                Tap any vertex or label to inspect evaluated criteria &amp; evidence
              </span>
            </div>

            {/* Right: Competency Table / Cards (Visible always on desktop; conditionally on mobile) */}
            <div
              className={`md:col-span-7 space-y-3 ${
                mobileTab === "radar" ? "hidden md:block" : "block"
              }`}
            >
              <div className="flex items-center justify-between pb-2 border-b border-stone-200 text-xs font-mono font-bold text-stone-400 uppercase tracking-wider">
                <span>Competency Dimension</span>
                <div className="flex items-center gap-6">
                  <span>Score</span>
                  <span className="w-24 text-right">Status</span>
                </div>
              </div>

              <div className="space-y-2">
                {sortedCompetencies.map((comp) => {
                  const isSelected = selectedCompetencyKey === comp.key;
                  return (
                    <div
                      key={comp.key}
                      onClick={() => setSelectedCompetencyKey(comp.key)}
                      className={`p-3 rounded-xl flex items-center justify-between transition-all cursor-pointer border ${
                        isSelected
                          ? "bg-[#E8F7F1] border-[#005B4F]/40 shadow-xs"
                          : "bg-white hover:bg-stone-50 border-stone-200/70"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0 pr-2">
                        <span
                          className={`h-2.5 w-2.5 rounded-full shrink-0 ${
                            comp.score >= 85
                              ? "bg-emerald-500"
                              : comp.score >= 60
                                ? "bg-amber-500"
                                : "bg-rose-500"
                          }`}
                        />
                        <div className="truncate">
                          <div className="text-xs font-bold text-[#0B1325] truncate">
                            {comp.name}
                          </div>
                          <div className="text-[10px] text-stone-500 truncate">
                            {comp.category}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 sm:gap-6 shrink-0">
                        <span className="font-mono text-xs font-black text-[#0B1325]">
                          {comp.score} / 100
                        </span>
                        <span
                          className={`w-28 text-center text-[10px] font-sans font-bold px-2 py-1 rounded-full border ${
                            comp.status === "Strong"
                              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                              : comp.status === "Developing"
                                ? "bg-amber-50 text-amber-900 border-amber-200"
                                : "bg-rose-50 text-rose-800 border-rose-200"
                          }`}
                        >
                          {comp.status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-stone-500 border-t border-stone-100">
                <span className="text-[11px] font-mono">
                  Strong (85+) • Developing (60-84) • Priority (&lt;60)
                </span>
                <span className="font-semibold text-[#005B4F] text-xs">
                  Click any row to inspect criteria →
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── LAYER 05: BEHAVIORAL SYNTHESIS & TELEMETRY ──────────────── */}
        <section className="bg-white tone-light card-light rounded-3xl border border-stone-200/90 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="max-w-2xl">
            <span className="font-mono text-xs font-bold text-[#005B4F] uppercase tracking-wider">
              Pattern Recognition
            </span>
            <h2 className="text-2xl font-serif font-bold text-[#0B1325] mt-1">
              What Your Assessment Revealed
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Automated behavioral synthesis extracted from case decision sequences, timeline structuring, and regulatory triage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Pattern Narrative */}
            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-stone-200/80 space-y-3">
              <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
                <Sparkles className="h-4 w-4 text-[#005B4F]" />
                <span>Strongest Pattern: Structured Problem Solving</span>
              </div>
              <p className="text-xs text-stone-700 leading-relaxed">
                You performed with high precision when required to organize chronological adverse event facts,
                match seriousness criteria against ICH E2A definitions, and document objective narratives
                without speculative clinical bias.
              </p>
              <div className="pt-2 border-t border-stone-200/60 flex items-center gap-2 text-[11px] text-stone-600 font-mono">
                <Check className="h-3.5 w-3.5 text-emerald-600" />
                <span>Demonstrated 100% stability across multi-part case scenarios</span>
              </div>
            </div>

            {/* Assessment Confidence Telemetry */}
            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-stone-200/80 space-y-4">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-stone-500 block">
                ASSESSMENT TELEMETRY &amp; CONFIDENCE
              </span>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-stone-700 font-medium">Domain Coverage</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 rounded-full bg-stone-200 overflow-hidden">
                      <div className="w-full h-full bg-[#005B4F]" />
                    </div>
                    <span className="font-mono font-bold text-stone-900 text-xs">100%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-stone-700 font-medium">Response Consistency</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 rounded-full bg-stone-200 overflow-hidden">
                      <div className="w-[92%] h-full bg-[#005B4F]" />
                    </div>
                    <span className="font-mono font-bold text-stone-900 text-xs">High</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-stone-700 font-medium">Evidence Depth</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 rounded-full bg-stone-200 overflow-hidden">
                      <div className="w-[95%] h-full bg-[#005B4F]" />
                    </div>
                    <span className="font-mono font-bold text-stone-900 text-xs">Verified</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-stone-200/60 text-[11px] text-stone-600 flex items-center gap-1.5 font-mono">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                <span>Standardized on Oracle Argus Safety v8.2 &amp; MedDRA v27.0 benchmarks.</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── LAYER 06: TARGETED DEVELOPMENT PLAN (3 PHASES) ──────────── */}
        <section className="bg-white tone-light card-light rounded-3xl border border-stone-200/90 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="max-w-2xl">
            <span className="font-mono text-xs font-bold text-[#005B4F] uppercase tracking-wider">
              Targeted Progression Roadmap
            </span>
            <h2 className="text-2xl font-serif font-bold text-[#0B1325] mt-1">
              Your 3-Phase Action Plan
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 font-sans">
              A sequenced developmental plan designed to bridge your highest development areas into operational autonomy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Step 1 */}
            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-stone-200 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-stone-200 text-stone-800">
                    PHASE 01
                  </span>
                  <span className="text-[10px] font-mono text-stone-500 font-semibold">3 DAYS</span>
                </div>
                <h3 className="text-base font-serif font-bold text-[#0B1325]">
                  Build Coding Precision
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Master MedDRA hierarchy term selection: LLT vs PT conventions and System Organ Class (SOC) rules.
                </p>
              </div>
              <span className="text-[11px] font-mono font-bold text-[#005B4F]">
                MedDRA Points to Consider (PtC)
              </span>
            </div>

            {/* Step 2 */}
            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-stone-200 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-stone-200 text-stone-800">
                    PHASE 02
                  </span>
                  <span className="text-[10px] font-mono text-stone-500 font-semibold">5 DAYS</span>
                </div>
                <h3 className="text-base font-serif font-bold text-[#0B1325]">
                  Practice Case Decisions
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Run repeated triage drills distinguishing suspect vs concomitant medications and establishing WHO-UMC causality.
                </p>
              </div>
              <span className="text-[11px] font-mono font-bold text-[#005B4F]">
                ICSR + WHO-UMC + SmPC Matching
              </span>
            </div>

            {/* Step 3 */}
            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-stone-200 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-stone-200 text-stone-800">
                    PHASE 03
                  </span>
                  <span className="text-[10px] font-mono text-stone-500 font-semibold">7 DAYS</span>
                </div>
                <h3 className="text-base font-serif font-bold text-[#0B1325]">
                  Apply Under Regulatory Pressure
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Execute integrated multi-case queues under 7-day and 15-day expedited submission deadlines in Oracle Argus simulator.
                </p>
              </div>
              <span className="text-[11px] font-mono font-bold text-[#005B4F]">
                Argus Workflow Simulation
              </span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-stone-100">
            <span className="text-xs text-stone-600 font-sans">
              Each module includes live case file reviews and recruiter-approved capstone dossiers.
            </span>

            <Link
              to="/courses"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#005B4F] hover:bg-[#00473E] text-white text-xs font-bold tracking-wide transition-colors shadow-xs cursor-pointer"
            >
              <span>Access Phased Development Curriculum</span>
              <ArrowRight className="h-3.5 w-3.5 text-emerald-300" />
            </Link>
          </div>
        </section>

        {/* ── LAYER 07: OCCUPATIONAL ALIGNMENT ─────────────────────────── */}
        <section className="bg-white tone-light card-light rounded-3xl border border-stone-200/90 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="max-w-2xl">
            <span className="font-mono text-xs font-bold text-[#005B4F] uppercase tracking-wider">
              Occupational Alignment
            </span>
            <h2 className="text-2xl font-serif font-bold text-[#0B1325] mt-1">
              What this result means for your career
            </h2>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed mt-2 font-sans">
              Your assessed capabilities show strong alignment with structured pharmacovigilance case-processing workflows across Tier-1 CROs and pharmaceutical safety departments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Demonstrated */}
            <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 space-y-3">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-950 block">
                AREAS YOU CURRENTLY DEMONSTRATE
              </span>
              <div className="space-y-2.5 text-xs text-stone-800">
                {sortedCompetencies
                  .filter((c) => c.score >= 70)
                  .map((c) => (
                    <div key={c.key} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                      <span className="font-semibold">{c.name}</span>
                      <span className="font-mono text-stone-500 ml-auto font-bold">
                        {c.score}/100
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Areas to strengthen */}
            <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200/80 space-y-3">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-950 block">
                AREAS TO STRENGTHEN
              </span>
              <div className="space-y-2.5 text-xs text-stone-800">
                {sortedCompetencies
                  .filter((c) => c.score < 70)
                  .map((c) => (
                    <div key={c.key} className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-amber-600 shrink-0" />
                      <span className="font-semibold">{c.name}</span>
                      <span className="font-mono text-stone-500 ml-auto font-bold">
                        {c.score}/100
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── LAYER 08: OFFICIAL CREDENTIAL CARD & PUBLIC VERIFICATION ─── */}
        <section className="bg-white tone-light card-light rounded-3xl border border-stone-200/90 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <div>
              <span className="font-mono text-xs font-bold text-[#005B4F] uppercase tracking-wider">
                Official Credential Ledger
              </span>
              <h2 className="text-2xl font-serif font-bold text-[#0B1325] mt-1">
                Your ACRI Credential Dossier
              </h2>
            </div>
            <span className="text-xs font-mono text-stone-500">
              LEDGER ID: <strong className="text-stone-800">{credentialId}</strong>
            </span>
          </div>

          <div className="pt-2">
            <AcriOfficialCertificate
              candidateName={candidateName}
              candidateQualification={candidateQualification}
              candidateCollege={candidateCollege}
              score={score}
              readinessLevel={status.label}
              credentialId={credentialId}
              assessmentDate={assessmentDate}
              trackName="Pharmacovigilance Associate"
            />
          </div>

          {/* Credential Action Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#FAF9F6] border border-stone-200">
            <div className="space-y-0.5">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#005B4F] flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                <span>OFFICIAL VERIFIED CREDENTIAL ISSUED</span>
              </span>
              <p className="font-sans text-xs text-stone-600">
                Archival landscape credential formatted at 1.414:1 ratio for recruitment portfolios and LinkedIn certification licenses.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={handleDownloadPdf}
                disabled={isDownloadingPdf}
                className="px-4 py-2.5 rounded-xl bg-[#0B1325] hover:bg-[#1B3F8B] text-white font-mono text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 transition-all shadow-sm cursor-pointer disabled:opacity-50"
              >
                <Download className="h-3.5 w-3.5 text-emerald-400" />
                <span>DOWNLOAD 300-DPI PDF</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadPng}
                className="px-4 py-2.5 rounded-xl border border-stone-300 bg-white tone-light hover:bg-stone-50 text-stone-800 font-mono text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 transition-all cursor-pointer"
              >
                <Share2 className="h-3.5 w-3.5 text-stone-500" />
                <span>EXPORT PNG</span>
              </button>

              <Link
                to="/verify"
                search={{ id: credentialId }}
                className="px-3 py-2.5 rounded-xl border border-stone-200 bg-white tone-light hover:bg-stone-50 text-stone-700 font-mono text-xs font-medium inline-flex items-center gap-1.5 transition-all"
              >
                <ShieldCheck className="h-3.5 w-3.5 text-[#005B4F]" />
                <span>Ledger Proof</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── LAYER 09: SOCIAL PROOF & PROFESSIONAL SHARING ───────────── */}
        <section
          id="share-section"
          className="bg-white tone-light card-light rounded-3xl border border-stone-200/90 shadow-sm p-6 sm:p-8 space-y-6"
        >
          <div className="max-w-2xl">
            <span className="font-mono text-xs font-bold text-[#005B4F] uppercase tracking-wider">
              Social Proof &amp; Professional Recognition
            </span>
            <h2 className="text-2xl font-serif font-bold text-[#0B1325] mt-1">
              Share Your ACRI Pharmacovigilance Standing
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 font-sans">
              Stand out to life science recruiters and CRO hiring teams by publishing your verified occupational readiness report.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* LinkedIn */}
            <button
              type="button"
              onClick={handleShareLinkedIn}
              className="py-3 px-4 rounded-xl bg-[#0A66C2] hover:bg-[#084e96] text-white font-sans text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-2xs cursor-pointer"
            >
              <Linkedin className="h-4 w-4" />
              <span>Share on LinkedIn</span>
            </button>

            {/* WhatsApp */}
            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#1fb858] text-white font-sans text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-2xs cursor-pointer"
            >
              <Share2 className="h-4 w-4" />
              <span>Share on WhatsApp</span>
            </button>

            {/* Copy Link */}
            <button
              type="button"
              onClick={handleCopyLink}
              className="py-3 px-4 rounded-xl bg-white tone-light card-light hover:bg-stone-50 border border-stone-300 text-stone-800 font-sans text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              {copiedLink ? (
                <>
                  <Check className="h-4 w-4 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">Link Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 text-stone-600" />
                  <span>Copy Verified Link</span>
                </>
              )}
            </button>

            {/* View Leaderboard */}
            <Link
              to="/acri/leaderboard"
              className="py-3 px-4 rounded-xl bg-[#FAF8F5] hover:bg-stone-100 border border-stone-200 text-stone-800 font-sans text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <Trophy className="h-4 w-4 text-amber-500" />
              <span>View Leaderboard</span>
            </Link>
          </div>
        </section>
      </main>

      {/* ── MOBILE FLOATING ACTION DOCK (< md) ────────────────────────── */}
      {showStickyDock && (
        <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-white/95 backdrop-blur-md border-t border-stone-200 p-3 shadow-lg flex items-center justify-between gap-3 animate-in slide-in-from-bottom duration-200">
          <div className="flex items-center gap-2 min-w-0">
            <div className="h-8 w-8 rounded-full bg-[#005B4F] text-white font-serif font-black text-xs flex items-center justify-center shrink-0">
              {score}
            </div>
            <div className="truncate">
              <div className="text-[10px] font-mono font-bold text-stone-500 uppercase">
                ACRI STATUS
              </div>
              <div className="text-xs font-bold text-[#0B1325] truncate">
                {status.label}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="p-2 rounded-lg bg-[#25D366] text-white"
              title="Share on WhatsApp"
            >
              <Share2 className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("share-section")}
              className="px-3 py-1.5 rounded-lg bg-[#005B4F] text-white text-xs font-bold"
            >
              Share Card
            </button>
          </div>
        </div>
      )}

      {/* ── INTERACTIVE COMPETENCY EXPLORATION MODAL ─────────────────── */}
      <AcriCompetencyDetailModal
        competency={activeCompetencyDetail}
        isOpen={Boolean(activeCompetencyDetail)}
        onClose={() => setSelectedCompetencyKey(null)}
      />
    </div>
  );
}
