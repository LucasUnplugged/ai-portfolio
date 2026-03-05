import Link from "next/link";
import type { Project, User } from "@/data/ledger/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
import { FileText, CheckSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  members: User[];
  className?: string;
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return "just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function ProjectCard({ project, members, className }: ProjectCardProps) {
  const visibleMembers = members.slice(0, 3);
  const extraCount = members.length - visibleMembers.length;

  return (
    <Link href={`/app/ledger/projects/${project.slug}`} className="group">
    <Card className={cn("overflow-hidden pb-6 transition-colors group-hover:border-primary/30", className)}>
      <div className="h-1" style={{ backgroundColor: project.color }} />
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <h3 className="text-base font-semibold">{project.name}</h3>
          <Badge variant={project.status === "active" ? "default" : "secondary"}>
            {project.status}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {project.description}
        </p>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <FileText className="h-3.5 w-3.5" />
              {project.documentCount} docs
            </span>
            <span className="flex items-center gap-1">
              <CheckSquare className="h-3.5 w-3.5" />
              {project.taskCount} tasks
            </span>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex -space-x-2">
            {visibleMembers.map((user) => (
              <Avatar key={user.id} className="h-6 w-6 border-2 border-background">
                <AvatarFallback className="text-[10px]">
                  {user.avatarInitials}
                </AvatarFallback>
              </Avatar>
            ))}
            {extraCount > 0 && (
              <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-background bg-muted text-[10px] text-muted-foreground">
                +{extraCount}
              </div>
            )}
          </div>
          <span className="text-xs text-muted-foreground">
            {timeAgo(project.lastUpdated)}
          </span>
        </div>
      </CardContent>
    </Card>
    </Link>
  );
}
