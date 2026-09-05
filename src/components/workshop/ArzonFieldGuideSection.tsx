import { useState } from "react";
import { FileText, Download, ArrowRight, BookOpen, Layers, CheckCircle2 } from "lucide-react";
import { generateStarterKitPDF } from "@/lib/starter-kit-pdf";
import { track } from "@/lib/track";

interface ArzonFieldGuideSectionProps {
  onOpenGuide?: () => void;
  candidateName?: string;
  candidateDegree?: string;
}

export function ArzonFieldGuideSection({
  onOpenGuide,
  candidateName,
  candidateDegree,
}: ArzonFieldGuideSectionProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    track("field_guide_download", {
      props: {
        source: "field_guide_section",
      },
    });

    try {
      generateStarterKitPDF({
        candidateName: candidateName || "Healthcare Graduate",
        degree: candidateDegree || "B.Pharm / Life Sciences",
      });
    } catch (err) {
      console.error("[Field Guide PDF Download Error]", err);
    } finally {
      setIsDownloading(false);
    }
  };

  const categories = [
    {
      label: "ROLES",
      title: "Entry Job Titles & Scopes",
      desc: "Trainee PV Associate, Drug Safety Specialist, Junior Medical Coder, Clinical Data Coordinator.",
    },
    {
      label: "EMPLOYERS",
      title: "42 Verified Indian CROs",
      desc: "Hiring criteria and active tech stacks at Cognizant, IQVIA, Accenture, Parexel, Novartis, Wipro.",
    },
    {
      label: "PAY",
      title: "Verified Compensation Bands",
      desc: "Fresher CTCs from ₹3.2L to ₹4.8L through to Senior Specialist bands of ₹12L – ₹18L.",
    },
    {
      label: "TOOLS",
      title: "Enterprise Safety Platforms",
      desc: "Hands-on workflow expectations for Oracle Argus Safety, MedDRA v27.0, ARISg, and Medidata Rave.",
    },
    {
      label: "SKILLS",
      title: "Day-One Operational Competencies",
      desc: "ICH E2D 4-pillar validity, causality algorithms, narrative writing, and Day 0 clocks.",
    },
    {
      label: "GROWTH",
      title: "3-Year Promotion Trajectories",
      desc: "Clear career ladder progression from Associate to Senior Safety Scientist and Audit Lead.",
    },
  ];

  return (
    <section id="field-guide" className="w-full py-16 sm:py-20 bg-[var(--color-warm-white)] border-b border-[var(--color-border-warm)] text-left">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header with Arzon Signature */}
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-4 bg-[var(--color-editorial-amber)] rounded-sm"></div>
            <span className="font-mono text-[11px] font-bold text-[var(--color-arzon-ink)] uppercase tracking-widest">
              INTELLIGENCE PRODUCT · COMPREHENSIVE COMPENDIUM
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--color-arzon-ink)] tracking-tight">
            The Healthcare Career Field Guide
          </h2>
          <p className="font-sans text-sm sm:text-base text-stone-700 leading-relaxed">
            Arzon's flagship 46-page operational dossier for pharmacy and life sciences graduates.
            Detailed salary bands, hiring manager expectations, tool specs, and interview roadmaps.
          </p>
        </div>

        {/* Master Physical Artifact Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Physical Publication Artifact with Depth & Layering (5 cols) */}
          <div className="lg:col-span-5 relative flex justify-center py-6">
            {/* Layer 3: Faint Page Peek Behind */}
            <div className="absolute w-[270px] sm:w-[310px] h-[370px] sm:h-[410px] rounded-xl bg-stone-100 border border-stone-300 transform translate-x-6 -translate-y-4 rotate-3 shadow-md -z-10 hidden sm:block">
              <div className="p-4 font-mono text-[9px] text-stone-400 space-y-1">
                <span className="block border-b pb-1 font-bold">SECTION 03: PAY SCALES</span>
                <span>BANGALORE · HYDERABAD · PUNE</span>
              </div>
            </div>

            {/* Layer 2: Middle Partial Page */}
            <div className="absolute w-[280px] sm:w-[320px] h-[380px] sm:h-[420px] rounded-xl bg-[var(--color-warm-paper)] border border-[var(--color-border-warm)] transform translate-x-3 -translate-y-2 rotate-1 shadow-md -z-5">
              <div className="p-4 font-mono text-[9px] text-stone-400 space-y-1">
                <span className="block border-b pb-1 font-bold">SECTION 02: 42 CRO EMPLOYERS</span>
              </div>
            </div>

            {/* Layer 1: Dominant Physical Publication Cover */}
            <div className="relative w-[290px] sm:w-[330px] h-[400px] sm:h-[440px] rounded-xl bg-[var(--color-medical-navy)] tone-dark border-2 border-[#0A1D3A] shadow-2xl p-6 sm:p-7 flex flex-col justify-between text-[var(--color-warm-paper)] overflow-hidden">
              {/* Subtle Foil Pattern Texture */}
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none"></div>

              {/* Cover Top Foil Header */}
              <div className="relative z-10 space-y-2 border-b border-white/15 pb-4">
                <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-[var(--color-editorial-amber)] font-bold uppercase">
                  <span>ARZON GLOBAL</span>
                  <span>ISSUE 2026</span>
                </div>
                <span style={{ color: '#94A3B8' }} className="font-mono text-[9px] text-white/50 block tracking-wider">
                  CAREER INTELLIGENCE COMPENDIUM
                </span>
              </div>

              {/* Cover Title */}
              <div className="relative z-10 space-y-2 my-auto py-4">
                <h3 style={{ color: '#FFFFFF' }} className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight">
                  PHARMACOVIGILANCE & CLINICAL DATA
                </h3>
                <div className="w-10 h-0.5 bg-[var(--color-editorial-amber)]"></div>
                <p style={{ color: '#0F766E' }} className="font-mono text-xs text-[var(--color-clinical-teal)] font-semibold uppercase tracking-wider">
                  Operational Career Field Guide
                </p>
                <p style={{ color: '#CBD5E1' }} className="font-sans text-[11px] text-stone-300 leading-snug pt-1">
                  Salary Tiers · 42 CRO Profiles · Technical JDs · Interview Case Studies
                </p>
              </div>

              {/* Cover Bottom Label */}
              <div className="relative z-10 pt-3 border-t border-white/15 flex items-center justify-between font-mono text-[9px] text-white/60">
                <span>ISBN: ARZON-HC-2026-04</span>
                <span className="font-bold text-[var(--color-editorial-amber)]">46 PAGES · RESTRICTED ACCESS</span>
              </div>
            </div>
          </div>

          {/* Right Column: 6 Intelligence Modules & Action (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {categories.map((cat, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[var(--color-warm-paper)] border border-[var(--color-border-warm)] space-y-1.5 tone-light hover:border-[var(--color-medical-navy)]/40 transition-colors"
                >
                  <span className="font-mono text-[10px] font-bold text-[var(--color-editorial-amber)] uppercase tracking-wider block">
                    {cat.label}
                  </span>
                  <h4 className="font-serif text-base font-bold text-[var(--color-arzon-ink)]">
                    {cat.title}
                  </h4>
                  <p className="font-sans text-xs text-stone-600 leading-relaxed">
                    {cat.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              {onOpenGuide && (
                <button
                  type="button"
                  onClick={onOpenGuide}
                  className="inline-flex items-center gap-2 py-3.5 px-6 rounded-xl bg-[var(--color-medical-navy)] tone-dark hover:bg-[#0A2246] active:scale-[0.99] text-white font-mono text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer group"
                >
                  <span style={{ color: '#FFFFFF' }}>RESERVE SEAT TO UNLOCK FIELD GUIDE</span>
                  <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1.5 transition-transform" />
                </button>
              )}

              <button
                type="button"
                onClick={handleDownload}
                disabled={isDownloading}
                className="inline-flex items-center gap-2 py-3.5 px-5 rounded-xl bg-[var(--color-warm-paper)] hover:bg-stone-200 border border-[var(--color-border-warm)] text-[var(--color-arzon-ink)] font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-[var(--color-medical-navy)]" />
                <span>{isDownloading ? "GENERATING..." : "DOWNLOAD SAMPLE PDF"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
