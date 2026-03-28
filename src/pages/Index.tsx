import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Image, Video, Code, Gift, GraduationCap, Palette, Brain } from "lucide-react";

const PLANS = [
  { price: 25, credits: 100 },
  { price: 50, credits: 250 },
  { price: 100, credits: 600 },
  { price: 200, credits: 1400 },
];

const FEATURES = [
  { icon: Sparkles, title: "Write Stories & Essays", desc: "Generate creative writing, scripts, and more" },
  { icon: Image, title: "Generate Images & Art", desc: "Create stunning visuals from text prompts" },
  { icon: Video, title: "Create AI Videos", desc: "Produce short videos with AI generation" },
  { icon: Code, title: "Build Apps & Websites", desc: "Code projects with AI assistance" },
];

const AUDIENCES = [
  { icon: Brain, label: "Kids Learning AI" },
  { icon: GraduationCap, label: "Students" },
  { icon: Palette, label: "Creators" },
  { icon: Gift, label: "Anyone Curious" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-border/30">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <Link to="/" className="font-heading font-bold text-lg tracking-wider gradient-text">
            STREAMWALKERS
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/redeem">
              <Button variant="ghost" size="sm">Redeem</Button>
            </Link>
            <Link to="/auth">
              <Button variant="outline" size="sm">Sign In</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4">
        {/* Background glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
          <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] rounded-full bg-secondary/5 blur-[100px]" />
          <div className="absolute top-1/2 right-1/4 w-[300px] h-[300px] rounded-full bg-accent/5 blur-[80px]" />
        </div>

        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl sm:text-7xl font-heading font-bold leading-tight mb-6">
              The Easiest Way to{" "}
              <span className="gradient-text">Gift AI</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              One card. Unlimited creativity. Works across the world's leading AI tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/purchase">
                <Button size="lg" className="text-base px-8 bg-primary text-primary-foreground hover:bg-primary/90 font-heading font-semibold">
                  Buy AI Credits
                </Button>
              </Link>
              <Link to="/redeem">
                <Button size="lg" variant="outline" className="text-base px-8 font-heading">
                  Redeem Code
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Buy Strip */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl font-heading font-bold text-center mb-10">
            Choose Your <span className="gradient-text">OmniCredits™</span>
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {PLANS.map((plan, i) => (
              <motion.div
                key={plan.price}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Link to={`/purchase?amount=${plan.price}`}>
                  <div className="glass glow-border rounded-xl p-6 text-center hover:bg-card/80 transition-all cursor-pointer group">
                    <p className="text-3xl font-heading font-bold text-foreground group-hover:gradient-text transition-all">
                      ${plan.price}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">{plan.credits} OmniCredits</p>
                    {plan.price >= 100 && (
                      <span className="inline-block mt-2 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                        Best Value
                      </span>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What Can You Do */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl font-heading font-bold text-center mb-10">
            What Can You <span className="gradient-text">Create</span>?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="glass rounded-xl p-6 text-center"
              >
                <f.icon className="w-10 h-10 mx-auto mb-4 text-primary" />
                <h3 className="font-heading font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gift Positioning */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-heading font-bold mb-10">
            Perfect <span className="gradient-text">Gift</span> For
          </h2>
          <div className="flex flex-wrap justify-center gap-6 max-w-2xl mx-auto">
            {AUDIENCES.map((a) => (
              <div key={a.label} className="flex items-center gap-2 glass rounded-full px-6 py-3">
                <a.icon className="w-5 h-5 text-primary" />
                <span className="font-heading font-medium text-sm">{a.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/30 py-8 px-4">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-heading text-sm tracking-wider gradient-text font-bold">STREAMWALKERS</span>
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Streamwalkers. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
