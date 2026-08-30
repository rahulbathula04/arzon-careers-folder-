import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import { useNavSections } from "@/components/landing/NavSectionsContext";
import { EditorialHero } from "@/components/landing/EditorialHero";
import { CareerExplorerTerminal } from "@/components/landing/CareerExplorerTerminal";
import { IndustryResearchPublication } from "@/components/landing/IndustryResearchPublication";
import { PreparationArchitecture } from "@/components/landing/PreparationArchitecture";
import { LiveJobMarketTerminal } from "@/components/landing/LiveJobMarketTerminal";
import { PractitionerMentorsProof } from "@/components/landing/PractitionerMentorsProof";
import { EditorialClosingCTA } from "@/components/landing/EditorialClosingCTA";
import { Footer } from "@/components/landing/Footer";
import { SITE, absUrl, LINKS } from "@/components/landing/constants";
import { COURSES } from "@/data/courses";
import { seo } from "@/lib/seo";
import { SectionSkeleton } from "@/components/landing/SectionSkeleton";
import { useHomeSearchSignals } from "@/hooks/useHomeSearchSignals";

const HOME_SECTIONS = [
  { id: "top", label: "Home" },
  { id: "career-explorer", label: "Careers" },
  { id: "research", label: "300+ JDs" },
  { id: "method", label: "Method" },
  { id: "jobs", label: "Jobs" },
  { id: "mentors", label: "Mentors" },
  { id: "faq", label: "FAQ" },
  { id: "apply", label: "Get Started" },
];

const FAQ = lazy(() => import("@/components/landing/FAQ").then((m) => ({ default: m.FAQ })));
const ExitIntentQuiz = lazy(() =>
  import("@/components/landing/ExitIntentQuiz").then((m) => ({ default: m.ExitIntentQuiz })),
);

/**
 * Defer hydration with a structured skeleton so the page feels instant (CLS = 0).
 */
function Defer({
  children,
  minH = 200,
  variant,
}: {
  children: React.ReactNode;
  minH?: React.ComponentProps<typeof SectionSkeleton>["minH"];
  variant?: React.ComponentProps<typeof SectionSkeleton>["variant"];
}) {
  const fallback = <SectionSkeleton variant={variant ?? "default"} minH={minH} />;
  return (
    <Suspense fallback={fallback}>
      <div className="defer-reveal">{children}</div>
    </Suspense>
  );
}

export const Route = createFileRoute("/")({
  head: () => {
    const og = absUrl(SITE.ogImage.inauguration);
    const title = "India's Workforce Readiness Platform · Arzon Careers";
    const desc =
      "Pharmacovigilance, medical coding & clinical research courses in India with paid internships, ISO-aligned certificate & placement support. Apply now.";
    const s = seo("/");
    const homeUrl = `${SITE.origin}/`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        // Open Graph (Facebook / WhatsApp / LinkedIn)
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
        { property: "og:image:alt", content: SITE.ogImage.alt },
        // Twitter
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: desc },
        { name: "twitter:image", content: og },
        { name: "twitter:image:alt", content: SITE.ogImage.alt },
        {
          name: "keywords",
          content:
            "fresher jobs in india, pharmacovigilance jobs for freshers, medical coding jobs for freshers, clinical data management salary, bpharm career options, pharmd career path, biotechnology jobs, regulatory affairs freshers, argus safety tools, meddra coding, healthcare data analytics",
        },
      ],
      links: [...s.links],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Is this a real internship or another online course?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Both parts are real and distinct. Weeks 1–8 are live instructor-led classes with graded weekly homework on actual data files. Weeks 9–12 are an applied internship where you work on enterprise-domain and healthcare capstone projects.",
                },
              },
              {
                "@type": "Question",
                name: "What kind of files do we actually work on?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Real, de-identified case files: PV ICSR cases, medical coding charts, eCRF datasets — the exact work fresh hires do on day one.",
                },
              },
              {
                "@type": "Question",
                name: "Who issues the certificate?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Arzon Global Labs — ISO 9001 certified, MSME registered, MCA incorporated. Each certificate carries ISO, MSME and Govt. of Telangana seals.",
                },
              },
              {
                "@type": "Question",
                name: "How do recruiters verify the certificate?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Each certificate has a unique ID, a QR code and a public verification URL at arzoncareers.in/verify.",
                },
              },
              {
                "@type": "Question",
                name: "Do you guarantee a job?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No. We do not guarantee jobs. We guarantee real skills, audited artifacts, ISO verifiable certificates, and direct partner-desk introductions for qualifying students.",
                },
              },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListOrder: "https://schema.org/ItemListOrderAscending",
            name: "Arzon Careers — Deployment-Ready Programmes",
            numberOfItems: COURSES.length,
            itemListElement: COURSES.map((c, i) => ({
              "@type": "ListItem",
              position: i + 1,
              item: {
                "@type": "Course",
                "@id": `${SITE.origin}/courses/${c.slug}`,
                url: `${SITE.origin}/courses/${c.slug}`,
                name: c.title,
                description: c.blurb,
                inLanguage: "en-IN",
                educationalLevel: c.seniority ?? "Fresher",
                teaches: c.jd.topSkills.join(", "),
                about: c.category,
                occupationalCredentialAwarded: c.certification,
                provider: {
                  "@type": "EducationalOrganization",
                  name: "Arzon Global",
                  sameAs: SITE.origin,
                  url: SITE.origin,
                },
                hasCourseInstance: {
                  "@type": "CourseInstance",
                  courseMode: "Blended",
                  courseWorkload: "P12W",
                  location: { "@type": "Place", name: "Hyderabad, India" },
                  inLanguage: "en-IN",
                },
              },
            })),
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
  useNavSections(HOME_SECTIONS);
  useHomeSearchSignals({ path: "/" });

  return (
    <main className="overflow-x-clip pb-16 md:pb-0 bg-[#FAF8F5]">
      {/* ─── Beat 01: The Brand Statement & Core Thesis (Hero) ─── */}
      <EditorialHero />

      {/* ─── Beat 02: The Healthcare Career Explorer ─── */}
      <CareerExplorerTerminal />

      {/* ─── Beat 03: Industry Intelligence: What Employers Are Actually Looking For ─── */}
      <IndustryResearchPublication />

      {/* ─── Beat 04: The Arzon Preparation Architecture ─── */}
      <PreparationArchitecture />

      {/* ─── Beat 05: Live Healthcare Jobs & GCC Hiring Market ─── */}
      <LiveJobMarketTerminal />

      {/* ─── Beat 06: Practitioner Mentorship & Evidence ─── */}
      <PractitionerMentorsProof />

      {/* ─── Transparent FAQ ─── */}
      <Defer variant="faq" minH={{ base: 360, md: 320, lg: 280 }}>
        <FAQ limit={6} />
      </Defer>

      {/* ─── Beat 07: Editorial Closing Decision CTA ─── */}
      <EditorialClosingCTA />

      {/* Global Footer */}
      <div>
        <Footer />
      </div>

      {/* Exit-intent + scroll-depth re-engagement quiz */}
      <Suspense fallback={null}>
        <ExitIntentQuiz />
      </Suspense>

      <Toaster richColors position="top-center" theme="dark" />
    </main>
  );
}
