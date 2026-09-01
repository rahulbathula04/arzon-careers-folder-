import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Briefcase,
  MapPin,
  Clock,
  Building2,
  Filter,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { PremiumChip } from "@/components/ui/PremiumChip";
import { Interactive3dCard, Card3dLayer } from "@/components/3d/Interactive3dCard";
import { Floating3dBadge } from "@/components/3d/Floating3dBadge";

interface JobOpening {
  id: string;
  role: string;
  company: string;
  location: string;
  track: string;
  experience: string;
  salary: string;
  skills: string[];
  postedTime: string;
}

const SAMPLE_JOBS: JobOpening[] = [
  {
    id: "j1",
    role: "Junior Drug Safety Associate (ICSR)",
    company: "Novartis GCC",
    location: "Hyderabad, Telangana",
    track: "Pharmacovigilance",
    experience: "Fresher / 0–1 Year",
    salary: "₹4.5L – ₹5.8L",
    skills: ["Oracle Argus", "MedDRA Coding", "CIOMS-I", "ICSR Triage"],
    postedTime: "2 days ago",
  },
  {
    id: "j2",
    role: "Clinical Data Coordinator (eCRF / RAVE)",
    company: "IQVIA Global Delivery",
    location: "Bengaluru, Karnataka",
    track: "Clinical Research",
    experience: "Fresher / 0–2 Years",
    salary: "₹4.2L – ₹5.5L",
    skills: ["Medidata RAVE", "ICH-GCP", "Query Resolution", "eCRF"],
    postedTime: "1 day ago",
  },
  {
    id: "j3",
    role: "Certified Medical Coder (Inpatient / Outpatient)",
    company: "Optum Global Solutions",
    location: "Hyderabad / Remote",
    track: "Medical Coding",
    experience: "0–1 Year (CPC Eligible)",
    salary: "₹3.8L – ₹5.0L",
    skills: ["ICD-10-CM", "CPT-4", "Anatomy & Physiology", "HCPCS"],
    postedTime: "3 days ago",
  },
  {
    id: "j4",
    role: "Junior Regulatory Affairs Associate (eCTD)",
    company: "Dr. Reddy's Laboratories",
    location: "Hyderabad, Telangana",
    track: "Regulatory Affairs",
    experience: "0–2 Years",
    salary: "₹4.0L – ₹5.2L",
    skills: ["eCTD Modules 1-5", "DMF", "ANDA Submissions", "CMC"],
    postedTime: "4 days ago",
  },
  {
    id: "j5",
    role: "Clinical Statistical Programmer (SAS)",
    company: "Cytel Clinical",
    location: "Bengaluru / Pune",
    track: "Healthcare Analytics",
    experience: "Fresher / 0–1 Year",
    salary: "₹5.2L – ₹7.0L",
    skills: ["Base SAS", "CDISC SDTM", "ADaM", "Clinical TLFs"],
    postedTime: "Just now",
  },
  {
    id: "j6",
    role: "Medical Writer (Clinical Study Protocols)",
    company: "Parexel International",
    location: "Hyderabad, Telangana",
    track: "Medical Writing",
    experience: "0–2 Years (Pharm.D/M.Pharm)",
    salary: "₹5.0L – ₹6.5L",
    skills: ["ICH E3", "CSR Authoring", "Safety Narratives", "Veeva"],
    postedTime: "5 days ago",
  },
];

const FILTER_TRACKS = [
  "All Tracks",
  "Pharmacovigilance",
  "Medical Coding",
  "Clinical Research",
  "Regulatory Affairs",
  "Healthcare Analytics",
  "Medical Writing",
];

export function LiveJobMarketTerminal() {
  const [selectedFilter, setSelectedFilter] = useState("All Tracks");

  const filteredJobs =
    selectedFilter === "All Tracks"
      ? SAMPLE_JOBS
      : SAMPLE_JOBS.filter((j) => j.track === selectedFilter);

  return (
    <section id="jobs" className="py-16 sm:py-24 border-b border-stone-200 bg-[#FAF8F5]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-200">
          <div className="space-y-3 max-w-3xl">
            <PremiumChip variant="gold" size="md">
              LIVE GCC HIRING MARKET
            </PremiumChip>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-tight">
              Healthcare Jobs &amp; Internship Requisitions
            </h2>
            <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed">
              Explore active hiring mandates across Tier-1 GCCs, pharma MNCs, and clinical research organizations in India.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              to="/healthcare-career-workshop"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#1B3F8B] hover:bg-[#153270] text-slate-50 font-bold text-xs transition-all shadow-sm cursor-pointer hover:shadow-md hover:-translate-y-0.5"
            >
              <span>Prepare for These Roles</span>
              <ArrowRight className="h-4 w-4 text-slate-50" />
            </Link>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs text-stone-500 font-bold mr-2 hidden sm:inline">
            FILTER TRACK:
          </span>
          {FILTER_TRACKS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setSelectedFilter(t)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold font-sans transition-all cursor-pointer ${
                selectedFilter === t
                  ? "bg-[#1B3F8B] text-slate-50 shadow-md ring-2 ring-[#1B3F8B]/20"
                  : "bg-white tone-light text-stone-700 hover:bg-stone-100 border border-stone-200 shadow-2xs"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Job Listings Grid with 3D Tilt Cards */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.map((job) => (
            <Interactive3dCard
              key={job.id}
              maxTilt={10}
              depthScale={1.03}
              containerClassName="h-full"
              className="rounded-3xl border border-stone-200 bg-white tone-light p-6 space-y-4 shadow-xs flex flex-col justify-between hover:border-[#1B3F8B]/40 hover:shadow-xl transition-all h-full"
            >
              <div className="space-y-3">
                <Card3dLayer translateZ={20} className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#1B3F8B] bg-sky-50 border border-sky-200 px-2.5 py-0.5 rounded shadow-2xs">
                    {job.track}
                  </span>
                  <span className="font-mono text-[11px] text-stone-400">
                    {job.postedTime}
                  </span>
                </Card3dLayer>

                <Card3dLayer translateZ={30} className="space-y-1">
                  <h3 className="font-serif text-lg font-bold text-[#1A1A1A] leading-snug">
                    {job.role}
                  </h3>
                  <p className="font-sans text-xs font-bold text-stone-800 flex items-center gap-1.5">
                    <Building2 className="h-3.5 w-3.5 text-stone-500" />
                    <span>{job.company}</span>
                  </p>
                </Card3dLayer>

                <Card3dLayer translateZ={15} className="flex flex-wrap items-center gap-3 text-[11px] text-stone-600 font-mono">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-stone-400" />
                    <span>{job.location}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Briefcase className="h-3 w-3 text-stone-400" />
                    <span>{job.experience}</span>
                  </span>
                </Card3dLayer>

                {/* Software Skills Tags with 3D Pop */}
                <Card3dLayer translateZ={25} className="flex flex-wrap gap-1 pt-1">
                  {job.skills.map((s, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 font-mono text-[10px] font-medium border border-stone-200 shadow-2xs"
                    >
                      {s}
                    </span>
                  ))}
                </Card3dLayer>
              </div>

              {/* Card Footer */}
              <Card3dLayer translateZ={20} className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-stone-500 uppercase block">CTC BAND</span>
                  <span className="font-mono text-xs font-bold text-[#8A6D1F]">{job.salary}</span>
                </div>

                <Link
                  to="/healthcare-career-workshop"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-50 text-xs font-bold text-[#1B3F8B] hover:bg-[#1B3F8B] hover:text-slate-50 transition-colors shadow-2xs"
                >
                  <span>Build Skills</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Card3dLayer>
            </Interactive3dCard>
          ))}
        </div>
      </div>
    </section>
  );
}

