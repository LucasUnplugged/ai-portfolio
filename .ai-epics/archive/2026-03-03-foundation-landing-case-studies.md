# Epic: Foundation, Landing Page & Case Studies

- **Branch:** epic/foundation-landing-case-studies
- **Feature flag:** foundation_landing_case_studies
- **GitHub Issue:** #2
- **Epic PR:** #7
- **Created:** 2026-03-03
- **Status:** done
- **Project Node ID:** PVT_kwHOACW_X84BQuKN
- **Project Item ID:** PVTI_lAHOACW_X84BQuKNzgmnXeI
- **Status Field ID:** PVTSSF_lAHOACW_X84BQuKNzg-wl-o
- **Status Options:** Planning=488593a0, Todo=32e8980f, In Progress=08819a36, In Review=a6523f37, Done=9872853f

## Stage 1: shadcn/ui Setup & Theming Infrastructure
**Objective:** Initialize shadcn/ui, install base components, configure all Google Fonts in root layout, create per-demo CSS theme files with scoped variables, set up the routing directory structure for all pages.
**Estimated scope:** ~10 files, ~500 lines
**GitHub Sub-Issue:** #3
**Board Item ID:** PVTI_lAHOACW_X84BQuKNzgmnXeg
**Stage Branch:** feat/foundation-landing-case-studies/shadcn-theming-setup
**Stage PR:** #8
**Acceptance criteria:**
- [ ] shadcn/ui initialized with components.json
- [ ] Base components installed (button, card, badge, separator, avatar, dropdown-menu, tabs)
- [ ] All Google Fonts loaded via next/font (Geist, Manrope, Bricolage Grotesque, ADLaM Display, Afacad, Adamina, Fira Code, Inter, JetBrains Mono)
- [ ] Per-demo CSS files with scoped theme variables (Ledger amber, Ritual purple/dark, Circles teal)
- [ ] Route directories created for all pages
- [ ] npm run build succeeds
**Status:** complete
**Iterations:** 0

## Stage 2: Shared Components & Demo Layouts
**Objective:** Build SiteHeader, SiteFooter, DemoHeader (with cross-demo nav), PhoneSimulator container, and demo layout wrappers for all 3 apps. Create placeholder pages at each demo route to verify theming.
**Estimated scope:** ~12 files, ~600 lines
**GitHub Sub-Issue:** #4
**Board Item ID:** PVTI_lAHOACW_X84BQuKNzgmnXfE
**Stage Branch:** feat/foundation-landing-case-studies/shared-components-demo-layouts
**Stage PR:** #9
**Acceptance criteria:**
- [x] SiteHeader with nav links to case studies
- [x] SiteFooter with minimal content
- [x] DemoHeader with back-to-portfolio link and cross-demo navigation
- [x] PhoneSimulator component (375x812 frame, centered, scrollable content)
- [x] Ledger demo layout applies Ledger theme (light)
- [x] Ritual demo layout applies Ritual theme (dark) inside phone simulator
- [x] Circles demo layout applies Circles theme (light) inside phone simulator
- [x] All demo placeholder pages render with correct themes
- [x] npm run build succeeds
**Status:** complete
**Iterations:** 0

## Stage 3: Landing Page
**Objective:** Build the portfolio landing page with bio, skills summary, and visual case study cards linking to each case study page. Sharp, editorial design using shadcn/ui.
**Estimated scope:** ~5 files, ~400 lines
**GitHub Sub-Issue:** #5
**Board Item ID:** PVTI_lAHOACW_X84BQuKNzgmnXfc
**Stage Branch:** feat/foundation-landing-case-studies/landing-page
**Stage PR:** #10
**Acceptance criteria:**
- [x] Hero section with name, title, professional summary
- [x] Skills/expertise section
- [x] Three case study cards with visual previews and descriptions
- [x] Each card links to its case study page
- [x] Responsive design (mobile and desktop)
- [x] Uses shadcn/ui components
- [x] npm run build succeeds
**Status:** complete
**Iterations:** 0

## Stage 4: Case Study Pages
**Objective:** Build all 3 case study pages (Ledger, Ritual, Circles) with project descriptions, design decisions, and prominent demo launch buttons. Brief but sharp content.
**Estimated scope:** ~8 files, ~500 lines
**GitHub Sub-Issue:** #6
**Board Item ID:** PVTI_lAHOACW_X84BQuKNzgmnXf4
**Stage Branch:** feat/foundation-landing-case-studies/case-study-pages
**Stage PR:** #11
**Acceptance criteria:**
- [x] Ledger case study page with concept, goals, design approach, demo button
- [x] Ritual case study page with concept, goals, design approach, demo button
- [x] Circles case study page with concept, goals, design approach, demo button
- [x] All pages use SiteHeader and SiteFooter
- [x] Consistent layout template across all 3
- [x] Responsive design
- [x] npm run build succeeds
**Status:** complete
**Iterations:** 0
