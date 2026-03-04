export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background py-6">
      <div className="container flex flex-col items-center gap-2 px-4 md:flex-row md:justify-between md:px-6">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Lucas Castro
        </p>
        <p className="text-sm text-muted-foreground">
          Product Engineer &middot; Design &amp; Code
        </p>
      </div>
    </footer>
  );
}
