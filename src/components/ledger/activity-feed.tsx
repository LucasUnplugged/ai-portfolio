import type { AuditEntry, User } from "@/data/ledger/types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface ActivityFeedProps {
  entries: AuditEntry[];
  users: User[];
  maxEntries?: number;
  className?: string;
}

const actionColors: Record<string, string> = {
  created: "text-emerald-600",
  edited: "text-blue-600",
  deleted: "text-red-600",
  commented: "text-violet-600",
  approved: "text-emerald-600",
  rejected: "text-red-600",
  merged: "text-blue-600",
  assigned: "text-amber-600",
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function ActivityFeed({
  entries,
  users,
  maxEntries = 10,
  className,
}: ActivityFeedProps) {
  const visible = entries.slice(0, maxEntries);
  const userMap = new Map(users.map((u) => [u.id, u]));

  return (
    <div className={cn("space-y-1", className)}>
      {visible.map((entry, i) => {
        const user = userMap.get(entry.userId);
        return (
          <div
            key={entry.id}
            className={cn(
              "flex items-start gap-3 py-2.5 px-2 rounded-md",
              i < visible.length - 1 && "border-b border-border"
            )}
          >
            <Avatar className="h-7 w-7 shrink-0 mt-0.5">
              <AvatarFallback className="text-[10px]">
                {user?.avatarInitials ?? "??"}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="text-sm">
                <span className="font-medium">{user?.name ?? "Unknown"}</span>{" "}
                <span className={actionColors[entry.action] ?? ""}>
                  {entry.action}
                </span>{" "}
                <span className="text-muted-foreground">
                  &ldquo;{entry.targetName}&rdquo;
                </span>
              </p>
              {entry.details && (
                <p className="text-xs text-muted-foreground mt-0.5 truncate">
                  {entry.details}
                </p>
              )}
            </div>
            <span className="shrink-0 text-xs text-muted-foreground whitespace-nowrap mt-0.5">
              {timeAgo(entry.createdAt)}
            </span>
          </div>
        );
      })}
    </div>
  );
}
