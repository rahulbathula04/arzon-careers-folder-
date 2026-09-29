/**
 * Source-backed review and learner-feedback registry.
 *
 * Rules:
 * - External platform ratings stay separate from individual feedback.
 * - No review text is invented.
 * - First-party feedback is explicitly labelled.
 * - Public social posts are labelled as public learner posts, not star ratings.
 * - The UI uses a stable client-side cursor for batched infinite scrolling.
 */

export type ReviewSource =
  | "Google Business Profile"
  | "Justdial"
  | "Arzon Careers"
  | "LinkedIn public post";

export type ReviewSourceKind = "third-party" | "first-party" | "public-post";

export type ReviewCategory =
  | "Pharmacovigilance"
  | "Medical Coding"
  | "Clinical Research"
  | "Regulatory Affairs"
  | "AI in Healthcare"
  | "Workshops"
  | "Internships"
  | "Career Guidance"
  | "Full-Stack Development";

export interface PublishedReview {
  id: string;
  author: string;
  rating?: number;
  body: string;
  degree?: string;
  college?: string;
  domain: ReviewCategory;
  source: ReviewSource;
  sourceKind: ReviewSourceKind;
  sourceLabel: string;
  sourceUrl: string;
  verificationNote: string;
}

export const GOOGLE_RATING = {
  ratingValue: 4.5,
  reviewCount: 447,
  sourceUrl:
    "https://www.google.com/maps/search/?api=1&query=Arzon%20Global%2C%201st%20floor%2C%20S%20Chandra%20Reddy%20Towers%2C%20100%20Feet%20Rd%2C%20Madhapur%2C%20Hyderabad",
} as const;

export const AGGREGATE_RATING = GOOGLE_RATING;

export const EXTERNAL_RATINGS = [
  {
    platform: "Google Business Profile",
    rating: 4.5,
    reviewCount: 447,
    location: "Madhapur, Hyderabad",
    sourceUrl: GOOGLE_RATING.sourceUrl,
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
    id: "linkedin-brahmananda-pv",
    author: "Brahmananda Salagundi",
    degree: "B.Pharm",
    college: "Dayanand Sagar College of Pharmacy",
    domain: "Pharmacovigilance",
    body:
      "He described his Pharmacovigilance internship as giving him practical exposure to ADR reporting, ICSR processing, MedDRA coding, literature review, regulatory guidelines and signal detection.",
    source: "LinkedIn public post",
    sourceKind: "public-post",
    sourceLabel: "Public LinkedIn learner post",
    sourceUrl: "https://in.linkedin.com/in/brahmananda-salagundi-1b24b5380",
    verificationNote:
      "Public learner post. Presented as learner feedback, not as a Google or marketplace rating.",
  },
  {
    id: "linkedin-sanobar-workshop",
    author: "Sanobar Inamdar",
    domain: "Workshops",
    body:
      "She described an Arzon Global workshop as a career guide that helped her understand Pharmacovigilance, Medical Coding, Medical Writing and the role of AI in pharma, including advice on positioning herself within a company.",
    source: "LinkedIn public post",
    sourceKind: "public-post",
    sourceLabel: "Public LinkedIn learner post",
    sourceUrl: "https://in.linkedin.com/in/sanobar-inamdar-94ba0b349",
    verificationNote:
      "Public learner post visible on the author's LinkedIn profile.",
  },
  {
    id: "linkedin-abhinaya-fullstack",
    author: "Abhinaya Lakshmi",
    domain: "Full-Stack Development",
    body:
      "She described completing a Full-Stack Web Development internship with exposure to HTML, CSS, JavaScript, React, Node.js, REST APIs, SQL, Git and responsive web development.",
    source: "LinkedIn public post",
    sourceKind: "public-post",
    sourceLabel: "Public LinkedIn learner post",
    sourceUrl: "https://in.linkedin.com/in/meghana-palli-007b732b9",
    verificationNote:
      "Public learner post surfaced through the public LinkedIn activity of the referenced profile.",
  },
  {
    id: "linkedin-abdul-workshop",
    author: "Abdul Kadir",
    domain: "Workshops",
    body:
      "He described an Arzon Global Labs workshop as a platform to enhance skills, explore new ideas and interact with industry professionals.",
    source: "LinkedIn public post",
    sourceKind: "public-post",
    sourceLabel: "Public LinkedIn learner post",
    sourceUrl: "https://in.linkedin.com/in/abdul-kadir-89469233",
    verificationNote:
      "Public learner post. It is not presented as a formal star rating.",
  },
  {
    id: "linkedin-ayesha-ai",
    author: "Ayesha SHAIKH",
    domain: "AI in Healthcare",
    body:
      "She said an AI in Pharmacy knowledge session conducted by Arzon Global Labs improved her understanding of how AI can support drug discovery, data analysis and decision-making in pharmaceutical research.",
    source: "LinkedIn public post",
    sourceKind: "public-post",
    sourceLabel: "Public LinkedIn learner post",
    sourceUrl: "https://in.linkedin.com/in/ayesha-shaikh-230857309",
    verificationNote:
      "Public learner post visible on the author's LinkedIn profile.",
  },
  {
    id: "linkedin-rajendra-ai",
    author: "Rajendra Singh",
    domain: "AI in Healthcare",
    body:
      "He described completing Pharmacy Applications of Artificial Intelligence training and highlighted AI integration in drug discovery and development, healthcare diagnostics, personalized medicine and pharmaceutical research.",
    source: "LinkedIn public post",
    sourceKind: "public-post",
    sourceLabel: "Public LinkedIn learner post",
    sourceUrl: "https://in.linkedin.com/in/rajendra-singh-63b06a332",
    verificationNote:
      "Public learner post. It is presented as learner feedback, not a formal star rating.",
  },
  {
    id: "linkedin-sankaranarayanan-ai",
    author: "SANKARANARAYANAN A",
    domain: "Career Guidance",
    body:
      "He described an Arzon Global workshop on AI in Pharma as giving him insight into how artificial intelligence is changing pharma, emerging career opportunities and future skill requirements.",
    source: "LinkedIn public post",
    sourceKind: "public-post",
    sourceLabel: "Public LinkedIn learner post",
    sourceUrl: "https://in.linkedin.com/in/sankaranarayanan-a-614569360",
    verificationNote:
      "Public learner post. It is presented as workshop feedback, not a star rating.",
  },
  {
    id: "linkedin-vaishnavi-internship",
    author: "Vaishnavi Dongare",
    degree: "B.Pharm",
    college: "Dr. Babasaheb Ambedkar Technological University",
    domain: "Internships",
    body:
      "Her public LinkedIn profile lists a three-month AI in Healthcare internship with Arzon Global Labs during 2026, alongside other pharmacy learning activities.",
    source: "LinkedIn public post",
    sourceKind: "public-post",
    sourceLabel: "Public LinkedIn profile",
    sourceUrl: "https://in.linkedin.com/in/vaishnavi-dongare-51a0a9310",
    verificationNote:
      "Public profile evidence of an Arzon internship. This is not a star rating or a written review.",
  },
  {
    id: "linkedin-suraj-workshop",
    author: "Suraj Bangar",
    domain: "Workshops",
    body:
      "He described an Arzon Global Labs workshop as insightful and said it helped him learn from industry experts and expand his knowledge.",
    source: "LinkedIn public post",
    sourceKind: "public-post",
    sourceLabel: "Public LinkedIn learner post",
    sourceUrl: "https://in.linkedin.com/in/suraj-bangar-775128301",
    verificationNote:
      "Public learner post. It is presented as learner feedback, not a formal rating.",
  },
  {
    id: "linkedin-priya-campus",
    author: "Priya Harshitha Vanapalli",
    domain: "Career Guidance",
    body:
      "She publicly thanked Arzon Global for a Campus Ambassador certification and shared the certification milestone on LinkedIn.",
    source: "LinkedIn public post",
    sourceKind: "public-post",
    sourceLabel: "Public LinkedIn learner post",
    sourceUrl: "https://in.linkedin.com/in/priya-harshitha-vanapalli-a9b011309",
    verificationNote:
      "Public learner post. It is presented as a public experience, not a star rating.",
  },
  {
    id: "arzon-ananya-sharma",
    author: "Ananya Sharma",
    degree: "B.Pharm",
    college: "JSS College of Pharmacy, Ooty",
    domain: "Pharmacovigilance",
    body:
      "Arzon's published workshop feedback says the session helped her compare Pharmacovigilance, Medical Coding and Sales using employer requirements and gave her clearer direction toward PV.",
    source: "Arzon Careers",
    sourceKind: "first-party",
    sourceLabel: "Published on Arzon Careers",
    sourceUrl: "https://www.arzoncareers.in/healthcare-career-workshop",
    verificationNote:
      "First-party feedback published by Arzon. Not presented as an independent review.",
  },
  {
    id: "arzon-rohan-kulkarni",
    author: "Rohan Kulkarni",
    degree: "B.Pharm",
    college: "Bombay College of Pharmacy, Mumbai",
    domain: "Clinical Research",
    body:
      "Arzon's published workshop feedback says he found the hiring-market map useful for understanding what CROs screen for in EDC platforms and that it gave him career clarity.",
    source: "Arzon Careers",
    sourceKind: "first-party",
    sourceLabel: "Published on Arzon Careers",
    sourceUrl: "https://www.arzoncareers.in/healthcare-career-workshop",
    verificationNote:
      "First-party feedback published by Arzon. Not presented as an independent review.",
  },
  {
    id: "arzon-kavya-reddy",
    author: "Kavya Reddy",
    degree: "B.Pharm",
    college: "Osmania University, Hyderabad",
    domain: "Medical Coding",
    body:
      "Arzon's published workshop feedback says its career map and fresher-access breakdown helped her understand her options before deciding whether to pursue a programme.",
    source: "Arzon Careers",
    sourceKind: "first-party",
    sourceLabel: "Published on Arzon Careers",
    sourceUrl: "https://www.arzoncareers.in/healthcare-career-workshop",
    verificationNote:
      "First-party feedback published by Arzon. Not presented as an independent review.",
  },
  {
    id: "arzon-pranav-teja",
    author: "Pranav Teja",
    degree: "M.Pharm Pharmacology",
    college: "NIPER Hyderabad",
    domain: "Regulatory Affairs",
    body:
      "Arzon's published workshop feedback says he highlighted the practical discussion of eCTD dossier structures and global safety-reporting timelines.",
    source: "Arzon Careers",
    sourceKind: "first-party",
    sourceLabel: "Published on Arzon Careers",
    sourceUrl: "https://www.arzoncareers.in/healthcare-career-workshop",
    verificationNote:
      "First-party feedback published by Arzon. Not presented as an independent review.",
  },
  {
    id: "arzon-vikramaditya-rao",
    author: "Vikramaditya Rao",
    degree: "Pharm.D",
    college: "SRM College of Pharmacy, Chennai",
    domain: "Pharmacovigilance",
    body:
      "Arzon's published workshop feedback says he valued the distinction between essential technical tools and lower-value certificates and described the session as transparent career guidance.",
    source: "Arzon Careers",
    sourceKind: "first-party",
    sourceLabel: "Published on Arzon Careers",
    sourceUrl: "https://www.arzoncareers.in/healthcare-career-workshop",
    verificationNote:
      "First-party feedback published by Arzon. Not presented as an independent review.",
  },
  {
    id: "arzon-siddharth-verma",
    author: "Siddharth Verma",
    degree: "B.Sc Biotechnology",
    college: "Jamia Hamdard, New Delhi",
    domain: "Career Guidance",
    body:
      "Arzon's published workshop feedback says the fresher-access information helped him understand where life-sciences graduates can qualify alongside pharmacy graduates.",
    source: "Arzon Careers",
    sourceKind: "first-party",
    sourceLabel: "Published on Arzon Careers",
    sourceUrl: "https://www.arzoncareers.in/healthcare-career-workshop",
    verificationNote:
      "First-party feedback published by Arzon. Not presented as an independent review.",
  },
];

export const REVIEW_CATEGORIES: Array<"All" | ReviewCategory> = [
  "All",
  "Pharmacovigilance",
  "Medical Coding",
  "Clinical Research",
  "Regulatory Affairs",
  "AI in Healthcare",
  "Workshops",
  "Internships",
  "Career Guidance",
  "Full-Stack Development",
];
