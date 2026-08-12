import { motion } from "framer-motion";
import { Pause, Play, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { formatTime } from "@/data/music";
import type { AudioPlayer } from "@/hooks/useAudioPlayer";

export function MusicPlayer({ player }: { player: AudioPlayer }) {
  const { current, playing, progress, duration, volume } = player;
  const total = duration || current.duration;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="glass-strong pointer-events-auto w-full max-w-[720px] rounded-[28px] px-4 py-3 sm:rounded-[60px] sm:px-6 sm:py-4"
    >
      <div className="flex items-center gap-3 sm:gap-5">
        <motion.img
          src={current.art}
          alt={`${current.title} artwork`}
          loading="lazy"
          className="size-12 shrink-0 rounded-full object-cover ring-1 ring-white/15 sm:size-16"
          animate={playing ? { rotate: 360 } : { rotate: 0 }}
          transition={playing ? { duration: 28, repeat: Infinity, ease: "linear" } : { duration: 0.3 }}
        />

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-white sm:text-base">{current.title}</p>
          <p className="truncate text-xs text-white/55">{current.artist}</p>
          <p className="hidden truncate text-xs text-white/35 sm:block">{current.album}</p>
          <div className="mt-2 flex items-center gap-2">
            <input
              type="range"
              min={0}
              max={Math.max(1, total)}
              value={Math.min(progress, total)}
              onChange={(e) => player.seek(Number(e.target.value))}
              aria-label="Seek"
              className="h-1 w-full cursor-pointer appearance-none rounded-full bg-white/20 accent-flow-orange"
            />
            <span className="shrink-0 font-mono text-[10px] text-white/55">
              {formatTime(progress)} / {formatTime(total)}
            </span>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
          <button onClick={player.prev} aria-label="Previous track" className="p-1.5 text-white/70 transition hover:text-white">
            <SkipBack className="size-5" />
          </button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={player.toggle}
            aria-label={playing ? "Pause" : "Play"}
            className="grid size-12 place-items-center rounded-full bg-flow-cream text-neutral-900 shadow-lg sm:size-14"
          >
            {playing ? <Pause className="size-5 fill-current" /> : <Play className="size-5 translate-x-[1px] fill-current" />}
          </motion.button>
          <button onClick={player.next} aria-label="Next track" className="p-1.5 text-white/70 transition hover:text-white">
            <SkipForward className="size-5" />
          </button>
          <div className="hidden items-center gap-2 pl-1 sm:flex">
            <Volume2 className="size-4 text-white/60" />
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(e) => player.setVolume(Number(e.target.value))}
              aria-label="Volume"
              className="h-1 w-20 cursor-pointer appearance-none rounded-full bg-white/20 accent-flow-cream"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}