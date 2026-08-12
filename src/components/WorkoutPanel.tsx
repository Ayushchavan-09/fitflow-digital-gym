import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { modes, type Mode } from "@/data/workouts";

export function WorkoutCard({
  mode,
  onModeChange,
  onExpand,
}: {
  mode: Mode;
  onModeChange: (id: string) => void;
  onExpand: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6, duration: 0.7 }}
      className="glass pointer-events-auto w-[260px] rounded-3xl p-4"
    >
      <p className="font-mono text-[10px] tracking-[0.24em] text-white/45">TODAY'S WORKOUT</p>
      <div className="mt-1 flex flex-wrap gap-1">
        {modes.map((m) => (
          <button
            key={m.id}
            onClick={() => onModeChange(m.id)}
            className={`rounded-full px-2 py-0.5 font-mono text-[9px] tracking-[0.14em] transition ${
              m.id === mode.id
                ? "bg-flow-orange/25 text-flow-cream"
                : "text-white/45 hover:text-white/80"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={mode.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          <h3 className="mt-3 font-display text-2xl tracking-wide text-flow-cream">{mode.title}</h3>
          <ul className="mt-2 space-y-1.5">
            {mode.exercises.map((e) => (
              <li key={e.name} className="flex items-center justify-between gap-3 text-xs">
                <span className="truncate text-white/80">{e.name}</span>
                <span className="shrink-0 font-mono text-[10px] text-white/45">{e.scheme}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </AnimatePresence>
      <button
        onClick={onExpand}
        className="group mt-3 flex items-center gap-1.5 font-mono text-[10px] tracking-[0.18em] text-flow-orange"
      >
        VIEW FULL WORKOUT
        <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
      </button>
    </motion.div>
  );
}