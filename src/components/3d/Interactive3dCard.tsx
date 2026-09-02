import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Interactive3dCardProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  maxTilt?: number;
  glareEffect?: boolean;
  depthScale?: number;
}

export function Interactive3dCard({
  children,
  className,
  containerClassName,
}: Interactive3dCardProps) {
  return (
    <div className={cn("relative transition-all duration-200", containerClassName)}>
      <div
        className={cn(
          "relative h-full w-full transition-all duration-200",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}

export function Card3dLayer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
  translateZ?: number;
}) {
  return <div className={cn("relative", className)}>{children}</div>;
}

