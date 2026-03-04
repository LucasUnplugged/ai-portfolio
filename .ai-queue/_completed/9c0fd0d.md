# Commit History
- `9849727` feat(ledger): add shared UI components
- `9c0fd0d` merge: q/003 — shared ledger UI components

---

<!-- auto-queue -->
<!-- depends-on: 001 -->
<!-- target-branch: feat/ledger-demo/sidebar-data-components -->

# Shared Ledger UI Components

## Context
Stage 1 of Epic 2 (Ledger Demo). Build reusable UI components used across multiple Ledger screens. Depends on Segment 001 (mock data modules must exist first — components import data types).

Tech Spec: `.ai-epics/docs/ledger-demo/tech-spec.md`
Feature flag: `ledger_demo`

## Instructions

Create all shared Ledger components in `src/components/ledger/`. These are presentational components that receive data via props and render Ledger-themed UI. Import types from `@/data/ledger/types`.

**Design direction:** Enterprise SaaS — clean, professional. Uses Ledger amber theme automatically via CSS variable inheritance. Follow shadcn/ui patterns (use `cn()` utility, accept `className` prop).

### 1. StatCard (`src/components/ledger/stat-card.tsx`)
Dashboard metric card showing a number, label, and optional trend.

Props:
- `title: string` — metric name (e.g., "Active Projects")
- `value: string | number` — the metric value
- `description?: string` — subtitle/context (e.g., "+2 this month")
- `icon?: LucideIcon` — optional icon from lucide-react

Uses shadcn `Card` component. Compact layout:
```
┌──────────────────┐
│ Icon    Title    │
│         Value    │
│      Description │
└──────────────────┘
```

### 2. ProjectCard (`src/components/ledger/project-card.tsx`)
Project summary card for the dashboard grid.

Props:
- `project: Project` (from types)
- `members: User[]` (resolved from project.memberIds)

Layout:
```
┌──────────────────────────────┐
│ Project Name          Active │
│ Description text...          │
│                              │
│ 📄 12 docs  ✅ 8 tasks      │
│ 👤👤👤 +1    Last: 2h ago   │
└──────────────────────────────┘
```
Uses shadcn `Card`, `Badge`, `Avatar` components. The colored accent bar at top uses project.color.

### 3. ActivityFeed (`src/components/ledger/activity-feed.tsx`)
List of recent activity entries.

Props:
- `entries: AuditEntry[]`
- `users: User[]` (for resolving user names/avatars)
- `maxEntries?: number` (default 10)

Each entry shows:
```
[Avatar] Sarah Chen edited "API Endpoints Reference"    2h ago
```
Uses `Avatar` from shadcn for user icons. Vertical list with subtle separators between entries. Action verbs are styled (e.g., "created" in green, "deleted" in red). Relative time display.

### 4. TaskCard (`src/components/ledger/task-card.tsx`)
Individual task card for the Kanban board.

Props:
- `task: Task` (from types)
- `assignee?: User`

Layout:
```
┌──────────────────────────┐
│ [label] [label]          │
│ Task title text          │
│                          │
│ 👤 Assignee    🔴 Urgent │
│                  Mar 15  │
└──────────────────────────┘
```
Priority shown as colored badge (low=gray, medium=blue, high=amber, urgent=red). Uses shadcn `Card`, `Badge`, `Avatar`.

### 5. DocumentToolbar (`src/components/ledger/document-toolbar.tsx`)
Mock rich text editor toolbar — purely visual, no functionality.

Props: none (static toolbar)

Layout:
```
[B] [I] [U] [S] | [H1] [H2] [H3] | [List] [OrderedList] | [Code] [Link] [Image]
```
Use lucide-react icons: Bold, Italic, Underline, Strikethrough, Heading1, Heading2, Heading3, List, ListOrdered, Code, Link, Image. Group with separators. Use shadcn `Button` (variant="ghost", size="sm"). Style as a toolbar with border-bottom.

### 6. ChangeDiff (`src/components/ledger/change-diff.tsx`)
Side-by-side diff viewer for the Change Review screen.

Props:
- `change: Change` (from types)
- `author?: User`

Layout:
```
┌─────────────────┬─────────────────┐
│ Before          │ After           │
├─────────────────┼─────────────────┤
│ - removed line  │ + added line    │
│   unchanged     │   unchanged     │
│ - removed line  │ + added line    │
└─────────────────┴─────────────────┘
```
Split the `beforeText` and `afterText` into lines. Show removed lines (in before, red bg) and added lines (in after, green bg). Use monospace font. Simple line-by-line diff (no actual diffing algorithm — just show beforeText and afterText side-by-side).

### 7. ConflictPanel (`src/components/ledger/conflict-panel.tsx`)
Three-panel merge conflict viewer.

Props:
- `conflict: Conflict` (from types)
- `userA?: User`
- `userB?: User`

Layout:
```
┌────────────┬────────────┬────────────┐
│ Mine       │ Merged     │ Theirs     │
│ (UserA)    │ (Result)   │ (UserB)    │
├────────────┼────────────┼────────────┤
│ version A  │ merged or  │ version B  │
│ text       │ empty      │ text       │
└────────────┴────────────┴────────────┘
```
Three equal-width columns with headers. Conflict text in monospace. If `merged` is null, show "Select a resolution" placeholder. Use border and subtle background colors to distinguish panels.

### 8. AuditEntry (`src/components/ledger/audit-entry.tsx`)
Single row component for the audit log table.

Props:
- `entry: AuditEntry` (from types)
- `user?: User`

Used within a `Table` component. Renders as a table row with columns: Time, User (avatar + name), Action (colored badge), Target, Details. Keep it as a `<TableRow>` that can be composed inside a table.

## Scope
- `src/components/ledger/stat-card.tsx` (new)
- `src/components/ledger/project-card.tsx` (new)
- `src/components/ledger/activity-feed.tsx` (new)
- `src/components/ledger/task-card.tsx` (new)
- `src/components/ledger/document-toolbar.tsx` (new)
- `src/components/ledger/change-diff.tsx` (new)
- `src/components/ledger/conflict-panel.tsx` (new)
- `src/components/ledger/audit-entry.tsx` (new)

## Verification
- `npm run build` succeeds
- All components export correctly with proper TypeScript types
- No import errors (data types resolve correctly)

## Task Progress
<!-- lat: 2026-03-04T04:16:00Z -->
<!-- agent-pid: 15368 -->
<!-- worktree: .worktrees/q-003 -->
<!-- branch: q/003 -->

### Checklist
- [ ] **ACTIVE** → Create all 8 shared Ledger UI components
- [ ] Verify build passes
- [ ] Merge and cleanup

### Handoff Context
- Target branch: feat/ledger-demo/sidebar-data-components
- Depends on 001 (merged — data types available)
- 8 components: stat-card, project-card, activity-feed, task-card, document-toolbar, change-diff, conflict-panel, audit-entry
