import { motion } from "framer-motion";

export type Hotspot = {
  id: string;
  label: string;
  /** percentage positions relative to the background image */
  x: number;
  y: number;
  w: number;
  h: number;
};

export const hotspots: Hotspot[] = [
  { id: "library", label: "Workout Library", x: 2, y: 48, w: 12, h: 42 },
  { id: "session", label: "Start Workout", x: 15, y: 50, w: 18, h: 42 },
  { id: "motivation", label: "Motivation Wall", x: 28, y: 18, w: 9, h: 12 },
  { id: "community", label: "Community", x: 70, y: 20, w: 16, h: 18 },
  { id: "flow", label: "Flow Studio", x: 82, y: 60, w: 17, h: 34 },
  { id: "radio", label: "Fit & Flow Radio", x: 60, y: 60, w: 14, h: 30 },
];

export function InteractiveGym({ onSelect }: { onSelect: (id: string) => void }) {
  return (
    <div className="pointer-events-none absolute inset-0">
      {hotspots.map((h) => (
        <motion.button
          key={h.id}
          onClick={() => onSelect(h.id)}
          aria-label={h.label}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="pointer-events-auto absolute hidden rounded-3xl border border-flow-orange/40 bg-flow-orange/10 backdrop-blur-[1px] md:block"
          style={{ left: `${h.x}%`, top: `${h.y}%`, width: `${h.w}%`, height: `${h.h}%` }}
        >
          <span className="glass absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-3 py-1 font-mono text-[10px] tracking-[0.18em] text-flow-cream">
            {h.label.toUpperCase()}
          </span>
        </motion.button>
      ))}
    </div>
  );
}