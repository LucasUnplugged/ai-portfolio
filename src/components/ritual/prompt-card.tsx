import Image from "next/image";
import type { DailyPrompt } from "@/data/ritual/types";
import { getUserById } from "@/data/ritual";

interface PromptCardProps {
  prompt: DailyPrompt;
  dayNumber: number;
}

export function PromptCard({ prompt, dayNumber }: PromptCardProps) {
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
            return (
              <button
                key={option.id}
                className="w-full flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 py-2.5 text-sm hover:bg-muted transition-colors"
              >
                <span className="text-base">{option.emoji}</span>
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
