"use client";

import { useState } from "react";
import Image from "next/image";
import "./landing.css";

export default function LandingScreen() {
  const [entered, setEntered] = useState(false);

  if (entered) {
    return null;
  }

  return (
    <main className="landing" onClick={() => setEntered(true)}>
        <div className="camera">

      <div className="stage">

        {/* Background */}
        <Image
          src="/assets/landing/background.webp"
          alt=""
          fill
          priority
          className="bg"
        />

        {/* Left cyan interface */}
        <Image
          src="/assets/landing/cyan-bar.png"
          alt=""
          width={1700}
          height={450}
          priority
          className="cyan-bars"
        />

        {/* Scrolling red columns */}
        <div className="scroll-grid">
          {Array.from({ length: 6 }).map((_, block) => (
            <div className="scroll-panel" key={block}>
              <div className="scroll-text">
                {Array.from({ length: 35 }).map((_, i) => (
                  <p key={i}>MEMORY INDEX // DATA STREAM {i + 1}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Lower scrolling cyan bar */}
        <div className="lowerRightBarWrap">
          <div className="lowerRightBar"></div>
        </div>

        {/* Top right UI */}
        <div className="topright-wrap">
          <Image
            src="/assets/landing/topright.png"
            alt=""
            width={1700}
            height={450}
            className="topright"
          />
        </div>

        {/* Landing title */}
        <div className="landingTitle">
          Vincent Le
        </div>

        {/* Continue prompt */}
        <div className="prompt">
          CLICK TO CONTINUE
        </div>

        {/* Display effects */}
        <div className="scratches" />
        <div className="grunge" />
        <div className="scanlines" />
        <div className="grain" />

      </div>
      </div>
    </main>
  );
}