

# Streamwalkers AI Credits — MVP Plan

## Design System
- **Theme**: Dark gradient futuristic — deep navy/black backgrounds (#0a0e1a), neon accent gradients (cyan → purple → pink), glassmorphism cards, subtle animated glows
- **Typography**: Bold modern sans-serif headings, clean body text
- **Credit name**: Compute Credits (CCs)
- **Feel**: Premium, Apple-meets-cyberpunk, polished and minimal

---

## Pages & Features

### 1. Landing Page (`/`)
- **Hero**: "The Easiest Way to Gift AI" headline with animated gradient background, two CTAs — "Buy AI Credits" and "Redeem Code"
- **Quick Buy Strip**: Four glowing cards — $25 (100 CC), $50 (250 CC), $100 (600 CC), $200 (1,400 CC)
- **What Can You Do section**: Icon grid — Write, Generate Images, Create Videos, Build Apps
- **Gift Positioning section**: "Perfect for kids, students, creators, anyone curious about AI"
- **Footer** with branding

### 2. Purchase Flow (`/purchase`)
- Select amount → Enter recipient email + sender name + optional message → Stripe checkout
- Post-purchase confirmation screen with digital card preview
- Generates unique redemption code, stores in database

### 3. Digital Card Preview
- Glassmorphic card component with animated gradient border/glow
- Shows "STREAMWALKERS" branding, credit amount, redemption URL
- Used in purchase confirmation and email delivery

### 4. Redemption Flow (`/redeem`)
- **Screen 1**: Code input field with "Unlock Credits" button
- **Screen 2**: Celebration animation — "You've unlocked 600 Compute Credits!" with "Start Creating" CTA
- Creates user account if needed, adds credits to balance

### 5. Auth (Login / Signup)
- Email + password authentication via Supabase
- Auto-created on redemption if no account exists

### 6. AI Dashboard (`/dashboard`) — Protected route
- **Top bar**: Credit balance displayed prominently (e.g., "742 CCs remaining")
- **Action Grid**: Four main cards with icons:
  - 💬 Chat with AI (1 CC per prompt) — mock responses for now
  - 🎨 Generate Images (5 CC) — mock placeholder images
  - 🎬 Create Video (25 CC) — mock/coming soon
  - 💻 Build Something (10 CC) — mock/coming soon
- **Credit feedback**: Every action shows "-X Credits" animation
- **Usage panel**: Credits used today, remaining, estimated actions left
- **Reload CTA**: "Running low? Buy More Credits" button

---

## Database (Supabase)
- **profiles**: user_id, display_name, credit_balance
- **gift_cards**: id, code, amount_usd, credits, sender_name, sender_email, recipient_email, message, redeemed, redeemed_by, created_at
- **transactions**: id, user_id, type (purchase/redemption/usage), credits_change, description, created_at
- **RLS policies**: Users can only access their own data

---

## Key Interactions
- Purchasing deducts real money (Stripe) and creates a gift card with a unique code
- Redeeming a code adds credits to the user's balance
- Using AI tools (mocked for now) deducts credits with animated feedback
- Low balance triggers reload prompt

