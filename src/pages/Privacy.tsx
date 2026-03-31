import AppHeader from "@/components/redesign/AppHeader";
import AppFooter from "@/components/redesign/AppFooter";
import GlassCard from "@/components/redesign/GlassCard";
import { Shield } from "lucide-react";

const Privacy = () => (
  <div className="min-h-screen bg-background flex flex-col">
    <AppHeader />
    <div className="flex-1 container mx-auto pt-28 pb-16 px-4 max-w-3xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Shield size={20} className="text-primary" />
        </div>
        <h1 className="text-3xl font-heading font-bold">Privacy Policy</h1>
      </div>

      <GlassCard hover={false} className="p-8 space-y-6">
        <section>
          <h2 className="text-lg font-heading font-semibold mb-2">1. Information We Collect</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            We collect information you provide directly, such as your name, email address, and payment information when you create an account or purchase OmniCredits. We also collect usage data including how you interact with our AI services.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-heading font-semibold mb-2">2. How We Use Your Information</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Your information is used to provide and improve our services, process transactions, send gift cards, and communicate with you about your account. We do not sell your personal data to third parties.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-heading font-semibold mb-2">3. Data Security</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            We implement industry-standard security measures including encryption, secure data storage, and regular security audits to protect your personal information.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-heading font-semibold mb-2">4. Cookies & Tracking</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            We use essential cookies to maintain your session and preferences. Analytics cookies help us understand how our platform is used. You can manage cookie preferences in your browser settings.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-heading font-semibold mb-2">5. Your Rights</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            You have the right to access, correct, or delete your personal data. You may also request a copy of your data or ask us to restrict processing. Contact us at privacy@omnicredits.com.
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

export default Privacy;
