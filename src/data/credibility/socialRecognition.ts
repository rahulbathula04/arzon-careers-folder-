/**
 * Professional Recognition, LinkedIn Certification Sharing, and Social Media Integration.
 */

export interface LinkedInShareConfig {
  certName: string;
  organizationName: string;
  issueYear: string;
  issueMonth: string;
  certUrl: string;
}

export function buildLinkedInAddUrl(config: LinkedInShareConfig): string {
  const params = new URLSearchParams({
    startTask: "CERTIFICATION_NAME",
    name: config.certName,
    organizationName: config.organizationName || "Arzon Global",
    issueYear: config.issueYear,
    issueMonth: config.issueMonth,
    certUrl: config.certUrl,
  });
  return `https://www.linkedin.com/profile/add?${params.toString()}`;
}

export interface SocialPost {
  id: string;
  platform: "LinkedIn" | "Instagram";
  author: string;
  authorTitle: string;
  avatarUrl?: string;
  date: string;
  postSnippet: string;
  postUrl: string;
  engagement: string;
  tag: string;
  imagePreview?: string;
}

export const SOCIAL_POSTS: SocialPost[] = [
  {
    id: "social-li-1",
    platform: "LinkedIn",
    author: "Harika Challa",
    authorTitle: "Pharmacovigilance Trainee | B.Pharm 2024",
    avatarUrl: "/images/testimonials/sneha-rao.jpg",
    date: "Public LinkedIn Post",
    postSnippet:
      "Excited to share that I have completed the Pharmacovigilance & Drug Safety training with Arzon Global. Working directly on Argus case intake and MedDRA coding simulations was the game changer for my interviews!",
    postUrl: "https://www.linkedin.com/company/arzon-global",
    engagement: "142 reactions · 18 comments",
    tag: "Certified Alumni",
    imagePreview: "/proof/cert-internship.webp",
  },
  {
    id: "social-li-2",
    platform: "LinkedIn",
    author: "Mohammed Asif",
    authorTitle: "Junior Medical Coder | Life Sciences Graduate",
    avatarUrl: "/images/testimonials/aman-d.jpg",
    date: "Public LinkedIn Post",
    postSnippet:
      "Just received my official Certificate of Completion in Medical Coding from Arzon Global. Grateful to the faculty for drilling CPT modifiers and ICD-10 guidelines until it became second nature.",
    postUrl: "https://www.linkedin.com/company/arzon-global",
    engagement: "98 reactions · 12 comments",
    tag: "CPC Prepared",
    imagePreview: "/proof/cert-project.webp",
  },
  {
    id: "social-ig-1",
    platform: "Instagram",
    author: "@arzonglobal_careers",
    authorTitle: "Official Instagram Channel",
    avatarUrl: "/brand/arzon-icon.webp",
    date: "Recent Reel & Story",
    postSnippet:
      "Highlights from our recent campus drive and practical workshop at Malla Reddy Pharmacy College! 350+ future healthcare changemakers diving into clinical research.",
    postUrl: "https://www.instagram.com/arzoncareers",
    engagement: "1.2k views · 85 saves",
    tag: "Campus Highlights",
    imagePreview: "/images/bpharm-students-group.jpg",
  },
  {
    id: "social-ig-2",
    platform: "Instagram",
    author: "@arzonglobal_careers",
    authorTitle: "Official Instagram Channel",
    avatarUrl: "/brand/arzon-icon.webp",
    date: "Community Spotlight",
    postSnippet:
      "Behind the scenes at our Hyderabad Madhapur training lab. Hands-on case processing session with our active Pharmacovigilance cohort.",
    postUrl: "https://www.instagram.com/arzoncareers",
    engagement: "950 views · 64 likes",
    tag: "Lab Life",
    imagePreview: "/images/pv-masterclass-live-session.jpg",
  },
];
