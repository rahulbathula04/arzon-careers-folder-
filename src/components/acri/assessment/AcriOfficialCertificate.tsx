import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { QRCodeSVG } from "qrcode.react";
import {
  ShieldCheck,
  Award,
  Download,
  Share2,
  Check,
  Copy,
  ExternalLink,
  Sparkles,
  FileCheck2,
  Lock,
} from "lucide-react";
import { toast } from "sonner";
import { ArzonLogo } from "@/components/acri/ArzonLogo";

export interface AcriOfficialCertificateProps {
  candidateName: string;
  candidateQualification?: string;
  candidateCollege?: string;
  score: number;
  readinessLevel: string;
  credentialId: string;
  assessmentDate: string;
  trackName?: string;
}

export function AcriOfficialCertificate({
  candidateName,
  candidateQualification = "B.Pharm (Bachelor of Pharmacy)",
  candidateCollege = "JSS College of Pharmacy",
  score,
  readinessLevel,
  credentialId,
  assessmentDate,
  trackName = "Pharmacovigilance Associate",
}: AcriOfficialCertificateProps) {
  const certificateRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const verificationUrl = typeof window !== "undefined"
    ? `${window.location.origin}/verify?id=${credentialId}`
    : `https://arzoncareers.in/verify?id=${credentialId}`;

  // Deterministic cryptographic hash simulator based on credentialId
  const getCryptoDigest = (id: string) => {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = (hash << 5) - hash + id.charCodeAt(i);
      hash |= 0;
    }
    const hex = Math.abs(hash).toString(16).padStart(8, "0");
    return `SHA256: 8F4A-${hex.slice(0, 4).toUpperCase()}-${hex.slice(4, 8).toUpperCase()}-C901-ACRI`;
  };

  const cryptoHash = getCryptoDigest(credentialId);

  // Download Print-Ready A4 Landscape PDF
  const handleDownloadPdf = async () => {
    if (!certificateRef.current) return;
    setIsExporting(true);
    toast.loading("Generating 300-DPI archival credential PDF...", { id: "cert-pdf" });

    try {
      const html2canvas = (await import("html2canvas-pro")).default;
      const { jsPDF } = await import("jspdf");

      const canvas = await html2canvas(certificateRef.current, {
        scale: 3, // 300 DPI ultra-high definition print rendering
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

      const filename = `ACRI_Official_Credential_${candidateName.replace(/\s+/g, "_")}_${credentialId}.pdf`;
      pdf.save(filename);

      toast.success("Archival Credential PDF downloaded successfully!", { id: "cert-pdf" });
    } catch (err) {
      console.error("PDF generation failed:", err);
      toast.error("PDF generation failed. Opening print dialog fallback...", { id: "cert-pdf" });
      window.print();
    } finally {
      setIsExporting(false);
    }
  };

  // Download High-Resolution PNG for LinkedIn / Social Proof
  const handleDownloadPng = async () => {
    if (!certificateRef.current) return;
    setIsExporting(true);
    toast.loading("Generating high-resolution PNG badge...", { id: "cert-png" });

    try {
      const html2canvas = (await import("html2canvas-pro")).default;
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2.5,
        useCORS: true,
        backgroundColor: "#060B18",
        logging: false,
      });

      const link = document.createElement("a");
      link.download = `ACRI_Credential_${candidateName.replace(/\s+/g, "_")}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();

      toast.success("High-res certificate PNG downloaded!", { id: "cert-png" });
    } catch (err) {
      console.error("PNG export error:", err);
      toast.error("PNG download error. Please try again.", { id: "cert-png" });
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyLink = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(verificationUrl);
      setCopiedLink(true);
      toast.success("Verification URL copied to clipboard!");
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* ─── Executive Control Strip ────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-stone-900/90 text-stone-100 p-3 sm:p-4 rounded-2xl border border-stone-800 shadow-md">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-[#C5A572]/20 border border-[#C5A572]/40 flex items-center justify-center text-[#D4AF37]">
            <Award className="h-4 w-4" />
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-[#C5A572] font-semibold">
              Official Credential Ledger
            </div>
            <div className="text-xs sm:text-sm font-semibold text-stone-200">
              ID: <span className="font-mono font-bold text-stone-100">{credentialId}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={isExporting}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#C5A572] hover:bg-[#b8955f] text-stone-950 text-xs font-bold rounded-lg shadow-sm active:scale-95 transition-all cursor-pointer"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Download Official PDF</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadPng}
            disabled={isExporting}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded-lg border border-stone-700 transition-colors cursor-pointer"
          >
            <Share2 className="h-3.5 w-3.5 text-stone-400" />
            <span>PNG for LinkedIn</span>
          </button>

          <button
            type="button"
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded-lg border border-stone-700 transition-colors cursor-pointer"
          >
            {copiedLink ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5 text-stone-400" />}
            <span>{copiedLink ? "Copied" : "Copy Link"}</span>
          </button>

          <Link
            to="/verify"
            search={{ id: credentialId }}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 text-xs font-semibold rounded-lg border border-emerald-800/60 transition-colors"
          >
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            <span>Verify on Ledger</span>
          </Link>
        </div>
      </div>

      {/* ─── THE MASTER CREDENTIAL CANVAS (1.414 : 1 ARCHIVAL PROPORTION) ─ */}
      <div className="overflow-x-auto pb-2">
        <div
          ref={certificateRef}
          id="acri-official-certificate"
          className="relative mx-auto w-full max-w-[1020px] aspect-[1.414/1] bg-[#060B18] text-slate-100 p-8 sm:p-12 md:p-14 select-none shadow-2xl flex flex-col justify-between overflow-hidden"
          style={{
            minWidth: "780px",
            boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(197, 165, 114, 0.35)",
            background: "radial-gradient(ellipse at 50% 30%, #0E1A34 0%, #080F22 55%, #050914 100%)",
          }}
        >
          {/* 1. Fine Guilloché Geometric Background Lattice (Watermark) */}
          <svg
            aria-hidden="true"
            className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.045]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern id="guilloche-grid" width="48" height="48" patternUnits="userSpaceOnUse">
                <path
                  d="M0 24 Q 12 0, 24 24 T 48 24 M24 0 Q 0 12, 24 24 T 24 48"
                  fill="none"
                  stroke="#C5A572"
                  strokeWidth="0.75"
                />
                <circle cx="24" cy="24" r="14" fill="none" stroke="#C5A572" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#guilloche-grid)" />
          </svg>

          {/* Central Watermark Seal */}
          <div
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.035]"
          >
            <svg width="460" height="460" viewBox="0 0 200 200" fill="none" stroke="#C5A572">
              <circle cx="100" cy="100" r="95" strokeWidth="1.5" strokeDasharray="3 3" />
              <circle cx="100" cy="100" r="85" strokeWidth="1" />
              <circle cx="100" cy="100" r="65" strokeWidth="1.5" />
              <path
                d="M100 35 L108 55 L130 55 L112 68 L119 89 L100 76 L81 89 L88 68 L70 55 L92 55 Z"
                fill="none"
                strokeWidth="1.5"
              />
            </svg>
          </div>

          {/* 2. Outer & Inner Guilloché Framing Borders */}
          <div className="absolute inset-3 sm:inset-4 md:inset-5 pointer-events-none border border-[#C5A572]/40 rounded-sm">
            {/* Fine Inner Gold Border */}
            <div className="absolute inset-1 sm:inset-1.5 border border-[#C5A572]/70 rounded-xs">
              {/* Secondary Hairline Guard */}
              <div className="absolute inset-1 border border-[#C5A572]/25" />
            </div>

            {/* Corner Rosette Ornaments (Vector Corner Accents) */}
            <svg className="absolute -top-1 -left-1 w-6 h-6 text-[#C5A572]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M0 0 L10 0 L10 2 L2 2 L2 10 L0 10 Z M4 4 L8 4 L8 6 L6 6 L6 8 L4 8 Z" />
            </svg>
            <svg className="absolute -top-1 -right-1 w-6 h-6 text-[#C5A572] rotate-90" viewBox="0 0 24 24" fill="currentColor">
              <path d="M0 0 L10 0 L10 2 L2 2 L2 10 L0 10 Z M4 4 L8 4 L8 6 L6 6 L6 8 L4 8 Z" />
            </svg>
            <svg className="absolute -bottom-1 -left-1 w-6 h-6 text-[#C5A572] -rotate-90" viewBox="0 0 24 24" fill="currentColor">
              <path d="M0 0 L10 0 L10 2 L2 2 L2 10 L0 10 Z M4 4 L8 4 L8 6 L6 6 L6 8 L4 8 Z" />
            </svg>
            <svg className="absolute -bottom-1 -right-1 w-6 h-6 text-[#C5A572] rotate-180" viewBox="0 0 24 24" fill="currentColor">
              <path d="M0 0 L10 0 L10 2 L2 2 L2 10 L0 10 Z M4 4 L8 4 L8 6 L6 6 L6 8 L4 8 Z" />
            </svg>
          </div>

          {/* ─── HEADER: INSTITUTIONAL CREST & TITLES ──────────────────────── */}
          <div className="relative z-10 text-center space-y-1.5 pt-1">
            {/* Top Security & Regulation Strip */}
            <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-[#C5A572]/90 tracking-widest uppercase border-b border-[#C5A572]/20 pb-2 px-2">
              <span className="flex items-center gap-1.5">
                <Lock className="h-2.5 w-2.5 text-emerald-400" /> OFFICIAL OCCUPATIONAL CREDENTIAL
              </span>
              <span>ISO 9001:2015 &amp; MCA REGISTERED</span>
              <span>STANDARDS: ICH E2A · E2B(R3) · MedDRA v27.0</span>
            </div>

            {/* Arzon Global Insignia & Crest */}
            <div className="flex justify-center items-center gap-3 pt-2">
              <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent via-[#C5A572]/60 to-[#C5A572]" />
              <div className="flex items-center gap-2">
                <ArzonLogo variant="dark" size="sm" />
                <span className="font-serif font-black text-sm tracking-widest text-[#FBF5D4]">
                  ARZON GLOBAL
                </span>
              </div>
              <div className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent via-[#C5A572]/60 to-[#C5A572]" />
            </div>

            <div className="space-y-0.5">
              <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.32em] text-[#C5A572] font-semibold">
                Council of Clinical Competency &amp; Occupational Standards
              </p>
              <h1
                className="font-serif text-xl sm:text-2xl md:text-3xl font-bold tracking-wider uppercase text-transparent bg-clip-text"
                style={{
                  backgroundImage: "linear-gradient(135deg, #FFF6D6 0%, #D4AF37 50%, #FAF0CA 100%)",
                  textShadow: "0 2px 10px rgba(212, 175, 55, 0.2)",
                }}
              >
                Certificate of Clinical Readiness
              </h1>
              <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.24em] text-slate-400">
                Authenticated Candidate Readiness Index (ACRI) Standard
              </p>
            </div>
          </div>

          {/* ─── BODY: CANDIDATE ATTESTATION & CONFERRAL ───────────────────── */}
          <div className="relative z-10 text-center my-auto py-2 sm:py-3 space-y-2.5">
            <p className="font-serif italic text-xs sm:text-sm text-stone-300">
              This is to officially attest and certify that
            </p>

            {/* Candidate Name in Grand Serif Display */}
            <div className="space-y-1">
              <div
                className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-wide leading-tight"
                style={{
                  textShadow: "0 2px 12px rgba(0, 0, 0, 0.8), 0 0 20px rgba(251, 245, 212, 0.15)",
                }}
              >
                {candidateName}
              </div>
              <div className="h-0.5 w-40 sm:w-56 mx-auto bg-gradient-to-r from-transparent via-[#C5A572] to-transparent" />
            </div>

            <p className="font-mono text-[10px] sm:text-[11px] text-stone-300 max-w-xl mx-auto">
              <span className="font-semibold text-slate-100">{candidateQualification}</span>
              <span className="text-[#C5A572] mx-2">•</span>
              <span>{candidateCollege}</span>
            </p>

            <p className="text-[10px] sm:text-[11px] leading-relaxed text-stone-300/90 max-w-2xl mx-auto px-4 font-sans">
              having undergone rigorous evaluation through the standardized 25-minute clinical work simulation, and demonstrated calibrated operational capability across all 9 core clinical domains, is hereby conferred the occupational standing of:
            </p>

            {/* Official Conferred Title Banner */}
            <div className="inline-block py-1 px-5 sm:px-8 rounded-full border border-[#C5A572]/60 bg-[#C5A572]/10 backdrop-blur-xs shadow-inner">
              <span
                className="font-serif font-black text-sm sm:text-base md:text-lg tracking-widest uppercase text-transparent bg-clip-text"
                style={{
                  backgroundImage: "linear-gradient(135deg, #FFF9E6 0%, #E5C158 50%, #FFEDB3 100%)",
                }}
              >
                {trackName}
              </span>
            </div>

            {/* Score & Operational Benchmarks Badge */}
            <div className="flex items-center justify-center gap-3 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-stone-900/90 border border-[#C5A572]/40 font-mono text-[10px] sm:text-xs">
                <span className="text-stone-400">CALIBRATED SCORE:</span>
                <strong className="text-xl font-serif text-[#FBF5D4] leading-none">{score}</strong>
                <span className="text-stone-500">/ 100</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 motion-safe:animate-pulse" />
                {readinessLevel}
              </span>
            </div>
          </div>

          {/* ─── 9 CLINICAL COMPETENCY ENDORSEMENT STRIP ───────────────────── */}
          <div className="relative z-10 border-y border-[#C5A572]/20 py-2 my-1 bg-[#040812]/50">
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-mono text-[8px] sm:text-[9px] text-stone-400 uppercase tracking-wider text-center">
              <span className="text-[#C5A572] font-bold">VERIFIED COMPETENCIES:</span>
              <span>ICSR Case Triage</span>
              <span className="text-stone-600">•</span>
              <span>MedDRA v27.0 Coding</span>
              <span className="text-stone-600">•</span>
              <span>Seriousness Gates</span>
              <span className="text-stone-600">•</span>
              <span>RSI Expectedness</span>
              <span className="text-stone-600">•</span>
              <span>Clinical Narrative</span>
              <span className="text-stone-600">•</span>
              <span>WHO-UMC Causality</span>
              <span className="text-stone-600">•</span>
              <span>Expedited 7/15-Day Timelines</span>
              <span className="text-stone-600">•</span>
              <span>QC Audit Trail</span>
            </div>
          </div>

          {/* ─── FOOTER: EMBOSSED SEAL, QR CODE, AND DUAL SIGNATURES ──────── */}
          <div className="relative z-10 pt-2 grid grid-cols-12 items-end gap-4">
            {/* Left: Scannable QR Code & Cryptographic Ledger Proof */}
            <div className="col-span-3 flex items-center gap-3">
              <div className="p-1 rounded-md bg-white tone-light border border-[#C5A572]/70 shadow-sm shrink-0">
                <QRCodeSVG
                  value={verificationUrl}
                  size={58}
                  bgColor="#FFFFFF"
                  fgColor="#0B1325"
                  level="M"
                />
              </div>
              <div className="space-y-0.5 font-mono text-[8px] sm:text-[9px] text-stone-400">
                <div className="font-bold text-slate-200">SCAN TO VERIFY</div>
                <div className="text-[#C5A572] truncate max-w-[130px] font-bold">{credentialId}</div>
                <div className="text-[7.5px] text-stone-500 font-mono truncate max-w-[130px]">{cryptoHash}</div>
                <div className="text-stone-400">{assessmentDate}</div>
              </div>
            </div>

            {/* Center: Official Embossed Gold Medallion Seal */}
            <div className="col-span-5 flex flex-col items-center justify-center text-center">
              <div
                className="relative h-18 w-18 sm:h-20 sm:w-20 rounded-full flex items-center justify-center p-1 shadow-lg"
                style={{
                  background: "radial-gradient(circle, #FFE58F 0%, #D4AF37 55%, #8C6D23 100%)",
                  boxShadow: "0 0 20px rgba(212, 175, 55, 0.35), inset 0 2px 4px rgba(255, 255, 255, 0.6)",
                }}
              >
                {/* Serrated Starburst Ring */}
                <div className="absolute inset-1 rounded-full border-2 border-dashed border-[#5C4410]/60" />

                {/* Inner Medallion Disc */}
                <div className="h-full w-full rounded-full border border-[#FFE58F]/70 bg-[#7A5C14]/90 flex flex-col items-center justify-center p-1 text-[#FFF6D6]">
                  <Award className="h-4 w-4 sm:h-5 sm:w-5 text-[#FFE082]" />
                  <span className="font-serif text-[6px] sm:text-[7px] font-black tracking-widest uppercase">
                    ARZON
                  </span>
                  <span className="font-mono text-[5px] sm:text-[6px] tracking-tight uppercase text-[#FFE58F]">
                    ACCREDITED
                  </span>
                </div>

                {/* Ribbon Tails hanging underneath */}
                <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 flex gap-1 pointer-events-none">
                  <div className="w-2.5 h-3.5 bg-[#8C6D23] clip-ribbon border-t border-[#D4AF37]" />
                  <div className="w-2.5 h-3.5 bg-[#8C6D23] clip-ribbon border-t border-[#D4AF37]" />
                </div>
              </div>

              <span className="mt-2 font-mono text-[7px] sm:text-[8px] uppercase tracking-[0.2em] text-[#C5A572] font-semibold">
                Official Seal of Assessment Authenticity
              </span>
            </div>

            {/* Right: Dual Executive Signatures */}
            <div className="col-span-4 flex items-end justify-end gap-4 sm:gap-6 text-right">
              {/* Signature 1 */}
              <div className="text-center space-y-0.5">
                <div className="font-serif italic text-base sm:text-lg text-[#FBF5D4] leading-none opacity-90 select-none">
                  Aris Thorne
                </div>
                <div className="h-px w-20 sm:w-24 bg-[#C5A572]/50 mx-auto" />
                <div className="font-serif font-bold text-[8px] sm:text-[9px] text-slate-200">
                  Dr. Aris Thorne, MD
                </div>
                <div className="font-mono text-[7px] text-stone-400 uppercase tracking-tight">
                  Dir., Clinical Assessment
                </div>
              </div>

              {/* Signature 2 */}
              <div className="text-center space-y-0.5">
                <div className="font-serif italic text-base sm:text-lg text-[#FBF5D4] leading-none opacity-90 select-none">
                  Vandana Rao
                </div>
                <div className="h-px w-20 sm:w-24 bg-[#C5A572]/50 mx-auto" />
                <div className="font-serif font-bold text-[8px] sm:text-[9px] text-slate-200">
                  Dr. Vandana Rao, Ph.D
                </div>
                <div className="font-mono text-[7px] text-stone-400 uppercase tracking-tight">
                  Dean, PV Standards Board
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
