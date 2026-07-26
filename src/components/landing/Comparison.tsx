import { Link } from "@tanstack/react-router";
import { SectionHeader } from "./SectionHeader";
import { Section } from "@/components/ui/Section";
import { Check, Minus, X, Calculator, ArrowRight } from "lucide-react";
import { PRICE_CAREER } from "./constants";

type Cell = true | false | "partial" | string;

const rows: Array<[string, Cell, Cell, Cell]> = [
  // [label, Self-taught, Average course, Arzon]
  ["Recruiter-graded portfolio", false, "partial", true],
  ["Live Indian JD coverage (100–200/yr)", false, false, true],
  ["ISO 9001 verifiable credential", false, false, true],
  ["Mentor who actually worked the job", false, "partial", true],
  ["Mock interviews with a real panel", false, false, true],
  ["Months to first offer (median)", "8–14", "6–10", "3–5"],
  ["Hidden cost of waiting", "₹2.0L+", "₹1.2L", "—"],
];

const cell = (v: Cell) => {
  if (v === true) return <Check className="mx-auto h-5 w-5 text-mint" aria-label="included" />;
  if (v === false)
    return <X className="mx-auto h-5 w-5 text-slate-100/80" aria-label="not included" />;
  if (v === "partial") return <Minus className="mx-auto h-5 w-5 text-gold" aria-label="partial" />;
  return <span className="font-mono text-caption font-semibold text-slate-50">{v}</span>;
};

export function Comparison() {
  const fee = 24999;
  const monthly = Math.round(320000 / 12);
  const breakevenDays = Math.ceil((fee / monthly) * 30);
  return (
    <Section id="compare" size="lg">
      <SectionHeader
        eyebrow="Side by side"
        title={<>Self-taught vs an average course vs Arzon.</>}
        sub="Same role, same recruiters. Different distance to your first offer."
      />
      <div className="mt-10 -mx-5 overflow-x-auto px-5 sm:mx-0 sm:mt-12 sm:overflow-hidden sm:px-0 sm:rounded-2xl sm:border sm:border-slate-200/10 sm:bg-white/[0.03] sm:backdrop-blur">
        <table className="w-full min-w-[560px] text-sm sm:min-w-0">
          <thead>
            <tr className="border-b border-slate-200/10 text-left">
              <th className="px-4 py-4 font-mono text-micro font-medium uppercase tracking-wider text-slate-100/80 sm:px-6"></th>
              <th className="px-4 py-4 text-center font-grotesk text-sm font-semibold text-slate-100/70">
                Self-taught
                <span className="block text-micro font-normal text-slate-200/45">
                  YouTube + free notes
                </span>
              </th>
              <th className="px-4 py-4 text-center font-grotesk text-sm font-semibold text-slate-100/70">
                Average course
                <span className="block text-micro font-normal text-slate-200/45">
                  ₹8k–15k online
                </span>
              </th>
              <th className="px-4 py-4 text-center">
                <span className="rounded-full bg-gold/15 px-3 py-1 font-grotesk text-sm font-bold text-gold">
                  Arzon Global
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([label, a, b, c], i) => (
              <tr key={i} className={i % 2 ? "bg-white/[0.02]" : ""}>
                <td className="px-4 py-3.5 text-slate-100/85 sm:px-6">{label}</td>
                <td className="px-4 py-3.5 text-center">{cell(a)}</td>
                <td className="px-4 py-3.5 text-center">{cell(b)}</td>
                <td className="px-4 py-3.5 text-center">{cell(c)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-center font-mono text-micro uppercase tracking-[0.18em] text-slate-100/60 sm:hidden">
        Swipe to compare →
      </p>

      {/* Break-even math — comes after the comparison, before the price */}
      <div className="mt-8 flex flex-col items-start gap-3 rounded-2xl border border-gold/25 bg-navy p-5 sm:flex-row sm:items-center sm:gap-5 sm:p-6">
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/15 ring-1 ring-gold/35">
          <Calculator className="h-5 w-5 text-gold" strokeWidth={2.25} />
        </span>
        <p className="font-display text-base leading-snug text-slate-50 sm:text-lg">
          <span className="text-gold">₹{fee.toLocaleString()}</span>
          <span className="text-slate-100/55"> ÷ </span>
          <span>₹{monthly.toLocaleString()}</span>
          <span className="text-slate-100/55"> median first-month salary = </span>
          <span className="text-gold">break-even in ~{breakevenDays} days.</span>
        </p>
      </div>

      {/* Price callout — last */}
      <div className="mt-4 flex flex-col items-start gap-3 rounded-2xl border border-slate-200/10 bg-white/[0.04] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <p className="font-mono text-micro uppercase tracking-[0.22em] text-slate-100/55">
            Career tier
          </p>
          <p className="mt-1 font-display text-h3 font-bold text-slate-50">
            {PRICE_CAREER}{" "}
            <span className="text-caption font-normal text-slate-100/65">
              · ₹999 seat lock token
            </span>
          </p>
        </div>
        <Link
          to="/career-engine/start"
          className="inline-flex h-11 items-center justify-center gap-2 self-start rounded-full bg-gold px-5 text-body-sm font-bold text-surface-ink sm:self-auto"
        >
          Take the test <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
        </Link>
      </div>
    </Section>
  );
}
