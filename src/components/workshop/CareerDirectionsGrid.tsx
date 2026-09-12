import { useState } from "react";
import {
  ShieldAlert,
  FileSpreadsheet,
  Database,
  Search,
  FileCheck,
  Award,
  Microscope,
  Factory,
  Stethoscope,
  TrendingUp,
  Megaphone,
  Info,
  BarChart,
  Cpu,
  FileText,
  DollarSign,
  PieChart,
  FlaskConical,
  ArrowRight,
  X,
  CheckCircle2,
} from "lucide-react";

interface CareerPath {
  id: string;
  name: string;
  oneLiner: string;
  fresherAccess: "High" | "Moderate" | "Selective";
  icon: any;
  salaryRange: string;
  keyTools: string[];
  hiringHubs: string;
  description: string;
}

interface CareerDirectionsGridProps {
  onReserveClick: () => void;
}

export function CareerDirectionsGrid({ onReserveClick }: CareerDirectionsGridProps) {
  const [selectedPath, setSelectedPath] = useState<CareerPath | null>(null);

  const careerPaths: CareerPath[] = [
    {
      id: "pv",
      name: "Pharmacovigilance & Drug Safety",
      oneLiner: "Process ICSR adverse drug event reports & perform safety triage.",
      fresherAccess: "High",
      icon: ShieldAlert,
      salaryRange: "₹3.00 – ₹4.80 LPA",
      keyTools: ["Oracle Argus Safety", "ArisG", "MedDRA", "WHO-ART"],
      hiringHubs: "Hyderabad, Bengaluru, Pune, Mumbai, Gurgaon",
      description:
        "Primary non-clinical desk career for pharmacy graduates. Involves evaluating patient case safety reports, assigning MedDRA coding terms, assessing seriousness, and submitting expedited safety reports to global regulatory authorities (FDA, EMA, DCGI).",
    },
    {
      id: "coding",
      name: "Medical Coding & RCM",
      oneLiner: "Translate clinical chart diagnoses & procedures into standardized ICD-10/CPT codes.",
      fresherAccess: "High",
      icon: FileSpreadsheet,
      salaryRange: "₹2.28 – ₹3.60 LPA",
      keyTools: ["ICD-10-CM", "CPT-4", "HCPCS", "EncoderPro"],
      hiringHubs: "Hyderabad, Chennai, Bengaluru, Coimbatore",
      description:
        "Translates patient medical records into universally recognized alpha-numeric code sets for healthcare billing and insurance reimbursement. High entry-level fresher hiring across US healthcare BPO centers.",
    },
    {
      id: "cdm",
      name: "Clinical Data Management (CDM)",
      oneLiner: "Clean, validate, and manage clinical trial data in electronic data capture systems.",
      fresherAccess: "High",
      icon: Database,
      salaryRange: "₹2.60 – ₹4.50 LPA",
      keyTools: ["Medidata Rave", "Oracle Inform", "CDISC SDTM", "eCRF"],
      hiringHubs: "Bengaluru, Hyderabad, Mumbai, Pune",
      description:
        "Ensures clinical trial data is clean, accurate, and ready for statistical analysis. Involves query management, discrepancy resolution, and validation of electronic Case Report Forms (eCRFs).",
    },
    {
      id: "cr",
      name: "Clinical Research (CRA / CTA)",
      oneLiner: "Coordinate & monitor clinical trial protocol compliance at investigative sites.",
      fresherAccess: "Moderate",
      icon: Search,
      salaryRange: "₹2.80 – ₹4.20 LPA",
      keyTools: ["ICH-GCP", "Trial Master File (TMF)", "CTMS", "IRB Documentation"],
      hiringHubs: "Mumbai, Ahmedabad, Hyderabad, Bengaluru",
      description:
        "Monitors clinical trial sites to ensure trials comply with approved protocols, ICH-GCP guidelines, and patient safety standards. Involves site selection, trial documentation, and patient recruitment tracking.",
    },
    {
      id: "ra",
      name: "Regulatory Affairs (RA)",
      oneLiner: "Prepare & format drug dossier filings (eCTD) for regulatory approval.",
      fresherAccess: "Selective",
      icon: FileCheck,
      salaryRange: "₹2.80 – ₹4.50 LPA",
      keyTools: ["eCTDexpress", "ESG", "FDA 21 CFR", "Dossier Preparation"],
      hiringHubs: "Hyderabad, Mumbai, Ahmedabad, New Delhi",
      description:
        "Acts as the liaison between pharma companies and global healthcare regulatory agencies (USFDA, EMA, PMDA, CDSCO). Prepares IND, NDA, and ANDA submissions in eCTD structure.",
    },
    {
      id: "writing",
      name: "Medical Writing",
      oneLiner: "Author clinical study reports, investigator brochures, & regulatory documents.",
      fresherAccess: "Moderate",
      icon: FileText,
      salaryRange: "₹3.20 – ₹5.50 LPA",
      keyTools: ["AMA Style", "EndNote", "PUBMED", "CSR Writing"],
      hiringHubs: "Bengaluru, Hyderabad, Mumbai",
      description:
        "Combines scientific expertise with clear writing to author clinical study reports (CSRs), clinical trial protocols, regulatory submission summaries, and scientific publications.",
    },
    {
      id: "analytics",
      name: "Healthcare Analytics",
      oneLiner: "Analyze real-world evidence, claim data, & hospital outcomes using SQL/Python.",
      fresherAccess: "Selective",
      icon: BarChart,
      salaryRange: "₹4.00 – ₹6.50 LPA",
      keyTools: ["SQL", "Excel", "PowerBI", "Python / R", "SAS"],
      hiringHubs: "Bengaluru, Hyderabad, Gurgaon",
      description:
        "High-growth analytical domain combining pharmacy domain knowledge with data science to analyze patient outcomes, pharmaceutical sales data, and clinical trial statistics.",
    },
    {
      id: "qa",
      name: "Quality Assurance (QA)",
      oneLiner: "Audit manufacturing SOPs, validation protocols, & cGMP compliance.",
      fresherAccess: "Moderate",
      icon: Award,
      salaryRange: "₹2.20 – ₹3.50 LPA",
      keyTools: ["cGMP", "ISO 9001", "CAPA", "LIMS"],
      hiringHubs: "Hyderabad, Vizag, Baddi, Goa, Ahmedabad",
      description:
        "Ensures pharmaceutical manufacturing processes meet global cGMP guidelines. Responsible for document control, deviation investigation, CAPA management, and regulatory audits.",
    },
    {
      id: "qc",
      name: "Quality Control (QC)",
      oneLiner: "Perform HPLC analytical testing & raw material chemical assays.",
      fresherAccess: "High",
      icon: Microscope,
      salaryRange: "₹2.00 – ₹3.20 LPA",
      keyTools: ["HPLC", "UV-Vis Spectroscopy", "Dissolution", "GC"],
      hiringHubs: "Hyderabad, Vizag, Baddi, Vadodara",
      description:
        "Hands-on analytical laboratory testing of active pharmaceutical ingredients (APIs) and finished drug products using HPLC, GC, and wet chemistry methods.",
    },
    {
      id: "mfg",
      name: "Pharma Manufacturing & Ops",
      oneLiner: "Supervise tablet compression, sterile filling, & batch production operations.",
      fresherAccess: "High",
      icon: Factory,
      salaryRange: "₹2.00 – ₹3.00 LPA",
      keyTools: ["Batch Manufacturing Records", "HVAC", "Sterile Processing"],
      hiringHubs: "Hyderabad, Baddi, Sikkim, Tarapur",
      description:
        "Direct supervision of formulation batch production, cleanroom sterile operations, tablet compression, and packaging operations in cGMP certified plants.",
    },
    {
      id: "hosp",
      name: "Hospital & Clinical Pharmacy",
      oneLiner: "Dispense inpatient medications, review drug interactions, & manage ICU inventory.",
      fresherAccess: "High",
      icon: Stethoscope,
      salaryRange: "₹2.20 – ₹3.50 LPA",
      keyTools: ["HIS Software", "PharmKIS", "Drug Interaction Databases"],
      hiringHubs: "Pan-India (Major Hospital Chains)",
      description:
        "Inpatient and outpatient prescription dispensing, clinical dose verification, ADR monitoring, and hospital pharmacy inventory management in NABH accredited hospitals.",
    },
    {
      id: "sales",
      name: "Pharma Sales & Detailing",
      oneLiner: "Commercial product promotion, doctor detailing, & hospital sales strategy.",
      fresherAccess: "High",
      icon: TrendingUp,
      salaryRange: "₹2.80 – ₹4.20 LPA",
      keyTools: ["CRM", "Visual AIDs", "Doctor Detailing", "Territory Management"],
      hiringHubs: "Pan-India Tier 1/2/3 Cities",
      description:
        "Direct commercial detailing of ethical brand formulations to physicians, specialists, and hospital purchase managers. High variable incentive potential.",
    },
    {
      id: "mktg",
      name: "Pharma Product Marketing (PMT)",
      oneLiner: "Design brand strategy, therapeutic promotional campaigns, & doctor visual aids.",
      fresherAccess: "Selective",
      icon: Megaphone,
      salaryRange: "₹3.50 – ₹5.50 LPA",
      keyTools: ["Brand Management", "IQVIA Data", "Digital Marketing"],
      hiringHubs: "Mumbai, Hyderabad, Ahmedabad",
      description:
        "Formulates marketing strategies for therapeutic categories, designs medical communication collateral, trains sales forces, and monitors market share data.",
    },
    {
      id: "medinfo",
      name: "Medical Information",
      oneLiner: "Respond to scientific queries from healthcare professionals & patients.",
      fresherAccess: "Moderate",
      icon: Info,
      salaryRange: "₹2.80 – ₹4.20 LPA",
      keyTools: ["Micromedex", "Lexicomp", "Medical Inquiry Databases"],
      hiringHubs: "Bengaluru, Hyderabad, Gurgaon",
      description:
        "Provides accurate, balanced scientific and clinical drug information in response to inquiries received from doctors, pharmacists, and patients.",
    },
    {
      id: "heor",
      name: "HEOR / RWE",
      oneLiner: "Evaluate health economics, drug cost-effectiveness, & real-world evidence.",
      fresherAccess: "Selective",
      icon: DollarSign,
      salaryRange: "₹4.50 – ₹7.50 LPA",
      keyTools: ["Markov Models", "TreeAge", "Claims Datasets"],
      hiringHubs: "Bengaluru, Hyderabad, Mumbai",
      description:
        "Assesses the economic value and clinical effectiveness of pharmaceutical interventions to support market access and reimbursement decisions.",
    },
    {
      id: "tech",
      name: "Healthcare Technology",
      oneLiner: "Implement pharma enterprise software, LIMS, EDC, & digital health platforms.",
      fresherAccess: "Selective",
      icon: Cpu,
      salaryRange: "₹4.00 – ₹7.00 LPA",
      keyTools: ["Veeva Vault", "Salesforce Health Cloud", "SAP Life Sciences"],
      hiringHubs: "Bengaluru, Hyderabad, Pune, Noida",
      description:
        "Bridge domain expert role serving as business analysts and functional consultants for IT companies building life science enterprise software.",
    },
  ];

  return (
    <section id="career-paths" className="w-full bg-white tone-light py-14 sm:py-20 border-b border-[var(--color-border-warm)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 font-mono text-xs font-bold uppercase tracking-wider mb-2">
              <span>EXPLORE CAREER MAP</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--color-medical-navy)] tracking-tight">
              15+ HEALTHCARE CAREER DIRECTIONS
              <br />
              <span className="text-[var(--color-arzon-blue)]">YOU CAN EXPLORE AFTER B.PHARM</span>
            </h2>
            <p className="font-sans text-sm text-stone-600 mt-2 max-w-2xl">
              Your B.Pharm can lead in more directions than you think. But not every career has the same entry requirements or salary progression.
            </p>
          </div>
          <button
            type="button"
            onClick={onReserveClick}
            className="inline-flex items-center gap-2 font-mono text-xs font-bold text-teal-700 hover:text-teal-900 uppercase tracking-wider group cursor-pointer"
          >
            See All Career Paths
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 16 Card Grid matching reference visual */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {careerPaths.map((path) => {
            const IconComp = path.icon;
            const badgeBg =
              path.fresherAccess === "High"
                ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                : path.fresherAccess === "Moderate"
                ? "bg-amber-50 text-amber-800 border-amber-200"
                : "bg-blue-50 text-blue-800 border-blue-200";

            return (
              <div
                key={path.id}
                onClick={() => setSelectedPath(path)}
                className="group relative bg-white tone-light rounded-2xl p-4 sm:p-5 border border-stone-200 hover:border-teal-400 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl tone-dark bg-[#0B1325] text-teal-300 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span
                      className={`font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${badgeBg}`}
                    >
                      {path.fresherAccess} Access
                    </span>
                  </div>

                  <h3 className="font-serif text-sm font-bold text-[var(--color-medical-navy)] group-hover:text-[var(--color-arzon-blue)] transition-colors leading-snug">
                    {path.name}
                  </h3>
                  <p className="font-sans text-xs text-stone-600 mt-1.5 line-clamp-2 leading-relaxed">
                    {path.oneLiner}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                  <span className="font-mono text-[11px] font-bold text-stone-800">
                    {path.salaryRange}
                  </span>
                  <span className="font-mono text-[10px] font-bold text-teal-600 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Details <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Path Detail Modal Drawer */}
        {selectedPath && (
          <div className="fixed inset-0 z-50 bg-[#0B1325]/75 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white tone-light rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-stone-200 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
              <button
                type="button"
                onClick={() => setSelectedPath(null)}
                className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-700 bg-stone-100 hover:bg-stone-200 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl tone-dark bg-[#0B1325] text-teal-300 flex items-center justify-center shrink-0">
                  <selectedPath.icon className="w-6 h-6" />
                </div>
                <div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-teal-700">
                    {selectedPath.fresherAccess} Fresher Access
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[var(--color-medical-navy)]">
                    {selectedPath.name}
                  </h3>
                </div>
              </div>

              <p className="font-sans text-xs text-stone-700 leading-relaxed mb-4">
                {selectedPath.description}
              </p>

              <div className="space-y-3 bg-stone-50 p-4 rounded-xl border border-stone-200/80 mb-6 text-xs">
                <div className="flex justify-between">
                  <span className="font-mono text-stone-500 font-bold">Starting Salary:</span>
                  <span className="font-mono font-black text-[var(--color-medical-navy)]">{selectedPath.salaryRange}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-mono text-stone-500 font-bold">Hiring Hubs:</span>
                  <span className="font-sans font-medium text-stone-800">{selectedPath.hiringHubs}</span>
                </div>
                <div>
                  <span className="font-mono text-stone-500 font-bold block mb-1">Key Software & Tools:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedPath.keyTools.map((t, idx) => (
                      <span key={idx} className="font-mono text-[10px] px-2 py-0.5 rounded bg-teal-100/70 text-teal-900 font-bold">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSelectedPath(null);
                  onReserveClick();
                }}
                className="w-full py-3.5 rounded-xl bg-[#FF6525] hover:bg-[#e05318] text-white font-mono text-xs font-bold uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                style={{ color: '#FFFFFF' }}
              >
                GET MY FREE CAREER MAP
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
