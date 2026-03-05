"use client";

import { Monitor, Smartphone } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  {
    name: "Ledger",
    caseStudy: "/case-studies/ledger",
    demo: "/app/ledger",
    icon: Monitor,
  },
  {
    name: "Ritual",
    caseStudy: "/case-studies/ritual",
    demo: "/app/ritual",
    icon: Smartphone,
  },
  {
    name: "Circles",
    caseStudy: "/case-studies/circles",
    demo: "/app/circles",
    icon: Smartphone,
  },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
      <div className="flex h-14 items-center px-6 md:px-8 gap-16">
        <Link href="/" className="font-semibold tracking-tight">
          Lucas Castro
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              pathname === "/"
                ? "bg-muted text-foreground"
                : "text-muted-foreground/80 hover:text-foreground"
            }`}
          >
            Home
          </Link>
          {items.map((item) => {
            const isActive = pathname.startsWith(item.caseStudy);
            const Icon = item.icon;
            return (
              <div key={item.name} className="flex items-center gap-0.5">
                <Link
                  href={item.caseStudy}
                  className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground/80 hover:text-foreground"
                  }`}
                >
                  {item.name}
                </Link>
                <Link
                  href={item.demo}
                  className={`rounded-md p-1.5 transition-colors ${
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

        <button
          type="button"
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
          className="ml-auto size-6 cursor-default rounded text-background hover:text-background"
          aria-hidden
          tabIndex={-1}
        />
      </div>
    </header>
  );
}
