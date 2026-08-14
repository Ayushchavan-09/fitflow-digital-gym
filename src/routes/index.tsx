import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";

import gymBg from "@/assets/gym-bg.png";
import { LiveClock } from "@/components/LiveClock";
import { OnlineCounter, useLiveMembers } from "@/components/OnlineCounter";
import { MusicControls } from "@/components/MusicControls";
import { BrandHero } from "@/components/BrandHero";
import { MusicPlayer } from "@/components/MusicPlayer";
import { PlaylistPanel, SongsPanel } from "@/components/MusicPanels";
import { WorkoutCard } from "@/components/WorkoutPanel";
import { ClassCard, CommunityCard, ProgressCard } from "@/components/SidePanels";
import { Motivation } from "@/components/Motivation";
import { InteractiveGym } from "@/components/InteractiveGym";
import {
  BookingPanel,
  FullWorkoutPanel,
  InfoPanel,
  InstallPanel,
  MembershipPanel,
  MotivationWallPanel,
} from "@/components/OverlayPanels";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { modes } from "@/data/workouts";
import { loadPlaylistTracks } from "@/lib/youtube";
import { tracks as defaultTracks, type Track } from "@/data/music";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fit & Flow — Step Inside the Club" },
      {
        name: "description",
        content:
          "Fit & Flow is an immersive illustrated fitness club: live gym radio, workouts, classes, progress and membership, all inside one interactive world.",
      },
      { property: "og:title", content: "Fit & Flow — Step Inside the Club" },
      {
        property: "og:description",
        content: "Move. Train. Flow. Repeat. An interactive gym world with its own radio.",
      },
    ],
  }),
  component: Index,
});

type Overlay =
  | null
  | "playlists"
  | "songs"
  | "install"
  | "membership"
  | "booking"
  | "workout"
  | "motivation"
  | "info";

function Index() {
  const [playlistTracks, setPlaylistTracks] = useState<Track[]>(defaultTracks);
  const [overlay, setOverlay] = useState<Overlay>(null);
  const [modeId, setModeId] = useState("strength");
  const [info, setInfo] = useState({ title: "", body: "" });
  const [deferred, setDeferred] = useState<{ prompt: () => void } | null>(null);

  const player = useAudioPlayer(playlistTracks);
  const members = useLiveMembers();

  const mode = useMemo(() => modes.find((m) => m.id === modeId) ?? modes[0]!, [modeId]);

  useEffect(() => {
    loadPlaylistTracks().then((fetched) => {
      if (fetched && fetched.length > 0) {
        setPlaylistTracks(fetched);
      }
    });
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferred(e as unknown as { prompt: () => void });
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const openInfo = (title: string, body: string) => {
    setInfo({ title, body });
    setOverlay("info");
  };

  const onHotspot = (id: string) => {
    if (id === "library") setOverlay("workout");
    else if (id === "session") setOverlay("workout");
    else if (id === "motivation") setOverlay("motivation");
    else if (id === "community")
      openInfo("COMMUNITY", `${members} members are training right now across the strength floor, cardio deck and flow studio. Say hi on the mezzanine.`);
    else if (id === "flow")
      openInfo("FLOW STUDIO", "Mobility, yoga and breathwork sessions run every two hours in the sunlit corner. Mats and blocks provided.");
    else if (id === "radio") setOverlay("songs");
  };

  return (
    <main className="relative h-[100dvh] w-full overflow-hidden md:overflow-hidden">
      <div
        aria-hidden
        className="fixed inset-0 -z-10 bg-neutral-950 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${gymBg})` }}
      />
      <img src={gymBg} alt="" className="sr-only" aria-hidden />

      <InteractiveGym onSelect={onHotspot} />

      {/* Top bar */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between gap-3 p-4 sm:p-8">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.0, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto"
        >
          <LiveClock />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto absolute left-1/2 top-4 -translate-x-1/2 sm:top-8"
        >
          <OnlineCounter count={members} />
        </motion.div>
        <div className="pointer-events-auto">
          <MusicControls
            onPlaylists={() => setOverlay("playlists")}
            onSongs={() => setOverlay("songs")}
            onInstall={() => setOverlay("install")}
            onService={(name) =>
              openInfo(
                name.toUpperCase(),
                `${name} sync is coming to Fit & Flow Radio. For now the in-club station is playing — hit play on the floor player below.`,
              )
            }
          />
        </div>
      </div>

      {/* Center brand */}
      <div className="absolute inset-x-0 top-16 bottom-32 z-10 flex flex-col items-center justify-center px-4">
        <BrandHero onJoin={() => setOverlay("membership")} />
      </div>




      <div className="pointer-events-none absolute right-6 top-36 z-20 hidden lg:block xl:hidden">
        <Motivation />
      </div>
      <div className="glass pointer-events-none absolute bottom-44 left-6 z-20 hidden rounded-3xl px-4 py-3 xl:block">
        <Motivation />
      </div>

      {/* Mobile quick actions */}
      <div className="no-scrollbar absolute inset-x-0 bottom-40 z-20 flex gap-2 overflow-x-auto px-4 xl:hidden">
        {[
          { label: "WORKOUT", action: () => setOverlay("workout") },
          { label: "CLASSES", action: () => setOverlay("booking") },
          { label: "PLAYLISTS", action: () => setOverlay("playlists") },
          { label: "MEMBERSHIP", action: () => setOverlay("membership") },
          { label: "MOTIVATION", action: () => setOverlay("motivation") },
        ].map((b) => (
          <motion.button
            key={b.label}
            whileTap={{ scale: 0.96 }}
            onClick={b.action}
            className="glass shrink-0 rounded-full px-4 py-2 font-mono text-[10px] tracking-[0.18em] text-flow-cream"
          >
            {b.label}
          </motion.button>
        ))}
      </div>

      {/* Player + footer */}
      <div className="absolute inset-x-0 bottom-0 z-30 flex flex-col items-center justify-center gap-1 px-3 pb-3 text-center sm:px-6 sm:pb-5">
        <MusicPlayer player={player} />
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.22, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="w-full text-center text-[11px] font-semibold tracking-wide text-white drop-shadow-md sm:text-xs"
        >
          Move. Train. Flow. Repeat. ❤️
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.34, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="w-full text-center text-[11px] font-semibold tracking-wide text-white drop-shadow-md sm:text-xs"
        >
          © 2026 AC|TJ · Fit &amp; Flow
        </motion.p>
      </div>

      <PlaylistPanel open={overlay === "playlists"} onClose={() => setOverlay(null)} player={player} tracks={playlistTracks} />
      <SongsPanel open={overlay === "songs"} onClose={() => setOverlay(null)} player={player} tracks={playlistTracks} />
      <MembershipPanel open={overlay === "membership"} onClose={() => setOverlay(null)} />
      <BookingPanel open={overlay === "booking"} onClose={() => setOverlay(null)} />
      <FullWorkoutPanel open={overlay === "workout"} onClose={() => setOverlay(null)} mode={mode} />
      <MotivationWallPanel open={overlay === "motivation"} onClose={() => setOverlay(null)} />
      <InstallPanel
        open={overlay === "install"}
        onClose={() => setOverlay(null)}
        canInstall={!!deferred}
        onInstall={() => {
          deferred?.prompt();
          setOverlay(null);
        }}
      />
      <InfoPanel open={overlay === "info"} onClose={() => setOverlay(null)} title={info.title} body={info.body} />
    </main>
  );
}
