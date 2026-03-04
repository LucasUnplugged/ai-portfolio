import type { Change, User } from "@/data/ledger/types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ChangeDiffProps {
  change: Change;
  author?: User;
  className?: string;
}

const statusStyles: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  approved: "bg-emerald-100 text-emerald-700",
  rejected: "bg-red-100 text-red-700",
};

export function ChangeDiff({ change, author, className }: ChangeDiffProps) {
  const beforeLines = change.beforeText.split("\n");
  const afterLines = change.afterText.split("\n");

  return (
    <div className={cn("space-y-4", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {author && (
            <Avatar className="h-7 w-7">
              <AvatarFallback className="text-[10px]">
                {author.avatarInitials}
              </AvatarFallback>
            </Avatar>
          )}
          <div>
            <h3 className="text-sm font-medium">{change.title}</h3>
            <p className="text-xs text-muted-foreground">
              by {author?.name ?? "Unknown"} &middot;{" "}
              {new Date(change.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <Badge className={statusStyles[change.status]}>{change.status}</Badge>
      </div>

      {/* Diff view */}
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border">
        {/* Before */}
        <div className="bg-background">
          <div className="border-b border-border bg-muted/50 px-3 py-1.5 text-xs font-medium text-muted-foreground">
            Before
          </div>
          <div className="font-mono text-xs">
            {beforeLines.map((line, i) => (
              <div
                key={i}
                className="flex gap-3 border-b border-border/50 px-3 py-1 bg-red-50/50"
              >
                <span className="shrink-0 select-none text-muted-foreground/50 w-5 text-right">
                  {i + 1}
                </span>
                <span className="text-red-900/80">
                  <span className="select-none text-red-400">- </span>
                  {line}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* After */}
        <div className="bg-background">
          <div className="border-b border-border bg-muted/50 px-3 py-1.5 text-xs font-medium text-muted-foreground">
            After
          </div>
          <div className="font-mono text-xs">
            {afterLines.map((line, i) => (
              <div
                key={i}
                className="flex gap-3 border-b border-border/50 px-3 py-1 bg-emerald-50/50"
              >
                <span className="shrink-0 select-none text-muted-foreground/50 w-5 text-right">
                  {i + 1}
                </span>
                <span className="text-emerald-900/80">
                  <span className="select-none text-emerald-400">+ </span>
                  {line}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
