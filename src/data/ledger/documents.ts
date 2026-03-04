import type { Document } from "./types";

export const documents: Document[] = [
  {
    id: "doc-01",
    projectId: "proj-01",
    title: "Brand Guidelines v2",
    lastEditedBy: "usr-04",
    lastEditedAt: "2026-03-02T14:30:00Z",
    status: "published",
    contentBlocks: [
      { type: "heading", content: "Brand Guidelines v2" },
      {
        type: "paragraph",
        content:
          "This document outlines the updated visual identity for Ledger, including primary and secondary color palettes, typography scale, and spacing tokens.",
      },
      { type: "heading", content: "Color Palette" },
      {
        type: "paragraph",
        content:
          "The primary palette centers on warm amber tones to convey trust and professionalism. Secondary colors provide contrast for data visualization and status indicators.",
      },
      {
        type: "list",
        content:
          "Primary: Amber 600 (#d97706)\nSecondary: Blue 600 (#2563eb)\nSuccess: Emerald 600 (#059669)\nDanger: Red 600 (#dc2626)\nNeutral: Slate 50–900",
      },
      { type: "heading", content: "Typography" },
      {
        type: "paragraph",
        content:
          "Headings use Bricolage Grotesque for visual weight. Body text uses Manrope for readability at all sizes. Monospace uses JetBrains Mono for code blocks.",
      },
      {
        type: "code",
        content:
          '--font-heading: "Bricolage Grotesque";\n--font-body: "Manrope";\n--font-mono: "JetBrains Mono";',
      },
    ],
  },
  {
    id: "doc-02",
    projectId: "proj-02",
    title: "API v3 Migration Plan",
    lastEditedBy: "usr-02",
    lastEditedAt: "2026-03-03T09:15:00Z",
    status: "published",
    contentBlocks: [
      { type: "heading", content: "API v3 Migration Plan" },
      {
        type: "paragraph",
        content:
          "This document covers the phased approach to migrating from v2 to v3 of the Ledger API. The migration will be non-breaking for existing clients during a 6-month deprecation window.",
      },
      { type: "heading", content: "Phase 1: Schema Updates" },
      {
        type: "paragraph",
        content:
          "All response envelopes will be standardized to include metadata fields: requestId, timestamp, and pagination cursors.",
      },
      {
        type: "code",
        content:
          '{\n  "data": [...],\n  "meta": {\n    "requestId": "req_abc123",\n    "timestamp": "2026-03-03T09:15:00Z",\n    "cursor": "eyJpZCI6MTB9"\n  }\n}',
      },
      { type: "heading", content: "Phase 2: Auth Flow" },
      {
        type: "paragraph",
        content:
          "OAuth 2.1 with PKCE replaces the current API key model. Existing keys will continue to work during the deprecation period with rate-limiting notices.",
      },
      { type: "heading", content: "Phase 3: Rate Limiting" },
      {
        type: "list",
        content:
          "Free tier: 100 req/min\nPro tier: 1,000 req/min\nEnterprise: 10,000 req/min\nBurst allowance: 2x for 30 seconds",
      },
    ],
  },
  {
    id: "doc-03",
    projectId: "proj-03",
    title: "Mobile App Architecture",
    lastEditedBy: "usr-03",
    lastEditedAt: "2026-03-03T16:45:00Z",
    status: "draft",
    contentBlocks: [
      { type: "heading", content: "Mobile App Architecture" },
      {
        type: "paragraph",
        content:
          "React Native with Expo for cross-platform development. Shared business logic with the web client through a common TypeScript SDK.",
      },
      { type: "heading", content: "Navigation Structure" },
      {
        type: "list",
        content:
          "Bottom tabs: Dashboard, Projects, Documents, Tasks, Profile\nStack navigation within each tab\nDeep linking for push notification targets",
      },
      { type: "heading", content: "Offline Strategy" },
      {
        type: "paragraph",
        content:
          "SQLite for local document cache. Conflict resolution uses last-write-wins for simple fields and operational transform for rich text blocks.",
      },
    ],
  },
  {
    id: "doc-04",
    projectId: "proj-01",
    title: "Component Library Audit",
    lastEditedBy: "usr-04",
    lastEditedAt: "2026-03-01T10:20:00Z",
    status: "published",
    contentBlocks: [
      { type: "heading", content: "Component Library Audit" },
      {
        type: "paragraph",
        content:
          "Audit of the existing component library against the new brand guidelines. Each component is rated for compliance and given a migration priority.",
      },
      { type: "heading", content: "High Priority" },
      {
        type: "list",
        content:
          "Button — needs new color tokens and size variants\nCard — border radius and shadow updates\nInput — focus ring color change\nNavigation — complete restyle needed",
      },
      { type: "heading", content: "Medium Priority" },
      {
        type: "list",
        content:
          "Table — header styling and row hover states\nBadge — new status color mapping\nTooltip — font and padding adjustments",
      },
    ],
  },
  {
    id: "doc-05",
    projectId: "proj-04",
    title: "Q1 Security Review",
    lastEditedBy: "usr-06",
    lastEditedAt: "2026-02-28T11:00:00Z",
    status: "published",
    contentBlocks: [
      { type: "heading", content: "Q1 2026 Security Review" },
      {
        type: "paragraph",
        content:
          "Quarterly review covering authentication, authorization, data handling, and third-party dependencies. Overall risk rating: Medium.",
      },
      { type: "heading", content: "Findings" },
      {
        type: "list",
        content:
          "3 high-severity dependency vulnerabilities (patched)\n1 medium-severity CORS misconfiguration (remediated)\n2 low-severity CSP header improvements (scheduled)\nAll auth flows pass OWASP testing",
      },
      {
        type: "code",
        content:
          'Content-Security-Policy: default-src \'self\';\n  script-src \'self\' \'unsafe-inline\';\n  style-src \'self\' \'unsafe-inline\';\n  img-src \'self\' data: https:;',
      },
    ],
  },
  {
    id: "doc-06",
    projectId: "proj-02",
    title: "API Endpoints Reference",
    lastEditedBy: "usr-03",
    lastEditedAt: "2026-03-02T17:30:00Z",
    status: "draft",
    contentBlocks: [
      { type: "heading", content: "API v3 Endpoints Reference" },
      {
        type: "paragraph",
        content:
          "Complete reference for all v3 API endpoints. Authentication is required for all endpoints unless marked as public.",
      },
      { type: "heading", content: "Projects" },
      {
        type: "code",
        content:
          "GET    /v3/projects           — List projects\nPOST   /v3/projects           — Create project\nGET    /v3/projects/:id       — Get project\nPATCH  /v3/projects/:id       — Update project\nDELETE /v3/projects/:id       — Archive project",
      },
      { type: "heading", content: "Documents" },
      {
        type: "code",
        content:
          "GET    /v3/documents          — List documents\nPOST   /v3/documents          — Create document\nGET    /v3/documents/:id      — Get document\nPATCH  /v3/documents/:id      — Update document\nGET    /v3/documents/:id/history — Version history",
      },
      { type: "heading", content: "Tasks" },
      {
        type: "code",
        content:
          "GET    /v3/tasks              — List tasks (filterable)\nPOST   /v3/tasks              — Create task\nPATCH  /v3/tasks/:id          — Update task\nPOST   /v3/tasks/:id/assign   — Assign task",
      },
    ],
  },
  {
    id: "doc-07",
    projectId: "proj-03",
    title: "Sprint Planning Notes",
    lastEditedBy: "usr-01",
    lastEditedAt: "2026-03-03T11:00:00Z",
    status: "published",
    contentBlocks: [
      { type: "heading", content: "Sprint 14 Planning — Mobile App" },
      {
        type: "paragraph",
        content:
          "Sprint goal: Complete the document viewer and task list screens. Push notification infrastructure deferred to Sprint 15.",
      },
      { type: "heading", content: "Capacity" },
      {
        type: "list",
        content:
          "Sarah: 3 days (PM duties split with Brand Redesign)\nMarcus: 5 days (full allocation)\nPriya: 4 days (1 day on API migration)\nJames: 5 days (full allocation)",
      },
      { type: "heading", content: "Commitments" },
      {
        type: "list",
        content:
          "MOB-34: Document viewer — rich content rendering (Priya, 3pts)\nMOB-35: Task list — filter and sort (Marcus, 5pts)\nMOB-36: Navigation — bottom tab bar (James, 2pts)\nMOB-37: Offline cache — SQLite setup (Marcus, 3pts)",
      },
    ],
  },
];

export function getDocumentById(id: string): Document | undefined {
  return documents.find((d) => d.id === id);
}

export function getDocumentsByProject(projectId: string): Document[] {
  return documents.filter((d) => d.projectId === projectId);
}
