"use client";

import * as React from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "motion/react";
import { cn } from "@/lib/utils";

export function TiltCard({
  children,
  className,
  glareClassName,
}: {
  children: React.ReactNode;
  className?: string;
  glareClassName?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useSpring(useMotionValue(0), { stiffness: 220, damping: 22 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 220, damping: 22 });

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    x.set(px);
    y.set(py);
    rotateY.set((px - 0.5) * 16);
    rotateX.set((0.5 - py) * 16);
  }

  function handlePointerLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  const glareX = useMotionTemplate`${x}turn`;
  const glareY = useMotionTemplate`${y}turn`;

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        transformPerspective: 900,
      }}
      className={cn(
        "group relative isolate overflow-hidden rounded-3xl border border-border/70 bg-card",
        className
      )}
    >
      <motion.div
        aria-hidden="true"
        style={{
          background: useMotionTemplate`radial-gradient(320px circle at ${glareX} ${glareY}, color-mix(in oklch, var(--brand) 22%, transparent), transparent 65%)`,
        }}
        className={cn(
          "pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100",
          glareClassName
        )}
      />
      <div style={{ transform: "translateZ(40px)" }}>{children}</div>
    </motion.div>
  );
}
