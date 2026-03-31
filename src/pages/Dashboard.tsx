import { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageSquare, Image, Video, Code, CreditCard, Gift, ArrowRight } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import CreditFeedback from "@/components/CreditFeedback";
import AppHeader from "@/components/redesign/AppHeader";
import AppFooter from "@/components/redesign/AppFooter";
import GlassCard from "@/components/redesign/GlassCard";
import AnimatedCounter from "@/components/redesign/AnimatedCounter";

const SERVICES = [
  { key: "chat", icon: MessageSquare, title: "Chat with AI", cost: 1, color: "hsl(var(--primary))", uses: 742 },
  { key: "image", icon: Image, title: "Generate Images", cost: 5, color: "hsl(var(--secondary))", uses: 148 },
  { key: "video", icon: Video, title: "Create Video", cost: 25, color: "hsl(var(--color-warning))", uses: 29 },
  { key: "code", icon: Code, title: "Build Something", cost: 10, color: "#EC4899", uses: 74 },
];

const ACTIVITY = [
  { type: "chat", desc: "Asked about meal planning", time: "2h ago", credits: -1 },
  { type: "image", desc: "Generated a sunset cityscape", time: "Yesterday", credits: -5 },
  { type: "gift", desc: "Received gift from Sarah", time: "3 days ago", credits: +100 },
];

const MOCK_RESPONSES = [
  "Here's a creative story about a robot learning to paint...",
  "I've drafted an essay on the future of renewable energy...",
  "Here are 5 marketing taglines for your project...",
  "Let me help you brainstorm ideas for your app...",
];

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [credits, setCredits] = useState(742);
  const [feedbackAmount, setFeedbackAmount] = useState<number | null>(null);
  const [feedbackKey, setFeedbackKey] = useState(0);
  const [activeSvc, setActiveSvc] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<{ role: string; content: string }[]>([]);
  const [chatInput, setChatInput] = useState("");

  const deductCredits = useCallback((amount: number) => {
    setCredits(prev => Math.max(0, prev - amount));
    setFeedbackAmount(amount);
    setFeedbackKey(prev => prev + 1);
    setTimeout(() => setFeedbackAmount(null), 1500);
  }, []);

  const handleChatSend = () => {
    if (!chatInput.trim() || credits < 1) return;
    const userMsg = chatInput;
    setChatInput("");
    setChatMessages(prev => [...prev, { role: "user", content: userMsg }]);
    deductCredits(1);
    setTimeout(() => {
      setChatMessages(prev => [...prev, { role: "ai", content: MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)] }]);
    }, 800);
  };

  if (!user) {
    navigate("/auth");
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence>
        <CreditFeedback key={feedbackKey} amount={feedbackAmount} />
      </AnimatePresence>
      <AppHeader />

      <section className="py-10 px-6 min-h-[80vh]">
        <div className="max-w-[1200px] mx-auto">
          {/* Balance Card */}
          <GlassCard className="p-0 overflow-hidden mb-8" hover={false}>
            <div className="flex flex-wrap">
              <div className="flex-1 min-w-[360px] p-9">
                <p className="text-[13px] font-medium text-muted-foreground uppercase tracking-wider">Your Balance</p>
                <div className="mt-2 flex items-baseline gap-2">
                  <AnimatedCounter value={credits} className="text-[56px] font-bold tracking-[-2px] leading-none" />
                  <span className="text-base text-muted-foreground font-medium">OC</span>
                </div>
                <div className="mt-4 flex gap-2.5">
                  <Link to="/purchase">
                    <Button size="sm" className="rounded-full gap-1.5" style={{ background: "var(--cta-gradient)" }}>
                      <Gift size={14} /> Gift Credits
                    </Button>
                  </Link>
                  <Link to="/purchase">
                    <Button size="sm" variant="outline" className="rounded-full gap-1.5">
                      <CreditCard size={14} /> Buy More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex-1 min-w-[300px] p-9 border-l" style={{ borderColor: "hsl(var(--border))" }}>
                <p className="text-[13px] font-medium text-muted-foreground uppercase tracking-wider mb-4">Estimated Uses</p>
                <div className="grid grid-cols-2 gap-4">
                  {SERVICES.map(({ icon: I, title, uses, color }) => (
                    <div key={title} className="flex items-center gap-2.5">
                      <I size={16} style={{ color }} />
                      <div>
                        <p className="text-lg font-bold text-foreground">{uses}</p>
                        <p className="text-[11px] text-muted-foreground">{title.split(" ").slice(-1)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Chat or active view */}
          <AnimatePresence mode="wait">
            {activeSvc === "chat" && (
              <motion.div key="chat" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="max-w-2xl mx-auto mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold text-lg">Chat with AI</h2>
                  <Button variant="ghost" size="sm" onClick={() => { setActiveSvc(null); setChatMessages([]); }}>Close</Button>
                </div>
                <GlassCard hover={false} className="p-4 min-h-[300px] flex flex-col">
                  <div className="flex-1 space-y-3 overflow-y-auto mb-4 max-h-[400px]">
                    {chatMessages.length === 0 && <p className="text-muted-foreground text-sm text-center mt-12">Start a conversation...</p>}
                    {chatMessages.map((msg, i) => (
                      <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[80%] rounded-xl px-4 py-2 text-sm ${msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>
                          {msg.content}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      value={chatInput}
                      onChange={e => setChatInput(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && handleChatSend()}
                      placeholder="Type a message... (1 OC per prompt)"
                      className="flex-1 bg-muted rounded-lg px-4 py-2 text-sm border focus:outline-none focus:ring-1 focus:ring-primary"
                      style={{ borderColor: "hsl(var(--border))" }}
                    />
                    <Button size="sm" onClick={handleChatSend} disabled={!chatInput.trim() || credits < 1}>Send</Button>
                  </div>
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Create Something */}
          {activeSvc !== "chat" && (
            <>
              <h3 className="text-xl font-bold text-foreground mb-4">Create Something</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {SERVICES.map(({ key, icon: I, title, cost, color }) => (
                  <GlassCard
                    key={key}
                    onClick={() => {
                      if (key === "chat") setActiveSvc("chat");
                      else if (credits >= cost) deductCredits(cost);
                    }}
                    className={`flex items-center gap-4 p-5 ${activeSvc === key ? "border-2" : ""}`}
                    style={activeSvc === key ? { borderColor: color } : undefined}
                  >
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${color}15` }}>
                      <I size={20} style={{ color }} />
                    </div>
                    <div className="flex-1">
                      <p className="text-[15px] font-semibold text-foreground">{title}</p>
                      <p className="text-[13px] font-medium" style={{ color }}>{cost} OC per use</p>
                    </div>
                    <ArrowRight size={16} className="text-muted-foreground" />
                  </GlassCard>
                ))}
              </div>
            </>
          )}

          {/* Recent Activity */}
          <h3 className="text-xl font-bold text-foreground mb-4">Recent Activity</h3>
          <GlassCard hover={false} className="p-0">
            {ACTIVITY.map((item, i) => (
              <div key={i} className="flex items-center justify-between px-6 py-4" style={{ borderBottom: i < ACTIVITY.length - 1 ? "1px solid hsl(var(--border))" : "none" }}>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-[10px] accent-soft flex items-center justify-center">
                    {item.type === "chat" && <MessageSquare size={16} className="text-primary" />}
                    {item.type === "image" && <Image size={16} className="text-secondary" />}
                    {item.type === "gift" && <Gift size={16} className="text-warning" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.desc}</p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                </div>
                <span className={`text-sm font-semibold ${item.credits > 0 ? "text-success" : "text-muted-foreground"}`}>
                  {item.credits > 0 ? "+" : ""}{item.credits} OC
                </span>
              </div>
            ))}
          </GlassCard>
        </div>
      </section>

      <AppFooter />
    </div>
  );
};

export default Dashboard;
