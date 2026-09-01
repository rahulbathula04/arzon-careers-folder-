import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  Building2,
  ChevronRight,
  Compass,
  Sparkles,
} from "lucide-react";
import { MemoizedHealthcare3dCanvas } from "@/components/3d/Healthcare3dCanvas";
import { Interactive3dCard, Card3dLayer } from "@/components/3d/Interactive3dCard";
import { Floating3dBadge } from "@/components/3d/Floating3dBadge";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { ShimmerButton } from "@/components/magicui/shimmer-button";

const DEGREE_SEGMENTS = [
  {
    id: "pharmd",
    label: "Pharm.D / M.Pharm",
    bestFit: "Pharmacovigilance (ICSR/Argus) & Medical Writing",
    startingCtc: "₹4.5L – ₹6.5L",
    demandReason: "High clinical evaluation and aggregate safety report readiness in Tier-1 GCCs.",
    route: "/pv-associate",
    icon: "💊",
  },
  {
    id: "bpharm",
    label: "B.Pharm",
    bestFit: "Medical Coding (ICD-10) & Clinical Data Management (CDM)",
    startingCtc: "₹3.8L – ₹5.2L",
    demandReason: "Strong pharmacology foundation accelerates certified chart auditing and eCRF validation.",
    route: "/courses/medical-coding",
    icon: "🧬",
  },
  {
    id: "lifesciences",
    label: "B.Sc / M.Sc Life Sciences",
    bestFit: "Clinical Research Coordination (CRC) & Regulatory Affairs",
    startingCtc: "₹3.5L – ₹4.8L",
    demandReason: "Biological acumen perfectly aligns with trial site monitoring and eCTD module filing.",
    route: "/courses/clinical-research",
    icon: "🔬",
  },
  {
    id: "biotech",
    label: "Biotechnology / Analytics",
    bestFit: "Healthcare Analytics (Clinical SAS) & CDISC Mapping",
    startingCtc: "₹4.8L – ₹7.2L",
    demandReason: "Data programming skills command premium packages across global clinical trial pipelines.",
    route: "/courses/healthcare-analytics",
    icon: "📊",
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
      {/* 3D Interactive WebGL / Particle Canvas Background */}
      <MemoizedHealthcare3dCanvas className="absolute inset-0 pointer-events-none opacity-60 z-0" />

      {/* Background Subtle Grid Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#1B3F8B_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none z-0" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12 z-10">
        {/* Top Eyebrow Authority Strip with 3D Floating Pill */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-5">
          <div className="flex items-center gap-2.5">
            <span className="flex h-2 w-2 rounded-full bg-[#1B3F8B] motion-safe:animate-pulse" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B]">
              ARZON WORKFORCE INTELLIGENCE · 2026 AUDIT
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-stone-600">
            <Floating3dBadge duration={5} delay={0.2}>
              <span className="hidden sm:inline px-2 py-0.5 rounded bg-blue-50/80 border border-blue-200/80 text-[#1B3F8B] font-bold">
                300+ JDs DECODED
              </span>
            </Floating3dBadge>
            <span className="hidden sm:inline">·</span>
            <span>14+ TIER-1 GCCs</span>
            <span>·</span>
            <Floating3dBadge duration={4} delay={0.6}>
              <span className="text-emerald-700 font-bold px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200">
                84% SHORTLIST RATE
              </span>
            </Floating3dBadge>
          </div>
        </div>

        {/* Master Brand Statement & Core Thesis */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-7 space-y-6">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1A1A1A] tracking-tight leading-[1.08]">
              Build a healthcare career around what the{" "}
              <AnimatedGradientText className="font-serif italic font-bold">
                industry actually needs.
              </AnimatedGradientText>
            </h1>

            <p className="text-base sm:text-lg text-stone-700 font-sans leading-relaxed max-w-2xl font-normal">
              University curricula teach theoretical definitions. Global capability centers and pharma multinationals hire for{" "}
              <strong className="text-[#1B3F8B] underline decoration-[#1B3F8B]/30 underline-offset-4">
                day-one database fluency
              </strong>{" "}
              in Oracle Argus, MedDRA, Medidata RAVE, and ICD-10-CM.
            </p>

            {/* Direct Action Trigger Group with 3D button interactions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={scrollToExplorer}
                className="inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-[#1B3F8B] hover:bg-[#153270] text-slate-50 font-bold text-xs tracking-wide transition-all shadow-md cursor-pointer hover:shadow-xl hover:-translate-y-1 active:translate-y-0"
              >
                <span>Explore Healthcare Career Tracks</span>
                <ArrowRight className="h-4 w-4 text-slate-50" />
              </button>

              <Link
                to="/healthcare-career-workshop"
                className="inline-flex items-center gap-2 h-12 px-5 rounded-xl bg-white tone-light hover:bg-stone-100 text-stone-900 border border-stone-300 font-bold text-xs tracking-wide transition-all shadow-2xs cursor-pointer hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
              >
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 motion-safe:animate-ping" />
                <span>Join Free 300+ JD Workshop</span>
                <ChevronRight className="h-3.5 w-3.5 text-stone-400" />
              </Link>
            </div>
          </div>

          {/* Right Column: 3D Interactive Perspective Degree-to-Role Widget */}
          <div className="lg:col-span-5">
            <Interactive3dCard
              maxTilt={10}
              className="rounded-3xl border border-stone-300/80 bg-white/95 tone-light p-6 sm:p-7 shadow-xl hover:shadow-2xl transition-all backdrop-blur-md"
            >
              <div className="space-y-4">
                {/* 3D Header Layer */}
                <Card3dLayer translateZ={25} className="flex items-center justify-between pb-3 border-b border-stone-200">
                  <div className="flex items-center gap-2">
                    <Compass className="h-4 w-4 text-[#1B3F8B]" />
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-stone-900">
                      DEGREE-TO-ROLE MATCHER
                    </span>
                  </div>
                  <Floating3dBadge duration={3.5} delay={0.4}>
                    <span className="font-mono text-[10px] font-bold text-emerald-800 bg-emerald-100/90 border border-emerald-300 px-2.5 py-1 rounded-full shadow-2xs">
                      VERIFIED FIT ✦
                    </span>
                  </Floating3dBadge>
                </Card3dLayer>

                {/* Degree Selector 3D Buttons */}
                <Card3dLayer translateZ={35} className="grid grid-cols-2 gap-2">
                  {DEGREE_SEGMENTS.map((deg) => (
                    <button
                      key={deg.id}
                      type="button"
                      onClick={() => setSelectedDegree(deg.id)}
                      className={`relative px-3 py-2.5 rounded-xl text-xs font-bold font-sans transition-all text-left truncate cursor-pointer flex items-center gap-1.5 ${
                        selectedDegree === deg.id
                          ? "bg-[#1B3F8B] text-slate-50 shadow-md ring-2 ring-[#1B3F8B]/30 scale-[1.02]"
                          : "bg-stone-50 text-stone-700 hover:bg-stone-100 border border-stone-200 hover:border-stone-300"
                      }`}
                    >
                      <span className="text-sm">{deg.icon}</span>
                      <span className="truncate">{deg.label}</span>
                    </button>
                  ))}
                </Card3dLayer>

                {/* Selected Alignment Summary in 3D Depth Card */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSegment.id}
                    initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -8 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                  >
                    <Card3dLayer
                      translateZ={45}
                      className="rounded-2xl bg-gradient-to-br from-blue-50/70 via-[#FAF8F5] to-emerald-50/50 border border-stone-200/90 p-4 space-y-3 shadow-inner"
                    >
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 block">
                          RECOMMENDED CAREER TRACK
                        </span>
                        <p className="font-serif text-base font-bold text-[#1B3F8B] mt-0.5">
                          {activeSegment.bestFit}
                        </p>
                      </div>

                      <div className="flex items-baseline justify-between pt-1 border-t border-stone-200/80">
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 block">
                            ESTIMATED STARTING CTC
                          </span>
                          <p className="font-mono text-sm font-bold text-[#8A6D1F]">
                            {activeSegment.startingCtc}
                          </p>
                        </div>
                        <Link
                          to={activeSegment.route}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#1B3F8B]/10 hover:bg-[#1B3F8B] text-[#1B3F8B] hover:text-slate-50 text-xs font-bold transition-colors cursor-pointer"
                        >
                          <span>View Curriculum</span>
                          <ArrowRight className="h-3 w-3" />
                        </Link>
                      </div>

                      <p className="text-[11px] text-stone-600 font-sans leading-relaxed pt-1">
                        💡 {activeSegment.demandReason}
                      </p>
                    </Card3dLayer>
                  </motion.div>
                </AnimatePresence>
              </div>
            </Interactive3dCard>
          </div>
        </div>

        {/* Bottom Proof Strip with 3D Card Hover Depth */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-stone-200">
          <Interactive3dCard maxTilt={8} depthScale={1.03} className="p-3.5 rounded-2xl bg-white/80 border border-stone-200/90 shadow-xs hover:border-[#1B3F8B]/40 transition-colors">
            <Card3dLayer translateZ={20} className="space-y-0.5">
              <span className="font-mono text-xl sm:text-2xl font-bold text-[#1B3F8B] flex items-center">
                <NumberTicker value={300} />+
              </span>
              <p className="text-xs text-stone-600 font-sans font-medium">Public JDs Analyzed</p>
            </Card3dLayer>
          </Interactive3dCard>

          <Interactive3dCard maxTilt={8} depthScale={1.03} className="p-3.5 rounded-2xl bg-white/80 border border-stone-200/90 shadow-xs hover:border-[#8A6D1F]/40 transition-colors">
            <Card3dLayer translateZ={20} className="space-y-0.5">
              <span className="font-mono text-xl sm:text-2xl font-bold text-[#8A6D1F]">
                ₹3.8L–₹7.2L
              </span>
              <p className="text-xs text-stone-600 font-sans font-medium">Starting CTC Bands</p>
            </Card3dLayer>
          </Interactive3dCard>

          <Interactive3dCard maxTilt={8} depthScale={1.03} className="p-3.5 rounded-2xl bg-white/80 border border-stone-200/90 shadow-xs hover:border-emerald-500/40 transition-colors">
            <Card3dLayer translateZ={20} className="space-y-0.5">
              <span className="font-mono text-xl sm:text-2xl font-bold text-emerald-700 flex items-center">
                <NumberTicker value={14} />+ GCCs
              </span>
              <p className="text-xs text-stone-600 font-sans font-medium">Hiring in Hyd, Blr &amp; Mum</p>
            </Card3dLayer>
          </Interactive3dCard>

          <Interactive3dCard maxTilt={8} depthScale={1.03} className="p-3.5 rounded-2xl bg-white/80 border border-stone-200/90 shadow-xs hover:border-stone-400 transition-colors">
            <Card3dLayer translateZ={20} className="space-y-0.5">
              <span className="font-mono text-xl sm:text-2xl font-bold text-stone-800">
                ISO-9001
              </span>
              <p className="text-xs text-stone-600 font-sans font-medium">Cryptographic Verifier</p>
            </Card3dLayer>
          </Interactive3dCard>
        </div>
      </div>
    </section>
  );
}

