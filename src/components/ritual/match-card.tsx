import Link from "next/link";
import type { Match, RitualUser } from "@/data/ritual/types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface MatchCardProps {
  match: Match;
  user: RitualUser;
  className?: string;
}

export function MatchCard({ match, user, className = "" }: MatchCardProps) {
  const content = (
    <div
      className={`flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors ${className}`}
    >
      <Avatar>
        <AvatarFallback className="bg-secondary text-secondary-foreground text-sm">
          {user.avatarInitials}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{user.name}</p>
        <p className="text-xs text-muted-foreground truncate">
          {match.status === "matched"
            ? "Tap to chat"
            : `${user.age} · ${user.location}`}
        </p>
      </div>

      {match.status === "matched" && (
        <Badge variant="secondary" className="shrink-0 text-[10px]">
          Matched
        </Badge>
      )}
      {match.status === "pending-sent" && (
        <Badge variant="outline" className="shrink-0 text-[10px]">
          Pending
        </Badge>
      )}
      {match.status === "pending-received" && (
        <div className="flex gap-1.5 shrink-0">
          <Button size="sm" variant="default" className="h-7 text-xs px-3">
            Accept
          </Button>
          <Button size="sm" variant="outline" className="h-7 text-xs px-3">
            Decline
          </Button>
        </div>
      )}
    </div>
  );

  if (match.status === "matched") {
    return <Link href="/app/ritual/dm">{content}</Link>;
  }

  return content;
}
