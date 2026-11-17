import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Download,
  ExternalLink,
  Eye,
  FileDown,
  FileText,
  GraduationCap,
  Instagram,
  Linkedin,
  Maximize2,
  Play,
  Rocket,
  Search,
  Share2,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  EXTERNAL_RATINGS,
  GOOGLE_RATING,
  REVIEW_CATEGORIES,
  REVIEWS,
  type PublishedReview,
  type ReviewCategory,
} from "@/data/reviews";
import {
  INSTITUTIONAL_ACTIVITIES,
  type ActivityRecord,
  type MediaAsset,
} from "@/data/credibility/institutionalActivities";
import {
  OFFICIAL_CERTIFICATES,
  type OfficialCertificate,
} from "@/data/credibility/certifications";
import {
  TRAINING_PROGRAMS,
  type TrainingProgram,
} from "@/data/credibility/curricula";
import {
  SOCIAL_POSTS,
  buildLinkedInAddUrl,
  type SocialPost,
} from "@/data/credibility/socialRecognition";
import { SITE, absUrl } from "@/components/landing/constants";
import arzonIcon from "@/assets/arzon-icon.webp";
import { RatingBadge } from "@/components/foundations/rating-badge";
import { MediaLightboxModal } from "@/components/credibility/MediaLightboxModal";
import { CertificateVerificationModal } from "@/components/credibility/CertificateVerificationModal";
import { CurriculumDownloadModal } from "@/components/credibility/CurriculumDownloadModal";

type SourceFilter = "All" | "Google" | "Justdial" | "AmbitionBox" | "LinkedIn" | "Instagram" | "Arzon";

type FeedReview = PublishedReview & {
  channel: Exclude<SourceFilter, "All">;
};

const SOURCES: Array<{ key: SourceFilter; label: string; value: string; meta: string }> = [
  { key: "Google", label: "Google", value: "4.5 ★", meta: "447 reviews" },
  { key: "Justdial", label: "Justdial", value: "4.5 ★", meta: "445+ reviews" },
  { key: "AmbitionBox", label: "AmbitionBox", value: "4.8 ★", meta: "31 votes · web result" },
  { key: "LinkedIn", label: "LinkedIn", value: "Public posts", meta: "Learner feedback" },
  { key: "Instagram", label: "Instagram", value: "Public mentions", meta: "Not counted as ratings" },
  { key: "Arzon", label: "Arzon Careers", value: "Published", meta: "First-party feedback" },
];

const REAL_FEED_REVIEWS: FeedReview[] = REVIEWS.map((review) => {
  let channel: Exclude<SourceFilter, "All"> = "Arzon";
  if (review.source === "Google Business Profile") channel = "Google";
  else if (review.source === "Justdial") channel = "Justdial";
  else if (review.source === "LinkedIn public post") channel = "LinkedIn";
  else if (review.source === "Instagram public mention") channel = "Instagram";
  else if (review.source === "AmbitionBox") channel = "AmbitionBox";
  else if (review.source === "Arzon Careers") channel = "Arzon";
  return {
    ...review,
    channel,
  };
});

const FEED_REVIEWS: FeedReview[] = REAL_FEED_REVIEWS;

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Arzon Global · Company Reviews & Institutional Credibility Hub" },
      {
        name: "description",
        content:
          "Verified Arzon Global reviews (Google 4.5★), TASK state partnership, college visits, ISO & MSME credentials, and healthcare career curricula.",
      },
      { property: "og:title", content: "Arzon Global · Company Reviews & Institutional Credibility Hub" },
      {
        property: "og:description",
        content:
          "Verified Arzon Global reviews (Google 4.5★), TASK state partnership, college visits, ISO & MSME credentials, and healthcare career curricula.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/reviews") },
      { property: "og:image", content: absUrl(SITE.ogImage.inauguration) },
    ],
    links: [{ rel: "canonical", href: absUrl("/reviews") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          name: "Arzon Global",
          url: "https://arzoncareers.in",
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.5",
            reviewCount: "447",
            bestRating: "5",
            worstRating: "1",
          },
        }),
      },
    ],
  }),
  component: ReviewsPage,
});

const SOURCE_LOGOS: Record<string, { src: string; alt: string }> = {
  Google: { src: "https://www.google.com/s2/favicons?domain=google.com&sz=128", alt: "Google" },
  Justdial: { src: "https://www.google.com/s2/favicons?domain=justdial.com&sz=128", alt: "Justdial" },
  AmbitionBox: { src: "https://www.google.com/s2/favicons?domain=ambitionbox.com&sz=128", alt: "AmbitionBox" },
  LinkedIn: { src: "https://www.google.com/s2/favicons?domain=linkedin.com&sz=128", alt: "LinkedIn" },
  Instagram: { src: "https://www.google.com/s2/favicons?domain=instagram.com&sz=128", alt: "Instagram" },
  "Arzon Careers": { src: arzonIcon, alt: "Arzon Careers" },
};

function SourceIcon({ source }: { source: string }) {
  const value = source.toLowerCase();
  const key =
    value.includes("google") ? "Google" :
    value.includes("justdial") ? "Justdial" :
    value.includes("ambition") ? "AmbitionBox" :
    value.includes("linkedin") ? "LinkedIn" :
    value.includes("instagram") ? "Instagram" :
    "Arzon Careers";

  const logo = SOURCE_LOGOS[key];
  return (
    <span className="rv3-logo" aria-hidden="true">
      <img src={logo.src} alt="" loading="lazy" decoding="async" />
    </span>
  );
}

function Stars({ rating = 5, size = 14 }: { rating?: number; size?: number }) {
  const safeRating = Math.max(0, Math.min(5, rating));
  return (
    <span
      className="rv3-stars"
      aria-label={`${safeRating} out of 5`}
      style={{ ["--rv3-star-size" as string]: `${size}px` }}
    >
      {Array.from({ length: 5 }).map((_, index) => {
        const fill = Math.max(0, Math.min(1, safeRating - index));
        return (
          <span className="rv3-star" key={index}>
            <Star className="rv3-star-base" aria-hidden="true" />
            {fill > 0 ? (
              <span className="rv3-star-fill" style={{ width: `${fill * 100}%` }}>
                <Star aria-hidden="true" />
              </span>
            ) : null}
          </span>
        );
      })}
    </span>
  );
}

function ReviewCard({ review }: { review: FeedReview }) {
  const label = review.channel === "Arzon" ? "Arzon Careers" : review.channel;

  const initials =
    review.author
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || review.author.charAt(0).toUpperCase();

  const sourceKindBadge =
    review.sourceKind === "first-party"
      ? "Published feedback"
      : review.sourceKind === "public-post"
        ? "Public social post"
        : "Third-party verified";

  const linkBadge =
    review.sourceKind === "first-party"
      ? "Verified Arzon"
      : review.sourceKind === "public-post"
        ? "Verified Post"
        : "Verified Evidence";

  return (
    <article className="rv3-card bg-white tone-light card-light">
      <div className="rv3-card-head">
        <div className="rv3-card-source">
          <SourceIcon source={label} />
          <span>
            <strong>{label}</strong>
            <small>{sourceKindBadge}</small>
          </span>
        </div>
        {review.rating ? <Stars rating={review.rating} size={13} /> : null}
      </div>

      <p className="rv3-quote">“{review.body}”</p>

      <div className="rv3-person">
        {review.avatar ? (
          <img
            src={review.avatar}
            alt={review.author}
            className="rv3-avatar"
            loading="lazy"
            onError={(e) => {
              const img = e.currentTarget;
              img.style.display = "none";
              const next = img.nextElementSibling as HTMLElement | null;
              if (next) next.style.display = "grid";
            }}
          />
        ) : null}
        <span
          className="rv3-avatar"
          style={{ display: review.avatar ? "none" : "grid" }}
          aria-hidden="true"
        >
          {initials}
        </span>
        <span>
          <strong>{review.author}</strong>
          <small>{[review.degree, review.college].filter(Boolean).join(" · ") || review.domain}</small>
        </span>
      </div>

      <div className="rv3-card-footer">
        <span>{review.domain}</span>
        {review.sourceUrl ? (
          <a
            href={review.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline flex items-center gap-1 font-semibold text-[#2563EB]"
            title={`Open original verified review on ${label}`}
          >
            <span>{linkBadge} ↗</span>
          </a>
        ) : (
          <span>{sourceKindBadge}</span>
        )}
      </div>
    </article>
  );
}

function ReviewsPage() {
  // Filter States
  const [source, setSource] = useState<SourceFilter>("All");
  const [category, setCategory] = useState<"All" | ReviewCategory>("All");
  const [paused, setPaused] = useState(false);

  // Modal States
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxMedia, setLightboxMedia] = useState<MediaAsset[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxTitle, setLightboxTitle] = useState("");

  const [certModalOpen, setCertModalOpen] = useState(false);
  const [selectedCert, setSelectedCert] = useState<OfficialCertificate | null>(null);

  const [curriculumModalOpen, setCurriculumModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<TrainingProgram | null>(null);

  // Open Lightbox Helper
  const openGallery = (media: MediaAsset[], startIndex = 0, title = "") => {
    setLightboxMedia(media);
    setLightboxIndex(startIndex);
    setLightboxTitle(title);
    setLightboxOpen(true);
  };

  // Open Certificate Modal Helper
  const openCertModal = (cert?: OfficialCertificate) => {
    setSelectedCert(cert || null);
    setCertModalOpen(true);
  };

  // Open Curriculum Modal Helper
  const openCurriculumModal = (prog: TrainingProgram) => {
    setSelectedProgram(prog);
    setCurriculumModalOpen(true);
  };

  const filteredReviews = useMemo(
    () =>
      FEED_REVIEWS.filter((review) => {
        const categoryMatch = category === "All" || review.domain === category;
        return categoryMatch && (source === "All" || review.channel === source);
      }),
    [source, category]
  );

  // Split activities into groups
  const institutionalActivity = INSTITUTIONAL_ACTIVITIES.find((a) => a.id === "task-inauguration");
  const collegePartnerships = INSTITUTIONAL_ACTIVITIES.filter((a) => a.section === "college-partnerships");
  const industryEvents = INSTITUTIONAL_ACTIVITIES.filter((a) => a.section === "industry-events");
  const companyLaunch = INSTITUTIONAL_ACTIVITIES.find((a) => a.id === "arzon-company-launch");

  return (
    <div className="rv3-page bg-[#F8FAFC]">
      {/* ── 00. Mobile-First Hero & Credibility Anchor ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#081F38] via-[#0d2847] to-[#081F38] text-white pt-10 pb-12 sm:pt-16 sm:pb-20 border-b border-[#2563EB]/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.25),rgba(255,255,255,0))]" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#2563EB]/20 text-[#60A5FA] border border-[#2563EB]/40 mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              ARZON GLOBAL · CREDIBILITY HUB
            </span>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
              Our credibility. <br />
              <span className="text-[#60A5FA]">Trust built through real work.</span>
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Institutional partnerships, industry events, verified feedback and career-focused
              training. Explore our track record across universities, state initiatives, and clinical employers.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="#quick-nav"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-bold shadow-md transition-colors min-h-[44px]"
              >
                <span>Explore our story</span>
                <ChevronDown className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={() => openCertModal()}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/20 text-sm font-bold backdrop-blur-sm transition-colors min-h-[44px]"
              >
                <Award className="w-4 h-4 text-[#60A5FA]" />
                <span>Verify Credentials</span>
              </button>
            </div>

            {/* Credibility Stats Bar */}
            <div className="mt-10 pt-6 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
              <div>
                <strong className="block text-xl sm:text-2xl font-bold text-white">4.5 / 5.0 ★</strong>
                <span className="text-xs text-slate-400">447 Google Reviews</span>
              </div>
              <div>
                <strong className="block text-xl sm:text-2xl font-bold text-[#60A5FA]">TASK Partner</strong>
                <span className="text-xs text-slate-400">State Skill Initiative</span>
              </div>
              <div>
                <strong className="block text-xl sm:text-2xl font-bold text-white">ISO 9001:2015</strong>
                <span className="text-xs text-slate-400">Quality Certified</span>
              </div>
              <div>
                <strong className="block text-xl sm:text-2xl font-bold text-[#10B981]">MSME Govt</strong>
                <span className="text-xs text-slate-400">Recognized Enterprise</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STICKY MOBILE CATEGORY JUMP RAIL ── */}
      <nav
        id="quick-nav"
        aria-label="Credibility sections"
        className="sticky top-0 z-30 bg-white tone-light card-light border-b border-[#E2E8F0] shadow-sm backdrop-blur-md bg-white/95"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 overflow-x-auto py-2.5 scrollbar-none snap-x">
            <a
              href="#institutional"
              className="snap-start shrink-0 px-3 py-1.5 rounded-full text-xs font-bold text-[#081F38] bg-slate-100 hover:bg-[#2563EB] hover:text-white transition-colors"
            >
              🏛️ Institutional
            </a>
            <a
              href="#colleges"
              className="snap-start shrink-0 px-3 py-1.5 rounded-full text-xs font-bold text-[#081F38] bg-slate-100 hover:bg-[#2563EB] hover:text-white transition-colors"
            >
              🎓 College Partnerships
            </a>
            <a
              href="#events"
              className="snap-start shrink-0 px-3 py-1.5 rounded-full text-xs font-bold text-[#081F38] bg-slate-100 hover:bg-[#2563EB] hover:text-white transition-colors"
            >
              🌐 Industry Events
            </a>
            <a
              href="#reviews"
              className="snap-start shrink-0 px-3 py-1.5 rounded-full text-xs font-bold text-[#081F38] bg-slate-100 hover:bg-[#2563EB] hover:text-white transition-colors"
            >
              ⭐ Google Reviews
            </a>
            <a
              href="#certifications"
              className="snap-start shrink-0 px-3 py-1.5 rounded-full text-xs font-bold text-[#081F38] bg-slate-100 hover:bg-[#2563EB] hover:text-white transition-colors"
            >
              📜 Certifications & MSME
            </a>
            <a
              href="#professional-recognition"
              className="snap-start shrink-0 px-3 py-1.5 rounded-full text-xs font-bold text-[#081F38] bg-slate-100 hover:bg-[#2563EB] hover:text-white transition-colors"
            >
              💼 LinkedIn Recognition
            </a>
            <a
              href="#social"
              className="snap-start shrink-0 px-3 py-1.5 rounded-full text-xs font-bold text-[#081F38] bg-slate-100 hover:bg-[#2563EB] hover:text-white transition-colors"
            >
              📱 Social Presence
            </a>
            <a
              href="#launch"
              className="snap-start shrink-0 px-3 py-1.5 rounded-full text-xs font-bold text-[#081F38] bg-slate-100 hover:bg-[#2563EB] hover:text-white transition-colors"
            >
              🚀 Company Launch
            </a>
            <a
              href="#training"
              className="snap-start shrink-0 px-3 py-1.5 rounded-full text-xs font-bold text-[#081F38] bg-slate-100 hover:bg-[#2563EB] hover:text-white transition-colors"
            >
              🩺 Job-Based Training
            </a>
            <a
              href="#curriculum"
              className="snap-start shrink-0 px-3 py-1.5 rounded-full text-xs font-bold text-[#081F38] bg-slate-100 hover:bg-[#2563EB] hover:text-white transition-colors"
            >
              📥 Curricula
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content Sections */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-16 sm:space-y-24">
        {/* ── SECTION 01: INSTITUTIONAL RECOGNITION (TASK Inauguration) ── */}
        {institutionalActivity && (
          <section id="institutional" className="scroll-mt-16">
            <div className="flex items-center gap-2 mb-2">
              <span className="p-1 rounded bg-[#EEF6FF] text-[#2563EB]">
                <Building2 className="w-4 h-4" />
              </span>
              <span className="text-xs font-mono font-bold tracking-wider text-[#2563EB] uppercase">
                Section 01 · Institutional Recognition
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#081F38]">
                  {institutionalActivity.title}
                </h2>
                <p className="text-sm text-[#64748B] mt-1">
                  {institutionalActivity.subtitle} • {institutionalActivity.location}
                </p>
              </div>

              {institutionalActivity.externalUrl && (
                <a
                  href={institutionalActivity.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#2563EB] hover:underline"
                >
                  <span>{institutionalActivity.externalLabel}</span>
                </a>
              )}
            </div>

            {/* Featured Hero Card with Media Gallery */}
            <div className="bg-white tone-light card-light rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
              {/* Media Thumbnails Area */}
              <div className="lg:col-span-7 bg-slate-900 relative group overflow-hidden min-h-[260px] sm:min-h-[360px]">
                <img
                  src={institutionalActivity.media[0].url}
                  alt={institutionalActivity.media[0].caption}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4 sm:p-6 text-white">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-[#2563EB] text-white w-max mb-2">
                    {institutionalActivity.badge}
                  </span>
                  <p className="text-sm font-semibold leading-snug">
                    {institutionalActivity.media[0].caption}
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        openGallery(
                          institutionalActivity.media,
                          0,
                          institutionalActivity.title
                        )
                      }
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-bold backdrop-blur-sm transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Fullscreen Gallery ({institutionalActivity.media.length} items)</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Activity Details & Highlights */}
              <div className="lg:col-span-5 p-5 sm:p-8 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-xs font-semibold text-[#2563EB] uppercase tracking-wide">
                    {institutionalActivity.organization}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-[#081F38] mt-1">
                    Statewide Healthcare Skill Deployment
                  </h3>
                  <p className="text-xs sm:text-sm text-[#64748B] mt-2 leading-relaxed">
                    {institutionalActivity.description}
                  </p>

                  <div className="mt-4 space-y-2">
                    <span className="text-xs font-bold text-[#081F38] block">
                      Program Pillars:
                    </span>
                    {institutionalActivity.keyHighlights.map((hl) => (
                      <div key={hl} className="flex items-start gap-2 text-xs text-[#64748B]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sub-Media strip */}
                <div className="pt-4 border-t border-[#E2E8F0] grid grid-cols-2 gap-2">
                  {institutionalActivity.media.slice(1).map((m, idx) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() =>
                        openGallery(
                          institutionalActivity.media,
                          idx + 1,
                          institutionalActivity.title
                        )
                      }
                      className="relative rounded-lg overflow-hidden border border-[#E2E8F0] group text-left h-20 bg-slate-100"
                    >
                      <img
                        src={m.thumbnailUrl}
                        alt={m.caption}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white">
                        {m.type === "video" ? (
                          <Play className="w-5 h-5 fill-white" />
                        ) : (
                          <Maximize2 className="w-4 h-4" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── SECTION 02: COLLEGE PARTNERSHIPS (Malla Reddy & SRMIST) ── */}
        <section id="colleges" className="scroll-mt-16">
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1 rounded bg-[#EEF6FF] text-[#2563EB]">
              <GraduationCap className="w-4 h-4" />
            </span>
            <span className="text-xs font-mono font-bold tracking-wider text-[#2563EB] uppercase">
              Section 02 · College Partnerships & Campus Visits
            </span>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#081F38]">
              Academic Collaborations & Campus Visits
            </h2>
            <p className="text-sm text-[#64748B] mt-1">
              Engaging final-year B.Pharm, M.Pharm, and Pharm.D candidates through direct campus workshops.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {collegePartnerships.map((college) => (
              <div
                key={college.id}
                className="bg-white tone-light card-light rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Image Reel / Preview */}
                  <div
                    className="relative h-48 sm:h-56 bg-slate-900 cursor-pointer group"
                    onClick={() => openGallery(college.media, 0, college.title)}
                  >
                    <img
                      src={college.media[0].url}
                      alt={college.media[0].caption}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#081F38]/80 text-white backdrop-blur-sm border border-white/20">
                        {college.badge}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex items-end p-4 text-white">
                      <p className="text-xs font-medium leading-snug line-clamp-1">
                        {college.media[0].caption}
                      </p>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between text-xs text-[#64748B] mb-1.5">
                      <span className="font-semibold text-[#2563EB]">{college.organization}</span>
                      <span>{college.location}</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-[#081F38]">
                      {college.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#64748B] mt-2 leading-relaxed">
                      {college.description}
                    </p>

                    <div className="mt-3.5 space-y-1.5">
                      {college.keyHighlights.map((hl) => (
                        <div key={hl} className="flex items-center gap-2 text-xs text-[#64748B]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="px-5 py-3.5 bg-[#F8FAFC] border-t border-[#E2E8F0] flex items-center justify-between text-xs">
                  <button
                    type="button"
                    onClick={() => openGallery(college.media, 0, college.title)}
                    className="font-bold text-[#2563EB] hover:underline inline-flex items-center gap-1"
                  >
                    <span>View Gallery ({college.media.length} Photos)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  {college.externalUrl && (
                    <a
                      href={college.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#64748B] hover:text-[#081F38] inline-flex items-center gap-1"
                    >
                      <span>{college.externalLabel || "Article"}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 03: INDUSTRY EVENTS (Phase Connect Summit) ── */}
        <section id="events" className="scroll-mt-16">
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1 rounded bg-[#EEF6FF] text-[#2563EB]">
              <Calendar className="w-4 h-4" />
            </span>
            <span className="text-xs font-mono font-bold tracking-wider text-[#2563EB] uppercase">
              Section 03 · Industry Events & Healthcare Summits
            </span>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#081F38]">
              Industry Summits & Executive Network
            </h2>
            <p className="text-sm text-[#64748B] mt-1">
              Active participation in national clinical research forums, GCP panels, and talent summits.
            </p>
          </div>

          {industryEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white tone-light card-light rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden p-5 sm:p-7"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-3">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#EEF6FF] text-[#2563EB] border border-[#D0E1FD]">
                    {event.badge}
                  </span>
                  <h3 className="text-xl font-bold text-[#081F38] leading-tight">
                    {event.title}
                  </h3>
                  <p className="text-xs text-[#64748B]">{event.subtitle}</p>
                  <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                    {event.description}
                  </p>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => openGallery(event.media, 0, event.title)}
                      className="px-4 py-2 rounded-full bg-[#081F38] text-white text-xs font-bold hover:bg-[#2563EB] transition-colors"
                    >
                      Open Full Event Gallery
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {event.media.map((item, idx) => (
                    <div
                      key={item.id}
                      onClick={() => openGallery(event.media, idx, event.title)}
                      className="group relative rounded-xl overflow-hidden border border-[#E2E8F0] cursor-pointer bg-slate-900 h-44 sm:h-52"
                    >
                      <img
                        src={item.url}
                        alt={item.caption}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-end p-2.5">
                        <span className="text-[11px] text-white font-medium line-clamp-2 leading-tight">
                          {item.caption}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* ── SECTION 04: CUSTOMER REVIEWS (Google Reviews & Feedback) ── */}
        <section id="reviews" className="scroll-mt-16">
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1 rounded bg-[#EEF6FF] text-[#2563EB]">
              <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
            </span>
            <span className="text-xs font-mono font-bold tracking-wider text-[#2563EB] uppercase">
              Section 04 · Public Reviews & Ratings
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#081F38]">
                Verified Google & Public Feedback
              </h2>
              <p className="text-sm text-[#64748B] mt-1">
                Authentic, traceable reviews from candidates across Hyderabad and national online cohorts.
              </p>
            </div>

            <a
              href={GOOGLE_RATING.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#E2E8F0] bg-white tone-light card-light text-xs font-bold text-[#081F38] hover:border-[#2563EB] transition-colors"
            >
              <img
                src={SOURCE_LOGOS.Google.src}
                alt="Google"
                className="w-3.5 h-3.5"
              />
              <span>Inspect on Google Maps (447 Reviews) ↗</span>
            </a>
          </div>

          {/* Rating Snapshot Banner */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white tone-light card-light border border-[#E2E8F0] shadow-sm mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#EEF6FF] border border-[#D0E1FD] flex items-center justify-center shrink-0">
                <img
                  src={SOURCE_LOGOS.Google.src}
                  alt="Google"
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div>
                <span className="text-xs font-bold text-[#64748B] uppercase tracking-wide">
                  Google Business Profile · Madhapur, Hyderabad
                </span>
                <div className="flex items-center gap-3 mt-1">
                  <strong className="text-3xl font-bold text-[#081F38]">4.5</strong>
                  <div className="flex flex-col">
                    <Stars rating={4.5} size={16} />
                    <span className="text-xs text-[#64748B] mt-0.5">
                      447 verified learner ratings
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {SOURCES.map((s) => (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => setSource(s.key)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                    source === s.key
                      ? "bg-[#2563EB] text-white shadow-sm"
                      : "bg-[#F8FAFC] text-[#64748B] hover:text-[#081F38] border border-[#E2E8F0]"
                  }`}
                >
                  {s.label} ({s.value})
                </button>
              ))}
            </div>
          </div>

          {/* Domain Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none snap-x mb-6">
            <button
              type="button"
              onClick={() => setCategory("All")}
              className={`snap-start shrink-0 px-3 py-1 rounded-full text-xs font-semibold ${
                category === "All"
                  ? "bg-[#081F38] text-white"
                  : "bg-white tone-light card-light border border-[#E2E8F0] text-[#64748B]"
              }`}
            >
              All Topics
            </button>
            {REVIEW_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`snap-start shrink-0 px-3 py-1 rounded-full text-xs font-semibold ${
                  category === cat
                    ? "bg-[#081F38] text-white"
                    : "bg-white tone-light card-light border border-[#E2E8F0] text-[#64748B]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Marquee / Grid of reviews */}
          {filteredReviews.length > 0 ? (
            <div className="rv3-marquee">
              <div className={`rv3-marquee-track ${paused ? "is-paused" : ""}`}>
                <div className="rv3-marquee-set">
                  {filteredReviews.map((rev) => (
                    <ReviewCard key={rev.id} review={rev} />
                  ))}
                </div>
                <div className="rv3-marquee-set" aria-hidden="true">
                  {filteredReviews.map((rev) => (
                    <ReviewCard key={`${rev.id}-clone`} review={rev} />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center bg-white tone-light card-light rounded-2xl border border-dashed border-[#E2E8F0]">
              <p className="text-sm text-[#64748B]">
                No reviews found for the selected filter. Try selecting "All" to view all records.
              </p>
            </div>
          )}
        </section>

        {/* ── SECTION 05: PROFESSIONAL RECOGNITION (LinkedIn Certification Sharing) ── */}
        <section id="professional-recognition" className="scroll-mt-16">
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1 rounded bg-[#EEF6FF] text-[#0A66C2]">
              <Linkedin className="w-4 h-4" />
            </span>
            <span className="text-xs font-mono font-bold tracking-wider text-[#0A66C2] uppercase">
              Section 05 · Professional Recognition
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#081F38]">
                LinkedIn Certification Integration
              </h2>
              <p className="text-sm text-[#64748B] mt-1">
                Alumni and certified candidates add verified credentials directly to their professional LinkedIn profiles.
              </p>
            </div>

            <a
              href="https://www.linkedin.com/company/arzon-global"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0A66C2] text-white text-xs font-bold hover:bg-[#084e96] transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>Follow Arzon on LinkedIn ↗</span>
            </a>
          </div>

          <div className="bg-gradient-to-r from-[#081F38] to-[#123154] rounded-2xl p-6 sm:p-8 text-white shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-8 space-y-3">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#0A66C2] text-white">
                  1-Click LinkedIn Add-to-Profile
                </span>
                <h3 className="text-xl sm:text-2xl font-bold leading-tight">
                  Display Verified Healthcare Competencies to Global Recruiters
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                  Arzon Global certificate holders can link their unique credential IDs directly to LinkedIn.
                  Recruiters can immediately verify syllabus depth, case processing hours, and practical tools mastered.
                </p>

                <div className="pt-2 flex flex-wrap gap-2.5">
                  <a
                    href={buildLinkedInAddUrl({
                      certName: "Pharmacovigilance & Drug Safety Practicum",
                      organizationName: "Arzon Global",
                      issueYear: "2026",
                      issueMonth: "1",
                      certUrl: "https://arzoncareers.in/verify",
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0A66C2] hover:bg-[#084e96] text-white text-xs font-bold shadow-sm transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Add PV Certification to LinkedIn</span>
                  </a>

                  <a
                    href={buildLinkedInAddUrl({
                      certName: "Medical Coding & Clinical Informatics Specialist",
                      organizationName: "Arzon Global",
                      issueYear: "2026",
                      issueMonth: "1",
                      certUrl: "https://arzoncareers.in/verify",
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Add Medical Coding to LinkedIn</span>
                  </a>
                </div>
              </div>

              <div className="md:col-span-4 bg-white/10 border border-white/20 backdrop-blur-md rounded-xl p-4 text-xs space-y-2.5">
                <div className="flex items-center gap-2 text-[#60A5FA] font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Verified Organization Link</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Badged under Arzon Global Private Limited. Instantly shows up under "Licenses & Certifications" on your public profile.
                </p>
                <div className="p-2.5 rounded bg-black/30 font-mono text-[10px] text-slate-300 truncate">
                  Issuer: Arzon Global • ID: ARZ-2026-HC-XXXX
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 06: CERTIFICATIONS (MSME, ISO & Government) ── */}
        <section id="certifications" className="scroll-mt-16">
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1 rounded bg-[#EEF6FF] text-[#2563EB]">
              <ShieldCheck className="w-4 h-4" />
            </span>
            <span className="text-xs font-mono font-bold tracking-wider text-[#2563EB] uppercase">
              Section 06 · Official Certifications & Regulatory Accreditations
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#081F38]">
                Government & Quality Accreditations
              </h2>
              <p className="text-sm text-[#64748B] mt-1">
                Verified registration details under the Ministry of MSME, ISO 9001:2015, and state bodies.
              </p>
            </div>

            <button
              type="button"
              onClick={() => openCertModal()}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold transition-colors"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Verify a Credential ID</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {OFFICIAL_CERTIFICATES.map((cert) => (
              <div
                key={cert.id}
                className="bg-white tone-light card-light rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden flex flex-col justify-between hover:border-[#2563EB] transition-colors"
              >
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#EEF6FF] text-[#2563EB]">
                      {cert.category}
                    </span>
                    <span className="text-xs font-bold text-[#10B981] flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {cert.status}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#081F38]">
                    {cert.title}
                  </h3>

                  <p className="text-xs text-[#64748B] mt-1 font-mono">
                    Reg: {cert.registrationNumber}
                  </p>

                  <p className="text-xs text-[#64748B] mt-2.5 leading-relaxed">
                    {cert.description}
                  </p>
                </div>

                <div className="p-5 pt-0">
                  <button
                    type="button"
                    onClick={() => openCertModal(cert)}
                    className="w-full py-2.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] hover:bg-[#2563EB] hover:text-white text-xs font-bold text-[#081F38] transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Verified Document</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 07: SOCIAL PRESENCE (Instagram & LinkedIn Community) ── */}
        <section id="social" className="scroll-mt-16">
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1 rounded bg-[#EEF6FF] text-[#E1306C]">
              <Instagram className="w-4 h-4" />
            </span>
            <span className="text-xs font-mono font-bold tracking-wider text-[#E1306C] uppercase">
              Section 07 · Social Presence & Community Voices
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#081F38]">
                Instagram & LinkedIn Community
              </h2>
              <p className="text-sm text-[#64748B] mt-1">
                Real moments from our lab sessions, college masterclasses, and alumni milestones.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="https://www.instagram.com/arzoncareers"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#E2E8F0] bg-white tone-light card-light text-xs font-bold text-[#081F38] hover:border-[#E1306C] transition-colors"
              >
                <Instagram className="w-3.5 h-3.5 text-[#E1306C]" />
                <span>Instagram Feed ↗</span>
              </a>
              <a
                href="https://www.linkedin.com/company/arzon-global"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#E2E8F0] bg-white tone-light card-light text-xs font-bold text-[#081F38] hover:border-[#0A66C2] transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5 text-[#0A66C2]" />
                <span>LinkedIn Community ↗</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SOCIAL_POSTS.map((post) => (
              <div
                key={post.id}
                className="bg-white tone-light card-light rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {post.imagePreview && (
                    <div className="h-36 bg-slate-100 overflow-hidden">
                      <img
                        src={post.imagePreview}
                        alt={post.tag}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}

                  <div className="p-4">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="font-bold text-[#081F38] flex items-center gap-1">
                        {post.platform === "LinkedIn" ? (
                          <Linkedin className="w-3.5 h-3.5 text-[#0A66C2]" />
                        ) : (
                          <Instagram className="w-3.5 h-3.5 text-[#E1306C]" />
                        )}
                        {post.platform}
                      </span>
                      <span className="text-[11px] text-[#64748B]">{post.tag}</span>
                    </div>

                    <p className="text-xs text-[#081F38] font-semibold">{post.author}</p>
                    <p className="text-[11px] text-[#64748B]">{post.authorTitle}</p>

                    <p className="mt-2.5 text-xs text-[#64748B] line-clamp-3 leading-relaxed">
                      "{post.postSnippet}"
                    </p>
                  </div>
                </div>

                <div className="px-4 py-2.5 bg-[#F8FAFC] border-t border-[#E2E8F0] flex items-center justify-between text-[11px]">
                  <span className="text-[#64748B]">{post.engagement}</span>
                  <a
                    href={post.postUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#2563EB] hover:underline"
                  >
                    View Post ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 08: COMPANY LAUNCH (Genesis & Vision Video) ── */}
        {companyLaunch && (
          <section id="launch" className="scroll-mt-16">
            <div className="flex items-center gap-2 mb-2">
              <span className="p-1 rounded bg-[#EEF6FF] text-[#2563EB]">
                <Rocket className="w-4 h-4" />
              </span>
              <span className="text-xs font-mono font-bold tracking-wider text-[#2563EB] uppercase">
                Section 08 · Company Launch & Foundation
              </span>
            </div>

            <div className="bg-white tone-light card-light rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden p-6 sm:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#EEF6FF] text-[#2563EB] border border-[#D0E1FD]">
                    {companyLaunch.badge} · {companyLaunch.location}
                  </span>

                  <h2 className="text-2xl sm:text-3xl font-bold text-[#081F38] leading-tight">
                    {companyLaunch.title}
                  </h2>

                  <p className="text-sm font-semibold text-[#2563EB]">
                    {companyLaunch.subtitle}
                  </p>

                  <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                    {companyLaunch.description}
                  </p>

                  <div className="space-y-2 pt-1">
                    {companyLaunch.keyHighlights.map((hl) => (
                      <div key={hl} className="flex items-center gap-2 text-xs text-[#64748B]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => openGallery(companyLaunch.media, 1, companyLaunch.title)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold shadow-sm transition-colors min-h-[44px]"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>Watch Foundation Keynote</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => openGallery(companyLaunch.media, 0, companyLaunch.title)}
                      className="px-4 py-2.5 rounded-full border border-[#E2E8F0] bg-white tone-light card-light hover:bg-[#F8FAFC] text-[#081F38] text-xs font-bold transition-colors min-h-[44px]"
                    >
                      View Launch Gallery
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-5 relative group rounded-xl overflow-hidden border border-[#E2E8F0] bg-slate-900 aspect-video lg:aspect-auto lg:h-72">
                  <img
                    src={companyLaunch.media[0].url}
                    alt={companyLaunch.media[0].caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer"
                    onClick={() => openGallery(companyLaunch.media, 1, companyLaunch.title)}
                  >
                    <div className="w-14 h-14 rounded-full bg-[#2563EB] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 fill-white ml-0.5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── SECTION 09: JOB-BASED TRAINING (Role-Based Programmes) ── */}
        <section id="training" className="scroll-mt-16">
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1 rounded bg-[#EEF6FF] text-[#2563EB]">
              <Briefcase className="w-4 h-4" />
            </span>
            <span className="text-xs font-mono font-bold tracking-wider text-[#2563EB] uppercase">
              Section 09 · Job-Based Training Programmes
            </span>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#081F38]">
              Role-Based Healthcare Specializations
            </h2>
            <p className="text-sm text-[#64748B] mt-1">
              Curricula designed around real job descriptions, live clinical software, and industry regulatory audits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TRAINING_PROGRAMS.map((prog) => (
              <div
                key={prog.id}
                className="bg-white tone-light card-light rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="h-44 bg-slate-900 relative">
                    <img
                      src={prog.bannerImage}
                      alt={prog.roleName}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#081F38]/85 text-white backdrop-blur-sm border border-white/20">
                        {prog.duration}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#081F38] via-transparent to-transparent flex items-end p-4">
                      <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                        {prog.roleName}
                      </h3>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                      {prog.summary}
                    </p>

                    <div>
                      <span className="text-[11px] font-bold text-[#081F38] uppercase block mb-1">
                        Tools Mastered:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {prog.toolsMastered.map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 rounded text-[11px] font-medium bg-[#EEF6FF] text-[#2563EB] border border-[#D0E1FD]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-1 flex items-center justify-between text-xs">
                      <span className="text-[#64748B]">Target: {prog.targetAudience}</span>
                    </div>
                  </div>
                </div>

                <div className="px-5 py-3.5 bg-[#F8FAFC] border-t border-[#E2E8F0] flex items-center justify-between">
                  <span className="text-xs font-bold text-[#10B981]">{prog.salaryRange}</span>
                  <button
                    type="button"
                    onClick={() => openCurriculumModal(prog)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2563EB] hover:underline"
                  >
                    <span>View Curriculum & Download</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 10: CURRICULUM (Downloadable Course Syllabi) ── */}
        <section id="curriculum" className="scroll-mt-16">
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1 rounded bg-[#EEF6FF] text-[#2563EB]">
              <FileDown className="w-4 h-4" />
            </span>
            <span className="text-xs font-mono font-bold tracking-wider text-[#2563EB] uppercase">
              Section 10 · Course Curriculums & Syllabi
            </span>
          </div>

          <div className="bg-white tone-light card-light rounded-2xl border border-[#E2E8F0] p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E2E8F0]">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#081F38]">
                  Download Official 2026 Syllabi PDFs
                </h2>
                <p className="text-xs sm:text-sm text-[#64748B] mt-1">
                  Examine weekly learning schedules, software laboratory sessions, and interview assessment rubrics.
                </p>
              </div>

              <a
                href="/Arzon_2026_Healthcare_Career_Starter_Kit.pdf"
                download
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold shadow-sm transition-colors shrink-0"
              >
                <Download className="w-4 h-4" />
                <span>Download Complete 2026 Starter Kit (PDF)</span>
              </a>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {TRAINING_PROGRAMS.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] flex flex-col justify-between space-y-3"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-mono text-[#2563EB]">{item.duration}</span>
                      <FileText className="w-4 h-4 text-[#64748B]" />
                    </div>
                    <h4 className="text-sm font-bold text-[#081F38] line-clamp-1">
                      {item.roleName}
                    </h4>
                    <p className="text-[11px] text-[#64748B] mt-1">
                      {item.pdfFileSize}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#E2E8F0] flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => openCurriculumModal(item)}
                      className="text-xs font-semibold text-[#081F38] hover:text-[#2563EB]"
                    >
                      Preview Syllabus
                    </button>
                    <a
                      href={item.pdfDownloadUrl}
                      download
                      className="p-1.5 rounded-full bg-white tone-light card-light border border-[#E2E8F0] text-[#2563EB] hover:bg-[#2563EB] hover:text-white transition-colors"
                      title="Download PDF"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CONVERSION CTA ── */}
        <section className="bg-gradient-to-r from-[#081F38] via-[#0d2a4c] to-[#081F38] rounded-2xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial-gradient pointer-events-none opacity-20" />
          <div className="relative z-10 max-w-2xl space-y-3">
            <span className="text-xs font-mono font-bold tracking-widest text-[#60A5FA] uppercase">
              See what we do. Verify what we say.
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold leading-tight">
              Explore Arzon Global's institutional work, programmes and public presence.
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Step into an industry-ready healthcare career with verified training, hands-on software mastery, and authentic institutional credibility.
            </p>
            <div className="pt-3 flex flex-wrap items-center gap-3">
              <Link
                to="/career-engine"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs sm:text-sm font-bold shadow-md transition-colors min-h-[44px]"
              >
                <span>Get My Career Readiness Plan</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                type="button"
                onClick={() => openCertModal()}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/20 text-xs sm:text-sm font-bold backdrop-blur-sm transition-colors min-h-[44px]"
              >
                <ShieldCheck className="w-4 h-4 text-[#60A5FA]" />
                <span>Verify a Credential ID</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* ── MODALS & OVERLAYS ── */}
      <MediaLightboxModal
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        mediaList={lightboxMedia}
        currentIndex={lightboxIndex}
        onSelectIndex={setLightboxIndex}
        contextTitle={lightboxTitle}
      />

      <CertificateVerificationModal
        isOpen={certModalOpen}
        onClose={() => setCertModalOpen(false)}
        selectedCertificate={selectedCert}
      />

      <CurriculumDownloadModal
        isOpen={curriculumModalOpen}
        onClose={() => setCurriculumModalOpen(false)}
        program={selectedProgram}
      />
    </div>
  );
}
