import { GitCompare, Check } from "lucide-react";

export interface CompareTrack {
  slug: string;
  title: string;
  fit: number;
}

interface Props {
  tracks: CompareTrack[];
  selectedSlug: string;
  onSelect: (slug: string) => void;
}

/**
 * Lets the candidate compare multiple recommended tracks and pick a
 * different one. Selecting a track updates the downstream Skill map,
 * Focus stack and Mentor brief so they can explore each path's
 * gap-to-close and skill stack without rerunning the test.
 */
export function TrackCompareCard({ tracks, selectedSlug, onSelect }: Props) {
  if (tracks.length < 2) return null;

  return (
    <section
      aria-labelledby="track-compare-heading"
      className="tone-light mt-6 overflow-hidden rounded-3xl bg-white text-slate-900 ring-1 ring-slate-200 shadow-[0_20px_50px_-30px_rgba(15,23,42,0.4)]"
    >
      <div className="border-b border-slate-100 bg-gradient-to-r from-primary/5 via-white to-primary/5 px-5 py-4 sm:px-6">
        <p className="inline-flex items-center gap-1.5 text-micro font-bold uppercase tracking-wide text-primary">
          <GitCompare className="h-3.5 w-3.5" /> Compare tracks
        </p>
        <h3
          id="track-compare-heading"
          className="mt-1.5 font-grotesk text-body font-extrabold leading-snug text-slate-900 sm:text-body-lg"
        >
          Pick a different role to update your map
        </h3>
        <p className="mt-1 text-meta text-slate-500">
          Tap any track — your skill map, focus stack and mentor brief below will update for that
          path.
        </p>
      </div>

      <ol className="divide-y divide-slate-100">
        {tracks.map((t, i) => {
          const selected = t.slug === selectedSlug;
          const fit = Math.round(t.fit);
          return (
            <li key={t.slug}>
              <button
                type="button"
                onClick={() => onSelect(t.slug)}
                aria-pressed={selected}
                data-testid="compare-track-row"
                data-selected={selected ? "true" : "false"}
                className={`flex w-full items-center gap-3 px-5 py-3.5 text-left transition sm:px-6 ${
                  selected ? "bg-primary/5" : "hover:bg-slate-50"
                }`}
              >
                <span
                  className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-micro font-bold ${
                    selected ? "bg-primary text-white" : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {selected ? <Check className="h-3.5 w-3.5" /> : i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-grotesk text-body-sm font-bold text-slate-900">
                    {t.title}
                  </p>
                  <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full ${selected ? "bg-primary" : "bg-slate-300"}`}
                      style={{ width: `${Math.max(4, Math.min(100, fit))}%` }}
                    />
                  </div>
                </div>
                <span className="shrink-0 font-grotesk text-body-sm font-extrabold tabular-nums text-slate-900">
                  {fit}
                  <span className="text-micro font-bold text-slate-400">%</span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
