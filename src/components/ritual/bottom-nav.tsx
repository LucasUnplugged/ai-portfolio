"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, MessageCircle, Heart, User } from "lucide-react";

const navItems = [
  { icon: Users, href: "/app/ritual/circle", id: "circle" as const },
  { icon: MessageCircle, href: "/app/ritual/chat", id: "chat" as const },
  { icon: Heart, href: "/app/ritual/matches", id: "matches" as const },
  { icon: User, href: "/app/ritual/profile", id: "profile" as const },
] as const;

type NavId = (typeof navItems)[number]["id"];

interface BottomNavProps {
  current?: NavId;
}

export function BottomNav({ current }: BottomNavProps) {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-around h-14 bg-card border-t border-border shrink-0">
      {navItems.map(({ icon: Icon, href, id }) => {
        const isActive = current === id || pathname === href;
        return (
          <Link
            key={id}
            href={href}
            className={`flex items-center justify-center w-12 h-12 transition-colors ${
              isActive
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
            aria-label={id}
          >
            <Icon className="h-5 w-5" />
          </Link>
        );
      })}
    </nav>
  );
}
