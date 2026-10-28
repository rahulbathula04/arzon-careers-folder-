import { useState } from "react";
import { Users, Copy, Check, MessageCircle, ArrowRight, Share2 } from "lucide-react";
import { toast } from "sonner";
import type { CareerEngineResult } from "@/data/careerEngineScoring";

interface Props {
  result: CareerEngineResult;
  candidateName?: string;
  shareUrl: string;
  onOpenSocialModal: () => void;
}

export function ChallengeFriend({
  result,
  candidateName,
  shareUrl,
  onOpenSocialModal,
}: Props) {
  const [copied, setCopied] = useState(false);
  const name = candidateName || "You";
  const roleName = result.archetype?.name ?? "Specialist";
  const fitScore = Math.round(result.fitScore);

  const handleCopy = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success("Challenge link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const whatsAppChallengeUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `I just discovered my Healthcare Career Identity on Arzon: ${roleName} (${fitScore}% Fit) 👀 Think your profile is built differently? Take the 6-minute diagnostic and compare our results:\n\n${shareUrl}`,
  )}`;

  return (
    <section className="rounded-3xl border border-blue-200/80 bg-gradient-to-br from-blue-50/60 via-indigo-50/20 to-white p-4 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.02),0_10px_30px_-5px_rgba(7,26,74,0.04),inset_0_1px_0_rgba(255,255,255,0.9)] w-full max-w-full min-w-0 overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-blue-200/60 pb-5">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[#081F38] text-white shadow-xs">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-blue-600 font-bold block">
              PEER COMPARISON CHALLENGE · 1-ON-1 BENCHMARK
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#081F38]">
              Think your friend has a different Career Identity?
            </h2>
          </div>
        </div>

        <span className="text-[11px] font-mono font-bold text-blue-700 bg-white px-3 py-1 rounded-full border border-blue-200/80 shadow-2xs">
          Side-by-Side Comparison
        </span>
      </div>

      <p className="mt-3 text-sm text-slate-500 leading-relaxed max-w-2xl font-sans">
        Every pharmacy and life-science student has different natural strengths. Challenge your batchmate or friend to take the assessment, compare your capability radar, and see where each of you belongs in the clinical industry.
      </p>

      {/* Side-by-Side Comparison Preview Cards */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {/* Your Profile Card */}
        <div className="rounded-2xl border border-blue-200/80 bg-white p-5 shadow-xs">
          <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-blue-600 font-bold block">
            YOUR RESULT
          </span>
          <div className="mt-2 flex items-center justify-between">
            <h3 className="font-serif text-lg font-bold text-[#081F38]">
              {roleName}
            </h3>
            <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-mono font-bold text-blue-700 border border-blue-200/60">
              {fitScore}% Fit
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-500 font-sans leading-relaxed">
            {result.archetype?.tagline ?? "Your established clinical identity."}
          </p>
        </div>

        {/* Mystery Friend Challenge Card */}
        <div className="rounded-2xl border border-dashed border-blue-300/80 bg-gradient-to-b from-white to-slate-50/50 p-5 text-center flex flex-col items-center justify-center shadow-2xs">
          <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-slate-400 font-bold block">
            CHALLENGE A FRIEND
          </span>
          <h3 className="mt-1 font-serif text-lg font-bold text-[#081F38]">
            What's Their Identity?
          </h3>
          <p className="mt-1 text-xs text-slate-500 max-w-xs font-sans leading-relaxed">
            Send your challenge link. Once they complete the diagnostic, your comparison unlocks.
          </p>
        </div>
      </div>

      {/* Action Row */}
      <div className="mt-6 pt-5 border-t border-blue-200/60 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <a
          href={whatsAppChallengeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] px-5 py-3 text-xs sm:text-sm font-semibold text-white shadow-xs active:scale-[0.98] transition-all duration-150 cursor-pointer w-full sm:w-auto"
        >
          <MessageCircle className="h-4 w-4" />
          <span>Challenge on WhatsApp</span>
        </a>

        <button
          type="button"
          onClick={onOpenSocialModal}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-slate-200/80 bg-white hover:bg-slate-50 px-5 py-3 text-xs sm:text-sm font-semibold text-[#081F38] shadow-2xs active:scale-[0.98] transition-all duration-150 cursor-pointer w-full sm:w-auto"
        >
          <Share2 className="h-4 w-4 text-blue-600" />
          <span>More Share Channels</span>
        </button>

        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-slate-200/80 bg-white hover:bg-slate-50 px-4 py-3 text-xs font-semibold text-slate-700 shadow-2xs active:scale-[0.98] transition-all duration-150 cursor-pointer w-full sm:w-auto sm:ml-auto"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-600" />
              <span>Link Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5 text-slate-500" />
              <span>Copy Challenge Link</span>
            </>
          )}
        </button>
      </div>
    </section>
  );
}
