import type { ReactNode } from "react";
import "./globals.css";

export default function LedgerLayout({ children }: { children: ReactNode }) {
  return (
    <div className="ledger-theme min-h-screen bg-background text-foreground">
      {children}
    </div>
  );
}
