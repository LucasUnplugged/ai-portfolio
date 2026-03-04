"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle, Heart, User } from "lucide-react";

const navItems = [
  { icon: MessageCircle, href: "/app/ritual/circle", id: "circle" as const, label: "Circle" },
  { icon: Heart, href: "/app/ritual/matches", id: "matches" as const, label: "Connections" },
  { icon: User, href: "/app/ritual/profile", id: "profile" as const, label: "Profile" },
] as const;

export type NavId = (typeof navItems)[number]["id"];

interface BottomNavProps {
  current?: NavId;
}

export function BottomNav({ current }: BottomNavProps) {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-around h-14 bg-card border-t border-border shrink-0">
      {navItems.map(({ icon: Icon, href, id, label }) => {
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
            aria-label={label}
          >
            <Icon className="h-5 w-5" fill={isActive ? "currentColor" : "none"} />
          </Link>
        );
      })}
    </nav>
  );
}
