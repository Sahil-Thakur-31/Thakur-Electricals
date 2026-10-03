"use client";

import { motion } from "motion/react";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { ContactForm } from "@/components/contact-form";
import { siteConfig } from "@/lib/site-data";

const infoCards = [
  {
    icon: Phone,
    label: "Call Us",
    value: siteConfig.phoneDisplay,
    href: `tel:+91${siteConfig.phone}`,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Chat with us instantly",
    href: siteConfig.social.whatsapp,
  },
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: MapPin,
    label: "Visit Us",
    value: siteConfig.address.full,
    href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      siteConfig.address.full
    )}`,
  },
];

export function Contact() {
  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Get In Touch"
          title="Let's fix it, install it, or wire it up"
          description="Reach out for a free quote — we respond quickly and offer honest, wholesale pricing on every job."
        />

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.1fr]">
          <div className="flex flex-col gap-4">
            {infoCards.map((card, i) => (
              <motion.a
                key={card.label}
                href={card.href}
                target={card.href.startsWith("http") ? "_blank" : undefined}
                rel={card.href.startsWith("http") ? "noreferrer" : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group flex items-start gap-4 rounded-2xl border border-border/70 bg-card p-5 transition-colors hover:border-brand/40 hover:bg-accent/40"
              >
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand transition-transform group-hover:scale-110">
                  <card.icon className="size-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {card.label}
                  </p>
                  <p className="mt-1 text-sm font-medium sm:text-base">
                    {card.value}
                  </p>
                </div>
              </motion.a>
            ))}

            <div className="flex items-center gap-3 rounded-2xl border border-brand/20 bg-brand/5 p-5">
              <Clock className="size-5 shrink-0 text-brand" />
              <p className="text-sm font-medium">{siteConfig.hours}</p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
