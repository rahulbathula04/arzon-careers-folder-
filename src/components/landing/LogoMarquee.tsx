/**
 * LogoMarquee — Upgraded to use Magic UI Marquee for infinite smooth scrolling.
 * Two rows running in opposite directions for a premium effect.
 */
import { Marquee } from "@/components/magicui/marquee";
import { cn } from "@/lib/utils";

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

const firstRow = partners.slice(0, Math.ceil(partners.length / 2));
const secondRow = partners.slice(Math.ceil(partners.length / 2));

function PartnerTag({ name }: { name: string }) {
  return (
    <span className="mx-5 font-grotesk text-base font-bold text-slate-100/75 hover:text-white transition-colors duration-200 whitespace-nowrap cursor-default select-none">
      {name}
    </span>
  );
}

export function LogoMarquee() {
  return (
    <section
      aria-label="Hiring partners"
      className="relative border-y border-slate-200/5 bg-white/[0.02] py-8 overflow-hidden"
    >
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 z-10 bg-gradient-to-r from-[#0F172A] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 z-10 bg-gradient-to-l from-[#0F172A] to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 space-y-5">
        <p className="text-center font-mono text-[11px] uppercase tracking-[0.28em] text-slate-100/55">
          Our students intern, code and consult at
        </p>

        {/* Row 1 — left to right */}
        <Marquee pauseOnHover repeat={3} className="[--duration:32s]">
          {firstRow.map((name) => (
            <PartnerTag key={name} name={name} />
          ))}
        </Marquee>

        {/* Row 2 — right to left */}
        <Marquee reverse pauseOnHover repeat={3} className="[--duration:28s]">
          {secondRow.map((name) => (
            <PartnerTag key={name} name={name} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
