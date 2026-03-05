import Link from "next/link";
import Image from "next/image";
import { Check, X } from "lucide-react";
import type { Match, RitualUser } from "@/data/ritual/types";

interface MatchCardProps {
  match: Match;
  user: RitualUser;
  className?: string;
  onAccept?: () => void;
  onReject?: () => void;
}

function timeAgo(dateStr: string): string {
  const now = new Date("2026-03-04T12:00:00Z");
  const then = new Date(dateStr);
  const hours = Math.floor((now.getTime() - then.getTime()) / (1000 * 60 * 60));
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function UserAvatar({ user, size = 48 }: { user: RitualUser; size?: number }) {
  const hasPhoto = user.photos?.length > 0;
  return (
    <div
      className="relative rounded-full overflow-hidden shrink-0"
      style={{ width: size, height: size }}
    >
      {hasPhoto ? (
        <Image
          src={user.photos[0]}
          alt={user.name}
          fill
          className="object-cover"
          sizes={`${size}px`}
          unoptimized
        />
      ) : (
        <div className="w-full h-full bg-secondary flex items-center justify-center text-sm text-secondary-foreground">
          {user.avatarInitials}
        </div>
      )}
    </div>
  );
}

export function MatchCard({ match, user, className = "", onAccept, onReject }: MatchCardProps) {
  const card = (
    <div
      className={`flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors ${className}`}
    >
      <UserAvatar user={user} />

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">
          {user.name}, {user.age}
        </p>
        <p className="text-xs text-muted-foreground truncate">
          {match.status === "matched"
            ? "Tap to chat..."
            : match.status === "pending-received"
              ? "Match request received"
              : "Request sent"}
        </p>
      </div>

      {match.status === "matched" && (
        <span className="text-[10px] text-muted-foreground shrink-0">
          {timeAgo(match.matchedAt)}
        </span>
      )}
      {match.status === "pending-sent" && (
        <span className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full shrink-0">
          Sent
        </span>
      )}
      {match.status === "pending-received" && (
        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => onAccept?.()}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground"
          >
            <Check className="h-4 w-4" />
          </button>
          <button
            onClick={() => onReject?.()}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-muted-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );

  if (match.status === "matched") {
    return (
      <Link href={`/app/ritual/dm?thread=${match.dmThreadId}`}>{card}</Link>
    );
  }

  return card;
}
