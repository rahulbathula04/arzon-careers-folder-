import { createFileRoute, redirect, Outlet, useChildMatches } from "@tanstack/react-router";
import { FEATURE_FLAGS } from "@/config/featureFlags";
import { absUrl } from "@/components/landing/constants";
import { pageSeo } from "@/lib/seo";
import { AcriCertificationLanding } from "@/components/acri/landing/AcriCertificationLanding";

export const Route = createFileRoute("/acri")({
  beforeLoad: () => {
    if (!FEATURE_FLAGS.ENABLE_ASSESSMENT) {
      throw redirect({ to: "/courses" });
    }
  },
  head: () => {
    const title = "ACRI Certification · Pharmacovigilance Skills Assessment | Arzon Global";
    const description =
      "A role-specific Pharmacovigilance assessment designed to evaluate how you apply your knowledge to practical drug-safety scenarios. Invite-controlled access.";
    const ps = pageSeo({ path: "/acri", title, description });
    return {
      meta: [{ title }, ...ps.meta],
      links: ps.links,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TechArticle",
            headline: title,
            description,
            url: absUrl("/acri"),
            publisher: { "@type": "Organization", name: "Arzon Global" },
          }),
        },
      ],
    };
  },
  component: AcriPage,
});

function AcriPage() {
  const childMatches = useChildMatches();
  const hasChildMatch = childMatches.length > 0;

  if (hasChildMatch) {
    return <Outlet />;
  }

  return <AcriCertificationLanding />;
}
