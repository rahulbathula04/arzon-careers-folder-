import { createFileRoute } from "@tanstack/react-router";
import { Footer } from "@/components/landing/Footer";
import { fetchChangelog, type ChangelogEntry } from "@/lib/trust.functions";
import { pageSeo } from "@/lib/seo";

export const Route = createFileRoute("/changelog")({
  loader: () => fetchChangelog(),
  head: () => {
    const ps = pageSeo({
      path: "/changelog",
      title: "Programme Changelog · Arzon Careers",
      description:
        "Public changelog of curriculum, platform, policy and trust updates at Arzon Careers.",
      image: "/og/about.jpg",
    });
    return {
      meta: [{ title: "Programme Changelog · Arzon Careers" }, ...ps.meta],
      links: ps.links,
    };
  },
  component: ChangelogPage,
  pendingComponent: () => (
    <div className="min-h-dvh animate-pulse bg-background p-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="h-8 w-64 rounded bg-muted"></div>
        <div className="h-4 w-full rounded bg-muted"></div>
        <div className="h-32 w-full rounded bg-muted"></div>
      </div>
    </div>
  ),
});

function ChangelogPage() {
  const { entries } = Route.useLoaderData();
  return (
    <main className="min-h-app text-white">
      <section className="mx-auto max-w-3xl px-5 pb-20 pt-16 sm:px-6 lg:px-8">
        <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-gold">
          Living programme
        </p>
        <h1 className="h-display mt-3">Changelog</h1>
        <p className="body-lg mt-4 max-w-2xl">
          Curriculum, platform and policy changes, dated and public.
        </p>

        {entries.length === 0 ? (
          <p className="mt-10 text-sm text-white/80">
            No entries yet. Check back after the next release.
          </p>
        ) : (
          <ol className="mt-10 space-y-6 border-l border-white/10 pl-6">
            {entries.map((e: ChangelogEntry) => (
              <li key={e.id} className="relative">
                <span className="absolute -left-[31px] top-1 inline-block h-2.5 w-2.5 rounded-full bg-gold" />
                <div className="flex flex-wrap items-baseline gap-3">
                  <time className="font-mono text-micro uppercase tracking-[0.18em] text-white/80">
                    {e.released_on}
                  </time>
                  <span className="rounded-full border border-white/15 bg-white/[0.04] px-2 py-0.5 font-mono text-micro uppercase tracking-[0.18em] text-white/75">
                    {e.area}
                  </span>
                </div>
                <h2 className="mt-2 font-grotesk text-lg font-bold">{e.title}</h2>
                {e.body && <p className="mt-1 text-sm text-white/75">{e.body}</p>}
              </li>
            ))}
          </ol>
        )}
      </section>
      <Footer />
    </main>
  );
}
