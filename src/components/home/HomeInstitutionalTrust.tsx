import { useState } from "react";
import {
  CheckCircle2,
  ExternalLink,
  Play,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { LINKS } from "@/components/landing/constants";
import { TaskRealLogo, HybizTvLogo, MsmeGovtLogo } from "@/components/common/TrustLogos";

export function HomeInstitutionalTrust() {
  const [isPlaying, setIsPlaying] = useState(false);
  const media = LINKS.mediaInauguration;

  return (
    <section
      id="institutional-trust"
      className="py-16 sm:py-24 bg-white border-b border-[#E4EAF2] tone-light card-light"
      aria-labelledby="institutional-trust-heading"
    >
      <div className="ap-shell">
        {/* Header Eyebrow & Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D0E1FD] bg-[#EEF6FF] px-3.5 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-[#1557D6] mb-3.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#1557D6] motion-safe:animate-pulse" />
              <span>GOVERNMENT ALIGNMENT · TELEVISED PUBLIC RECORD</span>
            </div>
            <h2
              id="institutional-trust-heading"
              className="text-3xl sm:text-4xl lg:text-[44px] font-serif font-bold text-[#071A4A] tracking-tight leading-tight"
            >
              Inaugurated with government skill leadership.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#475569] leading-relaxed">
              When Arzon Global expanded its healthcare career operations in Hyderabad,{" "}
              <strong className="text-[#071A4A] font-semibold">
                Dr. Srikanth Sinha, CEO of TASK
              </strong>{" "}
              (Telangana Academy for Skill and Knowledge, Department of ITE&amp;C, Government of
              Telangana), joined as Chief Guest to inaugurate the facility — broadcast live on regional television.
            </p>
          </div>

          <a
            href={media.watch}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[#D0E1FD] bg-[#EEF6FF] hover:bg-[#DCEBFE] text-[#1557D6] px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-wider transition-all shrink-0 self-start md:self-auto shadow-2xs"
          >
            <span>Watch Full Telecast on YouTube</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Video & Verification Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Video Player (Cols 1-7) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-video w-full overflow-hidden rounded-[24px] border border-[#E4EAF2] bg-[#0A101D] shadow-[0_20px_50px_rgba(7,26,74,0.12)] group">
              {!isPlaying ? (
                <button
                  type="button"
                  onClick={() => setIsPlaying(true)}
                  className="relative h-full w-full cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  aria-label="Play inauguration telecast video featuring TASK CEO Dr. Srikanth Sinha"
                >
                  <img
                    src={media.poster}
                    alt="Arzon Global Hyderabad inauguration with TASK CEO Dr. Srikanth Sinha"
                    className="h-full w-full object-cover object-center opacity-90 transition-transform duration-500 group-hover:scale-[1.02]"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = media.fallbackPoster;
                    }}
                  />
                  {/* Subtle dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/40" />

                  {/* Top Broadcaster Chip */}
                  <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-2 rounded-full bg-black/60 backdrop-blur-md px-3.5 py-1 font-mono text-[11px] font-bold text-white border border-white/15 shadow-sm">
                      <span className="h-2 w-2 rounded-full bg-red-500 motion-safe:animate-pulse" />
                      <span>LIVE TELECAST · {media.outlet}</span>
                    </span>
                    <span className="hidden sm:inline-flex items-center rounded-full bg-white/15 backdrop-blur-md px-2.5 py-1 font-mono text-[10px] text-white/90">
                      {media.outletSubscribers}
                    </span>
                  </div>

                  {/* Centered Apple-Style Frosted Glass Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="grid h-16 w-16 sm:h-20 sm:w-20 place-items-center rounded-full bg-white/90 hover:bg-white text-[#071A4A] shadow-[0_20px_60px_rgba(0,0,0,0.4)] backdrop-blur-md transition-all duration-300 group-hover:scale-108 border border-white/60">
                      <Play className="h-7 w-7 sm:h-8 sm:w-8 fill-[#071A4A] translate-x-0.5" />
                    </div>
                  </div>

                  {/* Bottom Caption Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="inline-block rounded-full bg-white/20 backdrop-blur-md text-white border border-white/20 px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider mb-1.5 shadow-xs">
                      CHIEF GUEST ADDRESS · 0:39
                    </span>
                    <p className="font-sans text-sm sm:text-base font-bold text-white drop-shadow-sm leading-snug">
                      Dr. Srikanth Sinha (CEO, TASK) addressing television media at Arzon Global
                    </p>
                  </div>
                </button>
              ) : (
                <iframe
                  src={`${media.embed}&autoplay=1&rel=0&modestbranding=1`}
                  title={media.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="h-full w-full"
                />
              )}
            </div>

            {/* Media Press Footnote */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-2 text-xs text-[#64748B]">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] font-bold uppercase text-[#071A4A]">
                  Televised Networks:
                </span>
                <span className="font-mono text-[11px] text-[#475569] font-semibold">
                  {media.broadcasters}
                </span>
              </div>
              <span className="text-[11px] font-mono text-slate-400">
                Official Broadcast · 5:36 HD Telecast
              </span>
            </div>
          </div>

          {/* Right Column: 3 Apple-Style Credibility & Verification Cards (Cols 8-12) */}
          <div className="lg:col-span-5 space-y-3.5">
            {/* Card 1: TASK Alignment */}
            <div className="rounded-2xl border border-[#E4EAF2] bg-white p-5 space-y-3 shadow-xs hover:border-[#1557D6]/30 hover:shadow-md transition-all duration-300 tone-light card-light">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3.5">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#F8FAFC] border border-[#E4EAF2] p-1.5 shadow-2xs">
                    <TaskRealLogo className="h-full w-full object-contain" />
                  </div>
                  <div>
                    <span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-[#005B4F]">
                      TASK COLLABORATION
                    </span>
                    <h3 className="font-sans text-sm font-bold text-[#071A4A] leading-snug">
                      Inaugurated by TASK CEO Dr. Srikanth Sinha
                    </h3>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 shrink-0">
                  <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                  Govt. of Telangana
                </span>
              </div>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Telangana Academy for Skill and Knowledge (Dept of ITE&amp;C) leadership formally
                inaugurated the Arzon training facility to accelerate industry-ready clinical hiring across the state.
              </p>
            </div>

            {/* Card 2: Televised Press Broadcast */}
            <div className="rounded-2xl border border-[#E4EAF2] bg-white p-5 space-y-3 shadow-xs hover:border-[#1557D6]/30 hover:shadow-md transition-all duration-300 tone-light card-light">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3.5">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#F8FAFC] border border-[#E4EAF2] p-1.5 shadow-2xs">
                    <HybizTvLogo className="h-6 w-auto" />
                  </div>
                  <div>
                    <span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-[#2563EB]">
                      MEDIA TELECAST
                    </span>
                    <h3 className="font-sans text-sm font-bold text-[#071A4A] leading-snug">
                      Broadcast by HYBIZ TV HD &amp; Regional Channels
                    </h3>
                  </div>
                </div>
                <span className="inline-flex items-center text-[10px] font-mono font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200 shrink-0">
                  697K+ Subscribers
                </span>
              </div>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Full ceremony covered by HYBIZ TV HD alongside ETV Telangana, TV5 News, and V5
                News. Ground truth archived on the public record.
              </p>
            </div>

            {/* Card 3: MSME UDYAM Enterprise Registration */}
            <div className="rounded-2xl border border-[#E4EAF2] bg-white p-5 space-y-3 shadow-xs hover:border-[#1557D6]/30 hover:shadow-md transition-all duration-300 tone-light card-light">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3.5">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#F8FAFC] border border-[#E4EAF2] p-1.5 shadow-2xs">
                    <MsmeGovtLogo className="h-6 w-auto" />
                  </div>
                  <div>
                    <span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-[#071A4A]">
                      ENTERPRISE STANDING
                    </span>
                    <h3 className="font-sans text-sm font-bold text-[#071A4A] leading-snug">
                      MSME Registered Enterprise · Govt. of India
                    </h3>
                  </div>
                </div>
                <span className="inline-flex items-center text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200 shrink-0">
                  UDYAM Registered
                </span>
              </div>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Registered under the Ministry of Micro, Small and Medium Enterprises (MSME), Government of India.
                Verifiable enterprise standing and open-ledger transparency.
              </p>
            </div>

            {/* Bottom Proof Actions */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <Link
                to="/why-arzon"
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#071A4A] hover:bg-[#153270] text-white px-5 py-3 text-xs font-bold transition-all shadow-sm"
              >
                <span>View All Verifications</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                to="/legal"
                className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[#E4EAF2] bg-white hover:bg-slate-50 text-[#071A4A] px-5 py-3 text-xs font-bold transition-all tone-light card-light shadow-2xs"
              >
                <ShieldCheck className="h-3.5 w-3.5 text-[#1557D6]" />
                <span>Statutory Hub</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
