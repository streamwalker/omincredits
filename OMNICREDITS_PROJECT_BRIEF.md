# OmniCredits™ — Complete Project Brief for Cowork

## Product Overview

**OmniCredits™** is a prepaid AI credit platform that simplifies access to multiple AI tools through a single credit system — targeting non-technical consumers, gift buyers, families, and students who wouldn't otherwise subscribe to individual AI services.

**Tagline:** "The Easiest Way to Gift AI"  
**Core Value Prop:** One card. Unlimited creativity. Works across the world's leading AI tools.  
**Source Repo:** https://github.com/streamwalker/omincredits.git  
**Live (Lovable build):** https://omnicredits.streamwalkers.com/  
**Original Platform:** Lovable.dev  
**Target Stack:** Vite + React + TypeScript + Tailwind + Supabase  

---

## Design System

The existing app uses a dark theme with these characteristics:
- **Background:** Very dark navy/charcoal (~#0d1117 or similar)
- **Cards:** Slightly lighter dark with subtle border glow effects
- **Primary accent:** Cyan/electric blue (#00e5ff range)
- **Secondary accents:** Purple gradient, magenta/pink for CTAs
- **Text:** White headings, muted gray for secondary text
- **Brand font:** STREAMWALKERS logo in gradient pink-to-cyan
- **Card borders:** Subtle gradient borders (cyan-to-purple)
- **Charts:** Cyan, magenta, green, yellow, red color palette
- **Overall feel:** Premium, dark-mode fintech/crypto aesthetic

---

## App Architecture — What Exists

### 1. Landing / Marketing Page
- Hero: "The Easiest Way to Gift AI"
- Subtitle: "One card. Unlimited creativity. Works across the world's leading AI tools."
- Two CTAs: "Buy AI Credits" and "Redeem Code"
- **Credit Pack Pricing:**
  | Price | Credits | Per-Credit | Badge |
  |-------|---------|------------|-------|
  | $25 | 100 OC | $0.25 | — |
  | $50 | 250 OC | $0.20 | — |
  | $100 | 600 OC | $0.167 | Best Value |
  | $200 | 1,400 OC | $0.143 | Best Value |
- "What Can You Create?" section with 4 cards:
  - Write Stories & Essays
  - Generate Images & Art
  - Create AI Videos
  - Build Apps & Websites
- Nav: STREAMWALKERS logo (left), Redeem + Sign In (right)

### 2. User Dashboard (authenticated)
- Nav: STREAMWALKERS logo, Partnerships link, credit balance badge (742 OC), logout
- **Credit balance hero:** Large number display with "Credits Remaining" / "OmniCredits™"
- **Four AI service cards** in 2x2 grid:
  | Service | Description | Cost |
  |---------|-------------|------|
  | Chat with AI | Ask anything, write content, brainstorm ideas | 1 OC per use |
  | Generate Images | Create stunning visuals from text prompts | 5 OC per use |
  | Create Video | Produce short AI-generated videos | 25 OC per use |
  | Build Something | Code projects with AI assistance | 10 OC per use |
- **Usage Today panel:** Credits Used (0 OC), Remaining (742 OC), Est. Chat Prompts Left (742)
- **Need More? panel:** "Buy credits or gift to a friend" with "Buy More Credits" CTA

### 3. Partnerships Section (3 tabs: Pipeline, Pitch Deck, Outreach)

#### 3a. Pipeline Tab
- **Three-phase strategy cards:**
  - Phase 1: API Direct (In Progress) — Use provider APIs directly, build wallet, route usage, track metrics
  - Phase 2: Build Leverage (Not Started) — Track users & credits sold, measure usage by provider, demographic insights
  - Phase 3: Approach Partners (Not Started) — Outreach to mid-tier first, share traction metrics, negotiate revenue share / co-branding

- **Target Companies** in 3 tiers with priority + status badges:
  - Tier 1 (First Targets): Lovable (Code/High), Bolt (Code/High), Cursor (Code/High), Replit (Code/Medium), Runway (Video/High), ElevenLabs (Audio/High)
  - Tier 2 (After Traction): Anthropic (Text/Medium), Mistral (Text/Medium), Stability AI (Image/Medium), Midjourney (Image/Low)
  - Tier 3 (At Scale): OpenAI (Text/Low), Google Gemini (Text/Low)

- **Negotiation Power Curve** — 4-stage visual timeline:
  0: Today — "You need them — use APIs"
  1: Early Traction — "Small partners say yes"
  2: Growth — "Bigger players listen"
  3: Scale — "You become distribution"

- **30-Day Tactical Plan** (4 weekly cards):
  - Week 1: Build OmniCredits MVP, Integrate 1–2 APIs
  - Week 2: Sell first credits, Track usage metrics
  - Week 3: Add 1–2 more providers, Begin routing logic
  - Week 4: Compile metrics, Start outreach to smaller players

#### 3b. Pitch Deck Tab
- **Opening:** "We've built a prepaid AI credit system that brings new users into the ecosystem — especially non-technical consumers and gift buyers."
- **Problem:** "Right now, most AI platforms only monetize users willing to subscribe or learn complex pricing models. Millions of potential users are left out."
- **Solution:** "OmniCredits™ simplifies AI access into a single credit system and routes usage across tools — driving incremental usage you wouldn't otherwise capture."

- **SWOT Analysis** (4-quadrant grid):
  - Strengths: First-mover in prepaid AI credits, Simplified UX, Multi-provider routing, Prepaid cash flow model
  - Weaknesses: No established brand yet, Dependent on third-party APIs, Unproven at scale, Limited traction data
  - Opportunities: Untapped gift & family market, Enterprise bulk purchases, Education sector, International expansion
  - Threats: Providers launching own gift cards, API pricing changes, Competitors copying the model, Regulatory changes

- **Traction** (placeholder [X] values): Credits Sold, Users Onboarded, Usage Volume (API calls routed), Revenue

- **Financial Model — Unit Economics:**
  - Interactive API Cost Multiplier slider (0.5x to 2.0x, default 1.0x)
  - Blended Cost/OC: $0.107 | Blended Sell/OC: $0.190 | Blended Margin: 43.4%
  - Revenue Breakdown donut chart (API Cost 45%, Net Margin 30%, OpEx 25%, Gross Profit 55%)
  - Cost vs Sell per Tier bar chart ($25/$50/$100/$200 packs)
  - "View Detailed Tier Breakdown" expandable

- **Financial Projections** (tabs: 5-Year, 10-Year, Combined):
  - Revenue, API Costs & Gross Profit line chart (Y1–Y10, scaling to $2.6B)
  - User Growth bar chart (Y1–Y10, scaling to 10M)
  - Gross Margin Trajectory line chart (30% to 75%)
  - "View Data Table" expandable
  - Assumptions note about volume discounts, enterprise tiers, reduced per-unit costs

- **Scenario Analysis** (tabs: Side-by-Side, Bull Case, Base Case, Bear Case):
  - Revenue Comparison bar chart (Y5 & Y10)
  - Metrics table:
    | Metric | Bull | Base | Bear |
    |--------|------|------|------|
    | Y5 Revenue | $48.8M | $37.5M | $22.5M |
    | Y5 Users | 750K | 500K | 250K |
    | Y5 Margin | 65% | 60% | 52% |
    | Y10 Revenue | $3.3B | $2.5B | $1.5B |
    | Y10 Users | 15.0M | 10.0M | 5.0M |
    | Y10 Margin | 75% | 70% | 62% |

- **Stress Testing** — 4 interactive sliders:
  - API Cost Increase (default +0%)
  - User Churn Rate (default 10%)
  - Avg Credit Purchase (default $75)
  - Market Growth Rate (default 1.0x)
  - Output metrics: Y5 Revenue ($22.1M), Gross Margin (32.3%), Break-even (5 mo)
  - Health indicators (Critical/Caution/Healthy) per metric

- **Partnership Angles** (4 cards):
  - Incremental Revenue — prepaid users who wouldn't subscribe directly
  - New Demographics — non-technical, kids, gift buyers, families
  - Usage Expansion — users experiment across tools, increasing total spend
  - Prepaid Cash Flow — credits sold upfront, predictable low-risk revenue

- **What We Offer** (3 options):
  - Option A: Revenue Share — margin on credits, partner gets API revenue at standard rates
  - Option B: Featured Placement — "Powered by [Provider]" sections
  - Option C: Co-branded Credits — "Use OmniCredits™ with [Provider]" after traction

- **The Ask:** "We'd like to formalize access and explore co-marketing + deeper integration."

#### 3c. Outreach Tab
- **Email Templates** with Copy buttons:
  - Cold Outreach — Mid-Tier Platform (subject line + full body template)
  - Cold Outreach — Major Player (OpenAI/Anthropic) (subject line + full body template)
  - Both use [Name], [Company Name], [X], [timeframe] placeholders

---

## Rebuild Goals

Rebuild from scratch using modern React + Supabase, improving on the Lovable version:

### Improvements to Make
1. **Real auth flow** — OAuth (Google, GitHub), email verification, password reset
2. **Live credit operations** — actual Stripe checkout, real balance tracking in Supabase
3. **API routing** — actually connect to AI provider APIs (start with OpenAI/Anthropic for chat, then expand)
4. **Dynamic data** — replace [X] placeholders with real metrics from Supabase
5. **Partnership CRM** — make the target companies section editable (status updates, notes, contact info)
6. **Better financial model** — persist slider states, allow custom scenario inputs
7. **Responsive design** — ensure mobile-friendly across all sections
8. **Admin panel** — user management, credit issuance, platform analytics
9. **API for developers** — external API with key management and documentation

### Phase Order
1. **Landing page + Auth + Dashboard** — core consumer experience
2. **Stripe billing** — real credit purchases
3. **AI service integration** — route credits to actual AI APIs
4. **Partnerships section** — rebuild Pipeline, Pitch Deck, Outreach
5. **Admin panel** — internal operations
6. **Developer API** — third-party integrations

---

## Cowork Session Prompts

### Session 1: Project Setup and Landing Page
> "Set up a new Vite + React + TypeScript + Tailwind project. Configure Supabase for auth and database. Build the landing page matching this design: dark theme, 'The Easiest Way to Gift AI' hero with gradient text, Buy AI Credits / Redeem Code CTAs, four credit pack cards ($25/100 OC, $50/250 OC, $100/600 OC, $200/1400 OC — the last two tagged 'Best Value'), and a 'What Can You Create?' section with 4 cards (Stories, Images, Videos, Apps). Use cyan/purple gradient accents on a near-black background. Reference OMNICREDITS_PROJECT_BRIEF.md for all details."

### Session 2: Auth and User Dashboard
> "Add Supabase auth with email/password and Google OAuth. Build the authenticated dashboard: large credit balance display at top, 2x2 grid of AI service cards (Chat 1 OC, Images 5 OC, Video 25 OC, Build 10 OC) with colored icons and gradient borders, Usage Today panel, and 'Need More? Buy credits or gift to a friend' CTA. Match the dark theme from the landing page."

### Session 3: Stripe Integration
> "Integrate Stripe for credit purchases. Create Supabase Edge Functions for checkout sessions and webhooks. When a user buys a credit pack, mint the OmniCredits to their balance. Add purchase history to the dashboard."

### Session 4: Partnerships — Pipeline
> "Build the Partnerships section at /partnerships with three tabs: Pipeline, Pitch Deck, Outreach. Start with Pipeline: three phase cards with status badges, a Target Companies section with tier groupings and priority/status tags (make these editable and persist to Supabase), a Negotiation Power Curve timeline, and a 30-Day Tactical Plan with weekly task cards. Reference the brief for all company names and phase details."

### Session 5: Partnerships — Pitch Deck
> "Build the Pitch Deck tab with: Opening/Problem/Solution text cards, SWOT analysis grid, traction metrics (pull real data from Supabase where available), interactive unit economics with API Cost Multiplier slider, financial projections with Recharts (5/10 year views), scenario analysis (Bull/Base/Bear) with comparison charts and data table, stress testing with 4 interactive sliders that update output metrics in real-time, partnership angles cards, 'What We Offer' options, and 'The Ask' callout."

### Session 6: Partnerships — Outreach
> "Build the Outreach tab with email templates that have Copy-to-clipboard buttons. Include templates for mid-tier platform outreach and major player outreach. Make the [X] placeholders auto-fill from real Supabase metrics where possible."

---

## Database Schema (Supabase)

```sql
-- Core tables
profiles (
  id uuid references auth.users primary key,
  display_name text,
  avatar_url text,
  role text default 'user', -- 'user' | 'admin'
  created_at timestamptz
)

credit_balances (
  user_id uuid references profiles primary key,
  balance integer default 0,
  lifetime_earned integer default 0,
  lifetime_spent integer default 0,
  updated_at timestamptz
)

credit_transactions (
  id uuid primary key,
  user_id uuid references profiles,
  amount integer, -- positive = credit, negative = debit
  type text, -- 'purchase' | 'usage' | 'gift' | 'refund' | 'admin_grant'
  service text, -- 'chat' | 'image' | 'video' | 'code' | null
  description text,
  stripe_session_id text,
  idempotency_key text unique,
  created_at timestamptz
)

-- Partnerships CRM
partner_companies (
  id uuid primary key,
  name text,
  category text, -- 'Code' | 'Text' | 'Image' | 'Video' | 'Audio'
  tier integer, -- 1, 2, 3
  priority text, -- 'High' | 'Medium' | 'Low'
  status text default 'Not Started', -- 'Not Started' | 'In Progress' | 'Contacted' | 'Negotiating' | 'Signed'
  contact_name text,
  contact_email text,
  notes text,
  updated_at timestamptz
)

-- API keys (Phase 6)
api_keys (
  id uuid primary key,
  user_id uuid references profiles,
  key_hash text unique,
  key_prefix text, -- first 8 chars for display
  scope text default 'read', -- 'read' | 'read_write' | 'admin'
  rate_limit integer default 100,
  is_active boolean default true,
  last_used_at timestamptz,
  created_at timestamptz
)

-- Platform metrics (for pitch deck auto-fill)
platform_metrics (
  id uuid primary key,
  metric_key text unique, -- 'total_credits_sold' | 'total_users' | 'total_api_calls' | 'total_revenue'
  metric_value numeric,
  updated_at timestamptz
)
```

---

*Drop this file into your repo root. Reference it in every Cowork session for full context.*
