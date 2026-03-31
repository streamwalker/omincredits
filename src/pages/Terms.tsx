import AppHeader from "@/components/redesign/AppHeader";
import AppFooter from "@/components/redesign/AppFooter";
import GlassCard from "@/components/redesign/GlassCard";
import { FileText } from "lucide-react";

const Terms = () => (
  <div className="min-h-screen bg-background flex flex-col">
    <AppHeader />
    <div className="flex-1 container mx-auto pt-28 pb-16 px-4 max-w-3xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <FileText size={20} className="text-primary" />
        </div>
        <h1 className="text-3xl font-heading font-bold">Terms of Service</h1>
      </div>

      <GlassCard hover={false} className="p-8 space-y-6">
        <section>
          <h2 className="text-lg font-heading font-semibold mb-2">1. Acceptance of Terms</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            By accessing or using OmniCredits, you agree to be bound by these Terms of Service. If you do not agree, please do not use our platform.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-heading font-semibold mb-2">2. OmniCredits (OC)</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            OmniCredits are a digital currency used to access AI services on our platform. Credits are non-refundable and non-transferable except through our official gift card system. Credits do not expire.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-heading font-semibold mb-2">3. Gift Cards</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Gift cards are single-use and can only be redeemed once. The sender is responsible for ensuring the recipient's email is correct. We are not liable for gift cards sent to incorrect addresses.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-heading font-semibold mb-2">4. Acceptable Use</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            You agree not to use our AI services to generate harmful, illegal, or misleading content. We reserve the right to suspend accounts that violate this policy.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-heading font-semibold mb-2">5. Limitation of Liability</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            OmniCredits is provided "as is" without warranties. We are not liable for any indirect, incidental, or consequential damages arising from your use of the platform.
          </p>
        </section>
        <p className="text-xs text-muted-foreground pt-4 border-t" style={{ borderColor: "hsl(var(--border))" }}>
          Last updated: March 2026
        </p>
      </GlassCard>
    </div>
    <AppFooter />
  </div>
);

export default Terms;
