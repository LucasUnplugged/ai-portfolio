import type { ReactNode } from "react";
import { LedgerSidebar } from "@/components/ledger/sidebar";
import "./globals.css";

export default function LedgerLayout({ children }: { children: ReactNode }) {
  return (
    <div className="ledger-theme flex-1 max-w-screen bg-background text-foreground">
      <div className="flex">
        <LedgerSidebar />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
