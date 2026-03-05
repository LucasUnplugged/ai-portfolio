import type { ReactNode } from "react";
import { PhoneSimulator } from "@/components/phone-simulator";
import "./globals.css";

export default function RitualLayout({ children }: { children: ReactNode }) {
  return (
    <div className="ritual-theme flex-1 dark max-w-screen bg-background/96 text-foreground">
      <PhoneSimulator>{children}</PhoneSimulator>
    </div>
  );
}
