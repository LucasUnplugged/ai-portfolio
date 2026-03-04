import type { ReactNode } from "react";
import "./globals.css";

export default function CirclesLayout({ children }: { children: ReactNode }) {
  return (
    <div className="circles-theme min-h-screen bg-background text-foreground">
      {children}
    </div>
  );
}
