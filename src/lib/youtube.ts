import { createServerFn } from "@tanstack/react-start";
import { tracks as mockTracks, type Track } from "@/data/music";

function parseISODuration(isoDuration: string): number {
  const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
  const matches = isoDuration.match(regex);
  if (!matches) return 0;
  const hours = parseInt(matches[1] || "0", 10);
  const minutes = parseInt(matches[2] || "0", 10);
  const seconds = parseInt(matches[3] || "0", 10);
  return hours * 3600 + minutes * 60 + seconds;
}

export const fetchYouTubePlaylist = createServerFn({ method: "GET" }).handler(
  async (): Promise<Track[]> => {
    const env = process.env || {};
    const apiKey =
      env["YOUTUBE_DATA_API_KEY"] ||
      env["YOUTUBE_API_KEY"] ||
      env["VITE_YOUTUBE_API_KEY"] ||
      env["VITE_YOUTUBE_DATA_API_KEY"] ||
      env["REACT_APP_YOUTUBE_API_KEY"];

    const playlistId =
      env["VITE_YOUTUBE_PLAYLIST_ID"] ||
      env["YOUTUBE_PLAYLIST_ID"] ||
      env["PLAYLIST_ID"] ||
      env["REACT_APP_YOUTUBE_PLAYLIST_ID"];

    if (!apiKey || !playlistId) {
      console.warn("YouTube API key or Playlist ID not found in process.env.");
      return [];
    }

    try {
      const playlistUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${encodeURIComponent(
        playlistId
      )}&maxResults=50&key=${apiKey}`;

      const res = await fetch(playlistUrl);
      if (!res.ok) {
        console.error("YouTube Data API response error:", res.statusText);
        return [];
      }

      const data = await res.json();
      const items = data.items || [];
      if (!items.length) return [];

      const videoIds = items
        .map((item: any) => item.snippet?.resourceId?.videoId)
        .filter(Boolean);

      let durationMap: Record<string, number> = {};
      if (videoIds.length > 0) {
        try {
          const videosUrl = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoIds.join(
            ","
          )}&key=${apiKey}`;
          const vRes = await fetch(videosUrl);
          if (vRes.ok) {
            const vData = await vRes.json();
            for (const vItem of vData.items || []) {
              durationMap[vItem.id] = parseISODuration(
                vItem.contentDetails?.duration || ""
              );
            }
          }
        } catch (e) {
          console.warn("Could not fetch YouTube video durations:", e);
        }
      }

      const youtubeTracks: Track[] = items
        .filter(
          (item: any) =>
            item.snippet?.title !== "Private video" &&
            item.snippet?.title !== "Deleted video"
        )
        .map((item: any, idx: number): Track => {
          const videoId = item.snippet?.resourceId?.videoId || `yt-${idx}`;
          const title = item.snippet?.title || `Track ${idx + 1}`;
          const artist =
            item.snippet?.videoOwnerChannelTitle ||
            item.snippet?.channelTitle ||
            "YouTube Playlist";
          const thumbnails = item.snippet?.thumbnails;
          const art =
            thumbnails?.high?.url ||
            thumbnails?.medium?.url ||
            thumbnails?.default?.url ||
            `https://picsum.photos/seed/${videoId}/200/200`;

          return {
            id: videoId,
            title,
            artist: "AC",
            album: "Fit & Flow Radio",
            duration: durationMap[videoId] || 240,
            src: videoId,
            art,
          };
        });

      return youtubeTracks;
    } catch (error) {
      console.error("Failed to fetch YouTube playlist tracks:", error);
      return [];
    }
  }
);

export async function loadPlaylistTracks(): Promise<Track[]> {
  try {
    const tracks = await fetchYouTubePlaylist();
    if (tracks && tracks.length > 0) {
      return tracks;
    }
  } catch (err) {
    console.warn("Failed to load playlist from server function, falling back to client check:", err);
  }

  // Client-side fallback if env is injected via Vite
  const metaEnv = (import.meta as any).env || {};
  const apiKey =
    metaEnv.YOUTUBE_DATA_API_KEY ||
    metaEnv.VITE_YOUTUBE_DATA_API_KEY ||
    metaEnv.VITE_YOUTUBE_API_KEY ||
    metaEnv.YOUTUBE_API_KEY;

  const playlistId =
    metaEnv.VITE_YOUTUBE_PLAYLIST_ID ||
    metaEnv.YOUTUBE_PLAYLIST_ID ||
    metaEnv.PLAYLIST_ID;

  if (apiKey && playlistId) {
    try {
      const playlistUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${encodeURIComponent(
        playlistId
      )}&maxResults=50&key=${apiKey}`;
      const res = await fetch(playlistUrl);
      if (res.ok) {
        const data = await res.json();
        const items = data.items || [];
        if (items.length > 0) {
          return items
            .filter(
              (item: any) =>
                item.snippet?.title !== "Private video" &&
                item.snippet?.title !== "Deleted video"
            )
            .map((item: any, idx: number): Track => {
              const videoId = item.snippet?.resourceId?.videoId || `yt-${idx}`;
              const title = item.snippet?.title || `Track ${idx + 1}`;
              const artist =
                item.snippet?.videoOwnerChannelTitle ||
                item.snippet?.channelTitle ||
                "YouTube Playlist";
              const thumbnails = item.snippet?.thumbnails;
              const art =
                thumbnails?.high?.url ||
                thumbnails?.medium?.url ||
                thumbnails?.default?.url ||
                `https://picsum.photos/seed/${videoId}/200/200`;

              return {
                id: videoId,
                title,
                artist: "AC",
                album: "Fit & Flow Radio",
                duration: 240,
                src: videoId,
                art,
              };
            });
        }
      }
    } catch (e) {
      console.error("Client fallback YouTube fetch failed:", e);
    }
  }

  return mockTracks;
}
