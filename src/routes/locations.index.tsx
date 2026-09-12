import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, ArrowRight, Building2 } from "lucide-react";
import { pageSeo } from "@/lib/seo";

export const Route = createFileRoute("/locations/")({
  head: () => {
    const seo = pageSeo({
      path: "/locations",
      title: "Strategic Healthcare Career Hubs · Arzon Global",
      description:
        "Explore strategic healthcare training and applied internship locations in India, including Hyderabad, Bangalore, and Pune.",
    });
    return {
      meta: [{ title: "Strategic Healthcare Career Hubs · Arzon Global" }, ...seo.meta],
      links: seo.links,
    };
  },
  component: LocationsIndexComponent,
});

function LocationsIndexComponent() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 font-sans pb-24">
      <section className="border-b border-stone-200 bg-white tone-light py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-[#1B3F8B]" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B]">
              STRATEGIC INDUSTRY LOCATIONS
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight leading-tight max-w-4xl">
            Healthcare Career &amp; Training Hubs
          </h1>

          <p className="text-base sm:text-lg text-stone-700 max-w-3xl leading-relaxed">
            Arzon operates blended training and applied internship programs aligned with major pharma and healthcare IT global capability centers in key metropolitan regions.
          </p>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-3xl border border-stone-300 bg-white tone-light p-6 space-y-4 shadow-sm">
            <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
              PRIMARY GCC HUB
            </span>
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              Hyderabad
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
              14+ Global Capability Centers in HITEC City &amp; Gachibowli across Pharmacovigilance, Medical Coding, and Clinical SAS.
            </p>
            <Link
              to="/locations/hyderabad"
              className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-[#1B3F8B] hover:bg-[#153270] text-white font-bold text-xs transition-colors"
            >
              <span>Explore Hyderabad Hub</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
