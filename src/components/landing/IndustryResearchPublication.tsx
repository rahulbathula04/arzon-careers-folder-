import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import {
  FileText,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  BarChart3,
  Search,
} from "lucide-react";
import { PremiumChip } from "@/components/ui/PremiumChip";
import { Interactive3dCard, Card3dLayer } from "@/components/3d/Interactive3dCard";
import { Floating3dBadge } from "@/components/3d/Floating3dBadge";

const SKILL_FREQUENCIES = [
  { tool: "Oracle Argus Safety (ICSR Workflow)", frequency: 84, track: "Pharmacovigilance", type: "surging" },
  { tool: "MedDRA Medical Terminology Coding", frequency: 78, track: "Safety & Coding", type: "surging" },
  { tool: "ICH-GCP E6(R2) Regulatory Protocol", frequency: 92, track: "Clinical Research", type: "surging" },
  { tool: "Medidata RAVE Electronic Data Capture", frequency: 71, track: "Clinical Data Mgt", type: "surging" },
  { tool: "ICD-10-CM / CPT Surgical Coding", frequency: 88, track: "Medical Coding", type: "surging" },
  { tool: "Clinical SAS 9.4 (SDTM/ADaM)", frequency: 66, track: "Healthcare Analytics", type: "surging" },
];

const OBSOLESCENCE_DELTAS = [
  {
    legacy: "Rote memorization of drug classifications without software context",
    drop: "-82%",
    modern: "Live Argus database entry, narrative authoring & MedDRA PT assignment",
    growth: "+214%",
  },
  {
    legacy: "Manual paper-based clinical trial case record forms (CRFs)",
    drop: "-75%",
    modern: "Medidata RAVE EDC validation & automated query management",
    growth: "+186%",
  },
  {
    legacy: "Academic essay writing without regulatory format standards",
    drop: "-68%",
    modern: "ICH E3 compliant Clinical Study Reports & eCTD Module assembly",
    growth: "+192%",
  },
];

export function IndustryResearchPublication() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="research" className="py-16 sm:py-24 border-b border-stone-200 bg-[#FAF8F5]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Editorial Publication Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-200">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2.5">
              <Floating3dBadge duration={3.5} delay={0.1}>
                <span className="px-3 py-1 rounded-full bg-[#1B3F8B] text-slate-50 font-mono text-[10px] font-bold uppercase tracking-wider shadow-xs">
                  FLAGSHIP RESEARCH STUDY ✦
                </span>
              </Floating3dBadge>
              <span className="font-mono text-xs text-stone-500">
                QUARTERLY REQUISITION AUDIT
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-tight">
              What Healthcare Employers Are Actually Looking For
            </h2>
            <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed">
              We audited 300+ recent job descriptions across Novartis, IQVIA, Parexel, Pfizer, and Dr. Reddy's to map the exact criteria that separate rejected applicants from shortlisted candidates.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              to="/healthcare-career-workshop"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white tone-light hover:bg-stone-100 text-stone-900 border border-stone-300 font-bold text-xs transition-all shadow-2xs cursor-pointer hover:shadow-md hover:-translate-y-0.5"
            >
              <span>Attend Next Live Research Briefing</span>
              <ArrowRight className="h-4 w-4 text-[#1B3F8B]" />
            </Link>
          </div>
        </div>

        {/* 2-Column Asymmetric Research Presentation with 3D Depth */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: The Empirical Skill Frequency Matrix (7-Span) */}
          <div className="lg:col-span-7">
            <Interactive3dCard
              maxTilt={8}
              depthScale={1.01}
              className="rounded-3xl border border-stone-200 bg-white tone-light p-6 sm:p-8 shadow-md space-y-6"
            >
              <Card3dLayer translateZ={15} className="flex items-center justify-between pb-4 border-b border-stone-200">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-[#1B3F8B]" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-stone-900">
                    TOP SOFTWARE &amp; PROTOCOL REQUIREMENTS ACROSS 300+ JDs
                  </span>
                </div>
                <span className="text-[11px] font-mono text-stone-500 font-bold">FREQUENCY (%)</span>
              </Card3dLayer>

              <div className="space-y-4">
                {SKILL_FREQUENCIES.map((item, idx) => (
                  <Card3dLayer key={idx} translateZ={15 + idx * 3} className="space-y-1.5 font-sans">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-stone-900">{item.tool}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-stone-500 font-mono hidden sm:inline">
                          {item.track}
                        </span>
                        <span className="font-mono font-bold text-[#1B3F8B]">{item.frequency}%</span>
                      </div>
                    </div>
                    <div className="h-2.5 rounded-full bg-stone-100 overflow-hidden shadow-inner">
                      <motion.div
                        className="h-full bg-gradient-to-r from-[#1B3F8B] to-blue-500 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.frequency}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: shouldReduceMotion ? 0 : 0.8, delay: idx * 0.08, ease: "easeOut" }}
                      />
                    </div>
                  </Card3dLayer>
                ))}
              </div>

              <p className="text-xs text-stone-600 font-sans leading-relaxed pt-2 border-t border-stone-200">
                📌 <strong>Empirical Finding:</strong> Over 82% of enterprise hiring filters immediately eliminate applicants who lack named software tools (Oracle Argus, RAVE, SAS, ICD-10) from their primary CV resume scans.
              </p>
            </Interactive3dCard>
          </div>

          {/* Right Column: The "Fresher Rejection Loop" Diagnosis (5-Span) */}
          <div className="lg:col-span-5 space-y-5">
            <Interactive3dCard
              maxTilt={10}
              depthScale={1.02}
              className="rounded-3xl border border-stone-200 bg-white tone-light p-6 sm:p-7 shadow-md space-y-4"
            >
              <Card3dLayer translateZ={15} className="flex items-center gap-2 text-rose-700 font-mono text-xs font-bold uppercase tracking-wider">
                <AlertTriangle className="h-4 w-4" />
                <span>THE "FRESHER REJECTION LOOP" DIAGNOSIS</span>
              </Card3dLayer>
              
              <h3 className="font-serif text-xl font-bold text-[#1A1A1A] leading-snug">
                Why 91% of Pharmacy &amp; Life Sciences CVs Never Reach a Human Recruiter
              </h3>
              
              <p className="text-xs text-stone-600 font-sans leading-relaxed">
                Most graduates submit academic resumes filled with university project topics, generic lab instruments (titration, dissolution), and theoretical definitions. Corporate Applicant Tracking Systems (Workday, Taleo, Greenhouse) filter for operational terms and enterprise software.
              </p>

              <div className="space-y-3 pt-2 text-xs font-mono">
                <Card3dLayer translateZ={25} className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 space-y-1 shadow-2xs">
                  <span className="font-bold block text-[11px]">🔴 STANDARD COLLEGE CV:</span>
                  <p className="text-[11px] font-sans">"Completed project on adverse drug reactions in hospital setting."</p>
                  <span className="text-[10px] text-rose-700 block font-bold">ATS STATUS: REJECTED (Missing Argus/MedDRA tags)</span>
                </Card3dLayer>

                <Card3dLayer translateZ={35} className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 space-y-1 shadow-md ring-1 ring-emerald-500/20">
                  <span className="font-bold block text-[11px] text-emerald-800">🟢 ARZON PREPARED CV:</span>
                  <p className="text-[11px] font-sans text-stone-800">"Processed 40+ de-identified ICSR cases in Oracle Argus 8.4; assigned MedDRA 27.0 PT codes for expedited 7-day safety reporting."</p>
                  <span className="text-[10px] text-emerald-700 block font-bold">ATS STATUS: SHORTLISTED (94/100 Intent Score)</span>
                </Card3dLayer>
              </div>
            </Interactive3dCard>

            {/* Obsolescence Delta Callout with 3D Depth */}
            <Interactive3dCard
              maxTilt={8}
              depthScale={1.02}
              className="rounded-3xl border border-sky-200 bg-sky-50/70 p-5 space-y-3 shadow-xs"
            >
              <Card3dLayer translateZ={20}>
                <span className="font-mono text-[11px] font-bold text-[#1B3F8B] uppercase tracking-wider block">
                  2026 WORKFORCE SHIFT
                </span>
              </Card3dLayer>

              <div className="space-y-2.5">
                {OBSOLESCENCE_DELTAS.map((delta, i) => (
                  <Card3dLayer key={i} translateZ={15 + i * 5} className="text-xs space-y-1 border-b border-sky-200/60 pb-2 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between text-rose-700 font-mono text-[11px]">
                      <span className="line-through">{delta.legacy}</span>
                      <span className="font-bold">{delta.drop}</span>
                    </div>
                    <div className="flex items-center justify-between text-emerald-800 font-mono text-[11px]">
                      <span className="font-bold">{delta.modern}</span>
                      <span className="font-bold">{delta.growth}</span>
                    </div>
                  </Card3dLayer>
                ))}
              </div>
            </Interactive3dCard>
          </div>
        </div>
      </div>
    </section>
  );
}

