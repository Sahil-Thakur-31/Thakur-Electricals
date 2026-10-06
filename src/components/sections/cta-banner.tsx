"use client";

import { motion } from "motion/react";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-data";

export function CtaBanner() {
  return (
    <section className="relative py-6">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[2rem] bg-brand px-6 py-14 text-center text-brand-foreground sm:px-16"
        >
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-10" />
          <p className="font-heading text-2xl font-bold sm:text-3xl">
            {siteConfig.taglineMarathi}
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-brand-foreground/85 sm:max-w-3xl sm:text-base">
            Your service, our responsibility — call now for wholesale-priced
            electrical work you can trust.
          </p>
          <Button
            size="lg"
            variant="secondary"
            nativeButton={false}
            render={<a href={`tel:+91${siteConfig.phone}`} />}
            className="mt-7 h-12 rounded-full px-7 text-base"
          >
            <Phone className="size-4" />
            {siteConfig.phoneDisplay}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
