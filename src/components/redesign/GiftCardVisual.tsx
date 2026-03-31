import { useRef, useState } from "react";
import { Sparkles, Gift } from "lucide-react";

interface GiftCardVisualProps {
  recipientName?: string;
  amount?: number;
  credits?: number;
}

const GiftCardVisual = ({ recipientName = "Alex", amount = 100, credits = 600 }: GiftCardVisualProps) => {
  const [tX, setTX] = useState(0);
  const [tY, setTY] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setTX(((e.clientY - r.top) / r.height - 0.5) * -12);
    setTY(((e.clientX - r.left) / r.width - 0.5) * 12);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => { setTX(0); setTY(0); }}
      className="w-full max-w-[420px] rounded-[20px] relative overflow-hidden cursor-pointer"
      style={{
        aspectRatio: "1.586",
        background: "var(--gift-card-gradient)",
        transform: `perspective(800px) rotateX(${tX}deg) rotateY(${tY}deg)`,
        transition: "transform 0.15s ease-out",
        boxShadow: "0 20px 60px hsl(var(--primary) / 0.2), 0 8px 24px rgba(0,0,0,0.08)",
      }}
    >
      {/* Overlay sheen */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.15) 100%)" }} />
      {/* Light follow */}
      <div className="absolute pointer-events-none" style={{ top: "-50%", left: "-50%", width: "200%", height: "200%", background: `radial-gradient(circle at ${50 + tY * 3}% ${50 + tX * 3}%, rgba(255,255,255,0.3) 0%, transparent 50%)` }} />

      <div className="relative z-10 p-7 h-full flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[11px] font-bold tracking-[2px] text-white/70 uppercase">OmniCredits</p>
            <p className="text-[10px] text-white/50 mt-0.5">Prepaid AI Credits</p>
          </div>
          <Sparkles size={24} className="text-white/80" />
        </div>
        <div>
          <p className="text-4xl font-extrabold text-white tracking-tight leading-tight">${amount}</p>
          <p className="text-sm text-white/70 mt-1">{credits} Credits</p>
        </div>
        <div className="flex justify-between items-end">
          <div>
            <p className="text-[10px] text-white/50 uppercase tracking-[1px]">For</p>
            <p className="text-base font-semibold text-white">{recipientName}</p>
          </div>
          <Gift size={20} className="text-white/70" />
        </div>
      </div>
    </div>
  );
};

export default GiftCardVisual;
