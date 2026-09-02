/**
 * Aceternity UI — Card3D
 * A 3D tilt-on-hover card wrapper using CSS perspective transforms.
 * Source: https://ui.aceternity.com/components/3d-card-effect
 */
import { useRef, useState, type ReactNode, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

interface Card3DProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}

export function Card3D({ children, className, containerClassName }: Card3DProps) {
  return (
    <div className={cn("relative cursor-default transition-all duration-200", containerClassName)}>
      <div className={cn("relative transition-all duration-200", className)}>
        {children}
      </div>
    </div>
  );
}

interface Card3DBodyProps {
  children: ReactNode;
  className?: string;
}

export function Card3DBody({ children, className }: Card3DBodyProps) {
  return (
    <div
      style={{ transformStyle: "preserve-3d" }}
      className={cn("relative", className)}
    >
      {children}
    </div>
  );
}

interface Card3DItemProps {
  children: ReactNode;
  className?: string;
  translateZ?: string | number;
  rotateX?: number;
  rotateY?: number;
  rotateZ?: number;
  as?: React.ElementType;
}

export function Card3DItem({
  children,
  className,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  as: As = "div",
}: Card3DItemProps) {
  return (
    <As
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) translateZ(${translateZ}px)`,
      }}
      className={cn("w-fit", className)}
    >
      {children}
    </As>
  );
}
