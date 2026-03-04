<!-- auto-queue -->
<!-- target-branch: feat/ritual-demo/onboarding-circle-chat -->

# Ritual Current Circle Screen

Create the Current Circle screen at `src/app/app/ritual/circle/page.tsx`.

## Context

Tech spec: `.ai-epics/docs/ritual-demo/tech-spec.md`
Data: `src/data/ritual/` — use `activeCircle`, `getUserById`, `currentUser` from `@/data/ritual`
Components: `src/components/ritual/` — use `RitualShell`, `CircleMember`, `PromptCard`

This is the main "home" screen of the Ritual app — shows the user's active circle with members and the daily prompt.

## Scope

- `src/app/app/ritual/circle/page.tsx` — new file

## Instructions

Build the Current Circle screen wrapped in `<RitualShell current="circle">`:

1. **Circle header** at the top:
   - Circle name (`activeCircle.name`) as heading in `font-heading`
   - Circle description in muted text
   - Time remaining indicator: calculate days remaining from `activeCircle.endDate` relative to current date. Show as "Day X of 14" or "X days remaining" with a subtle progress indicator

2. **Daily Prompt section**:
   - Use the `PromptCard` component with `activeCircle.currentPrompt`
   - Maybe a "Share your response" button below it (visual only)

3. **Members grid**:
   - Section heading "Circle Members" or "Your Circle"
   - Grid of members using `CircleMember` component
   - Use a 4-column grid (`grid-cols-4`) to show all members compactly
   - Get member data: `activeCircle.memberIds.map(id => getUserById(id))`

4. **Layout**:
   - Padding: `p-4` on all sides
   - Space between sections: `space-y-6`
   - Content should scroll within the RitualShell (the shell handles overflow)

This is a "use client" component (uses RitualShell which has client-side navigation).

## Verification

- Page renders with circle name, prompt, and member grid
- Bottom navigation is visible with "circle" tab active
- Members display with avatars and first names
- `npm run build` succeeds

## Task Progress
<!-- lat: 2026-03-04T04:51:42Z -->
<!-- agent-pid: 67343 -->
<!-- worktree: .worktrees/q-002 -->
<!-- branch: q/002 -->

### Checklist
- [x] Create worktree from target branch from target branch
- [x] Build Current Circle page
- [ ] **ACTIVE** → Verify build passes
- [ ] Merge and cleanup

### Handoff Context
- Target branch: feat/ritual-demo/onboarding-circle-chat
- Single file: src/app/app/ritual/circle/page.tsx
- Uses RitualShell, CircleMember, PromptCard from @/components/ritual
- Data from @/data/ritual (activeCircle, getUserById, currentUser)
