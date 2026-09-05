import { Check, X, ShieldCheck } from "lucide-react";

export function ArzonAudience() {
  const primaryDegrees = [
    { title: "B.Pharm", desc: "Bachelor of Pharmacy graduates & final-year candidates" },
    { title: "M.Pharm", desc: "Master of Pharmacy in Pharmacology, Pharmaceutics, or Regulatory Affairs" },
    { title: "Pharm.D", desc: "Doctor of Pharmacy graduates seeking clinical research & safety operations" },
    { title: "Life Sciences", desc: "B.Sc / M.Sc in Biotechnology, Biochemistry, Microbiology, or Bioinformatics" },
    { title: "Freshers", desc: "Graduates from 2024 to 2026 batches actively applying for initial CRO roles" },
  ];

  return (
    <section className="w-full py-16 sm:py-20 bg-[var(--color-warm-paper)] border-b border-[var(--color-border-warm)] text-left tone-light">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header with Arzon Signature */}
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-4 bg-[var(--color-editorial-amber)] rounded-sm"></div>
            <span className="font-mono text-[11px] font-bold text-[var(--color-arzon-ink)] uppercase tracking-widest">
              TARGET PROFILE · AUDIENCE QUALIFICATION
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--color-arzon-ink)] tracking-tight">
            Who is this workshop for?
          </h2>
          <p className="font-sans text-sm sm:text-base text-stone-700 leading-relaxed">
            This session is designed specifically for healthcare candidates who need immediate, operational clarity
            to clear entry-level technical interview rounds at Indian CROs.
          </p>
        </div>

        {/* Visual Qualification Layout (Left: Statement, Right: Large Typographic Badges) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: YOU SHOULD BE HERE IF... (4 cols) */}
          <div className="lg:col-span-4 p-6 sm:p-8 rounded-2xl bg-[var(--color-medical-navy)] tone-dark text-white space-y-4 shadow-md">
            <span style={{ color: '#0F766E' }} className="font-mono text-[11px] font-bold uppercase tracking-widest block">
              PRIMARY CANDIDATES
            </span>
            <h3 style={{ color: '#FFFFFF' }} className="font-serif text-2xl sm:text-3xl font-extrabold leading-tight text-white">
              YOU SHOULD BE HERE IF...
            </h3>
            <p style={{ color: '#E2E8F0' }} className="font-sans text-xs sm:text-sm text-stone-200 leading-relaxed pt-1">
              You have completed or are completing a healthcare degree, and you want to understand how pharmacovigilance operations
              actually work before spending money on generic coaching or submitting another unanswered job application.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-mono text-[var(--color-editorial-amber)] font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>ZERO PRIOR CRO EXPERIENCE REQUIRED</span>
            </div>
          </div>

          {/* Right Column: Large Typographic Degree Labels (8 cols) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {primaryDegrees.map((deg, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[var(--color-warm-white)] border border-[var(--color-border-warm)] shadow-xs space-y-2 hover:border-[var(--color-medical-navy)]/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif text-2xl sm:text-3xl font-black text-[var(--color-arzon-ink)] tracking-tight">
                    {deg.title}
                  </span>
                  <span className="w-6 h-6 rounded-full bg-[var(--color-clinical-teal)]/15 text-[var(--color-clinical-teal)] flex items-center justify-center font-bold text-xs">
                    ✓
                  </span>
                </div>
                <p className="font-sans text-xs text-stone-600 leading-snug">
                  {deg.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Small Muted Area: NOT THE MAIN AUDIENCE */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[var(--color-warm-white)] border border-[var(--color-border-warm)]/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-sans text-stone-600">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-stone-400 shrink-0"></span>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-stone-500">
              NOT THE MAIN AUDIENCE:
            </span>
            <span>Experienced safety professionals with 5+ years in industry, or candidates seeking passive one-way webinar lectures.</span>
          </div>
          <span className="font-mono text-[10.5px] text-stone-500 shrink-0">
            ENTRY-LEVEL FOCUS
          </span>
        </div>
      </div>
    </section>
  );
}
