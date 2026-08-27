import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ShieldCheck, Award, Share2, Download, CheckCircle2, QrCode } from "lucide-react";

interface ShareableAcriCardProps {
  candidateName?: string;
  acriScore?: number;
  tierLabel?: string;
  verificationId?: string;
  className?: string;
}

export function ShareableAcriCard({
  candidateName = "Rahul Sharma",
  acriScore = 92,
  tierLabel = "Executive VIP Direct Manager Delivery",
  verificationId = "ENT-VC-2026-10231X",
  className = "",
}: ShareableAcriCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== "undefined"
    ? `${window.location.origin}/verify?id=${verificationId}`
    : `https://arzon.global/verify?id=${verificationId}`;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={`rounded-3xl border border-slate-700 bg-gradient-to-br from-[#0F172A] via-[#0B132B] to-[#1E293B] p-6 sm:p-8 shadow-2xl text-slate-100 space-y-6 ${className}`}>
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400">
            <Award className="h-4 w-4" />
          </div>
          <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
            Arzon Authenticated Credential
          </span>
        </div>
        <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
          VERIFIED
        </span>
      </div>

      {/* Main Card Graphic */}
      <div className="rounded-2xl border border-slate-700 bg-slate-900/90 p-6 space-y-4 shadow-xl">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[11px] font-mono text-slate-400 uppercase">Certified Graduate</span>
            <h3 className="font-serif text-2xl font-bold text-white tracking-tight">{candidateName}</h3>
            <p className="text-xs text-blue-400 font-mono mt-0.5">{tierLabel}</p>
          </div>

          <div className="text-right">
            <span className="font-serif text-3xl font-bold text-emerald-400">{acriScore}</span>
            <span className="block text-[10px] font-mono text-slate-400">/ 100 ACRI</span>
          </div>
        </div>

        {/* Verification Code Box */}
        <div className="p-3 rounded-xl border border-slate-800 bg-slate-950 flex items-center justify-between text-xs font-mono">
          <div>
            <span className="text-slate-500 block text-[10px]">Verification ID</span>
            <span className="text-slate-200 font-bold">{verificationId}</span>
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <QrCode className="h-6 w-6 text-blue-400" />
          </div>
        </div>
      </div>

      {/* Share Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <button
          onClick={handleShare}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 text-xs font-bold font-sans transition-all"
        >
          <Share2 className="h-4 w-4" /> {copied ? "Verification Link Copied!" : "Share Badge on LinkedIn / WhatsApp"}
        </button>

        <a
          href={shareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2.5 text-xs font-semibold transition-all"
        >
          <ShieldCheck className="h-4 w-4 text-emerald-400" /> Public Verification Page
        </a>
      </div>
    </div>
  );
}
