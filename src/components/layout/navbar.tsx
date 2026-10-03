"use client";

import * as React from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { Menu, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { Logo } from "@/components/logo";
import { navLinks, siteConfig } from "@/lib/site-data";

export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    event.preventDefault();
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-6 sm:pt-4"
    >
      <div
        className={`flex w-full max-w-6xl items-center justify-between rounded-2xl border px-4 py-2.5 transition-all duration-300 sm:px-5 ${
          scrolled
            ? "glass border-border/80 shadow-lg shadow-black/5"
            : "border-transparent bg-transparent"
        }`}
      >
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "#home")}
          aria-label="Thakur Electricals — home"
        >
          <Logo />
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="rounded-full px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <ThemeToggle />
          <Button
            nativeButton={false}
            render={<a href={`tel:+91${siteConfig.phone}`} />}
            className="hidden rounded-full bg-brand text-brand-foreground shadow-md shadow-brand/25 hover:bg-brand/90 sm:inline-flex"
          >
            <Phone className="size-4" />
            Call Now
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full lg:hidden"
                  aria-label="Open menu"
                />
              }
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="glass w-[85vw] max-w-sm">
              <SheetHeader>
                <SheetTitle>
                  <Logo />
                </SheetTitle>
              </SheetHeader>
              <nav
                className="mt-4 flex flex-col gap-1 px-4"
                aria-label="Mobile"
              >
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="rounded-xl px-4 py-3 text-base font-medium text-foreground/85 transition-colors hover:bg-accent"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-3 px-4 pb-6">
                <SheetClose
                  nativeButton={false}
                  render={
                    <Button
                      nativeButton={false}
                      render={<a href={`tel:+91${siteConfig.phone}`} />}
                      className="w-full rounded-full bg-brand text-brand-foreground hover:bg-brand/90"
                    />
                  }
                >
                  <Phone className="size-4" />
                  Call {siteConfig.phoneDisplay}
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
