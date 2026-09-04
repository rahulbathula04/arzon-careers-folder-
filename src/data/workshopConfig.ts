/**
 * Configuration Layer for Arzon Global Healthcare Career Workshop.
 * Decouples workshop scheduling, URLs, speaker bio, and agenda from JSX components.
 */

export interface WorkshopAgendaItem {
  timeRange: string;
  title: string;
  description: string;
}

export interface CareerMilestone {
  company: string;
  role: string;
}

export interface WorkshopSpeaker {
  name: string;
  designation: string;
  education: string;
  organizationSummary: string;
  careerTimeline: CareerMilestone[];
  credibilityPoints: string[];
}

export interface WorkshopConfig {
  title: string;
  type: string;
  dateDisplay: string;
  timeDisplay: string;
  durationDisplay: string;
  startIsoDate: string; // ISO format for Google Calendar (Asia/Kolkata)
  endIsoDate: string;
  platform: string;
  meetUrl: string;
  speaker: WorkshopSpeaker;
  agenda: WorkshopAgendaItem[];
  eligibleDegrees: string[];
}

export const WORKSHOP_CONFIG: WorkshopConfig = {
  title: "Free Live Pharmacovigilance & Healthcare Career Workshop",
  type: "LIVE INDUSTRY WORKING SESSION",
  dateDisplay: "Sunday, 6 September 2026",
  timeDisplay: "6:00 PM – 7:15 PM IST",
  durationDisplay: "75 Minutes",
  startIsoDate: "20260906T123000Z", // 6:00 PM IST (UTC+5:30)
  endIsoDate: "20260906T134500Z",   // 7:15 PM IST (UTC+5:30)
  platform: "Google Meet",
  meetUrl: "https://meet.google.com/arz-onhc-wrk",
  speaker: {
    name: "Mohamed Kumail Abbas",
    designation: "Manager, Pharmacovigilance",
    education: "M.Pharm",
    organizationSummary: "Global CRO & Pharma Operations",
    careerTimeline: [
      { company: "Quintiles", role: "Drug Safety Operations" },
      { company: "Indegene", role: "Safety Analytics & Case Ops" },
      { company: "Norwich Clinical", role: "Clinical Safety Operations" },
      { company: "Accenture", role: "Life Sciences Safety Ops" },
      { company: "Cognizant", role: "PV Operations" },
      { company: "Novaspire", role: "Manager, Pharmacovigilance" },
    ],
    credibilityPoints: [
      "Ground-floor ICSR processing & quality control leadership",
      "Literature adverse event surveillance & triage",
      "Operational management & team leadership across global CROs",
      "Direct technical training for healthcare and pharmacy graduates",
    ],
  },
  agenda: [
    {
      timeRange: "01 · 20 min",
      title: "The Real Case",
      description: "Live breakdown of a real-world adverse drug event report (ICSR) on screen.",
    },
    {
      timeRange: "02 · 25 min",
      title: "How PV Teams Think",
      description: "The 4 validity criteria, seriousness determination, MedDRA coding, and 15-day regulatory clocks.",
    },
    {
      timeRange: "03 · 15 min",
      title: "The Career Map",
      description: "Comparing entry-level tracks: Pharmacovigilance, Clinical Data Management, and Medical Coding.",
    },
    {
      timeRange: "04 · 15 min",
      title: "Live Q&A",
      description: "Open floor for unfiltered questions about your graduation year, resume gaps, and interview prep.",
    },
  ],
  eligibleDegrees: [
    "B.Pharm",
    "M.Pharm",
    "Pharm.D",
    "Life Sciences (B.Sc / M.Sc)",
    "Biotechnology",
    "Other Healthcare / Science Degree",
  ],
};
