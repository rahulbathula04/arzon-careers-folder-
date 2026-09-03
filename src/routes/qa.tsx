import { createFileRoute } from "@tanstack/react-router";
import { SITE, absUrl } from "@/components/landing/constants";
import {
  QA_CATEGORY_LABEL,
  QA_CHECKS,
  getQaBuildInfo,
  groupChecks,
  type QaCategory,
} from "../lib/qaCoverage";

export const Route = createFileRoute("/qa")({
  component: QaCoveragePage,
  head: () => ({
    meta: [
      { title: "QA Coverage - Arzon Global" },
      {
        name: "description",
        content:
          "Internal dashboard of automated copy, spacing, hydration, and payment-flow validations shipped with the latest build.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:image", content: absUrl(SITE.ogImage.inauguration) },
    ],
    links: [{ rel: "canonical", href: "https://arzoncareers.in/qa" }],
  }),
});

const ORDER: QaCategory[] = ["copy", "spacing", "hydration", "payment"];

const KIND_STYLE: Record<string, string> = {
  unit: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30", // @allow-raw-palette
  e2e: "bg-sky-500/10 text-sky-300 border-sky-500/30", // @allow-raw-palette
  script: "bg-amber-500/10 text-amber-300 border-amber-500/30", // @allow-raw-palette
};

function QaCoveragePage() {
  const groups = groupChecks(QA_CHECKS);
  const { sha, builtAt } = getQaBuildInfo();
  const total = QA_CHECKS.length;

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10 text-neutral-100">
      <header className="mb-8">
        <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">Internal · noindex</p>
        <h1 className="mt-2 text-h3 font-semibold">QA coverage</h1>
        <p className="mt-2 text-sm text-neutral-400">
          Automated validations that run against the latest build. Each entry points to the source
          of truth in the repo.
        </p>
        <dl className="mt-6 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
          <Stat label="Checks" value={String(total)} />
          <Stat label="Categories" value={String(ORDER.length)} />
          <Stat label="Build" value={sha} />
          <Stat
            label="Rendered"
            value={new Date(builtAt).toLocaleString(undefined, {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          />
        </dl>
      </header>

      <div className="space-y-8">
        {ORDER.map((cat) => {
          const items = groups[cat];
          return (
            <section key={cat}>
              <div className="mb-3 flex items-baseline justify-between border-b border-neutral-800 pb-2">
                <h2 className="text-lg font-medium">{QA_CATEGORY_LABEL[cat]}</h2>
                <span className="text-xs text-neutral-500">
                  {items.length} check{items.length === 1 ? "" : "s"}
                </span>
              </div>

              {items.length === 0 ? (
                <p className="text-sm text-neutral-500">No checks registered yet.</p>
              ) : (
                <ul className="space-y-3">
                  {items.map((c) => (
                    <li
                      key={c.id}
                      className="rounded-lg border border-neutral-800 bg-neutral-900/40 p-4"
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-medium">{c.name}</h3>
                        <span
                          className={`rounded border px-1.5 py-0.5 text-micro uppercase tracking-wide ${
                            KIND_STYLE[c.kind] ?? ""
                          }`}
                        >
                          {c.kind}
                        </span>
                      </div>
                      <p className="mt-1.5 text-sm text-neutral-300">{c.description}</p>
                      <p className="mt-2 font-mono text-xs text-neutral-500">{c.source}</p>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          );
        })}
      </div>

      <footer className="mt-10 border-t border-neutral-800 pt-4 text-xs text-neutral-500">
        Update <span className="font-mono">src/lib/qaCoverage.ts</span> whenever a validation is
        added or retired so this dashboard stays trustworthy.
      </footer>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-neutral-800 bg-neutral-900/40 px-3 py-2">
      <dt className="text-micro uppercase tracking-wide text-neutral-500">{label}</dt>
      <dd className="mt-0.5 font-mono text-sm text-neutral-200">{value}</dd>
    </div>
  );
}
