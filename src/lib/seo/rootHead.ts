import appCss from "../../styles.css?url";
import {
  LINKS,
  SITE,
  absUrl,
  ADDRESS,
  COUNSELLOR_PHONE_DISPLAY,
} from "../../components/landing/constants";
import { GA4_ID, GSC_TOKEN, ga4BootScript } from "../analytics";

export function getRootHead() {
  return {
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Arzon Global · Career Intelligence for Healthcare & Life Sciences" },
      {
        name: "description",
        content:
          "Explore healthcare and life-science careers, role requirements, readiness assessment, practical programmes and career evidence with Arzon Global.",
      },
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
          "Pharmacovigilance, medical coding, clinical data & regulatory affairs internships in India. ISO-aligned, MSME registered, TASK collaborated, verifiable certificates.",
      },
      {
        name: "twitter:description",
        content:
          "Pharmacovigilance, medical coding, clinical data & regulatory affairs internships in India. ISO-aligned, MSME registered, TASK collaborated, verifiable certificates.",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "dns-prefetch", href: "https://fonts.googleapis.com" },
      { rel: "dns-prefetch", href: "https://fonts.gstatic.com" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "preload",
        as: "style",
        href: "https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap",
      } as any,
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap",
      },
      { rel: "dns-prefetch", href: "https://pcikfmhjskbffcnvxmoe.supabase.co" },
      {
        rel: "preconnect",
        href: "https://pcikfmhjskbffcnvxmoe.supabase.co",
        crossOrigin: "anonymous",
      } as any,
      { rel: "dns-prefetch", href: "https://checkout.razorpay.com" },
      { rel: "dns-prefetch", href: "https://api.razorpay.com" },
      { rel: "dns-prefetch", href: "https://www.googletagmanager.com" },
      { rel: "dns-prefetch", href: "https://www.google-analytics.com" },
      { rel: "icon", type: "image/jpeg", href: "/favicon.ico" },
      { rel: "apple-touch-icon", href: "/favicon.ico" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          name: "Arzon Global",
          alternateName: "Arzon Careers",
          legalName: "Arzon Global Labs Private Limited",
          url: SITE.origin,
          logo: absUrl("/og/og-inauguration.jpg"),
          foundingDate: "2024",
          identifier: "CIN: U85500TG2024PTC178942",
          taxID: "UDYAM-TS-02-0145892",
          award: "Inaugurated in collaboration with TASK (Telangana Academy for Skill and Knowledge)",
          hasCredential: {
            "@type": "EducationalOccupationalCredential",
            name: "ISO 9001:2015 Quality Management Certified (QMS/2025/ARZ-092)",
            credentialCategory: "certificate",
            validIn: { "@type": "AdministrativeArea", name: "India" },
          },
          knowsAbout: [
            "Pharmacovigilance",
            "Medical Coding",
            "Clinical Data Management",
            "Clinical SAS Programming",
            "Regulatory Affairs",
            "Medical Writing",
          ],
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
      ...(GA4_ID ? [{ children: ga4BootScript(GA4_ID) }] : []),
      {
        type: "application/speculationrules",
        children: JSON.stringify({
          prefetch: [
            {
              source: "document",
              where: {
                and: [
                  { href_matches: "/*" },
                  { not: { href_matches: "/api/*" } },
                  { not: { href_matches: "/admin*" } },
                  { not: { href_matches: "/_authenticated*" } },
                ],
              },
              eagerness: "moderate",
            },
          ],
          prerender: [
            {
              source: "document",
              where: {
                and: [
                  { href_matches: "/*" },
                  { not: { href_matches: "/api/*" } },
                  { not: { href_matches: "/admin*" } },
                  { not: { href_matches: "/_authenticated*" } },
                  { not: { href_matches: "/*?*" } },
                  { not: { href_matches: "/*.pdf" } },
                ],
              },
              eagerness: "moderate",
            },
          ],
        }),
      },
    ],
  };
}
