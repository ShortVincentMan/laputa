"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";

import CyberwareWindow from "@/components/projects/CyberwareWindow";
import ProjectDetailWindow from "@/components/projects/ProjectDetailWindow";
import AssetPlaceholder from "@/components/shared/AssetPlaceholder";
import ActionBar from "@/components/shared/ActionBar";
import ActionKey from "@/components/shared/ActionKey";
import TopHud from "@/components/shared/TopHud";

import {
  categoryLabels,
  categoryOrder,
  getProjectById,
  getVisibleProjects,
  type ProjectCategory,
  type ProjectRecord,
} from "@/data/projects";

import type { WindowType } from "@/components/navigation/MainMenu";

import "./projects-window.css";

type ProjectsWindowProps = {
  onClose: () => void;
  onNavigate: (window: WindowType) => void;
};

type ProjectsView =
  | { type: "journal" }
  | { type: "record"; projectId: string }
  | {
      type: "cyberware";
      projectId: string;
      returnTo: "journal" | "record";
    };

function getStatusTone(project: ProjectRecord) {
  return project.status === "COMPLETED" ? "complete" : "active";
}

export default function ProjectsWindow({
  onClose,
  onNavigate,
}: ProjectsWindowProps) {
  const initialProject = getVisibleProjects("featured")[0];

  const [activeCategory, setActiveCategory] =
    useState<ProjectCategory>("featured");
  const [selectedId, setSelectedId] = useState(initialProject?.id ?? "");
  const [view, setView] = useState<ProjectsView>({ type: "journal" });
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  const visibleProjects = useMemo(
    () => getVisibleProjects(activeCategory),
    [activeCategory]
  );

  const selectedProject =
    visibleProjects.find((project) => project.id === selectedId) ??
    visibleProjects[0];

  const activeProject =
    view.type === "journal" ? undefined : getProjectById(view.projectId);

  const selectCategory = useCallback((category: ProjectCategory) => {
    const nextProjects = getVisibleProjects(category);

    setExpandedImage(null);
    setActiveCategory(category);
    setSelectedId(nextProjects[0]?.id ?? "");
  }, []);

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
    setView({ type: "record", projectId: selectedProject.id });
  }, [selectedProject]);

  const openSelectedCyberware = useCallback(() => {
    if (!selectedProject?.cyberware) return;

    setExpandedImage(null);
    setView({
      type: "cyberware",
      projectId: selectedProject.id,
      returnTo: "journal",
    });
  }, [selectedProject]);

  useEffect(() => {
    if (view.type !== "journal") return;

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
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    expandedImage,
    moveCategory,
    moveSelection,
    onClose,
    openSelectedProject,
    view.type,
  ]);

  if (view.type === "cyberware" && activeProject?.cyberware) {
    return (
      <CyberwareWindow
        initialProjectId={activeProject.id}
        onBack={() => {
          if (view.returnTo === "record") {
            setView({ type: "record", projectId: view.projectId });
            return;
          }

          setView({ type: "journal" });
        }}
        onOpenRecord={(projectId) =>
          setView({ type: "record", projectId })
        }
        onClose={onClose}
        onNavigate={onNavigate}
      />
    );
  }

  if (view.type === "record" && activeProject) {
    return (
      <ProjectDetailWindow
        project={activeProject}
        onBack={() => setView({ type: "journal" })}
        onClose={onClose}
        onOpenCyberware={
          activeProject.cyberware
            ? () =>
                setView({
                  type: "cyberware",
                  projectId: activeProject.id,
                  returnTo: "record",
                })
            : undefined
        }
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
      <div className="projectsScreen__scanlines" aria-hidden="true" />

      <TopHud
        metrics={[
          {
            value: String(visibleProjects.length).padStart(2, "0"),
            label: "RECORDS",
          },
          {
            value: String(categoryOrder.length).padStart(2, "0"),
            label: "SECTORS",
            tone: "green",
          },
        ]}
        navigation={[
          {
            id: "cyberware",
            label: "CYBERWARE",
            disabled: !selectedProject?.cyberware,
            onClick: openSelectedCyberware,
            title: selectedProject?.cyberware
              ? `Open ${selectedProject.title} in Cyberware`
              : "Select a cybernetic project to open Cyberware",
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
          { id: "journal", label: "JOURNAL", active: true },
        ]}
        archiveLabel="PROJECT DATABASE"
      />

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
        <aside className="projectsQuestList" aria-label="Project records">
          <div className="projectsQuestList__rail" aria-hidden="true" />

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
                onDoubleClick={() =>
                  setView({ type: "record", projectId: project.id })
                }
                aria-pressed={selected}
              >
                <span className="projectsQuestRow__state" aria-hidden="true">
                  {tone === "complete" ? "✓" : "!"}
                </span>

                <span className="projectsQuestRow__copy">
                  <strong>{project.title}</strong>
                  <small>{project.subtitle}</small>
                </span>

                <span className="projectsQuestRow__period">{project.period}</span>

                {selected && (
                  <span className="projectsQuestRow__marker" aria-hidden="true">
                    ◆
                  </span>
                )}

                <span className="projectsQuestRow__index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </button>
            );
          })}
        </aside>

        {selectedProject && (
          <article className="projectsQuestDetail" key={selectedProject.id}>
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
                    onClick={() => setExpandedImage(selectedProject.image ?? null)}
                    aria-label={`Expand ${selectedProject.title} image`}
                  >
                    <Image
                      src={selectedProject.image}
                      alt={selectedProject.imageAlt ?? selectedProject.title}
                      fill
                      priority={selectedProject.id === "mantis-blades"}
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
                <span>{selectedProject.category.toUpperCase()}</span>
                <span>{selectedProject.period}</span>
                <span>{selectedProject.status}</span>
              </div>
            </div>

            <div className="projectsQuestDetail__technologies">
              {selectedProject.technologies.slice(0, 6).map((technology) => (
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
      <ActionBar>
        <ActionKey keyLabel="↑ ↓" label="Navigate" />
        <ActionKey keyLabel="← →" label="Category" />
        <ActionKey
          keyLabel="ENTER"
          label="Select"
          onClick={openSelectedProject}
        />
        <ActionKey
          keyLabel="ESC"
          label="Close"
          onClick={onClose}
        />
      </ActionBar>
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
              alt={selectedProject.imageAlt ?? selectedProject.title}
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