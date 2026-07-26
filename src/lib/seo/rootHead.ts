import appCss from "../../styles.css?url";
import {
  LINKS,
  SITE,
  absUrl,
  ADDRESS,
  COUNSELLOR_PHONE_DISPLAY,
} from "../../components/landing/constants";
import { GA4_ID, GSC_TOKEN, ga4BootScript } from "../analytics";
import { organizationReviewsSchema } from "../jsonLd";
import { REVIEWS, AGGREGATE_RATING } from "../../data/reviews";
import { KEYWORD_BANK_TERMS } from "../../data/keywordBank";

export function getRootHead() {
  return {
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Arzon Global · PV, Medical Coding & CDM Internships" },
      {
        name: "description",
        content:
          "Pharmacovigilance, medical coding, clinical data & regulatory affairs internships in India. ISO-aligned, MSME & MCA registered, verifiable certificates.",
      },
      { name: "keywords", content: KEYWORD_BANK_TERMS.join(", ") },
      { name: "author", content: "Arzon Global" },
      { property: "og:site_name", content: "Arzon Global" },
      { property: "og:locale", content: "en_IN" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@arzonglobal" },
      { name: "theme-color", content: "#0A0F1E" },
      { name: "apple-mobile-web-app-title", content: "Arzon Global" },
      { name: "application-name", content: "Arzon Global" },
      { name: "format-detection", content: "telephone=no" },
      {
        name: "google-site-verification",
        content: import.meta.env.VITE_GSC_VERIFICATION || GSC_TOKEN || "",
      },
      {
        property: "og:image",
        content:
          "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/b608b14a-fd99-4ff6-83b7-5054418300eb",
      },
      {
        name: "twitter:image",
        content:
          "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/b608b14a-fd99-4ff6-83b7-5054418300eb",
      },
      { property: "og:title", content: "Arzon Global · PV, Medical Coding & CDM Internships" },
      { name: "twitter:title", content: "Arzon Global · PV, Medical Coding & CDM Internships" },
      {
        property: "og:description",
        content:
          "Pharmacovigilance, medical coding, clinical data & regulatory affairs internships in India. ISO-aligned, MSME & MCA registered, verifiable certificates.",
      },
      {
        name: "twitter:description",
        content:
          "Pharmacovigilance, medical coding, clinical data & regulatory affairs internships in India. ISO-aligned, MSME & MCA registered, verifiable certificates.",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,600;1,700&family=Playfair+Display:ital,wght@0,600;0,700;0,800;0,900;1,600;1,700;1,800&family=Outfit:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@500;600;700&display=swap",
      },
      {
        rel: "preload",
        as: "style",
        href: "https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500&display=swap",
      } as any,
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500&display=swap",
        media: "print",
      } as any,
      { rel: "dns-prefetch", href: "https://grcmczxdcssroeljrygv.supabase.co" },
      {
        rel: "preconnect",
        href: "https://grcmczxdcssroeljrygv.supabase.co",
        crossOrigin: "anonymous",
      } as any,
      { rel: "icon", type: "image/jpeg", href: "/favicon.ico" },
      { rel: "apple-touch-icon", href: "/favicon.ico" },
    ],
    scripts: [
      {
        children: `(function(){try{var ls=document.querySelectorAll('link[rel="stylesheet"][media="print"]');ls.forEach(function(l){if(l.sheet){l.media="all";}else{l.addEventListener("load",function(){l.media="all";},{once:true});}});}catch(e){}})();`,
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          name: "Arzon Global",
          legalName: "Arzon Global Labs Pvt Ltd",
          url: SITE.origin,
          logo: absUrl("/og/og-inauguration.jpg"),
          foundingDate: "2024",
          email: "info@arzonglobal.com",
          telephone: COUNSELLOR_PHONE_DISPLAY,
          address: {
            "@type": "PostalAddress",
            streetAddress: `${ADDRESS.street}, ${ADDRESS.area}`,
            addressLocality: `${ADDRESS.locality}, ${ADDRESS.city}`,
            addressRegion: ADDRESS.region,
            postalCode: ADDRESS.postalCode,
            addressCountry: ADDRESS.countryCode,
          },
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "customer support",
            telephone: COUNSELLOR_PHONE_DISPLAY,
            email: "info@arzonglobal.com",
            areaServed: "IN",
            availableLanguage: ["en", "hi", "te"],
          },
          sameAs: [LINKS.linkedin, LINKS.instagram, LINKS.website, LINKS.mediaETV.outletUrl],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Arzon Global",
          alternateName: "Arzon",
          url: SITE.origin,
          inLanguage: "en-IN",
          publisher: { "@type": "Organization", name: "Arzon Global", url: SITE.origin },
          potentialAction: {
            "@type": "SearchAction",
            target: `${SITE.origin}/courses?q={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        }),
      },
      ...(REVIEWS.length > 0
        ? [
            {
              type: "application/ld+json",
              children: organizationReviewsSchema({
                reviews: REVIEWS,
                aggregate: AGGREGATE_RATING,
              }),
            },
          ]
        : []),
      ...(GA4_ID ? [{ children: ga4BootScript(GA4_ID) }] : []),
      {
        type: "application/speculationrules",
        children: JSON.stringify({
          prerender: [
            {
              source: "document",
              where: {
                and: [
                  { href_matches: "/*" },
                  { not: { href_matches: "/api/*" } },
                  { not: { href_matches: "/admin*" } },
                  { not: { href_matches: "/*?*" } },
                ],
              },
              eagerness: "conservative",
            },
          ],
        }),
      },
    ],
  };
}
