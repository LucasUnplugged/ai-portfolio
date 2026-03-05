"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderOpen,
  FileText,
  GitCompare,
  CheckSquare,
  AlertTriangle,
  ScrollText,
  Menu,
  Monitor,
  Smartphone,
  ChevronRight,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { users, projects } from "@/data/ledger";

const navItems = [
  { label: "Dashboard", href: "/app/ledger", icon: LayoutDashboard },
  { label: "Projects", href: "/app/ledger/projects", icon: FolderOpen },
  { label: "Documents", href: "/app/ledger/documents", icon: FileText },
  { label: "Changes", href: "/app/ledger/changes", icon: GitCompare },
  { label: "Tasks", href: "/app/ledger/tasks", icon: CheckSquare },
  { label: "Conflicts", href: "/app/ledger/conflicts", icon: AlertTriangle },
  { label: "Audit Log", href: "/app/ledger/audit", icon: ScrollText },
];

const statusColors: Record<string, string> = {
  online: "bg-emerald-500",
  away: "bg-amber-400",
  offline: "bg-neutral-400",
};

const visibleUsers = users.slice(0, 4);
const hiddenCount = users.length - visibleUsers.length;
const currentProject = projects[0];

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-6 p-4">
      {/* Logo */}
      <div className="flex items-center gap-2 px-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground text-sm font-bold">
          L
        </div>
        <span className="text-base font-semibold tracking-tight">Ledger</span>
      </div>

      {/* Navigation */}
      <nav aria-label="Ledger navigation">
        <div className="mb-2 px-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Navigation
        </div>
        <ul className="space-y-0.5">
          {navItems.map((item) => {
            const isActive =
              item.href === "/app/ledger"
                ? pathname === "/app/ledger"
                : pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  className={`flex items-center gap-3 rounded-md px-2 py-1.5 text-sm transition-colors ${
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Team */}
      <div>
        <div className="mb-2 px-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Team
        </div>
        <ul className="space-y-1">
          {visibleUsers.map((user) => (
            <li
              key={user.id}
              className="flex items-center gap-3 rounded-md px-2 py-1.5"
            >
              <div className="relative flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-medium">
                {user.avatarInitials}
                <span
                  className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-sidebar-background ${statusColors[user.status]}`}
                />
              </div>
              <div className="min-w-0">
                <div className="truncate text-sm">{user.name}</div>
                <div className="truncate text-xs text-muted-foreground">
                  {user.role}
                </div>
              </div>
            </li>
          ))}
          {hiddenCount > 0 && (
            <li className="px-2 py-1 text-xs text-muted-foreground">
              +{hiddenCount} more
            </li>
          )}
        </ul>
      </div>

      {/* Current Project */}
      {currentProject && (
        <div className="mt-auto border-t border-border pt-4">
          <div className="rounded-md bg-muted/50 px-3 py-2">
            <div className="text-xs text-muted-foreground">Current Project</div>
            <div className="mt-0.5 flex items-center gap-2 text-sm font-medium">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: currentProject.color }}
              />
              {currentProject.name}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function LedgerSidebar() {
  return (
    <aside className="hidden md:block w-60 shrink-0 border-r border-border bg-sidebar text-sidebar-foreground sticky top-14 h-[calc(100vh-3.5rem)]">
      <ScrollArea className="h-full">
        <SidebarContent />
      </ScrollArea>
    </aside>
  );
}

const siteNavItems = [
  { name: "Ledger", caseStudy: "/case-studies/ledger", demo: "/app/ledger", icon: Monitor },
  { name: "Ritual", caseStudy: "/case-studies/ritual", demo: "/app/ritual", icon: Smartphone },
  { name: "Circles", caseStudy: "/case-studies/circles", demo: "/app/circles", icon: Smartphone },
];

export function LedgerMobileNav() {
  const pathname = usePathname();
  const [ledgerOpen, setLedgerOpen] = useState(false);
  const [siteOpen, setSiteOpen] = useState(false);

  return (
    <div className="md:hidden border-b border-border flex items-center">
      {/* Left: Ledger nav */}
      <Sheet open={ledgerOpen} onOpenChange={setLedgerOpen}>
        <SheetTrigger asChild>
          <button
            type="button"
            className="flex h-10 items-center gap-2 px-4 text-sm text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Open navigation"
          >
            <Menu className="size-4" />
            <span>Menu</span>
          </button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="ledger-theme w-60 bg-sidebar text-sidebar-foreground p-0"
        >
          <SheetTitle className="sr-only">Ledger Navigation</SheetTitle>
          <ScrollArea className="h-full">
            <SidebarContent onNavigate={() => setLedgerOpen(false)} />
          </ScrollArea>
        </SheetContent>
      </Sheet>

      {/* Right: Portfolio / site nav */}
      <Sheet open={siteOpen} onOpenChange={setSiteOpen}>
        <SheetTrigger asChild>
          <button
            type="button"
            className="ml-auto flex h-10 items-center gap-1.5 px-4 text-sm text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Open portfolio navigation"
          >
            <span>Portfolio</span>
            <ChevronRight className="size-3.5" />
          </button>
        </SheetTrigger>
        <SheetContent side="right" className="w-64">
          <SheetTitle className="sr-only">Portfolio Navigation</SheetTitle>
          <nav className="flex flex-col gap-1 pt-8">
            <Link
              href="/"
              onClick={() => setSiteOpen(false)}
              className={`rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                pathname === "/"
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Home
            </Link>
            {siteNavItems.map((item) => {
              const isActive =
                pathname.startsWith(item.caseStudy) ||
                pathname.startsWith(item.demo);
              const Icon = item.icon;
              return (
                <div key={item.name} className="flex items-center justify-between">
                  <Link
                    href={item.caseStudy}
                    onClick={() => setSiteOpen(false)}
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
                    onClick={() => setSiteOpen(false)}
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
    </div>
  );
}
