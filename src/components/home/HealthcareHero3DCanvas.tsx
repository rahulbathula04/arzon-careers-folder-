import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

interface BioParticle3D {
  x: number;
  y: number;
  z: number;
  speed: number;
  radius: number;
  color: string;
  tailLength: number;
  pulsePhase: number;
}

const HEALTHCARE_PALETTE = [
  "rgba(37, 99, 235, ",   // Arzon Blue #2563EB
  "rgba(8, 31, 56, ",     // Deep Navy #081F38
  "rgba(96, 165, 250, ",  // Light Blue #60A5FA
  "rgba(16, 185, 129, ",  // Mint Green #10B981
  "rgba(37, 99, 235, ",   // Arzon Blue #2563EB
];

export function HealthcareHero3DCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId = 0;
    let isVisible = true;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 650);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        if (w && h) {
          width = w;
          height = h;
          canvas.width = width * dpr;
          canvas.height = height * dpr;
          ctx.scale(dpr, dpr);
        }
      }
    });

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    // 3D Perspective Configuration (Responsive for Mobile & Desktop)
    const isMobile = width < 640;
    const PARTICLE_COUNT = isMobile ? 45 : 80;
    const Z_NEAR = 50;
    const Z_FAR = 1000;
    const FOCAL_LENGTH = isMobile ? 300 : 360;

    let mouseX = 0;
    let mouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handlePointerMove = (e: PointerEvent) => {
      if (!isVisible) return;
      const rect = canvas.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      mouseX = Math.max(-1, Math.min(1, nx));
      mouseY = Math.max(-1, Math.min(1, ny));
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isVisible) return;
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        const nx = ((touch.clientX - rect.left) / rect.width - 0.5) * 2;
        const ny = ((touch.clientY - rect.top) / rect.height - 0.5) * 2;
        mouseX = Math.max(-1, Math.min(1, nx));
        mouseY = Math.max(-1, Math.min(1, ny));
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    // Seed 3D Bio-Particles scaled to viewport
    const maxRadius = isMobile ? 320 : 580;
    const particles: BioParticle3D[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = 20 + Math.pow(Math.random(), 0.75) * maxRadius;
      particles.push({
        x: Math.cos(angle) * r,
        y: Math.sin(angle) * r,
        z: Z_NEAR + Math.random() * (Z_FAR - Z_NEAR),
        speed: isMobile ? 120 + Math.random() * 180 : 160 + Math.random() * 240,
        radius: isMobile ? 1.4 + Math.random() * 2.0 : 1.6 + Math.random() * 2.6,
        color: HEALTHCARE_PALETTE[Math.floor(Math.random() * HEALTHCARE_PALETTE.length)],
        tailLength: isMobile ? 25 + Math.random() * 55 : 40 + Math.random() * 90,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    // Orbital Gyro Rings Setup (3D Biometric Circles)
    let orbitAngle = 0;
    let lastTime = performance.now();

    const render = (now: number) => {
      if (!isVisible) {
        animId = 0;
        return;
      }

      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      // Ambient oscillation so 3D space breathes and tilts naturally even on mobile without interaction
      const ambientX = Math.sin(now * 0.0006) * (isMobile ? 0.30 : 0.12);
      const ambientY = Math.cos(now * 0.0008) * (isMobile ? 0.20 : 0.08);
      const targetMouseX = mouseX + ambientX;
      const targetMouseY = mouseY + ambientY;

      // Smooth mouse lerp for natural 3D parallax tilt
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Vanishing Point centered right behind the headline
      const vanishX = width * 0.5 + currentMouseX * (isMobile ? 24 : 45);
      const vanishY = height * (isMobile ? 0.28 : 0.35) + currentMouseY * (isMobile ? 18 : 26);

      if (!shouldReduceMotion) {
        orbitAngle += dt * 0.25;
      }

      // ─── 1. 3D PERSPECTIVE TELEMETRY CONVERGENCE RAYS ─────────────────
      ctx.save();
      const rayOffsets = isMobile ? [-0.60, -0.28, 0.28, 0.60] : [-0.85, -0.55, -0.28, 0, 0.28, 0.55, 0.85];
      const rayLength = Math.max(width, height) * 1.15;
      for (const angleOffset of rayOffsets) {
        const rayAngle = Math.PI * 0.5 + angleOffset + currentMouseX * 0.06;
        const endX = vanishX + Math.cos(rayAngle) * rayLength;
        const endY = vanishY + Math.sin(rayAngle) * rayLength;

        ctx.beginPath();
        ctx.moveTo(vanishX, vanishY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = "rgba(37, 99, 235, 0.035)";
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 14]);
        ctx.stroke();
      }
      ctx.restore();

      // ─── 2. 3D BIOMETRIC TELEMETRY ORBITAL RINGS ────────────────────────
      ctx.save();
      const ringRadii = isMobile ? [90, 180, 270] : [180, 320, 480];
      for (let idx = 0; idx < ringRadii.length; idx++) {
        const ringR = ringRadii[idx];
        const tiltX = 0.35 + currentMouseY * 0.15;
        const tiltY = 1.0;

        ctx.beginPath();
        ctx.ellipse(
          vanishX,
          vanishY,
          ringR * tiltY,
          ringR * tiltX,
          orbitAngle * (idx % 2 === 0 ? 0.4 : -0.3),
          0,
          Math.PI * 2
        );
        ctx.strokeStyle = idx === 1 ? "rgba(37, 99, 235, 0.09)" : "rgba(8, 31, 56, 0.045)";
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 14]);
        ctx.stroke();
      }
      ctx.restore();

      // ─── 3. 3D BIO-PARTICLES & STREAMING LIGHT STREAKS ─────────────────
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!shouldReduceMotion) {
          p.z -= p.speed * dt;
          p.pulsePhase += dt * 2;
          if (p.z < Z_NEAR) {
            p.z = Z_FAR;
            const angle = Math.random() * Math.PI * 2;
            const r = 25 + Math.pow(Math.random(), 0.75) * 580;
            p.x = Math.cos(angle) * r;
            p.y = Math.sin(angle) * r;
          }
        }

        // 3D Perspective Projection
        const scaleFront = FOCAL_LENGTH / p.z;
        const zBack = p.z + p.tailLength;
        const scaleBack = FOCAL_LENGTH / zBack;

        const xFront = vanishX + p.x * scaleFront;
        const yFront = vanishY + p.y * scaleFront;

        const xBack = vanishX + p.x * scaleBack;
        const yBack = vanishY + p.y * scaleBack;

        // Depth Alpha calculation
        let alpha = 1;
        if (p.z > Z_FAR - 200) {
          alpha = (Z_FAR - p.z) / 200;
        } else if (p.z < 180) {
          alpha = (p.z - Z_NEAR) / 130;
        }
        alpha = Math.max(0, Math.min(alpha * 0.8, 0.85));

        if (alpha > 0.02) {
          // A. Streaming Bio-Light Tail
          ctx.beginPath();
          ctx.moveTo(xBack, yBack);
          ctx.lineTo(xFront, yFront);
          ctx.strokeStyle = `${p.color}${(alpha * 0.7).toFixed(2)})`;
          ctx.lineWidth = Math.min(2.4, Math.max(0.6, scaleFront * 1.5));
          ctx.lineCap = "round";
          ctx.stroke();

          // B. Molecular Node Head with Outer Aura
          const nodeRadius = Math.max(1.2, p.radius * scaleFront * (1 + Math.sin(p.pulsePhase) * 0.15));

          // Soft Outer Halo
          ctx.beginPath();
          ctx.arc(xFront, yFront, nodeRadius * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${(alpha * 0.18).toFixed(2)})`;
          ctx.fill();

          // Core Molecular Node
          ctx.beginPath();
          ctx.arc(xFront, yFront, nodeRadius, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${alpha.toFixed(2)})`;
          ctx.fill();
        }
      }

      if (!shouldReduceMotion && isVisible) {
        animId = requestAnimationFrame(render);
      }
    };

    // Pause rendering when hero is scrolled out of viewport (Zero CPU/GPU lag on rest of page)
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animId && !shouldReduceMotion) {
          lastTime = performance.now();
          animId = requestAnimationFrame(render);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [shouldReduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
    />
  );
}
