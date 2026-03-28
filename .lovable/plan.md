

# Add Tooltips, Info Icons & Hover Cards to Financial Models

Enhance `src/components/FinancialModels.tsx` with contextual help throughout all four panels so investors can understand every metric, chart, and slider without prior knowledge.

## What Gets Added

### New Helper Component: `InfoTip`
A reusable inline component combining a small `Info` icon with a `Tooltip` — hover to reveal explanation text. Used everywhere below.

```text
[metric label] ⓘ  ← hover shows tooltip
```

### 1. UnitEconomicsPanel — Tooltips Added
- **Section header**: "Unit economics show the per-credit profitability across pricing tiers"
- **API Cost Multiplier slider**: "Simulates wholesale API price changes. 1x = current rates. Drag to stress-test margins."
- **Blended Cost/OC**: "Average cost to fulfill one OmniCredit across all tiers"
- **Blended Sell/OC**: "Average revenue earned per OmniCredit sold"
- **Blended Margin**: "Percentage of revenue retained after API costs. Above 40% = healthy."
- **Revenue Breakdown pie**: "How each dollar of credit revenue is allocated"
- **Cost vs Sell bar chart**: "Visual comparison of wholesale cost vs retail price per tier — taller green = more margin"

### 2. ProjectionCharts — Tooltips Added
- **Section header**: "Growth projections based on current pricing and market assumptions"
- **Revenue/API/Profit area chart**: "Shaded area between revenue and API costs represents gross profit"
- **User Growth bar chart**: "Projected active users per year based on organic + paid acquisition"
- **Gross Margin line chart**: "Margin improves over time through volume discounts and enterprise adoption"
- **Tab labels**: 5-Year ("Near-term execution phase"), 10-Year ("Full market maturity"), Combined ("Complete trajectory")
- **Assumptions footnote**: add HoverCard with detailed assumption breakdown

### 3. ScenarioTesting — Tooltips Added
- **Section header**: "Compare outcomes under different market conditions"
- **Bull Case tab**: "Accelerated adoption: 1.5x users, 1.3x revenue, +5% margin improvement"
- **Base Case tab**: "Current trajectory with no adjustments"
- **Bear Case tab**: "Adverse conditions: 0.5x users, 0.6x revenue, -8% margin compression"
- **Each table header** (Y5 Revenue, Y5 Users, etc.): brief explanation of what drives that number
- **Comparison chart title**: "Side-by-side revenue outcomes help quantify upside vs downside risk"

### 4. StressTest — Tooltips Added
- **Section header**: "Drag sliders to model worst-case scenarios and find breaking points"
- **API Cost Increase slider**: "What if providers raise API prices? Models impact on margins."
- **User Churn Rate slider**: "Annual percentage of users who stop purchasing. Industry avg: 10-15%."
- **Avg Credit Purchase slider**: "Average transaction size. Higher = better unit economics."
- **Market Growth Rate slider**: "Overall market expansion multiplier. 1x = organic only."
- **Y5 Revenue gauge**: "Projected Year 5 revenue under stress conditions. Green ≥ $30M."
- **Gross Margin gauge**: "Net margin after stressed API costs. Green ≥ 40%."
- **Break-even gauge**: "Months to profitability. Green ≤ 24 months."
- **Color zone legend**: Replace emoji with labeled text: "Critical / Caution / Healthy"

## Technical Details
- **File changed**: `src/components/FinancialModels.tsx` only
- **New imports**: `Tooltip, TooltipTrigger, TooltipContent, TooltipProvider` from `ui/tooltip`, `HoverCard, HoverCardTrigger, HoverCardContent` from `ui/hover-card`, `Info` from `lucide-react`
- Create a small `InfoTip` inline component at the top of the file:
  ```tsx
  const InfoTip = ({ text }: { text: string }) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Info className="h-3.5 w-3.5 text-muted-foreground/60 hover:text-primary cursor-help inline ml-1" />
      </TooltipTrigger>
      <TooltipContent className="max-w-[260px] text-xs">{text}</TooltipContent>
    </Tooltip>
  );
  ```
- Wrap the entire return of each panel in `<TooltipProvider delayDuration={200}>`
- Add `InfoTip` next to every label, chart title, slider label, gauge label, and tab
- Add a `HoverCard` on the assumptions footnote in ProjectionCharts with a detailed breakdown
- Replace gauge emoji indicators (🔴🟡🟢) with styled text labels: "Critical", "Caution", "Healthy"
- ~40 tooltip instances total across all 4 panels

