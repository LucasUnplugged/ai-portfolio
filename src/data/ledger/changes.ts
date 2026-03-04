import type { Change } from "./types";

export const changes: Change[] = [
  {
    id: "chg-01",
    documentId: "doc-01",
    authorId: "usr-04",
    createdAt: "2026-03-02T14:30:00Z",
    status: "approved",
    title: "Update color palette section",
    beforeText:
      "The primary palette uses blue tones (#2563eb) to convey professionalism and reliability.",
    afterText:
      "The primary palette centers on warm amber tones to convey trust and professionalism. Secondary colors provide contrast for data visualization and status indicators.",
    comments: [
      {
        authorId: "usr-01",
        text: "The amber shift looks great. Approved.",
        createdAt: "2026-03-02T15:00:00Z",
      },
    ],
  },
  {
    id: "chg-02",
    documentId: "doc-02",
    authorId: "usr-03",
    createdAt: "2026-03-03T08:45:00Z",
    status: "pending",
    title: "Add burst allowance to rate limiting",
    beforeText:
      "Free tier: 100 req/min\nPro tier: 1,000 req/min\nEnterprise: 10,000 req/min",
    afterText:
      "Free tier: 100 req/min\nPro tier: 1,000 req/min\nEnterprise: 10,000 req/min\nBurst allowance: 2x for 30 seconds",
    comments: [
      {
        authorId: "usr-02",
        text: "Should we cap the burst window? 30 seconds might be too generous for free tier.",
        createdAt: "2026-03-03T09:00:00Z",
      },
      {
        authorId: "usr-03",
        text: "Good point. I can add a per-tier burst cap in a follow-up change.",
        createdAt: "2026-03-03T09:10:00Z",
      },
    ],
  },
  {
    id: "chg-03",
    documentId: "doc-06",
    authorId: "usr-02",
    createdAt: "2026-03-02T16:00:00Z",
    status: "approved",
    title: "Add task assignment endpoint",
    beforeText:
      "GET    /v3/tasks              — List tasks (filterable)\nPOST   /v3/tasks              — Create task\nPATCH  /v3/tasks/:id          — Update task",
    afterText:
      "GET    /v3/tasks              — List tasks (filterable)\nPOST   /v3/tasks              — Create task\nPATCH  /v3/tasks/:id          — Update task\nPOST   /v3/tasks/:id/assign   — Assign task",
    comments: [],
  },
  {
    id: "chg-04",
    documentId: "doc-03",
    authorId: "usr-03",
    createdAt: "2026-03-03T16:30:00Z",
    status: "pending",
    title: "Update offline strategy section",
    beforeText:
      "SQLite for local document cache. Conflict resolution uses last-write-wins for all fields.",
    afterText:
      "SQLite for local document cache. Conflict resolution uses last-write-wins for simple fields and operational transform for rich text blocks.",
    comments: [
      {
        authorId: "usr-02",
        text: "OT is complex — do we have bandwidth for this in Sprint 14?",
        createdAt: "2026-03-03T16:45:00Z",
      },
    ],
  },
  {
    id: "chg-05",
    documentId: "doc-05",
    authorId: "usr-06",
    createdAt: "2026-02-28T10:30:00Z",
    status: "rejected",
    title: "Relax CSP to allow inline styles",
    beforeText:
      "style-src 'self';",
    afterText:
      "style-src 'self' 'unsafe-inline';",
    comments: [
      {
        authorId: "usr-02",
        text: "We should use nonce-based loading instead of allowing unsafe-inline. Rejecting.",
        createdAt: "2026-02-28T10:45:00Z",
      },
    ],
  },
];

export function getChangeById(id: string): Change | undefined {
  return changes.find((c) => c.id === id);
}
