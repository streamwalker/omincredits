import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Sparkles } from "lucide-react";

type Step = "input" | "success";

const Redeem = () => {
  const [step, setStep] = useState<Step>("input");
  const [code, setCode] = useState("");
  const [unlockedCredits, setUnlockedCredits] = useState(0);
  const navigate = useNavigate();

  const handleRedeem = () => {
    // Mock redemption — in real version this queries the database
    const mockCredits = code.length > 0 ? 600 : 0;
    setUnlockedCredits(mockCredits);
    setStep("success");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-border/30">
        <div className="container mx-auto flex items-center h-16 px-4">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="font-heading text-sm">Back</span>
          </Link>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            {step === "input" && (
              <motion.div key="input" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="text-center">
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
              </motion.div>
            )}

            {step === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", damping: 15 }}
                className="text-center"
              >
                {/* Background celebration glow */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[100px]" />
                </div>

                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6"
                >
                  <Sparkles className="w-10 h-10 text-primary" />
                </motion.div>

                <h1 className="text-3xl font-heading font-bold mb-2">You've Unlocked</h1>
                <p className="text-5xl font-heading font-bold gradient-text mb-2">
                  {unlockedCredits} CC
                </p>
                <p className="text-muted-foreground mb-8">Compute Credits</p>

                <Button
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-heading font-semibold text-lg py-6"
                  onClick={() => navigate("/dashboard")}
                >
                  Start Creating
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Redeem;
