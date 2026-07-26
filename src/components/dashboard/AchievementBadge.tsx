import { Share2, Award, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AchievementBadgeProps {
  title: string;
  category: string;
  dateEarned: string;
  icon?: React.ReactNode;
}

export function AchievementBadge({ title, category, dateEarned, icon }: AchievementBadgeProps) {
  const shareToLinkedIn = () => {
    // Generate a LinkedIn share URL.
    // In production, this would point to a public certificate URL on the Arzon domain.
    const url = encodeURIComponent(`https://arzoncareers.in/verify?cert=SAMPLE_ID`);
    const text = encodeURIComponent(`I just earned the "${title}" badge from Arzon Careers!`);
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}&summary=${text}`,
      "_blank",
      "width=600,height=600",
    );
  };

  return (
    <div className="glass-panel-deep relative flex flex-col items-center justify-center overflow-hidden rounded-3xl border border-white/10 p-6 text-center shadow-2xl transition-transform hover:scale-[1.02]">
      {/* Background Glow */}
      <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-teal-500/20 blur-[50px]" />

      <div className="relative mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-teal-500/20 to-teal-900/40 ring-1 ring-teal-500/30">
        {icon || <Award className="h-10 w-10 text-teal-400" />}
        <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 ring-2 ring-white/10">
          <CheckCircle className="h-5 w-5 text-emerald-400" />
        </div>
      </div>

      <h4 className="font-mono text-xs font-semibold tracking-widest text-teal-400 uppercase">
        {category}
      </h4>
      <h3 className="mt-1 font-grotesk text-lg font-bold text-white">{title}</h3>
      <p className="mt-2 text-xs text-white/50">Earned on {dateEarned}</p>

      <Button
        onClick={shareToLinkedIn}
        className="mt-6 w-full gap-2 rounded-full bg-[#0A66C2] text-white hover:bg-[#004182]"
      >
        <Share2 className="h-4 w-4" />
        Share to LinkedIn
      </Button>
    </div>
  );
}
