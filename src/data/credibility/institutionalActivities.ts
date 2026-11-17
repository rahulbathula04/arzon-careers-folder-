/**
 * Institutional Recognition, College Partnerships, Industry Events, and Company Launch Media.
 * Structured data model enabling zero-code updates by the content team.
 */

export interface MediaAsset {
  id: string;
  type: "image" | "video";
  url: string;
  thumbnailUrl: string;
  caption: string;
  videoDuration?: string;
  videoEmbedUrl?: string; // Embedded video or stream URL
  externalArticleUrl?: string;
  externalPublisher?: string;
}

export interface ActivityRecord {
  id: string;
  section: "institutional" | "college-partnerships" | "industry-events" | "company-launch";
  badge: string;
  title: string;
  subtitle: string;
  organization: string;
  date: string;
  location: string;
  description: string;
  keyHighlights: string[];
  media: MediaAsset[];
  externalUrl?: string;
  externalLabel?: string;
}

export const INSTITUTIONAL_ACTIVITIES: ActivityRecord[] = [
  // ── 1. Institutional Recognition: TASK Inauguration ──
  {
    id: "task-inauguration",
    section: "institutional",
    badge: "State Skill Mission",
    title: "TASK Skill Initiative Inauguration",
    subtitle: "Telangana Academy for Skill and Knowledge Healthcare Collaboration",
    organization: "TASK (Govt. of Telangana)",
    date: "Official Partnership Launch",
    location: "Hyderabad, Telangana",
    description:
      "Arzon Global collaborated with the Telangana Academy for Skill and Knowledge (TASK) to deliver specialized healthcare and clinical career readiness tracks for life sciences and pharmacy graduates across Telangana.",
    keyHighlights: [
      "Inaugurated with senior state skill development leadership",
      "Focused on bridging the industry-academia gap in clinical research & PV",
      "Practical curriculum aligned with Hyderabad's pharmaceutical cluster requirements",
    ],
    media: [
      {
        id: "task-media-1",
        type: "image",
        url: "/images/arzon-task-inauguration.png",
        thumbnailUrl: "/images/arzon-task-inauguration.png",
        caption: "TASK Inauguration Ceremony with Arzon Global Leadership & Skill Directors",
        externalArticleUrl: "https://www.bignewsnetwork.com/news/278484034/srmist-hosts-grand-induction-ceremony-welcoming-future-changemakers-to-the-faculty-of-engineering-technology",
        externalPublisher: "BigNewsNetwork",
      },
      {
        id: "task-media-2",
        type: "image",
        url: "/proof/task-partnership.jpg",
        thumbnailUrl: "/proof/task-partnership.jpg",
        caption: "MoU and Collaboration Handover for Healthcare Skill Enablement",
      },
      {
        id: "task-media-3",
        type: "video",
        url: "/images/pv-masterclass-live-session.jpg",
        thumbnailUrl: "/images/pv-masterclass-live-session.jpg",
        caption: "TASK Inaugural Address & Healthcare Career Orientation Keynote",
        videoDuration: "03:45",
        videoEmbedUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ", // fallback placeholder embed
      },
    ],
    externalUrl: "https://www.task.telangana.gov.in",
    externalLabel: "TASK State Portal ↗",
  },

  // ── 2. College Partnerships: Malla Reddy & SRMIST Visits ──
  {
    id: "malla-reddy-visit",
    section: "college-partnerships",
    badge: "Campus Collaboration",
    title: "Malla Reddy College of Pharmacy Visit & Masterclass",
    subtitle: "Clinical Career Preparedness & Drug Safety Orientation",
    organization: "Malla Reddy Pharmacy College",
    date: "Academic Year 2025–2026",
    location: "Maisammaguda, Hyderabad",
    description:
      "Arzon Global conducted hands-on healthcare career masterclasses and mock clinical interview sessions for over 350 final-year B.Pharm and Pharm.D candidates at Malla Reddy College of Pharmacy.",
    keyHighlights: [
      "350+ B.Pharm & Pharm.D candidates engaged in live triage simulations",
      "Hands-on walkthrough of MedDRA terminology and Argus case logging",
      "Direct guidance on CRO hiring cycles and technical interview rubrics",
    ],
    media: [
      {
        id: "mr-media-1",
        type: "image",
        url: "/images/bpharm-students-group.jpg",
        thumbnailUrl: "/images/bpharm-students-group.jpg",
        caption: "Malla Reddy Pharmacy Candidates participating in Arzon Clinical Workshop",
      },
      {
        id: "mr-media-2",
        type: "image",
        url: "/images/pv-clinical-collaboration.jpg",
        thumbnailUrl: "/images/pv-clinical-collaboration.jpg",
        caption: "Interactive case assessment and career counseling breakdown with faculty",
      },
      {
        id: "mr-media-3",
        type: "image",
        url: "/images/pv-recruiter.jpg",
        thumbnailUrl: "/images/pv-recruiter.jpg",
        caption: "Faculty felicitation and industry readiness roadmap presentation",
      },
    ],
    externalUrl: "https://www.selectyouruniversity.com/college/virohan-institute-of-health-and-management-sciences-nagpur-cid-62184/gallery",
    externalLabel: "Partner Institute Profile ↗",
  },
  {
    id: "srmist-grand-induction",
    section: "college-partnerships",
    badge: "University Induction",
    title: "SRMIST Grand Induction & Industry Orientation",
    subtitle: "Welcoming Future Healthcare Changemakers",
    organization: "SRM Institute of Science and Technology",
    date: "Annual Academic Induction",
    location: "SRMIST Campus",
    description:
      "Arzon Global participated in welcoming engineering and life sciences students, sharing industry insights on healthcare informatics, clinical data management, and the evolution of AI in pharmacovigilance.",
    keyHighlights: [
      "Keynote delivered on clinical informatics career trajectories",
      "Coverage featured across national news wire networks",
      "Interactive Q&A covering global regulatory compliance requirements",
    ],
    media: [
      {
        id: "srm-media-1",
        type: "image",
        url: "/images/pv-student-hero.jpg",
        thumbnailUrl: "/images/pv-student-hero.jpg",
        caption: "SRMIST Induction Hall: Industry Keynote Session on Healthcare Tech",
        externalArticleUrl: "https://www.bignewsnetwork.com/news/278484034/srmist-hosts-grand-induction-ceremony-welcoming-future-changemakers-to-the-faculty-of-engineering-technology",
        externalPublisher: "BigNewsNetwork Coverage",
      },
      {
        id: "srm-media-2",
        type: "image",
        url: "/images/industry-network/about-students.webp",
        thumbnailUrl: "/images/industry-network/about-students.webp",
        caption: "Student changemakers discussing career pathways with mentors",
      },
    ],
    externalUrl: "https://www.bignewsnetwork.com/news/278484034/srmist-hosts-grand-induction-ceremony-welcoming-future-changemakers-to-the-faculty-of-engineering-technology",
    externalLabel: "Read News Coverage ↗",
  },

  // ── 3. Industry Events: Phase Connect Healthcare Summit ──
  {
    id: "phase-connect-summit",
    section: "industry-events",
    badge: "Industry Summit",
    title: "Phase Connect Healthcare & Clinical Networking Summit",
    subtitle: "Connecting Clinical Research Experts, CROs & Talented Graduates",
    organization: "Phase Connect Healthcare Forum",
    date: "Annual Summit",
    location: "HITEC City, Hyderabad",
    description:
      "Phase Connect brought together clinical trial managers, drug safety leads, biostatisticians, and recruiters to discuss evolving GCP guidelines, electronic data capture, and post-marketing surveillance demands.",
    keyHighlights: [
      "Panel discussions on 2026 Pharmacovigilance regulatory audits",
      "Networking between 40+ CRO talent acquisition executives and Arzon alumni",
      "Exhibition of real-world Argus Safety and MedDRA case coding projects",
    ],
    media: [
      {
        id: "pc-media-1",
        type: "image",
        url: "/images/industry-network/feature-summit.webp",
        thumbnailUrl: "/images/industry-network/feature-summit.webp",
        caption: "Phase Connect Healthcare Executive Panel & Arzon Global Presentation",
      },
      {
        id: "pc-media-2",
        type: "image",
        url: "/images/industry-network/feature-awards.webp",
        thumbnailUrl: "/images/industry-network/feature-awards.webp",
        caption: "Clinical Education Excellence Recognition at Phase Connect",
      },
      {
        id: "pc-media-3",
        type: "image",
        url: "/images/industry-network/collab-leads-new.webp",
        thumbnailUrl: "/images/industry-network/collab-leads-new.webp",
        caption: "Industry roundtable on real-world evidence and safety informatics",
      },
    ],
  },

  // ── 4. Company Launch: Arzon Global Genesis & Vision ──
  {
    id: "arzon-company-launch",
    section: "company-launch",
    badge: "Foundational Milestone",
    title: "Arzon Global Headquarters & Career Platform Launch",
    subtitle: "Pioneering Role-Readiness for India's Healthcare Graduates",
    organization: "Arzon Global Private Limited",
    date: "Foundation Milestone",
    location: "Madhapur, Hyderabad",
    description:
      "Arzon Global was launched with the core mission: 'Guiding healthcare talent to meaningful careers.' The launch gathered industry mentors, academic deans, and life sciences professionals to inaugurate our state-of-the-art training and career intelligence hub.",
    keyHighlights: [
      "Inauguration of modern healthcare informatics computer labs in Madhapur",
      "Launch of the proprietary Arzon Career Readiness Index (ACRI)",
      "Unveiling of verified role-readiness curricula for Pharmacovigilance & Coding",
    ],
    media: [
      {
        id: "launch-media-1",
        type: "image",
        url: "/images/industry-network/arzon-corporate-headquarters.webp",
        thumbnailUrl: "/images/industry-network/arzon-corporate-headquarters.webp",
        caption: "Arzon Global Madhapur Headquarters & Healthcare Training Facility",
      },
      {
        id: "launch-media-2",
        type: "video",
        url: "/images/pv-masterclass-live-session.jpg",
        thumbnailUrl: "/images/pv-masterclass-live-session.jpg",
        caption: "Arzon Global Foundation Address: Mission & Career Vision",
        videoDuration: "04:12",
        videoEmbedUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
      },
      {
        id: "launch-media-3",
        type: "image",
        url: "/images/industry-network/hero-outcomes-dossier.webp",
        thumbnailUrl: "/images/industry-network/hero-outcomes-dossier.webp",
        caption: "Inauguration of Career Dossier and Student Competency Framework",
      },
    ],
  },
];
