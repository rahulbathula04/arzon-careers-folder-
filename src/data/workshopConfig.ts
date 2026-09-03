/**
 * Configuration Layer for Arzon Global Healthcare Career Workshop.
 * Decouples workshop scheduling, URLs, speaker bio, and agenda from JSX components.
 */

export interface WorkshopAgendaItem {
  timeRange: string;
  title: string;
  description: string;
}

export interface WorkshopSpeaker {
  name: string;
  designation: string;
  organizationSummary: string;
  experienceYears: string;
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
  starterKitTitle: string;
  starterKitDescription: string;
  starterKitUrl: string;
  counsellingUrl: string;
  speaker: WorkshopSpeaker;
  agenda: WorkshopAgendaItem[];
  eligibleDegrees: string[];
  capacityLimitText: string;
}

export const WORKSHOP_CONFIG: WorkshopConfig = {
  title: "Healthcare Career Workshop",
  type: "FREE LIVE WORKSHOP",
  dateDisplay: "Upcoming Sunday",
  timeDisplay: "11:00 AM – 12:15 PM IST",
  durationDisplay: "75 Minutes",
  // Standard upcoming Sunday 11:00 AM to 12:15 PM IST
  startIsoDate: "20260308T110000",
  endIsoDate: "20260308T121500",
  platform: "Google Meet",
  meetUrl: "https://meet.google.com/arz-onhc-wrk",
  starterKitTitle: "2026 Healthcare Career Starter Kit",
  starterKitDescription:
    "A practical guide detailing the top entry-level healthcare industry roles (Pharmacovigilance, Clinical Research, Medical Coding) and what corporate hiring managers test during interviews.",
  starterKitUrl: "https://wa.me/919989808381?text=Hi%20Arzon%20Team%2C%20I%20have%20registered%20for%20the%20Healthcare%20Career%20Workshop.%20Please%20share%20my%20Career%20Starter%20Kit.",
  counsellingUrl: "https://wa.me/919989808381?text=Hi%20Arzon%20Team%2C%20I%20would%20like%20to%20schedule%20a%201-on-1%20Career%20Discussion%20following%20the%20workshop.",
  speaker: {
    name: "Mohamed Kumail Abbas",
    designation: "Executive Director & Senior Pharmacovigilance Leader",
    organizationSummary: "Ex-Accenture & Cognizant Drug Safety Practice",
    experienceYears: "20+ Years",
    credibilityPoints: [
      "Over 20 years of hands-on corporate experience in global Pharmacovigilance and Drug Safety operations.",
      "Former leadership roles managing multi-client PV service delivery at Accenture and Cognizant.",
      "Mentored and guided hundreds of pharmacy and life science graduates into entry-level corporate healthcare roles.",
    ],
  },
  agenda: [
    {
      timeRange: "00 – 10 min",
      title: "Healthcare Career Landscape",
      description: "Overview of the modern life sciences ecosystem, CROs, and corporate healthcare tracks.",
    },
    {
      timeRange: "10 – 25 min",
      title: "Roles & Responsibilities",
      description: "What Drug Safety Associates, Clinical Data Coordinators, and Medical Coders do day-to-day.",
    },
    {
      timeRange: "25 – 45 min",
      title: "Practical Industry Example",
      description: "Walkthrough of a live adverse event case report (ICSR) and 4-point regulatory validity check.",
    },
    {
      timeRange: "45 – 55 min",
      title: "Skills & Hiring Expectations",
      description: "The concrete difference between academic college syllabus and corporate workplace requirements.",
    },
    {
      timeRange: "55 – 65 min",
      title: "Career Roadmap",
      description: "Step-by-step guidance on which skills to build and how to prepare for technical screenings.",
    },
    {
      timeRange: "65 – 75 min",
      title: "Live Q&A + Next Steps",
      description: "Open floor for candidate questions and actionable options for structured career guidance.",
    },
  ],
  eligibleDegrees: [
    "B.Pharm",
    "M.Pharm",
    "Pharm.D",
    "B.Sc / M.Sc Biotechnology",
    "Life Sciences Graduates",
    "Recent Healthcare Graduates",
  ],
  capacityLimitText: "Live session capacity: 250 participants on Google Meet",
};
