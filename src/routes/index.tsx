import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import { useNavSections } from "@/components/landing/NavSectionsContext";
import { Hero } from "@/components/landing/Hero";
import { BentoProgrammes } from "@/components/landing/BentoProgrammes";
import { CredibilityStrip } from "@/components/landing/CredibilityStrip";
import { HiringPartnerWall } from "@/components/landing/HiringPartnerWall";
import { Pricing } from "@/components/landing/Pricing";
import { Footer } from "@/components/landing/Footer";
import { RecruiterOutcomes } from "@/components/landing/RecruiterOutcomes";
import { RoleTrackLibrary } from "@/components/landing/RoleTrackLibrary";
import { SITE, LINKS, absUrl } from "@/components/landing/constants";
import { seo } from "@/lib/seo";
import { SectionSkeleton } from "@/components/landing/SectionSkeleton";
import { useHomeSearchSignals } from "@/hooks/useHomeSearchSignals";
import { COURSES } from "@/data/courses";
import { SalaryRoiCalculator } from "@/components/landing/SalaryRoiCalculator";
import { SkillGapDiagnostic } from "@/components/landing/SkillGapDiagnostic";
import { HiringMarketMap } from "@/components/landing/HiringMarketMap";
// NEW: 20-Reference design synthesis components
import { ProgramAtAGlance } from "@/components/landing/ProgramAtAGlance";
import { YouAreHere } from "@/components/landing/YouAreHere";
import { CareerGap } from "@/components/landing/CareerGap";
import { ArzonMethod } from "@/components/landing/ArzonMethod";
import { CareerPaths } from "@/components/landing/CareerPaths";
import { MentorSection } from "@/components/landing/MentorSection";
import { FinalHeroOfferCTA } from "@/components/landing/FinalHeroOfferCTA";

const HOME_SECTIONS = [
  { id: "top", label: "Home" },
  { id: "programmes", label: "Programmes" },
  { id: "how-it-works", label: "Method" },
  { id: "career-paths", label: "Career Paths" },
  { id: "recruiter-outcomes", label: "Outcomes" },
  { id: "credibility", label: "Credibility" },
  { id: "jd-mirror", label: "Proof" },
  { id: "pricing", label: "Pricing" },
  { id: "faq", label: "FAQ" },
  { id: "apply", label: "Apply" },
];

const FAQ = lazy(() => import("@/components/landing/FAQ").then((m) => ({ default: m.FAQ })));
const FinalCTA = lazy(() =>
  import("@/components/landing/FinalCTA").then((m) => ({ default: m.FinalCTA })),
);
const JDMirror = lazy(() =>
  import("@/components/credibility/JDMirror").then((m) => ({ default: m.JDMirror })),
);
const HowItWorks = lazy(() =>
  import("@/components/landing/HowItWorks").then((m) => ({ default: m.HowItWorks })),
);
const LimitedSeatsCountdown = lazy(() =>
  import("@/components/landing/LimitedSeatsCountdown").then((m) => ({
    default: m.LimitedSeatsCountdown,
  })),
);
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
    <main className="overflow-x-clip pb-16 md:pb-0 bg-[#F7F5F0]">

      {/* ─── 01 · Hero — Degree-to-Role Matching Promise ─── */}
      <div data-apply-surface="home-hero">
        <Hero />
      </div>

      {/* ─── 02 · Program At a Glance — Purdue: Decision Clarity ─── */}
      {/* Immediately post-hero scannable stats: duration, format, investment */}
      <ProgramAtAGlance />

      {/* ─── 03 · Institutional Credibility Strip — Great Learning: Trust ─── */}
      <div id="credibility">
        <CredibilityStrip />
      </div>

      {/* ─── 04 · You Are Here — James Clear: Identity-Based Messaging ─── */}
      {/* Audience selector: Final-Year / Graduate / Working Professional */}
      <YouAreHere />

      {/* ─── 05 · Career Gap — Scaler: Transformation Storytelling ─── */}
      {/* College vs Employer gap visualization with comparison split */}
      <CareerGap />

      {/* ─── 06 · 12-Week Role Track Programmes — General Assembly: Program Structure ─── */}
      <section id="programmes" data-apply-surface="home-bento">
        <div id="tracks">
          <BentoProgrammes />
        </div>
      </section>

      {/* ─── 07 · Career Paths Explorer — Coursera: Outcome-Oriented Presentation ─── */}
      {/* Interactive role path selector using real JD frequency data */}
      <section id="career-paths">
        <CareerPaths />
      </section>

      {/* ─── 08 · The Arzon Method — Treehouse: Learning Path Visualization ─── */}
      {/* 7-stage interactive path: ASSESS → LEARN → PRACTICE → BUILD → MEASURE → PREPARE → PROGRESS */}
      <ArzonMethod />

      {/* ─── 09 · Salary ROI Calculator — WGU: ROI Framing ─── */}
      <SalaryRoiCalculator />

      {/* ─── 10 · JD Mirror — Empirical Proof: Skills vs Employer Expectations ─── */}
      <div id="jd-mirror">
        <Defer variant="default" minH={{ base: 450, md: 400, lg: 360 }}>
          <JDMirror variant="compact" />
        </Defer>
      </div>

      {/* ─── 11 · Skill Gap Diagnostic — Interactive ACRI Readiness Audit ─── */}
      <SkillGapDiagnostic />

      {/* ─── 12 · Role Track Library — Skill Frequency Map ─── */}
      <RoleTrackLibrary />

      {/* ─── 13 · How It Works — Le Wagon: Process Clarity Timeline ─── */}
      <section id="how-it-works">
        <Defer variant="default" minH={{ base: 480, md: 420, lg: 380 }}>
          <HowItWorks />
        </Defer>
      </section>

      {/* ─── 14 · Mentor Section — CreativeLive: Instructor-Led Selling ─── */}
      {/* Large mentor cards with verified credentials, not tiny photo grids */}
      <MentorSection />

      {/* ─── 15 · Hiring Partner Wall — Employer Trust & Logo Recognition ─── */}
      <HiringPartnerWall />

      {/* ─── 16 · India Hiring Market Map — Regional Demand Signals ─── */}
      <HiringMarketMap />

      {/* ─── 17 · Recruiter Day-1 Readiness — Outcome & Candidate Dossier ─── */}
      <div id="recruiter-outcomes">
        <Defer variant="default" minH={{ base: 420, md: 380, lg: 340 }}>
          <RecruiterOutcomes />
        </Defer>
      </div>

      {/* ─── 18 · Pricing — Foundr: Direct-Response Offer Presentation ─── */}
      <section id="pricing">
        <Pricing />
      </section>

      {/* ─── 19 · FAQ — Le Wagon: Structured Transparent Information ─── */}
      <Defer variant="faq" minH={{ base: 360, md: 320, lg: 280 }}>
        <FAQ limit={6} />
      </Defer>

      {/* ─── 20 · Final Hero Offer CTA — MasterClass + Foundr: Closing ─── */}
      {/* "Stop collecting certificates. Start building career evidence." */}
      <section id="apply">
        <FinalHeroOfferCTA />
      </section>

      {/* Legacy FinalCTA kept for A/B reference */}
      <Defer variant="cta" minH={{ base: 160, md: 120, lg: 100 }}>
        <LimitedSeatsCountdown />
      </Defer>

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
