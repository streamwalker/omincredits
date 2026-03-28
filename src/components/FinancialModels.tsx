import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { Calculator, BarChart3, TrendingUp, FlaskConical, RotateCcw, ChevronRight, Info } from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line,
  XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Tooltip as RechartsTooltip,
} from "recharts";
import { motion } from "framer-motion";

// ─── InfoTip Helper ───────────────────────────────────────────────────────────

const InfoTip = ({ text }: { text: string }) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <Info className="h-3.5 w-3.5 text-muted-foreground/60 hover:text-primary cursor-help inline ml-1" />
    </TooltipTrigger>
    <TooltipContent className="max-w-[260px] text-xs">{text}</TooltipContent>
  </Tooltip>
);

// ─── Base Data ────────────────────────────────────────────────────────────────

const BASE_TIERS = [
  { price: 25, credits: 100, costPerOC: 0.15, sellPerOC: 0.25 },
  { price: 50, credits: 250, costPerOC: 0.12, sellPerOC: 0.20 },
  { price: 100, credits: 600, costPerOC: 0.09, sellPerOC: 0.167 },
  { price: 200, credits: 1400, costPerOC: 0.07, sellPerOC: 0.143 },
];

const BASE_PROJECTIONS = [
  { year: "Y1", users: 1000, credits: 100000, revenue: 25000, apiCosts: 15000, grossProfit: 10000, margin: 40 },
  { year: "Y2", users: 10000, credits: 1500000, revenue: 375000, apiCosts: 200000, grossProfit: 175000, margin: 47 },
  { year: "Y3", users: 50000, credits: 10000000, revenue: 2500000, apiCosts: 1200000, grossProfit: 1300000, margin: 52 },
  { year: "Y4", users: 200000, credits: 50000000, revenue: 12500000, apiCosts: 5500000, grossProfit: 7000000, margin: 56 },
  { year: "Y5", users: 500000, credits: 150000000, revenue: 37500000, apiCosts: 15000000, grossProfit: 22500000, margin: 60 },
  { year: "Y6", users: 1000000, credits: 400000000, revenue: 100000000, apiCosts: 38000000, grossProfit: 62000000, margin: 62 },
  { year: "Y7", users: 2000000, credits: 1000000000, revenue: 250000000, apiCosts: 90000000, grossProfit: 160000000, margin: 64 },
  { year: "Y8", users: 4000000, credits: 2500000000, revenue: 625000000, apiCosts: 212500000, grossProfit: 412500000, margin: 66 },
  { year: "Y9", users: 7000000, credits: 5000000000, revenue: 1250000000, apiCosts: 400000000, grossProfit: 850000000, margin: 68 },
  { year: "Y10", users: 10000000, credits: 10000000000, revenue: 2500000000, apiCosts: 750000000, grossProfit: 1750000000, margin: 70 },
];

const SCENARIO_MULTIPLIERS = {
  bull: { users: 1.5, revenue: 1.3, marginDelta: 5, label: "Bull Case", color: "hsl(var(--chart-2))" },
  base: { users: 1, revenue: 1, marginDelta: 0, label: "Base Case", color: "hsl(var(--primary))" },
  bear: { users: 0.5, revenue: 0.6, marginDelta: -8, label: "Bear Case", color: "hsl(var(--destructive))" },
};

const COLORS = {
  revenue: "hsl(142, 71%, 45%)",
  apiCost: "hsl(0, 84%, 60%)",
  grossProfit: "hsl(217, 91%, 60%)",
  users: "hsl(280, 70%, 60%)",
  margin: "hsl(45, 93%, 58%)",
  opex: "hsl(30, 80%, 55%)",
  net: "hsl(160, 60%, 45%)",
};

const fmt = (n: number): string => {
  if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `$${(n / 1e3).toFixed(0)}K`;
  return `$${n}`;
};

const fmtNum = (n: number): string => {
  if (n >= 1e9) return `${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(0)}K`;
  return `${n}`;
};

// ─── 1. Unit Economics Panel ──────────────────────────────────────────────────

export function UnitEconomicsPanel() {
  const [costMultiplier, setCostMultiplier] = useState([1]);

  const tiers = useMemo(() => BASE_TIERS.map(t => {
    const adjustedCost = t.costPerOC * costMultiplier[0];
    const margin = ((t.sellPerOC - adjustedCost) / t.sellPerOC * 100);
    return { ...t, adjustedCost, margin: Math.max(0, margin) };
  }), [costMultiplier]);

  const blendedCost = tiers.reduce((s, t) => s + t.adjustedCost, 0) / tiers.length;
  const blendedSell = tiers.reduce((s, t) => s + t.sellPerOC, 0) / tiers.length;
  const blendedMargin = ((blendedSell - blendedCost) / blendedSell * 100);

  const pieData = [
    { name: "API Cost", value: 45 * costMultiplier[0], fill: COLORS.apiCost },
    { name: "Gross Profit", value: Math.max(0, 55 - (45 * (costMultiplier[0] - 1))), fill: COLORS.grossProfit },
    { name: "OpEx", value: 25, fill: COLORS.opex },
    { name: "Net Margin", value: Math.max(0, 30 - (45 * (costMultiplier[0] - 1))), fill: COLORS.net },
  ];

  const barData = tiers.map(t => ({
    tier: `$${t.price}`,
    cost: +(t.adjustedCost * 100).toFixed(1),
    sell: +(t.sellPerOC * 100).toFixed(1),
  }));

  const chartConfig = {
    cost: { label: "Cost/OC (¢)", color: COLORS.apiCost },
    sell: { label: "Sell/OC (¢)", color: COLORS.revenue },
  };

  return (
    <TooltipProvider delayDuration={200}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="glass border-border/30 mb-6">
          <CardContent className="p-8">
            <div className="flex items-center gap-2 mb-6">
              <Calculator className="h-5 w-5 text-primary" />
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                Financial Model — Unit Economics
              </p>
              <InfoTip text="Unit economics show the per-credit profitability across pricing tiers" />
            </div>

            {/* Interactive Slider */}
            <div className="mb-8 p-4 rounded-lg bg-muted/20 border border-border/20">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-heading font-semibold">
                  API Cost Multiplier
                  <InfoTip text="Simulates wholesale API price changes. 1x = current rates. Drag to stress-test margins." />
                </p>
                <span className="text-sm font-mono font-bold text-primary">{costMultiplier[0].toFixed(1)}x</span>
              </div>
              <Slider
                value={costMultiplier}
                onValueChange={setCostMultiplier}
                min={0.5}
                max={2}
                step={0.1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>0.5x (Best)</span>
                <span>1.0x (Current)</span>
                <span>2.0x (Worst)</span>
              </div>
            </div>

            {/* Blended Summary */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center p-3 rounded-lg bg-muted/20">
                <p className="text-xs text-muted-foreground">
                  Blended Cost/OC
                  <InfoTip text="Average cost to fulfill one OmniCredit across all tiers" />
                </p>
                <p className="text-lg font-heading font-bold text-red-400">${blendedCost.toFixed(3)}</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-muted/20">
                <p className="text-xs text-muted-foreground">
                  Blended Sell/OC
                  <InfoTip text="Average revenue earned per OmniCredit sold" />
                </p>
                <p className="text-lg font-heading font-bold text-green-400">${blendedSell.toFixed(3)}</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-muted/20">
                <p className="text-xs text-muted-foreground">
                  Blended Margin
                  <InfoTip text="Percentage of revenue retained after API costs. Above 40% = healthy." />
                </p>
                <p className={`text-lg font-heading font-bold ${blendedMargin > 40 ? "text-green-400" : blendedMargin > 20 ? "text-yellow-400" : "text-red-400"}`}>
                  {blendedMargin.toFixed(1)}%
                </p>
              </div>
            </div>

            {/* Charts Row */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Pie Chart */}
              <div>
                <p className="text-sm font-heading font-semibold mb-3">
                  Revenue Breakdown
                  <InfoTip text="How each dollar of credit revenue is allocated" />
                </p>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={90} dataKey="value" label={({ name, value }) => `${name}: ${value.toFixed(0)}%`}>
                        {pieData.map((entry, i) => (
                          <Cell key={i} fill={entry.fill} />
                        ))}
                      </Pie>
                      <RechartsTooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Bar Chart */}
              <div>
                <p className="text-sm font-heading font-semibold mb-3">
                  Cost vs Sell per Tier
                  <InfoTip text="Visual comparison of wholesale cost vs retail price per tier — taller green = more margin" />
                </p>
                <ChartContainer config={chartConfig} className="h-64">
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                    <XAxis dataKey="tier" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v) => `${v}¢`} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="cost" fill={COLORS.apiCost} radius={[4, 4, 0, 0]} />
                    <Bar dataKey="sell" fill={COLORS.revenue} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ChartContainer>
              </div>
            </div>

            {/* Tier Table */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="mb-4">
                  <ChevronRight className="h-4 w-4 mr-1" /> View Detailed Tier Breakdown
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl glass">
                <DialogHeader>
                  <DialogTitle className="font-heading">Credit Pricing Tiers — Detailed</DialogTitle>
                </DialogHeader>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border/30">
                        <TableHead>Package</TableHead>
                        <TableHead>Credits</TableHead>
                        <TableHead>Cost/OC</TableHead>
                        <TableHead>Sell/OC</TableHead>
                        <TableHead>Margin</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tiers.map(t => (
                        <TableRow key={t.price} className="border-border/20">
                          <TableCell className="font-semibold">${t.price}</TableCell>
                          <TableCell>{t.credits.toLocaleString()} OC</TableCell>
                          <TableCell className="text-red-400">${t.adjustedCost.toFixed(3)}</TableCell>
                          <TableCell className="text-green-400">${t.sellPerOC.toFixed(3)}</TableCell>
                          <TableCell className={`font-bold ${t.margin > 40 ? "text-green-400" : t.margin > 20 ? "text-yellow-400" : "text-red-400"}`}>
                            {t.margin.toFixed(1)}%
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </motion.div>
    </TooltipProvider>
  );
}

// ─── 2. Projection Charts ─────────────────────────────────────────────────────

export function ProjectionCharts() {
  const fiveYear = BASE_PROJECTIONS.slice(0, 5);
  const tenYear = BASE_PROJECTIONS;

  const revenueConfig = {
    revenue: { label: "Revenue", color: COLORS.revenue },
    apiCosts: { label: "API Costs", color: COLORS.apiCost },
    grossProfit: { label: "Gross Profit", color: COLORS.grossProfit },
  };

  const usersConfig = {
    users: { label: "Users", color: COLORS.users },
  };

  const marginConfig = {
    margin: { label: "Gross Margin %", color: COLORS.margin },
  };

  const tabTips: Record<string, string> = {
    "5year": "Near-term execution phase",
    "10year": "Full market maturity",
    "combined": "Complete trajectory",
  };

  return (
    <TooltipProvider delayDuration={200}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        <Card className="glass border-border/30 mb-6">
          <CardContent className="p-8">
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="h-5 w-5 text-primary" />
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Financial Projections</p>
              <InfoTip text="Growth projections based on current pricing and market assumptions" />
            </div>

            <Tabs defaultValue="combined" className="w-full">
              <TabsList className="mb-6">
                {(["5year", "10year", "combined"] as const).map(tab => (
                  <Tooltip key={tab}>
                    <TooltipTrigger asChild>
                      <TabsTrigger value={tab}>
                        {tab === "5year" ? "5-Year" : tab === "10year" ? "10-Year" : "Combined"}
                      </TabsTrigger>
                    </TooltipTrigger>
                    <TooltipContent className="text-xs">{tabTips[tab]}</TooltipContent>
                  </Tooltip>
                ))}
              </TabsList>

              {["5year", "10year", "combined"].map(tab => {
                const data = tab === "5year" ? fiveYear : tenYear;
                return (
                  <TabsContent key={tab} value={tab} className="space-y-8">
                    {/* Revenue Area Chart */}
                    <div>
                      <p className="text-sm font-heading font-semibold mb-3">
                        Revenue, API Costs & Gross Profit
                        <InfoTip text="Shaded area between revenue and API costs represents gross profit" />
                      </p>
                      <ChartContainer config={revenueConfig} className="h-72">
                        <AreaChart data={data}>
                          <defs>
                            <linearGradient id="gradRevenue" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor={COLORS.revenue} stopOpacity={0.3} />
                              <stop offset="95%" stopColor={COLORS.revenue} stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="gradProfit" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor={COLORS.grossProfit} stopOpacity={0.3} />
                              <stop offset="95%" stopColor={COLORS.grossProfit} stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                          <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={fmt} />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Area type="monotone" dataKey="revenue" stroke={COLORS.revenue} fill="url(#gradRevenue)" strokeWidth={2} name="Revenue" />
                          <Area type="monotone" dataKey="apiCosts" stroke={COLORS.apiCost} fill="transparent" strokeWidth={2} strokeDasharray="5 5" name="API Costs" />
                          <Area type="monotone" dataKey="grossProfit" stroke={COLORS.grossProfit} fill="url(#gradProfit)" strokeWidth={2} name="Gross Profit" />
                        </AreaChart>
                      </ChartContainer>
                    </div>

                    {/* Users Bar Chart + Margin Line Chart */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm font-heading font-semibold mb-3">
                          User Growth
                          <InfoTip text="Projected active users per year based on organic + paid acquisition" />
                        </p>
                        <ChartContainer config={usersConfig} className="h-56">
                          <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                            <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={fmtNum} />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar dataKey="users" fill={COLORS.users} radius={[4, 4, 0, 0]} name="Users" />
                          </BarChart>
                        </ChartContainer>
                      </div>
                      <div>
                        <p className="text-sm font-heading font-semibold mb-3">
                          Gross Margin Trajectory
                          <InfoTip text="Margin improves over time through volume discounts and enterprise adoption" />
                        </p>
                        <ChartContainer config={marginConfig} className="h-56">
                          <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                            <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[30, 75]} tickFormatter={v => `${v}%`} />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Line type="monotone" dataKey="margin" stroke={COLORS.margin} strokeWidth={3} dot={{ fill: COLORS.margin, r: 4 }} name="Gross Margin %" />
                          </LineChart>
                        </ChartContainer>
                      </div>
                    </div>

                    {/* Reference Table */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <ChevronRight className="h-4 w-4 mr-1" /> View Data Table
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl glass">
                        <DialogHeader>
                          <DialogTitle className="font-heading">{tab === "5year" ? "5-Year" : tab === "10year" ? "10-Year" : "Full"} Projection Data</DialogTitle>
                        </DialogHeader>
                        <div className="overflow-x-auto">
                          <Table>
                            <TableHeader>
                              <TableRow className="border-border/30">
                                <TableHead>Year</TableHead>
                                <TableHead>Users</TableHead>
                                <TableHead>Credits</TableHead>
                                <TableHead>Revenue</TableHead>
                                <TableHead>API Costs</TableHead>
                                <TableHead>Gross Profit</TableHead>
                                <TableHead>Margin</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {data.map(d => (
                                <TableRow key={d.year} className="border-border/20">
                                  <TableCell className="font-semibold">{d.year}</TableCell>
                                  <TableCell>{fmtNum(d.users)}</TableCell>
                                  <TableCell>{fmtNum(d.credits)} OC</TableCell>
                                  <TableCell className="text-green-400">{fmt(d.revenue)}</TableCell>
                                  <TableCell className="text-red-400">{fmt(d.apiCosts)}</TableCell>
                                  <TableCell className="text-blue-400">{fmt(d.grossProfit)}</TableCell>
                                  <TableCell className="font-bold gradient-text">{d.margin}%</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TabsContent>
                );
              })}
            </Tabs>

            {/* Assumptions HoverCard */}
            <HoverCard>
              <HoverCardTrigger asChild>
                <p className="text-xs text-muted-foreground mt-4 italic cursor-help underline decoration-dotted underline-offset-4">
                  Assumptions: Margin improvement driven by volume discounts, enterprise tier adoption, and reduced per-unit API costs at scale.
                </p>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 text-xs space-y-2">
                <p className="font-heading font-semibold text-sm">Key Assumptions</p>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• <span className="text-foreground">User growth:</span> 10x Y1→Y2, tapering to 1.4x by Y9→Y10</li>
                  <li>• <span className="text-foreground">API costs:</span> Volume discounts reduce per-unit cost ~8% annually</li>
                  <li>• <span className="text-foreground">Revenue per user:</span> Increases with enterprise tier adoption</li>
                  <li>• <span className="text-foreground">Churn:</span> Assumes 10-15% annual churn, offset by new acquisition</li>
                  <li>• <span className="text-foreground">OpEx:</span> Scales sub-linearly due to automation & shared infra</li>
                  <li>• <span className="text-foreground">Break-even:</span> Month 18-24 at base case growth</li>
                </ul>
              </HoverCardContent>
            </HoverCard>
          </CardContent>
        </Card>
      </motion.div>
    </TooltipProvider>
  );
}

// ─── 3. Scenario Testing ──────────────────────────────────────────────────────

const SCENARIO_TIPS: Record<string, string> = {
  bull: "Accelerated adoption: 1.5x users, 1.3x revenue, +5% margin improvement",
  base: "Current trajectory with no adjustments",
  bear: "Adverse conditions: 0.5x users, 0.6x revenue, -8% margin compression",
};

const TABLE_HEADER_TIPS: Record<string, string> = {
  "Y5 Revenue": "Total revenue at Year 5 driven by user count × avg purchase size",
  "Y5 Users": "Active paying users at Year 5 after accounting for churn",
  "Y5 Margin": "Gross margin percentage at Year 5 after API costs",
  "Y10 Revenue": "Projected revenue at full market maturity",
  "Y10 Users": "User base at scale — driven by market penetration rate",
  "Y10 Margin": "Long-term margin after volume discounts and optimization",
};

export function ScenarioTesting() {
  const scenarios = useMemo(() => {
    return Object.entries(SCENARIO_MULTIPLIERS).map(([key, s]) => {
      const y5 = BASE_PROJECTIONS[4];
      const y10 = BASE_PROJECTIONS[9];
      return {
        key,
        label: s.label,
        color: s.color,
        y5Revenue: y5.revenue * s.revenue,
        y5Users: y5.users * s.users,
        y5Margin: y5.margin + s.marginDelta,
        y10Revenue: y10.revenue * s.revenue,
        y10Users: y10.users * s.users,
        y10Margin: y10.margin + s.marginDelta,
      };
    });
  }, []);

  const comparisonData = [
    {
      metric: "Y5 Revenue",
      bull: scenarios[0].y5Revenue,
      base: scenarios[1].y5Revenue,
      bear: scenarios[2].y5Revenue,
    },
    {
      metric: "Y10 Revenue",
      bull: scenarios[0].y10Revenue,
      base: scenarios[1].y10Revenue,
      bear: scenarios[2].y10Revenue,
    },
  ];

  const chartConfig = {
    bull: { label: "Bull", color: SCENARIO_MULTIPLIERS.bull.color },
    base: { label: "Base", color: SCENARIO_MULTIPLIERS.base.color },
    bear: { label: "Bear", color: SCENARIO_MULTIPLIERS.bear.color },
  };

  return (
    <TooltipProvider delayDuration={200}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card className="glass border-border/30 mb-6">
          <CardContent className="p-8">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="h-5 w-5 text-primary" />
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Scenario Analysis</p>
              <InfoTip text="Compare outcomes under different market conditions" />
            </div>

            <Tabs defaultValue="comparison" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="comparison">Side-by-Side</TabsTrigger>
                {Object.entries(SCENARIO_MULTIPLIERS).map(([key, s]) => (
                  <Tooltip key={key}>
                    <TooltipTrigger asChild>
                      <TabsTrigger value={key}>{s.label}</TabsTrigger>
                    </TooltipTrigger>
                    <TooltipContent className="text-xs max-w-[240px]">{SCENARIO_TIPS[key]}</TooltipContent>
                  </Tooltip>
                ))}
              </TabsList>

              <TabsContent value="comparison">
                <div className="mb-6">
                  <p className="text-sm font-heading font-semibold mb-3">
                    Revenue Comparison — Y5 & Y10
                    <InfoTip text="Side-by-side revenue outcomes help quantify upside vs downside risk" />
                  </p>
                  <ChartContainer config={chartConfig} className="h-72">
                    <BarChart data={comparisonData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                      <XAxis dataKey="metric" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={fmt} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="bull" fill={SCENARIO_MULTIPLIERS.bull.color} radius={[4, 4, 0, 0]} name="Bull" />
                      <Bar dataKey="base" fill={SCENARIO_MULTIPLIERS.base.color} radius={[4, 4, 0, 0]} name="Base" />
                      <Bar dataKey="bear" fill={SCENARIO_MULTIPLIERS.bear.color} radius={[4, 4, 0, 0]} name="Bear" />
                    </BarChart>
                  </ChartContainer>
                </div>

                {/* Summary Table */}
                <Table>
                  <TableHeader>
                    <TableRow className="border-border/30">
                      <TableHead>Metric</TableHead>
                      <TableHead className="text-center">🐂 Bull</TableHead>
                      <TableHead className="text-center">📊 Base</TableHead>
                      <TableHead className="text-center">🐻 Bear</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { label: "Y5 Revenue", values: scenarios.map(s => fmt(s.y5Revenue)) },
                      { label: "Y5 Users", values: scenarios.map(s => fmtNum(s.y5Users)) },
                      { label: "Y5 Margin", values: scenarios.map(s => `${s.y5Margin}%`) },
                      { label: "Y10 Revenue", values: scenarios.map(s => fmt(s.y10Revenue)) },
                      { label: "Y10 Users", values: scenarios.map(s => fmtNum(s.y10Users)) },
                      { label: "Y10 Margin", values: scenarios.map(s => `${s.y10Margin}%`) },
                    ].map(row => (
                      <TableRow key={row.label} className="border-border/20">
                        <TableCell className="text-muted-foreground">
                          {row.label}
                          <InfoTip text={TABLE_HEADER_TIPS[row.label] || row.label} />
                        </TableCell>
                        {row.values.map((v, i) => (
                          <TableCell key={i} className="text-center font-semibold">{v}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>

              {Object.entries(SCENARIO_MULTIPLIERS).map(([key, s]) => {
                const data = BASE_PROJECTIONS.map(p => ({
                  year: p.year,
                  revenue: p.revenue * s.revenue,
                  margin: p.margin + s.marginDelta,
                  users: p.users * s.users,
                }));
                return (
                  <TabsContent key={key} value={key}>
                    <div className="mb-4">
                      <p className="text-sm font-heading font-semibold mb-1">{s.label}</p>
                      <p className="text-xs text-muted-foreground">
                        Users: {s.users}x | Revenue: {s.revenue}x | Margin: {s.marginDelta >= 0 ? "+" : ""}{s.marginDelta}%
                      </p>
                    </div>
                    <ChartContainer config={{ revenue: { label: "Revenue", color: s.color } }} className="h-64">
                      <AreaChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                        <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={fmt} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area type="monotone" dataKey="revenue" stroke={s.color} fill={s.color} fillOpacity={0.15} strokeWidth={2} name="Revenue" />
                      </AreaChart>
                    </ChartContainer>
                  </TabsContent>
                );
              })}
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </TooltipProvider>
  );
}

// ─── 4. Stress Test ───────────────────────────────────────────────────────────

const DEFAULTS = { apiIncrease: 0, churnRate: 10, avgPurchase: 75, growthRate: 1 };

const SLIDER_TIPS: Record<string, string> = {
  "API Cost Increase": "What if providers raise API prices? Models impact on margins.",
  "User Churn Rate": "Annual percentage of users who stop purchasing. Industry avg: 10-15%.",
  "Avg Credit Purchase": "Average transaction size. Higher = better unit economics.",
  "Market Growth Rate": "Overall market expansion multiplier. 1x = organic only.",
};

const GAUGE_TIPS: Record<string, string> = {
  "Y5 Revenue": "Projected Year 5 revenue under stress conditions. Green ≥ $30M.",
  "Gross Margin": "Net margin after stressed API costs. Green ≥ 40%.",
  "Break-even": "Months to profitability. Green ≤ 24 months.",
};

export function StressTest() {
  const [apiIncrease, setApiIncrease] = useState([DEFAULTS.apiIncrease]);
  const [churnRate, setChurnRate] = useState([DEFAULTS.churnRate]);
  const [avgPurchase, setAvgPurchase] = useState([DEFAULTS.avgPurchase]);
  const [growthRate, setGrowthRate] = useState([DEFAULTS.growthRate]);

  const results = useMemo(() => {
    const base = BASE_PROJECTIONS[4]; // Y5
    const costMult = 1 + apiIncrease[0] / 100;
    const retentionRate = 1 - churnRate[0] / 100;
    const purchaseMult = avgPurchase[0] / 75;
    const growth = growthRate[0];

    const adjustedUsers = base.users * growth * Math.pow(retentionRate, 5);
    const adjustedRevenue = base.revenue * growth * purchaseMult * Math.pow(retentionRate, 5);
    const adjustedCosts = base.apiCosts * costMult * growth;
    const adjustedProfit = adjustedRevenue - adjustedCosts;
    const adjustedMargin = adjustedRevenue > 0 ? (adjustedProfit / adjustedRevenue) * 100 : 0;

    // Break-even: rough estimate based on fixed costs $500K/year
    const fixedCosts = 500000;
    const contributionPerUser = adjustedRevenue > 0 ? adjustedProfit / adjustedUsers : 0;
    const breakEvenUsers = contributionPerUser > 0 ? Math.ceil(fixedCosts / contributionPerUser) : Infinity;
    const breakEvenMonths = breakEvenUsers < adjustedUsers ? Math.ceil((breakEvenUsers / adjustedUsers) * 60) : 60;

    return { adjustedRevenue, adjustedMargin, adjustedProfit, breakEvenMonths };
  }, [apiIncrease, churnRate, avgPurchase, growthRate]);

  const reset = () => {
    setApiIncrease([DEFAULTS.apiIncrease]);
    setChurnRate([DEFAULTS.churnRate]);
    setAvgPurchase([DEFAULTS.avgPurchase]);
    setGrowthRate([DEFAULTS.growthRate]);
  };

  const getZoneColor = (value: number, green: number, yellow: number) => {
    if (value >= green) return "bg-green-500";
    if (value >= yellow) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getZoneLabel = (value: number, green: number, yellow: number) => {
    if (value >= green) return { text: "Healthy", cls: "text-green-400" };
    if (value >= yellow) return { text: "Caution", cls: "text-yellow-400" };
    return { text: "Critical", cls: "text-red-400" };
  };

  const gauges = [
    {
      label: "Y5 Revenue",
      value: results.adjustedRevenue,
      display: fmt(results.adjustedRevenue),
      pct: Math.min(100, (results.adjustedRevenue / 60000000) * 100),
      color: getZoneColor(results.adjustedRevenue, 30000000, 15000000),
      zone: getZoneLabel(results.adjustedRevenue, 30000000, 15000000),
    },
    {
      label: "Gross Margin",
      value: results.adjustedMargin,
      display: `${results.adjustedMargin.toFixed(1)}%`,
      pct: Math.min(100, Math.max(0, results.adjustedMargin)),
      color: getZoneColor(results.adjustedMargin, 40, 20),
      zone: getZoneLabel(results.adjustedMargin, 40, 20),
    },
    {
      label: "Break-even",
      value: results.breakEvenMonths,
      display: `${results.breakEvenMonths} mo`,
      pct: Math.min(100, (results.breakEvenMonths / 60) * 100),
      color: results.breakEvenMonths <= 24 ? "bg-green-500" : results.breakEvenMonths <= 42 ? "bg-yellow-500" : "bg-red-500",
      zone: results.breakEvenMonths <= 24
        ? { text: "Healthy", cls: "text-green-400" }
        : results.breakEvenMonths <= 42
        ? { text: "Caution", cls: "text-yellow-400" }
        : { text: "Critical", cls: "text-red-400" },
    },
  ];

  const sliders = [
    { label: "API Cost Increase", value: apiIncrease, set: setApiIncrease, min: 0, max: 100, step: 5, display: `+${apiIncrease[0]}%`, suffix: "%" },
    { label: "User Churn Rate", value: churnRate, set: setChurnRate, min: 5, max: 40, step: 1, display: `${churnRate[0]}%`, suffix: "%" },
    { label: "Avg Credit Purchase", value: avgPurchase, set: setAvgPurchase, min: 25, max: 200, step: 5, display: `$${avgPurchase[0]}`, suffix: "" },
    { label: "Market Growth Rate", value: growthRate, set: setGrowthRate, min: 0.5, max: 3, step: 0.1, display: `${growthRate[0].toFixed(1)}x`, suffix: "" },
  ];

  return (
    <TooltipProvider delayDuration={200}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
        <Card className="glass border-border/30 mb-6">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <FlaskConical className="h-5 w-5 text-primary" />
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Stress Testing</p>
                <InfoTip text="Drag sliders to model worst-case scenarios and find breaking points" />
              </div>
              <Button variant="ghost" size="sm" onClick={reset}>
                <RotateCcw className="h-4 w-4 mr-1" /> Reset
              </Button>
            </div>

            {/* Sliders */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {sliders.map(s => (
                <div key={s.label} className="p-4 rounded-lg bg-muted/20 border border-border/20">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-heading font-semibold">
                      {s.label}
                      <InfoTip text={SLIDER_TIPS[s.label]} />
                    </p>
                    <span className="text-sm font-mono font-bold text-primary">{s.display}</span>
                  </div>
                  <Slider value={s.value} onValueChange={s.set} min={s.min} max={s.max} step={s.step} />
                </div>
              ))}
            </div>

            {/* Gauge Results */}
            <div className="grid grid-cols-3 gap-6">
              {gauges.map(g => (
                <div key={g.label} className="text-center">
                  <p className="text-xs text-muted-foreground mb-2">
                    {g.label}
                    <InfoTip text={GAUGE_TIPS[g.label]} />
                  </p>
                  <p className="text-2xl font-heading font-bold mb-3">{g.display}</p>
                  <div className="w-full h-3 rounded-full bg-muted/30 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${g.color}`}
                      style={{ width: `${g.pct}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] mt-1">
                    <span className="text-red-400">Critical</span>
                    <span className="text-yellow-400">Caution</span>
                    <span className="text-green-400">Healthy</span>
                  </div>
                  <p className={`text-xs font-semibold mt-1 ${g.zone.cls}`}>{g.zone.text}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </TooltipProvider>
  );
}
