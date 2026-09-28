import type { ReactNode } from "react";
import { ArrowRight, BarChart3 } from "lucide-react";
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
    <section className="arzon-v2-hero">
      <div className="arzon-v2-container arzon-v2-hero-grid">
        <div className="arzon-v2-hero-copy">
          <span className="arzon-v2-eyebrow border-white/20 bg-white/10 text-blue-100">{eyebrow}</span>
          <h1 className="arzon-v2-hero-title mt-4">{title}</h1>
          <p className="arzon-v2-hero-description">{description}</p>
          {children ? <div className="mt-6 flex flex-wrap gap-3">{children}</div> : (
            <Link to="/career-engine" className="arzon-v2-button-primary mt-6 w-fit">
              Find my career path <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>

        <div className="arzon-v2-hero-media">
          <img src={resolvedImage} alt={resolvedAlt} loading="eager" decoding="async" />
          <div className="arzon-v2-hero-stat">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
              <BarChart3 className="h-4 w-4 text-blue-600" />
              {statLabel}
            </div>
            <div className="mt-1 text-sm font-extrabold">{statValue}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
