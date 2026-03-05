import type { Conflict, User } from "@/data/ledger/types";
import { cn } from "@/lib/utils";

interface ConflictPanelProps {
  conflict: Conflict;
  userA?: User;
  userB?: User;
  className?: string;
}

export function ConflictPanel({
  conflict,
  userA,
  userB,
  className,
}: ConflictPanelProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {/* Header */}
      <div>
        <h3 className="text-sm font-medium">{conflict.sectionTitle}</h3>
        <p className="text-xs text-muted-foreground">
          {userA?.name ?? "User A"} vs {userB?.name ?? "User B"} &middot;{" "}
          {new Date(conflict.createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* Three-panel layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px overflow-hidden rounded-lg border border-border bg-border">
        {/* Mine (User A) */}
        <div className="bg-background">
          <div className="border-b border-border bg-blue-50/50 px-3 py-2 text-xs font-medium">
            <span className="text-blue-700">Mine</span>
            <span className="text-muted-foreground ml-1">
              ({userA?.name ?? "User A"})
            </span>
          </div>
          <div className="p-3 font-mono text-xs leading-relaxed whitespace-pre-wrap">
            {conflict.versionA}
          </div>
        </div>

        {/* Merged */}
        <div className="bg-background">
          <div className="border-b border-border bg-amber-50/50 px-3 py-2 text-xs font-medium">
            <span className="text-amber-700">Merged</span>
          </div>
          <div className="p-3 font-mono text-xs leading-relaxed whitespace-pre-wrap">
            {conflict.merged ?? (
              <span className="italic text-muted-foreground">
                Select a resolution
              </span>
            )}
          </div>
        </div>

        {/* Theirs (User B) */}
        <div className="bg-background">
          <div className="border-b border-border bg-purple-50/50 px-3 py-2 text-xs font-medium">
            <span className="text-purple-700">Theirs</span>
            <span className="text-muted-foreground ml-1">
              ({userB?.name ?? "User B"})
            </span>
          </div>
          <div className="p-3 font-mono text-xs leading-relaxed whitespace-pre-wrap">
            {conflict.versionB}
          </div>
        </div>
      </div>
    </div>
  );
}
