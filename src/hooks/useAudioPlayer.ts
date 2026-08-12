import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { tracks, type Track } from "@/data/music";

export function useAudioPlayer(queue: Track[] = tracks) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(queue[0]?.duration ?? 0);
  const [volume, setVolume] = useState(0.7);

  const current = (queue[index] ?? queue[0]) as Track;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = new Audio();
    el.preload = "metadata";
    audioRef.current = el;
    const onTime = () => setProgress(el.currentTime);
    const onMeta = () => setDuration(el.duration || 0);
    const onEnd = () => setIndex((i) => (i + 1) % queue.length);
    el.addEventListener("timeupdate", onTime);
    el.addEventListener("loadedmetadata", onMeta);
    el.addEventListener("ended", onEnd);
    return () => {
      el.pause();
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("loadedmetadata", onMeta);
      el.removeEventListener("ended", onEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const el = audioRef.current;
    if (!el || !current) return;
    if (el.src !== current.src) {
      el.src = current.src;
      setProgress(0);
      setDuration(current.duration);
    }
    if (playing) void el.play().catch(() => setPlaying(false));
    else el.pause();
  }, [current, playing]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const playTrackId = useCallback(
    (id: string) => {
      const i = queue.findIndex((t) => t.id === id);
      if (i >= 0) {
        setIndex(i);
        setPlaying(true);
      }
    },
    [queue],
  );

  const seek = useCallback((value: number) => {
    const el = audioRef.current;
    if (!el) return;
    el.currentTime = value;
    setProgress(value);
  }, []);

  return useMemo(
    () => ({
      current,
      playing,
      progress,
      duration,
      volume,
      setVolume,
      toggle: () => setPlaying((p) => !p),
      next: () => setIndex((i) => (i + 1) % queue.length),
      prev: () => setIndex((i) => (i - 1 + queue.length) % queue.length),
      playTrackId,
      seek,
    }),
    [current, playing, progress, duration, volume, queue.length, playTrackId, seek],
  );
}

export type AudioPlayer = ReturnType<typeof useAudioPlayer>;