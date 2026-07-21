import { createFileRoute } from "@tanstack/react-router";
import { Footer } from "@/components/landing/Footer";
import { CheckCircle2, AlertTriangle, XCircle, Wrench } from "lucide-react";
import { fetchStatus, type StatusComponent } from "@/lib/trust.functions";
import { pageSeo } from "@/lib/seo";

const STATE_META = {
  operational: { label: "Operational", icon: CheckCircle2, cls: "bg-accent-glow/10 text-eyebrow" },
  degraded: { label: "Degraded", icon: AlertTriangle, cls: "bg-amber-500/10 text-amber-300" },
  down: { label: "Down", icon: XCircle, cls: "bg-rose-500/10 text-rose-300" },
  maintenance: { label: "Maintenance", icon: Wrench, cls: "bg-accent-glow/10 text-eyebrow" },
} as const;

export const Route = createFileRoute("/status")({
  loader: () => fetchStatus(),
  head: () => {
    const ps = pageSeo({
      path: "/status",
      title: "System Status · Arzon Careers",
      description:
        "Real-time status of Arzon Careers website, ACRI quiz, payments, counsellor line and live class delivery.",
      image: "/og/about.jpg",
    });
    return { meta: [{ title: "System Status · Arzon Careers" }, ...ps.meta], links: ps.links };
  },
  component: StatusPage,
});

function StatusPage() {
  const { components, overall } = Route.useLoaderData();
  const headline =
    overall === "operational"
      ? "All systems operational"
      : overall === "down"
        ? "Major outage in progress"
        : "Some systems degraded";
  return (
    <main className="min-h-app text-white">
      <section className="mx-auto max-w-3xl px-5 pb-20 pt-16 sm:px-6 lg:px-8">
        <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-gold">
          System status
        </p>
        <h1 className="h-display mt-3">{headline}</h1>
        <p className="body-lg mt-4 max-w-2xl">
          Live status of the platform candidates and counsellors rely on, read directly from our ops
          database.
        </p>

        <ul className="mt-10 divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.03]">
          {components.map((s: StatusComponent) => {
            const meta = STATE_META[s.state];
            const Icon = meta.icon;
            return (
              <li key={s.id} className="flex items-center justify-between gap-4 px-5 py-4">
                <div>
                  <p className="font-grotesk text-sm font-semibold">{s.name}</p>
                  {s.note && <p className="mt-0.5 text-xs text-white/80">{s.note}</p>}
                </div>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-micro font-bold uppercase tracking-[0.18em] ${meta.cls}`}
                >
                  <Icon className="h-3 w-3" /> {meta.label}
                </span>
              </li>
            );
          })}
        </ul>

        <p className="mt-6 text-xs text-white/80">
          Incident reports, when they happen, are posted here within 60 minutes of detection.
          WhatsApp counsellor line operates 10am–10pm IST.
        </p>
      </section>
      <Footer />
    </main>
  );
}
