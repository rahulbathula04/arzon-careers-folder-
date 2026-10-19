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
    <section className="rounded-3xl border border-slate-200/80 bg-white tone-light card-light p-6 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.02),0_10px_30px_-5px_rgba(7,26,74,0.04),inset_0_1px_0_rgba(255,255,255,0.9)]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-2xl border border-blue-200/60 bg-gradient-to-br from-blue-50 to-indigo-50/60 text-blue-600 shadow-xs">
            <Gift className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-blue-600 font-bold block">
              PEER REFERRAL REWARD · VERIFIED UNLOCK
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#081F38]">
              Unlock the 2026 Career Intelligence Vault
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isUnlocked ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 font-mono text-[11px] font-bold text-emerald-700 border border-emerald-200/80 shadow-2xs">
              <Unlock className="h-3.5 w-3.5" />
              <span>UNLOCKED</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 font-mono text-[11px] font-bold text-amber-700 border border-amber-200/80 shadow-2xs">
              <Lock className="h-3.5 w-3.5" />
              <span>LOCKED · 2 Referrals Required</span>
            </span>
          )}
        </div>
      </div>

      <div className="mt-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-xl">
          <p className="text-sm text-slate-500 leading-relaxed font-sans">
            Invite two classmates to complete the free Career Assessment. Progress updates only after Arzon saves their completed result.
          </p>

          {isLoading ? (
            <p className="mt-3 text-xs font-medium text-slate-400">Creating your unique referral link and checking completions…</p>
          ) : loadError || !referralCode ? (
            <p className="mt-3 text-xs font-medium text-amber-800">
              We could not verify a saved result for referral tracking. Refresh this report after reconnecting to try again.
            </p>
          ) : (
            <>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-2 w-48 rounded-full bg-slate-100 overflow-hidden border border-slate-200/60 shadow-inner" aria-label="Referral progress">
                  <div
                    className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-500 rounded-full"
                    style={{ width: `${Math.min(100, (completedCount / 2) * 100)}%` }}
                  />
                </div>
                <span aria-live="polite" className="text-xs font-mono font-bold text-[#081F38]">
                  {completedCount} of 2 completed
                </span>
              </div>
              {startedCount > completedCount && (
                <p className="mt-2 text-xs text-slate-400 font-sans">
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
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-700 px-6 py-3 text-xs sm:text-sm font-semibold text-white shadow-xs active:scale-[0.98] transition-all duration-150 cursor-pointer w-full md:w-auto"
            >
              <Download className="h-4 w-4" />
              <span>Access Master Vault</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onShareClick}
              disabled={!referralCode || isLoading || loadError}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#081F38] hover:bg-slate-900 px-6 py-3 text-xs sm:text-sm font-semibold tracking-wide text-white shadow-[0_1px_2px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.15)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-150 cursor-pointer w-full md:w-auto"
            >
              <Users className="h-4 w-4" />
              <span>{isLoading ? "Preparing link…" : "Invite Classmates"}</span>
            </button>
          )}
        </div>
      </div>

      {isUnlocked && (
        <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-emerald-800">
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          <span>Your two completed referrals are confirmed by Arzon.</span>
        </div>
      )}
    </section>
  );
}
