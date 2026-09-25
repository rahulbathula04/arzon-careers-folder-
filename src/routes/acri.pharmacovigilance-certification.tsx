import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { pageSeo } from "@/lib/seo";
import { absUrl } from "@/components/landing/constants";
import { AcriLaunchLandingPage } from "@/components/acri/landing/AcriLaunchLandingPage";

const searchSchema = z.object({
  apply: z.string().optional(),
});

const TITLE = "Pharmacovigilance Certification & Skills Assessment | ACRI";
const DESCRIPTION =
  "Assess your Pharmacovigilance skills with ACRI. Complete a real-world assessment, receive a readiness score, competency profile and verified credential.";

export const Route = createFileRoute("/acri/pharmacovigilance-certification")({
  validateSearch: (search: Record<string, unknown>) => searchSchema.parse(search),
  head: () => {
    const ps = pageSeo({
      path: "/acri/pharmacovigilance-certification",
      title: TITLE,
      description: DESCRIPTION,
      image: "/og/career-engine.jpg",
    });

    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": `${absUrl("/")}#organization`,
          name: "Arzon Global",
          url: absUrl("/"),
          logo: absUrl("/brand/arzon-logo.webp"),
          sameAs: ["https://www.linkedin.com/company/arzon-global"],
        },
        {
          "@type": "WebPage",
          "@id": absUrl("/acri/pharmacovigilance-certification"),
          url: absUrl("/acri/pharmacovigilance-certification"),
          name: TITLE,
          description: DESCRIPTION,
          isPartOf: { "@id": `${absUrl("/")}#website` },
          breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: absUrl("/"),
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "ACRI",
                item: absUrl("/acri"),
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Pharmacovigilance Certification",
                item: absUrl("/acri/pharmacovigilance-certification"),
              },
            ],
          },
        },
        {
          "@type": "Course",
          name: "ACRI Pharmacovigilance Certification",
          description:
            "A standardized 25-minute competency assessment measuring real-world Pharmacovigilance readiness across ICSR, MedDRA coding, case triage, and regulatory reporting.",
          provider: {
            "@type": "Organization",
            name: "Arzon Global",
            sameAs: absUrl("/"),
          },
          educationalCredentialAwarded: "ACRI Pharmacovigilance Industry Ready Credential",
          hasCourseInstance: {
            "@type": "CourseInstance",
            courseMode: "online",
            courseWorkload: "PT25M",
          },
        },
      ],
    };

    return {
      meta: [{ title: TITLE }, ...ps.meta],
      links: ps.links,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(structuredData),
        },
      ],
    };
  },
  component: AcriLaunchLandingPage,
});
