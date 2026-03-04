import type { ReactNode } from "react";
import { DemoHeader } from "@/components/demo-header";
import { PhoneSimulator } from "@/components/phone-simulator";
import "./globals.css";

export default function RitualLayout({ children }: { children: ReactNode }) {
  return (
    <div className="ritual-theme min-h-screen bg-background text-foreground">
      <DemoHeader current="ritual" />
      <PhoneSimulator>{children}</PhoneSimulator>
    </div>
  );
}
