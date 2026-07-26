"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import dynamic from "next/dynamic";

import CyberpunkBackground from "@/components/background/CyberpunkBackground";
import GitHubPatchButton from "@/components/github/GitHubPatchButton";
import MainMenu from "@/components/navigation/MainMenu";
import type { WindowType } from "@/components/navigation/MainMenu";
import ActionKey from "@/components/shared/ActionKey";
import TimePanel from "@/components/shared/TimePanel";
import SpotifyHudButton from "@/components/spotify/SpotifyHudButton";
import type { ProjectId } from "@/data/projects";
import useKonamiCode from "@/hooks/useKonamiCode";
import useModalFocusManager from "@/hooks/useModalFocusManager";
import usePageVisibility from "@/hooks/usePageVisibility";

import "@/data/archive-relations";
import "@/components/shared/action-bar.css";
import styles from "./home.module.css";

const QUICKHACKS_STORAGE_KEY = "laputa-quickhacks-unlocked";
const WINDOW_TYPES: WindowType[] = [
  "projects",
  "cyberware",
  "experience",
  "about",
  "contact",
  "credits",
  "music",
  "journal",
  "gallery",
];

function getHashWindow(): WindowType | null {
  const hash = window.location.hash.slice(1);

  return WINDOW_TYPES.includes(hash as WindowType)
    ? (hash as WindowType)
    : null;
}

function replaceWindowHash(windowType: WindowType | null) {
  const baseUrl =
    window.location.pathname + window.location.search;

  window.history.replaceState(
    null,
    "",
    windowType ? `${baseUrl}#${windowType}` : baseUrl
  );
}

function WindowLoading() {
  return (
    <div
      className={styles.windowLoading}
      role="status"
      aria-live="polite"
      aria-label="Loading interface"
    >
      <div className={styles.windowLoadingPanel}>
        <span className={styles.windowLoadingIcon} aria-hidden="true">
          <span className={styles.windowLoadingIconRing} />
          <span className={styles.windowLoadingIconCore} />
          <span className={styles.windowLoadingIconSweep} />
        </span>

        <span className={styles.windowLoadingDivider} aria-hidden="true" />

        <span className={styles.windowLoadingText}>
          LOADING INTERFACE...
        </span>
      </div>
    </div>
  );
}

const AboutWindow = dynamic(
  () => import("@/components/windows/AboutWindow"),
  { loading: WindowLoading }
);
const ContactWindow = dynamic(
  () => import("@/components/windows/ContactWindow"),
  { loading: WindowLoading }
);
const CreditsWindow = dynamic(
  () => import("@/components/windows/CreditsWindow"),
  { loading: WindowLoading }
);
const ExperienceWindow = dynamic(
  () => import("@/components/windows/ExperienceWindow"),
  { loading: WindowLoading }
);
const GalleryWindow = dynamic(
  () => import("@/components/projects/GalleryWindow"),
  { loading: WindowLoading }
);
const GitHubPatchWindow = dynamic(
  () => import("@/components/github/GitHubPatchWindow"),
  { loading: WindowLoading }
);
const JournalWindow = dynamic(
  () => import("@/components/projects/JournalWindow"),
  { loading: WindowLoading }
);
const MusicWindow = dynamic(
  () => import("@/components/spotify/MusicWindow"),
  { loading: WindowLoading }
);
const ProjectsWindow = dynamic(
  () => import("@/components/projects/ProjectsWindow"),
  { loading: WindowLoading }
);
const QuickhacksOverlay = dynamic(
  () => import("@/components/quickhacks/QuickhacksOverlay"),
  { loading: WindowLoading }
);

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
  usePageVisibility();

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
  const focusReturnIdRef = useRef<string | null>(null);

  useModalFocusManager(
    Boolean(activeWindow || patchesOpen || quickhacksOpen)
  );

  const rememberFocusReturn = useCallback(() => {
    const activeElement =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const focusReturnId =
      activeElement?.dataset.focusReturn;

    if (focusReturnId) {
      focusReturnIdRef.current = focusReturnId;
    }
  }, []);

  const restoreFocus = useCallback(() => {
    const focusReturnId = focusReturnIdRef.current;

    if (!focusReturnId) {
      return;
    }

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        document
          .querySelector<HTMLElement>(
            `[data-focus-return="${focusReturnId}"]`
          )
          ?.focus({ preventScroll: true });
      });
    });
  }, []);

  const closeWindow = useCallback(() => {
    setActiveWindow(null);
    setProjectTargetId(null);
    setJournalTargetId(null);
    setGalleryTargetId(null);
    replaceWindowHash(null);
    restoreFocus();
  }, [restoreFocus]);

  const navigateToWindow = useCallback((window: WindowType) => {
    rememberFocusReturn();
    setProjectTargetId(null);
    setJournalTargetId(null);
    setGalleryTargetId(null);
    setActiveWindow(window);
    replaceWindowHash(window);
  }, [rememberFocusReturn]);

  const openProject = useCallback((projectId: ProjectId) => {
    setProjectTargetId(projectId);
    setJournalTargetId(null);
    setGalleryTargetId(null);
    setActiveWindow("projects");
    replaceWindowHash("projects");
  }, []);

  const openJournal = useCallback((journalId: string) => {
    setProjectTargetId(null);
    setJournalTargetId(journalId);
    setGalleryTargetId(null);
    setActiveWindow("journal");
    replaceWindowHash("journal");
  }, []);

  const openGallery = useCallback((galleryId: string) => {
    setProjectTargetId(null);
    setJournalTargetId(null);
    setGalleryTargetId(galleryId);
    setActiveWindow("gallery");
    replaceWindowHash("gallery");
  }, []);

  const openPatches = useCallback(() => {
    rememberFocusReturn();
    setPatchesOpen(true);
  }, [rememberFocusReturn]);

  const closePatches = useCallback(() => {
    setPatchesOpen(false);
    restoreFocus();
  }, [restoreFocus]);

  const openQuickhacks = useCallback(() => {
    rememberFocusReturn();
    setQuickhacksOpen(true);
  }, [rememberFocusReturn]);

  const closeQuickhacks = useCallback(() => {
    setQuickhacksOpen(false);
    restoreFocus();
  }, [restoreFocus]);

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
    function syncHashWindow() {
      const hashWindow = getHashWindow();

      if (hashWindow) {
        setActiveWindow(hashWindow);
      }
    }

    syncHashWindow();
    window.addEventListener("hashchange", syncHashWindow);

    return () => {
      window.removeEventListener(
        "hashchange",
        syncHashWindow
      );
    };
  }, []);

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
      openQuickhacks();
    }

    window.addEventListener("keydown", handleQuickhacksShortcut);

    return () => {
      window.removeEventListener("keydown", handleQuickhacksShortcut);
    };
  }, [openQuickhacks, quickhacksOpen, quickhacksUnlocked]);

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
            onOpen={openPatches}
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
              onClose={closeWindow}
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
            onClick={openQuickhacks}
            ariaLabel="Open quickhacks"
            focusReturnId="quickhacks"
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
