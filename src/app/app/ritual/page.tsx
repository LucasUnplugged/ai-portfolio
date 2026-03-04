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
        <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
          <div className="h-10 w-10 rounded-full border-2 border-primary/60" />
        </div>

        {/* Title */}
        <h1 className="font-heading text-5xl tracking-tight">Ritual</h1>

        {/* Tagline */}
        <p className="mt-3 text-sm text-muted-foreground">
          Meaningful connections, one circle at a time
        </p>

        {/* Description */}
        <p className="mt-6 text-sm leading-relaxed text-muted-foreground/80">
          Join a circle of 6&ndash;8 people for two weeks of daily prompts,
          group conversations, and real connections. No swiping, no algorithms
          &mdash; just people being people.
        </p>

        {/* CTA */}
        <Button asChild className="mt-10 w-full" size="lg">
          <Link href="/app/ritual/circle">Join a Circle</Link>
        </Button>

        {/* Footer hint */}
        <p className="mt-6 text-xs text-muted-foreground/50">
          Your circle is waiting
        </p>
      </div>
    </div>
  );
}
