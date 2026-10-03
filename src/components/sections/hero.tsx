"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { motion, type Variants } from "motion/react";
import { ArrowRight, Phone, ShieldCheck, Clock3, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { siteConfig } from "@/lib/site-data";

const HeroScene = dynamic(
  () => import("@/components/three/hero-scene").then((mod) => mod.HeroScene),
  { ssr: false }
);

const chips = [
  { icon: BadgeCheck, label: "ITI Graduate" },
  { icon: Clock3, label: "24/7 Service" },
  { icon: ShieldCheck, label: "Safety First" },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: 0.1 + i * 0.08,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

export function Hero() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] w-full items-center overflow-hidden pt-28 pb-20 sm:pt-32"
    >
      {/* One continuous background for the whole section — the grid, and
          the bulb rendered straight into it, not boxed off as its own card. */}
      <div className="pointer-events-none absolute inset-0 bg-grid mask-fade-b opacity-40" />
      {/* Light mode only: the bulb's glow has nothing to read against on a
          white background, so give it a warm backdrop to pop out of. Dark
          mode already works, so this is zeroed out there and left alone. */}
      <div
        className="pointer-events-none absolute inset-0 opacity-100 dark:opacity-0"
        style={{
          background:
            "radial-gradient(60% 55% at 72% 48%, oklch(0.8 0.13 55 / 0.4), transparent 70%)",
        }}
      />
      <HeroScene reducedMotion={reducedMotion} />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-4 text-center sm:px-6 lg:items-start lg:text-left">
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="glass mb-6 inline-flex items-center gap-2 rounded-full border border-border/70 px-4 py-1.5 text-xs font-semibold tracking-wide text-foreground/80 sm:text-sm"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-brand" />
          </span>
          Wholesale Prices · Trusted Since Years
        </motion.div>

        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-balance font-heading text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:max-w-xl lg:text-6xl"
        >
          Powering Homes,
          <br />
          <span className="text-gradient-brand">Lighting Lives.</span>
        </motion.h1>

        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-6 max-w-xl text-balance text-base text-foreground/80 [text-shadow:0_2px_18px_var(--background)] sm:text-lg"
        >
          {siteConfig.name} brings honest electrical sales, installation and
          repairing to Vadgaon Budruk, Pune — all home appliances, wired and
          fixed by an ITI-trained technician, at true wholesale rates.
        </motion.p>

        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-9 flex flex-col items-center gap-4 sm:flex-row lg:justify-start"
        >
          <Button
            size="lg"
            nativeButton={false}
            render={<a href={`tel:+91${siteConfig.phone}`} />}
            className="h-12 rounded-full bg-brand px-7 text-base text-brand-foreground shadow-lg shadow-brand/30 hover:bg-brand/90"
          >
            <Phone className="size-4" />
            Call {siteConfig.phoneDisplay}
          </Button>
          <Button
            size="lg"
            variant="outline"
            nativeButton={false}
            render={<a href="#contact" />}
            className="glass h-12 rounded-full border-border px-7 text-base"
          >
            Get a Free Quote
            <ArrowRight className="size-4" />
          </Button>
        </motion.div>

        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-10 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
        >
          {chips.map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="glass inline-flex items-center gap-2 rounded-full border border-border/70 px-4 py-2 text-sm font-medium text-foreground/85"
            >
              <Icon className="size-4 text-brand" />
              {label}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
