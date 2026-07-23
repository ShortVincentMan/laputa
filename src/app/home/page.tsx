"use client";

import {
  useCallback,
  useState,
} from "react";

import CyberpunkBackground from "@/components/background/CyberpunkBackground";
import GitHubPatchButton from "@/components/github/GitHubPatchButton";
import GitHubPatchWindow from "@/components/github/GitHubPatchWindow";
import MainMenu from "@/components/navigation/MainMenu";
import type { WindowType } from "@/components/navigation/MainMenu";
import ProjectsWindow from "@/components/projects/ProjectsWindow";
import TimePanel from "@/components/shared/TimePanel";
import MusicWindow from "@/components/spotify/MusicWindow";
import SpotifyHudButton from "@/components/spotify/SpotifyHudButton";
import AboutWindow from "@/components/windows/AboutWindow";
import ContactWindow from "@/components/windows/ContactWindow";
import CreditsWindow from "@/components/windows/CreditsWindow";
import ExperienceWindow from "@/components/windows/ExperienceWindow";

import styles from "./home.module.css";

export default function HomePage() {
  const [activeWindow, setActiveWindow] =
    useState<WindowType | null>(null);

  const [patchesOpen, setPatchesOpen] =
    useState(false);

  const closeWindow = useCallback(() => {
    setActiveWindow(null);
  }, []);

  const closePatches = useCallback(() => {
    setPatchesOpen(false);
  }, []);

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

          <GitHubPatchButton
            onOpen={() => setPatchesOpen(true)}
          />

          <SpotifyHudButton
            onOpen={() => setActiveWindow("music")}
          />
        </>
      )}

      {activeWindow && (
        <div className={styles.windowLayer}>
          {activeWindow === "projects" && (
            <ProjectsWindow
              onClose={closeWindow}
              onNavigate={setActiveWindow}
            />
          )}

          {activeWindow === "experience" && (
            <ExperienceWindow
              onClose={closeWindow}
              onNavigate={setActiveWindow}
            />
          )}

          {activeWindow === "about" && (
            <AboutWindow
              onClose={closeWindow}
              onNavigate={setActiveWindow}
            />
          )}

          {activeWindow === "contact" && (
            <ContactWindow onClose={closeWindow} />
          )}

          {activeWindow === "credits" && (
            <CreditsWindow onClose={closeWindow} />
          )}

          {activeWindow === "music" && (
            <MusicWindow onClose={closeWindow} />
          )}
        </div>
      )}

      {patchesOpen && (
        <GitHubPatchWindow
          onClose={closePatches}
        />
      )}
    </main>
  );
}