export interface User {
  id: string;
  name: string;
  email: string;
  role: "PM" | "Senior Engineer" | "Designer" | "Engineer" | "QA Lead" | "Tech Lead";
  avatarInitials: string;
  status: "online" | "away" | "offline";
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  description: string;
  status: "active" | "archived";
  memberIds: string[];
  documentCount: number;
  taskCount: number;
  lastUpdated: string;
  color: string;
}

export interface ContentBlock {
  type: "heading" | "paragraph" | "list" | "code";
  content: string;
}

export interface Document {
  id: string;
  projectId: string;
  title: string;
  lastEditedBy: string;
  lastEditedAt: string;
  status: "draft" | "published" | "archived";
  contentBlocks: ContentBlock[];
}

export type TaskStatus = "backlog" | "in-progress" | "in-review" | "done";
export type TaskPriority = "low" | "medium" | "high" | "urgent";

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  assigneeId: string;
  status: TaskStatus;
  priority: TaskPriority;
  labels: string[];
  dueDate: string;
  createdAt: string;
}

export interface ChangeComment {
  authorId: string;
  text: string;
  createdAt: string;
}

export interface Change {
  id: string;
  documentId: string;
  authorId: string;
  createdAt: string;
  status: "pending" | "approved" | "rejected";
  title: string;
  beforeText: string;
  afterText: string;
  comments: ChangeComment[];
}

export interface Conflict {
  id: string;
  documentId: string;
  userAId: string;
  userBId: string;
  sectionTitle: string;
  versionA: string;
  versionB: string;
  merged: string | null;
  status: "unresolved" | "resolved";
  createdAt: string;
}

export type AuditAction =
  | "created"
  | "edited"
  | "deleted"
  | "commented"
  | "approved"
  | "rejected"
  | "merged"
  | "assigned";

export interface AuditEntry {
  id: string;
  userId: string;
  action: AuditAction;
  targetType: "document" | "task" | "project" | "change";
  targetId: string;
  targetName: string;
  details: string;
  createdAt: string;
}
