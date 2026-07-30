import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { Footer } from "@/components/landing/Footer";
import { ROLES } from "@/data/industry/roles";
import type { PayBand } from "@/data/industry/types";
import { pageSeo } from "@/lib/seo";
import { absUrl } from "@/components/landing/constants";
import { IndustryReadinessCTA } from "@/components/industry/IndustryReadinessCTA";

const EXP_LEVELS = [
  { key: "fresher", label: "Fresher (0-1 yr)" },
  { key: "midY3", label: "2-3 yrs" },
  { key: "seniorY5", label: "4-6 yrs" },
  { key: "leadY8", label: "7+ yrs" },
] as const;
type ExpKey = (typeof EXP_LEVELS)[number]["key"];
const EXP_LABEL: Record<ExpKey, string> = EXP_LEVELS.reduce(
  (acc, e) => ({ ...acc, [e.key]: e.label }),
  {} as Record<ExpKey, string>,
);

const ALL_CITIES = Array.from(new Set(ROLES.flatMap((r) => r.pay.map((p) => p.city)))).sort();

const searchSchema = z.object({
  city: z.string().optional().default("all"),
  exp: z.enum(["fresher", "midY3", "seniorY5", "leadY8"]).optional().default("fresher"),
  role: z.string().optional().default("all"),
});
type SalarySearch = z.infer<typeof searchSchema>;

export const Route = createFileRoute("/industry/salaries")({
  validateSearch: (input) => searchSchema.parse(input),
  component: SalariesPage,
  head: ({ match }) => {
    const s = (match.search ?? {}) as Partial<SalarySearch>;
    const city = s.city ?? "all";
    const exp = (s.exp ?? "fresher") as ExpKey;
    const role = s.role ?? "all";
    const roleName = role === "all" ? null : (ROLES.find((r) => r.slug === role)?.name ?? null);

    // Deterministic param order; only include non-defaults so canonicals
    // collapse equivalent URLs (?city=all&exp=fresher = base path).
    const qs: string[] = [];
    if (city !== "all") qs.push(`city=${encodeURIComponent(city)}`);
    if (exp !== "fresher") qs.push(`exp=${encodeURIComponent(exp)}`);
    if (role !== "all") qs.push(`role=${encodeURIComponent(role)}`);
    const path = "/industry/salaries" + (qs.length ? `?${qs.join("&")}` : "");

    const subjectBits = [roleName ?? "Healthcare", "salaries"];
    if (city !== "all") subjectBits.push(`in ${city}`);
    subjectBits.push(`(${EXP_LABEL[exp]})`);
    const title = `${subjectBits.join(" ")} - India 2026`.slice(0, 70);

    const description =
      `${roleName ?? "PV, Coding, CDM, Regulatory and AI-in-Healthcare"} pay bands` +
      `${city !== "all" ? ` in ${city}` : " across 8 Indian cities"}` +
      ` for ${EXP_LABEL[exp]}. JD-derived, refreshed quarterly.`;

    const ps = pageSeo({ path, title, description });

    const breadcrumbItems = [
      { name: "Home", item: absUrl("/") },
      { name: "Industry", item: absUrl("/industry") },
      { name: "Salaries", item: absUrl("/industry/salaries") },
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
            name: roleName ?? "Healthcare careers (PV, Coding, CDM, Regulatory, AI)",
          },
          ...(city !== "all" && {
            spatialCoverage: { "@type": "Place", name: `${city}, India` },
          }),
          audience: {
            "@type": "Audience",
            audienceType: EXP_LABEL[exp],
          },
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

function fmt(range: [number, number]) {
  return `₹${range[0]} – ${range[1]} LPA`;
}

function SalariesPage() {
  const { city, exp, role } = Route.useSearch();
  const navigate = Route.useNavigate();

  const expLabel = EXP_LEVELS.find((e) => e.key === exp)!.label;
  const filteredRoles = role === "all" ? ROLES : ROLES.filter((r) => r.slug === role);

  return (
    <div className="min-h-dvh bg-[#070A14] text-white">
      <main className="mx-auto max-w-6xl px-4 pb-24 pt-12 sm:px-6 lg:px-8">
        <p className="font-mono text-micro uppercase tracking-[0.22em] text-white/70">
          Salaries · India 2026
        </p>
        <h1 className="mt-2 text-h1 font-semibold">Browse pay by city and experience</h1>
        <p className="mt-3 max-w-2xl text-white/70">
          Pick a city and experience level. Bands are JD-scrape medians (Naukri + LinkedIn, n &gt;
          1,000) cross-checked with AmbitionBox and Arzon alumni offers.
        </p>

        {/* Filters */}
        <div className="mt-8 flex flex-wrap items-end gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4">
          <Filter
            label="City"
            value={city}
            onChange={(v) => navigate({ search: (p: SalarySearch) => ({ ...p, city: v }) })}
            options={[{ v: "all", l: "All cities" }, ...ALL_CITIES.map((c) => ({ v: c, l: c }))]}
          />
          <Filter
            label="Experience"
            value={exp}
            onChange={(v) =>
              navigate({ search: (p: SalarySearch) => ({ ...p, exp: v as ExpKey }) })
            }
            options={EXP_LEVELS.map((e) => ({ v: e.key, l: e.label }))}
          />
          <Filter
            label="Role"
            value={role}
            onChange={(v) => navigate({ search: (p: SalarySearch) => ({ ...p, role: v }) })}
            options={[
              { v: "all", l: "All roles" },
              ...ROLES.map((r) => ({ v: r.slug, l: r.name })),
            ]}
          />
          {(city !== "all" || exp !== "fresher" || role !== "all") && (
            <button
              onClick={() =>
                navigate({ search: () => ({ city: "all", exp: "fresher", role: "all" }) })
              }
              className="ml-auto text-xs text-white/80 underline-offset-2 hover:text-gold hover:underline"
            >
              Reset
            </button>
          )}
        </div>

        {/* Result */}
        {city === "all" ? (
          <CrossCityTable roles={filteredRoles} expKey={exp} expLabel={expLabel} />
        ) : (
          <SingleCityTable roles={filteredRoles} city={city} />
        )}

        <p className="mt-6 text-meta text-white/70">
          Showing {filteredRoles.length} role{filteredRoles.length === 1 ? "" : "s"}
          {city !== "all" ? ` for ${city}` : ""} · {expLabel}. Data refreshed Nov 2025.
        </p>

        <div className="mt-10 flex flex-wrap gap-3 text-sm">
          <Link
            to="/industry/employers"
            search={{ city: "all", role: "all", tier: "all" }}
            className="rounded-lg border border-white/15 px-4 py-2 hover:border-gold/40 hover:text-gold"
          >
            Browse employers by city →
          </Link>
          <Link
            to="/industry/compare"
            search={{}}
            className="rounded-lg border border-white/15 px-4 py-2 hover:border-gold/40 hover:text-gold"
          >
            Compare all 5 roles →
          </Link>
        </div>

        <IndustryReadinessCTA
          source="industry-salaries"
          context='The pay is real. The gap between "graduate" and "hire-able" is what we close in 12 weeks.'
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

function CrossCityTable({
  roles,
  expKey,
  expLabel,
}: {
  roles: typeof ROLES;
  expKey: ExpKey;
  expLabel: string;
}) {
  return (
    <div className="mt-6 overflow-x-auto rounded-xl border border-white/10 bg-white/[0.02]">
      <table className="w-full min-w-[860px] text-left text-sm">
        <thead className="bg-white/[0.04] text-xs uppercase tracking-wide text-white/80">
          <tr>
            <th className="px-4 py-3 font-medium">Role · {expLabel}</th>
            {ALL_CITIES.map((c) => (
              <th key={c} className="px-4 py-3 font-medium">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/[0.06]">
          {roles.map((r) => (
            <tr key={r.slug}>
              <td className="px-4 py-3">
                <Link
                  to="/industry/$role"
                  params={{ role: r.slug }}
                  className="font-medium text-white hover:text-gold"
                >
                  {r.name}
                </Link>
              </td>
              {ALL_CITIES.map((c) => {
                const band = r.pay.find((p) => p.city === c);
                return (
                  <td key={c} className="px-4 py-3 text-white/80">
                    {band ? (
                      fmt(band[expKey] as [number, number])
                    ) : (
                      <span className="text-white/65">-</span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SingleCityTable({ roles, city }: { roles: typeof ROLES; city: string }) {
  return (
    <div className="mt-6 overflow-x-auto rounded-xl border border-white/10 bg-white/[0.02]">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead className="bg-white/[0.04] text-xs uppercase tracking-wide text-white/80">
          <tr>
            <th className="px-4 py-3 font-medium">Role in {city}</th>
            {EXP_LEVELS.map((e) => (
              <th key={e.key} className="px-4 py-3 font-medium">
                {e.label}
              </th>
            ))}
            <th className="px-4 py-3 font-medium">Note</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/[0.06]">
          {roles.map((r) => {
            const band: PayBand | undefined = r.pay.find((p) => p.city === city);
            if (!band) {
              return (
                <tr key={r.slug}>
                  <td className="px-4 py-3">
                    <Link
                      to="/industry/$role"
                      params={{ role: r.slug }}
                      className="font-medium text-white hover:text-gold"
                    >
                      {r.name}
                    </Link>
                  </td>
                  <td colSpan={5} className="px-4 py-3 text-white/65">
                    No active hiring tracked in {city} for this role.
                  </td>
                </tr>
              );
            }
            return (
              <tr key={r.slug}>
                <td className="px-4 py-3">
                  <Link
                    to="/industry/$role"
                    params={{ role: r.slug }}
                    className="font-medium text-white hover:text-gold"
                  >
                    {r.name}
                  </Link>
                </td>
                <td className="px-4 py-3 text-white/80">{fmt(band.fresher)}</td>
                <td className="px-4 py-3 text-white/80">{fmt(band.midY3)}</td>
                <td className="px-4 py-3 text-white/80">{fmt(band.seniorY5)}</td>
                <td className="px-4 py-3 text-white/80">{fmt(band.leadY8)}</td>
                <td className="px-4 py-3 text-white/80 text-meta">{band.note ?? "-"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
