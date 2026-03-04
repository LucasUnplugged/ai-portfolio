import type { ReactNode } from "react";
import { DemoHeader } from "@/components/demo-header";
import "./globals.css";

export default function LedgerLayout({ children }: { children: ReactNode }) {
  return (
    <div className="ledger-theme min-h-screen bg-background text-foreground">
      <DemoHeader current="ledger" />
      {children}
    </div>
  );
}
