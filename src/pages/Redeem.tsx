import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles } from "lucide-react";
import AppHeader from "@/components/redesign/AppHeader";
import AppFooter from "@/components/redesign/AppFooter";
import GlassCard from "@/components/redesign/GlassCard";

type Step = "input" | "success";

const Redeem = () => {
  const [step, setStep] = useState<Step>("input");
  const [code, setCode] = useState("");
  const [unlockedCredits, setUnlockedCredits] = useState(0);
  const navigate = useNavigate();

  const handleRedeem = () => {
    const mockCredits = code.length > 0 ? 600 : 0;
    setUnlockedCredits(mockCredits);
    setStep("success");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppHeader />

      <div className="flex-1 flex items-center justify-center px-4 pt-24 pb-16">
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            {step === "input" && (
              <motion.div key="input" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                <GlassCard hover={false} className="p-8 text-center">
                  <h1 className="text-3xl font-heading font-bold mb-2">
                    Redeem Your <span className="gradient-text">AI Credits</span>
                  </h1>
                  <p className="text-muted-foreground mb-8">Enter the code from your gift card</p>

                  <Input
                    placeholder="SW-XXXXXX"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    className="bg-muted border-border text-center text-lg font-heading tracking-widest mb-4"
                  />

                  <Button
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-heading font-semibold"
                    onClick={handleRedeem}
                    disabled={code.length < 3}
                  >
                    Unlock Credits
                  </Button>

                  <p className="text-xs text-muted-foreground mt-4">
                    Don't have an account?{" "}
                    <Link to="/auth" className="text-primary hover:underline">Sign up first</Link>
                  </p>
                </GlassCard>
              </motion.div>
            )}

            {step === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", damping: 15 }}
              >
                <GlassCard hover={false} className="p-8 text-center relative overflow-hidden">
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[100px]" style={{ background: "hsl(var(--primary) / 0.1)" }} />
                  </div>

                  <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6 relative z-10"
                  >
                    <Sparkles className="w-10 h-10 text-primary" />
                  </motion.div>

                  <h1 className="text-3xl font-heading font-bold mb-2 relative z-10">You've Unlocked</h1>
                  <p className="text-5xl font-heading font-bold gradient-text mb-2 relative z-10">
                    {unlockedCredits} OC
                  </p>
                  <p className="text-muted-foreground mb-8 relative z-10">OmniCredits™</p>

                  <Button
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-heading font-semibold text-lg py-6 relative z-10"
                    onClick={() => navigate("/dashboard")}
                  >
                    Start Creating
                  </Button>
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AppFooter />
    </div>
  );
};

export default Redeem;
