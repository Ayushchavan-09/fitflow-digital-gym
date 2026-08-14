import { motion } from "framer-motion";

export function BrandHero({ onJoin }: { onJoin?: () => void }) {
  return (
    <div className="pointer-events-none flex flex-col items-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.74, duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
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
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.86, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="text-shadow-soft mt-3 text-lg text-flow-cream/90 sm:text-2xl"
      >
        फिट &amp; फ्लो
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.96, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="text-shadow-soft mt-1 font-mono text-[11px] tracking-[0.24em] text-white/70 sm:text-xs"
      >
        MOVE. TRAIN. FLOW. REPEAT.
      </motion.p>
    </div>
  );
}