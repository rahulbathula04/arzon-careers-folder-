import { ShieldCheck, AlertTriangle, ArrowRight } from "lucide-react";

interface CertificationRealityProps {
  onReserveClick: () => void;
}

export function CertificationRealitySection({ onReserveClick }: CertificationRealityProps) {
  const certs = [
    {
      domain: "Medical Coding",
      credential: "AAPC CPC Certification",
      verdict: "High Employer Value",
      verdictBg: "bg-emerald-100 text-emerald-900 border-emerald-300",
      details:
        "CPC certification has direct, recognized hiring value across US healthcare BPOs in India and can command higher starting pay grades.",
    },
    {
      domain: "Clinical Research",
      credential: "ICH-GCP Compliance Training",
      verdict: "Useful Knowledge, Free Sources Exist",
      verdictBg: "bg-amber-100 text-amber-900 border-amber-300",
      details:
        "GCP protocol knowledge is essential, but paying ₹40,000+ for expensive private certificates is NOT a universal employer requirement.",
    },
    {
      domain: "Pharmacovigilance",
      credential: "Commercial PV Diplomas",
      verdict: "Domain Skill Over Certificate",
      verdictBg: "bg-blue-100 text-blue-900 border-blue-300",
      details:
        "MNC safety teams screen for ICSR triage, MedDRA coding, and Argus software familiarity during technical rounds—not paper diplomas.",
    },
    {
      domain: "Clinical Data Mgmt",
      credential: "Advanced CDM Credentials",
      verdict: "Relevant Later in Career",
      verdictBg: "bg-slate-100 text-slate-900 border-slate-300",
      details:
        "Specialized credentials become valuable after 2-3 years of hands-on Rave/Inform experience, not as an entry requirement for freshers.",
    },
    {
      domain: "Hospital Pharmacy",
      credential: "State Pharmacy Council License",
      verdict: "Statutory Mandatory Requirement",
      verdictBg: "bg-emerald-100 text-emerald-900 border-emerald-300",
      details:
        "Registered Pharmacist license issued by your State Pharmacy Council is legally mandatory to legally dispense in hospital/retail settings.",
    },
  ];

  return (
    <section className="w-full bg-[var(--color-warm-paper)] py-14 sm:py-20 border-b border-[var(--color-border-warm)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 font-mono text-xs font-bold uppercase tracking-wider mb-2">
            <span>CERTIFICATION INTELLIGENCE</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--color-medical-navy)] tracking-tight">
            NOT EVERY CERTIFICATION IS WORTH PAYING FOR.
          </h2>
          <p className="font-sans text-xs sm:text-sm text-stone-600 mt-2">
            Separate genuine employer-demanded credentials from unnecessary commercial certificates.
          </p>
        </div>

        {/* 5 Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {certs.map((item, idx) => (
            <div
              key={idx}
              className="bg-white tone-light rounded-2xl p-6 border border-stone-200 shadow-xs hover:border-amber-400 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-bold text-[var(--color-arzon-blue)] uppercase">
                    {item.domain}
                  </span>
                  <span className={`font-mono text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full border ${item.verdictBg}`}>
                    {item.verdict}
                  </span>
                </div>
                <h3 className="font-serif text-base font-bold text-[var(--color-medical-navy)]">
                  {item.credential}
                </h3>
                <p className="font-sans text-xs text-stone-600 mt-2 leading-relaxed">
                  {item.details}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Callout Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[var(--color-medical-navy)] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-amber-400 text-slate-900 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="font-mono text-xs font-bold text-amber-300 uppercase tracking-wider block mb-1">
                ARZON GOLDEN RULE
              </span>
              <p className="font-serif text-xl font-extrabold text-white">
                LEARN WHAT THE MARKET REQUIRES.
                <br />
                <span className="text-teal-300">NOT WHAT TRAINING COMPANIES WANT TO SELL YOU.</span>
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onReserveClick}
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#FF6525] hover:bg-[#e05318] text-white font-mono text-xs font-bold uppercase tracking-wider shadow-md transition-all cursor-pointer"
            style={{ color: '#FFFFFF' }}
          >
            GET MY FREE CAREER MAP
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
