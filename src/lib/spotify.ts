export type SpotifyTrack = {
  id: string;
  title: string;
  artist: string;
  album: string;
  image: string | null;
  spotifyUrl: string;
  durationMs: number;
  playedAt?: string;
};

export type SpotifyStatus = {
  current: SpotifyTrack | null;
  recent: SpotifyTrack[];
  isPlaying: boolean;
  progressMs: number;
  fetchedAt: string;
};

type SpotifyImage = {
  url: string;
  width?: number;
  height?: number;
};

type SpotifyArtist = {
  name: string;
};

type SpotifyAlbum = {
  name: string;
  images?: SpotifyImage[];
};

type SpotifyExternalUrls = {
  spotify?: string;
};

type SpotifyApiTrack = {
  id: string;
  name: string;
  duration_ms: number;
  artists?: SpotifyArtist[];
  album?: SpotifyAlbum;
  external_urls?: SpotifyExternalUrls;
};

export function normalizeSpotifyTrack(
  track: SpotifyApiTrack,
  playedAt?: string
): SpotifyTrack {
  return {
    id: track.id,
    title: track.name,
    artist:
      track.artists?.map((artist) => artist.name).join(", ") ||
      "UNKNOWN ARTIST",
    album: track.album?.name || "UNKNOWN RELEASE",
    image: track.album?.images?.[0]?.url ?? null,
    spotifyUrl:
      track.external_urls?.spotify ?? "https://open.spotify.com",
    durationMs: track.duration_ms,
    ...(playedAt ? { playedAt } : {}),
  };
}