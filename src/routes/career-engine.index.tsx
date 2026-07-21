import { useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ShieldCheck,
  MessageCircle,
  Users,
  Gauge,
  Workflow,
  Target,
  Stethoscope,
  Cpu,
  Sprout,
  Briefcase,
} from "lucide-react";
import { CareerShell } from "@/components/career/CareerShell";
import { LIVE_LEARNERS_LABEL, waLink, SITE, ACRI_FULL } from "@/components/landing/constants";
import { pageSeo } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/jsonLd";
import { trackCEFunnelStep, trackCECtaClicked } from "@/lib/careerEngineAnalytics";

export const Route = createFileRoute("/career-engine/")({
  head: () => {
    const ps = pageSeo({
      path: "/career-engine",
      title: "Career Test for Pharma & BBA Students · Free · Arzon",
      description:
        "Free 3-min career test for pharma, BBA, B.Tech & life-sciences students in India. Match to pharmacovigilance, medical coding, CDM or regulatory with salary bands.",
      image: SITE.ogImages.careerEngine,
    });
    return {
      meta: [
        { title: "Career Test for Pharma & BBA Students · Free · Arzon" },
        {
          name: "keywords",
          content:
            "career test for pharma students, career test for BBA students, ACRI readiness, career assessment India, free career test",
        },
        ...ps.meta,
      ],
      links: ps.links,
      scripts: [
        {
          type: "application/ld+json",
          children: breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Career Engine", path: "/career-engine" },
          ]),
        },
      ],
    };
  },
  component: CareerEngineLanding,
});

function CareerEngineLanding() {
  useEffect(() => {
    trackCEFunnelStep({ step: "interested" });
  }, []);
  const onStartCta = (target: string) => () => trackCECtaClicked({ step: "interested", target });
  return (
    <CareerShell>
      <div className="text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-glow/30 bg-sky-300/[0.08] px-3 py-1 font-mono text-micro font-semibold uppercase tracking-[0.22em] text-eyebrow-strong">
          <ShieldCheck className="h-3 w-3" /> Free · 3 minutes · No login
        </span>
        <h1 className="h-display mt-5">
          Find the role India is{" "}
          <span className="italic-accent not-italic">already hiring you for.</span>
        </h1>
        <p className="body-lg mx-auto mt-5 max-w-xl text-white/80">
          A structured 3-minute diagnostic. Scored against real Indian job descriptions, your{" "}
          <strong className="font-semibold text-white">{ACRI_FULL}</strong> tells you the role you
          fit, the gaps to close, and the next 30-day move.
        </p>

        <div className="mx-auto mt-6 grid max-w-xl grid-cols-2 gap-2 sm:grid-cols-4">
          <StreamChip icon={Stethoscope} label="Healthcare" />
          <StreamChip icon={Cpu} label="Engineering" />
          <StreamChip icon={Sprout} label="Agriculture" />
          <StreamChip icon={Briefcase} label="Business" />
        </div>

        <Link
          to="/career-engine/test"
          onClick={onStartCta("start_top")}
          className="btn btn-primary btn-block btn-block-sm-auto btn-glow-pulse mt-7"
        >
          Take the free career fit test <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
        <p className="mt-3 font-mono text-micro uppercase tracking-[0.18em] text-white/50">
          No login. No PII. Get your result first.
        </p>
      </div>

      <div className="mt-10 grid gap-3 sm:grid-cols-3">
        <Tile
          icon={Gauge}
          title="Operational fit"
          sub="A readiness level across 5 dimensions recruiters screen for."
        />
        <Tile
          icon={Workflow}
          title="Readiness gap map"
          sub="Exactly where you're strong, and the 1–2 things to work on next."
        />
        <Tile
          icon={Target}
          title="Recommended track"
          sub="Matched to your stream — healthcare live now, engineering/agri/business rolling out 2026."
        />
      </div>

      <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <div className="flex items-center gap-2 text-gold">
          <Users className="h-4 w-4" />
          <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em]">
            {LIVE_LEARNERS_LABEL} students learning live with us right now
          </p>
        </div>
        <p className="mt-3 text-sm text-white/70">
          The career report is free, and yours to keep, even if you never enrol. ISO 9001 · MSME ·
          MCA registered.
        </p>
        <a
          href={waLink("Hi Arzon, I have a question before taking the career test.")}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-eyebrow hover:underline"
        >
          <MessageCircle className="h-3.5 w-3.5" /> WhatsApp a counsellor, usually replies in 5 min
        </a>
      </div>

      <div className="mt-8 text-center">
        <Link
          to="/career-engine/test"
          onClick={onStartCta("start_bottom")}
          className="btn btn-primary btn-block btn-block-sm-auto btn-glow-pulse"
        >
          Start the free test <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>

      <div className="mt-8 text-center">
        <Link to="/" className="text-xs text-white/80 hover:text-white">
          ← Back to Arzon Global
        </Link>
      </div>
    </CareerShell>
  );
}

function Tile({ icon: Icon, title, sub }: { icon: typeof Gauge; title: string; sub: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-left">
      <Icon className="h-4 w-4 text-primary-glow" />
      <p className="mt-2 font-grotesk text-base font-bold text-white">{title}</p>
      <p className="mt-1 text-xs text-white/65">{sub}</p>
    </div>
  );
}

function StreamChip({ icon: Icon, label }: { icon: typeof Gauge; label: string }) {
  return (
    <div className="inline-flex items-center justify-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-micro font-semibold uppercase tracking-[0.16em] text-white/80">
      <Icon className="h-3 w-3 text-primary-glow" /> {label}
    </div>
  );
}
