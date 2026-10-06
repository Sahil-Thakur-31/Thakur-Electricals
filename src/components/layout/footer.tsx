import * as React from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { Logo } from "@/components/logo";
import { navLinks, services, siteConfig } from "@/lib/site-data";

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M14 9h2.5V6H14c-1.93 0-3.5 1.57-3.5 3.5V11H8v3h2.5v6h3v-6h2.4l.6-3h-3V9.6c0-.44.16-.6.6-.6z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border/70 bg-secondary text-secondary-foreground">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-secondary-foreground/70">
              {siteConfig.description}
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href={siteConfig.social.instagram}
                aria-label="Instagram"
                className="flex size-9 items-center justify-center rounded-full border border-secondary-foreground/15 transition-colors hover:border-brand hover:text-brand"
              >
                <InstagramIcon className="size-4" />
              </a>
              <a
                href={siteConfig.social.facebook}
                aria-label="Facebook"
                className="flex size-9 items-center justify-center rounded-full border border-secondary-foreground/15 transition-colors hover:border-brand hover:text-brand"
              >
                <FacebookIcon className="size-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-secondary-foreground/60">
              Navigate
            </h3>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-secondary-foreground/80 transition-colors hover:text-brand"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-secondary-foreground/60">
              Services
            </h3>
            <ul className="mt-4 space-y-2.5">
              {services.slice(0, 5).map((service) => (
                <li key={service.title}>
                  <a
                    href="#services"
                    className="text-sm text-secondary-foreground/80 transition-colors hover:text-brand"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-secondary-foreground/60">
              Contact
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={`tel:+91${siteConfig.phone}`}
                  className="flex items-start gap-2.5 text-sm text-secondary-foreground/80 transition-colors hover:text-brand"
                >
                  <Phone className="mt-0.5 size-4 shrink-0" />
                  {siteConfig.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-start gap-2.5 text-sm text-secondary-foreground/80 transition-colors hover:text-brand"
                >
                  <Mail className="mt-0.5 size-4 shrink-0" />
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <address className="not-italic">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      siteConfig.address.full
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-start gap-2.5 text-sm text-secondary-foreground/80 transition-colors hover:text-brand"
                  >
                    <MapPin className="mt-0.5 size-4 shrink-0" />
                    {siteConfig.address.full}
                  </a>
                </address>
              </li>
            </ul>
          </div>
        </div>

        {/* Stacked and centered rather than pushed to the far edges — a
            right-aligned line here would sit right under the fixed
            call/WhatsApp buttons once the footer scrolls into view. */}
        <div className="mt-12 flex flex-col items-center gap-2 border-t border-secondary-foreground/10 pt-6 text-center text-xs text-secondary-foreground/60">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p>{siteConfig.taglineMarathi}</p>
        </div>
      </div>
    </footer>
  );
}
