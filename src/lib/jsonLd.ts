import { SITE, absUrl, NEXT_COHORT, SEAT_FEE } from "@/components/landing/constants";

/** Builds Course schema JSON-LD for an internship/course landing page. */
export function courseSchema(input: {
  name: string;
  description: string;
  path: string;
  image?: string;
  occupationalCategory?: string;
  timeRequired?: string;
}): string {
  const { name, description, path, image, occupationalCategory, timeRequired } = input;
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": ["Course", "EducationalOccupationalProgram"],
    name,
    description,
    provider: {
      "@type": "Organization",
      name: "Arzon Global",
      url: SITE.origin,
      sameAs: SITE.origin,
      logo: absUrl(SITE.ogImage.inauguration),
    },
    url: absUrl(path),
    inLanguage: "en-IN",
    image: image ? absUrl(image) : absUrl(SITE.ogImage.inauguration),
    educationalCredentialAwarded: "Arzon Global Internship Certificate + Letter of Recommendation",
    ...(occupationalCategory ? { occupationalCategory } : {}),
    ...(timeRequired ? { timeRequired } : {}),
    offers: {
      "@type": "Offer",
      category: "Paid",
      priceCurrency: "INR",
      price: SEAT_FEE.replace(/[^\d.]/g, ""),
      availability: "https://schema.org/InStock",
      url: absUrl(path),
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "Blended",
      courseWorkload: "PT12W",
      location: {
        "@type": "Place",
        name: "Online + Hyderabad",
        address: { "@type": "PostalAddress", addressCountry: "IN" },
      },
      startDate: NEXT_COHORT.startsISO,
    },
  });
}

/** Builds a BreadcrumbList JSON-LD trail. */
export function breadcrumbSchema(trail: Array<{ name: string; path: string }>): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((node, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: node.name,
      item: absUrl(node.path),
    })),
  });
}

/** Local business schema — used on /contact and /about. */
export function localBusinessSchema(input: {
  name?: string;
  telephone: string;
  email?: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
}): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: input.name ?? "Arzon Global",
    url: SITE.origin,
    telephone: input.telephone,
    email: input.email,
    address: { "@type": "PostalAddress", ...input.address },
    areaServed: "IN",
  });
}

/** FAQPage JSON-LD. Use on landing pages with a real FAQ section. */
export function faqSchema(faqs: Array<{ q: string; a: string }>): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  });
}

/** ItemList JSON-LD — used on hub pages that list programmes/courses. */
export function itemListSchema(input: {
  name: string;
  items: Array<{ name: string; path: string; description?: string }>;
}): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: input.name,
    itemListElement: input.items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      url: absUrl(item.path),
      ...(item.description ? { description: item.description } : {}),
    })),
  });
}

/**
 * Review + optional AggregateRating JSON-LD attached to the Organization.
 * Pass real reviews only — Google flags fabricated ratings.
 */
export function organizationReviewsSchema(input: {
  reviews: Array<{ author: string; rating: number; body: string; datePublished?: string }>;
  aggregate?: { ratingValue: number; reviewCount: number };
}): string {
  const base: any = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Arzon Global",
    url: SITE.origin,
    review: input.reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.author },
      reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
      reviewBody: r.body,
      ...(r.datePublished ? { datePublished: r.datePublished } : {}),
    })),
  };
  if (input.aggregate) {
    base.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: input.aggregate.ratingValue,
      reviewCount: input.aggregate.reviewCount,
      bestRating: 5,
    };
  }
  return JSON.stringify(base);
}

/** VideoObject JSON-LD helper. */
export function videoSchema(input: {
  name: string;
  description: string;
  thumbnailUrl: string | string[];
  uploadDateISO: string;
  durationISO: string; // e.g. "PT2M30S"
  contentUrl: string;
  embedUrl?: string;
}): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: input.name,
    description: input.description,
    thumbnailUrl: input.thumbnailUrl,
    uploadDate: input.uploadDateISO,
    duration: input.durationISO,
    contentUrl: input.contentUrl,
    embedUrl: input.embedUrl ?? input.contentUrl,
    publisher: { "@type": "Organization", name: "Arzon Global", url: SITE.origin },
  });
}
