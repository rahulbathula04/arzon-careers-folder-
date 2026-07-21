const partners = [
  "Apollo Hospitals",
  "Cognizant Healthcare",
  "Optum",
  "Accenture Life Sciences",
  "IQVIA",
  "Tata 1mg",
  "Practo",
  "Parexel",
  "ICON plc",
  "Syneos Health",
  "Wipro Health Plan",
  "Cipla",
  "Dr. Reddy's",
  "Biocon",
  "Novartis",
  "GE Healthcare",
];

export function LogoMarquee() {
  const items = [...partners, ...partners];
  return (
    <section
      aria-label="Hiring partners"
      className="relative border-y border-slate-200/5 bg-white/[0.02] py-8"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="text-center font-mono text-micro uppercase tracking-[0.28em] text-slate-100/60">
          Our students intern, code and consult at
        </p>
        <div className="relative mt-5 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
          <div
            className="flex w-max gap-12 whitespace-nowrap"
            style={{ animation: "marquee 38s linear infinite" }}
          >
            {items.map((p, i) => (
              <span
                key={i}
                className="font-grotesk text-lg font-bold text-slate-100/80 transition-colors hover:text-slate-50"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
