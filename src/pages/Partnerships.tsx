import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Zap, BarChart3, Handshake, CheckCircle2, Circle, Clock } from "lucide-react";

const PHASES = [
  {
    phase: 1,
    title: "API Direct",
    status: "in-progress" as const,
    icon: Zap,
    description: "Use provider APIs directly. Build wallet, route usage, pay wholesale.",
    actions: ["Integrate OpenAI / Anthropic / Google APIs", "Build OmniCredits™ wallet", "Route usage & track metrics"],
  },
  {
    phase: 2,
    title: "Build Leverage",
    status: "not-started" as const,
    icon: BarChart3,
    description: "Prove demand with real numbers. Compile traction data.",
    actions: ["Track # of users & credits sold", "Measure usage volume by provider", "Identify demographic insights"],
  },
  {
    phase: 3,
    title: "Approach Partners",
    status: "not-started" as const,
    icon: Handshake,
    description: "Formalize relationships. Negotiate terms from a position of strength.",
    actions: ["Outreach to mid-tier platforms first", "Share traction metrics", "Negotiate revenue share / co-branding"],
  },
];

const COMPANIES = [
  { name: "Lovable", category: "Code", tier: 1, status: "not-started", priority: "High" },
  { name: "Bolt", category: "Code", tier: 1, status: "not-started", priority: "High" },
  { name: "Cursor", category: "Code", tier: 1, status: "not-started", priority: "High" },
  { name: "Replit", category: "Code", tier: 1, status: "not-started", priority: "Medium" },
  { name: "Runway", category: "Video", tier: 1, status: "not-started", priority: "High" },
  { name: "ElevenLabs", category: "Audio", tier: 1, status: "not-started", priority: "High" },
  { name: "Anthropic", category: "Text", tier: 2, status: "not-started", priority: "Medium" },
  { name: "Mistral", category: "Text", tier: 2, status: "not-started", priority: "Medium" },
  { name: "Stability AI", category: "Image", tier: 2, status: "not-started", priority: "Medium" },
  { name: "Midjourney", category: "Image", tier: 2, status: "not-started", priority: "Low" },
  { name: "OpenAI", category: "Text", tier: 3, status: "not-started", priority: "Low" },
  { name: "Google (Gemini)", category: "Text", tier: 3, status: "not-started", priority: "Low" },
];

const POWER_CURVE = [
  { stage: 0, label: "Today", desc: "You need them — use APIs" },
  { stage: 1, label: "Early Traction", desc: "Small partners say yes" },
  { stage: 2, label: "Growth", desc: "Bigger players listen" },
  { stage: 3, label: "Scale", desc: "You become distribution" },
];

const WEEKLY_PLAN = [
  { week: 1, tasks: ["Build OmniCredits MVP", "Integrate 1–2 APIs"] },
  { week: 2, tasks: ["Sell first credits", "Track usage metrics"] },
  { week: 3, tasks: ["Add 1–2 more providers", "Begin routing logic"] },
  { week: 4, tasks: ["Compile metrics", "Start outreach to smaller players"] },
];

const statusIcon = (s: string) => {
  if (s === "in-progress") return <Clock className="h-4 w-4 text-yellow-400" />;
  if (s === "contacted" || s === "partnered") return <CheckCircle2 className="h-4 w-4 text-green-400" />;
  return <Circle className="h-4 w-4 text-muted-foreground" />;
};

const statusBadge = (s: string) => {
  const map: Record<string, string> = {
    "not-started": "Not Started",
    "in-progress": "In Progress",
    contacted: "Contacted",
    partnered: "Partnered",
  };
  return (
    <Badge variant={s === "in-progress" ? "default" : s === "partnered" ? "secondary" : "outline"} className="text-xs">
      {map[s] ?? s}
    </Badge>
  );
};

const tierLabel = (t: number) => {
  if (t === 1) return "Tier 1 — First Targets";
  if (t === 2) return "Tier 2 — After Traction";
  return "Tier 3 — At Scale";
};

const PartnershipNav = () => (
  <div className="flex gap-2 mb-8">
    {[
      { to: "/partnerships", label: "Pipeline" },
      { to: "/partnerships/pitch", label: "Pitch Deck" },
      { to: "/partnerships/outreach", label: "Outreach" },
    ].map((l) => (
      <Link key={l.to} to={l.to}>
        <Button variant={location.pathname === l.to ? "default" : "outline"} size="sm">
          {l.label}
        </Button>
      </Link>
    ))}
  </div>
);

export { PartnershipNav };

const Partnerships = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <nav className="border-b border-border/40 glass">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="h-4 w-4 mr-1" /> Dashboard
          </Button>
          <h1 className="font-heading text-lg font-bold gradient-text">Partnerships</h1>
          <div className="w-20" />
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <PartnershipNav />

        {/* Header */}
        <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-4xl font-heading font-bold gradient-text mb-8">
          Partnership Pipeline
        </motion.h2>

        {/* Phase Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {PHASES.map((p, i) => (
            <motion.div key={p.phase} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className="glass border-border/30 h-full">
                <CardHeader className="flex flex-row items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <p.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-base">Phase {p.phase}: {p.title}</CardTitle>
                  </div>
                  {statusBadge(p.status)}
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{p.description}</p>
                  <ul className="space-y-2">
                    {p.actions.map((a) => (
                      <li key={a} className="flex items-start gap-2 text-sm">
                        {statusIcon(p.status)} <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Target Companies */}
        <h3 className="text-xl font-heading font-bold mb-4">Target Companies</h3>
        {[1, 2, 3].map((tier) => (
          <div key={tier} className="mb-8">
            <p className="text-sm font-semibold text-muted-foreground mb-3">{tierLabel(tier)}</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {COMPANIES.filter((c) => c.tier === tier).map((c) => (
                <Card key={c.name} className="glass border-border/30">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium">{c.name}</p>
                      <p className="text-xs text-muted-foreground">{c.category}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">{c.priority}</Badge>
                      {statusBadge(c.status)}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}

        {/* Negotiation Power Curve */}
        <h3 className="text-xl font-heading font-bold mb-4">Negotiation Power Curve</h3>
        <div className="glass border-border/30 rounded-lg p-6 mb-12">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-secondary -translate-y-1/2" />
            {POWER_CURVE.map((s, i) => (
              <div key={s.stage} className="relative z-10 flex flex-col items-center text-center w-1/4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${i === 0 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                  {s.stage}
                </div>
                <p className="text-sm font-semibold mt-2">{s.label}</p>
                <p className="text-xs text-muted-foreground mt-1 hidden md:block">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 30-Day Plan */}
        <h3 className="text-xl font-heading font-bold mb-4">30-Day Tactical Plan</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {WEEKLY_PLAN.map((w) => (
            <Card key={w.week} className="glass border-border/30">
              <CardHeader>
                <CardTitle className="text-base">Week {w.week}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {w.tasks.map((t) => (
                    <li key={t} className="flex items-start gap-2 text-sm">
                      <Circle className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" /> {t}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Partnerships;
