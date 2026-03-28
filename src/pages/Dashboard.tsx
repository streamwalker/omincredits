import { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageSquare, Image, Video, Code, LogOut, CreditCard, Zap, Handshake } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import CreditFeedback from "@/components/CreditFeedback";

const ACTIONS = [
  {
    icon: MessageSquare,
    title: "Chat with AI",
    desc: "Ask anything, write content, brainstorm ideas",
    cost: 1,
    color: "from-primary to-primary/60",
  },
  {
    icon: Image,
    title: "Generate Images",
    desc: "Create stunning visuals from text prompts",
    cost: 5,
    color: "from-secondary to-secondary/60",
  },
  {
    icon: Video,
    title: "Create Video",
    desc: "Produce short AI-generated videos",
    cost: 25,
    color: "from-accent to-accent/60",
  },
  {
    icon: Code,
    title: "Build Something",
    desc: "Code projects with AI assistance",
    cost: 10,
    color: "from-primary to-accent",
  },
];

const MOCK_RESPONSES = [
  "Here's a creative story about a robot learning to paint...",
  "I've drafted an essay on the future of renewable energy...",
  "Here are 5 marketing taglines for your project...",
  "Let me help you brainstorm ideas for your app...",
];

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [credits, setCredits] = useState(742);
  const [feedbackAmount, setFeedbackAmount] = useState<number | null>(null);
  const [feedbackKey, setFeedbackKey] = useState(0);
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<{ role: string; content: string }[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [usedToday, setUsedToday] = useState(0);

  const deductCredits = useCallback((amount: number) => {
    setCredits((prev) => Math.max(0, prev - amount));
    setUsedToday((prev) => prev + amount);
    setFeedbackAmount(amount);
    setFeedbackKey((prev) => prev + 1);
    setTimeout(() => setFeedbackAmount(null), 1500);
  }, []);

  const handleChatSend = () => {
    if (!chatInput.trim() || credits < 1) return;
    const userMsg = chatInput;
    setChatInput("");
    setChatMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    deductCredits(1);

    // Mock AI response
    setTimeout(() => {
      const response = MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)];
      setChatMessages((prev) => [...prev, { role: "ai", content: response }]);
    }, 800);
  };

  const handleAction = (action: typeof ACTIONS[0]) => {
    if (credits < action.cost) return;
    if (action.title === "Chat with AI") {
      setActiveAction("chat");
    } else {
      deductCredits(action.cost);
      setActiveAction(action.title);
      setTimeout(() => setActiveAction(null), 2000);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence>
        <CreditFeedback key={feedbackKey} amount={feedbackAmount} />
      </AnimatePresence>

      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-border/30">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <Link to="/" className="font-heading font-bold text-lg tracking-wider gradient-text">
            STREAMWALKERS
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 glass rounded-full px-4 py-1.5">
              <Zap className="w-4 h-4 text-primary" />
              <span className="font-heading font-bold text-sm">{credits} OC</span>
            </div>
            <Button variant="ghost" size="icon" onClick={handleSignOut}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto pt-24 pb-16 px-4">
        {/* Credit Balance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <p className="text-sm text-muted-foreground mb-1">Credits Remaining</p>
          <p className="text-6xl font-heading font-bold gradient-text">{credits}</p>
          <p className="text-sm text-muted-foreground mt-1">OmniCredits™</p>
        </motion.div>

        {/* Active Action View: Chat */}
        <AnimatePresence mode="wait">
          {activeAction === "chat" ? (
            <motion.div
              key="chat"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto mb-8"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-heading font-bold text-lg">Chat with AI</h2>
                <Button variant="ghost" size="sm" onClick={() => { setActiveAction(null); setChatMessages([]); }}>
                  Close
                </Button>
              </div>
              <div className="glass rounded-xl p-4 min-h-[300px] flex flex-col">
                <div className="flex-1 space-y-3 overflow-y-auto mb-4 max-h-[400px]">
                  {chatMessages.length === 0 && (
                    <p className="text-muted-foreground text-sm text-center mt-12">Start a conversation...</p>
                  )}
                  {chatMessages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[80%] rounded-xl px-4 py-2 text-sm ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground"
                      }`}>
                        {msg.content}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleChatSend()}
                    placeholder="Type a message... (1 OC per prompt)"
                    className="flex-1 bg-muted rounded-lg px-4 py-2 text-sm border border-border focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <Button
                    size="sm"
                    onClick={handleChatSend}
                    disabled={!chatInput.trim() || credits < 1}
                    className="bg-primary text-primary-foreground"
                  >
                    Send
                  </Button>
                </div>
              </div>
            </motion.div>
          ) : activeAction && activeAction !== "chat" ? (
            <motion.div
              key="mock"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-md mx-auto text-center glass rounded-xl p-8 mb-8"
            >
              <p className="text-muted-foreground text-sm">Processing...</p>
              <p className="font-heading font-bold mt-2">{activeAction}</p>
              <p className="text-xs text-muted-foreground mt-1">Coming soon — feature in development</p>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* Action Grid */}
        {!activeAction && (
          <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto mb-12">
            {ACTIONS.map((action, i) => (
              <motion.button
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => handleAction(action)}
                disabled={credits < action.cost}
                className="glass glow-border rounded-xl p-6 text-left hover:bg-card/80 transition-all disabled:opacity-40 disabled:cursor-not-allowed group"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-4`}>
                  <action.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-heading font-semibold mb-1">{action.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{action.desc}</p>
                <span className="text-xs font-heading text-primary">{action.cost} OC per use</span>
              </motion.button>
            ))}
          </div>
        )}

        {/* Usage Panel & Reload */}
        <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-4">
          <div className="glass rounded-xl p-6">
            <h3 className="font-heading font-semibold mb-4 text-sm text-muted-foreground">Usage Today</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Credits Used</span>
                <span className="font-heading font-bold">{usedToday} OC</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Remaining</span>
                <span className="font-heading font-bold gradient-text">{credits} OC</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Est. Chat Prompts Left</span>
                <span className="font-heading font-bold">{credits}</span>
              </div>
            </div>
          </div>

          <div className="glass rounded-xl p-6 flex flex-col items-center justify-center text-center">
            {credits < 50 ? (
              <>
                <CreditCard className="w-8 h-8 text-accent mb-2" />
                <p className="font-heading font-semibold mb-1">Running Low!</p>
                <p className="text-sm text-muted-foreground mb-4">Top up your credits to keep creating</p>
              </>
            ) : (
              <>
                <CreditCard className="w-8 h-8 text-primary mb-2" />
                <p className="font-heading font-semibold mb-1">Need More?</p>
                <p className="text-sm text-muted-foreground mb-4">Buy credits or gift to a friend</p>
              </>
            )}
            <Link to="/purchase">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-heading">
                Buy More Credits
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
