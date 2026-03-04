import { Phone, MessageSquare, Coffee, StickyNote } from "lucide-react";
import type { Interaction } from "@/data/circles";

interface InteractionItemProps {
  interaction: Interaction;
}

const typeConfig: Record<
  Interaction["type"],
  { icon: typeof Phone; label: string }
> = {
  call: { icon: Phone, label: "Call" },
  text: { icon: MessageSquare, label: "Text" },
  meetup: { icon: Coffee, label: "Meetup" },
  note: { icon: StickyNote, label: "Note" },
};

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function InteractionItem({ interaction }: InteractionItemProps) {
  const { icon: Icon, label } = typeConfig[interaction.type];

  return (
    <div className="flex gap-3 py-2">
      <div className="flex flex-col items-center">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-muted-foreground">
          <Icon className="h-3.5 w-3.5" />
        </div>
        <div className="w-px flex-1 bg-border mt-1" />
      </div>
      <div className="flex-1 min-w-0 pb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">
            {label}
          </span>
          <span className="text-xs text-muted-foreground/60">
            {formatDate(interaction.date)}
          </span>
        </div>
        <p className="text-sm text-foreground/80 mt-0.5">
          {interaction.summary}
        </p>
      </div>
    </div>
  );
}
