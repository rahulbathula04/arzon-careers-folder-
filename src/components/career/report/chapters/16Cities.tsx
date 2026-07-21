import { ReportCard } from "../ReportCard";
import { EMPLOYERS } from "@/data/industry/employers";
import { MapPin } from "lucide-react";
import { REPORT_TONES } from "../reportTones";

// Rough monthly rent (1BHK, decent locality) — public aggregates.
const RENT_INR: Record<string, number> = {
  Bengaluru: 28000,
  Hyderabad: 22000,
  Chennai: 21000,
  Mumbai: 42000,
  Pune: 24000,
  Gurugram: 32000,
  Noida: 24000,
  Kochi: 18000,
  Thane: 30000,
  Mohali: 15000,
  Vadodara: 14000,
  Goa: 20000,
};

const COST_INDEX: Record<string, number> = {
  Bengaluru: 1.15,
  Hyderabad: 0.95,
  Chennai: 0.95,
  Mumbai: 1.35,
  Pune: 1.05,
  Gurugram: 1.2,
  Noida: 1.05,
  Kochi: 0.9,
  Thane: 1.15,
  Mohali: 0.85,
  Vadodara: 0.85,
  Goa: 1.0,
};

export function ChapterCities({ slug, chapter }: { slug: string; chapter: number }) {
  const cityCounts = new Map<string, number>();
  for (const e of EMPLOYERS.filter((x) => x.hiringFor.includes(slug))) {
    for (const c of e.cities) cityCounts.set(c, (cityCounts.get(c) ?? 0) + 1);
  }
  const cities = [...cityCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([city, count]) => ({
      city,
      count,
      rent: RENT_INR[city] ?? 20000,
      costIndex: COST_INDEX[city] ?? 1,
    }));

  return (
    <ReportCard
      id={`ch-${chapter}-cities`}
      chapter={chapter}
      eyebrow="Cities to target"
      tone="primary"
      title="Where this role hires most — and what your rent looks like"
      subtitle="Ranked by employer density. Rent is a public median for a decent 1BHK, cost-index is normalised to Hyderabad = 1.0."
      whatThisMeans="Where you move matters as much as which role you pick — this is which city gives you jobs AND take-home you can live on."
    >
      {cities.length === 0 ? (
        <div className="rounded-2xl border border-white/8 bg-black/25 p-6 text-sm text-white/60">
          City map for this role still being catalogued.
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {cities.map((c) => (
            <div key={c.city} className="rounded-2xl border border-white/8 bg-white/[0.02] p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className={`h-4 w-4 ${REPORT_TONES.primary.iconAccent}`} />
                  <span className="font-grotesk text-h4 font-extrabold text-white">{c.city}</span>
                </div>
                <span
                  className={`rounded-full ${REPORT_TONES.primary.chipPillBg} px-2 py-0.5 font-mono text-xs font-bold ${REPORT_TONES.primary.chipPillText} tabular-nums`}
                >
                  {c.count} hiring
                </span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-white/45">
                    Rent (1BHK)
                  </p>
                  <p className="mt-1 font-grotesk font-bold text-white tabular-nums">
                    ₹{(c.rent / 1000).toFixed(0)}k
                    <span className="ml-1 text-xs font-normal text-white/50">/mo</span>
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-white/45">
                    Cost index
                  </p>
                  <p className="mt-1 font-grotesk font-bold text-white tabular-nums">
                    ×{c.costIndex.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </ReportCard>
  );
}
export default ChapterCities;
