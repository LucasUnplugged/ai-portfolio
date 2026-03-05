"use client";

import { useState } from "react";
import { Menu, Monitor, Smartphone } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const items = [
  { name: "Ledger", caseStudy: "/case-studies/ledger", demo: "/app/ledger", icon: Monitor },
  { name: "Ritual", caseStudy: "/case-studies/ritual", demo: "/app/ritual", icon: Smartphone },
  { name: "Circles", caseStudy: "/case-studies/circles", demo: "/app/circles", icon: Smartphone },
];

export function CirclesPortfolioMenu() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          className="min-h-7 flex items-center text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Portfolio menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="circles-theme w-64">
        <SheetTitle className="sr-only">Navigation</SheetTitle>
        <nav className="flex flex-col gap-1 pt-8">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className={`rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
              pathname === "/"
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Home
          </Link>
          {items.map((item) => {
            const isActive =
              pathname.startsWith(item.caseStudy) ||
              pathname.startsWith(item.demo);
            const Icon = item.icon;
            return (
              <div key={item.name} className="flex items-center justify-between">
                <Link
                  href={item.caseStudy}
                  onClick={() => setOpen(false)}
                  className={`flex-1 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.name}
                </Link>
                <Link
                  href={item.demo}
                  onClick={() => setOpen(false)}
                  className={`flex min-h-10 min-w-10 items-center justify-center rounded-md transition-colors ${
                    pathname.startsWith(item.demo)
                      ? "text-foreground"
                      : "text-muted-foreground/60 hover:text-foreground"
                  }`}
                  title={`${item.name} demo`}
                >
                  <Icon className="size-4" />
                </Link>
              </div>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
