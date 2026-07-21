import { ShieldCheck, Building2, BadgeCheck, CalendarCheck } from "lucide-react";
import taskAsset from "@/assets/proof/task-partnership.png.asset.json";
const taskImg = taskAsset.url;

/**
 * Mobile-only above-the-fold trust card.
 * Shows the TASK photo, inauguration line, play button and three credential
 * badges in a tight strip, the things a sales rep wants the student to see
 * in the first 5 seconds.
 */
export function MobileHeroProofCard() {
  return (
    <div className="tone-dark md:hidden">
      <div className="overflow-hidden rounded-2xl border border-slate-200/12 bg-white/[0.04]">
        <div className="relative">
          <img
            src={taskImg}
            alt="Photo triptych from the Arzon Global public launch — TASK (Telangana Academy for Skill and Knowledge) officials attending as chief guests, 30 July 2025, Hyderabad."
            className="block h-44 w-full object-cover"
            width={800}
            height={176}
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          <div className="absolute left-2.5 top-2.5 inline-flex items-center gap-1.5 rounded-full bg-black/70 px-2.5 py-1 font-mono text-micro font-semibold uppercase tracking-[0.18em] text-slate-50 backdrop-blur">
            <CalendarCheck className="h-3 w-3 text-gold" /> Launch · 30 Jul 2025
          </div>
        </div>
        <div className="px-4 py-3">
          <p className="text-caption font-semibold leading-tight text-slate-50">
            TASK officials. Our launch. Hyderabad.
          </p>
          <p className="mt-0.5 text-micro text-slate-100/80">
            Govt of Telangana skills body · 30 Jul 2025
          </p>
        </div>
        <div className="grid grid-cols-3 divide-x divide-white/10 border-t border-slate-200/10 bg-white/[0.02]">
          {[
            { icon: BadgeCheck, label: "ISO 9001" },
            { icon: Building2, label: "MSME" },
            { icon: ShieldCheck, label: "MCA" },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center justify-center px-2 py-2.5 text-center"
            >
              <Icon className="h-3.5 w-3.5 text-primary-glow" />
              <p className="mt-1 font-mono text-micro font-bold tracking-wider text-slate-100/85">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
