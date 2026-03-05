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
  const [open, setOpen] = useState(false);

  const isDemo = pathname.startsWith("/app/");
  const isPhoneDemo =
    pathname.startsWith("/app/ritual") || pathname.startsWith("/app/circles");
  const isRitual = pathname.startsWith("/app/ritual");

  return (
    <header
      className={`sticky top-0 z-50 w-full ${
        isDemo
          ? "md:border-b md:border-border md:bg-background border-transparent bg-transparent max-md:absolute max-md:pointer-events-none"
          : "border-b border-border bg-background"
      }`}
    >
      <div className="flex h-14 items-center px-6 md:px-8 gap-16">
        <Link
          href="/"
          className={`font-semibold tracking-tight ${isDemo ? "max-md:hidden" : ""}`}
        >
          Lucas Castro
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
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

        {/* Mobile burger menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              className={`ml-auto flex min-h-10 min-w-10 items-center justify-center rounded-md transition-colors pointer-events-auto md:hidden ${
                isPhoneDemo
                  ? isRitual
                    ? "text-white bg-white/10 backdrop-blur-sm hover:bg-white/20"
                    : "text-gray-900 bg-black/5 backdrop-blur-sm hover:bg-black/10"
                  : "hover:bg-muted"
              }`}
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-64">
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
                  <div
                    key={item.name}
                    className="flex items-center justify-between"
                  >
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

        <button
          type="button"
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
          className="ml-auto hidden size-6 cursor-default rounded text-background hover:text-background md:block"
          aria-hidden
          tabIndex={-1}
        />
      </div>
    </header>
  );
}
