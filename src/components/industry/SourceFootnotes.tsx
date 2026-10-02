import { SOURCES } from "@/data/industry/sources";

export function SourceFootnotes({ ids }: { ids: string[] }) {
  if (!ids.length) return null;
  return (
    <div className="tone-light card-light rounded-xl border border-[var(--arzon-border)] bg-[var(--arzon-surface-subtle)] p-4">
      <p className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-[var(--arzon-ink-soft)]">Sources</p>
      <ol className="space-y-1.5 text-xs text-[var(--arzon-ink-soft)]">
        {ids.map((id, i) => {
          const s = SOURCES[id];
          if (!s) return null;
          return (
            <li key={id}>
              [{i + 1}] {s.label} · {s.publisher} · {s.asOf} ·{" "}
              <a
                href={s.url}
                target="_blank" rel="noopener noreferrer"
                className="font-semibold text-[var(--arzon-blue-700)] underline"
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
