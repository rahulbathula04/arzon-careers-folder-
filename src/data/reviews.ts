/**
 * Review and learner-feedback registry.
 *
 * Important:
 * - External ratings are kept separate from first-party testimonials.
 * - We do not invent review text.
 * - First-party feedback is labelled as published by Arzon.
 * - Social feedback is labelled as a public learner post, not a formal
 *   third-party review.
 */

export type ReviewSource =
  | "Google Business Profile"
  | "Justdial"
  | "Arzon Careers"
  | "LinkedIn public post";

export interface PublishedReview {
  id: string;
  author: string;
  rating?: number;
  body: string;
  datePublished?: string;
  degree?: string;
  college?: string;
  domain: string;
  source: ReviewSource;
  sourceLabel: string;
  sourceUrl: string;
  verificationNote: string;
}

export const EXTERNAL_RATINGS = [
  {
    platform: "Google Business Profile",
    rating: 4.5,
    reviewCount: 446,
    location: "Madhapur, Hyderabad",
    sourceUrl:
      "https://www.google.com/maps/search/?api=1&query=Arzon%20Global%2C%201st%20floor%2C%20S%20Chandra%20Reddy%20Towers%2C%20100%20Feet%20Rd%2C%20Madhapur%2C%20Hyderabad",
  },
  {
    platform: "Justdial",
    rating: 4.5,
    reviewCount: 445,
    location: "Madhapur, Hyderabad",
    sourceUrl:
      "https://www.justdial.com/Hyderabad/Arzon-Global-Madhapur/040PXX40-XX40-250926040554-X8L3_BZDET",
  },
] as const;

export const REVIEWS: PublishedReview[] = [
  {
    id: "arzon-ananya-sharma",
    author: "Ananya Sharma",
    rating: 5,
    degree: "B.Pharm 2025",
    college: "JSS College of Pharmacy, Ooty",
    domain: "Pharmacovigilance",
    body:
      "She said the session helped her compare Pharmacovigilance, Medical Coding and Sales using employer requirements and gave her clearer direction toward PV.",
    datePublished: "2026-08-14",
    source: "Arzon Careers",
    sourceLabel: "Published on Arzon Careers",
    sourceUrl: "https://www.arzoncareers.in/healthcare-career-workshop",
    verificationNote: "First-party feedback published by Arzon. Not presented as an independent review.",
  },
  {
    id: "arzon-rohan-kulkarni",
    author: "Rohan Kulkarni",
    rating: 5,
    degree: "B.Pharm 2024",
    college: "Bombay College of Pharmacy, Mumbai",
    domain: "Clinical Data Management",
    body:
      "He described the hiring-market map as useful for understanding what CROs screen for in EDC platforms and said it gave him career clarity.",
    datePublished: "2026-08-02",
    source: "Arzon Careers",
    sourceLabel: "Published on Arzon Careers",
    sourceUrl: "https://www.arzoncareers.in/healthcare-career-workshop",
    verificationNote: "First-party feedback published by Arzon. Not presented as an independent review.",
  },
  {
    id: "arzon-kavya-reddy",
    author: "Kavya Reddy",
    rating: 5,
    degree: "B.Pharm 2025",
    college: "Osmania University, Hyderabad",
    domain: "Medical Coding & RCM",
    body:
      "She said Arzon's career map and fresher-access breakdown helped her understand the options before deciding whether to pursue a programme.",
    datePublished: "2026-07-28",
    source: "Arzon Careers",
    sourceLabel: "Published on Arzon Careers",
    sourceUrl: "https://www.arzoncareers.in/healthcare-career-workshop",
    verificationNote: "First-party feedback published by Arzon. Not presented as an independent review.",
  },
  {
    id: "arzon-pranav-teja",
    author: "Pranav Teja",
    rating: 5,
    degree: "M.Pharm Pharmacology",
    college: "NIPER Hyderabad",
    domain: "Regulatory Affairs",
    body:
      "He highlighted the practical discussion of eCTD dossier structures and global safety-reporting timelines.",
    datePublished: "2026-07-19",
    source: "Arzon Careers",
    sourceLabel: "Published on Arzon Careers",
    sourceUrl: "https://www.arzoncareers.in/healthcare-career-workshop",
    verificationNote: "First-party feedback published by Arzon. Not presented as an independent review.",
  },
  {
    id: "arzon-vikramaditya-rao",
    author: "Vikramaditya Rao",
    rating: 5,
    degree: "Pharm.D 2025",
    college: "SRM College of Pharmacy, Chennai",
    domain: "Pharmacovigilance",
    body:
      "He praised the separation between essential technical tools and lower-value certificates and described the session as transparent career guidance.",
    datePublished: "2026-06-22",
    source: "Arzon Careers",
    sourceLabel: "Published on Arzon Careers",
    sourceUrl: "https://www.arzoncareers.in/healthcare-career-workshop",
    verificationNote: "First-party feedback published by Arzon. Not presented as an independent review.",
  },
  {
    id: "arzon-siddharth-verma",
    author: "Siddharth Verma",
    rating: 5,
    degree: "B.Sc Biotechnology",
    college: "Jamia Hamdard, New Delhi",
    domain: "Clinical Research",
    body:
      "He said the fresher-access information helped him understand where life-sciences graduates can qualify alongside pharmacy graduates.",
    datePublished: "2026-05-30",
    source: "Arzon Careers",
    sourceLabel: "Published on Arzon Careers",
    sourceUrl: "https://www.arzoncareers.in/healthcare-career-workshop",
    verificationNote: "First-party feedback published by Arzon. Not presented as an independent review.",
  },

  {
    id: "linkedin-brahmananda-pv",
    author: "Brahmananda Salagundi",
    degree: "B.Pharm",
    college: "Dayanand Sagar College of Pharmacy",
    domain: "Pharmacovigilance",
    body:
      "In a public LinkedIn post, he described his Arzon Global Labs Pharmacovigilance internship as providing practical exposure to ADR reporting, ICSR processing, MedDRA coding, literature review, signal detection and drug-safety work.",
    source: "LinkedIn public post",
    sourceLabel: "Public LinkedIn learner post",
    sourceUrl: "https://in.linkedin.com/in/brahmananda-salagundi-1b24b5380",
    verificationNote: "Public learner post. This is not a Google rating and is not used in the external star-rating aggregate.",
  },
  {
    id: "linkedin-aakanksha-pv",
    author: "Aakanksha Dandnaik",
    domain: "Pharmacovigilance",
    body:
      "A public LinkedIn post describes completion of an Arzon Global Labs Pharmacovigilance internship and mentions practical exposure to ADR reporting, ICSR work, signal detection and drug-safety regulations.",
    source: "LinkedIn public post",
    sourceLabel: "Public LinkedIn learner post",
    sourceUrl: "https://in.linkedin.com/in/krushna-deshmukh2379",
    verificationNote: "Public learner post surfaced through LinkedIn activity. The source page is not a formal review platform.",
  },
  {
    id: "linkedin-abhinaya-fullstack",
    author: "Abhinaya Lakshmi",
    domain: "Full-Stack Development",
    body:
      "A public LinkedIn post describes completing a Full-Stack Web Development internship at Arzon Global Labs, with exposure to React, Node.js, REST APIs, SQL, Git and responsive web development.",
    source: "LinkedIn public post",
    sourceLabel: "Public LinkedIn learner post",
    sourceUrl: "https://in.linkedin.com/in/meghana-palli-007b732b9",
    verificationNote: "Public learner post surfaced through LinkedIn activity. The source page is not a formal review platform.",
  },
  {
    id: "linkedin-abdul-workshop",
    author: "Abdul Kadir",
    domain: "Pharmacy workshop",
    body:
      "A public LinkedIn post describes an Arzon Global Labs workshop as a useful platform for skill development, new ideas and interaction with industry professionals.",
    source: "LinkedIn public post",
    sourceLabel: "Public LinkedIn learner post",
    sourceUrl: "https://in.linkedin.com/in/abdul-kadir-89469233b",
    verificationNote: "Public learner post. It is presented as learner feedback, not a formal star rating.",
  },
  {
    id: "linkedin-suraj-workshop",
    author: "Suraj Bangar",
    domain: "Pharmacy workshop",
    body:
      "A public LinkedIn post says an Arzon Global Labs workshop was insightful and helped expand the learner's knowledge through exposure to industry experts.",
    source: "LinkedIn public post",
    sourceLabel: "Public LinkedIn learner post",
    sourceUrl: "https://in.linkedin.com/in/suraj-bangar-775128301",
    verificationNote: "Public learner post. It is presented as learner feedback, not a formal star rating.",
  },
  {
    id: "linkedin-rajendra-ai",
    author: "Rajendra Singh",
    domain: "AI in Healthcare",
    body:
      "A public LinkedIn post describes completing Arzon Global Labs training in Pharmacy Applications of AI, including AI in drug discovery and development, healthcare diagnostics and personalised medicine.",
    source: "LinkedIn public post",
    sourceLabel: "Public LinkedIn learner post",
    sourceUrl: "https://in.linkedin.com/in/rajendra-singh-63b06a332",
    verificationNote: "Public learner post. It is presented as learner feedback, not a formal star rating.",
  },
  {
    id: "linkedin-priya-campus",
    author: "Priya Harshitha Vanapalli",
    domain: "Campus ambassador",
    body:
      "A public LinkedIn post expresses thanks to Arzon Global for a Campus Ambassador certification.",
    source: "LinkedIn public post",
    sourceLabel: "Public LinkedIn learner post",
    sourceUrl: "https://in.linkedin.com/in/priya-harshitha-vanapalli-a9b011309",
    verificationNote: "Public learner post. It is presented as learner feedback, not a formal star rating.",
  },
];
