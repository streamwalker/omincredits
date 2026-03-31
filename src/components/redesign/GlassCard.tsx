import { cn } from "@/lib/utils";
import { type ReactNode, type HTMLAttributes } from "react";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hover?: boolean;
}

const GlassCard = ({ children, hover = true, className, ...props }: GlassCardProps) => (
  <div
    className={cn(
      "glass rounded-[20px] p-6 transition-all duration-400",
      hover && "hover:shadow-[var(--shadow-hover)] hover:-translate-y-0.5 cursor-pointer",
      className
    )}
    style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
    {...props}
  >
    {children}
  </div>
);

export default GlassCard;
