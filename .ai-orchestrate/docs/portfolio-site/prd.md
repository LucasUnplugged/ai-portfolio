---
saga: portfolio-site
status: shipped
created: 2026-03-03
author: Lucas Castro + Claude
---

# AI Portfolio Site

## Overview

A portfolio website showcasing Lucas Castro's UI design and engineering skills through three interactive case studies, each with a fully-realized demo application. Built with Next.js 16, shadcn/ui, and Tailwind CSS 4.

## Users & Roles

**Primary audience:** Potential employers, clients, and collaborators reviewing Lucas's portfolio.
**Single role:** Visitor (read-only, no auth).

## Functional Requirements

### FR-1: Landing Page
The home page (`/`) serves as an introduction to Lucas Castro — software engineer focused on UX and frontend excellence.
**Content:** Brief bio (drawing from LinkedIn profile), skills summary, and visual links to the three case studies.
**User story:** As a visitor, I want to quickly understand who Lucas is and navigate to his work samples.
**Acceptance criteria:**
- [ ] Displays name, title, brief professional summary
- [ ] Links to all 3 case studies with visual previews
- [ ] Responsive, polished design using the site's main theme
- [ ] Uses shadcn/ui components

### FR-2: Case Study Pages
Three case study pages (`/case-studies/ledger`, `/case-studies/ritual`, `/case-studies/circles`) in the site's main look and feel.
**User story:** As a visitor, I want to read about each project's concept, my role, and design decisions before exploring the demo.
**Acceptance criteria:**
- [ ] Each page describes the project concept, goals, and key design decisions
- [ ] Includes a prominent link/button to launch the demo
- [ ] Uses the site's main layout and navigation
- [ ] Brief but sharp — not walls of text

### FR-3: Ledger Demo App
Desktop web demo (`/app/ledger`) — a multiplayer project management and knowledge base app.
**Theme:** Professional, sharp enterprise software. Warm amber palette, Manrope/Bricolage Grotesque fonts. Light theme default.
**Screens:** Dashboard, Project Overview, Document Editor, Change Review, Task Board, Conflict Resolution, Audit Log.
**Acceptance criteria:**
- [ ] 7 polished desktop screens with full mock data
- [ ] Completely different visual identity from main site
- [ ] Header with back-to-portfolio link and nav to other demos
- [ ] Custom theme via tweakcn (amber/warm palette)
- [ ] Realistic seeded data throughout

### FR-4: Ritual Demo App
Mobile demo (`/app/ritual`) — a structured, time-bound social dating app.
**Theme:** Elegant, warm, purple/fuchsia accent. Dark theme default. Afacad/Adamina fonts.
**Screens:** Onboarding, Current Circle, Group Chat, Member Profile, Matches, 1:1 Chat.
**Acceptance criteria:**
- [ ] 6 polished mobile screens with realistic mock data
- [ ] Rendered inside a phone-sized container centered on page
- [ ] Icon-based bottom navigation (no labels)
- [ ] Dark theme by default
- [ ] Custom theme via tweakcn (purple/fuchsia palette)
- [ ] Visual style inspired by existing Ritual design files

### FR-5: Circles Demo App
Mobile demo (`/app/circles`) — a relationship maintenance app.
**Theme:** Fun, clean, minimalist. Green/teal accent. Light theme default. Inter/JetBrains Mono fonts.
**Screens:** Onboarding, Today View, Circles Overview, Person Profile, Add Person, Reflection.
**Acceptance criteria:**
- [ ] 6 polished mobile screens with realistic mock data
- [ ] Rendered inside a phone-sized container centered on page
- [ ] Icon-based bottom navigation (no labels)
- [ ] Light theme by default
- [ ] Custom theme via tweakcn (green/teal palette)

### FR-6: Demo Navigation Header
Each demo has a header bar that connects back to the portfolio and across demos.
**Acceptance criteria:**
- [ ] Back-to-portfolio link (case study page for that demo)
- [ ] Navigation links to the other two demos
- [ ] Visually distinct per demo (matches each demo's theme)

### FR-7: Phone Simulator Container
Ritual and Circles demos render inside a simulated phone frame.
**Acceptance criteria:**
- [ ] Fixed phone-screen aspect ratio (~375x812 or similar)
- [ ] Centered horizontally and vertically on the page
- [ ] Subtle device frame (rounded corners, bezel)
- [ ] Content scrolls within the container
- [ ] Demo header sits outside/above the phone frame

## Non-Functional Requirements
- **Performance:** Static/SSG where possible, fast loads
- **Accessibility:** Semantic HTML, keyboard navigable, sufficient contrast
- **Responsiveness:** Landing page and case studies are responsive; Ledger demo is desktop-optimized; mobile demos use phone simulator

## Technical Constraints
- **Framework:** Next.js 16 (App Router)
- **UI Library:** shadcn/ui
- **Styling:** Tailwind CSS 4 with per-demo CSS variable scoping
- **Fonts:** Google Fonts via next/font (different per demo)
- **Data:** All mock/seeded data, no backend
- **Themes:** tweakcn.com themes applied per-demo via CSS variable scoping

## Scope Boundary
**In scope:** Landing page, 3 case study pages, 3 demo apps (UI only with mock data), phone simulator, demo navigation
**Out of scope:** Authentication, backends, real data, form submissions, analytics, deployment, dark/light mode toggle (each demo has a fixed theme)

## Open Questions
- None — requirements are comprehensive. Clarifications tracked in `.ai-sagas/docs/portfolio-site/clarifications.md`.
