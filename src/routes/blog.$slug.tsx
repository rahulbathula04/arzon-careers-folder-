import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Clock, Calendar, ShieldCheck, CheckCircle2, BookOpen, ExternalLink } from "lucide-react";
import { getBlogPostBySlug, BLOG_POSTS } from "@/data/blogPosts";
import { pageSeo } from "@/lib/seo";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const post = getBlogPostBySlug(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData?.post) return {};
    const { post } = loaderData;
    const canonicalUrl = `https://arzoncareers.in/blog/${post.slug}`;
    const imageUrl = `https://arzoncareers.in${post.heroImage}`;

    const ps = pageSeo({
      path: `/blog/${post.slug}`,
      title: `${post.title} · Arzon Global`,
      description: post.metaDescription,
      image: post.heroImage,
      ogType: "article",
    });

    const jsonLdSchema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": canonicalUrl,
      },
      "headline": post.title,
      "description": post.metaDescription,
      "image": [imageUrl],
      "datePublished": post.publishedDate,
      "dateModified": post.updatedDate,
      "author": {
        "@type": "Organization",
        "name": post.author.name,
        "url": "https://arzonglobal.com",
      },
      "publisher": {
        "@type": "Organization",
        "name": "Arzon Global",
        "logo": {
          "@type": "ImageObject",
          "url": "https://arzoncareers.in/assets/arzon-logo.jpg",
        },
      },
      "keywords": post.keywords.join(", "),
    };

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://arzoncareers.in/",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Blog",
          "item": "https://arzoncareers.in/blog",
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": post.title,
          "item": canonicalUrl,
        },
      ],
    };

    return {
      meta: [{ title: `${post.title} · Arzon Global` }, ...ps.meta, { name: "keywords", content: post.keywords.join(", ") }],
      links: ps.links,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(jsonLdSchema),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(breadcrumbSchema),
        },
      ],
    };
  },
  component: BlogPostComponent,
});

function BlogPostComponent() {
  const { post } = Route.useLoaderData();
  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 font-sans selection:bg-[#1B3F8B] selection:text-white pb-24">
      {/* Top Navigation & Breadcrumb Header */}
      <div className="border-b border-stone-200 bg-white tone-light card-light py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 font-mono text-xs font-bold text-stone-700 hover:text-stone-900 uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" /> BACK TO BLOG HUB
          </Link>
          <div className="font-mono text-[10px] text-stone-500 uppercase tracking-widest hidden sm:block">
            ARZON GLOBAL · CAREER DOSSIER #{post.slug.substring(0, 8)}
          </div>
        </div>
      </div>

      {/* Article Hero */}
      <header className="border-b border-stone-200 bg-white tone-light card-light py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="font-mono text-[10px] font-bold text-[#1B3F8B] uppercase tracking-wider border border-stone-300 bg-stone-50 px-2.5 py-1">
              {post.categoryLabel}
            </span>
            <span className="font-mono text-[11px] text-stone-500 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {post.readTime}
            </span>
            <span className="font-mono text-[11px] text-stone-500 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> Published {post.publishedDate}
            </span>
          </div>

          <h1 className="font-serif font-bold text-3xl sm:text-5xl text-stone-900 tracking-tight leading-tight">
            {post.h1}
          </h1>

          <p className="mt-4 text-base sm:text-xl text-stone-700 leading-relaxed font-sans border-l-2 border-[#1B3F8B] pl-4">
            {post.excerpt}
          </p>

          <div className="mt-8 pt-6 border-t border-stone-200 flex items-center justify-between text-xs font-mono text-stone-600">
            <div>
              <span className="text-stone-500">AUTHOR: </span>
              <strong className="text-stone-900">{post.author.name}</strong> ({post.author.role})
            </div>
            <div className="hidden sm:block">
              <span className="text-stone-500">LAST AUDITED: </span>
              <strong>{post.updatedDate}</strong>
            </div>
          </div>
        </div>
      </header>

      {/* Main Body with Table of Contents Sidebar */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Article Content Column */}
          <article className="lg:col-span-8 space-y-10">
            {/* Hero Image */}
            <div className="bg-white tone-light card-light border border-stone-300 p-2 overflow-hidden">
              <img
                src={post.heroImage}
                alt={post.heroImageAlt}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/assets/thumbs/pharmacovigilance.webp";
                }}
                className="w-full h-auto object-cover max-h-[400px] border border-stone-200"
              />
            </div>

            {/* Executive Takeaways Dossier Box */}
            <div className="bg-stone-900 text-white p-6 sm:p-8 border border-stone-800 space-y-4">
              <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                <span className="font-mono text-[10px] font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> EXECUTIVE SUMMARY & OPERATIONAL TAKEAWAYS
                </span>
                <span className="font-mono text-[9px] text-stone-400">ARZON DOSSIER</span>
              </div>
              <ul className="space-y-3">
                {post.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="font-sans text-xs sm:text-sm text-stone-200 leading-relaxed">
                      {takeaway}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Article Sections */}
            {post.sections.map((sec) => (
              <section key={sec.id} id={sec.id} className="space-y-4 scroll-mt-20">
                <h2 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900 border-b border-stone-300 pb-2">
                  {sec.title}
                </h2>

                <div className="prose prose-stone max-w-none text-stone-800 font-sans text-sm sm:text-base leading-relaxed whitespace-pre-line">
                  {sec.content}
                </div>

                {sec.callout && (
                  <div
                    className={`p-5 border text-xs sm:text-sm my-6 ${
                      sec.callout.type === "warning"
                        ? "bg-amber-50 text-amber-900 border-amber-300"
                        : sec.callout.type === "tip"
                        ? "bg-emerald-50 text-emerald-900 border-emerald-300"
                        : "bg-blue-50 text-blue-900 border-blue-300"
                    }`}
                  >
                    <div className="font-mono text-[11px] font-bold uppercase tracking-wider mb-1">
                      {sec.callout.title}
                    </div>
                    <p className="font-sans leading-relaxed">{sec.callout.text}</p>
                  </div>
                )}
              </section>
            ))}

            {/* Related Course Conversion Card */}
            <div className="bg-white tone-light card-light border-2 border-[#0B1325] p-6 sm:p-8 space-y-4 my-12">
              <span className="font-mono text-[10px] font-bold text-[#1B3F8B] uppercase tracking-widest">
                VERIFIED COHORT PROGRAMME
              </span>
              <h3 className="font-serif font-bold text-2xl text-stone-900">
                Master {post.relatedCourseName} at Arzon Global
              </h3>
              <p className="font-sans text-xs sm:text-sm text-stone-700 leading-relaxed">
                Build audit-ready proof-of-work in software tools (Oracle Argus, ICD-10-CM, Medidata Rave, eCTD, SAS) with 12 weeks of structured cohort training and cryptographic certificate verification.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to="/courses/$slug"
                  params={{ slug: post.relatedCourseSlug }}
                  className="bg-[#0B1325] text-white hover:bg-[#1B3F8B] px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2"
                >
                  VIEW COURSE CURRICULUM <ExternalLink className="w-3.5 h-3.5" />
                </Link>
                <Link
                  to="/career-engine/start"
                  className="border border-stone-300 bg-white tone-light hover:bg-stone-100 text-stone-900 px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider"
                >
                  TEST YOUR FIT ENGINE MATCH
                </Link>
              </div>
            </div>
          </article>

          {/* Sticky Sidebar Column */}
          <aside className="lg:col-span-4 space-y-8">
            {/* Table of Contents */}
            <div className="sticky top-8 bg-white tone-light card-light border border-stone-300 p-6 shadow-xs">
              <div className="font-mono text-[10px] font-bold text-stone-500 uppercase tracking-widest border-b border-stone-200 pb-2 mb-4 flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5 text-[#1B3F8B]" /> TABLE OF CONTENTS
              </div>
              <nav className="space-y-2">
                {post.tableOfContents.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block font-sans text-xs text-stone-700 hover:text-[#1B3F8B] hover:translate-x-0.5 transition-all py-1"
                  >
                    {item.title}
                  </a>
                ))}
              </nav>

              <div className="mt-8 pt-6 border-t border-stone-200 space-y-4">
                <div className="font-mono text-[10px] font-bold text-stone-500 uppercase tracking-widest">
                  AUTHORITATIVE VERIFICATION
                </div>
                <p className="font-sans text-xs text-stone-600 leading-normal">
                  All Arzon course completion certificates feature SHA-256 cryptographic verification for employer audits.
                </p>
                <Link
                  to="/verify"
                  className="inline-block font-mono text-xs font-bold text-[#1B3F8B] hover:underline uppercase tracking-wider"
                >
                  VERIFY CERTIFICATE LEDGER →
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {/* Related Articles Section */}
        <section className="mt-20 pt-12 border-t border-stone-300">
          <h3 className="font-serif font-bold text-2xl text-stone-900 mb-6">
            Related Healthcare Career Intelligence
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((rel) => (
              <div
                key={rel.slug}
                className="bg-white tone-light card-light border border-stone-300 p-5 flex flex-col justify-between hover:border-[#1B3F8B] transition-colors"
              >
                <div>
                  <span className="font-mono text-[10px] font-bold text-[#1B3F8B] uppercase tracking-wider">
                    {rel.categoryLabel}
                  </span>
                  <Link
                    to="/blog/$slug"
                    params={{ slug: rel.slug }}
                    className="group"
                  >
                    <h4 className="font-serif font-bold text-base text-stone-900 group-hover:text-[#1B3F8B] mt-2 leading-snug line-clamp-2">
                      {rel.title}
                    </h4>
                  </Link>
                  <p className="font-sans text-xs text-stone-600 mt-2 line-clamp-2">
                    {rel.excerpt}
                  </p>
                </div>
                <Link
                  to="/blog/$slug"
                  params={{ slug: rel.slug }}
                  className="mt-4 font-mono text-[11px] font-bold text-stone-900 uppercase tracking-wider inline-flex items-center gap-1 hover:text-[#1B3F8B]"
                >
                  READ DOSSIER →
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
