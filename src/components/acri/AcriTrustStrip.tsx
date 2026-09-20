export function AcriTrustStrip() {
  const employers = [
    { name: "Novartis", font: "font-serif tracking-tight" },
    { name: "IQVIA", font: "font-sans font-black tracking-widest" },
    { name: "PAREXEL", font: "font-sans font-bold tracking-wider" },
    { name: "Pfizer", font: "font-serif italic font-bold" },
    { name: "Dr. Reddy's", font: "font-sans font-bold tracking-tight" },
    { name: "Sun Pharma", font: "font-sans font-semibold tracking-wide" },
    { name: "Cipla", font: "font-sans font-extrabold tracking-tight" },
    { name: "ICON", font: "font-sans font-black tracking-widest" },
    { name: "Syneos Health", font: "font-sans font-medium tracking-tight" },
  ];

  return (
    <section className="border-y border-stone-200/80 bg-white tone-light py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Eyebrow */}
        <p className="text-center text-[11px] font-bold uppercase tracking-[0.2em] text-stone-500">
          Our Learners Get Placed At &amp; Evaluated Against Industry Standards
        </p>

        {/* Employer Logos in Restrained Monochrome */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 md:gap-x-12 opacity-80 hover:opacity-100 transition-opacity">
          {employers.map((emp) => (
            <div
              key={emp.name}
              className={`text-lg sm:text-xl text-stone-600 hover:text-stone-900 transition-colors select-none ${emp.font}`}
            >
              {emp.name}
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
