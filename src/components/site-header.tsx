import Link from "next/link";

const caseStudies = [
  { name: "Ledger", href: "/case-studies/ledger" },
  { name: "Ritual", href: "/case-studies/ritual" },
  { name: "Circles", href: "/case-studies/circles" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between px-4 md:px-6">
        <Link href="/" className="font-semibold tracking-tight">
          Lucas Castro
        </Link>
        <nav className="flex items-center gap-1">
          {caseStudies.map((study) => (
            <Link
              key={study.href}
              href={study.href}
              className="px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {study.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
