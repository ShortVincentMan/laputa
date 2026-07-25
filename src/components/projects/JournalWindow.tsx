"use client";

import { useEffect, useMemo, useState } from "react";

import type { WindowType } from "@/components/navigation/MainMenu";
import ActionBar from "@/components/shared/ActionBar";
import ActionKey from "@/components/shared/ActionKey";
import TopHud from "@/components/shared/TopHud";
import { journalEntries } from "@/data/journal";

import "./journal-window.css";

type JournalWindowProps = {
  onClose: () => void;
  onNavigate: (window: WindowType) => void;
};

export default function JournalWindow({
  onClose,
  onNavigate,
}: JournalWindowProps) {
  const [selectedId, setSelectedId] = useState(journalEntries[0]?.id ?? "");

  const selectedEntry = useMemo(
    () => journalEntries.find((entry) => entry.id === selectedId) ?? journalEntries[0],
    [selectedId]
  );

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "ArrowDown" && event.key !== "ArrowUp") {
        return;
      }

      event.preventDefault();
      const currentIndex = journalEntries.findIndex(
        (entry) => entry.id === selectedId
      );
      const direction = event.key === "ArrowDown" ? 1 : -1;
      const nextIndex =
        (currentIndex + direction + journalEntries.length) %
        journalEntries.length;

      setSelectedId(journalEntries[nextIndex].id);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, selectedId]);

  return (
    <section className="journalScreen" aria-label="Journal archive">
      <TopHud
        metrics={[
          { value: journalEntries.length, label: "LOGS", tone: "cyan" },
          { value: "01", label: "ACTIVE", tone: "green" },
        ]}
        navigation={[
          {
            id: "cyberware",
            label: "CYBERWARE",
            onClick: () => onNavigate("cyberware"),
          },
          {
            id: "inventory",
            label: "INVENTORY",
            onClick: () => onNavigate("experience"),
          },
          {
            id: "map",
            label: "MAP",
            onClick: () => onNavigate("contact"),
          },
          {
            id: "character",
            label: "CHARACTER",
            onClick: () => onNavigate("about"),
          },
          {
            id: "journal",
            label: "JOURNAL",
            active: true,
            submenu: [
              {
                id: "projects",
                label: "PROJECTS",
                onClick: () => onNavigate("projects"),
              },
              {
                id: "journal-log",
                label: "JOURNAL",
                active: true,
              },
              {
                id: "gallery",
                label: "GALLERY",
                onClick: () => onNavigate("gallery"),
              },
            ],
          },
        ]}
        archiveLabel="PERSONAL JOURNAL"
      />

      <div className="journalWorkspace">
        <aside className="journalIndex" aria-label="Journal entries">
          <header className="journalIndex__header">
            <span>ARCHIVED RECORDS</span>
            <strong>{String(journalEntries.length).padStart(2, "0")}</strong>
          </header>

          <div className="journalIndex__list">
            {journalEntries.map((entry, index) => {
              const active = entry.id === selectedEntry?.id;

              return (
                <button
                  key={entry.id}
                  type="button"
                  className={`journalEntryCard${active ? " is-active" : ""}`}
                  onClick={() => setSelectedId(entry.id)}
                >
                  <span className="journalEntryCard__index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="journalEntryCard__copy">
                    <small>{entry.category} // {entry.date}</small>
                    <strong>{entry.title}</strong>
                    <span>{entry.excerpt}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        {selectedEntry && (
          <article className="journalRecord">
            <header className="journalRecord__header">
              <div>
                <span>{selectedEntry.category} RECORD</span>
                <h1>{selectedEntry.title}</h1>
              </div>
              <time>{selectedEntry.date}</time>
            </header>

            <div className="journalRecord__divider" />

            <p className="journalRecord__lead">{selectedEntry.excerpt}</p>

            <div className="journalRecord__body">
              {selectedEntry.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <footer className="journalRecord__tags">
              {selectedEntry.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </footer>
          </article>
        )}
      </div>

      <ActionBar>
        <ActionKey keyLabel="↑ ↓" label="Select record" />
        <ActionKey keyLabel="ESC" label="Close" onClick={onClose} />
      </ActionBar>
    </section>
  );
}
