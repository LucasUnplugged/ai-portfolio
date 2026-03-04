"use client";

import Link from "next/link";
import { ArrowLeft, FileText, CheckSquare } from "lucide-react";
import {
  getProjectById,
  getUserById,
  getDocumentsByProject,
  getTasksByProject,
  auditLog,
  users,
} from "@/data/ledger";
import type { Task } from "@/data/ledger/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "@/components/ui/avatar";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { TaskCard } from "@/components/ledger/task-card";
import { ActivityFeed } from "@/components/ledger/activity-feed";
import { StatCard } from "@/components/ledger/stat-card";

const PROJECT_ID = "proj-01";

const project = getProjectById(PROJECT_ID)!;
const members = project.memberIds
  .map((id) => getUserById(id))
  .filter(Boolean) as NonNullable<ReturnType<typeof getUserById>>[];
const projectDocuments = getDocumentsByProject(PROJECT_ID);
const projectTasks = getTasksByProject(PROJECT_ID);

const documentIds = new Set(projectDocuments.map((d) => d.id));
const taskIds = new Set(projectTasks.map((t) => t.id));
const projectActivity = auditLog.filter(
  (entry) =>
    (entry.targetType === "document" && documentIds.has(entry.targetId)) ||
    (entry.targetType === "task" && taskIds.has(entry.targetId)) ||
    (entry.targetType === "project" && entry.targetId === PROJECT_ID)
);

const taskCountByStatus = projectTasks.reduce(
  (acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
  },
  {} as Record<Task["status"], number>
);

const statusLabels: Record<Task["status"], string> = {
  backlog: "Backlog",
  "in-progress": "In Progress",
  "in-review": "In Review",
  done: "Done",
};

const docStatusVariant: Record<string, "default" | "secondary" | "outline"> = {
  published: "default",
  draft: "outline",
  archived: "secondary",
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

export default function ProjectOverviewPage() {
  return (
    <div className="p-6 lg:p-8 max-w-5xl">
      {/* Back link */}
      <Link
        href="/app/ledger"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Dashboard
      </Link>

      {/* Project header */}
      <div className="mb-8">
        <div className="flex items-start justify-between gap-4 mb-2">
          <h1 className="text-2xl font-heading font-bold tracking-tight">
            {project.name}
          </h1>
          <Badge variant={project.status === "active" ? "default" : "secondary"}>
            {project.status}
          </Badge>
        </div>
        <p className="text-muted-foreground mb-4 max-w-2xl">
          {project.description}
        </p>
        <div className="flex items-center gap-3">
          <AvatarGroup>
            {members.map((member) => (
              <Avatar key={member.id} size="sm">
                <AvatarFallback className="text-[10px]">
                  {member.avatarInitials}
                </AvatarFallback>
              </Avatar>
            ))}
            {members.length > 0 && (
              <AvatarGroupCount className="text-[10px]">
                {members.length}
              </AvatarGroupCount>
            )}
          </AvatarGroup>
          <span className="text-sm text-muted-foreground">
            {members.length} member{members.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Tabbed content */}
      <Tabs defaultValue="documents">
        <TabsList variant="line">
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        {/* Documents tab */}
        <TabsContent value="documents" className="mt-6">
          <div className="space-y-1">
            {projectDocuments.map((doc) => {
              const editor = getUserById(doc.lastEditedBy);
              return (
                <Link
                  key={doc.id}
                  href="/app/ledger/document"
                  className="flex items-center justify-between gap-4 rounded-lg px-4 py-3 hover:bg-muted/50 transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <span className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                      {doc.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <Badge
                      variant={docStatusVariant[doc.status] ?? "outline"}
                      className="text-[11px]"
                    >
                      {doc.status}
                    </Badge>
                    {editor && (
                      <span className="text-xs text-muted-foreground hidden sm:inline">
                        {editor.name}
                      </span>
                    )}
                    <span className="text-xs text-muted-foreground w-16 text-right">
                      {timeAgo(doc.lastEditedAt)}
                    </span>
                  </div>
                </Link>
              );
            })}
            {projectDocuments.length === 0 && (
              <p className="text-sm text-muted-foreground py-8 text-center">
                No documents yet.
              </p>
            )}
          </div>
        </TabsContent>

        {/* Tasks tab */}
        <TabsContent value="tasks" className="mt-6">
          {/* Status summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {(
              ["backlog", "in-progress", "in-review", "done"] as const
            ).map((status) => (
              <StatCard
                key={status}
                title={statusLabels[status]}
                value={taskCountByStatus[status] || 0}
                icon={CheckSquare}
              />
            ))}
          </div>

          {/* Task list sorted by priority */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[...projectTasks]
              .sort((a, b) => {
                const order = { urgent: 0, high: 1, medium: 2, low: 3 };
                return order[a.priority] - order[b.priority];
              })
              .map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  assignee={getUserById(task.assigneeId)}
                />
              ))}
          </div>
        </TabsContent>

        {/* Activity tab */}
        <TabsContent value="activity" className="mt-6">
          <ActivityFeed
            entries={projectActivity}
            users={users}
            maxEntries={20}
          />
          {projectActivity.length === 0 && (
            <p className="text-sm text-muted-foreground py-8 text-center">
              No recent activity.
            </p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
