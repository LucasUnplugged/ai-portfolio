---
slug: demo-polish
status: planning
created: 2026-03-04
---
# Demo Apps Polish & Enhancement

## Overview
Fix CSS theme scoping, consolidate headers, add dark mode for Circles, overhaul Ritual into a dating-app-style social circle app, fix Ledger cursor label, overhaul Circles CRM with editable circles/labels/messaging, and add localStorage persistence to all 3 demos.

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
**Status:** pending

### Stage 2.1: Data Model & Profile Redesign
**Branch prefix:** feat
**Acceptance criteria:**
- [ ] Update RitualUser type: add `photos: string[]` (stock photo URLs from picsum/unsplash), `datingPrompt: { question: string; answer: string }`, `occupation: string`
- [ ] Circle type: rename `endDate` logic to reflect 1-week cycle, rename "Fireside Circle" → "Circle" everywhere
- [ ] Update mock data: each user gets 2-3 stock photos, unique dating prompt+answer, occupation, location
- [ ] Profile page shows the current user's own profile (not another person's) with: large hero photo, name/age/location/occupation, dating prompt card, Edit Profile + Photos tabs
- [ ] Other users' profiles: viewed via "View" button — show hero photo, name/age/location, dating prompt, "Request Match" button
- [ ] Photos management UI on own profile (grid of photos with add/remove affordances)
- [ ] Build passes
**Status:** pending

### Stage 2.2: Merged Circle+Chat Page
**Branch prefix:** feat
**Acceptance criteria:**
- [ ] Merge circle and chat pages into one page at `/app/ritual/circle`
- [ ] Top section: weekly prompt card with answer options (like design ref images)
- [ ] Below prompt: conversation feed with messages from circle members
- [ ] Day dividers between messages from different days (visual line breaks with date)
- [ ] Some messages include GIF images (cat GIFs, Schitt's Creek memes — use real GIF URLs from giphy/tenor)
- [ ] Message input at bottom with send functionality (adds to local state)
- [ ] Remove separate `/app/ritual/chat` route
- [ ] Bottom nav: Circle (chat icon), Matches (heart), Profile (user)
- [ ] Build passes
**Status:** pending

### Stage 2.3: Matching & DM Functionality
**Branch prefix:** feat
**Acceptance criteria:**
- [ ] Connections page: Matches tab shows matched users, Requests tab shows incoming/outgoing requests
- [ ] "Request Match" on profile triggers a pending request
- [ ] Accept/decline incoming requests
- [ ] Matched users can be tapped to open DM thread
- [ ] DM page: message input, send messages, timestamps
- [ ] Typography cleanup: consistent heading sizes across all pages
- [ ] Build passes
**Status:** pending

## Epic 3: Circles CRM Overhaul
**Objective:** Add editable circles, contact frequency per circle, visual people in circles, labels system, messaging
**Dependencies:** Epic 1
**Epic slug:** circles-overhaul
**Epic branch:** epic/circles-overhaul
**Status:** pending

### Stage 3.1: Circle Editing & Frequency Model
**Branch prefix:** feat
**Acceptance criteria:**
- [ ] Remove `contactFrequencyDays` from Person type
- [ ] Add `contactFrequencyDays: number` to Circle type
- [ ] Circles are editable: name, emoji, description, frequency
- [ ] Can create new circles
- [ ] Overview page shows each circle with its members visually displayed inside (avatars/cards within each circle)
- [ ] Drag or UI control to move a person between circles
- [ ] Build passes
**Status:** pending

### Stage 3.2: Labels System
**Branch prefix:** feat
**Acceptance criteria:**
- [ ] Remove `relationship` field from Person type
- [ ] Add `labels: string[]` to Person type
- [ ] Labels have unique colors (auto-assigned from a palette)
- [ ] Person form: type to create new label OR select from dropdown of existing labels
- [ ] Labels displayed as colored chips on person cards
- [ ] Build passes
**Status:** pending

### Stage 3.3: Messaging
**Branch prefix:** feat
**Acceptance criteria:**
- [ ] Add messaging UI to person detail page
- [ ] Can compose and "send" messages (added to local state)
- [ ] Messages displayed in chronological thread with timestamps
- [ ] Build passes
**Status:** pending

## Epic 4: Local Storage Persistence
**Objective:** Add localStorage support for all app state across all 3 demos
**Dependencies:** Epic 2, Epic 3
**Epic slug:** demo-localstorage
**Epic branch:** epic/demo-localstorage
**Status:** pending

### Stage 4.1: Storage Hook & All Demos
**Branch prefix:** feat
**Acceptance criteria:**
- [ ] Create a `useLocalStorage<T>` hook that syncs React state to localStorage
- [ ] Ledger: persist any interactive state (audit filters, tab selections)
- [ ] Ritual: persist circle messages, match states, DM threads, profile edits
- [ ] Circles: persist people, circles, interactions, labels, messages
- [ ] Data initializes from static mock data on first load, persists changes thereafter
- [ ] Build passes
**Status:** pending
