import "@/styles/arena110.css";
import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Check,
  ChevronRight,
  Copy,
  Search,
  Swords,
  Trophy,
} from "lucide-react";
import { toast } from "sonner";

type Tab = "candidates" | "universities" | "duel";
type Pillar = "All" | "Pharmacovigilance" | "Clinical Data Management" | "Medical Coding" | "Regulatory Affairs" | "SAS Clinical";

type Candidate = {
  rank: number;
  name: string;
  college: string;
  track: Exclude<Pillar, "All">;
  score: number;
  image: string;
};

type University = {
  rank: number;
  name: string;
  city: string;
  index: number;
  candidates: number;
  image: string;
};

const CANDIDATES: Candidate[] = [
  { rank: 1, name: "Pooja S.", college: "Manipal College of Pharmaceutical Sciences", track: "Pharmacovigilance", score: 96, image: "/images/avatar-priya.jpg" },
  { rank: 2, name: "Karthik R.", college: "JNTU Hyderabad", track: "Regulatory Affairs", score: 94, image: "/images/avatar-rahul.jpg" },
  { rank: 3, name: "Sneha M.", college: "NIPER Hyderabad", track: "Clinical Data Management", score: 93, image: "/images/avatar-sneha.jpg" },
  { rank: 4, name: "Ananya D.", college: "Bombay College of Pharmacy", track: "SAS Clinical", score: 91, image: "/images/avatar-ananya.jpg" },
];

const UNIVERSITIES: University[] = [
  { rank: 1, name: "NIPER Hyderabad", city: "Hyderabad, Telangana", index: 96.4, candidates: 214, image: "/images/acri-campus-bg.jpg" },
  { rank: 2, name: "Manipal College of Pharmaceutical Sciences", city: "Manipal, Karnataka", index: 95.8, candidates: 198, image: "/images/bpharm-students-group.jpg" },
  { rank: 3, name: "Osmania University", city: "Hyderabad, Telangana", index: 94.9, candidates: 342, image: "/images/bpharm-male-graduate.jpg" },
];

const PILLARS: Pillar[] = [
  "All",
  "Pharmacovigilance",
  "Clinical Data Management",
  "Medical Coding",
  "Regulatory Affairs",
  "SAS Clinical",
];

export function ViralLeaderboardSuite() {
  const [tab, setTab] = useState<Tab>("candidates");
  const [pillar, setPillar] = useState<Pillar>("All");
  const [query, setQuery] = useState("");
  const [opponent, setOpponent] = useState("");
  const [copied, setCopied] = useState(false);

  const candidates = useMemo(
    () =>
      CANDIDATES.filter((candidate) => {
        const pillarMatch = pillar === "All" || candidate.track === pillar;
        const queryMatch =
          !query ||
          candidate.name.toLowerCase().includes(query.toLowerCase()) ||
          candidate.college.toLowerCase().includes(query.toLowerCase());
        return pillarMatch && queryMatch;
      }),
    [pillar, query],
  );

  const copyChallenge = async () => {
    const url =
      typeof window === "undefined"
        ? "https://arzoncareers.in/career-engine/start"
        : `${window.location.origin}/career-engine/start?ref=duel`;
    await navigator.clipboard?.writeText(url);
    setCopied(true);
    toast.success("Challenge link copied");
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div id="leaderboard-arena" className="arena110">
      <div className="arena110-live">
        <span className="arena110-live-dot" />
        <span className="arena110-live-label">LIVE VELOCITY</span>
        <p>Career readiness activity is updated as candidates complete diagnostics.</p>
        <span className="arena110-live-count">Preview board</span>
      </div>

      <div className="arena110-tabs" role="tablist" aria-label="Career arena">
        <button className={tab === "candidates" ? "is-active" : ""} onClick={() => setTab("candidates")}>
          National Candidates <span>4</span>
        </button>
        <button className={tab === "universities" ? "is-active" : ""} onClick={() => setTab("universities")}>
          University Rankings <span>3</span>
        </button>
        <button className={tab === "duel" ? "is-active arena110-tab-duel" : "arena110-tab-duel"} onClick={() => setTab("duel")}>
          <Swords size={14} /> 1v1 Challenge
        </button>
      </div>

      {tab === "candidates" && (
        <section className="arena110-section">
          <div className="arena110-toolbar">
            <label className="arena110-search">
              <Search size={16} />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search candidate or university" />
            </label>
          </div>

          <div className="arena110-filter-row">
            <span>FILTER PILLAR</span>
            {PILLARS.map((item) => (
              <button key={item} className={pillar === item ? "is-selected" : ""} onClick={() => setPillar(item)}>
                {item}
              </button>
            ))}
          </div>

          <div className="arena110-list">
            {candidates.map((candidate) => (
              <article key={candidate.rank} className="arena110-candidate">
                <div className="arena110-rank">{String(candidate.rank).padStart(2, "0")}</div>
                <img src={candidate.image} alt="" />
                <div className="arena110-candidate-copy">
                  <div className="arena110-candidate-top">
                    <h3>{candidate.name}</h3>
                    <span>{candidate.score}%</span>
                  </div>
                  <p>{candidate.college}</p>
                  <div className="arena110-meta">
                    <span>{candidate.track}</span>
                    <span className="arena110-meter"><i style={{ width: `${candidate.score}%` }} /></span>
                    <small>Readiness score</small>
                  </div>
                </div>
                <button className="arena110-arrow" aria-label={`Open ${candidate.name}`}>
                  <ArrowUpRight size={17} />
                </button>
              </article>
            ))}
          </div>
        </section>
      )}

      {tab === "universities" && (
        <section className="arena110-university-grid">
          {UNIVERSITIES.map((university) => (
            <article key={university.rank} className="arena110-university">
              <img src={university.image} alt="" />
              <div className="arena110-university-body">
                <div className="arena110-university-rank">#{university.rank}</div>
                <div>
                  <h3>{university.name}</h3>
                  <p>{university.city}</p>
                </div>
              </div>
              <div className="arena110-university-stats">
                <div><strong>{university.index}</strong><span>Aptitude index</span></div>
                <div><strong>{university.candidates}</strong><span>Active candidates</span></div>
              </div>
              <Link to="/career-engine/start" className="arena110-campus-link">
                Represent your campus <ChevronRight size={15} />
              </Link>
            </article>
          ))}
        </section>
      )}

      {tab === "duel" && (
        <section className="arena110-duel">
          <div className="arena110-duel-copy">
            <span className="arena110-eyebrow">CAREER DECISION, MADE SOCIAL</span>
            <h2>Challenge a batchmate or rival.</h2>
            <p>Take the same readiness diagnostic, compare your result, and see where your strengths differ.</p>
            <div className="arena110-duel-form">
              <input value={opponent} onChange={(event) => setOpponent(event.target.value)} placeholder="Batchmate's name" />
              <div className="arena110-duel-actions">
                <Link to="/career-engine/start" className="arena110-primary">Start challenge <ArrowUpRight size={15} /></Link>
                <button onClick={copyChallenge} className="arena110-secondary">
                  {copied ? <Check size={15} /> : <Copy size={15} />}
                  {copied ? "Copied" : "Copy link"}
                </button>
              </div>
            </div>
          </div>
          <div className="arena110-duel-card">
            <img src="/images/pv-clinical-collaboration.jpg" alt="" />
            <div className="arena110-duel-card-overlay">
              <span>ARZON GLOBAL</span>
              <strong>1v1 READINESS<br />CHALLENGE</strong>
              <div><Trophy size={15} /> Compare capability, not course certificates.</div>
            </div>
          </div>
        </section>
      )}

      <section className="arena110-proof">
        <div className="arena110-proof-image">
          <img src="/images/bpharm-female-graduate-hero.jpg" alt="" />
        </div>
        <div className="arena110-proof-copy">
          <span className="arena110-eyebrow">CAREER ENGINE</span>
          <h2>Know what you need to solve before you buy training.</h2>
          <p>Your result starts with a diagnostic. It shows what you already demonstrate, where your next gaps are, and which role you are preparing for.</p>
          <div className="arena110-proof-steps">
            <div><b>01</b><span>Take the diagnostic</span></div>
            <div><b>02</b><span>See your readiness profile</span></div>
            <div><b>03</b><span>Build the next capability</span></div>
          </div>
          <Link to="/career-engine/start" className="arena110-primary">
            Test your readiness <ArrowUpRight size={15} />
          </Link>
        </div>
      </section>
    </div>
  );
}
