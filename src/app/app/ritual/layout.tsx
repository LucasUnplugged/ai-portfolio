import type { ReactNode } from "react";
import { PhoneSimulator } from "@/components/phone-simulator";
import "./globals.css";

export default function RitualLayout({ children }: { children: ReactNode }) {
  return (
    <div className="ritual-theme dark min-h-screen bg-background text-foreground">
      <PhoneSimulator>{children}</PhoneSimulator>
    </div>
  );
}
