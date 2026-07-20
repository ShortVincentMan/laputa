"use client";

import { useState } from "react";

import CyberpunkBackground from "@/components/background/CyberpunkBackground";
import MainMenu from "@/components/navigation/MainMenu";
import ProjectsWindow from "@/components/windows/ProjectsWindow";

import styles from "./home.module.css";

type WindowType =
  | "projects"
  | "experience"
  | "about"
  | "contact";

export default function HomePage() {
  const [activeWindow, setActiveWindow] =
    useState<WindowType | null>(null);

  function openWindow(window: WindowType) {
    setActiveWindow(window);
  }

  function closeWindow() {
    setActiveWindow(null);
  }

  return (
    <main className={styles.homePage}>
      <CyberpunkBackground muted />

      <MainMenu
        variant="home"
        activeWindow={activeWindow}
        onNavigate={openWindow}
        onHome={closeWindow}
      />

      <section className={styles.homeContent}>
        {/* Default desktop content */}
      </section>

      {activeWindow && (
        <div className={styles.windowLayer}>
          {activeWindow === "projects" && (
            <ProjectsWindow onClose={closeWindow} />
          )}

          {activeWindow === "experience" && (
            <div>Experience window</div>
          )}

          {activeWindow === "about" && (
            <div>About window</div>
          )}

          {activeWindow === "contact" && (
            <div>Contact window</div>
          )}
        </div>
      )}
    </main>
  );
}