import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Zap, BarChart3, Handshake, Lock, CircleDot, Copy, Check, AlertTriangle,
  Shield, Target, Lightbulb, DollarSign, Users, TrendingUp, Wallet,
  CreditCard, Activity, RotateCcw,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RPieChart, Pie, Cell, Legend } from "recharts";
import GlassCard from "@/components/redesign/GlassCard";
import SectionHeading from "@/components/redesign/SectionHeading";
import StatusBadge from "@/components/redesign/StatusBadge";
import PriorityBadge from "@/components/redesign/PriorityBadge";
import AppHeader from "@/components/redesign/AppHeader";
import AppFooter from "@/components/redesign/AppFooter";

// ========== TAB BAR ==========
const TabBar = ({ tabs, active, onSelect }: { tabs: string[]; active: string; onSelect: (t: string) => void }) => (
  <div className="flex gap-1 p-1 rounded-[14px] bg-muted mb-8">
    {tabs.map(tab => (
      <button
        key={tab}
        onClick={() => onSelect(tab)}
        className={`px-5 py-2.5 rounded-[10px] text-sm font-semibold transition-all cursor-pointer ${
          active === tab ? "bg-card text-primary shadow-[var(--shadow-soft)]" : "text-muted-foreground bg-transparent"
        }`}
      >
        {tab}
      </button>
    ))}
  </div>
);

// ========== PIPELINE TAB ==========
const PipelineTab = () => {
  const phases = [
    { num: 1, title: "API Direct", status: "In Progress", icon: Zap, desc: "Use provider APIs directly. Build wallet, route usage, pay wholesale.", tasks: ["Integrate OpenAI / Anthropic / Google APIs", "Build OmniCredits™ wallet", "Route usage & track metrics"] },
    { num: 2, title: "Build Leverage", status: "Not Started", icon: BarChart3, desc: "Prove demand with real numbers. Compile traction data.", tasks: ["Track # of users & credits sold", "Measure usage volume by provider", "Identify demographic insights"] },
    { num: 3, title: "Approach Partners", status: "Not Started", icon: Handshake, desc: "Formalize relationships. Negotiate terms from a position of strength.", tasks: ["Outreach to mid-tier platforms first", "Share traction metrics", "Negotiate revenue share / co-branding"] },
  ];

  const companies: Record<string, Array<{ name: string; cat: string; priority: string; status: string }>> = {
    "Tier 1 — First Targets": [
      { name: "Lovable", cat: "Code", priority: "High", status: "Not Started" },
      { name: "Bolt", cat: "Code", priority: "High", status: "Not Started" },
      { name: "Cursor", cat: "Code", priority: "High", status: "Not Started" },
      { name: "Replit", cat: "Code", priority: "Medium", status: "Not Started" },
      { name: "Runway", cat: "Video", priority: "High", status: "Not Started" },
      { name: "ElevenLabs", cat: "Audio", priority: "High", status: "Not Started" },
    ],
    "Tier 2 — After Traction": [
      { name: "Anthropic", cat: "Text", priority: "Medium", status: "Not Started" },
      { name: "Mistral", cat: "Text", priority: "Medium", status: "Not Started" },
      { name: "Stability AI", cat: "Image", priority: "Medium", status: "Not Started" },
      { name: "Midjourney", cat: "Image", priority: "Low", status: "Not Started" },
    ],
    "Tier 3 — At Scale": [
      { name: "OpenAI", cat: "Text", priority: "Low", status: "Not Started" },
      { name: "Google (Gemini)", cat: "Text", priority: "Low", status: "Not Started" },
    ],
  };

  const curveStages = [
    { n: 0, label: "Today", sub: "You need them — use APIs" },
    { n: 1, label: "Early Traction", sub: "Small partners say yes" },
    { n: 2, label: "Growth", sub: "Bigger players listen" },
    { n: 3, label: "Scale", sub: "You become distribution" },
  ];

  const weeks = [
    { w: 1, tasks: ["Build OmniCredits MVP", "Integrate 1–2 APIs"] },
    { w: 2, tasks: ["Sell first credits", "Track usage metrics"] },
    { w: 3, tasks: ["Add 1–2 more providers", "Begin routing logic"] },
    { w: 4, tasks: ["Compile metrics", "Start outreach to smaller players"] },
  ];

  return (
    <div>
      <SectionHeading sub="Three-phase strategy for partner acquisition">Partnership Pipeline</SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
        {phases.map(p => (
          <GlassCard key={p.num} hover={false} className={`border-l-[3px] ${p.status === "In Progress" ? "border-l-info" : "border-l-border"}`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-[10px] accent-soft flex items-center justify-center"><p.icon size={18} className="text-primary" /></div>
                <span className="font-bold text-[15px] text-foreground">Phase {p.num}: {p.title}</span>
              </div>
              <StatusBadge status={p.status} />
            </div>
            <p className="text-[13px] text-muted-foreground mb-3.5 leading-relaxed">{p.desc}</p>
            <div className="flex flex-col gap-2">
              {p.tasks.map(task => (
                <div key={task} className="flex items-center gap-2">
                  <CircleDot size={14} className={p.status === "In Progress" ? "text-info" : "text-muted-foreground"} />
                  <span className="text-[13px] text-muted-foreground">{task}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Target Companies */}
      <SectionHeading sub="Prioritized by approachability and strategic value">Target Companies</SectionHeading>
      {Object.entries(companies).map(([tier, list]) => (
        <div key={tier} className="mb-8">
          <p className="text-sm font-semibold text-muted-foreground mb-3">{tier}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {list.map(c => (
              <GlassCard key={c.name} hover={false} className="flex items-center justify-between p-4">
                <div>
                  <p className="font-medium text-foreground">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.cat}</p>
                </div>
                <div className="flex items-center gap-2">
                  <PriorityBadge priority={c.priority} />
                  <StatusBadge status={c.status} />
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      ))}

      {/* Negotiation Power Curve */}
      <SectionHeading>Negotiation Power Curve</SectionHeading>
      <GlassCard hover={false} className="mb-12 p-6">
        <div className="flex items-center justify-between relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2" style={{ background: "var(--accent-gradient)" }} />
          {curveStages.map((s, i) => (
            <div key={s.n} className="relative z-10 flex flex-col items-center text-center w-1/4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${i === 0 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{s.n}</div>
              <p className="text-sm font-semibold mt-2">{s.label}</p>
              <p className="text-xs text-muted-foreground mt-1 hidden md:block">{s.sub}</p>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* 30-Day Plan */}
      <SectionHeading>30-Day Tactical Plan</SectionHeading>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {weeks.map(w => (
          <GlassCard key={w.w} hover={false}>
            <p className="font-bold text-foreground mb-3">Week {w.w}</p>
            <div className="space-y-2">
              {w.tasks.map(t => (
                <div key={t} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CircleDot size={14} className="text-muted-foreground mt-0.5 shrink-0" /> {t}
                </div>
              ))}
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

// ========== PITCH DECK TAB ==========
const PitchDeckTab = () => {
  const [costMult, setCostMult] = useState(1.0);
  const [projView, setProjView] = useState("10-Year");
  const [scenarioView, setScenarioView] = useState("Side-by-Side");
  const [stress, setStress] = useState({ apiCost: 0, churn: 10, avgPurchase: 75, growth: 1.0 });

  const blendedCost = (0.107 * costMult).toFixed(3);
  const blendedSell = 0.190;
  const blendedMargin = (((blendedSell - parseFloat(blendedCost)) / blendedSell) * 100).toFixed(1);

  const revenueData = [
    { yr: "Y1", revenue: 2.1, cost: 1.2, profit: 0.9 },
    { yr: "Y2", revenue: 8.5, cost: 4.5, profit: 4.0 },
    { yr: "Y3", revenue: 28, cost: 13, profit: 15 },
    { yr: "Y4", revenue: 75, cost: 32, profit: 43 },
    { yr: "Y5", revenue: 150, cost: 58, profit: 92 },
    { yr: "Y6", revenue: 310, cost: 110, profit: 200 },
    { yr: "Y7", revenue: 580, cost: 190, profit: 390 },
    { yr: "Y8", revenue: 950, cost: 290, profit: 660 },
    { yr: "Y9", revenue: 1500, cost: 420, profit: 1080 },
    { yr: "Y10", revenue: 2500, cost: 650, profit: 1850 },
  ];

  const userGrowthData = [
    { yr: "Y1", users: 0.005 }, { yr: "Y2", users: 0.02 }, { yr: "Y3", users: 0.08 },
    { yr: "Y4", users: 0.2 }, { yr: "Y5", users: 0.5 }, { yr: "Y6", users: 1.0 },
    { yr: "Y7", users: 2.0 }, { yr: "Y8", users: 4.0 }, { yr: "Y9", users: 7.0 }, { yr: "Y10", users: 10.0 },
  ];

  const marginData = [
    { yr: "Y1", margin: 33 }, { yr: "Y2", margin: 38 }, { yr: "Y3", margin: 42 },
    { yr: "Y4", margin: 48 }, { yr: "Y5", margin: 55 }, { yr: "Y6", margin: 58 },
    { yr: "Y7", margin: 62 }, { yr: "Y8", margin: 66 }, { yr: "Y9", margin: 70 }, { yr: "Y10", margin: 75 },
  ];

  const pieData = [
    { name: "API Cost", value: 45, color: "#EF4444" },
    { name: "OpEx", value: 25, color: "#F59E0B" },
    { name: "Net Margin", value: 30, color: "#10B981" },
  ];

  const costSellData = [
    { tier: "$25", cost: 10.7, sell: 25 },
    { tier: "$50", cost: 21.4, sell: 50 },
    { tier: "$100", cost: 42.8, sell: 100 },
    { tier: "$200", cost: 85.6, sell: 200 },
  ];

  const scenarioData = [
    { metric: "Y5 Revenue", bull: "$48.8M", base: "$37.5M", bear: "$22.5M" },
    { metric: "Y5 Users", bull: "750K", base: "500K", bear: "250K" },
    { metric: "Y5 Margin", bull: "65%", base: "60%", bear: "52%" },
    { metric: "Y10 Revenue", bull: "$3.3B", base: "$2.5B", bear: "$1.5B" },
    { metric: "Y10 Users", bull: "15.0M", base: "10.0M", bear: "5.0M" },
    { metric: "Y10 Margin", bull: "75%", base: "70%", bear: "62%" },
  ];

  const scenarioBarData = [
    { name: "Y5 Revenue", bull: 48.8, base: 37.5, bear: 22.5 },
    { name: "Y10 Revenue", bull: 3300, base: 2500, bear: 1500 },
  ];

  const stressRevenue = ((37.5 * (1 - stress.churn / 100) * (stress.avgPurchase / 75) * stress.growth) * (1 - stress.apiCost / 100)).toFixed(1);
  const stressMargin = ((60 - stress.apiCost * 0.5 - stress.churn * 0.3) * (stress.avgPurchase / 75)).toFixed(1);
  const stressBreakeven = Math.max(1, Math.round(5 + stress.apiCost * 0.1 + stress.churn * 0.15 - (stress.avgPurchase - 75) * 0.02));
  const healthLevel = (val: number, thresholds: [number, number]) => val >= thresholds[1] ? "Healthy" : val >= thresholds[0] ? "Caution" : "Critical";
  const healthColor = (level: string) => level === "Healthy" ? "text-success" : level === "Caution" ? "text-warning" : "text-danger";
  const healthBg = (level: string) => level === "Healthy" ? "bg-success/10" : level === "Caution" ? "bg-warning/10" : "bg-danger/10";
  const healthDot = (level: string) => level === "Healthy" ? "bg-success" : level === "Caution" ? "bg-warning" : "bg-danger";

  const swot = [
    { title: "Strengths", color: "#10B981", icon: Shield, items: ["First-mover in prepaid AI credits", "Simplified UX for non-technical users", "Multi-provider routing architecture", "Prepaid cash flow model"] },
    { title: "Weaknesses", color: "#F59E0B", icon: AlertTriangle, items: ["No established brand yet", "Dependent on third-party APIs", "Unproven at scale", "Limited traction data"] },
    { title: "Opportunities", color: "#3B82F6", icon: Lightbulb, items: ["Untapped gift & family market", "Enterprise bulk credit purchases", "Education sector adoption", "International expansion"] },
    { title: "Threats", color: "#EF4444", icon: Target, items: ["Providers launching own gift cards", "API pricing changes eroding margins", "Competitors copying the model", "Regulatory changes"] },
  ];

  const chartTooltipStyle = { background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 10, fontSize: 12 };

  const SliderInput = ({ label, value, min, max, step, unit, onChange }: { label: string; value: number; min: number; max: number; step: number; unit: string; onChange: (v: number) => void }) => (
    <div className="flex-1 min-w-[200px]">
      <div className="flex justify-between mb-1.5">
        <span className="text-[13px] text-muted-foreground">{label}</span>
        <span className="text-sm font-bold text-primary">{unit === "%" ? `${value > 0 ? "+" : ""}${value}%` : unit === "x" ? `${value}x` : `$${value}`}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(parseFloat(e.target.value))} className="w-full accent-primary h-1.5 rounded" />
    </div>
  );

  return (
    <div>
      <SectionHeading>Pitch Deck</SectionHeading>

      {[
        { label: "OPENING", text: "We've built a prepaid AI credit system that brings new users into the ecosystem — especially non-technical consumers and gift buyers." },
        { label: "PROBLEM", text: "Right now, most AI platforms only monetize users willing to subscribe or learn complex pricing models. Millions of potential users are left out." },
        { label: "SOLUTION", text: "OmniCredits™ simplifies AI access into a single credit system and routes usage across tools — driving incremental usage you wouldn't otherwise capture." },
      ].map(card => (
        <GlassCard key={card.label} hover={false} className="mb-4 py-7 px-8">
          <p className="text-[11px] font-bold tracking-[2px] text-primary uppercase mb-2.5">{card.label}</p>
          <p className="text-lg font-medium text-foreground leading-relaxed">{card.text}</p>
        </GlassCard>
      ))}

      {/* SWOT */}
      <div className="mt-12">
        <SectionHeading>SWOT Analysis</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {swot.map(s => (
            <GlassCard key={s.title} hover={false} className="border-t-[3px]" style={{ borderTopColor: s.color }}>
              <div className="flex items-center gap-2 mb-3.5">
                <s.icon size={18} style={{ color: s.color }} />
                <span className="font-bold text-base" style={{ color: s.color }}>{s.title}</span>
              </div>
              {s.items.map(item => (
                <div key={item} className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: s.color }} />
                  <span className="text-[13px] text-muted-foreground">{item}</span>
                </div>
              ))}
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Traction */}
      <div className="mt-12">
        <SectionHeading>Traction</SectionHeading>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Credits Sold", sub: "OmniCredits™", icon: CreditCard },
            { label: "Users Onboarded", sub: "unique users", icon: Users },
            { label: "Usage Volume", sub: "API calls routed", icon: Activity },
            { label: "Revenue", sub: "prepaid credits", icon: DollarSign },
          ].map(m => (
            <GlassCard key={m.label} hover={false} className="text-center py-7 px-5">
              <m.icon size={24} className="mx-auto mb-2 text-primary" />
              <p className="text-[28px] font-extrabold text-foreground tracking-tight">[X]</p>
              <p className="text-sm font-semibold text-foreground mt-1">{m.label}</p>
              <p className="text-xs text-muted-foreground">{m.sub}</p>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Unit Economics */}
      <div className="mt-12">
        <SectionHeading sub="Interactive financial model">Unit Economics</SectionHeading>
        <GlassCard hover={false} className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold text-sm text-foreground">API Cost Multiplier</span>
            <span className="font-bold text-lg text-primary">{costMult.toFixed(1)}x</span>
          </div>
          <input type="range" min={0.5} max={2.0} step={0.1} value={costMult} onChange={e => setCostMult(parseFloat(e.target.value))} className="w-full accent-primary" />
          <div className="flex justify-between mt-1">
            <span className="text-[11px] text-muted-foreground">0.5x (Best)</span>
            <span className="text-[11px] text-muted-foreground">2.0x (Worst)</span>
          </div>
        </GlassCard>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: "Blended Cost/OC", value: `$${blendedCost}`, cls: "text-danger" },
            { label: "Blended Sell/OC", value: `$${blendedSell.toFixed(3)}`, cls: "text-success" },
            { label: "Blended Margin", value: `${blendedMargin}%`, cls: parseFloat(blendedMargin) > 30 ? "text-success" : "text-warning" },
          ].map(m => (
            <GlassCard key={m.label} hover={false} className="text-center p-5">
              <p className="text-xs text-muted-foreground mb-1">{m.label}</p>
              <p className={`text-[28px] font-extrabold tracking-tight ${m.cls}`}>{m.value}</p>
            </GlassCard>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          <GlassCard hover={false}>
            <p className="text-sm font-semibold text-foreground mb-3">Revenue Breakdown</p>
            <ResponsiveContainer width="100%" height={200}>
              <RPieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={3}>
                  {pieData.map(entry => <Cell key={entry.name} fill={entry.color} />)}
                </Pie>
                <Legend formatter={v => <span className="text-xs text-muted-foreground">{v}</span>} />
                <Tooltip contentStyle={chartTooltipStyle} />
              </RPieChart>
            </ResponsiveContainer>
          </GlassCard>
          <GlassCard hover={false}>
            <p className="text-sm font-semibold text-foreground mb-3">Cost vs Sell per Tier</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={costSellData} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="tier" tick={{ fontSize: 11 }} className="fill-muted-foreground" />
                <YAxis tick={{ fontSize: 11 }} className="fill-muted-foreground" />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Bar dataKey="cost" fill="#EF4444" name="Cost" radius={[4, 4, 0, 0]} />
                <Bar dataKey="sell" fill="#10B981" name="Sell" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </GlassCard>
        </div>
      </div>

      {/* Financial Projections */}
      <div className="mt-12">
        <SectionHeading sub="Revenue, users, and margin trajectories">Financial Projections</SectionHeading>
        <TabBar tabs={["5-Year", "10-Year", "Combined"]} active={projView} onSelect={setProjView} />
        <GlassCard hover={false} className="mb-6">
          <p className="text-sm font-semibold text-foreground mb-4">Revenue, API Costs & Gross Profit ($M)</p>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={projView === "5-Year" ? revenueData.slice(0, 5) : revenueData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="yr" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={chartTooltipStyle} />
              <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2.5} dot={{ r: 4 }} name="Revenue" />
              <Line type="monotone" dataKey="cost" stroke="#EF4444" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3 }} name="API Cost" />
              <Line type="monotone" dataKey="profit" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 3 }} name="Gross Profit" />
              <Legend />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          <GlassCard hover={false}>
            <p className="text-sm font-semibold text-foreground mb-3">User Growth (M)</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={projView === "5-Year" ? userGrowthData.slice(0, 5) : userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="yr" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Bar dataKey="users" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Users (M)" />
              </BarChart>
            </ResponsiveContainer>
          </GlassCard>
          <GlassCard hover={false}>
            <p className="text-sm font-semibold text-foreground mb-3">Gross Margin Trajectory (%)</p>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={projView === "5-Year" ? marginData.slice(0, 5) : marginData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="yr" tick={{ fontSize: 11 }} />
                <YAxis domain={[25, 80]} tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Line type="monotone" dataKey="margin" stroke="#F59E0B" strokeWidth={2.5} dot={{ r: 4, fill: "#F59E0B" }} name="Margin %" />
              </LineChart>
            </ResponsiveContainer>
          </GlassCard>
        </div>
      </div>

      {/* Scenario Analysis */}
      <div className="mt-12">
        <SectionHeading>Scenario Analysis</SectionHeading>
        <TabBar tabs={["Side-by-Side", "Bull Case", "Base Case", "Bear Case"]} active={scenarioView} onSelect={setScenarioView} />
        <GlassCard hover={false} className="mb-6">
          <p className="text-sm font-semibold text-foreground mb-4">Revenue Comparison — Y5 & Y10</p>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={scenarioBarData} barGap={8}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={chartTooltipStyle} />
              {(scenarioView === "Side-by-Side" || scenarioView === "Bull Case") && <Bar dataKey="bull" fill="#1A1A2E" name="Bull" radius={[4, 4, 0, 0]} />}
              {(scenarioView === "Side-by-Side" || scenarioView === "Base Case") && <Bar dataKey="base" fill="#22D3EE" name="Base" radius={[4, 4, 0, 0]} />}
              {(scenarioView === "Side-by-Side" || scenarioView === "Bear Case") && <Bar dataKey="bear" fill="#F87171" name="Bear" radius={[4, 4, 0, 0]} />}
              <Legend />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard hover={false} className="p-0 overflow-hidden mb-6">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid hsl(var(--border))" }}>
                {["Metric", "Bull", "Base", "Bear"].map(h => (
                  <th key={h} className="px-5 py-3.5 text-left text-[13px] font-semibold text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {scenarioData.map((row, i) => (
                <tr key={row.metric} style={{ borderBottom: i < scenarioData.length - 1 ? "1px solid hsl(var(--border))" : "none" }}>
                  <td className="px-5 py-3 font-medium text-foreground">{row.metric}</td>
                  <td className="px-5 py-3 font-semibold text-foreground">{row.bull}</td>
                  <td className="px-5 py-3 font-semibold text-foreground">{row.base}</td>
                  <td className="px-5 py-3 font-semibold text-foreground">{row.bear}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </GlassCard>
      </div>

      {/* Stress Testing */}
      <div className="mt-12">
        <SectionHeading sub="Adjust variables to test business resilience">Stress Testing</SectionHeading>
        <GlassCard hover={false} className="mb-6">
          <div className="flex justify-end mb-4">
            <button onClick={() => setStress({ apiCost: 0, churn: 10, avgPurchase: 75, growth: 1.0 })} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs text-muted-foreground cursor-pointer" style={{ borderColor: "hsl(var(--border))" }}>
              <RotateCcw size={12} /> Reset
            </button>
          </div>
          <div className="flex flex-wrap gap-6 mb-8">
            <SliderInput label="API Cost Increase" value={stress.apiCost} min={0} max={50} step={5} unit="%" onChange={v => setStress(s => ({ ...s, apiCost: v }))} />
            <SliderInput label="User Churn Rate" value={stress.churn} min={0} max={30} step={1} unit="%" onChange={v => setStress(s => ({ ...s, churn: v }))} />
            <SliderInput label="Avg Credit Purchase" value={stress.avgPurchase} min={25} max={200} step={5} unit="$" onChange={v => setStress(s => ({ ...s, avgPurchase: v }))} />
            <SliderInput label="Market Growth Rate" value={stress.growth} min={0.5} max={2.0} step={0.1} unit="x" onChange={v => setStress(s => ({ ...s, growth: v }))} />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Y5 Revenue", value: `$${stressRevenue}M`, health: healthLevel(parseFloat(stressRevenue), [20, 30]) },
              { label: "Gross Margin", value: `${stressMargin}%`, health: healthLevel(parseFloat(stressMargin), [30, 45]) },
              { label: "Break-even", value: `${stressBreakeven} mo`, health: healthLevel(12 - stressBreakeven, [0, 5]) },
            ].map(m => (
              <div key={m.label} className="text-center">
                <p className="text-[28px] font-extrabold text-foreground">{m.value}</p>
                <p className="text-[13px] text-muted-foreground mb-2">{m.label}</p>
                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${healthColor(m.health)} ${healthBg(m.health)}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${healthDot(m.health)}`} />
                  {m.health}
                </span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Partnership Angles */}
      <div className="mt-12">
        <SectionHeading>Partnership Angles</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {[
            { icon: DollarSign, title: "Incremental Revenue", desc: "We bring prepaid users who wouldn't subscribe directly. New revenue you're not capturing today." },
            { icon: Users, title: "New Demographics", desc: "Non-technical users, kids, gift buyers, families — audiences you don't currently reach." },
            { icon: TrendingUp, title: "Usage Expansion", desc: "Users experiment across tools instead of committing to one, increasing total spend." },
            { icon: Wallet, title: "Prepaid Cash Flow", desc: "We sell credits upfront. You get paid as usage happens. Predictable, low-risk revenue." },
          ].map(a => (
            <GlassCard key={a.title} hover={false}>
              <a.icon size={22} className="text-primary mb-3" />
              <p className="font-bold text-[15px] text-foreground mb-1.5">{a.title}</p>
              <p className="text-[13px] text-muted-foreground leading-relaxed">{a.desc}</p>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* What We Offer */}
      <div className="mt-12">
        <SectionHeading>What We Offer</SectionHeading>
        <GlassCard hover={false} className="mb-6">
          {[
            { opt: "A", title: "Revenue Share", desc: "We keep margin on credits. You get API usage revenue at standard rates.", color: "#EF4444" },
            { opt: "B", title: "Featured Placement", desc: "'Powered by [Provider]' sections. Highlight your tool inside our platform.", color: "#F59E0B" },
            { opt: "C", title: "Co-branded Credits", desc: "'Use OmniCredits™ with [Provider]' — after traction is proven.", color: "hsl(var(--primary))" },
          ].map((o, i) => (
            <div key={o.opt} className="flex gap-4 py-4.5" style={{ borderBottom: i < 2 ? "1px solid hsl(var(--border))" : "none" }}>
              <span className="text-[13px] font-bold min-w-[64px]" style={{ color: o.color }}>Option {o.opt}</span>
              <div>
                <p className="font-bold text-[15px] text-foreground">{o.title}</p>
                <p className="text-[13px] text-muted-foreground mt-0.5">{o.desc}</p>
              </div>
            </div>
          ))}
        </GlassCard>
      </div>

      {/* The Ask */}
      <GlassCard hover={false} className="text-center py-10 px-8 accent-soft border-2 border-primary/10 mt-8">
        <p className="text-[11px] font-bold tracking-[2px] text-primary uppercase mb-3">THE ASK</p>
        <p className="text-[22px] font-semibold text-foreground leading-snug">
          "We'd like to formalize access and explore co-marketing + deeper integration."
        </p>
      </GlassCard>
    </div>
  );
};

// ========== OUTREACH TAB ==========
const OutreachTab = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(id);
    toast({ title: "Copied to clipboard" });
    setTimeout(() => setCopied(null), 2000);
  };

  const templates = [
    {
      id: "mid-tier",
      title: "Cold Outreach — Mid-Tier Platform",
      subject: "Partnership: New prepaid AI credit channel for [Company Name]",
      body: `Hi [Name],

I'm [Your Name], founder of OmniCredits™ — a prepaid AI credit platform that brings new users into the AI ecosystem, especially non-technical consumers and gift buyers.

We're reaching out because [Company Name] is exactly the kind of innovative platform our users love. Here's what we bring:

• Incremental revenue — prepaid users who wouldn't subscribe directly
• New demographics — families, students, gift buyers you don't currently reach
• Zero risk — we sell credits upfront, you get paid as usage happens

We've sold [X] OmniCredits™ to [X] users in [timeframe], and usage is growing [X]% week over week.

Would you be open to a 15-minute call to explore a lightweight integration?

Best,
[Your Name]
[Your Title]
OmniCredits™`,
    },
    {
      id: "major",
      title: "Cold Outreach — Major Player (OpenAI/Anthropic)",
      subject: "Incremental prepaid revenue channel — [X] users, $[X] in credits sold",
      body: `Hi [Name],

I'm [Your Name] from OmniCredits™. We've built a prepaid AI credit system that's driving incremental usage across AI platforms — specifically from consumer segments that don't subscribe directly.

In [timeframe], we've:
• Onboarded [X] users (primarily non-technical consumers, gift buyers, students)
• Sold $[X] in prepaid credits
• Routed [X] API calls to [providers]

We're already using your API and paying at standard rates. We'd like to explore:
1. Formalized API access or volume pricing
2. Co-marketing opportunities
3. Featured placement within our platform

Would you be open to a brief call this week?

Best,
[Your Name]
[Your Title]
OmniCredits™`,
    },
    {
      id: "followup",
      title: "Follow-Up Email (After Initial Contact)",
      subject: "Re: OmniCredits™ partnership — updated traction numbers",
      body: `Hi [Name],

Following up on our earlier conversation. Wanted to share some updated metrics:

• Credits sold: [X] OmniCredits™ ($[X] revenue)
• Active users: [X] (up [X]% since we last spoke)
• Top use cases: [list top 2-3]
• Your platform's share of usage: [X]%

We're seeing strong organic demand for [Company Name] through our platform. Users who discover your tools through OmniCredits™ are [X]% more likely to continue using them.

Ready to take the next step whenever you are. Happy to jump on a call this week.

Best,
[Your Name]
OmniCredits™`,
    },
  ];

  const donts = [
    '"We want to unify AI" — too abstract, no one cares',
    '"We\'re building an exchange" — sounds like crypto',
    '"This benefits everyone" — they care about THEIR revenue',
    '"We\'re a marketplace" — implies middleman, triggers defensiveness',
    '"We just need API access" — sounds like you\'re asking for a favor',
  ];

  return (
    <div>
      <SectionHeading sub="Ready-to-use email templates with one-click copy">Email Templates</SectionHeading>
      {templates.map(tmpl => (
        <GlassCard key={tmpl.id} hover={false} className="mb-6">
          <div className="flex justify-between items-start mb-4">
            <p className="font-bold text-[17px] text-foreground">{tmpl.title}</p>
            <button
              onClick={() => copyToClipboard(`Subject: ${tmpl.subject}\n\n${tmpl.body}`, tmpl.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-[10px] border text-[13px] font-semibold cursor-pointer transition-all ${
                copied === tmpl.id ? "bg-success text-white border-success" : "text-foreground"
              }`}
              style={{ borderColor: copied === tmpl.id ? undefined : "hsl(var(--border))" }}
            >
              {copied === tmpl.id ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy</>}
            </button>
          </div>
          <div className="mb-3">
            <span className="text-xs font-semibold text-muted-foreground">Subject:</span>
            <p className="text-sm font-semibold text-foreground mt-0.5">{tmpl.subject}</p>
          </div>
          <div>
            <span className="text-xs font-semibold text-muted-foreground">Body:</span>
            <pre className="mt-2 p-5 rounded-xl bg-muted text-[13px] text-muted-foreground leading-relaxed whitespace-pre-wrap font-sans">{tmpl.body}</pre>
          </div>
        </GlassCard>
      ))}

      {/* What NOT to Say */}
      <GlassCard hover={false} className="border-destructive/50 bg-destructive/5">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle size={18} className="text-destructive" />
          <p className="font-bold text-base text-destructive">What NOT to Say</p>
        </div>
        <div className="space-y-2">
          {donts.map(d => (
            <div key={d} className="flex items-start gap-2 text-sm">
              <span className="text-destructive font-bold">✕</span>
              <span className="text-foreground/80">{d}</span>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};

// ========== MAIN PARTNERSHIPS PAGE ==========
const Partnerships = () => {
  const [tab, setTab] = useState("Pipeline");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AppHeader />

      <section className="py-10 px-6 min-h-[80vh]">
        <div className="max-w-[1200px] mx-auto">
          {/* Admin banner */}
          <div className="flex items-center gap-2.5 mb-6 px-5 py-3 rounded-xl accent-soft border border-primary/10">
            <Lock size={16} className="text-primary" />
            <span className="text-[13px] font-semibold text-primary">Admin Only</span>
            <span className="text-[13px] text-muted-foreground">— This page is restricted to authenticated administrators</span>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-[32px] font-extrabold tracking-tight">
              <span className="gradient-text">Partnerships</span>
            </h1>
          </div>

          <TabBar tabs={["Pipeline", "Pitch Deck", "Outreach"]} active={tab} onSelect={setTab} />

          {tab === "Pipeline" && <PipelineTab />}
          {tab === "Pitch Deck" && <PitchDeckTab />}
          {tab === "Outreach" && <OutreachTab />}
        </div>
      </section>

      <AppFooter />
    </div>
  );
};

export default Partnerships;
