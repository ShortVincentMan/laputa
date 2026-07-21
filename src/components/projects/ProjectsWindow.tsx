"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";

import ProjectDetailWindow from "@/components/projects/ProjectDetailWindow";
import AssetPlaceholder from "@/components/shared/AssetPlaceholder";
import {
  categoryLabels,
  categoryOrder,
  getProjectById,
  getVisibleProjects,
  type ProjectCategory,
  type ProjectRecord,
} from "@/data/projects";

import "./projects-window.css";

type ProjectsWindowProps = {
  onClose: () => void;
};

function getStatusTone(project: ProjectRecord) {
  return project.status === "COMPLETED" ? "complete" : "active";
}

export default function ProjectsWindow({
  onClose,
}: ProjectsWindowProps) {
  const initialProject = getVisibleProjects("featured")[0];

  const [activeCategory, setActiveCategory] =
    useState<ProjectCategory>("featured");

  const [selectedId, setSelectedId] = useState(
    initialProject?.id ?? ""
  );

  const [openProjectId, setOpenProjectId] = useState<string | null>(
    null
  );

  const [expandedImage, setExpandedImage] = useState<string | null>(
    null
  );

  const visibleProjects = useMemo(
    () => getVisibleProjects(activeCategory),
    [activeCategory]
  );

  const selectedProject =
    visibleProjects.find((project) => project.id === selectedId) ??
    visibleProjects[0];

  const openProject = getProjectById(openProjectId);

  const selectCategory = useCallback(
    (category: ProjectCategory) => {
      const nextProjects = getVisibleProjects(category);

      setExpandedImage(null);
      setActiveCategory(category);
      setSelectedId(nextProjects[0]?.id ?? "");
    },
    []
  );

  const selectProject = useCallback((projectId: string) => {
    setExpandedImage(null);
    setSelectedId(projectId);
  }, []);

  const moveSelection = useCallback(
    (direction: 1 | -1) => {
      if (!selectedProject || visibleProjects.length === 0) return;

      const currentIndex = visibleProjects.findIndex(
        (project) => project.id === selectedProject.id
      );

      const nextIndex =
        (currentIndex + direction + visibleProjects.length) %
        visibleProjects.length;

      setExpandedImage(null);
      setSelectedId(visibleProjects[nextIndex].id);
    },
    [selectedProject, visibleProjects]
  );

  const moveCategory = useCallback(
    (direction: 1 | -1) => {
      const currentIndex = categoryOrder.indexOf(activeCategory);

      const nextIndex =
        (currentIndex + direction + categoryOrder.length) %
        categoryOrder.length;

      selectCategory(categoryOrder[nextIndex]);
    },
    [activeCategory, selectCategory]
  );

  const openSelectedProject = useCallback(() => {
    if (!selectedProject) return;

    setExpandedImage(null);
    setOpenProjectId(selectedProject.id);
  }, [selectedProject]);

  useEffect(() => {
    if (openProjectId) return;

    function handleKeyDown(event: KeyboardEvent) {
      const target = event.target;

      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement
      ) {
        return;
      }

      if (expandedImage) {
        if (event.key === "Escape") {
          event.preventDefault();
          setExpandedImage(null);
        }

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
          event.preventDefault();
          openSelectedProject();
          break;

        case "Escape":
          event.preventDefault();
          onClose();
          break;
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    expandedImage,
    moveCategory,
    moveSelection,
    onClose,
    openProjectId,
    openSelectedProject,
  ]);

  if (openProject) {
    return (
      <ProjectDetailWindow
        project={openProject}
        onBack={() => setOpenProjectId(null)}
        onClose={onClose}
      />
    );
  }

  return (
    <section
      className="projectsScreen"
      role="dialog"
      aria-modal="true"
      aria-label="Projects journal"
    >
      <div
        className="projectsScreen__scanlines"
        aria-hidden="true"
      />

      <header className="projectsHud">
        <div className="projectsHud__identity">
          <div>
            <strong>
              {String(visibleProjects.length).padStart(2, "0")}
            </strong>
            <span>RECORDS</span>
          </div>

          <div>
            <strong>
              {String(categoryOrder.length).padStart(2, "0")}
            </strong>
            <span>SECTORS</span>
          </div>
        </div>

        <nav
          className="projectsHud__nav"
          aria-label="Portfolio sections"
        >
          <span>CYBERWARE</span>
          <span>INVENTORY</span>
          <span>MAP</span>
          <span>CHARACTER</span>
          <strong>JOURNAL</strong>
        </nav>

        <div className="projectsHud__status">
          <span>LAPUTA OS</span>
          <strong>PROJECT DATABASE</strong>
        </div>
      </header>

      <div
        className="projectsJournalTabs"
        role="tablist"
        aria-label="Project categories"
      >
        {categoryOrder.map((category, index) => {
          const count = getVisibleProjects(category).length;
          const active = category === activeCategory;

          return (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={active}
              className={
                active
                  ? "projectsJournalTab is-active"
                  : "projectsJournalTab"
              }
              onClick={() => selectCategory(category)}
            >
              <span>{String.fromCharCode(65 + index)}</span>
              <strong>{categoryLabels[category]}</strong>
              <small>{String(count).padStart(2, "0")}</small>
            </button>
          );
        })}
      </div>

      <div className="projectsJournalLayout">
        <aside
          className="projectsQuestList"
          aria-label="Project records"
        >
          <div
            className="projectsQuestList__rail"
            aria-hidden="true"
          />

          {visibleProjects.map((project, index) => {
            const selected = project.id === selectedProject?.id;
            const tone = getStatusTone(project);

            return (
              <button
                key={project.id}
                type="button"
                className={`projectsQuestRow projectsQuestRow--${tone}${
                  selected ? " is-selected" : ""
                }`}
                onClick={() => selectProject(project.id)}
                onDoubleClick={() => {
                  setExpandedImage(null);
                  setOpenProjectId(project.id);
                }}
                aria-pressed={selected}
              >
                <span
                  className="projectsQuestRow__state"
                  aria-hidden="true"
                >
                  {tone === "complete" ? "✓" : "!"}
                </span>

                <span className="projectsQuestRow__copy">
                  <strong>{project.title}</strong>
                  <small>{project.subtitle}</small>
                </span>

                <span className="projectsQuestRow__period">
                  {project.period}
                </span>

                {selected && (
                  <span
                    className="projectsQuestRow__marker"
                    aria-hidden="true"
                  >
                    ◆
                  </span>
                )}

                <span
                  className="projectsQuestRow__index"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </button>
            );
          })}
        </aside>

        {selectedProject && (
          <article
            className="projectsQuestDetail"
            key={selectedProject.id}
          >
            <header className="projectsQuestDetail__header">
              <span>{selectedProject.status}</span>
              <h1>{selectedProject.title}</h1>
            </header>

            <div className="projectsQuestDetail__objective">
              <span aria-hidden="true">▣</span>
              <strong>{selectedProject.objective}</strong>
            </div>

            <p className="projectsQuestDetail__summary">
              {selectedProject.summary}
            </p>

            <div className="projectsQuestDetail__media">
              <div className="projectsQuestDetail__assetArea">
                {selectedProject.image ? (
                  <button
                    type="button"
                    className="projectsQuestDetail__thumbnail"
                    onClick={() =>
                      setExpandedImage(selectedProject.image ?? null)
                    }
                    aria-label={`Expand ${selectedProject.title} image`}
                  >
                    <Image
                      src={selectedProject.image}
                      alt={
                        selectedProject.imageAlt ??
                        selectedProject.title
                      }
                      fill
                      priority={
                        selectedProject.id === "mantis-blades"
                      }
                      sizes="220px"
                    />

                    <span aria-hidden="true">↗</span>
                  </button>
                ) : (
                  <AssetPlaceholder
                    label={selectedProject.assetLabel}
                    className="projectsQuestDetail__placeholder"
                  />
                )}
              </div>

              <div className="projectsQuestDetail__meta">
                <span>
                  {selectedProject.category.toUpperCase()}
                </span>
                <span>{selectedProject.period}</span>
                <span>{selectedProject.status}</span>
              </div>
            </div>

            <div className="projectsQuestDetail__technologies">
              {selectedProject.technologies
                .slice(0, 6)
                .map((technology) => (
                  <span key={technology}>{technology}</span>
                ))}
            </div>

            <button
              type="button"
              className="projectsQuestDetail__open"
              onClick={openSelectedProject}
            >
              <span>ENTER</span>
              OPEN PROJECT RECORD
            </button>
          </article>
        )}
      </div>

      <footer className="projectsControls">
        <div>
          <span>↑ ↓</span>
          Navigate
        </div>

        <div>
          <span>← →</span>
          Category
        </div>

        <div>
          <span>ENTER</span>
          Select
        </div>

        <button type="button" onClick={onClose}>
          <span>ESC</span>
          Close
        </button>
      </footer>

      {expandedImage && selectedProject && (
        <div
          className="projectsImageViewer"
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedProject.title} image preview`}
          onClick={() => setExpandedImage(null)}
        >
          <button
            type="button"
            className="projectsImageViewer__close"
            onClick={() => setExpandedImage(null)}
          >
            ESC CLOSE
          </button>

          <div
            className="projectsImageViewer__image"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={expandedImage}
              alt={
                selectedProject.imageAlt ?? selectedProject.title
              }
              fill
              sizes="90vw"
              priority
            />
          </div>

          <span className="projectsImageViewer__label">
            {selectedProject.title}
          </span>
        </div>
      )}
    </section>
  );
}