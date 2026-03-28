import { motion } from "framer-motion";

interface DigitalCardProps {
  credits: number;
  recipientEmail?: string;
  message?: string;
}

const DigitalCard = ({ credits, recipientEmail, message }: DigitalCardProps) => {
  return (
    <motion.div
      initial={{ rotateY: -10, scale: 0.95 }}
      animate={{ rotateY: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative w-full max-w-md mx-auto aspect-[1.6/1] rounded-2xl overflow-hidden"
      style={{ perspective: "1000px" }}
    >
      {/* Animated gradient border */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary via-secondary to-accent p-[2px] animate-pulse-glow">
        <div className="w-full h-full rounded-2xl bg-card flex flex-col justify-between p-6 sm:p-8">
          {/* Top */}
          <div className="flex justify-between items-start">
            <span className="text-xs sm:text-sm font-heading font-bold tracking-[0.3em] text-muted-foreground uppercase">
              Streamwalkers
            </span>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary opacity-70" />
          </div>

          {/* Center */}
          <div className="text-center space-y-1">
            <p className="text-3xl sm:text-4xl font-heading font-bold gradient-text">
              {credits} CC
            </p>
            <p className="text-xs text-muted-foreground">Compute Credits</p>
          </div>

          {/* Bottom */}
          <div className="space-y-1">
            {recipientEmail && (
              <p className="text-xs text-muted-foreground truncate">To: {recipientEmail}</p>
            )}
            {message && (
              <p className="text-xs text-foreground/60 italic truncate">"{message}"</p>
            )}
            <p className="text-[10px] text-muted-foreground">Redeem at streamwalkers.com</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DigitalCard;
