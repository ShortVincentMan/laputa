"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import type { WindowType } from "@/components/navigation/MainMenu";
import ActionBar from "@/components/shared/ActionBar";
import ActionKey from "@/components/shared/ActionKey";
import TopHud from "@/components/shared/TopHud";
import {
  galleryCategories,
  galleryRecords,
  type GalleryCategory,
  type GalleryRecord,
} from "@/data/gallery";

import "./gallery-window.css";

type GalleryWindowProps = {
  onClose: () => void;
  onNavigate: (window: WindowType) => void;
};

export default function GalleryWindow({
  onClose,
  onNavigate,
}: GalleryWindowProps) {
  const [activeCategory, setActiveCategory] =
    useState<GalleryCategory>("ALL");
  const [expandedRecord, setExpandedRecord] =
    useState<GalleryRecord | null>(null);

  const visibleRecords = useMemo(
    () =>
      activeCategory === "ALL"
        ? galleryRecords
        : galleryRecords.filter((record) => record.category === activeCategory),
    [activeCategory]
  );

  useEffect(() => {
    if (!expandedRecord) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setExpandedRecord(null);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [expandedRecord]);

  function changeCategory(category: GalleryCategory) {
    setActiveCategory(category);
    setExpandedRecord(null);
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

        <section className="galleryGrid" aria-label="Gallery files">
          {visibleRecords.map((record, index) => (
            <button
              key={record.id}
              type="button"
              className="galleryTile"
              onClick={() => setExpandedRecord(record)}
              aria-label={`Open ${record.title}`}
            >
              <span className="galleryTile__image">
                {record.image ? (
                  <Image
                    src={record.image}
                    alt={record.title}
                    fill
                    sizes="(max-width: 760px) 46vw, (max-width: 1200px) 30vw, 18vw"
                  />
                ) : (
                  <span className="galleryTile__placeholder" aria-hidden="true">
                    <span className="galleryTile__camera">◉</span>
                    <span>{String(index + 1).padStart(2, "0")}</span>
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
              setExpandedRecord(null);
            }
          }}
        >
          <article className="galleryLightbox__panel">
            <button
              type="button"
              className="galleryLightbox__close"
              aria-label="Close image"
              onClick={() => setExpandedRecord(null)}
            >
              ×
            </button>

            <div className="galleryLightbox__image">
              {expandedRecord.image ? (
                <Image
                  src={expandedRecord.image}
                  alt={expandedRecord.title}
                  fill
                  priority
                  sizes="100vw"
                />
              ) : (
                <div className="galleryLightbox__placeholder">
                  <span>IMAGE SLOT</span>
                  <strong>UPLOAD PENDING</strong>
                </div>
              )}
            </div>

            <div className="galleryLightbox__copy">
              <span>
                {expandedRecord.category} // {expandedRecord.date}
              </span>
              <h1>{expandedRecord.title}</h1>
              <p>{expandedRecord.caption}</p>
            </div>
          </article>
        </div>
      )}
    </section>
  );
}
