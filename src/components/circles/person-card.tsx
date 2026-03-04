import type { Person, Circle } from "@/data/circles";
import { getLabelColor } from "@/data/circles";
import { ArrowRightLeft } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PersonCardProps {
  person: Person;
  otherCircles?: Circle[];
  onMove?: (personId: string, targetCircleId: string) => void;
}

function formatLastContact(date: string): string {
  const diff = Math.floor(
    (new Date("2026-03-04").getTime() - new Date(date).getTime()) /
      (1000 * 60 * 60 * 24)
  );
  if (diff === 0) return "Today";
  if (diff === 1) return "Yesterday";
  if (diff < 7) return `${diff} days ago`;
  if (diff < 14) return "1 week ago";
  return `${Math.floor(diff / 7)} weeks ago`;
}

export function PersonCard({ person, otherCircles, onMove }: PersonCardProps) {
  return (
    <div className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-accent/50 group relative">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
        {person.avatarInitials}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{person.name}</p>
        <div className="flex flex-wrap gap-1 mt-0.5">
          {person.labels.slice(0, 3).map((label) => (
            <span
              key={label}
              className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${getLabelColor(label)}`}
            >
              {label}
            </span>
          ))}
          {person.labels.length > 3 && (
            <span className="text-[10px] text-muted-foreground">
              +{person.labels.length - 3}
            </span>
          )}
        </div>
      </div>
      <p className="text-xs text-muted-foreground shrink-0">
        {formatLastContact(person.lastContact)}
      </p>
      {otherCircles && otherCircles.length > 0 && onMove && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-accent text-muted-foreground"
            >
              <ArrowRightLeft className="h-3.5 w-3.5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-[140px]">
            {otherCircles.map((c) => (
              <DropdownMenuItem
                key={c.id}
                onClick={() => onMove(person.id, c.id)}
              >
                <span className="mr-1.5">{c.emoji}</span>
                {c.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
