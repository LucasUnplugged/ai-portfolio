import type { ReactNode } from "react";
import { PhoneSimulator } from "@/components/phone-simulator";
import "./globals.css";

export default function CirclesLayout({ children }: { children: ReactNode }) {
  return (
    <div className="circles-theme flex-1 max-w-screen bg-gray-100 text-foreground">
      <PhoneSimulator>{children}</PhoneSimulator>
    </div>
  );
}
