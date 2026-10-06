"use client";

import * as React from "react";
import {
  Zap,
  Plug,
  Wrench,
  Lightbulb,
  ShieldCheck,
  Home,
  type LucideIcon,
} from "lucide-react";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import { services } from "@/lib/site-data";
import { SectionHeading } from "@/components/ui/section-heading";

const iconMap: Record<string, LucideIcon> = {
  zap: Zap,
  plug: Plug,
  wrench: Wrench,
  lightbulb: Lightbulb,
  "shield-check": ShieldCheck,
  home: Home,
};

export function Services() {
  const sectionRef = useGsapReveal<HTMLDivElement>(".service-card");

  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          align="left"
          eyebrow="What We Do"
          title="Complete electrical services, one call away"
          description="From a single switch repair to full-home rewiring — sales, service and repairing, handled with care."
        />

        <div
          ref={sectionRef}
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] ?? Zap;
            return (
              <TiltCard
                key={service.title}
                className="service-card p-7 shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-brand/10"
              >
                <div
                  className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-brand/10 text-brand"
                  style={{ transform: "translateZ(30px)" }}
                >
                  <Icon className="size-6" />
                </div>
                <h3 className="font-heading text-lg font-semibold">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
                <span className="mt-5 block text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
                  0{i + 1}
                </span>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
