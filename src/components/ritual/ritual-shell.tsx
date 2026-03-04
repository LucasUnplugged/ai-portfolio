import { BottomNav, type NavId } from "./bottom-nav";

interface RitualShellProps {
  current: NavId | "chat";
  children: React.ReactNode;
}

export function RitualShell({ current, children }: RitualShellProps) {
  const navCurrent: NavId = current === "chat" ? "circle" : current;

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex-1 overflow-y-auto">{children}</div>
      <BottomNav current={navCurrent} />
    </div>
  );
}
