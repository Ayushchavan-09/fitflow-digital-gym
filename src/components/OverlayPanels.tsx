import { useState } from "react";
import { motion } from "framer-motion";
import { Panel } from "./Panel";
import { classes, plans } from "@/data/classes";
import { exerciseLibrary, quotes, type Mode } from "@/data/workouts";

export function MembershipPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Panel open={open} onClose={onClose} title="JOIN THE MOVEMENT" subtitle="Three ways to train at Fit & Flow" wide>
      <div className="grid gap-4 sm:grid-cols-3">
        {plans.map((p) => (
          <motion.div
            key={p.id}
            whileHover={{ y: -4 }}
            className={`rounded-3xl border p-5 ${
              p.featured ? "border-flow-orange/60 bg-flow-orange/10" : "border-white/12 bg-white/5"
            }`}
          >
            <h3 className="font-display text-3xl tracking-wide text-flow-cream">{p.name}</h3>
            <p className="font-mono text-sm text-white/70">{p.price} / month</p>
            <ul className="mt-3 space-y-1.5 text-xs text-white/65">
              {p.perks.map((perk) => (
                <li key={perk}>— {perk}</li>
              ))}
            </ul>
            <button className="mt-5 w-full rounded-full border border-white/20 bg-white/10 py-2.5 font-mono text-[11px] tracking-[0.18em] text-flow-cream transition hover:bg-flow-orange/25">
              JOIN NOW
            </button>
          </motion.div>
        ))}
      </div>
    </Panel>
  );
}

export function BookingPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [booked, setBooked] = useState<string | null>(null);
  return (
    <Panel open={open} onClose={onClose} title="CLASS SCHEDULE" subtitle="Reserve your spot on the floor">
      <div className="space-y-2">
        {classes.map((c) => (
          <div key={c.name} className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 px-4 py-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white/90">{c.name}</p>
              <p className="truncate text-xs text-white/50">{c.when} • Coach {c.coach}</p>
            </div>
            <button
              onClick={() => setBooked(c.name)}
              className={`shrink-0 rounded-full px-4 py-1.5 font-mono text-[10px] tracking-[0.16em] transition ${
                booked === c.name
                  ? "bg-flow-live/25 text-flow-live"
                  : "border border-white/20 text-flow-cream hover:bg-flow-orange/25"
              }`}
            >
              {booked === c.name ? "BOOKED" : `BOOK • ${c.spots}`}
            </button>
          </div>
        ))}
      </div>
    </Panel>
  );
}

export function FullWorkoutPanel({
  open,
  onClose,
  mode,
}: {
  open: boolean;
  onClose: () => void;
  mode: Mode;
}) {
  return (
    <Panel open={open} onClose={onClose} title={mode.title} subtitle={mode.note} wide>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          {mode.exercises.map((e, i) => (
            <div key={e.name} className="flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3">
              <span className="text-sm text-white/85">
                <span className="font-mono text-xs text-white/35">{(i + 1).toString().padStart(2, "0")}</span> {e.name}
              </span>
              <span className="font-mono text-xs text-flow-orange">{e.scheme}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3">
          {exerciseLibrary.map((g) => (
            <div key={g.group} className="rounded-2xl border border-white/10 p-4">
              <p className="font-display text-xl tracking-wide text-flow-cream">{g.group}</p>
              <ul className="mt-1 space-y-1 text-xs text-white/55">
                {g.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}

export function MotivationWallPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Panel open={open} onClose={onClose} title="MOTIVATION WALL" subtitle="LIMITLESS — written on the bricks">
      <div className="space-y-3">
        {quotes.map((q) => (
          <p key={q[0]} className="font-display text-2xl leading-tight tracking-wide text-white/85">
            {q[0]} <span className="text-flow-orange">{q[1]}</span>
          </p>
        ))}
      </div>
    </Panel>
  );
}

export function InstallPanel({
  open,
  onClose,
  onInstall,
  canInstall,
}: {
  open: boolean;
  onClose: () => void;
  onInstall: () => void;
  canInstall: boolean;
}) {
  return (
    <Panel open={open} onClose={onClose} title="FIT & FLOW" subtitle="Your gym. Your music. Your progress. Anywhere.">
      <p className="text-sm text-white/65">
        {canInstall
          ? "Install Fit & Flow to your home screen for a full-screen, offline-friendly club experience."
          : "Your browser hasn't offered installation right now. On iPhone use Share → Add to Home Screen; on desktop Chrome look for the install icon in the address bar."}
      </p>
      <div className="mt-5 flex gap-3">
        <button
          onClick={onInstall}
          disabled={!canInstall}
          className="rounded-full bg-flow-cream px-6 py-2.5 font-mono text-[11px] tracking-[0.18em] text-neutral-900 transition disabled:opacity-40"
        >
          INSTALL
        </button>
        <button
          onClick={onClose}
          className="rounded-full border border-white/20 px-6 py-2.5 font-mono text-[11px] tracking-[0.18em] text-white/70"
        >
          CLOSE
        </button>
      </div>
    </Panel>
  );
}

export function InfoPanel({
  open,
  onClose,
  title,
  body,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  body: string;
}) {
  return (
    <Panel open={open} onClose={onClose} title={title}>
      <p className="text-sm text-white/70">{body}</p>
    </Panel>
  );
}