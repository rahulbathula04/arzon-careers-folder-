import { createFileRoute, Link } from "@tanstack/react-router";
import { Footer } from "@/components/landing/Footer";
import { SITE, absUrl } from "@/components/landing/constants";
import { Clock, CheckCircle2, Sparkles } from "lucide-react";

export const Route = createFileRoute("/roadmap")({
  head: () => {
    const title = "Roadmap · Arzon Global is becoming India's pharma skill-graph";
    const desc =
      "Public roadmap: what Arzon Global delivers today, what ships next quarter, and the long-arc vision - a verified skill-evidence graph for India's pharma & clinical workforce.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `${SITE.origin}/roadmap` },
        { property: "og:image", content: absUrl(SITE.ogImage.inauguration) },
      ],
      links: [{ rel: "canonical", href: `${SITE.origin}/roadmap` }],
    };
  },
  component: Roadmap,
});

const TODAY = [
  "12-week cohort courses in pharmacovigilance, clinical data management, medical coding",
  "Razorpay checkout with auto-provisioned learner accounts",
  "Career Engine - free readiness test with JD-mirrored recommendations",
  "MCA-registered entity, ISO-aligned certification, WhatsApp cohort support",
];

const NEXT = [
  "Full /app learner portal (syllabus, live sessions, assignments, mentor feedback)",
  "Recruiter portal - query enrolled candidates by verified skill evidence",
  "Automated cohort provisioning after payment (email, WhatsApp, calendar)",
  "Public trust ledger - every certificate independently verifiable by URL",
];

const VISION = [
  "Verified skill-evidence graph for the Indian pharma/clinical workforce",
  "College partnerships - pipeline final-year students into the graph",
  "Employer subscriptions - query, shortlist, and verify skills at hire time",
  "Deployment-ready as an SLA, not a slogan",
];

function TimelineStop({
  icon: Icon,
  label,
  title,
  items,
  tone,
  isLast,
}: {
  icon: typeof CheckCircle2;
  label: string;
  title: string;
  items: string[];
  tone: "shipping" | "next" | "vision";
  isLast?: boolean;
}) {
  const dotClass =
    tone === "shipping"
      ? "bg-sky-500 text-white ring-sky-500/20" // @allow-raw-palette
      : tone === "next"
        ? "bg-primary text-primary-foreground ring-primary/20"
        : "bg-card text-muted-foreground ring-border";
  const cardClass =
    tone === "shipping"
      ? "border-sky-500/25 bg-sky-500/[0.03]" // @allow-raw-palette
      : tone === "next"
        ? "border-primary/25 bg-primary/[0.03]"
        : "border-border bg-card/60";
  return (
    <div className="relative grid grid-cols-[auto_minmax(0,1fr)] gap-x-5 gap-y-2 md:gap-x-8">
      <div className="relative flex justify-center">
        <div
          className={`relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full ring-4 ${dotClass}`}
        >
          <Icon className="h-5 w-5" aria-hidden />
        </div>
        {!isLast && (
          <span
            aria-hidden
            className="absolute left-1/2 top-11 -translate-x-1/2 h-[calc(100%+2rem)] w-px bg-gradient-to-b from-border via-border to-transparent"
          />
        )}
      </div>
      <section className={`min-w-0 rounded-2xl border p-5 md:p-7 ${cardClass}`}>
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          {label}
        </p>
        <h2 className="mt-1.5 text-lg font-semibold tracking-tight md:text-xl">{title}</h2>
        <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-muted-foreground md:text-[15px]">
          {items.map((i) => (
            <li key={i} className="flex gap-2.5">
              <span
                aria-hidden
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-50"
              />
              <span>{i}</span>
            </li>
          ))}
        </ul>
      </section>
      {!isLast && <div className="h-6" />}
    </div>
  );
}

function Roadmap() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <main className="mx-auto max-w-3xl px-4 pb-24 pt-20 md:pt-28">
        <header className="mb-14 text-center md:mb-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
            Public roadmap
          </p>
          <h1 className="mt-5 text-[2rem] font-semibold leading-[1.1] tracking-tight md:text-5xl">
            Where Arzon Global is going
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground md:text-lg">
            We market as infrastructure. Today we deliver as a school with unusually mature
            engineering. Here is exactly what is shipped, what is next, and the long arc.
          </p>
        </header>

        <div className="space-y-0">
          <TimelineStop
            icon={CheckCircle2}
            label="Shipping today"
            title="What you get when you enrol right now"
            items={TODAY}
            tone="shipping"
          />
          <TimelineStop
            icon={Clock}
            label="Next 90 days"
            title="On the immediate build queue"
            items={NEXT}
            tone="next"
          />
          <TimelineStop
            icon={Sparkles}
            label="Long arc"
            title="Where Arzon becomes real infrastructure"
            items={VISION}
            tone="vision"
            isLast
          />
        </div>

        <p className="mt-14 text-center text-xs leading-relaxed text-muted-foreground">
          {/* Update this date manually whenever roadmap content changes */}
          Last updated July 2026. If you enrolled expecting a feature listed under "next 90 days"
          and need it sooner, message us on WhatsApp and we'll be honest about timelines.
        </p>

        <div className="mt-6 text-center">
          <Link
            to="/why-arzon"
            className="text-sm text-muted-foreground underline-offset-4 hover:underline"
          >
            ← Back to Why Arzon
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
