import { createFileRoute, Link } from "@tanstack/react-router";
import { Footer } from "@/components/landing/Footer";
import { ROLES } from "@/data/industry/roles";
import { pageSeo } from "@/lib/seo";
import type { AIRisk, Demand, RoleProfile } from "@/data/industry/types";

export const Route = createFileRoute("/industry/compare")({
  component: ComparePage,
  head: () => {
    const ps = pageSeo({
      path: "/industry/compare",
      title: "PV vs Coding vs CDM vs RA vs AI Health - compare careers",
      description:
        "Side-by-side comparison of healthcare careers in India: pay ranges, demand, AI risk, work mode, abroad markets and top employers. JD-derived, refreshed quarterly.",
    });
    return {
      meta: [{ title: "Compare healthcare careers - PV, Coding, CDM, RA, AI Health" }, ...ps.meta],
      links: ps.links,
    };
  },
});

const DEMAND_TONE: Record<Demand, string> = {
  "Very High": "bg-accent-glow/15 text-eyebrow ring-1 ring-accent-glow/30",
  High: "bg-accent-glow/15 text-eyebrow ring-1 ring-accent-glow/30",
  Steady: "bg-white/10 text-white/75 ring-1 ring-white/15",
};

const AIRISK_TONE: Record<AIRisk, string> = {
  resistant: "bg-accent-glow/15 text-eyebrow ring-1 ring-accent-glow/30",
  audit: "bg-amber-500/15 text-amber-300 ring-1 ring-amber-500/30",
  augmented: "bg-rose-500/15 text-rose-300 ring-1 ring-rose-500/30",
};

const AIRISK_LABEL: Record<AIRisk, string> = {
  resistant: "Resistant",
  audit: "Audit-protected",
  augmented: "Augmented",
};

function topCity(r: RoleProfile) {
  return r.pay[0];
}

function ComparePage() {
  return (
    <div className="tone-dark min-h-dvh bg-[#070A14] text-white">
      <main className="mx-auto max-w-7xl px-4 pb-24 pt-12 sm:px-6 lg:px-8">
        <p className="font-mono text-micro uppercase tracking-[0.22em] text-white/60">Compare</p>
        <h1 className="mt-2 text-h1 font-semibold">All five healthcare careers, side by side.</h1>
        <p className="mt-3 max-w-2xl text-white/70">
          Pharmacovigilance, Medical Coding, Clinical Data Management, Regulatory Affairs and AI in
          Healthcare - pay, demand, AI risk and where the jobs are. Pick the column that fits you,
          then open the deep page.
        </p>

        {/* Desktop / tablet - wide table */}
        <div className="mt-8 hidden overflow-x-auto rounded-xl border border-white/10 bg-white/[0.02] md:block">
          <table className="w-full min-w-[960px] text-left text-sm">
            <thead className="bg-white/[0.04] text-xs uppercase tracking-wide text-white/80">
              <tr>
                <th className="sticky left-0 z-10 bg-white/[0.04] px-4 py-3 font-medium">
                  Dimension
                </th>
                {ROLES.map((r) => (
                  <th key={r.slug} className="px-4 py-3 font-medium align-top min-w-[170px]">
                    <Link
                      to="/industry/$role"
                      params={{ role: r.slug }}
                      className="block text-white hover:text-gold"
                    >
                      {r.name}
                    </Link>
                    <span className="mt-1 block text-micro font-normal normal-case text-white/50">
                      {r.shortName}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              <Row label="Demand">
                {ROLES.map((r) => (
                  <td key={r.slug} className="px-4 py-3 align-top">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-micro font-medium ${DEMAND_TONE[r.demand]}`}
                    >
                      {r.demand}
                    </span>
                  </td>
                ))}
              </Row>
              <Row label="AI risk">
                {ROLES.map((r) => (
                  <td key={r.slug} className="px-4 py-3 align-top">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-micro font-medium ${AIRISK_TONE[r.aiRisk]}`}
                    >
                      {AIRISK_LABEL[r.aiRisk]}
                    </span>
                  </td>
                ))}
              </Row>
              <Row label="Top hiring city">
                {ROLES.map((r) => (
                  <td key={r.slug} className="px-4 py-3 align-top text-white/75">
                    {topCity(r).city}
                  </td>
                ))}
              </Row>
              <Row label="Fresher pay">
                {ROLES.map((r) => {
                  const p = topCity(r);
                  return (
                    <td key={r.slug} className="px-4 py-3 align-top text-white/85">
                      ₹{p.fresher[0]}–{p.fresher[1]} <span className="text-white/60">LPA</span>
                    </td>
                  );
                })}
              </Row>
              <Row label="2–3 yrs">
                {ROLES.map((r) => {
                  const p = topCity(r);
                  return (
                    <td key={r.slug} className="px-4 py-3 align-top text-white/85">
                      ₹{p.midY3[0]}–{p.midY3[1]} <span className="text-white/60">LPA</span>
                    </td>
                  );
                })}
              </Row>
              <Row label="4–6 yrs">
                {ROLES.map((r) => {
                  const p = topCity(r);
                  return (
                    <td key={r.slug} className="px-4 py-3 align-top text-white/85">
                      ₹{p.seniorY5[0]}–{p.seniorY5[1]} <span className="text-white/60">LPA</span>
                    </td>
                  );
                })}
              </Row>
              <Row label="7+ yrs (lead)">
                {ROLES.map((r) => {
                  const p = topCity(r);
                  return (
                    <td key={r.slug} className="px-4 py-3 align-top font-semibold text-white">
                      ₹{p.leadY8[0]}–{p.leadY8[1]}{" "}
                      <span className="text-white/60 font-normal">LPA</span>
                    </td>
                  );
                })}
              </Row>
              <Row label="Work mode">
                {ROLES.map((r) => (
                  <td key={r.slug} className="px-4 py-3 align-top text-white/75">
                    {r.workMode}
                  </td>
                ))}
              </Row>
              <Row label="English bar">
                {ROLES.map((r) => (
                  <td key={r.slug} className="px-4 py-3 align-top text-white/75">
                    {r.englishNeeded}
                  </td>
                ))}
              </Row>
              <Row label="Who fits">
                {ROLES.map((r) => (
                  <td key={r.slug} className="px-4 py-3 align-top text-meta text-white/65">
                    {r.who}
                  </td>
                ))}
              </Row>
              <Row label="Top employers">
                {ROLES.map((r) => (
                  <td key={r.slug} className="px-4 py-3 align-top text-meta text-white/65">
                    {r.topEmployers.slice(0, 3).join(", ")}
                    {r.topEmployers.length > 3 ? (
                      <span className="text-white/60"> +{r.topEmployers.length - 3} more</span>
                    ) : null}
                  </td>
                ))}
              </Row>
              <Row label="Abroad markets">
                {ROLES.map((r) => (
                  <td key={r.slug} className="px-4 py-3 align-top text-meta text-white/65">
                    {r.abroad.map((a) => a.flag).join(" ")}
                  </td>
                ))}
              </Row>
              <Row label="">
                {ROLES.map((r) => (
                  <td key={r.slug} className="px-4 py-3 align-top">
                    <Link
                      to="/industry/$role"
                      params={{ role: r.slug }}
                      className="inline-flex items-center text-meta font-semibold text-gold hover:underline"
                    >
                      Open {r.shortName} →
                    </Link>
                  </td>
                ))}
              </Row>
            </tbody>
          </table>
        </div>

        {/* Mobile - stacked cards */}
        <div className="mt-8 grid gap-4 md:hidden">
          {ROLES.map((r) => {
            const p = topCity(r);
            return (
              <div key={r.slug} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Link
                      to="/industry/$role"
                      params={{ role: r.slug }}
                      className="text-base font-semibold text-white hover:text-gold"
                    >
                      {r.name}
                    </Link>
                    <p className="text-micro text-white/50">
                      {r.shortName} · top city {p.city}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-micro font-medium ${DEMAND_TONE[r.demand]}`}
                    >
                      {r.demand}
                    </span>
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-micro font-medium ${AIRISK_TONE[r.aiRisk]}`}
                    >
                      {AIRISK_LABEL[r.aiRisk]}
                    </span>
                  </div>
                </div>
                <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1.5 text-meta">
                  <dt className="text-white/50">Fresher</dt>
                  <dd className="text-right text-white/85">
                    ₹{p.fresher[0]}–{p.fresher[1]} LPA
                  </dd>
                  <dt className="text-white/50">2–3 yrs</dt>
                  <dd className="text-right text-white/85">
                    ₹{p.midY3[0]}–{p.midY3[1]} LPA
                  </dd>
                  <dt className="text-white/50">4–6 yrs</dt>
                  <dd className="text-right text-white/85">
                    ₹{p.seniorY5[0]}–{p.seniorY5[1]} LPA
                  </dd>
                  <dt className="text-white/50">7+ yrs</dt>
                  <dd className="text-right font-semibold text-white">
                    ₹{p.leadY8[0]}–{p.leadY8[1]} LPA
                  </dd>
                  <dt className="text-white/50">Mode</dt>
                  <dd className="text-right text-white/75">{r.workMode}</dd>
                  <dt className="text-white/50">Abroad</dt>
                  <dd className="text-right">{r.abroad.map((a) => a.flag).join(" ")}</dd>
                </dl>
                <Link
                  to="/industry/$role"
                  params={{ role: r.slug }}
                  className="mt-3 inline-flex text-meta font-semibold text-gold hover:underline"
                >
                  Open {r.shortName} deep page →
                </Link>
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3 text-meta text-white/80">
          <span className="font-mono uppercase tracking-[0.18em] text-white/60">Legend</span>
          <span
            className={`inline-flex rounded-full px-2 py-0.5 text-micro font-medium ${AIRISK_TONE.resistant}`}
          >
            Resistant
          </span>
          <span className="text-white/80">- growing because of AI</span>
          <span
            className={`inline-flex rounded-full px-2 py-0.5 text-micro font-medium ${AIRISK_TONE.audit}`}
          >
            Audit-protected
          </span>
          <span className="text-white/80">- regulator requires human sign-off</span>
          <span
            className={`inline-flex rounded-full px-2 py-0.5 text-micro font-medium ${AIRISK_TONE.augmented}`}
          >
            Augmented
          </span>
          <span className="text-white/80">- AI assists, role shifts up the value chain</span>
        </div>

        <p className="mt-6 text-meta text-white/60">
          Pay shown is for each role's top hiring city. For the full city × experience grid, open
          the role page. Bands derived from Naukri + LinkedIn JD scrape (n &gt; 1,000), AmbitionBox
          / Glassdoor self-report and Arzon alumni offers. Refreshed Nov 2025.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            to="/industry/salaries"
            search={{ city: "all", exp: "fresher", role: "all" }}
            className="inline-flex h-10 items-center rounded-full border border-white/15 bg-white/[0.04] px-4 text-caption text-white hover:bg-white/[0.08]"
          >
            City-by-city pay tables →
          </Link>
          <Link
            to="/industry/employers"
            search={{ city: "all", role: "all", tier: "all" }}
            className="inline-flex h-10 items-center rounded-full border border-white/15 bg-white/[0.04] px-4 text-caption text-white hover:bg-white/[0.08]"
          >
            Top employers grid →
          </Link>
          <Link
            to="/career-engine"
            className="inline-flex h-10 items-center rounded-full bg-gold px-4 text-caption font-bold text-[#1A1300] hover:bg-gold/90"
          >
            90-sec Career Engine →
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <tr>
      <th
        scope="row"
        className="sticky left-0 z-10 bg-[#0A0E1A] px-4 py-3 text-left text-micro font-medium uppercase tracking-wide text-white/50 align-top"
      >
        {label}
      </th>
      {children}
    </tr>
  );
}
