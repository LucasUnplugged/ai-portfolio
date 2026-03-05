"use client";

import { useState } from "react";
import Image from "next/image";
import type { DailyPrompt } from "@/data/ritual/types";
import { getUserById } from "@/data/ritual";

interface PromptCardProps {
  prompt: DailyPrompt;
  dayNumber: number;
}

export function PromptCard({ prompt, dayNumber }: PromptCardProps) {
  const [activeOption, setActiveOption] = useState<string | null>(null);

  return (
    <div className="rounded-xl border border-border bg-card p-4 space-y-3">
      <div className="flex items-start justify-between">
        <p className="text-xs font-medium uppercase tracking-wider text-primary">
          Today&apos;s Prompt
        </p>
        <span className="text-xs text-muted-foreground">Day {dayNumber}</span>
      </div>

      <p className="font-heading text-lg leading-snug">{prompt.text}</p>

      {prompt.options && (
        <div className="space-y-2">
          {prompt.options.map((option) => {
            const pickedBy = prompt.responses.filter(
              (r) => r.optionId === option.id
            );

            if (activeOption === option.id) {
              return (
                <div
                  key={option.id}
                  className="rounded-lg border border-border bg-muted/50 p-3 space-y-2"
                >
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-base">{option.emoji}</span>
                    <span className="font-medium">{option.text}</span>
                  </div>
                  <textarea
                    rows={2}
                    placeholder="Share your response..."
                    className="w-full bg-background border border-border rounded-lg p-2 text-sm resize-none outline-none focus:ring-1 focus:ring-primary"
                    autoFocus
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveOption(null)}
                      className="text-xs text-muted-foreground hover:text-foreground px-3 py-1 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveOption(null)}
                      className="text-xs bg-primary text-primary-foreground rounded-md px-3 py-1 hover:bg-primary/90 transition-colors"
                    >
                      Save
                    </button>
                  </div>
                </div>
              );
            }

            return (
              <button
                key={option.id}
                onClick={() => setActiveOption(option.id)}
                className="w-full flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 py-2.5 text-sm hover:bg-primary hover:text-white hover:border-primary focus:bg-primary focus:text-white focus:border-primary transition-colors group"
              >
                <span className="text-base group-hover:brightness-0 group-hover:invert group-focus:brightness-0 group-focus:invert">{option.emoji}</span>
                <span className="flex-1 text-left">{option.text}</span>
                {pickedBy.length > 0 && (
                  <div className="flex -space-x-1.5">
                    {pickedBy.slice(0, 3).map((r) => {
                      const user = getUserById(r.userId);
                      if (!user) return null;
                      return (
                        <div
                          key={r.userId}
                          className="relative w-5 h-5 rounded-full overflow-hidden border border-card"
                        >
                          <Image
                            src={user.photos[0]}
                            alt={user.name}
                            fill
                            className="object-cover"
                            sizes="20px"
                            unoptimized
                          />
                        </div>
                      );
                    })}
                  </div>
                )}
              </button>
            );
          })}
          <p className="text-xs text-muted-foreground underline cursor-pointer text-center pt-1">
            Skip for now
          </p>
        </div>
      )}
    </div>
  );
}
