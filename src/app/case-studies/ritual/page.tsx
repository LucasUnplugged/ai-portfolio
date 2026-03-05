import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowRight } from "lucide-react";

export default function RitualCaseStudy() {
  return (
    <div className="mx-auto max-w-4xl px-12 py-10 md:px-16 md:py-12">
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
          Modern dating apps trap users in dopamine loops — endless swiping,
          algorithmic manipulation, and the exhaustion that follows. Ritual
          replaces that cycle with a calm, weekly space for genuine connection.
          Small circles of 6&ndash;8 people share daily prompts and real
          conversations over two intentional weeks. No swiping, no feeds —
          just people being people.
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
          The dark theme evokes intimacy and nighttime social energy — the
          feeling of a private space where real conversations happen. Purple
          and fuchsia tones bring warmth without the cold blue typical of
          social apps. Serif headings carry emotional weight, while clean sans-serif
          body text keeps the interface calm and readable. Every typographic
          choice reinforces the philosophy: slow down, pay attention, connect.
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
