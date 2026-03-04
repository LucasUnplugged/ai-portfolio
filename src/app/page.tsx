import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowRight } from "lucide-react";

const skillCategories = [
  {
    title: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML/CSS"],
  },
  {
    title: "Design",
    skills: ["Figma", "UI/UX", "Design Systems", "Prototyping", "Motion"],
  },
  {
    title: "Tools",
    skills: ["Git", "CI/CD", "Testing", "Performance", "Accessibility"],
  },
];

const caseStudies = [
  {
    name: "Ledger",
    slug: "ledger",
    description: "Multiplayer project management & knowledge base",
    tags: ["Desktop", "Collaborative", "Real-time"],
    accent: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
    accentBorder: "border-amber-500/20",
    accentDot: "bg-amber-500",
  },
  {
    name: "Ritual",
    slug: "ritual",
    description: "Structured, time-bound social connections",
    tags: ["Mobile", "Dark Mode", "Social"],
    accent: "bg-purple-500/10 text-purple-700 dark:text-purple-400",
    accentBorder: "border-purple-500/20",
    accentDot: "bg-purple-500",
  },
  {
    name: "Circles",
    slug: "circles",
    description: "Relationship maintenance & personal CRM",
    tags: ["Mobile", "Minimal", "Personal"],
    accent: "bg-teal-500/10 text-teal-700 dark:text-teal-400",
    accentBorder: "border-teal-500/20",
    accentDot: "bg-teal-500",
  },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-24">
      {/* Hero */}
      <section className="mb-16 md:mb-24">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Lucas Castro
        </h1>
        <p className="mt-2 text-xl text-muted-foreground sm:text-2xl">
          Product Engineer
        </p>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
          I design and build interfaces that feel considered. Focused on
          frontend craft, interaction design, and the details that make software
          feel alive. Currently exploring the space between design tools and
          production code.
        </p>
      </section>

      {/* Skills */}
      <section className="mb-16 md:mb-24">
        <h2 className="mb-6 text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Expertise
        </h2>
        <div className="space-y-4">
          {skillCategories.map((category) => (
            <div key={category.title} className="flex flex-wrap items-baseline gap-2">
              <span className="w-20 shrink-0 text-sm font-medium text-foreground">
                {category.title}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {category.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="font-normal">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Separator className="mb-16 md:mb-24" />

      {/* Case Studies */}
      <section>
        <h2 className="mb-8 text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Case Studies
        </h2>
        <div className="grid gap-4 sm:gap-6">
          {caseStudies.map((study) => (
            <Link key={study.slug} href={`/case-studies/${study.slug}`}>
              <Card className={`group border ${study.accentBorder} transition-shadow hover:shadow-md`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className={`h-2.5 w-2.5 rounded-full ${study.accentDot}`} />
                    <CardTitle className="text-lg">{study.name}</CardTitle>
                  </div>
                  <CardDescription className="mt-1 pl-[22px]">
                    {study.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {study.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className={`${study.accent} border-0 font-normal`}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground group-hover:text-foreground"
                    tabIndex={-1}
                  >
                    View
                    <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
