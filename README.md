<div align="center">

# ⚡ Thakur Electricals

### Powering Homes, Lighting Lives.

A fully 3D, animation-rich marketing site for a local electrical sales, service & repair business — built as an immersive scroll experience rather than a static brochure page.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Three.js](https://img.shields.io/badge/Three.js-R3F-black?style=flat-square&logo=three.js)](https://docs.pmnd.rs/react-three-fiber)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=flat-square&logo=framer&logoColor=white)](https://motion.dev)

</div>

---

## About

**Thakur Electricals** is a sales, service & repair shop in Vadgaon Budruk, Pune, run by Sagar Thakur (ITI Graduate). This repository is the source for their landing page — a single-page site designed to feel premium and alive: a hand-modelled, interactive 3D light bulb anchors the hero, every section reveals itself as you scroll, and the whole thing adapts gracefully across devices, themes, and even browsers without WebGL support.

## ✨ Features

- **Interactive 3D hero** — a procedurally built glass bulb (React Three Fiber) with a glowing filament, drifting sparkles, and pointer-reactive lighting, rendered straight into the page background rather than boxed off in a card.
- **Resilient by design** — if WebGL fails to paint (locked-down GPU, privacy shields, old hardware), the hero falls back to a hand-crafted animated SVG bulb instead of leaving a blank hole. The handoff between the two is verified render-confirmed, not just assumed.
- **Scroll-driven storytelling** — GSAP `ScrollTrigger` and Framer Motion `whileInView` animations stagger every section in as it enters the viewport, with Lenis providing the underlying smooth-scroll feel.
- **"Repair tag" product grid** — a bespoke component where a single hand-drawn thread visibly weaves over and under each card through two punched holes, rather than a generic card grid.
- **Full theming** — light/dark mode via `next-themes`, with every bespoke visual (3D lighting, sparkle color, SVG gradients, thread color) explicitly tuned per theme, not just swapped CSS variables.
- **Validated contact form** — React Hook Form + Zod, with a one-tap handoff into WhatsApp pre-filled with the enquiry.
- **Accessible & reduced-motion aware** — ARIA labelling throughout, keyboard-navigable nav/sheets, and `prefers-reduced-motion` respected for large-scale motion while small ambient animation (a glow pulse, a drift) is deliberately kept.
- **Animated stats, floating call/WhatsApp actions, service & product showcases, testimony-style trust section, and a full footer** — the complete set of sections a local service business needs to convert a visitor into a phone call.

## 🛠️ Tech Stack

| Layer | Library |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router) + [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com) (on [Base UI](https://base-ui.com) primitives) |
| 3D | [Three.js](https://threejs.org) via [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) + [drei](https://github.com/pmndrs/drei) + postprocessing (bloom) |
| Animation | [Framer Motion](https://motion.dev), [GSAP](https://gsap.com) + ScrollTrigger, [Lenis](https://lenis.darkroom.engineering) smooth scroll, [anime.js](https://animejs.com) |
| Forms | [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev) |
| Icons / Toasts | [Lucide](https://lucide.dev), [Sonner](https://sonner.emilkowal.ski) |

## 📂 Project Structure

```
src/
├── app/                      # Next.js App Router entry (layout, page, globals.css)
├── components/
│   ├── layout/                # Navbar, Footer
│   ├── sections/               # Hero, Services, Products, Stats, About, CTA, Contact
│   ├── three/                  # R3F scene (hero-scene.tsx) + animated SVG fallback (static-bulb.tsx)
│   ├── providers/              # Theme + Lenis smooth-scroll providers
│   └── ui/                     # shadcn/ui primitives + bespoke UI (tilt-card, section-heading, ...)
├── hooks/                     # use-reduced-motion, use-gsap-reveal, use-mounted
└── lib/                       # site-data.ts (all copy/content), contact-schema.ts, utils
```

All page copy — services, products, stats, trust points, contact details — lives in **`src/lib/site-data.ts`**, so content can be updated without touching any component.

## 🚀 Getting Started

```bash
# install dependencies
npm install

# start the dev server (http://localhost:4863)
npm run dev

# type-check & lint
npm run lint

# production build
npm run build
npm run start
```

> The dev server runs on a non-default port (`4863`) to avoid colliding with other local projects.

## 🎨 Customizing

- **Content** — edit `src/lib/site-data.ts` (business details, services, products, stats, trust points).
- **Brand colors** — CSS custom properties in `src/app/globals.css` (`--brand`, `--gold`, light/dark palettes).
- **3D scene** — `src/components/three/hero-scene.tsx`; its always-available fallback is `static-bulb.tsx`.

## 📬 Contact

**Thakur Electricals** · Ganesh Kripa, Charwad Wasti, Nivrutti Nagar, Vadgaon Budruk, Pune – 411041
📞 [+91 74480 44549](tel:+917448044549) · ✉️ [thakurelectricals2@gmail.com](mailto:thakurelectricals2@gmail.com)

---

<div align="center">
<sub>Built with Next.js, Three.js, and an unreasonable amount of care for a lightbulb.</sub>
</div>
