import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Trophy } from "lucide-react";
import { CareerShell } from "@/components/career/CareerShell";
import { ViralLeaderboardSuite } from "@/components/career/leaderboard/ViralLeaderboardSuite";
import { pageSeo } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/jsonLd";

export const Route = createFileRoute("/career-engine/leaderboard")({
  head: () => {
    const ps = pageSeo({
      path: "/career-engine/leaderboard",
      title: "National Healthcare Career Readiness Arena · Arzon Global",
      description: "Explore candidate readiness, university rankings and peer challenges across healthcare career tracks.",
    });
    return {
      meta: [{ title: "Healthcare Career Readiness Arena | Arzon Global" }, ...ps.meta],
      links: ps.links,
      scripts: [{
        type: "application/ld+json",
        children: breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Career Engine", path: "/career-engine" },
          { name: "Leaderboard", path: "/career-engine/leaderboard" },
        ]),
      }],
    };
  },
  component: CareerEngineLeaderboardPage,
});

function CareerEngineLeaderboardPage() {
  return (
    <CareerShell>
      <main className="arena110-page">
        <section className="arena110-page-hero">
          <div>
            <span className="arena110-eyebrow"><Trophy size={14} /> NATIONAL HEALTHCARE ROLE READINESS ARENA · 2026</span>
            <h1>National candidates.<br /><em>University ambition.</em></h1>
            <p>See how readiness is being measured across healthcare careers. Then take the diagnostic and earn your own place.</p>
          </div>
          <Link to="/career-engine/start" className="arena110-primary">Take diagnostic <ArrowRight size={15} /></Link>
        </section>
        <ViralLeaderboardSuite />
      </main>
    </CareerShell>
  );
}
