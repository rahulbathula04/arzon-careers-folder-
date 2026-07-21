import arzonIcon from "@/assets/arzon-icon.webp";

const PHRASES = ["Charting your path…", "Mapping the constellation…", "Almost there…"];

export function SpaceLoader({
  visible,
  reducedMotion,
  phraseIndex,
}: {
  visible: boolean;
  reducedMotion: boolean;
  phraseIndex: number;
}) {
  return (
    <div
      aria-hidden={!visible}
      role="status"
      className={`pointer-events-none fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#070B16] transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      style={{ visibility: visible ? "visible" : "hidden" }}
    >
      {/* Radial brand glow */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 45%, color-mix(in oklab, var(--primary-glow, #60A5FA) 22%, transparent), transparent 70%)",
        }}
      />

      {/* Layered starfield (CSS only) */}
      {!reducedMotion && (
        <>
          <div className="ce-stars ce-stars-1" aria-hidden />
          <div className="ce-stars ce-stars-2" aria-hidden />
          <div className="ce-stars ce-stars-3" aria-hidden />
        </>
      )}

      {/* Center mark */}
      <div className="relative flex flex-col items-center gap-6">
        <div className="relative h-24 w-24">
          {/* Pulsing glow */}
          <div
            aria-hidden
            className={`absolute inset-0 rounded-full ${reducedMotion ? "" : "ce-glow-pulse"}`}
            style={{
              background:
                "radial-gradient(circle, color-mix(in oklab, var(--primary-glow, #60A5FA) 50%, transparent) 0%, transparent 70%)",
              filter: "blur(8px)",
            }}
          />
          {/* Orbiting ring */}
          <svg
            viewBox="0 0 100 100"
            className={`absolute inset-0 h-full w-full ${reducedMotion ? "" : "ce-orbit-spin"}`}
            aria-hidden
          >
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="color-mix(in oklab, var(--primary-glow, #60A5FA) 60%, transparent)"
              strokeWidth="1.25"
              strokeDasharray="6 10"
              strokeLinecap="round"
            />
            <circle cx="50" cy="4" r="2" fill="var(--gold, #F5C04A)" />
          </svg>
          {/* Inner orbit, opposite direction */}
          <svg
            viewBox="0 0 100 100"
            className={`absolute inset-3 h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)] ${
              reducedMotion ? "" : "ce-orbit-spin-rev"
            }`}
            aria-hidden
          >
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="color-mix(in oklab, white 18%, transparent)"
              strokeWidth="0.75"
              strokeDasharray="2 8"
            />
          </svg>
          {/* Logo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <img src={arzonIcon} alt="" className="h-12 w-12 rounded-full" draggable={false} />
          </div>
        </div>

        <div className="flex min-h-[1.25rem] items-center justify-center">
          <p
            key={phraseIndex}
            className={`font-mono text-micro font-semibold uppercase tracking-[0.24em] text-white/70 ${
              reducedMotion ? "" : "ce-phrase-fade"
            }`}
          >
            {PHRASES[phraseIndex % PHRASES.length]}
          </p>
        </div>
        <span className="sr-only">Loading…</span>
      </div>
    </div>
  );
}
