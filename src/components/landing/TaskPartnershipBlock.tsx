import { Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import {
  ArrowRight,
  ShieldCheck,
  BadgeCheck,
  Landmark,
  Tv,
  MessageCircle,
  ExternalLink,
} from "lucide-react";
import taskImg from "@/assets/proof/task-partnership.jpg";
import { LINKS, COUNSELLOR_PHONE } from "./constants";
import { trackEvent } from "@/lib/analytics";
import { ctaClass } from "./CTAButton";

/**
 * TASK credibility block.
 * Repaints into the curriculum design system (deep navy, sky-300 accent,
 * mono-caps eyebrow) and pins the primary Apply CTA + WhatsApp counsellor
 * directly beside the proof so trust signals convert in-place.
 *
 * Analytics: `task_block_impression`, `task_block_video_open`,
 * `task_block_proof_click`, `task_block_cta_click`, `task_block_whatsapp_click`.
 */
export function TaskPartnershipBlock() {
  const ref = useRef<HTMLElement | null>(null);
  // Single CTA copy — mirrors the hero readiness-test contract so the TASK
  // proof funnels directly into the free 3-min diagnostic (not the paid apply
  // flow). Any A/B split here would fragment the funnel and confuse users.
  const ctaLabel = "Get my industry-fit score";

  // Fire one impression event when ≥40% of the block is visible.
  useEffect(() => {
    if (!ref.current || typeof IntersectionObserver === "undefined") return;
    const el = ref.current;
    let fired = false;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !fired) {
            fired = true;
            trackEvent("task_block_impression", { surface: "home" });
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const stats: Array<{ label: string; value: string }> = [
    { label: "Chief guests", value: "TASK · Govt of Telangana" },
    { label: "Public launch", value: "30 Jul 2025 · Hyderabad" },
    { label: "Programmes shown", value: "PV · Coding · Clinical Research" },
  ];

  type Proof = {
    key: string;
    label: string;
    sub: string;
    href: string;
    external?: boolean;
    Icon: typeof ShieldCheck;
  };
  const proofs: Proof[] = [
    {
      key: "iso",
      label: "ISO 9001:2015",
      sub: "Verify certificate",
      href: "/verify",
      Icon: ShieldCheck,
    },
    {
      key: "msme",
      label: "MSME · Udyam",
      sub: "Govt registration",
      href: "/about#legal",
      Icon: BadgeCheck,
    },
    {
      key: "mca",
      label: "MCA incorporated",
      sub: "Company filing",
      href: "/about#legal",
      Icon: Landmark,
    },
    {
      key: "etv",
      label: LINKS.mediaETV.outlet,
      sub: "Media coverage",
      href: LINKS.mediaETV.watch,
      external: true,
      Icon: Tv,
    },
  ];

  return (
    <section
      ref={ref}
      id="launch-event"
      className="tone-dark relative overflow-hidden border-y border-slate-200/10 bg-surface-abyss text-slate-50"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(59,130,246,0.18),transparent_70%)]"
      />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        <div className="mb-6 inline-flex max-w-full items-center gap-2 rounded-full border border-slate-200/15 bg-slate-50/5 px-3 py-1 font-mono text-micro uppercase tracking-[0.16em] text-slate-100/70 sm:text-micro sm:tracking-[0.2em]">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-glow" aria-hidden />
          <span className="sm:hidden">Govt-recognised · Verifiable</span>
          <span className="hidden sm:inline">
            Government recognition · Independently verifiable
          </span>
        </div>
        <h2 className="max-w-3xl text-balance text-h2 font-semibold text-slate-50! [overflow-wrap:anywhere] hyphens-auto">
          Recognised by <span className="text-eyebrow">Government of India &amp; Telangana.</span>
        </h2>
        <div className="mt-5 max-w-2xl rounded-2xl border border-slate-200/15 bg-white/[0.04] p-5">
          <p className="font-mono text-micro uppercase tracking-[0.18em] text-slate-100/55">
            Government recognition
          </p>
          <ul className="mt-3 grid gap-2 text-body-sm text-slate-100/85 sm:text-base">
            {[
              "TASK (Govt of Telangana) attended our public launch · 30 Jul 2025",
              "ISO 9001:2015 certified — verify the certificate ID online",
              "MSME · Udyam registered with the Government of India",
              "MCA-incorporated Pvt Ltd — CIN looks up on the MCA portal",
            ].map((line) => (
              <li key={line} className="flex items-start gap-2.5">
                <span aria-hidden className="mt-1 text-eyebrow">
                  ✓
                </span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              to="/verify"
              onClick={() => trackEvent("task_block_proof_click", { label: "view_registration" })}
              className="tone-light inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-meta font-semibold text-black transition hover:bg-slate-50/90"
            >
              View registration
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
            <Link
              to="/about"
              hash="legal"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200/20 bg-white/[0.04] px-4 py-2 text-meta font-semibold text-slate-100/90 transition hover:bg-slate-50/10"
            >
              Legal &amp; filings
            </Link>
          </div>
        </div>

        <div className="mt-8 grid items-start gap-6 md:mt-10 md:grid-cols-[1.25fr_1fr] md:gap-10">
          {/* Left — photo + watch button */}
          <div className="space-y-4">
            <figure className="overflow-hidden rounded-2xl border border-slate-200/10 bg-white/[0.03]">
              <img
                src={taskImg}
                alt="Photo triptych from the Arzon Global public launch — TASK (Telangana Academy for Skill and Knowledge) officials attending as chief guests, presenting mementos to the Arzon founding team, 30 July 2025 in Hyderabad."
                loading="lazy"
                decoding="async"
                className="h-auto w-full"
              />
              <figcaption className="border-t border-slate-200/10 px-4 py-2 font-mono text-micro uppercase tracking-[0.16em] text-slate-100/55">
                Launch event · Hyderabad · 30 Jul 2025
              </figcaption>
            </figure>
          </div>

          {/* Right — stat trio + cert proof + Apply CTA */}
          <div className="space-y-5">
            <ul className="grid gap-3">
              {stats.map((s) => (
                <li
                  key={s.label}
                  className="rounded-xl border border-slate-200/10 bg-white/[0.03] p-4"
                >
                  <p className="font-mono text-micro uppercase tracking-[0.16em] text-slate-100/55">
                    {s.label}
                  </p>
                  <p className="mt-1 text-sm font-semibold leading-tight text-slate-50">
                    {s.value}
                  </p>
                </li>
              ))}
            </ul>

            <div className="rounded-xl border border-slate-200/10 bg-white/[0.03] p-4">
              <p className="font-mono text-micro uppercase tracking-[0.16em] text-slate-100/55">
                Independently verifiable
              </p>
              <ul className="mt-3 grid grid-cols-2 gap-2">
                {proofs.map(({ key, label, sub, href, external, Icon }) => {
                  const onClick = () => trackEvent("task_block_proof_click", { label: key });
                  const inner = (
                    <>
                      <Icon className="h-4 w-4 shrink-0 text-eyebrow" />
                      <span className="min-w-0">
                        <span className="block truncate text-xs font-semibold text-slate-50">
                          {label}
                        </span>
                        <span className="block truncate text-micro text-slate-100/60">{sub}</span>
                      </span>
                      {external ? (
                        <ExternalLink className="ml-auto h-3 w-3 shrink-0 text-slate-200/40" />
                      ) : null}
                    </>
                  );
                  const cls =
                    "group flex items-center gap-2 rounded-lg border border-slate-200/10 bg-white/[0.02] p-2.5 transition hover:border-slate-200/25 hover:bg-white/[0.05]";
                  return (
                    <li key={key}>
                      {external ? (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={onClick}
                          className={cls}
                        >
                          {inner}
                        </a>
                      ) : (
                        <Link to={href} onClick={onClick} className={cls}>
                          {inner}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="space-y-2">
              <Link
                to="/career-engine/test"
                onClick={() =>
                  trackEvent("task_block_cta_click", {
                    placement: "task_block",
                    label: "readiness_test",
                  })
                }
                className={ctaClass("gold", {
                  size: "lg",
                  block: true,
                  className: "btn-glow-pulse",
                })}
              >
                <span>{ctaLabel}</span>
                <span data-arrow aria-hidden>
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
              <p className="text-center font-mono text-micro uppercase tracking-[0.18em] text-slate-100/60">
                3 min · free · no login · instant score
              </p>
              <a
                href={`https://wa.me/${COUNSELLOR_PHONE}?text=${encodeURIComponent(
                  "Hi Arzon — I saw the TASK launch page. I'd like to know about the next cohort.",
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("task_block_whatsapp_click", { placement: "task_block" })}
                className={ctaClass("ghost", { size: "md", block: true })}
              >
                <MessageCircle className="h-4 w-4" />
                <span>WhatsApp a counsellor</span>
              </a>
              <p className="pt-1 text-center font-mono text-micro uppercase tracking-[0.16em] text-slate-100/55">
                Verified govt event · Independently linked above
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
