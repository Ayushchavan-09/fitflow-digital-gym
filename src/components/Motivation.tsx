import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { quotes } from "@/data/workouts";

export function Motivation() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % quotes.length), 12000);
    return () => clearInterval(id);
  }, []);
  const q = quotes[i]!;
  return (
    <div className="pointer-events-none select-none text-left">
      <AnimatePresence mode="wait">
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.6 }}
          className="text-shadow-soft font-display text-lg leading-tight tracking-wide text-white/70"
        >
          <div>{q[0]}</div>
          <div className="text-flow-orange/80">{q[1]}</div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}