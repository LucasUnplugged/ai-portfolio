---
epic: foundation-landing-case-studies
saga: portfolio-site
prd: ../.ai-sagas/docs/portfolio-site/prd.md
created: 2026-03-03
---

# Tech Spec: Foundation, Landing Page & Case Studies

## Context

Addresses FR-1 (Landing Page), FR-2 (Case Study Pages), FR-6 (Demo Nav Header), FR-7 (Phone Simulator).
This is the first epic — establishes all shared infrastructure that demo epics (2–4) will build on.

## Architecture

### Routing Structure

```
src/app/
  layout.tsx              ← Root layout (loads all font families)
  globals.css             ← Main site theme (portfolio)
  page.tsx                ← Landing page (/)

  case-studies/
    ledger/page.tsx       ← Case study page
    ritual/page.tsx
    circles/page.tsx

  app/
    ledger/
      layout.tsx          ← Ledger demo layout (Ledger theme scope + demo header)
      globals.css         ← Ledger CSS variables
      page.tsx            ← Ledger dashboard (default screen)
      [...screens]        ← Other Ledger screens as needed

    ritual/
      layout.tsx          ← Ritual demo layout (dark theme + phone simulator)
      globals.css         ← Ritual CSS variables
      page.tsx            ← Ritual default screen

    circles/
      layout.tsx          ← Circles demo layout (teal theme + phone simulator)
      globals.css         ← Circles CSS variables
      page.tsx            ← Circles default screen
```

### Theming Strategy

Each demo app gets its own CSS file with scoped CSS variables. The demo layout wraps content in a `<div>` with a class that activates that demo's theme. This avoids polluting the global theme.

- **Main site:** Neutral, editorial theme (Geist fonts, clean palette)
- **Ledger:** Warm amber (Manrope, Bricolage Grotesque, ADLaM Display) — `.ledger-theme`
- **Ritual:** Purple/fuchsia dark (Afacad, Adamina, Fira Code) — `.ritual-theme .dark`
- **Circles:** Green/teal (Inter, JetBrains Mono) — `.circles-theme`

### Component Structure

```
src/components/
  ui/                     ← shadcn/ui components (button, card, badge, etc.)
  site/
    site-header.tsx       ← Main portfolio nav
    site-footer.tsx       ← Portfolio footer
    case-study-card.tsx   ← Card component for landing page
  demo/
    demo-header.tsx       ← Back-to-portfolio + cross-demo nav
    phone-simulator.tsx   ← Phone frame container for mobile demos
```

### Key Components

**DemoHeader** — Shared across all 3 demos. Props: `currentDemo: 'ledger' | 'ritual' | 'circles'`. Renders:
- Back arrow + "Back to Case Study" link
- Demo name
- Dropdown/links to other 2 demos

**PhoneSimulator** — Wraps children in a phone-shaped container (~375x812). Used by Ritual and Circles layouts. Features:
- Rounded corners, subtle bezel/shadow
- Internal scrollable area
- Status bar mock (time, battery, signal)
- Centered on page both axes

## Implementation Approach

1. **Initialize shadcn/ui** via `npx shadcn@latest init` — configure for Tailwind CSS 4
2. **Install base components:** button, card, badge, separator, navigation-menu, dropdown-menu, avatar
3. **Install lucide-react** for icons
4. **Apply Ledger tweakcn theme** for the main portfolio site base (we'll use the amber/warm palette as a starting point, then customize the main site to be more neutral)
5. **Set up all Google Fonts** in the root layout
6. **Create per-demo CSS files** with scoped variables from tweakcn themes
7. **Build shared components** (DemoHeader, PhoneSimulator, SiteHeader)
8. **Build landing page** with bio, skills, and case study cards
9. **Build 3 case study pages** with project descriptions and demo launch buttons
10. **Create placeholder demo pages** (just enough to verify theming works)

## Dependencies

- `shadcn/ui` (via npx init)
- `lucide-react` (icons)
- `class-variance-authority` (comes with shadcn)
- `clsx` + `tailwind-merge` (comes with shadcn)
- Google Fonts: Geist, Geist Mono, Manrope, Bricolage Grotesque, ADLaM Display, Afacad, Adamina, Fira Code, Inter, JetBrains Mono

## Risks & Mitigations

- **Font loading performance:** Loading 10+ font families. Mitigation: Use `next/font/google` with `display: swap`, load demo fonts only in their respective layouts.
- **CSS variable scoping conflicts:** Multiple themes on one page. Mitigation: Scope each demo's vars under a CSS class selector.
- **shadcn/ui + Tailwind 4 compat:** Ensure shadcn's latest version supports TW4. If issues arise, use the canary channel.

## Acceptance Criteria

- [ ] shadcn/ui initialized and working
- [ ] Landing page renders with bio, skills, 3 case study cards
- [ ] All 3 case study pages render with content and demo launch button
- [ ] DemoHeader component navigates between demos and back to portfolio
- [ ] PhoneSimulator renders a phone-shaped container
- [ ] Each demo route (`/app/ledger`, `/app/ritual`, `/app/circles`) loads with its unique theme
- [ ] Ritual demo renders in dark mode by default
- [ ] Fonts load correctly per section
- [ ] `npm run build` succeeds
