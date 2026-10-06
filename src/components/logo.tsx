import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-9", className)}
      role="img"
      aria-label="Thakur Electricals logo"
    >
      <circle cx="24" cy="24" r="22.5" stroke="url(#te-ring)" strokeWidth="2" />
      <circle cx="24" cy="24" r="22.5" stroke="url(#te-ring)" strokeWidth="2" opacity="0.25" />
      <path
        d="M26.5 8L15 26h7.5L20 40l13-20h-8l1.5-12z"
        fill="url(#te-bolt)"
        stroke="oklch(0.16 0.02 40)"
        strokeWidth="0.75"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id="te-ring" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--brand)" />
          <stop offset="1" stopColor="var(--gold)" />
        </linearGradient>
        <linearGradient id="te-bolt" x1="15" y1="8" x2="33" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--gold)" />
          <stop offset="1" stopColor="var(--brand)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span className="font-heading text-[1.05rem] font-bold tracking-tight">
          Thakur <span className="text-gradient-brand">Electricals</span>
        </span>
        <span className="mt-1.5 text-[0.65rem] font-medium whitespace-nowrap uppercase tracking-[0.18em] text-muted-foreground">
          Sales · Services · Repairing
        </span>
      </span>
    </div>
  );
}
