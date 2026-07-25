"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import CyberpunkBackground from "@/components/background/CyberpunkBackground";
import GitHubPatchButton from "@/components/github/GitHubPatchButton";
import GitHubPatchWindow from "@/components/github/GitHubPatchWindow";
import MainMenu from "@/components/navigation/MainMenu";
import type { WindowType } from "@/components/navigation/MainMenu";
import GalleryWindow from "@/components/projects/GalleryWindow";
import JournalWindow from "@/components/projects/JournalWindow";
import ProjectsWindow from "@/components/projects/ProjectsWindow";
import QuickhacksOverlay from "@/components/quickhacks/QuickhacksOverlay";
import ActionKey from "@/components/shared/ActionKey";
import TimePanel from "@/components/shared/TimePanel";
import MusicWindow from "@/components/spotify/MusicWindow";
import SpotifyHudButton from "@/components/spotify/SpotifyHudButton";
import AboutWindow from "@/components/windows/AboutWindow";
import ContactWindow from "@/components/windows/ContactWindow";
import CreditsWindow from "@/components/windows/CreditsWindow";
import ExperienceWindow from "@/components/windows/ExperienceWindow";

import "@/components/shared/action-bar.css";
import styles from "./home.module.css";

const QUICKHACKS_STORAGE_KEY = "laputa-quickhacks-unlocked";
const KONAMI_SEQUENCE = [
  "arrowup",
  "arrowup",
  "arrowdown",
  "arrowdown",
  "arrowleft",
  "arrowright",
  "arrowleft",
  "arrowright",
  "b",
  "a",
];

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  return Boolean(
    target.closest(
      'input, textarea, select, [contenteditable="true"], [role="textbox"]'
    )
  );
}

export default function HomePage() {
  const [activeWindow, setActiveWindow] =
    useState<WindowType | null>(null);

  const [patchesOpen, setPatchesOpen] =
    useState(false);

  const [quickhacksUnlocked, setQuickhacksUnlocked] =
    useState(false);

  const [quickhacksOpen, setQuickhacksOpen] =
    useState(false);

  const [showUnlockNotice, setShowUnlockNotice] =
    useState(false);

  const konamiIndexRef = useRef(0);
  const unlockNoticeTimeoutRef = useRef<number | null>(null);

  const closeWindow = useCallback(() => {
    setActiveWindow(null);
  }, []);

  const closePatches = useCallback(() => {
    setPatchesOpen(false);
  }, []);

  const closeQuickhacks = useCallback(() => {
    setQuickhacksOpen(false);
  }, []);

  useEffect(() => {
    setQuickhacksUnlocked(
      window.localStorage.getItem(QUICKHACKS_STORAGE_KEY) === "true"
    );

    return () => {
      if (unlockNoticeTimeoutRef.current !== null) {
        window.clearTimeout(unlockNoticeTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    function handleGlobalKeyDown(event: KeyboardEvent) {
      if (isEditableTarget(event.target)) {
        return;
      }

      const normalizedKey = event.key.toLowerCase();

      if (
        quickhacksUnlocked &&
        !event.ctrlKey &&
        !event.altKey &&
        !event.metaKey &&
        normalizedKey === "q"
      ) {
        event.preventDefault();
        setQuickhacksOpen((current) => !current);
        return;
      }

      if (quickhacksUnlocked || quickhacksOpen) {
        return;
      }

      const expectedKey = KONAMI_SEQUENCE[konamiIndexRef.current];

      if (normalizedKey === expectedKey) {
        konamiIndexRef.current += 1;

        if (konamiIndexRef.current === KONAMI_SEQUENCE.length) {
          konamiIndexRef.current = 0;
          window.localStorage.setItem(QUICKHACKS_STORAGE_KEY, "true");
          setQuickhacksUnlocked(true);
          setShowUnlockNotice(true);
          setQuickhacksOpen(true);

          if (unlockNoticeTimeoutRef.current !== null) {
            window.clearTimeout(unlockNoticeTimeoutRef.current);
          }

          unlockNoticeTimeoutRef.current = window.setTimeout(() => {
            setShowUnlockNotice(false);
          }, 2600);
        }

        return;
      }

      konamiIndexRef.current =
        normalizedKey === KONAMI_SEQUENCE[0] ? 1 : 0;
    }

    window.addEventListener("keydown", handleGlobalKeyDown);

    return () => {
      window.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, [quickhacksOpen, quickhacksUnlocked]);

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

          {activeWindow === "cyberware" && (
            <ProjectsWindow
              initialView="cyberware"
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

          {activeWindow === "journal" && (
            <JournalWindow
              onClose={closeWindow}
              onNavigate={setActiveWindow}
            />
          )}

          {activeWindow === "gallery" && (
            <GalleryWindow
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
            <ContactWindow
              onClose={() => setActiveWindow(null)}
              onNavigate={setActiveWindow}
            />
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

      {quickhacksUnlocked && !quickhacksOpen && (
        <div className={styles.quickhacksAction}>
          <ActionKey
            keyLabel="Q"
            label="Quickhacks"
            onClick={() => setQuickhacksOpen(true)}
            ariaLabel="Open quickhacks"
          />
        </div>
      )}

      {showUnlockNotice && (
        <div className={styles.quickhacksUnlockNotice} role="status">
          <span>ACCESS GRANTED</span>
          <strong>QUICKHACKS UNLOCKED</strong>
          <small>PRESS Q TO TOGGLE</small>
        </div>
      )}

      {quickhacksOpen && (
        <QuickhacksOverlay
          onClose={closeQuickhacks}
          onNavigate={(window) => {
            setActiveWindow(window);
            setQuickhacksOpen(false);
          }}
        />
      )}
    </main>
  );
}