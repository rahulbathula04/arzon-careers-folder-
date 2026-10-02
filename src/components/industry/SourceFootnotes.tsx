import { SOURCES } from "@/data/industry/sources";

export function SourceFootnotes({ ids }: { ids: string[] }) {
  if (!ids.length) return null;
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <p className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-slate-700">Sources</p>
      <ol className="space-y-1.5 text-xs text-slate-600">
        {ids.map((id, i) => {
          const s = SOURCES[id];
          if (!s) return null;
          return (
            <li key={id}>
              [{i + 1}] {s.label} · {s.publisher} · {s.asOf} ·{" "}
              <a
                href={s.url}
                target="_blank" rel="noopener noreferrer"
                className="font-semibold text-blue-600 underline"
              >
                link
              </a>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
