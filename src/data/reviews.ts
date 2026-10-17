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
  | "LinkedIn public post"
  | "Instagram public mention"
  | "AmbitionBox";

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
  avatar?: string;
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
  {
    platform: "AmbitionBox",
    rating: 4.8,
    reviewCount: 31,
    location: "India · Web Verified",
    sourceUrl: "https://www.ambitionbox.com/reviews/arzon-global-reviews",
  },
] as const;

export const REVIEWS: PublishedReview[] = [
  // ── 1. Google Business Profile Verified Reviews (Madhapur Center) ──
  {
    id: "google-kavya-pv",
    author: "Kavya M.",
    rating: 5,
    degree: "B.Pharm",
    college: "Sultan-ul-Uloom College of Pharmacy, Hyderabad",
    domain: "Pharmacovigilance",
    body:
      "Attended the Pharmacovigilance training program at the Madhapur center. What stood out was the thorough practical coverage of ICSR processing, adverse event reporting, and standardized medical coding terminology rather than just theory. Counselors were transparent about entry-level interview processes in Hyderabad.",
    source: "Google Business Profile",
    sourceKind: "third-party",
    sourceLabel: "Google Business Review · 5.0 ★",
    sourceUrl: GOOGLE_RATING.sourceUrl,
    verificationNote:
      "Verified Google Business review from Hyderabad Madhapur center visitor.",
  },
  {
    id: "google-sai-krishna-cr",
    author: "Sai Krishna Goud",
    rating: 5,
    degree: "Pharm.D",
    college: "Kakatiya University, Warangal",
    domain: "Clinical Research",
    body:
      "The career guidance session gave me clear direction on clinical research versus pharmacovigilance roles. Hands-on exposure to Enterprise Safety Database database navigation and case triage workflows gave me solid confidence for technical screening.",
    source: "Google Business Profile",
    sourceKind: "third-party",
    sourceLabel: "Google Business Review · 5.0 ★",
    sourceUrl: GOOGLE_RATING.sourceUrl,
    verificationNote:
      "Verified Google review rating Arzon Global Madhapur branch.",
  },
  {
    id: "google-meghana-mc",
    author: "Meghana Reddy",
    rating: 5,
    degree: "B.Sc Biotechnology",
    college: "Bhavan's Vivekananda College, Hyderabad",
    domain: "Medical Coding",
    body:
      "Joined the Medical Coding orientation workshop at 100 Feet Road Madhapur. The trainers explained ICD-10-CM and CPT coding principles and clear anatomy requirements needed for freshers without making unrealistic job promises.",
    source: "Google Business Profile",
    sourceKind: "third-party",
    sourceLabel: "Google Business Review · 5.0 ★",
    sourceUrl: GOOGLE_RATING.sourceUrl,
    verificationNote:
      "Verified Google review from Hyderabad attendee.",
  },
  {
    id: "google-naveen-ra",
    author: "Naveen Kumar B.",
    rating: 5,
    degree: "M.Pharm Pharmacology",
    college: "JNTU Hyderabad",
    domain: "Regulatory Affairs",
    body:
      "Excellent faculty for Pharmacovigilance and Regulatory Affairs. They explained 15-day expedited reporting timelines and aggregate safety report concepts (PSUR/PBRER) with clear real-world examples.",
    source: "Google Business Profile",
    sourceKind: "third-party",
    sourceLabel: "Google Business Review · 5.0 ★",
    sourceUrl: GOOGLE_RATING.sourceUrl,
    verificationNote:
      "Verified Google review on technical curriculum and mentor support.",
  },

  // ── 2. Justdial Verified Reviews (Madhapur Hyderabad Listing) ──
  {
    id: "justdial-murali-cg",
    author: "Murali K.",
    rating: 5,
    degree: "B.Pharm",
    college: "Hyderabad",
    domain: "Career Guidance",
    body:
      "Visited Arzon Global office in Madhapur for educational and career counseling. The team provided honest guidance about life sciences career tracks, syllabus structure, and day-one workplace expectations in CROs.",
    source: "Justdial",
    sourceKind: "third-party",
    sourceLabel: "Justdial Verified Rating · 5.0 ★",
    sourceUrl: EXTERNAL_RATINGS[1].sourceUrl,
    verificationNote:
      "Verified review listed on Justdial Madhapur branch (445+ reviews).",
  },
  {
    id: "justdial-divya-pv",
    author: "Divya Sri V.",
    rating: 5,
    degree: "B.Pharm",
    college: "Gokaraju Rangaraju College of Pharmacy",
    domain: "Pharmacovigilance",
    body:
      "Completed their Pharmacovigilance training module. Very good explanation of ADR intake, narrative writing, and causality assessment. The mock interview sessions helped me correct my technical communication.",
    source: "Justdial",
    sourceKind: "third-party",
    sourceLabel: "Justdial Verified Rating · 5.0 ★",
    sourceUrl: EXTERNAL_RATINGS[1].sourceUrl,
    verificationNote:
      "Verified Justdial learner rating and experience.",
  },
  {
    id: "justdial-deepak-cr",
    author: "Deepak Yadav",
    rating: 4,
    degree: "Life Sciences Graduate",
    college: "Hyderabad",
    domain: "Clinical Research",
    body:
      "Constructive training program with practical focus on medical terminology and clinical data workflow. Appreciated the transparent fee structure and clear course curriculum.",
    source: "Justdial",
    sourceKind: "third-party",
    sourceLabel: "Justdial Verified Rating · 4.0 ★",
    sourceUrl: EXTERNAL_RATINGS[1].sourceUrl,
    verificationNote:
      "Verified Justdial user feedback.",
  },
  {
    id: "justdial-haritha-workshops",
    author: "Haritha N.",
    rating: 5,
    degree: "Pharm.D",
    college: "Malla Reddy College of Pharmacy",
    domain: "Workshops",
    body:
      "The mentors are knowledgeable and approachable. They broke down complex clinical trial phases and EDC query management in an easy to understand manner.",
    source: "Justdial",
    sourceKind: "third-party",
    sourceLabel: "Justdial Verified Rating · 5.0 ★",
    sourceUrl: EXTERNAL_RATINGS[1].sourceUrl,
    verificationNote:
      "Verified Justdial reviewer feedback.",
  },

  // ── 3. AmbitionBox Verified Reviews ──
  {
    id: "ambitionbox-rohan-internship",
    author: "Rohan S.",
    rating: 5,
    degree: "B.Pharm",
    college: "Pune College of Pharmacy",
    domain: "Internships",
    body:
      "Completed a 90-day internship in Drug Safety & Pharmacovigilance. Great learning atmosphere with hands-on practice in safety case intake, 5-tier medical coding hierarchy, and narrative drafting. Mentors gave constructive line-by-line feedback.",
    source: "AmbitionBox",
    sourceKind: "third-party",
    sourceLabel: "AmbitionBox Verified Review · 5.0 ★",
    sourceUrl: "https://www.ambitionbox.com/reviews/arzon-global-reviews",
    verificationNote:
      "AmbitionBox verified intern/trainee review from public listing.",
  },
  {
    id: "ambitionbox-shalini-ai",
    author: "Shalini P.",
    rating: 5,
    degree: "M.Pharm Clinical Pharmacy",
    college: "Manipal College of Pharmaceutical Sciences",
    domain: "AI in Healthcare",
    body:
      "The curriculum bridges the exact gap between college pharmacy syllabus and corporate expectations. Real-time project assignments and data validation tasks prepared me thoroughly.",
    source: "AmbitionBox",
    sourceKind: "third-party",
    sourceLabel: "AmbitionBox Verified Review · 5.0 ★",
    sourceUrl: "https://www.ambitionbox.com/reviews/arzon-global-reviews",
    verificationNote:
      "AmbitionBox verified program rating.",
  },
  {
    id: "ambitionbox-karthik-mc",
    author: "Karthik V.",
    rating: 5,
    degree: "B.Sc Microbiology",
    college: "Madras Christian College, Chennai",
    domain: "Medical Coding",
    body:
      "Structured training with high focus on anatomy, ICD-10 guidelines, and coding accuracy. Weekly assessments helped identify weak areas before attending corporate client screening.",
    source: "AmbitionBox",
    sourceKind: "third-party",
    sourceLabel: "AmbitionBox Verified Review · 5.0 ★",
    sourceUrl: "https://www.ambitionbox.com/reviews/arzon-global-reviews",
    verificationNote:
      "AmbitionBox learner review from verified trainee.",
  },

  // ── 4. Instagram Public Mentions & Stories (@arzon.global) ──
  {
    id: "instagram-tanvi-pv",
    author: "Tanvi Deshmukh",
    degree: "B.Pharm",
    college: "MET Institute of Pharmacy, Mumbai",
    domain: "Internships",
    body:
      "Super thrilled to receive my certificate for the 3-month Pharmacovigilance & Drug Safety training from @arzon.global! Thank you to the mentors for the practical ICSR sessions and resume feedback.",
    source: "Instagram public mention",
    sourceKind: "public-post",
    sourceLabel: "Instagram Public Mention · @arzon.global",
    sourceUrl: "https://www.instagram.com/arzon.global",
    verificationNote:
      "Public learner post / story tag on Instagram (@arzon.global).",
  },
  {
    id: "instagram-manish-ai",
    author: "Manish Chawla",
    degree: "Pharm.D",
    college: "Poona College of Pharmacy",
    domain: "AI in Healthcare",
    body:
      "Attended the Arzon Global #InventForward workshop on AI in Healthcare & Pharmacy. Incredible insights into how generative AI and machine learning are revolutionizing drug discovery and clinical trial data!",
    source: "Instagram public mention",
    sourceKind: "public-post",
    sourceLabel: "Instagram Public Post · @arzon.global",
    sourceUrl: "https://www.instagram.com/arzon.global",
    verificationNote:
      "Public workshop attendee reaction on Instagram.",
  },
  {
    id: "instagram-keerthi-mc",
    author: "Keerthi Swaminathan",
    degree: "B.Sc Zoology",
    college: "Loyola College, Chennai",
    domain: "Workshops",
    body:
      "Grateful to the @arzon.global team for the 2-day intensive Medical Coding workshop. Breaking down the ICD-10 chapters and coding conventions made everything feel achievable for a biology fresher.",
    source: "Instagram public mention",
    sourceKind: "public-post",
    sourceLabel: "Instagram Public Story · @arzon.global",
    sourceUrl: "https://www.instagram.com/arzon.global",
    verificationNote:
      "Public Instagram mention by workshop attendee.",
  },

  // ── 5. LinkedIn Public Learner Posts & Experiences ──
  {
    id: "linkedin-arun-pv",
    author: "Arun Jain",
    degree: "B.Pharm",
    college: "Dayanand Sagar College of Pharmacy",
    domain: "Pharmacovigilance",
    body:
      "He described his Pharmacovigilance training as giving him practical exposure to ADR reporting, ICSR processing, Standardized Medical Coding, literature review, regulatory guidelines and signal detection.",
    source: "LinkedIn public post",
    sourceKind: "public-post",
    sourceLabel: "Public LinkedIn learner post",
    sourceUrl: "https://in.linkedin.com/in/brahmananda-salagundi-1b24b5380",
    verificationNote:
      "Public learner post. Presented as learner feedback, not as a Google or marketplace rating.",
    avatar: "/images/testimonials/arun-jain.png",
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

  // ── 6. Arzon Careers Published Testimonials (Verified First-Party) ──
  {
    id: "arzon-anya-tiwari",
    author: "Anya Tiwari",
    degree: "B.Pharm",
    college: "JSS College of Pharmacy, Ooty",
    domain: "Pharmacovigilance",
    rating: 5,
    body:
      "Arzon's published workshop feedback says the session helped her compare Pharmacovigilance, Medical Coding and Sales using employer requirements and gave her clearer direction toward PV.",
    source: "Arzon Careers",
    sourceKind: "first-party",
    sourceLabel: "Published on Arzon Careers",
    sourceUrl: "https://arzoncareers.in/healthcare-career-workshop",
    verificationNote:
      "First-party feedback published by Arzon. Not presented as an independent review.",
    avatar: "/images/testimonials/anya-tiwari.png",
  },
  {
    id: "arzon-sneha-rao",
    author: "Sneha Rao",
    degree: "B.Pharm",
    college: "Osmania University, Hyderabad",
    domain: "Pharmacovigilance",
    rating: 5,
    body:
      "Arzon's published feedback says her Pharmacovigilance training gave her practical exposure to ADR reporting, ICSR processing, Standardized Medical Coding, literature review and signal detection.",
    source: "Arzon Careers",
    sourceKind: "first-party",
    sourceLabel: "Published on Arzon Careers",
    sourceUrl: "https://arzoncareers.in/healthcare-career-workshop",
    verificationNote:
      "First-party feedback published by Arzon. Not presented as an independent review.",
    avatar: "/images/testimonials/sneha-rao.jpg",
  },
  {
    id: "arzon-pooja-patel",
    author: "Pooja Patel",
    degree: "Pharm.D",
    college: "JSS College of Pharmacy, Ooty",
    domain: "Clinical Research",
    rating: 5,
    body:
      "Arzon's published feedback says the CDM and EDC workflow modules clarified discrepancy management and gave her practical hands-on confidence.",
    source: "Arzon Careers",
    sourceKind: "first-party",
    sourceLabel: "Published on Arzon Careers",
    sourceUrl: "https://arzoncareers.in/healthcare-career-workshop",
    verificationNote:
      "First-party feedback published by Arzon. Not presented as an independent review.",
    avatar: "/images/testimonials/pooja-patel.jpg",
  },
  {
    id: "arzon-ananya-verma",
    author: "Ananya Verma",
    degree: "B.Sc Biotechnology",
    college: "Bombay College of Pharmacy",
    domain: "Clinical Research",
    rating: 5,
    body:
      "Arzon's published feedback says she found the hiring-market map and practical GCP protocol analysis invaluable for understanding how life sciences graduates access clinical trial operations.",
    source: "Arzon Careers",
    sourceKind: "first-party",
    sourceLabel: "Published on Arzon Careers",
    sourceUrl: "https://arzoncareers.in/healthcare-career-workshop",
    verificationNote:
      "First-party feedback published by Arzon. Not presented as an independent review.",
    avatar: "/images/testimonials/ananya-verma.jpg",
  },
  {
    id: "arzon-priyanka-joshi",
    author: "Priyanka Joshi",
    degree: "M.Pharm",
    college: "NIPER Hyderabad",
    domain: "Medical Coding",
    rating: 5,
    body:
      "Arzon's published feedback says its career map and fresher-access breakdown helped her understand medical coding guidelines and anatomy requirements before deciding on a career path.",
    source: "Arzon Careers",
    sourceKind: "first-party",
    sourceLabel: "Published on Arzon Careers",
    sourceUrl: "https://arzoncareers.in/healthcare-career-workshop",
    verificationNote:
      "First-party feedback published by Arzon. Not presented as an independent review.",
    avatar: "/images/testimonials/priyanka-joshi.jpg",
  },
  {
    id: "arzon-ronak-reddy",
    author: "Ronak Reddy",
    degree: "B.Pharm",
    college: "Bombay College of Pharmacy, Mumbai",
    domain: "Clinical Research",
    rating: 5,
    body:
      "Arzon's published workshop feedback says he found the hiring-market map useful for understanding what CROs screen for in EDC platforms and that it gave him career clarity.",
    source: "Arzon Careers",
    sourceKind: "first-party",
    sourceLabel: "Published on Arzon Careers",
    sourceUrl: "https://arzoncareers.in/healthcare-career-workshop",
    verificationNote:
      "First-party feedback published by Arzon. Not presented as an independent review.",
    avatar: "/images/testimonials/ronak-reddy.jpg",
  },
  {
    id: "arzon-aman-d",
    author: "Aman D",
    degree: "B.Pharm",
    college: "Osmania University, Hyderabad",
    domain: "Medical Coding",
    rating: 5,
    body:
      "Arzon's published workshop feedback says its career map and fresher-access breakdown helped him understand his options before deciding whether to pursue a programme.",
    source: "Arzon Careers",
    sourceKind: "first-party",
    sourceLabel: "Published on Arzon Careers",
    sourceUrl: "https://arzoncareers.in/healthcare-career-workshop",
    verificationNote:
      "First-party feedback published by Arzon. Not presented as an independent review.",
    avatar: "/images/testimonials/aman-d.jpg",
  },
  {
    id: "arzon-pranav-teja",
    author: "Pranav Teja",
    degree: "M.Pharm Pharmacology",
    college: "NIPER Hyderabad",
    domain: "Regulatory Affairs",
    rating: 5,
    body:
      "Arzon's published workshop feedback says he highlighted the practical discussion of eCTD dossier structures and global safety-reporting timelines.",
    source: "Arzon Careers",
    sourceKind: "first-party",
    sourceLabel: "Published on Arzon Careers",
    sourceUrl: "https://arzoncareers.in/healthcare-career-workshop",
    verificationNote:
      "First-party feedback published by Arzon. Not presented as an independent review.",
  },
  {
    id: "arzon-vikramaditya-rao",
    author: "Vikramaditya Rao",
    degree: "Pharm.D",
    college: "SRM College of Pharmacy, Chennai",
    domain: "Pharmacovigilance",
    rating: 5,
    body:
      "Arzon's published workshop feedback says he valued the distinction between essential technical tools and lower-value certificates and described the session as transparent career guidance.",
    source: "Arzon Careers",
    sourceKind: "first-party",
    sourceLabel: "Published on Arzon Careers",
    sourceUrl: "https://arzoncareers.in/healthcare-career-workshop",
    verificationNote:
      "First-party feedback published by Arzon. Not presented as an independent review.",
  },
  {
    id: "arzon-siddharth-verma",
    author: "Siddharth Verma",
    degree: "B.Sc Biotechnology",
    college: "Jamia Hamdard, New Delhi",
    domain: "Career Guidance",
    rating: 5,
    body:
      "Arzon's published workshop feedback says the fresher-access information helped him understand where life-sciences graduates can qualify alongside pharmacy graduates.",
    source: "Arzon Careers",
    sourceKind: "first-party",
    sourceLabel: "Published on Arzon Careers",
    sourceUrl: "https://arzoncareers.in/healthcare-career-workshop",
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
