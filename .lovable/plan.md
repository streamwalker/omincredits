

# Partnership Hub — Web Pages in the Streamwalkers App

Add three new pages to the app under a `/partnerships` route group, accessible from the main nav. These pages serve as an internal strategy/outreach hub matching the existing dark futuristic design.

## Pages to Build

### 1. `/partnerships` — Partnership Pipeline Dashboard
- **Header**: "Partnership Pipeline" with gradient text
- **3 phase cards** (Phase 1: API Direct, Phase 2: Build Leverage, Phase 3: Approach Partners) showing status, key actions, and metrics placeholders
- **Target companies table/grid** ranked by likelihood to say yes:
  - **Tier 1 (First targets)**: Mid-tier/emerging platforms — Lovable, Bolt, Cursor, Replit, Runway, ElevenLabs
  - **Tier 2 (After traction)**: Anthropic, Mistral, Stability AI, Midjourney
  - **Tier 3 (Scale)**: OpenAI, Google (Gemini)
  - Each card shows: company name, category (text/image/video/code), status badge (not started/in progress/contacted/partnered), priority level
- **Negotiation Power Curve** visual — 4-stage timeline (Need Them → Small Partners → Bigger Players → You Are Distribution)
- **30-Day Tactical Plan** — week-by-week checklist

### 2. `/partnerships/pitch` — Pitch Deck Page
- Scrollable single-page pitch deck with sections styled as "slides":
  1. **Opening** — "Prepaid AI credit system for new users"
  2. **Problem** — "Most AI platforms only monetize subscribers"
  3. **Solution** — "Single credit system routing usage across tools"
  4. **Traction** — Placeholder metrics (credits sold, users, usage volume)
  5. **Partnership Angles** — 4 cards: Incremental Revenue, New Demographics, Usage Expansion, Prepaid Cash Flow
  6. **What We Offer** — Revenue Share / Featured Placement / Co-branded Credits options
  7. **The Ask** — "Formalize access + co-marketing"
- Each section styled as a glassmorphism card with gradient accents

### 3. `/partnerships/outreach` — Outreach Email Templates
- **3 email templates** displayed as styled cards users can copy:
  1. **Cold Outreach (Mid-tier)** — for emerging platforms, emphasizes incremental revenue + new demographics
  2. **Cold Outreach (Major Player)** — for OpenAI/Anthropic tier, emphasizes prepaid usage data + demand aggregation
  3. **Follow-up Email** — after initial contact, shares traction metrics
- Each template has: subject line, body text with `[placeholder]` merge fields, a "Copy to Clipboard" button
- **"What NOT to Say" section** — red-bordered warning card listing phrases to avoid

## Navigation
- Add "Partnerships" link to the main nav (visible when authenticated, next to dashboard link)
- Partnership page has internal tabs/links to Pipeline, Pitch, and Outreach sub-pages

## Technical Details
- 3 new files: `src/pages/Partnerships.tsx`, `src/pages/PartnershipPitch.tsx`, `src/pages/PartnershipOutreach.tsx`
- 3 new routes in `App.tsx`: `/partnerships`, `/partnerships/pitch`, `/partnerships/outreach`
- Uses existing design system: `glass`, `glow-border`, `gradient-text` classes, `framer-motion` animations
- Static content — no database changes needed
- Internal nav between the 3 sub-pages via tabs or pill links at the top of each page

