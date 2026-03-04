import { BottomNav } from "./bottom-nav";

type NavId = "circle" | "chat" | "matches" | "profile";

interface RitualShellProps {
  current: NavId;
  children: React.ReactNode;
}

export function RitualShell({ current, children }: RitualShellProps) {
  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex-1 overflow-y-auto">{children}</div>
      <BottomNav current={current} />
    </div>
  );
}
