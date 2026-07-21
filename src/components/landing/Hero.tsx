import { Link, useRouter } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { ArrowRight, Landmark, ShieldCheck, BadgeCheck, Tv, Loader2 } from "lucide-react";
import { LINKS } from "./constants";
import { trackEvent } from "@/lib/analytics";
import { markReadinessStarted, getReadinessSessionId } from "@/lib/readinessJourney";
import taskAsset from "@/assets/proof/task-partnership.png.asset.json";
const taskImg = taskAsset.url;

/**
 * Hero — curriculum dark UI system (Jun 2026 rebuild, "Asymmetric + live status card").
 * Locked palette: navy #06080d, sky-300 accent, brand gold CTA, white/10 chrome.
 * Left: eyebrow chip → headline → body → CTA pair.
 * Right: factual "Next intake" card — no fabricated counters, no fake live pills.
 * Bottom: thin proof rail (JD source line + employer wordmarks).
 */
export function Hero() {
  const [ctaPending, setCtaPending] = useState(false);
  const ctaLockRef = useRef<number>(0);
  const router = useRouter();

  const onPrimaryCta = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const now = Date.now();
    if (ctaPending || now - ctaLockRef.current < 1500) {
      e.preventDefault();
      return;
    }
    ctaLockRef.current = now;
    setCtaPending(true);
    // Mint session id + mark "started" in the journey table. Fire-and-forget.
    void markReadinessStarted();
    trackEvent("hero_primary_cta_click", {
      surface: "home-hero",
      target: "career-engine-test",
    });
    trackEvent("readiness_cta_click", {
      surface: "home-hero",
      session_id: getReadinessSessionId(),
    });
    // Re-enable after navigation settles or after a short timeout fallback.
    const unsub = router.subscribe("onResolved", () => {
      setCtaPending(false);
      unsub();
    });
    window.setTimeout(() => setCtaPending(false), 4000);
  };

  const trustChips: { icon: typeof Landmark; label: string }[] = [
    { icon: Landmark, label: "TASK · Govt of Telangana" },
    { icon: ShieldCheck, label: "ISO 9001" },
    { icon: BadgeCheck, label: "MCA Registered" },
  ];
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="tone-dark relative isolate overflow-hidden bg-[#06080d] text-slate-50"
    >
      {/* Radial sky wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[640px]"
        style={{
          background: "radial-gradient(60% 60% at 50% 0%, rgba(125,211,252,0.16), transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 pb-20 pt-12 sm:px-6 sm:pb-24 sm:pt-16 lg:grid-cols-12 lg:gap-16 lg:px-8 lg:pb-28 lg:pt-24">
        {/* Left — content */}
        <div className="lg:col-span-7">
          {/* Trust chip row */}
          <ul className="flex flex-wrap gap-2">
            {trustChips.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200/15 bg-white/[0.04] px-3 py-1.5 font-mono text-micro uppercase tracking-[0.18em] text-slate-100/80"
              >
                <Icon aria-hidden className="h-3.5 w-3.5 text-eyebrow/80" />
                <span>{label}</span>
                <span aria-hidden className="text-eyebrow">
                  ✓
                </span>
              </li>
            ))}
          </ul>

          <h1
            id="hero-heading"
            className="mt-7 text-slate-50"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              letterSpacing: "-0.025em",
              fontSize: "clamp(2rem, 5vw, 4.25rem)",
              lineHeight: 1.05,
              textWrap: "balance" as any,
              overflowWrap: "anywhere",
              hyphens: "auto",
            }}
          >
            Become{" "}
            <span
              className="text-[color:var(--brand-gold,#d4b76a)] italic"
              style={{ fontFamily: "var(--font-serif, var(--font-display))" }}
            >
              industry ready
            </span>{" "}
            for India&rsquo;s next decade.
          </h1>

          <p
            className="mt-6 max-w-xl text-slate-100/80"
            style={{
              fontSize: "clamp(1rem, 1.4vw, 1.125rem)",
              lineHeight: 1.6,
              textWrap: "pretty" as any,
            }}
          >
            Land your first industry role in{" "}
            <strong className="font-semibold text-slate-50">12 weeks</strong>. Take the free
            3-minute test to see which programme fits you.
          </p>

          <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <Link
              to="/career-engine/start"
              className="btn btn-gold btn-xl btn-glow-pulse btn-block btn-block-sm-auto focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-focus-accent aria-disabled:cursor-wait aria-disabled:opacity-80"
              aria-label="Take the 3-minute Arzon readiness assessment"
              data-testid="hero-primary-cta"
              onClick={onPrimaryCta}
              aria-disabled={ctaPending || undefined}
              tabIndex={ctaPending ? -1 : undefined}
              aria-busy={ctaPending || undefined}
            >
              <span>{ctaPending ? "Opening…" : "Get my industry-fit score"}</span>
              <span data-arrow aria-hidden>
                {ctaPending ? (
                  <Loader2
                    focusable="false"
                    className="h-5 w-5 motion-safe:animate-spin"
                    strokeWidth={2.5}
                  />
                ) : (
                  <ArrowRight focusable="false" className="h-5 w-5" strokeWidth={2.5} />
                )}
              </span>
            </Link>
          </div>

          <p className="mt-4 font-mono text-micro font-medium uppercase tracking-[0.16em] text-slate-100/60">
            3 min · free · no login · instant score
          </p>
        </div>

        {/* Right — TASK launch proof card */}
        <aside className="lg:col-span-5" aria-label="Public launch event with TASK officials">
          <figure className="relative overflow-hidden rounded-2xl border border-slate-200/10 bg-white/[0.03] shadow-2xl">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
              <img
                src={taskImg}
                alt="Photo triptych from the Arzon Global public launch on 30 July 2025 in Hyderabad — TASK officials (Telangana Academy for Skill and Knowledge) attending as chief guests, presenting mementos to the Arzon founding team."
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="h-full w-full object-cover opacity-95"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#06080d] via-[#06080d]/30 to-transparent"
              />
              <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-accent-glow/30 bg-black/60 px-2.5 py-1 font-mono text-micro uppercase tracking-[0.18em] text-eyebrow-strong backdrop-blur-sm">
                <ShieldCheck className="h-3 w-3" aria-hidden />
                On record · 30 Jul 2025
              </div>
            </div>
            <figcaption className="p-5 sm:p-6">
              <div className="text-h4 font-bold text-slate-50">TASK officials · chief guests</div>
              <div className="mt-1 font-mono text-micro text-slate-100/55">
                Govt of Telangana skills body · Hyderabad · on video
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href={LINKS.mediaETV.watch}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Watch the ETV Telangana feature on YouTube (opens new tab)"
                  onClick={() => trackEvent("hero_etv_click", { surface: "home-hero" })}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-slate-200/15 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-slate-100/90 transition-colors hover:bg-white/[0.08] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-focus-accent"
                >
                  <Tv aria-hidden className="h-4 w-4" />
                  ETV feature
                  <ArrowRight aria-hidden className="h-3.5 w-3.5" />
                </a>
              </div>
            </figcaption>
          </figure>
        </aside>
      </div>

      {/* Bottom proof rail */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 pb-10 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-y-4 border-t border-slate-200/10 pt-6">
          <div className="font-mono text-micro uppercase tracking-[0.32em] text-slate-100/60">
            JD sources · Live Indian listings · ISO recruiter-verified
          </div>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-slate-100/70">
            <span className="text-base font-bold tracking-tight">IQVIA</span>
            <span className="text-base font-bold tracking-tight">Cognizant</span>
            <span className="text-base font-bold tracking-tight">Parexel</span>
            <span className="text-base font-bold tracking-tight">Accenture</span>
            <span className="text-base font-bold tracking-tight">ICON</span>
          </div>
        </div>
      </div>
    </section>
  );
}
