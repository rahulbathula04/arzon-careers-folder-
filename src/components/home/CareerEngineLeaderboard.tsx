import { Trophy, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { ViralLeaderboardSuite } from "@/components/career/leaderboard/ViralLeaderboardSuite";

export function CareerEngineLeaderboard() {
  return (
    <section className="arena110-home" id="leaderboard">
      <div className="arena110-home-shell">
        <div className="arena110-home-hero">
          <div>
            <span className="arena110-eyebrow"><Trophy size={14} /> NATIONAL HEALTHCARE ROLE READINESS ARENA · 2026</span>
            <h2>Top verified candidates.<br /><em>One place to see where you stand.</em></h2>
            <p>Explore career readiness across healthcare roles, compare university performance, or challenge a batchmate.</p>
          </div>
          <Link to="/career-engine/start" className="arena110-primary">Take diagnostic <ArrowRight size={15} /></Link>
        </div>
        <ViralLeaderboardSuite />
      </div>
    </section>
  );
}
