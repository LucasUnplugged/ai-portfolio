import { Phone, MessageSquare, Check } from "lucide-react";
import type { Reminder, Person } from "@/data/circles";

interface ReminderCardProps {
  reminder: Reminder;
  person: Person;
}

const priorityStyles: Record<Reminder["priority"], string> = {
  high: "border-l-destructive",
  medium: "border-l-primary",
  low: "border-l-muted-foreground/30",
};

export function ReminderCard({ reminder, person }: ReminderCardProps) {
  return (
    <div
      className={`rounded-lg border border-border bg-card p-3 border-l-4 ${priorityStyles[reminder.priority]} space-y-2`}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
          {person.avatarInitials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{person.name}</p>
          <p className="text-xs text-muted-foreground">{reminder.reason}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 pl-12">
        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          aria-label={`Call ${person.name}`}
        >
          <Phone className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          aria-label={`Text ${person.name}`}
        >
          <MessageSquare className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
          aria-label={`Mark ${person.name} as contacted`}
        >
          <Check className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
