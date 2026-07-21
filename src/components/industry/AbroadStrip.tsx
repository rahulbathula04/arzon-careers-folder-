import type { AbroadMarket } from "@/data/industry/types";

export function AbroadStrip({ markets }: { markets: AbroadMarket[] }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {markets.map((m) => (
        <div key={m.country} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-white">
              <span className="mr-2">{m.flag}</span>
              {m.country}
            </p>
            <p className="text-meta text-gold">{m.payInrEquiv}</p>
          </div>
          <p className="mt-2 text-meta text-white/70">
            <span className="text-white/50">Eligibility:</span> {m.eligibility}
          </p>
          <p className="mt-1 text-meta text-white/65">{m.note}</p>
        </div>
      ))}
    </div>
  );
}
