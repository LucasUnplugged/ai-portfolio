---
epic: ledger-demo
saga: portfolio-site
prd: ../.ai-sagas/docs/portfolio-site/prd.md
created: 2026-03-03
---

# Tech Spec: Ledger Demo

## Context

Addresses FR-3 (Ledger Demo App). Epic 1 established shared infrastructure: shadcn/ui, theming, DemoHeader, routing structure. The Ledger amber theme (`.ledger-theme`) and fonts (Manrope, Bricolage Grotesque, ADLaM Display) are already configured.

Ledger is a **multiplayer project management and knowledge base app** — think Notion meets Linear meets Google Docs with real-time collaboration and version control. Desktop-first, professional enterprise aesthetic.

## Architecture

### Routing

Flat routes under `/app/ledger/` — no dynamic segments since all data is mock:

```
src/app/app/ledger/
  layout.tsx          ← existing (ledger-theme + DemoHeader)
  globals.css         ← existing (amber theme vars)
  page.tsx            ← Dashboard (default screen)
  project/page.tsx    ← Project Overview
  document/page.tsx   ← Document Editor
  changes/page.tsx    ← Change Review
  tasks/page.tsx      ← Task Board
  conflicts/page.tsx  ← Conflict Resolution
  audit/page.tsx      ← Audit Log
```

### Layout Structure

Desktop app layout with persistent sidebar:

```
┌──────────────────────────────────────────────────┐
│ DemoHeader (existing — back to portfolio + nav)   │
├────────────┬─────────────────────────────────────┤
│            │                                     │
│  Sidebar   │  Main Content Area                  │
│  (240px)   │  (flex-1)                           │
│            │                                     │
│  - Logo    │                                     │
│  - Nav     │                                     │
│  - Project │                                     │
│  - Team    │                                     │
│            │                                     │
└────────────┴─────────────────────────────────────┘
```

The sidebar lives in the Ledger layout (not in each page). Each page renders only the main content area.

### Component Structure

```
src/components/ledger/
  sidebar.tsx               ← Persistent left nav
  stat-card.tsx             ← Dashboard metric card
  project-card.tsx          ← Project summary card
  activity-feed.tsx         ← Recent activity list
  document-toolbar.tsx      ← Document editor toolbar
  change-diff.tsx           ← Side-by-side diff viewer
  task-column.tsx           ← Kanban column
  task-card.tsx             ← Draggable task card (visual only)
  conflict-panel.tsx        ← Conflict resolution panel
  audit-entry.tsx           ← Audit log row

src/data/ledger/
  users.ts                  ← Team members (5-6 people)
  projects.ts               ← Projects (3-4)
  documents.ts              ← Documents with content blocks
  tasks.ts                  ← Tasks with statuses
  changes.ts                ← Change history entries
  conflicts.ts              ← Merge conflicts
  audit.ts                  ← Audit log entries
```

### Mock Data Design

All data is seeded, deterministic, and realistic:

**Users (5-6):** Names, roles (PM, engineer, designer, etc.), avatar initials, online status.

**Projects (3-4):** Each with name, description, member list, document count, task count, last updated timestamp.

**Documents:** Rich content blocks (headings, paragraphs, lists, code blocks) — rendered as styled HTML, not actual editable content. Version history with timestamps and authors.

**Tasks:** Kanban statuses (Backlog, In Progress, In Review, Done). Each with title, assignee, priority (low/medium/high/urgent), labels, due date.

**Changes:** Diff-style entries showing before/after text. Author, timestamp, status (pending/approved/rejected).

**Conflicts:** Two versions of a document section with conflict markers. Resolution options (keep mine, keep theirs, merge).

**Audit Log:** Timestamped entries with user, action, target entity, details.

### Screens Detail

**1. Dashboard** — Overview with:
- 4 stat cards (projects, documents, open tasks, team members)
- Recent activity feed (8-10 entries)
- Project cards grid (3-4 projects)

**2. Project Overview** — Single project view:
- Project header (name, description, team avatars)
- Tabs: Documents | Tasks | Activity
- Documents tab: list of docs with titles, last edited, author
- Tasks tab: summary counts by status
- Activity tab: project-scoped activity feed

**3. Document Editor** — Mock editor:
- Toolbar (bold, italic, heading, list, code, etc. — visual only)
- Document title (editable appearance)
- Rich content area with mixed block types
- Right sidebar: version history, collaborators "online"
- Cursor indicators showing "other users" editing (decorative)

**4. Change Review** — Diff viewer:
- Header: change title, author, timestamp, status badge
- Side-by-side diff with green/red highlighting
- Line-by-line additions/deletions
- Approve/Reject buttons (visual only)
- Comments thread below

**5. Task Board** — Kanban:
- 4 columns: Backlog, In Progress, In Review, Done
- Task cards with title, assignee avatar, priority badge, labels
- Column headers with task counts
- No actual drag — just visual layout

**6. Conflict Resolution** — Merge conflict UI:
- Conflict header (document name, conflicting users)
- Three-panel layout: "Mine" | "Merged" | "Theirs"
- Highlighted conflict regions
- Resolution action buttons

**7. Audit Log** — Activity timeline:
- Filterable log table (by user, action type, date range)
- Each row: timestamp, user avatar+name, action, target, details
- Pagination or infinite scroll appearance

## Dependencies

Additional shadcn/ui components needed:
- `input` — search/filter inputs
- `table` — audit log table
- `scroll-area` — sidebar and content scrolling
- `tooltip` — icon tooltips
- `progress` — task progress indicators
- `select` — filters and dropdowns

All installable via `npx shadcn@latest add <component>`.

## Risks & Mitigations

- **Large number of screens (7):** Mitigated by splitting into stages and reusing shared Ledger components.
- **Visual polish:** Each screen must look like real software, not a wireframe. Use realistic data lengths, varied content, and proper spacing.
- **Build size:** 7 pages with mock data. Mitigated by keeping data modules small and using static rendering.

## Acceptance Criteria

- [ ] Persistent sidebar navigation across all 7 Ledger screens
- [ ] Dashboard with stat cards, activity feed, and project grid
- [ ] Project Overview with tabbed content (documents, tasks, activity)
- [ ] Document Editor with mock toolbar, rich content, and collaboration indicators
- [ ] Change Review with side-by-side diff and approve/reject actions
- [ ] Task Board with 4-column Kanban layout and task cards
- [ ] Conflict Resolution with three-panel merge view
- [ ] Audit Log with filterable table
- [ ] All screens use Ledger amber theme consistently
- [ ] Realistic mock data throughout (no "Lorem ipsum")
- [ ] npm run build succeeds
