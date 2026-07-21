import * as React from "react";
import { cn } from "@/lib/utils";
import { Container, type ContainerProps } from "./Container";

type Size = "sm" | "md" | "lg";
type Tone = "default" | "muted" | "light";

const padY: Record<Size, string> = {
  sm: "py-7 sm:py-12",
  md: "py-9 sm:py-16",
  lg: "py-11 sm:py-20",
};

const toneBg: Record<Tone, string> = {
  default: "",
  muted: "bg-white/[0.02]",
  light: "bg-white text-ink",
};

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  size?: Size;
  tone?: Tone;
  containerSize?: ContainerProps["size"];
  bare?: boolean; // skip the Container wrapper if true
}

/**
 * Universal section primitive, standardises vertical rhythm + width.
 * Use everywhere instead of bespoke `<section className="py-X"><div className="max-w-Y mx-auto px-Z">`.
 */
export function Section({
  size = "md",
  tone = "default",
  containerSize = "lg",
  bare = false,
  className,
  children,
  ...rest
}: SectionProps) {
  return (
    <section className={cn("relative", padY[size], toneBg[tone], className)} {...rest}>
      {bare ? children : <Container size={containerSize}>{children}</Container>}
    </section>
  );
}
