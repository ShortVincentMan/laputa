"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type { WindowType } from "@/components/navigation/MainMenu";
import ActionBar from "@/components/shared/ActionBar";
import ActionKey from "@/components/shared/ActionKey";
import TopHud from "@/components/shared/TopHud";
import {
  galleryCategories,
  galleryRecords,
  getGalleryRecordById,
  type GalleryCategory,
  type GalleryRecord,
} from "@/data/gallery";
import { getJournalEntryById } from "@/data/journal";
import { getProjectById, type ProjectId } from "@/data/projects";

import "./gallery-window.css";

type GalleryWindowProps = {
  onClose: () => void;
  onNavigate: (window: WindowType) => void;
  initialRecordId?: string | null;
  onOpenProject: (projectId: ProjectId) => void;
  onOpenJournal: (journalId: string) => void;
};

export default function GalleryWindow({
  onClose,
  onNavigate,
  initialRecordId,
  onOpenProject,
  onOpenJournal,
}: GalleryWindowProps) {
  const [activeCategory, setActiveCategory] =
    useState<GalleryCategory>("ALL");
  const [expandedId, setExpandedId] = useState<string | null>(() =>
    getGalleryRecordById(initialRecordId ?? null)?.id ?? null
  );
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const visibleRecords = useMemo(
    () =>
      activeCategory === "ALL"
        ? galleryRecords
        : galleryRecords.filter(
            (record) => record.category === activeCategory
          ),
    [activeCategory]
  );

  const expandedRecord = getGalleryRecordById(expandedId);
  const expandedIndex = expandedRecord
    ? visibleRecords.findIndex((record) => record.id === expandedRecord.id)
    : -1;
  const lightboxOpen = Boolean(expandedRecord);

  const relatedProject = expandedRecord?.relatedProjectId
    ? getProjectById(expandedRecord.relatedProjectId)
    : undefined;
  const relatedJournals = useMemo(
    () =>
      (expandedRecord?.relatedJournalIds ?? [])
        .map((id) => getJournalEntryById(id))
        .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry)),
    [expandedRecord]
  );

  const closeLightbox = useCallback(() => {
    setExpandedId(null);
  }, []);

  const moveLightbox = useCallback(
    (direction: 1 | -1) => {
      if (expandedIndex < 0 || visibleRecords.length < 2) return;

      const nextIndex =
        (expandedIndex + direction + visibleRecords.length) %
        visibleRecords.length;
      setExpandedId(visibleRecords[nextIndex].id);
    },
    [expandedIndex, visibleRecords]
  );

  useEffect(() => {
    if (!lightboxOpen) return;

    const previousOverflow = document.body.style.overflow;
    const focusTarget = previousFocusRef.current;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus({ preventScroll: true });

    return () => {
      document.body.style.overflow = previousOverflow;
      focusTarget?.focus({ preventScroll: true });
    };
  }, [lightboxOpen]);

  useEffect(() => {
    if (!lightboxOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeLightbox();
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        moveLightbox(-1);
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        moveLightbox(1);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeLightbox, lightboxOpen, moveLightbox]);

  function changeCategory(category: GalleryCategory) {
    setActiveCategory(category);
    closeLightbox();
  }

  function openRecord(
    record: GalleryRecord,
    trigger?: HTMLElement
  ) {
    previousFocusRef.current =
      trigger ??
      (document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null);
    setExpandedId(record.id);
  }

  return (
    <section className="galleryScreen" aria-label="Visual archive">
      <TopHud
        metrics={[
          { value: galleryRecords.length, label: "FILES", tone: "cyan" },
          { value: visibleRecords.length, label: "VISIBLE", tone: "green" },
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
                onClick: () => onNavigate("journal"),
              },
              {
                id: "gallery",
                label: "GALLERY",
                active: true,
              },
            ],
          },
        ]}
        archiveLabel="VISUAL ARCHIVE"
      />

      <div className="galleryWorkspace">
        <nav className="galleryCategories" aria-label="Gallery categories">
          {galleryCategories.map((category) => (
            <button
              key={category}
              type="button"
              className={category === activeCategory ? "is-active" : ""}
              onClick={() => changeCategory(category)}
            >
              {category}
            </button>
          ))}
        </nav>

        {visibleRecords.length > 0 ? (
          <section className="galleryGrid" aria-label="Gallery files">
            {visibleRecords.map((record, index) => (
              <button
                key={record.id}
                type="button"
                className="galleryTile"
                onClick={(event) =>
                  openRecord(record, event.currentTarget)
                }
                aria-label={`Open ${record.title}`}
              >
                <span className="galleryTile__image">
                  {record.asset ? (
                    <Image
                      src={record.asset}
                      alt={record.alt}
                      fill
                      sizes="(max-width: 760px) 46vw, (max-width: 1200px) 30vw, 18vw"
                    />
                  ) : (
                    <span
                      className="galleryTile__placeholder"
                      aria-label="Image pending"
                    >
                      <span className="galleryTile__camera" aria-hidden="true">
                        ◉
                      </span>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <small>ASSET PENDING</small>
                    </span>
                  )}
                </span>

                <span className="galleryTile__meta">
                  <small>{record.category}</small>
                  <strong>{record.title}</strong>
                </span>
              </button>
            ))}
          </section>
        ) : (
          <div className="galleryEmptyState">
            <strong>NO VISUAL RECORDS FOUND</strong>
            <span>SELECT ANOTHER ARCHIVE CHANNEL</span>
          </div>
        )}
      </div>

      <ActionBar>
        <ActionKey keyLabel="ENTER" label="Open image" />
        <ActionKey keyLabel="ESC" label="Close" onClick={onClose} />
      </ActionBar>

      {expandedRecord && (
        <div
          className="galleryLightbox"
          role="dialog"
          aria-modal="true"
          aria-label={expandedRecord.title}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeLightbox();
            }
          }}
        >
          <article className="galleryLightbox__panel">
            <button
              ref={closeButtonRef}
              type="button"
              className="galleryLightbox__close"
              aria-label="Close image"
              onClick={closeLightbox}
            >
              ×
            </button>

            <button
              type="button"
              className="galleryLightbox__nav galleryLightbox__nav--previous"
              aria-label="Previous image"
              onClick={() => moveLightbox(-1)}
              disabled={visibleRecords.length < 2}
            >
              ‹
            </button>

            <button
              type="button"
              className="galleryLightbox__nav galleryLightbox__nav--next"
              aria-label="Next image"
              onClick={() => moveLightbox(1)}
              disabled={visibleRecords.length < 2}
            >
              ›
            </button>

            <div className="galleryLightbox__image">
              {expandedRecord.asset ? (
                <Image
                  src={expandedRecord.asset}
                  alt={expandedRecord.alt}
                  fill
                  priority
                  sizes="100vw"
                />
              ) : (
                <div className="galleryLightbox__placeholder">
                  <span>IMAGE SLOT</span>
                  <strong>ASSET PENDING</strong>
                </div>
              )}
            </div>

            <div className="galleryLightbox__copy" aria-live="polite">
              <span>
                {[
                  expandedRecord.category,
                  expandedRecord.date,
                  expandedRecord.orientation,
                ]
                  .filter(Boolean)
                  .join(" // ")}
              </span>
              <h1>{expandedRecord.title}</h1>
              {expandedRecord.caption && <p>{expandedRecord.caption}</p>}

              {(relatedProject || relatedJournals.length > 0) && (
                <nav
                  className="galleryLightbox__relations"
                  aria-label="Related archive records"
                >
                  {relatedProject && (
                    <button
                      type="button"
                      onClick={() => onOpenProject(relatedProject.id)}
                    >
                      PROJECT // {relatedProject.title}
                    </button>
                  )}
                  {relatedJournals.map((entry) => (
                    <button
                      key={entry.id}
                      type="button"
                      onClick={() => onOpenJournal(entry.id)}
                    >
                      JOURNAL // {entry.title}
                    </button>
                  ))}
                </nav>
              )}

              <small className="galleryLightbox__counter">
                {String(expandedIndex + 1).padStart(2, "0")} /{" "}
                {String(visibleRecords.length).padStart(2, "0")}
              </small>
            </div>
          </article>
        </div>
      )}
    </section>
  );
}
