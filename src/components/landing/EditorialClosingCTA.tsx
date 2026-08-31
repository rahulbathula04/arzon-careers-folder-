import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  MessageCircle,
  ExternalLink,
  Calendar,
} from "lucide-react";
import { PremiumChip } from "@/components/ui/PremiumChip";

const WHATSAPP_COMMUNITY_URL = "https://chat.whatsapp.com/Ltg8V4sGOgbK8kbgYMuaHz";

export function EditorialClosingCTA() {
  return (
    <section id="apply" className="py-20 sm:py-28 border-b border-stone-200 bg-[#FAF8F5]">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-stone-300 bg-white tone-light p-8 sm:p-14 shadow-xl text-center space-y-8 relative overflow-hidden">
          {/* Subtle Top Accent */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-[#1B3F8B]" />

          <div className="space-y-4 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-mono text-[11px] font-bold">
                <span className="h-2 w-2 rounded-full bg-emerald-500 motion-safe:animate-pulse" />
                UPCOMING LIVE MASTERCLASS THIS SATURDAY
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-tight leading-[1.12]">
              Stop collecting generic certificates. Start building verified career evidence.
            </h2>
            <p className="text-sm sm:text-base text-stone-600 font-sans max-w-2xl mx-auto leading-relaxed">
              Whether you are graduating this year or seeking to transition from college theory to high-paying enterprise healthcare roles, begin with our empirical research.
            </p>
          </div>

          {/* Direct CTA Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 max-w-xl mx-auto">
            <Link
              to="/healthcare-career-workshop"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-13 px-8 rounded-xl bg-[#1B3F8B] hover:bg-[#153270] text-slate-50 font-bold text-sm tracking-wide transition-all shadow-md cursor-pointer hover:shadow-lg hover:-translate-y-0.5"
            >
              <Calendar className="h-4 w-4 text-slate-50" />
              <span>Reserve Free Seat For Next Masterclass</span>
              <ArrowRight className="h-4 w-4 text-slate-50" />
            </Link>

            <Link
              to="/career-engine/start"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-13 px-6 rounded-xl bg-white tone-light hover:bg-stone-100 text-stone-900 border border-stone-300 font-bold text-xs tracking-wide transition-all shadow-2xs cursor-pointer hover:-translate-y-0.5"
            >
              <span>Take 90-Sec Fit Assessment</span>
              <ArrowRight className="h-3.5 w-3.5 text-stone-500" />
            </Link>
          </div>

          {/* WhatsApp Direct Community Link */}
          <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center justify-center gap-6 text-xs text-stone-600 font-sans">
            <a
              href={WHATSAPP_COMMUNITY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-bold text-emerald-800 hover:text-emerald-900 transition-colors"
            >
              <MessageCircle className="h-4 w-4 text-emerald-600" />
              <span>Join 2,400+ Member Arzon WhatsApp Community</span>
              <ExternalLink className="h-3 w-3" />
            </a>
            <span className="hidden sm:inline text-stone-400">·</span>
            <span className="flex items-center gap-1 font-mono text-[11px] text-stone-500">
              <ShieldCheck className="h-3.5 w-3.5 text-[#8A6D1F]" />
              <span>100% Free · No sales calls · Zero spam</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
