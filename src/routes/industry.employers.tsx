import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { Footer } from "@/components/landing/Footer";
import { EMPLOYERS } from "@/data/industry/employers";
import { ROLES } from "@/data/industry/roles";
import { EmployerGrid } from "@/components/industry/EmployerGrid";
import { pageSeo } from "@/lib/seo";
import { absUrl } from "@/components/landing/constants";
import { IndustryReadinessCTA } from "@/components/industry/IndustryReadinessCTA";

const ALL_CITIES = Array.from(new Set(EMPLOYERS.flatMap((e) => e.cities))).sort();

const ROLE_OPTIONS = ROLES.map((r) => ({ slug: r.slug, name: r.name }));

const searchSchema = z.object({
  city: z.string().optional().default("all"),
  role: z.string().optional().default("all"),
  tier: z.string().optional().default("all"),
});
type EmployerSearch = z.infer<typeof searchSchema>;

const ALL_TIERS = Array.from(new Set(EMPLOYERS.map((e) => e.tier)));

export const Route = createFileRoute("/industry/employers")({
  validateSearch: (input) => searchSchema.parse(input),
  component: EmployersPage,
  head: ({ match }) => {
    const s = (match.search ?? {}) as Partial<EmployerSearch>;
    const city = s.city ?? "all";
    const role = s.role ?? "all";
    const tier = s.tier ?? "all";
    const roleName = role === "all" ? null : (ROLES.find((r) => r.slug === role)?.name ?? null);

    const qs: string[] = [];
    if (city !== "all") qs.push(`city=${encodeURIComponent(city)}`);
    if (role !== "all") qs.push(`role=${encodeURIComponent(role)}`);
    if (tier !== "all") qs.push(`tier=${encodeURIComponent(tier)}`);
    const path = "/industry/employers" + (qs.length ? `?${qs.join("&")}` : "");

    const subjectBits: string[] = [];
    if (tier !== "all") subjectBits.push(tier);
    subjectBits.push(roleName ? `${roleName} employers` : "Healthcare & pharma employers");
    if (city !== "all") subjectBits.push(`in ${city}`);
    const title = `${subjectBits.join(" ")} — India 2026`.slice(0, 70);

    const description =
      `${tier !== "all" ? tier + " " : ""}` +
      `firms hiring${roleName ? ` for ${roleName}` : ""}` +
      `${city !== "all" ? ` in ${city}` : " across India"}` +
      `. Cities and L1 fresher pay bands, refreshed quarterly.`;

    const ps = pageSeo({ path, title, description });

    const breadcrumbItems = [
      { name: "Home", item: absUrl("/") },
      { name: "Industry", item: absUrl("/industry") },
      { name: "Employers", item: absUrl("/industry/employers") },
    ];
    if (roleName) breadcrumbItems.push({ name: roleName, item: absUrl(`/industry/${role}`) });
    if (city !== "all") breadcrumbItems.push({ name: city, item: absUrl(path) });

    const ldJson = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": absUrl(path),
          url: absUrl(path),
          name: title,
          description,
          inLanguage: "en-IN",
          isPartOf: { "@type": "WebSite", name: "Arzon Global", url: absUrl("/") },
          about: {
            "@type": "Thing",
            name: roleName ? `${roleName} employers` : "Healthcare & pharma employers",
          },
          ...(city !== "all" && {
            spatialCoverage: { "@type": "Place", name: `${city}, India` },
          }),
          ...(tier !== "all" && {
            audience: { "@type": "Audience", audienceType: `${tier} employers` },
          }),
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: breadcrumbItems.map((b, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: b.name,
            item: b.item,
          })),
        },
      ],
    };

    return {
      meta: [{ title }, ...ps.meta],
      links: ps.links,
      scripts: [{ type: "application/ld+json", children: JSON.stringify(ldJson) }],
    };
  },
});

function EmployersPage() {
  const { city, role, tier } = Route.useSearch();
  const navigate = Route.useNavigate();

  const filtered = EMPLOYERS.filter((e) => {
    if (city !== "all" && !e.cities.includes(city)) return false;
    if (role !== "all" && !e.hiringFor.includes(role)) return false;
    if (tier !== "all" && e.tier !== tier) return false;
    return true;
  });

  return (
    <div className="min-h-dvh bg-[#070A14] text-white">
      <main className="mx-auto max-w-6xl px-4 pb-24 pt-12 sm:px-6 lg:px-8">
        <p className="font-mono text-micro uppercase tracking-[0.22em] text-white/70">Employers</p>
        <h1 className="mt-2 text-h1 font-semibold">Who is actually hiring you, by city and role</h1>
        <p className="mt-3 max-w-2xl text-white/70">
          Filter the live employer index by city, role and tier. Bands shown are L1 / fresher offers
          from JD scrape and Arzon alumni reports.
        </p>

        {/* Filters */}
        <div className="mt-8 flex flex-wrap items-end gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4">
          <Filter
            label="City"
            value={city}
            onChange={(v) => navigate({ search: (p: EmployerSearch) => ({ ...p, city: v }) })}
            options={[{ v: "all", l: "All cities" }, ...ALL_CITIES.map((c) => ({ v: c, l: c }))]}
          />
          <Filter
            label="Hiring for"
            value={role}
            onChange={(v) => navigate({ search: (p: EmployerSearch) => ({ ...p, role: v }) })}
            options={[
              { v: "all", l: "All roles" },
              ...ROLE_OPTIONS.map((r) => ({ v: r.slug, l: r.name })),
            ]}
          />
          <Filter
            label="Employer tier"
            value={tier}
            onChange={(v) => navigate({ search: (p: EmployerSearch) => ({ ...p, tier: v }) })}
            options={[{ v: "all", l: "All tiers" }, ...ALL_TIERS.map((t) => ({ v: t, l: t }))]}
          />
          {(city !== "all" || role !== "all" || tier !== "all") && (
            <button
              onClick={() =>
                navigate({ search: () => ({ city: "all", role: "all", tier: "all" }) })
              }
              className="ml-auto text-xs text-white/80 underline-offset-2 hover:text-gold hover:underline"
            >
              Reset
            </button>
          )}
        </div>

        <p className="mt-6 text-meta text-white/80">
          {filtered.length} employer{filtered.length === 1 ? "" : "s"}
          {city !== "all" ? ` in ${city}` : ""}
          {role !== "all" ? ` hiring for ${ROLE_OPTIONS.find((r) => r.slug === role)?.name}` : ""}
          {tier !== "all" ? ` · ${tier}` : ""}.
        </p>

        <div className="mt-6">
          {filtered.length ? (
            <EmployerGrid employers={filtered} />
          ) : (
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-8 text-center text-white/80">
              No employers in our index match this combination yet. Try a broader city or remove the
              role filter.
            </div>
          )}
        </div>

        <div className="mt-10 flex flex-wrap gap-3 text-sm">
          <Link
            to="/industry/salaries"
            search={{ city: "all", exp: "fresher", role: "all" }}
            className="rounded-lg border border-white/15 px-4 py-2 hover:border-gold/40 hover:text-gold"
          >
            Browse salaries by city →
          </Link>
          <Link
            to="/industry"
            search={{}}
            className="rounded-lg border border-white/15 px-4 py-2 hover:border-gold/40 hover:text-gold"
          >
            Industry hub →
          </Link>
        </div>

        <IndustryReadinessCTA
          source="industry-employers"
          context="These employers screen for operational readiness, not coursework. Find out where you stand."
        />
      </main>
      <Footer />
    </div>
  );
}

function Filter({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { v: string; l: string }[];
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="font-mono text-micro uppercase tracking-[0.18em] text-white/70">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-md border border-white/15 bg-[#0d1124] px-3 py-2 text-sm text-white focus:border-gold/60 focus:outline-none"
      >
        {options.map((o) => (
          <option key={o.v} value={o.v}>
            {o.l}
          </option>
        ))}
      </select>
    </label>
  );
}
