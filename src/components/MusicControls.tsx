import { motion } from "framer-motion";
import { Download, ListMusic, Music2, Music4, PlayCircle } from "lucide-react";

function Pill({
  icon,
  label,
  onClick,
  accent,
  delay = 0,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  accent?: string;
  delay?: number;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, y: -12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="glass flex items-center gap-2 rounded-full p-2.5 text-xs font-medium text-white/85 transition-colors hover:bg-white/10 sm:px-4 sm:py-2 sm:text-sm"
      aria-label={label}
    >
      <span className={accent ?? "text-white/70"}>{icon}</span>
      <span className="hidden whitespace-nowrap sm:inline">{label}</span>
    </motion.button>
  );
}

export function MusicControls({
  onPlaylists,
  onSongs,
  onInstall,
  onService,
}: {
  onPlaylists: () => void;
  onSongs: () => void;
  onInstall: () => void;
  onService: (name: string) => void;
}) {
  return (
    <div className="flex flex-col items-end gap-2">
      <div className="flex gap-2">
        <Pill
          icon={<Music2 className="size-4" />}
          label="Spotify"
          accent="text-flow-live"
          delay={0.24}
          onClick={() => onService("Spotify")}
        />
        <Pill
          icon={<PlayCircle className="size-4" />}
          label="YouTube Music"
          accent="text-flow-coral"
          delay={0.34}
          onClick={() => onService("YouTube Music")}
        />
      </div>
      <div className="flex gap-2">
        <Pill icon={<ListMusic className="size-4" />} label="Playlists" delay={0.44} onClick={onPlaylists} />
        <Pill icon={<Music4 className="size-4" />} label="Songs" delay={0.54} onClick={onSongs} />
        <Pill icon={<Download className="size-4" />} label="Install App" delay={0.64} onClick={onInstall} />
      </div>
    </div>
  );
}