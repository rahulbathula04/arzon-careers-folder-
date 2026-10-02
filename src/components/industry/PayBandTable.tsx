import type { PayBand } from "@/data/industry/types";

function fmt(range: [number, number]) {
  return `₹${range[0]} – ${range[1]} LPA`;
}

/**
 * City × experience pay grid. Read top-to-bottom: the most-hiring city is
 * row 1. Read left-to-right: pay growth across years.
 */
export function PayBandTable({ bands, asOf }: { bands: PayBand[]; asOf: string }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-[var(--arzon-border)] bg-white shadow-sm tone-light">
      <table className="w-full min-w-[640px] text-left text-sm text-[var(--arzon-ink)]">
        <thead className="bg-[var(--arzon-surface-subtle)] text-xs uppercase tracking-[0.16em] text-[var(--arzon-ink-soft)]">
          <tr>
            <th className="px-4 py-3 font-semibold">City</th>
            <th className="px-4 py-3 font-medium">Fresher</th>
            <th className="px-4 py-3 font-medium">2-3 yrs</th>
            <th className="px-4 py-3 font-medium">4-6 yrs</th>
            <th className="px-4 py-3 font-medium">7+ yrs</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--arzon-border)]">
          {bands.map((b) => (
            <tr key={b.city} className="transition-colors hover:bg-[var(--arzon-surface-subtle)]">
              <td className="px-4 py-3 font-semibold text-[var(--arzon-ink)]">
                {b.city}
                {b.note && (
                  <span className="block text-micro font-normal text-[var(--arzon-ink-muted)]">{b.note}</span>
                )}
              </td>
              <td className="px-4 py-3 font-semibold text-emerald-700">{fmt(b.fresher)}</td>
              <td className="px-4 py-3 font-medium text-slate-800">{fmt(b.midY3)}</td>
              <td className="px-4 py-3 font-medium text-slate-800">{fmt(b.seniorY5)}</td>
              <td className="px-4 py-3 font-bold text-blue-700">{fmt(b.leadY8)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="border-t border-[var(--arzon-border)] bg-[var(--arzon-surface-subtle)] px-4 py-3 text-micro text-[var(--arzon-ink-muted)]">
        Bands derived from Naukri + LinkedIn JD scrape, AmbitionBox and Glassdoor self-report.
        Refreshed {asOf}.
      </p>
    </div>
  );
}
