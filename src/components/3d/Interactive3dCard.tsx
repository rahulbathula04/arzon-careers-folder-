import { useRef, useState, type ReactNode, type MouseEvent } from "react";
import { useReducedMotion } from "framer-motion";
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
  maxTilt = 12,
  glareEffect = true,
  depthScale = 1.025,
}: Interactive3dCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * maxTilt;
    const rotateX = -((y - centerY) / centerY) * maxTilt;

    setRotate({ x: rotateX, y: rotateY });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.25,
    });
  };

  const handleMouseEnter = () => {
    if (shouldReduceMotion) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "1100px" }}
      className={cn("relative transition-transform duration-200", containerClassName)}
    >
      <div
        style={{
          transform:
            isHovered && !shouldReduceMotion
              ? `rotateX(${rotate.x.toFixed(2)}deg) rotateY(${rotate.y.toFixed(2)}deg) scale3d(${depthScale}, ${depthScale}, ${depthScale})`
              : "rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
          transformStyle: "preserve-3d",
          transition: isHovered ? "transform 0.12s ease-out" : "transform 0.45s ease-out",
        }}
        className={cn("relative h-full w-full", className)}
      >
        {children}

        {/* 3D Specular Glare Reflection Sheen */}
        {glareEffect && !shouldReduceMotion && (
          <div
            style={{
              background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 65%)`,
              opacity: glare.opacity,
              transition: "opacity 0.3s ease-out",
              pointerEvents: "none",
            }}
            className="absolute inset-0 z-40 rounded-inherit overflow-hidden"
          />
        )}
      </div>
    </div>
  );
}

export function Card3dLayer({
  children,
  className,
  translateZ = 30,
}: {
  children: ReactNode;
  className?: string;
  translateZ?: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <div
      style={{
        transform: shouldReduceMotion ? "none" : `translateZ(${translateZ}px)`,
        transformStyle: "preserve-3d",
      }}
      className={cn("transition-transform duration-200", className)}
    >
      {children}
    </div>
  );
}
