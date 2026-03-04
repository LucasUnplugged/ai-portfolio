import { BottomNav } from "./bottom-nav";

type NavId = "today" | "overview" | "add" | "reflection";

interface CirclesShellProps {
  current: NavId;
  children: React.ReactNode;
}

export function CirclesShell({ current, children }: CirclesShellProps) {
  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex-1 overflow-y-auto">{children}</div>
      <BottomNav current={current} />
    </div>
  );
}
