

# Add SWOT, Financial Models & Projections to Pitch Deck

Add three new sections to `src/pages/PartnershipPitch.tsx` between the existing sections, keeping the same glassmorphism card style.

## New Sections

### 1. SWOT Analysis (after Solution, before Traction)
A 2x2 grid of colored cards:
- **Strengths**: First-mover in prepaid AI credits, simplified UX for non-technical users, multi-provider routing, prepaid cash flow model
- **Weaknesses**: No established brand yet, dependent on third-party APIs, unproven at scale, limited traction data
- **Opportunities**: Untapped gift/family market, enterprise bulk credit purchases, education sector, international expansion
- **Threats**: Providers launching own gift cards, API pricing changes eroding margins, competitors copying the model, regulatory changes

Each quadrant gets a distinct accent color (green/yellow/blue/red).

### 2. Financial Model (after Traction, before Partnership Angles)
A card showing the unit economics table:
- **Credit pricing tiers**: $25/100OC, $50/250OC, $100/600OC, $200/1400OC
- **Blended margin**: Show average cost-per-OC vs sell price, with ~40-60% gross margin assumption
- **Revenue breakdown**: Credit sales revenue, API cost (wholesale), gross profit, operating expenses, net margin
- Uses a simple styled table with the existing design system

### 3. Five-Year & Ten-Year Financial Projections (after Financial Model)
Two projection tables side by side (or stacked on mobile):

**Five-Year Projection** (Year 1-5):
| Metric | Y1 | Y2 | Y3 | Y4 | Y5 |
|--------|-----|-----|------|------|------|
| Users | 1K | 10K | 50K | 200K | 500K |
| Credits Sold | 100K OC | 1.5M OC | 10M OC | 50M OC | 150M OC |
| Revenue | $25K | $375K | $2.5M | $12.5M | $37.5M |
| API Costs | $15K | $200K | $1.2M | $5.5M | $15M |
| Gross Profit | $10K | $175K | $1.3M | $7M | $22.5M |
| Gross Margin | 40% | 47% | 52% | 56% | 60% |

**Ten-Year Projection** (Year 6-10):
| Metric | Y6 | Y7 | Y8 | Y9 | Y10 |
|--------|------|------|------|-------|-------|
| Users | 1M | 2M | 4M | 7M | 10M |
| Credits Sold | 400M OC | 1B OC | 2.5B OC | 5B OC | 10B OC |
| Revenue | $100M | $250M | $625M | $1.25B | $2.5B |
| Gross Margin | 62% | 64% | 66% | 68% | 70% |

Assumptions note at bottom: margin improvement from volume discounts, enterprise tiers, and reduced per-unit API costs at scale.

## Technical Details
- All changes in `src/pages/PartnershipPitch.tsx` only
- Add `Shield, Target, Lightbulb, AlertTriangle, BarChart3, Calculator` to lucide imports
- Add `Table, TableBody, TableCell, TableHead, TableHeader, TableRow` imports from ui/table
- Each new section is a `motion.div` + `Card` with staggered animation delays (adjusted for new count)
- SWOT grid uses `grid-cols-2` with colored left borders per quadrant
- Projection tables use the existing `Table` UI components with the dark theme styling

