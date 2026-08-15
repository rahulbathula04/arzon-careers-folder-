import React from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Stethoscope, FileText, Database, Code, Award, BookOpen } from "lucide-react";
import { PremiumChip } from "@/components/ui/PremiumChip";

const CLINICAL_TRACKS = [
  {
    icon: Stethoscope,
    title: "Drug Safety Associate / Pharmacovigilance",
    salary: "₹2.8–4.2 LPA starting",
    jds: "1,247 JDs analysed (Hyderabad & Bengaluru)",
    hiring: "High",
    difficulty: "Medium",
    demand: "Steady",
    desc: "Process ICSRs in Argus, write case narratives, work to IQVIA and Cognizant SLAs.",
    slug: "pharmacovigilance",
  },
  {
    icon: FileText,
    title: "Medical Coder",
    salary: "₹2.4–3.8 LPA starting",
    jds: "1,493 JDs analysed (Chennai & Hyderabad)",
    hiring: "Very High",
    difficulty: "Medium",
    demand: "Strong",
    desc: "Code real US patient charts in ICD-10-CM, CPT, HCPCS to AAPC-grade accuracy.",
    slug: "medical-coding",
  },
  {
    icon: Database,
    title: "Clinical Data Associate",
    salary: "₹3.0–4.5 LPA starting",
    jds: "486 JDs analysed (Bengaluru & Hyderabad)",
    hiring: "Medium",
    difficulty: "Medium-High",
    demand: "Growing",
    desc: "Manage, validate, and report clinical trial data using industry-standard tools.",
    slug: "clinical-data-management",
  },
  {
    icon: Code,
    title: "Clinical SAS Programmer",
    salary: "₹3.6–5.2 LPA starting",
    jds: "522 JDs analysed (Bengaluru & Hyderabad)",
    hiring: "Medium",
    difficulty: "High",
    demand: "Strong",
    desc: "Write Base SAS programmes, create SDTM mappings per CDISC standards, build datasets for regulatory submissions.",
    slug: "clinical-sas",
  },
  {
    icon: Award,
    title: "Regulatory Affairs Associate",
    salary: "₹3.0–4.2 LPA starting",
    jds: "437 JDs analysed (Hyderabad & Mumbai)",
    hiring: "Medium",
    difficulty: "Medium",
    demand: "Steady",
    desc: "Prepare CTD-aligned dossiers, handle CDSCO submissions, manage labelling and artwork QC.",
    slug: "regulatory-affairs",
  },
  {
    icon: BookOpen,
    title: "Medical Writer",
    salary: "₹3.0–4.5 LPA starting",
    jds: "421 JDs analysed (Bengaluru & Hyderabad)",
    hiring: "Medium",
    difficulty: "Medium",
    demand: "Growing",
    desc: "Write Clinical Study Reports to ICH-E3 format, prepare patient narratives, protocol summaries.",
    slug: "medical-writing",
  },
];

/**
 * Section Five — Clinical Tracks
 * Design: Light warm background (#FAF8F5), editorial layout for pharmacy
 * and life sciences graduates. 6 detailed role track cards.
 */
export function ClinicalTracksBlock() {
  return (
    <section
      id="clinical-tracks"
      aria-labelledby="clinical-heading"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5] text-[#1A1A1A] border-b border-stone-300/80"
    >
      <div className="mx-auto max-w-7xl space-y-12">
        {/* Header */}
        <div className="space-y-3 max-w-3xl">
          <PremiumChip variant="navy" size="md">
            CLINICAL HEALTHCARE TRACKS · FOR PHARMACY AND LIFE SCIENCES GRADUATES
          </PremiumChip>
          <h2
            id="clinical-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#1A1A1A] tracking-tight leading-[1.18]"
          >
            Not everyone wants to write Python.{" "}
            <span className="italic text-[#1B3F8B]">
              India's pharma and clinical research sector pays well and is growing faster than anyone is preparing students for it.
            </span>
          </h2>
          <p className="text-base text-stone-700 leading-relaxed font-sans">
            If you have a B.Pharm, M.Pharm, Pharm.D, D.Pharm, B.Sc in Life Sciences, or a nursing background, these tracks
            are built for you. We analysed thousands of JDs from Indian pharma companies, CROs, and hospitals. We extracted
            exactly what each role requires on Day 1. We built training around those requirements. Not around a syllabus.
          </p>
        </div>

        {/* 6 Track Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CLINICAL_TRACKS.map((t) => {
            const Icon = t.icon;
            return (
              <div
                key={t.title}
                className="rounded-2xl border border-stone-300 bg-white tone-light p-6 space-y-4 flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-stone-100 text-[#1B3F8B]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-[10px] font-bold text-[#1B3F8B] bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                      {t.salary}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#1A1A1A]">{t.title}</h3>
                    <p className="font-mono text-[10px] text-stone-700 mt-0.5">{t.jds}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 text-[10px] font-mono text-stone-600">
                    <span className="bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
                      Hiring: <strong>{t.hiring}</strong>
                    </span>
                    <span className="bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
                      Diff: <strong>{t.difficulty}</strong>
                    </span>
                    <span className="bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
                      Demand: <strong>{t.demand}</strong>
                    </span>
                  </div>

                  <p className="text-xs text-stone-700 leading-relaxed font-sans border-t border-stone-100 pt-3">
                    <strong className="font-semibold text-[#1A1A1A]">What you do:</strong> {t.desc}
                  </p>
                </div>

                <Link
                  to="/courses"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1B3F8B] hover:text-[#153270] pt-2"
                >
                  <span>View Track Details</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Real-time Update Notice */}
        <div className="rounded-xl border border-stone-300 bg-white tone-light p-5 text-center max-w-3xl mx-auto">
          <p className="text-xs text-stone-700 leading-relaxed">
            Each track is updated when JD language changes. When IQVIA starts requiring a new tool or when CDSCO revises
            submission formats, our curriculum updates within one cycle. We show the date of each update on the track page
            so you know what you are learning is current.
          </p>
        </div>
      </div>
    </section>
  );
}
