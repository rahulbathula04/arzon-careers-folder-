import type { ReactNode } from "react";

/**
 * Dark navy + blue glow chrome is now applied globally at the root
 * (src/routes/__root.tsx). This component is kept as a transparent
 * passthrough for backwards compatibility with existing routes that
 * still wrap their content in <DarkBackdrop>.
 */
export function DarkBackdrop({ children }: { children: ReactNode }) {
  // NOTE: the wrapper no longer carries `.tone-dark`. Applying it globally
  // caused every <p>/<li>/text-slate-* on the site to be repainted white
  // (via the `.tone-dark p:not(...)` overrides in styles.css), which made
  // light marketing sections like TrustLedgerStrip appear invisible
  // (white-on-white). Dark route shells (CareerShell, footer, etc.) opt
  // into `.tone-dark` locally on their own surface.
  return <div className="pb-[calc(env(safe-area-inset-bottom)+88px)] lg:pb-0">{children}</div>;
}
