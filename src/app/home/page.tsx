"use client";

import { useState } from "react";

import CyberpunkBackground from "@/components/background/CyberpunkBackground";
import MainMenu from "@/components/navigation/MainMenu";
import ProjectsWindow from "@/components/projects/ProjectsWindow";
import AboutWindow from "@/components/windows/AboutWindow";
import ContactWindow from "@/components/windows/ContactWindow";
import CreditsWindow from "@/components/windows/CreditsWindow";
import ExperienceWindow from "@/components/windows/ExperienceWindow";
import TimePanel from "@/components/shared/TimePanel";
import type { WindowType } from "@/components/navigation/MainMenu";

import styles from "./home.module.css";

export default function HomePage() {
  const [activeWindow, setActiveWindow] =
    useState<WindowType | null>(null);

  function closeWindow() {
    setActiveWindow(null);
  }

  return (
    <main className={styles.homePage}>
      <CyberpunkBackground muted />
        {!activeWindow && (
          <>
            <MainMenu
              variant="home"
              activeWindow={activeWindow}
              onNavigate={setActiveWindow}
              onHome={closeWindow}
            />

            <div className="hud-layer">
              <TimePanel className="hud-clock" />
            </div>
          </>
        )}
      {activeWindow && (
        <div className={styles.windowLayer}>
          {activeWindow === "projects" && (
            <ProjectsWindow onClose={closeWindow} />
          )}

          {activeWindow === "experience" && (
            <ExperienceWindow onClose={closeWindow} />
          )}

          {activeWindow === "about" && (
            <AboutWindow onClose={closeWindow} />
          )}

          {activeWindow === "contact" && (
            <ContactWindow onClose={closeWindow} />
          )}

          {activeWindow === "credits" && (
            <CreditsWindow onClose={closeWindow} />
          )}
        </div>
      )}
    </main>
  );
}
