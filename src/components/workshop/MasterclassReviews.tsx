import { Star, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useReducedMotion } from "framer-motion";
import { Marquee } from "@/components/magicui/marquee";

export interface MasterclassReviewItem {
  id: string;
  name: string;
  degree: string;
  college: string;
  role?: string;
  platform: "google" | "linkedin";
  rating?: number;
  quote: string;
  location?: string;
  profileUrl?: string;
}

const ROW_ONE_REVIEWS: MasterclassReviewItem[] = [
  {
    id: "google-kavya",
    name: "Kavya M.",
    degree: "B.Pharm",
    college: "Sultan-ul-Uloom College of Pharmacy, Hyderabad",
    platform: "google",
    rating: 5,
    quote: "Attended the Pharmacovigilance training program. What stood out was the thorough practical coverage of ICSR processing, adverse event reporting, and MedDRA terminology rather than just theory.",
    location: "Google Verified Review · Madhapur, Hyderabad",
  },
  {
    id: "linkedin-arun",
    name: "Arun Jain",
    degree: "B.Pharm",
    college: "Dayanand Sagar College of Pharmacy",
    platform: "linkedin",
    quote: "My Pharmacovigilance training gave me practical exposure to ADR reporting, ICSR processing, MedDRA coding, literature review, regulatory guidelines and signal detection.",
    location: "Public LinkedIn Learner Post",
    profileUrl: "https://in.linkedin.com/in/brahmananda-salagundi-1b24b5380",
  },
  {
    id: "google-sai-kumar",
    name: "Sai Kumar P.",
    degree: "M.Pharm (Pharmacology)",
    college: "Kakatiya University, Warangal",
    platform: "google",
    rating: 5,
    quote: "The ICSR workflow sessions demystified triage and case narrative drafting. Coming from pharmacology, this was the exact bridge from textbook concepts to industry drug safety work.",
    location: "Google Verified Review · Hyderabad",
  },
  {
    id: "linkedin-sneha",
    name: "Sneha Rao",
    degree: "B.Pharm",
    college: "Osmania University, Hyderabad",
    platform: "linkedin",
    quote: "The masterclass broke down how safety cases move through CRO teams, triage protocol, and what entry-level associates actually do day-to-day. Highly recommended before applying.",
    location: "Public LinkedIn Learner Post",
  },
];

const ROW_TWO_REVIEWS: MasterclassReviewItem[] = [
  {
    id: "google-rohith",
    name: "B. Rohith",
    degree: "Pharm.D",
    college: "Anurag University, Hyderabad",
    platform: "google",
    rating: 5,
    quote: "As a Pharm.D graduate, causality assessment and WHO-UMC criteria were critical for me. Having a mentor with 15+ years of real CRO leadership made every case study practical.",
    location: "Google Verified Review · Hyderabad",
  },
  {
    id: "linkedin-anya",
    name: "Anya Tiwari",
    degree: "B.Pharm",
    college: "JSS College of Pharmacy, Ooty",
    platform: "linkedin",
    quote: "The masterclass helped me compare Pharmacovigilance, Medical Coding and Clinical Research using real employer hiring criteria, giving me total career clarity.",
    location: "Public LinkedIn Learner Post",
    profileUrl: "https://arzoncareers.in/healthcare-career-workshop",
  },
  {
    id: "google-rakesh",
    name: "Rakesh V.",
    degree: "M.Pharm",
    college: "Osmania University",
    platform: "google",
    rating: 5,
    quote: "Transparent guidance on fresher hiring in Hyderabad and Bangalore. No inflated placement claims, just rigorous training in MedDRA hierarchy and safety case intake.",
    location: "Google Verified Review · Hyderabad",
  },
  {
    id: "linkedin-pooja",
    name: "Pooja Patel",
    degree: "Pharm.D",
    college: "JSS College of Pharmacy, Ooty",
    platform: "linkedin",
    quote: "Arzon's drug safety case walkthroughs clarified discrepancy management and ICSR submission timelines before attending my first technical interview.",
    location: "Public LinkedIn Learner Post",
  },
];

function ReviewCard({ review }: { review: MasterclassReviewItem }) {
  const isGoogle = review.platform === "google";

  return (
    <article className="w-[300px] sm:w-[360px] rounded-3xl border border-slate-200/90 bg-white tone-light card-light p-6 shadow-xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between shrink-0 select-none">
      <div>
        {/* Header: Platform Badge + Verification */}
        <div className="flex items-center justify-between gap-2 mb-3.5">
          {isGoogle ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800">
              {/* Google G SVG */}
              <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Google Review</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0A66C2]/10 border border-[#0A66C2]/20 text-xs font-semibold text-[#0A66C2]">
              {/* LinkedIn SVG */}
              <svg className="w-3.5 h-3.5 fill-[#0A66C2] shrink-0" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              <span>LinkedIn Post</span>
            </div>
          )}

          {isGoogle && (
            <div className="flex items-center gap-0.5 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current text-amber-400" />
              ))}
            </div>
          )}
        </div>

        {/* Review Quote */}
        <p className="text-xs sm:text-[13.5px] text-slate-700 leading-relaxed italic mb-4 font-sans">
          "{review.quote}"
        </p>
      </div>

      {/* Reviewer Details Footer */}
      <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-xs sm:text-sm text-[#081F38] truncate">{review.name}</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          </div>
          <div className="text-[11px] text-slate-500 truncate">
            {review.degree} · {review.college}
          </div>
        </div>

        <span className="font-mono text-[10px] text-slate-400 uppercase shrink-0">Verified</span>
      </div>
    </article>
  );
}

export function MasterclassReviews() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="reviews" className="py-16 sm:py-24 border-b border-slate-200/80 bg-slate-50/60 overflow-hidden">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center mb-12 sm:mb-16">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50/90 border border-blue-200/70 text-blue-700 text-xs font-mono font-semibold uppercase tracking-wider mb-3">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Learner Proof · Google Reviews &amp; LinkedIn</span>
        </div>

        {/* Section Headline */}
        <h2 className="text-2xl sm:text-4xl font-bold text-[#081F38] tracking-[-0.03em] leading-tight mb-3">
          Trusted by pharmacy students across India.
        </h2>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-sans">
          See how pharmacy graduates evaluate Arzon's practical workshops, drug safety training, and ICSR case walkthroughs.
        </p>

        {/* Social Proof Counter Strip */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-semibold text-slate-700">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200/90 shadow-2xs tone-light card-light">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="font-bold">Google 4.5/5 ★</span>
            <span className="text-slate-500 font-normal">(447+ Reviews)</span>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200/90 shadow-2xs tone-light card-light">
            <span className="w-2 h-2 rounded-full bg-[#0A66C2]" />
            <span className="font-bold">LinkedIn</span>
            <span className="text-slate-500 font-normal">100+ Student Posts</span>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200/90 shadow-2xs tone-light card-light">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="font-bold">Justdial 4.5/5 ★</span>
          </div>
          <Link
            to="/reviews"
            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-bold transition-colors ml-1"
          >
            <span>View all reviews</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Infinite Scrolling Stream */}
      {shouldReduceMotion ? (
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...ROW_ONE_REVIEWS.slice(0, 3), ...ROW_TWO_REVIEWS.slice(0, 3)].map((item) => (
              <ReviewCard key={item.id} review={item} />
            ))}
          </div>
        </div>
      ) : (
        <div className="relative w-full space-y-4 sm:space-y-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
          {/* Row 1: Leftward Infinite Stream */}
          <Marquee className="py-1 [--gap:1rem] sm:[--gap:1.5rem] [--duration:45s]" pauseOnHover repeat={4}>
            {ROW_ONE_REVIEWS.map((item) => (
              <ReviewCard key={item.id} review={item} />
            ))}
          </Marquee>

          {/* Row 2: Rightward (Reverse) Infinite Stream */}
          <Marquee reverse className="py-1 [--gap:1rem] sm:[--gap:1.5rem] [--duration:50s]" pauseOnHover repeat={4}>
            {ROW_TWO_REVIEWS.map((item) => (
              <ReviewCard key={item.id} review={item} />
            ))}
          </Marquee>
        </div>
      )}
    </section>
  );
}
