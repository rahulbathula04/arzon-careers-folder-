import { useState, useRef, useEffect } from "react";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  MapPin,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Activity,
  FileCheck2,
  Database,
  BarChart2,
  FileSpreadsheet,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { motion, useReducedMotion } from "framer-motion";

export interface EmployerBenchmarkInsight {
  benchmarkCategory: string;
  shortCategory: string;
  hub: string;
  role: string;
  salary: string;
  jds: string;
  thumbnail: string;
  icon: typeof ShieldCheck;
  badgeStyle: {
    bg: string;
    text: string;
    border: string;
  };
  requirements: string[];
  tools: string[];
  marketTell: string;
  roleLink: string;
}

export function HomeEmployerTrustStrip() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeScrollIndex, setActiveScrollIndex] = useState(0);

  const benchmarks: EmployerBenchmarkInsight[] = [
    {
      benchmarkCategory: "GLOBAL PHARMA SAFETY GCC",
      shortCategory: "PHARMA SAFETY",
      hub: "Hyderabad & Bengaluru Hubs",
      role: "Pharmacovigilance Safety Associate",
      salary: "₹4.20 – ₹6.00 LPA",
      jds: "120+ JDs analysed",
      thumbnail: "/images/benchmarks/benchmark-pv-associate.webp",
      icon: ShieldCheck,
      badgeStyle: {
        bg: "bg-blue-50",
        text: "text-blue-700",
        border: "border-blue-200",
      },
      requirements: [
        "Day-0 Clock Verification & 15-day expedited reporting triage (ICH E2A / 21 CFR 312.32)",
        "Chronological clinical safety narrative drafting with compliant CIOMS I line-listing",
        "MedDRA 27.0 adverse reaction term coding & Lowest Level Term (LLT) / PT assignment",
      ],
      tools: ["Oracle Argus Safety 8.4", "MedDRA 27.0", "WHO Drug Global"],
      marketTell: "82% of technical screening rounds test Day-0 clock calculation, seriousness determination, and duplicate search logic.",
      roleLink: "/pv-associate",
    },
    {
      benchmarkCategory: "TIER-1 GLOBAL CRO NETWORK",
      shortCategory: "CRO NETWORK",
      hub: "Bengaluru · Kochi · Mumbai Hubs",
      role: "Drug Safety Scientist / ICSR Specialist",
      salary: "₹4.50 – ₹6.50 LPA",
      jds: "180+ JDs analysed",
      thumbnail: "/images/benchmarks/benchmark-drug-safety.webp",
      icon: Activity,
      badgeStyle: {
        bg: "bg-sky-50",
        text: "text-sky-700",
        border: "border-sky-200",
      },
      requirements: [
        "End-to-end ICSR case processing across spontaneous, clinical trial, and literature sources",
        "E2B(R3) XML electronic regulatory transmission audit rules and element validation",
        "Causality assessment algorithms: WHO-UMC scale, Naranjo probability score, and Dechallenge/Rechallenge",
      ],
      tools: ["Oracle Argus Safety", "E2B(R3) XML", "CIOMS I Formatter"],
      marketTell: "Candidates who demonstrate hands-on processing of 15+ real-world ICSR cases with zero clock slippage bypass junior screening filters.",
      roleLink: "/roles/drug-safety-associate",
    },
    {
      benchmarkCategory: "US HEALTHCARE INPATIENT RCM",
      shortCategory: "INPATIENT RCM",
      hub: "Mumbai · Pune · Chennai Hubs",
      role: "Medical Coding & Clinical Informatics",
      salary: "₹3.50 – ₹5.20 LPA",
      jds: "110+ JDs analysed",
      thumbnail: "/images/benchmarks/benchmark-medical-coding.webp",
      icon: FileCheck2,
      badgeStyle: {
        bg: "bg-rose-50",
        text: "text-rose-700",
        border: "border-rose-200",
      },
      requirements: [
        "Accurate ICD-10-CM diagnosis and CPT-4 surgical procedure coding from operative notes",
        "Clinical documentation improvement (CDI) & US Revenue Cycle Management (RCM) audit rules",
        "Modifiers 25 & 59 sequencing, medical necessity verification, and HIPAA-compliant chart audits",
      ],
      tools: ["ICD-10-CM", "CPT-4", "HCPCS Level II", "3M Codefinder"],
      marketTell: "Hiring assessments mandate ≥95% accuracy on an unassisted 10-chart inpatient audit test during the second technical round.",
      roleLink: "/courses/medical-coding",
    },
    {
      benchmarkCategory: "GLOBAL CLINICAL DATA MANAGEMENT",
      shortCategory: "CLINICAL CDM",
      hub: "Hyderabad · Bengaluru · Mohali Hubs",
      role: "Clinical Data Associate (CDM)",
      salary: "₹4.00 – ₹5.80 LPA",
      jds: "90+ JDs analysed",
      thumbnail: "/images/benchmarks/benchmark-cdm.webp",
      icon: Database,
      badgeStyle: {
        bg: "bg-emerald-50",
        text: "text-emerald-700",
        border: "border-emerald-200",
      },
      requirements: [
        "Electronic Case Report Form (eCRF) design validation and clinical trial data entry auditing",
        "Discrepancy query management lifecycle (Open, Answered, Closed, Cancelled) & SAE reconciliation",
        "Good Clinical Data Management Practice (GCDMP) and 21 CFR Part 11 audit trails",
      ],
      tools: ["Medidata Rave EDC", "Oracle InForm", "eCRF Validation Specs"],
      marketTell: "Documenting hands-on discrepancy query management and SAE safety reconciliation between Argus and Rave boosts first-round selection by 3x.",
      roleLink: "/courses/clinical-data-management",
    },
    {
      benchmarkCategory: "CLINICAL BIOSTATISTICS & SAS",
      shortCategory: "SAS BIOSTATS",
      hub: "Bengaluru · Hyderabad · Kolkata Hubs",
      role: "Clinical SAS & Biostatistical Programmer",
      salary: "₹5.50 – ₹8.50 LPA",
      jds: "100+ JDs analysed",
      thumbnail: "/images/benchmarks/benchmark-clinical-sas.webp",
      icon: BarChart2,
      badgeStyle: {
        bg: "bg-purple-50",
        text: "text-purple-700",
        border: "border-purple-200",
      },
      requirements: [
        "CDISC SDTM v3.3 & ADaM v1.1 clinical domain mapping and dataset derivation",
        "Production of regulatory Tables, Listings, and Figures (TLFs) according to ICH E3 guidelines",
        "Double-programming validation macros and statistical safety summaries (AE, Labs, Vitals)",
      ],
      tools: ["Base SAS", "SAS/STAT", "CDISC SDTM v3.3", "Pinnacle 21"],
      marketTell: "Mandatory live practical: generating clean demographic Table 14.1 and Adverse Event summary from raw clinical datasets.",
      roleLink: "/courses/sas-clinical",
    },
    {
      benchmarkCategory: "REGULATORY AFFAIRS & ECTD OPS",
      shortCategory: "REGULATORY OPS",
      hub: "Hyderabad · Mumbai · Ahmedabad Hubs",
      role: "Regulatory Operations & eCTD Specialist",
      salary: "₹4.00 – ₹6.20 LPA",
      jds: "85+ JDs analysed",
      thumbnail: "/images/benchmarks/benchmark-regulatory-affairs.webp",
      icon: FileSpreadsheet,
      badgeStyle: {
        bg: "bg-amber-50",
        text: "text-amber-800",
        border: "border-amber-200",
      },
      requirements: [
        "Electronic Common Technical Document (eCTD) Module 1 to Module 5 dossier compilation",
        "Regulatory lifecycle maintenance: US FDA 505(b)(2)/ANDA amendments, EU MAA variations, CDSCO Form 44",
        "Chemistry, Manufacturing, and Controls (CMC) documentation auditing and SmPC/PIL label review",
      ],
      tools: ["Lorenz docuBridge", "Extedo eCTDmanager", "Adobe Acrobat Pro Tools"],
      marketTell: "Technical evaluations mandate pinpointing structural XML validation errors in eCTD backbone trees and understanding Module 2.4/2.6 nonclinical summaries.",
      roleLink: "/courses/regulatory-affairs",
    },
  ];

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    const cardWidth = 330;
    const index = Math.round(scrollLeft / cardWidth);
    setActiveScrollIndex(Math.min(Math.max(index, 0), benchmarks.length - 1));
  };

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const offset = 340;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -offset : offset,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    handleScroll();
  }, []);

  const selected = selectedIndex !== null ? benchmarks[selectedIndex] : null;

  const prefersReduced = useReducedMotion();

  const headerVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const signalsContainerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.75,
        ease: [0.16, 1, 0.3, 1] as const,
        staggerChildren: 0.1,
      },
    },
  };

  const signalItemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section className="py-14 sm:py-20 bg-[#F8FAFC] border-b border-[#E2E8F0] tone-light card-light" id="employer-insights">
      <div className="ap-shell">
        {/* Header Bar */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8"
          variants={prefersReduced ? undefined : headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-mono font-semibold uppercase tracking-wider text-[#2563EB] mb-3 shadow-2xs tone-light card-light">
              <CheckCircle2 className="h-3 w-3 text-[#10B981]" />
              <span>INDUSTRY BENCHMARKS · 2,000+ REAL JDs ANALYSED</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-sans font-bold text-[#081F38] tracking-tight leading-tight">
              What Healthcare Employers Actually{" "}
              <span className="bg-gradient-to-r from-[#2563EB] via-[#0284C7] to-[#7C3AED] bg-clip-text text-transparent [box-decoration-break:clone]">
                Look For
              </span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#64748B] max-w-2xl leading-relaxed">
              Synthesized from verified job descriptions across global Clinical Research Organisations, pharmaceutical sponsors, and healthcare IT units.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 self-start md:self-auto">
            {/* Horizontal Scroll Navigation Controls */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                aria-label="Previous benchmark card"
                className="grid h-9 w-9 place-items-center rounded-full border border-[#E2E8F0] bg-white text-[#081F38] shadow-2xs hover:bg-[#F8FAFC] disabled:opacity-30 disabled:cursor-not-allowed transition-all tone-light card-light cursor-pointer active:scale-95"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                aria-label="Next benchmark card"
                className="grid h-9 w-9 place-items-center rounded-full border border-[#E2E8F0] bg-white text-[#081F38] shadow-2xs hover:bg-[#F8FAFC] disabled:opacity-30 disabled:cursor-not-allowed transition-all tone-light card-light cursor-pointer active:scale-95"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <Link
              to={"/research" as any}
              className="inline-flex items-center gap-2 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-5 py-2.5 text-xs sm:text-sm font-bold transition-all shadow-sm shrink-0 active:scale-95"
            >
              <span>Explore full research report</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>

        {/* Aggregate Market Signal Strip (Compact & Clean) */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 p-3.5 rounded-2xl bg-white border border-[#E2E8F0] shadow-2xs tone-light card-light"
          variants={prefersReduced ? undefined : signalsContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <motion.div variants={prefersReduced ? undefined : signalItemVariants} className="flex items-center gap-3 px-2">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#EEF6FF] text-[#2563EB]">
              <FileText className="h-4 w-4" />
            </div>
            <div>
              <div className="font-mono text-xs font-bold text-[#081F38]">2,000+ JDs Mapped</div>
              <div className="text-[11px] text-[#64748B]">Across CRO, Pharma & Healthcare Units</div>
            </div>
          </motion.div>

          <motion.div variants={prefersReduced ? undefined : signalItemVariants} className="flex items-center gap-3 px-2 border-t sm:border-t-0 sm:border-l border-[#E2E8F0] pt-2 sm:pt-0">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-700">
              <TrendingUp className="h-4 w-4" />
            </div>
            <div>
              <div className="font-mono text-xs font-bold text-[#081F38]">₹3.80 – ₹6.50 LPA</div>
              <div className="text-[11px] text-[#64748B]">Median Entry-Level CTC Range</div>
            </div>
          </motion.div>

          <motion.div variants={prefersReduced ? undefined : signalItemVariants} className="flex items-center gap-3 px-2 border-t sm:border-t-0 sm:border-l border-[#E2E8F0] pt-2 sm:pt-0">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#EEF6FF] text-[#2563EB]">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <div className="font-mono text-xs font-bold text-[#081F38]">Practical Work Samples</div>
              <div className="text-[11px] text-[#64748B]">#1 Selection Factor in Technical Rounds</div>
            </div>
          </motion.div>
        </motion.div>

        {/* 6 Clean Apple-Style Horizontal Cards Carousel */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-4 sm:gap-5 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scroll-smooth [scrollbar-width:thin]"
        >
          {benchmarks.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.benchmarkCategory}
                onClick={() => setSelectedIndex(index)}
                initial={prefersReduced ? undefined : { opacity: 0, y: 24 }}
                whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={
                  prefersReduced
                    ? undefined
                    : {
                        duration: 0.75,
                        delay: index * 0.08,
                        ease: [0.16, 1, 0.3, 1] as const,
                      }
                }
                whileHover={prefersReduced ? undefined : { y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
                className="w-[285px] sm:w-[325px] shrink-0 snap-start flex flex-col justify-between rounded-2xl border border-[#E2E8F0] bg-white p-4 sm:p-5 shadow-xs hover:border-[#2563EB]/40 hover:shadow-xl transition-all duration-200 tone-light card-light cursor-pointer group text-left"
              >
                <div>
                  {/* Apple-Style UI Concept Thumbnail */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-slate-900 mb-3.5 border border-slate-200/60 shadow-2xs">
                    <img
                      src={item.thumbnail}
                      alt={item.role}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      loading="lazy"
                    />
                    {/* Index chip */}
                    <div className="absolute top-2.5 left-2.5 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold backdrop-blur-md bg-white/90 text-[#081F38] border border-white/80 shadow-xs">
                      <Icon className="h-3 w-3 text-[#2563EB]" />
                      <span>0{index + 1}</span>
                    </div>
                    {/* Clean Short Category chip (no ellipsis truncation) */}
                    <div className="absolute top-2.5 right-2.5 inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-mono font-bold backdrop-blur-md bg-[#081F38]/85 text-white shadow-xs tracking-wider">
                      <span>{item.shortCategory}</span>
                    </div>
                  </div>

                  {/* Target Role Title */}
                  <h3 className="font-sans text-sm sm:text-base font-bold text-[#081F38] leading-snug group-hover:text-[#2563EB] transition-colors line-clamp-2 min-h-[2.5rem]">
                    {item.role}
                  </h3>

                  {/* CTC Band & JD Count */}
                  <div className="mt-2.5 flex items-center justify-between gap-2 text-xs font-mono">
                    <span className="font-bold text-[#2563EB] bg-[#EEF6FF] border border-[#D0E1FD] px-2 py-0.5 rounded-md text-[11px]">
                      {item.salary}
                    </span>
                    <span className="text-[#64748B] text-[10.5px]">
                      {item.jds}
                    </span>
                  </div>

                  {/* Location Hub */}
                  <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-[#64748B] font-mono">
                    <MapPin className="h-3 w-3 text-slate-400 shrink-0" />
                    <span className="truncate">{item.hub}</span>
                  </div>
                </div>

                {/* Card Bottom CTA Trigger */}
                <div className="mt-4 pt-3 border-t border-[#F1F5F9] flex items-center justify-between">
                  <span className="text-xs font-bold text-[#2563EB] group-hover:text-[#1D4ED8] transition-colors inline-flex items-center gap-1">
                    <span>View hiring criteria</span>
                  </span>
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-[#EEF6FF] text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white transition-colors shadow-2xs">
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Track Footer Indicators & Minimal Prompt */}
        <div className="mt-3 flex items-center justify-between text-xs text-[#64748B]">
          <span className="font-mono text-[11px]">
            Showing 6 verified healthcare tracks · Click any card to inspect full criteria
          </span>
          <div className="hidden sm:flex items-center gap-1.5">
            {benchmarks.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  if (scrollRef.current) {
                    const cardWidth = 345;
                    scrollRef.current.scrollTo({ left: i * cardWidth, behavior: "smooth" });
                  }
                }}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  activeScrollIndex === i ? "w-6 bg-[#2563EB]" : "w-2 bg-slate-200 hover:bg-slate-300"
                }`}
                aria-label={`Jump to benchmark ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Full Benchmark Matter Modal Dialog */}
        <Dialog open={selectedIndex !== null} onOpenChange={(open) => !open && setSelectedIndex(null)}>
          <DialogContent className="max-h-[88vh] max-w-2xl overflow-y-auto border border-[#E2E8F0] bg-white p-6 sm:p-8 tone-light card-light rounded-2xl shadow-2xl">
            {selected && (
              <>
                <DialogHeader className="text-left">
                  <DialogTitle className="sr-only">
                    {selected.role}
                  </DialogTitle>
                  <DialogDescription className="sr-only">
                    {selected.benchmarkCategory} - {selected.hub}
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-5 pt-1">
                  {/* Modal Header Thumbnail Banner */}
                  <div className="relative aspect-[21/9] w-full overflow-hidden rounded-xl bg-slate-900 border border-slate-200/60 shadow-xs">
                    <img
                      src={selected.thumbnail}
                      alt={selected.role}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#081F38]/85 via-[#081F38]/30 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white flex-wrap gap-2">
                      <span className="text-[11px] font-mono font-bold tracking-wider uppercase bg-[#081F38]/90 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/20">
                        {selected.benchmarkCategory}
                      </span>
                      <span className="text-[11px] font-mono font-semibold bg-[#081F38]/90 backdrop-blur-md px-2 py-1 rounded-md border border-white/20 flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-slate-300" />
                        {selected.hub}
                      </span>
                    </div>
                  </div>

                  {/* Eyebrow & Prev/Next Switcher */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#F1F5F9] pb-3">
                    <span className="text-xs text-[#64748B] flex items-center gap-1">
                      <ShieldCheck className="h-4 w-4 text-emerald-600" />
                      <span className="font-semibold text-[#081F38]">Verified Employer Benchmark</span>
                    </span>

                    {/* Role Index Switcher inside Modal */}
                    <div className="flex items-center gap-1.5 font-mono text-xs text-[#64748B]">
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedIndex((prev) =>
                            prev !== null ? (prev - 1 + benchmarks.length) % benchmarks.length : 0
                          )
                        }
                        className="rounded p-1 text-slate-500 hover:bg-slate-100 hover:text-[#081F38] transition-colors cursor-pointer"
                        title="Previous benchmark"
                        aria-label="Previous benchmark"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <span className="font-bold text-[#081F38]">
                        {selectedIndex! + 1} / {benchmarks.length}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedIndex((prev) =>
                            prev !== null ? (prev + 1) % benchmarks.length : 0
                          )
                        }
                        className="rounded p-1 text-slate-500 hover:bg-slate-100 hover:text-[#081F38] transition-colors cursor-pointer"
                        title="Next benchmark"
                        aria-label="Next benchmark"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Title & Compensation Bar */}
                  <div>
                    <h3 className="font-sans text-xl sm:text-2xl font-bold text-[#081F38] leading-snug">
                      {selected.role}
                    </h3>
                    <div className="mt-2.5 flex flex-wrap items-center gap-2.5">
                      <span className="font-mono font-bold text-sm text-[#2563EB] bg-[#EEF6FF] border border-[#D0E1FD] px-3 py-1 rounded-lg">
                        {selected.salary}
                      </span>
                      <span className="font-mono text-xs text-[#64748B] bg-[#F8FAFC] border border-[#E2E8F0] px-2.5 py-1 rounded-lg">
                        {selected.jds}
                      </span>
                    </div>
                  </div>

                  {/* Key Requirements List: What Hiring Managers Test For */}
                  <div className="space-y-2.5 rounded-xl bg-[#F8FAFC] p-4 border border-[#E2E8F0]">
                    <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#1557D6] flex items-center gap-1.5">
                      <span>WHAT HIRING MANAGERS TEST FOR (TECHNICAL ROUNDS):</span>
                    </div>
                    <ul className="space-y-2 text-xs sm:text-sm text-[#334155]">
                      {selected.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                          <CheckCircle2 className="h-4 w-4 text-[#2563EB] shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Mandatory Tools */}
                  <div className="space-y-2">
                    <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                      MANDATORY SOFTWARE & PROTOCOLS TESTED:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selected.tools.map((tool) => (
                        <span
                          key={tool}
                          className="inline-flex items-center rounded-lg bg-white px-3 py-1.5 text-xs font-mono font-semibold text-[#081F38] border border-[#E2E8F0] shadow-2xs tone-light card-light"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* JD Technical Insight Banner: Recruitment Reality */}
                  <div className="rounded-xl border border-amber-200/80 bg-amber-50/70 p-4 text-xs sm:text-sm text-amber-950 leading-relaxed font-sans">
                    <strong className="font-bold font-mono text-[11px] uppercase text-amber-800 flex items-center gap-1.5 mb-1.5">
                      <span>💡 RECRUITMENT REALITY:</span>
                    </strong>
                    <p className="leading-relaxed">{selected.marketTell}</p>
                  </div>

                  {/* Modal Footer Actions */}
                  <div className="pt-2 border-t border-[#F1F5F9] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <Link
                      to="/career-engine/start"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-6 py-3 text-xs sm:text-sm font-bold transition-all shadow-sm"
                    >
                      <span>Take diagnostic assessment</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      to={selected.roleLink as any}
                      className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-[#64748B] hover:text-[#081F38] transition-colors py-2"
                    >
                      <span>Explore role curriculum</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Compliance Research Disclaimer */}
        <div className="mt-8 rounded-xl border border-[#E2E8F0] bg-white p-4 text-center text-xs text-[#64748B] tone-light card-light max-w-4xl mx-auto shadow-2xs">
          <strong>Aggregated Market Research Methodology:</strong> Data synthesized across 2,000+ public healthcare, CRO, and life sciences job descriptions and hiring intake audits (Q1–Q4 2025/2026). Compensation bands reflect verified entry-level to mid-level CTC offerings in tier-1 Indian life sciences hubs (Hyderabad, Bengaluru, Mumbai, Pune, Chennai). All benchmarks are compiled for candidate career intelligence and curriculum alignment.
        </div>
      </div>
    </section>
  );
}
