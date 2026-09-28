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
    <section className="arzon-site-hero">
      <div className="arzon-site-container arzon-site-hero-copy">
        <span className="arzon-site-eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
        {children ? (
          <div className="arzon-site-hero-actions">{children}</div>
        ) : (
          <Link to="/career-engine" className="arzon-button-primary arzon-site-hero-cta">
            Find my career path <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>

      <div className="arzon-site-container arzon-site-hero-media">
        <img src={resolvedImage} alt={resolvedAlt} loading="eager" decoding="async" />
        <div className="arzon-site-hero-stat">
          <BarChart3 className="h-4 w-4 text-blue-600" />
          <div>
            <span>{statLabel}</span>
            <strong>{statValue}</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
