import { createFileRoute, Link } from "@tanstack/react-router";
import { TIER_META, formatInr, type TierId } from "@/data/enrolmentTiers";
import { ArrowRight, Check } from "lucide-react";
import { ResumeBanner } from "@/components/enrol/ResumeBanner";

export const Route = createFileRoute("/enrol/")({
  head: () => ({
    meta: [
      { title: "Pick your programme. Arzon Global" },
      {
        name: "description",
        content: "Choose your Arzon Global enrolment tier and reserve your seat.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: EnrolIndex,
});

const PERKS: Record<TierId, string[]> = {
  essential: ["Self-paced curriculum", "Cohort community access", "Certificate of completion"],
  career: ["Live cohort sessions", "Weekly mentor reviews", "Interview prep + placement support"],
  elite: ["1:1 mentor pairing", "Guaranteed interview slots", "Resume + LinkedIn rewrite"],
};

function EnrolIndex() {
  return (
    <section>
      <ResumeBanner />
      <header className="mb-8 sm:mb-10">
        <p className="font-mono text-micro uppercase tracking-[0.22em] text-[color:var(--teal-deep)]">
          Step 2 — Pick programme
        </p>
        <h1 className="mt-3 text-h1 font-semibold text-[color:var(--ink)]">
          Choose your enrolment tier
        </h1>
        <p className="mt-3 max-w-2xl text-[color:var(--ink-soft)]">
          Pick the programme that matches your goal. You'll reserve your seat next and pay once your
          details are confirmed.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
        {(Object.keys(TIER_META) as TierId[]).map((id) => {
          const t = TIER_META[id];
          const featured = id === "career";
          return (
            <Link
              key={id}
              to="/enrol/$tier"
              params={{ tier: id }}
              className={`group flex flex-col rounded-2xl border p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg ${
                featured
                  ? "border-[color:var(--teal-deep)]/40 bg-[color:var(--teal-soft)] ring-1 ring-[color:var(--teal-deep)]/20"
                  : "border-ink/10 bg-white hover:border-ink/25"
              }`}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-[color:var(--ink)]">{t.name}</h2>
                {featured && (
                  <span className="rounded-full bg-[color:var(--teal-deep)] px-2 py-0.5 text-micro font-semibold uppercase tracking-wider text-white">
                    Most picked
                  </span>
                )}
              </div>
              <p className="mt-1 text-xs text-[color:var(--ink-mute)]">{t.sub}</p>
              <p className="mt-4 text-h3 font-semibold text-[color:var(--ink)]">
                {formatInr(t.priceInr)}
              </p>
              <ul className="mt-4 flex-1 space-y-2 text-sm text-[color:var(--ink-soft)]">
                {PERKS[id].map((p) => (
                  <li key={p} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--teal-deep)]" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-[color:var(--teal-deep)] group-hover:text-[color:var(--teal-ink)]">
                Apply <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          );
        })}
      </div>

      <p className="mt-8 text-center text-xs text-[color:var(--ink-mute)]">
        Not sure which tier?{" "}
        <Link
          to="/apply"
          className="text-[color:var(--teal-deep)] underline-offset-2 hover:underline"
        >
          Start the application
        </Link>{" "}
        and we'll recommend one.
      </p>
    </section>
  );
}
