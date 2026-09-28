import type { ReactNode } from "react";
import { ArrowRight, BarChart3, CheckCircle2 } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function ArzonV2PageHero({
  eyebrow,
  title,
  description,
  children,
  mobileImageSrc,
  mobileImageAlt,
  imageSrc,
  imageAlt,
  statLabel = "Career intelligence",
  statValue = "Role-first guidance",
}: {
  eyebrow: string;
  title: ReactNode;
  description: string;
  children?: ReactNode;
  mobileImageSrc?: string;
  mobileImageAlt?: string;
  imageSrc?: string;
  imageAlt?: string;
  statLabel?: string;
  statValue?: string;
}) {
  const resolvedImage = imageSrc ?? mobileImageSrc ?? "/images/bpharm-female-graduate-hero.jpg";
  const resolvedAlt = imageAlt ?? mobileImageAlt ?? "Healthcare graduate exploring a career path";

  return (
    <section className="relative overflow-hidden bg-[#07152F] text-white">
      <div className="absolute inset-0">
        <img src={resolvedImage} alt="" className="h-full w-full object-cover opacity-35" loading="eager" decoding="async" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07152F] via-[#07152F]/90 to-[#07152F]/50" />
      </div>
      <div className="relative mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1fr_0.72fr] lg:items-end lg:py-20">
        <div className="max-w-4xl">
          <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-blue-200 backdrop-blur-md">
            {eyebrow}
          </span>
          <h1 className="mt-5 font-serif text-[clamp(3rem,7vw,6.4rem)] leading-[0.88] tracking-[-0.045em]">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/68 sm:text-lg">{description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {children ?? (
              <Link to="/career-engine" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-bold text-[#07152F]">
                Find my career path <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>
          <div className="mt-7 flex flex-wrap gap-2">
            {["Role requirements", "Employer context", "Preparation path"].map((item) => (
              <span key={item} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 text-[10px] font-semibold text-white/65">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" /> {item}
              </span>
            ))}
          </div>
        </div>

        <div className="relative hidden min-h-[360px] overflow-hidden rounded-[2rem] border border-white/15 bg-white/5 shadow-2xl lg:block">
          <img src={resolvedImage} alt={resolvedAlt} className="absolute inset-0 h-full w-full object-cover" loading="eager" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07152F] via-transparent to-transparent" />
          <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/15 bg-[#07152F]/70 p-4 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-white/10"><BarChart3 className="h-4 w-4 text-blue-200" /></span>
              <div>
                <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/45">{statLabel}</p>
                <p className="mt-1 text-sm font-semibold text-white">{statValue}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
