import { useState, useEffect } from "react";

interface AnimatedCounterProps {
  value: number;
  className?: string;
}

const AnimatedCounter = ({ value, className }: AnimatedCounterProps) => {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const dur = 1200;
    const start = performance.now();
    const run = (time: number) => {
      const p = Math.min((time - start) / dur, 1);
      setDisplay(Math.round((1 - Math.pow(1 - p, 3)) * value));
      if (p < 1) requestAnimationFrame(run);
    };
    requestAnimationFrame(run);
  }, [value]);

  return (
    <span className={className} style={{ background: "var(--accent-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
      {display.toLocaleString()}
    </span>
  );
};

export default AnimatedCounter;
