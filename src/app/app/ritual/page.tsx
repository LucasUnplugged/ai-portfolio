import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function RitualOnboarding() {
  return (
    <div className="relative flex min-h-full flex-col items-center justify-center overflow-hidden p-8">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[80px]" />
        <div className="absolute bottom-1/4 left-1/4 h-40 w-40 rounded-full bg-primary/10 blur-[60px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex w-full max-w-xs flex-col items-center text-center">
        {/* Decorative ring */}
        <div className="mb-8 flex h-20 w-20 items-center justify-center">
          <svg viewBox="0 0 80 80" className="h-20 w-20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <title>Ritual icon (8 circles in a larger circle)</title>
            {Array.from({ length: 8 }).map((_, i) => {
              const angle = (i * 360) / 8;
              const rad = (angle * Math.PI) / 180;
              const cx = 40 + 28 * Math.cos(rad);
              const cy = 40 + 28 * Math.sin(rad);
              return <circle key={i} cx={cx} cy={cy} r={5} className="stroke-primary/80" strokeWidth={1.2} />;
            })}
            <circle cx={40} cy={40} r={10} className="stroke-primary/80" strokeWidth={1.2} />
            <circle cx={40} cy={40} r={28} className="stroke-primary/30" strokeWidth={0.8} />
          </svg>
        </div>

        {/* Title */}
        <h1 className="font-heading text-5xl tracking-tight">Ritual</h1>

        {/* Tagline */}
        <p className="mt-3 text-sm font-medium text-purple-400">
          Meaningful connections, one week at a time
        </p>

        {/* Description */}
        <p className="mt-12 text-sm leading-relaxed text-muted-foreground/80">
          Join a circle of 12&ndash;16 people for a week of daily prompts,
          group conversations, and real connections. No swiping, no algorithms
          &mdash; just people being social.
        </p>

        {/* CTA */}
        <Button asChild className="mt-10 w-full" size="lg">
          <Link href="/app/ritual/circle">Join Circle</Link>
        </Button>
      </div>
    </div>
  );
}
