import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function LedgerCaseStudy() {
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
          Ledger
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Multiplayer project management &amp; knowledge base
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          <Badge variant="outline" className="border-0 bg-amber-500/10 font-normal text-amber-700 dark:text-amber-400">
            Desktop
          </Badge>
          <Badge variant="outline" className="border-0 bg-amber-500/10 font-normal text-amber-700 dark:text-amber-400">
            Collaborative
          </Badge>
          <Badge variant="outline" className="border-0 bg-amber-500/10 font-normal text-amber-700 dark:text-amber-400">
            Real-time
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
          Think Notion meets Linear — a real-time collaborative workspace with a
          warm, inviting aesthetic. Ledger brings together project tracking,
          knowledge management, and team communication in a desktop-first
          interface designed for power users who care about craft.
        </p>
      </section>

      {/* Goals */}
      <section className="mb-10">
        <h2 className="mb-3 text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Design Goals
        </h2>
        <ul className="list-inside list-disc space-y-2 text-foreground">
          <li>Desktop-first layout with information-dense views</li>
          <li>Real-time collaborative patterns — cursors, presence, live edits</li>
          <li>Complex data views: tables, kanban boards, timeline views</li>
          <li>Sophisticated information architecture without visual clutter</li>
        </ul>
      </section>

      {/* Approach */}
      <section className="mb-12">
        <h2 className="mb-3 text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Design Approach
        </h2>
        <p className="leading-relaxed text-foreground">
          A warm amber palette grounds the interface in approachability while
          maintaining professional clarity. Manrope handles UI text with friendly
          geometry, Bricolage Grotesque brings character to headings, and ADLaM
          Display provides distinctive display moments. The emphasis is on
          density done right — every pixel earns its place.
        </p>
      </section>

      {/* CTA */}
      <div className="flex items-center gap-4">
        <Button asChild size="lg">
          <Link href="/app/ledger">
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
