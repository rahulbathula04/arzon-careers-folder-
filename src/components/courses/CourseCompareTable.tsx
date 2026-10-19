import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, ExternalLink } from "lucide-react";

interface TrackCompareRow {
  slug: string;
  title: string;
  targetRole: string;
  deliverable: string;
  software: string[];
  salaryY1: string;
  salaryY3: string;
  degreeFit: string;
}

const COMPARISON_ROWS: TrackCompareRow[] = [
  {
    slug: "pharmacovigilance",
    title: "Pharmacovigilance & Safety",
    targetRole: "Drug Safety Associate / ICSR Trainee",
    deliverable: "100-Case ICSR Safety Dossier & Narratives",
    software: ["Enterprise Safety DB", "MedDRA", "E2B(R3)"],
    salaryY1: "₹4.20 LPA",
    salaryY3: "₹8.50 LPA",
    degreeFit: "B.Pharm, Pharm.D, M.Pharm, BDS",
  },
  {
    slug: "clinical-data-management",
    title: "Clinical Data Management (CDM)",
    targetRole: "Clinical Data Associate / EDC Data Manager",
    deliverable: "eCRF Specification & Data Validation Plan (DVP)",
    software: ["Electronic Data Capture", "CDASH", "SDTM"],
    salaryY1: "₹4.00 LPA",
    salaryY3: "₹8.00 LPA",
    degreeFit: "B.Pharm, M.Pharm, Life Sciences",
  },
  {
    slug: "sas-clinical",
    title: "Clinical SAS Programming",
    targetRole: "Clinical Statistical Programmer / SAS Analyst",
    deliverable: "SDTM / ADaM Datasets with Production TLFs",
    software: ["Base SAS", "SAS Macros", "Pinnacle 21"],
    salaryY1: "₹4.50 LPA",
    salaryY3: "₹9.20 LPA",
    degreeFit: "B.Pharm, M.Pharm, B.Tech, Stats",
  },
  {
    slug: "medical-coding",
    title: "Medical Coding & Informatics",
    targetRole: "Medical Coder (Inpatient / Outpatient / RCM)",
    deliverable: "100-Chart ICD-10-CM / CPT Specialty Coding Audit",
    software: ["ICD-10-CM", "CPT", "CAC Encoders"],
    salaryY1: "₹3.50 LPA",
    salaryY3: "₹7.50 LPA",
    degreeFit: "B.Pharm, Life Sciences, BDS, Nursing",
  },
  {
    slug: "regulatory-affairs",
    title: "Global Regulatory Affairs",
    targetRole: "Regulatory Affairs Trainee / Dossier Associate",
    deliverable: "Complete eCTD Module 1–5 Submission Dossier",
    software: ["eCTD Software", "SUGAM / CDSCO", "FDA ESG"],
    salaryY1: "₹3.80 LPA",
    salaryY3: "₹7.80 LPA",
    degreeFit: "M.Pharm, B.Pharm, Pharm.D",
  },
  {
    slug: "medical-writing",
    title: "Medical Writing & Documentation",
    targetRole: "Associate Medical Writer / CSR Document Specialist",
    deliverable: "ICH E3 Clinical Study Report (CSR) Summary",
    software: ["ICH E3 Templates", "CSR Protocols", "Zotero"],
    salaryY1: "₹3.80 LPA",
    salaryY3: "₹8.00 LPA",
    degreeFit: "Pharm.D, MBBS, M.Pharm, Life Sci",
  },
  {
    slug: "bioinformatics",
    title: "Bioinformatics & Genomic Data",
    targetRole: "Bioinformatics Analyst / Clinical Genomics Associate",
    deliverable: "End-to-End Nextflow WES Pipeline & ACMG Dossier",
    software: ["Linux / Bash", "Python", "GATK v4", "VEP / ClinVar", "IGV", "Nextflow"],
    salaryY1: "₹4.80 LPA",
    salaryY3: "₹9.50 LPA",
    degreeFit: "Biotech, Life Sciences, Genetics, B.Pharm",
  },
];

export function CourseCompareTable() {
  return (
    <section aria-labelledby="compare-table-heading" className="py-12 sm:py-16 border-t border-[#E4EAF2]">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-mono font-semibold uppercase tracking-wider text-[#2563EB] mb-2 shadow-2xs tone-light card-light">
            <CheckCircle2 className="h-3 w-3 text-[#10B981]" />
            <span>ROLE ARCHITECTURE</span>
          </div>
          <h2
            id="compare-table-heading"
            className="text-2xl sm:text-3xl font-bold text-[#081F38] tracking-tight"
          >
            Compare Core Clinical &amp; Informatics Tracks
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#475569] max-w-2xl">
            Every track is reverse-engineered from actual GCC recruiter screening rubrics, with a distinct deliverable and toolchain.
          </p>
        </div>

        <Link
          to="/courses/compare"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#1557D6] hover:text-[#071A4A] transition-colors"
        >
          <span>Open interactive comparison matrix</span>
          <ExternalLink className="h-4 w-4" />
        </Link>
      </div>

      {/* Comparison Table */}
      <div className="overflow-hidden rounded-2xl border border-[#E4EAF2] bg-white shadow-xs tone-light card-light">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[760px]">
            <thead>
              <tr className="border-b border-[#E4EAF2] bg-[#F8FAFC]">
                <th className="py-4 px-5 font-mono text-[11px] font-bold uppercase tracking-wider text-[#071A4A]">
                  Track & Role
                </th>
                <th className="py-4 px-5 font-mono text-[11px] font-bold uppercase tracking-wider text-[#071A4A]">
                  Practical Deliverable
                </th>
                <th className="py-4 px-5 font-mono text-[11px] font-bold uppercase tracking-wider text-[#071A4A]">
                  Software Stack
                </th>
                <th className="py-4 px-5 font-mono text-[11px] font-bold uppercase tracking-wider text-[#071A4A]">
                  Salary (Y1 → Y3)
                </th>
                <th className="py-4 px-5 font-mono text-[11px] font-bold uppercase tracking-wider text-[#071A4A]">
                  Degree Fit
                </th>
                <th className="py-4 px-5 text-right font-mono text-[11px] font-bold uppercase tracking-wider text-[#071A4A]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4EAF2] text-xs">
              {COMPARISON_ROWS.map((row) => (
                <tr
                  key={row.slug}
                  className="transition-colors hover:bg-[#F8FAFC]/80 group"
                >
                  {/* Track & Target Role */}
                  <td className="py-4 px-5">
                    <p className="font-bold text-[#071A4A] text-sm group-hover:text-[#1557D6] transition-colors">
                      <Link to="/courses/$slug" params={{ slug: row.slug }}>
                        {row.title}
                      </Link>
                    </p>
                    <p className="mt-0.5 text-[#64748B] font-medium">
                      {row.targetRole}
                    </p>
                  </td>

                  {/* Practical Deliverable */}
                  <td className="py-4 px-5">
                    <div className="flex items-start gap-1.5">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-[#10B981] mt-0.5" />
                      <span className="font-semibold text-[#081F38] leading-relaxed">
                        {row.deliverable}
                      </span>
                    </div>
                  </td>

                  {/* Software Stack */}
                  <td className="py-4 px-5">
                    <div className="flex flex-wrap gap-1">
                      {row.software.map((s) => (
                        <span
                          key={s}
                          className="rounded-md bg-[#F1F5F9] border border-slate-200/70 px-2 py-0.5 font-mono text-[10px] font-semibold text-[#475569]"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </td>

                  {/* Salary Band */}
                  <td className="py-4 px-5 whitespace-nowrap">
                    <p className="font-bold text-[#081F38]">{row.salaryY1}</p>
                    <p className="font-mono text-[10px] text-[#64748B]">
                      Y3: <span className="font-semibold text-[#10B981]">{row.salaryY3}</span>
                    </p>
                  </td>

                  {/* Degree Fit */}
                  <td className="py-4 px-5 text-[#64748B]">
                    <span className="font-medium">{row.degreeFit}</span>
                  </td>

                  {/* Action Link */}
                  <td className="py-4 px-5 text-right whitespace-nowrap">
                    <Link
                      to="/courses/$slug"
                      params={{ slug: row.slug }}
                      aria-label={`View ${row.title} syllabus`}
                      className="inline-flex items-center gap-1 font-bold text-[#1557D6] hover:text-[#071A4A]"
                    >
                      <span>Syllabus</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
