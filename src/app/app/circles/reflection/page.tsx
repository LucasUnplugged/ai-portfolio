"use client";

import { CirclesShell } from "@/components/circles/circles-shell";
import { ReflectionPrompt } from "@/components/circles/reflection-prompt";
import { reflections, currentReflection } from "@/data/circles";
import { CirclesPortfolioMenu } from "@/components/circles/portfolio-menu";

const pastReflections = reflections.slice(0, -1).reverse();

export default function ReflectionPage() {
  return (
    <CirclesShell current="reflection">
      <div className="p-4 space-y-5">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-semibold">Reflect</h1>
            <p className="text-sm text-muted-foreground">
              Week of March 4, 2026
            </p>
          </div>
          <CirclesPortfolioMenu />
        </div>

        {/* Current week's reflection */}
        <ReflectionPrompt reflection={currentReflection} />

        {/* Past reflections */}
        {pastReflections.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Past Reflections
            </h2>
            {pastReflections.map((reflection) => (
              <div
                key={reflection.id}
                className="rounded-xl border border-border bg-card/50 p-4 space-y-2"
              >
                <p className="text-xs text-muted-foreground">
                  Week of{" "}
                  {new Date(reflection.weekOf).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p className="text-sm italic text-foreground/70">
                  &ldquo;{reflection.prompt}&rdquo;
                </p>
                {reflection.response && (
                  <p className="text-sm text-foreground/80">
                    {reflection.response}
                  </p>
                )}
                {reflection.gratitudes.length > 0 && (
                  <ul className="space-y-0.5 mt-1">
                    {reflection.gratitudes.map((g, i) => (
                      <li
                        key={i}
                        className="text-xs text-muted-foreground flex items-start gap-1.5"
                      >
                        <span className="text-primary mt-0.5">&#8226;</span>
                        {g}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </CirclesShell>
  );
}
