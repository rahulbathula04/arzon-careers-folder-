import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Building2,
  FileCheck2,
  TrendingUp,
  CheckCircle2,
  ChevronRight,
  Compass,
} from "lucide-react";
import { PremiumChip } from "@/components/ui/PremiumChip";

const DEGREE_SEGMENTS = [
  {
    id: "pharmd",
    label: "Pharm.D / M.Pharm",
    bestFit: "Pharmacovigilance (ICSR/Argus) & Medical Writing",
    startingCtc: "₹4.5L – ₹6.5L",
    demandReason: "High clinical evaluation and aggregate safety report readiness in Tier-1 GCCs.",
    route: "/pv-associate",
  },
  {
    id: "bpharm",
    label: "B.Pharm",
    bestFit: "Medical Coding (ICD-10) & Clinical Data Management (CDM)",
    startingCtc: "₹3.8L – ₹5.2L",
    demandReason: "Strong pharmacology foundation accelerates certified chart auditing and eCRF validation.",
    route: "/courses/medical-coding",
  },
  {
    id: "lifesciences",
    label: "B.Sc / M.Sc Life Sciences",
    bestFit: "Clinical Research Coordination (CRC) & Regulatory Affairs",
    startingCtc: "₹3.5L – ₹4.8L",
    demandReason: "Biological acumen perfectly aligns with trial site monitoring and eCTD module filing.",
    route: "/courses/clinical-research",
  },
  {
    id: "biotech",
    label: "Biotechnology / Analytics",
    bestFit: "Healthcare Analytics (Clinical SAS) & CDISC Mapping",
    startingCtc: "₹4.8L – ₹7.2L",
    demandReason: "Data programming skills command premium packages across global clinical trial pipelines.",
    route: "/courses/healthcare-analytics",
  },
];

export function EditorialHero() {
  const shouldReduceMotion = useReducedMotion();
  const [selectedDegree, setSelectedDegree] = useState(DEGREE_SEGMENTS[0].id);
  const activeSegment = DEGREE_SEGMENTS.find((d) => d.id === selectedDegree) || DEGREE_SEGMENTS[0];

  const scrollToExplorer = () => {
    const el = document.getElementById("career-explorer");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 border-b border-stone-200 bg-[#FAF8F5] overflow-hidden">
      {/* Background Subtle Grid Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#1B3F8B_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Eyebrow Authority Strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-5">
          <div className="flex items-center gap-2.5">
            <span className="flex h-2 w-2 rounded-full bg-[#1B3F8B] motion-safe:animate-pulse" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B]">
              ARZON WORKFORCE INTELLIGENCE · 2026 AUDIT
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-stone-600">
            <span className="hidden sm:inline">300+ JDs DECODED</span>
            <span className="hidden sm:inline">·</span>
            <span>14+ TIER-1 GCCs</span>
            <span>·</span>
            <span className="text-emerald-700 font-bold">84% SHORTLIST RATE</span>
          </div>
        </div>

        {/* Master Brand Statement & Core Thesis */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-8 space-y-6">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1A1A1A] tracking-tight leading-[1.08]">
              Build a healthcare career around what the industry actually needs.
            </h1>

            <p className="text-base sm:text-lg text-stone-700 font-sans leading-relaxed max-w-2xl font-normal">
              University curricula teach theoretical definitions. Global capability centers and pharma multinationals hire for 
              <strong className="text-[#1B3F8B]"> day-one database fluency</strong> in Oracle Argus, MedDRA, Medidata RAVE, and ICD-10-CM.
            </p>

            {/* Direct Action Trigger Group */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={scrollToExplorer}
                className="inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-[#1B3F8B] hover:bg-[#153270] text-slate-50 font-bold text-xs tracking-wide transition-all shadow-md cursor-pointer hover:shadow-lg hover:-translate-y-0.5"
              >
                <span>Explore Healthcare Career Tracks</span>
                <ArrowRight className="h-4 w-4 text-slate-50" />
              </button>

              <Link
                to="/healthcare-career-workshop"
                className="inline-flex items-center gap-2 h-12 px-5 rounded-xl bg-white tone-light hover:bg-stone-100 text-stone-900 border border-stone-300 font-bold text-xs tracking-wide transition-all shadow-2xs cursor-pointer hover:-translate-y-0.5"
              >
                <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
                <span>Join Free 300+ JD Workshop</span>
                <ChevronRight className="h-3.5 w-3.5 text-stone-400" />
              </Link>
            </div>
          </div>

          {/* Right Column: Degree-to-Role Instant Alignment Widget */}
          <div className="lg:col-span-4 rounded-2xl border border-stone-200 bg-white tone-light p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <Compass className="h-4 w-4 text-[#1B3F8B]" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-stone-900">
                  DEGREE-TO-ROLE MATCHER
                </span>
              </div>
              <span className="font-mono text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                VERIFIED FIT
              </span>
            </div>

            {/* Degree Selector Buttons */}
            <div className="grid grid-cols-2 gap-1.5">
              {DEGREE_SEGMENTS.map((deg) => (
                <button
                  key={deg.id}
                  type="button"
                  onClick={() => setSelectedDegree(deg.id)}
                  className={`relative px-3 py-2.5 rounded-lg text-xs font-bold font-sans transition-all text-left truncate cursor-pointer ${
                    selectedDegree === deg.id
                      ? "bg-[#1B3F8B] text-slate-50 shadow-xs"
                      : "bg-stone-50 text-stone-700 hover:bg-stone-100 border border-stone-200"
                  }`}
                >
                  {deg.label}
                </button>
              ))}
            </div>

            {/* Selected Alignment Summary with Animated Presence */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSegment.id}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -6 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                className="rounded-xl bg-[#FAF8F5] border border-stone-200 p-4 space-y-2.5 text-xs"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 block">
                    RECOMMENDED CAREER TRACK
                  </span>
                  <p className="font-serif text-sm font-bold text-[#1B3F8B]">
                    {activeSegment.bestFit}
                  </p>
                </div>

                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 block">
                      ESTIMATED STARTING CTC
                    </span>
                    <p className="font-mono text-xs font-bold text-[#8A6D1F]">
                      {activeSegment.startingCtc}
                    </p>
                  </div>
                  <Link
                    to={activeSegment.route}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#1B3F8B] hover:underline"
                  >
                    <span>View Curriculum</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>

                <p className="text-[11px] text-stone-600 font-sans leading-relaxed pt-1.5 border-t border-stone-200">
                  💡 {activeSegment.demandReason}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Proof Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-stone-200">
          <div className="space-y-0.5">
            <span className="font-mono text-xl sm:text-2xl font-bold text-[#1B3F8B]">300+</span>
            <p className="text-xs text-stone-600 font-sans font-medium">Public JDs Analyzed</p>
          </div>
          <div className="space-y-0.5">
            <span className="font-mono text-xl sm:text-2xl font-bold text-[#8A6D1F]">₹3.8L–₹7.2L</span>
            <p className="text-xs text-stone-600 font-sans font-medium">Starting CTC Bands</p>
          </div>
          <div className="space-y-0.5">
            <span className="font-mono text-xl sm:text-2xl font-bold text-emerald-700">14+ GCCs</span>
            <p className="text-xs text-stone-600 font-sans font-medium">Hiring in Hyd, Blr &amp; Mum</p>
          </div>
          <div className="space-y-0.5">
            <span className="font-mono text-xl sm:text-2xl font-bold text-stone-800">ISO-9001</span>
            <p className="text-xs text-stone-600 font-sans font-medium">Cryptographic Verifier</p>
          </div>
        </div>
      </div>
    </section>
  );
}
