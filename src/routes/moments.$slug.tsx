import { useEffect, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Calendar, MapPin, ArrowLeft, X, ImageOff } from "lucide-react";
import { Footer } from "@/components/landing/Footer";
import { getMomentBySlug } from "@/lib/moments.functions";
import type { MomentDetail, MomentImage } from "@/lib/moments.types";
import { pageSeo } from "@/lib/seo";

export const Route = createFileRoute("/moments/$slug")({
  loader: async ({ params }) => {
    const res = await getMomentBySlug({ data: { slug: params.slug } });
    if (!res.moment) throw notFound();
    return { moment: res.moment };
  },
  head: ({ loaderData }) => {
    const m = loaderData?.moment;
    if (!m) return { meta: [{ title: "Moment not found · Arzon" }] };
    const ps = pageSeo({
      path: `/moments/${m.slug}`,
      title: `${m.title} · Arzon Moments`,
      description: m.subtitle || m.body.slice(0, 160) || `Arzon Global moment on ${m.event_date}.`,
      image: m.cover_url ?? undefined,
    });
    return { meta: [{ title: `${m.title} · Arzon Moments` }, ...ps.meta], links: ps.links };
  },
  component: MomentDetailPage,
  pendingComponent: () => (
    <div className="min-h-screen bg-[oklch(0.14_0.04_245)] animate-pulse px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <div className="h-10 w-3/4 rounded-xl bg-white/10" />
        <div className="mt-8 h-96 w-full rounded-2xl bg-white/10" />
        <div className="mt-8 space-y-4">
          <div className="h-4 w-full rounded bg-white/10" />
          <div className="h-4 w-full rounded bg-white/10" />
          <div className="h-4 w-5/6 rounded bg-white/10" />
        </div>
      </div>
    </div>
  ),
  notFoundComponent: () => (
    <FallbackState message="That moment doesn't exist or hasn't been published." />
  ),
  errorComponent: ({ error }) => (
    <FallbackState message={error?.message ?? "Could not load this moment."} />
  ),
});

function FallbackState({ message }: { message: string }) {
  return (
    <div className="tone-dark min-h-screen bg-[oklch(0.14_0.04_245)] text-white">
      <div className="mx-auto max-w-3xl px-5 py-24 text-center">
        <ImageOff className="mx-auto mb-3 h-10 w-10 text-white/50" />
        <h1 className="h-display">Arzon moment</h1>
        <p className="mt-3 text-sm text-white/70">{message}</p>
        <Link
          to="/moments"
          className="mt-6 inline-flex items-center gap-2 text-sm text-sky-300 underline"
        >
          <ArrowLeft className="h-4 w-4" /> Back to all moments
        </Link>
      </div>
      <Footer />
    </div>
  );
}

function MomentDetailPage() {
  const { moment } = Route.useLoaderData();
  const m = moment as MomentDetail;
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight")
        setLightbox((i) => (i === null ? null : Math.min(m.images.length - 1, i + 1)));
      if (e.key === "ArrowLeft") setLightbox((i) => (i === null ? null : Math.max(0, i - 1)));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, m.images.length]);

  return (
    <div className="tone-dark min-h-screen bg-[oklch(0.14_0.04_245)] text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto max-w-5xl px-5 py-10">
          <Link
            to="/moments"
            className="inline-flex items-center gap-1.5 text-xs text-white/60 hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Arzon Moments
          </Link>
          <p className="mt-6 font-mono text-micro font-bold uppercase tracking-[0.22em] text-sky-300">
            {m.category}
          </p>
          <h1 className="h-display mt-2 text-h1">{m.title}</h1>
          {m.subtitle ? <p className="mt-3 text-base text-white/80">{m.subtitle}</p> : null}
          <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-white/60">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4" /> {formatDate(m.event_date)}
            </span>
            {m.location ? (
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4" /> {m.location}
              </span>
            ) : null}
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-10">
        {m.body ? (
          <div className="prose prose-invert mb-10 max-w-3xl whitespace-pre-wrap text-white/85">
            {m.body}
          </div>
        ) : null}

        {m.images.length === 0 ? (
          <p className="text-sm text-white/55">Photos will be added here soon.</p>
        ) : (
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {m.images.map((img, i) => (
              <li key={img.id}>
                <button
                  type="button"
                  onClick={() => setLightbox(i)}
                  className="block w-full overflow-hidden rounded-xl border border-white/10 bg-[#0a0c10]/40 backdrop-blur-md shadow-xl ring-1 ring-black/20"
                >
                  <img
                    src={img.url}
                    alt={img.alt || m.title}
                    className="aspect-square w-full object-cover transition hover:scale-[1.02]"
                    loading="lazy"
                  />
                </button>
              </li>
            ))}
          </ul>
        )}
      </main>

      <Footer />

      {lightbox !== null ? (
        <Lightbox image={m.images[lightbox]} onClose={() => setLightbox(null)} />
      ) : null}
    </div>
  );
}

function Lightbox({ image, onClose }: { image: MomentImage; onClose: () => void }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0c10]/90 p-4"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 rounded-full border border-white/20 bg-white/10 p-2 text-white"
        aria-label="Close"
      >
        <X className="h-5 w-5" />
      </button>
      <figure className="max-h-full max-w-full" onClick={(e) => e.stopPropagation()}>
        <img
          src={image.url}
          alt={image.alt}
          className="max-h-[85vh] max-w-full rounded-lg object-contain"
        />
        {image.caption ? (
          <figcaption className="mx-auto mt-3 max-w-2xl text-center text-sm text-white/80">
            {image.caption}
          </figcaption>
        ) : null}
      </figure>
    </div>
  );
}

function formatDate(iso: string): string {
  try {
    return new Date(iso + "T00:00:00").toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}
