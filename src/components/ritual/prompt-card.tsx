import { Sparkles } from "lucide-react";
import type { DailyPrompt } from "@/data/ritual/types";

interface PromptCardProps {
  prompt: DailyPrompt;
  className?: string;
}

export function PromptCard({ prompt, className = "" }: PromptCardProps) {
  const responseCount = prompt.responses.length;

  return (
    <div
      className={`rounded-xl border border-border bg-card p-4 space-y-3 ${className}`}
    >
      <Sparkles className="h-5 w-5 text-primary" />
      <p className="font-heading text-base leading-snug">{prompt.text}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          {new Date(prompt.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </span>
        {responseCount > 0 && (
          <span className="text-xs text-primary">
            {responseCount} response{responseCount !== 1 ? "s" : ""}
          </span>
        )}
      </div>
    </div>
  );
}
