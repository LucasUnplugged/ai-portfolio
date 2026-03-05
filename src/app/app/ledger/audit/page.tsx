"use client";

import { useMemo } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { auditLog, users, getUserById } from "@/data/ledger";
import type { AuditAction } from "@/data/ledger/types";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const actionStyles: Record<string, string> = {
  created: "bg-emerald-100 text-emerald-700",
  approved: "bg-emerald-100 text-emerald-700",
  merged: "bg-blue-100 text-blue-700",
  edited: "bg-blue-100 text-blue-700",
  deleted: "bg-red-100 text-red-700",
  rejected: "bg-red-100 text-red-700",
  commented: "bg-violet-100 text-violet-700",
  assigned: "bg-amber-100 text-amber-700",
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / 3_600_000);
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "Yesterday";
  return `${days}d ago`;
}

const allActions: AuditAction[] = [
  "created",
  "edited",
  "deleted",
  "commented",
  "approved",
  "rejected",
  "merged",
  "assigned",
];

export default function AuditLogPage() {
  const [userFilter, setUserFilter] = useLocalStorage<string>("ledger-audit-user-filter", "all");
  const [actionFilter, setActionFilter] = useLocalStorage<string>("ledger-audit-action-filter", "all");

  const filtered = useMemo(() => {
    return auditLog.filter((entry) => {
      if (userFilter !== "all" && entry.userId !== userFilter) return false;
      if (actionFilter !== "all" && entry.action !== actionFilter) return false;
      return true;
    });
  }, [userFilter, actionFilter]);

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-6xl">
      {/* Header */}
      <div>
        <h1 className="text-xl font-heading font-semibold tracking-tight">Audit Log</h1>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-6">
        <Select value={userFilter} onValueChange={setUserFilter}>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="All Users" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Users</SelectItem>
            {users.map((user) => (
              <SelectItem key={user.id} value={user.id}>
                {user.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={actionFilter} onValueChange={setActionFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="All Actions" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Actions</SelectItem>
            {allActions.map((action) => (
              <SelectItem key={action} value={action}>
                {action}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-20">Time</TableHead>
            <TableHead className="w-40">User</TableHead>
            <TableHead className="w-28">Action</TableHead>
            <TableHead className="w-48">Target</TableHead>
            <TableHead>Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((entry) => {
            const user = getUserById(entry.userId);
            return (
              <TableRow key={entry.id}>
                <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                  {timeAgo(entry.createdAt)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {user && (
                      <Avatar className="h-5 w-5">
                        <AvatarFallback className="text-[9px]">
                          {user.avatarInitials}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <span className="text-sm truncate">
                      {user?.name ?? "Unknown"}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium ${actionStyles[entry.action] ?? ""}`}
                  >
                    {entry.action}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5">
                    <Badge variant="outline" className="text-[10px] shrink-0">
                      {entry.targetType}
                    </Badge>
                    <span className="text-sm truncate max-w-32">
                      {entry.targetName}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground truncate max-w-64">
                  {entry.details}
                </TableCell>
              </TableRow>
            );
          })}
          {filtered.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                No entries match the current filters.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Footer */}
      <div className="mt-4 text-sm text-muted-foreground">
        Showing {filtered.length} of {auditLog.length} entries
      </div>
    </div>
  );
}
