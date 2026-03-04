import type { ReactNode } from "react";
import { DemoHeader } from "@/components/demo-header";
import { PhoneSimulator } from "@/components/phone-simulator";
import "./globals.css";

export default function CirclesLayout({ children }: { children: ReactNode }) {
  return (
    <div className="circles-theme min-h-screen bg-background text-foreground">
      <DemoHeader current="circles" />
      <PhoneSimulator>{children}</PhoneSimulator>
    </div>
  );
}
