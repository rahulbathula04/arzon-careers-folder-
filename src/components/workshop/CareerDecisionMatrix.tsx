import { useState } from "react";
import { CheckCircle2, ShieldCheck, ArrowRight, Sparkles, Building2, HelpCircle } from "lucide-react";

export interface DecisionMatrixItem {
  career: string;
  fresherAccess: "Very High" | "High" | "Moderate" | "Selective";
  startingSalary: string;
  skills: string;
  tools: string;
  workStyle: string;
  progression: string;
}

export const CAREER_DECISION_MATRIX_DATA: DecisionMatrixItem[] = [
  {
    career: "Medical Coding",
    fresherAccess: "Very High",
    startingSalary: "₹3.5L – ₹4.8L LPA",
    skills: "Medical terminology, chart auditing, diagnostic coding",
    tools: "ICD-10-CM 2026, CPT-4, EncoderPro",
    workStyle: "Office / Corporate RCM",
    progression: "Coding Trainee → Coder → Senior Coder → Auditor → Lead"
  },
  {
    career: "Pharmacovigilance (PV)",
    fresherAccess: "High",
    startingSalary: "₹3.8L – ₹5.8L LPA",
    skills: "Pharmacology, ICSR processing, adverse event triage",
    tools: "Oracle Argus Safety 8.4, MedDRA 27.0",
    workStyle: "Corporate GCC / Pharma",
    progression: "Associate → Senior Associate → Specialist → Manager"
  },
  {
    career: "Clinical Data Management (CDM)",
    fresherAccess: "High",
    startingSalary: "₹4.0L – ₹6.2L LPA",
    skills: "Data quality checks, eCRF validation, query resolution",
    tools: "Medidata RAVE, CDASH, Advanced Excel",
    workStyle: "Corporate CRO / Pharma",
    progression: "Data Coordinator → CDA → CDM Lead → Manager"
  },
  {
    career: "Clinical Research (CRO)",
    fresherAccess: "Moderate",
    startingSalary: "₹3.6L – ₹5.2L LPA",
    skills: "GCP guidelines, protocol compliance, site coordination",
    tools: "CTMS, eTMF systems",
    workStyle: "Clinical Site / Corporate",
    progression: "CTA / CRC → CRA → Senior CRA → Lead / CPM"
  },
  {
    career: "Regulatory Operations",
    fresherAccess: "Selective",
    startingSalary: "₹4.2L – ₹6.5L LPA",
    skills: "Regulatory documentation, dossier filing, compliance",
    tools: "eCTD Publisher, RIM systems",
    workStyle: "Corporate Regulatory",
    progression: "Associate → Specialist → Manager → Director"
  },
  {
    career: "Quality Control (QC)",
    fresherAccess: "High",
    startingSalary: "₹3.2L – ₹4.5L LPA",
    skills: "Analytical testing, wet chemistry, instrument calibration",
    tools: "HPLC, UV-Vis, Dissolution",
    workStyle: "Plant / Lab Environment",
    progression: "Analyst → Senior Analyst → QC Lead → Manager"
  },
  {
    career: "Healthcare Analytics",
    fresherAccess: "Selective",
    startingSalary: "₹4.8L – ₹7.5L LPA",
    skills: "Data manipulation, statistical programming, report generation",
    tools: "SAS Studio, PROC SQL, CDISC SDTM",
    workStyle: "Corporate Tech / Analytics",
    progression: "Data Analyst → Senior Analyst → Lead Programmer"
  },
  {
    career: "Pharma Commercial / Sales",
    fresherAccess: "Very High",
    startingSalary: "₹3.5L – ₹5.5L LPA",
    skills: "Product communication, medical detailing, territory management",
    tools: "SFA / CRM systems",
    workStyle: "Field & Commercial",
    progression: "Medical Rep → Area Manager → Regional Manager"
  }
];

export function CareerDecisionMatrix() {
  const [selectedCareer, setSelectedCareer] = useState<string>(CAREER_DECISION_MATRIX_DATA[0].career);
  const activeItem = CAREER_DECISION_MATRIX_DATA.find(c => c.career === selectedCareer) || CAREER_DECISION_MATRIX_DATA[0];

  return (
    <section className="py-16 sm:py-24 bg-white tone-light border-b border-stone-200 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B] bg-blue-50 px-3 py-1 rounded-full border border-blue-200 inline-block">
            ARZON PROPRIETARY INTELLIGENCE ASSET
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            The B.Pharm Career Decision Matrix™
          </h2>
          <p className="text-sm sm:text-base text-stone-700 font-sans leading-relaxed">
            See the structural difference between career options before making your choice.
          </p>
        </div>

        {/* Desktop Table Matrix */}
        <div className="hidden lg:block overflow-x-auto rounded-3xl border border-stone-300 bg-white tone-light shadow-sm">
          <table className="w-full text-left font-sans text-xs">
            <thead className="bg-stone-100 border-b border-stone-300 font-mono text-[11px] text-stone-700 uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4 font-bold">Career Path</th>
                <th className="py-3.5 px-4 font-bold">Fresher Access</th>
                <th className="py-3.5 px-4 font-bold">Starting Salary</th>
                <th className="py-3.5 px-4 font-bold">Required Skills</th>
                <th className="py-3.5 px-4 font-bold">Software / Tools</th>
                <th className="py-3.5 px-4 font-bold">Work Style</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 text-stone-800">
              {CAREER_DECISION_MATRIX_DATA.map((row, i) => (
                <tr key={i} className="hover:bg-stone-50 transition-colors">
                  <td className="py-3.5 px-4 font-serif font-bold text-[#1B3F8B] text-sm">
                    {row.career}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-semibold">
                    <span className={`px-2 py-0.5 rounded text-[10px] ${
                      row.fresherAccess === "Very High" 
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                        : row.fresherAccess === "High"
                        ? "bg-blue-100 text-blue-800 border border-blue-300"
                        : "bg-amber-100 text-amber-800 border border-amber-300"
                    }`}>
                      {row.fresherAccess}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-stone-900 font-semibold">{row.startingSalary}</td>
                  <td className="py-3.5 px-4 leading-relaxed max-w-xs">{row.skills}</td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-[#1B3F8B]">{row.tools}</td>
                  <td className="py-3.5 px-4 text-stone-600">{row.workStyle}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile / Tablet Interactive Tab Card View */}
        <div className="lg:hidden space-y-4">
          <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-none">
            {CAREER_DECISION_MATRIX_DATA.map((item) => (
              <button
                key={item.career}
                onClick={() => setSelectedCareer(item.career)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold font-mono whitespace-nowrap transition-all ${
                  selectedCareer === item.career
                    ? "bg-[#1B3F8B] text-white shadow-md"
                    : "bg-stone-100 text-stone-700 border border-stone-200"
                }`}
              >
                {item.career}
              </button>
            ))}
          </div>

          <div className="rounded-3xl border border-stone-300 bg-white p-6 space-y-4 shadow-md tone-light">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h3 className="font-serif text-xl font-bold text-stone-900">{activeItem.career}</h3>
              <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-blue-50 text-[#1B3F8B] border border-blue-200">
                Fresher Access: {activeItem.fresherAccess}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
              <div>
                <span className="font-mono text-[10px] text-stone-500 uppercase block">Starting Salary Band:</span>
                <span className="font-mono font-bold text-stone-900 text-sm">{activeItem.startingSalary}</span>
              </div>
              <div>
                <span className="font-mono text-[10px] text-stone-500 uppercase block">Work Environment:</span>
                <span className="font-sans font-semibold text-stone-800">{activeItem.workStyle}</span>
              </div>
              <div>
                <span className="font-mono text-[10px] text-stone-500 uppercase block">Required Skills:</span>
                <p className="text-stone-700">{activeItem.skills}</p>
              </div>
              <div>
                <span className="font-mono text-[10px] text-stone-500 uppercase block">Software &amp; Tools:</span>
                <span className="font-mono font-bold text-[#1B3F8B]">{activeItem.tools}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-200 space-y-1">
              <span className="font-mono text-[10px] text-stone-500 uppercase block">3-to-5 Year Career Trajectory:</span>
              <p className="font-mono text-xs font-bold text-stone-800">{activeItem.progression}</p>
            </div>
          </div>
        </div>

        {/* Methodology & Evidence Footer Disclaimer */}
        <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 font-sans text-xs text-stone-600 flex items-start gap-2.5">
          <HelpCircle className="h-4 w-4 text-stone-500 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Methodology Note:</strong> Data compiled from Arzon's research dataset of 2,180 recent Indian healthcare job postings across Hyderabad, Bengaluru, Chennai, and Mumbai GCC hubs. Salary bands represent observed hiring ranges and vary by employer, candidate selection, location, and specific role requirements.
          </p>
        </div>
      </div>
    </section>
  );
}
