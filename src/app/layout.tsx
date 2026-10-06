import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { Toaster } from "@/components/ui/sonner";
import { siteConfig } from "@/lib/site-data";
import { heading } from "@/lib/fonts/heading";
import { body } from "@/lib/fonts/body";
import { geistMono } from "@/lib/fonts/mono";

const titleFull = `${siteConfig.name} — ${siteConfig.tagline}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: titleFull,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "electrician Pune",
    "electrician near me",
    "electrician Vadgaon Budruk",
    "electrical repair Pune",
    "electrical wiring Pune",
    "appliance repair Pune",
    "geyser repair Pune",
    "fan repair Pune",
    "Thakur Electricals",
  ],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    title: titleFull,
    description: siteConfig.description,
    type: "website",
    url: siteConfig.siteUrl,
    siteName: siteConfig.name,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: titleFull,
    description: siteConfig.description,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fffaf5" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0b0a" },
  ],
};

// LocalBusiness structured data — this is what lets Google understand
// "who, where, how to reach" well enough to surface the site (and a rich
// result) for local searches like "electrician near me" / "electrician
// Vadgaon Budruk". sameAs only lists profiles that are actually live.
const sameAs = [siteConfig.social.instagram, siteConfig.social.facebook].filter(
  (url) => url && url !== "#"
);

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Electrician",
  name: siteConfig.name,
  description: siteConfig.description,
  image: `${siteConfig.siteUrl}/opengraph-image`,
  url: siteConfig.siteUrl,
  telephone: `+91${siteConfig.phone}`,
  email: siteConfig.email,
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address.full,
    addressLocality: siteConfig.address.locality,
    addressRegion: siteConfig.address.region,
    postalCode: siteConfig.address.postalCode,
    addressCountry: siteConfig.address.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: siteConfig.geo.lat,
    longitude: siteConfig.geo.lng,
  },
  areaServed: {
    "@type": "City",
    name: "Pune",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "00:00",
    closes: "23:59",
  },
  ...(sameAs.length > 0 ? { sameAs } : {}),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${heading.variable} ${body.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScrollProvider>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
            >
              Skip to content
            </a>
            {children}
            <Toaster richColors position="top-center" />
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
