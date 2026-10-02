import type { AbroadMarket } from "@/data/industry/types";

export function AbroadStrip({ markets }: { markets: AbroadMarket[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {markets.map((m) => (
        <div key={m.country} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <p className="text-base font-bold text-slate-900">
              <span className="mr-2 text-xl">{m.flag}</span>
              {m.country}
            </p>
            <span className="rounded bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-800 ring-1 ring-amber-200">
              {m.payInrEquiv}
            </span>
          </div>
          <p className="mt-3 text-xs text-slate-700">
            <span className="font-bold text-slate-900">Eligibility:</span> {m.eligibility}
          </p>
          <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">{m.note}</p>
        </div>
      ))}
    </div>
  );
}
