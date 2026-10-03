"use client";

import { motion } from "motion/react";
import {
  Clock,
  BadgeCheck,
  Shield,
  HandCoins,
  GraduationCap,
  Star,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { trustPoints, siteConfig } from "@/lib/site-data";

const iconMap: Record<string, LucideIcon> = {
  clock: Clock,
  "badge-check": BadgeCheck,
  shield: Shield,
  "hand-coins": HandCoins,
};

export function About() {
  return (
    <section id="why-us" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto w-full max-w-sm"
          >
            <div className="animate-float relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-border/70 bg-gradient-to-br from-brand/15 via-transparent to-gold/10">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center">
                <div className="flex size-24 items-center justify-center rounded-full bg-brand/15 text-brand ring-4 ring-brand/10">
                  <span className="font-heading text-4xl font-bold">ST</span>
                </div>
                <div>
                  <p className="font-heading text-xl font-bold">
                    {siteConfig.owner}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {siteConfig.ownerTitle}
                  </p>
                </div>
                <div className="flex gap-1 text-gold">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-current" />
                  ))}
                </div>
              </div>
            </div>

            <div className="glass absolute -bottom-6 -right-4 flex items-center gap-3 rounded-2xl border border-border/70 px-4 py-3 shadow-lg sm:-right-8">
              <div className="flex size-10 items-center justify-center rounded-full bg-brand/15 text-brand">
                <GraduationCap className="size-5" />
              </div>
              <div className="text-left leading-tight">
                <p className="text-sm font-bold">ITI Graduate</p>
                <p className="text-xs text-muted-foreground">
                  Trained · Skilled · Trusted
                </p>
              </div>
            </div>
          </motion.div>

          <div>
            <SectionHeading
              align="left"
              eyebrow="Why Choose Us"
              title="Your service, our responsibility"
              description={siteConfig.taglineMarathi + " — that's our promise on every job, big or small."}
              className="items-start text-left"
            />

            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {trustPoints.map((point, i) => {
                const Icon = iconMap[point.icon] ?? Shield;
                return (
                  <motion.div
                    key={point.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6, delay: i * 0.08 }}
                    className="rounded-2xl border border-border/70 bg-card p-5"
                  >
                    <Icon className="size-5 text-brand" />
                    <p className="mt-3 font-heading text-base font-semibold">
                      {point.title}
                    </p>
                    <p className="mt-1.5 text-sm text-muted-foreground">
                      {point.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
