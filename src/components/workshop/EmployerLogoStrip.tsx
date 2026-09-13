export function EmployerLogoStrip() {
  const logos = [
    "IQVIA",
    "parexel.",
    "Syneos Health",
    "cognizant",
    "accenture",
    "OPTUM",
    "Sun Pharma",
    "Cipla",
    "Dr.Reddy's",
  ];

  return (
    <div className="w-full bg-[#070E1B] text-white py-4 sm:py-5 border-b border-white/10 select-none">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left Label */}
        <span className="font-sans text-[10px] font-extrabold uppercase tracking-widest text-slate-400 shrink-0">
          EMPLOYERS REPRESENTED IN OUR JOB-MARKET RESEARCH
        </span>

        {/* Right Logo Strip */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 font-sans font-extrabold text-stone-300 text-xs sm:text-sm tracking-wider opacity-85">
          {logos.map((logo, idx) => (
            <span key={idx} className="hover:text-white transition-colors cursor-default whitespace-nowrap">
              {logo}
            </span>
          ))}
        </div>

      </div>
    </div>
  );
}
