import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Gift, Sparkles, CreditCard, Send, Shield, Zap, Clock, Star,
  Image, Video, Code, MessageSquare, ArrowRight, Heart,
} from "lucide-react";
import GlassCard from "@/components/redesign/GlassCard";
import GiftCardVisual from "@/components/redesign/GiftCardVisual";
import AppHeader from "@/components/redesign/AppHeader";
import AppFooter from "@/components/redesign/AppFooter";

const TIERS = [
  { price: 25, credits: 100, perCredit: "$0.25", badge: null, saves: null },
  { price: 50, credits: 250, perCredit: "$0.20", badge: null, saves: "20%" },
  { price: 100, credits: 600, perCredit: "$0.167", badge: "Most Popular", saves: "33%" },
  { price: 200, credits: 1400, perCredit: "$0.143", badge: "Best Value", saves: "43%" },
];

const STEPS = [
  { icon: CreditCard, title: "Choose Amount", desc: "Pick from $25 to $200 in AI credits" },
  { icon: Heart, title: "Personalize", desc: "Add a name and optional message" },
  { icon: Send, title: "Send Instantly", desc: "Delivered by email in seconds" },
  { icon: Sparkles, title: "Create Anything", desc: "Recipient uses credits across AI tools" },
];

const SERVICES = [
  { icon: MessageSquare, title: "Write Stories & Essays", desc: "Generate creative writing, scripts, and more", cost: "1 credit", color: "hsl(var(--primary))", preview: '"Write me a bedtime story about a dragon who learns to code..."' },
  { icon: Image, title: "Generate Images & Art", desc: "Create stunning visuals from text prompts", cost: "5 credits", color: "hsl(var(--secondary))", preview: "A watercolor painting of a sunset over a cyberpunk city" },
  { icon: Video, title: "Create AI Videos", desc: "Produce short videos with AI generation", cost: "25 credits", color: "hsl(var(--color-warning))", preview: "A 10-second animation of northern lights over mountains" },
  { icon: Code, title: "Build Apps & Websites", desc: "Code projects with AI assistance", cost: "10 credits", color: "#EC4899", preview: "Build me a personal portfolio with dark mode..." },
];

const Index = () => {
  const [selTier, setSelTier] = useState(2);
  const [hovSvc, setHovSvc] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />

      {/* Hero */}
      <section className="relative px-6 overflow-hidden" style={{ background: "var(--hero-gradient)", padding: "80px 24px 100px" }}>
        <div className="absolute w-[500px] h-[500px] rounded-full blur-[80px] pointer-events-none -top-[100px] -right-[100px] bg-primary/5" />
        <div className="absolute w-[400px] h-[400px] rounded-full blur-[80px] pointer-events-none -bottom-[50px] -left-[100px] bg-secondary/5" />

        <div className="max-w-[1200px] mx-auto flex items-center gap-20 flex-wrap justify-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex-1 min-w-[440px] max-w-[540px]"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full accent-soft border border-primary/10 mb-6">
              <Sparkles size={14} className="text-primary" />
              <span className="text-[13px] font-semibold text-primary">The Future of Gifting</span>
            </div>
            <h1 className="text-[52px] font-extrabold leading-[1.08] tracking-[-2px] text-foreground mb-5">
              Gift the Power{" "}
              <span className="gradient-text">of AI</span>
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground max-w-[440px] mb-9">
              One card. Unlimited creativity. OmniCredits work across the world's leading AI tools — write, design, code, and create.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link to="/purchase">
                <Button size="lg" className="rounded-full gap-2 text-[15px] font-semibold px-7" style={{ background: "var(--cta-gradient)" }}>
                  <Gift size={18} /> Send a Gift <ArrowRight size={16} className="ml-1" />
                </Button>
              </Link>
              <Link to="/purchase">
                <Button size="lg" variant="outline" className="rounded-full gap-2 text-[15px] font-semibold px-7">
                  <CreditCard size={18} /> Buy for Myself
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-5 mt-9 flex-wrap">
              {[{ icon: Shield, text: "Stripe Secured" }, { icon: Zap, text: "Instant Delivery" }, { icon: Clock, text: "Never Expires" }].map(({ icon: I, text }) => (
                <div key={text} className="flex items-center gap-1.5">
                  <I size={14} className="text-muted-foreground" />
                  <span className="text-[13px] text-muted-foreground">{text}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex-1 min-w-[360px] max-w-[460px] flex justify-center"
          >
            <GiftCardVisual />
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-foreground tracking-tight">How It Works</h2>
            <p className="text-base text-muted-foreground mt-3">Four steps to gift the power of AI</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map(({ icon: Icon, title, desc }, i) => (
              <motion.div key={title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <GlassCard className="text-center py-8 px-6">
                  <div className="relative inline-flex mb-4">
                    <div className="w-[52px] h-[52px] rounded-2xl accent-soft flex items-center justify-center">
                      <Icon size={24} className="text-primary" />
                    </div>
                    <div className="absolute -top-1.5 -right-1.5 w-[22px] h-[22px] rounded-full flex items-center justify-center text-[11px] font-bold text-white" style={{ background: "var(--accent-gradient)" }}>
                      {i + 1}
                    </div>
                  </div>
                  <h3 className="text-[17px] font-bold text-foreground mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-6 bg-muted">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-foreground tracking-tight">
              Choose Your <span className="gradient-text">OmniCredits</span>
            </h2>
            <p className="text-base text-muted-foreground mt-3">More credits, more savings. Credits never expire.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-[1040px] mx-auto">
            {TIERS.map((tier, i) => {
              const on = selTier === i;
              return (
                <motion.div
                  key={tier.price}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <div
                    onClick={() => setSelTier(i)}
                    className={`relative rounded-[20px] p-8 cursor-pointer transition-all duration-400 ${
                      on ? "bg-card border-2 border-primary scale-[1.03] shadow-[var(--shadow-hover)]" : "glass shadow-[var(--shadow-soft)]"
                    }`}
                    style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
                  >
                    {tier.badge && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-white text-xs font-bold whitespace-nowrap flex items-center gap-1" style={{ background: tier.badge === "Most Popular" ? "var(--accent-gradient)" : "var(--cta-gradient)" }}>
                        {tier.badge === "Most Popular" && <Star size={11} />}
                        {tier.badge}
                      </div>
                    )}
                    <div className="text-center">
                      <p className="text-[40px] font-extrabold text-foreground tracking-tight">${tier.price}</p>
                      <p className="text-[15px] font-semibold text-primary mt-1">{tier.credits.toLocaleString()} Credits</p>
                      <p className="text-[13px] text-muted-foreground mt-2">{tier.perCredit} per credit</p>
                      {tier.saves && (
                        <span className="inline-block mt-3 px-2.5 py-0.5 rounded-full bg-success/10 text-success text-xs font-semibold">Save {tier.saves}</span>
                      )}
                    </div>
                    <Link to={`/purchase?amount=${tier.price}`}>
                      <button className={`w-full mt-6 py-3 rounded-xl font-semibold text-sm transition-all ${on ? "text-white" : "border text-foreground"}`} style={{ background: on ? "var(--cta-gradient)" : "transparent", borderColor: on ? undefined : "hsl(var(--border))" }}>
                        {on ? "Select This Gift" : "Choose"}
                      </button>
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What Can You Create */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-foreground tracking-tight">
              What Can You <span className="gradient-text">Create</span>?
            </h2>
            <p className="text-base text-muted-foreground mt-3">One credit system. Endless possibilities.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICES.map(({ icon: Icon, title, desc, cost, color, preview }, i) => (
              <motion.div key={title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.08 }}>
                <GlassCard className="p-0 overflow-hidden" hover>
                  <div
                    className="p-7"
                    onMouseEnter={() => setHovSvc(i)}
                    onMouseLeave={() => setHovSvc(null)}
                  >
                    <div
                      className="w-12 h-12 rounded-[14px] flex items-center justify-center mb-4 transition-transform duration-300"
                      style={{ background: `${color}15`, transform: hovSvc === i ? "scale(1.08)" : "scale(1)" }}
                    >
                      <Icon size={22} style={{ color }} />
                    </div>
                    <h3 className="text-[17px] font-bold text-foreground mb-2">{title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{desc}</p>
                    <div
                      className="overflow-hidden transition-all duration-400"
                      style={{
                        maxHeight: hovSvc === i ? 60 : 0,
                        opacity: hovSvc === i ? 1 : 0,
                        marginBottom: hovSvc === i ? 16 : 0,
                        transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
                      }}
                    >
                      <div className="p-2.5 rounded-[10px] accent-soft text-[13px] text-muted-foreground italic leading-snug">{preview}</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] font-semibold" style={{ color }}>{cost} per use</span>
                      <div className="w-7 h-7 rounded-full flex items-center justify-center transition-transform" style={{ background: `${color}12`, transform: hovSvc === i ? "translateX(2px)" : "none" }}>
                        <ArrowRight size={14} style={{ color }} />
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AppFooter />
    </div>
  );
};

export default Index;
