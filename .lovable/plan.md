

# Update Purchase, Redeem & Auth Pages + Add Route Transitions

## Changes

### 1. Update Purchase, Redeem, and Auth Pages
All three pages currently use a raw `<nav>` with a back arrow instead of the shared `AppHeader` and `AppFooter`. They also use old-style `glass`/`glow-border` classes. Updates:

- **All three pages**: Replace the inline `<nav>` with `<AppHeader />`, add `<AppFooter />` at the bottom, wrap content in the same max-width container pattern used by Index/Dashboard
- **Purchase.tsx**: Replace raw `glass glow-border` plan cards with `<GlassCard>` components. Use the redesign color system for the confirmation step. Replace `<DigitalCard>` with `<GiftCardVisual>` for consistency.
- **Redeem.tsx**: Wrap the input and success steps in `<GlassCard>`. Style the success glow using CSS variables. Add `<AppFooter />`.
- **Auth.tsx**: Wrap the form in a centered `<GlassCard>`. Add framer-motion fade-in. Import `<AppHeader />` and `<AppFooter />`.

### 2. Add Route Transition Animations
Create a wrapper component `src/components/redesign/PageTransition.tsx` using framer-motion's `AnimatePresence` + `motion.div` with a fade+slide-up animation. Wrap each route's element in `<PageTransition>` inside `App.tsx` using `useLocation` as the key.

## Files Modified
- `src/pages/Purchase.tsx` — Add AppHeader/AppFooter, use GlassCard, use GiftCardVisual
- `src/pages/Redeem.tsx` — Add AppHeader/AppFooter, use GlassCard
- `src/pages/Auth.tsx` — Add AppHeader/AppFooter, wrap form in GlassCard, add motion
- `src/components/redesign/PageTransition.tsx` — New: framer-motion page wrapper
- `src/App.tsx` — Wrap Routes content with AnimatePresence + PageTransition using location key

## Technical Details
- `PageTransition` uses `motion.div` with `initial={{ opacity: 0, y: 12 }}`, `animate={{ opacity: 1, y: 0 }}`, `exit={{ opacity: 0, y: -12 }}`, `transition={{ duration: 0.25, ease: "easeOut" }}`
- In `App.tsx`, use `useLocation()` inside a child component (since `useLocation` must be inside `BrowserRouter`), pass `location.pathname` as `key` to `AnimatePresence`
- No new dependencies needed — framer-motion is already installed

