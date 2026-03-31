import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sparkles, Gift, Moon, Sun, LogOut, Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "./ThemeProvider";
import { useAuth } from "@/hooks/useAuth";

const AppHeader = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-300 px-6"
      style={{
        background: scrolled ? "hsl(var(--card) / 0.6)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid hsl(var(--border))" : "1px solid transparent",
      }}
    >
      <div className="max-w-[1200px] mx-auto flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2.5 cursor-pointer">
          <div className="w-8 h-8 rounded-[10px] flex items-center justify-center" style={{ background: "var(--accent-gradient)" }}>
            <Sparkles size={18} className="text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight text-foreground">OmniCredits</span>
        </Link>

        <nav className="flex items-center gap-1.5 flex-wrap">
          <Link to="/">
            <Button variant="ghost" size="sm" className={isActive("/") ? "accent-soft text-primary" : "text-muted-foreground"}>
              Home
            </Button>
          </Link>
          {user && (
            <>
              <Link to="/dashboard">
                <Button variant="ghost" size="sm" className={isActive("/dashboard") ? "accent-soft text-primary" : "text-muted-foreground"}>
                  Dashboard
                </Button>
              </Link>
              <Link to="/partnerships">
                <Button variant="ghost" size="sm" className={isActive("/partnerships") ? "accent-soft text-primary" : "text-muted-foreground"}>
                  <Handshake className="w-4 h-4 mr-1" /> Admin
                </Button>
              </Link>
            </>
          )}

          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full border flex items-center justify-center cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
            style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--card) / 0.6)", backdropFilter: "blur(10px)" }}
          >
            {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
          </button>

          {user ? (
            <Button variant="ghost" size="icon" onClick={signOut} className="text-muted-foreground">
              <LogOut size={16} />
            </Button>
          ) : (
            <Link to="/auth">
              <Button variant="ghost" size="sm" className="text-muted-foreground">Sign In</Button>
            </Link>
          )}

          <Link to="/purchase">
            <Button size="sm" className="rounded-full ml-1 gap-1.5" style={{ background: "var(--cta-gradient)" }}>
              <Gift size={14} /> Send a Gift
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default AppHeader;
