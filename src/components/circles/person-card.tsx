import type { Person } from "@/data/circles";

interface PersonCardProps {
  person: Person;
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

export function PersonCard({ person }: PersonCardProps) {
  return (
    <div className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-accent/50">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
        {person.avatarInitials}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{person.name}</p>
        <p className="text-xs text-muted-foreground capitalize">
          {person.relationship}
        </p>
      </div>
      <p className="text-xs text-muted-foreground shrink-0">
        {formatLastContact(person.lastContact)}
      </p>
    </div>
  );
}
