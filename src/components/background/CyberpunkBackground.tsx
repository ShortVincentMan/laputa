"use client";

import Image from "next/image";
import ScrollingText from "../shared/ScrollingText";

import "./cyberpunk-background.css";
import "@/components/landing/landing.css";

const ASSET_ROOT = "/assets/landing";

type CyberpunkBackgroundProps = {
  muted?: boolean;
};

export default function CyberpunkBackground({
  muted = false,
}: CyberpunkBackgroundProps) {
  return (
    <div
      className={`cyberpunkBackground ${
        muted ? "cyberpunkBackgroundMuted" : ""
      }`}
      aria-hidden="true"
    >
      <Image
        className="background"
        src={`${ASSET_ROOT}/bg.png`}
        alt=""
        fill
        priority
        sizes="100vw"
        quality={78}
        draggable={false}
      />

      <div className="scene perspectiveEnabled">
        <div className="uiStack">
          <Image
            className="staticUi"
            src={`${ASSET_ROOT}/screen-ui.png`}
            alt=""
            fill
            sizes="210vw"
            quality={75}
            draggable={false}
          />

          <ScrollingText />

          <div className="scrollingLines">
            <div className="scrollingLinesTrack">
              {[0, 1].map((index) => (
                <Image
                  key={index}
                  className="scrollingLinesTrail"
                  src={`${ASSET_ROOT}/scrolling-lines.png`}
                  alt=""
                  width={2048}
                  height={699}
                  draggable={false}
                />
              ))}
            </div>
          </div>

          <div className="scrollingLines scrollingLinesSecondary">
            <div className="scrollingLinesTrack scrollingLinesTrackReverse">
              {[0, 1].map((index) => (
                <Image
                  key={index}
                  className="scrollingLinesTrail"
                  src={`${ASSET_ROOT}/scrolling-lines.png`}
                  alt=""
                  width={2048}
                  height={699}
                  draggable={false}
                />
              ))}
            </div>
          </div>

          <div className="assetLayer bottomGrid">
            <Image
              src={`${ASSET_ROOT}/bottom-grid.png`}
              alt=""
              fill
              sizes="38vw"
              draggable={false}
            />
          </div>

          <Image
            className="uiGrungeOne"
            src={`${ASSET_ROOT}/grunge1.jpg`}
            alt=""
            fill
            sizes="210vw"
            quality={55}
            loading="eager"
            draggable={false}
          />

          <Image
            className="backgroundGlowOverlay"
            src={`${ASSET_ROOT}/bg2.png`}
            alt=""
            fill
            sizes="210vw"
            quality={60}
            draggable={false}
          />
        </div>
      </div>

      <Image
        className="scratchesOverlay"
        src={`${ASSET_ROOT}/scratches.png`}
        alt=""
        fill
        sizes="100vw"
        quality={55}
        draggable={false}
      />

      <div className="scanlines" />
      <div className="grain" />
      <div className="vignette" />
    </div>
  );
}