import { ArrowRight, MessageCircle, BookOpen, Compass, ShieldCheck } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { CareerEngineResult } from "@/data/careerEngineScoring";

interface Props {
  result: CareerEngineResult;
}

export function ResultConversion({ result }: Props) {
  const pathSlug =
    result.archetype?.topPaths?.[0]?.slug ??
    result.archetype?.pathSlug ??
    "pharmacovigilance";

  const programmeSlug =
    pathSlug === "medical-coding"
      ? "medical-coding"
      : pathSlug === "pharmacovigilance"
        ? "pharmacovigilance"
        : pathSlug === "clinical-data-management"
          ? "clinical-data-management"
          : pathSlug === "sas-clinical"
            ? "sas-clinical"
            : pathSlug === "regulatory-affairs"
              ? "regulatory-affairs"
              : pathSlug === "ai-intelligence"
                ? "ai-intelligence"
                : "pharmacovigilance";

  const roleName = result.archetype?.name ?? "Recommended Track";

  const whatsappCounsellorUrl = `https://api.whatsapp.com/send?phone=919876543210&text=${encodeURIComponent(
    `Hello Arzon Admissions Team, I just completed my Career Engine diagnostic. My top identity match is "${roleName}" (${Math.round(
      result.fitScore,
    )}% Fit). I'd like to consult with a senior career counsellor regarding role preparation and upcoming cohorts.`,
  )}`;

  return (
    <section className="rounded-3xl border border-[#071A4A] bg-[#071A4A] text-white p-6 sm:p-10 shadow-lg relative overflow-hidden">
      {/* Background Subtle Radial Accent */}
      <div className="pointer-events-none absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-[#1557D6]/30 blur-3xl" />

      <div className="relative z-10 max-w-2xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider text-[#D4AF37]">
          <span>THE IMMEDIATE NEXT STEP</span>
        </span>

        <h2 className="mt-4 font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
          Turn Your Diagnostic Alignment Into Concrete Proof of Work.
        </h2>

        <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
          Knowing your career archetype is step one. Step two is acquiring genuine production mastery (Argus Safety, MedDRA, EDC platforms) and building an audit-proof case portfolio that commands executive recruiter attention.
        </p>

        {/* Action CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
          <Link
            to="/courses/$slug"
            params={{ slug: programmeSlug }}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#1557D6] px-6 py-3.5 text-sm font-bold text-white shadow-sm hover:bg-[#2878F0] transition-all transform active:scale-95 w-full sm:w-auto cursor-pointer"
          >
            <span>Explore {roleName} Pathway & Assay Work Simulation</span>
            <ArrowRight className="h-4 w-4" />
          </Link>

          <a
            href={whatsappCounsellorUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-bold text-white hover:bg-white/20 transition-all w-full sm:w-auto cursor-pointer"
          >
            <MessageCircle className="h-4 w-4 text-[#25D366]" />
            <span>Consult Senior Counsellor on WhatsApp</span>
          </a>

          <Link
            to="/why-arzon"
            className="inline-flex min-h-10 items-center justify-center sm:justify-start gap-1.5 text-xs text-slate-300 hover:text-white transition-colors mt-2 sm:mt-0 font-semibold"
          >
            <Compass className="h-3.5 w-3.5 text-[#D4AF37]" />
            <span>How ACRI Verification Works →</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
