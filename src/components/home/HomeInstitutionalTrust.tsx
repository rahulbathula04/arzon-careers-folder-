import { useState } from "react";
import {
  Award,
  CheckCircle2,
  ExternalLink,
  FileCheck,
  Landmark,
  Play,
  ShieldCheck,
  Tv,
  ArrowRight,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { LINKS } from "@/components/landing/constants";

export function HomeInstitutionalTrust() {
  const [isPlaying, setIsPlaying] = useState(false);
  const media = LINKS.mediaInauguration;

  return (
    <section
      id="institutional-trust"
      className="py-16 sm:py-24 bg-white border-b border-[#E2E8F0] tone-light card-light"
      aria-labelledby="institutional-trust-heading"
    >
      <div className="ap-shell">
        {/* Header Eyebrow & Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-3.5 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-amber-900 mb-3.5">
              <Award className="h-3.5 w-3.5 text-amber-700" />
              <span>GOVERNMENT ALIGNMENT · TELEVISED PUBLIC RECORD</span>
            </div>
            <h2
              id="institutional-trust-heading"
              className="text-3xl sm:text-4xl lg:text-[44px] font-serif font-bold text-[#081F38] tracking-tight leading-tight"
            >
              Inaugurated with government skill leadership.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#64748B] leading-relaxed">
              When Arzon Global expanded its healthcare career operations in Hyderabad,{" "}
              <strong className="text-[#081F38] font-semibold">
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
            className="inline-flex items-center gap-2 rounded-full border border-[#D0E1FD] bg-[#EEF6FF] hover:bg-[#DCEBFE] text-[#1557D6] px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-wider transition-all shrink-0 self-start md:self-auto"
          >
            <span>Watch Full Telecast on YouTube</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Video & Verification Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Video Player (Cols 1-7) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-[#E2E8F0] bg-[#0A101D] shadow-xl group">
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
                  {/* Dark subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />

                  {/* Top Broadcaster Chip */}
                  <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-black/75 backdrop-blur-md px-3 py-1 font-mono text-[10.5px] font-bold text-white border border-white/10">
                      <Tv className="h-3 w-3 text-red-500" />
                      {media.outlet}
                    </span>
                    <span className="hidden sm:inline-flex items-center rounded-full bg-white/20 backdrop-blur-md px-2.5 py-1 font-mono text-[10px] text-white/90">
                      {media.outletSubscribers}
                    </span>
                  </div>

                  {/* Centered Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="grid h-16 w-16 place-items-center rounded-full bg-red-600 text-white shadow-2xl transition-transform duration-300 group-hover:scale-110 group-hover:bg-red-700">
                      <Play className="h-7 w-7 fill-white translate-x-0.5" />
                    </div>
                  </div>

                  {/* Bottom Caption Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="inline-block rounded bg-amber-500/90 text-amber-950 px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider mb-1">
                      CHIEF GUEST ADDRESS · START AT 0:39
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
                <span className="font-mono text-[11px] font-bold uppercase text-[#081F38]">
                  Televised Networks:
                </span>
                <span className="font-mono text-[11px] text-[#334155] font-semibold">
                  {media.broadcasters}
                </span>
              </div>
              <span className="text-[11px] font-mono text-slate-400">
                Official Broadcast · 5:36 HD Telecast
              </span>
            </div>
          </div>

          {/* Right Column: 4 Credibility & Verification Cards (Cols 8-12) */}
          <div className="lg:col-span-5 space-y-3.5">
            {/* Card 1: TASK Alignment */}
            <div className="rounded-2xl border border-stone-200/90 bg-stone-50/70 p-5 space-y-2 tone-light card-light">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-[#005B4F]">
                  <Landmark className="h-3.5 w-3.5" />
                  TASK Collaboration
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                  Govt. of Telangana
                </span>
              </div>
              <h3 className="font-sans text-sm font-bold text-[#081F38]">
                Inaugurated by TASK CEO Dr. Srikanth Sinha
              </h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Telangana Academy for Skill and Knowledge (Dept of ITE&amp;C) leadership formally
                inaugurated the Arzon training facility to accelerate industry-ready clinical hiring across the state.
              </p>
            </div>

            {/* Card 2: Televised Press Broadcast */}
            <div className="rounded-2xl border border-stone-200/90 bg-stone-50/70 p-5 space-y-2 tone-light card-light">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-[#2563EB]">
                  <Tv className="h-3.5 w-3.5" />
                  Media Telecast
                </span>
                <span className="text-[10px] font-mono text-slate-500">697K+ Subscribers</span>
              </div>
              <h3 className="font-sans text-sm font-bold text-[#081F38]">
                Broadcast by HYBIZ TV HD &amp; Regional Channels
              </h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Full ceremony covered by HYBIZ TV HD alongside ETV Telangana, TV5 News, and V5
                News. Ground truth archived on the public record.
              </p>
            </div>

            {/* Card 3: MSME UDYAM Enterprise Registration */}
            <div className="rounded-2xl border border-stone-200/90 bg-stone-50/70 p-5 space-y-2 tone-light card-light">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-[#081F38]">
                  <FileCheck className="h-3.5 w-3.5 text-blue-600" />
                  Enterprise Standing
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  UDYAM Registered
                </span>
              </div>
              <h3 className="font-sans text-sm font-bold text-[#081F38]">
                MSME Registered Enterprise · Govt. of India
              </h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Registered under the Ministry of Micro, Small and Medium Enterprises (MSME), Government of India.
                Verifiable enterprise standing and open-ledger transparency.
              </p>
            </div>

            {/* Bottom Proof Actions */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <Link
                to="/why-arzon"
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#081F38] hover:bg-[#153270] text-white px-4 py-3 text-xs font-bold font-mono uppercase tracking-wider transition-colors shadow-sm"
              >
                <span>View All Verifications</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                to="/legal"
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-[#081F38] px-4 py-3 text-xs font-mono font-bold uppercase tracking-wider transition-colors tone-light card-light"
              >
                <ShieldCheck className="h-3.5 w-3.5 text-blue-600" />
                <span>Statutory Hub</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
