import Link from "next/link";
import Image from "next/image";
import type { RitualUser } from "@/data/ritual/types";

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
  const hasPhoto = user.photos?.length > 0;

  return (
    <Link
      href={`/app/ritual/profile/${user.id}`}
      className={`flex flex-col items-center gap-1.5 ${className}`}
    >
      <div className="relative">
        <div className="relative w-10 h-10 rounded-full overflow-hidden">
          {hasPhoto ? (
            <Image
              src={user.photos[0]}
              alt={user.name}
              fill
              className="object-cover"
              sizes="40px"
              unoptimized
            />
          ) : (
            <div className="w-full h-full bg-secondary flex items-center justify-center text-sm text-secondary-foreground">
              {user.avatarInitials}
            </div>
          )}
        </div>
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
