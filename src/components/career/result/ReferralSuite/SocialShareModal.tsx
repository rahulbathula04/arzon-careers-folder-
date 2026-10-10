import { useRef, useState } from "react";
import { X, MessageCircle, Linkedin, Instagram, Copy, Check, Download, Share2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { track } from "@/lib/track";
import { CareerIdentityCard } from "./CareerIdentityCard";
import type { CareerEngineResult } from "@/data/careerEngineScoring";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  result: CareerEngineResult;
  candidateName?: string;
  shareUrl: string;
  leadId?: string | null;
}

export function SocialShareModal({
  isOpen,
  onClose,
  result,
  candidateName,
  shareUrl,
  leadId,
}: Props) {
  const [activeTab, setActiveTab] = useState<"whatsapp" | "linkedin" | "instagram" | "link">("whatsapp");
  const [copied, setCopied] = useState(false);
  const [isExportingStory, setIsExportingStory] = useState(false);
  const storyCardRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const roleName = result.archetype?.name ?? "Specialist";
  const fitScore = Math.round(result.fitScore);

  // Formatted channel copy
  const whatsAppText = `I just discovered my Healthcare Career Identity on Arzon: ${roleName} (${fitScore}% Fit) 👀\n\nThink your profile is built differently? Take the 6-min diagnostic and find out:\n${shareUrl}`;

  const linkedInText = `Excited to share that I have completed the Arzon Healthcare Career Intelligence Assessment! My diagnostic mapped my profile to "${roleName}" (${fitScore}% role fit).\n\nThe assessment evaluates clinical decision rigor, protocol discipline, and operational focus. Highly recommend life science and pharmacy graduates explore their fit:\n${shareUrl}\n\n#HealthcareCareers #ClinicalResearch #CareerIntelligence #ArzonGlobal`;

  const handleCopy = (text: string) => {
    if (!navigator?.clipboard) {
      toast.error("Clipboard access is unavailable in this browser.");
      return;
    }

    void navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        toast.success("Copied to clipboard!");
        track("ce_share_content_copied", {
          lead_id: leadId ?? null,
          props: {
            content_type: text === shareUrl ? "referral_link" : text === whatsAppText ? "whatsapp_draft" : "linkedin_draft",
          },
        });
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => toast.error("Could not copy. Please select and copy the text manually."));
  };

  const handleDownloadStory = async () => {
    if (!storyCardRef.current) return;
    setIsExportingStory(true);
    toast.loading("Generating 9:16 Instagram Story asset...", { id: "story-gen" });

    try {
      const html2canvas = (await import("html2canvas-pro")).default;
      const canvas = await html2canvas(storyCardRef.current, {
        scale: 2.5,
        useCORS: true,
        backgroundColor: "#070D1E",
        logging: false,
      });

      const link = document.createElement("a");
      link.download = `Career_Identity_${roleName.replace(/\s+/g, "_")}_Story.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();

      toast.success("Instagram Story asset downloaded! Share to your Story.", { id: "story-gen" });
      track("ce_share_story_downloaded", { lead_id: leadId ?? null, props: { channel: "instagram_story" } });
    } catch (err) {
      console.error("Story export error:", err);
      toast.error("Failed to generate Story card. Please try again.", { id: "story-gen" });
    } finally {
      setIsExportingStory(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-3xl border border-[#E4EAF2] bg-white tone-light card-light p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E4EAF2] pb-4">
          <div className="flex items-center gap-2">
            <Share2 className="h-5 w-5 text-[#1557D6]" />
            <h3 className="font-serif text-xl font-bold text-[#071A4A]">
              Share Your Career Identity
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Channel Tabs */}
        <div className="mt-4 flex overflow-x-auto rounded-xl bg-slate-100 p-1 text-[11px] sm:text-xs font-semibold text-slate-600">
          <button
            type="button"
            onClick={() => setActiveTab("whatsapp")}
            className={`flex-1 min-w-[70px] sm:min-w-0 flex items-center justify-center gap-1 sm:gap-1.5 py-2 px-1.5 rounded-lg transition-all ${
              activeTab === "whatsapp" ? "bg-white tone-light text-[#25D366] shadow-xs font-bold" : "hover:text-slate-900"
            }`}
          >
            <MessageCircle className="h-3.5 w-3.5 shrink-0" />
            <span>WhatsApp</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("linkedin")}
            className={`flex-1 min-w-[70px] sm:min-w-0 flex items-center justify-center gap-1 sm:gap-1.5 py-2 px-1.5 rounded-lg transition-all ${
              activeTab === "linkedin" ? "bg-white tone-light text-[#0077B5] shadow-xs font-bold" : "hover:text-slate-900"
            }`}
          >
            <Linkedin className="h-3.5 w-3.5 shrink-0" />
            <span>LinkedIn</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("instagram")}
            className={`flex-1 min-w-[70px] sm:min-w-0 flex items-center justify-center gap-1 sm:gap-1.5 py-2 px-1.5 rounded-lg transition-all ${
              activeTab === "instagram" ? "bg-white tone-light text-[#E1306C] shadow-xs font-bold" : "hover:text-slate-900"
            }`}
          >
            <Instagram className="h-3.5 w-3.5 shrink-0" />
            <span>Story</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("link")}
            className={`flex-1 min-w-[70px] sm:min-w-0 flex items-center justify-center gap-1 sm:gap-1.5 py-2 px-1.5 rounded-lg transition-all ${
              activeTab === "link" ? "bg-white tone-light text-[#071A4A] shadow-xs font-bold" : "hover:text-slate-900"
            }`}
          >
            <Copy className="h-3.5 w-3.5 shrink-0" />
            <span>Link</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-6 flex-1 overflow-y-auto pr-1 space-y-4">
          {activeTab === "whatsapp" && (
            <div className="space-y-4 text-center">
              <div className="rounded-2xl border border-slate-200 bg-[#FAFBFD] p-4 text-left text-xs font-sans text-slate-800 leading-relaxed whitespace-pre-wrap">
                {whatsAppText}
              </div>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(whatsAppText)}`}
                  onClick={() => track("ce_share_channel_clicked", { lead_id: leadId ?? null, props: { channel: "whatsapp" } })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-[#1EBE5D] w-full sm:w-auto"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Open WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={() => handleCopy(whatsAppText)}
                  className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full border border-slate-200 bg-white tone-light px-4 py-3 text-xs font-semibold text-slate-700 hover:bg-slate-50 w-full sm:w-auto"
                >
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy Text</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === "linkedin" && (
            <div className="space-y-4 text-center">
              <div className="rounded-2xl border border-slate-200 bg-[#FAFBFD] p-4 text-left text-xs font-sans text-slate-800 leading-relaxed whitespace-pre-wrap">
                {linkedInText}
              </div>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                  onClick={() => track("ce_share_channel_clicked", { lead_id: leadId ?? null, props: { channel: "linkedin" } })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#0077B5] px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-[#005582] w-full sm:w-auto"
                >
                  <Linkedin className="h-4 w-4" />
                  <span>Share on LinkedIn</span>
                </a>
                <button
                  type="button"
                  onClick={() => handleCopy(linkedInText)}
                  className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full border border-slate-200 bg-white tone-light px-4 py-3 text-xs font-semibold text-slate-700 hover:bg-slate-50 w-full sm:w-auto"
                >
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy Post Copy</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === "instagram" && (
            <div className="space-y-4 text-center">
              <p className="text-xs text-slate-600">
                Preview your 9:16 vertical Story asset. Download and post directly to your Instagram or WhatsApp Status.
              </p>
              <div className="max-h-[380px] overflow-y-auto rounded-2xl p-2 bg-slate-900 border border-slate-800">
                <CareerIdentityCard
                  ref={storyCardRef}
                  result={result}
                  candidateName={candidateName}
                  shareUrl={shareUrl}
                />
              </div>
              <button
                type="button"
                onClick={handleDownloadStory}
                disabled={isExportingStory}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#071A4A] px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-[#1557D6] disabled:opacity-50 w-full sm:w-auto"
              >
                <Download className="h-4 w-4" />
                <span>Download Story Image (PNG)</span>
              </button>
            </div>
          )}

          {activeTab === "link" && (
            <div className="space-y-4 text-center">
              <p className="text-xs text-slate-600">
                Share this personalized link with batchmates. When they open it, they will see your identity card and be challenged to discover theirs.
              </p>
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-[#FAFBFD] p-3 text-xs font-mono text-slate-800 truncate">
                <span className="truncate flex-1 text-left">{shareUrl}</span>
                <button
                  type="button"
                  onClick={() => handleCopy(shareUrl)}
                  className="rounded-lg bg-[#071A4A] px-3 py-1.5 text-white font-sans text-xs font-bold hover:bg-[#1557D6] shrink-0"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
