import { ArrowRight, CheckCircle, Table, ExternalLink } from "lucide-react";
import { ArzonFloatingRegisterCard } from "./ArzonFloatingRegisterCard";

interface CareerDecisionMatrixProps {
  name: string;
  phone: string;
  college: string;
  branch: string;
  degree: string;
  email: string;
  graduationYear: string;
  eligibleDegrees: string[];
  isSubmitting: boolean;
  errorMsg: string | null;
  fieldErrors: Record<string, string>;
  onNameChange: (v: string) => void;
  onPhoneChange: (v: string) => void;
  onCollegeChange: (v: string) => void;
  onBranchChange: (v: string) => void;
  onDegreeChange: (v: string) => void;
  onEmailChange: (v: string) => void;
  onGraduationYearChange: (v: string) => void;
  onInputFocus: () => void;
  onFieldBlur: (fieldName: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  allocatedSeats: number;
  totalCapacity: number;
  percentReserved: number;
  onReserveClick: () => void;
}

export function CareerDecisionMatrix(props: CareerDecisionMatrixProps) {
  const matrixData = [
    {
      career: "Medical Coding",
      access: "High",
      accessColor: "bg-emerald-100 text-emerald-900 border-emerald-300",
      whatYouDo: "Assign medical/diagnostic codes",
      keyPrep: "Medical terminology, ICD-10-CM, CPT",
      startingSalary: "₹2.28 – 3.60",
    },
    {
      career: "Pharmacovigilance",
      access: "High",
      accessColor: "bg-emerald-100 text-emerald-900 border-emerald-300",
      whatYouDo: "Process drug safety data & ICSR",
      keyPrep: "Pharmacology, Argus, safety concepts",
      startingSalary: "₹3.00 – 4.80",
    },
    {
      career: "Clinical Data Mgmt",
      access: "High",
      accessColor: "bg-emerald-100 text-emerald-900 border-emerald-300",
      whatYouDo: "Clean and review trial data",
      keyPrep: "GCP, Excel, EDC concepts, Rave",
      startingSalary: "₹2.60 – 4.50",
    },
    {
      career: "Clinical Research",
      access: "Moderate",
      accessColor: "bg-amber-100 text-amber-900 border-amber-300",
      whatYouDo: "Support clinical trials & sites",
      keyPrep: "GCP, TMF documentation, trial ops",
      startingSalary: "₹2.80 – 4.20",
    },
    {
      career: "Regulatory Affairs",
      access: "Selective",
      accessColor: "bg-blue-100 text-blue-900 border-blue-300",
      whatYouDo: "Support dossier submissions",
      keyPrep: "Regulatory basics, eCTD structure",
      startingSalary: "₹2.80 – 4.50",
    },
    {
      career: "Quality Control",
      access: "High",
      accessColor: "bg-emerald-100 text-emerald-900 border-emerald-300",
      whatYouDo: "Lab testing & HPLC analysis",
      keyPrep: "HPLC, wet analytical skills, cGMP",
      startingSalary: "₹2.00 – 3.20",
    },
    {
      career: "Healthcare Analytics",
      access: "Selective",
      accessColor: "bg-blue-100 text-blue-900 border-blue-300",
      whatYouDo: "Data analysis & reporting",
      keyPrep: "Excel, SQL, BI tools, Python",
      startingSalary: "₹4.00 – 6.50",
    },
    {
      career: "Pharma Sales",
      access: "High",
      accessColor: "bg-emerald-100 text-emerald-900 border-emerald-300",
      whatYouDo: "Detailing to doctors & commercial",
      keyPrep: "Communication, product knowledge",
      startingSalary: "₹2.80 – 4.20",
    },
  ];

  return (
    <section id="career-matrix" className="w-full bg-[var(--color-warm-paper)] py-14 sm:py-20 border-b border-[var(--color-border-warm)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[var(--color-arzon-blue)] font-mono text-xs font-bold uppercase tracking-wider mb-2">
            <span>B.PHARM DECISION MATRIX</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--color-medical-navy)] tracking-tight">
            SEE THE DIFFERENCE BETWEEN
            <br />
            <span className="text-[var(--color-arzon-blue)]">CAREER NAMES AND CAREER DECISIONS</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-stone-600 mt-2">
            A snapshot of how different non-clinical & clinical healthcare careers compare for B.Pharm graduates.
          </p>
        </div>

        {/* Side-by-Side Grid matching Mockup `media_1789216663202.jpg` */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left: Comparison Table (7 Columns) */}
          <div className="lg:col-span-7 bg-white tone-light rounded-3xl p-4 sm:p-6 border border-stone-200 shadow-md">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-stone-200 bg-stone-50/80 font-mono text-[11px] font-bold text-[var(--color-medical-navy)] uppercase tracking-wider">
                    <th className="py-3 px-3">Career</th>
                    <th className="py-3 px-3">Fresher Access</th>
                    <th className="py-3 px-3">What You Do</th>
                    <th className="py-3 px-3">Key Preparation</th>
                    <th className="py-3 px-3 text-right whitespace-nowrap">Starting Salary (₹ LPA)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 font-sans text-xs">
                  {matrixData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-3 font-bold text-slate-900 whitespace-nowrap">
                        {row.career}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap">
                        <span className={`font-sans text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${row.accessColor}`}>
                          {row.access}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-700 font-medium">
                        {row.whatYouDo}
                      </td>
                      <td className="py-3 px-3 text-slate-600">
                        {row.keyPrep}
                      </td>
                      <td className="py-3 px-3 text-right font-sans font-bold text-slate-900 whitespace-nowrap">
                        {row.startingSalary}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between">
              <button
                type="button"
                onClick={props.onReserveClick}
                className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[var(--color-arzon-blue)] hover:text-blue-900 cursor-pointer"
              >
                View Full Career Comparison Matrix →
              </button>
              <span className="font-mono text-[10px] text-stone-500">
                Data source: Arzon 2026 Hiring Dataset
              </span>
            </div>
          </div>

          {/* Right: Registration Card (5 Columns) */}
          <div id="registration-desk" className="lg:col-span-5">
            <ArzonFloatingRegisterCard
              name={props.name}
              phone={props.phone}
              college={props.college}
              branch={props.branch}
              degree={props.degree}
              email={props.email}
              graduationYear={props.graduationYear}
              eligibleDegrees={props.eligibleDegrees}
              isSubmitting={props.isSubmitting}
              errorMsg={props.errorMsg}
              fieldErrors={props.fieldErrors}
              onNameChange={props.onNameChange}
              onPhoneChange={props.onPhoneChange}
              onCollegeChange={props.onCollegeChange}
              onBranchChange={props.onBranchChange}
              onDegreeChange={props.onDegreeChange}
              onEmailChange={props.onEmailChange}
              onGraduationYearChange={props.onGraduationYearChange}
              onInputFocus={props.onInputFocus}
              onFieldBlur={props.onFieldBlur}
              onSubmit={props.onSubmit}
              allocatedSeats={props.allocatedSeats}
              totalCapacity={props.totalCapacity}
              percentReserved={props.percentReserved}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
