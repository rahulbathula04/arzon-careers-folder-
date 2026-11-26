import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { ArzonHomeV2 } from "@/components/home/ArzonHomeV2";
import { ExitIntentQuiz } from "@/components/landing/ExitIntentQuiz";
import { SITE, absUrl, LINKS, ADDRESS, COUNSELLOR_PHONE_DISPLAY } from "@/components/landing/constants";
import { seo } from "@/lib/seo";
import { useHomeSearchSignals } from "@/hooks/useHomeSearchSignals";
import { useFunnelTracking } from "@/hooks/useFunnelTracking";

export const Route = createFileRoute("/")({
  head: () => {
    const og = absUrl(SITE.ogImage.inauguration);
    const title = "Arzon Global | Healthcare Talent Intelligence";
    const desc =
      "Understand healthcare role requirements, explore clinical career paths and demonstrate selected capabilities through practical, synthetic assessments with Arzon Global.";
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
        { name: "geo.region", content: "IN-TG" },
        { name: "geo.placename", content: "Hyderabad, Telangana, India" },
        { name: "geo.position", content: "17.4485;78.3908" },
        { name: "ICBM", content: "17.4485, 78.3908" },
        {
          name: "keywords",
          content:
            "healthcare careers, pharmacovigilance course in hyderabad, medical coding course in hyderabad, clinical data management, regulatory affairs, clinical research training india, life sciences careers hyderabad, b pharm jobs india, healthcare career assessment, role readiness programmes, Arzon Global",
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
            name: "Healthcare Talent Intelligence | Arzon Global",
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
                name: "What is Arzon Global?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Arzon Global is a healthcare talent intelligence platform. It helps candidates understand role requirements, review their profile against those requirements and demonstrate selected capabilities through practical assessments.",
                },
              },
              {
                "@type": "Question",
                name: "Does an assessment result guarantee a job?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No. Assessment results describe performance on specified tasks and conditions. Employers make their own recruitment decisions, and Arzon does not guarantee interviews, offers or employment.",
                },
              },
              {
                "@type": "Question",
                name: "Are the clinical cases real patient cases?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No. The educational simulator uses synthetic training scenarios. Candidates should not enter real patient information into the training environment.",
                },
              },
              {
                "@type": "Question",
                name: "Does Arzon always recommend its own programmes?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No. Recommendations should reflect the candidate's identified needs. Independent study, external resources, practical experience or further assessment may be more appropriate than an Arzon programme.",
                },
              },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["EducationalOrganization", "LocalBusiness"],
            name: "Arzon Global",
            url: SITE.origin,
            logo: absUrl(SITE.ogImage.inauguration),
            telephone: COUNSELLOR_PHONE_DISPLAY,
            address: {
              "@type": "PostalAddress",
              streetAddress: `${ADDRESS.street}, ${ADDRESS.area}`,
              addressLocality: ADDRESS.locality,
              addressRegion: ADDRESS.region,
              postalCode: ADDRESS.postalCode,
              addressCountry: ADDRESS.countryCode,
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 17.4485,
              longitude: 78.3908,
            },
            hasMap: ADDRESS.mapsUrl,
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
