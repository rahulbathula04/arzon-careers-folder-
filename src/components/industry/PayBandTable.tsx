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
    <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/[0.02]">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="bg-white/[0.04] text-xs uppercase tracking-wide text-white/55">
          <tr>
            <th className="px-4 py-3 font-medium">City</th>
            <th className="px-4 py-3 font-medium">Fresher</th>
            <th className="px-4 py-3 font-medium">2-3 yrs</th>
            <th className="px-4 py-3 font-medium">4-6 yrs</th>
            <th className="px-4 py-3 font-medium">7+ yrs</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/[0.06]">
          {bands.map((b) => (
            <tr key={b.city} className="hover:bg-white/[0.03]">
              <td className="px-4 py-3 font-medium text-white">
                {b.city}
                {b.note && (
                  <span className="block text-micro font-normal text-white/60">{b.note}</span>
                )}
              </td>
              <td className="px-4 py-3 text-white/80">{fmt(b.fresher)}</td>
              <td className="px-4 py-3 text-white/80">{fmt(b.midY3)}</td>
              <td className="px-4 py-3 text-white/80">{fmt(b.seniorY5)}</td>
              <td className="px-4 py-3 text-white/80">{fmt(b.leadY8)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="border-t border-white/10 px-4 py-2 text-micro text-white/60">
        Bands derived from Naukri + LinkedIn JD scrape, AmbitionBox and Glassdoor self-report.
        Refreshed {asOf}.
      </p>
    </div>
  );
}
