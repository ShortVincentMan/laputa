"use client";

import { useState } from "react";
import "./landing.css";
import Image from "next/image";

export default function LandingScreen() {
  const [entered, setEntered] = useState(false);
  
  if (entered) {
    return (
        <main className="main-site">
            <h1>Vincent Le</h1>
        </main>
    );
  }
  return (
    <main className="landing" onClick={() => setEntered(true)}>
        <div className="stage">
            <img className = "bg" src="/background.webp" alt="" />
            
            <Image
            src="/cyan-bar.png"
            alt=""
            width={1700}
            height={450}
            className="cyan-bars"
            loading="eager"
            />
            <img className="logo" src="/assets/logo.png" alt="" />
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

            <div className= "scratches" />
            <div className="scanlines" />
            <div className="grain" />

            <button className="prompt">
                CLICK TO CONTINUE
            </button>
        </div>
    </main>
  );
}