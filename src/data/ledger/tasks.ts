import type { Task } from "./types";

export const tasks: Task[] = [
  // Brand Redesign
  {
    id: "task-01",
    projectId: "proj-01",
    title: "Update primary color tokens",
    description:
      "Replace all hardcoded color values with the new amber-based design tokens.",
    assigneeId: "usr-04",
    status: "done",
    priority: "high",
    labels: ["design-system", "tokens"],
    dueDate: "2026-02-28T00:00:00Z",
    createdAt: "2026-02-15T10:00:00Z",
  },
  {
    id: "task-02",
    projectId: "proj-01",
    title: "Redesign navigation component",
    description:
      "Apply new brand styles to the main navigation, including hover states and active indicators.",
    assigneeId: "usr-04",
    status: "in-review",
    priority: "high",
    labels: ["design-system", "navigation"],
    dueDate: "2026-03-05T00:00:00Z",
    createdAt: "2026-02-20T14:00:00Z",
  },
  {
    id: "task-03",
    projectId: "proj-01",
    title: "Create icon set for v2 brand",
    description:
      "Design 24 custom icons for the updated brand including navigation, actions, and status indicators.",
    assigneeId: "usr-04",
    status: "in-progress",
    priority: "medium",
    labels: ["design-system", "icons"],
    dueDate: "2026-03-10T00:00:00Z",
    createdAt: "2026-02-22T09:00:00Z",
  },
  {
    id: "task-04",
    projectId: "proj-01",
    title: "Update email templates",
    description:
      "Apply new brand colors and typography to all transactional email templates.",
    assigneeId: "usr-05",
    status: "backlog",
    priority: "low",
    labels: ["email", "branding"],
    dueDate: "2026-03-15T00:00:00Z",
    createdAt: "2026-02-25T11:00:00Z",
  },

  // API v3 Migration
  {
    id: "task-05",
    projectId: "proj-02",
    title: "Implement PKCE auth flow",
    description:
      "Replace API key authentication with OAuth 2.1 + PKCE for all client types.",
    assigneeId: "usr-02",
    status: "in-progress",
    priority: "urgent",
    labels: ["auth", "security"],
    dueDate: "2026-03-07T00:00:00Z",
    createdAt: "2026-02-10T08:00:00Z",
  },
  {
    id: "task-06",
    projectId: "proj-02",
    title: "Add rate limiting middleware",
    description:
      "Implement tiered rate limiting with Redis-backed counters and burst allowance.",
    assigneeId: "usr-03",
    status: "in-review",
    priority: "high",
    labels: ["middleware", "performance"],
    dueDate: "2026-03-04T00:00:00Z",
    createdAt: "2026-02-12T13:00:00Z",
  },
  {
    id: "task-07",
    projectId: "proj-02",
    title: "Standardize response envelopes",
    description:
      "Wrap all API responses in the v3 envelope format with metadata fields.",
    assigneeId: "usr-03",
    status: "done",
    priority: "high",
    labels: ["api", "schema"],
    dueDate: "2026-02-28T00:00:00Z",
    createdAt: "2026-02-08T10:00:00Z",
  },
  {
    id: "task-08",
    projectId: "proj-02",
    title: "Write migration guide for v2 clients",
    description:
      "Document all breaking changes and provide code examples for migrating from v2 to v3.",
    assigneeId: "usr-02",
    status: "backlog",
    priority: "medium",
    labels: ["documentation"],
    dueDate: "2026-03-20T00:00:00Z",
    createdAt: "2026-02-15T15:00:00Z",
  },
  {
    id: "task-09",
    projectId: "proj-02",
    title: "Set up v3 staging environment",
    description:
      "Provision staging infrastructure for v3 API testing with seed data.",
    assigneeId: "usr-06",
    status: "done",
    priority: "high",
    labels: ["infrastructure", "testing"],
    dueDate: "2026-02-25T00:00:00Z",
    createdAt: "2026-02-05T09:00:00Z",
  },

  // Mobile App Launch
  {
    id: "task-10",
    projectId: "proj-03",
    title: "Implement document viewer",
    description:
      "Build rich content rendering for documents including headings, paragraphs, lists, and code blocks.",
    assigneeId: "usr-03",
    status: "in-progress",
    priority: "high",
    labels: ["mobile", "documents"],
    dueDate: "2026-03-08T00:00:00Z",
    createdAt: "2026-02-20T10:00:00Z",
  },
  {
    id: "task-11",
    projectId: "proj-03",
    title: "Build task list with filters",
    description:
      "Create task list screen with filter by status, assignee, and priority. Include sort options.",
    assigneeId: "usr-02",
    status: "in-progress",
    priority: "high",
    labels: ["mobile", "tasks"],
    dueDate: "2026-03-08T00:00:00Z",
    createdAt: "2026-02-20T10:30:00Z",
  },
  {
    id: "task-12",
    projectId: "proj-03",
    title: "Design bottom tab navigation",
    description:
      "Implement the 5-tab bottom navigation bar with proper icons and active states.",
    assigneeId: "usr-04",
    status: "in-review",
    priority: "medium",
    labels: ["mobile", "navigation"],
    dueDate: "2026-03-05T00:00:00Z",
    createdAt: "2026-02-18T14:00:00Z",
  },
  {
    id: "task-13",
    projectId: "proj-03",
    title: "Set up push notification service",
    description:
      "Configure Firebase Cloud Messaging for both iOS and Android push notifications.",
    assigneeId: "usr-05",
    status: "backlog",
    priority: "medium",
    labels: ["mobile", "notifications"],
    dueDate: "2026-03-15T00:00:00Z",
    createdAt: "2026-02-22T11:00:00Z",
  },
  {
    id: "task-14",
    projectId: "proj-03",
    title: "Implement offline SQLite cache",
    description:
      "Set up SQLite database for offline document caching with sync-on-reconnect.",
    assigneeId: "usr-02",
    status: "backlog",
    priority: "high",
    labels: ["mobile", "offline"],
    dueDate: "2026-03-12T00:00:00Z",
    createdAt: "2026-02-25T09:00:00Z",
  },

  // Security Audit
  {
    id: "task-15",
    projectId: "proj-04",
    title: "Patch critical dependency vulnerabilities",
    description:
      "Update three packages with known CVEs: lodash, express-session, and jsonwebtoken.",
    assigneeId: "usr-06",
    status: "done",
    priority: "urgent",
    labels: ["security", "dependencies"],
    dueDate: "2026-02-20T00:00:00Z",
    createdAt: "2026-02-18T08:00:00Z",
  },
  {
    id: "task-16",
    projectId: "proj-04",
    title: "Fix CORS misconfiguration",
    description:
      "Restrict CORS origins to production and staging domains. Remove wildcard allow.",
    assigneeId: "usr-02",
    status: "done",
    priority: "high",
    labels: ["security", "configuration"],
    dueDate: "2026-02-22T00:00:00Z",
    createdAt: "2026-02-18T08:30:00Z",
  },
  {
    id: "task-17",
    projectId: "proj-04",
    title: "Improve CSP headers",
    description:
      "Tighten Content Security Policy to remove unsafe-inline where possible and add nonce-based script loading.",
    assigneeId: "usr-06",
    status: "in-progress",
    priority: "medium",
    labels: ["security", "headers"],
    dueDate: "2026-03-10T00:00:00Z",
    createdAt: "2026-02-25T10:00:00Z",
  },
  {
    id: "task-18",
    projectId: "proj-04",
    title: "Run OWASP ZAP scan on staging",
    description:
      "Execute automated security scan and document any new findings for remediation.",
    assigneeId: "usr-06",
    status: "backlog",
    priority: "medium",
    labels: ["security", "testing"],
    dueDate: "2026-03-14T00:00:00Z",
    createdAt: "2026-02-28T09:00:00Z",
  },
];

export function getTasksByProject(projectId: string): Task[] {
  return tasks.filter((t) => t.projectId === projectId);
}

export function getTasksByStatus(status: Task["status"]): Task[] {
  return tasks.filter((t) => t.status === status);
}
