import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { tracks as defaultTracks, type Track } from "@/data/music";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

export function useAudioPlayer(queue: Track[] = defaultTracks) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ytPlayerRef = useRef<any>(null);
  const ytReadyRef = useRef<boolean>(false);
  const isChangingTrackRef = useRef<boolean>(false);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(queue[0]?.duration ?? 0);
  const [volume, setVolume] = useState(0.7);

  // Clamp index within queue range when queue changes
  useEffect(() => {
    if (index >= queue.length && queue.length > 0) {
      setIndex(0);
    }
  }, [queue, index]);

  const current = (queue[index] ?? queue[0] ?? defaultTracks[0]) as Track;

  const isYouTubeTrack = useCallback((track?: Track) => {
    if (!track) return false;
    return !track.src.startsWith("http://") && !track.src.startsWith("https://");
  }, []);

  // 1. Initialize HTML5 Audio Element
  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = new Audio();
    el.preload = "metadata";
    audioRef.current = el;

    const onTime = () => {
      if (!isYouTubeTrack(current)) {
        setProgress(el.currentTime);
      }
    };
    const onMeta = () => {
      if (!isYouTubeTrack(current)) {
        setDuration(el.duration || current.duration || 0);
      }
    };
    const onEnd = () => {
      if (!isYouTubeTrack(current)) {
        setPlaying(true);
        setIndex((i) => (queue.length > 0 ? (i + 1) % queue.length : 0));
      }
    };

    el.addEventListener("timeupdate", onTime);
    el.addEventListener("loadedmetadata", onMeta);
    el.addEventListener("ended", onEnd);

    return () => {
      el.pause();
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("loadedmetadata", onMeta);
      el.removeEventListener("ended", onEnd);
    };
  }, [current, isYouTubeTrack, queue.length]);

  // 2. Initialize YouTube IFrame API & Player
  useEffect(() => {
    if (typeof window === "undefined") return;

    let container = document.getElementById("fitflow-yt-player-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "fitflow-yt-player-container";
      container.style.position = "fixed";
      container.style.left = "-9999px";
      container.style.top = "-9999px";
      container.style.width = "1px";
      container.style.height = "1px";
      container.style.opacity = "0";
      container.style.pointerEvents = "none";
      document.body.appendChild(container);

      const iframeDiv = document.createElement("div");
      iframeDiv.id = "fitflow-yt-player";
      container.appendChild(iframeDiv);
    }

    const initYTPlayer = () => {
      if (ytPlayerRef.current || !window.YT || !window.YT.Player) return;

      ytPlayerRef.current = new window.YT.Player("fitflow-yt-player", {
        height: "1",
        width: "1",
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          rel: 0,
        },
        events: {
          onReady: () => {
            ytReadyRef.current = true;
            if (ytPlayerRef.current && typeof ytPlayerRef.current.setVolume === "function") {
              ytPlayerRef.current.setVolume(volume * 100);
            }
          },
          onStateChange: (event: any) => {
            // YT.PlayerState.ENDED === 0
            if (event.data === 0) {
              setPlaying(true);
              setIndex((i) => (queue.length > 0 ? (i + 1) % queue.length : 0));
            }
            // YT.PlayerState.PLAYING === 1
            else if (event.data === 1) {
              isChangingTrackRef.current = false;
              setPlaying(true);
            }
            // YT.PlayerState.PAUSED === 2
            else if (event.data === 2) {
              if (!isChangingTrackRef.current) {
                setPlaying(false);
              }
            }
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      initYTPlayer();
    } else {
      const existingScript = document.getElementById("yt-iframe-api-script");
      if (!existingScript) {
        const script = document.createElement("script");
        script.id = "yt-iframe-api-script";
        script.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(script);
      }

      const prevOnReady = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (prevOnReady) prevOnReady();
        initYTPlayer();
      };
    }
  }, [queue.length, volume]);

  // 3. YouTube Progress & Duration Timer
  useEffect(() => {
    if (!isYouTubeTrack(current) || !playing) return;

    const interval = setInterval(() => {
      const player = ytPlayerRef.current;
      if (player && ytReadyRef.current && typeof player.getCurrentTime === "function") {
        const currTime = player.getCurrentTime() || 0;
        const dur = player.getDuration() || current.duration || 0;
        setProgress(currTime);
        if (dur > 0) setDuration(dur);
      }
    }, 250);

    return () => clearInterval(interval);
  }, [current, playing, isYouTubeTrack]);

  // 4. Handle Track Changes & Play/Pause Commands
  const prevTrackIdRef = useRef<string>("");

  useEffect(() => {
    if (!current) return;

    let timer: any = null;
    const isYT = isYouTubeTrack(current);
    const trackChanged = prevTrackIdRef.current !== current.id;
    if (trackChanged) {
      prevTrackIdRef.current = current.id;
      isChangingTrackRef.current = true;
      setProgress(0);
      setDuration(current.duration || 0);
    }

    if (isYT) {
      // Pause HTML5 Audio
      if (audioRef.current) {
        audioRef.current.pause();
      }

      const ytPlayer = ytPlayerRef.current;
      if (ytPlayer && ytReadyRef.current) {
        if (trackChanged) {
          if (playing) {
            ytPlayer.loadVideoById(current.src);
            ytPlayer.playVideo();
          } else {
            ytPlayer.cueVideoById(current.src);
          }
        } else {
          if (playing) {
            ytPlayer.playVideo();
          } else {
            ytPlayer.pauseVideo();
          }
        }
      } else if (trackChanged && playing) {
        // Fallback retry if YT player ready is pending
        timer = setTimeout(() => {
          if (ytPlayerRef.current && ytReadyRef.current) {
            ytPlayerRef.current.loadVideoById(current.src);
            ytPlayerRef.current.playVideo();
          }
        }, 500);
      }
    } else {
      // Pause YouTube player
      if (ytPlayerRef.current && ytReadyRef.current && typeof ytPlayerRef.current.pauseVideo === "function") {
        ytPlayerRef.current.pauseVideo();
      }

      const el = audioRef.current;
      if (el) {
        if (el.src !== current.src) {
          el.src = current.src;
        }
        if (playing) {
          void el.play().catch(() => setPlaying(false));
        } else {
          el.pause();
        }
      }
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [current, playing, isYouTubeTrack]);

  // 5. Volume Changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
    if (ytPlayerRef.current && ytReadyRef.current && typeof ytPlayerRef.current.setVolume === "function") {
      ytPlayerRef.current.setVolume(volume * 100);
    }
  }, [volume]);

  // Controls
  const playTrackId = useCallback(
    (id: string) => {
      const i = queue.findIndex((t) => t.id === id);
      if (i >= 0) {
        setPlaying(true);
        setIndex(i);
      }
    },
    [queue]
  );

  const seek = useCallback(
    (value: number) => {
      setProgress(value);
      if (isYouTubeTrack(current)) {
        if (ytPlayerRef.current && ytReadyRef.current && typeof ytPlayerRef.current.seekTo === "function") {
          ytPlayerRef.current.seekTo(value, true);
        }
      } else {
        const el = audioRef.current;
        if (el) {
          el.currentTime = value;
        }
      }
    },
    [current, isYouTubeTrack]
  );

  return useMemo(
    () => ({
      current,
      playing,
      progress,
      duration,
      volume,
      setVolume,
      toggle: () => setPlaying((p) => !p),
      next: () => {
        setPlaying(true);
        setIndex((i) => (queue.length > 0 ? (i + 1) % queue.length : 0));
      },
      prev: () => {
        setPlaying(true);
        setIndex((i) => (queue.length > 0 ? (i - 1 + queue.length) % queue.length : 0));
      },
      playTrackId,
      seek,
    }),
    [current, playing, progress, duration, volume, queue.length, playTrackId, seek]
  );
}

export type AudioPlayer = ReturnType<typeof useAudioPlayer>;