---
epic: circles-demo
saga: portfolio-site
prd: .ai-sagas/docs/portfolio-site/prd.md
created: 2026-03-04
---

# Tech Spec: Circles Demo

## Context

Addresses PRD FR-5 (Circles Demo App). Epic 1 established the foundation: shadcn/ui, per-demo CSS variable scoping, phone simulator, demo header, and the Circles theme (light, green/teal with Inter/JetBrains Mono fonts). This epic builds the 6 mobile screens with mock data and bottom navigation.

The pattern follows the Ritual demo exactly — same shell/nav architecture, same mock data approach, same file structure — but with Circles-specific screens, data, and light teal theme.

## Architecture

### Routing

Flat routing under `/app/circles/`:

| Route | Screen | Description |
|-------|--------|-------------|
| `/app/circles` | Onboarding | Welcome screen with app intro + CTA |
| `/app/circles/today` | Today View | Daily check-ins and relationship reminders |
| `/app/circles/overview` | Circles Overview | All circles with member counts |
| `/app/circles/person` | Person Profile | View a person's profile + interaction history |
| `/app/circles/add` | Add Person | Form to add a new person to a circle |
| `/app/circles/reflection` | Reflection | Weekly reflection on relationships |

### Layout

The existing layout (`src/app/app/circles/layout.tsx`) already wraps content in:
- `.circles-theme` CSS variable scoping (light, teal)
- `DemoHeader` component (outside phone frame)
- `PhoneSimulator` component (375x812 frame)

Inside the phone simulator, each screen renders at mobile width. A **bottom navigation bar** is shared across screens (except onboarding).

### Bottom Navigation

`src/components/circles/bottom-nav.tsx`

Icon-only nav bar fixed at the bottom of the phone content area:
- **Today** icon (CalendarCheck) → `/app/circles/today`
- **Circles** icon (Users) → `/app/circles/overview`
- **Add** icon (UserPlus) → `/app/circles/add`
- **Reflect** icon (BookHeart) → `/app/circles/reflection`

Active state: teal/primary color. Inactive: muted. No text labels per PRD.

Uses a **CirclesShell** component (same pattern as RitualShell) that wraps page content + bottom nav, so the onboarding page can opt out.

### Component Structure

```
src/components/circles/
  bottom-nav.tsx         — Icon-only bottom navigation
  circles-shell.tsx      — Shell with bottom nav (all screens except onboarding)
  person-card.tsx        — Person avatar + name + last contact date
  circle-card.tsx        — Circle group card with member avatars + count
  reminder-card.tsx      — Today's reminder/check-in card for a person
  reflection-prompt.tsx  — Weekly reflection prompt with textarea
  person-form.tsx        — Add person form fields
  interaction-item.tsx   — Single interaction history entry
```

### Mock Data

```
src/data/circles/
  types.ts               — TypeScript interfaces
  people.ts              — 12 people across circles with profiles
  circles.ts             — 3 circles (Close Friends, Family, Colleagues)
  interactions.ts        — Interaction history + reminders
  reflections.ts         — Past reflection entries
  index.ts               — Barrel export
```

#### Data Types

```typescript
interface Person {
  id: string;
  name: string;
  avatarInitials: string;
  relationship: string;         // "close friend", "sister", "colleague"
  circleId: string;
  lastContact: string;          // ISO date
  contactFrequencyDays: number; // how often to reach out
  bio: string;
  interests: string[];
  birthday?: string;
  notes?: string;
}

interface Circle {
  id: string;
  name: string;                 // "Close Friends", "Family", "Colleagues"
  emoji: string;                // "💛", "🏠", "💼"
  description: string;
  memberIds: string[];
  color: string;                // CSS class for accent
}

interface Interaction {
  id: string;
  personId: string;
  type: 'call' | 'text' | 'meetup' | 'note';
  summary: string;
  date: string;
}

interface Reminder {
  id: string;
  personId: string;
  reason: string;               // "Haven't talked in 2 weeks", "Birthday tomorrow"
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
}

interface Reflection {
  id: string;
  weekOf: string;
  prompt: string;
  response?: string;
  gratitudes: string[];
}
```

### Screen Details

#### 1. Onboarding (`/app/circles`)
- Clean heading "Circles" with tagline about nurturing relationships
- Brief app description (personal relationship manager)
- "Get Started" CTA button (links to `/app/circles/today`)
- Soft teal gradient or decorative circles motif
- NO bottom nav (standalone screen)

#### 2. Today View (`/app/circles/today`)
- Greeting header ("Good morning" + date)
- Reminder cards for people due for contact (sorted by priority)
- Each card: person name, relationship, last contact, reason for reminder
- Tap card → navigates to `/app/circles/person`
- Quick action buttons (call, text, check-off)

#### 3. Circles Overview (`/app/circles/overview`)
- List of circles as cards, each showing:
  - Circle name + emoji
  - Member count
  - Row of member avatar initials
  - Brief description
- Tap circle → expands or shows members inline
- Each member row links to `/app/circles/person`

#### 4. Person Profile (`/app/circles/person`)
- Profile header: avatar initials, name, relationship label
- Contact info section
- Interaction history (recent interactions as timeline)
- "Log Interaction" button
- Notes section
- Back navigation

#### 5. Add Person (`/app/circles/add`)
- Form with: Name, Relationship, Circle selection, Contact frequency, Birthday (optional), Notes (optional)
- Circle selector as pill buttons
- "Add to Circle" submit button (visual only)
- Clean, minimal form layout

#### 6. Reflection (`/app/circles/reflection`)
- Current week's reflection prompt
- Textarea for response
- Gratitude list (add items)
- Past reflections collapsible section
- Warm, contemplative tone

## Dependencies

No new shadcn/ui components needed — existing Button, Badge, Card, Tabs, Avatar, Input, Textarea, Select, Separator are sufficient.

## Risks & Mitigations

- **Phone simulator scroll behavior**: Same as Ritual — content scrolls within the phone frame. The PhoneSimulator already handles this.
- **Bottom nav positioning**: Same pattern as Ritual — CirclesShell uses flex column with nav outside scroll area.
- **Light theme contrast**: Teal on light background needs careful contrast ratios. Use the existing theme variables which already define appropriate contrast.

## Acceptance Criteria

- [ ] 6 polished mobile screens with realistic mock data
- [ ] Rendered inside phone-sized container centered on page
- [ ] Icon-based bottom navigation (no labels)
- [ ] Light theme by default (green/teal palette)
- [ ] All screens use Circles theme consistently
- [ ] Realistic mock data rendered throughout
- [ ] npm run build succeeds
