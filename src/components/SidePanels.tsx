import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { classes, leaders } from "@/data/classes";

export function ClassCard({ onBook }: { onBook: () => void }) {
  const next = classes[0]!;
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.7, duration: 0.7 }}
      className="glass pointer-events-auto w-[240px] rounded-3xl p-4"
    >
      <p className="font-mono text-[10px] tracking-[0.24em] text-white/45">NEXT CLASS</p>
      <h3 className="mt-1 font-display text-2xl tracking-wide text-flow-cream">{next.name}</h3>
      <p className="text-xs text-white/60">{next.when}</p>
      <p className="mt-0.5 text-xs text-white/40">Coach {next.coach} • {next.spots} spots left</p>
      <button
        onClick={onBook}
        className="group mt-3 flex items-center gap-1.5 font-mono text-[10px] tracking-[0.18em] text-flow-orange"
      >
        BOOK YOUR SPOT
        <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
      </button>
    </motion.div>
  );
}

export function ProgressCard() {
  const pct = 78;
  const r = 26;
  const c = 2 * Math.PI * r;
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.8, duration: 0.7 }}
      className="glass pointer-events-auto w-[240px] rounded-3xl p-4"
    >
      <p className="font-mono text-[10px] tracking-[0.24em] text-white/45">YOUR PROGRESS</p>
      <div className="mt-2 flex items-center gap-4">
        <div className="relative size-16 shrink-0">
          <svg viewBox="0 0 64 64" className="size-16 -rotate-90">
            <circle cx="32" cy="32" r={r} fill="none" stroke="currentColor" strokeWidth="5" className="text-white/12" />
            <motion.circle
              cx="32"
              cy="32"
              r={r}
              fill="none"
              stroke="var(--color-flow-orange)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={c}
              initial={{ strokeDashoffset: c }}
              animate={{ strokeDashoffset: c * (1 - pct / 100) }}
              transition={{ duration: 1.4, delay: 1, ease: "easeOut" }}
            />
          </svg>
          <span className="absolute inset-0 grid place-items-center font-mono text-xs text-flow-cream">
            {pct}%
          </span>
        </div>
        <div className="min-w-0 text-xs text-white/60">
          <p className="text-white/80">Goals completed</p>
          <p className="mt-1"><span className="font-mono text-flow-cream">12</span> workouts this month</p>
          <p><span className="font-mono text-flow-cream">6</span> day streak</p>
          <p><span className="font-mono text-flow-cream">87 kg</span> squat PR</p>
        </div>
      </div>
    </motion.div>
  );
}

export function CommunityCard({ active }: { active: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.9, duration: 0.7 }}
      className="glass pointer-events-auto w-[240px] rounded-3xl p-4"
    >
      <p className="font-mono text-[10px] tracking-[0.24em] text-white/45">MEMBERS TRAINING NOW</p>
      <p className="mt-1 flex items-center gap-2 text-sm text-white/85">
        <span className="size-2 rounded-full bg-flow-live" /> {active} active
      </p>
      <p className="mt-3 font-mono text-[10px] tracking-[0.24em] text-white/45">TOP THIS WEEK</p>
      <ul className="mt-1 space-y-1">
        {leaders.map((l) => (
          <li key={l.rank} className="flex items-center justify-between text-xs">
            <span className="text-white/80">
              <span className="font-mono text-white/40">{l.rank}</span> — {l.name}
            </span>
            <span className="text-white/40">{l.note}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}