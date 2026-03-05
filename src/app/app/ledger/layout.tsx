import type { ReactNode } from "react";
import { LedgerSidebar, LedgerMobileNav } from "@/components/ledger/sidebar";
import "./globals.css";

export default function LedgerLayout({ children }: { children: ReactNode }) {
  return (
    <div className="ledger-theme h-screen md:h-auto md:flex-1 max-w-screen bg-background text-foreground">
      <div className="flex h-full md:min-h-[calc(100vh-3.5rem)]">
        <LedgerSidebar />
        <main className="flex-1 overflow-auto">
          <LedgerMobileNav />
          {children}
        </main>
      </div>
    </div>
  );
}
