import Link from "next/link";
import type { RitualUser } from "@/data/ritual/types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface CircleMemberProps {
  user: RitualUser;
  className?: string;
}

const statusColor: Record<RitualUser["status"], string> = {
  online: "bg-green-500",
  away: "bg-yellow-500",
  offline: "",
};

export function CircleMember({ user, className = "" }: CircleMemberProps) {
  return (
    <Link
      href="/app/ritual/profile"
      className={`flex flex-col items-center gap-1.5 ${className}`}
    >
      <div className="relative">
        <Avatar>
          <AvatarFallback className="bg-secondary text-secondary-foreground text-sm">
            {user.avatarInitials}
          </AvatarFallback>
        </Avatar>
        {user.status !== "offline" && (
          <span
            className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${statusColor[user.status]}`}
          />
        )}
      </div>
      <span className="text-xs text-muted-foreground truncate max-w-[72px] text-center">
        {user.name.split(" ")[0]}
      </span>
    </Link>
  );
}
