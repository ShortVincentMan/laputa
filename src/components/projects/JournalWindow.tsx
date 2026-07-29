"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type { WindowType } from "@/components/navigation/MainMenu";
import ActionBar from "@/components/shared/ActionBar";
import ActionKey from "@/components/shared/ActionKey";
import TopHud from "@/components/shared/TopHud";
import { getGalleryRecordById } from "@/data/gallery";
import {
  getJournalEntryById,
  journalEntries,
  type JournalEntry,
} from "@/data/journal";

import "./journal-window.css";

type JournalWindowProps = {
  onClose: () => void;
  onNavigate: (window: WindowType) => void;
  initialEntryId?: string | null;
  onOpenGallery: (galleryId: string) => void;
};

export default function JournalWindow({
  onClose,
  onNavigate,
  initialEntryId,
  onOpenGallery,
}: JournalWindowProps) {
  const initialEntry =
    getJournalEntryById(initialEntryId ?? null) ?? journalEntries[0];
  const [selectedId, setSelectedId] = useState(initialEntry?.id ?? "");
  const [detailOpen, setDetailOpen] = useState(Boolean(initialEntry));
  const entryButtonRefs = useRef(new Map<string, HTMLButtonElement>());

  const selectedEntry = useMemo(
    () => getJournalEntryById(selectedId) ?? journalEntries[0],
    [selectedId]
  );

  const relatedGallery = useMemo(
    () =>
      (selectedEntry?.relatedGalleryIds ?? [])
        .map((id) => getGalleryRecordById(id))
        .filter((record): record is NonNullable<typeof record> =>
          Boolean(record)
        ),
    [selectedEntry]
  );

  const openEntry = useCallback((entry: JournalEntry) => {
    setSelectedId(entry.id);
    setDetailOpen(true);
  }, []);

  const returnToIndex = useCallback(() => {
    setDetailOpen(false);
    window.requestAnimationFrame(() => {
      entryButtonRefs.current.get(selectedId)?.focus();
    });
  }, [selectedId]);

  const moveSelection = useCallback(
    (direction: 1 | -1) => {
      if (journalEntries.length === 0) return;

      const currentIndex = Math.max(
        0,
        journalEntries.findIndex((entry) => entry.id === selectedId)
      );
      const nextIndex =
        (currentIndex + direction + journalEntries.length) %
        journalEntries.length;

      openEntry(journalEntries[nextIndex]);
    },
    [openEntry, selectedId]
  );

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const target = event.target;
      const editing =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement;

      if (editing) return;

      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === "Backspace" && detailOpen) {
        event.preventDefault();
        returnToIndex();
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        moveSelection(1);
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        moveSelection(-1);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [detailOpen, moveSelection, onClose, returnToIndex]);

  return (
    <section
      className="journalScreen"
      role="dialog"
      aria-modal="true"
      aria-label="Journal archive"
    >
      <TopHud
        metrics={[
          { value: journalEntries.length, label: "LOGS", tone: "cyan" },
          {
            value: journalEntries.filter(
              (entry) => entry.featured
            ).length,
            label: "FEATURED",
            tone: "green",
          },
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

          {journalEntries.length > 0 ? (
            <div className="journalIndex__list">
              {journalEntries.map((entry, index) => {
                const active = entry.id === selectedEntry?.id;

                return (
                  <button
                    key={entry.id}
                    ref={(element) => {
                      if (element) {
                        entryButtonRefs.current.set(entry.id, element);
                      } else {
                        entryButtonRefs.current.delete(entry.id);
                      }
                    }}
                    type="button"
                    className={`journalEntryCard${
                      active ? " is-active" : ""
                    }`}
                    onClick={() => openEntry(entry)}
                    aria-pressed={active && detailOpen}
                  >
                    <span className="journalEntryCard__index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="journalEntryCard__copy">
                      <small>{`${entry.category} // ${entry.date}`}</small>
                      <strong>{entry.title}</strong>
                      <span>{entry.summary}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="journalEmptyState">
              <strong>NO SHARDS INDEXED</strong>
              <span>ARCHIVE CHANNEL READY</span>
            </div>
          )}
        </aside>

        {selectedEntry && detailOpen ? (
          <article className="journalRecord">
            <button
              type="button"
              className="journalRecord__back"
              onClick={returnToIndex}
            >
              <span>BKSP</span>
              BACK TO INDEX
            </button>

            <header className="journalRecord__header">
              <div>
                <span>{`${selectedEntry.category} // ${selectedEntry.status}`}</span>
                <h1>{selectedEntry.title}</h1>
              </div>
              <time>{selectedEntry.date}</time>
            </header>

            {selectedEntry.coverAsset && (
              <div className="journalRecord__cover">
                <Image
                  src={selectedEntry.coverAsset}
                  alt={selectedEntry.coverAlt ?? selectedEntry.title}
                  fill
                  sizes="(max-width: 900px) 100vw, 55vw"
                />
              </div>
            )}

            <div className="journalRecord__divider" />

            <p className="journalRecord__lead">{selectedEntry.summary}</p>

            <div className="journalRecord__body">
              {selectedEntry.body.map((section, index) => (
                <section key={`${selectedEntry.id}-section-${index}`}>
                  {section.heading && <h2>{section.heading}</h2>}
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </section>
              ))}
            </div>

            <footer className="journalRecord__tags">
              {selectedEntry.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </footer>

            {relatedGallery.length > 0 && (
              <nav
                className="journalRecord__relations"
                aria-label="Related archive records"
              >
                {relatedGallery.map((record) => (
                  <button
                    key={record.id}
                    type="button"
                    onClick={() => onOpenGallery(record.id)}
                  >
                    <span>GALLERY</span>
                    {record.title}
                  </button>
                ))}
              </nav>
            )}
          </article>
        ) : (
          <div className="journalRecord journalRecord--empty">
            <span>INDEX CHANNEL ACTIVE</span>
            <strong>SELECT A SHARD TO OPEN ITS FULL RECORD</strong>
          </div>
        )}
      </div>

      <ActionBar>
        <ActionKey keyLabel="↑ ↓" label="Select record" />
        {detailOpen && (
          <ActionKey
            keyLabel="BKSP"
            label="Back to index"
            onClick={returnToIndex}
          />
        )}
        <ActionKey keyLabel="ESC" label="Close" onClick={onClose} />
      </ActionBar>
    </section>
  );
}
