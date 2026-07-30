const SIZE_PX = { sm: 20, md: 32 } as const;

/**
 * TASK (Telangana Academy for Skill and Knowledge) partner mark.
 * Renders the CDN logo on a white pill so the multi-color mark stays legible
 * on dark backgrounds. Falls back to a text-only "TASK" pill if the image
 * fails to load, so the credential row never looks broken.
 */
export function TaskLogo({
  size = "sm",
  className = "",
}: {
  size?: "sm" | "md";
  className?: string;
}) {
  const px = SIZE_PX[size];
  const alt = "TASK - Telangana Academy for Skill and Knowledge";

  return (
    <span
      role="img"
      aria-label={alt}
      className={`inline-flex items-center justify-center rounded-sm px-1.5 font-mono text-micro font-bold tracking-[0.14em] ${className}`}
      style={{
        height: px,
        background: "#F5C451",
        color: "#0B1220",
        lineHeight: 1,
      }}
    >
      TASK
    </span>
  );
}
