"use client";

import { Plus } from "lucide-react";
import type { Reflection } from "@/data/circles";

interface ReflectionPromptProps {
  reflection: Reflection;
}

export function ReflectionPrompt({ reflection }: ReflectionPromptProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 space-y-4">
      <p className="text-sm font-medium italic text-foreground/90">
        &ldquo;{reflection.prompt}&rdquo;
      </p>
      <textarea
        className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
        rows={3}
        placeholder="Write your reflection..."
        defaultValue={reflection.response ?? ""}
      />
      {reflection.gratitudes.length > 0 && (
        <div className="space-y-1.5">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Gratitudes
          </p>
          <ul className="space-y-1">
            {reflection.gratitudes.map((g, i) => (
              <li key={i} className="text-sm text-foreground/80 flex items-start gap-2">
                <span className="text-primary mt-0.5">&#8226;</span>
                {g}
              </li>
            ))}
          </ul>
        </div>
      )}
      <button
        type="button"
        className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors"
      >
        <Plus className="h-3.5 w-3.5" />
        Add gratitude
      </button>
    </div>
  );
}
