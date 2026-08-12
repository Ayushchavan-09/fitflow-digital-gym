import { motion } from "framer-motion";
import { Download, ListMusic, Music2, Music4, PlayCircle } from "lucide-react";

function Pill({
  icon,
  label,
  onClick,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  accent?: string;
}) {
  return (
    <motion.button
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
          onClick={() => onService("Spotify")}
        />
        <Pill
          icon={<PlayCircle className="size-4" />}
          label="YouTube Music"
          accent="text-flow-coral"
          onClick={() => onService("YouTube Music")}
        />
      </div>
      <div className="flex gap-2">
        <Pill icon={<ListMusic className="size-4" />} label="Playlists" onClick={onPlaylists} />
        <Pill icon={<Music4 className="size-4" />} label="Songs" onClick={onSongs} />
        <Pill icon={<Download className="size-4" />} label="Install App" onClick={onInstall} />
      </div>
    </div>
  );
}