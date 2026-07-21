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
  const [focusedCategory, setFocusedCategory] =
    useState<ExperienceCategory>("experience");
  const [openCategories, setOpenCategories] = useState<Set<ExperienceCategory>>(
    () => new Set()
  );
  const [selectedId, setSelectedId] = useState("");

  const visibleRecords = useMemo(
    () =>
      experienceCategoryOrder.flatMap((category) =>
        openCategories.has(category) ? getExperienceRecords(category) : []
      ),
    [openCategories]
  );

  const selectedRecord =
    visibleRecords.find((record) => record.id === selectedId) ?? null;

  const toggleCategory = useCallback((category: ExperienceCategory) => {
    setFocusedCategory(category);
    setOpenCategories((current) => {
      const next = new Set(current);

      if (next.has(category)) {
        next.delete(category);

        setSelectedId((currentSelectedId) => {
          const belongsToClosedCategory = getExperienceRecords(category).some(
            (record) => record.id === currentSelectedId
          );
          return belongsToClosedCategory ? "" : currentSelectedId;
        });
      } else {
        next.add(category);
      }

      return next;
    });
  }, []);

  const moveCategory = useCallback(
    (direction: 1 | -1) => {
      const index = experienceCategoryOrder.indexOf(focusedCategory);
      const nextIndex =
        (index + direction + experienceCategoryOrder.length) %
        experienceCategoryOrder.length;
      setFocusedCategory(experienceCategoryOrder[nextIndex]);
    },
    [focusedCategory]
  );

  const moveSelection = useCallback(
    (direction: 1 | -1) => {
      if (visibleRecords.length === 0) return;

      const index = visibleRecords.findIndex(
        (record) => record.id === selectedId
      );
      const nextIndex =
        index === -1
          ? direction === 1
            ? 0
            : visibleRecords.length - 1
          : (index + direction + visibleRecords.length) % visibleRecords.length;

      const nextRecord = visibleRecords[nextIndex];
      setSelectedId(nextRecord.id);
      setFocusedCategory(nextRecord.category);
    },
    [selectedId, visibleRecords]
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
        case " ":
          event.preventDefault();
          toggleCategory(focusedCategory);
          break;
        case "Enter":
          if (selectedRecord?.link) {
            event.preventDefault();
            window.open(selectedRecord.link.href, "_blank", "noopener,noreferrer");
          } else {
            event.preventDefault();
            toggleCategory(focusedCategory);
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
  }, [
    focusedCategory,
    moveCategory,
    moveSelection,
    onClose,
    selectedRecord,
    toggleCategory,
  ]);

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
            <span>VISIBLE</span>
          </div>
          <div>
            <strong>{String(openCategories.size).padStart(2, "0")}</strong>
            <span>OPEN</span>
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
            const isOpen = openCategories.has(category);
            const isFocused = focusedCategory === category;

            return (
              <div
                key={category}
                className={
                  isOpen
                    ? "experienceIndex__group is-open"
                    : "experienceIndex__group"
                }
              >
                <button
                  type="button"
                  className={[
                    "experienceIndex__category",
                    isOpen ? "is-active" : "",
                    isFocused ? "is-focused" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => toggleCategory(category)}
                  onFocus={() => setFocusedCategory(category)}
                  aria-expanded={isOpen}
                  aria-controls={`experience-drawer-${category}`}
                >
                  <span>{experienceCategoryLabels[category]}</span>
                  <small>({String(records.length).padStart(2, "0")})</small>
                  <b aria-hidden="true">▷</b>
                </button>

                <div
                  id={`experience-drawer-${category}`}
                  className="experienceIndex__drawer"
                  aria-hidden={!isOpen}
                >
                  <div className="experienceIndex__drawerInner">
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
                            onClick={() => {
                              setFocusedCategory(category);
                              setSelectedId(record.id);
                            }}
                            aria-pressed={selected}
                            tabIndex={isOpen ? 0 : -1}
                          >
                            <strong>{record.title}</strong>
                            <span>{record.organization}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </aside>

        {selectedRecord ? (
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
        ) : (
          <div className="experienceDocument experienceDocument--empty">
            <span>NO DATASHARD SELECTED</span>
            <p>Open an archive drawer and select a record.</p>
          </div>
        )}
      </div>

      <footer className="experienceControls">
        <div><span>↑ ↓</span>Navigate</div>
        <div><span>← →</span>Category</div>
        <div><span>SPACE</span>Open link</div>
        <button type="button" onClick={onClose}><span>ESC</span>Close</button>
      </footer>
    </section>
  );
}