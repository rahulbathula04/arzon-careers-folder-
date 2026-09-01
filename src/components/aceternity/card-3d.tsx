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
  const ref = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 8;
    const rotateX = -((y - centerY) / centerY) * 8;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "1000px" }}
      className={cn("relative cursor-default", containerClassName)}
    >
      <div
        style={{
          transform: isHovered
            ? `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1.02, 1.02, 1.02)`
            : "rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
          transition: "all 0.4s cubic-bezier(0.03, 0.98, 0.52, 0.99)",
          transformStyle: "preserve-3d",
        }}
        className={cn("relative", className)}
      >
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
