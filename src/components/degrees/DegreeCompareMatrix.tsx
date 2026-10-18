import { Link } from "@tanstack/react-router";
import { CheckCircle2, Sparkles, HelpCircle, ArrowUpRight } from "lucide-react";

interface MatrixRow {
  degreeSlug: string;
  degreeName: string;
  shortTitle: string;
  duration: string;
  pv: { fit: "direct" | "high" | "bridge" | "na"; note: string };
  cdm: { fit: "direct" | "high" | "bridge" | "na"; note: string };
  coding: { fit: "direct" | "high" | "bridge" | "na"; note: string };
  sas: { fit: "direct" | "high" | "bridge" | "na"; note: string };
  ra: { fit: "direct" | "high" | "bridge" | "na"; note: string };
}

const MATRIX_DATA: MatrixRow[] = [
  {
    degreeSlug: "bpharm",
    degreeName: "B.Pharm (Bachelor of Pharmacy)",
    shortTitle: "B.Pharm",
    duration: "4 Years",
    pv: { fit: "direct", note: "Primary candidate pool for ICSR case processing and MedDRA coding." },
    cdm: { fit: "direct", note: "Strong clinical trial fundamentals and eCRF discrepancy resolution." },
    coding: { fit: "high", note: "Pharmacology & anatomy background matches outpatient/inpatient coding." },
    sas: { fit: "high", note: "Analytical aptitude; requires CDISC SDTM and Base SAS practical labs." },
    ra: { fit: "high", note: "Pharmaceutics & quality assurance supports dossier compilation." },
  },
  {
    degreeSlug: "pharmd",
    degreeName: "Pharm.D (Doctor of Pharmacy)",
    shortTitle: "Pharm.D",
    duration: "6 Years",
    pv: { fit: "direct", note: "Clinical bedside triage, causality assessment, and aggregate safety reports." },
    cdm: { fit: "direct", note: "Protocol interpretation, clinical edit checks, and trial monitoring." },
    coding: { fit: "direct", note: "Advanced therapeutics understanding accelerates complex surgical coding." },
    sas: { fit: "high", note: "Clinical trial knowledge accelerates SDTM/ADaM programming workflow." },
    ra: { fit: "high", note: "Clinical study reports (CSR), investigator brochures, and USFDA guidelines." },
  },
  {
    degreeSlug: "mpharm",
    degreeName: "M.Pharm (Master of Pharmacy)",
    shortTitle: "M.Pharm",
    duration: "2 Years (PG)",
    pv: { fit: "direct", note: "Advanced pharmacology/toxicology aligns with safety signal analysis." },
    cdm: { fit: "direct", note: "Postgraduate research training supports data management planning." },
    coding: { fit: "high", note: "Specialized clinical acumen for specialty chart review and compliance audit." },
    sas: { fit: "high", note: "Strong quantitative orientation commands premium entry-level starting CTC." },
    ra: { fit: "direct", note: "Specialized CMC, eCTD submission dossiers, and global regulatory affairs." },
  },
  {
    degreeSlug: "bsc-lifesciences",
    degreeName: "B.Sc Life Sciences (Biotech / Biochem / Micro)",
    shortTitle: "B.Sc Life Sci",
    duration: "3 Years",
    pv: { fit: "high", note: "Biological processes foundation; requires safety database simulator training." },
    cdm: { fit: "direct", note: "Laboratory data collection rigor translates directly to clinical trials." },
    coding: { fit: "high", note: "Human anatomy and physiology knowledge; requires ICD-10 encoder tools." },
    sas: { fit: "high", note: "Quantitative science background; natural transition to clinical biostatistics." },
    ra: { fit: "bridge", note: "Requires foundational bridging into pharmaceutical dossier regulations." },
  },
  {
    degreeSlug: "msc-lifesciences",
    degreeName: "M.Sc Life Sciences (Biotech / Micro / Stats)",
    shortTitle: "M.Sc Life Sci",
    duration: "2 Years (PG)",
    pv: { fit: "high", note: "Scientific literature synthesis supports narrative drafting and triage." },
    cdm: { fit: "direct", note: "Postgraduate methodology aligns with EDC, data validation, and database lock." },
    coding: { fit: "high", note: "Advanced pathophysiology foundation supports inpatient chart auditing." },
    sas: { fit: "direct", note: "Prime candidate pool for CDISC SDTM/ADaM programming and TLF output." },
    ra: { fit: "high", note: "Biological characterization knowledge supports global regulatory writing." },
  },
  {
    degreeSlug: "allied-health",
    degreeName: "Allied Health (BDS / Nursing / BAMS / BHMS)",
    shortTitle: "Allied Health",
    duration: "4–5.5 Years",
    pv: { fit: "high", note: "Clinical triage and symptom assessment simplify adverse event scoring." },
    cdm: { fit: "high", note: "Clinical chart familiarization aligns with trial discrepancy management." },
    coding: { fit: "direct", note: "Clinical diagnostic and surgical acumen accelerates inpatient coding." },
    sas: { fit: "bridge", note: "Requires bridging in computer programming and statistical databases." },
    ra: { fit: "bridge", note: "Requires bridging from bedside clinical work to corporate dossier drafting." },
  },
  {
    degreeSlug: "dpharm",
    degreeName: "D.Pharm (Diploma in Pharmacy)",
    shortTitle: "D.Pharm",
    duration: "2 Years",
    pv: { fit: "bridge", note: "Initial safety case intake, receipt tracking, and document triage." },
    cdm: { fit: "bridge", note: "Clinical trial documentation support and entry-level data processing." },
    coding: { fit: "bridge", note: "Outpatient evaluation and management coding trainee roles." },
    sas: { fit: "na", note: "Requires higher quantitative or degree qualification for MNC programming." },
    ra: { fit: "na", note: "MNC corporate dossiers require bachelor qualification minimum." },
  },
];

export function DegreeCompareMatrix() {
  const renderCellBadge = (cell: { fit: "direct" | "high" | "bridge" | "na"; note: string }) => {
    switch (cell.fit) {
      case "direct":
        return (
          <div className="group/cell relative flex flex-col items-center">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-1 font-mono text-[10.5px] font-bold text-emerald-800">
              <CheckCircle2 className="h-3 w-3 text-emerald-600" />
              <span>Direct Match</span>
            </span>
            <div className="absolute bottom-full mb-1.5 hidden group-hover/cell:block w-48 rounded-lg bg-[#081F38] text-white p-2 text-[10.5px] font-normal leading-snug shadow-xl z-20 pointer-events-none text-left">
              {cell.note}
            </div>
          </div>
        );
      case "high":
        return (
          <div className="group/cell relative flex flex-col items-center">
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 border border-blue-200 px-2.5 py-1 font-mono text-[10.5px] font-bold text-[#1D4ED8]">
              <CheckCircle2 className="h-3 w-3 text-[#2563EB]" />
              <span>High Fit</span>
            </span>
            <div className="absolute bottom-full mb-1.5 hidden group-hover/cell:block w-48 rounded-lg bg-[#081F38] text-white p-2 text-[10.5px] font-normal leading-snug shadow-xl z-20 pointer-events-none text-left">
              {cell.note}
            </div>
          </div>
        );
      case "bridge":
        return (
          <div className="group/cell relative flex flex-col items-center">
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200 px-2.5 py-1 font-mono text-[10.5px] font-bold text-amber-900">
              <Sparkles className="h-3 w-3 text-amber-600" />
              <span>Bridge Path</span>
            </span>
            <div className="absolute bottom-full mb-1.5 hidden group-hover/cell:block w-48 rounded-lg bg-[#081F38] text-white p-2 text-[10.5px] font-normal leading-snug shadow-xl z-20 pointer-events-none text-left">
              {cell.note}
            </div>
          </div>
        );
      case "na":
      default:
        return (
          <div className="group/cell relative flex flex-col items-center">
            <span className="inline-flex items-center rounded-full bg-slate-100 border border-slate-200 px-2.5 py-1 font-mono text-[10.5px] font-medium text-[#94A3B8]">
              &mdash;
            </span>
            <div className="absolute bottom-full mb-1.5 hidden group-hover/cell:block w-48 rounded-lg bg-[#081F38] text-white p-2 text-[10.5px] font-normal leading-snug shadow-xl z-20 pointer-events-none text-left">
              {cell.note}
            </div>
          </div>
        );
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-white border-b border-[#E4EAF2] tone-light card-light">
      <div className="mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-mono font-semibold uppercase tracking-wider text-[#2563EB] mb-2 shadow-2xs tone-light card-light">
          <HelpCircle className="h-3 w-3 text-[#2563EB]" />
          <span>CROSS-QUALIFICATION FIT MATRIX</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#081F38] tracking-tight">
          How Healthcare Qualifications Map to{" "}
          <span className="bg-gradient-to-r from-[#2563EB] via-[#0284C7] to-[#7C3AED] bg-clip-text text-transparent [box-decoration-break:clone]">
            GCC &amp; CRO Role Families
          </span>
        </h2>
        <p className="mt-1.5 text-sm sm:text-base text-[#475569] max-w-2xl font-normal">
          Side-by-side corporate hiring compatibility matrix based on 2,000+ verified job descriptions across pharmaceutical MNCs and Clinical Research Organizations.
        </p>
      </div>

      {/* Legend Chips */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-4 pb-4 mb-4 border-b border-[#E4EAF2] text-xs text-[#475569]">
        <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#081F38]">
          Hiring Fit Key:
        </span>
        <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 font-mono text-[10.5px] font-bold text-emerald-800">
          <CheckCircle2 className="h-3 w-3 text-emerald-600" />
          <span>Direct Match</span>
          <span className="text-[10px] text-emerald-600 font-normal ml-0.5">(Direct qualification alignment)</span>
        </div>
        <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-200 px-2.5 py-0.5 font-mono text-[10.5px] font-bold text-[#1D4ED8]">
          <CheckCircle2 className="h-3 w-3 text-[#2563EB]" />
          <span>High Fit</span>
          <span className="text-[10px] text-blue-600 font-normal ml-0.5">(Natural transition with tool training)</span>
        </div>
        <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200 px-2.5 py-0.5 font-mono text-[10.5px] font-bold text-amber-900">
          <Sparkles className="h-3 w-3 text-amber-600" />
          <span>Bridge Path</span>
          <span className="text-[10px] text-amber-700 font-normal ml-0.5">(Cross-domain with guided portfolio)</span>
        </div>
      </div>

      {/* Matrix Table with Horizontal Scroll */}
      <div className="overflow-x-auto rounded-2xl border border-[#E2E8F0] bg-white shadow-xs tone-light card-light">
        <table className="w-full min-w-[760px] border-collapse text-left text-xs">
          <thead>
            <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC]">
              <th className="py-3.5 px-4 font-bold text-[#081F38] sticky left-0 bg-[#F8FAFC] z-10 w-52 sm:w-64 border-r border-[#E2E8F0]">
                Degree Qualification
              </th>
              <th className="py-3.5 px-3 font-bold text-[#081F38] text-center w-36">
                Pharmacovigilance (PV)
              </th>
              <th className="py-3.5 px-3 font-bold text-[#081F38] text-center w-36">
                Clinical Data (CDM)
              </th>
              <th className="py-3.5 px-3 font-bold text-[#081F38] text-center w-36">
                Medical Coding (RCM)
              </th>
              <th className="py-3.5 px-3 font-bold text-[#081F38] text-center w-36">
                Clinical SAS (Data)
              </th>
              <th className="py-3.5 px-3 font-bold text-[#081F38] text-center w-36">
                Regulatory Affairs (RA)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E4EAF2]">
            {MATRIX_DATA.map((row) => (
              <tr key={row.degreeSlug} className="hover:bg-[#F8FAFC]/80 transition-colors">
                {/* Degree Name Cell */}
                <td className="py-3.5 px-4 font-semibold text-[#081F38] sticky left-0 bg-white hover:bg-[#F8FAFC]/80 z-10 border-r border-[#E2E8F0] tone-light card-light">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <Link
                        to="/degrees/$slug"
                        params={{ slug: row.degreeSlug }}
                        className="font-bold text-[#081F38] hover:text-[#2563EB] transition-colors flex items-center gap-1 group"
                      >
                        <span>{row.shortTitle}</span>
                        <ArrowUpRight className="h-3 w-3 text-[#94A3B8] opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                      <div className="font-mono text-[10px] text-[#64748B] mt-0.5">
                        {row.duration}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Columns */}
                <td className="py-3 px-2 text-center">{renderCellBadge(row.pv)}</td>
                <td className="py-3 px-2 text-center">{renderCellBadge(row.cdm)}</td>
                <td className="py-3 px-2 text-center">{renderCellBadge(row.coding)}</td>
                <td className="py-3 px-2 text-center">{renderCellBadge(row.sas)}</td>
                <td className="py-3 px-2 text-center">{renderCellBadge(row.ra)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3 flex items-center justify-between text-[11px] text-[#64748B] px-1 font-mono">
        <span>* Hover over any badge to see specific recruiter alignment rationale.</span>
        <span className="hidden sm:inline">Updated based on Q1 2026 hiring benchmarks</span>
      </div>
    </section>
  );
}
