import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

const LINKS = [
  { label: "Privacy", to: "/privacy" },
  { label: "Terms", to: "/terms" },
  { label: "Support", to: "/support" },
  { label: "FAQ", to: "/faq" },
];

const AppFooter = () => (
  <footer className="border-t py-10 px-6" style={{ background: "hsl(var(--muted))", borderColor: "hsl(var(--border))" }}>
    <div className="max-w-[1200px] mx-auto flex justify-between items-center flex-wrap gap-4">
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "var(--accent-gradient)" }}>
          <Sparkles size={14} className="text-white" />
        </div>
        <span className="font-bold text-[15px] text-foreground">OmniCredits</span>
        <span className="text-xs text-muted-foreground ml-1">by Streamwalkers</span>
      </div>
      <div className="flex gap-6">
        {LINKS.map(item => (
          <Link key={item.label} to={item.to} className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  </footer>
);

export default AppFooter;
