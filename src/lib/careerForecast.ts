import { getForecast, type CareerForecast } from "@/data/careerForecast";

/** Compound annual growth: today * (1 + cagr)^years, rounded to 1 decimal. */
export function projectPackage(today: number, years: number, cagr: number): number {
  return Math.round(today * Math.pow(1 + cagr, years) * 10) / 10;
}

/** Format an LPA range as "₹3.5–6 LPA". */
export function fmtLpaRange(range: [number, number]): string {
  const [lo, hi] = range;
  const fmt = (n: number) => (Number.isInteger(n) ? `${n}` : `${n.toFixed(1)}`);
  return `₹${fmt(lo)}–${fmt(hi)} LPA`;
}

export function fmtLpa(n: number): string {
  return Number.isInteger(n) ? `₹${n} LPA` : `₹${n.toFixed(1)} LPA`;
}

export type { CareerForecast };
export { getForecast };
