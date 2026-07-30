import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AcriRings } from "@/components/career/AcriRings";
import { FlagshipTrackCard } from "@/components/career/cards/FlagshipTrackCard";
import { SecondaryTrackCard } from "@/components/career/cards/SecondaryTrackCard";
import { GapMapCard } from "@/components/career/cards/GapMapCard";
import { FocusStackCard } from "@/components/career/cards/FocusStackCard";
import { TrackCompareCard, type CompareTrack } from "@/components/career/cards/TrackCompareCard";
import { PersonalisedNextStep } from "@/components/career/PersonalisedNextStep";
import { InternshipTracksCard } from "@/components/career/cards/InternshipTracksCard";
import { MentorBrief } from "@/components/career/MentorBrief";
import { CareerForecast } from "@/components/career/CareerForecast";
import {
  ResultCard,
  SkillBar,
  StatTile,
  Chip,
  EvidenceChips,
  HairlineDivider,
} from "@/components/career/cards/primitives";
import type { AcriProfile } from "@/lib/acri";

/**
 * Deterministic visual-regression harness for the Career Engine result-page
 * cards. Renders every card primitive twice - once on a tone-dark page shell
 * (matches /career-engine/result) and once on a tone-light page shell - with
 * fixed mock data so playwright snapshots are stable across runs.
 *
 * URL: /dev/cards?theme=dark (default) or ?theme=light
 * Robots: noindex (harness only).
 */

export const Route = createFileRoute("/dev/cards")({
  head: () => ({
    meta: [
      { title: "Dev · Result Cards Harness" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: DevCardsPage,
});

const MOCK_ACRI: AcriProfile = {
  operational: 72,
  communication: 64,
  documentation: 81,
  workflow: 58,
  domain: 47,
};

const MOCK_GAPS = [
  { id: "operational", label: "Operational rigour", score: 72 },
  { id: "communication", label: "Communication", score: 64 },
  { id: "documentation", label: "Documentation", score: 81 },
  { id: "workflow", label: "Workflow fluency", score: 58 },
  { id: "domain", label: "Domain knowledge", score: 47 },
];

const MOCK_TRACKS: CompareTrack[] = [
  { slug: "pharmacovigilance", title: "Pharmacovigilance", fit: 86 },
  { slug: "clinical-data-management", title: "Clinical Data Management", fit: 78 },
  { slug: "regulatory-affairs", title: "Regulatory Affairs", fit: 71 },
];

/**
 * MentorBrief caches the minted share slug under
 * `arz_brief_${archetype}_${acriOverall}_${trackSlug}` and short-circuits the
 * `createShareCard` server fn when a value is present. The harness pre-seeds
 * this cache so the snapshot never depends on a live DB write, and
 * intercepts `fetch` as a belt-and-braces fallback for any tenant where the
 * server fn would otherwise be hit.
 */
function installHarnessMocks() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem("arz_brief_pv_64_pharmacovigilance", "mock-brief-slug");
  } catch {
    /* private mode - interceptor below still covers us */
  }
  if ((window as unknown as { __arzHarnessFetchPatched?: boolean }).__arzHarnessFetchPatched)
    return;
  (window as unknown as { __arzHarnessFetchPatched?: boolean }).__arzHarnessFetchPatched = true;
  const realFetch = window.fetch.bind(window);
  const patched: typeof window.fetch = ((input: RequestInfo | URL, init?: RequestInit) => {
    const url =
      typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url;
    if (url && /createShareCard|share-card|_serverFn/i.test(url)) {
      return Promise.resolve(
        new Response(JSON.stringify({ slug: "mock-brief-slug" }), {
          status: 200,
          headers: { "content-type": "application/json" },
        }),
      );
    }
    return realFetch(input, init);
  }) as typeof window.fetch;
  window.fetch = patched;
}

const MOCK_PATH_FITS = [
  { slug: "pharmacovigilance", fit: 86 },
  { slug: "clinical-data-management", fit: 78 },
  { slug: "regulatory-affairs", fit: 71 },
  { slug: "medical-coding", fit: 64 },
  { slug: "ai-intelligence", fit: 58 },
];

function DevCardsPage() {
  const params = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
  const theme = params.get("theme") === "light" ? "light" : "dark";
  const harness = params.get("harness") === "1";
  const [selected, setSelected] = useState("pharmacovigilance");

  // Install the deterministic mocks before any server-fn-backed card mounts.
  // Runs synchronously on first render - `useEffect` would be too late for
  // MentorBrief's mint-on-mount call.
  if (harness) installHarnessMocks();

  // Force a re-render once mocks are in place so MentorBrief reads the
  // pre-seeded cache on its very first effect.
  const [, forceRender] = useState(0);
  useEffect(() => {
    if (harness) forceRender((n) => n + 1);
  }, [harness]);

  const shellClass =
    theme === "dark"
      ? "tone-dark min-h-dvh bg-[#0B1220] px-4 py-10 sm:px-8"
      : "tone-light min-h-dvh bg-slate-50 px-4 py-10 sm:px-8";

  return (
    <main
      className={shellClass}
      data-testid="harness-shell"
      data-theme={theme}
      data-harness={harness ? "1" : "0"}
    >
      <div className="mx-auto max-w-3xl">
        <header className="mb-6 flex items-center justify-between gap-3">
          <div>
            <p className="font-mono text-micro font-bold uppercase tracking-[0.24em] opacity-70">
              Result cards · {theme} theme{harness ? " · harness=1" : ""}
            </p>
            <h1 className="font-grotesk text-h3 font-extrabold">Visual harness</h1>
          </div>
          <div className="flex gap-2">
            <a
              href={`/dev/cards?theme=${theme === "dark" ? "light" : "dark"}${harness ? "&harness=1" : ""}`}
              className="rounded-full border border-current/30 px-3 py-1 text-xs font-bold"
            >
              Toggle {theme === "dark" ? "light" : "dark"}
            </a>
            <a
              href={`/dev/cards?theme=${theme}${harness ? "" : "&harness=1"}`}
              className="rounded-full border border-current/30 px-3 py-1 text-xs font-bold"
            >
              {harness ? "Harness off" : "Harness on"}
            </a>
          </div>
        </header>

        <section data-testid="card-acri">
          <ResultCard eyebrow="ACRI Readiness" title="Your five-dimension readiness preview">
            <AcriRings profile={MOCK_ACRI} overall={64} bandLabel="Recommended" />
          </ResultCard>
        </section>

        <section data-testid="card-flagship">
          <FlagshipTrackCard
            slug="pharmacovigilance"
            title="Pharmacovigilance"
            why="Detail-led, compliance-shaped, comfortable with documentation and structured workflows."
            fit={86}
          />
        </section>

        <section data-testid="card-secondary">
          <SecondaryTrackCard
            slug="clinical-data-management"
            title="Clinical Data Management"
            why="Strong operational and workflow signals · comfortable with screens · data-oriented."
            fit={78}
            index={2}
          />
        </section>

        <section data-testid="card-compare">
          <TrackCompareCard tracks={MOCK_TRACKS} selectedSlug={selected} onSelect={setSelected} />
        </section>

        <section data-testid="card-gapmap">
          <GapMapCard gaps={MOCK_GAPS} trackTitle="Pharmacovigilance" />
        </section>

        <section data-testid="card-focus-stack">
          <FocusStackCard slug="pharmacovigilance" trackTitle="Pharmacovigilance" />
        </section>

        <section data-testid="card-next-step">
          <PersonalisedNextStep trackSlug="pharmacovigilance" trackTitle="Pharmacovigilance" />
        </section>

        <section data-testid="card-career-forecast">
          <CareerForecast slug="business-analyst" course="comm" />
        </section>

        {harness && (
          <>
            <section data-testid="card-internship-tracks">
              <InternshipTracksCard
                profile={MOCK_ACRI}
                pathFits={MOCK_PATH_FITS}
                flagshipSlug="pharmacovigilance"
                course="pharm"
              />
            </section>

            <section data-testid="card-mentor-brief">
              <MentorBrief
                archetype="pv"
                archetypeName="The PV Operator"
                trackSlug="pharmacovigilance"
                trackTitle="Pharmacovigilance"
                acriOverall={64}
                bandLabel="Recommended"
                gaps={MOCK_GAPS}
                skills={["ICSR triage", "MedDRA coding", "E2B(R3)", "Argus Safety", "PSUR/PBRER"]}
                roles={["Drug Safety Associate", "PV Officer", "Case Processor"]}
                candidateName="Harness Sample"
              />
            </section>
          </>
        )}

        {/* Primitive sampler so contrast regressions on tokens show up too. */}
        <section data-testid="card-primitives">
          <ResultCard tone="emerald" eyebrow="Primitives sampler" title="Tokens used inside cards">
            <div className="space-y-4">
              <SkillBar label="Operational" value={72} tone={0} />
              <SkillBar label="Communication" value={64} tone={1} />
              <SkillBar label="Documentation" value={81} tone={2} />
              <HairlineDivider />
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                <StatTile label="Cohort" value="Mar 24" />
                <StatTile label="Closes" value="12d" tone="amber" />
                <StatTile label="Seats" value="8/24" tone="primary" />
              </div>
              <EvidenceChips
                items={["detail-led", "compliance-shaped", "documentation-comfortable"]}
              />
              <div className="flex flex-wrap gap-2">
                <Chip tone="slate">Slate</Chip>
                <Chip tone="primary">Primary</Chip>
                <Chip tone="emerald">Emerald</Chip>
                <Chip tone="amber">Amber</Chip>
                <Chip tone="fuchsia">Fuchsia</Chip>
              </div>
            </div>
          </ResultCard>
        </section>
      </div>
    </main>
  );
}
