"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarCheck, Users, UserPlus, BookHeart } from "lucide-react";

const navItems = [
  { icon: CalendarCheck, href: "/app/circles/today", id: "today" as const },
  { icon: Users, href: "/app/circles/overview", id: "overview" as const },
  { icon: UserPlus, href: "/app/circles/add", id: "add" as const },
  { icon: BookHeart, href: "/app/circles/reflection", id: "reflection" as const },
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
