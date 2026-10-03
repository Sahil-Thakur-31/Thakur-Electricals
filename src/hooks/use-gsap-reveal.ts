"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function useGsapReveal<T extends HTMLElement>(
  targetSelector: string,
  options?: { y?: number; stagger?: number; start?: string }
) {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const targets = container.querySelectorAll(targetSelector);
    if (!targets.length) return;

    if (prefersReduced) {
      gsap.set(targets, { opacity: 1, y: 0 });
      return;
    }

    const tween = gsap.fromTo(
      targets,
      { opacity: 0, y: options?.y ?? 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: options?.stagger ?? 0.1,
        scrollTrigger: {
          trigger: container,
          start: options?.start ?? "top 82%",
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [targetSelector, options?.y, options?.stagger, options?.start]);

  return containerRef;
}
