import * as React from "react";
import { cn } from "@/lib/utils";

type Size = "sm" | "md" | "lg";

const sizes: Record<Size, string> = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-7xl",
};

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: Size;
}

/**
 * Universal width + horizontal padding wrapper.
 * Mobile padding is `px-5` (≈20px) for breathing room vs the old `px-4`.
 */
export function Container({ size = "lg", className, ...rest }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full px-5 sm:px-6 lg:px-8", sizes[size], className)} {...rest} />
  );
}
