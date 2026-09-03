import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Share2, Copy, Check, MessageCircle, Linkedin, Twitter, Gift } from "lucide-react";
import { createShareCard } from "@/lib/shareCard.functions";
import { ResultCard } from "@/components/career/cards/primitives";

/**
 * Viral share rail - Duolingo "invite a friend" feel: white card, big gift
 * eyebrow, copy URL pill, three brand-colored social pills below.
 */

interface Props {
  archetype: string;
  archetypeName: string;
  topTrackSlug: string;
  topTrackTitle: string;
  acriOverall: number;
  bandLabel: string;
}

export function ShareResult({
  archetype,
  archetypeName,
  topTrackSlug,
  topTrackTitle,
  acriOverall,
  bandLabel,
}: Props) {
  const create = useServerFn(createShareCard);
  const [slug, setSlug] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const minted = useRef(false);

  useEffect(() => {
    if (minted.current || typeof window === "undefined") return;
    minted.current = true;
    const cacheKey = `arz_share_${archetype}_${acriOverall}`;
    const cached = window.localStorage.getItem(cacheKey);
    if (cached) {
      setSlug(cached);
      return;
    }
    create({
      data: { archetype, archetypeName, topTrackSlug, topTrackTitle, acriOverall, bandLabel },
    })
      .then((res) => {
        if (res?.slug) {
          window.localStorage.setItem(cacheKey, res.slug);
          setSlug(res.slug);
        }
      })
      .catch(() => undefined);
  }, [archetype, archetypeName, topTrackSlug, topTrackTitle, acriOverall, bandLabel, create]);

  const url = slug
    ? `${typeof window !== "undefined" ? window.location.origin : "https://www.arzonglobal.com"}/r/${slug}`
    : "";
  const msg = `I scored ${acriOverall} ACRI on Arzon Global. My top fit: ${topTrackTitle}. Try the 4-min test →`;

  const copy = () => {
    if (!url) return;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1400);
      })
      .catch(() => undefined);
  };

  if (!slug) {
    return (
      <ResultCard
        tone="primary"
        icon={<Share2 className="h-3.5 w-3.5" />}
        eyebrow="Generating your share card…"
      >
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
          <div className="h-full w-1/3 motion-safe:animate-pulse rounded-full bg-primary" />
        </div>
      </ResultCard>
    );
  }

  return (
    <ResultCard
      tone="fuchsia"
      icon={<Gift className="h-3.5 w-3.5" />}
      eyebrow="Refer · earn ₹500"
      title="Challenge a friend, both of you save ₹500"
    >
      <p className="text-caption text-slate-600">
        Your card is live. Share it - when a friend takes the test from your link, you both earn
        ₹500 off the cohort fee.
      </p>

      <div className="mt-4 flex items-center gap-2 rounded-2xl bg-slate-50 px-3 py-2 ring-1 ring-slate-200">
        <span className="truncate font-mono text-meta text-slate-700">{url}</span>
        <button
          onClick={copy}
          className="ml-auto inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-micro font-bold text-slate-900 ring-1 ring-slate-300 transition hover:ring-primary motion-reduce:transition-none"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-accent-sky-deep" /> Copied
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" /> Copy
            </>
          )}
        </button>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2">
        <a
          href={`https://wa.me/?text=${encodeURIComponent(`${msg} ${url}`)}`}
          target="_blank" rel="noopener noreferrer"
          onClick={() => {
            try {
              // Inline import to avoid pulling tracking into bundles that don't share
              import("@/lib/track").then(({ track }) =>
                track("whatsapp_click", { props: { source: "share_result" } }),
              );
            } catch {
              /* noop */
            }
          }}
          className="inline-flex items-center justify-center gap-1.5 rounded-full bg-accent-sky-deep px-3 py-2.5 text-meta font-bold text-white shadow-sm transition hover:brightness-110 motion-reduce:transition-none"
        >
          <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
          target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#0A66C2] px-3 py-2.5 text-meta font-bold text-white shadow-sm transition hover:brightness-110 motion-reduce:transition-none"
        >
          <Linkedin className="h-3.5 w-3.5" /> LinkedIn
        </a>
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(msg)}&url=${encodeURIComponent(url)}`}
          target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 rounded-full bg-slate-900 px-3 py-2.5 text-meta font-bold text-white shadow-sm transition hover:brightness-110 motion-reduce:transition-none"
        >
          <Twitter className="h-3.5 w-3.5" /> X
        </a>
      </div>
    </ResultCard>
  );
}
