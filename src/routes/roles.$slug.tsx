import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { CAREER_ROLES } from "@/data/careerRoles";
import { getJdProvenance } from "@/data/jdProvenance";
import { ArzonRoleIntelligencePage } from "@/components/career/ArzonRoleIntelligencePage";
import { pageSeo } from "@/lib/seo";

const COURSE_BY_PATH_SLUG: Record<string, string> = {
  "sas-clinical": "sas-clinical",
  "clinical-data-management": "clinical-data-management",
  "regulatory-affairs": "regulatory-affairs",
  "medical-coding": "medical-coding",
  "pharmacovigilance": "pharmacovigilance",
  "ai-intelligence": "ai-intelligence",
  "clinical-saas": "clinical-saas",
};

const ROLE_FAMILY_ALIASES: Record<string, string> = {
  pharmacovigilance: "pv-associate",
};

const COURSE_BY_FAMILY: Record<string, string> = {
  "drug-safety": "pharmacovigilance",
  "clinical-data": "clinical-data-management",
  regulatory: "regulatory-affairs",
  "medical-coding": "medical-coding",
  "health-analytics-ai": "ai-intelligence",
  "commercial-healthcare": "clinical-saas",
};

export const Route = createFileRoute("/roles/$slug")({
  loader: async ({ params }) => {
    const alias = ROLE_FAMILY_ALIASES[params.slug];
    if (alias) {
      throw redirect({ to: "/roles/$slug", params: { slug: alias } });
    }

    const role = CAREER_ROLES.find(
      (item) =>
        item.slug === params.slug ||
        item.slug.endsWith(`.${params.slug}`) ||
        item.slug.replace(/^[^\.]+\./, "") === params.slug,
    );

    if (!role) throw notFound();

    const courseSlug = COURSE_BY_PATH_SLUG[role.pathSlug] ?? COURSE_BY_FAMILY[role.familyId] ?? "pharmacovigilance";
    return {
      role,
      courseSlug,
      provenance: getJdProvenance(courseSlug),
    };
  },
  head: ({ loaderData }) => {
    if (!loaderData?.role) return {};

    const { role } = loaderData;
    const cleanSlug = role.slug.split(".").pop() ?? role.slug;
    const seo = pageSeo({
      path: `/roles/${cleanSlug}`,
      title: `${role.name} · Role Requirements & Career Path · Arzon Global`,
      description: `Understand the ${role.name} role, common skills, eligibility, tools, market context and preparation path.`,
      image: "/og/about.jpg",
    });

    return {
      meta: [{ title: `${role.name} · Role Requirements & Career Path · Arzon Global` }, ...seo.meta],
      links: seo.links,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "OccupationalProfile",
            name: role.name,
            description: role.blurb,
            occupationalCategory: role.familyId,
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://arzoncareers.in/" },
              { "@type": "ListItem", position: 2, name: "Roles", item: "https://arzoncareers.in/roles" },
              { "@type": "ListItem", position: 3, name: role.name, item: `https://arzoncareers.in/roles/${cleanSlug}` },
            ],
          }),
        },
      ],
    };
  },
  component: RoleDetailComponent,
});

function RoleDetailComponent() {
  const { role, courseSlug, provenance } = Route.useLoaderData();

  return (
    <ArzonRoleIntelligencePage
      role={role}
      courseSlug={courseSlug}
      provenance={provenance ?? null}
    />
  );
}
