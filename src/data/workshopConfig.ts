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
  totalCapacity: number;
  baselineAllocated: number;
  capacityLimitText?: string;
  startIsoDate: string; // ISO format for Google Calendar (Asia/Kolkata)
  endIsoDate: string;
  platform: string;
  meetUrl: string;
  speaker: WorkshopSpeaker;
  agenda: WorkshopAgendaItem[];
  eligibleDegrees: string[];
}

export const WORKSHOP_CONFIG: WorkshopConfig = {
  title: "B.Pharm Career Intelligence 2026: Live Market Decoding & Career Map",
  type: "LIVE CAREER INTELLIGENCE MASTERCLASS",
  dateDisplay: "Saturday, 19 September 2026",
  timeDisplay: "6:00 PM – 7:15 PM IST",
  durationDisplay: "75 Minutes",
  totalCapacity: 500,
  baselineAllocated: 412,
  capacityLimitText: "High demand: Direct Google Meet stream & session recording guaranteed for registered candidates.",
  startIsoDate: "20260919T123000Z", // 6:00 PM IST (UTC+5:30)
  endIsoDate: "20260919T134500Z",   // 7:15 PM IST (UTC+5:30)
  platform: "Google Meet",
  meetUrl: "https://meet.google.com/pyc-qvxs-quz",
  speaker: {
    name: "Mohamed Kumail Abbas",
    designation: "15+ Yrs Healthcare & Safety Leader",
    education: "M.Pharm",
    organizationSummary: "Career across Quintiles, Indegene, Norwich Clinical, Accenture, Cognizant and Novaspire",
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
      "15+ years operations management across global CROs & IT healthcare units",
      "Direct employer insight into candidate screening & fresher skill expectations",
      "Trained 1,000+ pharmacy & life science graduates for corporate roles",
    ],
  },
  agenda: [
    {
      timeRange: "01 · 10 min",
      title: "B.Pharm Career Landscape 2026",
      description: "Deconstructing non-sales healthcare corporate roles, entry volumes, and market shifts across India.",
    },
    {
      timeRange: "02 · 15 min",
      title: "15+ Career Paths & Fresher Accessibility",
      description: "Detailed mapping of PV, Medical Coding, CDM, Regulatory Affairs, Medical Writing & Healthcare Analytics.",
    },
    {
      timeRange: "03 · 15 min",
      title: "What Employers Actually Ask For",
      description: "Empirical skill requirements and tool prerequisites extracted from 2,180+ analyzed entry-level job descriptions.",
    },
    {
      timeRange: "04 · 15 min",
      title: "Skills, Tools & Certification Reality",
      description: "Separating high-value technical tools (Argus, MedDRA, Advanced Excel, SAS) from paid generic certificates.",
    },
    {
      timeRange: "05 · 10 min",
      title: "Salary Bands & 3-Year Progression",
      description: "Realistic starting compensation ranges (₹2.3 LPA to ₹6.5 LPA) and long-term career growth trajectories.",
    },
    {
      timeRange: "06 · 10 min",
      title: "Live Q&A & Personal Career Fit Plan",
      description: "Unfiltered answers regarding graduation years, degree background, resume gaps, and 90-day action plans.",
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

/**
 * Canonical Google Calendar URL generator.
 * Keeps event title, UTC dates, Meet room URL, and description strictly in sync.
 */
export function buildGoogleCalendarUrl(config: WorkshopConfig = WORKSHOP_CONFIG): string {
  const title = encodeURIComponent(config.title);
  const dates = `${config.startIsoDate}/${config.endIsoDate}`;
  const details = encodeURIComponent(
    `Join Google Meet:\n${config.meetUrl}\n\nSession: ${config.title}\nFaculty: ${config.speaker.name} (${config.speaker.designation})\nLive working walkthrough of adverse drug event triage, MedDRA coding, and safety operational workflows.`
  );
  const location = encodeURIComponent(config.meetUrl);
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}&ctz=Asia/Kolkata`;
}
