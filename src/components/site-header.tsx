"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const caseStudies = [
  { name: "Ledger", href: "/case-studies/ledger" },
  { name: "Ritual", href: "/case-studies/ritual" },
  { name: "Circles", href: "/case-studies/circles" },
];

const demos = [
  { name: "Ledger", href: "/app/ledger" },
  { name: "Ritual", href: "/app/ritual" },
  { name: "Circles", href: "/app/circles" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const isDemo = pathname.startsWith("/app/");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Link href="/" className="font-semibold tracking-tight">
            Lucas Castro
          </Link>
          <nav className="flex items-center gap-1">
            <span className="mr-1 text-xs text-muted-foreground/70">Case Studies:</span>
            {caseStudies.map((study) => (
              <Link
                key={study.href}
                href={study.href}
                className={`px-3 py-1.5 text-sm transition-colors ${
                  pathname.startsWith(study.href)
                    ? "bg-muted rounded-md font-medium text-foreground"
                    : "text-muted-foreground/80 hover:text-foreground"
                }`}
              >
                {study.name}
              </Link>
            ))}
          </nav>
        </div>
        {isDemo && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground/70">Demos</span>
            <nav className="flex items-center gap-0.5 rounded-lg bg-muted/50 p-1">
              {demos.map((demo) => (
                <Link
                  key={demo.href}
                  href={demo.href}
                  className={`rounded-md px-3 py-1 text-sm transition-colors ${
                    pathname.startsWith(demo.href)
                      ? "bg-background shadow-sm font-medium text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {demo.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
