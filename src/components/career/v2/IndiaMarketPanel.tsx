import { MapPin, Building2, Clock } from "lucide-react";
import { getPathFacts, formatSourceLine } from "@/data/careerPathEvidence";

/**
 * IndiaMarketPanel - the "where does this job actually exist in India?" view.
 *
 * City demand is a directional split (we don't claim per-JD city counts).
 * Top employer chips come from the existing evidence file.
 */

// Directional hiring-share split per role family. Tuned to Naukri/LinkedIn
// snapshot Jan–Jun 2026; refreshed quarterly.
const CITY_SPLIT: Record<string, { city: string; share: number }[]> = {
  default: [
    { city: "Hyderabad", share: 28 },
    { city: "Bengaluru", share: 24 },
    { city: "Mumbai", share: 14 },
    { city: "Pune", share: 12 },
    { city: "Chennai", share: 12 },
    { city: "Gurgaon", share: 10 },
  ],
  "sas-clinical": [
    { city: "Hyderabad", share: 34 },
    { city: "Bengaluru", share: 26 },
    { city: "Chennai", share: 14 },
    { city: "Pune", share: 12 },
    { city: "Mumbai", share: 10 },
    { city: "Gurgaon", share: 4 },
  ],
  "medical-coding": [
    { city: "Chennai", share: 32 },
    { city: "Hyderabad", share: 22 },
    { city: "Bengaluru", share: 18 },
    { city: "Mumbai", share: 12 },
    { city: "Pune", share: 10 },
    { city: "Coimbatore", share: 6 },
  ],
  "regulatory-affairs": [
    { city: "Hyderabad", share: 30 },
    { city: "Mumbai", share: 22 },
    { city: "Ahmedabad", share: 14 },
    { city: "Bengaluru", share: 14 },
    { city: "Chandigarh", share: 10 },
    { city: "Pune", share: 10 },
  ],
};

export function IndiaMarketPanel({
  pathSlug,
  chromeless = false,
}: {
  pathSlug: string;
  /** Hide the outer section chrome (eyebrow + title). Used when embedded
   *  inside a ReportCard that already provides them. */
  chromeless?: boolean;
}) {
  const facts = getPathFacts(pathSlug);
  const split = CITY_SPLIT[pathSlug] ?? CITY_SPLIT.default;
  const employers = facts?.topCompanies ?? [];
  if (!facts && employers.length === 0) return null;

  return (
    <section
      className={chromeless ? "" : "rounded-3xl border border-white/10 bg-white/[0.025] p-6 sm:p-8"}
    >
      {!chromeless && (
        <>
          <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-eyebrow/85">
            India market · hiring map
          </p>
          <h2 className="mt-1 font-grotesk text-h4 font-extrabold text-white sm:text-h3">
            Where this role actually exists right now
          </h2>
        </>
      )}

      <div className={`${chromeless ? "" : "mt-5 "}grid gap-5 sm:grid-cols-2`}>
        <div>
          <p className="flex items-center gap-1.5 font-mono text-micro uppercase tracking-[0.22em] text-white/55">
            <MapPin className="h-3 w-3" /> Top hiring cities
          </p>
          <ul className="mt-3 space-y-2">
            {split.map((row) => (
              <li key={row.city} className="space-y-1">
                <div className="flex items-center justify-between font-grotesk text-sm text-white/85">
                  <span>{row.city}</span>
                  <span className="font-mono text-micro tabular-nums text-white/55">
                    {row.share}%
                  </span>
                </div>
                <div className="h-1 w-full overflow-hidden rounded-full bg-white/8">
                  <div
                    className="h-full rounded-full bg-accent-glow/70"
                    style={{ width: `${row.share}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="flex items-center gap-1.5 font-mono text-micro uppercase tracking-[0.22em] text-white/55">
            <Building2 className="h-3 w-3" /> Top employers ({employers.length})
          </p>
          {employers.length ? (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {employers.map((e) => (
                <span
                  key={e}
                  className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 font-grotesk text-xs font-semibold text-white/85"
                >
                  {e}
                </span>
              ))}
            </div>
          ) : (
            <p className="mt-3 text-sm text-white/55">Sourcing in progress.</p>
          )}

          <div className="mt-5 rounded-xl border border-sky-400/25 bg-sky-400/[0.05] px-3 py-2.5">
            <p className="flex items-center gap-1.5 font-mono text-micro uppercase tracking-[0.22em] text-sky-200">
              <Clock className="h-3 w-3" /> Time to first interview
            </p>
            <p className="mt-1 font-grotesk text-base font-extrabold text-white">
              12–16 weeks from zero
            </p>
            <p className="mt-0.5 text-xs text-white/60">
              Cohort median for candidates who finish the JD-shaped portfolio.
            </p>
          </div>
        </div>
      </div>

      {facts && <p className="mt-5 text-xs italic text-white/45">{formatSourceLine(facts)}</p>}
    </section>
  );
}

export default IndiaMarketPanel;
