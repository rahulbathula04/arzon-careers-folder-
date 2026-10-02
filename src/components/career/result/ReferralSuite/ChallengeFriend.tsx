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
    <section className="rounded-3xl border border-[#D0E1FD] bg-[#EEF6FF]/50 p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D0E1FD] pb-5">
        <div className="flex items-center gap-2.5">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-[#1557D6] text-white">
            <Users className="h-4 w-4" />
          </div>
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#1557D6] font-bold">
              PEER COMPARISON CHALLENGE
            </span>
            <h2 className="font-serif text-2xl font-bold text-[#071A4A]">
              Think your friend has a different Career Identity?
            </h2>
          </div>
        </div>

        <span className="text-xs font-mono font-semibold text-[#1557D6] bg-white tone-light px-3 py-1 rounded-full border border-[#D0E1FD]">
          Side-by-Side Comparison
        </span>
      </div>

      <p className="mt-3 text-sm text-[#3F4A60] leading-relaxed max-w-2xl">
        Every pharmacy and life-science student has different natural strengths. Challenge your batchmate or friend to take the assessment, compare your capability radar, and see where each of you belongs in the clinical industry.
      </p>

      {/* Side-by-Side Comparison Preview Cards */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {/* Your Profile Card */}
        <div className="rounded-2xl border border-[#D0E1FD] bg-white tone-light card-light p-5 shadow-2xs">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#1557D6] font-bold block">
            YOUR RESULT
          </span>
          <div className="mt-2 flex items-center justify-between">
            <h3 className="font-serif text-lg font-bold text-[#071A4A]">
              {roleName}
            </h3>
            <span className="rounded-full bg-[#EEF6FF] px-2.5 py-0.5 text-xs font-bold text-[#1557D6]">
              {fitScore}% Fit
            </span>
          </div>
          <p className="mt-2 text-xs text-[#69758A]">
            {result.archetype?.tagline ?? "Your established clinical identity."}
          </p>
        </div>

        {/* Mystery Friend Challenge Card */}
        <div className="rounded-2xl border border-dashed border-[#1557D6]/40 bg-[#FAFBFD] p-5 text-center flex flex-col items-center justify-center">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#69758A] font-bold block">
            CHALLENGE A FRIEND
          </span>
          <h3 className="mt-1 font-serif text-lg font-bold text-[#071A4A]">
            What's Their Identity?
          </h3>
          <p className="mt-1 text-xs text-[#69758A] max-w-xs">
            Send your challenge link. Once they complete the diagnostic, your comparison unlocks.
          </p>
        </div>
      </div>

      {/* Action Row */}
      <div className="mt-6 pt-5 border-t border-[#D0E1FD] flex flex-wrap items-center gap-3">
        <a
          href={whatsAppChallengeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-[#1EBE5D] transition-all"
        >
          <MessageCircle className="h-4 w-4" />
          <span>Challenge on WhatsApp</span>
        </a>

        <button
          type="button"
          onClick={onOpenSocialModal}
          className="inline-flex items-center gap-2 rounded-full border border-[#D0E1FD] bg-white tone-light px-5 py-3 text-xs sm:text-sm font-bold text-[#071A4A] hover:bg-slate-50 transition-all"
        >
          <Share2 className="h-4 w-4 text-[#1557D6]" />
          <span>More Share Channels</span>
        </button>

        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-2 rounded-full border border-[#D0E1FD] bg-white tone-light px-4 py-3 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-all ml-auto"
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
