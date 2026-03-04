import Link from "next/link";

const demos = [
  { id: "ledger", name: "Ledger", href: "/app/ledger" },
  { id: "ritual", name: "Ritual", href: "/app/ritual" },
  { id: "circles", name: "Circles", href: "/app/circles" },
] as const;

type DemoId = (typeof demos)[number]["id"];

interface DemoHeaderProps {
  current: DemoId;
}

export function DemoHeader({ current }: DemoHeaderProps) {
  return (
    <header className="flex items-center justify-between border-b border-border px-4 py-2">
      <Link
        href="/"
        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        &larr; Portfolio
      </Link>
      <nav className="flex items-center gap-1">
        {demos.map((demo) => (
          <Link
            key={demo.id}
            href={demo.href}
            className={`px-2 py-1 text-sm transition-colors ${
              demo.id === current
                ? "font-medium text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {demo.name}
          </Link>
        ))}
      </nav>
    </header>
  );
}
