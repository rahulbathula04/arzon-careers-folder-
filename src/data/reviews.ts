/**
 * Real published testimonials for Organization JSON-LD.
 *
 * Add only verifiable reviews here. Empty = no Review/AggregateRating
 * schema is emitted (safer than fabricating numbers — Google manually
 * penalises fake AggregateRating).
 */

export interface PublishedReview {
  author: string;
  rating: number; // 1–5
  body: string;
  datePublished?: string; // ISO yyyy-mm-dd
}

export const REVIEWS: PublishedReview[] = [
  // Example (commented out — populate with real reviews before shipping):
  // { author: "Priya Sharma", rating: 5, body: "Real client work, real mentor reviews. Got my first PV interview within 6 weeks.", datePublished: "2025-09-12" },
];

/**
 * Optional aggregate rating. Set both fields when you have a verifiable
 * source (e.g. published Google reviews, JustDial, etc.). Leave undefined
 * to skip emitting AggregateRating.
 */
export const AGGREGATE_RATING: { ratingValue: number; reviewCount: number } | undefined = undefined;
