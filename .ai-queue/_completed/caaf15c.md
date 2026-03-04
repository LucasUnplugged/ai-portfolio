# Commit History
- 1af0fcc feat(ledger): add Audit Log page with filterable table
- caaf15c Merge q/004: add Ledger Audit Log page

<!-- auto-queue -->
<!-- target-branch: feat/ledger-demo/remaining-screens -->

# Ledger Audit Log Page

## Context
Stage 3 of Epic 2 (Ledger Demo). Build the Audit Log screen at `/app/ledger/audit`.

Tech Spec: `.ai-epics/docs/ledger-demo/tech-spec.md`
Feature flag: `ledger_demo`

## Instructions

Create `src/app/app/ledger/audit/page.tsx` — a filterable audit log table.

**Design direction:** Admin panel log viewer — data-dense table with filter controls. Similar to Datadog or Vercel's activity logs.

**Layout:**
```
┌──────────────────────────────────────────────────┐
│ ← Back to Dashboard                 Audit Log    │
│                                                    │
│ [Filter: All Users ▾] [Filter: All Actions ▾]    │
│                                                    │
├──────┬──────────┬──────────┬────────┬────────────┤
│ Time │ User     │ Action   │ Target │ Details    │
├──────┼──────────┼──────────┼────────┼────────────┤
│ 2h   │ 👤Sarah │ edited   │ Tech.. │ Updated... │
│ 3h   │ 👤Marcus│ approved │ Chang..│ Approved.. │
│ 4h   │ 👤Priya │ created  │ New..  │ Initial..  │
│ ...  │         │          │        │            │
└──────┴──────────┴──────────┴────────┴────────────┘
│                                                    │
│ Showing 25 of 25 entries                          │
│                                                    │
└──────────────────────────────────────────────────┘
```

**Implementation:**

1. **Header:** Back link to Dashboard. Title "Audit Log".

2. **Filter controls:** Two `Select` dropdowns from shadcn:
   - User filter: "All Users" + each user name
   - Action filter: "All Actions" + each action type (created, edited, deleted, etc.)
   These filters should be functional — use client-side state to filter the displayed entries.

3. **Table:** Use shadcn `Table`, `TableHeader`, `TableBody`, `TableHead`, `TableRow`, `TableCell` components. Use the `AuditEntry` component from `@/components/ledger/audit-entry` for each row — or build the table rows inline if the AuditEntry component API doesn't fit a table layout well.

   Columns:
   - Time: relative timestamp (e.g., "2h ago")
   - User: avatar + name
   - Action: colored badge (use action colors from ActivityFeed)
   - Target: entity type + name (truncated)
   - Details: detail text (truncated with `truncate` class)

4. **Footer:** "Showing X of Y entries" count.

5. **Data:** Import `auditLog`, `users` from `@/data/ledger`. Filter based on selected user and action.

**Notes:**
- This MUST be a client component (`"use client"`) because it has interactive filters
- Import `Select`, `SelectContent`, `SelectItem`, `SelectTrigger`, `SelectValue` from shadcn
- Use `useState` for filter state
- The action colors should match what ActivityFeed uses (created=green, edited=blue, deleted=red, etc.)
- Use `Avatar`, `AvatarFallback` for user column
- Use `Badge` for action column

## Scope
- `src/app/app/ledger/audit/page.tsx` (new)

## Verification
- `npm run build` succeeds
- Audit Log renders with data table
- Filters work (selecting a user or action filters the table)

## Task Progress
<!-- lat: 2026-03-04T04:28:40Z -->
<!-- agent-pid: 67343 -->
<!-- worktree: .worktrees/q-004 -->
<!-- branch: q/004 -->

### Checklist
- [x] Create worktree from target branch from target branch
- [x] Build Audit Log page with table and filters
- [ ] **ACTIVE** → Verify build passes
- [ ] Merge and cleanup

### Handoff Context
- Target branch: feat/ledger-demo/remaining-screens
- Single file: src/app/app/ledger/audit/page.tsx
- Client component with useState for filters
- Uses Select, Table, Badge, Avatar from shadcn
