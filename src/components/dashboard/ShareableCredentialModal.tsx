import * as React from "react";
import { useState } from "react";
import {
  Share2,
  Check,
  Copy,
  ExternalLink,
  Linkedin,
  Twitter,
  Award,
  Sparkles,
  ShieldCheck,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export interface ShareableCredentialModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidateName?: string;
  acriScore?: number;
  badgeTitle?: string;
}

export function ShareableCredentialModal({
  isOpen,
  onClose,
  candidateName = "Candidate",
  acriScore = 88,
  badgeTitle = "Verified Medical Coding Specialist",
}: ShareableCredentialModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const shareUrl = typeof window !== "undefined" ? window.location.origin + "/verify" : "https://arzon.careers/verify";
  const postText = `I am proud to share that I've achieved a verified ACRI score of ${acriScore}/100 on Arzon Global (${badgeTitle})! 🚀 Check out my verified credential & skill breakdown: ${shareUrl}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast.success("Credential verification link copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLinkedInShare = () => {
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      shareUrl,
    )}&summary=${encodeURIComponent(postText)}`;
    window.open(linkedinUrl, "_blank", "noopener,noreferrer");
  };

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(postText)}`;
    window.open(twitterUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md">
      <div className="relative w-full max-w-lg rounded-2xl border border-white/15 bg-[#070C18] p-6 text-slate-200 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-teal-400" />
            <h3 className="text-base font-bold text-white">Share Verified Credential</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Visual OG Credential Preview Card */}
        <div className="relative overflow-hidden rounded-xl border border-teal-500/30 bg-gradient-to-br from-teal-900/40 via-slate-900 to-blue-950/60 p-6 space-y-4 shadow-xl">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <Award className="h-6 w-6 text-amber-400" />
              <span className="font-mono text-xs font-bold text-teal-300 uppercase tracking-widest">
                Official Credential
              </span>
            </div>
            <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 font-mono text-[10px] font-bold text-emerald-300 border border-emerald-500/30">
              Verified ACRI {acriScore}
            </span>
          </div>

          <div>
            <h4 className="text-lg font-extrabold text-white">{badgeTitle}</h4>
            <p className="text-xs text-slate-300 mt-1">Issued to <strong className="text-white">{candidateName}</strong></p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[11px] font-mono text-slate-400">
            <span>Arzon Career Engine</span>
            <span>Audited & Signed</span>
          </div>
        </div>

        {/* Post Text Preview */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-300">Shareable Post Copy:</label>
          <div className="rounded-lg bg-black/50 p-3 text-xs text-slate-300 font-mono leading-relaxed border border-white/5">
            {postText}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-3">
          <button
            type="button"
            onClick={handleLinkedInShare}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#0A66C2] py-3 text-xs font-bold text-white hover:bg-[#084e96] transition-colors shadow-lg"
          >
            <Linkedin className="h-4 w-4" />
            LinkedIn
          </button>
          <button
            type="button"
            onClick={handleTwitterShare}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#1DA1F2] py-3 text-xs font-bold text-white hover:bg-[#0c85d0] transition-colors shadow-lg"
          >
            <Twitter className="h-4 w-4" />
            Twitter / X
          </button>
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 py-3 text-xs font-bold text-white hover:bg-white/10 transition-colors"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copied!" : "Copy Link"}
          </button>
        </div>
      </div>
    </div>
  );
}
