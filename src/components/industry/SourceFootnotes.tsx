import { SOURCES } from "@/data/industry/sources";

export function SourceFootnotes({ ids }: { ids: string[] }) {
  if (!ids.length) return null;
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
      <p className="mb-2 font-mono text-micro uppercase tracking-[0.18em] text-white/60">Sources</p>
      <ol className="space-y-1.5 text-meta text-white/65">
        {ids.map((id, i) => {
          const s = SOURCES[id];
          if (!s) return null;
          return (
            <li key={id}>
              [{i + 1}] {s.label} · {s.publisher} · {s.asOf} ·{" "}
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold underline"
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
