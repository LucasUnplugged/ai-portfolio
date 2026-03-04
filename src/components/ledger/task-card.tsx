import type { Task, User } from "@/data/ledger/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface TaskCardProps {
  task: Task;
  assignee?: User;
  className?: string;
}

const priorityStyles: Record<string, string> = {
  low: "bg-neutral-100 text-neutral-700",
  medium: "bg-blue-100 text-blue-700",
  high: "bg-amber-100 text-amber-700",
  urgent: "bg-red-100 text-red-700",
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function TaskCard({ task, assignee, className }: TaskCardProps) {
  return (
    <Card className={cn("", className)}>
      <CardContent className="p-3">
        {task.labels.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-1">
            {task.labels.map((label) => (
              <Badge
                key={label}
                variant="outline"
                className="text-[10px] px-1.5 py-0"
              >
                {label}
              </Badge>
            ))}
          </div>
        )}
        <p className="text-sm font-medium leading-snug">{task.title}</p>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {assignee && (
              <Avatar className="h-5 w-5">
                <AvatarFallback className="text-[9px]">
                  {assignee.avatarInitials}
                </AvatarFallback>
              </Avatar>
            )}
            <span
              className={cn(
                "inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium",
                priorityStyles[task.priority]
              )}
            >
              {task.priority}
            </span>
          </div>
          <span className="text-[11px] text-muted-foreground">
            {formatDate(task.dueDate)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
