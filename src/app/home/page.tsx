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
import type { ProjectId } from "@/data/projects";
import useKonamiCode from "@/hooks/useKonamiCode";

import "@/data/archive-relations";
import "@/components/shared/action-bar.css";
import styles from "./home.module.css";

const QUICKHACKS_STORAGE_KEY = "laputa-quickhacks-unlocked";

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
  const [projectTargetId, setProjectTargetId] =
    useState<ProjectId | null>(null);
  const [journalTargetId, setJournalTargetId] =
    useState<string | null>(null);
  const [galleryTargetId, setGalleryTargetId] =
    useState<string | null>(null);

  const [patchesOpen, setPatchesOpen] =
    useState(false);

  const [quickhacksUnlocked, setQuickhacksUnlocked] =
    useState(false);

  const [quickhacksOpen, setQuickhacksOpen] =
    useState(false);

  const [showUnlockNotice, setShowUnlockNotice] =
    useState(false);

  const unlockNoticeTimeoutRef = useRef<number | null>(null);

  const closeWindow = useCallback(() => {
    setActiveWindow(null);
    setProjectTargetId(null);
    setJournalTargetId(null);
    setGalleryTargetId(null);
  }, []);

  const navigateToWindow = useCallback((window: WindowType) => {
    setProjectTargetId(null);
    setJournalTargetId(null);
    setGalleryTargetId(null);
    setActiveWindow(window);
  }, []);

  const openProject = useCallback((projectId: ProjectId) => {
    setProjectTargetId(projectId);
    setJournalTargetId(null);
    setGalleryTargetId(null);
    setActiveWindow("projects");
  }, []);

  const openJournal = useCallback((journalId: string) => {
    setProjectTargetId(null);
    setJournalTargetId(journalId);
    setGalleryTargetId(null);
    setActiveWindow("journal");
  }, []);

  const openGallery = useCallback((galleryId: string) => {
    setProjectTargetId(null);
    setJournalTargetId(null);
    setGalleryTargetId(galleryId);
    setActiveWindow("gallery");
  }, []);

  const closePatches = useCallback(() => {
    setPatchesOpen(false);
  }, []);

  const closeQuickhacks = useCallback(() => {
    setQuickhacksOpen(false);
  }, []);

  const unlockQuickhacks = useCallback(() => {
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
  }, []);

  useKonamiCode({
    onSuccess: unlockQuickhacks,
    enabled: !quickhacksUnlocked && !quickhacksOpen,
  });

  useEffect(() => {
    const initializationFrame = window.requestAnimationFrame(() => {
      setQuickhacksUnlocked(
        window.localStorage.getItem(QUICKHACKS_STORAGE_KEY) === "true"
      );
    });

    return () => {
      window.cancelAnimationFrame(initializationFrame);

      if (unlockNoticeTimeoutRef.current !== null) {
        window.clearTimeout(unlockNoticeTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!quickhacksUnlocked || quickhacksOpen) {
      return;
    }

    function handleQuickhacksShortcut(event: KeyboardEvent) {
      if (
        isEditableTarget(event.target) ||
        event.ctrlKey ||
        event.altKey ||
        event.metaKey ||
        event.key.toLowerCase() !== "q"
      ) {
        return;
      }

      event.preventDefault();
      setQuickhacksOpen(true);
    }

    window.addEventListener("keydown", handleQuickhacksShortcut);

    return () => {
      window.removeEventListener("keydown", handleQuickhacksShortcut);
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
            onNavigate={navigateToWindow}
            onHome={closeWindow}
          />

          <div className="hud-layer">
            <TimePanel className="hud-clock" />
          </div>

          <GitHubPatchButton
            onOpen={() => setPatchesOpen(true)}
          />

          <SpotifyHudButton
            onOpen={() => navigateToWindow("music")}
          />
        </>
      )}

      {activeWindow && (
        <div className={styles.windowLayer}>
          {activeWindow === "projects" && (
            <ProjectsWindow
              initialProjectId={projectTargetId}
              onClose={closeWindow}
              onNavigate={navigateToWindow}
            />
          )}

          {activeWindow === "cyberware" && (
            <ProjectsWindow
              initialView="cyberware"
              onClose={closeWindow}
              onNavigate={navigateToWindow}
            />
          )}

          {activeWindow === "experience" && (
            <ExperienceWindow
              onClose={closeWindow}
              onNavigate={navigateToWindow}
            />
          )}

          {activeWindow === "journal" && (
            <JournalWindow
              initialEntryId={journalTargetId}
              onClose={closeWindow}
              onNavigate={navigateToWindow}
              onOpenGallery={openGallery}
            />
          )}

          {activeWindow === "gallery" && (
            <GalleryWindow
              initialRecordId={galleryTargetId}
              onClose={closeWindow}
              onNavigate={navigateToWindow}
              onOpenProject={openProject}
              onOpenJournal={openJournal}
            />
          )}

          {activeWindow === "about" && (
            <AboutWindow
              onClose={closeWindow}
              onNavigate={navigateToWindow}
            />
          )}

          {activeWindow === "contact" && (
            <ContactWindow
              onClose={() => setActiveWindow(null)}
              onNavigate={navigateToWindow}
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
            navigateToWindow(window);
            setQuickhacksOpen(false);
          }}
        />
      )}
    </main>
  );
}
