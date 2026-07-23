"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import type {
  SpotifyStatus,
  SpotifyTrack,
} from "@/lib/spotify";

import "./music-window.css";

type MusicWindowProps = {
  onClose: () => void;
};

type LoadState =
  | "loading"
  | "ready"
  | "error";

function formatTime(milliseconds: number) {
  const totalSeconds = Math.max(
    0,
    Math.floor(milliseconds / 1000)
  );

  const minutes = Math.floor(
    totalSeconds / 60
  );

  const seconds = String(
    totalSeconds % 60
  ).padStart(2, "0");

  return `${minutes}:${seconds}`;
}

function formatPlayedAt(value?: string) {
  if (!value) {
    return "RECENT SIGNAL";
  }

  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

export default function MusicWindow({
  onClose,
}: MusicWindowProps) {
  const [status, setStatus] =
    useState<SpotifyStatus | null>(null);

  const [loadState, setLoadState] =
    useState<LoadState>("loading");

  const [selectedId, setSelectedId] =
    useState<string | null>(null);

  const loadSpotify = useCallback(async () => {
    try {
      const response = await fetch(
        "/api/spotify",
        {
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error(
          "Spotify status unavailable."
        );
      }

      const nextStatus =
        (await response.json()) as SpotifyStatus;

      setStatus(nextStatus);
      setLoadState("ready");

      setSelectedId((currentId) => {
        const stillExists =
          nextStatus.recent.some(
            (track) =>
              track.id === currentId
          );

        return stillExists
          ? currentId
          : null;
      });
    } catch (error) {
      console.error(error);
      setLoadState("error");
    }
  }, []);

  useEffect(() => {
    loadSpotify();

    const interval = window.setInterval(
      loadSpotify,
      20_000
    );

    return () =>
      window.clearInterval(interval);
  }, [loadSpotify]);

  useEffect(() => {
    function handleKeyDown(
      event: KeyboardEvent
    ) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
  }, [onClose]);

  const selectedTrack =
    useMemo<SpotifyTrack | null>(() => {
      if (!status) {
        return null;
      }

      if (selectedId) {
        return (
          status.recent.find(
            (track) =>
              track.id === selectedId
          ) ?? null
        );
      }

      return (
        status.current ??
        status.recent[0] ??
        null
      );
    }, [selectedId, status]);

  const showingCurrent = Boolean(
    status?.current &&
      selectedTrack?.id ===
        status.current.id &&
      !selectedId
  );

  const progressPercent =
    showingCurrent &&
    selectedTrack?.durationMs
      ? Math.min(
          100,
          (status!.progressMs /
            selectedTrack.durationMs) *
            100
        )
      : 0;

  return (
    <section
      className="musicScreen"
      role="dialog"
      aria-modal="true"
      aria-label="Music activity"
    >
      <div
        className="musicScreen__scanlines"
        aria-hidden="true"
      />

      <header className="musicScreen__header">
        <small>TRN_TCLAS_800095</small>

        <div className="musicScreen__titleBar">
          <span>RADIOPORT</span>
        </div>
      </header>

      <div className="musicScreen__main">
        <aside className="musicScreen__artPanel">
          <div className="musicScreen__artFrame">
            {selectedTrack?.image ? (
              <img
                src={selectedTrack.image}
                alt={`${selectedTrack.album} album artwork`}
              />
            ) : (
              <div className="musicScreen__artFallback">
                NO
                <br />
                SIGNAL
              </div>
            )}
          </div>

          <div
            className="musicScreen__artifactText"
            aria-hidden="true"
          >
            IMAGE: SPOTIFY_REMOTE
            <br />
            TYPE: ALBUM_ART
            <br />
            LZ0 COMPRESSED
            <br />
            LOAD ADDRESS: 0000E000
          </div>
        </aside>

        <section className="musicScreen__nowPlaying">
          <div className="musicScreen__sectionLabel">
            NOW PLAYING
          </div>

          {loadState === "loading" && (
            <p className="musicScreen__state">
              ACQUIRING SIGNAL...
            </p>
          )}

          {loadState === "error" && (
            <p className="musicScreen__state">
              SPOTIFY LINK ERROR
            </p>
          )}

          {loadState === "ready" &&
            !selectedTrack && (
              <p className="musicScreen__state">
                NO TRACK
              </p>
            )}

          {selectedTrack && (
            <>
              <div className="musicScreen__trackCopy">
                <h1>
                  {selectedTrack.title}
                </h1>

                <p>
                  {selectedTrack.artist}
                </p>

                <span>
                  {selectedTrack.album}
                </span>
              </div>

              <div className="musicScreen__signalRow">
                <span>
                  {showingCurrent &&
                  status?.isPlaying
                    ? "LIVE SIGNAL"
                    : "ARCHIVED SIGNAL"}
                </span>

                <strong>
                  {formatTime(
                    showingCurrent
                      ? status?.progressMs ?? 0
                      : selectedTrack.durationMs
                  )}
                </strong>

                <em>
                  {" "}
                  /{" "}
                  {formatTime(
                    selectedTrack.durationMs
                  )}
                </em>
              </div>

              <div
                className="musicScreen__progress"
                aria-hidden="true"
              >
                <span
                  style={{
                    width: `${progressPercent}%`,
                  }}
                />
              </div>

              <a
                className="musicScreen__spotifyLink"
                href={
                  selectedTrack.spotifyUrl
                }
                target="_blank"
                rel="noreferrer"
              >
                OPEN IN SPOTIFY ↗
              </a>
            </>
          )}
        </section>
      </div>

      <section
        className="musicScreen__history"
        aria-label="Recently played tracks"
      >
        <div className="musicScreen__historyLabel">
          RECENTLY PLAYED // LAST 10
        </div>

        <div className="musicScreen__trackList">
          {(status?.recent ?? []).map(
            (track, index) => {
              const isSelected =
                selectedId === track.id ||
                (!selectedId &&
                  !status?.current &&
                  index === 0);

              return (
                <button
                  key={`${track.id}-${
                    track.playedAt ?? index
                  }`}
                  type="button"
                  className={`musicScreen__trackRow ${
                    isSelected
                      ? "is-selected"
                      : ""
                  }`}
                  onClick={() =>
                    setSelectedId(track.id)
                  }
                >
                  <span className="musicScreen__rowCode">
                    {String(
                      index + 1
                    ).padStart(2, "0")}
                  </span>

                  <span className="musicScreen__rowCopy">
                    <strong>
                      {track.title}
                    </strong>

                    <small>
                      {track.artist}
                    </small>
                  </span>

                  <time>
                    {formatPlayedAt(
                      track.playedAt
                    )}
                  </time>
                </button>
              );
            }
          )}
        </div>
      </section>

      <footer className="musicScreen__footer">
        <span>
          ONLY CC35 CERTIFIED CLIENTS MAY
          ACCESS THIS DEVICE.
        </span>

        <div>
          <button
            type="button"
            onClick={() =>
              setSelectedId(null)
            }
          >
            <kbd>F</kbd>
            CURRENT
          </button>

          <button
            type="button"
            onClick={onClose}
          >
            <kbd>ESC</kbd>
            CLOSE
          </button>
        </div>
      </footer>
    </section>
  );
}