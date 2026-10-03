"use client";

import * as React from "react";
import { animate } from "animejs";
import { Phone, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/site-data";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function FloatingActions() {
  const ringRef = React.useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();

  React.useEffect(() => {
    if (reducedMotion || !ringRef.current) return;
    const animation = animate(ringRef.current, {
      scale: [1, 1.9],
      opacity: [0.55, 0],
      duration: 1800,
      easing: "easeOutQuad",
      loop: true,
    });
    return () => {
      animation.pause();
    };
  }, [reducedMotion]);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 sm:bottom-7 sm:right-7">
      <a
        href={`tel:+91${siteConfig.phone}`}
        aria-label="Call Thakur Electricals"
        className="flex size-12 items-center justify-center rounded-full border border-border/70 bg-card text-foreground shadow-lg transition-transform hover:scale-105"
      >
        <Phone className="size-5" />
      </a>
      <a
        href={siteConfig.social.whatsapp}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="relative flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-transform hover:scale-105"
      >
        <span
          ref={ringRef}
          className="absolute inset-0 rounded-full bg-[#25D366]"
          aria-hidden="true"
        />
        <MessageCircle className="relative size-6" />
      </a>
    </div>
  );
}
