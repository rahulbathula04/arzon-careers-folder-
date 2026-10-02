import { useState, useEffect } from "react";
import { Lock, Unlock, Gift, Users, Download, ArrowRight, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface Props {
  leadId?: string | null;
  onShareClick: () => void;
}

export function ReferralProgress({ leadId, onShareClick }: Props) {
  // Read local referral milestone state if present
  const [invitedCount, setInvitedCount] = useState<number>(() => {
    if (typeof window === "undefined") return 0;
    try {
      const saved = localStorage.getItem(`arz_refs_${leadId || "default"}`);
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  const isUnlocked = invitedCount >= 2;

  const handleDownloadVault = () => {
    toast.success("Opening 2026 Healthcare Career Intelligence Vault...");
    window.open("/field-guide", "_blank");
  };

  return (
    <section className="rounded-3xl border border-[#E4EAF2] bg-[#FAFBFD] p-6 sm:p-8 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E4EAF2] pb-5">
        <div className="flex items-center gap-2.5">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-[#EEF6FF] text-[#1557D6]">
            <Gift className="h-4 w-4" />
          </div>
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#1557D6] font-bold">
              PEER REFERRAL REWARD
            </span>
            <h3 className="font-serif text-xl font-bold text-[#071A4A]">
              Unlock the 2026 Career Intelligence Vault
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isUnlocked ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
              <Unlock className="h-3.5 w-3.5" />
              <span>UNLOCKED</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700 border border-amber-200">
              <Lock className="h-3.5 w-3.5" />
              <span>LOCKED · 2 Referrals Required</span>
            </span>
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-xl">
          <p className="text-sm text-[#3F4A60] leading-relaxed">
            Invite 2 classmates or peers from your pharmacy/life-science batch to discover their Career Identity. When they complete the 6-minute diagnostic, you immediately unlock our proprietary **48-Page Clinical Careers & Salary Negotiation Master Dossier (2026 Edition)**.
          </p>

          <div className="mt-4 flex items-center gap-3">
            {/* Progress indicator */}
            <div className="h-2.5 w-44 rounded-full bg-slate-200 overflow-hidden">
              <div
                className="h-full bg-[#1557D6] transition-all duration-500 rounded-full"
                style={{ width: `${Math.min(100, (invitedCount / 2) * 100)}%` }}
              />
            </div>
            <span className="text-xs font-mono font-bold text-[#071A4A]">
              {invitedCount} of 2 Completed
            </span>
          </div>
        </div>

        <div className="shrink-0">
          {isUnlocked ? (
            <button
              type="button"
              onClick={handleDownloadVault}
              className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-emerald-700 transition-all"
            >
              <Download className="h-4 w-4" />
              <span>Access Master Vault</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onShareClick}
              className="inline-flex items-center gap-2 rounded-full bg-[#071A4A] px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-[#1557D6] transition-all"
            >
              <Users className="h-4 w-4" />
              <span>Invite Classmates</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
