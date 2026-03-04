import type { ReactNode } from "react";
import { DemoHeader } from "@/components/demo-header";
import { LedgerSidebar } from "@/components/ledger/sidebar";
import "./globals.css";

export default function LedgerLayout({ children }: { children: ReactNode }) {
  return (
    <div className="ledger-theme min-h-screen bg-background text-foreground">
      <DemoHeader current="ledger" />
      <div className="flex">
        <LedgerSidebar />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
