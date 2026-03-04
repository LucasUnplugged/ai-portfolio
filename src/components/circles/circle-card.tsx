import type { Circle, Person } from "@/data/circles";

interface CircleCardProps {
  circle: Circle;
  members: Person[];
}

export function CircleCard({ circle, members }: CircleCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-lg" role="img" aria-label={circle.name}>
          {circle.emoji}
        </span>
        <h3 className="font-medium text-sm">{circle.name}</h3>
        <span className="text-xs text-muted-foreground ml-auto">
          {members.length} people
        </span>
      </div>
      <p className="text-xs text-muted-foreground">{circle.description}</p>
      <div className="flex items-center gap-1.5">
        {members.slice(0, 5).map((member) => (
          <div
            key={member.id}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-[10px] font-medium text-primary"
            title={member.name}
          >
            {member.avatarInitials}
          </div>
        ))}
        {members.length > 5 && (
          <span className="text-xs text-muted-foreground ml-1">
            +{members.length - 5}
          </span>
        )}
      </div>
    </div>
  );
}
