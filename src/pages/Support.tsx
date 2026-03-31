import { useState } from "react";
import AppHeader from "@/components/redesign/AppHeader";
import AppFooter from "@/components/redesign/AppFooter";
import GlassCard from "@/components/redesign/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LifeBuoy, Mail, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Support = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message sent!", description: "We'll get back to you within 24 hours." });
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppHeader />
      <div className="flex-1 container mx-auto pt-28 pb-16 px-4 max-w-3xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <LifeBuoy size={20} className="text-primary" />
          </div>
          <h1 className="text-3xl font-heading font-bold">Support</h1>
        </div>

        <div className="grid gap-4 md:grid-cols-2 mb-8">
          <GlassCard className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Mail size={18} className="text-primary" />
            </div>
            <div>
              <p className="font-heading font-semibold text-sm">Email Us</p>
              <p className="text-muted-foreground text-xs mt-1">support@omnicredits.com</p>
              <p className="text-muted-foreground text-xs">Response within 24 hours</p>
            </div>
          </GlassCard>
          <GlassCard className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
              <MessageSquare size={18} className="text-secondary" />
            </div>
            <div>
              <p className="font-heading font-semibold text-sm">Live Chat</p>
              <p className="text-muted-foreground text-xs mt-1">Available Mon–Fri, 9am–5pm EST</p>
              <p className="text-muted-foreground text-xs">Typical wait: &lt;5 minutes</p>
            </div>
          </GlassCard>
        </div>

        <GlassCard hover={false} className="p-8">
          <h2 className="text-lg font-heading font-semibold mb-4">Send us a message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Name</label>
              <Input placeholder="Your name" value={name} onChange={e => setName(e.target.value)} className="bg-muted border-border" required />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Email</label>
              <Input type="email" placeholder="you@email.com" value={email} onChange={e => setEmail(e.target.value)} className="bg-muted border-border" required />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Message</label>
              <Textarea placeholder="How can we help?" value={message} onChange={e => setMessage(e.target.value)} className="bg-muted border-border resize-none" rows={4} required />
            </div>
            <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-heading font-semibold">
              Send Message
            </Button>
          </form>
        </GlassCard>
      </div>
      <AppFooter />
    </div>
  );
};

export default Support;
