import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { Panel } from "./Panel";
import { formatTime, playlists, tracks as defaultTracks, type Track } from "@/data/music";
import type { AudioPlayer } from "@/hooks/useAudioPlayer";

function TrackRow({
  n,
  track,
  onPlay,
  active,
}: {
  n: number;
  track: Track;
  onPlay: (id: string) => void;
  active: boolean;
}) {
  return (
    <motion.button
      whileHover={{ x: 4 }}
      onClick={() => onPlay(track.id)}
      className={`flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors hover:bg-white/8 ${
        active ? "bg-white/10" : ""
      }`}
    >
      <span className="w-6 shrink-0 font-mono text-[11px] text-white/40">
        {n.toString().padStart(2, "0")}
      </span>
      <img src={track.art} alt="" loading="lazy" className="size-9 shrink-0 rounded-lg object-cover" />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm text-white/90">{track.title}</span>
        <span className="block truncate text-xs text-white/45">{track.artist}</span>
      </span>
      <span className="shrink-0 font-mono text-[11px] text-white/40">{formatTime(track.duration)}</span>
      <Play className="size-4 shrink-0 text-flow-orange" />
    </motion.button>
  );
}

export function PlaylistPanel({
  open,
  onClose,
  player,
  tracks = defaultTracks,
}: {
  open: boolean;
  onClose: () => void;
  player: AudioPlayer;
  tracks?: Track[];
}) {
  const [selected, setSelected] = useState(playlists[0]!.id);
  const active = playlists.find((p) => p.id === selected)!;

  return (
    <Panel open={open} onClose={onClose} title="PLAYLISTS" subtitle="Fit & Flow Radio — curated for the room" wide>
      <div className="grid gap-6 sm:grid-cols-[minmax(0,260px)_minmax(0,1fr)]">
        <div className="flex gap-2 overflow-x-auto pb-1 sm:flex-col sm:overflow-visible">
          {playlists.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelected(p.id)}
              className={`shrink-0 rounded-2xl border px-4 py-3 text-left transition sm:w-full ${
                p.id === selected
                  ? "border-flow-orange/60 bg-flow-orange/15"
                  : "border-white/10 hover:bg-white/8"
              }`}
            >
              <div className="whitespace-nowrap text-sm font-semibold text-white/90">
                {p.emoji} {p.name}
              </div>
              <div className="hidden text-xs text-white/45 sm:block">{p.blurb}</div>
            </button>
          ))}
        </div>
        <div>
          {active.trackIds.map((id, i) => {
            const track = tracks.find((t) => t.id === id) || tracks[i % tracks.length];
            if (!track) return null;
            return (
              <TrackRow
                key={track.id + i}
                n={i + 1}
                track={track}
                onPlay={player.playTrackId}
                active={player.current?.id === track.id}
              />
            );
          })}
        </div>
      </div>
    </Panel>
  );
}

export function SongsPanel({
  open,
  onClose,
  player,
  tracks = defaultTracks,
}: {
  open: boolean;
  onClose: () => void;
  player: AudioPlayer;
  tracks?: Track[];
}) {
  const songList = tracks && tracks.length > 0 ? tracks : defaultTracks;

  return (
    <Panel open={open} onClose={onClose} title="SONGS" subtitle={`${songList.length} tracks in the library`}>
      {songList.map((t, i) => (
        <TrackRow
          key={t.id}
          n={i + 1}
          track={t}
          onPlay={player.playTrackId}
          active={player.current?.id === t.id}
        />
      ))}
    </Panel>
  );
}