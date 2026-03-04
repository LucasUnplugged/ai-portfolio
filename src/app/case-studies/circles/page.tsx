import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function CirclesCaseStudy() {
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
          Circles
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Relationship maintenance &amp; personal CRM
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          <Badge variant="outline" className="border-0 bg-teal-500/10 font-normal text-teal-700 dark:text-teal-400">
            Mobile
          </Badge>
          <Badge variant="outline" className="border-0 bg-teal-500/10 font-normal text-teal-700 dark:text-teal-400">
            Minimal
          </Badge>
          <Badge variant="outline" className="border-0 bg-teal-500/10 font-normal text-teal-700 dark:text-teal-400">
            Personal
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
          A mobile app that helps you nurture personal and professional
          relationships with gentle reminders and organized contact management.
          Circles takes the stress out of staying in touch by making
          relationship care feel natural, not transactional.
        </p>
      </section>

      {/* Goals */}
      <section className="mb-10">
        <h2 className="mb-3 text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Design Goals
        </h2>
        <ul className="list-inside list-disc space-y-2 text-foreground">
          <li>Clean mobile design that feels calm and approachable</li>
          <li>Minimal interface patterns — show only what matters</li>
          <li>Friendly micro-interactions that reward engagement</li>
          <li>People-first UI that puts faces and names above metrics</li>
        </ul>
      </section>

      {/* Approach */}
      <section className="mb-12">
        <h2 className="mb-3 text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Design Approach
        </h2>
        <p className="leading-relaxed text-foreground">
          A fresh teal palette on a light background creates openness and
          friendliness. Inter provides clean readability for everyday text,
          JetBrains Mono marks data elements with clarity. Rounded shapes and
          generous whitespace keep the interface calm — this app should feel
          like a breath of fresh air, not another productivity tool.
        </p>
      </section>

      {/* CTA */}
      <div className="flex items-center gap-4">
        <Button asChild size="lg">
          <Link href="/app/circles">
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
