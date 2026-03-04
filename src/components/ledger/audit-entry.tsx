import type { AuditEntry as AuditEntryType, User } from "@/data/ledger/types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface AuditEntryProps {
  entry: AuditEntryType;
  user?: User;
  className?: string;
}

const actionStyles: Record<string, string> = {
  created: "bg-emerald-100 text-emerald-700",
  edited: "bg-blue-100 text-blue-700",
  deleted: "bg-red-100 text-red-700",
  commented: "bg-violet-100 text-violet-700",
  approved: "bg-emerald-100 text-emerald-700",
  rejected: "bg-red-100 text-red-700",
  merged: "bg-blue-100 text-blue-700",
  assigned: "bg-amber-100 text-amber-700",
};

function formatTime(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function AuditEntryRow({ entry, user, className }: AuditEntryProps) {
  return (
    <TableRow className={cn("", className)}>
      <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
        {formatTime(entry.createdAt)}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarFallback className="text-[10px]">
              {user?.avatarInitials ?? "??"}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm">{user?.name ?? "Unknown"}</span>
        </div>
      </TableCell>
      <TableCell>
        <Badge className={cn("text-[10px]", actionStyles[entry.action])}>
          {entry.action}
        </Badge>
      </TableCell>
      <TableCell className="text-sm">{entry.targetName}</TableCell>
      <TableCell className="text-xs text-muted-foreground max-w-[200px] truncate">
        {entry.details}
      </TableCell>
    </TableRow>
  );
}
