export type Track = {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  src: string;
  art: string;
};

const audio = (n: number) =>
  `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${n}.mp3`;

const art = (seed: string) =>
  `https://picsum.photos/seed/${seed}/200/200`;

export const tracks: Track[] = [
  { id: "t1", title: "Beast Mode", artist: "Iron Pulse", album: "Fit & Flow Radio", duration: 252, src: audio(1), art: art("beastmode") },
  { id: "t2", title: "Morning Grind", artist: "Dawn Runners", album: "Fit & Flow Radio", duration: 228, src: audio(2), art: art("morninggrind") },
  { id: "t3", title: "Cardio Rush", artist: "Tempo Club", album: "Fit & Flow Radio", duration: 241, src: audio(3), art: art("cardiorush") },
  { id: "t4", title: "Push Your Limits", artist: "Rack Kings", album: "Fit & Flow Radio", duration: 235, src: audio(4), art: art("pushlimits") },
  { id: "t5", title: "Flow State", artist: "Mat & Breath", album: "Fit & Flow Radio", duration: 320, src: audio(5), art: art("flowstate") },
  { id: "t6", title: "Deep Training", artist: "Iron Pulse", album: "Fit & Flow Radio", duration: 276, src: audio(6), art: art("deeptraining") },
  { id: "t7", title: "Recovery Mode", artist: "Mat & Breath", album: "Fit & Flow Radio", duration: 299, src: audio(7), art: art("recoverymode") },
  { id: "t8", title: "Night Workout", artist: "Neon Limitless", album: "Fit & Flow Radio", duration: 264, src: audio(8), art: art("nightworkout") },
];

export type Playlist = {
  id: string;
  emoji: string;
  name: string;
  blurb: string;
  trackIds: string[];
};

export const playlists: Playlist[] = [
  { id: "p1", emoji: "🔥", name: "Beast Mode", blurb: "Heavy lifting.", trackIds: ["t1", "t4", "t6"] },
  { id: "p2", emoji: "☀️", name: "Morning Flow", blurb: "For early workouts.", trackIds: ["t2", "t5", "t7"] },
  { id: "p3", emoji: "🏃", name: "Cardio Rush", blurb: "High-energy cardio.", trackIds: ["t3", "t1", "t8"] },
  { id: "p4", emoji: "🧘", name: "Flow State", blurb: "Yoga, mobility, stretching.", trackIds: ["t5", "t7", "t2"] },
  { id: "p5", emoji: "🌙", name: "Night Grind", blurb: "Late-night training.", trackIds: ["t8", "t6", "t4"] },
  { id: "p6", emoji: "🏆", name: "PR Day", blurb: "For personal-record sessions.", trackIds: ["t4", "t1", "t3"] },
];

export const formatTime = (s: number) => {
  if (!Number.isFinite(s) || s < 0) s = 0;
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
};