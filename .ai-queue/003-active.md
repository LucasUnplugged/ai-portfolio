<!-- auto-queue -->
<!-- target-branch: feat/ritual-demo/profile-matches-dm -->

# Ritual 1:1 Chat (DM) Screen

Create the DM screen at `src/app/app/ritual/dm/page.tsx`.

## Context

Tech spec: `.ai-epics/docs/ritual-demo/tech-spec.md`
Data: `src/data/ritual/` — use `dmThreads`, `getUserById`, `currentUser` from `@/data/ritual`
Components: `src/components/ritual/` — use `RitualShell`, `ChatBubble`, `ChatInput`

Shows a 1:1 direct message conversation with a matched member. Similar to the group chat but without group features.

## Scope

- `src/app/app/ritual/dm/page.tsx` — new file

## Instructions

Build the DM screen. Use `RitualShell` but note the bottom nav might not make sense for a DM. Two approaches:
- Option A: Wrap in RitualShell with current="matches" (since DMs are accessed from matches)
- Option B: Skip RitualShell and build a custom layout with back button

**Use Option A** (RitualShell with current="matches") for consistency.

Use the first DM thread (`dmThreads[0]`) as the active conversation.

1. **Chat header**:
   - Back arrow + matched user's name
   - Arrow links to `/app/ritual/matches`
   - Use lucide-react ArrowLeft icon
   - Compact height, border-bottom

2. **Messages area**:
   - Get the DM thread: `dmThreads[0]`
   - Get the other participant's user data
   - Render messages using `ChatBubble` with `isGroupChat={false}` (no avatars/names above bubbles — it's just 2 people)
   - Messages sorted by timestamp
   - `space-y-3` between messages, `p-4` padding

3. **Chat input**:
   - Use `ChatInput` with `placeholder="Message {user first name}..."`

4. **Layout structure** (same as group chat):
   ```tsx
   <RitualShell current="matches">
     <div className="flex flex-col h-full">
       {/* Header */}
       {/* Messages (scrollable) */}
       {/* ChatInput */}
     </div>
   </RitualShell>
   ```

This is a "use client" component.

## Verification

- Page renders with DM messages
- Current user messages on right (fuchsia), other user on left
- No avatars/names on bubbles (not group chat)
- Back arrow links to /app/ritual/matches
- Bottom navigation shows "matches" tab active
- `npm run build` succeeds

## Task Progress
<!-- lat: 2026-03-04T04:57:20Z -->
<!-- agent-pid: 67343 -->
<!-- worktree: .worktrees/q-003 -->
<!-- branch: q/003 -->

### Checklist
- [x] Create worktree from target branch from target branch
- [x] Build DM page with chat header, messages, and input
- [ ] **ACTIVE** → Verify build passes
- [ ] Merge and cleanup

### Handoff Context
- Target branch: feat/ritual-demo/profile-matches-dm
- Single file: src/app/app/ritual/dm/page.tsx
- Uses RitualShell, ChatBubble, ChatInput from @/components/ritual
- Data: dmThreads[0], getUserById, currentUser from @/data/ritual
