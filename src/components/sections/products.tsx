"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import {
  Fan,
  Wind,
  AirVent,
  Flame,
  Droplets,
  Blend,
  Shirt,
  Wrench,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";
import { products } from "@/lib/site-data";
import { SectionHeading } from "@/components/ui/section-heading";

const iconMap: Record<string, LucideIcon> = {
  fan: Fan,
  wind: Wind,
  "air-vent": AirVent,
  flame: Flame,
  droplets: Droplets,
  blend: Blend,
  shirt: Shirt,
  wrench: Wrench,
};

// Alternating tilt gives the grid a "scattered repair tags" feel instead of
// a flat, uniform grid — each card straightens up on hover.
const TILTS = [-2, 1.5, -1, 2, -1.5, 1, -2.5];

/**
 * Draws ONE real thread per row by measuring where each card's two holes
 * actually sit in the DOM and connecting them in order — not several
 * independent decorative segments stitched together (which never quite
 * lined up and had nothing to stop at a row's last hole). A new row starts
 * a fresh sub-path, so the thread never cuts diagonally across the grid.
 * Re-measured on resize/content change, so it tracks the real layout at
 * every breakpoint instead of assuming one.
 */
const TAIL = 46;

// A short, slightly curved, frayed fibre at a tip — several of these at
// varied length/angle read as a loosely cut thread end. They branch from
// points just shy of the very tip (not all from one exact vertex), which
// is what separates "frayed fibres" from a stiff three-pronged fork.
function frayEnd(tipX: number, tipY: number, dir: 1 | -1) {
  const strands = [
    { back: 7, off: -6, len: 15, bow: -5 },
    { back: 3, off: 0, len: 19, bow: 4 },
    { back: 8, off: 6, len: 13, bow: 6 },
  ];
  let d = "";
  for (const s of strands) {
    const bx = tipX - s.back * dir;
    const by = tipY + s.off * 0.4;
    const ex = bx + s.len * dir;
    const ey = by + s.off;
    const cx = (bx + ex) / 2;
    const cy = (by + ey) / 2 + s.bow;
    d += ` M ${bx} ${by} Q ${cx} ${cy} ${ex} ${ey}`;
  }
  return d;
}

// A real multi-bump wave along a straight segment — several small bumps,
// not one big lens-shaped bow — which is what reads as "tangled" rather
// than two neat parallel arcs. Works for any segment direction/length.
function wavySegment(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  amp: number,
  period: number
) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const steps = Math.max(2, Math.round(len / period));
  const ux = dx / len;
  const uy = dy / len;
  const px = -uy;
  const py = ux;
  let d = "";
  for (let s = 1; s <= steps; s++) {
    const t = s / steps;
    const midT = (s - 0.5) / steps;
    const baseX = x1 + dx * t;
    const baseY = y1 + dy * t;
    const midX = x1 + dx * midT;
    const midY = y1 + dy * midT;
    const dir = s % 2 === 0 ? 1 : -1;
    const ctrlX = midX + px * amp * dir;
    const ctrlY = midY + py * amp * dir;
    d += ` Q ${ctrlX} ${ctrlY} ${baseX} ${baseY}`;
  }
  return d;
}

// The full thread through every row: a genuinely tangled (multi-bump), one
// -piece path — not several overlaid near-straight strands, which read as
// parallel lines instead of a twist.
function buildThread(rows: { x: number; y: number }[][]) {
  let d = "";
  for (const row of rows) {
    const first = row[0];
    const last = row[row.length - 1];
    const leftTipX = first.x - TAIL;
    const rightTipX = last.x + TAIL;
    d += ` M ${leftTipX} ${first.y}`;
    d += wavySegment(leftTipX, first.y, first.x, first.y, 6, 13);
    for (let i = 1; i < row.length; i++) {
      const prev = row[i - 1];
      const curr = row[i];
      d += wavySegment(prev.x, prev.y, curr.x, curr.y, 8, 15);
    }
    d += wavySegment(last.x, last.y, rightTipX, last.y, 6, 13);
    d += frayEnd(leftTipX, first.y, -1);
    d += frayEnd(rightTipX, last.y, 1);
  }
  return d.trim();
}

/**
 * Draws the real thread per row by measuring where each card's two holes
 * actually sit in the DOM and connecting them in order — not several
 * independent decorative segments stitched together (which never quite
 * lined up and had nothing to stop at a row's last hole). A new row starts
 * a fresh sub-path, so the thread never cuts diagonally across the grid.
 * Re-measured on resize/content change, so it tracks the real layout at
 * every breakpoint instead of assuming one.
 */
function useThreadPath(
  containerRef: React.RefObject<HTMLDivElement | null>,
  holeRefs: React.RefObject<(HTMLSpanElement | null)[]>
) {
  const [path, setPath] = useState("");

  const recompute = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const containerBox = container.getBoundingClientRect();
    const points = holeRefs.current
      .filter((el): el is HTMLSpanElement => el !== null)
      .map((el) => {
        const r = el.getBoundingClientRect();
        return {
          x: r.left + r.width / 2 - containerBox.left,
          y: r.top + r.height / 2 - containerBox.top,
        };
      });

    if (points.length < 2) {
      setPath("");
      return;
    }

    // Group into rows first, so each row can get its own leading/trailing
    // tail and tangle — without this, the first/last card in a row had
    // nothing extending toward its outer edge.
    const rows: { x: number; y: number }[][] = [];
    for (const p of points) {
      const row = rows.at(-1);
      if (row && Math.abs(p.y - row[0].y) < 4) {
        row.push(p);
      } else {
        rows.push([p]);
      }
    }

    setPath(buildThread(rows));
  }, [containerRef, holeRefs]);

  useEffect(() => {
    recompute();
    // Cards animate in (stagger up to ~1s); re-measure once they've settled.
    const settle = window.setTimeout(recompute, 1100);

    const ro = new ResizeObserver(recompute);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", recompute);

    return () => {
      window.clearTimeout(settle);
      ro.disconnect();
      window.removeEventListener("resize", recompute);
    };
  }, [recompute, containerRef]);

  return path;
}

export function Products() {
  const containerRef = useRef<HTMLDivElement>(null);
  const holeRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const path = useThreadPath(containerRef, holeRefs);

  return (
    <section id="products" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="All Type Repairing"
          title="We repair every appliance in your home"
          description="Spot your appliance's trouble below — we fix it at your doorstep, usually the same day."
        />

        <div ref={containerRef} className="relative mt-14 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {/* The real thread, behind every card — visible only in the gaps
              and through each hole's spot, hidden everywhere else by the
              card's own opaque body. Three overlaid strands (bowing in
              multi-bump wave along its own length is what makes it read as
              tangled rather than a smooth, straight line. */}
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 size-full overflow-visible text-brand dark:text-white/70"
          >
            <path
              d={path}
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {products.map((product, i) => {
            const Icon = iconMap[product.icon] ?? Fan;
            const tilt = TILTS[i % TILTS.length];
            return (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 24, rotate: 0 }}
                whileInView={{ opacity: 1, y: 0, rotate: tilt }}
                whileHover={{ rotate: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative"
              >
                <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-card px-7 py-5 shadow-sm transition-colors duration-300 group-hover:border-brand/50 group-hover:shadow-lg group-hover:shadow-brand/10">
                  {/* Invisible anchors — not rendered, just where the thread
                      path (measured from these) is pinned to on this card. */}
                  <span
                    ref={(el) => {
                      holeRefs.current[i * 2] = el;
                    }}
                    className="absolute top-10 left-3.5 size-px -translate-y-1/2"
                  />
                  <span
                    ref={(el) => {
                      holeRefs.current[i * 2 + 1] = el;
                    }}
                    className="absolute top-10 right-3.5 size-px -translate-y-1/2"
                  />

                  <div className="flex size-11 items-center justify-center rounded-xl bg-brand/10 text-brand transition-transform duration-300 group-hover:scale-110">
                    <Icon className="size-5" />
                  </div>

                  <p className="mt-4 font-heading text-base font-bold">
                    {product.name}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {product.issue}
                  </p>

                  <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-brand/90">
                    <CheckCircle2 className="size-3.5" />
                    We fix this
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
