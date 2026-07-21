import { createFileRoute } from "@tanstack/react-router";
import { Footer } from "@/components/landing/Footer";
import { JDMirror } from "@/components/credibility/JDMirror";
import { SITE, absUrl } from "@/components/landing/constants";
import { pageSeo } from "@/lib/seo";

export const Route = createFileRoute("/jd-mirror")({
  head: () => {
    const path = "/jd-mirror";
    const title = "JD Mirror · Syllabus built from real Indian job descriptions · Arzon Careers";
    const description =
      "We read 5,000+ real Indian fresher JDs from Naukri, LinkedIn India and Foundit, then turn every recurring requirement into a graded week of training. See the exact JD lines and the modules that train for them.";
    const ps = pageSeo({
      path,
      title,
      description,
      image: SITE.ogImage.inauguration,
      ogType: "website",
    });
    return {
      meta: [
        { title },
        {
          name: "keywords",
          content:
            "JD based training India, syllabus from job descriptions, fresher medical coder training, fresher drug safety associate training, JD-derived curriculum, role-based training India",
        },
        ...ps.meta,
      ],
      links: ps.links,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE.origin },
              { "@type": "ListItem", position: 2, name: "JD Mirror", item: absUrl(path) },
            ],
          }),
        },
      ],
    };
  },
  component: JDMirrorPage,
});

function JDMirrorPage() {
  return (
    <main className="min-h-app bg-white text-ink">
      <div className="pt-16 sm:pt-20">
        <JDMirror variant="full" />
      </div>
      <Footer />
    </main>
  );
}
