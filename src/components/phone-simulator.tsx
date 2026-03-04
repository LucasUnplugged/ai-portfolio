import type { ReactNode } from "react";

interface PhoneSimulatorProps {
  children: ReactNode;
}

export function PhoneSimulator({ children }: PhoneSimulatorProps) {
  return (
    <div className="flex min-h-[calc(100vh-3rem)] items-center justify-center p-8">
      <div className="relative h-[812px] w-[375px] overflow-hidden rounded-[3rem] border-[8px] border-foreground/10 bg-background shadow-2xl">
        {/* Status bar notch — decorative */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-0 z-10 h-[28px] w-[120px] -translate-x-1/2 rounded-b-2xl bg-foreground/10"
        />
        {/* Scrollable content area */}
        <div className="h-full overflow-y-auto pt-8">{children}</div>
      </div>
    </div>
  );
}
