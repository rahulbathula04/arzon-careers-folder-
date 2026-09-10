import { ShieldCheck, TrendingUp, Building2, Users } from "lucide-react";

export function ArzonAudience() {
  const primaryDegrees = [
    { title: "B.Pharm", desc: "Bachelor of Pharmacy graduates & final-year candidates" },
    { title: "M.Pharm", desc: "Master of Pharmacy in Pharmacology, Pharmaceutics, or Regulatory Affairs" },
    { title: "Pharm.D", desc: "Doctor of Pharmacy graduates seeking clinical research & safety operations" },
    { title: "Life Sciences", desc: "B.Sc / M.Sc in Biotechnology, Biochemistry, Microbiology, or Bioinformatics" },
    { title: "Freshers", desc: "Graduates from 2024 to 2026 batches actively applying for initial CRO roles" },
  ];

  // WHY THIS MATTERS — 3 dominant stat anchors from the reference design
  const stats = [
    {
      value: "90%",
      label: "of freshers fail the technical skills round",
      caption: "Industry hiring data · 300+ JD analysis",
      icon: TrendingUp,
      color: "text-[var(--color-medical-navy)]",
    },
    {
      value: "₹3.2L–4.8L",
      label: "typical fresher CTC in verified Indian CROs",
      caption: "Bangalore, Hyderabad, Pune CRO benchmark",
      icon: Building2,
      color: "text-[var(--color-editorial-amber)]",
      valueSize: "text-3xl sm:text-4xl lg:text-5xl",
    },
    {
      value: "42+",
      label: "verified Indian CROs hiring for PV roles",
      caption: "Actively hiring for B.Pharm/M.Pharm/Pharm.D",
      icon: Users,
      color: "text-[var(--color-clinical-teal)]",
    },
  ];

  return (
    <section className="w-full py-16 sm:py-20 bg-[var(--color-warm-paper)] border-b border-[var(--color-border-warm)] text-left tone-light">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-14">

        {/* ── WHY THIS MATTERS — Dominant Stat Row ── */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-4 bg-[var(--color-editorial-amber)] rounded-sm" />
            <span className="font-mono text-[11px] font-bold text-[var(--color-arzon-ink)] uppercase tracking-widest">
              WHY THIS MATTERS · THE CAREER GAP
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {stats.map(({ value, label, caption, icon: Icon, color, valueSize }) => (
              <div
                key={value}
                className="p-6 rounded-2xl bg-[var(--color-warm-white)] border border-[var(--color-border-warm)] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all space-y-3"
              >
                <Icon className={`w-5 h-5 ${color}`} />
                <div>
                  <span
                    className={`font-mono font-black leading-none block ${color} ${
                      valueSize ?? "text-4xl sm:text-5xl lg:text-6xl"
                    }`}
                  >
                    {value}
                  </span>
                  <p className="font-serif text-sm sm:text-base font-bold text-[var(--color-arzon-ink)] mt-2 leading-snug">
                    {label}
                  </p>
                  <p className="font-mono text-[10px] text-stone-400 uppercase tracking-wider mt-1">
                    {caption}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="font-mono text-[10px] text-stone-400">
            *Based on recent hiring data. Detailed analysis in the Career Field Guide.{" "}
            <a
              href="#field-guide"
              className="underline underline-offset-2 hover:text-stone-600 transition-colors"
            >
              Explore Career Insights →
            </a>
          </p>
        </div>

        {/* ── WHO IS THIS FOR — Audience Qualification ── */}
        <div className="space-y-8">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-4 bg-[var(--color-editorial-amber)] rounded-sm" />
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

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left: YOU SHOULD BE HERE IF... */}
            <div className="lg:col-span-4 p-6 sm:p-8 rounded-2xl bg-[var(--color-medical-navy)] tone-dark text-white space-y-4 shadow-md">
              <span style={{ color: "#0F766E" }} className="font-mono text-[11px] font-bold uppercase tracking-widest block">
                PRIMARY CANDIDATES
              </span>
              <h3 style={{ color: "#FFFFFF" }} className="font-serif text-2xl sm:text-3xl font-extrabold leading-tight text-white">
                YOU SHOULD BE HERE IF...
              </h3>
              <p style={{ color: "#E2E8F0" }} className="font-sans text-xs sm:text-sm text-stone-200 leading-relaxed pt-1">
                You have completed or are completing a healthcare degree, and you want to understand how pharmacovigilance operations
                actually work before spending money on generic coaching or submitting another unanswered job application.
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs font-mono text-[var(--color-editorial-amber)] font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>ZERO PRIOR CRO EXPERIENCE REQUIRED</span>
              </div>
            </div>

            {/* Right: Degree badges */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {primaryDegrees.map((deg, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[var(--color-warm-white)] border border-[var(--color-border-warm)] shadow-xs space-y-2 hover:border-[var(--color-medical-navy)]/40 hover:shadow-md hover:-translate-y-0.5 transition-all"
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

          {/* NOT THE MAIN AUDIENCE */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[var(--color-warm-white)] border border-[var(--color-border-warm)]/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-sans text-stone-600">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-stone-400 shrink-0" />
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
      </div>
    </section>
  );
}
