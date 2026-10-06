import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-brand/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-brand">
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "text-balance font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl",
          align === "center" ? "max-w-4xl" : ""
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-balance text-muted-foreground sm:text-lg",
            align === "center" ? "mx-auto max-w-2xl" : "sm:whitespace-nowrap"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
