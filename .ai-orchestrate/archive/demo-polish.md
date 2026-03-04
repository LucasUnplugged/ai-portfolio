---
slug: demo-polish
status: done
created: 2026-03-04
---
# Demo Apps Polish & Enhancement

## Overview
Fix CSS theme scoping, consolidate headers, add dark mode for Circles, overhaul Ritual into a dating-app-style social circle app, fix Ledger cursor label, overhaul Circles CRM with editable circles/labels/messaging, add localStorage persistence to all 3 demos, and polish the site layout (home page, navigation, footer).

## Metadata
- **Tracking issue:** #36
- **Created:** 2026-03-04
- **Auto-merge:** false
- **Integrations:** github

## Epic 1: Foundation Fixes
**Objective:** Fix broken CSS themes, consolidate double headers, add Circles dark mode, fix Ledger cursor overlap
**Dependencies:** none
**Epic slug:** demo-foundation
**Epic branch:** epic/demo-foundation
**PR:** #37
**Status:** complete

### Stage 1.1: Fix CSS Theme Scoping
**Issue:** #38
**Branch prefix:** fix
**Acceptance criteria:**
- [ ] Each demo's globals.css scopes variables under `.ledger-theme` / `.ritual-theme` / `.circles-theme` (and `.ledger-theme.dark` etc.) instead of `:root` / `.dark`
- [ ] Remove duplicate `@import "tailwindcss"`, `@theme inline`, `@layer base` from demo CSS files (keep only in root globals.css)
- [ ] Reconcile old (committed) and new (stashed) tweakcn values — use the new oklch values but scoped correctly
- [ ] Root globals.css `@theme inline` must include all CSS variable mappings (shadows, tracking, fonts, sidebar-* etc.) needed by demos
- [ ] Switching between demos applies correct theme — no color bleed
- [ ] Build passes
**Status:** done
**Stage PR:** #41

### Stage 1.2: Consolidate Headers
**Issue:** #39
**Branch prefix:** feat
**Acceptance criteria:**
- [x] Remove DemoHeader component
- [x] Update SiteHeader to show two nav sections when on demo pages: left = `Portfolio | Case Studies` links, right = `Apps: Ledger | Ritual | Circles` links
- [x] SiteHeader detects current route for active state on demo app links
- [x] On non-demo pages, SiteHeader shows current nav (portfolio + case study links only)
- [x] No double header on any page
**Status:** done
**Stage PR:** #42

### Stage 1.3: Circles Dark Mode + Ledger Cursor Fix
**Issue:** #40
**Branch prefix:** fix
**Acceptance criteria:**
- [x] Circles demo renders in dark mode by default (add `.dark` class to its theme wrapper)
- [x] Circles dark theme variables are properly applied
- [x] Ledger document page: Marcus cursor label shows on hover near the blue cursor line only — hidden by default, revealed on hover over the cursor area
- [x] Build passes
**Status:** done

## Epic 2: Ritual Overhaul
**Objective:** Redesign Ritual into a dating-style social circle app with merged circle+chat, dating profiles, GIFs, messaging, and matching
**Dependencies:** Epic 1
**Epic slug:** ritual-overhaul
**Epic branch:** epic/ritual-overhaul
**Tracking issue:** #43
**PR:** #47
**Status:** complete

### Stage 2.1: Data Model & Profile Redesign
**Issue:** #44
**Branch prefix:** feat
**Status:** done

### Stage 2.2: Merged Circle+Chat Page
**Issue:** #45
**Branch prefix:** feat
**Status:** done

### Stage 2.3: Matching & DM Functionality
**Issue:** #46
**Branch prefix:** feat
**Status:** done

## Epic 3: Circles CRM Overhaul
**Objective:** Add editable circles, contact frequency per circle, visual people in circles, labels system, messaging
**Dependencies:** Epic 1
**Epic slug:** circles-overhaul
**Epic branch:** epic/circles-overhaul
**Tracking issue:** #49
**PR:** #53
**Status:** complete

### Stage 3.1: Circle Editing & Frequency Model
**Issue:** #50
**Branch prefix:** feat
**Acceptance criteria:**
- [x] Remove `contactFrequencyDays` from Person type
- [x] Add `contactFrequencyDays: number` to Circle type
- [x] Circles are editable: name, emoji, description, frequency
- [x] Can create new circles
- [x] Overview page shows each circle with its members visually displayed inside (avatars/cards within each circle)
- [x] Drag or UI control to move a person between circles
- [x] Build passes
**Status:** done

### Stage 3.2: Labels System
**Issue:** #51
**Branch prefix:** feat
**Acceptance criteria:**
- [x] Remove `relationship` field from Person type
- [x] Add `labels: string[]` to Person type
- [x] Labels have unique colors (auto-assigned from a palette)
- [x] Person form: type to create new label OR select from dropdown of existing labels
- [x] Labels displayed as colored chips on person cards
- [x] Build passes
**Status:** done

### Stage 3.3: Messaging
**Issue:** #52
**Branch prefix:** feat
**Acceptance criteria:**
- [x] Add messaging UI to person detail page
- [x] Can compose and "send" messages (added to local state)
- [x] Messages displayed in chronological thread with timestamps
- [x] Build passes
**Stage PR:** #54
**Status:** done

## Epic 4: Local Storage Persistence
**Objective:** Add localStorage support for all app state across all 3 demos
**Dependencies:** Epic 2, Epic 3
**Epic slug:** demo-localstorage
**Epic branch:** epic/demo-localstorage
**Tracking issue:** #55
**PR:** #57
**Status:** complete

### Stage 4.1: Storage Hook & All Demos
**Branch prefix:** feat
**Acceptance criteria:**
- [x] Create a `useLocalStorage<T>` hook that syncs React state to localStorage
- [x] Ledger: persist any interactive state (audit filters, tab selections)
- [x] Ritual: persist circle messages, match states, DM threads, profile edits
- [x] Circles: persist people, circles, interactions, labels, messages
- [x] Data initializes from static mock data on first load, persists changes thereafter
- [x] Build passes
**Stage PR:** #56
**Status:** done

## Epic 5: Site Polish
**Objective:** Polish home page layout, navigation styling, and footer across the site
**Dependencies:** Epic 1
**Epic slug:** site-polish
**Epic branch:** epic/site-polish
**Tracking issue:** #48
**PR:** #61
**Status:** complete

### Stage 5.1: Case Study Content Rewrite
**Branch prefix:** feat
**Acceptance criteria:**
- [x] Ritual: replace "reach out more" anxiety framing with messaging about swiping anxiety/addiction → calm weekly space for connection
- [x] Ritual design approach: replace typeface details with design intent (what is emphasized and why)
- [x] Ledger: emphasize version tracking on everything for compliance/auditing, moving fast without fear of losing history
- [x] Ledger design approach: replace typeface details with design intent (what is emphasized and why)
- [x] Circles: emphasize circle categorization for managing evolving relationships over time
- [x] Circles design approach: replace typeface details with design intent (what is emphasized and why)
- [x] Build passes
**Stage PR:** #58
**Status:** done

### Stage 5.2: Home Page & Navigation Polish
**Branch prefix:** feat
**Acceptance criteria:**
- [x] Home page: case studies section displays to the right of main blurb on larger screens (no scroll required)
- [x] Demo pages: top-right nav becomes a toggle group with "Demos" label to the left
- [x] Main nav: "Case Studies:" label (lighter font) to the left of case study links
- [x] Main nav: non-selected case studies slightly darker text; selected has light background with site button border-radius
- [x] Build passes
**Stage PR:** #59
**Status:** done

### Stage 5.3: Sticky Footer
**Branch prefix:** feat
**Acceptance criteria:**
- [x] Site footer is shorter and sticky (fixed to bottom)
- [x] All pages have sufficient bottom padding/margin so content isn't hidden by sticky footer
- [x] Build passes
**Stage PR:** #60
**Status:** done
