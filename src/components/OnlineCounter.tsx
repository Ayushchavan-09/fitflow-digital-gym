import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function OnlineCounter({ count }: { count: number }) {
  return (
    <div className="glass text-shadow-soft flex items-center gap-2 rounded-full px-4 py-1.5">
      <motion.span
        className="size-2 rounded-full bg-flow-live"
        style={{ boxShadow: "0 0 10px var(--color-flow-live)" }}
        animate={{ opacity: [1, 0.35, 1] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
      <span className="font-mono text-xs tracking-[0.14em] text-white/80">
        {count} online
      </span>
    </div>
  );
}

export function useLiveMembers(initial = 483) {
  const [count, setCount] = useState(initial);
  useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => Math.min(540, Math.max(410, c + Math.round((Math.random() - 0.5) * 8))));
    }, 6000);
    return () => clearInterval(id);
  }, []);
  return count;
}