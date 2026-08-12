import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function BrandHero({ onJoin }: { onJoin: () => void }) {
  return (
    <div className="pointer-events-none flex flex-col items-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="select-none leading-[0.82]"
      >
        <div className="font-brush text-[clamp(3.4rem,11vw,9rem)] text-white text-shadow-soft">
          FIT
        </div>
        <div
          className="font-brush text-[clamp(3rem,9vw,7.5rem)] text-flow-cream"
          style={{
            textShadow:
              "0 0 12px var(--color-flow-orange), 0 0 34px color-mix(in oklab, var(--color-flow-ember) 85%, transparent), 0 0 70px color-mix(in oklab, var(--color-flow-ember) 55%, transparent)",
          }}
        >
          &amp;
        </div>
        <div className="font-brush text-[clamp(3.4rem,11vw,9rem)] text-white text-shadow-soft">
          FLOW
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-shadow-soft mt-3 text-lg text-flow-cream/90 sm:text-2xl"
      >
        फिट &amp; फ्लो
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.65, duration: 0.8 }}
        className="text-shadow-soft mt-1 font-mono text-[11px] tracking-[0.24em] text-white/70 sm:text-xs"
      >
        MOVE. TRAIN. FLOW. REPEAT.
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.98 }}
        onClick={onJoin}
        className="glass group pointer-events-auto mt-6 flex items-center gap-2 rounded-full border-flow-orange/50 px-6 py-3 text-xs font-semibold tracking-[0.18em] text-flow-cream transition-colors hover:bg-flow-orange/20 sm:text-sm"
        style={{ boxShadow: "0 12px 40px -14px color-mix(in oklab, var(--color-flow-orange) 60%, transparent)" }}
      >
        JOIN THE MOVEMENT
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
      </motion.button>
    </div>
  );
}