import { Lock, Unlock, Gift, Users, Download, CheckCircle2 } from "lucide-react";

interface Props {
  referralCode: string | null;
  startedCount: number;
  completedCount: number;
  isLoading: boolean;
  loadError: boolean;
  onShareClick: () => void;
}

export function ReferralProgress({
  referralCode,
  startedCount,
  completedCount,
  isLoading,
  loadError,
  onShareClick,
}: Props) {
  const isUnlocked = completedCount >= 2;

  const handleDownloadVault = () => {
    window.open("/field-guide", "_blank", "noopener,noreferrer");
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
            Invite two classmates to complete the free Career Assessment. Progress updates only after Arzon saves their completed result.
          </p>

          {isLoading ? (
            <p className="mt-3 text-xs font-medium text-slate-500">Creating your unique referral link and checking completions…</p>
          ) : loadError || !referralCode ? (
            <p className="mt-3 text-xs font-medium text-amber-800">
              We could not verify a saved result for referral tracking. Refresh this report after reconnecting to try again.
            </p>
          ) : (
            <>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-2.5 w-44 rounded-full bg-slate-200 overflow-hidden" aria-label="Referral progress">
                  <div
                    className="h-full bg-[#1557D6] transition-all duration-500 rounded-full"
                    style={{ width: `${Math.min(100, (completedCount / 2) * 100)}%` }}
                  />
                </div>
                <span aria-live="polite" className="text-xs font-mono font-bold text-[#071A4A]">
                  {completedCount} of 2 completed
                </span>
              </div>
              {startedCount > completedCount && (
                <p className="mt-2 text-xs text-slate-500">
                  {startedCount - completedCount} referred {startedCount - completedCount === 1 ? "assessment is" : "assessments are"} still in progress.
                </p>
              )}
            </>
          )}
        </div>

        <div className="shrink-0 w-full md:w-auto">
          {isUnlocked ? (
            <button
              type="button"
              onClick={handleDownloadVault}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-emerald-700 transition-all w-full md:w-auto"
            >
              <Download className="h-4 w-4" />
              <span>Access Master Vault</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onShareClick}
              disabled={!referralCode || isLoading || loadError}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#071A4A] px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-[#1557D6] disabled:cursor-not-allowed disabled:opacity-50 transition-all w-full md:w-auto"
            >
              <Users className="h-4 w-4" />
              <span>{isLoading ? "Preparing link…" : "Invite Classmates"}</span>
            </button>
          )}
        </div>
      </div>

      {isUnlocked && (
        <div className="mt-4 flex items-center gap-2 text-xs text-emerald-800">
          <CheckCircle2 className="h-4 w-4" />
          Your two completed referrals are confirmed by Arzon.
        </div>
      )}
    </section>
  );
}
