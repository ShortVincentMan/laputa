"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import "./landing.css";
import ScrollingText from "./ScrollingText";

const ASSET_ROOT = "/assets/landing";


type LayerProps = {
  src: string;
  className: string;
  sizes: string;
};

function UiLayer({ src, className, sizes }: LayerProps) {
  return (
    <div className={`assetLayer ${className}`} aria-hidden="true">
      <Image
        src={`${ASSET_ROOT}/${src}`}
        alt=""
        fill
        sizes={sizes}
        quality={75}
        draggable={false}
      />
    </div>
  );
}

export default function LandingScreen() {
  const router = useRouter();
  const [isLeaving, setIsLeaving] = useState(false);
  const [promptText, setPromptText] = useState("CLICK TO CONTINUE");
  
  const continueToSite = useCallback(() => {
  if (isLeaving) return;

  setIsLeaving(true);
  setPromptText("BREACHING...");

  window.setTimeout(() => {
    router.push("/home");
  }, 500);
}, [isLeaving, router]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " " || event.key === "Escape") {
        event.preventDefault();
        continueToSite();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [continueToSite]);

  return (
    <main
      className={`landing ${isLeaving ? "landingLeaving" : ""}`}
      onClick={continueToSite}
      role="button"
      tabIndex={0}
      aria-label="Enter website"
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

      <div className="scene perspectiveEnabled" aria-hidden="true">
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

          <UiLayer src="top-red-shape.png" className="topRedShape" sizes="76vw" />
          <UiLayer src="top-right.png" className="topRight" sizes="46vw" />
          <div className="scrollingLines">
            <div className="scrollingLinesTrack">
              <Image
                className="scrollingLinesTrail"
                src={`${ASSET_ROOT}/scrolling-lines.png`}
                alt=""
                width={2048}
                height={699}
                draggable={false}
              />

              <Image
                className="scrollingLinesTrail"
                src={`${ASSET_ROOT}/scrolling-lines.png`}
                alt=""
                width={2048}
                height={699}
                draggable={false}
                aria-hidden="true"
              />
            </div>
          </div>
          <UiLayer src="pulse-red-bar.png" className="pulseRedBar" sizes="6vw" />
          <UiLayer src="blue-bar.png" className="blueBar" sizes="137vw" />
          <UiLayer src="bottom-grid.png" className="bottomGrid" sizes="38vw" />
          <UiLayer src="bottom-left.png" className="bottomLeftOne" sizes="50vw" />
          <UiLayer src="bottom-left-rectangle.png" className="bottomLeftTwo" sizes="50vw" />
          <UiLayer src="static-letters.png" className="bottomLettersOne" sizes="91vw" />
          <UiLayer src="static-letters2.png" className="bottomLettersTwo" sizes="81vw" />

          <Image
            className="uiGrungeOne"
            src={`${ASSET_ROOT}/grunge1.jpg`}
            alt=""
            fill
            sizes="210vw"
            quality={55}
            draggable={false}
          />

          <Image
            className="uiGrungeTwo"
            src={`${ASSET_ROOT}/grunge2.jpg`}
            alt=""
            fill
            sizes="210vw"
            quality={50}
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

          <div className="screenGlow" />
          <div className="landingTitle">Vincent Le</div>
        </div>
      </div>

      <Image
        className="topLeftGlowOverlay"
        src={`${ASSET_ROOT}/top-left-glow.png`}
        alt=""
        fill
        sizes="100vw"
        quality={60}
        draggable={false}
      />

      <Image
        className="bottomFogOverlay"
        src={`${ASSET_ROOT}/bottom-fog.png`}
        alt=""
        fill
        sizes="100vw"
        quality={55}
        draggable={false}
      />

      <Image
        className="scratchesOverlay"
        src={`${ASSET_ROOT}/scratches.png`}
        alt=""
        fill
        sizes="100vw"
        quality={55}
        draggable={false}
      />

      <div className="scanlines" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
    <div className={`prompt ${isLeaving ? "promptBreaching" : ""}`}>
        <span>{promptText}</span>
        <span className="promptCursor">▮</span>
      </div>
    </main>
  );
}
