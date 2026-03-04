---
epic: ritual-demo
saga: portfolio-site
prd: .ai-sagas/docs/portfolio-site/prd.md
created: 2026-03-03
---

# Tech Spec: Ritual Demo

## Context

Addresses PRD FR-4 (Ritual Demo App). Epic 1 established the foundation: shadcn/ui, per-demo CSS variable scoping, phone simulator, demo header, and the Ritual theme (dark purple/fuchsia with Afacad/Adamina fonts). This epic builds the 6 mobile screens with mock data and bottom navigation.

## Architecture

### Routing

Flat routing under `/app/ritual/`:

| Route | Screen | Description |
|-------|--------|-------------|
| `/app/ritual` | Onboarding | Welcome screen with app intro + CTA |
| `/app/ritual/circle` | Current Circle | Active circle with members + daily prompt |
| `/app/ritual/chat` | Group Chat | Circle group chat with messages |
| `/app/ritual/profile` | Member Profile | View another member's profile |
| `/app/ritual/matches` | Matches | Connections view with matches/requests tabs |
| `/app/ritual/dm` | 1:1 Chat | Direct message with a matched member |

### Layout

The existing layout (`src/app/app/ritual/layout.tsx`) already wraps content in:
- `.ritual-theme` CSS variable scoping
- `DemoHeader` component (outside phone frame)
- `PhoneSimulator` component (375×812 frame)

Inside the phone simulator, each screen renders at mobile width. A **bottom navigation bar** is shared across screens (except onboarding).

### Bottom Navigation

`src/components/ritual/bottom-nav.tsx`

Icon-only nav bar fixed at the bottom of the phone content area:
- **Circle** icon (Users) → `/app/ritual/circle`
- **Chat** icon (MessageCircle) → `/app/ritual/chat`
- **Matches** icon (Heart) → `/app/ritual/matches`
- **Profile** icon (User) → `/app/ritual/profile`

Active state: fuchsia/primary color. Inactive: muted. No text labels per PRD.

The bottom nav should be part of a **RitualShell** component that wraps page content with the nav bar, so the onboarding page can opt out.

### Component Structure

```
src/components/ritual/
  bottom-nav.tsx         — Icon-only bottom navigation
  ritual-shell.tsx       — Shell with bottom nav (used by all screens except onboarding)
  circle-member.tsx      — Member avatar + name + status in circle view
  chat-bubble.tsx        — Chat message bubble (group + DM)
  chat-input.tsx         — Message input bar with send button
  prompt-card.tsx        — Daily prompt/icebreaker card
  match-card.tsx         — Match profile card in connections view
  profile-header.tsx     — Profile header with avatar, name, bio
```

### Mock Data

```
src/data/ritual/
  types.ts               — TypeScript interfaces
  users.ts               — 8 circle members with profiles
  circles.ts             — 1 active circle with members + prompts
  messages.ts            — Group chat messages + DM threads
  matches.ts             — Match connections + pending requests
  index.ts               — Barrel export
```

#### Data Types

```typescript
interface RitualUser {
  id: string;
  name: string;
  age: number;
  avatarInitials: string;
  bio: string;
  interests: string[];
  location: string;
  joinedAt: string;
  status: 'online' | 'offline' | 'away';
}

interface Circle {
  id: string;
  name: string;
  description: string;
  memberIds: string[];
  startDate: string;
  endDate: string;
  currentPrompt: DailyPrompt;
  pastPrompts: DailyPrompt[];
}

interface DailyPrompt {
  id: string;
  text: string;
  date: string;
  responses: { userId: string; text: string }[];
}

interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  type: 'text' | 'prompt-response';
}

interface Match {
  id: string;
  userId: string;
  matchedAt: string;
  status: 'matched' | 'pending' | 'requested';
  lastMessage?: string;
}
```

### Screen Details

#### 1. Onboarding (`/app/ritual`)
- Large serif heading "Ritual" with tagline
- Brief app description (structured social connections)
- "Join a Circle" CTA button (links to `/app/ritual/circle`)
- Decorative element (subtle gradient or pattern)
- NO bottom nav (standalone screen)

#### 2. Current Circle (`/app/ritual/circle`)
- Circle name + description header
- Time remaining indicator (e.g., "Day 5 of 14")
- Daily prompt card (today's icebreaker question)
- Member grid (avatars + names + online status)
- Tap member → navigates to `/app/ritual/profile`

#### 3. Group Chat (`/app/ritual/chat`)
- Chat header with circle name
- Message list with avatars, names, timestamps
- Prompt responses styled differently (card-like)
- Chat input bar at bottom with send button
- Auto-scroll to latest message

#### 4. Member Profile (`/app/ritual/profile`)
- Profile header: large avatar, name, age, location
- Bio section
- Interests as tags/badges
- "Send Message" button → link to DM
- Back navigation to previous screen

#### 5. Matches (`/app/ritual/matches`)
- Two tabs: "Matches" and "Requests"
- Match cards: avatar, name, last message preview, timestamp
- Request cards: avatar, name, "Accept" / "Decline" buttons
- Tap match → navigates to `/app/ritual/dm`

#### 6. 1:1 Chat (`/app/ritual/dm`)
- Chat header with matched user name + avatar
- Direct message thread (similar to group chat but 1:1)
- Chat input bar
- Messages left/right aligned by sender

## Dependencies

No new shadcn/ui components needed — existing Button, Badge, Card, Tabs, Avatar, ScrollArea, Separator are sufficient.

## Risks & Mitigations

- **Phone simulator scroll behavior**: Content must scroll within the phone frame, not the page. The PhoneSimulator already handles this with `overflow-y-auto`.
- **Bottom nav positioning**: Must be fixed at the bottom of the phone content area, not the viewport. Use `sticky bottom-0` within the phone's scroll container, or structure the shell as a flex column with nav outside the scroll area.

## Acceptance Criteria

- [ ] 6 polished mobile screens with realistic mock data
- [ ] Rendered inside phone-sized container centered on page
- [ ] Icon-based bottom navigation (no labels)
- [ ] Dark theme by default (purple/fuchsia palette)
- [ ] All screens use Ritual theme consistently
- [ ] Realistic mock data rendered throughout
- [ ] npm run build succeeds
