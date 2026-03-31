import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Check, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import AppHeader from "@/components/redesign/AppHeader";
import AppFooter from "@/components/redesign/AppFooter";
import GlassCard from "@/components/redesign/GlassCard";
import GiftCardVisual from "@/components/redesign/GiftCardVisual";

const PLANS = [
  { price: 25, credits: 100 },
  { price: 50, credits: 250 },
  { price: 100, credits: 600 },
  { price: 200, credits: 1400 },
];

type Step = "select" | "details" | "confirmation";

const Purchase = () => {
  const [searchParams] = useSearchParams();
  const preselected = searchParams.get("amount");
  const { toast } = useToast();

  const [step, setStep] = useState<Step>(preselected ? "details" : "select");
  const [selectedPlan, setSelectedPlan] = useState(
    PLANS.find((p) => p.price === Number(preselected)) || null
  );
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [message, setMessage] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSelectPlan = (plan: typeof PLANS[0]) => {
    setSelectedPlan(plan);
    setStep("details");
  };

  const handlePurchase = async () => {
    if (!selectedPlan || !senderName || !senderEmail || !recipientEmail) return;
    setLoading(true);

    const code = "SW-" + Math.random().toString(36).substring(2, 8).toUpperCase();

    try {
      const { error } = await supabase.from("gift_cards").insert({
        code,
        amount_usd: selectedPlan.price,
        credits: selectedPlan.credits,
        sender_name: senderName,
        sender_email: senderEmail,
        recipient_email: recipientEmail,
        message: message || null,
      });

      if (error) throw error;

      setGeneratedCode(code);
      setStep("confirmation");
    } catch (err: any) {
      toast({
        title: "Purchase failed",
        description: err.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppHeader />

      <div className="flex-1 container mx-auto pt-28 pb-16 px-4 max-w-2xl">
        <AnimatePresence mode="wait">
          {/* Step 1: Select Amount */}
          {step === "select" && (
            <motion.div key="select" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
              <h1 className="text-3xl font-heading font-bold mb-2">
                Gift <span className="gradient-text">AI Credits</span>
              </h1>
              <p className="text-muted-foreground mb-8">Choose an amount to gift</p>
              <div className="grid grid-cols-2 gap-4">
                {PLANS.map((plan) => (
                  <GlassCard
                    key={plan.price}
                    onClick={() => handleSelectPlan(plan)}
                    className="text-center"
                  >
                    <p className="text-3xl font-heading font-bold">${plan.price}</p>
                    <p className="text-sm text-muted-foreground mt-1">{plan.credits} OmniCredits</p>
                  </GlassCard>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Details */}
          {step === "details" && selectedPlan && (
            <motion.div key="details" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
              <h1 className="text-3xl font-heading font-bold mb-2">
                Send <span className="gradient-text">{selectedPlan.credits} OmniCredits</span>
              </h1>
              <p className="text-muted-foreground mb-8">${selectedPlan.price} gift card</p>

              <GlassCard hover={false} className="p-8">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Your Name</label>
                    <Input
                      placeholder="Enter your name"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      className="bg-muted border-border"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Your Email</label>
                    <Input
                      type="email"
                      placeholder="you@email.com"
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      className="bg-muted border-border"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Recipient Email</label>
                    <Input
                      type="email"
                      placeholder="recipient@email.com"
                      value={recipientEmail}
                      onChange={(e) => setRecipientEmail(e.target.value)}
                      className="bg-muted border-border"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Message (optional)</label>
                    <Textarea
                      placeholder="Add a personal message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="bg-muted border-border resize-none"
                      rows={3}
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button variant="outline" onClick={() => setStep("select")}>
                      Back
                    </Button>
                    <Button
                      className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-heading font-semibold"
                      onClick={handlePurchase}
                      disabled={!senderName || !senderEmail || !recipientEmail || loading}
                    >
                      {loading ? <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Processing...</> : `Pay $${selectedPlan.price}`}
                    </Button>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {/* Step 3: Confirmation */}
          {step === "confirmation" && selectedPlan && (
            <motion.div key="confirmation" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-3xl font-heading font-bold mb-2">Gift Sent!</h1>
                <p className="text-muted-foreground">
                  Your gift has been sent to {recipientEmail}
                </p>
              </div>

              <GiftCardVisual
                recipientName={recipientEmail}
                amount={selectedPlan.price}
                credits={selectedPlan.credits}
              />

              <GlassCard hover={false} className="mt-8 text-center">
                <p className="text-xs text-muted-foreground mb-1">Redemption Code</p>
                <p className="text-lg font-heading font-bold tracking-wider gradient-text">{generatedCode}</p>
              </GlassCard>

              <div className="mt-8 flex gap-3 justify-center">
                <Link to="/">
                  <Button variant="outline">Back to Home</Button>
                </Link>
                <Button
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-heading"
                  onClick={() => {
                    setStep("select");
                    setSelectedPlan(null);
                    setSenderName("");
                    setSenderEmail("");
                    setRecipientEmail("");
                    setMessage("");
                    setGeneratedCode("");
                  }}
                >
                  Send Another
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AppFooter />
    </div>
  );
};

export default Purchase;
