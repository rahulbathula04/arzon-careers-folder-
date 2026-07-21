# SEO contract

This project ships with a single SEO helper, `pageSeo()` in `src/lib/seo.ts`.
Every public, shareable route MUST call it from its `head()` so canonical,
Open Graph, and Twitter tags stay consistent.

## Per-route checklist

- [ ] Route declares its own `head()` with `pageSeo({ path, title, description, image? })`
- [ ] `title` is unique and under 60 characters
- [ ] `description` is unique and under 155 characters
- [ ] If the page has a hero image, pass `image: <url>` so OG/Twitter cards use it
- [ ] If the page is gated, personalised, or transactional, set `noindex: true`
- [ ] Add `breadcrumbSchema(...)` JSON-LD trail to leaf routes
- [ ] Add `courseSchema(...)` JSON-LD on programme/internship pages

## Helpers

```ts
import { pageSeo } from "@/lib/seo";
import { courseSchema, breadcrumbSchema, localBusinessSchema } from "@/lib/jsonLd";

export const Route = createFileRoute("/about")({
  head: () => ({
    ...pageSeo({
      path: "/about",
      title: "About Arzon Global · Project-first internship academy",
      description:
        "Arzon Global builds project-first internships in healthcare, tech and commerce. ISO 9001 certified, MSME and MCA registered.",
    }),
    scripts: [
      {
        type: "application/ld+json",
        children: breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]),
      },
    ],
  }),
  component: AboutPage,
});
```

## Sitemap parity

Every new route must either appear in `STATIC_PATHS` of
`src/routes/sitemap[.]xml.ts` or be allowlisted in
`scripts/check-sitemap-parity.mjs`. Run the check locally:

```sh
node scripts/check-sitemap-parity.mjs
```

This guard runs in CI; missing routes fail the build.

## Submitting the sitemap

After publishing, paste the sitemap URL into:

- Google Search Console → Sitemaps → `https://www.arzonglobal.com/sitemap.xml`
- Bing Webmaster Tools → Sitemaps → same URL

## Asset weight budgets

Keep the tracked project lean. Hard rules:

- **No source PNG/JPG backups in `src/assets/`.** Re-encode to `.webp` at the
  size it actually displays, then delete the original. The old `_originals/`
  backup folder was removed for this reason.
- **Favicon ≤ 20 KB.** Use a real multi-size `.ico` (16/32/48/64 px), not a
  resized JPEG. Rebuild with:
  `magick source.png -resize 256x256 -define icon:auto-resize=16,32,48,64 public/favicon.ico`
- **Hero / loop videos ≤ 500 KB.** Encode with
  `ffmpeg -i in.mp4 -vf "scale='min(1280,iw)':-2" -c:v libx264 -crf 28 -preset slow -movflags +faststart -an out.mp4`.
- **Cloud-hosted long-form videos (e.g. ceremony footage in `media/videos/*`)
  ≤ 6 MB.** Target 480p, 24fps, CRF 30, mono 64k AAC. Encode with
  `ffmpeg -i in.mp4 -vf "scale='min(854,iw)':-2,fps=24" -c:v libx264 -crf 30 -preset slow -pix_fmt yuv420p -c:a aac -b:a 64k -ac 1 -movflags +faststart out.mp4`.
  Always upload a real poster JPG alongside the video so `<video poster>` doesn't 404.
- Image budgets are enforced by `scripts/check-asset-sizes.mjs` at prebuild.
