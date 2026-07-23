"use client";

import "./spotify-hud-button.css";

type SpotifyHudButtonProps = {
  onOpen: () => void;
};

export default function SpotifyHudButton({
  onOpen,
}: SpotifyHudButtonProps) {
  return (
    <button
      type="button"
      className="spotifyHudButton"
      onClick={onOpen}
      aria-label="Open music activity"
    >
      <span className="spotifyHudButton__key">
        M
      </span>

      <span className="spotifyHudButton__label">
        MUSIC ACTIVITY
      </span>

      <span
        className="spotifyHudButton__glyph"
        aria-hidden="true"
      >
        ♫
      </span>

      <span
        className="spotifyHudButton__matrix"
        aria-hidden="true"
      >
        101
        <br />
        010
        <br />
        111
      </span>
    </button>
  );
}