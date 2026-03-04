import type { ReactNode } from "react";
import "./globals.css";

export default function RitualLayout({ children }: { children: ReactNode }) {
  return (
    <div className="ritual-theme min-h-screen bg-background text-foreground">
      {children}
    </div>
  );
}
