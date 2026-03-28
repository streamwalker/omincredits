import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Copy, Check, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PartnershipNav } from "./Partnerships";

const TEMPLATES = [
  {
    id: "midtier",
    label: "Cold Outreach — Mid-Tier Platform",
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
    label: "Cold Outreach — Major Player (OpenAI/Anthropic)",
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

Our users represent demand you're not currently capturing through direct channels. Happy to share our full traction deck.

15 minutes to chat?

Best,
[Your Name]
OmniCredits™`,
  },
  {
    id: "followup",
    label: "Follow-Up Email (After Initial Contact)",
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

const DONTS = [
  "\"We want to unify AI\" — too abstract, no one cares",
  "\"We're building an exchange\" — sounds like crypto",
  "\"This benefits everyone\" — they care about THEIR revenue",
  "\"We're a marketplace\" — implies middleman, triggers defensiveness",
  "\"We just need API access\" — sounds like you're asking for a favor",
];

const PartnershipOutreach = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    toast({ title: "Copied to clipboard" });
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="border-b border-border/40 glass">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => navigate("/partnerships")}>
            <ArrowLeft className="h-4 w-4 mr-1" /> Pipeline
          </Button>
          <h1 className="font-heading text-lg font-bold gradient-text">Outreach Templates</h1>
          <div className="w-20" />
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <PartnershipNav />

        <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-heading font-bold gradient-text mb-8">
          Email Templates
        </motion.h2>

        {TEMPLATES.map((t, i) => (
          <motion.div key={t.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card className="glass border-border/30 mb-6">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base">{t.label}</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(t.id, `Subject: ${t.subject}\n\n${t.body}`)}
                >
                  {copied === t.id ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                  {copied === t.id ? "Copied" : "Copy"}
                </Button>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-1">Subject:</p>
                <p className="text-sm font-medium mb-3">{t.subject}</p>
                <p className="text-xs text-muted-foreground mb-1">Body:</p>
                <pre className="text-sm whitespace-pre-wrap font-body text-muted-foreground bg-muted/20 rounded-lg p-4">
                  {t.body}
                </pre>
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {/* What NOT to Say */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="border-destructive/50 bg-destructive/5 mb-12">
            <CardHeader className="flex flex-row items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <CardTitle className="text-base text-destructive">What NOT to Say</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {DONTS.map((d) => (
                  <li key={d} className="text-sm flex items-start gap-2">
                    <span className="text-destructive font-bold">✕</span> {d}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default PartnershipOutreach;
