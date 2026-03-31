import { Sparkles } from "lucide-react";

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
        {["Privacy", "Terms", "Support", "FAQ"].map(item => (
          <span key={item} className="text-[13px] text-muted-foreground cursor-pointer hover:text-foreground transition-colors">{item}</span>
        ))}
      </div>
    </div>
  </footer>
);

export default AppFooter;
