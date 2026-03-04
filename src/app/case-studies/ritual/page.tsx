import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function RitualCaseStudy() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-20">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Portfolio
      </Link>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Ritual
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Structured, time-bound social connections
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          <Badge variant="outline" className="border-0 bg-purple-500/10 font-normal text-purple-700 dark:text-purple-400">
            Mobile
          </Badge>
          <Badge variant="outline" className="border-0 bg-purple-500/10 font-normal text-purple-700 dark:text-purple-400">
            Dark Mode
          </Badge>
          <Badge variant="outline" className="border-0 bg-purple-500/10 font-normal text-purple-700 dark:text-purple-400">
            Social
          </Badge>
        </div>
      </div>

      <Separator className="mb-8" />

      {/* Concept */}
      <section className="mb-10">
        <h2 className="mb-3 text-sm font-medium uppercase tracking-widest text-muted-foreground">
          The Concept
        </h2>
        <p className="leading-relaxed text-foreground">
          A mobile app for maintaining meaningful relationships through scheduled
          rituals — regular check-ins, shared activities, and intentional
          togetherness. Ritual transforms the anxiety of &ldquo;I should reach
          out more&rdquo; into structured, joyful habits.
        </p>
      </section>

      {/* Goals */}
      <section className="mb-10">
        <h2 className="mb-3 text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Design Goals
        </h2>
        <ul className="list-inside list-disc space-y-2 text-foreground">
          <li>Dark mode mobile design that feels intimate, not corporate</li>
          <li>Expressive typography with serif fonts for emotional warmth</li>
          <li>Time-based UI patterns — countdowns, schedules, streaks</li>
          <li>Emotional design that encourages genuine connection</li>
        </ul>
      </section>

      {/* Approach */}
      <section className="mb-12">
        <h2 className="mb-3 text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Design Approach
        </h2>
        <p className="leading-relaxed text-foreground">
          Deep purple and fuchsia tones on a dark background create a sense of
          intimacy. Adamina (serif) gives headings emotional weight, Afacad
          provides clean UI readability, and Fira Code marks timestamps with
          precision. The dark theme isn&apos;t just aesthetic — it creates the
          feeling of a private, personal space.
        </p>
      </section>

      {/* CTA */}
      <div className="flex items-center gap-4">
        <Button asChild size="lg">
          <Link href="/app/ritual">
            Launch Demo
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        <span className="text-sm text-muted-foreground">
          Interactive prototype
        </span>
      </div>
    </div>
  );
}
