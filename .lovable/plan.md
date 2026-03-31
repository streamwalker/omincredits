

# Rebuild Website Using "Warm Precision" Redesign

Adapt the uploaded single-file redesign (`OmniCredits-Redesign.jsx`) into the existing multi-page React Router + Tailwind + shadcn project structure. This is a full visual overhaul across all major pages.

## What Changes

The redesign shifts from a dark-only crypto aesthetic to a "Warm Precision" design with light mode as default, dark mode as option, glassmorphism cards, interactive gift card visualization, animated counters, trust badges, and conversion-optimized layouts.

## Architecture

### New Shared Components (`src/components/redesign/`)
- **`ThemeProvider.tsx`** — React context for light/dark theme toggle, stores preference in localStorage
- **`GlassCard.tsx`** — Reusable glassmorphism card with hover lift effect
- **`GiftCardVisual.tsx`** — Interactive 3D-tilt gift card with mouse tracking
- **`AnimatedCounter.tsx`** — Smooth number counter animation
- **`PillButton.tsx`** — Rounded CTA buttons with gradient backgrounds
- **`SectionHeading.tsx`** — Consistent section header with subtitle
- **`StatusBadge.tsx`** / **`PriorityBadge.tsx`** — Partnership status indicators

### Design System Updates
- **`tailwind.config.ts`** — Add new color tokens for light/dark themes (warm off-white `#FAFAF8` light bg, `#0F1119` dark bg, accent `#7C3AED` / `#A78BFA`)
- **`src/index.css`** — Update CSS variables for both light and dark themes, add new glass/glow utilities, set light mode as default

### Page Rewrites
1. **`src/pages/Index.tsx`** — Complete rebuild with:
   - New hero with gift card visual + trust badges ("Stripe Secured", "Instant Delivery", "Never Expires")
   - "How It Works" 4-step section
   - Pricing with smart tier anchoring ("Most Popular" on $100, "Best Value" on $200, savings %)
   - "What Can You Create" with hover preview cards
   - Updated footer with links

2. **`src/pages/Dashboard.tsx`** — Wallet-style rebuild:
   - Balance as card element with animated counter
   - Estimated uses grid (Chat: 742, Images: 148, etc.)
   - "Create Something" action tiles
   - Recent activity feed (not a table — visual cards)
   - Keep auth integration and Partnerships nav link

3. **`src/pages/Partnerships.tsx`** — Consolidate into tabbed view:
   - Pipeline tab with phase cards, company tiers, negotiation curve, 30-day plan
   - Pitch Deck tab with SWOT, unit economics, projections, scenarios, stress test (keep existing `FinancialModels.tsx`)
   - Outreach tab with email templates + copy buttons
   - Remove separate `PartnershipPitch.tsx` and `PartnershipOutreach.tsx` routes

4. **Nav/Header** — Add to `Index.tsx` and shared layout:
   - OmniCredits logo with gradient icon
   - Theme toggle (sun/moon)
   - "Send a Gift" primary CTA in nav

### Route Changes (`App.tsx`)
- Remove `/partnerships/pitch` and `/partnerships/outreach` routes (consolidated into `/partnerships` tabs)
- All other routes stay the same

### Files Preserved (no changes)
- `src/components/FinancialModels.tsx` — Already built with interactive charts, tooltips, accessibility
- `src/hooks/useAuth.tsx` — Auth logic unchanged
- `src/integrations/supabase/*` — Unchanged
- `src/pages/Purchase.tsx`, `src/pages/Redeem.tsx`, `src/pages/Auth.tsx` — Receive minor styling updates to match new theme but keep functionality

## Technical Details
- Theme toggle uses CSS class strategy (already configured in Tailwind as `darkMode: "class"`)
- All inline styles from the redesign file get converted to Tailwind classes
- Glassmorphism via `backdrop-blur-xl bg-white/60 dark:bg-slate-800/60` pattern
- Gift card tilt effect uses `onMouseMove` with CSS `perspective` + `rotateX/Y` transforms
- Animated counter uses `requestAnimationFrame` with easing
- Existing Recharts setup reused for all charts in FinancialModels and Pitch Deck
- framer-motion kept for page transitions and scroll animations

## Implementation Order
1. Design system (tailwind config + CSS variables + ThemeProvider)
2. Shared components (GlassCard, GiftCardVisual, etc.)
3. Landing page rebuild
4. Dashboard rebuild
5. Partnerships consolidation
6. Route cleanup + minor page style updates

