import { useState } from "react";
import AppHeader from "@/components/redesign/AppHeader";
import AppFooter from "@/components/redesign/AppFooter";
import GlassCard from "@/components/redesign/GlassCard";
import { HelpCircle, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  {
    q: "What are OmniCredits (OC)?",
    a: "OmniCredits are a universal AI currency that lets you access multiple AI services — chat, image generation, video creation, and coding assistance — all from one balance.",
  },
  {
    q: "How do gift cards work?",
    a: "Purchase a gift card, and the recipient receives an email with a unique redemption code. They create an account (or sign in), enter the code, and the credits are added to their balance instantly.",
  },
  {
    q: "Do credits expire?",
    a: "No! OmniCredits never expire. Use them whenever you're ready.",
  },
  {
    q: "How much do AI services cost?",
    a: "Costs vary by service: Chat costs 1 OC per prompt, Image Generation costs 5 OC, Video Creation costs 25 OC, and Code Generation costs 10 OC.",
  },
  {
    q: "Can I get a refund?",
    a: "OmniCredits are non-refundable once purchased. Unredeemed gift cards may be eligible for a refund within 30 days of purchase — contact support for assistance.",
  },
  {
    q: "Is my data safe?",
    a: "Yes. We use industry-standard encryption and security practices. Your AI-generated content is private and not used to train models. See our Privacy Policy for details.",
  },
  {
    q: "What AI models power OmniCredits?",
    a: "We use a curated selection of leading AI models to provide the best results across text, image, video, and code generation. The specific models may be updated over time to ensure top quality.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppHeader />
      <div className="flex-1 container mx-auto pt-28 pb-16 px-4 max-w-3xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <HelpCircle size={20} className="text-primary" />
          </div>
          <h1 className="text-3xl font-heading font-bold">Frequently Asked Questions</h1>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <GlassCard
              key={i}
              hover={false}
              className="p-0 overflow-hidden"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <button className="w-full flex items-center justify-between px-6 py-4 text-left cursor-pointer">
                <span className="font-heading font-semibold text-sm text-foreground pr-4">{faq.q}</span>
                <motion.div animate={{ rotate: openIndex === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown size={18} className="text-muted-foreground flex-shrink-0" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-4 text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassCard>
          ))}
        </div>
      </div>
      <AppFooter />
    </div>
  );
};

export default FAQ;
