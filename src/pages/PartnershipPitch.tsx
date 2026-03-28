import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, DollarSign, Users, TrendingUp, Wallet } from "lucide-react";
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

const PartnershipPitch = () => {
  const navigate = useNavigate();

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

      <div className="max-w-4xl mx-auto px-4 py-8">
        <PartnershipNav />

        {/* Slides */}
        {SLIDES.map((s, i) => (
          <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card className="glass border-border/30 mb-6">
              <CardContent className="p-8">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">{s.title}</p>
                <p className="text-lg md:text-xl font-heading">{s.content}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {/* Traction */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
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

        {/* Partnership Angles */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
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
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
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
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
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
