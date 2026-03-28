

# Interactive Financial Models — Pitch Deck Upgrade

Replace the static financial tables with an interactive financial modeling system. Each financial section becomes clickable, opening detailed views with Recharts charts, scenario sliders, and stress tests.

## Architecture

Create a new component file `src/components/FinancialModels.tsx` containing all interactive financial sub-components. The pitch deck page will import and render them in place of the current static tables.

## Components to Build (all in `FinancialModels.tsx`)

### 1. `UnitEconomicsPanel` (replaces static pricing table)
- Clickable card that expands into a Dialog/full section
- **Pie chart**: Revenue breakdown (API cost vs gross profit vs opex vs net margin)
- **Bar chart**: Cost/OC vs Sell/OC per tier, showing margin visually
- **Interactive slider**: "Average API cost multiplier" (0.5x–2x) — recalculates all margins live

### 2. `ProjectionCharts` (replaces 5-year and 10-year tables)
- **Area/line chart**: Revenue, API Costs, Gross Profit over 10 years (Y1–Y10)
- **Bar chart**: Users growth Y1–Y10
- **Line chart**: Gross Margin % trajectory Y1–Y10
- Tables still shown below charts as reference
- **Tabs**: "5-Year View" / "10-Year View" / "Combined"

### 3. `ScenarioTesting` (new section)
- Three preset scenarios via Tabs: **Bull Case**, **Base Case**, **Bear Case**
- Each scenario has different growth multipliers applied to the base data:
  - Bull: 1.5x users, 1.3x revenue, margins +5%
  - Base: current numbers (1x)
  - Bear: 0.5x users, 0.6x revenue, margins -8%
- Side-by-side bar charts comparing Y5 and Y10 outcomes across scenarios
- Table summary below

### 4. `StressTest` (new section)
- Interactive sliders for key variables:
  - API cost increase (0%–100%)
  - User churn rate (5%–40%)
  - Average credit purchase size ($25–$200)
  - Market growth rate (0.5x–3x)
- Results update live: shows impact on Y5 Revenue, Gross Margin, and Break-even timeline
- **Gauge/bar visuals** showing green/yellow/red zones for each output metric
- "Reset to defaults" button

## Changes to `PartnershipPitch.tsx`
- Remove the inline static Financial Model, Five-Year, and Ten-Year table sections (lines 215–346)
- Replace with 4 imported components: `<UnitEconomicsPanel />`, `<ProjectionCharts />`, `<ScenarioTesting />`, `<StressTest />`
- Keep all other sections (SWOT, Traction, Angles, Offers, The Ask) unchanged

## Technical Details
- Uses Recharts (already installed): `AreaChart`, `BarChart`, `PieChart`, `LineChart`, `ResponsiveContainer`
- Uses existing UI: `ChartContainer`/`ChartTooltip` from `ui/chart`, `Tabs`/`TabsList`/`TabsTrigger`/`TabsContent` from `ui/tabs`, `Slider` from `ui/slider`, `Dialog` from `ui/dialog`
- All data is computed from the existing constants with multipliers applied via React state
- Dark theme styling with glassmorphism cards, gradient accents — matches existing design
- Two new files: `src/components/FinancialModels.tsx` (all 4 components) — keeps pitch page clean

