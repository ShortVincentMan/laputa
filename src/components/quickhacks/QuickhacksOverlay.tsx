"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

import type { WindowType } from "@/components/navigation/MainMenu";
import { BUILD } from "@/data/build";

import "./quickhacks-overlay.css";

type QuickhacksOverlayProps = {
  onClose: () => void;
  onNavigate: (window: WindowType) => void;
};

type Quickhack = {
  id: string;
  name: string;
  cost: number;
  detail: string;
  icon: string;
  destination?: WindowType;
  href?: string;
  blocked?: boolean;
};

const QUICKHACKS: Quickhack[] = [
  {
    id: "breach",
    name: "BREACH PROTOCOL",
    cost: 14,
    detail: "READY",
    icon: "⌘",
    destination: "about",
  },
  {
    id: "projects",
    name: "ACCESS PROJECT ARCHIVE",
    cost: 9,
    detail: "TRACEABLE",
    icon: "◇",
    destination: "projects",
  },
  {
    id: "experience",
    name: "TRACE EXPERIENCE",
    cost: 8,
    detail: "TRACEABLE",
    icon: "⌁",
    destination: "experience",
  },
  {
    id: "journal",
    name: "OPEN JOURNAL",
    cost: 7,
    detail: "READY",
    icon: "▤",
    destination: "journal",
  },
  {
    id: "gallery",
    name: "ACCESS VISUAL ARCHIVE",
    cost: 6,
    detail: "READY",
    icon: "▧",
    destination: "gallery",
  },
  {
    id: "music",
    name: "HIJACK AUDIO FEED",
    cost: 5,
    detail: "READY",
    icon: "♫",
    destination: "music",
  },
  {
    id: "contact",
    name: "OPEN COMMS CHANNEL",
    cost: 4,
    detail: "READY",
    icon: "⌁",
    destination: "contact",
  },
  {
    id: "resume",
    name: "EXTRACT CREDENTIALS",
    cost: 10,
    detail: "READY",
    icon: "⇩",
    href: "/resume.pdf",
  },
];

const FOCUSABLE_SELECTOR = [
  "button:not([disabled])",
  "[href]",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

export default function QuickhacksOverlay({
  onClose,
  onNavigate,
}: QuickhacksOverlayProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [ram, setRam] = useState(28);
  const [executingId, setExecutingId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const overlayRef = useRef<HTMLElement | null>(null);
  const executionTimeoutRef = useRef<number | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const selectedHack = QUICKHACKS[selectedIndex];

  const ramSegments = useMemo(
    () => Array.from({ length: 28 }, (_, index) => index < ram),
    [ram]
  );

  const executeHack = useCallback((hack: Quickhack) => {
    if (executingId || hack.blocked || ram < hack.cost) {
      return;
    }

    setExecutingId(hack.id);
    setRam((currentRam) => Math.max(0, currentRam - hack.cost));

    executionTimeoutRef.current = window.setTimeout(() => {
      if (hack.destination) {
        onNavigate(hack.destination);
      }

      if (hack.href) {
        window.open(
          hack.href,
          "_blank",
          "noopener,noreferrer"
        );
      }

      setExecutingId(null);
      onClose();
    }, 650);
  }, [executingId, onClose, onNavigate, ram]);

  useEffect(() => {
    previousFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const mountFrame = window.requestAnimationFrame(() => {
      setMounted(true);
    });

    return () => {
      window.cancelAnimationFrame(mountFrame);

      if (executionTimeoutRef.current !== null) {
        window.clearTimeout(executionTimeoutRef.current);
      }

      previousFocusRef.current?.focus({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    if (!mounted) {
      return;
    }

    const firstAvailableButton = overlayRef.current?.querySelector<HTMLElement>(
      ".quickhacksOverlay__item:not(:disabled)"
    );

    firstAvailableButton?.focus({ preventScroll: true });
  }, [mounted]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" || event.key.toLowerCase() === "q") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === "Tab") {
        const focusableElements = Array.from(
          overlayRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR) ?? []
        );

        if (focusableElements.length === 0) {
          event.preventDefault();
          return;
        }

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        const activeElement = document.activeElement;

        if (event.shiftKey && activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }

        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setSelectedIndex((current) =>
          current === QUICKHACKS.length - 1 ? 0 : current + 1
        );
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setSelectedIndex((current) =>
          current === 0 ? QUICKHACKS.length - 1 : current - 1
        );
        return;
      }

      if (event.key === "Enter") {
        event.preventDefault();
        executeHack(QUICKHACKS[selectedIndex]);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [executeHack, onClose, selectedIndex]);

  if (!mounted) {
    return null;
  }

  return createPortal(
    <section
      ref={overlayRef}
      className={`quickhacksOverlay${executingId ? " quickhacksOverlay--executing" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Quickhacks interface"
      onMouseDown={(event) => {
        const target = event.target;

        if (
          target === event.currentTarget ||
          (target instanceof HTMLElement && target.dataset.backdrop === "true")
        ) {
          onClose();
        }
      }}
    >
      <div className="quickhacksOverlay__wash" data-backdrop="true" aria-hidden="true" />
      <div className="quickhacksOverlay__scanlines" data-backdrop="true" aria-hidden="true" />
      <div className="quickhacksOverlay__vignette" data-backdrop="true" aria-hidden="true" />
      <div className="quickhacksOverlay__noise" data-backdrop="true" aria-hidden="true" />

      <header className="quickhacksOverlay__ram">
        <div className="quickhacksOverlay__ramMeta">
          <span>RESOURCES // 2284-302</span>
          <strong>CYBERDECK RAM: {ram}/28</strong>
        </div>

        <div
          className="quickhacksOverlay__ramTrack"
          aria-label={`${ram} of 28 RAM available`}
        >
          {ramSegments.map((isActive, index) => (
            <span
              key={index}
              className={isActive ? "is-active" : ""}
              aria-hidden="true"
            />
          ))}
        </div>
      </header>

      <aside className="quickhacksOverlay__list" aria-label="Available quickhacks">
        <div className="quickhacksOverlay__listHeading">
          <span>CYBERDECK // V.5E 322</span>
          <strong>AVAILABLE QUICKHACKS:</strong>
        </div>

        <div className="quickhacksOverlay__items">
          {QUICKHACKS.map((hack, index) => {
            const isSelected = index === selectedIndex;
            const isExecuting = executingId === hack.id;
            const isDisabled = hack.blocked || ram < hack.cost;

            return (
              <button
                key={hack.id}
                type="button"
                className={`quickhacksOverlay__item${isSelected ? " is-selected" : ""}${isExecuting ? " is-executing" : ""}${hack.blocked ? " is-blocked" : ""}`}
                onMouseEnter={() => setSelectedIndex(index)}
                onFocus={() => setSelectedIndex(index)}
                onClick={() => executeHack(hack)}
                disabled={isDisabled || Boolean(executingId)}
                aria-current={isSelected ? "true" : undefined}
              >
                <span className="quickhacksOverlay__itemCopy">
                  <strong>{hack.name}</strong>
                  <small>
                    {isExecuting
                      ? "EXECUTING"
                      : hack.blocked
                        ? "BLOCKED"
                        : ram < hack.cost
                          ? "INSUFFICIENT RAM"
                          : hack.detail}
                  </small>
                </span>

                <span className="quickhacksOverlay__cost">{hack.cost}</span>
                <span className="quickhacksOverlay__hackIcon" aria-hidden="true">
                  {hack.icon}
                </span>
              </button>
            );
          })}
        </div>
      </aside>

      <div className="quickhacksOverlay__targetName">
        <span aria-hidden="true">⌬</span>
        <strong>VINCENT // LAPUTA OS</strong>
      </div>

      <div className="quickhacksOverlay__scanner" aria-hidden="true">
        <span className="quickhacksOverlay__scannerRing" />
        <span className="quickhacksOverlay__scannerReticle" />
        <span className="quickhacksOverlay__scannerReadout quickhacksOverlay__scannerReadout--left">
          1x
        </span>
        <span className="quickhacksOverlay__scannerReadout quickhacksOverlay__scannerReadout--right">
          77.2
        </span>

        {Array.from({ length: 10 }, (_, index) => (
          <span
            key={index}
            className={`quickhacksOverlay__scannerPoint quickhacksOverlay__scannerPoint--${index + 1}`}
          />
        ))}
      </div>

      <aside className="quickhacksOverlay__dataPanel">
        <div className="quickhacksOverlay__tabs" aria-hidden="true">
          <span className="is-active">DATA</span>
          <span>HACKING</span>
          <span className="quickhacksOverlay__tabKey">Z</span>
        </div>

        <div className="quickhacksOverlay__dataBody">
          <p className="quickhacksOverlay__scanResult">SCAN RESULTS</p>
          <p className="quickhacksOverlay__manufacturer">LAPUTA SYSTEMS</p>
          <h2>{selectedHack.name}</h2>

          <dl className="quickhacksOverlay__stats">
            <div>
              <dt>BUILD</dt>
              <dd>{BUILD.display}</dd>
            </div>
            <div>
              <dt>INTERFACE</dt>
              <dd>NEURAL-LINK</dd>
            </div>
            <div>
              <dt>RAM COST</dt>
              <dd>{selectedHack.cost}</dd>
            </div>
            <div>
              <dt>STATUS</dt>
              <dd>
                {selectedHack.blocked
                  ? "BLOCKED"
                  : ram >= selectedHack.cost
                    ? "AVAILABLE"
                    : "LOCKED"}
              </dd>
            </div>
          </dl>

          <div className="quickhacksOverlay__info">
            <span>INFO:</span>
            <p>
              Hidden portfolio command interface. Select a quickhack to inspect
              project files, engineering history, development records, media,
              communications, or archived credentials.
            </p>
          </div>
        </div>
      </aside>

      <footer className="quickhacksOverlay__controls">
        <span><kbd>ENTER</kbd> EXECUTE</span>
        <span><kbd>↑ ↓</kbd> CHANGE TARGET</span>
        <span><kbd>Q</kbd> CLOSE</span>
        <span><kbd>ESC</kbd> EXIT</span>
      </footer>
    </section>,
    document.body
  );
}
