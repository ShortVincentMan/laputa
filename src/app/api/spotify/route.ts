import { NextResponse } from "next/server";

import {
  normalizeSpotifyTrack,
  type SpotifyStatus,
} from "@/lib/spotify";

export const dynamic = "force-dynamic";

const TOKEN_URL = "https://accounts.spotify.com/api/token";
const CURRENT_URL =
  "https://api.spotify.com/v1/me/player/currently-playing";
const RECENT_URL =
  "https://api.spotify.com/v1/me/player/recently-played?limit=10";

function getSpotifyCredentials() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("Spotify environment variables are missing.");
  }

  return {
    clientId,
    clientSecret,
    refreshToken,
  };
}

async function getAccessToken() {
  const {
    clientId,
    clientSecret,
    refreshToken,
  } = getSpotifyCredentials();

  const authorization = Buffer.from(
    `${clientId}:${clientSecret}`
  ).toString("base64");

  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${authorization}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const detail = await response.text();

    throw new Error(
      `Spotify token refresh failed (${response.status}): ${detail}`
    );
  }

  const payload = (await response.json()) as {
    access_token?: string;
  };

  if (!payload.access_token) {
    throw new Error("Spotify did not return an access token.");
  }

  return payload.access_token;
}

async function spotifyFetch(
  url: string,
  accessToken: string
) {
  return fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });
}

export async function GET() {
  try {
    const accessToken = await getAccessToken();

    const [currentResponse, recentResponse] =
      await Promise.all([
        spotifyFetch(CURRENT_URL, accessToken),
        spotifyFetch(RECENT_URL, accessToken),
      ]);

    if (!recentResponse.ok) {
      throw new Error(
        `Spotify recent tracks failed (${recentResponse.status}).`
      );
    }

    const recentPayload = (await recentResponse.json()) as {
      items?: Array<{
        track: Parameters<
          typeof normalizeSpotifyTrack
        >[0];
        played_at: string;
      }>;
    };

    let current: SpotifyStatus["current"] = null;
    let isPlaying = false;
    let progressMs = 0;

    if (currentResponse.status !== 204) {
      if (!currentResponse.ok) {
        throw new Error(
          `Spotify current track failed (${currentResponse.status}).`
        );
      }

      const currentPayload =
        (await currentResponse.json()) as {
          item?:
            | Parameters<
                typeof normalizeSpotifyTrack
              >[0]
            | null;
          is_playing?: boolean;
          progress_ms?: number | null;
          currently_playing_type?: string;
        };

      if (
        currentPayload.item &&
        currentPayload.currently_playing_type !==
          "episode"
      ) {
        current = normalizeSpotifyTrack(
          currentPayload.item
        );

        isPlaying = Boolean(
          currentPayload.is_playing
        );

        progressMs =
          currentPayload.progress_ms ?? 0;
      }
    }

    const recent = (recentPayload.items ?? [])
      .filter((item) => Boolean(item.track?.id))
      .map((item) =>
        normalizeSpotifyTrack(
          item.track,
          item.played_at
        )
      )
      .filter(
        (track, index, tracks) =>
          tracks.findIndex(
            (candidate) =>
              candidate.id === track.id
          ) === index
      )
      .slice(0, 10);

    const response: SpotifyStatus = {
      current,
      recent,
      isPlaying,
      progressMs,
      fetchedAt: new Date().toISOString(),
    };

    return NextResponse.json(response, {
      headers: {
        "Cache-Control":
          "private, no-store, max-age=0",
      },
    });
  } catch (error) {
    console.error("Spotify API error:", error);

    return NextResponse.json(
      {
        error: "Spotify service is temporarily unavailable.",
      },
      {
        status: 503,
      }
    );
  }
}