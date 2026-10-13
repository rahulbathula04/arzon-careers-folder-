export function AcriTrustStrip() {
  const sectors = [
    { name: "Global Pharma Safety GCCs", sub: "Hyderabad & Bengaluru" },
    { name: "Tier-1 Global CROs", sub: "Phase I–IV Trials" },
    { name: "Multinational Safety Hubs", sub: "ICSR & Signal Detection" },
    { name: "US Inpatient Health Networks", sub: "Revenue Cycle & CDI" },
    { name: "Central Biostatistics Units", sub: "CDISC Submissions" },
    { name: "Global Regulatory Operations", sub: "eCTD & Dossier Publishing" },
  ];

  return (
    <section className="border-y border-stone-200/80 bg-white tone-light card-light py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Eyebrow */}
        <p className="text-center text-[11px] font-bold uppercase tracking-[0.2em] text-stone-500">
          Evaluated Against Industry Competency Standards Across Clinical Sectors
        </p>

        {/* Industry Sector Standard Badges */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {sectors.map((sec) => (
            <div
              key={sec.name}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-stone-50 border border-stone-200/80 text-stone-700 hover:text-stone-900 hover:border-stone-300 transition-colors select-none"
            >
              <div className="h-1.5 w-1.5 rounded-full bg-[#005B4F]" />
              <span className="font-sans font-bold text-xs sm:text-sm text-stone-800 tracking-tight">
                {sec.name}
              </span>
              <span className="text-[10px] text-stone-500 font-mono hidden md:inline">
                · {sec.sub}
              </span>
            </div>
          ))}
        </div>

        {/* Regulatory & Assessment Standards Strip */}
        <div className="mt-6 pt-5 border-t border-stone-100 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] font-semibold text-stone-500">
          <span className="text-stone-400 uppercase tracking-widest text-[10px]">Built Around:</span>
          <span className="hover:text-stone-800 transition-colors">ICH E2A / E2B(R3) Standards</span>
          <span className="text-stone-300">·</span>
          <span className="hover:text-stone-800 transition-colors">WHO-UMC Causality Algorithm</span>
          <span className="text-stone-300">·</span>
          <span className="hover:text-stone-800 transition-colors">CIOMS Guidelines</span>
          <span className="text-stone-300">·</span>
          <span className="hover:text-stone-800 transition-colors">FDA 21 CFR 314.80 Expedited Reporting</span>
          <span className="text-stone-300">·</span>
          <span className="hover:text-stone-800 transition-colors">EMA GVP Module VI</span>
        </div>
      </div>
    </section>
  );
}
