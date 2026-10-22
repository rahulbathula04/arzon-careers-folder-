import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { ArzonHomeV2 } from "@/components/home/ArzonHomeV2";
import { ExitIntentQuiz } from "@/components/landing/ExitIntentQuiz";
import { SITE, absUrl, LINKS } from "@/components/landing/constants";
import { seo } from "@/lib/seo";
import { useHomeSearchSignals } from "@/hooks/useHomeSearchSignals";
import { useFunnelTracking } from "@/hooks/useFunnelTracking";

export const Route = createFileRoute("/")({
  head: () => {
    const og = absUrl(SITE.ogImage.inauguration);
    const title = "Arzon Global | Healthcare Career Paths & Training";
    const desc =
      "Explore pharmacovigilance, medical coding, clinical data management and regulatory affairs careers. Compare role requirements and build practical skills with Arzon Global.";
    const s = seo("/");
    const homeUrl = `${SITE.origin}/`;

    return {
      meta: [
        { title },
        { name: "description", content: desc },
        // Open Graph
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
        { property: "og:url", content: homeUrl },
        { property: "og:locale", content: "en_IN" },
        { property: "og:site_name", content: "Arzon Global" },
        { property: "og:image", content: og },
        { property: "og:image:secure_url", content: og },
        { property: "og:image:type", content: "image/jpeg" },
        { property: "og:image:width", content: String(SITE.ogImage.width) },
        { property: "og:image:height", content: String(SITE.ogImage.height) },
        { property: "og:image:alt", content: "Arzon Global healthcare career intelligence platform" },
        // Twitter
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: desc },
        { name: "twitter:image", content: og },
        { name: "twitter:image:alt", content: "Arzon Global healthcare career intelligence platform" },
        {
          name: "keywords",
          content:
            "healthcare careers, life sciences careers, pharmacovigilance careers, medical coding careers, clinical data management, regulatory affairs, healthcare career assessment, role readiness programmes, Arzon Global",
        },
      ],
      links: [...s.links],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Arzon Global",
            url: SITE.origin,
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Healthcare Career Paths & Training | Arzon Global",
            description: desc,
            url: homeUrl,
            publisher: {
              "@type": "Organization",
              name: "Arzon Global",
              url: SITE.origin,
              logo: absUrl(SITE.ogImage.inauguration),
            },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is ACRI (Arzon Critical Research Index)?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "ACRI (Arzon Critical Research Index) is Arzon Global’s role-specific assessment framework for evaluating selected competencies relevant to healthcare and life-sciences career paths. Results provide preparation guidance and are not a job offer or employment guarantee.",
                },
              },
              {
                "@type": "Question",
                name: "How does the Pharmacovigilance Associate assessment work?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The assessment presents 40 calibrated scenario-based questions and practical case-processing challenges grounded in ICH E2B(R3), CIOMS, WHO-UMC, and US FDA/EMA expedited reporting standards.",
                },
              },
              {
                "@type": "Question",
                name: "What is the Arzon career assessment?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The assessment compares candidate responses with defined role competency areas and returns a structured career readiness report. Assessment results are separate from programme enrolment.",
                },
              },
              {
                "@type": "Question",
                name: "How can employers verify an ACRI certificate?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Each certificate carries a unique ACRI credential ID and QR code verifiable in real-time at arzoncareers.in/verify.",
                },
              },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Arzon Global",
            url: SITE.origin,
            logo: absUrl(SITE.ogImage.inauguration),
            sameAs: [LINKS.linkedin, LINKS.instagram, LINKS.website],
          }),
        },
      ],
    };
  },
  component: Index,
});

function Index() {
  useHomeSearchSignals({ path: "/" });
  useFunnelTracking({ pageName: "homepage", category: "marketing" });

  return (
    <main className="overflow-x-clip bg-white tone-light">
      {/* Arzon Careers V2 unified platform homepage */}
      <ArzonHomeV2 />

      {/* Exit-intent re-engagement quiz */}
      <ExitIntentQuiz />

      <Toaster richColors position="top-center" theme="dark" />
    </main>
  );
}
