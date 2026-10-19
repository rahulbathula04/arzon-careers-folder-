import arzonIcon from "@/assets/arzon-icon.webp";
import { CubeLoader } from "@/components/ui/cube-loader";

const PHRASES = ["AI Thinking: Charting your path…", "AI Thinking: Analyzing parameters…", "AI Thinking: Synthesizing results…"];

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

      {/* Center mark: 3D Isometric Cube Loader in Arzon Blue branding */}
      <div className="relative flex flex-col items-center gap-2">
        <CubeLoader size="md" theme="dark" maskColor="#070B16" />

        <div className="flex min-h-[1.25rem] items-center justify-center -mt-4">
          <p
            key={phraseIndex}
            className={`font-mono text-micro font-semibold uppercase tracking-[0.24em] text-white/70 ${
              reducedMotion ? "" : "ce-phrase-fade"
            }`}
          >
            {PHRASES[phraseIndex % PHRASES.length]}
          </p>
        </div>
        <span className="sr-only">Thinking…</span>
      </div>
    </div>
  );
}
