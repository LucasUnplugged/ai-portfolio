import type { RitualUser } from "@/data/ritual/types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface ProfileHeaderProps {
  user: RitualUser;
  className?: string;
}

export function ProfileHeader({ user, className = "" }: ProfileHeaderProps) {
  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      <Avatar size="lg">
        <AvatarFallback className="bg-secondary text-secondary-foreground text-lg">
          {user.avatarInitials}
        </AvatarFallback>
      </Avatar>

      <h2 className="font-heading text-xl mt-3">{user.name}</h2>
      <p className="text-sm text-muted-foreground mt-0.5">
        {user.age} · {user.location}
      </p>

      <p className="text-sm mt-3 max-w-[280px] leading-relaxed">{user.bio}</p>

      <div className="flex flex-wrap justify-center gap-1.5 mt-4">
        {user.interests.map((interest) => (
          <Badge
            key={interest}
            variant="secondary"
            className="text-[11px] font-normal"
          >
            {interest}
          </Badge>
        ))}
      </div>
    </div>
  );
}
