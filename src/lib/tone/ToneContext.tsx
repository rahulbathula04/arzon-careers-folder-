import * as React from "react";
import { createContext, createElement, useContext, type ReactNode } from "react";

export type Tone = "light" | "dark";

const ToneContext = createContext<Tone>("dark");

export function useTone(): Tone {
  return useContext(ToneContext);
}

/**
 * Pairs the tone className with a context value so descendants can pick
 * tone-aware colours without each consumer hand-rolling a prop. Use this
 * around any section that changes background lightness.
 */
export function ToneScope({
  tone,
  as = "div",
  className = "",
  children,
}: {
  tone: Tone;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  children: ReactNode;
}) {
  const cls = tone === "dark" ? "tone-dark" : "tone-light";
  return (
    <ToneContext.Provider value={tone}>
      {createElement(as, { className: `${cls} ${className}`.trim() }, children)}
    </ToneContext.Provider>
  );
}

export { ToneContext };
