"use client";

import * as React from "react";
import { useInView, useMotionValue, useSpring } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function AnimatedCounter({
  value,
  suffix = "",
  className,
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reducedMotion = useReducedMotion();
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { damping: 24, stiffness: 90 });
  const [display, setDisplay] = React.useState(0);

  React.useEffect(() => {
    if (!inView || reducedMotion) return;
    motionValue.set(value);
  }, [inView, reducedMotion, value, motionValue]);

  React.useEffect(() => {
    const unsubscribe = spring.on("change", (latest) => {
      setDisplay(Math.round(latest));
    });
    return unsubscribe;
  }, [spring]);

  const shown = inView && reducedMotion ? value : display;

  return (
    <span ref={ref} className={className}>
      {shown.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}
