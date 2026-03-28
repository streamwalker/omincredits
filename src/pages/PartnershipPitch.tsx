import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, DollarSign, Users, TrendingUp, Wallet, Shield, Target, Lightbulb, AlertTriangle } from "lucide-react";
import { UnitEconomicsPanel, ProjectionCharts, ScenarioTesting, StressTest } from "@/components/FinancialModels";
import { PartnershipNav } from "./Partnerships";

const SLIDES = [
  {
    title: "Opening",
    content: "We've built a prepaid AI credit system that brings new users into the ecosystem — especially non-technical consumers and gift buyers.",
  },
  {
    title: "Problem",
    content: "Right now, most AI platforms only monetize users willing to subscribe or learn complex pricing models. Millions of potential users are left out.",
  },
  {
    title: "Solution",
    content: "OmniCredits™ simplifies AI access into a single credit system and routes usage across tools — driving incremental usage you wouldn't otherwise capture.",
  },
];

const SWOT = [
  {
    label: "Strengths",
    icon: Shield,
    color: "border-l-green-500",
    bgColor: "bg-green-500/10",
    textColor: "text-green-400",
    items: [
      "First-mover in prepaid AI credits",
      "Simplified UX for non-technical users",
      "Multi-provider routing architecture",
      "Prepaid cash flow model",
    ],
  },
  {
    label: "Weaknesses",
    icon: AlertTriangle,
    color: "border-l-yellow-500",
    bgColor: "bg-yellow-500/10",
    textColor: "text-yellow-400",
    items: [
      "No established brand yet",
      "Dependent on third-party APIs",
      "Unproven at scale",
      "Limited traction data",
    ],
  },
  {
    label: "Opportunities",
    icon: Lightbulb,
    color: "border-l-blue-500",
    bgColor: "bg-blue-500/10",
    textColor: "text-blue-400",
    items: [
      "Untapped gift & family market",
      "Enterprise bulk credit purchases",
      "Education sector adoption",
      "International expansion",
    ],
  },
  {
    label: "Threats",
    icon: Target,
    color: "border-l-red-500",
    bgColor: "bg-red-500/10",
    textColor: "text-red-400",
    items: [
      "Providers launching own gift cards",
      "API pricing changes eroding margins",
      "Competitors copying the model",
      "Regulatory changes",
    ],
  },
];

const TRACTION = [
  { label: "Credits Sold", value: "[X]", sub: "OmniCredits™" },
  { label: "Users Onboarded", value: "[X]", sub: "unique users" },
  { label: "Usage Volume", value: "[X]", sub: "API calls routed" },
  { label: "Revenue", value: "$[X]", sub: "prepaid credits" },
];




const ANGLES = [
  { icon: DollarSign, title: "Incremental Revenue", desc: "We bring prepaid users who wouldn't subscribe directly. New revenue you're not capturing today." },
  { icon: Users, title: "New Demographics", desc: "Non-technical users, kids, gift buyers, families — audiences you don't currently reach." },
  { icon: TrendingUp, title: "Usage Expansion", desc: "Users experiment across tools instead of committing to one, increasing total spend." },
  { icon: Wallet, title: "Prepaid Cash Flow", desc: "We sell credits upfront. You get paid as usage happens. Predictable, low-risk revenue." },
];

const OFFERS = [
  { label: "Revenue Share", desc: "We keep margin on credits. You get API usage revenue at standard rates." },
  { label: "Featured Placement", desc: "'Powered by [Provider]' sections. Highlight your tool inside our platform." },
  { label: "Co-branded Credits", desc: "'Use OmniCredits™ with [Provider]' — after traction is proven." },
];

let delay = 0;
const nextDelay = () => { delay += 0.08; return delay; };

const PartnershipPitch = () => {
  const navigate = useNavigate();
  delay = 0;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="border-b border-border/40 glass">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => navigate("/partnerships")}>
            <ArrowLeft className="h-4 w-4 mr-1" /> Pipeline
          </Button>
          <h1 className="font-heading text-lg font-bold gradient-text">Pitch Deck</h1>
          <div className="w-20" />
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <PartnershipNav />

        {/* Slides */}
        {SLIDES.map((s) => (
          <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: nextDelay() }}>
            <Card className="glass border-border/30 mb-6">
              <CardContent className="p-8">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">{s.title}</p>
                <p className="text-lg md:text-xl font-heading">{s.content}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {/* SWOT Analysis */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: nextDelay() }}>
          <Card className="glass border-border/30 mb-6">
            <CardContent className="p-8">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">SWOT Analysis</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SWOT.map((q) => (
                  <div key={q.label} className={`rounded-lg border-l-4 ${q.color} ${q.bgColor} p-5`}>
                    <div className="flex items-center gap-2 mb-3">
                      <q.icon className={`h-5 w-5 ${q.textColor}`} />
                      <p className={`font-heading font-bold text-sm ${q.textColor}`}>{q.label}</p>
                    </div>
                    <ul className="space-y-1.5">
                      {q.items.map((item) => (
                        <li key={item} className="text-xs text-foreground/80 flex items-start gap-2">
                          <span className={`mt-1.5 h-1.5 w-1.5 rounded-full ${q.textColor} bg-current shrink-0`} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Traction */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: nextDelay() }}>
          <Card className="glass border-border/30 mb-6">
            <CardContent className="p-8">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Traction</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {TRACTION.map((t) => (
                  <div key={t.label} className="text-center">
                    <p className="text-3xl font-heading font-bold gradient-text">{t.value}</p>
                    <p className="text-sm font-medium mt-1">{t.label}</p>
                    <p className="text-xs text-muted-foreground">{t.sub}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Financial Model */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: nextDelay() }}>
          <Card className="glass border-border/30 mb-6">
            <CardContent className="p-8">
              <div className="flex items-center gap-2 mb-4">
                <Calculator className="h-5 w-5 text-primary" />
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Financial Model — Unit Economics</p>
              </div>

              <p className="text-sm font-heading font-semibold mb-3">Credit Pricing Tiers</p>
              <div className="overflow-x-auto mb-6">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border/30">
                      <TableHead className="text-muted-foreground">Package</TableHead>
                      <TableHead className="text-muted-foreground">Credits</TableHead>
                      <TableHead className="text-muted-foreground">Cost/OC</TableHead>
                      <TableHead className="text-muted-foreground">Sell/OC</TableHead>
                      <TableHead className="text-muted-foreground">Margin</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {PRICING_TIERS.map((t) => (
                      <TableRow key={t.price} className="border-border/20">
                        <TableCell className="font-semibold">{t.price}</TableCell>
                        <TableCell>{t.credits}</TableCell>
                        <TableCell className="text-red-400">{t.costPerOC}</TableCell>
                        <TableCell className="text-green-400">{t.sellPerOC}</TableCell>
                        <TableCell className="font-bold gradient-text">{t.margin}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <p className="text-sm font-heading font-semibold mb-3">Revenue Breakdown (At Scale)</p>
              <div className="overflow-x-auto">
                <Table>
                  <TableBody>
                    {REVENUE_BREAKDOWN.map((r) => (
                      <TableRow key={r.metric} className="border-border/20">
                        <TableCell className="text-muted-foreground">{r.metric}</TableCell>
                        <TableCell className="text-right font-semibold">{r.value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Five-Year Projection */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: nextDelay() }}>
          <Card className="glass border-border/30 mb-6">
            <CardContent className="p-8">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="h-5 w-5 text-primary" />
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Five-Year Financial Projection</p>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border/30">
                      <TableHead className="text-muted-foreground">Metric</TableHead>
                      {["Y1", "Y2", "Y3", "Y4", "Y5"].map((y) => (
                        <TableHead key={y} className="text-muted-foreground text-center">{y}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {FIVE_YEAR.metrics.map((metric, mi) => (
                      <TableRow key={metric} className="border-border/20">
                        <TableCell className="text-muted-foreground text-sm whitespace-nowrap">{metric}</TableCell>
                        {FIVE_YEAR.years.map((yr, yi) => (
                          <TableCell
                            key={yi}
                            className={`text-center text-sm ${metric === "Gross Margin" ? "font-bold gradient-text" : ""}`}
                          >
                            {yr[mi]}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Ten-Year Projection */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: nextDelay() }}>
          <Card className="glass border-border/30 mb-6">
            <CardContent className="p-8">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-5 w-5 text-primary" />
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Ten-Year Financial Projection</p>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border/30">
                      <TableHead className="text-muted-foreground">Metric</TableHead>
                      {["Y6", "Y7", "Y8", "Y9", "Y10"].map((y) => (
                        <TableHead key={y} className="text-muted-foreground text-center">{y}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {TEN_YEAR.metrics.map((metric, mi) => (
                      <TableRow key={metric} className="border-border/20">
                        <TableCell className="text-muted-foreground text-sm whitespace-nowrap">{metric}</TableCell>
                        {TEN_YEAR.years.map((yr, yi) => (
                          <TableCell
                            key={yi}
                            className={`text-center text-sm ${metric === "Gross Margin" ? "font-bold gradient-text" : ""}`}
                          >
                            {yr[mi]}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <p className="text-xs text-muted-foreground mt-4 italic">
                Assumptions: Margin improvement driven by volume discounts, enterprise tier adoption, and reduced per-unit API costs at scale.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Partnership Angles */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: nextDelay() }}>
          <Card className="glass border-border/30 mb-6">
            <CardContent className="p-8">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Partnership Angles</p>
              <div className="grid md:grid-cols-2 gap-4">
                {ANGLES.map((a) => (
                  <div key={a.title} className="flex gap-3 p-4 rounded-lg bg-muted/30">
                    <div className="p-2 rounded-lg bg-primary/10 h-fit">
                      <a.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{a.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{a.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* What We Offer */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: nextDelay() }}>
          <Card className="glass border-border/30 mb-6">
            <CardContent className="p-8">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">What We Offer</p>
              <div className="space-y-4">
                {OFFERS.map((o, i) => (
                  <div key={o.label} className="flex items-start gap-3">
                    <span className="text-sm font-bold text-primary mt-0.5">Option {String.fromCharCode(65 + i)}</span>
                    <div>
                      <p className="font-semibold text-sm">{o.label}</p>
                      <p className="text-xs text-muted-foreground">{o.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* The Ask */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: nextDelay() }}>
          <Card className="glass border-border/30 glow-border mb-12">
            <CardContent className="p-8 text-center">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">The Ask</p>
              <p className="text-xl font-heading font-bold gradient-text">
                "We'd like to formalize access and explore co-marketing + deeper integration."
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default PartnershipPitch;
