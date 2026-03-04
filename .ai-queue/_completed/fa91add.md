<!-- auto-queue -->
<!-- target-branch: feat/ritual-demo/onboarding-circle-chat -->

# Ritual Group Chat Screen

Create the Group Chat screen at `src/app/app/ritual/chat/page.tsx`.

## Context

Tech spec: `.ai-epics/docs/ritual-demo/tech-spec.md`
Data: `src/data/ritual/` — use `groupMessages`, `getUserById`, `currentUser`, `activeCircle` from `@/data/ritual`
Components: `src/components/ritual/` — use `RitualShell`, `ChatBubble`, `ChatInput`

This is the group chat for the active circle. Shows messages from all members.

## Scope

- `src/app/app/ritual/chat/page.tsx` — new file

## Instructions

Build the Group Chat screen. This needs a custom layout because it has both a chat header and chat input around the message area, all within the RitualShell:

```tsx
<RitualShell current="chat">
  <div className="flex flex-col h-full">
    {/* Chat header */}
    <div className="...">...</div>

    {/* Messages area (scrollable) */}
    <div className="flex-1 overflow-y-auto">...</div>

    {/* Chat input (fixed at bottom of chat, above bottom nav) */}
    <ChatInput />
  </div>
</RitualShell>
```

**IMPORTANT about scroll behavior**: The RitualShell already provides `overflow-y-auto` on its content area. But within the chat, we need the messages to scroll while the header and input stay fixed. The structure above handles this — the `flex flex-col h-full` makes the chat fill the shell's content area, and the messages div scrolls independently.

1. **Chat header**:
   - Circle name (e.g., "Fireside Circle")
   - Member count (e.g., "8 members")
   - Subtle bottom border
   - Compact height (~48px), `bg-background` background

2. **Messages area**:
   - Render `groupMessages` sorted by timestamp
   - Use `ChatBubble` component for each message
   - Pass `isCurrentUser={message.senderId === currentUser.id}`
   - Pass `isGroupChat={true}`
   - Get sender via `getUserById(message.senderId)`
   - Space between messages: `space-y-3`
   - Padding: `p-4`

3. **Chat input**:
   - Use `ChatInput` component at the bottom
   - placeholder="Message the circle..."

This is a "use client" component.

## Verification

- Chat displays messages from multiple users
- Current user's messages appear on the right (fuchsia bubble)
- Other users' messages appear on the left with avatar and name
- Prompt responses have a distinct style
- Chat input is visible at the bottom
- Bottom navigation shows "chat" tab active
- `npm run build` succeeds

## Task Progress
<!-- lat: 2026-03-04T04:50:40Z -->
<!-- agent-pid: 24426 -->
<!-- worktree: .worktrees/q-003 -->
<!-- branch: q/003 -->

### Checklist
- [ ] **ACTIVE** → Build group chat page
- [ ] Verify build passes

### Handoff Context
- Uses RitualShell, ChatBubble, ChatInput components from Stage 1
- Data from groupMessages, getUserById, currentUser, activeCircle
