"use client";

import * as React from "react";
import { motion } from "motion/react";
import { animate } from "animejs";

const BULB_PATH =
  "M110 20 C160 20 198 62 198 118 C198 160 178 192 148 205 C144 207 141 213 140 222 L80 222 C79 213 76 207 72 205 C42 192 22 160 22 118 C22 62 60 20 110 20 Z";

export function StaticBulb({ className }: { className?: string }) {
  const coreRef = React.useRef<SVGCircleElement>(null);
  const glowRef = React.useRef<SVGPathElement>(null);

  // anime.js drives the "breathing" glow — independent of CSS, so it keeps
  // working even when prefers-reduced-motion forces CSS animation durations
  // to ~0. This stays on regardless of that preference: it's a slow opacity
  // pulse with no movement, not the kind of motion that setting targets.
  React.useEffect(() => {
    if (!coreRef.current || !glowRef.current) return;
    const targets = [coreRef.current, glowRef.current];
    const animation = animate(targets, {
      opacity: [0.55, 1],
      scale: [1, 1.08],
      duration: 1700,
      easing: "easeInOutSine",
      direction: "alternate",
      loop: true,
    });
    return () => {
      animation.pause();
    };
  }, []);

  return (
    <div
      className={`absolute inset-0 flex items-end justify-center pb-0 lg:items-end lg:justify-end lg:pr-[12%] lg:pb-[10%] ${className ?? ""}`}
      aria-hidden="true"
    >
      <motion.svg
        viewBox="0 0 220 320"
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="h-[34%] max-h-[340px] w-auto drop-shadow-[0_0_80px_rgba(255,138,42,0.45)] lg:h-[56%] lg:max-h-[540px]"
      >
        <defs>
          <radialGradient id="glass" cx="35%" cy="25%" r="80%">
            <stop offset="0%" stopColor="#fff6e0" stopOpacity="0.55" />
            <stop offset="55%" stopColor="#ffb95e" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#c9641a" stopOpacity="0.2" />
          </radialGradient>
          <radialGradient id="core" cx="50%" cy="62%" r="42%">
            <stop offset="0%" stopColor="#fff2cc" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#ffb44d" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#ffb44d" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="brass" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#7a5c33" />
            <stop offset="45%" stopColor="#e4c27a" />
            <stop offset="100%" stopColor="#7a5c33" />
          </linearGradient>
          <filter id="softGlow" x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur stdDeviation="7" />
          </filter>
          <filter id="crispGlow" x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur stdDeviation="1.4" />
          </filter>
          <clipPath id="bulbClip">
            <path d={BULB_PATH} />
          </clipPath>
        </defs>

        {/* glass globe — classic bulb silhouette: round top, tapers in and straightens near the base */}
        <path d={BULB_PATH} fill="url(#glass)" />
        <path d={BULB_PATH} fill="none" stroke="#fff6e0" strokeWidth="1.5" opacity="0.5" />

        <g clipPath="url(#bulbClip)">
          <ellipse cx="72" cy="70" rx="20" ry="28" fill="#fff8ea" opacity="0.45" />

          {/* inner light bloom — pulses like a glowing filament (anime.js) */}
          <circle ref={coreRef} cx="110" cy="150" r="70" fill="url(#core)" style={{ transformOrigin: "110px 150px" }} />

          {/* filament — soft glow layer (anime.js) */}
          <path
            ref={glowRef}
            d="M110 198 C96 180 124 166 104 148 C88 134 126 118 110 96"
            fill="none"
            stroke="#ffcf6b"
            strokeWidth="10"
            strokeLinecap="round"
            opacity="0.6"
            filter="url(#softGlow)"
            style={{ transformOrigin: "110px 150px" }}
          />
          {/* filament — crisp core */}
          <path
            d="M110 198 C96 180 124 166 104 148 C88 134 126 118 110 96"
            fill="none"
            stroke="#fff2cc"
            strokeWidth="3"
            strokeLinecap="round"
            filter="url(#crispGlow)"
          />
        </g>

        {/* neck */}
        <path d="M80 220 h60 v14 a30 10 0 0 1 -60 0 z" fill="#f6d9a8" />

        {/* brass base */}
        <rect x="74" y="234" width="72" height="50" rx="6" fill="url(#brass)" />
        {[0, 1, 2].map((i) => (
          <rect key={i} x="74" y={245 + i * 12} width="72" height="5" fill="#5c431f" opacity="0.5" />
        ))}
        <rect x="86" y="284" width="48" height="13" rx="4" fill="#4a3718" />
      </motion.svg>
    </div>
  );
}
