"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import {
  experienceCategoryLabels,
  experienceCategoryOrder,
  getExperienceRecords,
  type ExperienceCategory,
} from "@/data/experience";

import "./experience-window.css";

type ExperienceWindowProps = {
  onClose: () => void;
};

export default function ExperienceWindow({ onClose }: ExperienceWindowProps) {
  const [activeCategory, setActiveCategory] =
    useState<ExperienceCategory>("experience");
  const initialRecord = getExperienceRecords("experience")[0];
  const [selectedId, setSelectedId] = useState(initialRecord?.id ?? "");

  const visibleRecords = useMemo(
    () => getExperienceRecords(activeCategory),
    [activeCategory]
  );

  const selectedRecord =
    visibleRecords.find((record) => record.id === selectedId) ??
    visibleRecords[0];

  const selectCategory = useCallback((category: ExperienceCategory) => {
    const nextRecords = getExperienceRecords(category);
    setActiveCategory(category);
    setSelectedId(nextRecords[0]?.id ?? "");
  }, []);

  const moveCategory = useCallback(
    (direction: 1 | -1) => {
      const index = experienceCategoryOrder.indexOf(activeCategory);
      const nextIndex =
        (index + direction + experienceCategoryOrder.length) %
        experienceCategoryOrder.length;
      selectCategory(experienceCategoryOrder[nextIndex]);
    },
    [activeCategory, selectCategory]
  );

  const moveSelection = useCallback(
    (direction: 1 | -1) => {
      if (!selectedRecord || visibleRecords.length === 0) return;
      const index = visibleRecords.findIndex(
        (record) => record.id === selectedRecord.id
      );
      const nextIndex =
        (index + direction + visibleRecords.length) % visibleRecords.length;
      setSelectedId(visibleRecords[nextIndex].id);
    },
    [selectedRecord, visibleRecords]
  );

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const target = event.target;
      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement
      ) {
        return;
      }

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          moveSelection(1);
          break;
        case "ArrowUp":
          event.preventDefault();
          moveSelection(-1);
          break;
        case "ArrowLeft":
          event.preventDefault();
          moveCategory(-1);
          break;
        case "ArrowRight":
          event.preventDefault();
          moveCategory(1);
          break;
        case "Enter":
          if (selectedRecord?.link) {
            event.preventDefault();
            window.open(selectedRecord.link.href, "_blank", "noopener,noreferrer");
          }
          break;
        case "Escape":
          event.preventDefault();
          onClose();
          break;
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [moveCategory, moveSelection, onClose, selectedRecord]);

  return (
    <section
      className="experienceScreen"
      role="dialog"
      aria-modal="true"
      aria-label="Experience archive"
    >
      <div className="experienceScreen__scanlines" aria-hidden="true" />

      <header className="experienceHud">
        <div className="experienceHud__identity">
          <div>
            <strong>{String(visibleRecords.length).padStart(2, "0")}</strong>
            <span>RECORDS</span>
          </div>
          <div>
            <strong>{String(experienceCategoryOrder.length).padStart(2, "0")}</strong>
            <span>ARCHIVES</span>
          </div>
        </div>

        <nav className="experienceHud__nav" aria-label="Portfolio sections">
          <span>CYBERWARE</span>
          <span>INVENTORY</span>
          <span>MAP</span>
          <span>CHARACTER</span>
          <strong>JOURNAL</strong>
        </nav>

        <div className="experienceHud__status">
          <span>LAPUTA OS</span>
          <strong>PERSONNEL ARCHIVE</strong>
        </div>
      </header>

      <div className="experienceArchive">
        <aside className="experienceIndex" aria-label="Experience categories">
          {experienceCategoryOrder.map((category) => {
            const records = getExperienceRecords(category);
            const active = activeCategory === category;

            return (
              <div key={category} className="experienceIndex__group">
                <button
                  type="button"
                  className={
                    active
                      ? "experienceIndex__category is-active"
                      : "experienceIndex__category"
                  }
                  onClick={() => selectCategory(category)}
                  aria-expanded={active}
                >
                  <span>{experienceCategoryLabels[category]}</span>
                  <small>({String(records.length).padStart(2, "0")})</small>
                  <b aria-hidden="true">{active ? "▽" : "▷"}</b>
                </button>

                {active && (
                  <div className="experienceIndex__records">
                    {records.map((record) => {
                      const selected = selectedRecord?.id === record.id;

                      return (
                        <button
                          key={record.id}
                          type="button"
                          className={
                            selected
                              ? "experienceIndex__record is-selected"
                              : "experienceIndex__record"
                          }
                          onClick={() => setSelectedId(record.id)}
                          aria-pressed={selected}
                        >
                          <strong>{record.title}</strong>
                          <span>{record.organization}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </aside>

        {selectedRecord && (
          <article className="experienceDocument" key={selectedRecord.id}>
            <header className="experienceDocument__header">
              <span>{selectedRecord.status ?? "ARCHIVED"}</span>
              <h1>{selectedRecord.title}</h1>
              <p>{selectedRecord.organization}</p>
            </header>

            <div className="experienceDocument__meta">
              <span>{selectedRecord.period}</span>
              {selectedRecord.location && <span>{selectedRecord.location}</span>}
            </div>

            <div className="experienceDocument__body">
              <p className="experienceDocument__lead">
                {selectedRecord.description}
              </p>

              {selectedRecord.details?.map((detail) => (
                <p key={detail}>{detail}</p>
              ))}
            </div>

            {selectedRecord.technologies &&
              selectedRecord.technologies.length > 0 && (
                <div className="experienceDocument__tags">
                  {selectedRecord.technologies.map((technology) => (
                    <span key={technology}>{technology}</span>
                  ))}
                </div>
              )}

            {selectedRecord.link && (
              <a
                className="experienceDocument__link"
                href={selectedRecord.link.href}
                target="_blank"
                rel="noreferrer"
              >
                <span>ENTER</span>
                {selectedRecord.link.label}
              </a>
            )}
          </article>
        )}
      </div>

      <footer className="experienceControls">
        <div><span>↑ ↓</span>Navigate</div>
        <div><span>← →</span>Category</div>
        <div><span>ENTER</span>Open link</div>
        <button type="button" onClick={onClose}><span>ESC</span>Close</button>
      </footer>
    </section>
  );
}